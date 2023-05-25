import { useState, useEffect } from 'react';

const useForceUpdate = () => {
    const [value, setValue] = useState(0);

    const forceUpdate = () => {
        setValue((prevValue) => prevValue + 1);
    };

    useEffect(() => {
        // 当 value 发生变化时，组件将重新渲染
    }, [value]);

    return forceUpdate;
};

export {
    useForceUpdate
};