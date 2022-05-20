import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicLayout from '../layouts/BasicLayout.vue'
import GlobalHeader from '../components/GlobalHeader/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:"/archive",
    name: 'home',
    component: BasicLayout,
    children: [
      {path: '/article/:id', component: ()=>import('@/views/ArticleDetailView.vue')},
      {path: '/archive', component: ()=>import('@/views/ArticleListView.vue')},
      {path: '/label', component: ()=>import('@/views/ArticleListView.vue')},
      {path: '/topic', component: ()=>import('@/views/ArticleListView.vue')},
      {path: '/home', component: ()=>import('@/views/ArticleListView.vue')}]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
