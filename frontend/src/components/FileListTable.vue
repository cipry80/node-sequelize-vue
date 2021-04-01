<template>
  <table class="files-table">
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Type</th>
      <th>Delete</th>
    </tr>
    <tr v-for="(file, i) in files" :key="file.id">
      <td>{{ file.fileId }}</td>
      <td>{{ file.name }}</td>
      <td>{{ file.type }}</td>
      <td><b-button @click="deleteFile(file.fileId, i)">Delete</b-button></td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
import { bus } from "../main";

export default {
  name: "FileListGroup",
  props: {
    files: Array,
  },
  data() {
    return {
      file: "",
    };
  },
  methods: {
    async deleteFile(fileId, i) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/files/${fileId}`);
        this.files.splice(i, 1);
        bus.$emit("fileDeleted", "File deleted with success");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.files-table {
  margin: 50px auto;
}

table,
th,
td {
  border: 1px solid black;
}
</style>
