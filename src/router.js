import Vue from 'vue'
//import { createRouterLayout } from 'vue-router-layout'
import Router from 'vue-router'

// Create <RouterLayout> component.
/*const RouterLayout = createRouterLayout(layout => {
    // Resolves a layout component with layout type string.
    return import('@/components/' + layout + '.vue')
  })*/
  
  Vue.use(Router)
  
  export default new Router({
    routes: [
      {
        path: '/',
        component: () => import("@/components/Map.vue")

  
        /*// Pass <RouterLayout> as the route component
        component: RouterLayout,
  
        // All child components will be applied with corresponding layout component
        children: [
          {
            path: '',
            component: () => import('@/components/Map.vue')
          }
        ]*/
      }
    ]
  })