<template>
  <div class="scroll-box">
    <app-home-head></app-home-head>
    <app-loading :loadingText="loadingText"></app-loading>
    <div class="content-box" ref="contentBox" @scroll="setSearchStatus">
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
      <div class="shop-list-box" v-for="list,listindex in homeList.b2bFloorVoList">
        <div class="shop-banner-box">
          <img src="../../assets/img/lingshi-left-icon.png" v-if="listindex/2==0">
          <img src="../../assets/img/remen-left-icon.png" v-else>
          <a :class="listindex/2==0?'font-green':'font-red'">{{list.name}}</a>
          <img src="../../assets/img/lingshi-right-icon.png" v-if="listindex/2==0">
          <img src="../../assets/img/remen-right-icon.png" v-else>
        </div>
        <div class="banner-img-box" v-if="list.b2bFloorBannerList.length>0">
          <img :src="list.b2bFloorBannerList[0].picUrl">
        </div>
        <ul class="shop-content-box">
          <li v-for="obj,index in list.goodsListRecommendLocationsList">
            <!-- <span class="rcmdImg" v-show="obj.newBool">新品</span> -->
            <img :src="obj.picsUrl" class="img" @click="toShopDetail(obj)">
            <a class="name" v-if="obj.goodsName">{{obj.goodsName}}{{obj.specification}}</a>
            <a class="text">{{obj.dealerName}}</a>
            <span class="shop-msg-box">
              <a v-if="obj.suggestPrice">￥{{obj.suggestPrice}}</a>
              <a v-else>￥{{obj.orderPrice}}</a>
              <img src="../../assets/img/ic_shop.png" @click="toAddShopCar(obj)">
            </span>
          </li>
        </ul>
      </div>
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
import { mapState } from "vuex";
import { getHomeData, getPersonalData } from "../../api/send";
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
      homeList: {
        b2bFloorVoList: []
      }, //商品分类
      loadingText: "加载中",
      picsUrl: [], //商品展示图
      orderPrice: [],
      goodsDetail: null
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
      var count = this.$refs.contentBox.scrollTop;
      var that = this; //定时器中的this指向发生改变
      timer = setInterval(function() {
        count -= 10;
        if (count <= 0) {
          clearInterval(timer);
          count = 0;
        }
        that.$refs.contentBox.scrollTop = count;
      }, 2);
    },
    getHomeData(params) {
      getHomeData({
        merchantId: params.merchantId,
        siteid: params.siteid,
        storeCustId: params.storeCustId,
        terminal: params.terminal,
        storeId: params.storeId
      }).then(res => {
        this.homeList = res.result;
      });
    },
    //进入商品详情页
    toShopDetail(obj) {
      if (this.token) {
        this.$router.push({ name: "shopDetail", query: { skuId: obj.skuId } });
      } else {
        this.$store.dispatch("showWarnAsync", {//提示信息
                warnBool: true,
                warnText: '请先登录哥们',
            });
      }
    },
    //加入购物车
    toAddShopCar(obj) {
      if (this.token) {
        this.$store.dispatch("publicMain/getGoodsDetail", { skuId: obj.skuId });
        this.$store.commit("publicMain/setSkuBool", true);
      } else {
        this.$store.dispatch("showWarnAsync", {//提示信息
                warnBool: true,
                warnText: '请先登录老弟',
            });
      }
    }
  },
  computed: {
    ...mapState({
      token: state => state.token,
      stationId: state => state.userMsg.stationId,
      userId: state => state.userId,
      storeId: state => state.userSecondMsg.storeId,
      merchantId: state => state.userMsg.merchantId,
      id: state => state.userSecondMsg.id
    })
  },
  mounted() {
    if (this.$store.state.userMsg && this.$store.state.token) {
      this.getHomeData({
        merchantId: this.$store.state.userMsg.merchantId,
        siteid: this.$store.state.userMsg.stationId,
        storeCustId: this.$store.state.userMsg.id,
        terminal: 3,
        storeId: this.$store.state.userMsg.storeId
      });
    } else {
      if (this.$store.state.token) {
        this.$store
          .dispatch("getUserMsg", { id: this.$store.state.userId })
          .then(res => {
            this.getHomeData({
              merchantId: res.merchantId,
              siteid: res.stationId,
              storeCustId: res.id,
              terminal: 3,
              storeId: res.storeId
            });
          });
      } else {
        this.getHomeData({
          merchantId: 0,
          siteid: 22,
          storeCustId: 0,
          terminal: 3,
          storeId: 0
        });
      }
    }
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