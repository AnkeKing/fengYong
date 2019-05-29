import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)


const register = {
    namespaced: true,
    state: {
        upLoadingImg: false,
        magnifyBool:false,
        magnifyImg:''
    },
    getters: {

    },
    mutations: {
        upLoadingImg(state, imgStatus) {
            state.upLoadingImg = imgStatus.bool;
        },
        magnifyBool(state, imgObj) {
            state.magnifyBool = imgObj.bool;
            state.magnifyImg=imgObj.img;
        },
    }
}
const login = {
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
                    if (localUserList[l].loginName != user.loginName) {state.loginRecordArr.push(localUserList[l]);
                    }
                }
                localStorage.setItem("userList", JSON.stringify(state.loginRecordArr));
                // console.log('localStorage中的userList：', JSON.parse(localStorage.getItem("userList")))
            }
        },

    },
    
}
const home={
    namespaced: true,
    state:{
        homeHeadBool:true
    },
    mutations:{
        setHomeHeadBool(state,bool){
            state.homeHeadBool=bool;
        }
    }
}
const Store = new Vuex.Store({
    state: {
        warnBool: false,
        warnText: "",
        loading: false,
        selectObj: [],
        papersType: '营业执照',
        alertBool: false,
        token: '',
    },
    getters: {

    },
    mutations: {
        showWarn(state, warnObj) {
            state.warnBool = warnObj.warnBool;
            state.warnText = warnObj.warnText
        },
        showLoading(state, bool) {
            state.loading = bool;
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
    },
    actions: {
        showWarnAsync(context, warnObj) {//显示错误信息
            if (!context.state.loading) {//如果loading没显示时错误信息的弹窗立即显示
                context.commit("showWarn", { 'warnBool': warnObj.warnBool, 'warnText': warnObj.warnText });
                setTimeout(() => {
                    context.commit("showWarn", { 'warnBool': false, 'warnText': '' });
                }, 2000)
            } else {//如果loading显示时错误信息的弹窗等待几秒
                setTimeout(() => {
                    context.commit("showWarn", { 'warnBool': warnObj.warnBool, 'warnText': warnObj.warnText });
                }, 1000)
                setTimeout(() => {
                    context.commit("showWarn", { 'warnBool': false, 'warnText': '' });
                }, 2700)
            }
        },
        showSelectAlert(context, selectObj) {
            context.commit('changeAlertBool', true);
            context.commit('showSelectAlert', selectObj);
        },
    },
    modules: {
        login: login,
        register: register,
        home:home
    },
    plugins: [createPersistedState({
        reducer(val) {
            // console.log("val:",val);
            return {
                // 只储存state中的token 使vuex的token刷新不掉
                token: val.token
            }
        }
    })]
})

export default Store