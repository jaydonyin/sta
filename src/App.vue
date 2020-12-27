<template>
  <div id="app">
    <home></home>
  </div>
</template>
<script>
import Home from '@/views/Home'
export default {
  name: 'App',
  components: { Home }
}
</script>
<style lang="scss">
html,
body {
  font-size: 16px;
  overflow-x: hidden;
  font-family: Helvetica Neue, Helvetica, Arial, Hiragino Sans GB,
    Hiragino Sans GB W3, WenQuanYi Micro Hei, sans-serif;
  color: #000000;
  user-select: none;
  -webkit-user-select: none;
}
body::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(84, 92, 100, 0.2);
  background-clip: padding-box;
}

body,
h2,
h3 {
  padding: 0;
  margin: 0;
}
img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
