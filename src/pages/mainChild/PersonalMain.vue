<template>
 <div class="box">
     <app-head :backBool="true":searchBool="false"></app-head>
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
 created(){
      this.$store.commit("setHeaderTitle","");
  },
 components: {

 }
}
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
</style>
