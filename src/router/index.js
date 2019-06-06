import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login';
import SetPassword from '../pages/SetPassword';
import RegisterHome from '../pages/RegisterHome';
import RegisterIdent from '../pages/RegisterIdent';
import Main from '../pages/Main';
import Home from '../pages/mainChild/Home';

import PublicMain from '../pages/mainChild/PublicMain';
import ShopDetail from '../pages/mainChild/publicChild/ShopDetail';

import HomeMain from '../pages/mainChild/HomeMain';
import SelectCityPage from '../pages/mainChild/homeChild/SelectCityPage';

import ShopList from '../pages/mainChild/ShopList';
import ShopCar from '../pages/mainChild/ShopCar';

import Personal from '../pages/mainChild/Personal';
import PersonalMain from '../pages/mainChild/PersonalMain';
import SetPage from '../pages/mainChild/personalChild/SetPage';
import MsgMain from '../pages/mainChild/personalChild/MsgMain';
import PersonalMsg from '../pages/mainChild/personalChild/msgDetail/PersonalMsg';
import ShopMsg from '../pages/mainChild/personalChild/msgDetail/ShopMsg';



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
         //home
        {
          path: '/main/home',
          name: 'home',
          component: Home,
        },
        //homeMain
         {
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
        //shopCar
        {
          path: '/main/shopCar',
          name: 'shopCar',
          component: ShopCar,
          meta: {
            requireAuth: true
          }
        },
        //personal
        {
          path: '/main/personal',
          name: 'personal',
          component: Personal,
          meta: {
            requireAuth: true
          }
        },
        //personalMain
         {
          path: '/personalMain',
          name: 'personalMain',
          component: PersonalMain,
          children: [
            {
              path: '/setPage',
              name: 'setPage',
              component: SetPage,
            },{
              path: '/msgMain',
              name: 'msgMain',
              component:MsgMain,
              children:[
                {
                  path: '/personalMsg',
                  name: 'personalMsg',
                  component: PersonalMsg,
                },
                {
                  path: '/shopMsg',
                  name: 'shopMsg',
                  component: ShopMsg,
                }
              ]
            },
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