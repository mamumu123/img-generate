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

export function downloadCanvasPart(
  canvas: HTMLCanvasElement,
  [x = 0, y = 0, width = canvas.width, height = canvas.height]: [
    number?,
    number?,
    number?,
    number?,
  ],
) {
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.getImageData(x, y, width, height);
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.putImageData(imageData, 0, 0);
  console.log('tempCtx', imageData);
  tempCanvas.toBlob((blob) => {
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = URL.createObjectURL(blob!);
    link.click();
  }, 'image/png');
}
