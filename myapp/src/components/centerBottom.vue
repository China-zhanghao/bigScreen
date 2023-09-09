<template>
  <div class="bottom">
     <h2>实时负荷曲线</h2>
    <div class="realTimeEchart" id="realTimeChart">
      
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
    function setData(){
      // 获取数据,x轴所需要的数据
      xdata=data.data.chartsRealTime.chartRealTimeData.map(v=>v.realTime)
      // 获取数据,y轴所需要的数据
      ydata1=data.data.chartsRealTime.chartRealTimeData.map(v=>v.actualValue),
      ydata2=data.data.chartsRealTime.chartRealTimeData.map(v=>v.predictiveValue),
      console.log("xdata",xdata);
      console.log("ydata",ydata1);
      console.log("ydata",ydata2);
    }
    async function getState(){
      // 发送GET请求，把数据存储在data中,可以从data中获取x,y轴的数据
      data = await axios.get('http://localhost:8888/realTimeLoad/data');
    }
    onMounted(()=>{
       // echart初始化
      let myChart = $echarts.init(document.getElementById('realTimeChart'))
      getState().then(()=>{     
        setData()
      // 设置图表
      myChart.setOption({
        backgroundColor: 'rgba(30, 34, 48, 1)',
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
        legend: {
          top: 5,
          left: 300,
          icon: 'roundRect',
          itemWidth: 10,
          itemHeight: 8,
          itemGap: 15,
          textStyle: {
            fontFamily: 'MicrosoftYaHei',
            fontSize: 14,
            color: 'rgba(255, 255, 255, 1)'
        },
        data: ['真实值', '预测值' ]
        },

        grid: {
          top: '20%',
          left: '2%',
          right: '4%',
          bottom: '2%',
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
                color: 'rgba(52, 51, 51, 1)',
            },
        },
          splitLine: {
            show: false,
        },
          axisLabel: {
            fontFamily: 'MicrosoftYaHei',
            fontSize: 12,
            color: 'rgba(255, 255, 255, 1)',
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
                color: 'rgba(52, 51, 51, 0.8)',
                type:'dashed'
            },
        },
          axisLabel: {
            show: true,
            margin: 20,
            textStyle: {
                fontFamily: 'MicrosoftYaHei',
                fontSize: 12,
                color: 'rgba(255, 255, 255, 1)',
            },
        },
          axisTick: {
            show: false,
        },
        },

        series: [
        {
            name: '真实值',
            type: 'line',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
                color: '#019E29',
            },
            label: {
                show: false
            },
            itemStyle: {
                color: '#019E29',
            },
            data: ydata1,
        },
        {
            name: '预测值',
            type: 'line',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
                color: '#147FDF'
            },
            label: {
                show: false
            },
            itemStyle: {
                color: '#147FDF',
            },
            data:ydata2,
        },
    ],
      })
  })
    return {
     xdata,ydata1,ydata2,data,setData,getState
    }
  })
}
}
</script>

<style lang="less" scoped>
.bottom{
    border: .0133rem solid #199AC6;
    margin: .25rem;
}
h2{
  border: 1px solid #106581;
  padding-left: .1333rem;
  height: .4rem;
  color: #fff;
  font-weight: normal;
  line-height: .4rem;
  font-size: .2133rem;
}
.realTimeEchart{
  height: 2.2rem;
}
</style>