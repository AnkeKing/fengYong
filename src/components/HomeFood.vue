<template>
  <div class="homeFood">
    <ul>
      <router-link to="/home" :class="{'current-select':'/home'===$route.path}"tag="li">
        <img src="../assets/img/ic_index_default.png"v-if="'/home'!=$route.path">
        <img src="../assets/img/ic_index_selected.png"v-else>
        <a>首页</a>
      </router-link>
      <router-link to="/shopList" :class="{'current-select':'/shopList'===$route.path}"tag="li">
        <img src="../assets/img/page.png" class="specialImg"v-if="'/shopList'!=$route.path">
        <img src="../assets/img/Page 1@3x.png" class="specialImg"v-else>
        <a>分类</a>
      </router-link>
      <router-link to="/shopCar" :class="{'current-select':'/shopCar'===$route.path}"tag="li">
        <img src="../assets/img/ic_cart_default.png"v-if="'/shopCar'!=$route.path">
        <img src="../assets/img/ic_cart_selected.png"v-else>
        <a>购物车</a>
      </router-link>
      <router-link to="/personal" :class="{'current-select':'/personal'===$route.path}"tag="li">
        <img src="../assets/img/ic_my_default.png"v-if="'/personal'!=$route.path">
        <img src="../assets/img/ic_my_selected.png"v-else>
        <a>我的</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeFood",
  data() {
    return {};
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
.homeFood {
  width: 100%;
  height: 0.5rem;
  background-color: #ffffff;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    li {
      display: flex;
      flex-direction: column;
      border: 1px solid black;
      width: 0.5rem;
      height: 0.5rem;
      justify-content: space-around;
      align-items: center;
      img {
        width: 0.3rem;
      }
      .specialImg{
          width: 0.22rem;
      }
      a {
        font-size: 0.11rem;
        color: #666666;
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
