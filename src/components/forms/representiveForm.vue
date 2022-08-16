<template>
  <v-container>
    <v-form ref="form" class="mr-10">
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="selected_object.full_name"
              placeholder="اسم المندوب"
              label="اسم المندوب"
              hide-details="auto"
              :rules="[rules.required]"
              clearable
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              v-model="selected_object.user_name"
              placeholder="أدخل اسم المستخدم"
              label="أدخل اسم المستخدم"
              hide-details="auto"
              :rules="[rules.required]"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" v-if="!isEdit">
            <v-text-field
              v-model="selected_object.password"
              :rules="[rules.required]"
              label="أدخل كلمة المرور"
              hint="يجب ان تكون كلمة المرور اكثر من 6 عناصر"
              counter
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" align-self="center" class="text-center">
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn secondary color="secondary" @click="validateField">
                  {{ isEdit ? "تعديل القيد" : "أضافة قيد" }}
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn secondary color="secondary" @click="reset">
                  تصفير الحقول
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-form></v-container
  >
</template>
<script>
export default {
  data() {
    return {
      menu: null,
      show: false,
      full_name: "",
      user_name: "",
      password: "",
      rules: {
        required: (value) => !!value || "هذا الحقل مطلوب.",
        // min: (v) => v.length >= 6 || "يجب ان تكون كلمة المرور اكثر من 6 عناصر",
      },
    };
  },
  computed: {
    // currentLocale() {
    //   console.log(moment.locale("ar"));

    //   return moment.locale("ar");
    // },
    selected_object() {
      return this.$store.state.representive.selected_object;
    },
    isEdit() {
      return this.$store.state.representive.isEdit;
    },
  },
  methods: {
    validateField() {
      if (this.$refs.form.validate()) {
        let data = {};
        data["full_name"] = this.selected_object.full_name;
        data["user_name"] = this.selected_object.user_name;

        if (this.isEdit) {
          data["id"] = this.selected_object.id;
          this.editData(data);
        } else {
          data["password"] = this.selected_object.password;

          this.addData(data);
        }
      }
    },
    addData(data) {
      this.$store.dispatch("representive/addRepresentive", data);
      this.$store.dispatch("representive/getRepresentives", data);
    },
    editData(data) {
      this.$store.dispatch("representive/editRepresentives", data);
    },
    reset() {
      this.$refs.form.reset();
      this.$store.state.representive.isEdit = false;
    },
  },
};
</script>
