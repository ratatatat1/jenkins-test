import React, { useEffect, useRef, useState } from "react";
import {
  getCanvasHeight,
  getCanvasWidth,
  getClickMineIndex,
  GRID_SPACE,
  GRID_WIDTH,
  MineList,
} from "./config";

export const MineSweeper = () => {
  const [line] = useState<[number, number]>([10, 10]);
  const [mines, setMines] = useState<[number, number][]>([]);
  const [renderMineList, setRenderMineList] = useState<(MineList | number)[][]>(
    []
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initCanvas = () => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    for (let i = 0; i < line[0]; i++) {
      for (let j = 0; j < line[1]; j++) {
        context.beginPath();
        context.rect(
          i * GRID_WIDTH + i * GRID_SPACE,
          j * GRID_WIDTH + j * GRID_SPACE,
          GRID_WIDTH,
          GRID_WIDTH
        );
        context.fillStyle = "#eee";
        context.fill();
        context.closePath();
      }
    }
  };

  /** 初始化地雷 */
  const initMine = () => {
    const list: [number, number][] = [];
    // Ensure at least one mine is placed to prevent infinite recursion
    const totalCells = line[0] * line[1];
    const minMines = Math.max(1, Math.floor(totalCells * 0.05)); // At least 5% mines
    const maxMines = Math.floor(totalCells * 0.2); // At most 20% mines
    
    for (let i = 0; i < line[0]; i++) {
      for (let j = 0; j < line[1]; j++) {
        if (Math.random() < 0.1) {
          list.push([i, j]);
        }
      }
    }
    
    // If no mines or too few mines, add some randomly
    while (list.length < minMines) {
      const randomRow = Math.floor(Math.random() * line[0]);
      const randomCol = Math.floor(Math.random() * line[1]);
      const exists = list.some(([r, c]) => r === randomRow && c === randomCol);
      if (!exists) {
        list.push([randomRow, randomCol]);
      }
    }
    
    // If too many mines, remove some
    while (list.length > maxMines) {
      list.pop();
    }
    
    setMines(list);
  };

  const handleClickCanvas = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const click_line = getClickMineIndex(offsetX, offsetY);
    const render_list = updateBoard(click_line);
    const unopen_count = render_list.reduce((pre, cur) => {
      
      return pre + cur.filter(v => v === MineList.E).length
    }, 0)
    if(unopen_count === mines.length) {
      alert('你赢了')
      return
    }
    setRenderMineList(render_list);
    renderMine(render_list);
  };

  const updateBoard = (click: number[]): (MineList | number)[][] => {
    const board = structuredClone(renderMineList);
    const getIsMine = (x: number, y: number) =>
      mines.some((v) => v[0] === x && v[1] === y);
    if(getIsMine(click[0], click[1])) {
      alert('你被炸死了')

      throw Error('fail')
    }
    const m = board.length;
    const n = board[0].length;
    const isInScope = (x: number, y: number) =>
      x >= 0 && x < m && y >= 0 && y < n;

    const list = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    const getCount = (x: number, y: number) =>
      list.filter(
        (item) =>
          isInScope(x + item[0], y + item[1]) &&
          getIsMine(x + item[0], y + item[1])
      ).length;

    const step: Set<string> = new Set();

    const dfs = (x: number, y: number) => {
      if (!isInScope(x, y)) return;
      if (getIsMine(x, y)) {
        board[x][y] = MineList.X;
        return;
      }
      if (getCount(x, y) > 0) {
        board[x][y] = getCount(x, y);
        return;
      }
      if (step.has(`${x}-${y}`)) return;
      step.add(`${x}-${y}`);
      board[x][y] = MineList.B;
      for (let item of list) {
        dfs(x + item[0], y + item[1]);
      }
    };
    dfs(click[0], click[1]);
    return board;
  };

  const renderE = (i: number, j: number, context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.rect(
      i * GRID_WIDTH + i * GRID_SPACE,
      j * GRID_WIDTH + j * GRID_SPACE,
      GRID_WIDTH,
      GRID_WIDTH
    );
    context.fillStyle = "#eee";
    context.fill();
    context.closePath();
  };

  const renderB = (i: number, j: number, context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.rect(
      i * GRID_WIDTH + i * GRID_SPACE,
      j * GRID_WIDTH + j * GRID_SPACE,
      GRID_WIDTH,
      GRID_WIDTH
    );
    context.fillStyle = "#ddd";
    context.fill();
    context.closePath();
  };
  
  const renderText = (text: number, i: number, j: number, context: CanvasRenderingContext2D) => {
    context.font = `20px Arial`
    context.fillStyle = 'green'
    context.textAlign = 'center'
    context.fillText(`${text}`, i * GRID_WIDTH + i * GRID_SPACE + GRID_WIDTH / 2,
      j * GRID_WIDTH + j * GRID_SPACE + GRID_WIDTH * .9, GRID_WIDTH)
  }

  const renderX = (i: number, j: number, context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.rect(
      i * GRID_WIDTH + i * GRID_SPACE,
      j * GRID_WIDTH + j * GRID_SPACE,
      GRID_WIDTH,
      GRID_WIDTH
    );
    context.fillStyle = "#ff0";
    context.fill();
    context.closePath();
  };

  const renderMine = (render_list: (MineList | number)[][]) => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    for (let i = 0; i < line[0]; i++) {
      for (let j = 0; j < line[1]; j++) {
        if(typeof render_list[i][j] === 'number') {
          renderText(render_list[i][j], j, i, context)
        }
        switch (render_list[i][j]) {
          case MineList.E:
            renderE(j, i, context);
            break;
          case MineList.X:
            renderX(j, i, context);
            break;
          case MineList.B:
            renderB(j, i, context);
            break;
        }
      }
    }
  };

  useEffect(() => {
    initCanvas();
    setRenderMineList(
      new Array(line[0]).fill(0).map((v) => new Array(line[1]).fill(MineList.E))
    );
    initMine();
  }, []);

  return (
    <div>
      <canvas
        onClick={handleClickCanvas}
        width={getCanvasWidth(line[0])}
        height={getCanvasHeight(line[1])}
        ref={canvasRef}
      />
    </div>
  );
};
