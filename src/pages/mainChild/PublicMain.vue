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
</style>
