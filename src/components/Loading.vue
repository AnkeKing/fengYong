<template>
  <div class="shade" v-show="loading">
    <img src="../assets/img/floor.png">
    <a>{{loadingText}}...</a>
  </div>
</template>

<script>
export default {
  name: "Shade",
  data() {
    return {

    };
  },
  computed:{
    loading(){
      return this.$store.state.loading;
    }
  },
  props:['loadingText'],
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
  background-image: url("../assets/img/bk.jpg");
  background-size: cover;
  opacity: 0.7;
  > img {
      width: 0.65rem;
    position: absolute;
    left: 40%;
    top: 38%;
    animation: floor 3s linear infinite;
  }
  > a {
    position: absolute;
    left: 40%;
    top: 50%;
    color: white;
    font-size: 17px;
    font-weight: bold;
    font-family: "宋体";
  }
}

@keyframes floor {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
