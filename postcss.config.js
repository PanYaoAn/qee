

const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
  module.exports = ({ file }) => {
    // let remUnit; // 判断条件 请自行调整 我使用的是 mand-mobile ui 没有对vant引入进行测试 
    // if (file && file.dirname && file.dirname.indexOf("vant") > -1) { remUnit = 37.5; } else { remUnit = 75; }
    // return {
    //   plugins: [
    //     px2rem({ remUnit: remUnit, }),
    //     AutoPrefixer({ overrideBrowserslist: ["last 20 versions", "android >= 4.0"] })]
    // };
    let rootValue
    // vant 37.5 [link](https://github.com/youzan/vant/issues/1181)
    if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
      rootValue = 37.5
    } else {
      rootValue = 75
    }
    return {
      plugins: [
        autoprefixer(),
        pxtorem({
          rootValue: rootValue,
          propList: ['*'],
          minPixelValue: 2
        })
      ]
    }
  
    
  }
