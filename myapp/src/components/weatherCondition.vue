<template>
  <div>
    <h2>天气概况</h2>
        <div class="top">
          <div class="left">
            <div class="left_image"> <img src="../assets/多云.jpg" alt=""></div>
            <div class="left_tem">
              <h1>37℃</h1>
              <span>郑州市|周六</span>
            </div>
          </div>
          <div class="right"> 
            <div class="right-detail" v-for="item in weather.data" :key="item.name">
              <h4>{{item.title}}</h4>
              <h4>{{item.value}}</h4>
            </div>
        </div>
          </div>


        <div class="bottom">
          <div class="b_left">
            <div class="b_left_image"> <img src="../assets/多云.jpg" alt=""></div>
            <div class="b_left_tem">
              <h1>40℃</h1>
              <span>郑州市|周日</span>
            </div>
          </div>
          <div class="b_right"> 
            <div class="b_right-detail" v-for="item2 in weather2.data" :key="item2.name">
              <h4>{{item2.title}}</h4>
              <h4>{{item2.value}}</h4>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import {reactive} from 'vue'
export default {
    setup(){
          const weather=reactive({
            data:[
            {
              title: "最高温度",
              value: '37℃',
            },
            {
              title: "最低温度",
              value: '29℃',
            },
            {
              title: "平均温度",
              value: '33℃',
            },
            {
              title: "当前湿度",
              value: '45%',
            },
            {
              title: "当前风力",
              value: '1级',
            },
            {
              title: "气压",
              value: '987phs',
            },
          
          ]
          })

           const weather2=reactive({
            data:[
            {
              title: "最高温度",
              value: '40℃',
            },
            {
              title: "最低温度",
              value: '27℃',
            },
            {
              title: "平均温度",
              value: '35℃',
            },
            {
              title: "当前湿度",
              value: '66%',
            },
            {
              title: "当前风力",
              value: '3级',
            },
            {
              title: "气压",
              value: '767phs',
            },
          
          ]
          })
          return {weather,weather2}
    }
}
</script>

<style lang="less" scoped>
h2{
    padding-left: .1333rem;
    border: 1px solid #199AC6;
    height: .4rem;
    color: #fff;
    font-weight: normal;
    line-height: .4rem;
    font-size: .2133rem;
}

  .top{
    display: flex;
    height: 1.3rem;
    .left{
      display:flex;
      flex: 1;
      .left_image{
      img{
          height: 1.3rem;
        }
      }
      .left_tem{
        margin-top: 0.22rem;
        h1{
        font-size: 18px;
        font-weight: normal;
        color:#57D8DE;
        }
        span{
        color:#53D1D7
      }
      }
    }
    .right{
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      .right-detail{
        padding:2px 0 ;
        text-align: center;
        width: .97rem;
        height: .6667rem;
        h4{
          font-size: 3px;
          color:#1FD7E5;
          font-weight: normal;
        }
      }
    }
  }
  .bottom{
    display: flex;
    height: 1.3rem;
    .b_left{
      display:flex;
      flex: 1;
      .b_left_image{
      img{
          height: 1.3rem;
        }
      }
      .b_left_tem{
        margin-top: 0.22rem;
        h1{
        font-size: 18px;
        font-weight: normal;
        color:#57D8DE;
        }
        span{
        color:#53D1D7
      }
      }
    }
    .b_right{
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      .b_right-detail{
        padding:2px 0 ;
        text-align: center;
        width: .97rem;
        height: .6667rem;
        h4{
          font-size: 3px;
          color:#1FD7E5;
          font-weight: normal;
        }
      }
    }
  }
</style>