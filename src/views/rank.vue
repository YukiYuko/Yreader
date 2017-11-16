<style lang="less" scoped>
.home {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 53px;
}

.list-content {
    position: absolute;left: 0;right: 0;top: 50px;
    bottom: 0;
    overflow: hidden;
    .rankTop {
        line-height: 45px;
        border-bottom: 1px solid #e7e7e7;
        padding: 0 15px;
        img {
            width: 20px;
            vertical-align: middle;
        }
    }
    .other {
        line-height: 45px;
        padding: 0 15px;
        border-bottom: 1px solid #e7e7e7;
        i {
            float: right;
            color: #666;
            transition: all 0.3s ease-in-out;
            &.active {
                transform: rotate(180deg)
            }
        }
    }
}
.mint-navbar .mint-tab-item.is-selected{
  color: #e87a90;border-color: #e87a90;
}
</style>
<template>
    <div class="home">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">男生</mt-tab-item>
          <mt-tab-item id="2">女生</mt-tab-item>
        </mt-navbar>
        <scroll ref="scroll" :data="list" class="list-content">
            <div>
                <mt-tab-container v-model="selected" :swipeable="true" v-if="list.length > 0">
                    <mt-tab-container-item id="1">
                        <ul>
                            <li @click="$router.push({path:`/rank/${item._id}`})" class="rankTop" v-for="(item,index) in list[0].male" :key="index" v-if="!item.collapse">
                                <img :src="`${imgUrl+item.cover}`" :alt="item.title">
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                        <p class="other" @click="show1">别人家的排行榜
                            <i class="iconfont icon-down" :class="{'active':showMale}"></i>
                        </p>
                        <ul v-show="showMale">
                            <li class="rankTop" v-for="(item,index) in list[0].male" :key="index" v-if="item.collapse">
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <ul>
                            <li class="rankTop" v-for="(item,index) in list[1].female" :key="index" v-if="!item.collapse">
                                <img :src="`${imgUrl+item.cover}`" :alt="item.title">
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                        <p class="other" @click="show2">别人家的排行榜
                            <i class="iconfont icon-down" :class="{'active':showFeMale}"></i>
                        </p>
                        <ul v-show="showFeMale">
                            <li class="rankTop" v-for="(item,index) in list[0].male" :key="index" v-if="item.collapse">
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </scroll>
    </div>
</template>

<script>
import api from '../api';
import Scroll from '@/components/base/Scroll.vue';
export default {
    data() {
        return {
            list: [],
            selected: '1',
            imgUrl: 'http://statics.zhuishushenqi.com',
            showFeMale: false,
            showMale: false
        }
    },
    created() {
        api.getRankType().then((res) => {
            let data = res.data.data
            this.list.push({ male: data.male });
            this.list.push({ female: data.female });
            console.log(this.list);
        }).catch(() => {

        })
    },
    components: {
        Scroll
    },
    methods: {
      show1() {
          this.showMale = !this.showMale;
          this.$nextTick(() => {
              this.$refs.scroll.refresh()
          })
      },
      show2() {
          this.showFeMale = !this.showFeMale;
          this.$nextTick(() => {
              this.$refs.scroll.refresh()
          })
      },
      goRankList(item) {
          console.log(item)
//        api.getRankList(_id).then((res) => {
//          let data = res.data.data
//
//        })
      }
    }
}
</script>

