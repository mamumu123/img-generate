export const OP_NAME = {
  getInfo: 'getInfo',
  screenshot: 'screenshot',
  getMp3FromVideo: 'getMp3FromVideo',
  ffmpeg: 'ffmpeg',
};

export const sideSetting = [
  {
    value: 'ffmpeg',
    label: '命令行',
  },
  {
    value: OP_NAME.getInfo,
    label: '获取视频信息',
  },
  // {
  //     value: OP_NAME.screenshot,
  //     label: '视频截图',
  // },
  // {
  //     value: OP_NAME.getMp3FromVideo,
  //     label: '提取音频',
  // },
];
