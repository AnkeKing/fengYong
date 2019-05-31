<template>
  <div class="box">
    <app-head :title="title" :backBool="true"></app-head>
    <app-Select-alert ref="selectAlert"></app-Select-alert>
    <app-magnifyImg></app-magnifyImg>
    <div class="content-box">
      <ul class="msg-box">
        <li>
          <a>商户名称</a>
          <input type="text" placeholder="请输入商户名称" v-model="name">
          <img src="../assets/img/ic-next-left.png">
          <hr>
        </li>
        <li>
          <a>证件类型</a>
          <input type="text" disabled="disabled" v-model="papersType">
          <img src="../assets/img/ic-next-left.png" @click="showPapersAlert">
          <hr>
        </li>
        <li>
          <a>营业执照号</a>
          <input type="text" placeholder="请输入营业执照号" v-model="charter">
          <img src="../assets/img/ic-next-left.png">
          <hr>
        </li>
        <li>
          <a>法人姓名</a>
          <input type="text" placeholder="请输入法人姓名" v-model="legalPerson">
          <span></span>
          <hr>
        </li>
        <li>
          <a>联系人姓名</a>
          <input type="text" placeholder="请输入联系人姓名" v-model="linkMan">
          <span></span>
          <hr>
        </li>
        <li>
          <a>联系人电话</a>
          <input type="text" placeholder="请输入联系人电话" v-model="linkManPhone">
          <img src="../assets/img/ic-next-left.png">
          <hr>
        </li>
        <li>
          <a>经营类型</a>
          <input type="text" placeholder="请选择经营类型" v-model="runType">
          <img src="../assets/img/ic-next-left.png">
          <hr>
        </li>
        <li>
          <a>省市区街道</a>
          <input type="text" placeholder="请选择省市区街道" v-model="site">
          <img src="../assets/img/ic-next-left.png">
          <hr>
        </li>
        <li>
          <a>详细地址</a>
          <input type="text" placeholder="请输入详细地址" v-model="siteDetail">
          <span></span>
        </li>
      </ul>
      <div class="img-box">
        <a>提示： 建议单张不超过3M, 支持jpeg、jsg、png</a>
        <ul>
          <li>
            <img src="../assets/img/newStandard.png" @click="showSelectImgAlert">
            <a>上传营业执照</a>
            <img
              src="../../static/img/xie(41).jpg"
              class="uploadingImg"
              v-show="$store.state.register.upLoadingImg"
              @click="toMagnifyImg('../../static/img/xie(41).jpg')"
            >
            <img
              src="../assets/img/ic_clear_img.png"
              class="close"
              v-show="$store.state.register.upLoadingImg"
              @click="close"
            >
          </li>
          <li>
            <img src="../assets/img/newStandard.png" @click="showSelectImgAlert">
            <a>上传门头照</a>
            <img
              src="../../static/img/xie(42).jpg"
              class="uploadingImg"
              v-show="$store.state.register.upLoadingImg"
              ref="imgtwo"
              @click="toMagnifyImg('../../static/img/xie(42).jpg')"
            >
            <img
              src="../assets/img/ic_clear_img.png"
              class="close"
              v-show="$store.state.register.upLoadingImg"
              @click="close"
            >
          </li>
        </ul>
      </div>
      <div class="check-box">
        <input type="checkbox" :checked="checkBool" @click="checkBool=!checkBool">
        <a>我已阅读并同意《蜂网注册协议》</a>
      </div>
      <div class="button-box">
        <button
          ref="submitBtn"
          :class="checkBool&&name!=''&&papersType!=''&&charter!=''&&legalPerson!=''&&linkMan!=''&&linkManPhone!=''&&runType!=''&&site!=''&&siteDetail!=''?'submitBtn':''"
          :disabled="checkBool&&name!=''&&papersType!=''&&charter!=''&&legalPerson!=''&&linkMan!=''&&linkManPhone!=''&&runType!=''&&site!=''&&siteDetail!=''?false:true"
          @click="toLogin"
        >提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../components/Head";
import MagnifyImg from '../components/MagnifyImg';
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Box",
  data() {
    return {
      title: "商户认证",
      // papersType:"营业执照",
      name: "",
      charter: "",
      legalPerson: "",
      linkMan: "",
      linkManPhone: "",
      runType: "",
      site: "",
      siteDetail: "",
      checkBool: true
    };
  },
  methods: {
    showPapersAlert() {
      this.$store.dispatch("showSelectAlert", {
        selectObj: {
          title: "选择证件类型",
          btns: "取消",
          boxType: "select",
          type1: "营业执照",
          type2: "身份证",
          modelType: "papers"
        }
      });
    },
    showSelectImgAlert() {
      this.$store.dispatch("showSelectAlert", {
        selectObj: {
          title: "",
          btns: "取消",
          boxType: "select",
          type1: "拍照",
          type2: "从手机相册选择",
          modelType: "photo"
        }
      });
    },
    toLogin() {
        this.$router.replace("/login");
        this.$store.dispatch("showSelectAlert", {
          selectObj: {
            btns: "确认",
            boxType: "confirm",
            confirmType: "warn",
            text: "恭喜您,提交成功",
            warn:
              "我们将在5个工作日内完成审核认证,在此期间请您保持电话畅通,以便尽快与您取得联系。如有疑问请咨询400-800-8820"
          }
        });
    },
    close(){//取消上传图片
      this.$store.commit('register/upLoadingImg',{'bool':false});
    },
    toMagnifyImg(src){//放大图片
      this.$store.commit('register/magnifyBool',{'img':src,'bool':true})
    }
  },
  mounted() {},
  computed: {
    ...mapState("register", {}),
    clear() {
      this.Event.$on("clear", bool => {
        if (bool) {
          this.name = "";
          this.charter = "";
          this.legalPerson = "";
          this.linkMan = "";
          this.linkManPhone = "";
          this.runType = "";
          this.site = "";
          this.siteDetail = "";
        }
      });
    },
    papersType() {
      if (this.$store.state.papersType == "") {
        return "营业执照";
      } else {
        return this.$store.state.papersType;
      }
    }
  },
  components: {
    appHead: Head,
    appMagnifyImg:MagnifyImg
  }
};
</script>

<style scoped>
@import url("../../static/css/registerIdent.css");
</style>
