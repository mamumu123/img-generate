import { Checkbox, Row } from 'antd';
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
}: IFilterCheckboxes) => (
  <Row>
    {options.map((item) => (
      <Checkbox value={item.key} key={item.key}>
        {item.label}
      </Checkbox>
    ))}
  </Row>
);
