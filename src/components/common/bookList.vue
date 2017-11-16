<style lang="less" scoped>
@import '../../assets/less/minx.less';
.book-list{
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
</style>
<template>
  <div class="book-list">
    <ul>
      <li @click="$router.push({path:`/detail/${book._id}`})" class="item" v-for="(book,index) in books" :key="index">
        <img src="" v-lazy="staticPath+book.cover" :alt="book.title">
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
  </div>
</template>

<script type="text/ecmascript-6">
  import { staticPath } from "@/utils/const.js"
  export default {
    props: {
      books: {
        type: Array,
        default () {
            return []
        }
      }
    },
    data () {
      return {
        staticPath
      }
    },
    methods: {
    }
  }
</script>
