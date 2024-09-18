import { lazy } from "react";
import { RouteProps } from "react-router-dom";

export const routeMapList: RouteProps[] = [
  {
    path: "jigsaw",
    Component: lazy(() => import("./pages/jigsaw")),
  },
  {
    path: "tree",
    Component: lazy(() => import("./pages/tree")),
  },
  {
    path: "*",
    Component: lazy(() => import("./pages/jigsaw")),
  },
];
