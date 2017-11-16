<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .find{
    position: fixed;left: 0;top: 0;right: 0;bottom: 53px;
    .weui-search-bar__label{ line-height: 24px;}
    .weui-search-bar__cancel-btn{ color: #e87a90;}
    .result{ overflow: hidden;position: absolute;top: 100px;left: 0;right: 0;
      bottom: 0;
    }
  }
</style>

<template>
  <div class="find">
    <x-header style="background-color: #e87a90" :left-options="{showBack: false}">搜素</x-header>
    <search
      @result-click="resultClick"
      v-model="value"
      position="absolute"
      auto-scroll-to-top top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search">
    </search>
    <scroll v-if="list.length" ref="scroll" :data="list" class="result">
      <div>
        <bookList :books="list"></bookList>
      </div>
    </scroll>
  </div>
</template>

<script>
  import api from "../api"
  import { Search,XHeader } from 'vux'
  import Scroll from "@/components/base/scroll/scroll.vue";
  import bookList from "@/components/common/bookList.vue";

  export default {
    data() {
      return {
        results: [],
        value: '',
        list: []
      }
    },
    components: {
      Search,XHeader,bookList,Scroll
    },
    methods: {
      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      onSubmit () {
        this.$refs.search.setBlur()
        this.$vux.loading.show({
          text: '正在加载...'
        })
        api.fuzzySearch(this.value).then((res) => {
          this.list = res.data.data.books
          this.$vux.loading.hide(0)
        }).catch(()=>{})
      },
      onFocus () {
        console.log('on focus')
      },
      onCancel () {
        console.log('on cancel')
      }
    }
  }
</script>
