/* eslint eqeqeq: 0 */
/*
 * @Descripttion: [数组]
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-04-13 12:56:24
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-02-26 14:47:23
 */
import StringX from "./String";
export default {
  /**
   *压缩图片转成base64
   *param      {string} url 图片路径
   *param      {int} width 图片压缩宽度
   *param      {int} height 图片压缩高度
   *param      {boolean} force 强制宽高比
   *param      {object} callback 回调函数
   *param      {string} outputFormat 图像格式，默认为png
   * @return String
   */
  getBase64Image(url, /*  width, height, force, */ callback, outputFormat) {
    var canvas = document.createElement("CANVAS"),
      ctx = canvas.getContext("2d"),
      img = new Image();

    img.crossOrigin = "Anonymous";
    img.onload = function () {
      /*       if (!force) {
        if (img.width > img.height) {
          if (img.width > width) {
            height = Math.round((img.height *= width / img.width));
          }
        } else {
          if (img.height > height) {
            width = Math.round((img.width *= height / img.height));
          }
        }
      } */
      const width = img.width,
        height = img.height;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      var dataURL = canvas.toDataURL(outputFormat || "image/png");

      if (typeof callback == "function") {
        callback(this, dataURL);
      }

      canvas = null;
    };
    img.src = url;
  },
};
