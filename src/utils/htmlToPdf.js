import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';

const htmlToPdf = {
    getPdf(title) {
        // 参数一：要导出的 dom 元素
        html2canvas(document.querySelector('#pdfDom'), {
            // 是否允许跨源图像污染画布
            allowTaint: false,
        }).then((canvas) => {
            console.log(canvas)
            // 内容的宽度
            let contentWidth = canvas.width;
            // 内容的高度
            let contentHeight = canvas.height;
            // 一页 pdf 显示 html 页面生成端 canvas 高度，a4 纸的尺寸（595.28, 841.89）
            let pageHeight = (contentWidth / 592.28) * 841.89;
            // 未生成 pdf 的 html 页面高度
            let leftHeight = contentHeight;
            // 页面偏移
            let position = 0;
            // a4 纸的尺寸（595.28, 841.89），html 页面生成的 canvas 在 pdf 中图片的高度
            let imgWidth = 595.28;
            let imgHeight = (595.28 / contentWidth) * contentHeight;
            // canvas 转图片数据
            let pageData = canvas.toDataURL("image/jpeg", 1.0);
            // 新建 jsPdf 对象。参数1：是横向还是竖向排列；参数二：单位；参数三：试纸类型。
            let PDF = new jsPdf("", "pt", "a4");
            debugger
            // 判断是否分页
            if (leftHeight < pageHeight) {
                PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
            } else {
                while (leftHeight > 0) {
                    PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    if (leftHeight > 0) {
                        PDF.addPage();
                    }
                }
            }
            // 保存文件
            PDF.save(title + ".pdf");
        });
    }
}

export default htmlToPdf;