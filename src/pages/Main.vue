<template>
  <div class="box">
    <app-data-loading></app-data-loading>
    <router-view></router-view>
    <app-tab-bar :tabBarIcon="tabBarIcon"></app-tab-bar>
  </div>
</template>

<script>
export default {
  name: "Box",
  data() {
    return {
      tabBarIcon:[
        {
          title:'首页',
          defaultImg:require('../assets/img/ic_index_default.png'),
          selectedImg:require('../assets/img/ic_index_selected.png'),
          name:'home'
        },
        {
          title:'分类',
          defaultImg:require('../assets/img/page.png'),
          selectedImg:require('../assets/img/Page 1@3x.png'),
          name:'shopList'
        },{
          title:'购物车',
          defaultImg:require('../assets/img/ic_cart_default.png'),
          selectedImg:require('../assets/img/ic_cart_selected.png'),
          name:'shopCar'
        },{
          title:'我的',
          defaultImg:require('../assets/img/ic_my_default.png'),
          selectedImg:require('../assets/img/ic_my_selected.png'),
          name:'personal'
        }
      ],
    };
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.box {
    display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
