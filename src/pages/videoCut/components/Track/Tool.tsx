import React from 'react';
import { Slider } from 'antd';

export const Tool = () => {
    console.log('11')
    return (
        <div style={{
            width: '100%',
            height: 50
        }}>
            <Slider defaultValue={1} min={5}
                max={20}
                step={1} />
        </div>
    )
}