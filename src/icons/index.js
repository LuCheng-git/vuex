import Vue from 'vue'
import iconSvg from '../components/svgIcon/iconSvg.vue'
 
Vue.component('icon-svg', iconSvg)
 
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)