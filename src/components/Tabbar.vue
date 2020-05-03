<template>
  <div>
    
     

    
    <!-- <router-link to="/about">About</router-link> -->
    <!-- 底部导航栏 -->
    <!-- <router-view>111</router-view> -->

    <van-tabbar
    
      v-model="active"
      :fixed="true"
      :border="false"
      active-color="#ca8888"
      inactive-color="#6b2121"
      class="tabbar" :class="currIndex  == active ? active : '' "
   
    >
      <van-tabbar-item
        v-for="(item,index) in tabbar"
        @click="change(index,item.name)"
      :to="item.name"
        :key="index"
      >
        <span >{{item.title}}</span>
        <template #icon="tabbar">
          <img :src="tabbar.active ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    
    </van-tabbar>

    <!-- 头部搜索栏 -->
    <div class="Top">
      <div class="user">
        <!-- 路由跳转动画 -->
        
          <van-cell @click="showPopup" >
            <van-image class="user_img" round src></van-image>
          </van-cell>
    
        
      </div>
      <div class="search">
        <van-search v-model="value" shape="round" class="search_t" :placeholder="placeholder" />
      </div>
      <div class="icon">
        <div>
          <van-icon name="qr" />
        </div>
        <div>
          <van-icon name="chat-o" dot />
        </div>
      </div>
    </div>

    <router-view></router-view>

      
    
  </div>
</template>

<script>
// import {Notify} from "vant"
export default {
  name: "Tabbar",
  data() {
    return {
      // 动画名
      transitionName:'slide-right',
      // 搜索数据
      value: "",
      placeholder: "",
      active:0,
      currIndex: 0,
      // 控制弹出层
      show: true,

      tabbar: [
        {
          name: "/Tabbar/index",
          title: "首页",
          normal: require("../assets/home/home.png"),
          active: require("../assets/home/home1.png"),
          placeholder: "孙亚龙"
        },
        {
          name: "/Tabbar/fenlei",
          title: "分类",
          normal: require("../assets/home/fenlei.png"),
          active: require("../assets/home/fenlei1.png"),
          placeholder: "笑笑"
        },
        {
          name: "/Tabbar/like",
          title: "关注",
          normal: require("../assets/home/like.png"),
          active: require("../assets/home/like1.png"),
          placeholder: "孙亚"
        },

        {
          name: "/Tabbar/mine",
          title: "我的",
          normal: require("../assets/home/my.png"),
          active: require("../assets/home/my1.png"),
          placeholder: "西卡"
        }
      ],
    };
  },
  methods: {
    change(index, route) {
      this.placeholder = this.tabbar[index].placeholder;
      console.log(index);
      console.log(route);
      this.$router.push(route);
    },
    plc() {
      // console.log(this.active);
      this.placeholder = this.tabbar[0].placeholder;
    },
    showPopup() {
      this.$router.push({path:'/login'})
      // this.show = this.show == true ? !true : true;
    }
  },
  watch:{

  },
  
  // 生命函数
  created() {
    this.plc();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {}
};
</script>
<style scoped>


/* 头部搜索框样式 */
.search {
    display: flex;
    flex: 74%;
  }
  .search_t {
    flex: 100%;
    padding: 0px 5px;
    /* margin: auto; */
  }
  .search_t div {
    padding: 0px 5px;
  }
  .Top {
    width: 100%;
    display: flex;
    position: fixed;
    top: 0px;
    padding: 5px 0px;
  }
  /* 用户样式 */
  .user {
    display: flex;
    flex: 12%;
    padding: 0px;
  }
  .user div{
    padding: 0px;
  }
  .user_img {
    margin: auto;
    height: 30px;
    width: 30px;
    display: flex;
  }
  
  /* 图标样式 */
  .icon {
    display: flex;
    flex: 14%;
  }
  .icon div {
    margin: auto;
  }
  /* 底部样式 */
  .active{
    color: blueviolet;
  }
  /* 遮罩层样式 */

</style>