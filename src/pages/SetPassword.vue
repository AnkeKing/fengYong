<template>
  <div class="box">
    <app-head :title="title" :backBool="true"></app-head>
    <app-warn-alert></app-warn-alert>
    <div class="content-box">
      <ul class="setpass-form">
        <li class="inputLi">
          <img v-if="phoneValue.length<=0" src="../assets/img/login(9).png" class="change-color">
          <img v-else src="../assets/img/ic_phone_red.png" class="change-color">
          <input type="text" placeholder="请输入手机号码" v-model="phoneValue">
          <hr>
        </li>
        <li class="inputLi">
          <img
            v-if="phoneValue.length<=0"
            src="../assets/img/yanzhengma@2x.png"
            class="change-color"
          >
          <img v-else src="../assets/img/yanzhnegma@2x.png" class="change-color">
          <input type="text" placeholder="请输入短信验证码" v-model="codeValue" ref="passInput">
          <a
            @click="toSendCode"
            :class="phoneValue.length>0?'click-bool':true"
          >{{count}}{{s}} {{codeText}}</a>
          <hr>
        </li>
        <li class="inputLi">
          <img v-if="newpassValue.length<=0" src="../assets/img/login(13).png" class="change-color">
          <img v-else src="../assets/img/login(15).png" class="change-color">
          <input
            type="password"
            placeholder="新密码 (6-15位数字、字母组合)"
            v-model="newpassValue"
            ref="passInput"
            @blur="testPassword"
          >
          <hr>
        </li>
        <li class="inputLi">
          <img v-if="passValue.length<=0" src="../assets/img/login(13).png" class="change-color">
          <img v-else src="../assets/img/login(15).png" class="change-color">
          <input
            type="password"
            placeholder="确认新密码"
            v-model="passValue"
            ref="passInput"
            @blur="comparePassword"
          >
          <hr>
        </li>
        <li>
          <button
            :class="passValue.length>0&&phoneValue.length>0&&newpassValue.length>0&&codeValue.length>0?'finishBtn':finishBtn"
            :disabled="passValue==''||phoneValue==''||newpassValue==''||codeValue.length==''?true:false"
            @click="setPassword"
          >完成</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Head from "../components/Head";
import WarnAlert from "../components/WarnAlert";
import { sendVerifyCode } from "../api/send";
import { setPassword } from "../api/send";
export default {
  name: "Box",
  data() {
    return {
      title: "忘记密码",
      phoneValue: '',
      passValue: "",
      newpassValue: "",
      codeValue: "",
      finishBtn: true,
      showListBool: false,
      phoneList: [],
      lookPass: false,
      count: "",
      s: "",
      codeText: "获取验证码"
    };
  },
  methods: {
    toSendCode() {
      if (this.phoneValue != "" && typeof this.count != "number") {
        if (this.$store.getters["login/verifyUserPhone"](this.phoneValue)) {
          this.codeText = "重新发送";
          this.count = 60;
          this.s = "S";
          var timer = null;
          timer = setInterval(() => {
            if (this.count <= 1) {
              this.clearTime(timer);
            } else {
              this.count--;
            }
          }, 1000);
          sendVerifyCode({ phone: this.phoneValue }).then(res => {
            if (!res) {
              this.clearTime(timer);
            }
          });
        } else {
          this.$store.dispatch("showWarnAsync", {
            warnBool: true,
            warnText: "手机号码格式错误"
          });
        }
      }
    },
    clearTime(timer) {
      //停止定时器
      this.codeText = "获取验证码";
      this.count = "";
      this.s = "";
      clearInterval(timer);
      timer = null;
    },
    testPassword() {
      if (
        this.passValue != "" &&
        !this.$store.getters["login/verifyUserPassword"](this.passValue)
      ) {
        this.$store.dispatch("showWarnAsync", {
          warnBool: true,
          warnText: "请输入6-15位的登录密码"
        });
      }
    },
    comparePassword() {
      //比较新旧密码
      if (
        this.passValue != "" &&
        this.newpassValue != "" &&
        this.passValue != this.newpassValue
      ) {
        this.$store.dispatch("showWarnAsync", {
          warnBool: true,
          warnText: "两次密码不一致"
        });
        return false;
      } else {
        return true;
      }
    },
    setPassword() {
      if (this.comparePassword()) {
        setPassword({
          loginName: this.phoneValue,
          newPassword: this.newpassValue,
          code: this.codeValue
        }).then(res => {
          if (res) {
            this.$store.dispatch("showWarnAsync", {
              warnBool: true,
              warnText: res.result
            });
            this.$router.replace("/login");
          }
        });
      }
    }
  },
  components: {
    appHead: Head,
    appWarnAlert: WarnAlert
  }
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
@import url("../../static/css/setPassword");
</style>
