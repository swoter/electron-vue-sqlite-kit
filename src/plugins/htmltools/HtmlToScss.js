/*
 * @Author: Iseven Monkey <iswoter@gmail.com>
 * @Date: 2012-09-21 10:48:04
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-03-03 16:36:43
 * @FilePath: /src/plugins/htmltools/HtmlToScss.js
 */
import parser from "./HtmlToJson";

export default {
  parse(html) {
    if (!html) {
      return "";
    }
    const els = parser.htmlToJson(html);
    console.log(els);
    if (els.child.length === 0) {
      return "";
    }
    this.toScss(els);
  },
  toScss(data) {
    let res = "";
    for (const key in data) {
      const node = data[key];
      if (Array.isArray(node)) {
        for (let index = 0; index < node.length; index++) {
          const el = node[index];
          const _parseNode = this.parseNode(node);
          res += _parseNode[0];
          if (el.child) {
            this.toScss(el.child);
          }
          res += _parseNode[1];
        }
      } else {
        const _parseNode = this.parseNode(node);
        res += _parseNode[0];

        if (node.child) {
          this.toScss(node.child);
        }
        res += _parseNode[1];
      }
    }
  },
  parseNode(node) {
    if (node.node == "text") {
      return ["", ""];
    }
    console.log(node);
    return ["", ""];
  },
};
