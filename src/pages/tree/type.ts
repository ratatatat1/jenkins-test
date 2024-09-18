export type TreeType = {
  /** 卡片宽度 */
  width: number;
  /** 卡片高度 */
  height: number;
  /** 卡片间距 */
  cardSpace: number;
  /** 卡片顶部间距 */
  topSpace: number;
  /** 卡片底部间距 */
  downSpace: number;
};

export type CardItem = {
  id: number;
  name: string;
  current?: boolean;
  // peer?: CardItem[];
  hasNext: boolean;
  children?: CardItem[];
};
