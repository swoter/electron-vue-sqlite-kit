/*
 * @Author: Iseven Monkey <iswoter@gmail.com>
 * @Date: 2021-02-18 08:57:50
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-03-05 12:16:30
 * @FilePath: /src/plugins/AxiosPlugin.js
 */

"use strict";

import Vue from "vue";
import axios from "axios";
import Config from "../config";
import utils from "./utils";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: Config.baseURL || "",
  timeout: 360 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  headers: {
    "Content-Type": "application/json",
  },
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    if (process.env.NODE_ENV === "production") {
      config.baseURL = Config.baseURL;
      if (config.url.includes(Config.api.signin)) {
        config.baseURL = Config.signinUrl;
      }
    }
    return config;
  },
  function (error) {
    utils.error(error);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data.data;
  },
  function (error) {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      error.message = "连接到服务器失败";
    }
    utils.error(error.message);
    // Do something with response error
    return Promise.reject(error);
  }
);
//qs.stringify(data, {arrayFormat: 'indices', allowDots: true})
Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
