import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from './http';

const flag = process.env.NODE_ENV == 'production' ? true : false;
const url = {
  addFolder: flag ? '' : 'http://127.0.0.1:8765' + '/hdsm/lable/add', // 新建目录
  updateFolder: flag ? '' : 'http://127.0.0.1:8765' + '/hdsm/lable/update', // 编辑目录
  delFolder: flag ? '' : 'http://127.0.0.1:8765' + '/hdsm/lable/post', // 删除目录
  updateProduct: flag ? '' : 'http://127.0.0.1:8765' + '/hdsm/product/add', // 新建修改产品信息
  delProduct: flag ? '' : 'http://127.0.0.1:8765' + '/hdsm/product/delete', // 删除产品
  getList: flag ? '' : 'http://127.0.0.1:8765' + '/hdsm/lable/select', // 查询产品目录
}

Vue.prototype.$url = url;
Vue.prototype.$axios = axios;

console.log(axios)

Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
