import { useEffect } from "react"
import { useSize } from 'ahooks'

interface IWaveCanvas {
    draw: Function
    $canvas: any
    waveCanvas: any
    currentTime: number
    duration: number
}

export const WaveCanvas = ({
    draw,
    $canvas,
    waveCanvas,
    currentTime,
    duration,
}: IWaveCanvas) => {

    useEffect(() => {
        if (!waveCanvas) { return }
        draw?.()
    }, [waveCanvas, draw, currentTime, duration]);



    return (
        <>
            <canvas
                ref={$canvas}
                id="shcanvas"
                style={{
                    height: '100%',
                    width: '100%',
                    zIndex: 0,
                    pointerEvents: 'auto',
                }}
            ></canvas>
        </>
    )
}