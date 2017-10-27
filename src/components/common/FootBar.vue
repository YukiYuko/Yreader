
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.FootBar {
    position: fixed;left: 0;right: 0;bottom:0;
    border-top: 1px solid #e7e7ee;
    a { 
        text-align: center;
        &.router-link-active{ color: #F4A7B9;}
        i{ font-size: 20px;}
        i,span{ margin: 5px 0;}
    }
}
</style>

<template>
    <div class="FootBar" flex>
        <router-link to="/home" box="1" flex justify="center" href="javascript:;" dir="column">
            <i class="iconfont icon-shujia"></i>
            <span>书架</span>
        </router-link>
        <router-link to="/rank" box="1" flex justify="center" href="javascript:;" dir="column">
            <i class="iconfont icon-jingxuan"></i>
            <span>排行</span>
        </router-link>
        <router-link to="/type" box="1" flex justify="center" href="javascript:;" dir="column">
            <i class="iconfont icon-shuku"></i>
            <span>书库</span>
        </router-link>
        <router-link to="/find" box="1" flex justify="center" href="javascript:;" dir="column">
            <i class="iconfont icon-faxian"></i>
            <span>发现</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'FootBar',
    data() {
        return {

        }
    }
}
</script>
