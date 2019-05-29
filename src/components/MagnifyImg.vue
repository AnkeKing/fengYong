<template>
  <div class="magnify-box"v-show="$store.state.register.magnifyBool"@click="hidden">
      <img :src="$store.state.register.magnifyImg">
  </div>
</template>

<script>
export default {
  name: "Magnify-box",
  data() {
    return {};
  },
  methods:{
      hidden(){
          this.$store.commit('register/magnifyBool',{'img':'','bool':false})
      }
  },
  computed:{
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
.magnify-box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
  display: flex;
  align-items: center;
  img{
      width: 100%;

  }
}
</style>
