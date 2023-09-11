<template>
  <router-view/>
</template>

<script>
import {provide} from "vue"
import * as echarts from "echarts"
import * as axios from "axios"
export default{
  setup(){
    // provide("随便","传递的内容");
    provide("echarts",echarts);
    provide("axios",axios);
  }
}
</script>

<style lang="less">
body{
  // 添加背景图
  background: url("./assets/新背景.jpg") top center no-repeat;
  background-attachment: fixed;
  background-size:cover;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul{
  list-style: none;
}
</style>
