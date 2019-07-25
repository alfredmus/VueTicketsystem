import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import router from './router'
import store from './store'
require('../node_modules/bootstrap/dist/css/bootstrap.css')

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount("#app");

