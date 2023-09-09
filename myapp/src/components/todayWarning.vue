<template>
  <div>
    <div class="title"><span class="todayWarning">今日预警</span><span class="primaryWarning">初级预警</span></div>
    <div class="container"  v-for="item in todayWarning.data" :key="item.name">
        <div class="one">
          <div>{{item.name}}</div>
          <div>{{item.value}}</div>
          <div>{{item.unit}}</div>
        </div>
        <div class="two">
          <div>
            <h6>{{item.two}}</h6>
            <el-icon color="#EB5043" size="0.2667rem"><Top /></el-icon>
          </div>
          <div>
            <h6>{{item.two}}</h6>
            <el-icon color="#15CC90" size="0.2667rem"><Bottom /></el-icon>
          </div>
          <div>
            <h6>{{item.two}}</h6>
            <el-icon color="#15CC90" size="0.2667rem"><Bottom /></el-icon>
          </div>
        </div>
        <div class="three">
          <div>
            <h6>{{item.three}}</h6>
            <span>中</span>
          </div>
          <div>
            <h6>{{item.three}}</h6>
            <span>中</span>
          </div>
          <div>
            <h6>{{item.three}}</h6>
            <span>中</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {reactive} from 'vue'
export default {
    setup(){
          const todayWarning=reactive({
            data:[
            {
              name: "升温",
              value: '小雨转晴导致新能源出力上升',
              unit:'周六',
              two:'负荷趋势',
              three:'波动幅度'
            },
          ]
          })
          return {todayWarning}
    }
}
</script>

<style lang="less" scoped>
.title{
  padding-left: .1333rem;
  border-bottom: 1px solid #178DB7;
  height: .4267rem;
  line-height: .3733rem;
  .todayWarning{
    font-size: .2133rem;
    color:#EDF2F4;
  }
  .primaryWarning{
    padding:.0267rem .04rem;
    margin-left: 4rem;
    background-color: #157A80;
    border: 1px solid #178DB7;
    font-size: .08rem;
  }
}
.container{
  display:flex;
  flex-wrap: wrap;
  .one{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 .2667rem;
    width: 100%;
    height: .83rem;
    div{
      height: .4rem;
      color: #fff;
      line-height: .2933rem;
      padding: .0533rem .1333rem;
      background-color: #0C4D63;
      border: 1px solid #199AC6;
    }
  }
  .two{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 .1333rem;
    width: 100%;
    height: .8rem;
    div{
      text-align: center;
      height: .6667rem;
      color: #fff;
      line-height: .2933rem;
      padding: .0533rem .1333rem;
      h6{
        font-weight: normal;
        margin-bottom: .0667rem;
      }
    }
  }  
  .three{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 .1333rem;
    width: 100%;
    height: .8rem;
    div{
      text-align: center;
      height: .6667rem;
      color: #fff;
      line-height: .2933rem;
      padding: .0533rem .1333rem;
      h6{
        font-weight: normal;
        margin-bottom: .0667rem;
      }
      span{
        color: #1290BB;
      }
    }
  }
}

</style>