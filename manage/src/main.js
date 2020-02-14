import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from './http';

const flag = process.env.NODE_ENV == 'production' ? true : false;
const prefix = flag ? '' : 'http://139.9.230.33/';
const url = {
  addFolder: prefix + '/hdsm/lable/add', // 新建目录
  updateFolder: prefix + '/hdsm/lable/update', // 编辑目录
  delFolder: prefix + '/hdsm/lable/delete', // 删除目录
  updateProduct: prefix + '/hdsm/product/add', // 新建修改产品信息
  delProduct: prefix + '/hdsm/product/delete', // 删除产品
  getList: prefix + '/hdsm/lable/select', // 查询产品目录
  deletepic: prefix + '/hdsm/product/deletepic', // 删除图片
  updateMain: prefix + '/hdsm/index/add', // 更新活动
}
const imgFol = flag ? '/pic/lable/' : 'http://139.9.230.33/pic/lable/';
const imgPro = flag ? '/pic/product/' : 'http://139.9.230.33/pic/product/';

Vue.prototype.$url = url;
Vue.prototype.$axios = axios;
Vue.prototype.$imgFol = imgFol;
Vue.prototype.$imgPro = imgPro;

console.log(axios)

Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
