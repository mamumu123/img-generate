
export interface ISrc {
  f: string;
  blob: string;
}

interface IGetOp {
  out?: string
  input?: string
  rangeLeft?: number
  rangeRight?: number
  timer?: string;
}

export const OUT_DEFAULT = 'output.mp4';
export const IN_DEFAULT = 'input.mp4';
export const DEFAULT_ARGS = OUT_DEFAULT;


export const OP_NAME = {
  getInfo: 'getInfo', // 获取视频信息
  screenshot: 'screenshot',
  getMp3FromVideo: 'getMp3FromVideo',  // TODO: confirm  if error
  custom: 'custom', // 自定义
  cutVideo: 'cutVideo',
};

//      getAudioFromVideo: '-vn -y -acodec copy 3.aac',
export const getOp = (op: string, args?: IGetOp) => {
  // const { out = OUT_DEFAULT, input = IN_DEFAULT, timer } = args || {}
  const { timer } = args || {};
  let output = '';
  let resultOp = '';
  switch (op) {
    case OP_NAME.screenshot:
      resultOp = `-ss ${timer}  -vframes 1`;
      output = 'out.png';
      break;

    case OP_NAME.getMp3FromVideo:
      resultOp = ` -f mp3 -vn`;
      output = 'out.mp3';
      break;

    case OP_NAME.getInfo:
      resultOp = '';
      output = OUT_DEFAULT;
      break;

    case OP_NAME.custom:
      resultOp = '';
      output = OUT_DEFAULT;
      break;

    case OP_NAME.cutVideo:
      const { rangeLeft, rangeRight, input, out } = args || {};
      // ffmpeg -ss [start] -i [input] -to [end] -c copy [output]
      // ffmpege -ss 01:02:03 -t 80 -i inputVideo.mp4
      // ./ffmpeg -ss 00:17:24  -to 02:19:31 -i inputVideo.mp4 -threads 2 -c:v copy -c:a copy outputVideo.mp4
      resultOp = `-ss ${rangeLeft} -to ${rangeRight} -i ${input} -c:v copy -c:a copy ${out}`;

      output = OUT_DEFAULT;
      break;

    default:
      resultOp = DEFAULT_ARGS;
      output = OUT_DEFAULT;
  }
  return [resultOp, output];
};

export const optionSetting = [
  {
    value: OP_NAME.getInfo,
    label: '获取视频信息',
  },
  {
    value: OP_NAME.custom,
    label: '自定义输入',
  },
  // {
  //   value: OP_NAME.screenshot,
  //   label: '视频截图',
  // },
  {
    value: OP_NAME.getMp3FromVideo,
    label: '提取音频',
  },
  {
    value: OP_NAME.cutVideo,
    label: '视频分割',
  },
];

export const mediaType = {
  mp4: 'video/mp4',
  mp3: 'audio/mp3',
  png: 'image/png',
};
