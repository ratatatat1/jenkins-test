import axios from "axios";
import { message } from "antd";

const HTTP = axios.create({
  baseURL: "/",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

HTTP.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    message.error(error.response.data.message);
    if (error.response.status === 401 || error.response.data.code === "11401") {
      location.replace(`/ui/login`);
    }
    throw Error(error);
  }
);

HTTP.interceptors.request.use(
  async (config: any) => {
    return config;
  },
  (error) => {
    // console.log('[request fail from sc]', error); // message.error('系统错误');
  }
);

export { HTTP as request };
