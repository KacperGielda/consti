import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue";
import Schedule from "../views/Schedule.vue";


const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/schedule",
    component: Schedule,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
