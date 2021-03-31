<!--
 * @Descripttion: []
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-11-29 18:27:39
 * @LastEditors: Swoter
 * @LastEditTime: 2020-11-29 20:25:15
-->
<template>
  <Dropzone
    :options="dropzoneOptions"
    :id="_uid + 'vwdropzone'"
    ref="dropzone"
    @vdropzone-success="fileUploaded"
    @vdropzone-file-added="fileAdded"
  >
  </Dropzone>
</template>

<script>
import Dropzone from "vue2-dropzone";
import bus from "../bus.js";

const UPLOAD_ICON = "uploud";

export default {
  title: "image",
  icon: "image",
  description: "Insert Image",

  props: ["options"],
  components: {
    Dropzone,
  },

  computed: {
    uploadURL() {
      return this.options.image.uploadURL;
    },

    dropzoneOptions() {
      return {
        // custom dropzone options
        ...this.options.image.dropzoneOptions,

        // vue2-dropzone config
        id: `${this._uid}vwdropzone`,
        url: this.uploadURL,
        autoProcessQueue: this.uploadURL !== "None",
        dictDefaultMessage: `<i class="fa">${UPLOAD_ICON}</i><br>Click here to upload...`,
      };
    },
  },

  methods: {
    fileUploaded(file, r) {
      if (r) this.$emit("exec", "insertHTML", `<img src=${r}>`);
    },

    fileAdded(file) {
      // if no upload url is defined, insert image with base64 src
      if (file && this.uploadURL !== "None") return;

      const reader = new FileReader();

      reader.addEventListener(
        "load",
        () => {
          this.$emit("exec", "insertHTML", `<img src=${reader.result}>`);
        },
        false
      );

      reader.readAsDataURL(file);
    },
  },
};
</script>
