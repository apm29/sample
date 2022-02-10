import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const constantRoutes = [
  {
    path: "/",
    name: "Today",
    component: () => import("@/views/Today"),
  },
  {
    path: "/query",
    name: "Query",
    props: (route) => ({
      currency: route.query.currency,
      startDate: route.query.startDate,
      endDate: route.query.endDate,
    }),
    component: () => import("@/views/Query"),
  },
];
const functionalRoutes = [];

const router = new VueRouter({
  routes: [...constantRoutes, ...functionalRoutes],
});

export default router;
