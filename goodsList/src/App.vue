<template>
  <div id="app">
      <list
        v-show="current == 'home'"
        @goodClick="handleGoodClick"
        :menuList="menuList"
      />
      <detail
        v-show="current == 'detail'"
        @backClick="changePage('home')"
        :item="currentItem"  
      />
      <midCom
        v-show="current == 'list'"
        @backClick="changePage('home')"
        :item="currentItem"  
      />
  </div>
</template>

<script>
import list from './components/list.vue'
import detail from './components/detail.vue'
import midCom from './components/midCom.vue'

export default {
  name: 'app',
  components: {
    list,
    detail,
    midCom
  },
  data() {
    return {
      current: 'home',
      currentItem: {}, // 从list的点击事件里弹出
      productList: [],
      menuList: [], // 菜单列表
    }
  },
  methods: {
    changePage(type) {
      // 根据传来的东西的类型不同而改变
      this.productList = [];
      this.currentItem = {}
      this.current = type;
    },
    handleGoodClick(item) {
      // 需要判断item的类型 可能是产品 也可能是二级菜单
      if(item.isDir != '0') {
        this.changePage('detail');
      } else {
        this.changePage('list');
      }
      this.currentItem = item; // 可能是当前产品 或者是二级菜单
    },
    getMenuList() {
      // 获取远程数据
      this.$axios.get(this.$url.getList, { id: -1 }).then((res) => {
          if(res.data.code == 0) {
              this.menuList = res.data.result.map((item) => {
                return {
                  ...item,
                  name: item.lableName
                }
              })
          } else {
              // this.$Message.error('查询失败')
          }
      }).catch((err) => {
          // this.$Message.error('未知错误，联系管理员')
      })
    },
  },
  mounted() {
    this.getMenuList();
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.fade-enter-active, .fade-leave-active {
  // transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  // opacity: 0;
}
</style>
