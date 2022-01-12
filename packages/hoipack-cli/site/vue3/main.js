import {createApp} from 'vue'

import App from './App.vue'
import Tmap from '@/index'

createApp(App)
.use(Tmap)
.mount('#app')