<!--
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-11-29 18:27:39
 * @LastEditors: Swoter
 * @LastEditTime: 2020-11-29 20:27:34
-->
<template>
  <form @submit.prevent="insertLink">
    <label>
      URL
      <input ref="url" type="text" style="width: 40%" v-model="url" />
    </label>
    <label>
      Link Title
      <input type="text" style="width: 40%" v-model="title" />
    </label>

    <button type="submit">Insert</button>
  </form>
</template>

<script>
import bus from "../bus.js";

export default {
  title: "link",
  icon: "link",
  description: "Hyperlink",
  props: {
    uid: null,
  },

  data() {
    return {
      url: "",
      title: "",
    };
  },
  methods: {
    insertLink() {
      this.$emit(
        "exec",
        "insertHTML",
        `<a href='${this.url}'>${this.title}</a>`
      );
      this.$parent.closeDashboard();
      this.url = "";
      this.title = "";
    },
  },

  created() {
    bus.on(this.uid + "_show_dashboard_link", () => {
      this.$nextTick(() => {
        this.$refs.url.focus();
      });
    });
  },
};
</script>
