<template>
  <div class="scroll-box">
    <!-- 快速导航 -->
    <!-- <app-nav :shopCarData="shopCarData"></app-nav> -->
    <app-nav></app-nav>
    <div class="content-box" v-if="goodsDetail&&goodsDetail.goodsOl">
      <div class="show-shop">
        <div class="shop-swiper"@click="showSwiper":style="onlyBool?onlyClass:shopSwiper">
        <!-- <div class="shop-swiper"@click="showSwiper":style="onlyBool?onlyClass:shopSwiper"> -->
        <div class="shop-swiper"@click="onlyBool=!onlyBool":style="onlyBool?onlyClass:shopSwiper">
          <van-swipe :autoplay="0" indicator-color="#DD3333">
            <van-swipe-item v-for="p,index in picsUrlArr" :key="index">
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
        <li @click="toWithInStore">
          <img src="../../../assets/img/ic_details_shop.png">
          <a>店铺</a>
        </li>
        <li @click="setCollectShop">
          <img src="../../../assets/img/ic_collect_defult.png"v-if="!goodsColl">
          <img src="../../../assets/img/ic_collect.png"v-else>
          <a>收藏</a>
        </li>
        <router-link :to="{name:'shopCar'}" tag="li">
          <img src="../../../assets/img/ic_shoppingCart.png">
          <!-- <a class="count-circe"v-if="shopCarData.goodsCount>0">{{shopCarData.goodsCount}}</a> -->
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
import Nav from '../../../components/Nav';
export default {
  name: "Box",
  data() {
    return {
      recommendBool: true,
      normsParamsBool: false,
      goodsParams:"",
      oyBool:false,
      shopSwiper:{
        width: '100%',
        position:'relative',
        zIndex: 3,
      },
      onlyClass:{
        height:'100%',
        width: '100vh',
        position: 'fixed',
        zIndex: 99,
        background: 'rgba(0,0,0,1)',
        display: 'flex !important',
        alignItems:'center !important',
      }
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
    //加入购物车
    toAddShopCar() {
      this.$store.commit("publicMain/setSkuBool", true);
    },
    //进入商铺
    toWithInStore(){
      this.$router.push({
        name:"storeMain",
        query:{dealerId:this.goodsDetail.goodsOl.dealerId}
      })
      
      // console.log("不明接口",this.$store.state.publicMain.goodsColl);
      // console.log("当前商品",this.goodsDetail);
    },
    //设置收藏商品
    setCollectShop() {
      if (!this.goodsColl) {
        this.$store.dispatch('publicMain/addGoodsColl',{skuId: this.$route.query.skuId });
      } else {
        this.$store.dispatch('publicMain/delGoodsColl',{skuId: this.$route.query.skuId });
      }
    },
    showSwiper(){
      this.oyBool=!this.oyBool;
      this.$store.commit('publicMain/setOnlyBool',this.oyBool);
    }
  },
  mounted() {
    this.$store.dispatch('publicMain/getGoodsDetail',{ skuId: this.$route.query.skuId});
    this.getGoodsParams({ skuId: this.$route.query.skuId });
     this.$store.dispatch("publicMain/getGoodsColl", {skuId: this.$route.query.skuId});
  },
  created() {
    this.$store.commit("setHeaderTitle", "商品详情");
  },
  computed: {
    ...mapState({
      stationId: state => state.userMsg.stationId,
      userId: state => state.userId,
      storeId: state => state.userSecondMsg.storeId,
      merchantId: state => state.userMsg.merchantId,
      id: state => state.userSecondMsg.id,
      // shopCarData:state=>state.publicMain.shopCarData,
      description:state=>state.publicMain.description, //商品详情图
      picsUrl: state=>state.publicMain.picsUrl, //商品展示图
      picsUrlArr:state=>state.publicMain.picsUrlArr,
      orderPrice:state=>state.publicMain.orderPrice,
      goodsDetail: state=>state.publicMain.goodsDetail,
      goodsColl:state=>state.publicMain.goodsColl,
      onlyBool:state=>state.publicMain.onlyBool
    })
  },

  components: {
    appNav:Nav
  }
};
</script>

<style lang='scss' scoped>
@import url("../../../../static/css/shopDetail.min");
</style>
