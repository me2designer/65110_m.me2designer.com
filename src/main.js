import Vue from 'vue'
import wrap from './App.vue'

Vue.config.productionTip = false

new Vue({
  el: '#wrap',
  render: h => h(wrap),
}).$mount('#wrap')
