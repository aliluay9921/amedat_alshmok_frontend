<template>
  <v-container>
    <v-card class="mt-5" elevation="4" shaped>
      <v-toolbar dark color="secondary">
        <v-toolbar-title align-center>السواق</v-toolbar-title>
      </v-toolbar>

      <v-card-text> <carForm></carForm> </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <v-card class="mt-5">
      <carsTable></carsTable>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import carForm from "../components/forms/carForm.vue";
import carsTable from "../components/tables/carsTable.vue";

export default {
  name: "Home",
  components: {
    carsTable,
    carForm,
  },
};
</script>
