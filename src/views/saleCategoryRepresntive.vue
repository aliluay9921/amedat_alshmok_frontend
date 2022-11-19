<template>
  <v-container>
    <v-card class="mt-5" elevation="4" shaped>
      <v-toolbar dark color="secondary">
        <v-toolbar-title align-center> صبات المندوبين</v-toolbar-title>
      </v-toolbar>
    </v-card>

    <v-card class="mt-5">
      <saleCategoriesRepresentiveTable></saleCategoriesRepresentiveTable>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import saleCategoriesRepresentiveTable from "../components/tables/saleCategoriesRepresentiveTable.vue";

export default {
  name: "Home",
  components: {
    saleCategoriesRepresentiveTable,
  },
  computed: {
    user_type() {
      return localStorage.getItem("user_type");
    },
  },
};
</script>
