/* eslint eqeqeq: 0 */
/*
 * @Descripttion: [表达式]
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-04-13 12:57:36
 * @LastEditors: Swoter
 * @LastEditTime: 2020-09-24 08:20:03
 */

export default {
  /* 内容判断****************************************/

  isURL(str) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(str);
  },
  /* 小寫字母 */
  isLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
  },
  Avatar(str) {
    return this.isURL(str) ? str : "/" + str;
  },
  /* 大寫字母 */
  isUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
  },
  /* 大小寫字母 */
  isAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
  },
  /* 信箱 */
  isEmail(str) {
    const re = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    return re.test(str);
  },

  /* 手機 */
  isMobi(str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/; // 大陸手機
    const reg2 = /^09\d{2,8}$/; // 臺灣手機
    if (str != "" && (reg.test(str) || reg2.test(str))) {
      return true;
    } else {
      return false;
    }
  },
  // 判斷是否是英文標簽
  isENTag(str) {
    const re = /^[a-z0-9_-]{4,10}$/;
    return !this.isEmpty(str) && re.test(str);
  },

  /**
   *判断值是否对象
   *val 任意值
   *@return boolean
   */
  isObject(obj) {
    return typeof obj === "object";
  },

  userName(str) {
    const reg = /^[a-z0-9_-]{3,16}$/; // 用户名
    return reg.test(str);
  },
  chineseName(str) {
    const reg = /^[\u4E00-\u9FA5]{2,4}$/; // 中文姓名
    return reg.test(str);
  },
  mobile(str) {
    const reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/; // 手机
    return reg.test(str);
  },
  tel(str) {
    const reg = /^0[\d]{2,3}-[\d]{7,8}$/; // 固话
    return reg.test(str);
  },
  idCard(str) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 身份证
    return reg.test(str);
  },

  bankCard(str) {
    const reg = /^\d{16}|\d{19}$/; // 16位或19位银行卡或信用卡号(先把空格replace为空串)
    return reg.test(str);
  },
  chinese(str) {
    const reg = /[\u4E00-\u9FA5]/g; // 判断是不是中文
    return reg.test(str);
  },
  noChinese(str) {
    const reg = /[^\u4E00-\u9FA5]/g; // 判断不是中文
    return reg.test(str);
  },

  ip(str) {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    return reg.test(str);
  },
};
