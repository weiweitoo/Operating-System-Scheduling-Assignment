// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import navbar from './components/navbar'
import tableinput from './components/tableinput'
import piebar from './components/piebar'
Vue.config.productionTip = false

Vue.use(ElementUI)

// Register global component here, must before instanste vue
Vue.component('App',App);
Vue.component('nav-bar',navbar);
Vue.component('table-input',tableinput);
Vue.component('pie-bar',piebar);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>'
})

