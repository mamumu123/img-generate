// 运行时配置
import React from 'react';
import './app.less';

const Footer = () => {
  console.log('1')
  return (<footer>
    <div>
      关于我们
      联系我们
    </div>
    <div>
      <img crossOrigin='anonymous' src='/beian.png' alt="" style={{ width: 16 }} />
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=11010502053810" rel="noreferrer" target="_blank">京公网安备11010502053810</a>
      <a href="https://beian.miit.gov.cn/" target="_blank" >  &nbsp;&nbsp;  京ICP备2023029298号 </a>
    </div>
  </footer>
  )
}

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '' };
}

export const layout = () => {
  return {
    breakpoint: false,
    defaultCollapsed: true,
    menu: {
      locale: false,
    },
    footerRender: () => <Footer />,
  };
};