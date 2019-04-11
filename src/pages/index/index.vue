<template>
  <div class="page">
    <wux-notification id="wux-notification"/>
    <wux-wing-blank size="small">
      <div class="wux-text--center top">
        <p class="title">基于机器学习的水质预测微信小程序</p>
        <p class="intro">用机器学习算法使水质预测更加准确</p>
      </div>
      <div class="login">
        <wux-cell-group>
          <wux-cell hover-class="none">
            <wux-input
              clear
              label="用户名"
              v-bind:value="username"
              @change="handleUser"
              placeholder="Uesrname"
              controlled
            />
          </wux-cell>
          <wux-cell hover-class="none">
            <wux-input
              password
              clear
              label="密码"
              @change="handlePass"
              :value="password"
              placeholder="Password"
              controlled
            ></wux-input>
          </wux-cell>
        </wux-cell-group>
        <wux-button id="button" block :loading="load" type="positive" @click="LearnCloudlogin">登陆</wux-button>
      </div>
    </wux-wing-blank>
    <div class="copyright">
      <p>©南京邮电大学计算机学院、软件学院、网络空间安全学院</p>
    </div>
  </div>
</template>

<script>
const AV = require("leancloud-storage");
import { $wuxNotification } from "../../../static/wux/index";
import wuxUI from "../../../static/wux/styles/index.wxss";
export default {
  data() {
    return {
      username: "",
      password: "",
      load: false
    };
  },

  methods: {
    handleUser(event) {
      this.username = event.mp.detail.value;
      //console.log(event.mp.detail);
    },
    handlePass(event) {
      this.password = event.mp.detail.value;
      //console.log(event.mp.detail);
    },
    LearnCloudlogin(e) {
      this.load = true;
      var self = this;
      AV.User.logIn(this.username, this.password).then(
        function(loggedInUser) {
          //console.log(loggedInUser);
          console.log("tag", "成功");
          const hide = $wuxNotification().show({
            image: "https://wux.cdn.cloverstd.com/logo.png",
            title: "登录成功！",
            duration: 2000,
            onClick(data) {
              console.log("tag", "点击后消失");
              hide();
            }
          });
          self.load = false;
          let url = "../select/main";
          wx.navigateTo({ url });
        },
        function(error) {
          console.log("tag", "失败");
          self.load = false;
          const hide = $wuxNotification().show({
            image: "https://wux.cdn.cloverstd.com/logo.png",
            title: "登录失败！用户名或密码错误",
            duration: 2000,
            onClick(data) {
              console.log("tag", "点击后消失");
              hide();
            }
          });
        }
      );
    },
    handleSuccess() {
      $Toast({
        content: "这是文本提示"
      });
    }
  }
};
</script>

<style scoped>
.page {
  /*background-image: url("https://i.loli.net/2019/02/25/5c73f20ae2351.png");*/
}
.top {
  transform: translateY(80%);
}
.title {
  font-size: 0.55rem;
  margin: 15px 0;
}
.intro {
  margin: 10px 5px;
  font-size: 0.4rem;
  color: #999;
}
.login {
  transform: translateY(80%);
}
.copyright {
  width: 100%;
  padding: 13px 0;
  color: #999;
  text-align: center;
  font-size: 0.23rem;
  position: fixed;
  bottom: 0;
}
</style>
