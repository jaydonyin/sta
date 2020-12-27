<template>
  <div class="map">
    <echarts-view
      class="map-container"
      ref="echarts"
      :option="option"
      @mapScatter="mapScatter"
      @mapGeoroam="mapGeoroam"
      @mapLegend="mapLegend"
    ></echarts-view>
    <div
      class="map-box"
      v-for="item in mapBoxList"
      :key="item.index"
      :style="[
        { width: mapBoxWidth + 'px' },
        { height: mapBoxHeight + 'px' },
        { transform: 'translate(' + item.x + 'px,' + item.y + 'px)' },
        { zIndex: item.index + 888 },
      ]"
      @click="closeMapBox(item.index)"
    >
      <div v-if="item.value[2].type === 1" class="map-box-container">
        <div class="item" v-text="'编号：' + item.value[2].name"></div>
        <div class="item" v-text="'状态：' + item.value[2].status"></div>
        <div class="item item1">
          <span @click.stop="updateIndex(item)"></span>
          <span @click.stop="showModalBox('equipment-operation')"></span>
        </div>
      </div>
      <div v-if="item.value[2].type === 2" class="map-box-container">
        <div class="item" v-text="'编号：' + item.value[2].name"></div>
        <div class="item" v-text="'状态：' + item.value[2].status"></div>
        <div class="item item2">
          <span @click.stop="updateIndex(item)"></span>
          <span @click.stop="showModalBox('equipment-operation')"></span>
        </div>
      </div>
      <div v-if="item.value[2].type === 3" class="map-box-container">
        <div class="item" v-text="'姓名：' + item.value[2].name"></div>
        <div class="item" v-text="'状态：' + item.value[2].status"></div>
        <div class="item item3">
          <span @click.stop=""></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import EchartsView from '@/components/EchartsView'
export default {
  name: 'MapView',
  components: { EchartsView },
  props: {
    resourceList: {
      type: Array
    },
    weatherCity: {
      type: String
    },
    mapBoxList: {
      type: Array
    }
  },
  data() {
    return {
      option: {
        geo: {
          roam: true,
          type: 'map',
          map: 'china',
          center: [104.065735, 30.659462],
          zoom: 3,
          scaleLimit: {
            min: 0.5,
            max: 5
          },
          label: {
            show: false
          },
          regions: [],
          itemStyle: {
            areaColor: '#000',
            borderColor: 'rgba(0, 57, 119,1)'
          },
          emphasis: {
            label: {
              show: false
            },
            itemStyle: {
              areaColor: '#000',
              borderColor: 'rgba(0, 57, 119,1)'
            }
          }
        },
        series: [],
        legend: {
          orient: 'vertical',
          itemWidth: 30,
          itemHeight: 30,
          itemGap: 15,
          left: 150,
          bottom: 250,
          symbolKeepAspect: false,
          inactiveColor: 'rgba(204,204,204,0.5)',
          textStyle: {
            color: '#fff',
            padding: [0, 0, 0, 15],
            fontSize: '15'
          },
          data: []
        }
      },
      mapBoxWidth: 290,
      mapBoxHeight: 180
    }
  },
  created() {
    this.setMapOption()
  },
  methods: {
    updateIndex(item) {
      this.$emit('videoSrc', item.value[2].videoSrc)
    },
    showModalBox(component) {
      this.$emit('showModalBox', component)
    },
    setMapOption() {
      this.option.series = []
      this.resourceList.forEach(item => {
        this.option.legend.data.push(item.name)
        this.option.series.push({
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 50,
          name: item.name,
          data: item.data,
          symbol: 'image://' + require('@/assets/images/' + item.img)
        })
      })
    },
    mapLegend({ params }) {
      if (!params.selected[params.name]) this.$emit('update:mapBoxList', this.mapBoxList.filter(subItem => subItem.seriesName !== params.name))
    },
    mapScatter({ params }) {
      if (params.componentType === 'geo') {
        this.$emit('update:weatherCity', params.name)
        this.option.geo.regions = []
        this.option.geo.regions.push({
          name: params.name,
          itemStyle: {
            normal: {
              areaColor: '#0085DF'
            },
            emphasis: {
              areaColor: '#0085DF'
            }
          }
        })
        this.$refs.echarts.echarts.setOption(this.option)
      }
      if (params.componentSubType === 'scatter') {
        if (params.data.value[2].type === 0) {
          this.showModalBox('disaster-details')
          return
        }
        const tempMapBoxList = this.mapBoxList
        const event = params.event.event
        const index = tempMapBoxList.length || 0
        if (tempMapBoxList.findIndex(item => item.seriesName === params.seriesName && item.value[0] === params.value[0] && item.value[1] === params.value[1]) !== -1) return false
        tempMapBoxList.push({ index, seriesName: params.seriesName, value: params.value, x: event.offsetX, y: -this.mapBoxHeight })
        this.$emit('update:mapBoxList', tempMapBoxList)
        setTimeout(() => {
          tempMapBoxList[tempMapBoxList.findIndex(item => item.index === index)].y = event.offsetY
          this.$emit('update:mapBoxList', tempMapBoxList)
        }, 100)
      }
    },
    mapGeoroam({ params, option }) {
      this.$emit('update:mapBoxList', [])
      const { zoom, center } = option[0]
      this.option.geo.zoom = zoom
      this.option.geo.center = center
    },
    closeMapBox(index) {
      this.$emit('update:mapBoxList', this.mapBoxList.filter(item => item.index !== index))
    }
  }
}
</script>
<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  &-container {
    width: 100%;
    height: 100%;
  }
  &-box {
    position: absolute;
    top: 0px;
    left: 0px;
    background: url("../assets/images/mapBox.png") no-repeat center;
    background-size: 100% 100%;
    transition: all 0.5s ease;
    display: flex;
    align-items: center;
    overflow: hidden;
    &-container {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-wrap: wrap;
      .item {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $color;
        font-weight: bold;
      }
      .item0 {
        width: 40%;
        span {
          width: 30px;
          height: 30px;
          background: url("../assets/images/item0.png") no-repeat center;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
      .item1 {
        width: 40%;
        span:first-child {
          width: 30px;
          height: 30px;
          background: url("../assets/images/video.png") no-repeat center;
          background-size: 100% 100%;
          cursor: pointer;
        }
        span:last-child {
          margin-left: 50px;
          width: 30px;
          height: 30px;
          background: url("../assets/images/other.png") no-repeat center;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
      .item2 {
        width: 40%;
        span:first-child {
          width: 30px;
          height: 30px;
          background: url("../assets/images/video.png") no-repeat center;
          background-size: 100% 100%;
          cursor: pointer;
        }
        span:last-child {
          margin-left: 50px;
          width: 30px;
          height: 30px;
          background: url("../assets/images/other.png") no-repeat center;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
      .item3 {
        width: 40%;
        span {
          width: 30px;
          height: 30px;
          background: url("../assets/images/item0.png") no-repeat center;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
