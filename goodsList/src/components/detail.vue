<template>
  <div class="detailWrapper">
    <Layout>
    <Header>
      <div class="header">
      <Button
        size="small"
        class="back-button"
        @click="backToList"
      >返回</Button>
        钢筋008
      </div>
    </Header>
    <div class="content">
      <Layout>
          <Content>
          <div style="height: 100%;overflow: auto;">
            <Carousel autoplay loop class="m-carousel" v-if="id">
              <CarouselItem>
                  <div class="carousel-item">
                    <img src="/demo1.jpg" />
                  </div>
              </CarouselItem>
              <CarouselItem>
                  <div class="carousel-item">
                    <img src="/demo2.jpg" />
                  </div>
              </CarouselItem>
          </Carousel>
          <div class="detail-desc">
            <div class="price-num">
              <div class="price">
                <span>￥</span>
                <span style="font-size: 22px; ">1999.99元/吨</span>
              </div>
              <div class="num">
                <span>库存: 19999</span>
              </div>
            </div>
            <div>
              <Timeline class="m-timeline">
                <TimelineItem>
                    <p class="time">商品名称</p>
                    <p class="content">钢筋008</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">商品描述</p>
                    <p class="content">008号钢筋008号钢筋008号钢筋008号钢筋008号钢筋008号钢筋008号钢筋008号钢筋008号钢筋008号钢筋008号钢筋</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">其他描述</p>
                    <p class="content">很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好</p>
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

export default {
  name: 'detail',
  props: ['id'],
  components: {
  },
  data() {
    return {
      detail: {

      }
    }
  },
  methods: {
    getDetail() {
      // 获取远程数据
      this.detail = { name: '项目1', };
    },
    backToList() {
      this.$emit('backClick')
    }
  },
  mounted() {
  },
  watch: {
    id(val) {
      this.detail = {}
      // 添加loading状态
      if(val) this.getDetail();
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
