module.exports = {
  plugins: {
    'autoprefixer': {
      // 选择兼容浏览器
      browsers: ['last 5 version', 'Android >= 4.0'],
      // 是否美化属性值 默认：true
      cascade: true,
      // 是否去掉不必要的前缀 默认：true
      remove: true
    }
  }
}
