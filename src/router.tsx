import { RouteProps } from "react-router-dom";
import { Jigsaw } from "./pages/jigsaw";
import { Tree } from "./pages/tree";

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
    path: "*",
    Component: Jigsaw,
  },
];
