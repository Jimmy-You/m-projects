<<template>
	<div class="contentWrapper">
		<div class="op-btns" :style="{visibility: activeItem.id ? 'initial' : 'hidden'}">
			<Button class="btn-item" type="info" @click="handleEdit()">编辑</Button>
			<Button class="btn-item" type="info" @click="modalManageMethod('delete')">删除</Button>
		</div>
		<div class="bread">
			<Breadcrumb>
				<BreadcrumbItem class="pointer"><span @click="handleBreadClick(menuItem)">{{menuItem.name}}</span></BreadcrumbItem>
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
						<img src="/add.png" />
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
						<img  :src="item.type ? '/folder.png' : '/file.png'"/>
					</div>
					<div class="name">
						{{item.name}}
					</div>
				</div>
				</Col>
				
			</Row>
		</div>
		<addModal
			:showModal="modalManage.add"
			modalName="add"
			:addTypeProp="fileList.length ? fileList[0].type == 1 ? '1' : '2' : ''"
			@modalManage="modalManageMethod"
		/>
		<editProductModal
			:showModal="modalManage.edit"
			modalName="edit"
			@modalManage="modalManageMethod"
		/>
		<editFolderModal
			:showModal="modalManage.editFolder"
			modalName="editFolder"
			@modalManage="modalManageMethod"
		/>
		<deleteModal
			:showModal="modalManage.delete"
			modalName="delete"
			@modalManage="modalManageMethod"
		/>
	</div>
</template>
<script>
import addModal from './modals/addModal.vue'
import editProductModal from './modals/editProductModal.vue'
import editFolderModal from './modals/editFolderModal.vue'
import deleteModal from './modals/deleteModal'
const firtList = [
	{ type: 1, name: '测试1', id: 1 },
	{ type: 1, name: '测试2', id: 2 },
	{ type: 1, name: '测试3', id: 3 },
	{ type: 1, name: '测试4', id: 4 },
	{ type: 1, name: '测试5', id: 5 },
	{ type: 1, name: '测试6', id: 6 },
	{ type: 1, name: '测试7', id: 7 },
	{ type: 1, name: '测试8', id: 8 },
	{ type: 1, name: '测试1', id: 11 },
	{ type: 1, name: '测试2', id: 21 },
	{ type: 1, name: '测试3', id: 31 },
	{ type: 1, name: '测试4', id: 41 },
	{ type: 1, name: '测试5', id: 51 },
	{ type: 1, name: '测试6', id: 61 },
	{ type: 1, name: '测试7', id: 71 },
	{ type: 1, name: '测试8', id: 81 },
	{ type: 1, name: '测试1', id: 111 },
	{ type: 1, name: '测试2', id: 211 },
	{ type: 1, name: '测试3', id: 311 },
	{ type: 1, name: '测试4', id: 411 },
	{ type: 1, name: '测试5', id: 511 },
	{ type: 1, name: '测试6', id: 611 },
	{ type: 1, name: '测试7', id: 711 },
	{ type: 1, name: '测试8', id: 811 },
	{ type: 1, name: '测试1', id: 111 },
	{ type: 1, name: '测试2', id: 211 },
	{ type: 1, name: '测试3', id: 311 },
]
const secondList = [
	{ type: 0, name: '测试11', id: 9 },
	{ type: 0, name: '测试22', id: 10 },
]
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
			fileList: firtList,
			activeItem: {}, // 当前选中的项目
			modalManage: {
				add: false,
				edit: false,
				delete: false,
				editFolder: false
			},
			breadList: [], // 面包屑数组
		}
	},
	methods: {
		modalManageMethod(name) {
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
			this.breadList.push({
				name: item.name,
				id: item.id
			})
			if(item.id % 2 == 0) this.fileList = secondList;
			if(item.id % 2 == 1) this.fileList = [];
		},
		// 去到某一目录
		handleBreadClick(item, index = 0) {
			if((item.id != this.menuItem.id) && item.id == this.breadList[this.breadList.length - 1].id) return;
			this.getDataList();
			this.fileList = firtList;
			let i = this.breadList.length - index;
			for(i; i > 0; i--) {
				this.breadList.pop();
			}
		},
		handleEdit() {
			if(this.activeItem.type == 1) {
				this.modalManageMethod('editFolder')
			} else {
				this.modalManageMethod('edit')
			}
		},
		// 获取列表数据
		getDataList() {
			this.activeItem = {}
		}
	},
	watch: {
		menuItem(val) {
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
							width: auto;
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