import Vue from 'vue'

import App from './App.vue'
import Tmap from '@/index'
console.log(Tmap)
Vue.use(Tmap)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})