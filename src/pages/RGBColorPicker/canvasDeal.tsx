import { PageContainer } from '@ant-design/pro-components';
import { Col, Row, Input, Checkbox, Card, Button, Form, Switch } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.less';
import { useLocalStorageState } from 'ahooks';
import { getImageSize } from '@/utils/image';
import { loadImage } from '@/utils';
import {
  toRed,
  toGreen,
  toBlue,
  flipUpsideDown,
  flipSideToSide,
  leftRotate,
  rightRotate,
  toGrey,
  toBlackAndWhite,
  sharpen,
  marginSharpen,
  toGaussianBlur,
} from '@/utils/imageUtil';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { downloadCanvasPart } from '@/utils/download';

const LENA_PATH =
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69b1afc1723c4233ba09e37c845973f1~tplv-k3u1fbpfcp-watermark.image';

const OP = {
  toRed: 'toRed',
  toGreen: 'toGreen',
  toBlue: 'toBlue',
  flipUpsideDown: 'flipUpsideDown',
  flipSideToSide: 'flipSideToSide',
  leftRotate: 'leftRotate',
  rightRotate: 'rightRotate',
  toGrey: 'toGrey',
  toBlackAndWhite: 'toBlackAndWhite',
  sharpen: 'sharpen',
  marginSharpen: 'marginSharpen',
  toGaussianBlur: 'toGaussianBlur',
  reset: 'reset',
};

const methodList = {
  toRed,
  toGreen,
  toBlue,
  flipUpsideDown,
  flipSideToSide,
  toGrey,
  toBlackAndWhite,
  sharpen,
  marginSharpen,
  toGaussianBlur,
};

function ColorGrid() {
  // origin url
  const [url, setUrl] = useLocalStorageState<string>('url', {
    defaultValue: LENA_PATH,
  });

  // 预览画布
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 预览数据
  const [newData, setNewData] = useState<ImageData | null>();
  // 图片原始数据
  const [originData, setOriginData] = useState<ImageData | null>();

  // 遮罩画布
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);

  // 遮罩相关参数
  const [cx, setX] = useState(0);
  const [cy, setY] = useState(0);
  const [cWidth, setWidth] = useState(0);
  const [cHeight, setHeight] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // 是否开启遮罩
  const [startCrop, setCrop] = useLocalStorageState<boolean>('startCrop', {
    defaultValue: false,
  });

  // 遮罩层绘制
  useEffect(() => {
    const canvas = maskCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !originData) {
      return;
    }
    ctx.clearRect(0, 0, originData?.width, originData?.height);
    if (startCrop) {
      ctx.fillStyle = 'rgba(125, 125, 125, 0.5)';
      console.log('originData', originData);
      ctx.fillRect(0, 0, originData?.width, originData?.height);
      ctx.clearRect(cx, cy, cWidth, cHeight);

      // Draw circles at the midpoint of each edge
      const circleRadius = 10;
      const midPoints = [
        { x: cx + cWidth / 2, y: cy }, // Top
        { x: cx + cWidth, y: cy + cHeight / 2 }, // Right
        { x: cx + cWidth / 2, y: cy + cHeight }, // Bottom
        { x: cx, y: cy + cHeight / 2 }, // Left
      ];

      midPoints.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, circleRadius, 0, 2 * Math.PI);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'red';
        ctx.stroke();
      });
    }
  }, [startCrop, cx, cy, cWidth, cHeight, originData]);

  // get init data
  useEffect(() => {
    if (!url) {
      return;
    }

    getImageSize(url)
      .then(async ({ width, height }) => {
        const data = await loadImage(url);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        if (!ctx) {
          return;
        }
        ctx.drawImage(data, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);

        setOriginData(imageData);
        setNewData(imageData);
        setWidth(width);
        setHeight(height);

        // 设置遮罩画布
        const maskCanvas = maskCanvasRef.current;
        if (maskCanvas) {
          maskCanvas.width = width;
          maskCanvas.height = height;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  // render canvas by imageData
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !url) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    if (newData) {
      canvas.width = newData.width;
      canvas.height = newData.height;
      ctx.putImageData(newData, 0, 0);
    }
  }, [newData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value || LENA_PATH);
  };

  // 这里返回一个数组，每个数组中的值都是一个效果；是一个结果
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
    if (!url || !originData) {
      return;
    }

    let nData: ImageData = originData;

    const newData = checkedValues.reduce((sum, item) => {
      const target = item as keyof typeof methodList;
      nData = methodList[target]?.(sum) || nData;
      return nData;
    }, nData);

    setNewData(newData);
  };

  // 这里是每次都会触发一个操作，是一个动作；
  const perChange = (op: string) => {
    if (!url || !newData) {
      return;
    }
    let nData: ImageData = newData;

    if (op === OP.leftRotate) {
      nData = leftRotate(nData) || nData;
    }
    if (op === OP.rightRotate) {
      nData = rightRotate(nData) || nData;
    }
    // 清空
    if (op === OP.reset) {
      nData = originData!;
    }
    setNewData(nData);
  };

  const handleSwitchCrop = (c: boolean) => {
    setCrop(c);
  };

  const [dragging, setDragging] = useState(false);

  const [resizing, setResizing] = useState(false);
  const [resizeIndex, setResizeIndex] = useState(-1);

  const getCanvasMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  const isMouseOnCircle = (
    mouseX: number,
    mouseY: number,
    circleX: number,
    circleY: number,
    radius: number,
  ) => {
    const dx = mouseX - circleX;
    const dy = mouseY - circleY;
    return dx * dx + dy * dy <= radius * radius;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasMousePosition(e);

    // Check if the mouse is inside the rectangle
    if (x >= cx && x <= cx + cWidth && y >= cy && y <= cy + cHeight) {
      setDragging(true);
      setOffset({ x: x - cx, y: y - cy });
    }

    // Check if the mouse is on the resize circle
    // (Add logic for checking if the mouse is on any of the resize circles)
    // Check if the mouse is on the resize circle
    const circleRadius = 10;
    const midPoints = [
      { x: cx + cWidth / 2, y: cy }, // Top
      { x: cx + cWidth, y: cy + cHeight / 2 }, // Right
      { x: cx + cWidth / 2, y: cy + cHeight }, // Bottom
      { x: cx, y: cy + cHeight / 2 }, // Left
    ];

    midPoints.forEach((point, index) => {
      if (isMouseOnCircle(x, y, point.x, point.y, circleRadius)) {
        setResizing(true);
        setResizeIndex(index);
        setOffset({ x: x - cx, y: y - cy });
      }
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
    setResizeIndex(-1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!originData) {
      return;
    }
    if (dragging) {
      const { x, y } = getCanvasMousePosition(e);

      const newX = x - offset.x;
      const newY = y - offset.y;

      // Check if the new position is within the canvas boundaries
      if (newX >= 0 && newX + cWidth <= originData?.width) {
        setX(newX);
      }
      if (newY >= 0 && newY + cHeight <= originData?.height) {
        setY(newY);
      }

      if (resizing) {
        const dx = x - cx;
        const dy = y - cy;

        switch (resizeIndex) {
          case 0: // Top
            setY(y);
            setHeight(cHeight - dy);
            break;
          case 1: // Right
            setWidth(dx);
            break;
          case 2: // Bottom
            setHeight(dy);
            break;
          case 3: // Left
            setX(x);
            setWidth(cWidth - dx);
            break;
          default:
            break;
        }
      }
    }
  };

  return (
    <PageContainer>
      <div className={styles.container}>
        <Row className={styles.row__container}>
          <Col span={24}>
            <Card>
              <Input value={url || LENA_PATH} onChange={handleChange} />
              <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                <Row>
                  {/* 滤镜 */}
                  <Col span={4}>
                    <Checkbox value={OP.toRed}>红色滤镜</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value={OP.toGreen}>绿色滤镜</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value={OP.toBlue}>蓝色滤镜</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value={OP.toGrey}>灰化</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value={OP.toBlackAndWhite}>黑白化</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value={OP.sharpen}>锐化</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value={OP.marginSharpen}>边缘锐化</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value={OP.toGaussianBlur} disabled>
                      高斯模糊
                    </Checkbox>
                  </Col>
                  {/* 翻转 */}
                  <Col span={4}>
                    <Checkbox value={OP.flipSideToSide}>左右翻转</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value={OP.flipUpsideDown}>上下翻转</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
              <div>
                <Button onClick={() => perChange(OP.leftRotate)}>
                  向左旋转
                </Button>
                <Button onClick={() => perChange(OP.rightRotate)}>
                  向右旋转
                </Button>
                <Button
                  onClick={() =>
                    downloadCanvasPart(canvasRef.current!, [
                      cx,
                      cy,
                      cWidth,
                      cHeight,
                    ])
                  }
                >
                  下载
                </Button>
                <Button onClick={() => perChange(OP.reset)}>清空效果</Button>
              </div>
            </Card>
          </Col>
          <Col span={16} className={styles.block__container}>
            <canvas ref={canvasRef} />
            <canvas
              ref={maskCanvasRef}
              className={styles.mask__canvas}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            />
          </Col>
          <Col span={8} className={styles.block__container}>
            <Form.Item label="开启裁剪">
              <Switch checked={startCrop} onChange={handleSwitchCrop} />
            </Form.Item>
            <Form.Item label="X">
              <Input
                type="number"
                value={cx}
                disabled={!startCrop}
                onChange={(e) => setX(Number(e.target.value))}
              />
            </Form.Item>
            <Form.Item label="Y">
              <Input
                type="number"
                value={cy}
                disabled={!startCrop}
                onChange={(e) => setY(Number(e.target.value))}
              />
            </Form.Item>
            <Form.Item label="width">
              <Input
                type="number"
                value={cWidth}
                disabled={!startCrop}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </Form.Item>
            <Form.Item label="height">
              <Input
                type="number"
                value={cHeight}
                disabled={!startCrop}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
}

export default ColorGrid;
