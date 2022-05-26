import { createRouter,createWebHashHistory, RouteRecordRaw } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BasicLayout,
    children: [
      {path: '/article/:id', component: ()=>import('@/views/ArticleDetailView.vue')},
      {path: '/archive', component: ()=>import('@/views/ArticleListView.vue')},
      {path: '/label', component: ()=>import('@/views/ArticleListView.vue')},
      {path: '/topic', component: ()=>import('@/views/ArticleListView.vue')}]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
