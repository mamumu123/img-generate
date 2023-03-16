import { message } from 'antd';
import { isWeChat } from '.';

export const download = async (canvasRef: any) => {
  if (isWeChat()) {
    message.info({
      content:
        '由于微信浏览器的限制，无法下载图片，请【长摁头像保存为图片】或者右上角用系统浏览器打开使用，谢谢。',
    });
  } else {
    const canvas = canvasRef.current;
    // 创建一个 a 标签，并设置 href 和 download 属性
    const el = document.createElement('a');
    // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
    if (!canvas) {
      message.error('遇到一些问题，请稍后再试');
      return;
    }
    el.href = canvas.toDataURL();
    el.download = '文件名称';

    // 创建一个点击事件并对 a 标签进行触发
    const event = new MouseEvent('click');
    el.dispatchEvent(event);
  }
};
