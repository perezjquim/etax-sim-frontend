import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'map',
    component: () => import("@/views/map.vue")
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import("@/views/faq.vue")
  },
  {
    path: '/about',
    name: 'about',
    component: () => import("@/views/About.vue")
  },
  {
    path: '/pt/:id',
    name: 'portugal' ,
    component: () => import("@/views/portugal/portugal.vue")
  },
  {
    path: '/pt/:id/irsPT',
    name: 'irsPT',
    component: () => import("@/views/portugal/irsPT.vue")
  },
  {
    path: '/pt/:id/liquidPT',
    name: 'liquidPT',
    component: () => import("@/views/portugal/liquidPT.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
