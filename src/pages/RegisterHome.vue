<template>
  <div class="box">
    <app-head :title="title" :backBool="true"></app-head>
    <div class="content-box">
      <ul class="setpass-form">
        <li class="inputLi">
          <img v-if="userName.length<=0" src="../assets/img/ic_personage.png" class="change-color">
          <img v-else src="../assets/img/ic_personage_red.png" class="change-color">
          <input type="text" placeholder="昵称(2-20字符，限制中文、字母、数字)" v-model="userName">
          <img
            src="../assets/img/ic_clear_text.png"
            @click="userName=''"
            v-if="userName.length>0"
            class="clear-text"
          >
          <hr>
        </li>
        <li class="inputLi">
          <img v-if="phoneValue.length<=0" src="../assets/img/login(9).png" class="change-color">
          <img v-else src="../assets/img/ic_phone_red.png" class="change-color">
          <input type="text" placeholder="请输入手机号码" v-model="phoneValue" @blur="verifyPhone">
          <img
            src="../assets/img/ic_clear_text.png"
            @click="phoneValue=''"
            v-if="phoneValue.length>0"
            class="clear-text"
          >
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
          <img v-if="passValue.length<=0" src="../assets/img/login(13).png" class="change-color">
          <img v-else src="../assets/img/login(15).png" class="change-color">
          <input
            type="password"
            placeholder="新密码 (6-15位数字、字母组合)"
            v-model="passValue"
            ref="passInput"
            @blur="testPassword"
          >
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
        <li class="inputLi">
          <img v-if="passValue.length<=0" src="../assets/img/icon_invite.png" class="change-color">
          <img v-else src="../assets/img/icon_invite_red.png" class="change-color">
          <input type="text" placeholder="请输入邀请码 (非必填)" v-model="inviteCode">
          <hr>
        </li>
        <li>
          <button
            :class="userName.length>0&&passValue.length>0&&phoneValue.length>0&&codeValue.length>0?'finishBtn':finishBtn"
            :disabled="userName.length<=0||passValue.length<=0||phoneValue.length<=0||codeValue.length<=0?true:false"
            @click="toRegisterIdent"
          >下一步, 商户认证</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Head from "../components/Head";
import { sendRegisterVerigyCode } from "../api/send";
import { verigyRegisterCode } from "../api/send";
import { submitRegisterMsg } from "../api/send";
export default {
  name: "Box",
  data() {
    return {
      title: "注册",
      userName: "",
      phoneValue: "",
      passValue: "",
      lookPass: false,
      inviteCode: "",
      codeValue: "",
      finishBtn: true,
      showListBool: false,
      phoneList: [],
      lookPass: false,
      errorBool: false,
      count: "",
      s: "",
      codeText: "获取验证码"
    };
  },
  methods: {
    toSendCode() {
      //发送验证码
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
          sendRegisterVerigyCode({ phone: this.phoneValue }).then(res => {
            if (!res) {
              this.clearTime(timer);
            }
          });
        } else {
          this.$store.dispatch("showWarnAsync", {
            warnBool: true,
            warnText: "手机号码格式错误",
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
          warnText: "请输入6-15位的登录密码",
        });
        return false;
      } else {
        return true;
      }
    },
    verifyPhone() {
      if (
        this.phoneValue != "" &&
        !this.$store.getters["login/verifyUserPhone"](this.phoneValue)
      ) {
        this.$store.dispatch("showWarnAsync", {
          warnBool: true,
          warnText: "手机号码格式错误",
        });
      }
    },
    toRegisterIdent() {
      //注册成功跳入商户认证页面
      if (this.testPassword()) {
        verigyRegisterCode({
          phone: this.phoneValue,
          code: this.codeValue
        }).then(res => {
          if (res) {
            const user = {
              nickName: this.userName,
              passWord: this.passValue,
              phone: this.phoneValue
            };
            submitRegisterMsg(user).then(res => {
              if (res) {
                this.$router.replace("/registerIdent");
                this.$store.dispatch("showSelectAlert", {
                  selectObj: {
                    btns: "确认",
                    boxType: "confirm",
                    confirmType: "warn",
                    text: "注册成功",
                    warn: "请进行商户认证."
                  }
                });
              }
            });
          }
        });
      }
    },
    //显示隐藏密码
    changePassType() {
      if (this.lookPass == false) {
        this.$refs.passInput.type = "text";
        this.lookPass = true;
      } else {
        this.$refs.passInput.type = "password";
        this.lookPass = false;
      }
    }
  },
  components: {
    appHead: Head
  }
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
@import url("../../static/css/setPassword");
</style>
