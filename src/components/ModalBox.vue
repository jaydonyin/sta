<template>
  <div class="modalBox" v-if="show">
    <div class="modalBox-container">
      <div>
        <div class="modalBox-container-border top-left"></div>
        <div class="modalBox-container-border top-right"></div>
        <div class="modalBox-container-border bottom-left"></div>
        <div class="modalBox-container-border bottom-right"></div>
      </div>
      <div class="modalBox-container-close" @click="closeModalBox">
        <span>x</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalBox',
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
.modalBox {
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
    background: rgba(11, 21, 44, 0.7);
    transition: all 0.5s ease;
    &-border {
      width: 10px;
      height: 10px;
      position: absolute;
    }
    .top-left {
      top: 0px;
      left: 0px;
      border-top: 2px solid $modalBoxBorderColor;
      border-left: 2px solid $modalBoxBorderColor;
    }
    .top-right {
      top: 0px;
      right: 0px;
      border-top: 2px solid $modalBoxBorderColor;
      border-right: 2px solid $modalBoxBorderColor;
    }
    .bottom-left {
      bottom: 0px;
      left: 0px;
      border-bottom: 2px solid $modalBoxBorderColor;
      border-left: 2px solid $modalBoxBorderColor;
    }
    .bottom-right {
      bottom: 0px;
      right: 0px;
      border-bottom: 2px solid $modalBoxBorderColor;
      border-right: 2px solid $modalBoxBorderColor;
    }
    &-close {
      width: 25px;
      height: 25px;
      line-height: 25px;
      position: absolute;
      top: 20px;
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
