<template>
  <b-container class="fileUpload-container">
    <h3>{{ title }}</h3>
    <div v-if="message" :class="`message ${error ? 'danger' : 'success'}`">
      <div class="message-body">{{ message }}</div>
    </div>

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
      message: "",
      error: false,
    };
  },
  methods: {
    onFileSelected(e) {
      this.selectedFile = e.target.files[0];
      this.error = false;
      this.message = null;
    },
    async onUpload() {
      try {
        const fd = new FormData();
        fd.append("file", this.selectedFile, this.selectedFile.name);

        await axios.post("http://localhost:3000/api/v1/files/upload", fd, {
          onUploadProgress: (uploadEvent) => {
            console.log(
              `Upload Progress: ${Math.round(
                (uploadEvent.loaded / uploadEvent.total) * 100
              )} % `
            );
          },
        });
        this.message = "File uploaded with success";
        this.error = false;
        this.selectedFile = null;
      } catch (error) {
        this.message = error.response.data;
        this.error = true;
        console.log(error);
      }
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
