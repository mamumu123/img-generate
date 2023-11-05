// 运行时配置
import './app.less';

const Footer = () => {
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


export const layout = () => {
  return {
    logo: '/water.png',
    // breakpoint: false,
    // defaultCollapsed: true,
    menu: {
      locale: false,
    },
    // footerRender: () => <Footer />,
  };
};