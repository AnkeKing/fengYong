// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store';
import Head from './components/Head';
import SlotHead from './components/SlotHead';
import FlowerLoading from './components/Loading';
import DataLoading from './components/DataLoading';
import TabBar from './components/TabBar';
import WarnAlert from "./components/WarnAlert";
import SelectAlert from "./components/SelectAlert";
import Slides from './components/Slides'
import 'normalize.css'
import { Loading } from 'vant';
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe).use(SwipeItem);

Vue.use(Loading);
Vue.config.productionTip = false
Vue.prototype.Event=new Vue();
Vue.component('appHead',Head);//全局组件
Vue.component('appLoading',FlowerLoading);
Vue.component('appWarnAlert',WarnAlert);
Vue.component('appSelectAlert',SelectAlert);
Vue.component('appTabBar',TabBar);
Vue.component('appSlides',Slides);
Vue.component('appSlotHead',SlotHead);
Vue.component('appDataLoading',DataLoading);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { 
    App ,
  },
  template: '<App/>'
})
