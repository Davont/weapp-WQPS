<template>
  <div class="wrap">
    <div>
      <p class="wux-text--center title">模型更新结果</p>
    </div>
    <ul>
      <li>
        <div>
          <wux-divider text="溶解氧"/>
        </div>
        <div>
          <p class="wux-text--center sub-title">
            测试集样本数:
            <span>{{update_DO.num}}</span>
            RMSE:
            <span>{{update_DO.rmse}}</span>
          </p>
          <p class="wux-text--center sub-title">
            相关性:
            <span>{{update_DO.cor}}</span>
            准确率:
            <span>{{update_DO.accuracy}}</span>
          </p>
        </div>
        <div class="echarts-height">
          <mpvue-echarts :echarts="echarts" :onInit="ecBarInit" canvasId="chart1"/>
        </div>
      </li>
      <li>
        <div>
          <wux-divider text="氨氮"/>
        </div>
        <p class="wux-text--center sub-title">
          测试集样本数:
          <span>{{update_NH3N.num}}</span>
          RMSE:
          <span>{{update_NH3N.rmse}}</span>
        </p>
        <p class="wux-text--center sub-title">
          相关性:
          <span>{{update_NH3N.cor}}</span>
          准确率:
          <span>{{update_NH3N.accuracy}}</span>
        </p>
        <div class="echarts-height">
          <mpvue-echarts :echarts="echarts" :onInit="ecScatterInit" canvasId="chart2"/>
        </div>
      </li>
      <li>
        <div>
          <wux-divider text="PH"/>
        </div>
        <p class="wux-text--center sub-title">
          测试集样本数:
          <span>{{update_PH.num}}</span>
          RMSE:
          <span>{{update_PH.rmse}}</span>
        </p>
        <p class="wux-text--center sub-title">
          相关性:
          <span>{{update_PH.cor}}</span>
          准确率:
          <span>{{update_PH.accuracy}}</span>
        </p>
        <div class="echarts-height">
          <mpvue-echarts :echarts="echarts" :onInit="chart3Init" canvasId="chart3"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import * as echarts from "echarts";
import mpvueEcharts from "mpvue-echarts";
import wuxUI from "../../../static/wux/styles/index.wxss";
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();
const array = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
  90,
  91,
  92,
  93,
  94,
  95,
  96,
  97,
  98,
  99,
  100,
  101,
  102,
  103,
  104,
  105,
  106,
  107,
  108,
  109,
  110,
  111,
  112,
  113,
  114,
  115,
  116,
  117,
  118,
  119,
  120,
  121,
  122,
  123,
  124,
  125,
  126,
  127,
  128,
  129
];
let barChart, scatterChart, chart3;
function getBarOption(selectName) {
  //通过用户id获取信息,参数直接写在url中
  var colors = ["#5793f3", "#d14a61", "#675bba"];

  let getData = fly
    .get("https://www.hanyuspace.cn/predicter/train/?obj=" + selectName)
    .then(function(response) {
      //console.log(response);
      let data = response.data.data;
      //console.log(data);
      return {
        color: colors,

        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["预测值", "实际值"]
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    "预测值  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                }
              }
            },
            data: array
          },
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    "实际值  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                }
              }
            },
            data: array
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "预测值",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            data: data.pred
          },
          {
            name: "实际值",
            type: "line",
            smooth: true,
            data: data.real
          }
        ]
      };
    })
    .catch(function(error) {
      console.log(error);
    });
  return getData;
}
export default {
  data() {
    return {
      update_DO: {
        num: 130,
        rmse: "",
        cor: "0.5",
        accuracy: ""
      },
      update_NH3N: {
        num: 130,
        rmse: "",
        cor: "0.5",
        accuracy: ""
      },
      update_PH: {
        num: 130,
        rmse: "",
        cor: "0.5",
        accuracy: ""
      },
      echarts,
      ecBarInit: function(canvas, width, height) {
        barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barChart);
        getBarOption("DO").then(function(data) {
          barChart.setOption(data);
        });
        return barChart;
      },
      ecScatterInit: function(canvas, width, height) {
        scatterChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(scatterChart);
        //console.log(this);
        getBarOption("NH3N").then(function(data) {
          scatterChart.setOption(data);
        });
        return scatterChart;
      },
      chart3Init: function(canvas, width, height) {
        chart3 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart3);
        getBarOption("PH").then(function(data) {
          chart3.setOption(data);
        });
        return chart3;
      }
    };
  },
  components: {
    mpvueEcharts
  },
  beforeCreate() {
    var self = this;
    fly
      .get("https://www.hanyuspace.cn/predicter/train/?obj=DO")
      .then(function(res) {
        //console.log(res);
        self.update_DO.rmse = res.data.data.rmse;
        self.update_DO.cor = res.data.data.cor;
        self.update_DO.accuracy = res.data.data.accuracy;
      })
      .catch(function(err) {
        console.log(err);
      });
    fly
      .get("https://www.hanyuspace.cn/predicter/train/?obj=NH3N")
      .then(function(res) {
        //console.log(res);
        self.update_NH3N.rmse = res.data.data.rmse;
        self.update_NH3N.cor = res.data.data.cor;
        self.update_NH3N.accuracy = res.data.data.accuracy;
      })
      .catch(function(err) {
        console.log(err);
      });
    fly
      .get("https://www.hanyuspace.cn/predicter/train/?obj=PH")
      .then(function(res) {
        //console.log(res);
        self.update_PH.rmse = res.data.data.rmse;
        self.update_PH.cor = res.data.data.cor;
        self.update_PH.accuracy = res.data.data.accuracy;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  onShareAppMessage() {}
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}
ul {
  height: 100%;
}
li {
  height: 550px;
}
.title {
  font-size: 0.5rem;
  margin-top: 3%;
}
.time {
  font-size: 0.3rem;
  color: #999;
  margin: 2% 0;
}
.sub-title {
  color: #387ef5;
  margin: 5% 0;
  font-size: 0.28rem;
}
.sub-title span {
  color: #666;
}
.echarts-height {
  height: 450px;
}
</style>