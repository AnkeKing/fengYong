<template>
  <div class="slot-head-box" :class="styles">
    <img v-show="backBool" src="../assets/img/Fill1.png" class="back-img" @click="goBack">
    <slot name="title"></slot>
    <img v-show="searchBool" src="../assets/img/ic_search.png" class="search-img" @click="goSearch">
  </div>
</template>

<script>
export default {
  name: "Slot-head-box",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goSearch() {}
  },
  props: ["backBool", "searchBool", "styles"],
  components: {}
};
</script>

<style rel='stylesheet/scss' lang='scss'scoped>
.slot-head-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  padding: 0.13rem 0 0.13rem 0;
  width: 100%;
  position: relative;
  a {
    font-family: "PingFangSC-Regular";
    font-size: 0.18rem;
    color: #030303;
  }

  .back-img {
    width: 0.3rem;
    display: block;
    padding: 0.1rem;
    position: absolute;
    top: 0.03rem;
    left: 0.13rem;
  }
  .search-img {
    width: 0.3rem;
    display: block;
    padding: 0.07rem;
    position: absolute;
    top: 0.06rem;
    right: 0.15rem;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    background: #e4e4e4;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
.slot-head {
  span {
    .active {
      color: #dd3333;
    }
    a {
      font-size: 0.16rem;
      color: #333333;
      margin-left: 0.19rem;
    }
  }
}
.shop-car-head {
  span {
    a:nth-of-type(1) {
      font-size: 0.18rem;
      color: #030303;
    }
    a:nth-of-type(2) {
      font-size: 0.16rem;
      color: #333333;
      position: absolute;
      top: 0.14rem;
      right: 0.14rem;
    }
  }
}
</style>
