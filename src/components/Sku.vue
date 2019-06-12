<template>
  <div class="sku-box" v-if="skuBool">
    <div class="content-box">
      <div class="shop-msg-box">
        <div>
          <img :src="picsUrl">
        </div>
        <div>
          <a class="name over-circe">{{goodsDetail.goodsOl.goodsName}}</a>
          <div class="price-box">
            <span>
              <a>￥</a>
              <a>{{orderPrice[0]}}.</a>
              <a v-if="orderPrice.length>1">{{orderPrice[1]}}</a>
              <a v-else>00</a>
            </span>
            <a>{{goodsDetail.goodsOl.minimumOrderQuantity}}{{goodsDetail.goodsOl.secondMeasurementUnit}}起批</a>
          </div>
        </div>
        <img src="../assets/img/ic_present_colse.png" @click="close" class="close">
      </div>
      <div class="units-box">
        <a>库存{{goodsDetail.salesNum}}{{goodsDetail.goodsOl.measurementUnit}}</a>
        <a>月销{{goodsDetail.skuSaleNum}}{{goodsDetail.goodsOl.measurementUnit}}</a>
        <a>{{goodsDetail.goodsOl.integerZeroConvert}}</a>
      </div>
      <div class="count-box">
        <hr>
        <a class="title">数量</a>
        <ul class="units-ul">
          <li
            @click="changeUnits"
            :class="quantityUnit?'currentUnit':''"
          >{{goodsDetail.goodsOl.secondMeasurementUnit}}</li>
          <li
            @click="changeUnits"
            :class="measurementUnit?'currentUnit':''"
          >{{goodsDetail.goodsOl.measurementUnit}}</li>
        </ul>
        <span class="select-count-box">
          <button class="minus" @click="minus">-</button>
          <span class="show" v-if="measurementUnit">{{measurementNum}}</span>
          <span class="show" v-else-if="quantityUnit">{{quantityNum}}</span>
          <button class="add" @click="add">+</button>
        </span>
      </div>
    </div>
    <div class="footer">
      <hr>
      <ul class="price-box">
        <li>合计:</li>
        <li>￥{{totalPrice}}</li>
      </ul>
      <div class="toAddShopCar">
        <button class="footer-btn red" @click="toJoin">加入购物车</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { join } from "../api/send";
export default {
  name: "Sku-box",
  data() {
    return {
      quantityUnit: false,
      measurementUnit: true
    };
  },
  mounted() {
    this.$store.dispatch("publicMain/getShopCarData"); //获取购物车选中的商品数量
    this.$store.commit("publicMain/setShopNum", {
      name: "measurement",
      num: this.goodsDetail.goodsOl.ratio1
    });
    this.$store.commit("publicMain/setShopNum", { name: "quantity", num: 0 });
  },
  methods: {
    close() {
      this.$store.commit("publicMain/setSkuBool", false);
    },
    changeUnits() {
      if (this.quantityUnit) {
        this.quantityUnit = false;
        this.measurementUnit = true;
        this.$store.commit("publicMain/setShopNum", {
          name: "measurement",
          num: this.goodsDetail.goodsOl.ratio1
        });
        this.$store.commit("publicMain/setShopNum", {
          name: "quantity",
          num: 0
        });
      } else {
        this.quantityUnit = true;
        this.measurementUnit = false;
        this.$store.commit("publicMain/setShopNum", {
          name: "measurement",
          num: 0
        });
        this.$store.commit("publicMain/setShopNum", {
          name: "quantity",
          num: this.goodsDetail.goodsOl.minimumOrderQuantity
        });
      }
    },
    add() {
      if (this.quantityUnit) {
        this.$store.commit("publicMain/addShopNum", { name: "quantity" });
      } else {
        this.$store.commit("publicMain/addShopNum", { name: "measurement" });
      }
    },
    minus() {
      if (this.quantityUnit) {
        if (this.goodsDetail.goodsOl.minimumOrderQuantity >= this.quantityNum) {
          this.$store.dispatch("showWarnAsync", {
            warnBool: true,
            warnText:
              "至少购买" +
              this.goodsDetail.goodsOl.minimumOrderQuantity +
              this.goodsDetail.goodsOl.secondMeasurementUnit
          });
        } else {
          this.$store.commit("publicMain/minusShopNum", { name: "quantity" });
        }
      } else {
        if (this.goodsDetail.goodsOl.ratio1 >= this.measurementNum) {
          this.$store.dispatch("showWarnAsync", {
            warnBool: true,
            warnText:
              "至少购买" +
              this.goodsDetail.goodsOl.ratio1 +
              this.goodsDetail.goodsOl.measurementUnit
          });
        } else {
          this.$store.commit("publicMain/minusShopNum", {
            name: "measurement"
          });
        }
      }
    },
    toJoin() {
      join({
        choiceOrNo: true,
        cityId: this.userMsg.cityId,
        countyId: this.userSecondMsg.county,
        dealerId: this.goodsDetail.goodsOl.dealerId,
        dealerOrgId: this.goodsDetail.goodsOl.dealerOrgId,
        firstQuantity: this.measurementNum,
        firstUnit: this.goodsDetail.goodsOl.measurementUnit,
        merchantId: this.userMsg.merchantId,
        provId: this.userMsg.provinceId,
        secondQuantity: this.quantityNum,
        secondUnit: this.goodsDetail.goodsOl.quantityUnit,
        shopId: this.userSecondMsg.id,
        siteId: this.userMsg.stationId,
        skuId: this.goodsDetail.goodsOl.skuId,
        storeId: this.userSecondMsg.storeId,
        streetId: this.userSecondMsg.town,
        thirdQuantity: this.goodsDetail.goodsOl.thirdOrderPrice,
        thirdUnit: this.goodsDetail.goodsOl.thirdMeasurementUnit,
        userId: this.userId
      }).then(res => {
        this.$store.commit("publicMain/setSkuBool", false);
        if (res) {
          this.$store.dispatch("showWarnAsync", {
            warnBool: true,
            warnText: "添加购物车成功"
          });
          this.$store.commit("publicMain/setShopCarData", res.result);
        }
      });
    }
  },
  computed: {
    ...mapState({
      skuBool: state => state.publicMain.skuBool,
      goodsDetail: state => state.publicMain.goodsDetail,
      orderPrice: state => state.publicMain.orderPrice,
      picsUrl: state => state.publicMain.picsUrl,
      measurementNum: state => state.publicMain.measurementNum,
      quantityNum: state => state.publicMain.quantityNum,
      userMsg: state => state.userMsg,
      userId: state => state.userId,
      userSecondMsg: state => state.userSecondMsg
    }),
    totalPrice() {
      let totalPrice=0;
      if (this.quantityUnit) {
        totalPrice=this.quantityNum * this.goodsDetail.goodsOl.ratio1 * this.goodsDetail.goodsOl.orderPrice;
      } else {
        totalPrice=this.measurementNum * this.goodsDetail.goodsOl.orderPrice;
      }
      return totalPrice;
    }
  }
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../static/css/sku.min");
</style>
