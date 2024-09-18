import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CardItem, TreeType } from "../../type";

type Iprops = {
  Card: React.ComponentType<any>;
  parent: CardItem[];
  peer: CardItem[];
  children: CardItem[];
  cardConfig: TreeType;
};

const lineStyle = {
  stroke: "#FF0000",
  strokeWidth: 1,
};

export const CardTree = (props: Iprops) => {
  const { Card, cardConfig, parent, peer, children } = props;
  const { width, height, cardSpace, topSpace, downSpace } = cardConfig;
  const [extendLine, setExtendLine] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const peerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  const getLayout = (
    base_width: number,
    list: any[]
  ): { width: number; offsetLeft: number; scrollLeft: number } => {
    const offsetLeft = getOffsetLeft(base_width);

    return {
      width: base_width + (list.length - 1) * (cardSpace + width) - offsetLeft,
      offsetLeft,
      scrollLeft: (((list.length - 1) / 2) | 0) * (cardSpace + width),
    };
  };

  const getOffsetLeft = (base_width: number) => {
    return Math.max(0, (base_width - (width + cardSpace)) / 2);
  };

  const layerInfo = useMemo(() => {
    if (!containerRef.current)
      return {
        parent: {
          width: 0,
          list: [],
          scrollLeft: 0,
          offsetLeft: 0,
        },
        peer: {
          width: 0,
          list: [],
          offsetLeft: 0,
          scrollLeft: 0,
          currentIndex: 0,
        },
        children: {
          width: 0,
          list: [],
          offsetLeft: 0,
          scrollLeft: 0,
        },
      };
    const base_width = containerRef.current.offsetWidth;

    // me居中
    const me = peer.find((v) => v.current)!;
    const render_peer = [...peer].filter((v) => !v.current);
    render_peer.splice(((peer.length - 1) / 2) | 0, 0, me);

    return {
      parent: {
        ...getLayout(base_width, [parent]),
        list: parent,
      },
      peer: {
        ...getLayout(base_width, peer),
        list: render_peer,
        currentIndex: ((peer.length - 1) / 2) | 0,
      },
      children: {
        ...getLayout(base_width, children),
        list: children,
      },
    };
  }, [parent, peer, children]);

  const ChildLine = useCallback(
    (props: { list: any[]; index: number; isParent?: boolean }) => {
      const { list, index, isParent } = props;
      const x_center = index * (width + cardSpace) + width / 2;

      return (
        <svg
          style={{ marginTop: 1 }}
          width={list.length * (width + cardSpace)}
          height={downSpace}
        >
          {!isParent && (
            <line
              style={lineStyle}
              y1={downSpace}
              y2={downSpace}
              x1={x_center}
              x2={extendLine}
            />
          )}
          {/* 竖线 */}
          <line
            style={lineStyle}
            y1={0}
            y2={height}
            x1={x_center}
            x2={x_center}
          ></line>
        </svg>
      );
    },
    [extendLine]
  );

  const TopLine = useCallback((props: { list: any[] }) => {
    const { list } = props;

    return (
      <svg width={list.length * (width + cardSpace)} height={topSpace}>
        {list.map((v, i) => (
          <>
            <line
              style={lineStyle}
              key={i}
              y1={0}
              y2={height}
              x1={i * (width + cardSpace) + width / 2}
              x2={i * (width + cardSpace) + width / 2}
            ></line>
            {i !== list.length - 1 && (
              <line
                style={lineStyle}
                key={v.id}
                y1={0}
                y2={0}
                x1={i * (width + cardSpace) + width / 2}
                x2={(i + 1) * (width + cardSpace) + width / 2}
              ></line>
            )}
          </>
        ))}
      </svg>
    );
  }, []);

  const handleScroll = () => {
    const childrenScroll = childrenRef.current!.scrollLeft;
    const peerScroll = peerRef.current!.scrollLeft;
    const cur_index = layerInfo.peer.currentIndex;
    const line_pos = cur_index * (width + cardSpace);
    const min_pos = -childrenScroll;
    const max_pos =
      (width + cardSpace) * (layerInfo.children.list.length - 1) -
      childrenScroll;
    const center = cur_index * (width + cardSpace) + width / 2;
    if (line_pos - peerScroll < min_pos) {
      setExtendLine(
        cur_index * (width + cardSpace) +
          width / 2 +
          min_pos -
          (line_pos - peerScroll)
      );
    } else if (line_pos - peerScroll > max_pos) {
      setExtendLine(
        cur_index * (width + cardSpace) +
          width / 2 +
          max_pos -
          (line_pos - peerScroll)
      );
    } else {
      setExtendLine(center);
    }
  };

  useEffect(() => {
    parentRef.current!.scrollLeft = layerInfo.parent?.scrollLeft;
    peerRef.current!.scrollLeft = layerInfo.peer?.scrollLeft;
    childrenRef.current!.scrollLeft = layerInfo.children?.scrollLeft;
  }, [layerInfo]);

  useEffect(() => {
    childrenRef.current?.addEventListener("scroll", handleScroll);
    peerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      childrenRef.current?.removeEventListener("scroll", handleScroll);
      peerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [layerInfo]);

  return (
    <div ref={containerRef}>
      <div ref={parentRef}>
        <div
          style={{
            width: layerInfo?.parent.width,
            marginLeft: layerInfo.parent.offsetLeft,
          }}
        >
          {layerInfo.parent.list.map((item) => (
            <Card
              key={item.id}
              item={item}
              cardConfig={cardConfig}
              isLast={true}
            />
          ))}
          <ChildLine list={layerInfo.parent.list} index={0} isParent={true} />
        </div>
      </div>
      <div ref={peerRef} className="overflow-auto">
        <div
          style={{
            width: layerInfo.peer.width,
            marginLeft: layerInfo.peer.offsetLeft,
          }}
        >
          <TopLine list={layerInfo.peer.list} />

          <div className="flex">
            {layerInfo.peer.list.map((item, index) => (
              <Card
                key={item.id}
                item={item}
                cardConfig={cardConfig}
                isLast={index === layerInfo.peer.list.length - 1}
              />
            ))}
          </div>
          <ChildLine
            list={layerInfo.peer.list}
            index={layerInfo.peer.list.findIndex((v) => v.current)}
          />
        </div>
      </div>
      <div className="overflow-auto" ref={childrenRef}>
        <div
          style={{
            width: layerInfo.children.width,
            marginLeft: layerInfo.children.offsetLeft,
          }}
        >
          <TopLine list={layerInfo.children.list} />
          <div className="flex">
            {layerInfo.children.list.map((item, index) => (
              <Card
                key={item.id}
                item={item}
                cardConfig={cardConfig}
                isLast={index === layerInfo.children.list.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
