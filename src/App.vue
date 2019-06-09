<template>
  <div id="app">
    <app-warn-alert></app-warn-alert>
    <app-sku></app-sku>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  mounted(){

  }
}
</script>

<style>
@import url("../static/css/app");
</style>
