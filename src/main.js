import Vue from 'vue'
import App from './App.vue'

// 引入全部组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

import './assets/css/indexicon.css'
import './assets/css/font-awesome.css'
import './assets/css/globle.css'


import { Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import VueHtml5Plus from 'vue-html5plus'
Vue.use(VueHtml5Plus);

import plusExtends from './components/Plugin/plusextents.js'
Vue.prototype.$plusExtends = plusExtends

// 引入路由
import router from './router'

import BootstrapVue  from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
