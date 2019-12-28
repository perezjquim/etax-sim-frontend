import Vue from 'vue'
import VueRouter from 'vue-router'

import map from '../views/map.vue'
import faq from '../views/faq.vue'
import about from '../views/about.vue'

import irsPT from '../views/portugal/irsPT.vue'
import liquidPT from '../views/portugal/liquidPT.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'map',
    component: map
  },
  {
    path: '/faq',
    name: 'faq',
    component: faq
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/pt/:id',
    name: 'portugal' ,
    component: () => import("@/views/portugal/portugal.vue")
  },
  {
    path: '/pt/:id/irsPT',
    name: 'irsPT',
    component: irsPT
  },
  {
    path: '/pt/:id/liquidPT',
    name: 'liquidPT',
    component: liquidPT
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
