<template>
  <div class="home-head-box" v-show="$store.state.home.homeHeadBool">
    <span>
      <img src="../assets/img/ic_dingwei.png">
      <a>北京</a>
      <img src="../assets/img/ic_down.png" class="icon-down">
    </span>
    <button>我要卖货</button>
  </div>
</template>

<script>
export default {
  name: "Home-head-box",
  data() {
    return {};
  },
  components: {
   
  }
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
.home-head-box {
  width: 100%;
  height: 0.44rem;
  background-color: #dd3333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.12rem 0 0.12rem;
  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 0.2rem;
      height: 0.2rem;
      padding: 0.03rem 0.03rem 0.02rem 0.03rem;
    }
    .icon-down {
      width: 0.2rem;
      height: 0.2rem;
      padding: 0.06rem 0.07rem 0.08rem 0.07rem;
    }
    a {
      font-size: 0.16rem;
      color: #ffffff;
    }
  }
  button {
    font-size: 0.14rem;
    color: #ffffff;
    width: 0.77rem;
    height: 0.24rem;
    border: 0.005rem solid #ffffff;
    border-radius: 30px;
    background-color: transparent;
  }
}
</style>
