<template>
  <div class="tab-bar" v-show="$route.path.indexOf('/main')!=-1">
    <ul>
      <router-link
        v-for="(item,index) in tabBarIcon"
        :key="index"
        :to="item.name"
        :class="{'current-select':item.name===$route.name}"
        tag="li"
      >
        <img
          :src="item.defaultImg"
          v-if="item.name!==$route.name"
          :class="item.name=="shopList"?"specialImg":"""
        >
        <img :src="item.selectedImg" v-else :class="item.name=="shopList"?"specialImg":""">
        <a>{{item.title}}</a>
        <a
          class="count-circe"
          v-if="item.name=='shopCar'&&shopCarData.goodsCount>0"
        >{{shopCarData.goodsCount}}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Tab-bar",
  data() {
    return {};
  },
  props: ["tabBarIcon"],
  mounted() {
    this.$store.dispatch("publicMain/getShopCarData");
  },
  created() {
    // this.$store.dispatch("publicMain/getShopCarData");
  },
  computed: {
    ...mapState({
      shopCarData: state => state.publicMain.shopCarData
    })
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
.tab-bar {
  width: 100%;
  background-color: #ffffff;
  position: relative;
  z-index: 9;
  &::after {
    content: "";
    position: absolute;
    border: 1px solid #666666;
    width: 100%;
    transform: scaleY(0.05);
    top: 0px;
  }
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.05rem 0 0.05rem 0;

    li {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      position: relative;
      img {
        width: 0.3rem;
      }
      .specialImg {
        width: 0.22rem;
        margin: 0.06rem 0 0.02rem 0;
      }
      a {
        font-size: 0.11rem;
        color: #666666;
        margin-top: 0.05rem;
      }
      .count-circe {
        font-size: 0.12rem;
        color: #ffffff !important;
        position: absolute;
        right: -0.11rem;
        top: -0.02rem;
        width: 0.17rem;
        height: 0.17rem;
        opacity: 0.8;
      }
    }
    .current-select {
      a {
        color: #dd3333;
      }
    }
  }
}
</style>
