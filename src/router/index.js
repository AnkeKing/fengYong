import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login';
import SetPassword from '../pages/SetPassword';
import RegisterHome from '../pages/RegisterHome';
import RegisterIdent from '../pages/RegisterIdent';
import Home from '../pages/Home';
import ShopList from '../pages/ShopList';
import ShopCar from '../pages/ShopCar';
import Personal from '../pages/Personal';
import store from '../store/store';

Vue.use(Router)
// if(localStorage.getItem)


// for (let t = 0; t < tokenArr.length; t++) {
//   if (tokenArr[t].loginName == loginName && tokenArr[t].token) {
//       config.headers.token = tokenArr[t].token;
//       // console.log("config设置请求头后：", config.headers);
//   } else {
//       router.replace('/login');
//   }
// }
export default new Router({
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
    },
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
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal,
    },
    {
      path: "*", redirect: "/login"
    }
  ],
  mode: 'history'
})
