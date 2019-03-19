<template>
  <div class="wrap">
    <div>
      <p class="wux-text--center title">水质预测报告</p>
      <p class="wux-text--center time">2019-3</p>
    </div>
    <ul>
      <li>
        <wux-divider text="溶解氧"/>
        <div>
          <p class="wux-text--center sub-title">溶 解 氧 {{nextMonthList.d_oxy}} mg / L</p>
        </div>
        <div class="echarts-height">
          <mpvue-echarts :echarts="echarts" :onInit="ecBarInit" canvasId="chart1"/>
        </div>
      </li>
      <li>
        <wux-divider text="氨氮"/>
        <div>
          <p class="wux-text--center sub-title">
            氨 氮
            {{nextMonthList.a_nit}} mg / L
          </p>
        </div>
        <div class="echarts-height">
          <mpvue-echarts :echarts="echarts" :onInit="ecScatterInit" canvasId="chart2"/>
        </div>
      </li>
      <li>
        <wux-divider text="PH"/>
        <div>
          <p class="wux-text--center sub-title">
            PH
            {{nextMonthList.ph}}
          </p>
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
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();

let barChart, scatterChart, chart3;
function getBarOption() {
  let getData = fly
    .get("http://47.98.33.249:3000/nextMonth/get_dOxy")
    .then(function(response) {
      let data = [];
      console.log(response.data.result);
      for (let i of response.data.result) {
        //console.log(i);
        data.push([i.month, i.value]);
      }
      //console.log(data);
      return {
        title: {
          text: "溶解氧"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: data.map(function(item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: "center",
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            startValue: "2014-06-01"
          },
          {
            type: "inside"
          }
        ],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#096"
            },
            {
              gt: 50,
              lte: 100,
              color: "#ffde33"
            },
            {
              gt: 100,
              lte: 150,
              color: "#ff9933"
            },
            {
              gt: 150,
              lte: 200,
              color: "#cc0033"
            },
            {
              gt: 200,
              lte: 300,
              color: "#660099"
            },
            {
              gt: 300,
              color: "#7e0023"
            }
          ],
          outOfRange: {
            color: "#999"
          }
        },
        series: {
          name: "溶解氧",
          type: "line",
          data: data.map(function(item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 100
              },
              {
                yAxis: 150
              },
              {
                yAxis: 200
              },
              {
                yAxis: 300
              }
            ]
          }
        }
      };
    })
    .catch(function(error) {
      console.log(error);
    });
  //通过用户id获取信息,参数直接写在url中

  console.log("\n\n------ begin: map ------");
  console.log(getData);
  console.log("------ end: map ------\n\n");
  return getData;
}
function getScatterOption() {
  //通过用户id获取信息,参数直接写在url中
  let getData = fly
    .get("http://47.98.33.249:3000/nextMonth/get_aNit")
    .then(function(response) {
      let data = [];
      console.log(response.data.result);
      for (let i of response.data.result) {
        //console.log(i);
        data.push([i.month, i.value]);
      }
      //console.log(data);
      return {
        title: {
          text: "氨氮"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: data.map(function(item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: "center",
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            startValue: "2014-06-01"
          },
          {
            type: "inside"
          }
        ],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#096"
            },
            {
              gt: 50,
              lte: 100,
              color: "#ffde33"
            },
            {
              gt: 100,
              lte: 150,
              color: "#ff9933"
            },
            {
              gt: 150,
              lte: 200,
              color: "#cc0033"
            },
            {
              gt: 200,
              lte: 300,
              color: "#660099"
            },
            {
              gt: 300,
              color: "#7e0023"
            }
          ],
          outOfRange: {
            color: "#999"
          }
        },
        series: {
          name: "氨氮",
          type: "line",
          data: data.map(function(item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 100
              },
              {
                yAxis: 150
              },
              {
                yAxis: 200
              },
              {
                yAxis: 300
              }
            ]
          }
        }
      };
    })
    .catch(function(error) {
      console.log(error);
    });
  console.log("\n\n------ begin: map ------");
  console.log(getData);
  console.log("------ end: map ------\n\n");
  return getData;
}
function getChart3Option() {
  //通过用户id获取信息,参数直接写在url中
  let getData = fly
    .get("http://47.98.33.249:3000/nextMonth/get_ph")
    .then(function(response) {
      let data = [];
      console.log(response.data.result);
      for (let i of response.data.result) {
        //console.log(i);
        data.push([i.month, i.value]);
      }
      //console.log(data);
      return {
        title: {
          text: "PH"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: data.map(function(item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: "center",
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            startValue: "2014-06-01"
          },
          {
            type: "inside"
          }
        ],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#096"
            },
            {
              gt: 50,
              lte: 100,
              color: "#ffde33"
            },
            {
              gt: 100,
              lte: 150,
              color: "#ff9933"
            },
            {
              gt: 150,
              lte: 200,
              color: "#cc0033"
            },
            {
              gt: 200,
              lte: 300,
              color: "#660099"
            },
            {
              gt: 300,
              color: "#7e0023"
            }
          ],
          outOfRange: {
            color: "#999"
          }
        },
        series: {
          name: "PH",
          type: "line",
          data: data.map(function(item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 100
              },
              {
                yAxis: 150
              },
              {
                yAxis: 200
              },
              {
                yAxis: 300
              }
            ]
          }
        }
      };
    })
    .catch(function(error) {
      console.log(error);
    });
  console.log("\n\n------ begin: map ------");
  console.log(getData);
  console.log("------ end: map ------\n\n");
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
      },
      nextMonthList: {}
    };
  },
  components: {
    mpvueEcharts
  },
  beforeCreate() {
    var self = this;
    fly
      .get("http://47.98.33.249:3000/nextMonth/get_nextMonth_list")
      .then(function(res) {
        self.nextMonthList = res.data.result[0];
        //console.log(self.nextMonthList);
        //console.log(res.data.result);
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
}
.echarts-height {
  height: 450px;
}
</style>