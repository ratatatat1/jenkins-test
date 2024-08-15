import { ReactNode } from 'react';

export type ColumnsType = {
  title: string;
  dataIndex: string;
  key: any;
  isFilter?: boolean;
  [props: string]: any
}

export type MenuItemType = {
    item: string;
    route: string;
    id?: string;
    isLazy?: boolean;
    sub?: MenuItemType[];
    type: string;
    icon?: ReactNode,
}
