
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.type {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 53px;
  .list-content{
    height: 100%;
    overflow: hidden
  }
  .typeBox {
    .typeTitle {
      padding: 20px 10px;
    }
    .title{ font-size: 16px;color: #333;margin-bottom: 5px;}
    .count{ font-size: 14px;color: #999;}
  }
}
</style>

<template>
    <div class="type">
        <scroll ref="scroll" :data="list" class="list-content">
            <div>
                <div class="typeBox" v-for="(item,index) in list" :key="index">
                  <div class="typeTitle">{{['男','女','出版'][index]}}</div>
                  <grid :cols="3">
                    <grid-item v-for="(book,i) in item" :key="i">
                      <div slot="label" @click="$router.push({path:`/type/${book.name}`,query:{gender:['male','female','press'][index]}})">
                        <h2 class="title">{{book.name}}</h2>
                        <p class="count">{{book.bookCount}}</p>
                      </div>
                    </grid-item>
                  </grid>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import api from "../api";
import { Grid, GridItem } from "vux";
import Scroll from "@/components/base/Scroll.vue";
export default {
  name: "Type",
  data() {
    return {
      list: []
    }
  },
  components: {
    Scroll,
    Grid,
    GridItem
  },
  created() {
    setTimeout(() => {
      api
        .getCategory()
        .then(({ data }) => {
          this.list.push(data.data.male);
          this.list.push(data.data.female);
          this.list.push(data.data.press);
          console.log(this.list)
        })
        .catch(() => {});
    }, 20);
  }
};
</script>
