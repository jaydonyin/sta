<template>
  <div class="data">
    <div class="data-list">
      <div class="data-list-title">救援情况统计</div>
      <div class="data-list-view">
        <echarts-view
          class="data-list-view-rescue"
          :option="rescueOption"
        ></echarts-view>
      </div>
    </div>
    <div class="data-list">
      <div class="data-list-title">{{ weatherCity }}实时天气预报</div>
      <div class="data-list-weather">
        <div v-if="!weather.show" class="weather-noData">
          没有获取到当地天气数据
        </div>
        <div class="weather-container" v-if="weather.show">
          <div class="weather-container-item date">
            {{ weather.date }}
          </div>
          <div class="weather-container-item temperature">
            {{ weather.temperature }}
          </div>
          <div class="weather-container-item type">
            {{ weather.type }}
          </div>
        </div>
        <div class="weather-container" v-if="weather.show">
          <div class="weather-container-item week">
            {{ weather.week }}
          </div>
          <div class="weather-container-item temperatureRange">
            {{ weather.temperatureRange }}
          </div>
          <div class="weather-container-item windDirection">
            {{ weather.windDirection }}
          </div>
        </div>
      </div>
    </div>
    <div class="data-list">
      <div class="data-list-title">资源总数和可用量</div>
      <div class="data-list-view">
        <echarts-view
          class="data-list-view-resource"
          :option="resourceOption"
        ></echarts-view>
      </div>
    </div>
  </div>
</template>

<script>
import EchartsView from '@/components/EchartsView'
import { getWeather } from '@/api/getWeather'
export default {
  name: 'DataView',
  components: { EchartsView },
  props: {
    weatherCity: {
      type: String
    }
  },
  data() {
    return {
      colorList: [['#3F28D0', '#0282DE'], ['#FC9501', '#FED701'], ['#FE411B', '#FE9B1A'], ['#551AFE', '#7B1BFE']],
      rescueOption: {
        xAxis: {
          data: [],
          axisLine: {
            show: false,
            fontSize: 13,
            lineStyle: { color: '#67E0E3' }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: false,
            lineStyle: { color: '#67E0E3' }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 13,
            formatter: '{value}人'
          }
        },
        grid: {
          left: '20%'
        },
        series: [{
          data: [],
          type: 'bar',
          barWidth: 40,
          label: {
            show: true,
            position: 'top',
            color: '#ffffff',
            fontSize: 13,
            formatter: (serie) => {
              return `${serie.data}人`
            }
          },
          itemStyle: {
            color: (params) => {
              return {
                type: 'linear',
                x: 0.5,
                y: 1,
                x2: 0.5,
                y2: 0,
                colorStops: [{
                  offset: 0, color: this.colorList[params.dataIndex][0]
                }, {
                  offset: 1, color: this.colorList[params.dataIndex][1]
                }]
              }
            }
          },
          animationDuration: 500,
          animationEasing: 'linear',
          animationDelay: (params) => {
            return params * 100
          },
          animationDurationUpdate: 500,
          animationEasingUpdate: 'linear'
        }]
      },
      weather: {
        show: true,
        date: '',
        week: '',
        temperature: '',
        temperatureRange: '',
        type: '',
        windDirection: ''
      },
      resourceOption: {
        xAxis: {
          data: [],
          axisLine: {
            show: false,
            fontSize: 13,
            lineStyle: { color: '#67E0E3' }
          },
          axisLabel: {
            interval: 0
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: false,
            lineStyle: { color: '#67E0E3' }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 13,
            formatter: '{value}'
          }
        },
        grid: {
          left: '20%'
        },
        series: [{
          data: [],
          type: 'bar',
          barWidth: 40,
          label: {
            show: true,
            position: 'top',
            color: '#ffffff',
            fontSize: 13,
            formatter: (serie) => {
              return `${serie.data}`
            }
          },
          itemStyle: {
            color: (params) => {
              return {
                type: 'linear',
                x: 0.5,
                y: 1,
                x2: 0.5,
                y2: 0,
                colorStops: [{
                  offset: 0, color: this.colorList[params.dataIndex][0]
                }, {
                  offset: 1, color: this.colorList[params.dataIndex][1]
                }]
              }
            }
          },
          animationDuration: 500,
          animationEasing: 'linear',
          animationDelay: (params) => {
            return params * 100
          },
          animationDurationUpdate: 500,
          animationEasingUpdate: 'linear'
        }]
      }
    }
  },
  watch: {
    weatherCity() {
      this.setWeather()
    }
  },
  created() {
    this.setRescueOption()
    this.setWeather()
    this.setResourceOption()
  },
  methods: {
    setRescueOption() {
      this.rescueOption.xAxis.data = ['压埋人数', '已救人数', '救援中人数']
      this.rescueOption.series[0].data = [40, 130, 90]
    },
    setWeather() {
      getWeather({ city: this.weatherCity }).then(res => {
        if (res.status === 1000) {
          const date = new Date()
          const weahterNow = res.data.forecast[0]
          this.weather.show = true
          this.weather.date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
          this.weather.week = weahterNow.date.slice(-3)
          this.weather.temperature = res.data.wendu + '℃'
          this.weather.temperatureRange = weahterNow.high.substr(3) + '~' + weahterNow.low.substr(3)
          this.weather.type = weahterNow.type
          this.weather.windDirection = weahterNow.fengxiang
        } else {
          this.weather.show = false
        }
      })
    },
    setResourceOption() {
      this.resourceOption.xAxis.data = ['固定翼无人机', '旋翼无人机', '地面移动车', '救援人员']
      this.resourceOption.series[0].data = [40, 130, 90, 100]
    }
  }
}
</script>
<style scoped lang="scss">
.data {
  width: 450px;
  position: absolute;
  top: 140px;
  right: 10px;
  z-index: 2;
  &-list {
    &-title {
      width: 100%;
      height: 49px;
      margin:0 0 5px 0;
      background: url("../assets/images/echartsTitle.png") no-repeat center;
      background-size: 100% 100%;
      line-height: 49px;
      color: $color;
      text-indent: 25px;
      font-weight: bold;
      font-size: 15px;
      letter-spacing: 2px;
    }
    &-view {
      width: 100%;
      height: 290px;
      margin: 0 0 20px 0;
      background: url("../assets/images/echartsView.png") no-repeat center;
      background-size: 100% 100%;
      &-rescue,&-resource{
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
    &-weather {
      width: 100%;
      height: 150px;
      margin:0 0 10px 0;
      background: url("../assets/images/weather.png") no-repeat center;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .weather-noData {
        color: $color;
      }
      .weather-container {
        width: 150px;
        color: $color;
        &-item {
          width: 100%;
          height: 35px;
          line-height: 35px;
        }
      }
    }
  }
}
</style>
