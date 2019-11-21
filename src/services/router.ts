import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouterOptions, RouteConfig } from 'vue-router'
import { computed } from '@vue/composition-api'
import { getVueRuntime } from '@/utils/vueRuntime'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

// Routes from modules
import odooProjectTestRoutes from '@/modules/odoo-project-test/routes'

Vue.use(VueRouter)

const navRoutes = <Array<RouteConfig>>[
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
    meta: {
      title: 'Home',
    },
  },
  ...odooProjectTestRoutes,
  {
    path: '/about',
    name: 'about',
    component: About,
    props: true,
    meta: {
      title: 'About',
    },
  },
]

const router = new VueRouter(<RouterOptions>{
  mode: 'history',
  base: process.env.BASE_URL,
  routes: navRoutes,
})

export default router

export function useRouter() {
  const vm = getVueRuntime()
  const route = computed(() => vm.$route)
  return { route, router: vm.$router }
}
