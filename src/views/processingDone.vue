<template>
  <v-container>
    <v-card class="mt-5" elevation="4" shaped> </v-card>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <v-card class="mt-5">
      <v-toolbar dark color="secondary">
        <v-toolbar-title align-center> المعمل </v-toolbar-title>
      </v-toolbar>
      <processingDoneTable></processingDoneTable>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import processingDoneTable from "../components/tables/processingDoneTable.vue";

export default {
  name: "Home",
  components: {
    processingDoneTable,
  },
};
</script>
