<!--
 * @Descripttion: 首页
 * @Author: wenshaochang
 * @Date: 2022-06-16 19:43:07
 * @LastEditors: wenshaochang
 * @LastEditTime: 2022-06-18 16:28:29
-->
<template>
  <div class="container">
    <img alt="home_img" src="@/assets/img/welcome.png" />
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 90%;
  }
}
</style>
