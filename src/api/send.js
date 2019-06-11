import qs from 'qs';
import store from '../store/store';
import { Service, http,specialHttp } from './axios';


export const verifyLoginID = data => {//登录
    return Service({
        url: "/user/login",
        method: 'post',
        data: qs.stringify(data)
    }).then(res => {
        // console.log('send.js:',res);
        if (res.data.status.statusCode === 0) {
            store.commit('setToken', res.data.result.token);
            store.commit('setUserId', res.data.result.id);
            store.commit('login/loginRecord', { 'loginName': data.loginName });
            return res.data;
        } else {
            store.dispatch("showWarnAsync", {//提示信息
                warnBool: true,
                warnText: res.data.status.statusReason,
            });
        }
    })
}
export const sendRegisterVerigyCode = data => {//注册发送验证码
    return http('/user/sms', 'post', data, data);
}
export const verigyRegisterCode = data => {//注册验证验证码
    return http('/user/smsValid', 'post', data, data);
}
export const submitRegisterMsg = data => {//注册
    return http('/user/register', 'post', data, data);
}
export const sendVerifyCode = data => {//忘记密码发送验证码
    return http('/user/getPasswordCode', 'post', data, data);
}
export const setPassword = data => {//忘记密码设置新密码
    return http('/user/passUpdate', 'post', data, data);
}
export const getHomeData = data => {//首页
    return http('/getListB2bIndex', 'post', data, data);
}
export const getPersonalData = data => {//个人数据1-依赖登录接口
    return http('/app/merchant/getByUserId/' + data.id, 'post', data, data);
}
export const getPersonalDataSecond = data => {//个人数据2-依赖个人数据1
    return http('/getListOfShopByGroupId', 'post', data, data);
}
export const getShopListData = data => {//商品分类-依赖个人数据1
    return http('/getSortInfoByStationIdV2/' + data.stationId, 'post', data, data);
}
export const getShopBrandData = data => {//品牌信息-依赖商品分类接口
    return http('/getBrandInfo', 'post', data, data);
}
export const getShopCarData = data => {//购物车
    return http('/getShoppingCart', 'get', data, data);
}
export const selectShop = data => {//check选中商品
    return http('/modifyCheckState', 'post', data, data);
}
export const getGoodsColl = data => {//商品收藏信息
    return http('/goodsColl/collected', 'post', data, data);
}
export const getGoodsDetail = data => {//商品详情
    return http('/goodsDetail/' + data.skuId + "/" + data.stationId + "/" + data.userId + "/" + data.storeId + "/" + data.merchantId + "/" + data.id, 'get', data, data);
}
export const getGoodsParams = data => {//商品规格参数 
    return specialHttp('/html/getGoodsParamsBySkuId/' + data.skuId, 'get', qs.stringify(data), data);
}
export const join = data => {//加入购物车
    return http('/join', 'post',data, data);
}
export const modify = data => {//修改购物车的数量
    return http('/modify', 'post',data, data);
}
export const deleteShop = data => {//删除购物车商品
    return http('/delete', 'post',data, data);
}
export const searchGoodsList = data => {//获取店铺商品
    return http('/searchGoodsList', 'post',data, data);
}
export const dealerColl = data => {//店铺收藏信息
    return http('/dealerColl/collectStatus', 'post',data, data);
}
export const toAddCollStore = data => {//收藏店铺
    return http('/dealerColl/add', 'post',data, data);
}
export const toDelCollStore = data => {//取消收藏店铺
    return http('/dealerColl/del', 'post',data, data);
}