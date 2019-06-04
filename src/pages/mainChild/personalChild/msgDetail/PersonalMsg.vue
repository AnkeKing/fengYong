<template>
  <div class="box">
    <ul class="msg-ul">
      <li>
        <a>商户名称</a>
        <span>{{merchantName}}</span>
        <img src="../../../../assets/img/setmsgbi.png">
        <hr>
      </li>
      <li>
        <a>商户类型</a>
        <span>{{type}}</span>
        <img src="../../../../assets/img/setmsgbi.png">
        <hr>
      </li>
      <li>
        <a>联系人姓名</a>
        <span>{{linkmanName}}</span>
        <img src="../../../../assets/img/setmsgbi.png">
        <hr>
      </li>
      <li>
        <a>手机号</a>
        <span>{{phone}}</span>
        <img src="../../../../assets/img/setmsgbi.png">
        <hr>
      </li>
      <li>
        <a>地址</a>
        <span>{{address}}</span>
        <img src="../../../../assets/img/setmsgbi.png">
      </li>
    </ul>
    <ul class="msg-ul">
      <li>
        <a>资质证件类型</a>
        <span>{{paperType}}</span>
        <img src="../../../../assets/img/setmsgbi.png">
        <hr>
      </li>
      <li>
        <a>营业执照号</a>
        <span>{{businessCode}}</span>
        <img src="../../../../assets/img/setmsgbi.png">
        <hr>
      </li>
      <li>
        <a>法人姓名</a>
        <span>{{legalName}}</span>
        <img src="../../../../assets/img/setmsgbi.png">
      </li>
    </ul>
    <div class="img-box">
      <a>营业执照号</a>
      <img :src="userMsg.shopFrontPicurl">
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Box",
  data() {
    return {
      userMsg:"",
      merchantName:"",
      type:"",
      linkmanName:"",
      phone:"",
      address:"",
      paperType:"",
      businessCode:"",
      legalName:""
    };
  },
  mounted(){
      this.userMsg = this.$store.state.userMsg;//获取个人信息
      this.merchantName=this.userMsg.merchantName;
      this.type=this.userMsg.merchantTypeDesc;
      this.linkmanName=this.userMsg.primaryName;
      this.phone=this.userMsg.primaryPhone;
      this.address=this.userMsg.provinceName+this.userMsg.cityName+this.userMsg.districtName+this.userMsg.streetName+this.userMsg.detailAddress;
      this.paperType=this.userMsg.merchantTypeDesc;
      this.businessCode=this.userMsg.idCardUrl;
      this.legalName=this.userMsg.idCardName;
  },
  computed:{
    ...mapState({
    })
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../../../../static/css/personalMsg");
</style>
