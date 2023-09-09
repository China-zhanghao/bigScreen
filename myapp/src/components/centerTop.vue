<template>
  <div class="top">
    <div class="one" v-for="item in centerTop.data" :key="item.name">
        <div class="one_left">
            <h1>{{item.name}}</h1>
            <span>{{item.value}}</span><span class="small_span">{{item.unit}}</span>
        </div>
        <div class="one_right">
          <img src="../assets/ma.jpg">
        </div>
    </div>
  </div>
</template>

<script>
import {reactive} from 'vue'
export default {
    setup(){
          const centerTop=reactive({
            data:[
            {
              name: "当前负荷",
              value: 6815.2,
              unit:'MW'
            },
            {
              name: "预测最大负荷",
              value: 7264.7,
              unit:'MW'
            },
            {
              name: "同比昨日",
              value: '+'+3.9,
              unit:'%'
            },
            {
              name: "最大负荷预测准确率",
              value: 98.1,
              unit:'%'
            },
          ]
          })
          return {centerTop}
    }
}
</script>

<style lang="less" scoped>
.top{
    display: flex;
    justify-content: space-between; 
    height: 1rem;
    line-height: .4rem;
    border: .0133rem solid #199AC6;
    margin: .25rem;
    .one
    { 
        display: flex;
        width: 2.4rem;
        background-color: #0E5269;
        justify-content: space-around;
        img{
            margin-top: .2rem;
            width: .5333rem;
            height: .5333rem;
        }

    }
    h1{
        font-size: .16rem;
        font-weight: normal;
        align-content: center;
        color: #8A9EA9;
    }
    span{
        font-size: .3333rem;
        font-weight: 700;
        color:#F6E74E;
    }
    .small_span{
        font-size: .2rem;
    }
}
</style>