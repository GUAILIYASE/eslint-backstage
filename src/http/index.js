import axios from "axios";
import { Dialog } from "element-ui";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

let isPro = process.env.NODE_EVN === "progress";

const http = axios.create({
  baseURL: isPro ? "" : "/api",
  timeout: 10000
});

http.interceptors.request.use(
  config => {
    nprogress.start();
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    nprogress.done();
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  res => {
    nprogress.done();
    return res.data;
  },
  err => {
    nprogress.done();
    let status = err.response && err.response.stutas;
    if (status === 400) {
      Dialog({ message: "请求参数错误" });
    }
    if (status === 401) {
      Dialog({ message: "没有权限" });
    }
    if (status === 403) {
      Dialog({ message: "登录过期" });
    }
    if (status === 404) {
      Dialog({ message: "路径错误" });
    }
    if (status === 500) {
      Dialog({ message: "服务器出错" });
    }
    if (status === 503) {
      Dialog({ message: "服务器在维护" });
    }
    return Promise.reject(err);
  }
);

export default http;
