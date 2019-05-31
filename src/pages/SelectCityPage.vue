<template>
  <div class="box">
    <app-head class="header-box"></app-head>
    <div class="content-box">
      <!-- <mt-index-list>
        <mt-index-section index="A">
          <mt-cell title="Aaron"></mt-cell>
          <mt-cell title="Alden"></mt-cell>
          <mt-cell title="Austin"></mt-cell>
        </mt-index-section>
        <mt-index-section index="B">
          <mt-cell title="Baldwin"></mt-cell>
          <mt-cell title="Braden"></mt-cell>
        </mt-index-section>
        <mt-index-section index="Z">
          <mt-cell title="Zack"></mt-cell>
          <mt-cell title="Zane"></mt-cell>
        </mt-index-section>
      </mt-index-list> -->

      <!-- <van-index-bar :index-list="cityData">
  <van-index-anchor index="1">标题1</van-index-anchor>
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />

  <van-index-anchor index="2">标题2</van-index-anchor>
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
</van-index-bar> -->

      <!-- <ul @touchmove="bMove=true" class="city-list"> -->
      <!-- 解决滑动与点击发生的冲突 -->
      <!-- <li v-for="item in cityData">
          <a ref="userIndexs">{{item.index}}</a>
          <ul>
            <li v-for="city in item.users">{{city.name}}</li>
          </ul>
        </li>
      </ul>
      <ul ref="listIndex" class="index-list">
        <li ref="listIndexChild" v-for="i in cityData" @touchstart="setScrollPos">{{i.index}}</li>
      </ul>-->
    </div>
  </div>
</template>

 <script>
import Head from "../components/Head";
// import { IndexBar, IndexAnchor} from 'vant';
export default {
  name: "Box",
  data() {
    return {
      cityData: [
        {
          index: "A",
          users: [
            { name: "Anke" },
            { name: "安泽" },
            { name: "奥奥" },
            { name: "艾克" }
          ]
        },
        {
          index: "B",
          users: [
            { name: "笔笔" },
            { name: "back" },
            { name: "伯牙" },
            { name: "北北" }
          ]
        },
        {
          index: "C",
          users: [
            { name: "Cindy" },
            { name: "词" },
            { name: "沉睡" },
            { name: "刺客可" }
          ]
        },
        {
          index: "D",
          users: [
            { name: "Dyyi" },
            { name: "蛋糕" },
            { name: "第一眼" },
            { name: "多多" }
          ]
        },
        {
          index: "E",
          users: [
            { name: "Enki" },
            { name: "尔康" },
            { name: "诶" },
            { name: "二宝" }
          ]
        },
        {
          index: "F",
          users: [
            { name: "奉奉" },
            { name: "非" },
            { name: "佛山" },
            { name: "方可可" }
          ]
        },
        {
          index: "G",
          users: [
            { name: "哥哥" },
            { name: "告诉" },
            { name: "Git" },
            { name: "伽罗" }
          ]
        },
        {
          index: "H",
          users: [
            { name: "赫" },
            { name: "灏灏" },
            { name: "Hek" },
            { name: "好奇" }
          ]
        },
        {
          index: "I",
          users: [{ name: "Import" }, { name: "II" }]
        },
        {
          index: "J",
          users: [
            { name: "杰佛瑞" },
            { name: "姜哲" },
            { name: "John" },
            { name: "杰西" }
          ]
        },
        {
          index: "K",
          users: [
            { name: "肯恩" },
            { name: "凯尔" },
            { name: "Kevin" },
            { name: "科尔温" }
          ]
        },
        {
          index: "L",
          users: [{ name: "狼" }, { name: "lantern" }, { name: "啦啦啦" }]
        },
        {
          index: "M",
          users: [
            { name: "猫猫猫" },
            { name: "麻" },
            { name: "秘密" },
            { name: "铭记" }
          ]
        },
        {
          index: "N",
          users: [
            { name: "ninn" },
            { name: "你" },
            { name: "呢" },
            { name: "男男女女女" }
          ]
        },
        {
          index: "O",
          users: [
            { name: "o哦哦哦" },
            { name: "噢噢噢" },
            { name: "噢噢噢" },
            { name: "欧尼" }
          ]
        },
        {
          index: "P",
          users: [{ name: "呸" }, { name: "拍摄的酷酷的" }]
        },
        {
          index: "Q",
          users: [{ name: "Q" }, { name: "Q" }, { name: "Q" }, { name: "Q" }]
        },
        {
          index: "R",
          users: [{ name: "R" }, { name: "R" }, { name: "R" }, { name: "R" }]
        },
        {
          index: "S",
          users: [{ name: "S" }, { name: "s" }, { name: "S" }, { name: "s" }]
        },
        {
          index: "T",
          users: [
            { name: "T" },
            { name: "T" },
            { name: "TTTT" },
            { name: "TTTT" }
          ]
        },
        {
          index: "U",
          users: [{ name: "U" }, { name: "U" }, { name: "u" }, { name: "u" }]
        },
        {
          index: "V",
          users: [{ name: "V" }, { name: "V" }, { name: "V" }, { name: "V" }]
        },
        {
          index: "W",
          users: [
            { name: "W" },
            { name: "W" },
            { name: "www" },
            { name: "wwwwwwwwww" }
          ]
        },
        {
          index: "X",
          users: [
            { name: "xXXX" },
            { name: "x" },
            { name: "x" },
            { name: "xx科尔温" }
          ]
        },
        {
          index: "Y",
          users: [
            { name: "伊恩", tel: "12865445095" },
            { name: "Yehudi", tel: "14316654079" },
            { name: "依夫", tel: "15897595088" },
            { name: "耶鲁", tel: "17770795021" },
            { name: "野猪", tel: "11810795066" }
          ]
        },
        {
          index: "Z",
          users: [
            { name: "zzzz" },
            { name: "zzz" },
            { name: "zzzKevin" },
            { name: "科zz尔温" }
          ]
        }
      ]
    };
  },
  components: {
    appHead: Head,
    // [IndexBar.name]:IndexBar,
    // [IndexAnchor.name]:IndexAnchor,
    // [Cell.name]:Cell,
    //  vanIndexBar:IndexBar,
    // vanIndexAnchor:IndexAnchor,
  },
  methods: {},
  mounted() {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
.box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  .content-box {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .city-list {
      width: 100%;
      > li {
        width: 100%;
        > a {
          // 首字母
          width: 100%;
          height: 0.21rem;
          display: flex;
          align-items: center;
          font-size: 0.16rem;
          color: #333333;
          background-color: #f6f6f6;
          padding-left: 0.16rem;
          font-weight: bold;
        }
        > ul {
          width: 100%;
          padding: 0 0.16rem 0 0.16rem;
          > li {
            width: 100%;
            height: 0.45rem;
            display: flex;
            align-items: center;
            border-bottom: 0.005rem solid #f2f1f6;
            font-size: 0.16rem;
            color: #333333;
          }
        }
      }
    }
    .index-list {
      position: fixed;
      right: 0.07rem;
      transform-origin: 50% 50%;
      display: flex;
      flex-direction: column;
      > li {
        font-size: 0.12rem;
        color: #333333;
        font-weight: bold;
        margin-bottom: 0.05rem;
      }
    }
  }
}
</style>
