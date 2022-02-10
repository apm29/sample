import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/plugins/element-ui";
import "@/plugins/dayjs";
import "@/plugins/composition-api";
import "windi.css";
import "@/css/index.css";
import "@mdi/font/css/materialdesignicons.min.css";
import "@/remote/remote-config";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
