<template>
  <b-container class="fileUpload-container">
    <h3>{{ title }}</h3>

    <input
      style="display: none"
      type="file"
      @change="onFileSelected"
      ref="fileInput"
    />
    <b-button @click="$refs.fileInput.click()" class="pick"
      >Choose File</b-button
    >
    <b-button @click="onUpload">Upload</b-button>
  </b-container>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "FileUpload",
  props: { title: String },
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    onFileSelected(e) {
      this.selectedFile = e.target.files[0];
    },
    async onUpload() {
      const fd = new FormData();
      fd.append("file", this.selectedFile, this.selectedFile.name);

      const res = await axios.post(
        "http://localhost:3000/api/v1/files/upload",
        fd,
        {
          onUploadProgress: (uploadEvent) => {
            console.log(
              `Upload Progress: ${Math.round(
                (uploadEvent.loaded / uploadEvent.total) * 100
              )} % `
            );
          },
        }
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fileUpload-container {
  .pick {
    margin-right: 10px;
  }
}
</style>
