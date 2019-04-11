# 基于卫星传感网的水质监测系统（小程序）



> 本软件基于微信小程序，机器学习模块基于PC端服务器上云算法，在预测方面，该水质预测属于时序预测，由于传统预测方法不适合进行时序预测，我们采用基于长短期记忆网络(LSTM)的水质预测方法。神经网络方法是一种深度学习方法，它具有的非线性、自组织学习等优点很契合水质预测的问题。长短期记忆网络本身结构的特点，使其具有“记忆性”，这让它处理水质预测问题的准确度比其他方法更高。


## 技术栈

- [x] vue
- [x] mpvue
- [x] fly.js
- [x] mpvue-echarts

## 功能简介

1. 水质数据预测功能：基于自制系统运用sklearn插件使用机器学习算法，采集前三个月的水质数据对下一个月的水质数据预测，之后将预测的数据上传到微信小程序上展示。
2. 模型更新功能：及时更新预测模型，当新增加数据导致原有模型不再适合预测时，管理员可以手动更新预测模型，并显示更新后模型的预测效果。
3. 登录验证功能：需要管理员进行登录才能应用（1）、（2）所述的功能，保证了数据的安全性。

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

![123.jpg](https://i.loli.net/2019/03/23/5c962597baea6.jpg)

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
