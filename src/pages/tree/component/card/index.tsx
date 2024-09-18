import React from "react";
import { CardItem, TreeType } from "../../type";
type Iprops = {
  item: CardItem;
  cardConfig: TreeType;
  isLast: boolean;
};
export const Card = (props: Iprops) => {
  const { item, cardConfig, isLast } = props;
  return (
    <div
      style={{
        marginRight: isLast ? 0 : cardConfig.cardSpace,
        width: `${cardConfig.width}px`,
        height: `${cardConfig.height}px`,
      }}
      className={`border text-center flex-shrink-0`}
    >
      {item.name}
    </div>
  );
};
