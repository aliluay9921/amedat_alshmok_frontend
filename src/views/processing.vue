<template>
  <v-container>
    <v-card class="mt-5" elevation="4" shaped> </v-card>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <v-card class="mt-5">
      <v-toolbar dark color="secondary">
        <v-toolbar-title align-center> المعمل </v-toolbar-title>
      </v-toolbar>
      <processingTable></processingTable>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import processingTable from "../components/tables/processingTable.vue";

export default {
  name: "Home",
  components: {
    processingTable,
  },
};
</script>
