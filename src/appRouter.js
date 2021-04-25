import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";

const routes = [
  { path: "/", component: Login, meta: { requiredAuth: true } },
  { path: "/login", component: Login, meta: { requiredAuth: false } },
  { path: "/dashboard", component: Dashboard, meta: { requiredAuth: true } },
];

export const routeConfig = createRouter({
  history: createWebHistory(),
  routes: routes,
});

routeConfig.beforeEach(async (to, from, next) => {
  if (to.meta.requiredAuth) {
    var userProfile = store.getters["auth/getUserProfile"];
    if (userProfile.id === 0) {
      await store.dispatch("auth/userProfile");
      userProfile = store.getters["auth/getUserProfile"];
      if (userProfile.id === 0) {
        return next({ path: "/login" });
      } else {
        return next();
      }
    }
  }
  return next();
});
