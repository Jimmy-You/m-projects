<template>
  <div id="app">
      <list
        v-show="current == 'home'"
        @goodClick="handleGoodClick"
        @showSearchResult="showSearchResult"
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
        :serachResult="serachResult"
        :item="currentItem"  
      />
      <div class="globalLoading" v-if="$data.globalLoading">

      </div>
      <div class="brand">
        <div class="brand_name">
          浩达商贸
        </div>
        <div class="phone">
          <p><img src="./assets/phone.png" />18681993941&nbsp;&nbsp;(微信同号)</p>
          <p><img src="./assets/phone.png" />18182548466&nbsp;&nbsp;(微信同号)</p>
        </div>
      </div>
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
      serachResult: [],
    }
  },
  methods: {
    changePage(type) {
      // 根据传来的东西的类型不同而改变
      this.productList = [];
      this.currentItem = {}
      this.current = type;
    },
    showSearchResult(result = []) {
      this.changePage('list')
      this.serachResult = result;
    },
    handleGoodClick(item) {
      // 需要判断item的类型 可能是产品 也可能是二级菜单
      if(item.isDir != '0') {
        this.changePage('detail');
      } else {
        this.changePage('list');
      }
      this.serachResult = [];
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
  },
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
.globalLoading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6)
}
.brand {
  background: #efefda;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #ee0a24;
  font-size: 18px;
  .brand_name {
    display: inline-flex;
    width: 25%;
    align-items: center;
    justify-content: center;
    height: 60px;
  }
  @keyframes mymove
  {
    from {
      transform:rotate(7deg);
      -ms-transform:rotate(7deg); 	/* IE 9 */
      -moz-transform:rotate(7deg); 	/* Firefox */
      -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
      -o-transform:rotate(7deg);
    }
    to {
      transform:rotate(-7deg);
      -ms-transform:rotate(-7deg); 	/* IE 9 */
      -moz-transform:rotate(-7deg); 	/* Firefox */
      -webkit-transform:rotate(-7deg); /* Safari 和 Chrome */
      -o-transform:rotate(-7deg);
    }
  }

  @-moz-keyframes mymove /* Firefox */
  {
    from {
      transform:rotate(7deg);
      -ms-transform:rotate(7deg); 	/* IE 9 */
      -moz-transform:rotate(7deg); 	/* Firefox */
      -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
      -o-transform:rotate(7deg);
    }
    to {
      transform:rotate(-7deg);
      -ms-transform:rotate(-7deg); 	/* IE 9 */
      -moz-transform:rotate(-7deg); 	/* Firefox */
      -webkit-transform:rotate(-7deg); /* Safari 和 Chrome */
      -o-transform:rotate(-7deg);
    }
  }

  @-webkit-keyframes mymove /* Safari 和 Chrome */
  {
    from {
      transform:rotate(7deg);
      -ms-transform:rotate(7deg); 	/* IE 9 */
      -moz-transform:rotate(7deg); 	/* Firefox */
      -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
      -o-transform:rotate(7deg);
    }
    to {
      transform:rotate(-7deg);
      -ms-transform:rotate(-7deg); 	/* IE 9 */
      -moz-transform:rotate(-7deg); 	/* Firefox */
      -webkit-transform:rotate(-7deg); /* Safari 和 Chrome */
      -o-transform:rotate(-7deg);
    }
  }
  .phone {
    display: inline-block;
    width: 75%;
    vertical-align: top;
    height: 60px;
    text-align: left;
    p {
      line-height: 30px;
      display: flex;
      align-items: center;
      img {
        width: 18px;
        height: 18px;
        margin: 0 10px;
        animation:mymove .5s infinite linear;
        -webkit-animation:mymove .5s infinite linear;
      }
    }
  }
}
</style>
