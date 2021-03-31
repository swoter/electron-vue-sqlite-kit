/* eslint eqeqeq: 0 */
/*
 * @Descripttion: [浏览器]
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-04-13 12:57:06
 * @LastEditors: Swoter
 * @LastEditTime: 2020-09-27 16:28:26
 */

export default {
  /**
   * @description: [Browser] 取得浏览器类型
       @Author: Swoter *
       @Date: 2020 - 04 - 07 13: 19: 28 *
       @param {
           type
       }
   * @return Array
   */
  Browser() {
    if (process.client) {
      return {
        isMozilla:
          typeof document.implementation !== "undefined" &&
          typeof document.implementation.createDocument !== "undefined" &&
          typeof HTMLDocument !== "undefined",
        isIE: !!window.ActiveXObject,
        isFirefox: navigator.userAgent.toLowerCase().includes("firefox"),
        isSafari: navigator.userAgent.toLowerCase().includes("safari"),
        isOpera: navigator.userAgent.toLowerCase().includes("opera"),
      };
    }
  },

  homeUrl() {
    if (process.client) {
      let localBaseUrl = window.location.protocol + "//";
      localBaseUrl += window.location.host + "/";

      return localBaseUrl;
    }
  },
  /**
   * 判断浏览器类型
   * @returns {*}
   */
  browserType() {
    const sUA = navigator.userAgent;
    // 检测IE浏览器
    if (navigator.appName == "Microsoft Internet Explorer") {
      // 检测模拟IE浏览的OPERA。edit at 2006-11-08(ver 0.1.2)
      if (sUA.includes("Opera")) {
        this.browseKernel = "Presto";
        if (window.opera && document.childNodes) {
          return "Opera 7+";
        } else {
          return "Opera 6-";
        }
      }
      this.browseKernel = "Trident";
      if (sUA.includes("Maxthon")) {
        return "Maxthon";
      }
      if (sUA.includes("TencentTraveler")) {
        // ver 0.1.3
        return "腾迅TT";
      }
      if (document.getElementById) {
        return "IE5+";
      } else {
        return "IE4-";
      }
    }
    // 检测Gecko浏览器
    if (sUA.includes("Gecko")) {
      this.browseKernel = "Gecko";
      if (navigator.vendor == "Mozilla") {
        return "Mozilla";
      }
      if (navigator.vendor == "Firebird") {
        return "Firebird";
      }
      if (navigator.vendor.includes("Google") || sUA.includes("Google")) {
        return "Google";
      }
      if (sUA.includes("Firefox")) {
        return "Firefox";
      }
      return "Gecko";
    }
    // Netscape浏览器
    if (sUA.includes("Netscape")) {
      this.browseKernel = "Gecko";
      if (document.getElementById) {
        return "Netscape 6+";
      } else {
        return "Netscape 5-";
      }
    }
    // 检测Safari浏览器
    if (sUA.includes("Safari")) {
      this.browseKernel = "KHTML";
      return "Safari";
    }
    if (sUA.includes("konqueror")) {
      this.browseKernel = "KHTML";
      return "Konqueror";
    }
    // 目前世界公认浏览网页速度最快的浏览器，但它占用的系统资源也很大。
    if (sUA.includes("Opera")) {
      this.browseKernel = "Presto";
      if (window.opera && document.childNodes) {
        return "Opera 7+";
      } else {
        return "Opera 6-";
      }
    }
    if (
      sUA.includes("hotjava") &&
      typeof navigator.accentColorName === "undefined"
    ) {
      return "HotJava";
    }
    if (
      document.all &&
      document.getElementById &&
      navigator.savePreferences &&
      !sUA.includes("netfront") &&
      navigator.appName != "Blazer"
    ) {
      return "Escape 5";
    }
    // Konqueror / Safari / OmniWeb 4.5+
    if (
      navigator.vendor == "KDE" ||
      (document.childNodes &&
        (!document.all || navigator.accentColorName) &&
        !navigator.taintEnabled)
    ) {
      this.browseKernel = "KHTML";
      return "KDE";
    }
    if (navigator.__ice_version) {
      return "ICEbrowser";
    }

    if (document.layers && !document.classes) {
      return "Omniweb 4.2-";
    }
    if (document.layers && !navigator.mimeTypes["*"]) {
      return "Escape 4";
    }
    if (navigator.appName.indexOf("WebTV") + 1) {
      return "WebTV";
    }
    if (sUA.includes("netgem")) {
      return "Netgem NetBox";
    }
    if (sUA.includes("opentv")) {
      return "OpenTV";
    }
    if (sUA.includes("ipanel")) {
      return "iPanel MicroBrowser";
    }
    if (document.getElementById && !document.childNodes) {
      return "Clue browser";
    }
    if (
      document.getElementById &&
      (sUA.includes("netfront") || navigator.appName == "Blazer")
    ) {
      return "NetFront 3+";
    }
    if (sUA.indexOf("msie") + 1 && window.ActiveXObject) {
      return "Pocket Internet Explorer";
    }
    return "Unknown";
  },
  /**
   * @description: [Browser] 取得用户IP
   * @Author: Swoter
   * @Date: 2020-04-07 13:19:28
   * @param {type}
   * @return:
   */
  getClientIP(req) {
    //  onNewIp - your listener function for new IPs
    return (
      req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      req.connection.socket.remoteAddress
    );
  },
  /**
   * @description: [Browser] 哦按段是否为手机端
   * @Author: Swoter
   * @Date: 2020-04-07 13:21:38
   * @return: Boolean
   */
  isPhone() {
    if (process.client) {
      return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
    }
  },
  /**
   * @description: [Browser] 取得浏览器语言
   * @Author: Swoter
   * @Date: 2020-04-07 13:22:27
   * @return: String
   */
  getBrowerLanguage() {
    const lang = navigator.language || navigator.userLanguage; // 常规浏览器语言和IE浏览器
    return lang;
  },

  /**
   * @description: [Browser] 获取客户端操作系统
   * @Author: Swoter
   * @Date: 2020-04-07 13:23:16
   * @return: Array [系统名称， 版本号]
   */
  getOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    let name = "Unknown";
    let version = "Unknown";
    if (userAgent.includes("win")) {
      name = "Windows";
      if (userAgent.includes("windows nt 5.0")) {
        version = "Windows 2000";
      } else if (
        userAgent.includes("windows nt 5.1") ||
        userAgent.includes("windows nt 5.2")
      ) {
        version = "Windows XP";
      } else if (userAgent.includes("windows nt 6.0")) {
        version = "Windows Vista";
      } else if (
        userAgent.includes("windows nt 6.1") ||
        userAgent.includes("windows 7")
      ) {
        version = "Windows 7";
      } else if (
        userAgent.includes("windows nt 6.2") ||
        userAgent.includes("windows 8")
      ) {
        version = "Windows 8";
      } else if (userAgent.includes("windows nt 6.3")) {
        version = "Windows 8.1";
      } else if (
        userAgent.includes("windows nt 6.2") ||
        userAgent.includes("windows nt 10.0")
      ) {
        version = "Windows 10";
      } else {
        version = "Unknown";
      }
    } else if (userAgent.includes("iphone")) {
      name = "Iphone";
    } else if (userAgent.includes("mac")) {
      name = "Mac";
    } else if (
      userAgent.includes("x11") ||
      userAgent.includes("unix") ||
      userAgent.includes("sunname") ||
      userAgent.includes("bsd")
    ) {
      name = "Unix";
    } else if (userAgent.includes("linux")) {
      if (userAgent.includes("android")) {
        name = "Android";
      } else {
        name = "Linux";
      }
    } else {
      name = "Unknown";
    }
    return {
      name,
      version,
    };
  },

  /**
   * @description: [Browser] 获取页面title
   * @Author: Swoter
   * @Date: 2020-04-07 13:23:56
   * @param {type}
   * @return:
   */
  getPageTitle() {
    return document.title;
  },
  /**
   *获取URL中的变量
   *item 任意值
   *@return String
   */
  q(item, url) {
    if (this.isEmpty(url)) {
      url = location.search;
    }
    const sValue = url.match(new RegExp("[?&]" + item + "=([^&]*)(&?)", "i"));
    return sValue ? sValue[1] : sValue;
  },
  /**
   *删除URL中的变量
   *loca URL
   *name 要删除的变量
   *@return String
   */
  qDel(url, ref) {
    let str = "";
    url = url.toString();
    if (url != "" && url.includes("?")) {
      str = url.substr(url.indexOf("?") + 1);
    } else {
      return url;
    }
    let arr = "";
    let returnurl = "";
    if (str.includes("&")) {
      arr = str.split("&");
      for (const i in arr) {
        if (arr[i].split("=")[0] != ref) {
          returnurl =
            returnurl + arr[i].split("=")[0] + "=" + arr[i].split("=")[1] + "&";
        }
      }
      return (
        url.substr(0, url.indexOf("?")) +
        "?" +
        returnurl.substr(0, returnurl.length - 1)
      );
    } else {
      arr = str.split("=");
      if (arr[0] == ref) {
        return url.substr(0, url.indexOf("?"));
      } else {
        return url;
      }
    }
  },
};
