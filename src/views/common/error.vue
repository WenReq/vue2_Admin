<template>
  <div class="container">
    <img src="@/assets/img/404.png" alt="404" srcset="" />
    <div class="right">
      <h2>404</h2>
      <div class="not-desc">抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</div>
      <el-button class="btn" type="primary" size="small" @click="handleBackHome"
        >返回首页</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  data() {
    return {}
  },
  methods: {
    handleBackHome() {
      this.$router.push({ path: '/home' })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  img {
    margin-right: 120px;
  }
  .right {
    display: flex;
    flex-direction: column;
    .not-desc {
      margin-bottom: 20px;
      font-size: 19px;
      color: #848587;
    }
    h2 {
      margin-bottom: 30px;
      font-size: 60px;
      font-weight: 700;
      color: #434e59;
      text-align: left;
    }
    .btn {
      width: 100px;
    }
  }
}
</style>
