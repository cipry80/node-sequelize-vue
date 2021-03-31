<template>
  <div class="admin">
    <h1>Admin page</h1>
    <file-upload title="Upload file"></file-upload>
    <file-list :files="files"></file-list>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

import FileUpload from "@/components/FileUpload.vue";
import FileListTable from "../components/FileListTable.vue";

export default {
  name: "Admin",
  components: { "file-upload": FileUpload, "file-list": FileListTable },
  data() {
    return {
      files: [],
      errors: [],
    };
  },
  async mounted() {
    const { data } = await axios.get("http://localhost:3000/api/v1/files");
    this.files = data.files;
  },
};
</script>

<style lang="scss" scoped></style>
