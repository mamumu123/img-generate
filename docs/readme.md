## 背景

> 一句话，用 `canvas.drawImage` 实现头像拼接，图片增加装饰，获取图片点击处颜色等功能；

### 项目背景

![](https://game.mhcdkey.com/picture/wenda/20230213/nsz1dfmd3t2.jpg) 在玩蛋仔派对的时候，觉得换肤很有意思。在逛开源社区的时候，看到了用 `canvas.drawImage` 实现同样效果的项目。（体验：[头像拼接](https://mamumu123.github.io/img-generate/)） ![](2.png) 继续逛下去发现有很多场景的实现原理都是相同的。

### drawImage

drawImage 可以将图片绘制到画布上面。

#### api 介绍

重载了三种函数入参，可以设置图片的宽高和对原始图片的裁剪。

```js
//在画布上定位图像：
drawImage(image, dx, dy);
// 在画布上定位图像，并规定图像的宽度和高度：
drawImage(image, dx, dy, dWidth, dHeight);
//剪切图像，并在画布上定位被剪切的部分：
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

#### 一个最简单的 demo

先创建一个 image 元素

```js
const loadImage = (src: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
```

在图片加载好以后，将调用 drawImage 函数，将图片绘制到 canvas 中

```js
ctx?.drawImage(item, 0, 0, 200, 200);
```
