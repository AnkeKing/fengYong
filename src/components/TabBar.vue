<template>
  <div class="tab-bar"v-show="$route.path.indexOf('/main')!=-1">
    <ul>
      <router-link v-for="(item,index) in tabBarIcon":key="index":to="item.name" :class="{'current-select':item.name===$route.name}"tag="li">
        <img :src="item.defaultImg"v-if="item.name!==$route.name":class='item.name=="shopList"?"specialImg":""'>
        <img :src="item.selectedImg"v-else :class='item.name=="shopList"?"specialImg":""'>
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
  position: relative;
  z-index: 9;
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
          margin: 0.06rem 0 0.02rem 0;
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
