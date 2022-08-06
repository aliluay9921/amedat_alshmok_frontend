<template>
  <v-container>
    <v-card class="mt-5" elevation="4" shaped>
      <v-toolbar dark color="secondary">
        <v-toolbar-title align-center> قسم المبيعات</v-toolbar-title>
      </v-toolbar>

      <v-card-text> <saleCategoryForm></saleCategoryForm> </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <v-card class="mt-5">
      <saleCategoriesTable></saleCategoriesTable>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import saleCategoryForm from "../components/forms/saleCategoryForm.vue";
import saleCategoriesTable from "../components/tables/saleCategoriesTable.vue";

export default {
  name: "Home",
  components: {
    saleCategoriesTable,
    saleCategoryForm,
  },
};
</script>
