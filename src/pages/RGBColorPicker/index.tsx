import { useState } from 'react';
import { Slider, Row, Col } from 'antd';

function RGBAColorPicker() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [alpha, setAlpha] = useState(1);

  const colorStyle = {
    width: '200px',
    height: '200px',
    backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha})`,
  };

  return (
    <div>
      <Row>
        <Col span={4}>Red:</Col>
        <Col span={16}>
          <Slider
            min={0}
            max={255}
            value={red}
            onChange={(value) => setRed(value)}
          />
        </Col>
        <Col span={4}>{red}</Col>
      </Row>
      <Row>
        <Col span={4}>Green:</Col>
        <Col span={16}>
          <Slider
            min={0}
            max={255}
            value={green}
            onChange={(value) => setGreen(value)}
          />
        </Col>
        <Col span={4}>{green}</Col>
      </Row>
      <Row>
        <Col span={4}>Blue:</Col>
        <Col span={16}>
          <Slider
            min={0}
            max={255}
            value={blue}
            onChange={(value) => setBlue(value)}
          />
        </Col>
        <Col span={4}>{blue}</Col>
      </Row>
      <Row>
        <Col span={4}>Alpha:</Col>
        <Col span={16}>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={alpha}
            onChange={(value) => setAlpha(value)}
          />
        </Col>
        <Col span={4}>{alpha.toFixed(2)}</Col>
      </Row>
      <div style={colorStyle}></div>
    </div>
  );
}

export default RGBAColorPicker;
