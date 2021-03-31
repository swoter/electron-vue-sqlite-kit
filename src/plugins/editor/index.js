/*
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-11-29 18:27:39
 * @LastEditors: Swoter
 * @LastEditTime: 2020-11-29 19:06:42
 */
import Vue from "vue";

import editor from "./editor";
Vue.use(editor, {
  hideModules: {
    bold: false,
  },
  locale: "zh",
});
