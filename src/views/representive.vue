<template>
  <v-container>
    <v-card class="mt-5" elevation="4" shaped>
      <v-toolbar dark color="secondary">
        <v-toolbar-title align-center>المندوبين</v-toolbar-title>
      </v-toolbar>

      <v-card-text> <representiveForm></representiveForm> </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <v-card class="mt-5">
      <representivesTable></representivesTable>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import representiveForm from "../components/forms/representiveForm.vue";
import representivesTable from "../components/tables/representivesTable.vue";

export default {
  name: "Home",
  components: {
    representivesTable,
    representiveForm,
  },
};
</script>
