import styles from './index.less';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Track } from './components/Track'
import { VideoPlayer } from './components/VideoPlayer';
import FfmpegComponent from '@/pages/videoCut/components/ffmpegDemo'
import { useModel } from '@umijs/max';

const Index = () => {
  // TDOO: 音视频展示
  const { mediaFile, mediaType, videoCurrentTime, setVideoCurrentTime } = useModel('video')

  const [url, setSrc] = useState('');
  const playerRef = useRef<HTMLVideoElement | null>(null)
  const [duration, setDuration] = useState(10);

  console.log('xxxx duration', duration)
  useEffect(() => {
    if (!mediaFile) { return }
    const url = URL.createObjectURL(mediaFile)
    setSrc(url);
  }, [mediaFile])


  // 先不放 video
  const onClick = (time: number) => {

    if (!playerRef.current) {
      console.error('onClick no playerRef')
      setVideoCurrentTime(time);
      return
    }
    playerRef.current.pause()
    playerRef.current.currentTime = time;
  }

  const onLoadDemo = () => {
    if (!playerRef.current) {
      return
    }
    setSrc('https://live-s3m.mediav.com/nativevideo/853af20ef450e4b0e467055fc6b955b9-bit_cloud768.mp4');
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.main_right}>
          <div className={styles.main_top}>
            <div className={styles.asset}>
              <FfmpegComponent duration={duration} />
            </div>
            <div className={styles.pre}>
              <VideoPlayer playerRef={playerRef} setCurrentTime={setVideoCurrentTime} url={url} setDuration={setDuration} />
              <Button onClick={onLoadDemo}>加载 demo url</Button>
            </div>
          </div>
          <div className={styles.main_bottom}>
            <Track currentTime={videoCurrentTime} click={onClick} duration={duration} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
