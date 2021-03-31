/*
 * @Author: Iseven Monkey <iswoter@gmail.com>
 * @Date: 2021-03-03 11:55:50
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-03-03 12:38:45
 * @FilePath: /src/plugins/utils/module/Operate.js
 */
class Operate {
  constructor(selector) {
    selector = selector || "body";
    //instanceof运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上
    if (selector instanceof HTMLElement) {
      //说明selector是个标准的DOM元素，无需再进行选择器选择，只需继承gecko的类和实例方法即可
      const arr = [];
      arr.push(selector);
    } else if (selector instanceof HTMLCollection) {
      //有种情况是选择器选取了多个元素，这时的原型为HTMLCollection而不是HTMLElement
      const arr = selector;
    } else {
      const firstCode = selector.charAt(0);

      let arr = [];
      if (firstCode === "#") {
        arr.push(document.getElementById(selector.slice(1)));
      } else if (firstCode === ".") {
        //document.getElementsByClassName( selector.slice( 1 ) )实际是HTMLCollection的类数组，而apply将类数组一个个添加到arr中，变成了数组
        arr.push.apply(arr, document.getElementsByClassName(selector.slice(1)));
      } else {
        arr.push.apply(arr, document.getElementsByTagName(selector));
      }
      //当前面选择器无法获取数据时，调用querySlectorAll,这个选择器的速度较慢(参考V8引擎源码分析)
      if (!arr[0]) {
        arr.push.apply(arr, document.querySelectorAll(selector));
      }
    }
    //this指向原型对象(Operate.prototype)，这样 Operate(实例对象)可以直接使用prototype中的方法，而不需要通过prototype(Operate.prototype.方法)
    for (let i = 0, len = arr.length; i < len; i++) {
      this[i] = arr[i];
    }
    //模拟数组的length,设置length属性为不可修改
    Object.defineProperty(this, "length", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: arr.length,
    });
  }

  each(obj, callback) {
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        //不加hasOwenProperty，for in会将__proto__中的方法也一起遍历出来
        callback(i, obj[i]);
      }
    }
  }

  attr(name, value) {
    //prop是设置property，attr设置attribute
    let that = this;
    const attrHook = {
      //采用钩子机制替换if else，效率快，易扩展
      1: () => {
        return that[0].getAttribute(name);
      },
      2: () => {
        this.each(that, (item) => {
          item.setAttribute(name, value);
        });
        return that; //将gecko实例返回回去，实现链式调用
      },
    };
    return attrHook[arguments.length]();
  }

  //方法-显示方法
  show() {
    for (let i = 0; i < this.length; i++) {
      this[i].style.display = "block";
    }
    return this;
  }
  //方法-隐藏方法
  hide() {
    for (let i = 0; i < this.length; i++) {
      this[i].style.display = "none";
    }
    return this;
  }
  //方法-鼠标移入移出方法
  hover(over, out) {
    for (let i = 0; i < this.length; i++) {
      this.onmouseover = over;
      this.onmouseout = out;
    }
    return this;
  }

  //方法-鼠标点击切换
  toggle() {
    for (var i = 0; i < this.length; i++) {
      //定义这个函数的目的是为了使每次点击不同对象都生成一个新的计数器count
      const fun = (element, args) => {
        let count = 0;
        this.on(element, "click", function (e) {
          args[count++ % args.length].call(this, e); //e传递触发事件
        });
      };
      fun(this[i], arguments);
    }
    return this;
  }

  on(type, posteritySelector, handler, boolean = false) {
    if (typeof posteritySelector !== "string") {
      this[0].addEventListener(arguments[0], arguments[1], arguments[2]);
    } else {
      //此处委托代码的实现经验：难度主要是将回调handler进行包装处理。步骤是先用实例模拟，再将小功能一步一步实现，最后再抽象出来
      let newHandler = (() => {
        let thisName = this[0].querySelectorAll(posteritySelector)[0].nodeName;
        let getNode = (node) => {
          if (node.nodeName === thisName) {
            return node;
          } else {
            if (node.parentNode) {
              //判断是不是点在thisName的祖宗节点上
              return getNode(node.parentNode); //迭代实现向上循环匹配节点名称,直到找到正确的节点名称
            } else {
              return null;
            }
          }
        };
        return (e) => {
          let that = getNode(e.target);
          if (that) {
            //因为如果点到thisName的祖宗节点上，that将为Null，操作没有节点属性的null将在控制台报错
            handler.call(that, e); //将handler里的this指向点击的那个node
          } else {
            return false;
          }
        };
      })();
      this[0].addEventListener(type, newHandler, boolean);
    }
  }
  //方法-删除class
  removeclass(classname) {
    for (var i = 0; i < this.length; i++) {
      if (
        this[i].className.match(new RegExp("(\\s|^)" + classname + "(\\s|$)"))
      ) {
        this[i].className = this[i].className.replace(
          new RegExp("(\\s|^)" + classname + "(\\s|$)"),
          ""
        );
      }
    }
    return this;
  }
  //方法-添加class
  addclass(classname) {
    for (var i = 0; i < this.length; i++) {
      if (
        !this[i].className.match(new RegExp("(\\s|^)" + classname + "(\\s|$)"))
      ) {
        this[i].className += " " + classname;
      }
    }
    return this;
  }
}
export default new Operate(el);
