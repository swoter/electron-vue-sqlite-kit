/*
 * @Description:
 * @CopyRight: Tapp Commerce
 * @Author: Iseven Monkey <iswoter@gmail.com>
 * @Date: 2021-03-31 17:06:22
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-03-31 19:56:24
 * @FilePath: /src/main.js
 */
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { ipcRenderer } from "electron";
import config from "./config";
import perScrollbar from "vue-perfect-scrollbar";
import MetaInfo from "vue-meta-info";
import Clipboard from "v-clipboard";
import "./plugins/AxiosPlugin";
import "./plugins/ElementUI";
import "./plugins/mover";
import "font-awesome/css/font-awesome.css";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import utils from "./plugins/utils";
import DB from "./plugins/db";
ipcRenderer.on("userDataPath", (e, res) => {
  console.log("----------------------------", e, res);
  localStorage.setItem("userDataPath", res);
  Vue.prototype.$db = new DB(res);
});

Vue.config.productionTip = false;
Vue.prototype.$config = config;
Vue.prototype.$store = store;
Vue.prototype.$utils = utils;
Vue.prototype.$helper = new Driver(config.driver);

Vue.component("perScrollbar", perScrollbar);
Vue.use(MetaInfo);
Vue.use(Clipboard);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
