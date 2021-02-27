import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue";
import Schedule from "../views/Schedule.vue";
import Activities from "../views/Activities.vue";
import Activity from "../views/Activity.vue";


const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/schedule",
    component: Schedule,
  },
  {
    path: '/activities',
    component: Activities,
  },
  {
    path:'/activities/:id',
    props: true,
      component: Activity,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
