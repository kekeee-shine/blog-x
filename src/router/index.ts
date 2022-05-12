import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicLayout from '../layouts/BasicLayout.vue'
import GlobalHeader from '../components/GlobalHeader/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BasicLayout
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: BasicLayout
  },
  {
    path: '/header',
    name: 'header',
    component: GlobalHeader
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
