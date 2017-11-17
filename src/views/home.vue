<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../assets/less/base";
@import '../assets/less/minx.less';
.home{ position: fixed;left: 0;top: 0;right: 0;bottom: 53px;
  .collect{ height: 100%;overflow: hidden;
    .goBook{ width: @220px;height: @70px;text-align: center;
      line-height: @70px;border: 1px solid #e87a90;color: #e87a90;
    }
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
  <div class="home">
    <scroll v-if="list.length" ref="scroll" :data="list" class="collect">
      <ul>
        <li @click="$router.push({path:`/detail/${book._id}`})" class="item" v-for="(book,index) in list[0]" :key="index">
          <img src="" v-lazy="staticPath+book.cover" :alt="book.title">
          <div class="text">
            <h2 class="title">{{book.title}}</h2>
            <p class="tag">{{book.author}} <span> | </span> {{book.cat}}</p>
            <div class="intro">{{book.longIntro}}</div>
            <div class="hot">
              <i>{{book.latelyFollower}}</i> 万人气 <span> | </span>  <i>{{book.retentionRatio}}%</i> 留存
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <div flex class="collect no" items="center" justify="center">
      <router-link to="type" class="goBook" href="javascript:;">去找书</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Scroll from "@/components/base/scroll/scroll.vue";
  import bookList from "@/components/common/bookList.vue";
  import util from '@/utils/index'
  import { staticPath } from "@/utils/const.js"
  export default {
    name: "Home",
    data() {
      return {
        staticPath,
        list: []
      }
    },
    components: {
      bookList,Scroll
    },
    created () {
      this.list = []
      let bookself = util.getLocalStroageData('followBookList')
      if (bookself) {
        this.list.push(bookself)
      }
      console.log(this.list)
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
