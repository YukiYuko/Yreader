
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.typeDetail{
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #333;
  background:#ffffff;
  .list-menu{
    position: fixed;left: 0;right: 0;top: 46px;height: 45px;
    overflow: hidden;box-shadow: 0 2px 2px -2px rgba(0,0,0,0.05);
    a{ height: 45px;display: inline-block;line-height: 45px;width: 60px;text-align: center;
      &.on{ color: #e87a90}
    }
    &.list-menu2{ top: 91px;box-shadow: none;box-shadow: 0 2px 2px -2px rgba(0,0,0,0.05);}
  }
  .typeList{
    position: absolute;bottom: 0;left: 0;right: 0;
    background-color: #F5F2ED;overflow: hidden;
  }
}
</style>

<template>
  <div class="typeDetail">
    <m-head :title="$route.params.id"></m-head>
    <div class="list-menu">
      <a href="javascript:;" :class="{on:type === item.type}" @click="select(item.type,'type')" v-for="(item,index) in types" :key="index">{{item.name}}</a>
    </div>

    <div class="list-menu list-menu2" v-if="mins.length">
      <x-scroll>
        <div @click="select('','minor')">
          <a href="javascript:;" :class="{on:minor === ''}">全部</a>
        </div>
        <div v-for="(item,index) in mins" :key="index" @click="select(item,'minor')">
          <a href="javascript:;" :class="{on:minor === item}">{{item}}</a>
        </div>
      </x-scroll>
    </div>
    <scroll ref="scroll" :data="list" class="typeList" :style="{top:mins.length>0?'136px':'91px'}" @pullingUp="_getDetail" :pullUpLoad="true">
      <div>
        <bookList :books="list"></bookList>
      </div>
    </scroll>
  </div>
</template>

<script>
import api from "../api"
import Scroll from "@/components/base/scroll/scroll.vue";
import XScroll from "@/components/base/XScroll.vue";
import bookList from "@/components/common/bookList.vue";
import mHead from "@/components/common/head.vue";
export default {
  data() {
    return {
      types:[{
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
      }],
      mins: [],
      list: [],
      start: 0,
      gender: this.$route.query.gender,
      type: 'hot',
      major: this.$route.params.id,
      minor: '',
    }
  },
  components: {
    Scroll,XScroll,bookList,mHead
  },
  created() {
    setTimeout(() => {
      this._getCategoryDetail()
      this._getDetail()
    }, 20);
  },
  methods: {
    _getCategoryDetail () {
      api.getCategoryDetail()
      .then(({ data }) => {
        this._normolize(data.data)
      })
      .catch(() => {});
    },
    // 格式化 二级分类
    _normolize (data) {
      let arr = data[this.$route.query.gender]
      // filter 返回满足条件的集合
      let arr2 = arr.filter((item) => item.major === this.$route.params.id)
      this.mins = arr2[0].mins
    },
    // 获取详细数据
    _getDetail () {
      api.getNovelListByCat(this.gender,this.type,this.major,this.minor,this.start * 20)
      .then(({ data }) => {
        if (data.data.books.length === 0 ){
          this.$refs.scroll.forceUpdate()
          return
        }
        this.list = [...this.list,...data.data.books]
        this.start++
      })
      .catch(() => {});
    },
    // 筛选数据
    select (value, select) {
      this.start = 0
      select === 'type' ? this.type = value : this.minor = value
      this.list = []
      this._getDetail()
    }
  }
};
</script>
