<template>
  <div class="login">
    <h4>欢迎来到企鹅视频^v^ 请先登录哦~</h4>
    <!-- <van-form @submit="onSubmit"> -->
    <van-field v-model="login.username" name="用户名" label="用户名" placeholder="用户名" />
    <van-field v-model="login.password" type="password" name="密码" label="密码" placeholder="密码" />
    <van-field name="radio" label="单选框">
      <template #input>
        <van-checkbox v-model="checked">协议书</van-checkbox>
      </template>
    </van-field>
    <div class="button">
      <van-button
        round
        block
        type="info"
        native-type="submit"
        @click="onSubmit(login.username,login.password,checked)"
      >登录</van-button>
      <van-button round block type="info" native-type="submit" @click="registered()">注册</van-button>
    </div>
    <!-- </van-form> -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "login_in",
  data() {
    return {
      checked: true,
      active: false,
      //   用户登录填写的用户名密码
      login: {
        username: "",
        password: ""
      },
      // 用户信息
      user: {
        username: "",
        phone: "",
        userid: ""
      }
    };
  },
  methods: {
    registered() {
      console.log(this.active);

      this.$emit("passparents", this.active);
    },
    // 用户点击登录
    onSubmit(name, password, checked) {
      this.login.username = name;
      this.login.password = password;
      //   console.log(this.user.username);
      //   console.log(this.user.password);

      //   console.log(checked);
      if (this.login.username == "" || this.login.password == "") {
        this.$toast.allowMultiple();
        this.$toast("你还没输入账号或者密码呢");
      } else if (checked == false) {
        this.$toast.allowMultiple();
        this.$toast("先要同意协议才能登陆嗷");
      } else {
        // 用户登录请求数据库是否有这个用户信息

        // d调用axios
        let that = this;
        this.$options.methods.getuser(this.login, function(data) {
          // 接收到结果后先做处理在执行下面代码
          if (data === undefined) {
            that.$toast.allowMultiple();
            that.$toast("用户名或密码错误");
          } else {
            let user = {
              username: data.name,
              userid: data.id,
              phone: data.phone
            };
            that.$emit("passparents", user);
            that.$toast.allowMultiple();
            that.$toast({
              message: "登录成功",
              icon: "success",
              className: "success"
            });
            console.log(user.userid)
            // that.$store.state.count = 1
            // 调用Vuex里面mutations里面的方法
            that.$store.commit("SET_Status");
            that.$store.commit("SET_User",user.userid)
          }
        });
        // 获取cookie?

        // console.log(data)
      }
    },
    // axios请求获取用户登录信息
    getuser(user, callback) {
      axios
        .post("http://192.168.1.167:8081/login/login_in", user)
        .then(function(res) {
          //   console.log(res.data[0]);

          if (res) {
           
            console.log(user);
            //   使用回调函数把结果返回出去
            callback(res.data[0]);
          }

          // return res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
   
  },
  mounted() {
    console.log(this.user);
  }
};
</script>
<style scoped>
@import "~@/assets/CSS/login_in.css";
</style>