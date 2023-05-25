import { mediaType, OP_NAME } from "@/constants/ffmpeg";
import { Button } from "antd";
import styles from './index.less';

interface IOutput {
  videoSrc: any;
  outputType: any;
  inputType: string;
}

export const Output = ({ videoSrc, outputType, inputType }: IOutput) => {
  if (!videoSrc) {
    return null;
  }
  if (inputType === OP_NAME.getInfo) {
    return null;
  }
  return (
    <div className={styles.video__box}>
      {outputType === mediaType.mp4 && (
        <video crossOrigin='anonymous' src={videoSrc.blob} width={300} height={300}></video>
      )}
      {outputType === mediaType.mp3 && <audio crossOrigin='anonymous' src={videoSrc.blob}></audio>}
      {outputType === mediaType.png && (
        <img crossOrigin='anonymous' src={videoSrc.blob} width={300} height={300}></img>
      )}

      <Button type="primary">
        <a href={videoSrc.blob} download={videoSrc.f}>
          下载
        </a>
      </Button>
    </div>
  );
};