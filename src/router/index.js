import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import rank from '@/views/rank'
import rankList from '@/views/rankList'
import type from '@/views/type'
import find from '@/views/find'
import book from '@/views/book'
import typeDetail from '@/views/typeDetail'
import detail from '@/views/detail'
import readBook from '@/views/readBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {path: '/book/:id', name: 'book', component: book},
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/rank/:id',
      name: 'rankList',
      component: rankList
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
    },
    {
      path: '/type/:id',
      name: 'typeDetail',
      component: typeDetail
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/readbook/:bookId',
      name: 'readbook',
      component: readBook
    }
  ]
})
