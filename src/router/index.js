import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/login.vue";
import saleCategory from "../views/saleCategory.vue";
import processing from "../views/processing.vue";
import invoicment from "../views/invoicment.vue";
import processDone from "../views/processingDone.vue";
import doneSaleCategory from "../views/doneSaleCategory.vue";
import representive from "../views/representive.vue";
import driver from "../views/driver.vue";
import car from "../views/car.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "saleCategory",
    component: saleCategory,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      requireNotLogin: true,
    }
  }, {
    path: "/processing",
    name: "processing",
    component: processing,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: "/invoicment",
    name: "invoicment",
    component: invoicment,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: "/processDone",
    name: "processDone",
    component: processDone,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: "/doneSaleCategory",
    name: "doneSaleCategory",
    component: doneSaleCategory,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: "/representive",
    name: "representive",
    component: representive,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: "/driver",
    name: "driver",
    component: driver,
    meta: {
      requiresAuth: true,
    },
  }, {
    path: "/car",
    name: "car",
    component: car,
    meta: {
      requiresAuth: true,
    },
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
