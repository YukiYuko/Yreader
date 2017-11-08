
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/less/minx.less';
.typeDetail{
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #333;
  background:#ffffff;
  .header{ background:#e87a90;position:fixed;width: 100%;top: 0;left: 0;color: #fff;
    .vux-header-left{ color: #fff;
      .vux-header-back{ color: #fff;}
      .left-arrow:before{ border-color: #fff !important}
    }
  }
  .list-menu{ 
    position: fixed;left: 0;right: 0;top: 46px;height: 45px;
    overflow: hidden;box-shadow: 0 2px 2px -2px rgba(0,0,0,0.05);
    a{ height: 45px;display: inline-block;line-height: 45px;width: 60px;text-align: center}
    &.list-menu2{ top: 91px;box-shadow: none;box-shadow: 0 2px 2px -2px rgba(0,0,0,0.05);}
  }
  .typeList{ 
    position: absolute;top: 136px;bottom: 0;left: 0;right: 0;
    background-color: #F5F2ED;overflow: hidden;
    .item{ position: relative;padding: 15px;border-bottom: 1px solid #dddddd;
      img{ width: 60px; height: 75px;position: absolute;left: 15px;top: 15px;}
      .text{ margin-left: 75px;
        .title{ font-size: 16px; color: #333;margin-bottom: 6px;}
        .tag{ color: #999;font-size: 12px;margin-bottom: 8px;
          span{ padding: 0 10px;}
        }
        .intro{ margin-bottom: 8px;font-size: 12px;.ellipsis-mixin;}
        .hot{ color: #666;
          i{ color: #e87a90;}
          span{ padding: 0 10px;}
        }
      }
    }
  }
}
</style>

<template>
  <div class="typeDetail">
    <x-header class="header">{{$route.params.id}}</x-header>
    <div class="list-menu">
      <a href="javascript:;" v-for="(item,index) in type" :key="index">{{item.name}}</a>
    </div>
    
    <div class="list-menu list-menu2" v-if="mins.length">
      <x-scroll>
        <div>
          <a href="javascript:;">全部</a>
        </div>
        <div v-for="(item,index) in mins" :key="index">
          <a href="javascript:;">{{item}}</a>
        </div>
      </x-scroll>
    </div>
    <scroll :data="list" class="typeList" @pullingUp="_getDetail" :pullUpLoad="true">
      <ul>
        <li class="item" v-for="(book,index) in list" :key="index">
          <img :src="staticPath+book.cover" alt="蕾姆">
          <div class="text">
            <h2 class="title">{{book.title}}</h2>
            <p class="tag">{{book.author}} <span> | </span> {{book.cat}}</p>
            <div class="intro">{{book.shortIntro}}</div>
            <div class="hot">
              <i>{{book.latelyFollower}}</i> 万人气 <span> | </span>  <i>{{book.retentionRatio}}%</i> 留存
            </div> 
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import api from "../api"
import { XHeader } from 'vux'
import Scroll from "@/components/base/scroll/scroll.vue";
import XScroll from "@/components/base/XScroll.vue";
import { staticPath } from "@/utils/const.js"
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
      }],
      mins: [],
      list: [],
      staticPath,
      start: 0
    }
  },
  components: {
    XHeader,Scroll,XScroll
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
      api.getNovelListByCat(this.$route.query.gender,'hot',this.$route.params.id,'',this.start * 20)
      .then(({ data }) => {
        this.list = [...this.list,...data.data.books]
        this.start++
      })
      .catch(() => {});
    }
  }
};
</script>
