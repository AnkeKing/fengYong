<template>
  <div class="scroll-box">
    <app-home-head></app-home-head>
    <div class="content-box"@scroll="setSearchStatus">
      <div :class="scrollBool?'search-fixed':'search-position'">
        <div>
          <img src="../assets/img/Combined Shape@2.88x.png">
          <input type="text" placeholder="搜索商品">
        </div>
      </div>
      <div class="viewpager-box">
        <img src="../assets/img/Group 2@2.88x.png">
      </div>
      <span></span>
    </div>
    <app-Home-food></app-Home-food>
  </div>
</template>

<script>
import HomeHead from "../components/HomeHead";
export default {
  name: "Scroll-box",
  data() {
    return {
      scrollBool: false,
    };
  },
  mounted() {
  },
  methods: {
    setSearchStatus(e) {
      if(e.target.scrollTop>368){
          this.$store.commit('home/setHomeHeadBool',false);
          this.scrollBool=true;
      }else{
          this.$store.commit('home/setHomeHeadBool',true);
          this.scrollBool=false;
      }
    }
  },
  components: {
    appHomeHead: HomeHead,
  }
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
@import url("../../static/css/home");
</style>
