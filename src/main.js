import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

//configure axios base url
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_ROUTE + '/api'
Vue.use(vuetify)
new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
