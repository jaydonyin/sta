<template>
  <div class="planModalBox" v-if="show">
    <div class="planModalBox-container">
      <div class="planModalBox-container-close" @click="closeModalBox">
        <span>x</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlanModalBox',
  props: {
    show: {
      type: Boolean
    }
  },
  methods: {
    closeModalBox() {
      this.$emit('update:show', false)
    }
  }
}
</script>
<style scoped lang="scss">
.planModalBox {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  box-sizing: border-box;
  transition: opacity 0.5s ease;
  background: rgba(3, 22, 38, 0.7);
  opacity: 0;
  &-container {
    position: relative;
    background: url("~@/assets/images/faChoose.png") no-repeat;
    background-size: 100% 100%;
    transition: all 0.5s ease;
    &-close {
      width: 25px;
      height: 25px;
      line-height: 25px;
      position: absolute;
      top: 50px;
      right: 20px;
      z-index: 888;
      background: rgba(14, 252, 255, 0.3);
      color: #35b9c2;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
