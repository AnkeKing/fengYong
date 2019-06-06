<template>
  <div class="scroll-box">
    <app-head :backBool="false" :search="false"></app-head>
    <div class="content-box">
      <div class="shop-group"v-if="shopCarData.validShoppingCartDealerVos.length>0"v-for="obj in shopCarData.validShoppingCartDealerVos">
        <div class="company">
          <span>
            <input type="checkbox" v-model="companyCheckBool">
            <a>{{obj.dealerName}}</a>
            <img src="../../assets/img/ic-next-left.png">
          </span>
          <a>优惠券</a>
        </div>
        <div class="special-offer">
          <span>
            <span>店铺满赠</span>
            <a>全场购满￥100，满￥2000减200满￥2000减200</a>
          </span>
          <a>去凑单 ></a>
          <hr>
        </div>
        <ul class="shop-msg-ul">
          <li v-for="shop in obj.groupGoodsVoList[0].shoppingCartGoodsResponseVo">
            <hr>
            <input type="checkbox" v-model="shopCheckBool">
            <div class="shopimg-box">
              <img :src="shop.picUrl">
            </div>
            <div class="msg-box">
              <a class="name">{{shop.goodsName}}</a>
              <a class="type">黄瓜味</a>
              <span class="num-box">
                <span class="price">
                  <span class="activity-price">
                    <a>￥</a>
                    <a>{{shop.originalPrice}}</a>
                    <a>.00</a>
                  </span>
                  <a class="origin-price">￥999</a>
                </span>
                <ul class="units">
                  <li>
                    <a>23</a>
                    <a>箱</a>
                  </li>
                  <li>
                    <a>34</a>
                    <a>打</a>
                  </li>
                  <li>
                    <a>10</a>
                    <a>瓶</a>
                  </li>
                </ul>
              </span>
              <div class="count-box">
                <ul class="units-ul">
                  <li class="currentUnit">箱</li>
                  <li>打</li>
                  <li>瓶</li>
                </ul>
                <span class="select-count-box">
                  <button class="minus">-</button>
                  <span class="show">23</span>
                  <button class="add">+</button>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 结算 -->
    <div class="settle-accounts-box">
      <div class="price-sum">
        <div>
          <input type="checkbox" v-model="allCheckBool" @click="selectAll">
          <a @click="selectAll">全选</a>
        </div>
        <div>
          <span class="total">
            <a>合计:</a>
            <span class="total-money">
              <a>￥</a>
              <a>530.00</a>
            </span>
          </span>
          <span class="saved-money">
            <a>已省:</a>
            <a>-￥</a>
            <a>80.00</a>
          </span>
        </div>
      </div>
      <button
        class="toSettleAccounts"
        :class="companyCheckBool||allCheckBool||shopCheckBool?'red':'gray'"
        :disabled="companyCheckBool||allCheckBool||shopCheckBool?true:false"
      >去结算</button>
    </div>
  </div>
</template>

<script>
import { getShopCarData } from "../../api/send";
import { mapState } from "vuex";
export default {
  name: "Scroll-box",
  data() {
    return {
      allCheckBool: true,
      companyCheckBool: true,
      shopCheckBool: true,
      shopCarData:[{validShoppingCartDealerVos:[{groupGoodsVoList:[{shoppingCartGoodsResponseVo:""}]}]}]
    };
  },
  mounted() {
    if (this.userMsg && this.userSecondMsg) {
      this.getShopCarData(this.userMsg, this.userSecondMsg).then(res => {
        this.shopCarData=res;
        console.log("只请求购物车接口：", res);
      });
    } else {
      this.$store.dispatch("getUserMsg", { id: this.userId }).then(res => {
        let userMsg = res;
        this.$store
          .dispatch("getUserSecondMsg", { groupId: res.groupId })
          .then(res => {
            this.getShopCarData(userMsg, res).then(res => {
              this.shopCarData=res;
              console.log("重新请求：", res);
            });
          });
      });
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      userMsg: state => state.userMsg,
      userSecondMsg: state => state.userSecondMsg,
      groupId: state => state.userMsg.groupId
    })
    // allCheckBool(){
    //   if(this.companyCheckBool||this.shopCheckBool){
    //   }else{
    //   }
    // }
    // allCheckBool:{
    //   get(){
    //   },
    //   set(newBool){
    //     if (this.companyCheckBool === true||this.shopCheckBool) {
    //     this.allCheckBool = false;
    //     this.companyCheckBool = false;
    //     this.shopCheckBool = false;
    //   }
    //   }
    // }
  },
  methods: {
    getShopCarData(userMsg, userSecondMsg) {
      return getShopCarData({
        userId: userMsg.userId,
        merchantId: userMsg.merchantId,
        siteId: userMsg.stationId,
        shopId: userSecondMsg.storeId,
        provId: userSecondMsg.province,
        cityId: userSecondMsg.city,
        countyId: userSecondMsg.county,
        streetId: userSecondMsg.town,
        storeId: userSecondMsg.id
      }).then(res => {
        return res.result;
      });
    },
    selectAll() {
      if (this.allCheckBool === true) {
        this.allCheckBool = false;
        this.companyCheckBool = false;
        this.shopCheckBool = false;
      } else {
        this.allCheckBool = true;
        this.companyCheckBool = true;
        this.shopCheckBool = true;
      }
    }
  },
  created() {
    this.$store.commit("setHeaderTitle", "购物车");
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
@import url("../../../static/css/shopCar");
</style>
