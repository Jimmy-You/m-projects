<template>
  <div id="app">
    <Layout v-if="isLogin">
      <Header>
        <div class="header">
          后台管理系统
        </div>
      </Header>
      <div class="content">
        <Layout>
            <Sider hide-trigger>
              <div class="menu-item add-menu" @click="modalManageMethod('add')">
                ++添加新项目++
              </div>
              <div class="menu-item">
                <div>
                  <Upload accept="image/*" action="//jsonplaceholder.typicode.com/posts/">
                      <Button icon="ios-cloud-upload-outline">更新活动</Button>
                  </Upload>
                </div>
              </div>
              <div
                v-for="(item, index) in menuList"
                :key="index"
                class="menu-item"
                @click="menuItemClick(item)"
                :class="{'menu-item-active': activeItem.id == item.id}"
                :title="item.name"
              >
                <div>{{item.name}}</div>
                <div>
                  <img @click.stop="handleEdit(item)" src="./assets/edit.png" style="width: 22px;height:auto;margin-right:4px;"/>
                  <img @click.stop="handleDelete(item)" src="./assets/delete.png" style="width: 22px;height:auto;"/>
                </div>
              </div>
            </Sider>
            <Content>
              <mainContent
                v-if="activeItem.id"
                :menuItem="activeItem"
              />
            </Content>
        </Layout>
      </div>
    </Layout>
    <login v-else @handleLogin="handleLogin" />
    <addModal
			:showModal="modalManage.add"
			modalName="add"
      addTypeProp="1"
      :isRoot="true"
      @handleCreateOk="handleCreateOk"
			@modalManage="modalManageMethod"
		/>
    <deleteModal
			:showModal="modalManage.delete"
      :data="currentClick"
			modalName="delete"
			@modalManage="modalManageMethod"
      @handleDeleteSuccess="getMenuList"
		/>
    <editFolderModal
      :item="currentClick"
			:showModal="modalManage.edit"
			modalName="edit"
       @handleCreateOk="handleCreateOk"
			@modalManage="modalManageMethod"
		/>
  </div>
</template>

<script>
import addModal from './components/modals/addModal.vue'
import mainContent from './components/mainContent.vue'
import deleteModal from './components/modals/deleteModal'
import editFolderModal from './components/modals/editFolderModal'
import login from './components/login'

export default {
  name: 'app',
  components: {
    mainContent,
    addModal,
    deleteModal,
    editFolderModal,
    login
  },
  data() {
    return {
      modalManage: {
				add: false,
        edit: false,
        delete: false,
			},
      menuList: [],
      activeItem: {},
      currentClick: {},
      isLogin: window.sessionStorage.getItem('token'),
    }
  },
  computed: {
    
  },
  methods: {
    modalManageMethod(name) {
			this.modalManage = {
				...this.modalManage,
				[name]: !this.modalManage[name]
			}
		},
    menuItemClick(item) {
      this.activeItem = item;
    },
    handleCreateOk() {
      this.getMenuList();
    },
    getMenuList() {
      // 获取远程数据
      // this.activeItem = { id: 1, name: '项目1', };
      // return;
      this.$axios.get(this.$url.getList, { id: -1 }).then((res) => {
          if(res.data.code == 0) {
              this.menuList = res.data.result.map((item) => {
                return {
                  ...item,
                  name: item.lableName
                }
              })
              console.log(this.menuList)
              this.activeItem = this.menuList[0] || {}
          } else {
              this.$Message.error('查询失败')
          }
      }).catch((err) => {
          this.$Message.error('未知错误，联系管理员')
      })
    },
    handleEdit(item) {
      this.currentClick = item;
      this.modalManageMethod('edit')
    },
    handleDelete(item) {
      this.currentClick = item;
      this.modalManageMethod('delete')
    },
    handleLogin() {
      this.isLogin = window.sessionStorage.getItem('token');
    }
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
.header {
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
  font-size: 30px;
  line-height: 60px;
  letter-spacing: 8px;
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
    height: 60px;
    padding: 0;
  }
  .content {
    .ivu-layout {
      height: calc(100vh - 60px);
      .ivu-layout-sider {
        background: #fff;
        border-right: 1px solid #cbcbcb;
        border-top: 1px solid #cbcbcb;
        background: rgba(0,0,0,0.5);
        overflow: auto;
        width: 239px!important;
        max-width: 600px!important;
        flex: none!important;
        .menu-item {
          width: 100%;
          height: 54px;
          font-size: 18px;
          padding: 16px;
          color: #fff;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          overflow: hidden;
          &:hover {
            background: rgba(0,0,0,0.7);
          }
        }
        .add-menu {
          font-size: 22px;
        }
        .menu-item-active {
          background: rgba(0,0,0,0.9);
        }
      }
      .ivu-layout-content {
        overflow: hidden;
      }
    }
  }
}
</style>
