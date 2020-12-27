<template>
  <div class="resource">
    <h2>资源列表</h2>
    <div class="resource-topImg"></div>
    <div class="resource-list">
      <div
        class="resource-list-item"
        v-for="(item, index) in resourceList"
        :key="index"
      >
        <h3
          :class="[{ titleActive: item.active }]"
          @click="resourceListTitle(index)"
        >
          {{ item.name }}
        </h3>
        <div
          class="resource-list-item-box"
          :style="[{ height: item.active ? item.data.length * 50 + 'px' : 0 }]"
        >
          <div
            :class="[
              'resource-list-item-box-context',
              { topBorder: subIndex === 0 },
              { bottomBorder: subIndex === item.data.length - 1 },
              {active:subItem.value[2].active}
            ]"
            v-for="(subItem, subIndex) in item.data"
            :key="subIndex"
            @click="resourceListContext(subIndex)"
          >
            {{ subItem.value[2].name }}
          </div>
        </div>
      </div>
    </div>
    <div class="resource-bottomImg"></div>
  </div>
</template>

<script>
export default {
  name: 'ResourceList',
  props: {
    resourceList: {
      type: Array
    }
  },
  methods: {
    resourceListTitle(index) {
      this.$emit('resourceListTitle', index)
    },
    resourceListContext(subIndex) {
      this.$emit('resourceListContext', subIndex)
    }
  }
}
</script>
<style scoped lang="scss">
.resource {
  width: 335px;
  max-height: 591px;
  overflow: hidden;
  position: relative;
  h2 {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: $color;
    text-align: center;
    font-size: 28px;
    font-weight: normal;
  }
  &-topImg {
    width: 100%;
    height: 21px;
    background: url("../assets/images/resourceListTop.png") no-repeat center;
    background-size: 100% 100%;
  }
  &-list::-webkit-scrollbar-thumb {
    background: #32c3ff;
    border-radius: 5px;
  }
  &-list {
    max-height: 500px;
    overflow-y: scroll;
    h3 {
      width: 100%;
      height: 88px;
      line-height: 88px;
      background: url("../assets/images/resourceListTitle.png") no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      color: #fff;
      font-size: 21px;
      font-weight: normal;
      cursor: pointer;
    }
    .titleActive {
      background: url("../assets/images/resourceListTitleActive.png") no-repeat
        center;
      background-size: 100% 100%;
    }
    &-item {
      &-box {
        width: 93%;
        margin: 0 auto;
        transition: all 0.5s ease;
        display: flex;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
        cursor: pointer;
        &-context {
          width: 100%;
          height: 50px;
          line-height: 50px;
          color: #fff;
          text-align: center;
          background: rgba(23, 102, 185, 0);
          border-left: 2px solid #5a70a6;
          border-right: 2px solid #5a70a6;
          box-sizing: border-box;
        }
        .active{
          background: #5a70a6;
        }
        .topBorder {
          border-top: 2px solid #5a70a6;
        }
        .bottomBorder {
          border-bottom: 2px solid #5a70a6;
        }
      }
    }
  }
  &-bottomImg {
    width: 100%;
    height: 21px;
    background: url("../assets/images/resourceListBottom.png") no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
