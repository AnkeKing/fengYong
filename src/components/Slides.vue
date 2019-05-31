<template>
  <div :class="slidesClass=='one'?'slides-imgbox-one':'slides-imgbox-two'">
    <!--轮播插件可在不同位置复用 减少代码冗余-->
    <van-swipe
      :autoplay="3000"
      :show-indicators="showIndicators"
      :loop="true"
      indicator-color="#DD3333"
    >
      <van-swipe-item v-for="(image, index) in slides" :key="index">
        <img :src="image.image">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  name: "Slides-box",
  data() {
    return {};
  },
  props: ["slides", "showIndicators",'slidesClass'],
  mounted(){
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.slides-imgbox-one{
  width: 100%;
  height: 2.16rem;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  overflow: hidden;
  img {
    width: 100%;
    height: 2.16rem;
  }
}
.slides-imgbox-two{
  width: 100%;
  height: 1.2rem;
  img {
    width: 100%;
    height: 1.2rem;
  }
}

</style>
<style module>

</style>
