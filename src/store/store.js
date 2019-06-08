import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index';
import createPersistedState from "vuex-persistedstate"
import { getPersonalData, getPersonalDataSecond, getGoodsColl,getGoodsDetail } from "../api/send";
Vue.use(Vuex)
const home = {//孙级
    namespaced: true,
    state: {
        homeHeadBool: true,
    },
    mutations: {
        setHomeHeadBool(state, bool) {
            state.homeHeadBool = bool;
        },
    },
    actions: {
    }
}
const shopList = {//孙级
    namespaced: true,
    state: {
        shopIndex: 0,
    },
    mutations: {
        setShopIndex(state, index) {
            state.shopIndex = index;
        },
    }
}
// const shopCarPersiste = createPersiste({
// 	ciphertext: true, // 加密存本地, 默认为false
// 	LS: {
// 		module: shopCar,
// 		storePath: 'shopCar' // __storePath:(和Vuex中的option.modules:{key：value}的key,一,一对应)__
// 	},
// })
const register = {//子级
    namespaced: true,
    state: {
        upLoadingImg: false,
        magnifyBool: false,
        magnifyImg: ''
    },
    getters: {

    },
    mutations: {
        upLoadingImg(state, imgStatus) {
            state.upLoadingImg = imgStatus.bool;
        },
        magnifyBool(state, imgObj) {
            state.magnifyBool = imgObj.bool;
            state.magnifyImg = imgObj.img;
        },
    }
}
const login = {//子级
    namespaced: true,
    state: {
        loginRecordArr: [],
        TEL_REGEXP: /^1[3|4|5|8][0-9]\d{8}$/,
        PASS_REGEXP: /^[\da-zA-Z]{6,16}$/
    },
    getters: {
        verifyUserPhone: (state) => (phoneValue) => {
            if (state.TEL_REGEXP.test(phoneValue)) {
                return true;
            } else {
                return false;
            }
        },
        verifyUserPassword: (state) => (passwordValue) => {
            if (state.PASS_REGEXP.test(passwordValue)) {
                return true;
            } else {
                return false;
            }
        },
    },
    mutations: {
        loginRecord(state, user) {//登录成功后把用户名和token存入本地localStorage
            let localUserList = JSON.parse(localStorage.getItem("userList"));
            if (!localUserList) {
                state.loginRecordArr.push({ 'loginName': user.loginName });
                localStorage.setItem("userList", JSON.stringify(state.loginRecordArr));
            } else {
                state.loginRecordArr = [];
                state.loginRecordArr.push({ 'loginName': user.loginName });
                for (let l in localUserList) {
                    if (localUserList[l].loginName != user.loginName) {
                        state.loginRecordArr.push(localUserList[l]);
                    }
                }
                localStorage.setItem("userList", JSON.stringify(state.loginRecordArr));
                // console.log('localStorage中的userList：', JSON.parse(localStorage.getItem("userList")))
            }
        },

    },

}
const main = {//子级
    namespaced: true,
    state: {

    },
    mutations: {

    },
    modules: {
        home: home,
        shopList: shopList,
    }
}
const publicMain = {
    namespaced: true,
    state: {
        goodsColl: [],
        goodsDetail:null,
        description:[]
    },
    mutations: {
        setGoodsColl(state, obj) {
            state.goodsColl = obj;
        },
        setGoodsDetail(state, obj) {
            state.goodsDetail = obj;
        },
        setDescription(state,arr){
            state.description=arr;
        }
    },
    actions: {
        getGoodsColl(context, obj) {
            getGoodsColl({
                userId: context.rootState.userId,
                skuId: obj.skuId,
                source:context.rootState.userSecondMsg.source
            }).then(res => {
                console.log("这是什么鬼：", res);
                context.commit("setGoodsColl", res)
            })
        },
       getGoodsDetail(context, obj) {
            // return getGoodsDetail({
            //     skuId: obj.skuId,
            //     stationId:context.rootState.userMsg.stationId,
            //     userId: context.rootState.userId,
            //     storeId:context.rootState.userSecondMsg.storeId,
            //     merchantId:context.rootState.userMsg.merchantId,
            //     id:context.rootState.userSecondMsg.id
            // }).then(res => {
                
            //     let srcArr=[];
            //     let initArr=res.result.description.split('"');
            //     for(let r=0;r<initArr.length;r++){
            //         if(initArr[r].indexOf("http")!=-1){
            //             srcArr.push(initArr[r]);
            //         }
            //     }
            //     context.commit("setDescription", srcArr);
            //     context.commit("setGoodsDetail", res.result);
            //     // console.log("商品详情？", context.state.goodsDetail);
            //     return res.result;
            // })
        },

        // async commitGoodsDetail(context,obj){
        //     await context.dispatch("getGoodsDetail",obj);
        //     context.commit("setGoodsDetail", dispatch("getGoodsDetail",obj));
        // }
    },
    modules: {
    }
}

const Store = new Vuex.Store({
    state: {
        headerTitle: '',
        warnBool: false,
        warnText: "",
        loading: false,
        dataLoading: false,
        selectObj: [],
        papersType: '营业执照',
        alertBool: false,
        token: '',
        userId: '',
        userMsg: null,
        userSecondMsg: null,
        shopCarData: [],
    },
    getters: {
    },
    mutations: {
        showWarn(state, warnObj) {
            state.warnBool = warnObj.warnBool;
            state.warnText = warnObj.warnText;
        },
        showLoading(state, bool) {
            state.loading = bool;
        },
        showDataLoading(state, bool) {
            state.dataLoading = bool;
        },
        changeAlertBool(state, alertBool) {
            state.alertBool = alertBool;
        },
        showSelectAlert(state, selectObj) {
            state.alertBool = true;
            state.selectObj = selectObj.selectObj;
        },
        changePapersType(state, type) {
            state.papersType = type;
        },
        setToken(state, token) {//把token存入本地localStorage
            state.token = token;
        },
        setUserId(state, id) {
            state.userId = id;
        },
        setUserMsg(state, msg) {//个人数据1
            state.userMsg = msg;
        },
        setUserSecondMsg(state, msg) {//个人数据2
            state.userSecondMsg = msg;
        },
        setHeaderTitle(state, title) {//设置头部title
            state.headerTitle = title;
        },
        addToShopCar(state, shopCarData) {//加入购物车
            let localShopCarData = JSON.parse(localStorage.getItem('vuex'))['shopCarData'];
            let arr = [];
            console.log(localShopCarData.length);
            if (!localShopCarData.length > 0) {
                arr.push(shopCarData);
                console.log("arr:", arr);
            } else {
                for (let sc in localShopCarData) {
                    if (localShopCarData[sc].skuId != shopCarData.skuId) {
                        arr.push(shopCarData);
                    }
                }
            }
            state.shopCarData = arr;
        }
    },
    actions: {
        showWarnAsync(context, warnObj) {//显示信息
            context.commit("showWarn", warnObj);
            setTimeout(() => {
                context.commit("showWarn", { 'warnBool': false, 'warnText': '' });
            }, 2000)
        },
        showSelectAlert(context, selectObj) {
            context.commit('changeAlertBool', true);
            context.commit('showSelectAlert', selectObj);
        },
        logoutHandle(context) {//退出登录
            localStorage.removeItem("vuex");
            context.commit("setToken", false);
            context.commit("setUserId", false);
            context.commit("setUserMsg", null);
            context.commit("setUserSecondMsg", null);
            router.replace("/login");
        },
        getUserMsg(context, obj) {
            return getPersonalData({ id: obj.id }).then(res => {
                if (res) {
                    context.commit("setUserMsg", res.result);
                    return res.result;
                }
            })
        },
        getUserSecondMsg(context, obj) {
            return getPersonalDataSecond({ groupId: obj.groupId }).then(res => {
                if (res) {
                    context.commit("setUserSecondMsg", res.result.items[0]);
                    return res.result.items[0];
                }
            })
        }
    },
    modules: {
        login: login,
        register: register,
        main: main,
        publicMain: publicMain
    },
    plugins: [createPersistedState({
        reducer(val) {
            // console.log("val:",val);
            return {
                // 只储存state中的token 使vuex的token刷新不掉
                token: val.token,
                userId: val.userId,
                userMsg: val.userMsg,
                userSecondMsg: val.userSecondMsg,
                shopCarData: val.shopCarData
            }
        }
    })],
})

export default Store