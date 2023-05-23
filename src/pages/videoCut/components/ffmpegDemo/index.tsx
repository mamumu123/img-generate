import styles from './index.less';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { ChangeEventHandler, useMemo, useState } from 'react';
import { Button, Upload, Input, Select, message, Progress } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { omit } from 'lodash';
import { useFfmpeg } from '@/hooks/useFfmpeg';
import {
  DEFAULT_ARGS,
  getOp,
  ISrc,
  mediaType,
  optionSetting,
  OP_NAME,
  OUT_DEFAULT,
} from '@/constants/ffmpeg';

const ffmpeg = createFFmpeg({
  log: true,
  corePath: `${window.location.origin}/img-generate/static/v0.11.0/ffmpeg-core.js`,
});


interface IOutput {
  videoSrc: any;
  outputType: any;
  inputType: string;
}

const Output = ({ videoSrc, outputType, inputType }: IOutput) => {
  if (!videoSrc) {
    return null;
  }
  if (inputType === OP_NAME.getInfo) {
    return null;
  }
  return (
    <div className={styles.video__box}>
      {outputType === mediaType.mp4 && (
        <video src={videoSrc.blob} width={300} height={300}></video>
      )}
      {outputType === mediaType.mp3 && <audio src={videoSrc.blob}></audio>}
      {outputType === mediaType.png && (
        <img src={videoSrc.blob} width={300} height={300}></img>
      )}

      <Button type="primary">
        <a href={videoSrc.blob} download={videoSrc.f}>
          下载
        </a>
      </Button>
    </div>
  );
};


export default function IndexPage() {
  // 上传文件列表
  const [fileList, setFiles] = useState({});

  // 结果列表
  const [videoSrc, setVideoSrc] = useState<ISrc | null>(); // output files

  // 参数
  const [opInput, setOpInput] = useState('');
  const [inputType, setInputType] = useState(optionSetting[0].value);
  const [args, setArgs] = useState(DEFAULT_ARGS);
  const [opOutput, setOpOutput] = useState(OUT_DEFAULT);
  const outputType = useMemo(() => {
    const str = (opOutput.split('.').at(-1) || '') as any;
    // @ts-ignore
    const type = mediaType[str];
    return type;
  }, []);

  // 完整参数
  const allArgs = useMemo(
    () => `-i ${opInput} ${args} ${opOutput}`,
    [opInput, args, opOutput],
  );

  const { stderr, setStderr, progress } = useFfmpeg(ffmpeg);

  const fileListOp = useMemo(() => {
    const listAll = Object.keys(fileList);
    return listAll.map((item) => ({
      value: item,
      label: item,
    }));
  }, [fileList]);

  const props: UploadProps = {
    multiple: true,
    onRemove: (file) => {
      const { name } = file;

      ffmpeg.FS('unlink', name);
      setFiles((current) => {
        // 👇️ remove salary key from object
        const newCurrent = omit(current, name);
        return newCurrent;
      });
    },

    beforeUpload: async (file) => {
      const { name, size, type } = file;

      ffmpeg.FS('writeFile', name, await fetchFile(file));

      setFiles((fileList) => ({
        ...fileList,
        [name]: {
          name,
          size,
          type,
          fd: file,
        },
      }));

      setOpInput(name);

      return false;
    },
  };
  console.log('opInput', opInput, 'opOutput', opOutput, 'allArgs', allArgs);
  const onRun = async () => {
    if (!opInput || !opOutput || !allArgs) {
      message.error('请确认参数填写完整');
      return;
    }
    setStderr([]);
    await ffmpeg.run(...allArgs.split(' '));
    const data = ffmpeg.FS('readFile', opOutput);
    setVideoSrc(() => {
      const blob = URL.createObjectURL(
        new Blob([data.buffer], { type: outputType }),
      );
      ffmpeg.FS('unlink', opOutput);
      const temp = {
        f: opOutput,
        blob,
      };
      return temp;
    });
  };

  const onHandleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setArgs(e.target.value);
  };

  const onReset = () => {
    setArgs(DEFAULT_ARGS);
  };

  return (
    <div className={styles.container}>
      <h1> ffmpeg 小工具</h1>
      <div className={styles.box}>
        <h2> 步骤1: 上传处理文件</h2>
        <div className={styles.upload__container}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
        </div>
      </div>
      <div className={styles.box}>
        <h2> 步骤2: 填写处理参数</h2>
        <div style={{ marginBottom: 10 }}>
          <h3>输入文件</h3>
          <Select
            value={opInput}
            style={{ width: 220 }}
            onChange={(value) => {
              setOpInput(value);
            }}
            options={fileListOp}
          />
          <h3>参数</h3>
          <Select
            value={inputType}
            style={{ width: 220, marginBottom: 10 }}
            onChange={(value) => {
              setInputType(value);
              if (value) {
                const [op, output] = getOp(value);
                setArgs(op);
                setOpOutput(output);
              } else {
                setArgs(DEFAULT_ARGS);
                setOpOutput(OUT_DEFAULT);
              }
            }}
            options={optionSetting}
          />

          <Input type="text" value={args} onChange={onHandleChange}></Input>
          <h3>输出文件名</h3>
          <Input
            type="text"
            value={opOutput}
            onChange={(e) => {
              setOpOutput(e.target.value);
            }}
          ></Input>
          <h3>完整参数展示</h3>
          <Input type="text" value={allArgs} disabled></Input>
        </div>
      </div>

      <div className={styles.box}>
        <h2> 步骤3: 运行</h2>
        <Input.TextArea
          value={stderr.join('\n')}
          readOnly
          style={{ height: 200 }}
        />
        <div className={styles.btn__box}>
          <Button
            type="primary"
            onClick={onRun}
            disabled={!opInput || !opOutput || !allArgs}
          >
            {' '}
            运行{' '}
          </Button>
          <Button onClick={onReset}> 重置 </Button>
          {progress !== 0 && <Progress percent={progress} />}
        </div>
      </div>
      <div className={styles.box}>
        <h2> 步骤4: 下载</h2>
        <div>
          <Output
            videoSrc={videoSrc}
            outputType={outputType}
            inputType={inputType}
          />
        </div>
      </div>
    </div>
  );
}
