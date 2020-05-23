import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // JSON.parse(sessionStorage.getItem('status'))
    // JSON.parse(sessionStorage.getItem('status'))
    status: JSON.parse(sessionStorage.getItem('status')) || false,
    // ,
    // JSON.parse(Cookie.get('user_id')) 
    user_id: sessionStorage.getItem('user_id') || -1,
    // user_url: JSON.parse( sessionStorage.getItem('user_url')) || []

  },
  getters: {

  },
  mutations: {
  // 改变state里面status的值
  SET_Status(state){
    state.status = !state.status
    sessionStorage.setItem('status', JSON.stringify(state.status))
  },
  // 记录用户登录状态
  SET_User(state,user_id){
    state.user_id = user_id
    console.log(JSON.stringify(state.user_id))
    // Cookie.set('user_id',JSON.stringify(state.user_id))
    sessionStorage.setItem('user_id',state.user_id)
    console.log( JSON.parse(Cookie.get('user_id')))
  },
  // 记录用户图片
  // SET_UserPic(state,user_url){
  //   console.log(user_url)
  //   state.user_url = user_url
  //   sessionStorage.setItem('user_url',JSON.stringify(state.user_url))
  // }
  },
  actions: {},
});
