import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.prototype.trim = str => str.replace(/(^\s*)|(\s*$)/g, "");  //去除尾部空格

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
