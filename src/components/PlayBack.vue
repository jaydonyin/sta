<template>
  <div class="container">
    <resource-list
      :resourceList="resourceList"
      @resourceListTitle="resourceListTitle"
      @resourceListContext="resourceListContext"
    ></resource-list>
    <div class="container-video">
      <video-player :videoSrc="videoSrc"></video-player>
    </div>
  </div>
</template>

<script>
import ResourceList from '@/components/ResourceList'
import VideoPlayer from '@/components/VideoPlayer'
export default {
  name: 'PlayBack',
  components: { ResourceList, VideoPlayer },
  props: {
    resourceList: {
      type: Array
    },
    videoSrc: {
      type: String
    }
  },
  methods: {
    resourceListContext(subIndex) {
      this.$emit('resourceListContext', subIndex)
    },
    resourceListTitle(index) {
      this.$emit('resourceListTitle', index)
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .video-player{
  width:100%;
}
.container {
  max-width: 1245px;
  padding: 50px 0;
  display: flex;
  align-items: center;
  &-video {
    width: 880px;
    height: 600px;
    margin-top:20px;
    margin-left:15px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
}
</style>
