<template>
  <div class="admin">
    <h1>Admin page</h1>
    <file-upload title="Upload file"></file-upload>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import FileUpload from "@/components/FileUpload.vue";

export default {
  name: "Admin",
  components: { "file-upload": FileUpload },
};
</script>
