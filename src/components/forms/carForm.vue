<template>
  <v-container>
    <v-form ref="form" class="mr-10">
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="car_number"
              placeholder="رقم السيارة "
              label="رقم السيارة "
              hide-details="auto"
              :rules="[rules.required]"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="car_sequence"
              placeholder="تسلسل السيارة "
              label="تسلسل السيارة "
              hide-details="auto"
              :rules="[rules.required]"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" align-self="center" class="text-center">
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn secondary color="secondary" @click="addCar">
                  أضافة قيد
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
      car_number: "",
      car_sequence: "",

      rules: {
        required: (value) => !!value || "هذا الحقل مطلوب.",
        // min: (v) => v.length >= 6 || "يجب ان تكون كلمة المرور اكثر من 6 عناصر",
      },
    };
  },
  computed: {},
  methods: {
    addCar() {
      if (this.$refs.form.validate()) {
        let data = {};
        data["car_number"] = this.car_number;
        data["car_sequence"] = this.car_sequence;
        this.$store.dispatch("car/addCar", data);
        this.$store.dispatch("car/getCars", data);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
