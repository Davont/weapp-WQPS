import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()
import AV from "leancloud-storage";
var APP_ID = "ajpTQS14SsQlfP2Tky7OhcNh-gzGzoHsz";
var APP_KEY = "MdgELQbsLkOSqk6q4VONw3ot";
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
export default {
  config: {
    pages: [
      'pages/index/main',
      'pages/form1/main',
      "pages/select/main",
      'pages/form2/main',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: 'rgb(87,158,218)',
      navigationBarTitleText: '第一个小程序',
      navigationBarTextStyle: 'white'
    }
  }
}
