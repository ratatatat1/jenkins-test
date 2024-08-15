import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/common.css";
import "./assets/styles/antdCommon.less";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        fontSize: 14,
      },
    }}
  >
    <App />
  </ConfigProvider>
);
