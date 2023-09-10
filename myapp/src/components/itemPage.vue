<template>
  <div class="item">
    <!-- 设置插槽  -->    
    <slot></slot>
  </div>
</template>

<script>
export default {
    setup(){
        
    }
}
</script>

<style lang="less" scoped>
.item{
    height: 3.6rem;
    border: 1px solid #199AC6;
    margin: .25rem;
}
</style>