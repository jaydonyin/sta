<template>
  <div class="home">
    <div class="home-container">
      <header>地空协作灾害监测搜救指挥系统</header>
      <div
        class="small-video"
        :style="{ width: videoWidth }"
        @dblclick="scaleVideo"
      >
      <!-- <video :src="videoMp4" autoplay width="100%" height="100%"></video> -->
        <video-player
          ref="videoPlayer"
          :status.sync="videoStatus"
          :videoSrc="videoMp4"
        ></video-player>
      </div>
      <button-list @showModalBox="showModalBox"></button-list>
      <data-view :weatherCity="weatherCity"></data-view>
      <map-view
        :weatherCity.sync="weatherCity"
        :mapBoxList.sync="mapBoxList"
        :resourceList="resourceList"
        @showModalBox="showModalBox"
        @videoSrc="updateVideo"
      ></map-view>
      <modal-box ref="modalBox" :show.sync="modalBoxOptions.show">
        <component
          :is="modalBoxOptions.component"
          :resourceList="resourceList"
          :videoSrc="videoSrc"
          @resourceListTitle="resourceListTitle"
          @resourceListContext="resourceListContext"
          @showModalBox="showModalBox"
          @showPlanModalBox="showPlanModalBox"
          @closeModalBox="closeModalBox"
        ></component>
      </modal-box>
      <plan-modal-box ref="planModalBox" :show.sync="planModalBoxOptions.show">
        <component :is="planModalBoxOptions.component" :plan="plan"></component>
      </plan-modal-box>
    </div>
  </div>
</template>

<script>
import ButtonList from '@/components/ButtonList'
import DataView from '@/components/DataView'
import MapView from '@/components/MapView'
import ModalBox from '@/components/ModalBox'
import PlanModalBox from '@/components/PlanModalBox'
import EquipmentMonitoring from '@/components/EquipmentMonitoring'
import EquipmentOperation from '@/components/EquipmentOperation'
import stepTwo from '@/components/stepTwo'
import Plan from '@/components/Plan'
import PlayBack from '@/components/PlayBack'
import DisasterDetails from '@/components/DisasterDetails'
import VideoPlayer from '@/components/VideoPlayer'
import resource from '@/utils/resourceList'
import StatisticAnalyse from '@/components/StatisticAnalyse'
import ThreeDimensionalModel from '@/components/ThreeDimensionalModel'
export default {
  name: 'Home',
  components: { ThreeDimensionalModel, ButtonList, DataView, MapView, ModalBox, EquipmentMonitoring, PlayBack, VideoPlayer, DisasterDetails, EquipmentOperation, stepTwo, Plan, PlanModalBox, StatisticAnalyse },
  data() {
    return {
      videoWidth: '450px',
      modalBoxOptions: {
        show: false,
        component: ''
      },
      planModalBoxOptions: {
        show: false,
        component: ''
      },
      weatherCity: '成都市',
      mapBoxList: [],
      videoMp4: '',
      videoSrc: 'rtmp://',
      tempIndex: '',
      resourceListMenu: {
        index: '',
        subIndex: ''
      },
      resourceList: [
        { name: '被困人员', type: 0, img: 'one.png', active: false, data: [] },
        { name: '无人机', type: 1, img: 'two.png', active: false, data: [] },
        { name: '救援车辆', type: 2, img: 'three.png', active: false, data: [] },
        { name: '救援人员', type: 3, img: 'four.png', active: false, data: [] }
      ],
      plan: {},
      videoStatus: false
    }
  },
  created() {
    this.getResourceList()
    this.resourceListTitle(0)
  },
  methods: {
    test() {
      if (this.videoStatus) {
        this.$refs.videoPlayer.$children[0].player.pause()
      } else {
        this.$refs.videoPlayer.$children[0].player.play()
      }
    },
    scaleVideo() {
      this.videoWidth === '450px' ? this.videoWidth = '900px' : this.videoWidth = '450px'
    },
    closeModalBox() {
      this.modalBoxOptions.show = false
    },
    showModalBox(component) {
      console.log(component)
      if (!component) {
        return false
      }
      this.modalBoxOptions.show = true
      this.modalBoxOptions.component = component

      this.$nextTick(() => {
        const modalBox = this.$refs.modalBox.$el
        const modalBoxContainer = modalBox.getElementsByClassName('modalBox-container')[0]
        const component = this.$refs.modalBox.$children[0].$el

        modalBoxContainer.style.width = component.offsetWidth + 'px'
        modalBoxContainer.style.height = component.offsetHeight + 'px'
        modalBoxContainer.style.top = -modalBoxContainer.offsetHeight + 'px'
        modalBoxContainer.style.left = Math.abs((modalBox.offsetWidth - modalBoxContainer.offsetWidth) / 2) + 'px'

        setTimeout(() => {
          modalBox.style.opacity = 1
          modalBoxContainer.style.top = Math.abs((modalBox.offsetHeight - modalBoxContainer.offsetHeight) / 2) + 'px'
        }, 100)
      })
    },
    showPlanModalBox(component, plan) {
      this.planModalBoxOptions.show = true
      this.planModalBoxOptions.component = component
      this.plan = plan
      console.log(this.plan)

      this.$nextTick(() => {
        const modalBox = this.$refs.planModalBox.$el
        const modalBoxContainer = modalBox.getElementsByClassName('planModalBox-container')[0]
        const component = this.$refs.planModalBox.$children[0].$el

        modalBoxContainer.style.width = component.offsetWidth + 'px'
        modalBoxContainer.style.height = component.offsetHeight + 'px'
        modalBoxContainer.style.top = -modalBoxContainer.offsetHeight + 'px'
        modalBoxContainer.style.left = Math.abs((modalBox.offsetWidth - modalBoxContainer.offsetWidth) / 2) + 'px'

        setTimeout(() => {
          modalBox.style.opacity = 1
          modalBoxContainer.style.top = Math.abs((modalBox.offsetHeight - modalBoxContainer.offsetHeight) / 2) + 'px'
        }, 100)
      })
    },
    resourceListTitle(index) {
      this.resourceList.forEach((item, itemIndex) => {
        item.active = false
        if (itemIndex === index) {
          this.tempIndex = this.resourceListMenu.index
          this.resourceListMenu.index = itemIndex
          item.active = true
          if (this.resourceListMenu.subIndex === '') this.resourceListContext(0)
        }
      })
    },
    resourceListContext(subIndex) {
      this.resourceList[this.resourceListMenu.index].data.forEach((item, itemIndex) => {
        item.value[2].active = false
        if (itemIndex === subIndex) {
          const tempSubIndex = this.resourceListMenu.subIndex
          this.resourceListMenu.subIndex = itemIndex
          item.value[2].active = true
          if (this.tempIndex !== this.resourceListMenu.index && this.tempIndex !== '') {
            this.resourceList[this.tempIndex].data[tempSubIndex].value[2].active = false
            this.tempIndex = this.resourceListMenu.index
          }
        }
      })
      this.videoSrc = this.resourceList[this.resourceListMenu.index].data[this.resourceListMenu.subIndex].value[2].videoSrc || 'rtmp://'
      this.videoMp4 = require('@/assets/video/' + this.resourceList[this.resourceListMenu.index].data[this.resourceListMenu.subIndex].value[2].mp4Src) || '/'
    },
    updateVideo(src) {
      console.log(src)
      this.videoSrc = src
    },
    getResourceList() {
      this.resourceList.forEach((item) => {
        resource.forEach(subItem => {
          if (item.type === subItem.value[2].type) {
            item.data.push(subItem)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  height: 100vh;
  &-container {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    background: #000928;
    background-size: 100% 100%;
    position: relative;
    header {
      width: 1880px;
      height: 84px;
      background: url("../assets/images/header.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
      margin: 0 auto;
      z-index: 2;
      font-weight: normal;
      line-height: 84px;
      text-align: center;
      font-size: 23px;
      color: $color;
    }
    .small-video {
      position: absolute;
      top: 140px;
      left: 10px;
      z-index: 2;
      border: 1px solid #ccc;
      background: red;
      transition: all 0.3s;
      ::v-deep {
        .vjs-text-track-display {
          pointer-events: auto;
        }
      }
    }
  }
}
</style>
