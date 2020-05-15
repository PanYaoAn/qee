<template>
  <div>
    <div class="content">
      <div class="close" @click="back">
        <van-icon name="cross" />
      </div>
      <div class="pop_cont_t">
        <main class="cont_t">
          <div class="log_cont">
            <!-- 登录后 -->
            <div class="user_mess" v-if="this.$store.state.user_id == 1">
              <!-- 文件上传 -->
              <van-uploader class="user_pic"  v-model="user.url" multiple="" 
              :deletable=false
              :max-count="1"
              :after-read="afterRead"
              >
                <!-- <van-image class="user_pic" width="50" height="50" src round /> -->
              </van-uploader>

              <div class="user_naem" @click="dian">
                <span>{{user.username}}</span>
                <!-- <span>{{user.phone}}</span> -->
              </div>
            </div>

            <!-- 未登录 -->
            <div class="log" v-if="this.$store.state.user_id == -1">
              <h4>欢迎来来到企鹅视频</h4>

              <van-cell class="but" @click="showPopup">
                <van-button type="primary" size="small">
                  <span>登录/注册</span>
                </van-button>
              </van-cell>
            </div>
          </div>
          <div>
            <span>会员中心</span>
            <span>日期</span>
          </div>
        </main>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" round>
      <!-- 登录页面子组件 -->
      <login_in class="login active" :class="[active ? 'active' : 'hide']" @passparents="parent"></login_in>
      <!-- 注册子组件 -->
      <res @childern="parent1" class="res active" :class="[active ? 'hide' : 'active']"></res>
    </van-popup>
  </div>
</template>
<script>
//引用axios
// import axios from "axios";
// 引用子组件
import login_in from "./login_in";
import res from "./res";
import Axios from "axios";
export default {
  data() {
    return {
      checked: true,
      show: this.$store.state.user_id == -1,
      // 显示登录注册的添加
      active: true,
      // 用户信息
      user: {
        username: "",
        phone: "",
        userid: "",
        url:'',
      },
      // 用户注册信息
      res: {
        username: "",
        password: "",
        phone: "",
        
      },

    };
  },
  // 注册子组件
  components: {
    login_in,
    res
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    showPopup() {
      console.log(11111);
      this.show = true;
    },
    // d第一个组件传回来的值
    parent(data) {
      if (typeof data == "object") {
        this.user = data;
        this.show = false;
        console.log(this.user);
      } else if (typeof data == "boolean") {
        this.active = data;
      }
    },
    // 第二个组件传回来的值
    parent1(data) {
      this.active = data;
      console.log("第二个" + this.active);
    },
    // 为了记录用户登录状态将请求的数据用cookie存储
    getUser_id(user_id) {
      console.log(user_id);
      if (user_id == -1) {
        console.log("用户未登录");
        return;
      } else {
        Axios.get("http://192.168.1.167:8081/login", {
          params: {
            id: user_id
          }
        })
          .then(res => {
            let user = {
              username: res.data[0].name,
              phone: res.data[0].phone,
              userid: res.data[0].id
            };
            this.user = user;
            console.log(res.data[0].id);

            console.log(this.user);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 上传用户文件方法
    afterRead(file){
      console.log(file.content)
    },
    dian(){
      // console.log(this.user.)
    }
  },
  mounted() {
    console.log(this.$store.state.status);
    // console.log(this.$store.state.user_id)
    this.getUser_id(this.$store.state.user_id);
  }
};
</script>
<style scoped>
@import "~@/assets/CSS/login.css";
</style>