import { CardItem } from "./tree/type";

export const mockResult: CardItem = {
  id: 1,
  name: "1",
  hasNext: true,
  children: [
    {
      id: 11,
      name: "11",
      hasNext: true,
      children: [
        {
          id: 111,
          name: "111",
          hasNext: true,
        },
        {
          id: 112,
          name: "112",
          hasNext: true,
        },
        {
          id: 113,
          name: "113",
          hasNext: true,
        },
        {
          id: 114,
          name: "114",
          hasNext: true,
        },
      ],
    },
    {
      id: 12,
      name: "12",
      hasNext: true,
      current: true,
      children: [
        {
          id: 121,
          name: "121",
          hasNext: false,
          children: [],
        },
        {
          id: 122,
          name: "122",
          hasNext: false,
          children: [],
        },
        {
          id: 123,
          name: "123",
          hasNext: false,
          children: [],
        },
        {
          id: 124,
          name: "124",
          hasNext: false,
          children: [],
        },
        {
          id: 125,
          name: "125",
          hasNext: false,
          children: [],
        },
      ],
    },
    {
      id: 13,
      name: "13",
      hasNext: false,
    },
  ],
};
