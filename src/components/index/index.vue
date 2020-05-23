<template>
  <div>
    <van-tabs
      class="tab"
      v-model="active"
      :swipeable="true"
      animated
      sticky
      title-active-color="#ff9f43"
      color="#000"
      type="noed"
      :ellipsis="false"
      @change="in_theaters(active)"
    >
      <van-tab class="cont" v-for="(item,index) in tab" :key="index" swipeable="true" :title="item">
        <div class="WillOn">
          <div class="file_city">{{content.title}}</div>
          <div>
            <span v-if="active == 0" @click="showPopup">选择城市</span>
          </div>
        </div>
        <div class="file-cont" v-for="(item,index) in content.subjects" :key="index">
          <div class="file_img">
            <van-image width="100" height="100" :src="item.images.small">
              <template v-slot:error>图片加载失败</template>
            </van-image>
          </div>
          <div class="file_message">
            <div class="file_name">
              <span>
                <van-tag plain>{{item.genres[0]}}</van-tag>
              </span>
              <span>{{item.title}}( {{item.year}} )</span>
            </div>
            <div class="file_actor">
              <span>主演:</span>
              <span v-for="(actor,index) in item.casts" :key="index">{{actor.name}}</span>
            </div>
            <div class="file_time">
              <span>上映时间:</span>
              <span>{{item.pubdates[0]}}</span>
              <div></div>
              <span v-if="item.durations[0]">时长:</span>
              <span v-if="item.durations[0]">{{item.durations[0]}}</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-popup v-model="show" round position="bottom">
      <van-picker
        title="选择城市"
        default-index="2"
        show-toolbar
        :columns="columns"
        @cancel="onClose"
        @confirm="onConfirm"
      />
    </van-popup>

    <!-- <div v-for="(item,index) in tab" :key="index" >{{item.name}}</div> -->
    <!-- <div @click="test"> 111</div> -->
  </div>
</template>
<script>
import axios from "axios";
// const citys = {
//   浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
//   福建: ['福州', '厦门', '莆田', '三明', '泉州'],
// };

export default {
  // name: "index",
  data() {
    return {
      show: false,
      active: 0,
      tab: ["正在热映", "即将上映"],
      //  "本周口碑", "北美票房榜", "新片榜"
      content: {},
      // 即将上映
      Normal: JSON.parse(localStorage.getItem("Normal")) || {},
      // 正在上映
      WillOn: JSON.parse(localStorage.getItem("WillOn")) || {},
      // 城市数组
      columns: ["广州", "上海", "北京", "深圳", "杭州"],
      // 选择的城市
      city: "北京",
      start: 0,
      // 缓存底部加的正在热映数据
      localNormal:[],
      // columns:[{ values: Object.keys(citys) }, { values: citys['浙江'] }],
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    onClose() {
      this.show = false;
    },
    // 选择城市切换数据
    onConfirm(values) {
      console.log(values);
      console.log(typeof values);
      this.city = values;
      let city = this.city;
      console.log(this.city);
      console.log(city);
      // 进来先清除之前localNormal请求的数据缓存
      sessionStorage.removeItem('key');
      axios
        .get(
          "https://douban.uieee.com/v2/movie/in_theaters?&city=" +
            city +
            "&start=0&count=10"
        )
        .then(res => {
          console.log(res.data.title);
          localStorage.setItem("Normal", JSON.stringify(res.data));
          // this.content = res.data;
          this.content = JSON.parse(localStorage.getItem("Normal")); 
        })
        .catch(err => {
          console.log(err);
        });
      this.start = 0;
      this.show = false;
    },
    // 正在热映

    in_theaters(active) {
      let city = this.city;
      this.start = 0;
      console.log(active);
      if (active == 0) {
        console.log(this.Normal.title);
        if (this.Normal.title == undefined) {
          this.$toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true
          });
        }
        console.log(this.Normal);
        // 正在热映
        // https://douban.uieee.com/v2/movie/in_theaters?&city=%E5%B9%BF%E5%B7%9E&start=0&count=10
        if (this.Normal.title == undefined) {
          this.content = {};
          axios
            .get(
              "https://douban.uieee.com/v2/movie/in_theaters?&city=" +
                city +
                "&start=0&count=10"
            )
            .then(res => {
              this.content = res.data;
              // console.log(this.content);
              localStorage.setItem("Normal", JSON.stringify(res.data));
              this.Normal = JSON.parse(localStorage.getItem("Normal"));
           
              this.$toast.clear();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
           console.log(this.content.title);
          this.$toast.clear();
          // 切换tab导致内容不符合,再次赋值
          this.content = JSON.parse(localStorage.getItem("Normal")); 
          console.log(this.localNormal.length)
          // 判断 如果用户第一次进入,localNormal就会没有数据 如果用后后面下滑请求,就讲数据放进localNormal
           if(this.localNormal.length == 0){
             this.content = JSON.parse(localStorage.getItem("Normal"));
          }else{
            this.content.subjects = JSON.parse(sessionStorage.getItem('key'))
          }
          console.log(this.content.subjects);
        }
      } else if (active == 1) {
        var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
        scrollTop == 0
        console.log(scrollTop)


        console.log(this.WillOn.title);
        if (this.WillOn.title == undefined) {
          this.$toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true
          });
        }
        console.log(this.WillOn);
        // 获取即将上映电影
        // https://douban.uieee.com/v2/movie/coming_soon
        // https://douban.uieee.com/v2/movie/coming_soon?&start=0&count=10
        if (this.WillOn.title == undefined) {
          this.content = {};
          axios
            .get("https://douban.uieee.com/v2/movie/coming_soon")
            .then(res => {
              this.content = res.data;

              localStorage.setItem("WillOn", JSON.stringify(this.content));
              this.WillOn = JSON.parse(localStorage.getItem("WillOn"));
              console.log(this.WillOn.title);
              this.$toast.clear();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
         
          this.$toast.clear();
         
            this.content = JSON.parse(localStorage.getItem("WillOn"));
          
        }
      } else if (active == 2) {
        // 电影本周口碑榜
        // https://douban.uieee.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a
        axios
          .get(
            " https://douban.uieee.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a"
          )
          .then(res => {
            console.log(res);
            this.$toast.clear();
          })
          .catch(err => {
            console.log(err);
          });
      } else if (active == 3) {
        // 北美票房榜
        // https://douban.uieee.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a
        axios
          .get(
            "  https://douban.uieee.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a"
          )
          .then(res => {
            console.log(res);
            this.$toast.clear();
          })
          .catch(err => {
            console.log(err);
          });
      } else if (active == 4) {
        // 新片榜
        //https://douban.uieee.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a
        axios
          .get(
            "https://douban.uieee.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a"
          )
          .then(res => {
            console.log(res);
            this.$toast.clear();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    buttomloading(city, start, callback) {
      // console.log(city)
      console.log(start);

      axios
        .get(
          "https://douban.uieee.com/v2/movie/in_theaters?&city=" +
            city +
            "&start=" +
            start +
            "&count=10"
        )
        .then(res => {
          if (res) {
            callback(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 底部再次请求数据

    // 监听滚动条
    handleScroll() {
      //  //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollTop)
      //   //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //   //变量windowHeight是可视区的高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        this.start++;

        let start = this.start;
        if(this.active == 0){
          let city = this.city;
          this.$options.methods.buttomloading(city, start, data => {
            console.log(data.subjects[0]);
            // this.content.subjects += data.subjects;
            if (data.subjects[0] == undefined) {
              this.$toast(
                '没有更多了'
              );
            }
            // 将旧数组和新数组结合
            this.content.subjects.push.apply(
              this.content.subjects,
              data.subjects
            );
         
            sessionStorage.setItem('key',JSON.stringify(this.content.subjects))
            // 把请求到的数据放进localNormal 后面用作判断
            this.localNormal = JSON.parse(sessionStorage.getItem('key'))
            console.log( this.localNormal);
          });

        }else if(this.active == 1){
          console.log('daada')
        }
       
      }
    }
  },
  created() {},
  mounted() {
    this.in_theaters(this.active);
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed(){
    console.log(1111)
    //离开页面销毁滚动条事件 
    window.removeEventListener("scroll",this.handleScroll )
    
  }

};
</script>
<style  scoped>
@import "~@/assets/CSS/index.css";
</style>