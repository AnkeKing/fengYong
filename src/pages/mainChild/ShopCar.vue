<template>
  <div class="scroll-box">
    <app-head :backBool="false" :search="false"></app-head>
    <div class="content-box">
      <div
        class="shop-group"
        v-if="shopCarData.validShoppingCartDealerVos.length>0"
        v-for="obj,cartIndex in shopCarData.validShoppingCartDealerVos"
        :key="cartIndex"
        ref="shopCart"
      >
        <!-- 公司信息 -->
        <div class="company">
          <span>
            <input type="checkbox" @click="partCheck(cartIndex)" ref="companyCheck">
            <a>{{obj.dealerName}}</a>
            <img src="../../assets/img/ic-next-left.png">
          </span>
          <a>优惠券</a>
        </div>
        <!-- 优惠活动 -->
        <div class="special-offer" v-if="obj.isHaveCoupon">
          <span>
            <span>店铺满赠</span>
            <a>全场购满￥100，满￥2000减200满￥2000减200</a>
          </span>
          <a>去凑单 ></a>
          <hr>
        </div>
        <!-- 商品详情 -->
        <ul class="shop-msg-ul">
          <li v-for="shop,shopIndex in obj.groupGoodsVoList[0].shoppingCartGoodsResponseVo":key="shopIndex">
            <hr>
            <input type="checkbox" @click="selectSingleShop(shop,shopIndex)"ref="singleShopChecked">
            <div class="shopimg-box">
              <img :src="shop.picUrl">
            </div>
            <div class="msg-box">
              <a class="name">{{shop.goodsName}}</a>
              <a class="type" v-if="shop.goodsSpecs!='[]'">{{shop.goodsSpecs.split('"')[7]}}</a>
              <a class="type" v-else></a>
              <span class="num-box">
                <span class="price">
                  <span class="activity-price">
                    <a>￥</a>
                    <a v-if="shop.preferentialPrice!=shop.originalPrice">{{shop.preferentialPrice}}</a>
                    <a v-else>{{shop.originalPrice}}</a>
                  </span>
                  <a
                    class="origin-price"
                    v-if="shop.preferentialPrice!=shop.originalPrice"
                  >￥{{shop.originalPrice}}</a>
                </span>
                <ul class="units">
                  <li>
                    <a>{{shop.secondQuantity}}</a>
                    <a>{{shop.secondUnit}}</a>
                  </li>
                </ul>
              </span>
              <div class="count-box">
                <!-- <ul class="units-ul">
                  <li class="currentUnit">箱</li>
                  <li>打</li>
                  <li>瓶</li>
                </ul>-->
                <span class="select-count-box">
                  <button class="minus">-</button>
                  <span class="show">{{shop.totalQuantity}}</span>
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
          <input type="checkbox" v-model="allCheckBool" @click="allCheck">
          <a @click="allCheck">全选</a>
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
      <div class="toSettleAccounts">
      <button
        class="footer-btn"
        :class="allCheckBool?'red':'gray'"
        :disabled="allCheckBool?true:false"
      >去结算</button></div>
    </div>
  </div>
</template>

<script>
import { getShopCarData, selectShop } from "../../api/send";
import { mapState } from "vuex";
export default {
  name: "Scroll-box",
  data() {
    return {
      allCheckBool: true,
      shopCarData: [
        {
          validShoppingCartDealerVos: [
            { groupGoodsVoList: [{ shoppingCartGoodsResponseVo: "" }] }
          ]
        }
      ]
    };
  },
  mounted() {
    if (this.userMsg && this.userSecondMsg) {
      this.getShopCarData(this.userMsg, this.userSecondMsg).then(res => {
        this.shopCarData = res;
        console.log("购物车数据：",this.shopCarData);
      });
    } else {
      this.$store.dispatch("getUserMsg", { id: this.userId }).then(res => {
        let userMsg = res;
        this.$store
          .dispatch("getUserSecondMsg", { groupId: res.groupId })
          .then(res => {
            this.getShopCarData(userMsg, res).then(res => {
              this.shopCarData = res;
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
    //全部选择
    allCheck() {
      // if (this.allCheckBool === true) {
      //   this.allCheckBool = false;
      //   this.companyCheckBool = false;
      //   this.shopCheckBool = false;
      // } else {
      //   this.allCheckBool = true;
      //   this.companyCheckBool = true;
      //   this.shopCheckBool = true;
      // }
    },
    //公司局部选择
    // partCheck(cartIndex) {
    //   if (this.$refs.companyCheck[cartIndex].checked === false) {
    //     this.forShopCheck(cartIndex,false);
    //   } else {
    //     this.forShopCheck(cartIndex,true);
    //   }
    // },
    // forShopCheck(cartIndex,bool) {
    //   let shopLi = this.$refs.shopCart[cartIndex].children[1].children;
    //   for (let c = 0; c < shopLi.length; c++) {
    //     shopLi[c].children[1].checked = bool;
    //   }
    // }
    selectSingleShop(shopObj,shopIndex) {
      this.$store.commit("addToShopCar",shopObj);
      this.selectShop(this.userMsg,this.userSecondMsg,shopObj,this.$refs.singleShopChecked[shopIndex].checked);
    },
    selectShop(userMsg,userSecondMsg,shopObj,checkBool) {
      selectShop({
        userId: shopObj.userId,
        merchantId: shopObj.merchantId,
        siteId: userMsg.stationId,
        shopId: userSecondMsg.storeId,
        provId: userSecondMsg.province,
        cityId: userSecondMsg.city,
        countyId: userSecondMsg.county,
        streetId: userSecondMsg.town,
        storeId: userSecondMsg.id,
        isCheck: checkBool,
        skuIds: shopObj.skuId,
      }).then(res => {
        console.log("选中商品：", res);
      });
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
