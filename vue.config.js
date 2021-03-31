/*
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2021-01-11 21:10:28
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-03-31 18:08:04
 */
//
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const baseConfig = require("./src/config/index.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // 构建多页面应用，页面的配置
  pages: {
    index: {
      // page 的入口
      entry: ["src/main.js"],
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: baseConfig.title,
    },
  },

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 返回一个将会被合并的对象
      return {
        optimization: {
          minimizer: [
            new TerserPlugin({
              sourceMap: false,
              warnings: false,
              terserOptions: {
                compress: {
                  drop_console: true,
                  drop_debugger: true,
                  pure_funcs: ["console.log", "window.console.log"], // 移除console
                },
              },
            }),
          ],
        },
      };
    }
  },

  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // css相关配置
  css: {
    loaderOptions: {}
  },

  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: baseConfig.baseURL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/uploads": {
        target: baseConfig.baseURL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          //  "^/api": "",
        },
      },
      "/img": {
        target: "http://127.0.0.1:80",
        changeOrigin: true,
      },
    }, // 设置代理
    // before: app => {}
  },

  // 第三方插件配置
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      chainWebpackRendererProcess(config) {
        config.plugins.delete("workbox");
        config.plugins.delete("pwa");
      },
      builderOptions: {
        appId: "com.im-monkey.imnote",
        productName: "IMnote",
        copyright: "Copyright © 2021 By Monky",

        files: ["**/*", "runtime/*"],
        electronDownload: {
          mirror: "https://npm.taobao.org/mirrors/electron/",
        },
        /*         win: {
          //win相关配置
          icon: "./public/img/icons/Manteng.ico", //图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: "nsis", //利用nsis制作安装程序
              arch: [
                "x64", //64位
                // "ia32" //32位
              ],
            },
          ],
        }, */
        mac: {
          icon: "./public/img/icons/Manteng.icns",
        },
        /*   nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: "./public/img/icons/Manteng.ico", // 安装图标
          uninstallerIcon: "./public/img/icons/Manteng.ico", // 卸载图标
          installerHeaderIcon: "./public/img/icons/Manteng.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: "Manteng", // 图标名称(项目名称)
        }, */
      },
    },
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          include: [
            resolve("src"),
            resolve("test"),
            resolve("node_modules/webpack-dev-server/client"),
            resolve("node_modules/element-ui/src"),
            resolve("node_modules/element-ui/packages"),
          ],
        },
      ],
    },
    plugins: [],
  }
};
