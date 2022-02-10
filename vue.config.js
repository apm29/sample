const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "/";
const path = require("path");

module.exports = {
  publicPath: BASE_URL,
  assetsDir: "assets",
  productionSourceMap: false,
  devServer: {
    port: 6233,
    open: false,
    host: "0.0.0.0",
    https: false,
    hotOnly: false,
    proxy: {
      "/v3": {
        target: "http://115.239.163.146:8001/",
        changeOrigin: true,
      },
    },
  },
  chainWebpack(config) {
    //修改htmlWebpackPlugin
    config.plugin("html").tap((args) => {
      args[0].title = "汇率";
      return args;
    });
  },
  configureWebpack: {
    plugins: [],
    context: path.resolve(__dirname, "./"),
    //别名配置
    resolve: {
      extensions: [".js", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
  pluginOptions: {
    windicss: {
      // see https://github.com/windicss/vite-plugin-windicss/blob/main/packages/plugin-utils/src/options.ts
    },
  },
};
