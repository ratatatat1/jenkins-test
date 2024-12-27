import { canvasConfig } from "./config";

export const getCanvasWidth = () => {
  return canvasConfig.width + canvasConfig.border * 2;
};

/**
 * 获取单元格行数
 * @param row 行数
 */
export const getItemWidth = (row: number) => {
  return (
    (getCanvasWidth() -
      (row - 1) * canvasConfig.space -
      canvasConfig.border * 2) /
    row
  );
};

export const getRandomIndex = (row: number) => {
  return (Math.random() * row * row) | 0;
};

export const getRandomColors = (colors: number[]) => {
  const list: number[] = [];
  let range = 50;

  for (let i = 0; i < 2; i++) {
    const cur_range = (range * Math.random()) | 0;
    list[i] =
      colors[i] - cur_range > 0 ? colors[i] - cur_range : colors[i] + cur_range;
    range -= cur_range;
  }
  list[2] = colors[2] - range > 0 ? colors[2] - range : colors[2] + range;

  return list;
};

/**
 * 获取点击的Index
 * @param row 当前行数
 * @param x offsetX
 * @param y offsetY
 * returns index
 */
export const getClickIndex = (row: number, x: number, y: number) => {
  const item_width = getItemWidth(row);

  const x_index =
    ((x - canvasConfig.border) / (item_width + canvasConfig.space)) | 0;
  const y_index =
    ((y - canvasConfig.border) / (item_width + canvasConfig.space)) | 0;
  return x_index + y_index * row;
};
