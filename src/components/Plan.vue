<template>
  <div class="container">
    <header>
      {{ plan.name }}
    </header>
    <div class="content">
      方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一方案一
    </div>
  </div>
</template>

<script>
export default {
  name: 'Plan',
  components: {},
  props: {
    plan: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  watch: {},
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .container {
    width: 770px;
    height: 357px;
    padding: 50px;
    position: relative;
    header {
      width: 100%;
      position: absolute;
      top: 10px;
      left: 0;
      text-align: center;
      font-size: 28px;
      color: #0efcff;
    }
    .content {
      padding-top: 50px;
      font-size: 24px;
      color: #0efcff;
    }
  }
</style>
