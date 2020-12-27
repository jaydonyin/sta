<template>
  <div class="buttonList">
    <div
      class="buttonList-list"
      v-for="item in buttonList"
      :key="item.component"
      :style="[{ left: item.left + 'px' }]"
      @click="showModalBox(item.component)"
    >
      <img :src="item.buttonImg" alt="" />
      <span>{{ item.buttonText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonList',
  data() {
    return {
      buttonList: [
        {
          buttonText: '设备检测',
          buttonImg: require('@/assets/images/equipmentMonitoring.png'),
          component: 'equipment-monitoring',
          left: 180
        },
        {
          buttonText: '回放',
          buttonImg: require('@/assets/images/playBack.png'),
          component: 'play-back',
          left: 380
        },
        {
          buttonText: '3D模型',
          buttonImg: require('@/assets/images/3D.png'),
          component: 'three-dimensional-model',
          left: 1230
        },
        {
          buttonText: '统计分析',
          buttonImg: require('@/assets/images/statisticAnalyse.png'),
          component: 'statistic-analyse',
          left: 1430
        },
        {
          buttonText: '智能决策',
          buttonImg: require('@/assets/images/intelligentDecision.png'),
          component: '',
          left: 1630
        }
      ]
    }
  },
  methods: {
    showModalBox(component) {
      this.$emit('showModalBox', component)
    }
  }
}
</script>
<style scoped lang="scss">
.buttonList {
  width: 1880px;
  height: 85px;
  margin: -50px auto 0;
  position: relative;
  z-index: 2;
  &-list {
    width: 80px;
    height: 100%;
    cursor: pointer;
    position: absolute;
    top: 0px;
    img {
      width: 60px;
      height: 51px;
      margin: 0 auto;
    }
    span {
      width: 100%;
      height: 34px;
      display: block;
      line-height: 33px;
      text-align: center;
      color: $color;
      font-size: 15px;
      font-weight: bold;
    }
  }
}
</style>
