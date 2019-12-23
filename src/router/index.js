import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
//comentei a Home e tou a fazer routing direto do mapa para a raiz
import faq from '../views/faq.vue'
//o about foi carregado mesmo no codigo em baixo
import santarem from '../views/santarem.vue'
import irs from '../views/irs.vue'
import liquid from '../views/liquid.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    //name: 'home',
    //component: Home
    component: () => import("@/components/Map.vue")
  },
  {
    path: '/faq',
    name: 'faq',
    component: faq
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/santarem',
    name: 'santarem',
    component: santarem
  },
  {
    path: '/santarem/irs',
    name: 'irs',
    component: irs
  },
  {
    path: '/santarem/liquid',
    name: 'liquid',
    component: liquid
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
