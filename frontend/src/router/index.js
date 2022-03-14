import { createWebHistory, createRouter } from "vue-router";
import Swal from "sweetalert2";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/sheet/:id",
    name: "Sheet",
    meta: { login: true },
    component: () => import("../views/Sheet.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    meta: { guess: true },
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    meta: { guess: true },
    component: () => import("../views/Signin.vue"),
  },
  {
    path: "/search",
    name: "Search",
    meta: { login: true },
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/favorite",
    name: "Favorite",
    meta: { login: true },
    component: () => import("../views/Favorite.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    meta: { login: true },
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/checkout",
    name: "Checkout",
    meta: { login: true },
    component: () => import("../views/Checkout.vue"),
  },
  {
    path: "/itcoin",
    name: "Itcoin",
    meta: { login: true },
    component: () => import("../views/Itcoin.vue"),
  },
  {
    path: "/history",
    name: "History",
    meta: { login: true },
    component: () => import("../views/History.vue"),
  },
  {
    path: "/mysheets",
    name: "Mysheets",
    meta: { login: true },
    component: () => import("../views/Mysheets.vue"),
  },
  {
    path: "/mysheet/:id",
    name: "Mysheet",
    meta: { login: true },
    component: () => import("../views/Mysheet.vue"),
  },
  {
    path: "/myreview",
    name: "Myreview",
    meta: { login: true },
    component: () => import("../views/Myreview.vue"),
  },
  {
    path: "/account",
    name: "Account",
    meta: { login: true },
    component: () => import("../views/Account.vue"),
  },
  {
    path: "/changepassword",
    name: "Changepassword",
    meta: { login: true },
    component: () => import("../views/Changepassword.vue"),
  },
  {
    path: "/sheetsmanage",
    name: "Sheetsmanage",
    meta: { login: true },
    component: () => import("../views/Sheetsmanage.vue"),
  },
  {
    path: "/createsheet",
    name: "Createsheet",
    meta: { login: true },
    component: () => import("../views/Createsheet.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (to.meta.login && !isLoggedIn) {
    Swal.fire({
      title: "โปรดลงชื่อเข้าสู่ระบบ",
      icon: "warning",
      showConfirmButton: true,
    });
    next({ path: "/signin" });
    return;
  }
  if (to.meta.guess && isLoggedIn) {
    next({ path: "/" });
    return;
  }
  next();
});

export default router;
