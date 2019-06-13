<template>
  <div class="searchPage-box">
    <div class="search-box">
      <ul class="tab">
        <li @click="cutSearchContent(false)">
          <a>本店</a>
          <img src="../../../../assets/img/ic_gift_up.png" v-show="!globalBool">
        </li>
        <li @click="cutSearchContent(true)">
          <a>全站</a>
          <img src="../../../../assets/img/ic_gift_up.png" v-show="globalBool">
        </li>
      </ul>
      <div class="search">
        <div>
          <img src="../../../../assets/img/Combined Shape.png">
          <input type="text" placeholder="搜索商品" v-model="searchText">
        </div>
        <a v-if="!searchText.length>0">取消</a>
        <a v-else @click="toSearch">搜索</a>
      </div>
    </div>
    <div class="search-history">
      <div class="title-del">
        <a>搜索历史</a>
        <img src="../../../../assets/img/ic_del.png" @click="clearBrowseHistory">
      </div>
      <ul class="history-ul">
        <li v-for="l,index in globalBrowseArr" :key="index"v-if="globalBool&&globalBrowseArr.length>0"@click="setSearchText(index)">{{l.text}}</li>
        <li v-for="l,index in partBrowseArr" :key="index" v-if="!globalBool&&partBrowseArr.length>0"@click="setSearchText(index)">{{l.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPage-box",
  data() {
    return {
      globalBool: true,
      searchText: "",
      globalBrowseArr: [],
      partBrowseArr: []
    };
  },
  methods: {
     // 切换全站与店铺内商品
    cutSearchContent(bool) {
      if (bool != this.globalBool) {
        this.globalBool = bool;
        this.searchText = "";
      }
    },
    //跳入商铺首页展示搜索商品
    toSearch() {
      if (this.globalBool) {
        this.$router.replace({
          name: "storeHome",
          query: {
            dealerId: this.$route.query.dealerId,
            scope: "global",
            searchText: this.searchText
          }
        });
        this.saveBrowseArr(this.globalBrowseArr, "globalBrowseArr");
      } else {
        this.$router.replace({
          name: "storeHome",
          query: {
            dealerId: this.$route.query.dealerId,
            scope: "part",
            searchText: this.searchText
          }
        });
        this.saveBrowseArr(this.partBrowseArr, "partBrowseArr");
      }
      this.$store.commit("publicMain/setInSearch", true);
    },
    //保存搜索历史
    saveBrowseArr(arr, name) {
      if (arr.length > 0) {
        for (let l in arr) {
          if (arr[l].text != this.searchText) {
            arr.push({ text: this.searchText });
          }
        }
      } else {
        arr.push({ text: this.searchText });
      }
      localStorage.setItem(name, JSON.stringify(arr));
    },
    //删除搜索历史
    clearBrowseHistory() {
      if (!this.globalBool) {
        localStorage.removeItem("partBrowseArr");
        this.decide('partBrowseArr');
      } else {
        localStorage.removeItem("globalBrowseArr");
        this.decide('globalBrowseArr');
      }
    },
    //
    decide(name) {
      if (JSON.parse(localStorage.getItem(name))) {
        this[name] = JSON.parse(
          localStorage.getItem(name)
        );
      }
    },
    //选中搜索历史
    setSearchText(index){
        if (this.globalBool) {
        this.searchText=this.globalBrowseArr[index].text;
      } else {
        this.searchText=this.partBrowseArr[index].text;
      }
    }
  },
  mounted() {
    this.decide('globalBrowseArr');
    this.decide('partBrowseArr');
    if (!this.$route.query.searchText == "") {
      this.searchText = this.$route.query.searchText;
    }
  },
  computed:{

  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../../../../static/css/searchPage.min");
</style>
