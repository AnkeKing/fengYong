<template>
  <div class="scroll-box">
    <app-home-head></app-home-head>
    <app-loading :loadingText="loadingText"></app-loading>
    <div class="content-box" @scroll="setSearchStatus">
      <!-- 搜索框 -->
      <div id="top" :class="scrollBool?'search-fixed':'search-position'">
        <div>
          <img src="../../assets/img/Combined Shape@2.88x.png">
          <input type="text" placeholder="搜索商品">
        </div>
      </div>
      <!-- 轮播图盒子1 -->
      <div class="slides-box-one">
        <app-slides :slides="slides" :showIndicators="true" slidesClass="one"></app-slides>
        <ul class="nav-ul">
          <li>
            <img src="../../assets/img/ic_idx_list.png">
            <a>常购清单</a>
          </li>
          <li>
            <img src="../../assets/img/ic_idx_coupon.png">
            <a>领劵中心</a>
          </li>
          <li>
            <img src="../../assets/img/ic_idx_order.png">
            <a>我的订单</a>
          </li>
          <li>
            <img src="../../assets/img/ic_idx_dea.png">
            <a>我的供应商</a>
          </li>
        </ul>
      </div>
      <!-- 滚动文字 -->
      <div class="scrolltext-box">
        <span>
          <img src="../../assets/img/laba(1).png">
          <a>新增《营销工具“拼团”玩法使用说明》内容详情向峰网头条</a>
        </span>
      </div>
      <!-- 商品内容区 -->
      <div
        class="shop-list-box"
        v-if="goodsRecommendList"
        v-for="list,listindex in goodsRecommendList"
      >
        <div class="shop-banner-box">
          <img src="../../assets/img/lingshi-left-icon.png" v-if="listindex/2!=0">
          <img src="../../assets/img/remen-left-icon.png" v-else>
          <a :class="listindex/2!=0?'green':'red'">{{list.name}}</a>
          <img src="../../assets/img/lingshi-right-icon.png" v-if="listindex/2!=0">
          <img src="../../assets/img/remen-right-icon.png" v-else>
        </div>
        <div class="banner-img-box">
          <img :src="list.b2bFloorBannerList[0].picUrl">
        </div>
        <ul class="shop-content-box">
          <li v-for="obj,index in list.goodsListRecommendLocationsList">
            <!-- <span class="rcmdImg" v-show="obj.newBool">新品</span> -->
            <img :src="obj.picsUrl" class="img">
            <a class="name" v-if="obj.goodsName">{{obj.goodsName}}{{obj.specification}}</a>
            <a class="text">{{obj.dealerName}}</a>
            <span class="shop-msg-box">
              <a v-if="obj.suggestPrice">￥{{obj.suggestPrice}}</a>
              <a v-else>￥{{obj.orderPrice}}</a>
              <img src="../../assets/img/ic_shop.png">
            </span>
          </li>
        </ul>
      </div>
      <!-- <ul class="brandUl">
        <li v-for="obj in brandMsgData">
          <img :src="obj.img">
          <a>{{obj.name}}</a>
        </li>
      </ul>-->
      <ul class="foot-nav-ul">
        <li>喜宴用水</li>
        <li>健康用水</li>
        <li>新品发布会</li>
      </ul>
      <!-- 回到顶部 +登录-->
      <div class="foot-anchor">
        <router-link to="/login" class="login-btn" tag="button" v-show="!$store.state.token">登录查看价格</router-link>
        <button class="toup-btn" @click="totop" v-show="scrollBool"></button>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHead from "../../components/HomeHead";
import { getHomeData} from "../../api/send";
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
        },
        {
          image:
            "https://hbimg.huabanimg.com/90faa2f4ca52fa718bf4eef0de661a8b406e0f10412b0-G6VJrE_fw658"
        }
      ],
      snacksSlides: [
        {
          image:
            "https://hbimg.huabanimg.com/541843bf9ebbe5b55f2efed6374dad8168caba8f93af0-nKJLy0_fw658"
        },
        {
          image:
            "https://hbimg.huabanimg.com/c444fc75dae561281289afb2b4c162b0ac633c9c1982e-6Ux1AB_fw658"
        },
        {
          image:
            "https://hbimg.huabanimg.com/a93e49d60a6a6aa4dc5cc86c34db64e4d1ed55612fae8-bBME5F_fw658"
        },
        {
          image:
            "https://hbimg.huabanimg.com/48262f312c14a3df04ac0a39aa4d212dc12266cdaac5b-mKLCPG_fw658"
        }
      ],
      goodsRecommendList: null, //好物推荐
      loadingText: "加载中"
    };
  },
  methods: {
    //搜索框下滑效果
    setSearchStatus(e) {
      if (e.target.scrollTop > 368) {
        this.$store.commit("main/home/setHomeHeadBool", false);
        this.scrollBool = true;
      } else {
        this.$store.commit("main/home/setHomeHeadBool", true);
        this.scrollBool = false;
      }
    },
    //回到顶部
    totop() {
      var timer = null;
      var scrollTop = document.getElementsByClassName("content-box")[0]
        .scrollTop;
      var count = scrollTop;
      timer = setInterval(function() {
        count -= 10;
        if (count <= 0) {
          clearInterval(timer);
          count = 0;
        }
        document.getElementsByClassName("content-box")[0].scrollTop = count;
      }, 2);
    }
  },
  mounted() {
    this.$store.commit("showLoading", true);
    if (this.$store.state.main.home.homeShopList) {//如果发送过请求就在store中取数据
      this.goodsRecommendList = this.$store.state.main.home.homeShopList;
    } else {
        getHomeData({
          merchantId: 0,
          siteid: 22,
          storeCustId: 0,
          terminal: 3,
          storeId: 0
        }).then(res => {
          this.goodsRecommendList = res.result.b2bFloorVoList;
          this.$store.commit(
            "main/home/setHomeShopList",
            this.goodsRecommendList
          );
          console.log("首页的数据：",res);
        });
    }
    this.$store.commit("showLoading", false);
  },
  components: {
    appHomeHead: HomeHead
  }
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
@import url("../../../static/css/home");
</style>
<style>
.slides-box-one .van-swipe__indicators {
  bottom: 0.5rem;
}
</style>