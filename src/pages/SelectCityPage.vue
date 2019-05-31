<template>
  <div class="scroll-box">
    <app-head class="header-box":title="title":backBool="true":searchBool="true"></app-head>
    <div class="location-box">
      <span><a>获取失败</a><a>当前定位城市</a></span>
      <span><img src="../assets/img/location.png"@click="getLocation"><a>重新定位</a></span>
    </div>
    <div class="content-box">
      <ul @touchmove="bMove=true" class="city-list">
      <!-- 解决滑动与点击发生的冲突 -->
     <li v-for="item in cityData">
          <a ref="userIndexs">{{item.index}}</a>
          <ul>
            <li v-for="city in item.users">{{city.name}}</li>
          </ul>
        </li>
      </ul>
      <ul ref="listIndex" class="index-list">
        <li ref="listIndexChild" v-for="i in cityData"@touchstart="setScrollPos">{{i.index}}</li>
      </ul>
    </div>
  </div>
</template>

 <script>
import Head from "../components/Head";
export default {
  name: "Scroll-box",
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
      ],
      title:'选择城市',
      bMove:false,
    };
  },
  components: {
    appHead: Head,
  },
  methods: {
    setScrollPos(ev){//点击改变滚动条的位置
        var userIndexs=this.$refs.userIndexs;
        for(var i=0;i<userIndexs.length;i++){
            if(userIndexs[i].innerHTML==ev.target.innerHTML){
                var tH=document.getElementsByClassName("header-box")[0].offsetHeight;
                var sectionBox=document.getElementsByClassName("content-box")[0];
                sectionBox.scrollTop=0;
                // sectionBox.scrollTop=userIndexs[i].offsetTop-tH;//两种方法设置滚动条的位置
                 sectionBox.scrollTo(sectionBox.scrollLeft, userIndexs[i].offsetTop-tH); 
            }
        }
      },
      showTel(tel){
          if(!this.bMove){
            this.event.$emit('show',tel);
          }else{
            this.bMove=false;
          }
         
      },
      getLocation(){
        
      }
  },
  mounted() {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../static/css/selectCityPage");
</style>
