<template>
  <div>
    <h2>明日预测曲线</h2>
    <div class="tomorrowEchart" id="tomorrowChart">
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
    let ydata=reactive([])
    function setData(){
      // 获取数据,x轴所需要的数据
      xdata=data.data.chartsTomorrow.chartTomorrowData.map(v=>v.tomorrowTime)
      // 获取数据,y轴所需要的数据
      ydata=data.data.chartsTomorrow.chartTomorrowData.map(v=>v.tomorrowPrediction)
      console.log("xdata",xdata);
      console.log("ydata",ydata);
    }
    async function getState(){
      // 发送GET请求，把数据存储在data中,可以从data中获取x,y轴的数据
      data = await axios.get('http://localhost:8888/tomorrowPrediction/data');
      // monthData是请求过来的数据.chartMonth是monthLoad.js的数据名.chartMonth是json的名称
      // console.log(monthData.data.chartsMonth.chartMonthData);
    }
    onMounted(()=>{
       // echart初始化
      let myChart = $echarts.init(document.getElementById('tomorrowChart'))
      getState().then(()=>{     
        setData()
      // 设置图表
      myChart.setOption({
        backgroundColor: 'rgba(2, 22, 48, 1)',
        title: [{
        text: '单位:(MW)',
        x: '0',
        y: '0',
        textStyle: {
            color: '#A4A8AE',
            fontWeight: 400,
            fontSize: 12,
            rotate: 90
        }
        },
        ],
        tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#0B627E',
                width: 4,
                type: 'solid'
            }
        }
    },
        grid: {
        top:'14%',
        left: '2%',
        right: '2%',          
        bottom: '1%',
        containLabel: true
    },
        xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisLabel: {
            show: true,
            interval: 12,
            textStyle: {
                color: '#B4BCBE'
            }
        },
        splitLine: {
            show: false
        }
    },
        yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: 'white'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#242F38',
                width: 1,
                type: 'dashed'
            }
        }
    }],
        series: [{
        color: '#2496BD',
        name: '负荷',
        type: 'line',
        smooth: false,
        areaStyle: {
            normal: {
                color: new $echarts.graphic.LinearGradient(0, 0, 0, .8, [{
                    offset: 0,
                    color: '#064356'
                },
                {
                    offset: 1,
                    color: '#064356'
                }
                ])
            }
        },
        data: ydata
    }]
      })
    
  })
    return {
     xdata,ydata,data,setData,getState
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
.tomorrowEchart{
  height: 3.1rem;
}

</style>