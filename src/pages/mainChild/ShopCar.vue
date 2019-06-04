<template>
  <div class="scroll-box">
    <app-head :backBool="false" :search="false"></app-head>
    <div class="content-box">
      <div class="shop-group">
        <div class="company">
          <span>
          <input type="checkbox">
            <a>成都康莱商贸有限公司</a>
            <img src="../../assets/img/ic-next-left.png">
          </span>
          <a>优惠券</a>
        </div>
        <ul class="shop-msg-ul">
          <li>
            <input type="checkbox">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scroll-box",
  data() {
    return {};
  },
  created() {
    this.$store.commit("setHeaderTitle", "购物车");
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
@import url("../../../static/css/shopCar");
</style>
