/* eslint eqeqeq: 0 */
/*
 * @Descripttion: [数组]
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-04-13 12:56:24
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-02-25 12:40:01
 */
import StringX from "./String";
export default {
  isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  },
  delArray(del, data, key) {
    key = key || "id";
    if (StringX.isEmpty(del) || StringX.isEmpty(data) || !this.isArray(data)) {
      return data;
    }
    if (!this.isArray(del)) {
      const old = del;
      del = [];
      del.push(old);
    }
    const res = typeof data === "object" ? {} : []; // es
    for (const i in data) {
      if (!this.in_array(data[i][key], del)) {
        res.push(data[i]);
      }
    }
    return res;
  },
  /* 排除重复 */
  unique(arr) {
    const newArr = [];
    let i = 0;
    const len = arr.length;

    for (; i < len; i++) {
      const a = arr[i];
      if (newArr.includes(a)) {
        continue;
      } else {
        newArr[newArr.length] = a;
      }
    }

    return newArr;
  },

  /**
   * Sort an array by the provided key.
   *
   * @param {Array} data The array to sort.
   * @param {string} key The key to use for sorting.
   * @param {boolean} [reverse=false] - Reverse the order.
   */
  arraySortByKey(data, key, reverse) {
    return data.sort((a, b) => {
      const aw =
        a[key] !== undefined
          ? typeof a[key] === "function"
            ? parseInt(a[key](), 10)
            : parseInt(a[key], 10)
          : 0;
      const bw =
        b[key] !== undefined
          ? typeof b[key] === "function"
            ? parseInt(b[key](), 10)
            : parseInt(b[key], 10)
          : 0;

      if (aw === bw) {
        return 0;
      }
      if (reverse !== true) {
        return aw < bw ? -1 : 1;
      } else {
        return aw > bw ? -1 : 1;
      }
    });
  },

  /**
   * Sort an object by the provided key.
   *
   * @param {Array} data The object to sort.
   * @param {String} key The key to use for sorting.
   * @param {boolean} [reverse=false] Reverse the order.
   */
  objectSortByKey(data, key, reverse) {
    const keys = Object.keys(data);
    keys.sort((a, b) => {
      const aw = data[a][key] !== undefined ? parseInt(data[a][key], 10) : 0;
      const bw = data[b][key] !== undefined ? parseInt(data[b][key], 10) : 0;
      if (aw === bw) {
        return 0;
      }
      if (reverse !== true) {
        return aw < bw ? -1 : 1;
      } else {
        return aw > bw ? -1 : 1;
      }
    });

    keys.forEach((key) => {
      const value = data[key];
      delete data[key];
      data[key] = value;
    });
    return keys;
  },

  sortBy(obj, key, reverse) {
    if (Array.isArray(obj)) {
      return this.arraySortByKey(obj, key, reverse);
    } else {
      return this.objectSortByKey(obj, key, reverse);
    }
  },
  toFixedNumber(num) {
    return num.toFixed();
  },
  sum(arr, param) {
    const temp = {};
    arr.forEach(function (item) {
      for (const k in item) {
        if (param.includes(k)) {
          if (typeof item[k] === "string") {
            item[k] = item[k] * 1;
          }
          if (temp[k]) {
            temp[k] += item[k];
          } else {
            temp[k] = item[k];
          }
        }
      }
    });
    console.log("temp", temp);
    return temp;
  },
  /* 排除重复 */
  toJSON(arr) {
    return JSON.parse(JSON.stringify(arr));
  },
  /* 交換115位置 */
  swapItems(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  },
  /* 上移數組位置 */
  upItem(arr, index) {
    if (arr.length > 1 && index !== 0) {
      return this.swapItems(arr, index, index - 1);
    }
    return arr;
  },
  /* 下移數組位置 */
  downItem(arr, index) {
    if (arr.length > 1 && index !== arr.length - 1) {
      return this.swapItems(arr, index, index + 1);
    }
    return arr;
  },
  /* 刪除數組元素 */
  removeItem(arr, index) {
    return arr.splice(index, 1);
  },
  /**
   *判断值是否存在于数组中
   *needle，需要查找的值；haystack，数组
   *@return boolean
   */
  inArray(needle, haystack) {
    if (typeof needle === "string" || typeof needle === "number") {
      for (const i in haystack) {
        if (haystack[i] == needle) {
          return true;
        }
      }
    }
    return false;
  },
  extend() {
    const args = arguments;

    if (args.length < 2) return args[0];
    const temp = this.clone(args[0]); // 调用复制对象方法
    for (let n = 1; n < args.length; n++) {
      for (const i in args[n]) {
        temp[i] = args[n][i];
      }
    }
    return temp;
  },
  /**
   *克隆对象
   * @return object
   */
  clone(oldObj) {
    // 复制对象方法
    if (typeof oldObj !== "object") return oldObj;
    if (oldObj == null) return oldObj;
    const newObj = {};
    for (const i in oldObj) newObj[i] = this.clone(oldObj[i]);
    return newObj;
  },
  /**
   * 判断一个数组元素是不是在数组里面
   * @param obj
   * @returns {boolean}
   */
  contains(obj) {
    let i = this.length;
    while (i--) {
      if (this[i] === obj) {
        return true;
      }
    }
    return false;
  },
  /**
   * 获取数组最大的值
   * @returns {number}
   */
  arrayMax() {
    return Math.max.apply(null, this);
  },
  /**
   * 获取数组中最小的值
   * @returns {number}
   */
  arrayMin() {
    return Math.min.apply(null, this);
  },
};
