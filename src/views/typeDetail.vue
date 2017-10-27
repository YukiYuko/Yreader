
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.typeDetail{
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #333;
  background:#ffffff;
  .header{ background:#e87a90;position:fixed;width: 100%;top: 0;left: 0;color: #fff}
  .list-menu{ 
    position: fixed;left: 0;right: 0;top: 46px;height: 45px;box-shadow: 0 0 5px rgba(0,0,0,0.05);
    overflow: hidden;
    a{ height: 45px;padding: 0 15px;display: inline-block;line-height: 45px;}
  }
}
</style>

<template>
  <div class="typeDetail">
    <x-header class="header">{{$route.params.id}}</x-header>
    <div class="list-menu">
      <a href="javascript:;" v-for="(item,index) in type" :key="index">{{item.name}}</a>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import Scroll from "@/components/base/Scroll.vue";
export default {
  data() {
    return {
      type:[{
        type: 'hot',
        name: '热门'
      }, {
        type: 'new',
        name: '新书'
      }, {
        type: 'reputation',
        name: '好评'
      }, {
        type: 'over',
        name: '完结'
      }, {
        type: 'monthly',
        name: '包月'
      }]
    }
  },
  components: {
    XHeader,Scroll
  },
};
</script>
