<template>
  <div class="listWrapper">
    <Layout>
    <Header>
      <div class="header">
        产品列表
      </div>
    </Header>
    <div class="content">
      <Layout>
          <Sider hide-trigger>
            <div
              v-for="(item, index) in menuList"
              :key="index"
              class="menu-item"
              :class="{'menu-item-active': activeItem.id == item.id}"
              :title="item.name"
              @click="menuItemClick(item)"
            >
              <div>{{item.name}}</div>
            </div>
          </Sider>
          <Content>
            <div class="secondWrapper">
              <div class="secondList"> <!-- 二级菜单  -->
                <div class="second-list-item" v-for="(item, index) in menuList" :key="index">
                  <div class="title">{{item.name}}</div>
                  <div class="third-list"> <!-- 三级级菜单  -->
                    <Row>
                    <Col 
                      span="8"
                      v-for="(item, index) in menuList"
                      :key="index"
                    >
                      <div class="third-list-item" @click="handleGoodClick(item)">
                        <div class="preview">
                          <img src="/default.png" />
                        </div>
                        <div class="good-name">{{item.name}}</div>
                      </div>
                    </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </Content>
      </Layout>
    </div>
    </Layout>
  </div>
</template>

<script>

export default {
  name: 'list',
  components: {
  },
  data() {
    return {
      menuList: [
        { id: 1, name: '项目1', },
        { id: 2, name: '项目2', },
        { id: 3, name: '项目3', },
        { id: 4, name: '项目4', },
        { id: 5, name: '项目5', },
        { id: 6, name: '项目6', },
      ],
      activeItem: {},
    }
  },
  methods: {
    menuItemClick(item) {
      this.activeItem = item;
    },
    getMenuList() {
      // 获取远程数据
      this.activeItem = { id: 1, name: '项目1', };
    },
    handleGoodClick(item) {
      this.$emit('goodClick', item);
    }
  },
  mounted() {
    this.getMenuList()
  },
}
</script>

<style lang="less">
.listWrapper {
  .header {
    height: .6rem;
    background: #ee0a24;
    color: #fff;
    box-shadow: 0 .02 .04px 0 rgba(0,0,0,.05);
    font-size: .24rem;
    line-height: .6rem;
    letter-spacing: .08rem;
    text-align: center;
    position: absolute;
    width: 100%;
    top: 0;
  }
  .flex {
    display: flex;
  }
  .ivu-layout {
    height: 100vh;
    background:#fff!important;
    .ivu-layout-header {
      height: .6rem;
      padding: 0;
    }
    .content {
      .ivu-layout {
        height: calc(100vh - .6rem);
        .ivu-layout-sider {
          background: #fafafa;
          // border-right: 1px solid #cbcbcb;
          // border-top: 1px solid #cbcbcb;
          overflow: auto;
          width: 25%!important;
          max-width: 25%!important;
          min-width: 25%!important;
          flex: none!important;
          .menu-item {
            width: 100%;
            height: 0.46rem;
            font-size: 0.18rem;
            padding: 0.1rem;
            color: #323233;
            display: flex;
            justify-content: center;
            cursor: pointer;
            overflow: hidden;
            border-left: 2px solid #fafafa;
            &:hover {
              // background: rgba(0,0,0,0.2);
            }
          }
          .add-menu {
            font-size: .22rem;
          }
          .menu-item-active {
            background: #fff;
            border-left: 2px solid #ee0a24;
          }
        }
        .ivu-layout-content {
          overflow: hidden;
        }
      }
      .secondWrapper {
        padding: .1rem;
        height: 100%;
        overflow: auto;
        .secondList {
          .second-list-item {
            margin: .1rem 0;
            .title {
              font-size: .16rem;
              font-weight: bold;
            }
            .third-list {
              .third-list-item {
                padding: .02rem;
                text-align: center;
                .preview {
                  width: 100%;
                  img {
                    width: 100%;
                    height: auto;
                  }
                  .good-name {

                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

</style>
