import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicLayout from '../layouts/BasicLayout.vue'
import GlobalHeader from '../components/GlobalHeader/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BasicLayout,
  //   children: [
  //     {path: 'account1', component: account1},
  //     {path: 'account2', component: account2},
  // ]
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
    path: '/article/:id',
    name: 'post',
    component: BasicLayout

  },
  {
    path: '/archive',
    name: 'archive',
    component: BasicLayout
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
