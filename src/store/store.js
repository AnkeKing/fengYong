import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index';
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
const home={//孙级
    namespaced: true,
    state: {
        homeHeadBool: true,
    },
    mutations: {
        setHomeHeadBool(state, bool) {
            state.homeHeadBool = bool;
        },
    },
    actions:{
    }
}
const shopList={//孙级
    namespaced: true,
    state:{
        shopIndex:0,
    },
    mutations:{
        setShopIndex(state,index){
            state.shopIndex=index;
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
    modules:{
        home:home,
        shopList:shopList
    }
}

const Store = new Vuex.Store({
    state: {
        headerTitle:'',
        warnBool: false,
        warnText: "",
        loading: false,
        dataLoading:false,
        selectObj: [],
        papersType: '营业执照',
        alertBool: false,
        token: '',
        userId:'',
        userMsg:null
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
        setUserMsg(state, msg) {
            state.userMsg = msg;
        },
        setHeaderTitle(state,title){
            state.headerTitle=title;
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
        logoutHandle(context){//退出登录
            localStorage.removeItem("vuex");
            context.commit("setToken", false);
            context.commit("setUserId", false);
            context.commit("setUserMsg", null);
            router.replace("/login");
        },
    },
    modules: {
        login: login,
        register: register,
        main: main
    },
    plugins: [createPersistedState({
        reducer(val) {
            // console.log("val:",val);
            return {
                // 只储存state中的token 使vuex的token刷新不掉
                token: val.token,
                userId:val.userId,
                userMsg:val.userMsg
            }
        }
    })]
})

export default Store