
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .backHeader{
    .header{ background:#e87a90;position:fixed;width: 100%;top: 0;left: 0;color: #fff;
      .vux-header-left{ color: #fff;
        .vux-header-back{ color: #fff;}
        .left-arrow:before{ border-color: #fff !important}
      }
    }
  }
</style>

<template>
  <div class="backHeader">
    <x-header class="header">{{title}}</x-header>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default {
    props: {
      title: {
        type: String,
        default: '这是标题'
      }
    },
    components: {
      XHeader
    },
    data() {
      return {

      }
    }
  }
</script>
