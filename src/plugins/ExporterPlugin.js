/*
 * @Author: Iseven Monkey <iswoter@gmail.com>
 * @Date: 2021-02-18 11:07:53
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-02-27 00:36:13
 * @FilePath: /src/plugins/ExporterPlugin.js
 */
import saveAs from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const wordExport = (el, fileName, type, callback) => {
  console.log(fileName, type);
  if (type === "md") {
    saveAs.saveAs(
      new Blob([el], {
        type: "application/octet-stream",
      }),
      fileName + ".md"
    );
  } else {
    switch (type) {
      case "doc":
        fileName = typeof fileName !== "undefined" ? fileName : "Word-Export";
        let staticOption = {
          mhtml: {
            top:
              "Mime-Version: 1.0\nContent-Base: " +
              location.href +
              '\nContent-Type: Multipart/related; boundary="NEXT.ITEM-BOUNDARY";type="text/html"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset="utf-8"\nContent-Location: ' +
              location.href +
              "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
            head:
              '<head>\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n<style>\n_styles_\n</style>\n</head>\n',
            body: "<body>_body_</body>",
          },
        };
        const options = {
          maxWidth: 624,
        };
        console.log(el);
        // Clone selected element before manipulating it
        const markup = el.cloneNode(true);

        // Embed all images using Data URLs
        var images = Array();
        let img = markup.querySelectorAll("img");
        for (let i = 0; i < img.length; i++) {
          // Calculate dimensions of output image
          const w = Math.min(img[i].width, options.maxWidth);
          const h = img[i].height * (w / img[i].width);
          // Create canvas for converting image to data URL
          let canvas = document.createElement("CANVAS");
          canvas.width = w;
          canvas.height = h;
          // Draw image to canvas
          let context = canvas.getContext("2d");
          context.drawImage(img[i], 0, 0, w, h);
          // Get data URL encoding of image
          const uri = canvas.toDataURL("image/png");
          img[i].setAttribute("src", img[i].src);

          img[i].width = w;
          img[i].height = h;
          // Save encoded image to array
          images[i] = {
            type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
            encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
            location: img[i].getAttribute("src"),
            data: uri.substring(uri.indexOf(",") + 1),
          };
        }

        // Prepare bottom of mhtml file with image data
        let mhtmlBottom = "\n";
        for (var i = 0; i < images.length; i++) {
          mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
          mhtmlBottom += "Content-Location: " + images[i].location + "\n";
          mhtmlBottom += "Content-Type: " + images[i].type + "\n";
          mhtmlBottom +=
            "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
          mhtmlBottom += images[i].data + "\n\n";
        }
        mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

        //TODO: load css from included stylesheet
        const styles = "";

        // Aggregate parts of the file together
        const fileContent =
          staticOption.mhtml.top.replace(
            "_html_",
            staticOption.mhtml.head.replace("_styles_", styles) +
              staticOption.mhtml.body.replace(
                "_body_",
                '<h2 style="text-align:center">' +
                  fileName +
                  "</h2>" +
                  markup.innerHTML
              )
          ) + mhtmlBottom;

        // Create a Blob with the file contents
        const blob = new Blob([fileContent], {
          type: "application/msword;charset=utf-8",
        });
        saveAs(blob, fileName + ".doc");

        break;

      default:
        html2canvas(el, {
          allowTaint: true,
          taintTest: false,
          dpi: "300",
          background: "#fff",
          scale: 3, // 提升画面质量，但是会增加文件大小
        }).then(function (canvas) {
          /**jspdf将html转为pdf一页显示不截断，整体思路：
           * 1. 获取DOM
           * 2. 将DOM转换为canvas
           * 3. 获取canvas的宽度、高度（稍微大一点）
           * 4. 将pdf的宽高设置为canvas的宽高
           * 5. 将canvas转为图片
           * 6. 实例化jspdf，将内容图片放在pdf中（因为内容宽高和pdf宽高一样，就只需要一页，也防止内容截断问题）
           */

          // 得到canvas画布的单位是px 像素单位
          var contentWidth = canvas.width;
          var contentHeight = canvas.height;

          console.log("contentWidth", contentWidth);
          console.log("contentHeight", contentHeight);
          // 将canvas转为base64图片
          var pageData = canvas.toDataURL("image/jpeg", 1.0);

          // 设置pdf的尺寸，pdf要使用pt单位 已知 1pt/1px = 0.75   pt = (px/scale)* 0.75
          // 2为上面的scale 缩放了2倍
          var pdfX = ((contentWidth + 10) / 2) * 0.75;
          var pdfY = ((contentHeight + 500) / 2) * 0.75; // 500为底部留白

          // 设置内容图片的尺寸，img是pt单位
          var imgX = pdfX;
          var imgY = (contentHeight / 2) * 0.75; //内容图片这里不需要留白的距离

          // 初始化jspdf 第一个参数方向：默认''时为纵向，第二个参数设置pdf内容图片使用的长度单位为pt，第三个参数为PDF的大小，单位是pt
          var PDF = new jsPDF("", "pt", [pdfX, pdfY]);

          // 将内容图片添加到pdf中，因为内容宽高和pdf宽高一样，就只需要一页，位置就是 0,0
          PDF.addImage(pageData, "jpeg", 10, 10, imgX, imgY);
          PDF.save(fileName + ".pdf");
        });
        break;
    }
  }
};
export default wordExport;
