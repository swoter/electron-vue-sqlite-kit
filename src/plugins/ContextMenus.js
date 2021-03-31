/*
 * @Author: AA
 * @Date: 2020-01-23 11:23:56
 * @LastEditors: AA
 * @LastEditTime: 2021-02-20 11:17:35
 * @FilePath: /src/plugins/ContextMenus.js
 */
const { shell } = require("electron");
const contextMenu = require("electron-context-menu");
export default ($win) => {
  contextMenu({
    prepend: (defaultActions, params, $win) => [
      {
        label: "Rainbow",
        // Only show it when right-clicking images
        visible: params.mediaType === "image",
      },
      {
        label: "Google search “{selection}”",
        // Only show it when right-clicking text
        visible: params.selectionText.trim().length > 0,
        click: () => {
          shell.openExternal(
            `https://google.com/search?q=${encodeURIComponent(
              params.selectionText
            )}`
          );
        },
      },
    ],
    labels: {
      lookUpSelection: "Look up selection “{selection}”",
      copy: "Copy",
      cut: "Cut",
      paste: "Paste",
      saveImage: "Save Image",
      saveImageAs: "Saving image as",
      copyImage: "Copy image",
      copyImageAddress: "Copy image link",
      copyLink: "Copy Link",
      inspect: "Inspect",
      services: "Services",
    },
  });
};
