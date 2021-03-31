<!--
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-11-29 18:27:39
 * @LastEditors: Swoter
 * @LastEditTime: 2020-12-01 16:56:20
-->
<template>
  <button
    type="button"
    @click="onBtnClick"
    @mouseenter="showDashboard = true"
    @mouseleave="showDashboard = false"
  >
    <i :class="'follower-icon-' + module.icon"></i>
    <div
      class="follower-editor-dashboard"
      v-show="showDashboard"
      ref="dashboard"
    >
      <component
        v-if="module.render"
        v-once
        ref="moduleDashboard"
        :is="module"
        @exec="exec"
        :uid="uid"
        :options="options"
      ></component>
    </div>
  </button>
</template>
<script>
import bus from "./bus.js";

export default {
  props: ["module", "options"],

  data() {
    return {
      showDashboard: false,
    };
  },

  computed: {
    uid() {
      return this.$parent._uid;
    },
  },

  methods: {
    closeDashboard() {
      this.showDashboard = false;
    },

    openDashboard() {
      this.showDashboard = true;
    },

    exec() {
      this.$parent.exec.apply(null, arguments);
    },

    onBtnClick($event) {
      $event.preventDefault();
      if (this.module.action !== undefined)
        this.exec.apply(null, this.module.action);
      else if (this.module.customAction !== undefined) {
        this.module
          .customAction(bus.utils)
          .forEach((a) => this.exec.apply(null, a));
      } else if (
        this.module.render !== undefined &&
        (!this.$refs.dashboard || !this.$refs.dashboard.contains($event.target))
      ) {
        this.showDashboard = !this.showDashboard;
        bus.emit(
          `${this.uid}_${this.showDashboard ? "show" : "hide"}_dashboard_${
            this.module.title
          }`
        );
        return;
      }
    },
  },
};
</script>
