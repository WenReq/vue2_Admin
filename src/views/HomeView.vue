<template>
  <div class="container">
    <img alt="home_img" src="@/assets/img/welcome.png" />
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 75%;
  }
}
</style>
