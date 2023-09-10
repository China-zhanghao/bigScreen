<template>
  <div>
    <h2>准确率统计</h2>
    <div class="accuracyEchart" id="accuracyEchart">
        <!-- 容器 -->
    </div>
  </div>
</template>

<script>
import {inject,onMounted,reactive} from 'vue';
import axios from 'axios'; 
export default {
  setup(){
    let $echarts=inject("echarts")
    //把x轴y轴的值初始化
    let data=reactive({})
    let xdata=reactive([])
    let ydata1=reactive([])
    let ydata2=reactive([])
    let ydata3=reactive([])
    function setData(){
      // 获取数据,x轴所需要的数据
      xdata=data.data.chartsAccuracy.chartAccuracyData.map(v=>v.time)
      // 获取数据,y轴所需要的数据
      ydata1=data.data.chartsAccuracy.chartAccuracyData.map(v=>v.todayAccuracy),
      ydata2=data.data.chartsAccuracy.chartAccuracyData.map(v=>v.yesterdayAccuracy),
      ydata3=data.data.chartsAccuracy.chartAccuracyData.map(v=>v.loadAccuracy),
      console.log("xdata",xdata);
      console.log("ydata1",ydata1);
      console.log("ydata2",ydata2);
      console.log("ydata3",ydata3);
    }
    async function getState(){
      // 发送GET请求，把数据存储在data中,可以从data中获取x,y轴的数据
      data = await axios.get('http://localhost:8888/accuracyRate/data');
      // monthData是请求过来的数据.chartMonth是monthLoad.js的数据名.chartMonth是json的名称
      // console.log(monthData.data.chartsMonth.chartMonthData);
    }
    onMounted(()=>{
       // echart初始化
      let myChart = $echarts.init(document.getElementById('accuracyEchart'))
      getState().then(()=>{     
        setData()
      // 设置图表
      myChart.setOption({
      backgroundColor: 'rgba(2, 22, 48, 1)',
      title: [{
        text: '单位：%',
        x: '0',
        y: '10%',
        textStyle: {
            color: '#A4A8AE',
            fontWeight: 400,
            fontSize: 12,
            rotate: 90
        }
        },
        ],
      legend: {
          top: 3,
          left:20,
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 8,
          itemGap: 15,
          textStyle: {
              fontFamily: 'MicrosoftYaHei',
              fontSize: 11,
              color: 'rgba(255, 255, 255, 1)'
          },
          data: ['日内预测准确率','日前预测准确率','最大负荷预测准确率']
      },
      grid: {
          top:'25%',
          left: '2%',
          right: '3%',          
          bottom: '1%',
          containLabel: true,
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'line',
              lineStyle: {
                  color: 'rgba(113, 113, 113, 1)',
              },
          },
          backgroundColor: 'rgba(42, 51, 74, 1)',
          borderColor: 'transparent',
      },
      xAxis: {
          type: 'category',
          axisLine: {
              show: true,
              lineStyle: {
                  color: 'transparent',
              },
          },
          splitLine: {
              show: false,
          },
          axisLabel: {
              fontFamily: 'MicrosoftYaHei',
              fontSize: 12,
              color: 'rgba(113, 113, 113, 1)',
          },
          axisTick: {
              show: false,
              alignWithLabel: true,
          },
          boundaryGap: false,
          data: xdata,
      },
      yAxis: {
          type: 'value',
          nameTextStyle: {
              fontFamily: 'MicrosoftYaHei',
              fontSize: 12,
              color: 'rgba(113, 113, 113, 1)',
          },
          min: 0,
          axisLine: {
              show: false,
          },
          splitLine: {
              show: true,
              lineStyle: {
                  color: '#0675B9',
              },
          },
          axisLabel: {
              show: true,
              margin: 20,
              textStyle: {
                  fontFamily: 'MicrosoftYaHei',
                  fontSize: 12,
                  color: 'white',
              },
          },
          axisTick: {
              show: false,
          },
      },
      series: [
          {
              name: '日内预测准确率',
              type: 'line',
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 8,
              lineStyle: {
                  color: '#01F7DC'
              },
              label: {
                  show: false
              },
              itemStyle: {
                  color: '#30FAFA',
              },
              areaStyle: {
                  normal: {
                      color: new $echarts.graphic.LinearGradient(0,0,0,1,[
                              {
                                  offset: 0,
                                  color: '#01F7DC',
                              },
                              {
                                  offset: 1,
                                  color: 'transparent',
                              },
                          ],
                      ),
                  },
              },
              data: ydata1,
          },
          {
              name: '日前预测准确率',
              type: 'line',
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 8,
              lineStyle: {
                  color: '#185CFE'
              },
              label: {
                  show: false
              },
              itemStyle: {
                  color: '#185CFE',
              },
              areaStyle: {
                  normal: {
                      color: new $echarts.graphic.LinearGradient(0,0,0,1,[
                              {
                                  offset: 0,
                                  color: '#185CFE',
                              },
                              {
                                  offset: 1,
                                  color: 'transparent',
                              },
                          ],
                      ),
                  },
              },
              data: ydata2,
          },
          {
              name: '最大负荷预测准确率',
              type: 'line',
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 8,
              lineStyle: {
                  color: '#5059FA'
              },
              label: {
                  show: false
              },
              itemStyle: {
                  color: '#5059FA',
              },
              areaStyle: {
                  normal: {
                      color: new $echarts.graphic.LinearGradient(0,0,0,1,[
                              {
                                  offset: 0,
                                  color: '#5059FA',
                              },
                              {
                                  offset: 1,
                                  color: 'transparent',
                              },
                          ],
                      ),
                  },
              },
              data: ydata3,
          },
      ],
      })
  })
    return {
     xdata,ydata1,ydata2,ydata3,data,setData,getState
    }
  })
}
}
</script>

<style lang='less' scoped>
h2{
  padding-left: .1333rem;
  border-bottom: 1px solid #106581;
  height: .6rem;
  color: #fff;
  font-weight: normal;
  line-height: .6rem;
  font-size: .3rem;
}
.accuracyEchart{
  height: 2.9rem;
}
</style>