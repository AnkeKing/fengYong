<template>
  <div class="headbox">
    <img v-show="backBool" src="../assets/img/Fill1.png" class="back-img"@click="goBack">
    <a>{{$store.state.headerTitle}}</a>
    <img v-show="searchBool" src="../assets/img/ic_search.png" class="search-img"@click="goSearch">
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
    },
    goSearch(){

    }
  },
  props: ["backBool","searchBool"],
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
  z-index: 9;
  a {
    font-family: "PingFangSC-Regular";
    font-size: 0.18rem;
    color: #030303;
    width:42%;
    text-align: center;
    overflow : hidden; /* 溢出的部分隐藏；*/
    text-overflow: ellipsis; /*文本溢出显示省略号；*/
    display: -webkit-box;	/*作为弹性伸缩盒子模型显示*/
    -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
    -webkit-box-orient: vertical; /* 垂直排列 */
    word-break: break-all;
  }
  .back-img {
    width: 0.3rem;
    display: block;
    padding: 0.1rem;
    position: absolute;
    top: 0.03rem;
    left: 0.13rem;
  }
  .search-img{
   width: 0.3rem;
    display: block;
    padding: 0.07rem;
    position: absolute;
    top: 0.06rem;
    right: 0.15rem;
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
