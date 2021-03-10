import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue";
import Schedule from "../views/Schedule.vue";
import Activities from "../views/Activities.vue";
import Activity from "../views/Activity.vue";
import localForage from "localforage";


const routes = [
  {
    path: "/",
    component: Home,
    beforeEnter:async(_, __, next) => {
      const token = await localForage.getItem('refreshToken');
      if (token) next("/schedule");
      else next();
    }

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
  routes,
})

export default router
