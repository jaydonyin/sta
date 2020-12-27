<template>
  <div class="container">
    <div class="content-wrapper">
      <div class="item1">
        <div class="header-box">
          <span class="icon"></span>
          <span class="title">压埋人员详情</span>
        </div>
        <div class="img-box">
          <img src="../assets/images/xq-img1.jpg" alt="">
          <img src="../assets/images/xq-img1.jpg" alt="">
        </div>
      </div>
      <div class="item2">
        <div class="option1">
          <div class="header-box">
            <span class="icon"></span>
            <span class="title">压埋人员意图分析</span>
          </div>
          <div class="info-box">
            <p class="info"><span class="icon"></span>被困人员需要补充水分</p>
          </div>
        </div>
        <div class="option2">
          <div class="header-box">
            <span class="icon"></span>
            <span class="title">压埋人员数量</span>
          </div>
          <div class="info-box">
            <p class="info">1 人</p>
          </div>
        </div>
      </div>
      <div class="item3">
        <div class="option1">
          <div class="header-box">
            <span class="icon"></span>
            <span class="title">压埋时长</span>
          </div>
          <div class="info-box">
            <p class="info">2 小时</p>
          </div>
        </div>
        <div class="option2">
          <div class="header-box">
            <span class="icon"></span>
            <span class="title">救援风险等级</span>
          </div>
          <div class="info-box">
            <p class="info">一级</p>
          </div>
        </div>
      </div>
      <footer class="footer-btn-box">
        <div class="btn" @click="next">
          处置
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisasterDetails',
  methods: {
    showModalBox(component) {
      this.$emit('showModalBox', component)
    },
    next() {
      this.showModalBox('stepTwo')
    }
  }
}
</script>
<style scoped lang="scss">
  .container {
    max-width: 800px;
    padding: 50px;
    .content-wrapper {
      .item1 {
        .header-box {
          display: flex;
          align-items: center;
          .icon {
            display: inline-block;
            width: 20px;
            height: 24px;
            background: url("~@/assets/images/xq-title.png") no-repeat;
            background-size: 100% 100%;
          }
          .title {
            margin-left: 15px;
            font-size: 22px;
            color: #0efcff;
          }
        }
        .img-box {
          padding: 15px;
          display: flex;
          justify-content: space-between;
          img {
            border: 2px solid #0efcff;
            width: 300px;
            height: 200px;
          }
        }
      }
      .item2 {
        display: flex;
        justify-content: space-between;
        .option1 {
          width: 50%;
          .header-box {
            display: flex;
            align-items: center;
            .icon {
              display: inline-block;
              width: 20px;
              height: 28px;
              background: url("~@/assets/images/xq-fx.png") no-repeat;
              background-size: 100% 100%;
            }
            .title {
              margin-left: 15px;
              font-size: 22px;
              color: #0efcff;
            }
          }
          .info-box {
            padding: 0 15px;
            .info {
              display: flex;
              align-items: center;
              font-size: 22px;
              color: #0efcff;
              padding: 5px 0;
              background-image: radial-gradient(farthest-corner at 50% 50%, transparent 50%, rgba(14,252,255, 0.5));
              .icon {
                display: inline-block;
                width: 21px;
                height: 25px;
                background: url("~@/assets/images/beikun-icon.png") no-repeat;
                background-size: 100% 100%;
                margin: 0 10px 0;
              }
            }
          }
        }
        .option2 {
          width: 50%;
          .header-box {
            display: flex;
            align-items: center;
            .icon {
              display: inline-block;
              width: 20px;
              height: 20px;
              background: url("~@/assets/images/xq-sl.png") no-repeat;
              background-size: 100% 100%;
            }
            .title {
              margin-left: 15px;
              font-size: 22px;
              color: #0efcff;
            }
          }
          .info-box {
            padding: 0 15px;
            display: flex;
            justify-content: center;
            .info {
              width: 250px;
              text-align: center;
              font-size: 22px;
              font-weight: 600;
              color: #B59D2F;
              padding: 5px 0;
              background-image: radial-gradient(farthest-corner at 50% 50%, transparent 50%, rgba(14,252,255, 0.5));
            }
          }
        }
      }
      .item3 {
        display: flex;
        justify-content: space-between;
        .option1 {
          width: 50%;
          .header-box {
            display: flex;
            align-items: center;
            .icon {
              display: inline-block;
              width: 20px;
              height: 20px;
              background: url("~@/assets/images/time.png") no-repeat;
              background-size: 100% 100%;
            }
            .title {
              margin-left: 15px;
              font-size: 22px;
              color: #0efcff;
            }
          }
          .info-box {
            padding: 0 15px;
            .info {
              width: 250px;
              text-align: center;
              font-size: 22px;
              font-weight: 600;
              color: #B59D2F;
              padding: 5px 0;
              background-image: radial-gradient(farthest-corner at 50% 50%, transparent 50%, rgba(14,252,255, 0.5));
            }
          }
        }
        .option2 {
          width: 50%;
          .header-box {
            display: flex;
            align-items: center;
            .icon {
              display: inline-block;
              width: 20px;
              height: 17px;
              background: url("~@/assets/images/exclamation.png") no-repeat;
              background-size: 100% 100%;
            }
            .title {
              margin-left: 15px;
              font-size: 22px;
              color: #0efcff;
            }
          }
          .info-box {
            padding: 0 15px;
            display: flex;
            justify-content: center;
            .info {
              width: 250px;
              text-align: center;
              font-size: 22px;
              font-weight: 600;
              color: firebrick;
              padding: 5px 0;
              background-image: radial-gradient(farthest-corner at 50% 50%, transparent 50%, rgba(14,252,255, 0.5));
            }
          }
        }
      }
    }
    .footer-btn-box {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50px;
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 500px;
        height: 50px;
        font-size: 22px;
        font-weight: 600;
        color: #0efcff;
        padding: 5px 0;
        background-image: radial-gradient(farthest-corner at 50% 50%, transparent 50%, rgba(14,252,255, 0.5));
        cursor: pointer;
      }
    }
  }
</style>
