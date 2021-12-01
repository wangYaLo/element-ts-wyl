import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
console.log(process.env.NODE_ENV);

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount('#app');
