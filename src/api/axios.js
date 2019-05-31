//使用axios 请求数据
import axios from 'axios'
import qs from 'qs';
import store from '../store/store';
import router from '../router/index';

let service = axios.create({
    baseURL: 'https://web-gateway.newbeescm.com/b2b-app-web',
    timeout: 5000,
    // headers: {'Content-Type': 'application/json'}
});
service.interceptors.request.use(config => {
    store.commit("showLoading", true);
    if (store.state.token) {
        config.headers.token = store.state.token;
       // config.headers.userId=sto
    } else {
        router.replace('/login');
    }
    return config;
}, error => {
    return Promise.reject(error);
})

service.interceptors.response.use(response => {
    store.commit("showLoading", false);
    // console.log(response);
    return response;
}, error => {
    return Promise.reject(error);
})

function http(url,method,data,params){
    return service({
        url:url,
        method:method,
        data:data,
        params,
    }).then(res=>{
        if(res.data.status.statusCode===0){
            return res.data;
        }else{
            store.dispatch("showWarnAsync", {//提示信息
                warnBool: true,
                warnText: res.data.status.statusReason,
              });
            return false;
        }
    })
}

export {http,service}

