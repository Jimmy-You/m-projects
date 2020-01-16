import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from './http';


const flag = process.env.NODE_ENV == 'production' ? true : false;
const prefix = flag ? '' : 'http://39.106.169.235';
const url = {
  getList: prefix + '/hdsm/lable/select', // 查询产品目录
}
const imgFol = flag ? '/pic/lable/' : 'http://39.106.169.235/pic/lable/';
const imgPro = flag ? '/pic/product/' : 'http://39.106.169.235/pic/product/';

Vue.prototype.$url = url;
Vue.prototype.$axios = axios;
Vue.prototype.$imgFol = imgFol;
Vue.prototype.$imgPro = imgPro;

Vue.use(ViewUI);

Vue.config.productionTip = false


new Vue({
  // router,
  render: h => h(App),
}).$mount('#app')
