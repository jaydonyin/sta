<template>
  <div ref="echarts"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'EchartsView',
  props: {
    option: {
      type: Object
    }
  },
  data() {
    return {
      echarts: null
    }
  },
  mounted() {
    this.initChart()
  },
  destroyed() {
    this.clearChart()
  },
  methods: {
    initChart() {
      this.echarts = echarts.init(this.$refs.echarts)
      if (this.option.geo) {
        echarts.registerMap(this.option.geo.map, require('../utils/maps/' + this.option.geo.map + '.json'))
        this.echarts.on('click', params => this.$emit('mapScatter', { params }))
        this.echarts.on('legendselectchanged', params => this.$emit('mapLegend', { params }))
        this.echarts.on('georoam', params => this.$emit('mapGeoroam', { params, option: this.echarts.getOption().geo }))
      }
      this.echarts.setOption(this.option)
    },
    clearChart() {
      this.echarts.clear()
      this.echarts.off('click')
      this.echarts.off('legendselectchanged')
      this.echarts.off('georoam')
    }
  }
}
</script>
<style scoped lang="scss">

</style>
