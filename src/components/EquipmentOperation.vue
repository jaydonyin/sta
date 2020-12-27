<template>
  <div class="container">
    <div class="content-wrapper">
      <div class="top-wrapper">
        <span class="top-icon"></span>
        <span class="title">航线规划</span>
      </div>
      <div class="center-wrapper">
        <div class="left-wrapper">
          <span class="left-icon"></span>
          <span class="title">一键返航</span>
        </div>
        <div class="btn-wrapper">
          <span class="top-btn"></span>
          <span class="right-btn"></span>
          <span class="bottom-btn"></span>
          <span class="left-btn"></span>
        </div>
        <div class="right-wrapper">
          <span class="right-icon"></span>
          <span class="title">一键起飞</span>
        </div>
      </div>
      <div class="bottom-wrapper">
        <span class="bottom-icon"></span>
        <span class="title">电源开关</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EquipmentOperation',
  components: {},
  props: {},
  data() {
    return {}
  },
  watch: {},
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .container {
    max-width: 1245px;
    padding: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      font-size: 22px;
      color: #0efcff;
    }
    .content-wrapper {
      width: 600px;
      height: 600px;
      .top-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .top-icon {
          display: inline-block;
          width: 100px;
          height: 100px;
          background: url("~@/assets/images/wurenji-top.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .center-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 300px;
        .left-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .right-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .left-icon {
          display: inline-block;
          width: 100px;
          height: 100px;
          background: url("~@/assets/images/wurenji-left.png") no-repeat;
          background-size: 100% 100%;
        }
        .btn-wrapper {
          position: relative;
          width: 200px;
          height: 200px;
          .top-btn {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            display: inline-block;
            width: 50px;
            height: 50px;
            background: url("~@/assets/images/wurenji-btn-top.png") no-repeat;
            background-size: 100% 100%;
          }
          .right-btn {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%) rotate(90deg) ;
            display: inline-block;
            width: 50px;
            height: 50px;
            background: url("~@/assets/images/wurenji-btn-top.png") no-repeat;
            background-size: 100% 100%;
          }
          .bottom-btn {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%) rotate(180deg);
            display: inline-block;
            width: 50px;
            height: 50px;
            background: url("~@/assets/images/wurenji-btn-top.png") no-repeat;
            background-size: 100% 100%;
          }
          .left-btn {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%) rotate(-90deg);
            display: inline-block;
            width: 50px;
            height: 50px;
            background: url("~@/assets/images/wurenji-btn-top.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .right-icon {
          display: inline-block;
          width: 100px;
          height: 100px;
          background: url("~@/assets/images/wurenji-right.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .bottom-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .bottom-icon {
          display: inline-block;
          width: 100px;
          height: 100px;
          background: url("~@/assets/images/wurenji-bottom.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
