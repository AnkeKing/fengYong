<template>
  <div class="box">
    <app-slot-head styles="slot-head" :backBool="true" :searchBool="false">
      <template v-slot:title>
        <span>
          <router-link :to="{name:'personalMsg'}":class="$route.name=='personalMsg'?'active':''">商户资料</router-link>
         <router-link :to="{name:'shopMsg'}":class="$route.name=='shopMsg'?'active':''">门店资料</router-link> 
        </span>
      </template>
    </app-slot-head>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Box",
  data() {
    return {};
  },
  created() {
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
</style>
