<template>
  <div>
   <header>
    <div class="realtime">
      <p>{{time}}</p>
      <p>{{week}}</p>
      <span>天气:多云</span>    
    </div>
    <div class="title">
      <h1>河南省负荷预测系统</h1>
    </div>
    <!-- 系统按钮 -->
    <el-row class="nav">
    <el-button style="background-color: #0C4D63;border:1px #1689B1 solid;">首页</el-button>
    <el-button style="background-color: #0C4D63;border:1px #1689B1 solid;">数据看板</el-button>
    <el-button style="background-color: #0C4D63;border:1px #1689B1 solid;">数据看板</el-button>
    <!-- 下拉菜单 -->
   <div class="flex flex-wrap items-center" style="margin-left: 10px;">
    <el-dropdown>
      <el-button style="background-color: transparent;border: 0;">
      <el-icon><UserFilled /></el-icon>
      Admin<el-icon><ArrowDown/></el-icon>
      </el-button>
      <template #dropdown>
        <!-- 下拉菜单 -->
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
    </el-row> 
   </header>
   <!-- 大容器 -->
   <section class="container">
    <!-- 左容器 -->
    <section class="itemLeft">
      <!-- 左侧三个小容器 -->
      <ItemPage>
        <!-- 今日预警 -->
        <todayWarning/>
      </ItemPage>
      <ItemPage>
        <!-- 明日预警 -->
        <tomorrowWarning/>
      </ItemPage>
      <ItemPage>
        <!-- 每月最大/最小负荷 -->
        <monthLoad/>
      </ItemPage>
    </section>
    <!-- 中容器 -->
    <section class="itemCenter">
        <section>
          <centerTop></centerTop>
          <centerMap></centerMap>
          <centerBottom></centerBottom>
        </section>
    </section>
    <!-- 右容器 -->
    <section class="itemRight">
      <ItemPage>
        <!-- 天气概况 -->
        <weatherCondition/>
      </ItemPage>
      <ItemPage>
        <!-- 明日预测曲线 -->
        <tomorrowPrediction/>
      </ItemPage>
      <ItemPage>
        <!-- 准确率统计 -->
        <accuracyRate/>
      </ItemPage>
    </section>
   </section>
  </div>
</template>

<script>
import ItemPage from '../components/itemPage.vue';
import accuracyRate from '../components/accuracyRate';
import monthLoad from '../components/monthLoad.vue';
import todayWarning from '../components/todayWarning';
import tomorrowPrediction from '../components/tomorrowPrediction';
import tomorrowWarning from '../components/tomorrowWarning';
import weatherCondition from '../components/weatherCondition';
import centerTop from '../components/centerTop';
import centerMap from '../components/centerMap';
import centerBottom from '../components/centerBottom';
import {inject,ref} from 'vue';
export default {
  components:{ ItemPage,accuracyRate,monthLoad,todayWarning,tomorrowPrediction,tomorrowWarning,weatherCondition,centerTop,centerMap,centerBottom},
  setup(){
    // 实时时间显示
    const time = ref('')
    const week = ref('')
    setInterval(() => {
      const date = new Date()
      time.value = formatDate(date)
      week.value = formatWeek(date)
    }, 1000)
    // 格式化时间
    function formatDate(date) {
      const year = date.getFullYear()
      const month = addZero(date.getMonth() + 1)
      const day = addZero(date.getDate())
      const hours = addZero(date.getHours())
      const minutes = addZero(date.getMinutes())
      const seconds = addZero(date.getSeconds())
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
    // 格式化周几
    function formatWeek(date) {
      const weekList = ['日', '一', '二', '三', '四', '五', '六']
      const weekIndex = date.getDay()
      return `星期${weekList[weekIndex]}`
    }
    // 补零操作
    function addZero(value) {
      return value < 10 ? `0${value}` : value
    }
// 引入echarts跟axios
    let $echarts=inject("echarts")
    let $http=inject("axios")
    console.log($echarts);
    console.log($http);

    return {
      time,
      week
    }
  }
  } 
</script>

<style lang="less" scoped>
// 头部区域
  header{
    box-sizing: border-box;
    display: flex;
    color: #fff;
    height: 1rem;
    width: 100%;
    .realtime{
      margin-left:40px;
      color:#1EBDF3;
      flex: 3;
      display: flex;
      align-items: center;
      p{
        flex: 1;
      }
      span{
        flex: 2;
      }
    }
    .title{
      flex: 5;
      width: 100%;
      h1{
        font-size: 0.375rem;
        color: #fff;
        text-align: center;
        line-height: 1rem;
      }
    }
    .nav{
      flex: 3;
      justify-content: space-around;
      align-content: center;
    }
  }
  // 大容器的样式
  .container{
    // 最大最小的宽度
    margin: 0 auto;
    padding: .125rem .125rem 0;
    display: flex;
    // 设置左右在页面的份数
    .itemLeft,.itemRight{
      flex: 3;
    }
    .itemCenter{
      flex: 5;
    }
  }
</style>
