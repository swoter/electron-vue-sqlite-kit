/*
 * @Description:笔记接口
 * @CopyRight: Tapp Commerce
 * @Author: Iseven Monkey <iswoter@gmail.com>
 * @Date: 2021-03-31 02:54:03
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-03-31 14:39:08
 * @FilePath: /src/api/note.js
 */

import utils from "@/plugins/utils";
import DB from "@/plugins/db";

/**
 * @description: 笔记类型
 * @copyright: Tapp Commerce
 * @author: Iseven Monkey <iswoter@gmail.com>
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @Date: 2021-03-31 02:55:24
 * @return {Object} 笔记类型数据对象
 */
export const getNoteTypes = async () => {
  let resTypes = {};
  const types = await DB.table("noteTypes").order("sort DESC").select();
  types.forEach((element) => {
    if (utils.isEmpty(resTypes[element["parent_id"]])) {
      resTypes[element["parent_id"]] = {};
    }
    resTypes[element["parent_id"]][element["id"]] = element;
  });
  return resTypes;
};

/**
 * @description: 取得一个型
 * @author: Iseven Monkey <iswoter@gmail.com>
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @Date: 2021-03-31 14:33:30
 * @param {*} async
 * @return {*}
 */
export const getNoteType = async (params) => {
  return await DB.table("noteTypes").get(params);
};
