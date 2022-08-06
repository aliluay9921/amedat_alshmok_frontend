<template>
  <v-app>
    <v-app-bar app color="primary" dark v-if="!$route.path.includes('login')">
      <v-spacer></v-spacer>
      <h2>شركة اعمدة الشموخ</h2>
    </v-app-bar>
    <v-main>
      <!-- <v-snackbar v-model="snackbar" shaped :multi-line="true">
        <div v-for="(text, index) in textSnackbar.split('\n')" :key="index">
          {{ index == 0 ? "" : index + "-" }} {{ text }}
        </div>

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            أغلاق
          </v-btn>
        </template>
      </v-snackbar> -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    // snackbar: {
    //   set: function () {
    //     this.$store.dispatch("snackbarToggle", { toggle: false });
    //   },
    //   get: function () {
    //     return this.$store.state.snackbar;
    //   },
    // },
    // textSnackbar: function () {
    //   return this.$store.state.textSnackbar;
    // },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Cairo&display=swap");
* {
  font-family: Cairo;
}
#app {
  background-color: #f4f9f9;
  /* background-color: #fff; */
}
</style>
