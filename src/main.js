import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

// 公共组件
import '@/components/commons'

import '@fortawesome/fontawesome-free/css/all.css'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css'
import '@/styles/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
