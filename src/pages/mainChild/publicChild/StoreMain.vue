<template>
  <div class="box">
    <router-view></router-view>
    <div class="tab-bar"v-if="$route.path.indexOf('/storeMain')!=-1">
      <ul>
        <li
          v-for="(item,index) in tabBarIcon"
          :key="index"
          @click="link(item.name)"
          :class="{'current-select':item.name===$route.name}"
        >
          <img
          :src="item.defaultImg"
          v-if="item.name!==$route.name"
          :class='item.name=="shopList"?"specialImg":""'
          >
          <img :src="item.selectedImg" v-else :class='item.name=="shopList"?"specialImg":""'>
          <a>{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Box",
  data() {
    return {
      tabBarIcon: [
        {
          title: "首页",
          defaultImg: require("../../../assets/img/ic_homeq.png"),
          selectedImg: require("../../../assets/img/ic_homeh.png"),
          name: "storeHome"
        },
        {
          title: "分类",
          defaultImg: require("../../../assets/img/ic_classifyq.png"),
          selectedImg: require("../../../assets/img/ic_classifyh.png"),
          name: "storeList"
        },
        {
          title: "品牌",
          defaultImg: require("../../../assets/img/ic_brandq.png"),
          selectedImg: require("../../../assets/img/ic_brandh.png"),
          name: "storeBrand"
        },
        {
          title: "档案",
          defaultImg: require("../../../assets/img/ic_fileq.png"),
          selectedImg: require("../../../assets/img/ic_fileh.png"),
          name: "storeFile"
        }
      ]
    };
  },
  methods:{
    link(itemName){
      this.$router.replace({
        name:itemName,
        query:{dealerId:this.$route.query.dealerId}
      })
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.box {
  width: 100%;
  height: 100vh;
  flex: 1;
  overflow: auto;

  .tab-bar {
    width: 100%;
    background-color: #ffffff;
    position: relative;
    z-index: 9;
    &::after {
      content: "";
      position: absolute;
      border: 1px solid #666666;
      width: 100%;
      transform: scaleY(0.05);
      top: 0px;
    }
    ul {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0.05rem 0 0.05rem 0;

      li {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        position: relative;
        img {
          width: 0.3rem;
        }
        .specialImg {
          width: 0.28rem;
          margin-top: 0.01rem;
        }
        a {
          font-size: 0.11rem;
          color: #666666;
          margin-top: 0.05rem;
        }
      }
      .current-select {
        a {
          color: #dd3333;
        }
      }
    }
  }
}
</style>
