<template>
  <div class="box">
    <router-view></router-view>
    <app-tab-bar></app-tab-bar>
  </div>
</template>

<script>
export default {
  name: "Box",
  data() {
    return {};
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
