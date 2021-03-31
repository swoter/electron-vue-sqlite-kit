/*
 * @Descripttion: [工具库]
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-04-07 13:11:39
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-03-03 13:26:15
 */

import Browser from "./module/Browser";
import Reg from "./module/Reg";
import Image from "./module/Image";
import DateX from "./module/Date";
import StringX from "./module/String";
import Msg from "./module/Msg";
import ArrayX from "./module/Array";
import NumberX from "./module/Number";
import CryptX from "./module/Crypt";
//import Operate from "./module/Operate";
export default Object.assign(
  Browser,
  Reg,
  DateX,
  StringX,
  Msg,
  ArrayX,
  NumberX,
  CryptX,
  Image
  // { o, Operate }
);
