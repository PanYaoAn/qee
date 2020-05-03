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
            <div class="user_mess" v-if="this.$store.state.count == 0">
              <van-image class="user_pic" width="50" height="50" src round />
              <div class="user_naem">
                <span>{{user.user_name}}</span>
              </div>
            </div>
            <!-- 未登录 -->
            <div class="log">
              <h4>欢迎来来到企鹅视频</h4>

              <van-cell  class="but" @click="showPopup">
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
    <!-- 登录页面 -->
    <van-popup v-model="show"
    position="bottom" 
    :style="{height:'50%'}"
    round>
        <div class="login">
            <h4>请输入账号</h4>
        </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      // 用户信息
      user: {
        user_name: "亲登录",
        user_id: ""
      }
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    showPopup() {
      console.log(11111);
      this.show = true;
    },
   
  }
};
</script>
<style scoped>
.content {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
}
.pop {
  display: flex;
}
.pop_cont_t {
  display: flex;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: #dfdfdf;
}
/* 关闭遮罩层按钮样式*/
.close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 25px;
}
.cont_t {
  width: 100%;
  /* height: 100%; */
  padding: 15px;
  text-align: left;
}
/* 登录前的样式 */
.log_cont {
  /* height: 100%; */
  width: 100%;
  background: #ffffff;
  display: flex;
}
.log {
}
.but{
    padding: 0px;
}
/* 登录后的样式 */
.user_mess {
  /* display: flex; */
  padding: 15px 0;
  background-color: #ffffff;
}
.user_naem {
  padding: 5px 0;
}
</style>