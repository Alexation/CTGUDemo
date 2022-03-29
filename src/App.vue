
  <template>
    <div id="app">
      <router-view class="main"></router-view>

    </div>

    <!-- <div id="app">
      <vue-particles color="#dedede"></vue-particles>
    </div> -->
  </template>
<script>
export default {
  name: "app",
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "assets/style/index.scss";

#app {
  height: 100%;
}
</style>
