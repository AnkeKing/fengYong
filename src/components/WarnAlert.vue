<template>
  <div :class="{'warnAlert':warnBool}" ref="warnBox" v-show="warnBool">{{warnText}}</div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Box",
  data() {
    return {};
  },
  methods: {},
  computed: {
    warnBool() {
      return this.$store.state.warnBool;
    },
    warnText() {
      return this.$store.state.warnText;
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss'scoped>
.warnAlert {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  padding: 0 0.12rem 0 0.12rem;
  height: 0.44rem;
  font-family: "PingFangSC-Regular";
  font-size: 0.14rem;
  color: #ffffff;
  display: flex;
  position: fixed;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-self: center;
  align-items: center;
  animation: hidden 2.2s linear;
}
@keyframes hidden {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}
</style>
