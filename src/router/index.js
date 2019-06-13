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
import StoreMain from '../pages/mainChild/publicChild/StoreMain';
import StoreHome from '../pages/mainChild/publicChild/storeChild/StoreHome';
import StoreList from '../pages/mainChild/publicChild/storeChild/StoreList';
import StoreBrand from '../pages/mainChild/publicChild/storeChild/StoreBrand';
import StoreFile from '../pages/mainChild/publicChild/storeChild/StoreFile';
import SearchPage from '../pages/mainChild/publicChild/storeChild/SearchPage';

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
    //login
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    //setPassword
    {
      path: '/setPassword',
      name: 'setPassword',
      component: SetPassword
    },
    //registerHome
    {
      path: '/registerHome',
      name: 'registerHome',
      component: RegisterHome
    },
    //registerIdent
    {
      path: '/registerIdent',
      name: 'registerIdent',
      component: RegisterIdent,
      // beforeEnter: (to, from, next) => {
      //   console.log(to);
      // }
    },
    //main
    {
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
        //shopList
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
            }, {
              path: '/msgMain',
              name: 'msgMain',
              component: MsgMain,
              children: [
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
        //publicMain 
        {
          path: "/publicMain",
          name: "publicMain",
          component: PublicMain,
          children: [
            {
              path: "/shopDetail",
              name: "shopDetail",
              component: ShopDetail,
            },
             //storeMain
            {
              path: "/storeMain",
              name: "storeMain",
              component: StoreMain,
              redirect: '/storeMain/storeHome',
              children: [
                {
                  path: "/storeMain/storeHome",
                  name: "storeHome",
                  component: StoreHome,
                },
                {
                  path: "/storeMain/storeList",
                  name: "storeList",
                  component: StoreList,
                },{
                  path: "/storeMain/storeBrand",
                  name: "storeBrand",
                  component: StoreBrand,
                },
                {
                  path: "/storeMain/storeFile",
                  name: "storeFile",
                  component: StoreFile,
                },
                {
                  path: "/searchPage",
                  name: "searchPage",
                  component: SearchPage,
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "*", redirect: "/login"
    }
  ],
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {//判断要跳转的页面是否需要登录
    if (store.state.token) {//如果需要则判断是否有token
      next();
    } else {
      // console.log("路由守卫传参：",to);
      next({ path: '/login', query: { nextPath: to.path } });
    }
  }
  if(to.path!='/storeMain/storeHome'){
    store.commit('publicMain/setInSearch', false);
  }
  next();
})
export default router