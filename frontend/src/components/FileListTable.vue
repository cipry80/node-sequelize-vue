<template>
  <table class="files-table">
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Type</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
    <tr v-for="file in files" :key="file.id">
      <td>{{ file.fileId }}</td>
      <td>{{ file.name }}</td>
      <td>{{ file.type }}</td>
      <td><b-button>Edit</b-button></td>
      <td><b-button>Delete</b-button></td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "FileListGroup",
  props: {
    files: Array,
  },
  data() {
    return {};
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
