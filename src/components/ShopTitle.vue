<template>
  <div class="shop-title-box">
    <div :style="{'color':titleObj.color}">
        <img :src="titleObj.leftSrc">
        {{titleObj.text}}
        <img :src="titleObj.rightSrc">
        </div>
  </div>
</template>

<script>
export default {
  name: "Shop-title-box",
  data() {
    return {};
  },
  props: ["titleObj"],
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.shop-title-box {
  width: 100%;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  div {
    height: 0.4rem;
    font-size: 0.14rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    img{
        width: 0.3rem;
        margin: 0 0.08rem 0 0.08rem;
    }
  }
}
</style>
