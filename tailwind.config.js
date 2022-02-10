const colors = require("windicss/colors");
module.exports = {
  darkMode: false, // or 'media' or 'class'
  plugins: [
    require("@windicss/plugin-scrollbar"),
    require("@windicss/plugin-animations")({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
    }),
  ],
  theme: {
    extend: {},
  },
  variants: {
    scrollbar: ["rounded"],
  },
  purge: ["src/**/*.vue"],
  corePlugins: {
    preflight: true, //不禁用preflight样式重置
  },
};
