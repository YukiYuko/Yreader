
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>

<template>
    <div class="home">
        <ul class="homeList">
            <li @click="go" style="line-height:40px;">啊啊啊啊</li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    go () {
      this.$router.push({
        path: `/book/111`
      })
    }
  }
};
</script>
