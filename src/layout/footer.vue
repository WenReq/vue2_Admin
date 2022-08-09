<template>
  <div class="footer">
    <a href="https://www.wenreq.site/" target="_blank"
      >2022 © Vue2 Admin By WenShaoChang Technology.</a
    >
  </div>
</template>

<script>
export default {
  name: 'SysFooter',
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.footer {
  background-color: #fff;
  border-top: 1px solid #e4e7ed;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    font-size: 14px;
    color: #858585;
    text-decoration: none;
    letter-spacing: 0.5px;
  }
}
</style>