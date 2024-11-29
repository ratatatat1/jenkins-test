/** 行宽 */
export const GRID_WIDTH = 20;
/** 空白宽度 */
export const GRID_SPACE = 1;

/**
 *  * 'M' 代表一个 未挖出的 地雷，
'E' 代表一个 未挖出的 空方块，
'B' 代表没有相邻（上，下，左，右，和所有4个对角线）地雷的 已挖出的 空白方块，
数字（'1' 到 '8'）表示有多少地雷与这块 已挖出的 方块相邻，
'X' 则表示一个 已挖出的 地雷。
 */

export enum MineList {
  /** 未挖出的 地雷 */
  M = "M",
  /** 未挖出的 空方块 */
  E = "E",
  /** 已挖出的 空白方块 */
  B = "B",
  /** 已挖出的 地雷 */
  X = "X",
}

export const getCanvasWidth = (line: number) => {
  return line * (GRID_WIDTH + GRID_SPACE) - GRID_SPACE;
};

export const getCanvasHeight = (line: number) => {
  return line * (GRID_WIDTH + GRID_SPACE) - GRID_SPACE;
};

export const getClickMineIndex = (offsetX: number, offsetY: number) => {
  console.log(
    offsetX,
    GRID_SPACE + GRID_SPACE,
    offsetY,
    offsetX / (GRID_WIDTH + GRID_SPACE),
    offsetY / (GRID_WIDTH + GRID_SPACE)
  );
  return [
    (offsetX / (GRID_WIDTH + GRID_SPACE)) | 0,
    (offsetY / (GRID_WIDTH + GRID_SPACE)) | 0,
  ];
};
