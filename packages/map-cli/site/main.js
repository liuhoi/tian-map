import Vue from 'vue'

import App from './App.vue'
import Tmap from '@/index'

Vue.use(Tmap)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})