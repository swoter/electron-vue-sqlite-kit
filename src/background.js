/*
 * @Description:
 * @CopyRight: Tapp Commerce
 * @Author: Iseven Monkey <iswoter@gmail.com>
 * @Date: 2021-03-31 17:09:54
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-03-31 22:08:19
 * @FilePath: /src/background.js
 */
"use strict";

import { app, protocol, BrowserWindow, screen, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import contextMenu from "./plugins/ContextMenus";

const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

const userData = app.getPath("userData"); //程序运行缓存目录
let win = null;
async function createWindow() {
  // Create the browser window.

  const scale = 0.9;
  const size = screen.getPrimaryDisplay().workAreaSize;
  const width = parseInt(size.width * scale);
  const height = parseInt(size.height * scale);
  const x = parseInt((size.width * (1 - scale)) / 2);
  const y = parseInt((size.height * (1 - scale)) / 2);
  win = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    transparent: true,
    darkTheme: true,
    webPreferences: {
      webviewTag: true,
      javascript: true,
      plugins: true,
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  win.setBounds({ x: x, y: y, width: width, height: height });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  app.whenReady().then(() => {
    contextMenu(win); //鼠标右键菜单
    win.webContents.send("userDataPath", userData);
    console.log("userDataPath------------------------", userData);
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
} else {
  app.applicationMenu = null; //产品模式禁用菜单
}

//退出应用
ipcMain.on("quit", () => {
  app.quit();
});
//最大化窗口
ipcMain.on("window-maximize", () => {
  win.maximize();
});
//取消最大化窗口
ipcMain.on("window-unmaximize", () => {
  win.unmaximize();
});
//最小化窗口
ipcMain.on("window-minimize", () => {
  win.minimize();
});
//全屏切换
ipcMain.on("window-fullscreen", () => {
  win.setFullScreen(!win.isFullScreen());
});
//全屏顶置
ipcMain.on("window-ontop", () => {
  win.setAlwaysOnTop(!win.isAlwaysOnTop());
});

//全屏顶置
ipcMain.on("window-ontop", () => {
  win.setAlwaysOnTop(!win.isAlwaysOnTop());
});
