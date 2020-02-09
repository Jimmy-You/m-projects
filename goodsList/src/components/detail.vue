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
        {{item.name || '产品'}}
      </div>
    </Header>
    <div class="content">
      <Layout>
          <Content>
          <div style="height: 100%;overflow: auto;">
            <Carousel autoplay loop class="m-carousel" v-if="picList && picList.length" ref="carousel">
              <CarouselItem v-for="(item, index) in picList" :key="index">
                  <div class="carousel-item">
                    <img :src="item" style="" @load="handleResizeCarousel"/>
                  </div>
              </CarouselItem>
          </Carousel>
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
                    <p class="content">{{item.productDesp || '暂无描述'}}</p>
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
    position: relative;
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
                  font-size: 14px;
                  font-weight: bold;
              }
              .content{
                  padding-left: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
