import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Mint from 'mint-ui';
import Ajax from './utils/ajax'
import 'mint-ui/lib/style.css';
import VueLazyload from 'vue-lazyload'
import { ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, TransferDom } from 'vux'

Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.directive('TransferDom', TransferDom)

Vue.use(Mint);
Vue.use(Ajax,{
  baseURL: 'http://novel.juhe.im/'
})
Vue.use(VueLazyload, {
  loading: require('@/assets/logo.png'),
  attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
