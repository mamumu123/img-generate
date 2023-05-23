// import { sideSetting } from '@/constants/sideBar';
// import styles from './index.less';
import FfmpegComponent from '@/pages/videoCut/components/ffmpegDemo'

export const SideBar = () => {
  console.log('log');
  return (
    <>
    <FfmpegComponent />
      {/* {sideSetting.map((item, index) => (
        <div key={index} className={styles.container}>
          {item.label}
        </div>
      ))} */}
    </>
  );
};
