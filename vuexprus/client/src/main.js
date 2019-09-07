import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

// setting up default vue http modules for api calls
Vue.prototype.$http = axios
//load token from the localStorage
const token = localStorage.getItem('token')
// If there is any token then we will append default axios auth headers
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
