import { durationToTime } from "./common";


/**
 *@description 绘制背景
 * @param {Object} canvas canvas绘画区
 * @param {Object} ctx 画笔
 * @param {String} backgroundColor 背景色 默认#529393
 */
export const drawBackground = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, backgroundColor = "#529393") => {
    if (!canvas || !ctx) return;
    const { width, height } = canvas;
    //清空一个矩形 (清空上一个背景)
    ctx.clearRect(0, 0, width, height);
    //设置填充绘画的颜色
    ctx.fillStyle = backgroundColor;
    //填充出一个矩形 （绘制背景）
    ctx.fillRect(0, 0, width, height);
};

//获取总长度 （共有多少格） 1秒=1大格=10个小格 duration是尺子表示的时长 单位s
export function getLength(duration: number) {
    return duration * 10;
}

//获取间距 实际宽度px / (时长 * 10)
export function getGap(width: number, length: number) {
    return Number(Number(width / length).toFixed(3));
}

//获得开始时间
export function getBegin(currentTime: number, duration: number) {
    //起始时间
    return Math.floor(currentTime / duration) * duration;
}

/*
 * @description 绘制尺子
 * @param {Object} canvas canvas绘画区
 * @param {Object} ctx 画笔
 * @param {number} pixelRatio 屏幕像素比
 * @param {number} duration 时间长度
 * @param {number} currentTime 当前时间
 */
export const drawRuler = (
    canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
    pixelRatio = 1,
    duration = 15,
    currentTime = 0
) => {
    if (!canvas || !ctx) return;
    const { width } = canvas;
    const fontSize = 7;
    const fontHeight = 15;
    const fontTop = 30;
    //字体
    ctx.font = `${fontSize * pixelRatio}px Arial`;
    //颜色
    ctx.fillStyle = "#fff";
    //尺子单位长度 （有几格
    const length = getLength(duration);
    //每格间距
    const gap = getGap(width, length);
    //起始时间
    const begin = getBegin(currentTime, duration);
    let second = -1;
    for (let index = 0; index < length; index += 1) {
        //十格间距
        if (index % 10 === 0) {
            second += 1;
            // x , y , w, h
            ctx.fillRect(index * gap, 0, pixelRatio, fontHeight * pixelRatio);
            ctx.fillText(
                // text x y maxWdith
                durationToTime(begin + second).split(".")[0],
                gap * index - fontSize * pixelRatio * 2 + pixelRatio,
                fontTop * pixelRatio
            );
        } else if (index % 5 === 0) {
            ctx.fillRect(index * gap, 0, pixelRatio, (fontHeight * pixelRatio) / 1.5);
        } else {
            ctx.fillRect(index * gap, 0, pixelRatio, (fontHeight * pixelRatio) / 3);
        }
    }
};

interface IDrawPointer {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    pixelRatio: number
    duration: number
    currentTime: number
    color: string,
    pointerWidth: number
}

export const drawPointer = ({
    canvas,
    ctx,
    pixelRatio = 1,
    duration = 10,
    currentTime = 5,
    color = 'red',
    pointerWidth = 2 }: IDrawPointer
) => {
    if (!canvas || !ctx) {
        return
    }
    const { width, height } = canvas;
    ctx.fillStyle = color
    const length = getLength(duration);

    // 偏移
    const gap = getGap(width, length)

    const begin = getBegin(currentTime, duration);

    ctx.fillRect(
        Number(((currentTime - begin) * 10 * gap).toFixed(3)), // x
        0,  // y
        pointerWidth * pixelRatio, // width
        height, // height
    )

}

export function clamp(num: number, a: number, b: number) {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
}