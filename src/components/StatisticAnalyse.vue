<template>
  <div class="container">
    <h3 class="container-title">实时情况统计分析</h3>
    <div class="container-left">
      <echarts-view class="container-echarts" :option="optionLeft"></echarts-view>
    </div>
    <div class="container-right">
      <echarts-view class="container-echarts" :option="optionRight"></echarts-view>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import EchartsView from '@/components/EchartsView'
export default {
  name: 'StatisticAnalyse',
  components: { EchartsView },
  data() {
    return {
      colorList: [['#3F28D0', '#0282DE'], ['#FC9501', '#FED701'], ['#FE411B', '#FE9B1A'], ['#551AFE', '#7B1BFE']],
      optionLeft: {
        title: {
          text: '人员被困时长',
          textStyle: {
            color: '#04F0FF',
            fontSize: 18
          },
          left: 'center'
        },
        xAxis: {
          name: '小时',
          axisTick: {
            show: false
          },
          type: 'category',
          axisLine: {
            show: true,
            fontSize: 13,
            lineStyle: { color: '#67E0E3' }
          },
          axisLabel: {
            color: '#04F0FF'
          },
          boundaryGap: false,
          data: ['', 10, 20, 30, 40]
        },
        yAxis: {
          name: '万人',
          axisLine: {
            show: true,
            lineStyle: { color: '#67E0E3' }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: { color: '#2A3968' }
          },
          axisLabel: {
            fontSize: 13
          }
        },
        series: [
          {
            type: 'line',
            smooth: true,
            showAllSymbol: false,
            symbol: 'circle',
            symbolSize: 2,
            itemStyle: {
              color: '#00b3f4'
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,179,244,0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,179,244,0)'
                }
                ], false),
                shadowColor: 'rgba(0,179,244, 0.9)',
                shadowBlur: 20
              }
            },
            data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02]
          }
        ]
      },
      optionRight: {
        title: {
          text: '每日搜救人数统计',
          textStyle: {
            color: '#04F0FF',
            fontSize: 18
          },
          left: 'center'
        },
        xAxis: {
          data: ['固定翼无人机', '旋翼无人机', '地面移动车', '救援人员'],
          axisLine: {
            show: true,
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
          splitLine: {
            show: true,
            lineStyle: { color: '#2A3968' }
          },
          axisLine: {
            show: true,
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
          data: [40, 130, 90, 30],
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
  }
}
</script>
<style scoped lang="scss">
.container {
  max-width: 1000px;
  padding: 50px 30px;
  box-sizing: border-box;
  flex-wrap: wrap;
  display: flex;
  &-title {
    width: 100%;
    color: $color;
    height: 40px;
    text-indent: 70px;
    line-height: 40px;
    font-weight: normal;
    font-size: 22px;
    background: url("../assets/images/statisticAnalyseTitle.png") no-repeat 0
      center;
    background-size: 53px 39px;
    margin-bottom: 40px;
  }
  &-left {
    width: 50%;
    height: 400px;
  }
  &-right {
    width: 50%;
    height: 400px;
  }
  &-echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
