import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
/* 获取胶囊按钮属性 */
Vue.prototype.$customBar = uni.getMenuButtonBoundingClientRect();

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
