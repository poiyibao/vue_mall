import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import FastClick from 'fastclick';
import VueLazyload from "vue-lazyload";

import toast from 'components/common/toast/index';
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
//安装 roast插件
Vue.use(toast)

//图片懒加载插件
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/loading.svg')
})
// 解决移动端300MS延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
