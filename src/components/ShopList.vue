<template>
  <div class="shoplist-box">
    <ul class="content-box">
      <li v-for="obj in shoplist">
        <span class="rcmdImg" v-show="obj.newBool">新品</span>
        <img :src="obj.img" class="img">
        <a class="name">{{obj.name}}</a>
        <a class="text">{{obj.text}}</a>
        <span class="shop-msg-box">
          <a>￥{{obj.price}}</a>
          <img src="../assets/img/ic_shop.png">
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Shoplist-box",
  data() {
    return {};
  },
  props: ["shoplist"],
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.shoplist-box {
  @include w(100%);
  .content-box {
    @include whbc(100%, 2.19rem, none, #ffffff);
    overflow-x: scroll;
    padding: 0.1rem 0.14rem 0.1rem 0.14rem;
    display: flex;
    li {
      float: left;
      @include wh(1.34rem, 1.99rem);
      border: 0.01rem solid #cccccc;
      padding: 0.1rem 0.09rem 0.11rem 0.09rem;
      display: flex;
      flex-direction: column;
      position: relative;
      justify-content: space-around;
      margin-right: 0.1rem;

      .rcmdImg {
        @include wh(0.36rem, 0.2rem);
        font-size: 0.11rem;
        color: #ffffff;
        background: url("../../src/assets/img/tuijian.png") no-repeat 100% 100%;
        position: absolute;
        top: -0.02rem;
        left: -0.05rem;
        @include center();
      }

      .img {
        @include wh(1.1rem, 1.14rem);
        margin-bottom: 0.005rem;
      }

      .name {
        @include w(100%);
        @include setFont(0.12rem, #333333);
        overflow: hidden; //溢出的部分隐藏；
        text-overflow: ellipsis; //文本溢出显示省略号；
        display: -webkit-box; //作为弹性伸缩盒子模型显示
        -webkit-line-clamp: 1;
        height: 0.14rem;
      }

      .name::after {
        content: "...";
      }

      .text {
        @include setFont(0.09rem, #999999);
      }

      .shop-msg-box {
        display: flex;
        justify-content: space-between;
        margin-top: 0.07rem;

        img {
          @include wh(0.2rem, 0.2rem);
          padding: 0.02rem 0.02rem 0.02rem 0.02rem;
        }

        a {
          @include setFont(0.18rem, #dd3333);
        }
      }
    }
  }
}
</style>
