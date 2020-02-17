<template>
  <div class="listWrapper">
    <Layout>
    <Header>
      <div class="header">
        浩达商贸产品列表
      </div>
    </Header>
    <div class="search_input">
      <Input search placeholder="搜您想要的产品" @on-search="handleSearchProduct" />
    </div>
    <div class="content">
      <Layout>
          <Sider hide-trigger>
            <div
              class="menu-item"
              :class="{'menu-item-active': activeItem.id == '-99'}"
              @click="menuItemClick({ id: '-99', name: '活动' })"
            >
              <div>活动</div>
            </div>
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
              <div v-if="activeItem.id == '-99'">
                <img :src="homePicUrl" style="width: 100%;height: auto;"/>
              </div>
              <div v-else class="secondList"> <!-- 二级菜单  -->
                <template v-if="rightList && rightList.length">
                  <div class="third-list"> <!-- 三级级菜单  -->
                    <Row>
                      <Col 
                        span="8"
                        v-for="(item, index) in rightList"
                        :key="index"
                      >
                        <div class="third-list-item" @click="handleGoodClick(item)">
                          <div class="preview">
                            <img :src="getImage(item)" />
                          </div>
                          <div class="good-name">{{item.name}}</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </template>
                <div v-else style="text-align: center;
                color: #cbcbcb;
    height: calc(100vh - 64px - .2rem - 60px);
    display: flex;
    align-items: center;
    justify-content: center;">
                  暂无数据
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
import defaultImg from '../assets/default.png'

export default {
  name: 'list',
  props: ['menuList'],
  components: {
  },
  data() {
    let url = this.$url.homePic
    return {
      rightList: [],
      thirdListObj: {},
      activeItem: { id: '-99', name: '活动' },
      homePicUrl: url
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
      } else if(item.picPath) {
        return `${this.$imgFol}${item.picPath}`
      } else {
        return defaultImg
      }
    },
    getRightList() {
      this.$axios.get(this.$url.getList, { id: this.activeItem.id }).then((res) => {
          if(res.data.code == 0) {
              this.rightList = res.data.result.map((item) => {
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
    
    handleGoodClick(item) {
      this.$emit('goodClick', item);
    },
    // 搜索产品
    handleSearchProduct(value) {
      if(value) {
        this.$axios.get(this.$url.search, { name : value }).then((res) => {
          if(res.data.code == 0) {
              this.$emit('showSearchResult', res.data.result)
          } else {
              // this.$Message.error('查询失败')
          }
      }).catch((err) => {
          // this.$Message.error('未知错误，联系管理员')
      })
      }
    }
  },
  watch: {
    activeItem() {
      this.rightList = [];
      this.thirdListObj = {};
      this.getRightList();
    },
    menuList(val) {
      if(val && val[0]) {
        // this.activeItem = val[0];
      }
    }
  },
  mounted() {
  },
}
</script>

<style lang="less">
.listWrapper {
  .header {
    height: 64px;
    background: #ee0a24;
    color: #fff;
    box-shadow: 0 .02 .04px 0 rgba(0,0,0,.05);
    font-size: .24rem;
    line-height: 64px;
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
    height: calc(100vh - 60px);
    background:#fff!important;
    .ivu-layout-header {
      height: .6rem;
      padding: 0;
    }
    .content {
      .ivu-layout {
        height: calc(100vh - 100px - 60px);
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
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            height: 0.46rem;
            font-size: 12px;
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
      .third-list {
        .third-list-item {
          padding: .02rem;
          text-align: center;
          .preview {
            width: 100%;
            height: 1.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 100%;
              height: auto;
              max-height: 1.25rem;
            }
            .good-name {

            }
          }
        }
      }
      .secondWrapper {
        padding: .1rem;
        height: 100%;
        overflow: auto;
        .secondList {
          margin-bottom: 60px;
          .second-list-item {
            margin: .1rem 0;
            .title {
              font-size: .16rem;
              font-weight: bold;
            }
            
          }
        }
      }
    }
  }
  .search_input {
    padding: 4px;
    background: #ee0a24;
    height: 40px;
    .ivu-input {
      border-radius: 20px;
    }
  }
}

</style>
