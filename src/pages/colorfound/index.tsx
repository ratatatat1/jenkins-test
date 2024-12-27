import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import { canvasConfig } from "./config";
import {
  getCanvasWidth,
  getClickIndex,
  getItemWidth,
  getRandomColors,
  getRandomIndex,
} from "./utils";

export const ColorFound = () => {
  const [row, setRow] = useState(1);
  const [randomIndex, setRandomIndex] = useState(-1);
  const [refreshKey, setRefreshKey] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    const canvasWidth = getCanvasWidth();
    const itemWidth = getItemWidth(row);

    ctx!.clearRect(
      canvasConfig.border,
      canvasConfig.border,
      canvasWidth,
      canvasWidth
    );

    const colors = [
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
    ];
    const random_colors = getRandomColors(colors);

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < row; j++) {
        const x =
          i * (itemWidth + canvasConfig.space) +
          canvasConfig.border -
          canvasConfig.space;
        const y =
          j * (itemWidth + canvasConfig.space) +
          canvasConfig.border -
          canvasConfig.space;

        if (i + j * row !== randomIndex) {
          ctx!.fillStyle = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
        } else {
          ctx!.fillStyle = `rgb(${random_colors[0]}, ${random_colors[1]}, ${random_colors[2]})`;
        }
        ctx!.fillRect(x, y, itemWidth, itemWidth);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { offsetX, offsetY } = e.nativeEvent;

    const click_index = getClickIndex(row, offsetX, offsetY);
    if (click_index === randomIndex) {
      let next_random_index = getRandomIndex(row);
      while (next_random_index === randomIndex) {
        next_random_index = getRandomIndex(row);
      }
      setRandomIndex(getRandomIndex(row));
    } else {
      alert(`你失败了,得分为:${(row - 2) * 10}`);
      setRefreshKey(Date.now());
    }
  };

  useEffect(() => {
    setRow(1);
    setRandomIndex(getRandomIndex(2));
  }, [refreshKey]);

  useEffect(() => {
    if (randomIndex === -1) return;
    setRow(row + 1);
  }, [randomIndex]);

  useEffect(() => {
    renderCanvas();
  }, [row]);

  return (
    <div className="container">
      <h2 className="title">找颜色</h2>
      <canvas
        onClick={(e) => handleClick(e)}
        width={getCanvasWidth()}
        height={getCanvasWidth()}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};
