import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// import VueRouter from 'vue-router'
import List from './components/list.vue'

Vue.use(ViewUI);
// Vue.use(VueRouter)

Vue.config.productionTip = false

// const routes = [
//   { path: '/list', component: List },
// ]

// const router = new VueRouter({
//   routes
// })

// router.beforeEach((to, from, next) => {
//   if(to.path == '/') {
//     next('/list')
//   } else {
//     next()
//   }
// })

new Vue({
  // router,
  render: h => h(App),
}).$mount('#app')
