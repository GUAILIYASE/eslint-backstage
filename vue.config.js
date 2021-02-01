// vue的配置文件
module.exports = {
  devServer: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        ws: false,
        // 只需要改动target 改成后端接口的根路径
        // 我们把后端接口的根路径代理成立/api
        // 这种方式只存在开发阶段 如果项目上线了 后端会处理跨域
        target: "http://localhost:8888/api/private/v1/",
        changeOrigin: true,
        withCredentials: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
