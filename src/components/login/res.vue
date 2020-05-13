<template>
  <div class="res">
    <h4>欢迎来到企鹅视频^v^ 欢迎注册~</h4>
    <div class="registered">
      <van-field
        v-model="res.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="res.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="res.phone"
        type="phone"
        name="手机"
        label="手机"
        placeholder="手机"
        :rules="[{ required: true, message: '请填写手机' }]"
      />
      <!-- <label for="email">邮箱:</label><input id="email" name="email" type="email" />  -->
      <div style="margin: 16px;">
        <van-button round block type="info" @click="submit" native-type="submit">提交</van-button>
      </div>
    </div>
    <div class="return">
      <span>已经有账号?</span>
      <span @click="registered()" style="color:#409EFF">返回登录</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      active: "",
      // 用户注册信息
      res: {
        username: "",
        password: "",
        phone: ""
      }
    };
  },
  methods: {
    registered() {
      console.log(1111);
      if (!this.active) {
        this.active = true;
      }

      this.$emit("childern", this.active);
    },
    submit() {
      // if (!/^(\w){4,20}$/.test(this.res.username)) {
      //     this.$toast.allowMultiple();
      //     this.$toast("用户名不正确");
      // } else if (!/^(\w){4,20}$/.test(this.res.password)) {
      //     this.$toast.allowMultiple();
      //     this.$toast("密码不符合规则");
      // } else if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.res.phone)) {
      //     this.$toast.allowMultiple();
      //     this.$toast("手机号码不正确");
      // }
      // else {
      //   }
      // let that = this;
      // 查询用户名是否被注册
      // console.log(name);

      let name = this.res.username;
      axios
        .get("http://192.168.1.167:8081/login/res", {
          params: {
            name: name
          }
        })
        .then(response => {
          console.log(response);
          let username = response.data;
          // console.log(response.data);

          // console.log(username.length);
          if (username.length >= 1) {
            this.$toast.allowMultiple();
            this.$toast("用户名已被注册,请更换一个");
          } else {
            console.log(this.res.username);
            console.log(this.res.password);
            console.log(this.res.phone);
            let useData = this.res;
            console.log(useData);
            // axios请求 后台请求
            axios
              .post("http://192.168.1.167:8081/login/res", useData)
              .then(res => {
                console.log(res.data);
                if (res.data) {
                  this.$toast.allowMultiple();
                  this.$toast.success("注册成功");
                  this.active = true;
                  this.$emit("childern", this.active);
                }
              })
              .catch(res => {
                console.log(res);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
@import "~@/assets/CSS/res.css";
</style>