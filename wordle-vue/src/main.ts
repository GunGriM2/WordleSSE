import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '@/views/Game/game.css'

Chart.plugins.register(ChartDataLabels);
Vue.use(Chartkick, { adapter: Chart })
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
