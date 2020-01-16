<template>
	<div class="midComWrapper">
			<Layout v-if="isList">
				<Header>
					<div class="header">
					<Button
						size="small"
						class="back-button"
						@click="backToList"
					>返回</Button>
						产品列表
					</div>
				</Header>
				<div class="content">
					<Layout>
							<Content>
								<div style="height: 100%;overflow: auto;">
									<div class="productList">
										<div 
											v-for="(item, index) in productList"
											:key="index"
											@click="handleShowProductDetail(item)"
											class="product-item"
										>
											<!-- 遍历出来的商品列表 -->
											<img src="../assets/default.png" class="" />
											<div class="descrip">
												<div class="name" style="margin-bottom: .1rem;"><span class="">产品名称:&nbsp;&nbsp;</span>{{item.name || '--'}}</div>
												<div class="desc">产品描述:&nbsp;&nbsp;<span style="color:#999">{{renderDesc('')}}</span></div>
											</div>
										</div>
										<div 
											v-for="(item, index) in productList"
											:key="index"
											@click="handleShowProductDetail(item)"
											class="product-item"
										>
											<!-- 遍历出来的商品列表 -->
											<img src="../assets/default.png" class="" />
											<div class="descrip">
												<div class="name" style="margin-bottom: .1rem;"><span class="">产品名称:&nbsp;&nbsp;</span>{{item.name || '--'}}</div>
												<div class="desc">产品描述:&nbsp;&nbsp;<span style="color:#999">{{renderDesc('')}}</span></div>
											</div>
										</div>
										<div 
											v-for="(item, index) in productList"
											:key="index"
											@click="handleShowProductDetail(item)"
											class="product-item"
										>
											<!-- 遍历出来的商品列表 -->
											<img src="../assets/default.png" class="" />
											<div class="descrip">
												<div class="name" style="margin-bottom: .1rem;"><span class="">产品名称:&nbsp;&nbsp;</span>{{item.name || '--'}}</div>
												<div class="desc">产品描述:&nbsp;&nbsp;<span style="color:#999">{{renderDesc('')}}</span></div>
											</div>
										</div>
									</div>
									
								</div>
							</Content>
					</Layout>
				</div>
		</Layout>
		<detail
			v-else
			@backClick="changePage"
			:item="currentItem"
		></detail>
	</div>
</template>

<script>
import detail from './detail'
import { cutByByte } from './stringUtil'

export default {
	props: ['item'],
	components: {
		detail
	},
	data() {
		return {
			isList: true,
			currentItem: {},
			productList: [], // 产品列表
		}
	},
	methods: {
		renderDesc(desc) {
			let test = 'ceshi askjdkgjnaskldhjgiasjdkjgklasjdfiouasiohgkjasdfkhugjopasdujhiojasdfgjoipaujsdf';
			return cutByByte(test, 200)
		},
		changePage(isDetail) {
			this.isList = true;
			this.currentItem = {};
		},
		getProductList() {
			// 获取产品列表
      const { id = '' } = this.item;
      this.$axios.get(this.$url.getList, { id }).then((res) => {
          if(res.data.code == 0) {
              const list = res.data.result.map((item) => {
                return {
                  ...item,
                  name: item.lableName || item.productName
                }
              })
              this.productList = list;
          } else {
              // this.$Message.error('查询失败')
              this.productList = [];
          }
      }).catch((err) => {
          // this.$Message.error('未知错误，联系管理员')
      })
		},
		handleShowProductDetail(item) {
			this.currentItem = item;
			this.isList = false;
		},
		backToList() {
      this.$emit('backClick')
    },
	},
	watch: {
		item(val) {
			if(val) {
				this.getProductList();
			}
		}
	}
	
}
</script>
<style lang="less">
.midComWrapper {
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
			.back-button {
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .content {
      .ivu-layout {
        height: calc(100vh - .6rem);
        .ivu-layout-content {
          overflow: hidden;
        }
			}
			.productList {
				.product-item {
					height: 1.5rem;
					display: flex;
					padding: 4px;
					align-items: center;
					img {
						height: 1.2rem;
						width: auto;
						max-width: 1.5rem;
					}
					.descrip {
						height: 100%;
						width: 100%;
						padding: .1rem;
						color: #515a6e;
						.name {

						}
						.desc {
							word-break: break-all;
						}
					}
				}
			}
    }
  }
}
</style>