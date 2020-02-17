<template>
  <div class="detailWrapper">
    <Layout>
    <Header>
      <div class="header">
      <img
        src="../assets/back.png"
        class="back-button"
        @click="backToList"
      />
        产品详情
      </div>
    </Header>
    <div class="content">
      <Layout>
          <Content>
          <div style="height: 100%;overflow: auto;margin-bottom: 60px;">
            <Carousel autoplay loop class="m-carousel" v-if="picList && picList.length > 1" ref="carousel">
                <CarouselItem v-for="(item, index) in picList" :key="index">
                    <div class="carousel-item">
                      <img :src="item" style="" @load="handleResizeCarousel"/>
                    </div>
                </CarouselItem>
            </Carousel>
            <div v-else>
              <div class="carousel-item">
                <img style="width: 100%;height: auto;" :src="picList[0]" @load="handleResizeCarousel"/>
              </div>
            </div>
          <div class="detail-desc">
            <div class="price-num" v-for="(item, index) in priceList" :key="index">
              <div class="num">
                <span>规格:{{item.name}}</span>
              </div>
              <div class="price">
                <span>￥</span>
                <span style="font-size: 22px; ">{{item.value}}</span>
              </div>
            </div>
            <div>
              <Timeline class="m-timeline">
                <TimelineItem>
                    <p class="time">商品名称</p>
                    <p class="content">{{item.name || '商品'}}</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">商品描述</p>
                    <p class="content" v-html="getDesc"></p>
                </TimelineItem>
            </Timeline>
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
  name: 'detail',
  props: ['item'],
  components: {
  },
  data() {
    return {
      detail: {

      }
    }
  },
  computed: {
    picList() {
      const item = this.item;
      if(item.productPic) {
        let originList = item.productPic.slice(item.productPic.indexOf('[') + 1, item.productPic.indexOf(']')).split(',')
        return originList.map(f => {
          return this.$imgPro + f.trim();
        })
      } else {
        return [defaultImg];
      }
    },
    priceList() {
      const priceListStr = this.item.productPrice || '[]';
      return JSON.parse(priceListStr) || [];
    },
    getDesc() {
      const desc = this.item.productDesp || '暂无描述'
      return desc.replace(/\n/g,"<br>")
    }
  },
  methods: {
    getDetail() {
      // 获取远程数据
      
    },
    backToList() {
      this.$emit('backClick')
    },
    handleResizeCarousel() {
      if(this.$refs.carousel) {
        this.$refs.carousel.handleResize();
      }
    }
  },
  mounted() {
  },
  watch: {
    item(val) {
      console.log('currentItem------', this.item)
    }
  }
}
</script>

<style lang="less">
.detailWrapper {
  .header {
    height: 0.6rem;
    background: #ee0a24;
    color: #fff;
    -webkit-box-shadow: 0 0.02 0.04px 0 rgba(0, 0, 0, 0.05);
    box-shadow: 0 0.02 0.04px 0 rgba(0, 0, 0, 0.05);
    font-size: 0.24rem;
    line-height: 0.6rem;
    letter-spacing: 0.08rem;
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
      height: 0.6rem;
      padding: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 99;
      .back-button {
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .content {
      .ivu-layout {
        height: calc(100vh - .6rem - 60px);
        .ivu-layout-content {
          .m-carousel {
            .ivu-carousel-track {
              // width: 100%!important;
            }
            .carousel-item {
              height: 3rem;
              display: flex;
              justify-content: center;
              justify-content: center;
              background: #fafafa;
              width: 100%!important;
              .ivu-carousel-item {
                width: 100%!important;
              }
              .carousel-item {
                width: 100%!important;
              }
              img {
                height: 2.8rem;
                width: auto;
              }
            }
          }
          .detail-desc {
            padding: 16px;
            .price-num {
              display: flex;
              justify-content: space-between;
              font-size: 16px;
              align-items: center;
              .price {
                color: red;
              }
              .num {

              }
            }
            .m-timeline {
              margin-top: .1rem;
              .time{
                  font-size: 16px;
                  font-weight: bold;
              }
              .content{
                  padding-left: 5px;
                  font-size: 18px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
