<template>
  <v-container>
    <v-card class="mt-5" elevation="4" shaped>
      <v-toolbar dark color="secondary">
        <v-toolbar-title align-center>السواق</v-toolbar-title>
      </v-toolbar>

      <v-card-text> <driverForm></driverForm> </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <v-card class="mt-5">
      <driversTable></driversTable>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import driverForm from "../components/forms/driverForm.vue";
import driversTable from "../components/tables/driversTable.vue";

export default {
  name: "Home",
  components: {
    driversTable,
    driverForm,
  },
};
</script>
