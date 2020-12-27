module.exports = {
  devServer: {
    port: '9999',
    host: '0.0.0.0',
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/_variable.scss";'
      }
    }
  }
}
