
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.slide-enter-active, .slide-leave-active{
  transition: all 0.3s
}
.slide-enter, .slide-leave-to{
  transform: translate3d(100%, 0, 0)
}
.book{
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #333;
  color: #ffffff
}
</style>

<template>
    <transition name="slide">
      <div class="book">
          这是书籍详情页
      </div>
    </transition>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  }
};
</script>
