import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Equal from 'equal-vue'
import 'equal-vue/dist/style.css'
import '@/views/Game/game.css'

createApp(App).use(store).use(router).use(Equal).mount('#app')
