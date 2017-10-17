import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/views/home'
import rank from '@/views/rank'
import type from '@/views/type'
import find from '@/views/find'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/type',
      name: 'type',
      component: type
    },
    {
      path: '/find',
      name: 'find',
      component: find
    }
  ]
})
