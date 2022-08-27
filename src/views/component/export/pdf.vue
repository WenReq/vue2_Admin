<template>
    <div id="pdfPage">
        <el-button size="mini" type="primary" @click="handleExport">导出pdf</el-button>
        <div id="pdfDom" style="background-color: white">
            <img src="@/assets/logo.png" alt="" srcset="">
            <p v-for="(item, index) in 150" :key="index">
                {{ item }} Welecome to Your Vue.js App
            </p>
        </div>
    </div>
</template>
<script>
import htmlToPdf from '@/utils/htmlToPdf'
export default {
    data() {
        return {
            htmlTitle: 'wenshaochang',
        }
    },
    methods: {
        handleExport() {
            htmlToPdf.getPdf(this.htmlTitle);
        }
    },
}
</script>
<style lang="less">
#pdfPage {
    text-align: center;
}
</style>