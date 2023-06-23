import React, { useEffect } from 'react';

interface IVideoPlayer {
    url: string
    playerRef: React.MutableRefObject<HTMLVideoElement | null>
    // eslint-disable-next-line @typescript-eslint/ban-types
    setCurrentTime: Function
    // eslint-disable-next-line @typescript-eslint/ban-types
    setDuration: Function
}

export const VideoPlayer = ({
    playerRef: videoRef,
    setDuration,
    url,
    setCurrentTime
}: IVideoPlayer) => {

    // TODO: controls 的 时间显示有问题，保留到了整数，这个后面需要处理一下。
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
            <video controls width="100%" height="auto" crossOrigin='anonymous' src={url} ref={videoRef}></video>
        </div>
    )
}