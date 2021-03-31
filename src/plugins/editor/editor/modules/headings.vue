<!--
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-11-29 18:27:39
 * @LastEditors: Swoter
 * @LastEditTime: 2020-11-29 23:44:31
-->
<template>
  <div class="flex">
    <button type="button" @click="insertHeading">H1</button>
    <button type="button" @click="insertHeading">H2</button>
    <button type="button" @click="insertHeading">H3</button>
    <button type="button" @click="insertHeading">H4</button>
    <button type="button" @click="insertHeading">H5</button>
    <button type="button" @click="insertHeading">H6</button>
  </div>
</template>

<script>
export default {
  title: "headings",
  description: "Headings (h1-h6)",
  icon: "heading",

  methods: {
    insertHeading(e) {
      this.$parent.closeDashboard();
      this.$emit("exec", "formatBlock", e.target.textContent);
    },
  },
};
</script>
