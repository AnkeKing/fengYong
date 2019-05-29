<template>
  <div class="headbox">
    <img v-show="backBool" src="../assets/img/Fill1.png" class="back-img"@click="goBack">
    <a>{{title}}</a>
  </div>
</template>

<script>
export default {
  name: "Headbox",
  data() {
    return {};
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  },
  props: ["title", "backBool"],
  components: {}
};
</script>

<style rel='stylesheet/scss' lang='scss'scoped>
.headbox {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  padding: 0.13rem 0 0.13rem 0;
  width: 100%;
  position: relative;
  a {
    font-family: "PingFangSC-Regular";
    font-size: 0.18rem;
    color: #030303;
  }
  .back-img {
    width: 0.3rem;
    display: block;
    padding: 0.1rem;
    position: absolute;
    top: 0.03rem;
    left: 0.13rem;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    background: #e4e4e4;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>
