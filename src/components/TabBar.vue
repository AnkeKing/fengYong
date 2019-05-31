<template>
  <div class="tab-bar">
    <ul>
      <router-link v-for="(item,index) in tabBarIcon":key="index":to="item.path" :class="{'current-select':item.path===$route.path}"tag="li">
        <img :src="item.defaultImg"v-if="item.path!==$route.path":class='item.path=="/shopList"?"specialImg":""'>
        <img :src="item.selectedImg"v-else :class='item.path=="/shopList"?"specialImg":""'>
        <a>{{item.title}}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tab-bar",
  data() {
    return {
      tabBarIcon:[
        {
          title:'首页',
          defaultImg:require('../assets/img/ic_index_default.png'),
          selectedImg:require('../assets/img/ic_index_selected.png'),
          path:'/home'
        },
        {
          title:'分类',
          defaultImg:require('../assets/img/page.png'),
          selectedImg:require('../assets/img/Page 1@3x.png'),
          path:'/shopList'
        },{
          title:'购物车',
          defaultImg:require('../assets/img/ic_cart_default.png'),
          selectedImg:require('../assets/img/ic_cart_selected.png'),
          path:'/shopCar'
        },{
          title:'我的',
          defaultImg:require('../assets/img/ic_my_default.png'),
          selectedImg:require('../assets/img/ic_my_selected.png'),
          path:'/personal'
        }
      ]
    };
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
.tab-bar {
  width: 100%;
  background-color: #ffffff;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.05rem 0 0.05rem 0;
    li {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      img {
        width: 0.3rem;
      }
      .specialImg{
          width: 0.22rem;
          margin-top: 0.05rem;
      }
      a {
        font-size: 0.11rem;
        color: #666666;
        margin-top: 0.05rem;
      }
    }
    .current-select{
      a {
        color: #dd3333;
      }
    }
  }
}
</style>
