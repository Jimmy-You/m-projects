import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from './http';

const flag = process.env.NODE_ENV == 'production' ? true : false;
const url = {
  addFolder: flag ? '' : 'http://192.168.1.30:8765' + '/hdsm/lable/add', // 新建目录
  updateFolder: flag ? '' : 'http://192.168.1.30:8765' + '/hdsm/lable/update', // 编辑目录
  delFolder: flag ? '' : 'http://192.168.1.30:8765' + '/hdsm/lable/delete', // 删除目录
  updateProduct: flag ? '' : 'http://192.168.1.30:8765' + '/hdsm/product/add', // 新建修改产品信息
  delProduct: flag ? '' : 'http://192.168.1.30:8765' + '/hdsm/product/delete', // 删除产品
  getList: flag ? '' : 'http://192.168.1.30:8765' + '/hdsm/lable/select', // 查询产品目录
  deletepic: flag ? '' : 'http://192.168.1.30:8765' + '/hdsm/product/deletepic', // 删除图片
}
const imgFol = flag ? '/pic/lable/' : 'http://192.168.1.30:8619/pic/lable/';
const imgPro = flag ? '/pic/product/' : 'http://192.168.1.30:8619/pic/product/';

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
