<template>
  <v-container>
    <v-form ref="form" class="mr-10">
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-col cols="12" sm="3">
            <v-combobox
              clearable
              placeholder="الموقع"
              label="الموقع"
              v-model="selected_object.place"
              :items="locations"
            ></v-combobox>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="selected_object.name_customer"
              placeholder="اسم الزبون"
              label="اسم الزبون"
              hide-details="auto"
              :rules="rules"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-select
              :items="ecment_degree"
              label="اختر درجة الأسمنت"
              v-model="selected_object.degree"
              hide-details="auto"
              :rules="rules"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" sm="2">
            <v-select
              :items="ecment_type"
              label="اختر نوعية الأسمنت"
              v-model="selected_object.type"
              hide-details="auto"
              :rules="rules"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="selected_object.quantity"
              placeholder="الكمية بالمتر المكعب"
              label="الكمية بالمتر المكعب"
              hide-details="auto"
              :rules="rules"
              hint="الكمية بالمتر المكعب"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="selected_object.name_representative"
              placeholder="اسم المندوب"
              label="اسم المندوب"
              hide-details="auto"
              :rules="rules"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="selected_object.phone_number"
              placeholder="رقم الهاتف"
              label="رقم الهاتف"
              hide-details="auto"
              :rules="rules"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="selected_object.man_buliding"
              placeholder="عدد الخلفات"
              label="عدد الخلفات"
              hide-details="auto"
              :rules="rules"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="selected_object.workers"
              placeholder="عدد العمال"
              label="عدد العمال"
              hide-details="auto"
              :rules="rules"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="selected_object.bump"
              placeholder="البم"
              label="البم"
              hide-details="auto"
              :rules="rules"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="selected_object.price"
              placeholder="السعر"
              label="السعر"
              hide-details="auto"
              :rules="rules"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-menu
              v-model="selected_object.menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  clearable
                  v-model="selected_object.date"
                  label="التأريخ"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  :attrs-name="months_picker"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="selected_object.date"
                @input="menu = false"
                :locale="currentLocale"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="selected_object.time"
              placeholder="الوقت"
              label="الوقت"
              hide-details="auto"
              :rules="rules"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="selected_object.notes"
              placeholder="الملاحضات"
              label="الملاحضات"
              hide-details="auto"
              clearable
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
      rules: [(value) => !!value || "هذا الحقل مطلوب."],
      locations: [
        "الكرادة",
        "المنصور",
        "الشعب",
        "الفضل ",
        "الصدرية ",
        "باب الشيخ ",
        "العطيفية ",
        "الكاظمية ",
        "الأعظمية ",
        "الكريعات ",
        "الصليخ ",
        "حي القاهرة ",
        "حي المستنصرية",
        "زيونة ",
        "راغبة خاتون",
        "حي اليرموك ",
        "مدينة الصدر ",
        "الوزيرية ",
        "بغداد الجديدة ",
        "العبيدي ",
        "الرشاد",
        "الكمالية",
        "مدينة الصدر ",
        "البلديات ",
        "البياع ",
        "السيدية",
        "حي الخضراء ",
        "الراشدية",
        "حي الزهور",
        "الحسينية",
        "حي الاستقلال",
        "العامرية",
        " الفحامة ",
        " حي الشعب ",
        " حي أور ",
        " حي المنصور ",
        " حي القادسية ",
        " حي المأمون ",
        " الدورة",
        " الغزالية ",
        " الجادرية ",
        " الزعفرانية ",
        " المدائن ",
        " ابو غريب ",
        " الشعلة ",
        " الحرية ",
        " شارع فلسطين ",
        " التاجي ",
        " الطارمية ",
        " جسر ديالى ",
        " حي العامل ",
        " حي الجهاد ",
        " حي الفرات",
        " المحمودية",
        " اليوسفية",
        " الرشيد",
      ],
      months_picker: ["asd", "asda"],
      ecment_degree: [
        "C-15",
        "C-20",
        "C-25",
        "C-30",
        "C-35",
        "C-40",
        "C-45",
        "C-50",
      ],
      ecment_type: ["عادي", "مقاوم"],
      place: "",
      name_customer: "",
      type: "",
      dgree: "",
      quantity: "",
      man_buliding: "",
      workers: "",
      bump: "",
      daecment_te: "",
      time: "",
      name_representative: "",
      phone_number: "",
      price: "",
      actual_quantity: "",
      notes: "",
      currentLocale: "ar",
    };
  },
  computed: {
    // currentLocale() {
    //   console.log(moment.locale("ar"));

    //   return moment.locale("ar");
    // },
    selected_object() {
      return this.$store.state.saleCategory.selected_object;
    },
    isEdit() {
      return this.$store.state.saleCategory.isEdit;
    },
  },
  methods: {
    validateField() {
      if (this.$refs.form.validate()) {
        let data = {};
        data["place"] = this.selected_object.place;
        data["name_customer"] = this.selected_object.name_customer;
        data["type"] = this.selected_object.type;
        data["degree"] = this.selected_object.degree;
        data["quantity"] = this.selected_object.quantity;
        data["man_buliding"] = this.selected_object.man_buliding;
        data["workers"] = this.selected_object.workers;
        data["bump"] = this.selected_object.bump;
        data["date"] = this.selected_object.date;
        data["time"] = this.selected_object.time;
        data["name_representative"] = this.selected_object.name_representative;
        data["phone_number"] = this.selected_object.phone_number;
        data["price"] = this.selected_object.price;
        data["actual_quantity"] = this.selected_object.actual_quantity;
        data["notes"] = this.selected_object.notes;
        // this.ecment_degree
        if (this.isEdit) {
          data["sale_category_id"] = this.selected_object.id;
          this.editData(data);
        } else {
          this.addData(data);
        }
      }
    },
    addData(data) {
      this.$store.dispatch("saleCategory/addSaleCategorie", data);
      this.$store.dispatch("saleCategory/getSaleCategorie", data);
    },
    editData(data) {
      this.$store.dispatch("saleCategory/editSaleCategory", data);
    },
    reset() {
      this.$refs.form.reset();
      this.$store.state.saleCategory.isEdit = false;
    },
  },
};
</script>
