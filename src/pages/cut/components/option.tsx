import { Checkbox, Col, Row } from 'antd';
import React from 'react';

interface Option {
  key: string;
  label: string;
}

interface IFilterCheckboxes {
  options: Option[];
}

export const FilterCheckboxes: React.FC<IFilterCheckboxes> = ({
  options,
}: IFilterCheckboxes) => {
  console.log('options', Object.entries(options));
  return (
    <Row>
      {options.map((item) => (
        <Col span={4} key={item.key}>
          <Checkbox value={item.key}>{item.label}</Checkbox>
        </Col>
      ))}
    </Row>
  );
};

// );
