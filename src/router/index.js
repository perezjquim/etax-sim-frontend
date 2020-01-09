import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

var routes = [];

const oReq = require.context('@/views/', true, /\.*\.vue$/);
oReq.keys().forEach(sFilePath => {
  const sName = sFilePath.substr(2).replace(".vue", "");
  const bIsSubRoute = sName.indexOf("/") > -1;
  if (!bIsSubRoute) {
    const sPath = sName == "map" ? "/" : `/${sName}`;
    routes.push({
      path: sPath,
      component: () => import(`../views/${sName}.vue`)
    })
  }
  else {
    const sSplit = sName.split("/");
    const sFolderName = sSplit[0];
    const sChildName = sSplit[1];
    const sPath = sFolderName == sChildName ? `/${sFolderName}/:id` : `/${sFolderName}/:id/${sChildName}`;
    routes.push({
      path: sPath,
      component: () => import(`../views/${sFolderName}/${sChildName}.vue`)
    });
  }
});

const bIsProduction = window.location.hostname == "perezjquim.github.io";
const sBase = bIsProduction ? '/etax-sim-frontend/' : '/';

const oRouter = new VueRouter({
  mode: 'history',
  base: sBase,
  routes
})

export default oRouter
