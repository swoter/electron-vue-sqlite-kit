<!--
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-11-29 18:27:39
 * @LastEditors: Swoter
 * @LastEditTime: 2020-12-01 16:54:00
-->
<template>
  <div class="follower-editor-color-picker">
    <a
      href="javascript:;"
      class="mr-10"
      :class="{ active: action == 'ForeColor' }"
      @click="changeAction('ForeColor')"
      >文字</a
    >
    <a
      href="javascript:;"
      class="mr-10"
      :class="{ active: action == 'BackColor' }"
      @click="changeAction('BackColor')"
      >背景</a
    >
    <a
      class="follower-editor-color-picker-item"
      href="javascript:;"
      v-for="item in colors"
      :key="item"
      @click="insertColor(item)"
      :style="{
        backgroundColor: item,
      }"
    ></a>
  </div>
</template>

<script>
export default {
  title: "color",
  description: "Color (font color, background color)",
  icon: "font-color",
  data() {
    return {
      action: "ForeColor",
      colors: [
        "#000000",
        "#FFFFFF",
        "#FF1900",
        "#F47365",
        "#FFB243",
        "#FFE623",
        "#6EFF2A",
        "#1BC7B1",
        "#00BEFF",
        "#2E81FF",
        "#5D61FF",
        "#FF89CF",
        "#FC3CAD",
        "#BF3DCE",
        "#8E00A7",
      ],
    };
  },
  mounted() {
    console.log(this.$parent);
  },
  methods: {
    changeAction(action) {
      this.action = action;
      this.$parent.$parent.onContentBlur();
    },
    insertColor(e) {
      console.log(this.$parent);
      this.$parent.closeDashboard();
      this.$emit("exec", this.action, e);
    },
  },
};
</script>
