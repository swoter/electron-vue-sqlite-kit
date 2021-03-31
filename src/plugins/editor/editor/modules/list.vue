<!--
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-11-30 09:59:20
 * @LastEditors: Swoter
 * @LastEditTime: 2020-12-01 15:53:04
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
      v-for="item in items"
      :key="item.title"
      @click="listFormat(item)"
      :title="mergedOptions.locale[item.title] || item.description || ''"
    >
      <i :class="'follower-icon-' + item.icon"></i>
    </button>
  </div>
</template>

<script>
import bus from "../bus";
export default {
  title: "orderList",
  description: "orderedList (left right center)",
  icon: "orderlist",
  data() {
    return {
      items: [
        {
          title: "orderedList",
          action: ["insertOrderedList"],
          description: "Insert Ordered List",
          icon: "orderlist",
        },
        {
          title: "unorderedList",
          action: ["insertUnorderedList"],
          description: "Insert Unordered List",
          icon: "menu",
        },
      ],
    };
  },
  methods: {
    listFormat(e) {
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
