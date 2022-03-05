import { createWebHistory, createRouter } from "vue-router";
import Index from "@/views/Index.vue";
import Signin from "@/views/Signin.vue";
import Signup from "@/views/Signup.vue";
import Profile from "@/views/Profile.vue";
import Findsheet from "@/views/Findsheet.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/findsheet",
    name: "Findsheet",
    component: Findsheet,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
