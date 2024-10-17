import { RouteProps } from "react-router-dom";
import { Jigsaw } from "./pages/jigsaw";
import { Tree } from "./pages/tree";
import { JigsawVideo } from "./pages/video-play";

export const routeMapList: RouteProps[] = [
  {
    path: "jigsaw",
    Component: Jigsaw,
  },
  {
    path: "tree",
    Component: Tree,
  },
  {
    path: "video-play",
    Component: JigsawVideo,
  },
  {
    path: "*",
    Component: Jigsaw,
  },
];
