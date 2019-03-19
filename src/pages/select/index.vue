<template>
  <div>
    <div class="title">
      <p class="wux-text--center">请选择预测选项</p>
    </div>
    <div class="select">
      <ul>
        <li>
          <wux-wing-blank size="default">
            <wux-card title="预测模块">
              <view slot="body">预测模块完成的功能是针对前三个月的数据，利用训练好的模型预测出下一个月的水质数据。</view>
            </wux-card>
          </wux-wing-blank>
          <wux-button block outline type="royal" @click="urlToform1">下月水质预测</wux-button>
        </li>
        <li class="marTop">
          <wux-wing-blank size="default">
            <wux-card title="模型更新模块">
              <view slot="body">模型更新模块完成的功能是利用数据库中的数据（增加或修改后）对预测模型重新进行训练。</view>
            </wux-card>
          </wux-wing-blank>
          <wux-button block outline type="dark" @click="urlToform2">模型更新</wux-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    urlToform1: function() {
      let url = "../form1/main";
      wx.navigateTo({ url });
    },
    urlToform2: function() {
      let url = "../form2/main";
      wx.navigateTo({ url });
    }
  }
};
</script>
<style scoped>
.select {
  width: 80%;
  margin: 5% auto;
}
.title {
  margin: 10% 0;
  color: #387ef5;
}
.marTop {
  margin: 15% 0;
}
</style>