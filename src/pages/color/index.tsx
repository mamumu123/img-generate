import { loadImage } from '@/utils';
import { PageContainer } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  // 背景色
  const [background, setBackground] = useState('');

  // canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async () => {
      // 将 img 绘制在 canvas 中
      async function draw(src: string) {
        const canvas = canvasRef.current;
        if (!canvas) {
          return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return;
        }

        const img = await loadImage(src);
        ctx.drawImage(img, 0, 0);

        // 获取坐标颜色
        function getColor(x: number, y: number) {
          const imageData = ctx!.getImageData(x, y, 1, 1);
          const pixel = imageData.data; // data： 类型为Uint8ClampedArray的一维数组，每四个数组元素代表了一个像素点的RGBA信息，每个元素数值介于0~255
          const [r, g, b, aBefore] = pixel;
          const a = Math.round(aBefore / 255);
          const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
          return {
            rgba,
          };
        }
        return {
          getColor,
        };
      }

      const img =
        'https://img95.699pic.com/xsj/0x/j2/fw.jpg!/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast';

      const canvas = await draw(img);

      canvasRef.current?.addEventListener('click', function (e) {
        const x = e.offsetX;
        const y = e.offsetY;
        console.log('x', x, 'y', y);
        const color = canvas!.getColor(x, y).rgba;
        console.log('color', color);
        setBackground(color);
      });
    })();
  }, []);

  return (
    <PageContainer ghost>
      <div className={styles.container} style={{ background: background, position: 'relative' }}>
        {true && (<div className={styles.tip}>
          试着点击页面中的图片
        </div>)}
        <canvas width={500} height={500} ref={canvasRef}></canvas>
      </div>
    </PageContainer>
  );
};

export default HomePage;
