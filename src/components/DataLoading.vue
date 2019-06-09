<template>
  <div class="shade" v-show="$store.state.dataLoading">
    <div>
      <van-loading color="#ffffff" vertical></van-loading>
      <a>加载中</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shade",
  data() {
    return {};
  },
  computed: {},
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
.shade {
  /* 数据加载完成之前的遮罩动画 */
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 1.21rem;
    height: 1.21rem;
    background: rgba(0, 0, 0, 0.99);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 0.07rem 0.07rem 0.12rem 0.07rem;
    a {
      font-size: 0.17rem;
      color: #ffffff;
      font-weight: bold;
    }
  }
}
</style>