<template>
  <v-container>
    <v-card class="mt-5" elevation="4" shaped>
      <v-toolbar dark color="secondary">
        <v-toolbar-title v-if="user_type == 0" align-center>
          قسم المبيعات</v-toolbar-title
        >
        <v-toolbar-title v-if="user_type == 4" align-center>
          قسم المندوبين</v-toolbar-title
        >
        <v-toolbar-title v-if="user_type == 5" align-center>
          قسم المهندسين</v-toolbar-title
        >
        <v-toolbar-title v-if="user_type == 6" align-center>
          الأدارة</v-toolbar-title
        >
      </v-toolbar>

      <v-card-text v-if="user_type != 5">
        <saleCategoryForm></saleCategoryForm>
      </v-card-text>
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
  computed: {
    user_type() {
      return localStorage.getItem("user_type");
    },
  },
};
</script>
