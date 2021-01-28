import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入echarts
// import echarts from 'echarts'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import axios from 'axios'
import './icons'

import {fabric} from 'fabric'
import { Chrome} from 'vue-color'

Vue.use(fabric)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  components: {
    'chrome-picker':Chrome
  }
  
}).$mount('#app')
