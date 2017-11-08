<template>
  <div class="xslider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass} from '@/utils/dom.js'
  import BScroll from 'better-scroll'
  export default {
    name: 'slider',
    props: {
    },
    data() {
      return {
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initSlider()
      }, 20)
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this.slider.refresh()
      })
    },
    deactivated() {
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = 60
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .xslider{
    min-height: 1px;
    .slider-group{
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item{
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        width: 60px;
        a{
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
        }
      }
    }
  }   
</style>