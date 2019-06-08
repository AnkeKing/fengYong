<template>
  <div class="scroll-box">
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
              <a>{{goodsDetail.goodsOl.orderPrice}}</a>
              <a>.00</a>
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
        <ul class="shop-norms-params" v-if="normsParamsBool">
          <li>
            <a>产地</a>
            <a>中国大陆</a>
            <hr>
          </li>
          <li>
            <a>包装</a>
            <a>盒装</a>
            <hr>
          </li>
          <li>
            <a>生产日期</a>
            <a>2019年02月24日</a>
            <hr>
          </li>
        </ul>
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
        <li>
          <img src="../../../assets/img/ic_shoppingCart.png">
          <a class="count-circe">4</a>
          <a>购物车</a>
        </li>
      </ul>
      <div class="toAddShopCar">
        <button class="footer-btn red">加入购物车</button>
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
      description: [],
      picsUrl: [],
      goodsDetail: null
    };
  },
  methods: {
    showRecommend() {
      this.recommendBool = true;
      this.normsParamsBool = false;
    },
    showNormsParams() {
      this.recommendBool = false;
      this.normsParamsBool = true;
    },
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
        console.log(this.goodsDetail);
        return res.result;
      });
    },
    getGoodsParams(obj) {
      getGoodsParams({
        skuId: obj.skuId,
        storeGlobalId: this.storeId,
        storeGroupId: this.id
      }).then(res => {
          console.log("商品详情的第三个接口：",res);
      });
    }
  },
  mounted() {
    this.getGoodsDetail({ skuId: this.$route.query.skuId });
    this.getGoodsParams({ skuId: this.$route.query.skuId });
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
      id: state => state.userSecondMsg.id
    })
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../../../static/css/shopDetail.min");
</style>
