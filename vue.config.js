module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/GitTest/dist/'
      : '/',
    //   https://panyaoan.github.io/GitTest/dist/css/app.5706e3f7.css
    // https://panyaoan.github.io/dist/js/app.e458b0e2.js

    // 解决跨域问题
    
    devServer: {
      disableHostCheck: true
    }


}