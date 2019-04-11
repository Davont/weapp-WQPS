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
          <p class="wux-text--center sub-title">溶 解 氧 {{nextMonthList_DO}} mg / L</p>
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
            {{nextMonthList_NH3N}} mg / L
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
            {{nextMonthList_PH}}
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
import echarts from "echarts";
import mpvueEcharts from "mpvue-echarts";
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();

let barChart, scatterChart, chart3;
function getNextData(ob) {
  return fly.get("https://www.hanyuspace.cn/predicter/predict/?obj=" + ob);
}

function getAllData(ob) {
  return fly.get("https://www.hanyuspace.cn/predicter/waterquality/?obj=" + ob);
}
function getBarOption(selectName, name) {
  let getData = fly
    .all([getNextData(selectName), getAllData(selectName)])
    .then(
      fly.spread(function(nextData, alldata) {
        let nextValue = nextData.data.data;
        let data = [];
        let list = alldata.data.data;
        for (let i = list.month.length - 1; i >= 0; i--) {
          //console.log(i);
          //console.log(list.month);
          data.push([list.month[i], list.data[i]]);
        }
        data.push([nextValue.next_month_num, nextValue.pred]);
        //console.log(data);
        return {
          title: {
            text: name
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
            top: 2,
            right: 2,
            pieces: [
              {
                gt: 0,
                lte: 2,
                color: "#096"
              },
              {
                gt: 2,
                lte: 4,
                color: "#ffde33"
              },
              {
                gt: 4,
                lte: 6,
                color: "#ff9933"
              },
              {
                gt: 6,
                lte: 8,
                color: "#cc0033"
              },
              {
                gt: 8,
                lte: 10,
                color: "#660099"
              },
              {
                gt: 10,
                color: "#7e0023"
              }
            ],
            outOfRange: {
              color: "#999"
            }
          },
          series: {
            name: "2222",
            type: "line",
            data: data.map(function(item) {
              return item[1];
            }),
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: 2
                },
                {
                  yAxis: 4
                },
                {
                  yAxis: 6
                },
                {
                  yAxis: 8
                },
                {
                  yAxis: 10
                }
              ]
            }
          }
        };
      })
    )
    .catch(function(err) {
      console.log(err);
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
        getBarOption("DO", "溶解氧").then(function(data) {
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
        getBarOption("NH3N", "氨氮").then(function(data) {
          //console.log(data);
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
        getBarOption("PH", "PH").then(function(data) {
          chart3.setOption(data);
        });
        return chart3;
      },
      nextMonthList_DO: "",
      nextMonthList_NH3N: "",
      nextMonthList_PH: ""
    };
  },
  components: {
    mpvueEcharts
  },
  beforeCreate() {
    var self = this;
    fly
      .get("https://www.hanyuspace.cn/predicter/predict/?obj=DO")
      .then(function(res) {
        //console.log(res);
        self.nextMonthList_DO = res.data.data.pred;
      })
      .catch(function(err) {
        console.log(err);
      });
    fly
      .get("https://www.hanyuspace.cn/predicter/predict/?obj=NH3N")
      .then(function(res) {
        //console.log(res);
        self.nextMonthList_NH3N = res.data.data.pred;
      })
      .catch(function(err) {
        console.log(err);
      });
    fly
      .get("https://www.hanyuspace.cn/predicter/predict/?obj=PH")
      .then(function(res) {
        //console.log(res);
        self.nextMonthList_PH = res.data.data.pred;
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