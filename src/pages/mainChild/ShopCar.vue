<template>
  <div class="scroll-box">
    <app-head :backBool="false" :search="false"></app-head>
    <div class="content-box">
      <div class="shop-none" v-if="shopCarData.validShoppingCartDealerVos.length<=0"
        v-for="obj,cartIndex in shopCarData.validShoppingCartDealerVos"
        >
        <span>
          <img src="../../assets/img/Page 1 Copy.png">
        </span>
        <a>您的购物车暂无商品</a>
      </div>
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
          <li
            v-for="shop,shopIndex in obj.groupGoodsVoList[0].shoppingCartGoodsResponseVo"
            :key="shopIndex"
          >
            <hr>
            <input
              type="checkbox"
              @click="selectSingleShop(shop,shopIndex)"
              ref="singleShopChecked"
            >
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
                  <li v-if="shop.thirdQuantity!=0">
                    <a>{{shop.thirdQuantity}}</a>
                    <a>{{shop.thirdUnit}}</a>
                  </li>
                  <li v-if="shop.secondQuantity!=0">
                    <a>{{shop.secondQuantity}}</a>
                    <a>{{shop.secondUnit}}</a>
                  </li>
                  <li v-if="shop.firstQuantity!=0">
                    <a>{{shop.firstQuantity}}</a>
                    <a>{{shop.firstUnit}}</a>
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
                  <button class="minus" @click="minus(cartIndex,shopIndex)">-</button>
                  <span class="show">{{shop.totalQuantity}}</span>
                  <button class="add" @click="add(cartIndex,shopIndex)">+</button>
                </span>
              </div>
            </div>
          </li>
        </ul>
        <!-- 总价 -->
        <div class="total-price-box">
          <a>￥{{obj.totalAmount}}</a>
          <span>
            <a>已省：</a>
            <a>-￥55.00</a>
          </span>
        </div>
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
        >去结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopCarData, selectShop, modify } from "../../api/send";
import { mapState } from "vuex";
export default {
  name: "Scroll-box",
  data() {
    return {
      allCheckBool: true,
    };
  },
  mounted() {
    this.$store.dispatch("publicMain/getShopCarData");
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      userMsg: state => state.userMsg,
      userSecondMsg: state => state.userSecondMsg,
      groupId: state => state.userMsg.groupId,
      shopCarData:state=>state.publicMain.shopCarData
    })
  },
  methods: {
    selectShop(userMsg, userSecondMsg, shopObj, checkBool) {
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
        skuIds: shopObj.skuId
      }).then(res => {
        console.log("选中商品：", res);
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
    //选择单个商品
    selectSingleShop(shopObj, shopIndex) {
      this.$store.commit("addToShopCar", shopObj);
      this.selectShop(
        this.userMsg,
        this.userSecondMsg,
        shopObj,
        this.$refs.singleShopChecked[shopIndex].checked
      );
    },

    add(cartIndex, shopIndex) {
      let currentShop = this.shopCarData.validShoppingCartDealerVos[cartIndex]
        .groupGoodsVoList[0].shoppingCartGoodsResponseVo[shopIndex];
      let firstNum=currentShop.firstQuantity;
      firstNum++;
      this.modify(currentShop,firstNum);
    },
    minus(cartIndex, shopIndex) {
      let currentShop = this.shopCarData.validShoppingCartDealerVos[cartIndex]
        .groupGoodsVoList[0].shoppingCartGoodsResponseVo[shopIndex];
      let firstNum=currentShop.firstQuantity;
      if (currentShop.firstQuantity >= firstNum) {
        this.$store.dispatch("showWarnAsync", {
          warnBool: true,
          warnText:
            "至少购买" +
            currentShop.firstQuantity +
            currentShop.firstUnit
        });
      } else {
        firstNum--;
        this.modify(currentShop,firstNum);
      }
    },
    modify(currentShop,firstNum) {
      
      modify({
        choiceOrNo: true,
        cityId: this.userMsg.cityId,
        countyId: this.userSecondMsg.county,
        dealerId: currentShop.dealerId,
        dealerOrgId: currentShop.dealerOrgId,
        firstQuantity: firstNum,
        firstUnit: currentShop.firstUnit,
        merchantId: this.userMsg.merchantId,
        provId: this.userMsg.provinceId,
        secondQuantity: currentShop.secondQuantity,
        secondUnit: currentShop.secondUnit,
        shopId: this.userSecondMsg.id,
        siteId: this.userMsg.stationId,
        skuId: currentShop.skuId,
        storeId: this.userSecondMsg.storeId,
        streetId: this.userSecondMsg.town,
        thirdQuantity: currentShop.thirdQuantity,
        thirdUnit: currentShop.thirdUnit,
        userId: this.userId
      }).then(res => {
        console.log("修改已加入购物车的数量：", res);
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
