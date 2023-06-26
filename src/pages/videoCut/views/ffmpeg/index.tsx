import styles from './index.less';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import { Button, Input, Select, message, Progress } from 'antd';
import { useFfmpeg } from '@/hooks/useFfmpeg';
import {
  DEFAULT_ARGS,
  getOp,
  ISrc,
  mediaType,
  optionSetting,
  OUT_DEFAULT,
} from '@/constants/ffmpeg';
import FileUpload from '../../components/FileUpload';
import { useModel } from '@umijs/max';
import { Output } from './OutputComponent';
import { useLocalStorageState } from 'ahooks';

const ffmpeg = createFFmpeg({
  log: true,
  corePath: `${window.location.origin}${process.env.PUBLIC_PATH}static/v0.11.0/ffmpeg-core.js`,
});

export default function FFmpegComponent() {
  const { stderr, setStderr, progress, ffmpegIsLoaded } = useFfmpeg(ffmpeg);

  const { media } = useModel('video')

  // input name
  const opInput = media?.name;

  // op param
  const [args, setArgs] = useLocalStorageState('args', {
    defaultValue: DEFAULT_ARGS
  });

  // 选择预制参数
  const [inputType, setInputType] = useLocalStorageState('inputType', {
    defaultValue: optionSetting[0].value
  });

  // output name
  const [opOutput, setOpOutput] = useState('');

  // 输入的类型后缀
  const outputType = useMemo(() => {
    const str = (opOutput.split('.').at(-1) || '') as any;
    // @ts-ignore
    const type = mediaType[str];
    return type;
  }, [opOutput]);

  // complete params
  const allArgs = useMemo(
    () => `-i ${opInput} ${args} ${opOutput}`,
    [opInput, args, opOutput],
  );

  useEffect(() => {
    if (inputType) {
      const [op, output] = getOp(inputType);
      setArgs(op);
      setOpOutput(output);
    } else {
      setArgs(DEFAULT_ARGS);
      setOpOutput(OUT_DEFAULT);
    }
  }, [inputType])

  // 结果列表
  const [videoSrc, setVideoSrc] = useState<ISrc | null>(); // output files

  // Link
  useEffect(() => {
    if (!media || !ffmpegIsLoaded) {
      return
    }
    (async () => {
      const { data, name } = media
      ffmpeg.FS('writeFile', name, await fetchFile(data));
    })()
  }, [media, ffmpegIsLoaded]);



  const onRun = async () => {
    if (!opInput || !allArgs) {
      message.error('请确认参数填写完整');
      return;
    }
    setStderr([]);
    await ffmpeg.run(...allArgs.split(' '));
    if (!opOutput) {
      return;
    }
    try {
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
    } catch (error) {
      console.error('error', error);
      return
    }

  };

  const onHandleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setArgs(e.target.value);
  };

  const onReset = () => {
    setArgs(DEFAULT_ARGS);
  };

  return (
    <div className={styles.container}>
      {/* <h1> ffmpeg 小工具</h1> */}
      <div className={styles.box}>
        <h2> 步骤1: 上传处理文件</h2>
        <FileUpload />
      </div>
      <div className={styles.box}>
        <h2> 步骤2: 填写处理参数</h2>
        <div style={{ marginBottom: 10 }}>
          <h3>参数</h3>

          <Select
            value={inputType}
            style={{ width: 220, marginBottom: 10 }}
            onChange={(value) => setInputType(value)}
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
            disabled={!opInput || !allArgs}
          >
            {' '}
            运行{' '}
          </Button>

          {progress !== 0 && <Progress percent={progress} />}

          <Button onClick={onReset}> 重置 </Button>
        </div>
      </div>
      <div className={styles.box}>
        <h2> 步骤4: 下载</h2>
        <div>
          <Output
            videoSrc={videoSrc}
            outputType={outputType}
            inputType={inputType || ''}
          />
        </div>
      </div>
    </div>
  );
}
