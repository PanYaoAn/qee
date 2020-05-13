import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Button from 'vant/lib/button';
import 'vant/lib/button/style';
import axios from 'axios';
// 导入cookie

// Vue.prototype.$axios = axios;
Vue.prototype.$http=axios
// 引入jsonp 解决跨域问题
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp);
Vue.prototype.HOST = '/api'
// 引入vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource)
// 引入 Tabbar标签栏
import {Tabbar,TabbarItem} from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
// 引入图片模式
import {Image as VanImage} from 'vant';
Vue.use(VanImage);
// 搜索框引入
import {Search} from 'vant';
Vue.use(Search);
// 引入icon图标
import {Icon} from 'vant';
Vue.use(Icon);
// 引入弹出层
import { Popup } from 'vant';
Vue.use(Popup);
// 引入cell单元格
import {Cell,CellGroup} from 'vant'
Vue.use(Cell)
Vue.use(CellGroup)
// 引入表单的输入框组件
import {Field} from 'vant';
Vue.use(Field)
import { Form } from 'vant';
Vue.use(Form)
Vue.use(Button)
// 引入单选款
import {RadioGroup,Radio} from 'vant'
Vue.use(Radio);
Vue.use(RadioGroup);
// 引入复选框
import { Checkbox, CheckboxGroup } from 'vant';
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
// 引入提示框
import { Toast } from 'vant';
Vue.use(Toast);
Vue.config.productionTip = false;
// Notify消息提示
import {Notify} from 'vant'
Vue.use(Notify)
router.beforeEach((to,from,next) =>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
