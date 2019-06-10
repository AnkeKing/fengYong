<template>
  <div class="scroll-box">
    <app-head :backBool="false" :search="false"></app-head>
    <div class="content-box">
      <div class="shop-none" v-if="shopCarData.validShoppingCartDealerVos.length<=0">
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
            <input type="checkbox" @click="componyCheck(cartIndex)" ref="companyCheck">
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
              :disabled="shop.inStock?false:true"
              v-model="shop.choiceOrNo"
            >
            <div class="shopimg-box">
              <img :src="shop.picUrl">
              <div class="outOfStock" v-if="!shop.inStock">
                <span>无货</span>
              </div>
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
            <a>-￥{{obj.savedAmount}}</a>
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
              <a>{{shopCarData.totalAmount}}</a>
            </span>
          </span>
          <span class="saved-money">
            <a>已省:</a>
            <a>-￥</a>
            <a>{{shopCarData.savedAmount}}</a>
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
      allCheckBool: true
    };
  },
  mounted() {
    this.$store.dispatch("publicMain/getShopCarData");
    console.log("购物车总数据：", this.shopCarData);
    // for(let x in this.shopCarData.validShoppingCartDealerVos){
    //   for(let s in this.shopCarData.validShoppingCartDealerVos[x].groupGoodsVoList[0].shoppingCartGoodsResponseVo){

    //  }
    //   console.log("xxx",this.shopCarData.validShoppingCartDealerVos[x]);
    // }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      userMsg: state => state.userMsg,
      userSecondMsg: state => state.userSecondMsg,
      groupId: state => state.userMsg.groupId,
      shopCarData: state => state.publicMain.shopCarData
    }),
    // setAllCheckBool() {
    //   let currentCompony = this.shopCarData.validShoppingCartDealerVos;
    //   for (let c in currentCompony) {
    //     let currentComponyShop =
    //     currentCompony[c].groupGoodsVoList[0].shoppingCartGoodsResponseVo;
    //     if (!this.$refs.companyCheck[c].checked) {
    //       return false;
    //     } else {
    //       for (let s in currentComponyShop) {
    //         if(!currentComponyShop[s].choiceOrNo){
    //           return false;
    //         }else{
    //           return true;
    //         }
    //       }
    //     }
        
    //   }
    // }
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
        this.$store.commit("publicMain/setShopCarData", res.result);
        console.log("选中商品：", res);
      });
    },
    //全部选择
    allCheck() {
      this.allCheckBool = !this.allCheckBool;
      let currentCompony = this.shopCarData.validShoppingCartDealerVos; //当前商品
      for (let c in currentCompony) {
        this.$refs.companyCheck[c].checked = this.allCheckBool;
        let currentComponyShop =
          currentCompony[c].groupGoodsVoList[0].shoppingCartGoodsResponseVo;
        for (let s in currentComponyShop)
          currentComponyShop[s].choiceOrNo = this.allCheckBool;
      }
    },
    //选择单个商品
    selectSingleShop(shopObj, shopIndex) {
      this.$store.commit("addToShopCar", shopObj);
      this.selectShop(
        this.userMsg,
        this.userSecondMsg,
        shopObj,
        !shopObj.choiceOrNo
        // this.$refs.singleShopChecked[shopIndex].checked
      );
      console.log(
        "单选框的checked",
        this.$refs.singleShopChecked[shopIndex].checked
      );
      console.log("当前的当前", shopObj);
    },
    //公司局部选择
    componyCheck(cartIndex) {
      let currentComponyCheck = this.$refs.companyCheck[cartIndex].checked;
      let currentComponyShop = this.shopCarData.validShoppingCartDealerVos[
        cartIndex
      ].groupGoodsVoList[0].shoppingCartGoodsResponseVo; //当前商品
      for (let c in currentComponyShop) {
        currentComponyShop[c].choiceOrNo = currentComponyCheck;
      }
      if (!currentComponyCheck) {
        this.allCheckBool = false;
      }
    },

    add(cartIndex, shopIndex) {
      let currentShop = this.shopCarData.validShoppingCartDealerVos[cartIndex]
        .groupGoodsVoList[0].shoppingCartGoodsResponseVo[shopIndex]; //当前商品
      let firstNum = currentShop.totalQuantity;
      let minQuantity = parseInt(
        currentShop.integerZeroConvert.substring(
          currentShop.integerZeroConvert.indexOf("=") + 1,
          currentShop.integerZeroConvert.indexOf(currentShop.firstUnit)
        )
      );
      if (
        currentShop.inStock &&
        currentShop.stock > currentShop.totalQuantity
      ) {
        firstNum++;
        this.modify(currentShop, firstNum);
      } else {
        this.$store.dispatch("showWarnAsync", {
          warnBool: true,
          warnText: "商品库存不足"
        });
      }
    },
    minus(cartIndex, shopIndex) {
      let currentShop = this.shopCarData.validShoppingCartDealerVos[cartIndex]
        .groupGoodsVoList[0].shoppingCartGoodsResponseVo[shopIndex];
      console.log("currentShop", currentShop);
      let minQuantity = parseInt(
        currentShop.integerZeroConvert.substring(
          currentShop.integerZeroConvert.indexOf("=") + 1,
          currentShop.integerZeroConvert.indexOf(currentShop.firstUnit)
        )
      );
      let firstNum = currentShop.totalQuantity;
      if (currentShop.inStock) {
        if (minQuantity >= currentShop.totalQuantity) {
          this.$store.dispatch("showWarnAsync", {
            warnBool: true,
            warnText:
              "至少购买" +
              currentShop.minimumOrderQuantity +
              currentShop.secondUnit
          });
        } else {
          firstNum--;
          this.modify(currentShop, firstNum);
          console.log("怎么肥四??", firstNum);
        }
      } else {
        this.$store.dispatch("showWarnAsync", {
          warnBool: true,
          warnText: "商品库存不足"
        });
      }
    },
    //修改购物车的商品数量
    modify(currentShop, firstNum) {
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
        secondQuantity: 0,
        secondUnit: 0,
        shopId: this.userSecondMsg.id,
        siteId: this.userMsg.stationId,
        skuId: currentShop.skuId,
        storeId: this.userSecondMsg.storeId,
        streetId: this.userSecondMsg.town,
        thirdQuantity: 0,
        thirdUnit: 0,
        userId: this.userId
      }).then(res => {
        this.$store.commit("publicMain/setShopCarData", res.result);
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
