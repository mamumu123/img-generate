import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import Markdown from 'markdown-to-jsx'
import { Footer } from '@/footer'
const readme = `
## 文档地址

[canvas 实战 - 头像组装、颜色选取](https://juejin.cn/post/7212996764387442745) 

[web 图像处理 - 从零实现一个照片剪辑器](https://juejin.cn/post/7235294096951902266)

[如何用 ffmpeg + canvas 写一个在线可视化音视频编辑工具](https://juejin.cn/post/7248932545474068540)

## 项目介绍


### 图像处理（图片裁剪）

功能描述：通过 canvas 的 ImageData， 实现了一个基础的图像处理工具。可以在浏览器对图片进行左右镜像、左右旋转、颜色滤镜、尺寸修改等操作。



### 视频处理工具
功能描述：用 ffmpeg + canvas 实现一个在线可视化音视频编辑工具



### 拼接头像

功能描述：组装头像 

### 节日气氛

功能描述：就是在节日的时候，可以在头像上增加一些节日的装饰，增加节日气氛。


### 颜色获取

功能描述：每次点击图片，背景色都会变成点击部分的颜色.


`
const HomePage: React.FC = () => {
    console.log(111);

    return (
        <PageContainer ghost>
            <div className={styles.container}>
                <Markdown>
                    {readme}
                </Markdown>
            </div>
            <Footer />
        </PageContainer>
    );
};

export default HomePage;
