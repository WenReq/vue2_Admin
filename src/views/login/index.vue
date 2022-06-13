<template>
  <div class="container center">
    <div class="login-content">
      <div class="content-left">
        <img src="@/assets/svg/login_left4.png" alt="" srcset="" />
      </div>
      <div class="content-right">
        <div class="login-form"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {}
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.container {
  height: 100%;
  min-width: 550px;
  min-height: 500px;
  background-color: #eee;
  background-image: url('@/assets/svg/login_bg.svg');
  background-position: 50%;
  background-size: 100% 100%;
  background-size: cover;
  .login-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 96%;
    height: 94%;
    padding: 0 4% 0 30px;
    overflow: hidden;
    background-color: #fffc;
    border-radius: 10px;
    box-sizing: border-box;
    .content-left {
      width: 800px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content-right {
      flex: 1;
      .login-form {
        width: 420px;
        padding: 50px 40px 45px;
        background-color: #fffffffa;
        border-radius: 10px;
        box-shadow: 2px 3px 7px #0003;
      }
    }
  }
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
