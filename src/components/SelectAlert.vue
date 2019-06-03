<template>
  <div class="alert-box" v-show="alertBool">
    <div class="select-content-box" v-if="selectObj.boxType=='select'">
      <ul class="select-list">
        <li class="select-title" v-if="selectObj.title!=''">{{selectObj.title}}</li>
        <li
          class="select-type"
          @click="selectRealizeFun({'model':selectObj.modelType,'type':selectObj.type1})"
        >
          {{selectObj.type1}}
          <hr v-show="selectObj.title!=''">
        </li>
        <li
          class="select-type"
          @click="selectRealizeFun({'model':selectObj.modelType,'type':selectObj.type2})"
        >
          {{selectObj.type2}}
          <hr>
        </li>
      </ul>
      <button class="select-button" v-for="btn in btnArr" @click="hiddenAlert">{{btn}}</button>
    </div>
    <div class="confirm-content-box" v-if="selectObj.boxType=='confirm'">
      <ul class="confirm-list">
        <li class="confirm-content" v-if="selectObj.confirmType=='warn'">
          <a class="confirm-text">{{selectObj.text}}</a>
          <a class="confirm-warn">{{selectObj.warn}}</a>
          <hr>
        </li>
        <li class="confirm-content" v-else>
          <a class="confirm-question">{{selectObj.question}}</a>
          <hr>
        </li>
        <li :class="btnArr.length<2?'confirm-btn-box':'confirm-btn-box2'">
          <button v-for="btn in btnArr" @click="btnEvent(btn,selectObj)">{{btn}}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select-alertbox",
  data() {
    return {
      btnArr: [],
      selectType: ""
    };
  },
  computed: {
    alertBool() {
      return this.$store.state.alertBool;
    },
    selectObj() {
      if (this.$store.state.selectObj.btns) {
        this.btnArr = this.$store.state.selectObj.btns.split("-");
      }
      // console.log("计算属性中响应：", this.$store.state.selectObj);
      return this.$store.state.selectObj;
    }
  },
  methods: {
    hiddenAlert() {
      this.$store.commit("changeAlertBool", false);
    },
    selectRealizeFun(modelObj) {
      //判断是哪个模块调用的弹窗以便调用对应的方法
      if (modelObj.model == "papers") {
        this.selectPapersType(modelObj.type);
      } else if (modelObj.model == "photo") {
        this.$store.commit("register/upLoadingImg", {
          bool: true
        });
        this.hiddenAlert();
      }
      // console.log("更改证件类型触发方法：", this.$store.state.selectObj);
    },
    selectPapersType(type) {
      this.hiddenAlert();
      this.$store.dispatch("showSelectAlert", {
        selectObj: {
          question: "切换证件类型后编辑的信息将被清空,确定切换吗?",
          btns: "取消-确定",
          boxType: "confirm",
          confirmType: "question",
          nextActionType: "setData"
        }
      });
      this.selectType = type;
    },
    btnEvent(btn, obj) {
      //按钮后点击后触发对应的事件
      if (btn == "取消") {
        this.hiddenAlert();
        this.btnBool = false;
      } else {
        if (obj.nextActionType == "setData") {
          this.$store.commit("changePapersType", this.selectType);
          this.Event.$emit("clear", true);
        } else if (obj.nextActionType == "nextLogout") {
          localStorage.removeItem("vuex");
          this.$store.commit("setToken", false);
          this.$router.replace("/login");
          this.$store.dispatch("showWarnAsync", {
            warnBool: true,
            warnText: "退出登录成功"
          });
        }
        this.hiddenAlert();
      }
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
.alert-box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  .select-content-box {
    width: 90%;
    display: flex;
    flex-direction: column;
    animation: sport 255ms linear;
    @keyframes sport {
      0% {
        transform: translateY(80px);
      }
      25% {
        transform: translateY(50px);
      }
      50% {
        transform: translateY(20px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    .select-list {
      width: 100%;
      background: rgba(252, 252, 252, 0.8);
      border-radius: 12px;
      li {
        width: 100%;
        padding: 0.16rem 0 0.16rem 0;
        display: flex;
        justify-content: center;
        position: relative;
        hr {
          position: absolute;
          left: 0;
          top: 0;
          border: 0.01rem solid black;
          width: 100%;
          height: 0.007rem;
          -webkit-transform: scaleY(0.1);
          transform: scaleY(0.1);
        }
      }
      .select-title {
        font-size: 13px;
        color: #8f8e94;
      }
      .select-type {
        font-size: 20px;
        color: #333333;
      }
    }
    .select-button {
      width: 100%;
      padding: 0.2rem 0 0.2rem 0;
      font-size: 0.2rem;
      color: #dd3333;
      margin: 0.1rem 0 0.1rem 0;
      background: #ffffff;
      border-radius: 12px;
    }
  }
  .confirm-content-box {
    width: 80%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .confirm-list {
      width: 100%;
      background: rgba(252, 252, 252, 1);
      border-radius: 12px;
      .confirm-content {
        width: 100%;
        padding: 0.28rem 0.25rem 0.28rem 0.14rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        hr {
          position: absolute;
          bottom: 0;
          left: 0;
          border: 0.01rem solid #dddddd;
          width: 99%;
          -webkit-transform: scaleY(0.1);
          transform: scaleY(0.1);
        }
        a {
          letter-spacing: 0.01rem;
        }
        .confirm-text {
          font-size: 0.16rem;
          color: #030303;
          font-weight: bold;
        }
        .confirm-warn {
          font-size: 0.13rem;
          color: #666666;
          margin-top: 0.17rem;
          line-height: 0.17rem;
        }
        .confirm-question {
          font-size: 0.17rem;
          color: #030303;
          line-height: 0.2rem;
        }
      }
      li {
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;
      }
      button {
        background: #ffffff;
        border-radius: 12px;
        font-size: 0.17rem;
        padding: 0.14rem 0 0.14rem 0;
      }
      .confirm-btn-box {
        button {
          width: 100%;
          color: #dd3333;
        }
      }
      .confirm-btn-box2 {
        button:nth-of-type(1) {
          width: 50%;
          color: #dd3333;
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
          border-right: 0.005rem solid #dddddd;
        }
        > button:nth-of-type(2) {
          width: 50%;
          color: #333333;
        }
      }
    }
  }
}
</style>
