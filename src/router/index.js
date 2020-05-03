import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
//引入tabbar组件
import Tabbar from "../components/Tabbar"
// 引入index组件
import index from "../components/index/index"
import fenlei from "../components/index/fenlei"
import like from "../components/index/like"
import mine from "../components/index/mine"

// 引入登录组件
import  login from "../components/login/login"
Vue.use(VueRouter);
/**
 *  解决跳转相同路由报错 重写路由的push方法--->这个是vue-cli4.x以上的坑，不然的话，你是跳转不了的
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
// 用于记录路由的前进后退状态 this.isBack = true
// VueRouter.prototype.goBack = function(){
//   this.isBack = true
//   window.history.go(-1)
// }
const routes = [
  {
    path:"/",
    redirect:'/Tabbar/index',
    meta:{
      title:'首页'
    }

  },
  {
    path: "/Tabbar",
  
    component: Tabbar,
    children:[
      {
        path:'index',component:index, 
        meta:{title:'首页'}
      },
      {
        path:'fenlei',component:fenlei,
      
      },
      {path:'like',component:like},
      {path:'mine',component:mine}

    ]
  },
  // 登录组件
  {
    path:'/login',
    component:login
  },
  {
    path:'/index',component:index,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
