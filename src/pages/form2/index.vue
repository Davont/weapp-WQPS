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
        <div class="echarts-height">
          <mpvue-echarts :echarts="echarts" :onInit="ecBarInit" canvasId="chart1"/>
        </div>
      </li>
      <li>
        <div>
          <wux-divider text="氨氮"/>
        </div>
        <div class="echarts-height">
          <mpvue-echarts :echarts="echarts" :onInit="ecScatterInit" canvasId="chart2"/>
        </div>
      </li>
      <li>
        <div>
          <wux-divider text="PH"/>
        </div>
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

let barChart, scatterChart, chart3;
function getBarOption() {
  //通过用户id获取信息,参数直接写在url中
  var colors = ["#5793f3", "#d14a61", "#675bba"];
  let getData = fly
    .get("http://47.98.33.249:3000/update/get_dOxy")
    .then(function(response) {
      //console.log(response);
      let data = response.data.result;
      console.log(data);
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
                formatter: function(params) {}
              }
            },
            data: data[0].x
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
                formatter: function(params) {}
              }
            },
            data: data[1].x
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
            data: data[0].y
          },
          {
            name: "实际值",
            type: "line",
            smooth: true,
            data: data[1].y
          }
        ]
      };
    })
    .catch(function(error) {
      console.log(error);
    });
  return getData;
}
function getScatterOption() {
  //通过用户id获取信息,参数直接写在url中
  var colors = ["#5793f3", "#d14a61", "#675bba"];
  let getData = fly
    .get("http://47.98.33.249:3000/update/get_aNit")
    .then(function(response) {
      //console.log(response);
      let data = response.data.result;
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
                formatter: function(params) {}
              }
            },
            data: data[0].x
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
                formatter: function(params) {}
              }
            },
            data: data[1].x
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
            data: data[0].y
          },
          {
            name: "实际值",
            type: "line",
            smooth: true,
            data: data[1].y
          }
        ]
      };
    })
    .catch(function(error) {
      console.log(error);
    });
  return getData;
}
console.log(getScatterOption());
function getChart3Option() {
  //通过用户id获取信息,参数直接写在url中
  var colors = ["#5793f3", "#d14a61", "#675bba"];
  let getData = fly
    .get("http://47.98.33.249:3000/update/get_ph")
    .then(function(response) {
      //console.log(response);
      let data = response.data.result;
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
                formatter: function(params) {}
              }
            },
            data: data[0].x
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
                formatter: function(params) {}
              }
            },
            data: data[1].x
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
            data: data[0].y
          },
          {
            name: "实际值",
            type: "line",
            smooth: true,
            data: data[1].y
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
      echarts,
      ecBarInit: function(canvas, width, height) {
        barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barChart);
        getBarOption().then(function(data) {
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
        getScatterOption().then(function(data) {
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
        getChart3Option().then(function(data) {
          chart3.setOption(data);
        });
        return chart3;
      }
    };
  },
  components: {
    mpvueEcharts
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
}
.echarts-height {
  height: 450px;
}
</style>