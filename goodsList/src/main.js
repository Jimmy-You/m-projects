import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from './http';


const flag = process.env.NODE_ENV == 'production' ? true : false;
const prefix = flag ? '' : 'http://139.9.230.33';
const url = {
  getList: prefix + '/hdsm/lable/select', // 查询产品目录
  homePic: prefix + '/pic/product/indexpic.jpg', // 活动图片
  search: prefix + '/hdsm/product/get', // 活动图片
}
const imgFol = flag ? '/pic/lable/' : 'http://139.9.230.33/pic/lable/';
const imgPro = flag ? '/pic/product/' : 'http://139.9.230.33/pic/product/';

Vue.prototype.$url = url;
Vue.prototype.$axios = axios;
Vue.prototype.$imgFol = imgFol;
Vue.prototype.$imgPro = imgPro;

Vue.use(ViewUI);

Vue.config.productionTip = false


const vm = new Vue({
  // router,
  render: h => h(App),
}).$mount('#app')

export default vm;