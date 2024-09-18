import React from "react";
import { Route, Routes } from "react-router-dom";
import { routeMapList } from "./router";

export default () => {
  return (
    <Routes>
      {routeMapList.map((v) => (
        <Route {...v} key={v.path} />
      ))}
    </Routes>
  );
};
