// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store';
import Loading from './components/Loading';
import TabBar from './components/TabBar';
import WarnAlert from "./components/WarnAlert";
import SelectAlert from "./components/SelectAlert";
import Slides from './components/Slides'
import 'normalize.css'

Vue.config.productionTip = false
Vue.prototype.Event=new Vue();
Vue.component('appLoading',Loading);//全局组件
Vue.component('appWarnAlert',WarnAlert);
Vue.component('appSelectAlert',SelectAlert);
Vue.component('appTabBar',TabBar);
Vue.component('appSlides',Slides);

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
