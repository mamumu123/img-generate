// import Guide from '@/components/Guide';
// import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
// import { useModel } from '@umijs/max';
import { Button, message } from 'antd';
import { useEffect, useRef } from 'react';
import styles from './index.less';

const loadImage = (src: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

function isWeChat() {
  return /MicroMessenger/i.test(window.navigator.userAgent);
}

// function download(selector) {
//   // 通过 API 获取目标 canvas 元素
//   const canvas = document.querySelector(selector);

//   // 创建一个 a 标签，并设置 href 和 download 属性
//   const el = document.createElement('a');
//   // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
//   el.href = canvas.toDataURL();
//   el.download = '文件名称';

//   // 创建一个点击事件并对 a 标签进行触发
//   const event = new MouseEvent('click');
//   el.dispatchEvent(event);
// }

const HomePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async () => {
      if (!canvasRef.current) {
        return;
      }
      const ctx = canvasRef.current.getContext('2d');
      const images = ['/traits/Lian.jpg'];

      const imagesObj = await Promise.all(images.map(loadImage));
      imagesObj.forEach((item) => {
        ctx?.drawImage(item, 0, 0, 200, 200);
      });
    })();
  }, []);

  const left = () => {
    return <div className={styles.left}>1111</div>;
  };

  const right = () => {
    return (
      <div className={styles.right}>
        <div>
          <canvas id="canvas" ref={canvasRef} width="200" height="200"></canvas>
        </div>
        <Button
          size="small"
          type="primary"
          onClick={async () => {
            if (isWeChat()) {
              message.error({
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
          }}
        >
          下载头像
        </Button>
      </div>
    );
  };

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        {left()}
        {right()}
      </div>
    </PageContainer>
  );
};

export default HomePage;
