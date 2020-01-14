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
                <template v-if="rightList && rightList[0] && rightList[0].isDir == '0'">
                  <div class="second-list-item" v-for="(item, index) in rightList" :key="index">
                    <div class="title">{{item.name}}</div>
                    <div class="third-list"> <!-- 三级级菜单  -->
                      <Row>
                      <template v-if="thirdListObj[item.id] && thirdListObj[item.id].length">
                        <Col 
                          span="8"
                          v-for="(item, index) in thirdListObj[item.id]"
                          :key="index"
                        >
                          <div class="third-list-item" @click="handleGoodClick(item)">
                            <div class="preview">
                              <img :src="getImage(item)" />
                            </div>
                            <div class="good-name">{{item.name}}</div>
                          </div>
                        </Col>
                      </template>
                      </Row>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <!-- 直接是子产品的 -->
                  <Row>
                      <Col 
                        span="8"
                        v-for="(item, index) in rightList"
                        :key="index"
                      >
                        <div class="third-list-item" @click="handleGoodClick(item)">
                          <div class="preview">
                            <img :src="getImage(item)" style="width: 80%;height: 1rem;"/>
                          </div>
                          <div class="good-name">{{item.name}}</div>
                        </div>
                      </Col>
                    </Row>
                </template>
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
      menuList: [],
      rightList: [],
      thirdListObj: {},
      activeItem: {},
    }
  },
  methods: {
    menuItemClick(item) {
      this.activeItem = item;
    },
    getImage(item) {
      if(item.productPic) {
        let picList = item.productPic.slice(item.productPic.indexOf('[') + 1, item.productPic.indexOf(']')).split(',')
        return `${this.$imgPro}${picList[0].trim()}`
      } else {
        return '/default.png'
      }
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
              this.activeItem = this.menuList[0] || {}
          } else {
              // this.$Message.error('查询失败')
          }
      }).catch((err) => {
          // this.$Message.error('未知错误，联系管理员')
      })
    },
    getRightList() {
      this.$axios.get(this.$url.getList, { id: this.activeItem.id }).then((res) => {
          if(res.data.code == 0) {
              this.rightList = res.data.result.map((item) => {
                if(item.isDir == '0') this.getThirdList(item);
                return {
                  ...item,
                  name: item.lableName || item.productName
                }
              })
          } else {
              // this.$Message.error('查询失败')
          }
      }).catch((err) => {
          // this.$Message.error('未知错误，联系管理员')
      })
    },
    // 获取第三级菜单
    getThirdList(faItem) {
      const { id = '' } = faItem;
      this.$axios.get(this.$url.getList, { id }).then((res) => {
          if(res.data.code == 0) {
              const list = res.data.result.map((item) => {
                return {
                  ...item,
                  name: item.lableName || item.productName
                }
              })
              this.thirdListObj = { ...this.thirdListObj, [id]: list };
          } else {
              // this.$Message.error('查询失败')
              this.thirdListObj = { ...this.thirdListObj, [id]: [] };
          }
      }).catch((err) => {
          // this.$Message.error('未知错误，联系管理员')
      })
    },
    handleGoodClick(item) {
      this.$emit('goodClick', item);
    }
  },
  watch: {
    activeItem() {
      this.rightList = [];
      this.thirdListObj = {};
      this.getRightList();
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
