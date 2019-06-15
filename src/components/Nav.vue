<template>
  <div class="fix-nav">
    <div class="nav-btn" @click="navBool=!navBool">
      <img src=".././assets/img/ic_tabs.png" v-if="!navBool">
      <span v-else>
        <img src=".././assets/img/ic_tabsX.png">
      </span>
      <a v-if="!navBool">快速导航</a>
    </div>
    <ul class="show-link" v-show="navBool">
      <router-link :to="{name:'home'}" tag="li">
        <img src=".././assets/img/ic_tabsGrunp(5).png">
      </router-link>
      <router-link :to="{name:'shopList'}" tag="li">
        <img src=".././assets/img/ic_tabsGrunp(3).png">
      </router-link>
      <router-link :to="{name:'shopCar'}" tag="li">
        <img src=".././assets/img/ic_tabsGrunp(4).png">
        <!-- <a class="count-circe" v-if="shopCarData.goodsCount>0">{{shopCarData.goodsCount}}</a> -->
      </router-link>
      <router-link :to="{name:'personal'}" tag="li">
        <img src=".././assets/img/ic_tabsGrunp(6).png">
      </router-link>
      <router-link :to="{name:'home'}" tag="li">
        <img src=".././assets/img/ic_tabsGrunp(1).png">
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Box",
  data() {
    return {
      navBool: false
    };
  },
  // props: ["shopCarData"],
  created() {
    this.navBool = false;
  },
  components: {
  }
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.fix-nav {
  position: fixed;
  bottom: 1rem;
  right: 0.5rem;
  z-index: 9;

  .nav-btn {
    position: relative;

    a {
      color: #ffffff;
      width: 0.33rem;
      font-size: 0.12rem;
      position: absolute;
      top: 0.05rem;
      left: 0.05rem;
    }

    img {
      width: 0.37rem;
      height: 0.37rem;
      position: absolute;
      bottom: 0rem;
      top: 0rem;
    }
    span {
      width: 0.35rem;
      height: 0.35rem;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      position: absolute;
      img {
        width: 0.12rem;
        height: 0.12rem;
        margin: 0.12rem 0 0 0.12rem;
      }
    }
  }

  .show-link {
    position: relative;
    right: 1rem;

    li {
      width: 0.3rem;
      height: 0.3rem;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      .count-circe {
        font-size: 0.1rem;
        color: #ffffff;
        top: -0.04rem;
        right: -0.05rem;
      }
      &:nth-of-type(1) {
        top: -1.05rem;
        right: -1.45rem;
      }
      &:nth-of-type(2) {
        top: -1.01rem;
        right: -1rem;
      }
      &:nth-of-type(3) {
        top: -0.8rem;
        right: -0.53rem;
      }
      &:nth-of-type(4) {
        top: -0.42rem;
        right: -0.24rem;
      }
      &:nth-of-type(5) {
        top: 0.05rem;
        right: -0.18rem;
      }
      img {
        width: 0.15rem;
        height: 0.15rem;
      }
    }
  }
}
</style>
