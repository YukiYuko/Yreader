<template>
  <div id="app">
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <foot-bar/>
  </div>
</template>

<script>
import FootBar from '@/components/common/FootBar.vue'
export default {
  name: 'app',
  components: {
    FootBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content {}

.move-enter-active,
.move-leave-active {
  transition: all .5s ease-in-out;
}

.move-enter,
.move-leave {
  opacity: 0;
  transform: translateX(20px);
}
</style>
