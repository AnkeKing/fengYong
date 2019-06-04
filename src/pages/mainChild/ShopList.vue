<template>
  <div class="scroll-box">
    <app-head :backBool="false" :search="false"></app-head>
    <div class="search-box">
      <div>
        <img src="../../assets/img/ic_search_gary.png">
        <input type="text" placeholder="搜索商品/供应商">
      </div>
    </div>
    <div class="layout-box">
      <ul class="shop-nav">
        <li
          ref="selectLi"
          :class="index===$store.state.main.shopList.shopIndex?'select-li':''"
          v-for="(obj,index) in shopList"
          :key="index"
          @click="viewShopDetail(index)"
        >
          {{obj.sName}}
          <hr>
        </li>
      </ul>
      <div class="content-box">
        <div class="shop-detail-box" v-if="shopList">
          <a class="shop-title">{{shopList[$store.state.main.shopList.shopIndex].sName}}</a>
          <ul class="shop-detail-ul">
            <li
              v-for="(shop,index) in shopList[$store.state.main.shopList.shopIndex].stationSaleTypeModels"
              :key="index"
            >
              <img :src="shop.sPic">
              <a>{{shop.sName}}</a>
            </li>
          </ul>
        </div>
        <div class="hotbrand-box">
          <span class="brand-title">
            <a></a>
            <p>热门品牌</p>
          </span>
          <ul class="hotbrand-ul">
            <li v-for="brand in brandList">
              <img :src="brand.logoUrl">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopListData, getShopBrandData } from "../../api/send";
export default {
  name: "Scroll-box",
  data() {
    return {
      shopList: null,
      brandList: null
    };
  },
  mounted() {
    if (this.$store.state.token) {
      this.getShopList(this.$store.state.userMsg.stationId).then(list => {
        this.getShopBrand(list[this.$store.state.main.shopList.shopIndex].id, this.$store.state.userMsg.stationId);
      });
    } else {
      this.getShopList(22).then(list => {
        this.getShopBrand(list[this.$store.state.main.shopList.shopIndex].id, 22);
      });
    }
  },
  methods: {
    viewShopDetail(index) {
      this.$store.commit("main/shopList/setShopIndex", index);
      if (this.$store.state.token) {
        this.getShopList(this.$store.state.userMsg.stationId).then(list=>{
          this.getShopBrand(list[this.$store.state.main.shopList.shopIndex].id, this.$store.state.userMsg.stationId);
        })
      } else {
        this.getShopList(22).then(list=>{
          console.log("没登录的分类",list);
          console.log("选中的商品",list[this.$store.state.main.shopList.shopIndex]);
          console.log("选中的商品的id",list[this.$store.state.main.shopList.shopIndex].id);
          console.log("选中的商品下标",index)
          this.getShopBrand(list[this.$store.state.main.shopList.shopIndex].id, 22);
        })
      }
    },
    getShopList(stationId) {
      //获取商品分类数据
      return getShopListData({
        stationId: stationId
      }).then(res => {
        console.log("商品分类数据：", res.result.list);
        this.shopList=res.result.list;
        return res.result.list;
      });
    },
    getShopBrand(firstSaleTypeId, stationId) {
      return getShopBrandData({
        //获取品牌信息
        firstSaleTypeId: firstSaleTypeId,
        num: 100,
        stationId: stationId
        // firstSaleTypeId: 2894,
        // num: 100,
        // stationId: 22
      }).then(res => {
        if (res) {
          this.brandList = res.result;
          console.log("品牌信息：",res);
          return res.result;
        }
      });
    }
  },
  created() {
    this.$store.commit("setHeaderTitle", "分类");
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
@import url("../../../static/css/shopList");
</style>
