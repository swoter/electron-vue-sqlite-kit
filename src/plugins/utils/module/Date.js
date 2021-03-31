/* eslint eqeqeq: 0 */
/*
 * @Descripttion: [日期]
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-04-13 12:57:19
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-02-17 15:47:13
 */
import String from "./String";

export default {
  /* 时间*****************************************/
  /**
   *将日期时间转换为时间戳
   *a，time 格式 2013-3-15 12: 12；
   *@return Number
   */
  /**
   * @description: [时间] 将日期时间转换为时间戳
   * @Author: Swoter
   * @Date: 2020-04-07 13:30:19
   * @param {String} a 时间 格式 2013-3-15 12: 12；
   * @return: Number
   */
  time(a) {
    if (this.isEmpty(a)) {
      return Date.parse(new Date()) / 1000;
    }
    if (this.isNumber(a)) {
      return a;
    }
    const b = a.substring(0, 10).split("-");
    let dot = "-";
    let c = a.substring(10, 19);
    if (this.Browser().isFirefox || this.Browser().isMozilla) dot = "/";
    if (c == "") c = "00:00:00";
    return Date.parse(b[1] + dot + b[2] + dot + b[0] + " " + c) / 1000;
  },
  now() {
    return this.time();
  },
  /**
   * @description: [时间] 时间戳格式化为指定格式日期
   * @Author: Swoter
   * @Date: 2020-04-07 14:01:28
   * @param {Number}  time 时间戳
   * @param {String}  cFormat 日期格式  默认 {y}-{m}-{d} {h}:{i}:{s} 星期{a}
   * @return: String 日期
   */
  dateTimeFormat(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time === "object") {
      date = time;
    } else {
      if (("" + time).length === 10) time = parseInt(time) * 1000;
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    const timeStr = format.replace(
      /{(y|m|d|h|i|s|a)+}/g,
      function (result, key) {
        let value = formatObj[key];
        if (key === "a") {
          return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        if (result.length > 0 && value < 10) {
          value = "0" + value;
        }
        return value || 0;
      }
    );
    return timeStr;
  },

  /**
   *计算剩余时间 取得 b 时间否较a 时间 到b时间之间剩余秒数
   *a，time 格式 2013-3-15 12: 12；b，time 格式 2013-3-15 12: 12。
   *@return Number
   */
  lastTime(a, b) {
    const l = this.time(b) - this.time(a);
    return l;
  },
  /**
   * 返回兩個日期之間差距
   * @param {*} startDate 開始日期，Date對象、時間戳、2017-12-10 10:08:59
   * @param {*} endDate 結束日期，Date對象、時間戳、2017-12-10 10:08:59
   */
  toDateDiffText(startDate, endDate) {
    const diff = this.lastTime(startDate, endDate);

    if (diff) {
      if (diff >= 31536000) {
        return parseInt(diff / 31536000) + "年前";
      }
      if (diff >= 2592000) {
        return parseInt(diff / 2592000) + "個月前";
      }
      if (diff >= 86400) {
        return parseInt(diff / 86400) + "天前";
      }
      if (diff >= 3600) {
        return parseInt(diff / 3600) + "小時前";
      }
      if (diff >= 60) {
        return parseInt(diff / 60) + "分鍾前";
      }

      if (diff > 30) {
        return diff + "秒前";
      }
      if (diff < 30) {
        return "刚刚";
      }
    }
    return "錯誤類型";
  },
  /**
   *获取当前时间
   * @return String
   */

  dateTime(f) {
    return this.dateTimeFormat(this.time(), f);
  },
  /**
   *计算b前时间，距离a时间剩余多时间
   *a，time 格式 2013-3-15 12: 12；
   *@return String
   */
  timeDown(a, b, c) {
    if (!b) {
      b = this.time();
    }
    if (b == "") {
      return "";
    }

    const l = this.lastTime(a, b);

    if (l <= 0) {
      return "";
    }
    const r = {};

    r.s = Math.floor(l % 60); // 计算秒
    r.i = Math.floor((l / 60) % 60); // 计算分
    r.h = Math.floor((l / 3600) % 24); // 计算小时
    r.d = Math.floor(l / 3600 / 24); // 计算天

    if (c == 1) {
      return r;
    }
    return (
      (r.d != "" ? r.d + "天" : "") +
      (r.h != "" ? r.h + "小时" : "") +
      (r.i != "" ? r.i + "分" : "") +
      (r.s != "" ? r.s + "秒" : "")
    );
  },
  /**
   *判断值是否是时间格式
   *val 任意值
   *@return boolean
   */

  isTime(val) {
    const reg = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;
    return reg.test(val);
  },
  toTimestamp(strDate) {
    var newstr = strDate.replace(/-/g, "/").replace("T", " ").replace("Z", "");
    newstr = newstr.split(".")[0];
    var date = new Date(newstr);
    var time_str = date.getTime().toString();
    return time_str.substr(0, 10);
  },

  timeISOStringFormat(time, format) {
    return this.dateTimeFormat(this.toTimestamp(time), format);
  },

  timeToISOString(time) {
    return String.isEmpty(time) ? "" : new Date(time).toISOString();
  },
};
