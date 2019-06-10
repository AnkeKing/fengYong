<template>
  <div id="app">
    <app-warn-alert></app-warn-alert>
    <app-sku></app-sku>
    <app-loading :loadingText="loadingText"></app-loading>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      loadingText: "加载中"
    };
  },
  mounted() {}
};
</script>

<style>
@import url("../static/css/app");
</style>
