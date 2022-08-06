<template>
  <v-card class="elevation-1">
    <!-- dilog to done and print invoice -->
    <template>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="3">
            <v-btn dark color="primary" to="/invoicment">الفواتير</v-btn>
          </v-col>
          <v-col cols="12" sm="3">
            <v-btn dark color="primary" to="/processing"
              >المبيعات قيد الانتضار</v-btn
            >
          </v-col>
          <v-col cols="12" sm="3">
            <v-btn dark color="primary" to="/processDone"
              >المبيعات قيد التنفيذ</v-btn
            >
          </v-col>
          <v-col cols="12" sm="3">
            <v-btn dark color="primary" to="/doneSaleCategory"
              >المبيعات المكتملة</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template>
      <v-container>
        <v-row justify="center">
          <v-dialog v-model="dialog" scrollable max-width="900px">
            <v-card>
              <v-card-title class="text-h5 secondary white--text">
                تأكيد الطلب
              </v-card-title>
              <v-card-text>
                <v-form ref="form" id="printMe">
                  <v-col cols="12" md="12" lg="12">
                    <v-row>
                      <v-col sm="12" md="12" lg="12" justify="center">
                        <div class="title text-center" justify="center">
                          <h1
                            style="
                              margin: 0 auto;
                              border-top: 1px dashed #bbb;
                              padding: 10px;
                              text-align: center;
                            "
                          >
                            شركة اعمدة الشموخ للمقاولات العامة المحدودة وتجهيز
                            الكونكريت
                          </h1>
                        </div>
                        <div class="numbers" justify="center">
                          <p
                            style="
                              margin: 0 auto;
                              padding: 10px;
                              text-align: center;
                            "
                          >
                            <b>07711119970-07811119970-07705333603</b>
                          </p>
                        </div>
                        <hr />
                        <div>
                          <p
                            style="
                              margin: 0 auto;
                              padding: 10px;
                              text-align: right;
                            "
                          >
                            <span style="padding-left: 75px">
                              <b>رقم الفاتورة : {{ invoice_no }}</b>
                            </span>
                            <span style="padding-left: 75px">
                              <b>التسلسل: </b>
                            </span>
                            <span style="padding-left: 75px"
                              ><b>التأريخ : {{ date }} </b></span
                            >
                            <span style="padding-left: 55px">
                              <b>الوقت : {{ time }} </b>
                            </span>
                          </p>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row dir="rtl">
                      <div class="col-4 d-block">
                        <div class="details">
                          <div class="title">
                            <label for="" color="primary"> اسم السائق</label>
                          </div>
                          <div class="data">
                            <input
                              type="text"
                              style="text-align: center"
                              v-model="driver_name"
                            />
                          </div>
                        </div>
                        <div class="details">
                          <div class="title">
                            <label for=""> رقم السيارة</label>
                          </div>
                          <div class="data">
                            <input
                              type="text"
                              style="text-align: center"
                              v-model="car_number"
                            />
                          </div>
                        </div>
                        <div class="details">
                          <div class="title">
                            <label for="" style="padding-left: 35px">
                              الكمية
                            </label>
                          </div>
                          <div class="data">
                            <input
                              type="text"
                              style="text-align: center"
                              v-model="quantity_car"
                            />
                          </div>
                        </div>
                        <div class="details">
                          <div class="title">
                            <label for="" style="padding-left: 35px">
                              النوع
                            </label>
                          </div>
                          <div class="data">
                            <p>{{ type }}</p>
                          </div>
                        </div>
                        <div class="details">
                          <div class="title">
                            <label for="" style="padding-left: 35px">
                              اسم الموقع
                            </label>
                          </div>
                          <div class="data">
                            <p>{{ place }}</p>
                          </div>
                        </div>
                        <div class="details">
                          <div class="title">
                            <label for="" style="padding-left: 35px">
                              اسم المستلم
                            </label>
                          </div>
                          <div class="data">
                            <p>{{ name_customer }}</p>
                          </div>
                        </div>
                        <div class="details">
                          <div class="title">
                            <label for="" style="padding-left: 35px">
                              اسم المجهز
                            </label>
                          </div>
                          <div class="data">
                            <p>{{ full_name }}</p>
                          </div>
                        </div>
                        <div class="details">
                          <div class="title">
                            <label for="" style="padding-left: 35px">
                              اسم المندوب
                            </label>
                          </div>
                          <div class="data">
                            <p>{{ name_representative }}</p>
                          </div>
                        </div>
                      </div>
                    </v-row>
                    <v-row>
                      <div class="signthure">
                        <p>التوقيع</p>
                      </div>
                    </v-row>
                  </v-col>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                  <v-btn
                    secondary
                    color="secondary"
                    @click="add_process"
                    v-print="'#printMe'"
                  >
                    طباعة
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn secondary color="secondary" @click="dialog = false">
                    غلق
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </template>

    <v-data-table
      :headers="headers"
      :items="invoicemnts"
      :search="search"
      loading-text="جاري التحميل يرجى الأنتظار"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.driver_name }}</td>
          <td class="text-start">{{ item.car_number }}</td>
          <td class="text-start">{{ item.quantity_car }}</td>
          <td class="text-start">{{ item.invoice_no }}</td>
          <td class="text-start">{{ item.sequence }}</td>
          <td class="text-start">{{ item.employee.full_name }}</td>
          <td class="text-start">
            <v-btn dark color="green" @click="done(item)">طباعة</v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="بحث"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      rules: [(value) => !!value || "هذا الحقل مطلوب."],
      driver_name: "",
      car_number: "",
      actual_quantity: "",
      quantity_car: "",
      name_representative: "",
      phone_number: "",
      place: "",
      date: "",
      time: "",
      type: "",
      employee: "",
      name_customer: "",
      invoice_no: "",
      dialog: false,
      item: {},
      printObj: {
        id: "print_me",
        popTitle: "طباعة سند قبض/صرف",
        extraHead: '<meta http-equiv="Content-Language"content="en-ar"/>',
      },
      headers: [
        {
          text: "اسم السائق",
          value: "driver_name",
          align: "start",
          class: "secondary white--text title ",
        },
        {
          text: "رقم السيارة ",
          value: "car_number",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "الكمية",
          value: "quantity_car",

          class: "secondary white--text title  ",
        },
        {
          text: "رقم الفاتورة",
          value: "invoice_no",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "التسلسل",
          value: "sequence",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "المجهز",
          value: "employee",
          align: "start",
          class: "secondary white--text title",
        },

        {
          text: "ترحيل",
          align: "start",
          class: "secondary white--text title",
        },
      ],
    };
  },
  computed: {
    full_name() {
      return localStorage.getItem("full_name");
    },

    invoicemnts() {
      return this.$store.state.invoicement.invoicemnts;
    },
    table_loading() {
      return this.$store.state.invoicement.table_loading;
    },
  },
  methods: {
    add_process() {
      let data = {};
      data["driver_name"] = this.driver_name;
      data["car_number"] = this.car_number;
      data["quantity_car"] = this.quantity_car;
      data["invoice_no"] = this.invoice_no;
      data["sequence"] = this.sequence;

      console.log(data);
    },
    done(item) {
      console.log(item);

      this.dialog = true;
      this.driver_name = item.driver_name;
      this.car_number = item.car_number;
      this.quantity_car = item.quantity_car;
      this.invoice_no = item.invoice_no;
      this.sequence = item.sequence;
      this.type = item.process.type;
      this.time = item.process.time;
      this.place = item.process.place;
      this.date = item.process.date;
      this.name_customer = item.process.name_customer;
      this.name_representative = item.process.name_representative;
      this.employee = item.employee.full_name;
      // this.$store.dispatch("saleCategory/sendingToProcessing", item);
    },

    getInvoicemnts() {
      this.$store.dispatch("invoicement/getInvoicemnts");
    },
  },
  created() {
    this.getInvoicemnts();
  },
};
</script>
<style>
/* هاي تخلي الهدر مرتب كلة */
.v-data-table-header th {
  white-space: nowrap;
}

.details {
  font-weight: bold;
  display: flex;
  flex-direction: row;
  padding: 5px;
  max-height: 50px;
  width: 350px;
  text-align: center;
}

.details .title {
  border: 1px solid black;
  padding: 6px;
  margin-left: 10px;
  font-weight: bold;
  border-radius: 5px;
  text-align: center;
  max-width: 175px;
  min-width: 175px;
  /* background-color: rgba(17, 56, 183, 0.372); */
}
.details .data {
  border: 1px solid black;
  font-weight: bold;
  border-radius: 5px;
  padding: 5px;
  min-width: 225px;
}
.details .data :focus {
  outline: none;
}
.numbers {
  font-size: 22px;
  border-radius: 10px;
  /* padding: 20px; */
  /* margin-top: 30px; */
  /* text-align: right; */
}

.signthure {
  font-family: 900 bold;
  padding-bottom: 100px;
}
</style>
