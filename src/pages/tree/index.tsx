import React, { useEffect, useState } from "react";
import { CardTree } from "./component/cardTree";
import { Card } from "./component/card";
import { mockResult } from "../mock";
import { CardItem } from "./type";
import { cardConfig } from "./config";

export const Tree = () => {
  const [parent, setParent] = useState<CardItem[]>([]);
  const [peer, setPeer] = useState<CardItem[]>([]);
  const [children, setChildren] = useState<CardItem[]>([]);

  useEffect(() => {
    setParent([mockResult]);
    setPeer(mockResult.children ?? []);
    setChildren(mockResult.children?.find((v) => v.current)?.children ?? []);
    console.log(111);
    localStorage.setItem("bbb", "111");

    return () => {
      console.log(88888);
      alert(8888);
      localStorage.setItem("aaa", "111");
    };
  }, []);
  return (
    <div>
      <CardTree
        parent={parent}
        peer={peer}
        children={children}
        Card={(props) => <Card {...props} cardConfig={cardConfig} />}
        cardConfig={cardConfig}
      />
    </div>
  );
};

export default Tree;
