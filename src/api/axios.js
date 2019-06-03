//使用axios 请求数据
import axios from 'axios'
import qs from 'qs';
import store from '../store/store';
import router from '../router/index';

let needInterceptorService = axios.create({//需要token拦截的请求
    baseURL: 'https://web-gateway.newbeescm.com/b2b-app-web',
    timeout: 5000,
    // headers: {'Content-Type': 'application/json'}
});
needInterceptorService.interceptors.request.use(config => {
    console.log("request发送请求：",config);
    store.commit("showLoading", true);
    if (store.state.token) {
        config.headers.token = store.state.token;
    } else {
        router.replace('/login');
    }
    return config;
}, error => {
    return Promise.reject(error);
})

needInterceptorService.interceptors.response.use(response => {
    store.commit("showLoading", false);
    
    
    // if(response.data.status.statusCode===1895001){
        // router.replace('/login');
    //     return false;
    // }else{
        // return response;
    // }
    return response;
}, error => {
    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
        store.dispatch("showWarnAsync", {//提示信息
            warnBool: true,
            warnText: "网络请求超时",
          });
      }
    return Promise.reject(error);
})

function needInterceptorHttp(url,method,data,params){
    return needInterceptorService({
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


let notInterceptorService = axios.create({//不需要token拦截的请求 否则不需要登录的页面都拦截的话请求发送不出去会直接跳到登录页
    baseURL: 'https://web-gateway.newbeescm.com/b2b-app-web',
    timeout: 5000,
});

function notInterceptorHttp(url,method,data,params){
    return notInterceptorService({
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


export {needInterceptorService,notInterceptorService,needInterceptorHttp,notInterceptorHttp}

