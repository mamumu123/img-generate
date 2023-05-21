export const getCanvasMousePosition = (
  canvas: HTMLCanvasElement,
  e: React.MouseEvent<HTMLCanvasElement>,
) => {
  if (!canvas) {
    return { x: 0, y: 0 };
  }
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { x, y };
};

export const isMouseOnCircle = (
  mouseX: number,
  mouseY: number,
  circleX: number,
  circleY: number,
  radius: number,
) => {
  const dx = mouseX - circleX;
  const dy = mouseY - circleY;
  return dx * dx + dy * dy <= radius * radius;
};
