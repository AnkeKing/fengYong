<template>
  <div class="scroll-box">
    <app-head :backBool="false" :search="false"></app-head>
    <app-loading :loadingText="loadingText"></app-loading>
    <div class="search-box">
      <div>
        <img src="../../assets/img/ic_search_gary.png">
        <input type="text" placeholder="搜索商品/供应商">
      </div>
    </div>
    <div class="layout-box">
        <ul class="shop-nav">
        <li ref="selectLi" :class="index===$store.state.main.shopList.shopIndex?'select-li':''" v-for="(obj,index) in shopList":key="index"@click="viewShopDetail(index)">
          {{obj.sName}}
          <hr>
        </li>
      </ul>
      <div class="content-box">
        <div class="shop-detail-box"v-if="shopList">
          <a class="shop-title">{{shopList[$store.state.main.shopList.shopIndex].sName}}</a>
          <ul class="shop-detail-ul">
            <li v-for="(shop,index) in shopList[$store.state.main.shopList.shopIndex].stationSaleTypeModels":key="index">
              <img :src="shop.sPic">
              <a>{{shop.sName}}</a>
            </li>
          </ul>
        </div>
        <div class="hotbrand-box">
          <span class="brand-title">
            <a></a><p>热门品牌</p>
          </span>
          <ul class="hotbrand-ul">
            <li>
              <img src="../../assets/img/xie(62).jpg">
            </li>
            <li>
              <img src="../../assets/img/xie(62).jpg">
            </li>
            <li>
              <img src="../../assets/img/xie(62).jpg">
            </li>
            <li>
              <img src="../../assets/img/xie(62).jpg">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopListData } from "../../api/send";
export default {
  name: "Scroll-box",
  data() {
    return {
        shopList:null,
        loadingText: "加载中",
    };
  },
  methods:{
      viewShopDetail(index){
        this.$store.commit("main/shopList/setShopIndex",index);
      }
  },
   mounted() {
    this.$store.commit("showLoading", true);
    if (this.$store.state.main.shopList.shopList) {//如果发送过请求就在store中取数据
      this.shopList = this.$store.state.main.shopList.shopList;
    } else {
        getShopListData({stationId:this.$store.state.userMsg.stationId}).then(res => {
          this.shopList = res.result.list;
          this.$store.commit("main/shopList/setShopList", res.result.list);
        });
    }
    this.$store.commit("showLoading", false);
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
