<template>
  <div class="box">
    <app-Select-alert ref="selectAlert"></app-Select-alert>
    <div class="photo-box">
      <span class="photo-span">
        <img src="../../../assets/img/ic_bills_come.png">
      </span>
      <a>Kality</a>
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
          <a>152***5981</a>
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
export default {
  name: "Box",
  data() {
    return {};
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
  created(){
      this.$store.commit("setHeaderTitle","设置");
  },
  computed: {
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../../../static/css/setPage");
</style>
