## 背景

> 一句话描述，用 `canvas.drawImage` 实现头像拼接，图片增加装饰，获取图片点击处颜色等功能；

### 关键词

canvas、drawImage、 demo、头像拼接、颜色选取

### 项目背景

![](https://game.mhcdkey.com/picture/wenda/20230213/nsz1dfmd3t2.jpg)

在玩蛋仔派对的时候，觉得换肤很有意思。在逛开源社区的时候，看到了用 `canvas.drawImage` 实现同样效果的项目（[gclx-official](https://github.com/lxdao-official/gclx-official)）。

继续逛下去发现有很多场景的实现原理都是相同的。

### drawImage

`drawImage` 可以将图片绘制到画布上面。

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

在图片加载好以后，再调用 drawImage 函数，将图片绘制到画布中

```js
ctx?.drawImage(item, 0, 0, 200, 200);
```

![3.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be07ab2e74434956b7a66ceb943c1733~tplv-k3u1fbpfcp-watermark.image?)

这样，一张图片就被画到画布上面了。

## 拼接头像

体验地址：[头像拼接](https://mamumu123.github.io/img-generate/)

![2.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/151cfb84e899446d96862ed1d83b8985~tplv-k3u1fbpfcp-watermark.image?)

如果要实现拼接头像的功能，就是将几张图片叠加绘制到画布上去。

### 核心代码

核心代码就两行

1. 加载需要的图片
2. 将图片绘制到画布中

```js
const imagesObj = await Promise.all(images.map(loadImage));
imagesObj.forEach((item) => {
  ctx?.drawImage(item, 0, 0, 200, 200);
});
```

其他的就是一些细节的调整，比如发型要放到画布最下面；每次渲染的时候需要清理一下画布等。

## 节日气氛

功能描述：就是在节日的时候，可以在头像上增加一些节日的装饰，增加节日气氛。体验地址：[节日气氛](https://mamumu123.github.io/img-generate/flower)

![4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b00291bb54f4874a404c6e1b36499fa~tplv-k3u1fbpfcp-watermark.image?)

### 核心代码

主要还是将头像和装饰部分的图片按顺序绘制上去。

```js
const images = [imageUrl, imgSelect].filter((i) => !!i);
const imagesObj = await Promise.all(images.map(loadImage));
imagesObj.forEach((item) => {
  ctx?.drawImage(item, 0, 0, 200, 200);
});
```

## 颜色获取

功能描述：每次点击图片，背景色都会变成点击部分的颜色。截图：

![5.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/341742877df14192a6b242af8dcc9a56~tplv-k3u1fbpfcp-watermark.image?)

### 核心代码

`getImageData` 可以获取 `canvas` 某一个点的坐标值和颜色值。

```js
function getColor(x: number, y: number) {
          const imageData = ctx!.getImageData(x, y, 1, 1);
          const pixel = imageData.data; // data： 类型为Uint8ClampedArray的一维数组，每四个数组元素代表了一个像素点的RGBA信息，每个元素数值介于0~255
          const [r, g, b, aBefore] = pixel;
          const a = Math.round(aBefore / 255);
          const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
          return {
            rgba,
          };
        }
```

所以整个流程是这样子的：

- 将图片绘制到 canvas 上
- 注册 canvas 的 click 事件
- 当监听到 `click` 事件，进行计算，获取点击所在的点在 canvas 上的坐标（x,y)
- 计算画布上坐标(x,y）的颜色值，将该值绘制到背景上

## 参考地址

[HTML canvas drawImage() 方法](https://www.runoob.com/tags/canvas-drawimage.html)

## 项目地址：

[github](https://github.com/mamumu123/img-generate)

觉得有点意思就给个 star 吧。

## 体验地址：

[头像拼接](https://mamumu123.github.io/img-generate/)
