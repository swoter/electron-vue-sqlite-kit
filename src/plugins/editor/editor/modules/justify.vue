<!--
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-11-30 09:59:20
 * @LastEditors: Swoter
 * @LastEditTime: 2020-11-30 16:57:43
-->
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
    <button
      type="button"
      v-for="align in aligns"
      :key="align.title"
      @click="justify(align)"
      :title="mergedOptions.locale[align.title] || align.description || ''"
    >
      <i :class="'follower-icon-' + align.icon"></i>
    </button>
  </div>
</template>

<script>
import bus from "../bus";
export default {
  title: "justify",
  description: "Align (left right center)",
  icon: "align-center",
  data() {
    return {
      aligns: [
        {
          title: "justifyLeft",
          action: ["justifyLeft"],
          description: "Justify Left",
          icon: "align-left",
        },
        {
          title: "justifyCenter",
          action: ["justifyCenter"],
          description: "Center",
          icon: "align-center",
        },
        {
          title: "justifyRight",
          action: ["justifyRight"],
          description: "Justify Right",
          icon: "align-right",
        },
      ],
    };
  },
  methods: {
    justify(e) {
      this.$parent.closeDashboard();
      this.$emit("exec", e.action, null);
    },
  },
  computed: {
    mergedOptions() {
      return { ...bus.options, ...this.options };
    },
  },
};
</script>
