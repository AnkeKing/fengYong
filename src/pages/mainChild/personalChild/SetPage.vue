<template>
  <div class="box">
    <app-slot-head styles="slot-head" :backBool="true" :searchBool="false">
      <template v-slot:title>
        <a>设置</a>
      </template>
    </app-slot-head>
    <app-Select-alert ref="selectAlert"></app-Select-alert>
    <div class="photo-box">
      <span class="photo-span">
        <img src="../../../assets/img/ic_bills_come.png">
      </span>
      <a>{{nickName}}</a>
    </div>
    <div class="nickname-box">
      <a>昵称</a>
      <span>
        <a>编辑</a>
        <img src="../../../assets/img/ic-next-left.png">
      </span>
    </div>
    <ul class="form-box">
      <li>
        <a>账户安全</a>
        <hr>
      </li>
      <li>
        <a>修改登录手机号</a>
        <span>
          <a>{{telphone}}</a>
          <img src="../../../assets/img/ic-next-left.png">
        </span>
        <hr>
      </li>
      <li>
        <a>修改登录密码</a>
        <img src="../../../assets/img/ic-next-left.png">
        <hr>
      </li>
      <li>
        <a>修改支付密码</a>
        <img src="../../../assets/img/ic-next-left.png">
        <hr>
      </li>
      <li>
        <a>忘记支付密码</a>
        <img src="../../../assets/img/ic-next-left.png">
      </li>
    </ul>
    <div class="close-box">
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Box",
  data() {
    return {
      telphone:""
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("showSelectAlert", {
        selectObj: {
          question: "确定退出登录?",
          btns: "取消-确定",
          boxType: "confirm",
          confirmType: "question",
          nextActionType:"nextLogout"
        }
      });
    }
  },
  mounted(){
     let tel = this.userMsg.telphone;
     this.telphone = tel.replace(tel.substring(3, 7), "****");
  },
  computed: {
    ...mapState({
      userMsg: state => state.userMsg,
      nickName:state => state.userMsg.nickName,
    })
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../../../static/css/setPage");
</style>
