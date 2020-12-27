<template>
  <div class="container">
    <header>
      <span class="icon"></span>
      <span class="title">方案</span>
    </header>
    <section class="content-wrapper">
      <div class="item-box">
        <div v-for="(item, index) in list" :key="index" class="item" :class="{'is-active': item.active}" @click="changePlan(index)">
          {{item.name}}
        </div>
      </div>
    </section>
    <footer class="footer-btn-box">
      <div class="btn" @click="next">
        执行
      </div>
      <div class="btn">
        预判
      </div>
      <div class="btn">
        保存
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'stepTwo',
  components: {},
  props: {},
  data() {
    return {
      list: [
        {
          name: '推荐方案',
          active: true
        },
        {
          name: '编制方案',
          active: false
        },
        {
          name: '决策方法1',
          active: false
        },
        {
          name: '决策方法2',
          active: false
        }
      ],
      active: ''
    }
  },
  watch: {},
  mounted() {
    this.active = this.list[0]
  },
  methods: {
    changePlan(index) {
      this.list.map(item => {
        item.active = false
      })
      this.list[index].active = true
      this.active = this.list[index]
    },
    showModalBox(component) {
      this.$emit('showModalBox', component)
    },
    showPlanModalBox(component, plan) {
      console.log(plan)
      this.$emit('showPlanModalBox', component, plan)
    },
    next() {
      this.$emit('closeModalBox')
      this.showPlanModalBox('plan', this.active)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  padding: 50px;
  header {
    display: flex;
    align-items: center;
    .icon {
      display: inline-block;
      width: 20px;
      height: 24px;
      background: url("~@/assets/images/fa-title.png") no-repeat;
      background-size: 100% 100%;
    }
    .title {
      margin-left: 15px;
      font-size: 22px;
      color: #0efcff;
    }
  }
  .content-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .item-box {
      width: 450px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 200px;
        height: 150px;
        background: url("~@/assets/images/fangan-back.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        color: #0efcff;
        margin-bottom: 20px;
        cursor: pointer;
      }
      .is-active {
        background: url("~@/assets/images/fangan-back-active.png") no-repeat;
        background-size: 100% 100%;
        color: #F2B14A;
      }
    }
  }
  .footer-btn-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 50px;
      font-size: 22px;
      font-weight: 600;
      color: #0efcff;
      padding: 5px 0;
      background-image: radial-gradient(farthest-corner at 50% 50%, transparent 50%, rgba(14,252,255, 0.5));
      cursor: pointer;
      &:first-child {
        background-image: radial-gradient(farthest-corner at 50% 50%, transparent 50%, rgba(250,219,20, 0.5));
        color: #F2B14A;
      }
    }
  }
}
</style>
