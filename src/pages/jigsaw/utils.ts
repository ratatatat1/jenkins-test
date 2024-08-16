export const getChangeIndex = (offsetX: number, offsetY: number) => {
  return ((offsetY / 100) | 0) * 3 + ((offsetX / 100) | 0);
};
