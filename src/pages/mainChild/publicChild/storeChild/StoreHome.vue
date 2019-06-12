<template>
  <div class="scroll-box">
    <div class="content-box" @scroll="scrollFixed">
      <!-- 店铺信息+搜索框 -->
      <div class="top-box">
        <div class="search-box">
          <div @click="toSearch">
            <img src="../../../../assets/img/ic_store_search.png">
            <input type="text" placeholder="搜索店铺商品">
          </div>
        </div>
        <!-- 店铺信息 -->
        <div class="store-msg">
          <span>{{dealerName}}</span>
          <span>
            <a>{{storeCollect.collectCount}}人</a>
            <span class="collect-btn" @click="setCollectStore">
              <img src="../../../../assets/img/Fill 1.png" v-if="!storeCollect.collected">
              <img src="../../../../assets/img/Fill 1@2.88x.png" v-else>
              <a>{{collectText}}</a>
            </span>
          </span>
        </div>
      </div>
      <!-- 商品排序导航+筛选有货  -->
      <div class="top-next" :class="scrollBool?'top-next-fixed':''">
        <!-- 商品排序导航 -->
        <ul class="shop-sort-nav">
          <li :class="sortText=='default'?'sort-active':''" @click="setShopSort('default')">默认</li>
          <li :class="sortText=='sale'?'sort-active':''" @click="setShopSort('sale')">销量</li>
          <li class="price-box">
            <a>价格</a>
            <span>
              <img
                src="../../../../assets/img/ic_sort_up.png"
                @click="setShopSort('priceDown')"
                v-if="sortText=='priceUp'"
              >
              <img
                src="../../../../assets/img/ic_sort_down.png"
                @click="setShopSort('priceUp')"
                v-else-if="sortText=='priceDown'"
              >
              <img
                src="../../../../assets/img/ic_sort_defult.png"
                @click="setShopSort('priceUp')"
                v-else
              >
            </span>
          </li>
        </ul>
        <!-- 筛选有货 -->
        <div class="view-filter">
          <span>
            <input type="checkBox" @click="setStockSort" :class="stockBool=='true'?'checkClass':''">
            <a>仅显示有货</a>
          </span>
          <span>
            <input
              type="checkBox"
              @click="setRecommendSort"
              :class="recommendBool=='true'?'checkClass':''"
            >
            <a>推荐</a>
          </span>
        </div>
      </div>
      <!-- 商品信息 -->
      <ul class="shop-msg-ul" v-if="storeData.goodses.length>0">
        <li v-for="shop in storeData.goodses">
          <span class="img-box">
            <img :src="shop.picsUrl">
          </span>
          <a class="name">{{shop.goodsName}}</a>
          <span class="price-box">
            <a>￥</a>
            <a>{{shop.orderPrice}}</a>
          </span>
          <span class="add-shop">
            <img src="../../../../assets/img/ic_shop.png">
          </span>
          <span class="sale-msg">
            <a>{{shop.minOrderQuantity}}{{shop.quantityUnit}}起批</a>
            <a>已售{{shop.salesVolume}}{{shop.quantityUnit}}</a>
          </span>
        </li>
      </ul>
      <!-- 无商品信息 -->
      <div class="shop-none"v-else>
          <img src="../../../../assets/img/mimi.png">
          <a>无可售商品</a>
      </div>
    </div>
  </div>
</template>

<script>
import { toAddCollStore, toDelCollStore } from "../../../../api/send";
import { mapState } from "vuex";
export default {
  name: "Scroll-box",
  data() {
    return {
      sortText: "default",
      scrollBool: false,
      storeData: { goodses: [] },
      storeCollect: {},
      collectText: "",
      stock: 0,
      stockBool: "true",
      recommendBool: "false",
      dealerName: ""
    };
  },
  methods: {
    scrollFixed(e) {
      if (e.target.scrollTop > 368) {
        this.scrollBool = true;
      } else {
        this.scrollBool = false;
      }
    },
    //获取店铺商品
    getStoreData(obj) {
      return this.$store
        .dispatch("publicMain/searchGoodsList", {
          dealerId: this.$route.query.dealerId,
          type: obj.type,
          orderWay: obj.orderWay,
          stock: obj.stock,
          tagRecommend: obj.tagRecommend
        })
        .then(res => {
          if (res.goodses) {
            this.storeData = res;
          } else {
            this.storeData = { goodses: [] };
          }
          return res;
        });
    },

    //设置收藏店铺
    setCollectStore() {
      if (this.storeCollect.collected) {
        toDelCollStore({
          dealerId: this.$route.query.dealerId,
          userId: this.userId
        }).then(res => {
          this.updataStoreCollect();
        });
      } else {
        toAddCollStore({
          dealerId: this.$route.query.dealerId,
          userId: this.userId
        }).then(res => {
          this.updataStoreCollect();
        });
      }
    },
    //更新收藏店铺
    updataStoreCollect() {
      this.$store
        .dispatch("publicMain/dealerColl", {
          dealerId: this.$route.query.dealerId
        })
        .then(res => {
          this.storeCollect = res;
          if (res.collected) {
            this.collectText = "已收藏";
          } else {
            this.collectText = "收藏";
          }
        });
    },
    //商品排序
    setShopSort(type) {
      if (type == "default") {
        this.sortText = "default";
        this.getStoreData({
          type: "shelvesTime",
          orderWay: 1,
          stock: this.currentStatusObj.stock,
          tagRecommend: this.currentStatusObj.tagRecommend
        });
      } else if (type == "sale") {
        this.sortText = "sale";
        this.getStoreData({
          type: "salesVolume",
          orderWay: 1,
          stock: this.currentStatusObj.stock,
          tagRecommend: this.currentStatusObj.tagRecommend
        });
      } else if (type == "priceUp") {
        this.sortText = "priceUp";
        this.getStoreData({
          type: "orderPrice",
          orderWay: 1,
          stock: this.currentStatusObj.stock,
          tagRecommend: this.currentStatusObj.tagRecommend
        });
      } else if (type == "priceDown") {
        this.sortText = "priceDown";
        this.getStoreData({
          type: "orderPrice",
          orderWay: 0,
          stock: this.currentStatusObj.stock,
          tagRecommend: this.currentStatusObj.tagRecommend
        });
      }
    },
    //筛选有货
    setStockSort() {
      if (this.stockBool == "false") {
        this.stockBool = "true";
        this.getStoreData({
          type: this.currentStatusObj.type,
          orderWay: this.currentStatusObj.orderWay,
          stock: 1
        });
      } else {
        this.stockBool = "false";
        this.getStoreData({
          type: this.currentStatusObj.type,
          orderWay: this.currentStatusObj.orderWay,
          stock: 2
        });
      }
    },
    //筛选推荐
    setRecommendSort() {
      if (this.recommendBool == "false") {
        this.recommendBool = "true";
        this.getStoreData({
          type: this.currentStatusObj.type,
          orderWay: this.currentStatusObj.orderWay,
          stock: this.currentStatusObj.stock,
          tagRecommend: 1
        });
      } else {
        this.recommendBool = "false";
        this.getStoreData({
          type: this.currentStatusObj.type,
          orderWay: this.currentStatusObj.orderWay,
          stock: this.currentStatusObj.stock,
          tagRecommend: 2
        });
      }
    },
    toSearch(){
        this.$router.push({name:'searchPage'});
    }
  },
  mounted() {
    this.updataStoreCollect();
    this.getStoreData({ type: "shelvesTime", orderWay: 0, stock: 1 }).then(
      res => {
        this.$store.commit("setHeaderTitle", res.goodses[0].dealerName);
        this.dealerName = res.goodses[0].dealerName;
      }
    );
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      currentStatusObj: state => state.publicMain.currentStatusObj
    })
  },
  created() {},
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../../../../static/css/storeDetail.min");
</style>
