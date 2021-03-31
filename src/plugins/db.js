/*
 * @Description: sqlite3 封装类
 * @CopyRight: Tapp Commerce
 * @Author: Iseven Monkey <iswoter@gmail.com>
 * @Date: 2021-03-31 02:38:13
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2021-03-31 22:08:47
 * @FilePath: /src/plugins/db.js
 */

import sqlite3 from "sqlite3";
import utils from "./utils";
const sqlite = sqlite3.verbose();
import path from "path";

class Sqlite {
  /**
   * 创建Sqlite实例
   * @param {object} config 数据库连接配置
   */
  constructor(dataBase) {
    dataBase = dataBase || localStorage.getItem("userDataPath");
    console.log("dataBase------------->", dataBase);
    this.dataBase = path.resolve(dataBase, "im-note.db");
    this.db = this._getConnection();
    this.sql = "";
    this._resetParams();
    this.initTable();
  }
  async checkTable(table, create, data) {
    this.db.get(
      `SELECT count(*) as c FROM sqlite_master WHERE type='table' AND name=?`,
      table,
      (err, row) => {
        if (!row.c) {
          this.db.run(create, () => {
            if (!utils.isEmpty(data) && utils.isArray(data)) {
              data.map((item) => {
                this.db.run(item);
              });
            }
          });
        }
      }
    );
  }
  initTable() {
    return new Promise((resolve) => {
      this.db.serialize(() => {
        this.checkTable(
          "noteTypes",
          `
          CREATE TABLE IF NOT EXISTS "noteTypes" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "parent_id" INTEGER(11) NOT NULL DEFAULT 0,
            "name" TEXT(100),
            "logo" TEXT(200),
            "language" TEXT(50),
            "ext" TEXT(10),
            "description" TEXT(200),
            "sort" INTEGER NOT NULL DEFAULT 0
          );
        `,
          [
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (1, 0, 'html5', 'html5', 'html5', 'html', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (2, 0, 'vue', 'vue', 'vue', 'vue', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (3, 0, 'css', 'css', 'css', 'css', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (4, 0, 'git', 'git', 'text', 'git', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (5, 0, 'electron', 'electron', 'text', 'js', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (6, 0, 'javascript', 'javascript', 'javascript', 'js', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (7, 0, 'ajax', 'ajax', 'text', 'js', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (8, 0, 'redis', 'redis', 'text', 'git', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (9, 0, 'nodejs', 'nodejs', 'text', 'js', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (10, 0, 'vscode', 'vscode', 'text', 'git', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (11, 0, 'es6', 'es6', 'text', 'js', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (12, 0, 'react', 'react', 'js', 'js', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (13, 0, 'json', 'json', 'json', 'json', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (14, 0, 'powershell', 'powershell', 'powershell', 'ps1', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (15, 0, 'apple', 'apple', 'text', 'ps1', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (16, 0, 'linux', 'linux', 'text', 'conf', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (17, 0, 'nginx', 'nginx', 'text', 'conf', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (18, 0, 'php', 'php', 'php', 'php', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (19, 0, 'mysql', 'mysql', 'sql', 'sql', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (20, 0, 'java', 'java', 'java', 'java', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (21, 0, 'xml', 'xml', 'xml', 'xml', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (22, 0, 'adobe', 'adobe', 'text', 'ps1', NULL, 0)`,
            `INSERT INTO "noteTypes"("id", "parent_id", "name", "logo", "language", "ext", "description", "sort") VALUES (23, 0, 'windows', 'windows', 'text', 'ps1', NULL, 0)`,
          ]
        );

        this.checkTable(
          "note",
          `CREATE TABLE IF NOT EXISTS "note" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "type_id" INTEGER(11) NOT NULL DEFAULT 0,
            "title" TEXT(200),
            "tags" TEXT(400),
            "summary" TEXT(400),
            "views" INTEGER(11) NOT NULL DEFAULT 0,
            "liked" INTEGER(11) NOT NULL DEFAULT 0,
            "create_time" INTEGER(10) NOT NULL DEFAULT 0,
            "update_time" INTEGER(10) NOT NULL DEFAULT 0,
            "last_time" INTEGER(10) NOT NULL DEFAULT 0
          );
          `,
          [
            `
          CREATE INDEX "type"
          ON "note" (
            "type_id" ASC,
            "last_time" ASC
          );
            `,
          ]
        );

        this.checkTable(
          "noteDetail",
          `CREATE TABLE IF NOT EXISTS "noteDetail" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "note_id" INTEGER(11) NOT NULL DEFAULT 0,
            "create_time" INTEGER(10) NOT NULL DEFAULT 0,
            "content" TEXT
          );
          `,
          [
            `
          CREATE INDEX "noteId"
          ON "noteDetail" (
            "note_id" ASC,
            "create_time" ASC
          );
          `,
          ]
        );

        this.checkTable(
          "user",
          `CREATE TABLE IF NOT EXISTS "user"(
            "id"
            integer NOT NULL PRIMARY KEY AUTOINCREMENT,
            "username"
            varchar(64),
            "password"
            varchar(64),
            avatar varchar(200),
            create_time int(10) NOT NULL DEFAULT 0
          );`
        );

        resolve();
      });
    });
  }
  /**
   * 直接执行sql语句
   * @param {string} sql sql语句
   * @return {Promise<any>} sql执行结果
   */
  run(sql) {
    this._resetParams();
    return new Promise((resolve, reject) => {
      this.db.run(sql, (err, rows) => {
        if (err) {
          console.error("[Sqlite] Sqlite_EXECUTED_ERROR", err);
          reject(err);
        } else {
          // console.log(`[Sqlite] ${this._sql()}`);
          resolve(rows);
        }
      });
    });
  }

  /**
   * 设置表名
   * @param {string} tableName 表名
   * @return {Sqlite} 实例
   */
  table(tableName) {
    if (!tableName) {
      throw new Error("unknown tableName!");
    }
    if (utils.typeOf(tableName) !== "string") {
      console.warn('[Sqlite] function table params must be type of "string"');
      return this;
    }
    this._tableName = tableName;
    return this;
  }

  /**
   * 设置表的别名
   * @param {string} tableAlias 主表别名
   * @return {Sqlite} 实例
   */
  alias(tableAlias) {
    if (utils.typeOf(tableAlias) !== "string") {
      console.warn('[Sqlite] function table params must be type of "string"');
      return this;
    }
    this._tableAlias = tableAlias;
    return this;
  }

  /**
   * 设置需要选取的字段，字符串或数组格式
   * @param {string|Array} fields 需要选取的字段
   * @example
   * // SELECT `admins`.`id`, `admins`.`name` FROM `admins` limit 1
   * Sqlite.table('admins').field('id, name').find();
   * // SELECT `admins`.`id`, `admins`.`name` as a, `admins`.`status` as b FROM `admins` limit 1
   * Sqlite.table('admins').field(['id', 'name as a', { status: 'b' }]).find();
   * @return {Sqlite} 实例
   */
  field(fields) {
    const type = utils.typeOf(fields);
    if (type === "string") {
      fields = fields.split(",");
    } else if (type === "array") {
    } else {
      console.warn(
        '[Sqlite] function field params must be type of "string" or "array"'
      );
      fields = ["*"];
    }
    const res = [];
    fields.forEach((item) => {
      if (utils.typeOf(item) === "object") {
        res.push(item);
      } else if (utils.typeOf(item) === "string") {
        item = item.trim();
        item && res.push(item);
      }
    });
    this._fields = res;
    return this;
  }

  /**
   * group by 操作
   * @param {Array|string} columns 分组列名，可为数组或字符串，字符串以逗号分隔
   * @return {Sqlite} 实例
   */
  group(columns) {
    const type = utils.typeOf(columns);
    if (type !== "string" && type !== "array") {
      console.warn(
        '[Sqlite] function group params must be type of "string" or "array"'
      );
      return this;
    }
    if (type === "array") {
      columns = columns.join(", ");
    }
    this._group = columns;
    return this;
  }

  /**
   * where条件设置，接受字符串或者对象形式，可以多次调用，每次调用都作为一个整体，多次调用使用 AND 连接
   * @param {object|string} where where条件
   * @example
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`status` = 'on') limit 1
   * Sqlite.table('admins').where({ status: 'on' }).find();
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (id = 10 OR id < 2) limit 1
   * Sqlite.table('admins').where('id = 10 OR id < 2').find();
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`id` != 1) limit 1
   * Sqlite.table('admins').where({id: ['!=', 1]}).find();
   *
   * // NULL操作
   *
   * SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`id` IS NULL) limit 1
   * Sqlite.table('admins').where({id: null}).find();
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`id` IS NOT NULL) limit 1
   * Sqlite.table('admins').where({id: [ '!=', null ]}).find();
   *
   * // LIKE 操作
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`name` LIKE '%admin%') limit 1
   * Sqlite.table('admins').where({name: [ 'like', '%admin%' ]}).find();
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`name` NOT LIKE '%admin%') limit 1
   * Sqlite.table('admins').where({name: [ 'notlike', '%admin%' ]}).find();
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`name` LIKE '%admin%' OR `admins`.`email` LIKE '%admin%') limit 1
   * Sqlite.table('admins').where({'name|email': [ 'like', '%admin%' ]}).find();
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`name` LIKE '%admin%' AND `admins`.`email` LIKE '%admin%') limit 1
   * Sqlite.table('admins').where({'name&email': [ 'like', '%admin%' ]}).find();
   *
   * // 一对多操作
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`name` = 'admin' OR `admins`.`name` = 'editor') limit 1
   * Sqlite.table('admins').where({name: [ '=', [ 'admin', 'editor' ] ]}).find();
   *
   * // IN 操作
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`id` IN (5,10)) limit 1
   * Sqlite.table('admins').where({'id': [ 'in', [5, 10] ]}).find();
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`id` IN (5, 10)) limit 1
   * Sqlite.table('admins').where({'id': [ 'in', '5, 10' ]}).find();
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`id` NOT IN (5,10)) limit 1
   * Sqlite.table('admins').where({'id': [ 'notin', [5, 10] ]}).find();
   *
   * // BETWEEN 操作
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`id` BETWEEN 5 AND 10) limit 1
   * Sqlite.table('admins').where({'id': [ 'between', [5, 10] ]}).find();
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`id` BETWEEN 5 AND 10 AND `admins`.`name` = 'admin') limit 1
   * Sqlite.table('admins').where({'id': [ 'between', [5, 10] ], 'name': 'admin'}).find();
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`id` BETWEEN 5 AND 10 OR `admins`.`name` = 'admin') limit 1
   * Sqlite.table('admins').where({'id': [ 'between', [5, 10] ], 'name': 'admin', '_logic': 'OR'}).find();
   *
   * // 多字段操作
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`status` = 'on') AND (`admins`.`id` >= 1 AND `admins`.`id` <= 10) limit 1
   * Sqlite.table('admins').where({'status': 'on'}).where({'id': {'>=': 1, '<=': 10}}).find();
   *
   * // SELECT `admins`.`*` FROM `admins` WHERE (`admins`.`status` = 'on') AND (`admins`.`id` >= 1 OR `admins`.`id` <= 10) limit 1
   * Sqlite.table('admins').where({'status': 'on'}).where({'id': {'>=': 1, '<=': 10, '_logic': 'OR'}}).find();
   *
   * @return {Sqlite} 实例
   */
  where(where) {
    const type = utils.typeOf(where);
    if (type !== "string" && type !== "object") {
      console.warn(
        '[Sqlite] function where params must be type of "object" or "string"'
      );
      return this;
    }
    if (type === "object") {
      this._where._condition.push(where);
    } else {
      this._where._sql.push(where);
    }
    return this;
  }

  /**
   * 设置结果的条数限制
   * @param {number} limit 结果的条数限制
   * @return {Sqlite} 实例
   */
  limit(limit) {
    const type = utils.typeOf(limit);
    if (type !== "number") {
      console.warn('[Sqlite] function limit params must be type of "number"');
      limit = parseInt(limit);
      if (isNaN(limit)) {
        return this;
      }
    }
    this._limit = limit;
    return this;
  }

  /**
   * 分页操作
   * @param {number} page 当前页数
   * @param {number} pageSize 每页大小
   * @return {Sqlite} 实例
   */
  page(page = 1, pageSize = 1) {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    page = isNaN(page) ? 1 : page;
    pageSize = isNaN(pageSize) ? 1 : pageSize;
    const offset = (page - 1) * pageSize;
    this._limit = (offset < 0 ? 0 : offset) + ", " + pageSize;
    return this;
  }

  /**
   * 设置数据
   * @param {object} data 数据
   * @return {Sqlite} 实例
   */
  data(data) {
    if (utils.typeOf(data) !== "object") {
      console.warn('[Sqlite] function {data} params must be type of "object"');
      return this;
    }
    this._data = data;
    return this;
  }

  /**
   * 排序
   * @param {array|string} order 排序
   * @example
   * // SELECT `article_categorys`.`*` FROM `article_categorys` ORDER BY id desc
   * Sqlite.table('article_categorys').order('id desc').select();
   *
   * //SELECT `article_categorys`.`*` FROM `article_categorys` ORDER BY id desc, name asc
   * Sqlite.table('article_categorys').order([ 'id desc', 'name asc' ]).select();
   *
   * @return {Sqlite} 实例
   */
  order(order) {
    const type = utils.typeOf(order);
    if (type !== "array" && type !== "string") {
      console.warn(
        '[Sqlite] function {order} params must be type of "array" or "string"'
      );
      return this;
    }
    if (type === "array") {
      order = order.join(", ");
    }
    this._order = order;
    return this;
  }

  /**
   * 查找数据
   * @param {object|string} where where条件
   * @return {Promise<any>} 查询结果
   */
  select(where = null) {
    if (!this._tableName) {
      throw new Error("unknown table name!");
    }
    where && this.where(where);
    let sql = "SELECT";

    sql += this._formatFields();
    sql += " FROM `" + this._tableName + "`";
    sql += this._tableAlias ? ` as ${this._tableAlias}` : "";

    sql += this._formatWhere();

    sql += this._group
      ? " GROUP BY " + this._formatFieldsName(this._group)
      : "";
    sql += this._order ? " ORDER BY " + this._order : "";
    // limit，必须在最后面
    sql += this._limit ? " limit " + this._limit : "";

    this.sql = sql;

    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
        if (err) {
          console.error("[Sqlite] Sqlite_EXECUTED_ERROR", err);
          reject(err);
        } else {
          // console.log(`[Sqlite] ${this._sql()}`);
          resolve(rows);
        }
      });
    });
  }

  get(where = null) {
    if (!this._tableName) {
      throw new Error("unknown table name!");
    }

    where && this.where(where);

    let sql = "SELECT";

    sql += this._formatFields();
    sql += " FROM `" + this._tableName + "`";

    sql += this._formatWhere();

    sql += this._group
      ? " GROUP BY " + this._formatFieldsName(this._group)
      : "";
    sql += this._order ? " ORDER BY " + this._order : "";
    // limit，必须在最后面
    sql += this._limit ? " limit " + this._limit : "";

    this._resetParams();

    return new Promise((resolve, reject) => {
      this.db.get(sql, (err, rows) => {
        if (err) {
          console.error("[Sqlite] Sqlite_EXECUTED_ERROR", err);
          reject(err);
        } else {
          // console.log(`[Sqlite] ${this._sql()}`);
          resolve(rows);
        }
      });
    });
  }

  /**
   * 更新操作
   * @param {object} column {name: value} 更新的字段与值
   * @param {object|string} where where条件，参见[where]方法
   * @return {Promise<any>} 更新结果
   */
  update(column, where = null) {
    if (!this._tableName) {
      throw new Error("unknown table name!");
    }
    where && this.where(where);
    let sql = "UPDATE ";
    sql += this._tableName + " SET ";

    const tmpArr = [];
    for (const i in column) {
      let tmp = "";
      // 检测数据中是否含有加减号
      const match = (column[i] + "").match(/^(\+|\-)([^+-]+)$/);
      if (match) {
        tmp =
          this._formatFieldsName(i) +
          " = " +
          this._formatFieldsName(i) +
          match[1] +
          match[2];
      } else {
        tmp =
          this._formatFieldsName(i) +
          " = '" +
          utils.addslashes(column[i]) +
          "'";
      }
      tmpArr.push(tmp);
    }
    sql += tmpArr.join(",");
    sql += this._formatWhere();
    this.sql = sql;
    return this.run(sql);
  }

  /**
   * 新增数据
   * @param {object} column 字段键值对
   * @param {object} duplicate 出现重复则更新，{id : 100, name : VALUES('test')}
   * @return {Promise<any>} 操作结果
   */
  add(column, duplicate = false) {
    if (!this._tableName) {
      throw new Error("unknown table name!");
    }
    let sql = "INSERT INTO " + this._tableName;
    const keyArr = [];
    const valueArr = [];
    for (const i in column) {
      keyArr.push("`" + i + "`");
      valueArr.push("'" + utils.addslashes(column[i]) + "'");
    }
    sql += " (" + keyArr.join(",") + ")";
    sql += " VALUES (" + valueArr.join(",") + ")";

    if (duplicate) {
      sql += " ON DUPLICATE KEY UPDATE ";
      // 引用字段
      const tmpArr = [];
      for (let key in duplicate) {
        const value = duplicate[key];
        if (/VALUES\(/gi.test(value)) {
          tmpArr.push("`" + key + "`=" + value);
        } else {
          tmpArr.push("`" + key + "`='" + value + "'");
        }
      }
      sql += tmpArr.join(",");
    }
    this.sql = sql;
    return this.run(sql);
  }

  /**
   * 删除操作，彻底删除一条数据，一般不建议删除数据，可以通过字段开关控制
   * @param {object|string} where where条件，参见[where]方法
   * @return {Promise<any>} 操作结果
   */
  delete(where) {
    if (!this._tableName) {
      throw new Error("unknown table name!");
    }
    where && this.where(where);
    let sql = "DELETE FROM " + this._tableName;
    sql += this._formatWhere();
    this.sql = sql;
    return this.run(sql);
  }

  /**
   * 获取数据连接
   * @private
   * @return {Sqlite.connection} 数据库连接对象
   */
  _getConnection() {
    const connection = new sqlite.Database(this.dataBase, (err) => {
      if (err === null) {
      } else {
        this.initTable();
      }
    });

    return connection;
  }

  /**
   * 关闭数据库连接
   * @private
   * @param {connection} connection Sqlite连接对象
   * @return {void}
   */
  _close(connection) {
    connection.close();
  }

  /**
   * 重置查询条件，每次查询完必须重置
   * @private
   * @return {void}
   */
  _resetParams() {
    this._tableName = "";
    this._tableAlias = "";
    this._fields = ["*"];
    this._where = {
      _sql: [],
      _condition: [],
    };
    this._limit = "";
    this._order = "";
    this._data = {};
    this._group = "";
  }

  /**
   * 需要选择的字段名处理
   * @private
   * @return {string} 需要选择的字段拼接结果
   */
  _formatFields() {
    if (!this._fields.length) {
      return "*";
    }

    let res = " ";

    this._fields.forEach((item, index) => {
      res += index > 0 ? ", " : "";
      if (utils.typeOf(item) === "object") {
        for (const i in item) {
          res += this._formatFieldsName(i) + " as " + item[i];
        }
      } else if (item.includes(" as ")) {
        const tmp = item.split(" as ");
        res += this._formatFieldsName(tmp[0]) + " as " + tmp[1];
      } else {
        res += this._formatFieldsName(item);
      }
    });
    return res;
  }

  /**
   * 字段名处理，添加``，防止报错
   * @private
   * @param {string} field 字段名
   * @return {string} 字段名处理结果
   */
  _formatFieldsName(field) {
    let res = "";
    let fieldName = "";

    const tmp = field.split(".");
    if (tmp.length < 2) {
      fieldName = tmp[0];
    } else {
      fieldName = tmp[1];
    }

    const match = /^\s*([a-zA-Z]+)\s*\(\s*([\w]+)\s*\)\s*$/g.exec(fieldName);
    if (match) {
      const funcName = match[1];
      const name = match[2];
      res = funcName + "(" + (name === "*" ? name : "`" + name + "`") + ")";
    } else {
      res = fieldName === "*" ? fieldName : "`" + fieldName + "`";
    }
    return res;
  }

  /**
   * where条件处理
   * @private
   * @return {string} where条件的拼接结果
   */
  _formatWhere() {
    const sqlStr = this._where._sql.map((item) => `(${item})`).join(" AND ");
    const sqlCondition = [];
    this._where._condition.forEach((item) => {
      const singleWhere = {};
      const multiples2sql = [];

      /* 将多字段名数据单独处理，并将值是字符串的数据转化为数组，便于统一处理 */
      const keys = Object.keys(item);
      keys.forEach((key) => {
        let val = item[key];
        if (utils.typeOf(val) === "null") {
          val = ["IS", "NULL"];
        } else if (
          key.indexOf("_") !== 0 &&
          utils.typeOf(val) !== "array" &&
          utils.typeOf(val) !== "object"
        ) {
          val = ["=", val];
        }
        /* 将多字段名的数据单独处理 {'title|content': ['like', '%javascript%']} */
        const _logic =
          key.indexOf("|") !== -1 ? "OR" : key.indexOf("&") !== -1 ? "AND" : "";
        if (_logic) {
          const multiple = {
            _logic,
          };
          const multipleKeys = key.split(_logic === "OR" ? "|" : "&");
          multipleKeys.forEach((m) => {
            multiple[m] = val;
          });
          const tmp = this._formatWhereItem(multiple);
          tmp && multiples2sql.push(tmp);
        } else {
          singleWhere[key] = val;
        }
      });
      const single2sql = this._formatWhereItem(singleWhere);
      let sqls = [];
      single2sql && sqls.push(single2sql);
      const sql = [...sqls, ...multiples2sql].join(" AND");
      sql && sqlCondition.push(sql);
    });
    let res = [];
    sqlStr && res.push(sqlStr);
    res = [...res, ...sqlCondition].join(" AND ");
    return res ? ` WHERE ${res}` : "";
  }

  /**
   * 格式化单个的where条件，每个都是一个完整的对象模式
   * @private
   * @param {object} where
   * @return {string} 处理好的sql
   */
  _formatWhereItem(where) {
    if (utils.isEmpty(where)) return "";
    const res = [];
    let _logic = "AND";
    if (where._logic) {
      _logic = where._logic;
      delete where._logic;
    }
    for (let fieldName in where) {
      let val = where[fieldName];
      let operate = "";
      fieldName = this._formatFieldsName(fieldName);
      if (utils.typeOf(val) === "array") {
        operate = val[0].trim();
        val = utils.typeOf(val[1]) === "array" ? val[1] : [val[1]];
      }
      res.push(this._formatWhereItemValue(operate, fieldName, val));
    }
    const sql = res.join(` ${_logic} `);
    return sql ? `(${sql})` : "";
  }

  /**
   * 拼接某个字段的sql语句
   * @private
   * @param {string} operate 操作符 = LIKE 等
   * @param {string} fieldName 字段名
   * @param {array|object} value 字段的值，数组或者对象模式，对象模式下，key是操作符，覆盖 operate 参数
   * @return {string} 拼接好的一个字段值的sql语句
   */
  _formatWhereItemValue(operate, fieldName, value) {
    operate = operate.trim().toLocaleUpperCase();
    const type = utils.typeOf(value);
    if (type === "array") {
      const len = value.length;
      if (len === 1) {
        return this._getOperateResultSql(operate, fieldName, value[0]);
      } else if (
        len > 1 &&
        (operate === "IN" ||
          operate === "NOTIN" ||
          operate === "NOT IN" ||
          operate === "BETWEEN")
      ) {
        return this._getOperateResultSql(operate, fieldName, value);
      } else {
        const res = value.map((item) => {
          return this._getOperateResultSql(operate, fieldName, item);
        });
        return res.join(" OR ");
      }
    } else if (type === "object") {
      const res = [];
      let _logic = "AND";
      if (value._logic) {
        _logic = value._logic;
        delete value._logic;
      }
      for (const name in value) {
        const tmp = this._getOperateResultSql(name, fieldName, value[name]);
        tmp && res.push(tmp);
      }
      return res.join(` ${_logic} `);
    }
  }

  /**
   * 主要针对操作符做一些特殊处理，比如IN BETWEEN等
   * @private
   * @param {string} operate 操作符 = LIKE 等
   * @param {string} fieldName 字段名
   * @param {array|string} value 字段的值，数组或者字符串，字符串表示某个值，数组一般表示IN或者BETWEEN的范围
   * @return {string} 拼接好的sql语句
   */
  _getOperateResultSql(operate, fieldName, value) {
    const valueType = utils.typeOf(value);
    if (operate === "NOTLIKE") {
      operate = "NOT LIKE";
    }
    /* != null 转为 IS NOT NULL */
    if (operate === "!=" && value === null) {
      return `${fieldName} IS NOT NULL`;
    }
    if (operate === "IN" || operate === "NOTIN" || operate === "NOT IN") {
      if (operate === "NOTIN") {
        operate = "NOT IN";
      }
      if (valueType !== "array") {
        value = [value];
      }
      return `${fieldName} ${operate} (${value.join(",")})`;
    }
    if (operate === "BETWEEN") {
      if (valueType !== "array" || value.length < 2) return "";
      return `${fieldName} ${operate} ${value[0]} AND ${value[1]}`;
    }
    value = valueType === "string" && value !== "NULL" ? `'${value}'` : value;
    return `${fieldName} ${operate} ${value}`;
  }

  /**
   * 打印生成的sql语句，用于调试
   * @return {string} 生成的sql语句
   */
  _sql() {
    return this.sql;
  }
}

export default Sqlite;
