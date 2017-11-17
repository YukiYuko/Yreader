<style lang="less">
@import "../assets/less/minx";
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
  .readBoxTop, .readBoxBottom{ height: @100px;background: rgba(0,0,0,0.8)}
  .readBoxTop{
    a{ height: 100%;display: inline-block;width: @110px;text-align: center;
    line-height: @100px;color: #fff;
      i{ font-size: @50px}
    }
  }
  .readBoxBottom{
    a{ width: 20%;text-align: center;height: 100%;
      span, i{ margin: 5px 0}
    }
  }
  .center{ height: 100%;background-color: #f0f0f0;
    overflow: hidden;color: #666;line-height: @50px;text-indent: @40px;
  }
  .night-mode {
    background: #383434;
    color: #807d7d;
  }
}
.catalogList{ height: 100%;position: relative;background-color: #fff;
  .catalogListScroll{
    position: absolute;left: 0;right: 0;bottom: @80px;overflow: hidden;
    li{ height: @80px;line-height: @80px;border-bottom: 1px solid #e7e7e7;
      color: #666;cursor: pointer;.ellipsis-mixin;box-sizing: border-box;
      padding: 0 @24px;
      i{ color: #ff4969; font-size: @40px}
    }
  }
  .catalogListClose{ line-height: @80px;text-align: center;
    background-color: #333;position: absolute;left: 0;right: 0;bottom: 0;
    i{ font-size: @40px;color: #fff}
  }
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
        <a @click="follow" href="javascript:;">{{isFollowed ? '不追了' : '追更新'}}</a>
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
        <div ref="readBox" class="readBox" @click="openSetting">
          <popup :show-mask="false" v-model="readBoxTop" position="top">
            <div class="readBoxTop">
              <a href="javascript:;" @click="closeRead"><i class="iconfont icon-fanhui"></i></a>
            </div>
          </popup>
          <scroll ref="chapterContent" :data="chapterContent" class="center" :class="{'night-mode':nightMode}">
            <div>
              <p v-if="chapterContent.length" v-for="(item,index) in chapterContent" :key="index" v-html="item"></p>
            </div>
          </scroll>
          <popup :show-mask="false" v-model="readBoxBottom" position="bottom">
            <div class="readBoxBottom" flex>
              <a @click="nightMode = !nightMode" href="javascript:;" flex dir="column" items="center">
                <i class="iconfont icon-night"></i><span>{{nightMode?'日间':'夜间'}}</span>
              </a>
              <a href="javascript:;" flex dir="column" items="center">
                <i class="iconfont icon-fankui"></i><span>反馈</span>
              </a>
              <a @click="openLog" href="javascript:;" flex dir="column" items="center">
                <i class="iconfont icon-mulu"></i><span>目录</span>
              </a>
              <a href="javascript:;" flex dir="column" items="center">
                <i class="iconfont icon-huancun"></i><span>缓存</span>
              </a>
              <a href="javascript:;" flex dir="column" items="center">
                <i class="iconfont icon-shezhi"></i><span>设置</span>
              </a>
            </div>
          </popup>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="catalog" height="100%">
        <div class="catalogList">
          <scroll @pullingUp="addLog" :pullUpLoad="true" ref="catalogListScroll" :data="chapters" class="catalogListScroll">
            <ul>
              <li v-if="chapters.length" v-for="(item, index) in chapters">
                {{item.title}}
                <i v-if="item.isVip" class="iconfont icon-vip"></i>
              </li>
            </ul>
          </scroll>
          <div class="catalogListClose" @click="catalog = false">
            <i class="iconfont icon-guanbi"></i>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="es6">
import api from "../api"
import { staticPath } from "@/utils/const.js"
import util from '@/utils/index'
import moment from 'moment'
import Scroll from "@/components/base/scroll/scroll.vue";
import { XHeader } from 'vux'
import { TransferDom, Popup} from 'vux'
import { mapGetters, mapActions } from 'vuex'
moment.locale('zh-cn');
export default{
  data(){
    return{
      staticPath,
      isFollowed: false,  // 是否加入到本地
      data: {},
      chapterContent: [],
      isReading: false,
      readBoxBottom: false,   // 阅读底部菜单
      readBoxTop: false,  // 阅读顶部菜单
      total: [],  // 目录总数
      chapters: [], // 文章目录
      loadPages: 0, // 滚动加载的记次
      chaptersList: [],
      catalog: false, // 文章目录显示
      nightMode: false // 日夜模式
    }
  },
  filters: {
    ago (time) {
      return moment(time).fromNow()
    }
  },
  watch: {
    chapterContent () {
      this.$refs.chapterContent.refresh()
    },
    chaptersList () {
      this.$refs.catalogListScroll.refresh()
    }
  },
  computed: {
    ...mapGetters(['source']),
    wordCount () {
      return parseInt(this.data.wordCount / 10000, 10)
    },
    chapterContentNor () {
        return this.chapterContent.length && this.chapterContent[0].replace(/\n/g, '<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp')
    }
  },
  components: {
    Scroll, XHeader, Popup
  },
  created() {
    setTimeout(() => {
      this._getDetail()
    }, 20);
    /**
     * 设置默认小说源为优质书源
     */
    this.setResource(this.$route.params.id)
  },
  methods: {
    ...mapActions(['setResource', 'getChapters', 'getChaptersDetail']),
    _getDetail() {
      let id = this.$route.params.id
      api.getBook(id).then((res) => {
        this.data = res.data.data
        this.isFollowBook()
      }).catch(() => {
        console.log('请求错误')
      })
    },
    // 打开阅读
    _openRead() {
      this.chapterContent = []
      this.isReading = true
      this.$vux.loading.show({
        text: '正在加载...'
      })
      this.getChapters(this.source).then((res) => {
        this.total = [...res.data.data.chapters]
        this.chapters = this.total.splice(0, 50)
        this.getChaptersDetail(encodeURIComponent(this.chapters[0].link)).then((res) => {
          console.log(res.data)
          this.chapterContent.push(res.data.data.chapter.cpContent.replace(/\n/g, '<br/>&nbsp&nbsp&nbsp&nbsp&nbsp'))
          this.$vux.loading.hide()
        })
      })
    },
    // 关闭阅读
    closeRead () {
      this.isReading = false
    },
    // 打开目录
    openLog () {
      this.catalog = true
      this.$nextTick(() => {
        this.$refs.catalogListScroll.refresh()
      })
    },
    // 下拉加载目录
    addLog () {
      let totalLen = this.total.length
      this.chapters = this.chapters.concat(
        this.total.slice(50 * this.loadPages, 50 * (this.loadPages + 1))
      )
      this.loadPages++
    },
    // 打开设置
    openSetting(e) {
      this.readBoxBottom = !this.readBoxBottom
      this.readBoxTop = !this.readBoxTop
    },
    isFollowBook () {
      // 判断是否缓存（加入书架）
      let localShelf = util.getLocalStroageData('followBookList')
      this.isFollowed = !!(localShelf && localShelf[this.data._id])
    },
    // 追更新
    follow () {
      let localShelf = util.getLocalStroageData('followBookList') ? util.getLocalStroageData('followBookList') : {}
      if (this.isFollowed) {
        // 删除该书籍在本地的缓存记录
        delete localShelf[this.data._id]
        // 重新保存
        util.setLocalStroageData('followBookList', localShelf)
        this.isFollowed = !this.isFollowed
      } else {
        // 以bookId为键值，方便后续删除等操作
        localShelf[this.data._id] = {...this.data}
        util.setLocalStroageData('followBookList', localShelf)
        this.isFollowed = !this.isFollowed
      }
    }
  }
}
</script>
