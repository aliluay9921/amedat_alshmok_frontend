<template>
  <v-container>
    <v-card class="mt-5">
      <v-toolbar dark color="secondary">
        <v-toolbar-title align-center>المستخدمين</v-toolbar-title>
      </v-toolbar>
      <usersTable></usersTable>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import carForm from "../components/forms/carForm.vue";
import usersTable from "../components/tables/usersTable.vue";

export default {
  name: "Home",
  components: {
    usersTable,
    // carForm,
  },
};
</script>
