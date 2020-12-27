<template>
  <div class="container">
    <resource-list
      :resourceList="resourceList"
      @resourceListTitle="resourceListTitle"
      @resourceListContext="resourceListContext"
    ></resource-list>
    <div class="container-dataList">
      <div class="container-dataList-box">
        <div
          class="container-dataList-box-list"
          v-for="item in resourceList"
          :key="item.name"
        >
          <div class="container-dataList-box-list-title" v-if="item.data.length">
            <span
              v-for="(value,key) in (item.data[0] ? filterKey(item.data[0].value[2]) : [])"
              :key="key"
              >{{ key }}</span
            >
            <span>操作</span>
          </div>
          <div class="container-dataList-box-list-data">
            <div
              class="container-dataList-box-list-data-item"
              v-for="(dataItem, dataItemIndex) in item.data"
              :key="dataItemIndex"
            >
              <span
                v-for="(value, key) in filterKey(dataItem.value[2])"
                :key="key"
                >{{ value }}</span
              >
              <span class="operation-btn" @click="setMapBoxList(dataItem)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceList from '@/components/ResourceList'
export default {
  name: 'EquipmentMonitoring',
  components: { ResourceList },
  props: {
    resourceList: {
      type: Array
    },
    mapBoxList: {
      type: Array
    },
    show: {
      type: Boolean
    }
  },
  methods: {
    resourceListTitle(index) {
      this.$emit('resourceListTitle', index)
    },
    resourceListContext(subIndex) {
      this.$emit('resourceListContext', subIndex)
    },
    filterKey(obj) {
      const tempObj = {}
      Object.keys(obj).forEach(item => {
        if (item !== 'name' && item !== 'type' && item !== 'active' && item !== 'videoSrc') tempObj[item] = obj[item]
      })
      return tempObj
    }
  }
}
</script>
<style scoped lang='scss'>
@mixin span() {
  display: block;
  height: 100%;
  line-height: 50px;
  text-align: center;
  flex: 1;
  color: rgba(48, 255, 255, 1);
  font-size: 15px;
}
.container {
  max-width: 1575px;
  display: flex;
  align-items: center;
  padding: 70px 0;
  &-dataList {
    width: 1200px;
    height: 600px;
    margin-left: 15px;
    background: url("../assets/images/dataList.png") no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    &-box::-webkit-scrollbar-thumb {
      background: #30ffff;
      border-radius: 5px;
    }
    &-box {
      width: 100%;
      padding: 0 40px;
      overflow-x: hidden;
      max-height: 500px;
      &-list {
        width: 100%;
        margin-bottom: 30px;
        &-title {
          width: 100%;
          height: 50px;
          display: flex;
          border-bottom: 1px solid rgba(48, 255, 255, 1);
          span {
            @include span();
            font-weight: bold;
          }
        }
        &-data {
          width: 100%;
          &-item {
            width: 100%;
            height: 50px;
            display: flex;
            border-bottom: 1px solid rgba(48, 255, 255, 0.1);
            span {
              @include span();
            }
            .operation-btn {
              background: url("../assets/images/operation-btn.png") no-repeat
                center;
              background-size: 20px 20px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
