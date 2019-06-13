import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index';
import createPersistedState from "vuex-persistedstate"
import {
    getPersonalData, getPersonalDataSecond,
    getGoodsColl, getGoodsDetail, getShopCarData, searchGoodsList, dealerColl,
    addGoodsColl, delGoodsColl
} from "../api/send";
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
        PASS_REGEXP: /[\da-zA-Z]{6,16}/
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
const publicMain = {//子级
    namespaced: true,
    state: {
        goodsColl: "",
        goodsDetail: { goodsOl: [] },//商品详情
        orderPrice: [],
        description: [],
        picsUrl: "",
        picsUrlArr: [],
        skuBool: false,
        quantityNum: 0,
        measurementNum: 0,
        shopCarAmount: 0,
        shopCarData:
        {
            validShoppingCartDealerVos: [

            ]
        },
        currentStatusObj: {},
        onlyBool:false,
        inSearch:false
    },
    mutations: {
        setShopCarAmount(state, num) {
            state.shopCarAmount = num;
        },
        setGoodsColl(state, obj) {
            state.goodsColl = obj;
        },
        setGoodsDetail(state, obj) {//商品详情
            state.goodsDetail = obj.goodsDetail;
            state.orderPrice = obj.orderPrice;
            state.picsUrl = obj.picsUrl;
            state.quantityNum = obj.quantity;
            state.measurementNum = obj.measurement
            state.description = obj.description;
            state.picsUrlArr = obj.picsUrlArr
        },
        setSkuBool(state, bool) {
            state.skuBool = bool;
        },
        addShopNum(state, numObj) {
            if (numObj.name == "quantity") {
                state.quantityNum++;
            } else {
                state.measurementNum++;
            }
        },
        minusShopNum(state, numObj) {
            if (numObj.name == "quantity") {
                state.quantityNum--;
            } else {
                state.measurementNum--;
            }
        },
        setShopNum(state, numObj) {
            if (numObj.name == "quantity") {
                state.quantityNum = numObj.num;
            } else {
                state.measurementNum = numObj.num;
            }
        },
        setShopCarData(state, obj) {
            state.shopCarData = obj;
            let currentCompony = state.shopCarData.validShoppingCartDealerVos;
            //判断公司局部bool
            for (let c in currentCompony) {
                let currentComponyShop =
                    currentCompony[c].groupGoodsVoList[0].shoppingCartGoodsResponseVo;
                let dicideBool = currentComponyShop.every(function (v, i, a) {
                    return v.choiceOrNo === true;
                })
                if (dicideBool) {
                    state.shopCarData.validShoppingCartDealerVos[c].componyBool = true;
                } else {
                    state.shopCarData.validShoppingCartDealerVos[c].componyBool = false;
                }
            }
            //判断全选bool
            let alldicideBool = currentCompony.every(function (cv, i, a) {
                return cv.groupGoodsVoList[0].shoppingCartGoodsResponseVo.every(function (sv, i, a) {
                    return sv.choiceOrNo === true;
                })
            })
            if (alldicideBool) {
                state.shopCarData.allSelectBool = true;
            } else {
                state.shopCarData.allSelectBool = false;
            }
            let settleDicideBool = currentCompony.some(function (cv, i, a) {
                return cv.groupGoodsVoList[0].shoppingCartGoodsResponseVo.some(function (sv, i, a) {
                    return sv.choiceOrNo === true;
                })
            })
            if (settleDicideBool) {
                state.shopCarData.settleAccountBool = true;
            } else {
                state.shopCarData.settleAccountBool = false;
            }
        },
        setCurrentStatusObj(state, obj) {
            state.currentStatusObj = obj;
        },
        setOnlyBool(state,bool){
            state.onlyBool=bool;
        },
        setInSearch(state,bool){
            state.inSearch=bool;
        },
    },
    actions: {
        //商品收藏
        getGoodsColl(context, obj) {
            return getGoodsColl({
                userId: context.rootState.userId,
                skuId: parseInt(obj.skuId),
                source: 0
            }).then(res => {
                context.commit("setGoodsColl", res.result)
                return res.result;
            })
        },
        //添加商品收藏
        addGoodsColl({ commit, rootState, dispatch, state }, obj) {
            addGoodsColl({
                skuId: parseInt(obj.skuId),
                source: 0,
                userId: rootState.userId,
            }).then(res => {
                dispatch('getGoodsColl', { skuId: obj.skuId, source: res });
            })
        },
        //删除商品收藏
        delGoodsColl({ commit, rootState, dispatch, state }, obj) {
            delGoodsColl({
                skuId: parseInt(obj.skuId),
                source: 0,
                userId: rootState.userId,
            }).then(res => {
                dispatch('getGoodsColl', { skuId: obj.skuId, source: res });
            })
        },
        //单个商品详情
        getGoodsDetail(context, obj) {
            return getGoodsDetail({
                skuId: obj.skuId,
                stationId: context.rootState.userMsg.stationId,
                userId: context.rootState.userId,
                storeId: context.rootState.userSecondMsg.storeId,
                merchantId: context.rootState.userMsg.merchantId,
                id: context.rootState.userSecondMsg.id
            }).then(res => {
                let goodsDetail = res.result;
                let initArr = goodsDetail.description.split('"'); //处理商品详情的图片
                let description = [];
                for (let r = 0; r < initArr.length; r++) {
                    if (initArr[r].indexOf("http") != -1) {
                        description.push({ image: initArr[r] });
                    }
                }
                let picsUrl = [];
                let initArr2 = goodsDetail.goodsOl.picsUrl.split(","); //处理商品展示滑动图片
                for (let r = 0; r < initArr2.length; r++) {
                    picsUrl.push({ image: initArr2[r] });
                }
                let orderPrice = (goodsDetail.goodsOl.orderPrice + "").split(".");
                context.commit("setGoodsDetail", {
                    goodsDetail: goodsDetail,
                    orderPrice: orderPrice,
                    picsUrl: picsUrl[0].image,
                    picsUrlArr: picsUrl,
                    quantity: goodsDetail.goodsOl.minimumOrderQuantity,
                    measurement: goodsDetail.goodsOl.ratio1,
                    description: description,
                });
                return res.result;
            });
        },
        //购物车全部数据
        getShopCarData({ commit, rootState, dispatch, state }) {
            if (rootState.token) {
                if (rootState.userMsg) {
                    return getShopCarData({
                        userId: rootState.userMsg.userId,
                        merchantId: rootState.userMsg.merchantId,
                        siteId: rootState.userMsg.stationId,
                        shopId: rootState.userSecondMsg.storeId,
                        provId: rootState.userSecondMsg.province,
                        cityId: rootState.userSecondMsg.city,
                        countyId: rootState.userSecondMsg.county,
                        streetId: rootState.userSecondMsg.town,
                        storeId: rootState.userSecondMsg.id,
                    }).then(res => {
                        commit("setShopCarData", res.result);
                        return res.result;
                    });
                } else {//需要再次请求个人数据
                    dispatch('getUserMsg', { id: rootState.userId }, { root: true }).then(oneRes => {
                        let userMsg = oneRes;
                        dispatch('getUserSecondMsg', { groupId: userMsg.groupId }, { root: true }).then(twoRes => {
                            let userSecondMsg = twoRes;
                            return getShopCarData({
                                userId: userMsg.userId,
                                merchantId: userMsg.merchantId,
                                siteId: userMsg.stationId,
                                shopId: userSecondMsg.storeId,
                                provId: userSecondMsg.province,
                                cityId: userSecondMsg.city,
                                countyId: userSecondMsg.county,
                                streetId: userSecondMsg.town,
                                storeId: userSecondMsg.id,
                            }).then(res => {
                                commit("setShopCarData", res.result);
                                return res.result;
                            });
                        })
                    })
                }
            }
        },
        //获取店铺商品
        searchGoodsList({ commit, rootState, dispatch, state }, storeObj) {
            commit("setCurrentStatusObj", storeObj);
            return searchGoodsList({
                cityId: rootState.userSecondMsg.city,
                countyId: rootState.userSecondMsg.county,
                dealerId: storeObj.dealerId,
                groupStoreId: rootState.userSecondMsg.id,
                merchantId: rootState.userMsg.merchantId,
                orderBy: storeObj.type,
                orderWay: storeObj.orderWay,
                pageNum: 1,
                pageSize: 20,
                provId: rootState.userSecondMsg.province,
                stationId: rootState.userMsg.stationId,
                status: rootState.userMsg.status,
                stock: storeObj.stock,
                storeId: rootState.userSecondMsg.storeId,
                tagRecommend: storeObj.tagRecommend,
                town: rootState.userSecondMsg.town
            }).then(res => {
                // console.log("店铺商品",res.result)
                return res.result;
            })
        },
        //店铺收藏信息
        dealerColl({ commit, rootState }, storeObj) {
            return dealerColl({
                userId: rootState.userId,
                dealerId: storeObj.dealerId
            }).then(res => {
                return res.result;
            })
        },
        //搜索商品
        searchShop({ commit, rootState, dispatch, state }, obj) {
            return searchGoodsList({
                cityId: rootState.userSecondMsg.city,
                countyId: rootState.userSecondMsg.county,
                dealerId: obj.dealerId,
                goodsName: obj.goodsName,
                groupStoreId: rootState.userSecondMsg.id,
                merchantId: rootState.userMsg.merchantId,
                orderBy: obj.orderBy,
                orderWay: obj.orderWay,
                pageNum: 1,
                pageSize: 20,
                provId: rootState.userSecondMsg.province,
                stationId: rootState.userMsg.stationId,
                status: rootState.userMsg.status,
                stock: obj.stock,
                storeId: rootState.userSecondMsg.storeId,
                tagRecommend: obj.tagRecommend,
                town: rootState.userSecondMsg.town
            }).then(res => {
                // console.log("搜索商品", res.result)
                return res.result;
            })
        }
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
        getUserMsg(context, obj) {//个人数据1
            return getPersonalData({ id: obj.id }).then(res => {
                if (res) {
                    context.commit("setUserMsg", res.result);
                    return res.result;
                }
            })
        },
        getUserSecondMsg(context, obj) {//个人数据2
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
            }
        }
    })],
})

export default Store