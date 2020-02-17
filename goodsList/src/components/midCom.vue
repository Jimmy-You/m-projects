<template>
	<div class="midComWrapper">
			<Layout v-if="isList">
				<Header>
					<div class="header">
					<img
						src="../assets/back.png"
						class="back-button"
						@click="backToList"
					/>
					<!-- <Button
						size="small"
						class="back-button"
						@click="backToList"
					>返回</Button> -->
						{{item.name || '产品列表'}}
					</div>
				</Header>
				<div class="content">
					<Layout>
							<Content>
								<div>
									<div v-if="productList.length" class="productList">
										<div 
											v-for="(item, index) in productList"
											:key="index"
											@click="handleShowProductDetail(item)"
											class="product-item"
										>
											<!-- 遍历出来的商品列表 -->
											<img :src="getImage(item)" class="" />
											<div class="descrip">
												<div class="name" style="margin-bottom: .1rem;"><span class="">产品名称:&nbsp;&nbsp;</span><span style="font-weight: bold">{{item.name || item.productName || '--'}}</span></div>
												<div class="desc">产品描述:&nbsp;&nbsp;<span style="font-weight: bold">{{renderDesc(item.productDesp) || '暂无说明'}}</span></div>
											</div>
										</div>
									</div>
									 <div v-else style="text-align: center;
                color: #cbcbcb;
    height: calc(100vh - 64px - .2rem - 60px);
    display: flex;
    align-items: center;
    justify-content: center;">
                  暂无数据
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
import defaultImg from '../assets/default.png'

export default {
	props: ['item', 'serachResult'],
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
		renderDesc(desc = '') {
			return cutByByte(desc, 100)
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
			this.productList = [];
      this.$emit('backClick')
    },
	},
	watch: {
		item(val, old) {
			if(val.id != old.id && !this.serachResult.length) {
				this.getProductList();
			}
		},
		serachResult(val) {
			if(val.length) {
				this.productList = val;
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
    height: calc(100vh - 60px);
    background:#fff!important;
    .ivu-layout-header {
      height: .6rem;
			padding: 0;
			position: fixed;
			top: 0;
			width: 100%;
			.back-button {
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .content {
      .ivu-layout {
				margin-top: .6rem;
				
        height: calc(100vh - .6rem - 60px);
        .ivu-layout-content {
          // overflow: hidden;
        }
			}
			.productList {
				margin-bottom: 60px;
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
						border-bottom: 1px solid #e8e8e8;
						&:last-child {
							border: none;
						}
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