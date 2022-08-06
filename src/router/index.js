import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/login.vue";
import saleCategory from "../views/saleCategory.vue";
import processing from "../views/processing.vue";
import invoicment from "../views/invoicment.vue";
import processDone from "../views/processingDone.vue";
import doneSaleCategory from "../views/doneSaleCategory.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "saleCategory",
    component: saleCategory,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/processing",
    name: "processing",
    component: processing,
  },
  {
    path: "/invoicment",
    name: "invoicment",
    component: invoicment,
  },
  {
    path: "/processDone",
    name: "processDone",
    component: processDone,
  },
  {
    path: "/doneSaleCategory",
    name: "doneSaleCategory",
    component: doneSaleCategory,
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
