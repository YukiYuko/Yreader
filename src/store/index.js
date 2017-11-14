/**
 * Created by Windows10 on 2017/11/14.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  source: '' // 小说源
}
const getters = {
  source: state => state.source
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
