import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import Ajax from './utils/ajax'
import 'mint-ui/lib/style.css';

Vue.use(Mint);
Vue.use(Ajax,{
  baseURL: 'http://35.189.165.140:3000/'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
