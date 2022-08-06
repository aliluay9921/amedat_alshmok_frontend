<template>
  <v-container>
    <v-card class="mt-5" elevation="4" shaped> </v-card>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <v-card class="mt-5">
      <v-toolbar dark color="secondary">
        <v-toolbar-title align-center> الفواتير </v-toolbar-title>
      </v-toolbar>
      <invoicemntsTable></invoicemntsTable>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import invoicemntsTable from "../components/tables/invoicemntsTable.vue";

export default {
  components: {
    invoicemntsTable,
  },
};
</script>
