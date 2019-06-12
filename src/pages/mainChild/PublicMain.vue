<template>
 <div class="box">
     <app-head :backBool="true" :search="false"></app-head>
     <router-view></router-view>
 </div>
</template>

<script>
export default {
name:'Box',
 data() {
 return {

 }
 },
 components: {

 }
}
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.box{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
