
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.rankList{
  position: fixed;left: 0;top: 0;right: 0;bottom: 0;
  z-index: 101;
  .rankListBox{ position: absolute;left: 0;top: 46px;right: 0;
    bottom: 0;overflow: hidden;
  }
}
</style>

<template>
  <div class="rankList">
    <m-head :title="title"></m-head>
    <scroll ref="scroll" :data="list" class="rankListBox">
      <div>
        <bookList :books="list"></bookList>
      </div>
    </scroll>
  </div>
</template>

<script>
  import api from "../api"
  import { XHeader } from 'vux'
  import bookList from "@/components/common/bookList.vue";
  import mHead from "@/components/common/head.vue";
  import Scroll from "@/components/base/scroll/scroll.vue";
  export default {
    data() {
      return {
        list: [],
        title: ''
      }
    },
    components: {
      XHeader,bookList,mHead,Scroll
    },
    created() {
      this.$vux.loading.show({
        text: '正在加载...'
      })
      api.getRankList(this.$route.params.id).then((res) => {
        let data= res.data.data.ranking
        this.list = data.books
        this.title = data.title
        this.$vux.loading.hide(0)
      })
    }
  }
</script>
