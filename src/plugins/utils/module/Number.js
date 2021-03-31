/* eslint eqeqeq: 0 */
/*
 * @Descripttion: [數字處理]
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-05-09 11:23:46
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-02-22 14:58:58
 */

export default {
  getID(j) {
    if (!j) {
      j = 5;
    }
    let randomNo = "";
    for (
      let i = 0;
      i < j;
      i++ // j位随机数，用以加在时间戳后面。
    ) {
      randomNo += Math.floor(Math.random() * 10);
    }
    randomNo = new Date().getTime() + randomNo;
    return randomNo;
  },
  /**
   * 获取一个指定范围内随机数
   *
   * @param {Number} minVal 最小值
   * @param {Number} maxVal 最大值
   * @return {Number}
   */
  random(minVal, maxVal) {
    return minVal >= maxVal
      ? minVal
      : (minVal = minVal >> 0) +
          Math.round(Math.random() * ((maxVal || 9) - minVal));
  },
  /**
   *判断值是否整数
   *val 任意值
   *@return boolean
   */
  isInt(val) {
    if (val == "") {
      return false;
    }
    const reg = /\D+/;
    return !reg.test(val);
  },
  /**
   *判断值是否数字
   *val 任意值
   *@return boolean
   */
  isNumber(val) {
    const reg = /^-?[1-9]+(\.\d+)?$|^-?0(\.\d+)?$|^-?[1-9]+[0-9]*(\.\d+)?$/;
    return reg.test(val);
  },
  amount(str) {
    const reg = /^([1-9][\d]{0,10}|0)(\.[\d]{1,2})?$/; // 金额(10位整数2位小数)
    return reg.test(str);
  },
  positiveInt(str) {
    const reg = /^[1-9]*[1-9][0-9]*$/; // 正整数
    return reg.test(str);
  },
  int(str) {
    const reg = /^-?\d+$/; // 整数(不限位数)
    return reg.test(str);
  },
  toThousands(num) {
    var result = "",
      counter = 0;
    num = (num || 0).toString();
    for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result = num.charAt(i) + result;
      if (!(counter % 3) && i != 0) {
        result = "." + result;
      }
    }
    return result;
  },
};
