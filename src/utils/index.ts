export const loadImage: (src: string) => Promise<CanvasImageSource> = (
  src: string,
) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(null);
    img.src = src;
  });

export function isWeChat() {
  return /MicroMessenger/i.test(window.navigator.userAgent);
}
