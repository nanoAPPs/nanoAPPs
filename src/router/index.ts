import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouterOptions, RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const navRoutes = <Array<RouteConfig>>[
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    props: true,
  },
]

const router = new VueRouter(<RouterOptions>{
  mode: 'history',
  base: process.env.BASE_URL,
  routes: navRoutes,
})

export default router
