import qs from 'qs';
import store from '../store/store';
import {Service,http} from './axios';


export const verifyLoginID = data => {//登录
    return Service({
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
export const getHomeData=data=>{//首页
    return http('/getListB2bIndex','post',data,data);
}
export const getPersonalData=data=>{//个人数据1-依赖登录接口
    return http('/app/merchant/getByUserId/'+data.id,'post',data,data);
}
export const getPersonalDataSecond=data=>{//个人数据2-依赖个人数据1
    return http('/getListOfShopByGroupId','post',data,data);
}
export const getShopListData=data=>{//商品分类-依赖个人数据1
    return http('/getSortInfoByStationIdV2/'+data.stationId,'post',data,data);
}
export const getShopBrandData=data=>{//品牌信息-依赖商品分类接口
    return http('/getBrandInfo','post',data,data);
}
export const getShopCarData=data=>{//购物车-依赖个人数据1+个人数据2
    return http('/getShoppingCart','get',data,data);
}
export const selectShop=data=>{//选中商品接⼝-依赖个人数据1+个人数据2
    return http('/modifyCheckState','post',data,data);
}