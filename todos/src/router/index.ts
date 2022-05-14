import { createRouter, createWebHistory } from "vue-router";
import MonthlyView from "../views/MonthlyView.vue";
import TodoView from "../views/TodoView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: HomeView,
    },
    {
      path: "/monthly-todo",
      name: "month",
      component: MonthlyView,
    },
    {
      path: "/todo",
      name: "todo",
      component: TodoView,
    },
    {
      path: "/login",
      name: 'login',
      component: LoginView,
    }
    
  ],
});

export default router;
