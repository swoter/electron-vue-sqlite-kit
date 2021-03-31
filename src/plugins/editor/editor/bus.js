/*
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-11-29 18:27:39
 * @LastEditors: Swoter
 * @LastEditTime: 2020-11-29 20:39:36
 */
import chinese from "./locales/chinese";

function Emitter() {
  const self = {
    listeners: {},
    on: (eventName, handler) => {
      if (self.listeners[eventName] === undefined)
        self.listeners[eventName] = [];
      self.listeners[eventName].push(handler);
    },
    emit: (eventName, ...args) => {
      if (self.listeners[eventName] !== undefined)
        self.listeners[eventName].forEach((handler) => handler.apply(args));
    },
  };

  return self;
}

const emitter = new Emitter();

emitter.options = {
  image: {
    uploadURL: "None",
    dropzoneOptions: {},
  },
  hideModules: {},
  paragraphSeparator: "div",
  maxHeight: undefined,
  customModules: [],
  locale: chinese,
};

emitter.utils = {
  getHTMLOfSelection() {
    if (window.getSelection !== undefined) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const clonedSelection = selection.getRangeAt(0).cloneContents();
        const div = document.createElement("div");
        div.appendChild(clonedSelection);
        return div.innerHTML;
      }
    }

    return "";
  },
};

export default emitter;
