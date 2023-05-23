import styles from './index.less';
import { SideBar } from './components/sideBar';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { Track } from './components/Track'
import { VideoPlayer } from './components/VideoPlayer';

const Index = () => {

    const [currentTime, setCurrentTime] = useState(0);

  const [url, setSrc] = useState('');
  const playerRef = useRef<HTMLVideoElement | null>(null)
  const [duration, setDuration] = useState(10);


  // 先不放 video
  const onClick = (time: number) => {

    if (!playerRef.current) {
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
      {/* <div className={styles.header}>header</div> */}
      <div className={styles.main}>
        {/* <div className={styles.side_bar}> */}
        {/* <SideBar /> */}
        {/* </div> */}
        <div className={styles.main_right}>
          <div className={styles.main_top}>
            <div className={styles.asset}>
              <SideBar />
            </div>
            <div className={styles.pre}>
              <VideoPlayer playerRef={playerRef} setCurrentTime={setCurrentTime} url={url} setDuration={setDuration} />
              <Button onClick={onLoadDemo}>加载 demo url</Button>
            </div>
          </div>
          <div className={styles.main_bottom}>
            <Track currentTime={currentTime} click={onClick} duration={duration} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
