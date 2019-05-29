import qs from 'qs';
import store from '../store/store';
import {service,http} from './axios';


export const verifyLoginID = data => {//登录
    return service({
        url:"/user/login",
        method:'post',
        data:qs.stringify(data)
    }).then(res=>{
        // console.log('send.js:',res);
        if(res.data.status.statusCode===0){
            store.commit('setToken',res.data.result.token);
            store.commit('login/loginRecord',{'loginName':data.loginName});
            return res.data;
        }else{
            store.dispatch("showWarnAsync", {//提示信息
                warnBool: true,
                warnText: res.data.status.statusReason
              });
        }
    })
}
export const sendRegisterVerigyCode=data=>{//注册发送验证码
    return http('/user/sms','post',data,data);
}
export const verigyRegisterCode=data=>{//注册验证验证码
    return http('/user/smsValid','post',data,data);
}
export const submitRegisterMsg=data=>{//注册
    return http('/user/register','post',data,data);
}
export const sendVerifyCode=data=>{//忘记密码发送验证码
    return http('/user/getPasswordCode','post',data,data);
} 
export const setPassword=data=>{//忘记密码设置新密码
    return http('/user/passUpdate','post',data,data);
}