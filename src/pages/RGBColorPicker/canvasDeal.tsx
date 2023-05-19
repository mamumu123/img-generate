import { PageContainer } from '@ant-design/pro-components';
import { Col, Row, Input, Checkbox, Card, Button } from 'antd';
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
import { download } from '@/utils/download';

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

  const newCanvasRef = useRef<HTMLCanvasElement>(null);
  const [newData, setNewData] = useState<ImageData | null>();
  const [originData, setOriginData] = useState<ImageData | null>();

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
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  // render canvas by imageData
  useEffect(() => {
    const canvas = newCanvasRef.current;
    if (!canvas || !url) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    console.log('newData', newData);

    if (newData) {
      canvas.width = newData.width;
      canvas.height = newData.height;
      ctx.putImageData(newData, 0, 0);
    }
  }, [newData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);

    // TODO:
    setUrl(LENA_PATH);
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

  return (
    <PageContainer>
      <div className={styles.container}>
        <Row className={styles.row__container}>
          <Col span={24}>
            url:
            <Input value={url || LENA_PATH} onChange={handleChange} />
            <Card>
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
                <Button onClick={() => download(newCanvasRef)}>下载</Button>
                <Button onClick={() => perChange(OP.reset)}>清空效果</Button>
              </div>
            </Card>
          </Col>
          <Col span={24} className={styles.block__container}>
            <canvas ref={newCanvasRef} />
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
}

export default ColorGrid;
