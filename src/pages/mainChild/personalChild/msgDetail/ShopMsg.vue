<template>
  <div class="box">
    <ul class="shopList">
      <li>
        <div><img src="../../../../assets/img/Group 2@2.88x.png"></div>
        <div>
          <a class="shopName">{{userMsg.streetId}}</a>
          <p class="shopAddress">{{userMsg.provinceName+userMsg.cityName+userMsg.districtName+userMsg.streetName+userMsg.detailAddress}}</p>
          <span class="shopStatus"><a>门店状态:</a><a>已启用</a></span>
        </div>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Box",
  data() {
    return {
      userMsg:""
    };
  },
  mounted() {
    this.userMsg = this.$store.state.userMsg;//获取个人信息
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../../../../static/css/shopMsg");
</style>
