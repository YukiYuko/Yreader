<style lang="less">
@import "../assets/less/base";
.detail{
  position: fixed;  z-index: 100;  top: 0;  left: 0;  bottom: 0;
  right: 0;  color: #333;  background:#ffffff;box-sizing: border-box;
  padding-top: 46px;
  .header{ background:#e87a90;position:fixed;width: 100%;top: 0;left: 0;color: #fff;
    .vux-header-left{ color: #fff;
    .vux-header-back{ color: #fff;}
    .left-arrow:before{ border-color: #fff !important}
    }
  }
  .section{ background-color: #fff;padding: @20px;border-bottom: 1px solid #fafafa;
    position: relative;
  }
  .book-info{
    .title{
      margin-bottom: @20px;
      img{ height: @150px}
      .book-info-detail{ margin-left: 10px;padding: @20px 0;
        .book-title{ font-size: 16px; color: #333;margin-bottom: 10px;}
        .book-author{ color: #CE2525;font-size: 12px;margin-bottom: 10px;}
        .reader-info{ color: #666;font-size: 12px;
          span{ padding: 0 10px;}
        }
      }
    }
    .foot{
      font-size: 0;
      a{ display: inline-block; font-size: 14px;width: @220px;
        height: @70px;text-align: center;line-height: @70px;box-sizing: border-box}
      a:nth-child(1){ border: 1px solid #CE2525;color: #CE2525;border-radius: 4px;
      margin-right: @40px;}
      a:nth-child(2){ color: #fff;border-radius: 4px;background-color: #CE2525;}
    }
  }
  .book-status{
    .list-item{ width: 33.3333%;color: #999999;text-align: center;
      .item{ margin-bottom: @10px}
    }
  }
  .book-tag{
    .tag {
      padding: .2rem .5rem;  color: #fff;
      border-radius: .1rem;  margin-bottom: @20px;
      font-size: @28px;  margin-right: .4rem;
    }
    .tag:nth-child(1n) {
      background: #dc9fb4;
    }
    .tag:nth-child(2n) {
      background: #bf6766;
    }
    .tag:nth-child(3n) {
      background: #ed784a;
    }
    .tag:nth-child(4n) {
      background: #947a6d;
    }
  }
  .book-intro{ color: #333;font-size: @28px;line-height: @40px}
}
.readBox{ height: 100%;
  .readBoxTop, .readBoxBottom{ height: @110px;background: rgba(0,0,0,0.8)}
}
.vux-popup-dialog{ overflow-x: hidden;overflow-y: auto !important;}
</style>
<template>
  <div class="detail">
    <x-header class="header">书籍详情</x-header>
    <div class="section book-info">
      <div class="title" flex>
        <img :src="staticPath+data.cover" :alt="data.title">
        <div class="book-info-detail">
          <p class="book-title" v-if="data">{{data.title}}</p>
          <p class="book-author" v-if="data">{{data.author}}</p>
          <p class="reader-info" v-if="data">
            {{data.cat}}<span>|</span>{{data.updated | ago}}<span>|</span>{{wordCount}}万字
          </p>
        </div>
      </div>
      <div class="foot">
        <a href="javascript:;">追更新</a>
        <a @click="_openRead" href="javascript:;">开始阅读</a>
      </div>
    </div>
    <div class="section book-status" flex>
      <div class="list-item" flex dir="column">
        <span class="item">追书人气</span>
        <span v-if="data">{{data.latelyFollower}}</span>
      </div>
      <div class="list-item" flex dir="column">
        <span class="item">读者留存率</span>
        <span v-if="data">{{data.retentionRatio}}%</span>
      </div>
      <div class="list-item" flex dir="column">
        <span class="item">日更新字数</span>
        <span v-if="data">{{data.serializeWordCount}}</span>
      </div>
    </div>
    <div class="section book-tag" v-if="data" flex wrap="wrap">
      <span v-for="(tag, index) in data.tags" :key="index" class="tag">{{tag}}</span>
    </div>
    <div class="section book-intro" v-if="data">{{data.longIntro}}</div>
    <div v-transfer-dom>
      <popup v-model="isReading" height="100%">
        <div class="readBox" @click="openSetting">
          <popup :show-mask="false" v-model="readBoxTop" position="top">
            <div class="readBoxTop"></div>
          </popup>
          <popup :show-mask="false" v-model="readBoxBottom" position="bottom">
            <div class="readBoxBottom"></div>
          </popup>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="es6">
import api from "../api"
import { staticPath } from "@/utils/const.js"
import moment from 'moment'
import Scroll from "@/components/base/scroll/scroll.vue";
import { XHeader } from 'vux'
import { TransferDom, Popup} from 'vux'
moment.locale('zh-cn');
export default{
  data(){
    return{
      staticPath,
      data: {},
      isReading: false,
      readBoxBottom: false,   // 阅读底部菜单
      readBoxTop: false   // 阅读顶部菜单
    }
  },
  directives: {
    TransferDom
  },
  filters: {
    ago (time) {
      return moment(time).fromNow()
    }
  },
  computed: {
    wordCount () {
      return parseInt(this.data.wordCount / 10000, 10)
    }
  },
  components: {
    Scroll, XHeader, Popup
  },
  created() {
    setTimeout(() => {
      this._getDetail()
    }, 20);
  },
  methods: {
    _getDetail() {
      let id = this.$route.params.id
      api.getBook(id).then((res) => {
        this.data = res.data.data
        console.log(this.data)
      }).catch(() => {
        console.log('请求错误')
      })
    },
    // 打开阅读
    _openRead() {
      this.isReading = true
    },
    // 打开设置
    openSetting() {
      console.log(1)
      this.readBoxBottom = !this.readBoxBottom
      this.readBoxTop = !this.readBoxTop
    }
  }
}
</script>
