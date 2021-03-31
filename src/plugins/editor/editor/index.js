/*
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-11-29 18:27:39
 * @LastEditors: Swoter
 * @LastEditTime: 2020-11-29 20:34:41
 */
import Editr from "./Editr";
import bus from "./bus";
import locales from "./locales";

const localeArray = Object.values(locales);

export default {
  install: (Vue, userOptions = {}) => {
    if (userOptions.locale) {
      if (typeof userOptions.locale == "string") {
        let userLocale = localeArray.find((x) =>
          x.locale_shorthand.includes(userOptions.locale.toLowerCase())
        );
        userOptions.locale = userLocale;
      }
    }
    bus.options = {
      ...bus.options,
      ...userOptions,
    };
    Vue.component("follower-editor", Editr);
  },

  component: Editr,
};
