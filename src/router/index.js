import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login';
import SetPassword from '../pages/SetPassword';
import RegisterHome from '../pages/RegisterHome';
import RegisterIdent from '../pages/RegisterIdent';
import Main from '../pages/Main';
import Home from '../pages/Home';
import ShopList from '../pages/ShopList';
import ShopCar from '../pages/ShopCar';
import Personal from '../pages/Personal';
import SelectCityPage from '../pages/SelectCityPage';
import store from '../store/store';

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/setPassword',
      name: 'setPassword',
      component: SetPassword
    },
    {
      path: '/registerHome',
      name: 'registerHome',
      component: RegisterHome
    },
    {
      path: '/registerIdent',
      name: 'registerIdent',
      component: RegisterIdent,
      // beforeEnter: (to, from, next) => {
      //   console.log(to);
      // }
    }, {
      path: '/',
      name: 'main',
      component: Main,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
        },
        {
          path: '/shopList',
          name: 'shopList',
          component: ShopList,
        },
        {
          path: '/shopCar',
          name: 'shopCar',
          component: ShopCar,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/personal',
          name: 'personal',
          component: Personal,
          meta: {
            requireAuth: true
          }
        },
      ]
    },
    {
      path: "/selectCityPage",
      name: 'selectCityPage',
      component: SelectCityPage,
    },
    {
      path: "*", redirect: "/login"
    }
  ],
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    } else {
      // console.log("路由守卫传参：",to);
      next({path:'/login',query:{nextPath:to.path}});
    }
  }
  next();
})
export default router