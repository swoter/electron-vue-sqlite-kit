<!--
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-11-29 18:27:39
 * @LastEditors: Swoter
 * @LastEditTime: 2020-11-29 20:29:28
-->
<template>
  <form @submit.prevent="insertTable" class="form">
    <label>
      <div>Rows</div>
      <input type="number" style="width: 60px" min="2" v-model="rows" />
    </label>
    <label>
      <div>Columns</div>
      <input type="number" style="width: 60px" min="2" v-model="cols" />
    </label>

    <button type="submit">Insert</button>
  </form>
</template>

<script>
// import bus from 'src/editor/bus.js';

export default {
  title: "table",
  description: "Insert Table",
  icon: "table",

  data() {
    return {
      rows: 2,
      cols: 2,
    };
  },
  methods: {
    insertTable() {
      const rows = ("<tr>" + "<td></td>".repeat(this.cols) + "</tr>").repeat(
        this.rows
      );

      this.$emit("exec", "insertHTML", `<table><tbody>${rows}</tbody></table>`);
      this.$parent.closeDashboard();
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  align-content: flex-end;
}
.form label {
  margin-right: 1rem;
}
</style>
