<template>
  <div class="scroll-box">
    <app-slot-head styles="shop-car-head" :backBool="false" :searchBool="false">
      <template v-slot:title>
        <span>
          <a>购物车</a>
          <a @click="toEdit">{{editText}}</a>
        </span>
      </template>
    </app-slot-head>
    <div class="content-box">
      <!-- 购物车暂无商品 -->
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
            <input
              type="checkbox"
              @click="selectPartShop(cartIndex)"
              ref="companyCheck"
              v-model="obj.componyBool"
            >
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
              @click="selectSingleShop(shop)"
              ref="singleShopChecked"
              :disabled="shop.inStock?false:true"
              v-model="shop.choiceOrNo"
            >
            <div class="stock-none">
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
        <!-- 公司区域总价 -->
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
    <div class="settle-accounts-box" v-if="!editBool">
      <div class="price-sum">
        <div>
          <input type="checkbox" v-model="shopCarData.allSelectBool" @click="selectAllShop">
          <a @click="selectAllShop">全选</a>
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
          :class="shopCarData.settleAccountBool&&shopCarData.freightpol?'red':'gray'"
          :disabled="!shopCarData.settleAccountBool&&!shopCarData.freightpol?true:false"
        >{{settleText}}</button>
      </div>
    </div>
    <!-- 编辑 -->
    <div class="edit-collect-box" v-else>
      <div class="check-box">
        <input type="checkbox" v-model="shopCarData.allSelectBool" @click="selectAllShop">
        <a @click="selectAllShop">全选</a>
      </div>
      <div class="delect-box">
        <button
          class="footer-btn gray"
          @click="toDelectShop"
          :disabled="!shopCarData.settleAccountBool?true:false"
        >删除</button>
      </div>
      <div class="collect-box">
        <button class="footer-btn red" :disabled="!shopCarData.settleAccountBool?true:false">加入收藏</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopCarData, selectShop, modify, deleteShop } from "../../api/send";
import { mapState } from "vuex";
export default {
  name: "Scroll-box",
  data() {
    return {
      allCheckBool: true,
      editText: "编辑",
      editBool: false
    };
  },
  mounted() {
    this.$store.dispatch("publicMain/getShopCarData");
    console.log("购物车总数据：", this.shopCarData);
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      userMsg: state => state.userMsg,
      userSecondMsg: state => state.userSecondMsg,
      groupId: state => state.userMsg.groupId,
      shopCarData: state => state.publicMain.shopCarData
    }),
     //设置结算按钮的text
    settleText() {
      if (!this.shopCarData.freightpol) {
        return '￥'+this.shopCarData.freightmoney+".00起配";
      }else{
        return "去结算"
      }
    }
  },
  methods: {
    //选择接口方法
    selectShop(shopObj, checkBool) {
      selectShop({
        userId: shopObj.userId,
        merchantId: shopObj.merchantId,
        siteId: this.userMsg.stationId,
        shopId: this.userSecondMsg.storeId,
        provId: this.userSecondMsg.province,
        cityId: this.userSecondMsg.city,
        countyId: this.userSecondMsg.county,
        streetId: this.userSecondMsg.town,
        storeId: this.userSecondMsg.id,
        isCheck: checkBool,
        skuIds: shopObj.skuId
      }).then(res => {
        this.$store.commit("publicMain/setShopCarData", res.result);
      });
    },
    //选择商品封装方法
    kingSelectShop(selectType, ...obj) {
      if (selectType === "single") {
        this.selectShop(obj[0], !obj[0].choiceOrNo);
      } else if (selectType === "part") {
        for (let c in obj[0]) {
          this.selectShop(obj[0][c], obj[1]);
        }
      } else {
        for (let c in obj[0]) {
          let currentComponyShop = this.shopCarData.validShoppingCartDealerVos[
            c
          ].groupGoodsVoList[0].shoppingCartGoodsResponseVo; //当前商品
          for (let s in currentComponyShop) {
            this.selectShop(currentComponyShop[s], obj[1]);
          }
        }
      }
    },
    //单个商品选择
    selectSingleShop(shopObj) {
      this.kingSelectShop("single", shopObj);
    },
    //公司局部选择
    selectPartShop(cartIndex) {
      let currentComponyBool = this.shopCarData.validShoppingCartDealerVos[
        cartIndex
      ].componyBool; //当前公司的bool
      let currentComponyShop = this.shopCarData.validShoppingCartDealerVos[
        cartIndex
      ].groupGoodsVoList[0].shoppingCartGoodsResponseVo; //当前商品
      if (!currentComponyBool) {
        this.kingSelectShop("part", currentComponyShop, true);
      } else {
        this.kingSelectShop("part", currentComponyShop, false);
      }
    },
    //全部选择
    selectAllShop() {
      let allSelectBool = this.shopCarData.allSelectBool;
      let currentCompony = this.shopCarData.validShoppingCartDealerVos;
      if (!allSelectBool) {
        this.kingSelectShop("all", currentCompony, true);
      } else {
        this.kingSelectShop("all", currentCompony, false);
      }
    },
    //加加
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
    //减减
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
      });
    },
    //编辑
    toEdit() {
      this.editBool = !this.editBool;
      if (this.editBool) {
        this.editText = "完成";
      } else {
        this.editText = "编辑";
      }
    },
    //删除
    toDelectShop() {
      let currentCompony = this.shopCarData.validShoppingCartDealerVos;
      this.$store.dispatch("showSelectAlert", {
        selectObj: {
          question: "确定删除所选宝贝?",
          btns: "取消-确定",
          boxType: "confirm",
          confirmType: "question",
          nextActionType: "nextDelect",
          currentCompony: currentCompony
        }
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
