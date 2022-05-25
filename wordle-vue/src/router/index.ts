import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Game from '../views/Game/Game.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Game
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/rating',
    name: 'rating',
    component: () => import('../views/Rating.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
