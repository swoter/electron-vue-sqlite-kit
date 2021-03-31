<template>
  <div class="follower-editor">
    <div
      class="follower-editor-toolbar"
      :style="{
        opacity: toolBarOpacity,
        left: mouseX + 'px',
        top: mouseY + 'px',
      }"
      ref="followerEditorToolbar"
    >
      <Btn
        v-for="(module, i) in modules"
        :module="module"
        :options="mergedOptions"
        :key="module.title + i"
        :ref="'btn-' + module.title"
        :title="mergedOptions.locale[module.title] || module.description || ''"
      ></Btn>
    </div>
    <div
      class="follower-editor-content"
      ref="content"
      contenteditable="!disabled"
      tabindex="1"
      :placeholder="placeholder"
    ></div>
  </div>
</template>

<script>
import "./scss/editor.scss";
import bus from "./bus";
import debounce from "debounce";
import Btn from "./Button";
import bold from "./modules/bold";
import color from "./modules/color";
import italic from "./modules/italic";
import underline from "./modules/underline";
import justify from "./modules/justify";
import headings from "./modules/headings";
import hyperlink from "./modules/hyperlink";
import quote from "./modules/quote";
import code from "./modules/code";
import listOrdered from "./modules/list";
import image from "./modules/image";
import table from "./modules/table";
import removeFormat from "./modules/removeFormat";

const modules = [
  bold,
  italic,
  underline,
  color,
  justify,
  headings,
  hyperlink,
  quote,
  code,
  listOrdered,
  image,
  table,
  removeFormat,
];

export default {
  model: {
    prop: "html",
    event: "html",
  },

  props: {
    html: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "输入文本...",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: Object,
  },

  components: { Btn },

  data() {
    return {
      selection: "",
      toolBar: null,
      toolBarOpacity: 0,
      mouseX: 0,
      mouseY: 0,
    };
  },

  computed: {
    mergedOptions() {
      return { ...bus.options, ...this.options };
    },

    modules() {
      const customIcons = this.mergedOptions.iconOverrides;

      return modules
        .filter(
          (m) =>
            this.mergedOptions.hideModules === undefined ||
            !this.mergedOptions.hideModules[m.title]
        )
        .map((mod) => {
          if (
            customIcons !== undefined &&
            customIcons[mod.title] !== undefined
          ) {
            mod.icon = customIcons[mod.title];
          }
          return mod;
        })
        .concat(this.mergedOptions.customModules);
    },

    btnsWithDashboards() {
      if (this.modules) return this.modules.filter((m) => m.render);
      return [];
    },

    innerHTML: {
      get() {
        return this.$refs.content.innerHTML;
      },

      set(html) {
        if (this.$refs.content.innerHTML !== html) {
          this.$refs.content.innerHTML = html;
        }
      },
    },
  },

  methods: {
    saveSelection() {
      if (window.getSelection !== undefined) {
        this.selection = window.getSelection();
        if (this.selection.getRangeAt && this.selection.rangeCount) {
          return this.selection.getRangeAt(0);
        }
      } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
      }
      return null;
    },

    restoreSelection(range) {
      if (range) {
        if (window.getSelection !== undefined) {
          this.selection = window.getSelection();
          this.selection.removeAllRanges();
          this.selection.addRange(range);
        } else if (document.selection && range.select) range.select();
      }
    },
    clearSelection() {
      this.selection = null;
      const selection = window.getSelection();

      if (selection) {
        if (selection.empty !== undefined) {
          selection.empty();
        }
        if (selection.removeAllRanges !== undefined) {
          selection.removeAllRanges();
        }
      }
    },
    exec(cmd, arg, sel) {
      sel !== false && this.selection && this.restoreSelection(this.selection);
      document.execCommand(cmd, false, arg || "");
      this.clearSelection();

      this.$nextTick(this.emit);
    },

    onDocumentClick(e) {
      for (let i = 0; i < this.btnsWithDashboards.length; i++) {
        const btn = this.$refs[`btn-${this.btnsWithDashboards[i].title}`][0];
        if (btn && btn.showDashboard && !btn.$el.contains(e.target))
          btn.closeDashboard();
      }
    },

    emit() {
      this.$emit("html", this.$refs.content.innerHTML);
      this.$emit("change", this.$refs.content.innerHTML);
    },

    onInput: debounce(function () {
      this.emit();
    }, 300),

    onFocus(e) {
      document.execCommand(
        "defaultParagraphSeparator",
        false,
        this.mergedOptions.paragraphSeparator
      );
      this.syncToolbar(e);
    },

    onContentBlur(e) {
      e.stopPropagation();
      // save focus to restore it later
      this.selection = this.saveSelection();
      this.$emit("blur", this.$refs.content);
      this.toolBarOpacity = 0;
    },

    onContent(e) {
      e.stopPropagation();
      this.syncToolbar(e);
    },

    onPaste(e) {
      e.preventDefault();

      // get a plain representation of the clipboard
      var text = e.clipboardData.getData("text/plain");

      // insert that plain text text manually
      document.execCommand("insertHTML", false, text);
    },

    syncHTML() {
      if (this.html !== this.$refs.content.innerHTML)
        this.innerHTML = this.html;
    },
    syncToolbar(e) {
      e.stopPropagation();
      const selection = this.getSelectionEl();
      if (selection.focusNode) {
        this.mouseX = e.layerX - this.toolbar.clientWidth / 2;
        this.mouseX = this.mouseX < 0 ? 0 : this.mouseX;
        this.mouseY =
          (selection.focusNode.offsetTop ||
            selection.focusNode.parentElement.offsetTop) -
          this.toolbar.clientHeight -
          8;
        this.toolBarOpacity = 1;
      }
    },
    getSelectionEl() {
      if (window.getSelection) {
        return window.getSelection();
      } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
      }
      return false;
    },
  },

  mounted() {
    this.toolbar = this.$refs.followerEditorToolbar;
    this.toolbar.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this.toolbar.addEventListener("touchend", (e) => {
      e.stopPropagation();
    });

    this.unwatch = this.$watch("html", this.syncHTML, { immediate: true });

    document.addEventListener("click", this.onDocumentClick);

    this.$refs.content.addEventListener("focus", this.onFocus);
    this.$refs.content.addEventListener("click", this.onContent);
    this.$refs.content.addEventListener("touchend", this.onContent);
    this.$refs.content.addEventListener("input", this.onInput);
    this.$refs.content.addEventListener("blur", this.onContentBlur, {
      capture: true,
    });

    if (this.mergedOptions.forcePlainTextOnPaste === true) {
      this.$refs.content.addEventListener("paste", this.onPaste);
    }

    this.$refs.content.style.maxHeight = this.mergedOptions.maxHeight;
  },

  beforeDestroy() {
    this.unwatch();
    document.removeEventListener("click", this.onDocumentClick);

    this.$refs.content.removeEventListener("blur", this.onContentBlur);
    this.$refs.content.removeEventListener("input", this.onInput);
    this.$refs.content.removeEventListener("focus", this.onFocus);
  },
};
</script>
