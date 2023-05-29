export function getImageSize(
  url: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = (error) => {
      console.error('error', error)
      reject(new Error('Failed to load image'));
    };
    img.crossOrigin = 'anonymous';
    img.src = url;
  });
}
