import React, { useEffect } from 'react';

interface IVideoPlayer {
    url: string
    playerRef: React.MutableRefObject<HTMLVideoElement | null>
    setCurrentTime: Function
    setDuration: Function
}

export const VideoPlayer = ({
    playerRef: videoRef,
    setDuration,
    url,
    setCurrentTime
}: IVideoPlayer) => {

    useEffect(() => {
        if (!videoRef.current) {
            return
        }
        videoRef.current.ontimeupdate = () => {
            setCurrentTime?.(videoRef.current?.currentTime)
        }
        videoRef.current.addEventListener('canplay', () => {
            setDuration?.(videoRef.current?.duration)
        })
    }, [url])

    return (
        <div>
            <video controls width={400} height={300} crossOrigin={'anonymous'} src={url} ref={videoRef}></video>
        </div>
    )
}