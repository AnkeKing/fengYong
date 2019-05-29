<template>
  <div class="scroll-box">
    <app-home-head></app-home-head>
    <div class="content-box" @scroll="setSearchStatus">
      <!-- 搜索框 -->
      <div :class="scrollBool?'search-fixed':'search-position'">
        <div>
          <img src="../assets/img/Combined Shape@2.88x.png">
          <input type="text" placeholder="搜索商品">
        </div>
      </div>
      <!-- 轮播图盒子1 -->
      <div class="slides-box-one">
        <app-slides :slides="slides" :showIndicators="true"></app-slides>
        <ul class="nav-ul">
          <li>
            <img src="../assets/img/ic_idx_list.png">
            <a>常购清单</a>
          </li>
          <li>
            <img src="../assets/img/ic_idx_coupon.png">
            <a>领劵中心</a>
          </li>
          <li>
            <img src="../assets/img/ic_idx_order.png">
            <a>我的订单</a>
          </li>
          <li>
            <img src="../assets/img/ic_idx_dea.png">
            <a>我的供应商</a>
          </li>
        </ul>
      </div>
      <!-- 滚动文字 -->
      <div class="scrolltext-box">
        <span>
          <img src="../assets/img/laba(1).png">
          <a>新增《营销工具“拼团”玩法使用说明》内容详情向峰网头条</a>
        </span>
      </div>
       <!-- 今日推荐内容区 -->
      <app-shop-title :titleObj="dailyrcmd"></app-shop-title>
      <ul class="dailyrcmd-box">
        <li v-for="obj in dailyrcmdData">
          <span class="rcmdImg"v-show="obj.newBool">新品</span>
          <img :src="obj.img" class="img">
          <a class="name">{{obj.name}}</a>
          <a class="text">{{obj.text}}</a>
          <span class="shop-msg-box">
            <a>￥{{obj.price}}</a>
            <img src="../assets/img/ic_shop.png">
          </span>
        </li>
      </ul>
      <!-- 热门品牌内容区 -->
      <app-shop-title :titleObj="hotBrand"></app-shop-title>
      <app-slides :slides="hotBrandSlides" :showIndicators="true"></app-slides>
    </div>
    <app-Home-food></app-Home-food>
  </div>
</template>

<script>
import HomeHead from "../components/HomeHead";
import ShopTitle from "../components/ShopTitle";
export default {
  name: "Scroll-box",
  data() {
    return {
      scrollBool: false,
      slides: [
        {
          image:
            "https://hbimg.huabanimg.com/be615efb2ecfc7d898e1429f7dd74325e1ca3d233abe5-p3rSIG_fw658"
        },
        {
          image:
            "https://hbimg.huabanimg.com/2448aec1b1fbbffc25ef791afc40a550d88b56f51c00f-dTFhWb_fw658"
        },
        {
          image:
            "https://hbimg.huabanimg.com/4eafba5c9ebec4ce4a3b887291e1ce6110086d6c60e42c-ASZ3aH_fw658"
        },
        {
          image:
            "https://hbimg.huabanimg.com/833f48edd3e826ec7b339434477113ac3701e701782ac-cNs6HS_fw658"
        },
      ],
      dailyrcmd: {
        leftSrc: "../../static/img/remen-left-icon.png",
        rightSrc: "../../static/img/remen-right-icon.png",
        text: "今日推荐",
        color: "#FD6F17"
      },
      hotBrand: {
        leftSrc: "../../static/img/remen-left-icon.png",
        rightSrc: "../../static/img/remen-right-icon.png",
        text: "热门品牌",
        color: "#ED0C0D"
      },
      dailyrcmdData: [
        {
          newBool: true,
          img: "../../static/img/daily(2).png",
          name: "YSL/圣罗兰黑管唇釉呦呦呦呦",
          text: "圣罗兰官方旗舰店",
          price: 2000.000
        },
        {
          newBool: true,
          img: "../../static/img/daily(3).png",
          name: "YSL/圣罗兰黑管唇釉",
          text: "圣罗兰官方旗舰店",
          price: 193.88
        },
        {
          newBool: false,
          img: "../../static/img/daily(2).png",
          name: "YSL/圣罗兰黑管唇釉",
          text: "圣罗兰官方旗舰店",
          price: 295.00
        },
        {
          newBool: false,
          img: "../../static/img/daily(3).png",
          name: "YSL/圣罗兰黑管唇釉",
          text: "圣罗兰官方旗舰店",
          price: 1293.88
        }
      ],
      hotBrandSlides: [
        {
          image:
            "https://hbimg.huabanimg.com/75cbe96176438c9b5c1941143c42db3892651b2d6f1d2-q5q7mj_fw658"
        },
        {
          image:
            "https://hbimg.huabanimg.com/f85ad8ede5991559ad9543465f87762ade19c10bf39b-ntu4qz_fw658"
        },
        {
          image:
            "https://hbimg.huabanimg.com/686d7f3ba675a507efadbb5fb839dec7b2bf6af5165c6-vfDcUe_fw658"
        }
      ],
    };
  },
  mounted() {},
  methods: {
    setSearchStatus(e) {
      if (e.target.scrollTop > 368) {
        this.$store.commit("home/setHomeHeadBool", false);
        this.scrollBool = true;
      } else {
        this.$store.commit("home/setHomeHeadBool", true);
        this.scrollBool = false;
      }
    }
  },
  components: {
    appHomeHead: HomeHead,
    appShopTitle: ShopTitle
  }
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
@import url("../../static/css/home");
</style>
<style>
.slides-box-one .van-swipe__indicators {
  bottom: 0.5rem;
}
</style>