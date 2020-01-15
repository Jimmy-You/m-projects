<<template>
	<div class="contentWrapper">
		<div class="op-btns" :style="{visibility: activeItem.id ? 'initial' : 'hidden'}">
			<Button class="btn-item" type="info" @click="handleEdit()">编辑</Button>
			<Button class="btn-item" type="info" @click="modalManageMethod('delete')">删除</Button>
		</div>
		<div class="bread">
			<Breadcrumb>
				<BreadcrumbItem class="pointer"><span @click="handleBreadClick(menuItem, -1)">{{menuItem.name}}</span></BreadcrumbItem>
				<BreadcrumbItem
				 	class="pointer"
					v-for="(item, index) in breadList"
					:key="index"
				><span @click="handleBreadClick(item, index)">{{item.name}}</span></BreadcrumbItem>
			</Breadcrumb>	
		</div>
		<div class="main">
			
			<Row>
				<Col span="3" class="col">
					<div class="item-container add-container" @click="modalManageMethod('add')">
						<img src="../assets/add.png" />
					</div>
				</Col>
				<Col
					class="col"
					:xs="12" :sm="6" :md="4" :lg="3"
					v-for="(item, index) in fileList"
					:key="index"
				>
				<div
					class="item-container"
					:class="{'item-container-active': activeItem.id == item.id}"
					@click="handleItemClick(item)"
					@dblclick="handleGoDown(item)"
				>
					<div class="img">
						<img :src="getPicSrc(item)"/>
					</div>
					<div class="name">
						{{item.name}}
					</div>
				</div>
				</Col>
				
			</Row>
		</div>
		<addModal
			:level="level"
			:parentId="level > 2 ? breadList[breadList.length - 1].id : menuItem.id"
			:showModal="modalManage.add"
			modalName="add"
			:addTypeProp="getAddType"
			@modalManage="modalManageMethod"
			@handleCreateOk="getDataList"
		/>
		<editProductModal
			:item="activeItem"
			:showModal="modalManage.edit"
			:faItem="breadList[0] ? breadList[breadList.length - 1] : menuItem"
			modalName="edit"
			@handleUpdateOk="getDataList"
			@modalManage="modalManageMethod"
		/>
		<editFolderModal
			:item="activeItem"
			:level="level"
			:showModal="modalManage.editFolder"
			modalName="editFolder"
			@handleEditOk="getDataList"
			@modalManage="modalManageMethod"
		/>
		<deleteModal
			:data="activeItem"
			:showModal="modalManage.delete"
			modalName="delete"
			@modalManage="modalManageMethod"
			@handleDeleteSuccess="getDataList"
		/>
	</div>
</template>
<script>
import addModal from './modals/addModal.vue'
import editProductModal from './modals/editProductModal.vue'
import editFolderModal from './modals/editFolderModal.vue'
import deleteModal from './modals/deleteModal'
import filePic from '../assets/file.png'
import folderPic from '../assets/folder.png'

export default {
	props: ['menuItem'],
	components: {
		addModal,
		editProductModal,
		deleteModal,
		editFolderModal
	},
	data() {
		return {
			currentDir: this.menuItem || {},
			fileList: [],
			activeItem: {}, // 当前选中的项目
			level: 2, // 默认的展现目录层级
			modalManage: {
				add: false,
				edit: false,
				delete: false,
				editFolder: false
			},
			breadList: [], // 面包屑数组
		}
	},
	computed: {
		getAddType() {
			if(this.level >= 3) {
				return '2'
			} else {
				return this.fileList.length ? this.fileList[0].isDir == '0' ? '1' : '2' : '';
			}
		}
	},
	methods: {
		getPicSrc(item) {
			if(item.isDir == '0') {
				if(item.picPath) {
					return `${this.$imgFol}${item.picPath}`
				} else {
					return folderPic
				}
			} else {
				if(item.productPic) {
					let picList = item.productPic.slice(item.productPic.indexOf('[') + 1, item.productPic.indexOf(']')).split(',')
					return `${this.$imgPro}${picList[0].trim()}`
				} else {
					return filePic
				}
			}
		},
		modalManageMethod(name) {
			if(name == 'add') {
				this.activeItem = {}
			}
			this.modalManage = {
				...this.modalManage,
				[name]: !this.modalManage[name]
			}
		},
		handleItemClick(item) {
			if(this.activeItem.id == item.id) {
				this.activeItem = {};
				return;
			}
			this.activeItem = item;
		},
		// 展开下一层级
		handleGoDown(item) {
			if(item.isDir != '0') return; // 如果不是目录 则return
			this.level+=1;
			this.currentDir = item;
			this.activeItem = {};
			this.breadList.push({
				name: item.name,
				id: item.id
			})
			// if(item.id % 2 == 0) this.fileList = secondList;
			// if(item.id % 2 == 1) this.fileList = [];
			// return
			this.getDataList()
		},
		// 去到某一目录
		handleBreadClick(item, index = 0) {
			if((item.id != this.menuItem.id) && item.id == this.breadList[this.breadList.length - 1].id) return;
			this.currentDir = item;
			this.level = index + 2; // 在面包屑的基础上计算出当前的层级
			this.getDataList();
			// this.fileList = firtList;
			let i = this.breadList.length - index - 1;
			for(i; i > 0; i--) {
				this.breadList.pop();
			}
		},
		handleEdit() {
			if(this.activeItem.isDir == '0') {
				this.modalManageMethod('editFolder')
			} else {
				this.modalManageMethod('edit')
			}
		},
		// 获取列表数据
		getDataList() {
			const id = this.currentDir.id;
			if(!id) return;
			this.$axios.get(this.$url.getList, { id }).then((res) => {
          if(res.data.code == 0) {
              this.fileList = res.data.result.map((item) => {
                return {
                  ...item,
                  name: item.lableName || item.productName
                }
              })
          } else {
              this.$Message.error('查询失败')
          }
      }).catch((err) => {
          this.$Message.error('未知错误，联系管理员')
      })
		}
	},
	watch: {
		menuItem(val) {
			this.currentDir = val;
			this.level = 2;
			this.breadList = []
			this.activeItem = {}
			
			this.getDataList();
		}
	},
	mounted() {
		this.getDataList();
	},
}
</script>
<style lang="less">
	.contentWrapper {
		background: #fff;
		.op-btns {
			padding: 0 16px;
			margin: 5px;
			position: fixed;
			width:100%;
			top: 66px;
			.btn-item {
				margin-right: 6px;
			}
		}
		.bread {
			margin: 10px 5px;
			padding: 0 16px;
			position: fixed;
			width:100%;
			top: 98px;
		}
		
		.main {
			padding: 16px 20px;
			height: calc(100vh - 140px);
			margin-top: 80px;
			overflow: auto;
			.col {
				padding: 6px;
				.item-container {
					border-radius: 10px;
					cursor: pointer;
					.img {
						display: flex;
						align-items: center;
						justify-content: center;
						img {
							height: 160px;
							width: 80%;
						}
					}
					.name {
						text-align: center;
						font-size: 16px;
					}
				}
				.item-container-active {
					background: rgba(0,0,0,.1)
				}
				.add-container {
					height: 180px;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px dashed #cbcbcb;
					cursor: pointer;
					img {
						width:60px;
					}
				}
			}
			
			
			
		}
	}
</style>