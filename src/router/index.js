import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

var routes = [
{
  path: '/',  
  component: () => import("@/components/Map.vue")
}];

const req = require.context('@/views/', true);
req.keys().forEach(sPath => {
  const sName = sPath.split('.')[1].split('/')[1];
  routes.push({
    path:`/${sName}`,
    component: () => import(`../views/${sName}.vue`)
  })
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
