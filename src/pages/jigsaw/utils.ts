export const getChangeIndex = (offsetX: number, offsetY: number) => {
  return ((offsetY / 100) | 0) * 3 + ((offsetX / 100) | 0);
};
export const getPackageName = () => {
  const packageName = localStorage.getItem("packageName") || "jigsaw-package";
  return packageName;
};