<template>
  <div class="map" id="map">
  </div>
</template>

<script>
  import axios from 'axios'
  import {onMounted,reactive,inject} from "vue"
  export default {
    setup(){
        let $echarts=inject("echarts")
        let mapData = reactive({})
        async function getState(){
           mapData = await axios.get("http://localhost:8080/map/province/henan.json")
        }
        
        onMounted(()=>{
            getState().then(()=>{
                console.log("map",mapData);
                $echarts.registerMap("henan",mapData.data);
                let myChart = $echarts.init(document.getElementById("map"))
                myChart.setOption({
                  geo:{
                    map:"henan",
                    itemStyle:{ 
                      areaColor:"#3A6BAE",
                      borderColor:"#559FC5",
                      shadowColor:"#4078B3",
                      shadowBlur:10,
                    },
                    label:{
                      show:'true',
                      color:'#95D0DF'
                    },
                    tooltip:{
                      trigger:"item"
                    },
                    series:[
                      {
                        type: 'scatter',
                        itemStyle:{
                          color:"red",
                        },
                        coordinateSystem: "geo",
                        data:[
                        {name:"郑州市",value:[113.665412,34.757975, 114]},
                        {name:"济源市",value:[112.590047,35.090378]}
                      ]
                      }
                    ]
                  }
                })
            })
        })
        return {
            getState,mapData
        }
    }
}
</script>

<style lang="less" scoped>
.map{
    height: 5.5rem;
    border: 1px solid #106581;
    margin: .25rem;
}
</style>