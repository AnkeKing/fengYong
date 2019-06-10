<template>
  <div class="scroll-box">
    <!-- 快速导航 -->
    <div class="fix-nav">
      <div class="nav-btn" @click="navBool=!navBool">
        <img src="../../../assets/img/ic_tabs.png" v-if="!navBool">
        <span v-else>
          <img src="../../../assets/img/ic_tabsX.png">
        </span>
        <a v-if="!navBool">快速导航</a>
      </div>
      <ul class="show-link" v-show="navBool">
        <router-link :to="{name:'home'}" tag="li">
          <img src="../../../assets/img/ic_tabsGrunp(5).png">
        </router-link>
        <router-link :to="{name:'shopList'}" tag="li">
          <img src="../../../assets/img/ic_tabsGrunp(3).png">
        </router-link>
        <router-link :to="{name:'shopCar'}" tag="li">
          <img src="../../../assets/img/ic_tabsGrunp(4).png">
          <a class="count-circe"v-if="shopCarData.goodsCount>0">{{shopCarData.goodsCount}}</a>
        </router-link>
        <router-link :to="{name:'personal'}" tag="li">
          <img src="../../../assets/img/ic_tabsGrunp(6).png">
        </router-link>
        <router-link :to="{name:'home'}" tag="li">
          <img src="../../../assets/img/ic_tabsGrunp(1).png">
        </router-link>
      </ul>
    </div>
    <div class="content-box" v-if="goodsDetail&&goodsDetail.goodsOl">
      <div class="show-shop">
        <div class="shop-swiper">
          <van-swipe :autoplay="0" indicator-color="#DD3333">
            <van-swipe-item v-for="p,index in picsUrl" :key="index">
              <img :src="p.image">
            </van-swipe-item>
          </van-swipe>
          <hr>
        </div>
        <div class="shop-msg">
          <a class="name">{{goodsDetail.goodsOl.goodsName}}</a>
          <div class="price-box">
            <span>
              <a>￥</a>
              <a>{{orderPrice[0]}}.</a>
              <a v-if="orderPrice.length>1">{{orderPrice[1]}}</a>
              <a v-else>00</a>
            </span>
            <a>{{goodsDetail.goodsOl.minimumOrderQuantity}}{{goodsDetail.goodsOl.quantityUnit}}起批</a>
          </div>
          <span class="units-box">
            <a>库存{{goodsDetail.salesNum}}{{goodsDetail.goodsOl.measurementUnit}}</a>
            <a>月销{{goodsDetail.skuSaleNum}}{{goodsDetail.goodsOl.measurementUnit}}</a>
            <a>{{goodsDetail.goodsOl.integerZeroConvert}}</a>
          </span>
        </div>
      </div>
      <div class="selected-units">
        <span>
          <a>已选</a>
          <a>{{goodsDetail.goodsOl.ratio1}}{{goodsDetail.goodsOl.measurementUnit}}</a>
        </span>
        <img src="../../../assets/img/ic-next-left.png">
      </div>
      <div class="shop-tab">
        <ul class="btn-box">
          <li :class="recommendBool?'tab-active':''" @click="showRecommend">商品介绍</li>
          <li :class="normsParamsBool?'tab-active':''" @click="showNormsParams">规格参数</li>
          <hr>
        </ul>
        <ul class="shop-recommend" v-if="recommendBool">
          <li v-for="s,index in description" :key="index">
            <img :src="s.image">
          </li>
        </ul>
        <div class="shop-norms-params"v-html="goodsParams" v-if="normsParamsBool&&goodsParams.indexOf('span')!=-1">{{goodsParams}}</div>
        <div class="shop-norms-none"v-if="normsParamsBool&&goodsParams.indexOf('span')==-1">暂无规格参数</div>
      </div>
    </div>
    <div class="footer">
      <hr>
      <ul class="tab-bar">
        <li>
          <img src="../../../assets/img/ic_details_shop.png">
          <a>店铺</a>
        </li>
        <li>
          <img src="../../../assets/img/ic_collect_defult.png">
          <a>收藏</a>
        </li>
        <router-link :to="{name:'shopCar'}" tag="li">
          <img src="../../../assets/img/ic_shoppingCart.png">
          <a class="count-circe"v-if="shopCarData.goodsCount>0">{{shopCarData.goodsCount}}</a>
          <a>购物车</a>
        </router-link>
      </ul>
      <div class="toAddShopCar"v-if="goodsDetail">
        <button class="footer-btn red" @click="toAddShopCar"v-if="goodsDetail.skuSaleNum>0">加入购物车</button>
        <button class="footer-btn gray"v-else>补货中</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsDetail, getGoodsParams } from "../../../api/send";
import { mapState } from "vuex";
export default {
  name: "Box",
  data() {
    return {
      recommendBool: true,
      normsParamsBool: false,
      shopDetail: null,
      description: [], //商品详情图
      picsUrl: [], //商品展示图
      orderPrice: [],
      goodsDetail: null,
      navBool: false,
      goodsParams:""
    };
  },
  methods: {
    //显示商品介绍
    showRecommend() {
      this.recommendBool = true;
      this.normsParamsBool = false;
    },
    //显示商品规格参数
    showNormsParams() {
      this.recommendBool = false;
      this.normsParamsBool = true;
    },
    //商品详情
    getGoodsDetail(obj) {
      return getGoodsDetail({
        skuId: obj.skuId,
        stationId: this.stationId,
        userId: this.userId,
        storeId: this.storeId,
        merchantId: this.merchantId,
        id: this.id
      }).then(res => {
        this.goodsDetail = res.result;
        let initArr = this.goodsDetail.description.split('"'); //处理商品详情的图片
        this.description = [];
        for (let r = 0; r < initArr.length; r++) {
          if (initArr[r].indexOf("http") != -1) {
            this.description.push({ image: initArr[r] });
          }
        }
        this.picsUrl = [];
        let initArr2 = this.goodsDetail.goodsOl.picsUrl.split(","); //处理商品展示滑动图片
        for (let r = 0; r < initArr2.length; r++) {
          this.picsUrl.push({ image: initArr2[r] });
        }
        this.orderPrice = (this.goodsDetail.goodsOl.orderPrice + "").split(".");
        return res.result;
      });
    },
    //商品规格参数
    getGoodsParams(obj) {
      getGoodsParams({
        skuId: obj.skuId,
        storeGlobalId: this.storeId,
        storeGroupId: this.id
      }).then(res => {
        this.goodsParams=res.substring(res.indexOf('<div class="lis"'),res.indexOf('</body>'));
      });
    },
    toAddShopCar() {
      this.$store.commit("publicMain/setGoodsDetail", {
        goodsDetail: this.goodsDetail,
        orderPrice: this.orderPrice,
        picsUrl: this.picsUrl[0].image,
        quantity:this.goodsDetail.goodsOl.minimumOrderQuantity,
        measurement:this.goodsDetail.goodsOl.ratio1
      });
      console.log("当前展示的商品",this.goodsDetail);
      this.$store.commit("publicMain/setSkuBool", true);
      
    }
  },
  mounted() {
    this.getGoodsDetail({ skuId: this.$route.query.skuId }).then(res=>{
      console.log("uuuuu",res);
    });
    this.getGoodsParams({ skuId: this.$route.query.skuId });
  },
  created() {
    this.$store.commit("setHeaderTitle", "商品详情");
    this.navBool = false;
  },
  computed: {
    ...mapState({
      stationId: state => state.userMsg.stationId,
      userId: state => state.userId,
      storeId: state => state.userSecondMsg.storeId,
      merchantId: state => state.userMsg.merchantId,
      id: state => state.userSecondMsg.id,
      shopCarData:state=>state.publicMain.shopCarData
    })
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../../../static/css/shopDetail.min");
</style>
