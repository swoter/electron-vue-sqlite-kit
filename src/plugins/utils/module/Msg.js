/**
 * @Author: Swoter
 * @Date: 2019-05-20 10:35:24
 * @Last Modified by: Swoter
 * @Last Modified time: 2019-07-03 09:03:50
 * @Description: 消息提示
 */
import { Message, MessageBox, Notification } from "element-ui";

const duration = 8000;
const topOffset = 200;
export default {
  // 警告
  warnN(message) {
    Notification({
      title: "Warning",
      message,
      type: "warning",
      position: "bottom-right",
      offset: 60,
      duration,
    });
  },
  // 系统级消息
  infoN(message) {
    Notification({
      title: "Message",
      message,
      type: "info",
      position: "bottom-right",
      offset: 60,
      duration,
    });
  },
  // 系统级成功
  successN(message) {
    Notification({
      title: "Success",
      message,
      type: "success",
      position: "bottom-right",
      offset: 60,
      duration,
    });
  },
  // 系统级错误
  errorN(message) {
    Notification({
      title: "Error",
      message,
      type: "error",
      position: "bottom-right",
      offset: 60,
      duration,
    });
  },
  // 操作级警告
  warn(message) {
    Message({
      title: "Warning",
      message,
      type: "warning",
      showClose: true,
      offset: topOffset,
      duration,
    });
  },
  // 操作级消息
  info(message) {
    Message({
      title: "Info",
      message,
      type: "info",
      showClose: true,
      offset: topOffset,
      duration,
    });
  },
  // 操作级成功
  success(message) {
    Message({
      title: "Success",
      message,
      type: "success",
      showClose: true,
      offset: topOffset,
      duration,
    });
  },
  // 操作级错误
  error(message) {
    Message({
      title: "Error",
      message,
      type: "error",
      showClose: true,
      offset: topOffset,
      duration,
    });
  },
  // 错误
  alert(message) {
    MessageBox.alert(message, "Alert", {
      type: "error",
    });
  },
  // 确认认操作
  confirm(message, fnY, fnN) {
    MessageBox.confirm(message, "Warning", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    })
      .then(() => {
        return fnY();
      })
      .catch(() => {
        return fnN();
      });
  },
};
