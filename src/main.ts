import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import './styles/index.less'
import ElementUI from 'element-ui'; //完整引入element-ui,当然我真正做项目的时候是按需引入
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
