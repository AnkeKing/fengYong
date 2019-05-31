<template>
  <div class="scroll-box" @click="showListBool=false">
    <app-head :title="title" :backBool="false"></app-head>
    <app-loading :loadingText="loadingText"></app-loading>
    <app-Select-alert></app-Select-alert>
    <div class="content-box">
      <div class="logoBox">
        <img src="../assets/img/login(11).png">
      </div>
      <ul class="loginForm">
        <li class="inputLi">
          <img v-if="phoneValue.length<=0" src="../assets/img/login(9).png" class="change-color">
          <img v-else src="../assets/img/ic_phone_red.png" class="change-color">
          <input type="text" placeholder="手机号码" v-model="phoneValue">
          <img
            src="../assets/img/ic_clear_text.png"
            @click="phoneValue=''"
            v-if="phoneValue.length>0"
            class="clear-text"
          >
          <img
            v-if="phoneList.length!=0"
            @click.stop="showListBool=!showListBool"
            src="../assets/img/login(20).png"
            class="role-img"
          >
          <ul class="phoneListDrop" v-show="showListBool">
            <li v-for="p,index in phoneList" @click="checkPhone(index)">{{p.loginName}}</li>
          </ul>
          <hr>
        </li>
        <li class="inputLi">
          <img v-if="passValue.length<=0" src="../assets/img/login(13).png" class="change-color">
          <img v-else src="../assets/img/login(15).png" class="change-color">
          <input type="password" placeholder="请输入密码" v-model="passValue" ref="passInput">
          <img
            src="../assets/img/ic_clear_text.png"
            class="clear-text"
            @click="passValue=''"
            v-if="passValue.length>0"
          >
          <img
            v-show="lookPass==false"
            @touchstart="changePassType"
            src="../assets/img/login(19).png"
            class="role-img"
          >
          <img
            v-show="lookPass==true"
            @touchstart="changePassType"
            src="../assets/img/login(17).png"
            class="role-img"
          >
          <hr>
        </li>
        <li>
          <button
            :class="passValue.length>0&&phoneValue.length>0?'loginBtn':loginBtn"
            @click="toHome"
            :disabled="passValue.length<=0||phoneValue.length<=0?true:false"
          >登录</button>
        </li>
        <li>
          <router-link to="/setPassword">忘记密码</router-link>
        </li>
      </ul>
      <div class="toRegister">
        <router-link to="/registerHome" tag="button">立即注册 ></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../components/Head";
import { verifyLoginID } from "../api/send";
export default {
  name: "Scroll-box",
  data() {
    return {
      title: "登录",
      phoneValue: "",
      passValue: "",
      loginBtn: true,
      showListBool: false,
      lookPass: false,
      loadingText: "登录中",
      nextPath: false
    };
  },
  methods: {
    //显示隐藏密码
    changePassType() {
      if (this.lookPass == false) {
        this.$refs.passInput.type = "text";
        this.lookPass = true;
      } else {
        this.$refs.passInput.type = "password";
        this.lookPass = false;
      }
    },
    //登陆操作
    toHome() {
      let PASS_REGEXP = /^\S+$/;
      if (
        this.$store.getters["login/verifyUserPhone"](this.phoneValue) &&
        this.$store.getters["login/verifyUserPassword"](this.passValue)
      ) {
        //1.判断用户名密码格式
        const loginMsg = {
          loginName: this.phoneValue,
          password: this.passValue
        };
        verifyLoginID(loginMsg).then(res => {
          if (res) {
            if (this.nextPath) {
              this.$router.replace({path:this.nextPath});
              this.$store.dispatch("showWarnAsync", {
                warnBool: true,
                warnText: "登录成功",
              });
            } else {
              this.$router.replace("/");
              this.$store.dispatch("showWarnAsync", {
                warnBool: true,
                warnText: "登录成功",
              });
            }
          }

        });
      } else {
        this.$store.dispatch("showWarnAsync", {
          warnBool: true,
          warnText: "用户名或密码格式错误",
        });
      }
    },
    //在历史记录中选择手机号码
    checkPhone(index) {
      this.phoneValue = this.phoneList[index].loginName;
      this.showListBool = false;
    }
  },
  mounted() {
    this.nextPath = this.$route.query.nextPath;
  },
  computed: {
    phoneList() {
      return JSON.parse(localStorage.getItem("userList")) || [];
    }
  },
  components: {
    appHead: Head
  }
};
</script>

<style scoped>
@import url("../../static/css/login.css");
</style>
