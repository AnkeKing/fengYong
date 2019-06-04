import qs from 'qs';
import store from '../store/store';
import {needInterceptorService,needInterceptorHttp,notInterceptorService,notInterceptorHttp} from './axios';


export const verifyLoginID = data => {//登录
    return notInterceptorService({
        url:"/user/login",
        method:'post',
        data:qs.stringify(data)
    }).then(res=>{
        // console.log('send.js:',res);
        if(res.data.status.statusCode===0){
            store.commit('setToken',res.data.result.token);
            store.commit('setUserId',res.data.result.id);
            store.commit('login/loginRecord',{'loginName':data.loginName});
            return res.data;
        }else{
            store.dispatch("showWarnAsync", {//提示信息
                warnBool: true,
                warnText: res.data.status.statusReason,
              });
        }
    })
}
export const sendRegisterVerigyCode=data=>{//注册发送验证码
    return notInterceptorHttp('/user/sms','post',data,data);
}
export const verigyRegisterCode=data=>{//注册验证验证码
    return notInterceptorHttp('/user/smsValid','post',data,data);
}
export const submitRegisterMsg=data=>{//注册
    return notInterceptorHttp('/user/register','post',data,data);
}
export const sendVerifyCode=data=>{//忘记密码发送验证码
    return notInterceptorHttp('/user/getPasswordCode','post',data,data);
} 
export const setPassword=data=>{//忘记密码设置新密码
    return notInterceptorHttp('/user/passUpdate','post',data,data);
} 
export const getHomeData=data=>{//不需要登录的首页
    return notInterceptorHttp('/getListB2bIndex','post',data,data);
}
export const getPersonalData=data=>{//需要登录的个人中心-依赖登录接口
    return needInterceptorHttp('/app/merchant/getByUserId/'+data.id,'post',data,data);
}
export const getLoginedHomeData=data=>{//需要登录时的首页-依赖个人中心接口
    return needInterceptorHttp('/getListOfShopByGroupId','post',data,data);
}
export const getShopListData=data=>{//需要登录时的商品分类-依赖个人中心接口
    return needInterceptorHttp('/getSortInfoByStationIdV2/'+data.stationId,'post',data,data);
}
export const getShopBrandData=data=>{//需要登录时的品牌信息-依赖商品分类接口
    return needInterceptorHttp('/getBrandInfo','post',data,data);
}