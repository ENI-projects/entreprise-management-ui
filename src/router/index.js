import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Unauthorized from "@/views/Unauthorized.vue";

Vue.use(VueRouter);

const checkAccessRights = (to, from, next) => {
  if (
    Vue.prototype.$keycloak.authenticated &&
    Vue.prototype.$keycloak.tokenParsed.resource_access[
      "entreprise-management-ui"
    ]
  ) {
    next();
  } else {
    next({ path: "/unauthorized" });
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: checkAccessRights,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    beforeEnter: checkAccessRights,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
    meta: {
      requireAuth: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
