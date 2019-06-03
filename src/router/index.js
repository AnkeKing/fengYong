import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login';
import SetPassword from '../pages/SetPassword';
import RegisterHome from '../pages/RegisterHome';
import RegisterIdent from '../pages/RegisterIdent';
import Main from '../pages/Main';
import Home from '../pages/mainChild/Home';

import HomeMain from '../pages/mainChild/HomeMain';
import SelectCityPage from '../pages/mainChild/homeChild/SelectCityPage';

import ShopList from '../pages/mainChild/ShopList';
import ShopCar from '../pages/mainChild/ShopCar';

import Personal from '../pages/mainChild/Personal';
import PersonalMain from '../pages/mainChild/PersonalMain';
import SetPage from '../pages/mainChild/personalChild/SetPage';


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
      redirect: '/main/home',
      children: [
        {
          path: '/main/home',
          name: 'home',
          component: Home,
        }, {
          path: '/main/homeMain',
          name: 'homeMain',
          component: HomeMain,
          children: [
            {
              path: '/selectCityPage',
              name: 'selectCityPage',
              component: SelectCityPage,
            }
          ]
        },
        {
          path: '/main/shopList',
          name: 'shopList',
          component: ShopList,
        },
        {
          path: '/main/shopCar',
          name: 'shopCar',
          component: ShopCar,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/main/personal',
          name: 'personal',
          component: Personal,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/personalMain',
          name: 'personalMain',
          component: PersonalMain,
          children: [
            {
              path: '/setPage',
              name: 'setPage',
              component: SetPage,
            }
          ]
        },
      ]
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
      next({ path: '/login', query: { nextPath: to.path } });
    }
  }
  next();
})
export default router