<template>
  <div>
    <h2>每月最大/最小负荷</h2>
    <div class="monthEchart" id="monthChart">
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
    function setData(){
      // 获取数据,x轴所需要的数据
      xdata=data.data.chartsMonth.chartMonthData.map(v=>v.month)
      // 获取数据,y轴所需要的数据
      ydata1=data.data.chartsMonth.chartMonthData.map(v=>v.maxLoad)
      ydata2=data.data.chartsMonth.chartMonthData.map(v=>v.minLoad)
      console.log("xdata",xdata);
      console.log("ydata",ydata1);
      console.log("ydata",ydata2);
    }
    async function getState(){
      // 发送GET请求，把数据存储在data中,可以从data中获取x,y轴的数据
      data = await axios.get('http://localhost:8888/monthLoad/data');
      // monthData是请求过来的数据.chartMonth是monthLoad.js的数据名.chartMonth是json的名称
      // console.log(monthData.data.chartsMonth.chartMonthData);
    }
    onMounted(()=>{
       // echart初始化
      let myChart = $echarts.init(document.getElementById('monthChart'))
      getState().then(()=>{     
        setData()
      // 设置图表
      myChart.setOption({
      backgroundColor: '#031A20',
      // 图例组件
      title:{
      subtext:'单位:MV'
      },
      legend: {
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 20,
      textStyle: {
         fontSize: 10,
         color: '##1EE1E1',
      },
      data: ["最大负荷", "最低负荷"],
      selectedMode: false
      },
      // 直角坐标系内绘图网格,也就是图表的位置
      grid: {
      left: "3%",
      right: "3%",
      bottom: "3%",
      containLabel: true,
      },
      // x轴
      xAxis: {
      type: 'category',
      data: xdata,
      axisPointer: {
         type: "shadow",
      },
      axisLabel: {
         color: 'white',
         interval: 0,
      },
      axisLine: {
         show: false
      },
      splitLine: {
         show: false
      },
      axisTick: {
         show: false
      },
      },
      // y轴
      yAxis: {
      type: 'value',
      axisLine: {
         show: false
      },
      nameTextStyle: {
         color: 'white'
      },
      min: 0,
      axisLabel: {
         formatter: "{value}",
         color:'white'
      },
      axisTick: {
         show: false
      },
      splitLine: {
         show: true,
         lineStyle: {
            width: 0.5,
            color: 'rgba(255, 255, 255, 0.4)',
            type: 'dashed'
         }
      },
      },
      // 线的样式
      series: [        
      {
         data: ydata1,
         name: "最大负荷",
         type: 'bar',
         barWidth: '11px',
         itemStyle: {
           color:new $echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#1DE5E5'
                    },
                    {
                       offset:0.5,
                       color:"#15A5A7"
                    },
                    {
                        offset: 1,
                        color: 'rgba(14,102,106,.8)'
                    }])
         },
        //  文本标签
         label: {
            show: true,
            position: 'top',
            fontSize: 12,
            color: '#1DDFDF',
            offset: [0, -5],
            formatter: '{c}'
         },
        },
      {
         data: ydata2,
         name: "最低负荷",
         type: 'bar',
         barWidth: '11px',
         barGap: '80%',
         itemStyle: {
            color:new $echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#188EFC'
                    },
                    {
                       offset:0.5,
                       color:"#1470C3"
                    },
                    {
                        offset: 1,
                        color: 'rgba(11,73,121,.8)'
                    }])
         },
         label: {
            show: true,
            position: 'top',
            fontSize: 12,
            color: '#188EFB',
            offset: [0, -5],
            formatter: '{c}'
         },
      }
    ]
    })
  
      })
    
  })
    return {
     xdata,ydata1,ydata2,data,setData,getState
    }
  }
}
</script>

<style lang='less' scoped>
h2{
  padding-left: 10px;
  border-bottom: 1px solid #106581;
  height: 30px;
  color: #fff;
  font-weight: normal;
  line-height: 30px;
  font-size: 16px;
}
.monthEchart{
  height: 2.6rem;
}

</style>