<template>
  <div id="app">
    <transition name="fade">
      <list
        v-show="!current"
        @goodClick="handleGoodClick"
      />
    </transition>
    <transition  name="fade">
      <detail
        v-show="current"
        @backClick="changePage"
        :id="currentItem.id"  
      />
    </transition>
  </div>
</template>

<script>
import list from './components/list.vue'
import detail from './components/detail.vue'

export default {
  name: 'app',
  components: {
    list,
    detail
  },
  data() {
    return {
      current: false,
      currentItem: {}, // 从list的点击事件里弹出
    }
  },
  methods: {
    changePage() {
      this.current = !this.current;
    },
    handleGoodClick(item) {
      this.changePage();
      this.currentItem = item; // 当前要查看详情的项目
    }
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
