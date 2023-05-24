import { useEffect } from "react"

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

    useEffect(() => {
        // TODO:
        // window.addEventListener('resize', () => {
        //     console.log('111')
        //     if (!waveCanvas) { return }
        //     draw?.()
        // });
    }, [])


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