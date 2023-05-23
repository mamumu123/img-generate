import { FC, useEffect, useRef, useState } from 'react';
import { WaveCanvas } from '../../components/WaveCanvas'
import { drawBackground, drawRuler, drawPointer, getLength, getGap, clamp, getBegin } from "@/common/painter";

export interface Props {
    currentTime?: number
    duration?: number
    backgroundColor?: string
    pointerWidth?: number
    pointerColor?: string
    click?: Function
    url?: string
}

/**
 * A custom Thing component. Neat!
 */
export const Track: FC<Props> = ({
    currentTime = 0,
    duration = 10,
    backgroundColor = "#529393",
    pointerWidth = 2,
    pointerColor = '#ddd',
    click,
}) => {

    const durationRef = useRef(duration);

    useEffect(() => {
        durationRef.current = duration;
    }, [duration])

    // track canvas
    const [waveCanvas, setWaveCanvas] = useState<HTMLCanvasElement | null>(null);

    // canvas container
    const $shwave = useRef<HTMLDivElement>(null)

    const $canvas = (waveCanvas: any) => {
        if (waveCanvas !== null) {
            setWaveCanvas(waveCanvas);
        }
    }

    // compute time
    const computeTimeFromEvent = (event: MouseEvent) => {
        if (!waveCanvas || !$shwave.current) {
            return 0
        }
        const { clientWidth: width } = waveCanvas;// canvas 实际宽度
        const pixelRatio = window.devicePixelRatio; // 1
        const length = getLength(durationRef.current); // 100
        const gap = getGap(width, length); // 0.1 s 所占用的像素 宽度

        // 偏移的宽度
        const left = event.pageX - $shwave.current.offsetLeft / pixelRatio;

        const begin = getBegin(currentTime, durationRef.current);
        // left 在 时间中的位置
        const time = clamp(
            ((left / gap) * pixelRatio) / 10 + begin,
            begin,
            begin + durationRef.current
        );

        return time;
    };

    // get time, then reDraw
    const onCanvasClick = (event: MouseEvent) => {
        const time = computeTimeFromEvent(event);
        if (currentTime !== time) {
            click?.(time);
            draw();
        }
    };

    // click event
    useEffect(() => {
        if (waveCanvas === null) {
            return
        }
        //设置canvas点击监听
        waveCanvas.addEventListener("click", onCanvasClick);
        return () => {
            waveCanvas.removeEventListener("click", onCanvasClick);
        }
    }, [waveCanvas])

    const draw = () => {
        const ctx = waveCanvas && waveCanvas?.getContext("2d");
        if (!waveCanvas || !ctx) return;

        // set canvas width, 否则会出现模糊情况
        ctx.imageSmoothingEnabled = false;
        //像素比
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio
        const pixelRatio = window.devicePixelRatio;

        const { clientHeight, clientWidth } = waveCanvas;

        waveCanvas.width = clientWidth * pixelRatio;
        waveCanvas.height = clientHeight * pixelRatio;

        //绘制背景
        drawBackground(waveCanvas, ctx, backgroundColor);

        // 刻度尺
        drawRuler(waveCanvas, ctx, pixelRatio, durationRef.current)

        // 时间指针
        drawPointer({
            canvas: waveCanvas,
            ctx,
            pixelRatio,
            duration,
            currentTime,
            color: pointerColor,
            pointerWidth,
        })

    }

    return (
        <div
            ref={$shwave}
            className="shwave"
            style={{
                position: 'relative',
                display: 'flex',
                height: '100%',
                minWidth: '100%',
                overflow: 'auto',
            }}
        >

            < WaveCanvas
                $canvas={$canvas}
                waveCanvas={waveCanvas}
                draw={draw}
                currentTime={currentTime}
                duration={duration}
            />
        </div>)
};
