<template>
 <div class="scroll-box">
     <div class="content-box">
         <h1 @click="logout">personal</h1>
     </div>
 </div>
</template>

<script>
export default {
name:'Scroll-box',
 data() {
 return {

 }
 },
 methods:{
     logout(){
         localStorage.removeItem('vuex');
         this.$store.commit('setToken',false);
         this.$router.replace('/login');
     }
 },
 components: {

 }
}
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
</style>
