import React, { useEffect, useRef } from "react";
import "./index.less";
import { BigBuckVideo } from "../../assets";

export const JigsawVideo = () => {
  const canvasRefs = useRef<Array<HTMLCanvasElement>>([]);
  const videoRef = useRef<HTMLVideoElement>();

  const draw = () => {
    let index = 0;
    for (const each of canvasRefs.current) {
      const context = each.getContext("2d")!;
      context.drawImage(
        videoRef.current!,
        -100 * (index % 3),
        -100 * ((index / 3) | 0),
        300,
        300
      );
      index++;
    }
    requestAnimationFrame(draw);
  };

  const initVideo = () => {
    const video = document.createElement("video");
    video.src = BigBuckVideo;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    if (video.paused) {
      video.play();
    }
    videoRef.current = video;
  };

  useEffect(() => {
    initVideo();
    canvasRefs.current = Array.from(
      document.getElementsByClassName(
        "my-canvas"
      ) as HTMLCollectionOf<HTMLCanvasElement>
    );

    draw();
  }, []);

  return (
    <div className="video-game-container">
      <div className="video-container">
        <canvas width="100" height="100" className="my-canvas"></canvas>
        <canvas width="100" height="100" className="my-canvas"></canvas>
        <canvas width="100" height="100" className="my-canvas"></canvas>
        <canvas width="100" height="100" className="my-canvas"></canvas>
        <canvas width="100" height="100" className="my-canvas"></canvas>
        <canvas width="100" height="100" className="my-canvas"></canvas>
        <canvas width="100" height="100" className="my-canvas"></canvas>
        <canvas width="100" height="100" className="my-canvas"></canvas>
        <canvas width="100" height="100" className="my-canvas"></canvas>
      </div>
    </div>
  );
};
