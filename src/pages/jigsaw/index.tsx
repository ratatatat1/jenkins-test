import React, { useEffect, useRef, useState } from "react";
import { Encrypt2 } from "@/assets";
import { getChangeIndex } from "./utils";
import "./index.less";

export const Jigsaw = () => {
  const [list, setList] = useState<number[]>([]); // index: image中的块, value: canvas中的块
  const [blankIndex, setBlankIndex] = useState(0);
  const [startStamp, setStartStamp] = useState<number | null>(null);
  const [initStamp, setInitStamp] = useState(Date.now());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>();

  const initImage = () => {
    const src = localStorage.getItem("jigsaw") || Encrypt2;
    imgRef.current = document.createElement("img");
    imgRef.current.src = src;
    imgRef.current.onload = () => {
      initRandomList();
    };
  };

  const initRandomList = () => {
    setBlankIndex(8);
    const list = new Array(8)
      .fill(0)
      .map((v, i) => i)
      .sort(() => (Math.random() > 0.5 ? 1 : -1));
    setList(list);
    initCanvas(list);
  };

  const getContext = () => {
    return canvasRef.current!.getContext("2d")!;
  };

  const initCanvas = (list: number[]) => {
    const ctx = getContext();
    ctx.clearRect(0, 0, 302, 302);

    list.forEach((v, i) => {
      drawBlock(v, i, imgRef.current);
    });
  };

  const drawBlock = (
    canvasIndex: number,
    imageIndex: number = 0,
    image?: HTMLImageElement
  ) => {
    const ctx = getContext();
    const canvasX = (canvasIndex % 3) * 101;
    const canvasY = ((canvasIndex / 3) | 0) * 101;
    if (image) {
      const imgX = (imageIndex % 3) * 100;
      const imgY = ((imageIndex / 3) | 0) * 100;
      ctx.drawImage(image, imgX, imgY, 100, 100, canvasX, canvasY, 100, 100);
    } else {
      ctx.clearRect(canvasX, canvasY, 100, 100);
    }
  };

  const handleMoveBlock = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!startStamp) {
      setStartStamp(Date.now());
    }
    const { offsetX, offsetY } = e.nativeEvent;
    const click_index = getChangeIndex(offsetX, offsetY);
    const img_index = list.findIndex((v) => v === click_index);
    const clone_list = [...list];
    if (
      (click_index + 1 === blankIndex && click_index % 3 !== 2) ||
      (click_index - 1 === blankIndex && click_index % 3) ||
      click_index + 3 === blankIndex ||
      click_index - 3 === blankIndex
    ) {
      clone_list[img_index] = blankIndex;
      drawBlock(blankIndex, img_index, imgRef.current);
      drawBlock(click_index);
      setBlankIndex(click_index);
      setList(clone_list);
    }
  };

  useEffect(() => {
    if (list.length && startStamp && list.every((v, i) => v === i)) {
      setTimeout(() => {
        alert(`你成功了，用时${(Date.now() - startStamp!) / 1000}秒`);
        setStartStamp(0);
        setInitStamp(Date.now());
      }, 0);
    }
  }, [list]);

  useEffect(() => {
    initImage();
  }, [initStamp]);

  return (
    <>
      <div className="container">
        <canvas
          onClick={handleMoveBlock}
          ref={canvasRef}
          width="302"
          height="302"
        />
      </div>
    </>
  );
};

export default Jigsaw;
