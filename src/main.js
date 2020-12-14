import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

import InputFile from './components/inputFile.vue';

Vue.component("InputFile",InputFile);

// router.beforeEach((to, from, next) => {
//   console.log(to);
//   console.log(from);
//   console.log(next);
  
//   next();
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // axios,
  render: function (h) { return h(App) }
}).$mount('#app')

Vue.prototype.$bus = new Vue();
