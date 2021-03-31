/* eslint eqeqeq: 0 */
/*
 * @Descripttion: [字符]
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-04-13 12:57:53
 * @LastEditors: AA
 * @LastEditTime: 2021-03-08 08:29:56
 */

export default {
  /**
   *判断值是否为空
   *val 任意值
   *@return boolean
   */
  isEmpty(val) {
    switch (typeof val) {
      case "string":
        return val.length == 0;

      case "number":
        return val == 0;

      case "object":
        for (const name in val) {
          return false;
        }
        return true;

      case "array":
        return val.length == 0;

      default:
        return true;
    }
  },
  inStr(needle, str) {
    if (str.indexOf(needle) > -1) {
      return true;
    } else {
      return false;
    }
  },
  /**
   *判断值是否是null
   *val 任意值
   *@return boolean
   */
  isNull(val) {
    return !!(typeof val === "undefined" || val == null || val == "");
  },

  /**
   *判断值是否是undefined
   *val 任意值
   *@return boolean
   */
  isUndefined(val) {
    return typeof val === "undefined";
  },
  /**
   *清除两端空格
   *str 任意值
   *@return string
   */
  trim(str) {
    if (this.isEmpty(str)) {
      return "";
    } else {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
  },
  /**
   * 获取字符串字节长度
   * @param {*} str 字符串
   */
  len(str) {
    let length = 0;
    const reg = /[\u4E00-\u9FA5]/;
    for (let i = 0; i < str.length; i++) {
      if (reg.test(str.charAt(i))) {
        length += 2;
      } else {
        length++;
      }
    }
    return length;
  },

  /**
   *字符串截取函数
   *str，String，需要截取的字符；len，Int， 截取字符数量;hasDot，String， 字符截取后增加的后缀
   *@return String
   */
  cut(str, len, hasDot) {
    if (this.isEmpty(str)) {
      return str;
    }
    let strlen = 0;
    let s = "";
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 128) {
        strlen += 2;
      } else {
        strlen++;
      }
      s += str.charAt(i);
      if (strlen >= len) {
        if (!this.isNull(hasDot)) {
          s += hasDot;
        }
        return s;
      }
    }

    return s;
  },
  /**
   *字符串隐藏函数，但只返回字符串的第一个字母和最后一个字母
   *str，String，需要截取的字符；
   *@return String
   */
  subStr(str, firstLen, lastLen) {
    if (this.isNumber(str)) {
      str = str.toString();
    }
    firstLen = parseInt(firstLen);
    if (isNaN(firstLen)) {
      firstLen = 1;
    }
    lastLen = parseInt(lastLen);
    if (isNaN(lastLen)) {
      lastLen = 1;
    }
    let s = "";
    let m = "";
    let e = "";
    const len = str.length;
    let re = "";
    for (let i = 0; i < len; i++) {
      if (firstLen > 0 && i < firstLen) {
        s += str.charAt(i);
      }
      if (lastLen > 0 && i >= len - lastLen) {
        e += str.charAt(i);
      }
    }
    if (len - (firstLen + lastLen) > 0) {
      for (let i = 0; i < len - (firstLen + lastLen); i++) {
        m += "*";
      }
    }
    if (m == "") {
      m = "***";
    }
    if (firstLen > 0) {
      re += s;
    }
    re += m;
    if (lastLen > 0) {
      re += e;
    }
    return re;
  },
  replaceAll(s1, s2, str) {
    if (this.isEmpty(str)) {
      return "";
    }
    str = str.replace(s1, s2);
    if (str.includes(s1)) {
      str = this.replaceAll(s1, s2, str);
    }
    return str;
  },
  /**
   *过滤文本中的制表符
   *text，String
   * @return String
   */
  cleanTabs(text) {
    if (typeof text !== "string" || this.isEmpty(text)) {
      return "";
    }

    text = this.replaceAll("\r\n", "", text);
    text = this.replaceAll("\r", "", text);
    text = this.replaceAll("\n", "", text);
    text = this.replaceAll("\t", "", text);
    return text;
  },
  stripTags(html) {
    html = html || "";
    return html
      .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, "")
      .replace(/<\/?.+?>/g, "")
      .trim();
  },
  stripAlt(html) {
    html = html || "";
    return html.replace(/<img[^>]*>/gi, function (match) {
      return match.replace(/alt\s*?=\s*?(['"])[\s\S]*?\1/gi, "").trim();
    });
  },
  stripFaceBookImg(html) {
    html = html || "";
    return html
      .replace(/<img[^>]*>/gi, function (match) {
        return match.includes("facebook") ? "" : match;
      })
      .trim();
  },
  getDescText(text) {
    text = text || "";
    text = this.stripTags(text);
    text = this.cleanTabs(text);
    text = this.replaceAll(" ", "", text);
    text = this.replaceAll("&nbsp;", "", text);
    text = this.cut(text, 250, "");
    return text;
  },
  /**
   *过滤HTML字符
   *text，String
   * @return String
   */
  htmlEncode(text) {
    if (typeof text !== "string" || this.isEmpty(text)) {
      return "";
    }
    return text
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },

  escape(html) {
    // 1.首先动态创建一个容器标签元素，如DIV
    let temp = document.createElement("div");
    // 2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
    temp.textContent != undefined
      ? (temp.textContent = html)
      : (temp.textContent = html);
    // 3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    const output = temp.innerHTML;
    temp = null;
    return output;
  },
  unescape(text) {
    // 1.首先动态创建一个容器标签元素，如DIV
    let temp = document.createElement("div");
    // 2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text;
    // 3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
    const output = temp.textContent || temp.textContent;
    temp = null;
    return output;
  },
  /*
        判断字符类型
    */
  CharStrMode(iN) {
    if (iN >= 48 && iN <= 57)
      // 数字
      return 1;
    if (iN >= 65 && iN <= 90)
      // 大写字母
      return 2;
    if (iN >= 97 && iN <= 122)
      // 小写
      return 4;
    else return 8; // 特殊字符
  },
  /*
        统计字符类型
    */
  bitTotal(num) {
    let modes = 0;
    for (let i = 0; i < 4; i++) {
      if (num & 1) modes++;
      num >>>= 1;
    }
    return modes;
  },

  /*
          返回密码的强度级别
      */
  checkPasswordStrong(sPW) {
    if (sPW.length <= 4) return 0; // 密码太短
    let Modes = 0;
    for (let i = 0; i < sPW.length; i++) {
      Modes |= this.CharStrMode(sPW.charCodeAt(i));
    }
    return this.bitTotal(Modes);
  },
  nl2br(str, isXhtml) {
    if (typeof str === "undefined" || str === null) {
      return "";
    }
    const breakTag =
      isXhtml || typeof isXhtml === "undefined" ? "<br />" : "<br>";
    return (str + "").replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
      "$1" + breakTag + "$2"
    );
  },
  addslashes(s) {
    if (this.isEmpty(s) || this.typeOf(s) !== "string") return s;
    return s
      .replace(/\\/g, "\\\\")
      .replace(/\u0008/g, "\\b")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\f/g, "\\f")
      .replace(/\r/g, "\\r")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');
  },
  typeOf(o) {
    var _toString = Object.prototype.toString;
    var _type = {
      undefined: "undefined",
      number: "number",
      boolean: "boolean",
      string: "string",
      "[object Function]": "function",
      "[object RegExp]": "regexp",
      "[object Array]": "array",
      "[object Date]": "date",
      "[object Error]": "error",
    };
    return (
      _type[typeof o] || _type[_toString.call(o)] || (o ? "object" : "null")
    );
  },
  randomString(len) {
    len = len || 32;
    var chars =
      "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = chars.length;
    var pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
};
//eslint-disable-line
