<template>
  <div class="scroll-box">
    <div class="personal-msg-box">
      <img src="../../assets/img/miff.png">
      <img src="../../assets/img/miff.png">
      <img src="../../assets/img/miff.png">
      <img src="../../assets/img/miff.png">
      <div>
        <img src="../../assets/img/set.png"@click="toSetUserMsg">
        <button>我要卖货</button>
      </div>
      <div>
        <div class="left">
          <span class="photo-span">
            <img src="../../assets/img/ic_bills_come.png">
          </span>
          <span class="msg-span">
            <a class="username">ShingD22</a>
            <a class="phone">136323233</a>
          </span>
        </div>
        <div class="right">
          <img src="../../assets/img/ic_next_left_white.png">
        </div>
      </div>
    </div>
    <div class="shoping-msg-box">
      <!-- 我的订单 -->
      <div class="myorder-box">
        <div>
          <a>我的订单</a>
          <span>
            <a>查看全部</a>
            <img src="../../assets/img/ic-next-left.png">
          </span>
          <hr>
        </div>
        <ul>
          <li>
            <img src="../../assets/img/daifukuan.png">
            <a>待付款</a>
          </li>
          <li>
            <img src="../../assets/img/daifahuo.png">
            <a>待发货</a>
          </li>
          <li>
            <img src="../../assets/img/daishouhuo.png">
            <a>待收货</a>
          </li>
          <li>
            <img src="../../assets/img/yiwancheng.png">
            <a>已完成</a>
          </li>
        </ul>
      </div>
      <!-- 我的收藏 -->
      <div class="collect-box">
        <li>
          <a>23</a>
          <a>优惠券</a>
        </li>
        <li>
          <a>12</a>
          <a>商品收藏</a>
        </li>
        <li>
          <a>8</a>
          <a>店铺收藏</a>
        </li>
        <li>
          <a>2</a>
          <a>我的供应商</a>
        </li>
      </div>
      <!-- 物流信息 -->
      <div class="logistics-box">
        <ul>
          <li>
            <div class="time-box">
              <a>最新物流</a>
              <a>20:37:35</a>
              <span></span>
              <hr>
            </div>
            <div class="msg-box">
              <div>
                <img src="../../assets/img/WechatIMG292.png">
              </div>
              <div>
                <span>
                  <a>待收货</a>
                  <a>订单编号: 85383983983</a>
                </span>
                <span>
                  <a>【运单1】 您的订单已经打包完成，准备出库</a>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div class="time-box">
              <a>最新物流</a>
              <a>20:37:35</a>
              <span></span>
              <hr>
            </div>
            <div class="msg-box">
              <div>
                <img src="../../assets/img/WechatIMG292.png">
              </div>
              <div>
                <span>
                  <a>待收货</a>
                  <a>订单编号: 85383983983</a>
                </span>
                <span>
                  <a>【运单1】 您的订单已经打包完成，准备出库</a>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div class="time-box">
              <a>最新物流</a>
              <a>20:37:35</a>
              <span></span>
              <hr>
            </div>
            <div class="msg-box">
              <div>
                <img src="../../assets/img/WechatIMG292.png">
              </div>
              <div>
                <span>
                  <a>待收货</a>
                  <a>订单编号: 85383983983</a>
                </span>
                <span>
                  <a>【运单1】 您的订单已经打包完成，准备出库</a>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div class="time-box">
              <a>最新物流</a>
              <a>20:37:35</a>
              <span></span>
              <hr>
            </div>
            <div class="msg-box">
              <div>
                <img src="../../assets/img/WechatIMG292.png">
              </div>
              <div>
                <span>
                  <a>待收货</a>
                  <a>订单编号: 85383983983</a>
                </span>
                <span>
                  <a>【运单1】 您的订单已经打包完成，准备出库</a>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 浏览记录 -->
      <div class="browse-box">
        <div class="shop-banner-box">
          <img src="../../assets/img/remen-left-icon.png">
          <a>最近浏览</a>
          <img src="../../assets/img/remen-right-icon.png">
        </div>
        <ul class="browse-ul">
            <li>
                <div><img src="../../assets/img/WechatIMG292.png"></div>
                <div>
                    <div><a>农夫山泉巴啦啦能量</a></div>
                    <div>
                        <span class="left">
                            <span><a>￥7.00</a><a>一袋起批</a></span>
                            <span><a>成都双流宏福有限公司</a></span>
                        </span>
                        <span class="right"><img src="../../assets/img/ic_shop.png"></span>
                    </div>
                </div>
                <hr>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scroll-box",
  data() {
    return {};
  },
  methods: {
    toSetUserMsg(){
        this.$router.push({'name':'setPage'});
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
@import url("../../../static/css/personal");
</style>
