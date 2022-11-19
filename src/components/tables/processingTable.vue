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
                          <h2
                            style="
                              margin: 0 auto;
                              border-top: 1px dashed #bbb;
                              padding: 10px;
                              text-align: center;
                              letter-spacing: 2px;
                            "
                          >
                            شركة اعمدة الشموخ للمقاولات العامة المحدودة
                          </h2>
                          <h2
                            style="
                              margin: 0 auto;
                              padding: 10px;
                              text-align: center;
                              letter-spacing: 2px;
                            "
                          >
                            وتجهيز الكونكريت
                          </h2>
                        </div>
                        <div class="numbers" justify="center">
                          <p
                            style="
                              margin: 0 auto;
                              padding: 10px;
                              text-align: center;
                            "
                          >
                            <b>07711119970 - 07811119970 - 07705333603</b>
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
                            <span style="padding-left: 70px">
                              <b>رقم الفاتورة : {{ invoicement_no + 1 }}</b>
                            </span>
                            <span style="padding-left: 70px">
                              <b>التسلسل: {{ invoicement_sequence + 1 }} </b>
                            </span>
                            <span style="padding-left: 70px"
                              ><b
                                >التأريخ :
                                {{ new Date() | moment("DD.MM.YYYY") }}
                              </b></span
                            >

                            <!-- <span style="padding-left: 35px">
                              <b
                                >الوقت : {{ new Date() | moment(" h:mm:ss A") }}
                              </b>
                            </span> -->
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
                            <!-- <input
                              type="text"
                              style="text-align: center"
                              v-model="driver_name"
                            /> -->
                            <!-- <v-combobox
                              v-model="driver_name"
                              :items="drivers"
                              append-icon=""
                              clear-icon="$clear"
                            ></v-combobox> -->
                            <v-autocomplete
                              :items="drivers"
                              v-model="driver_name"
                              item-text="full_name"
                              item-value="full_name"
                              :menu-props="menu_props"
                              append-icon=""
                            >
                            </v-autocomplete>
                          </div>
                        </div>
                        <div class="details">
                          <div class="title">
                            <label for=""> تسلسل السيارة</label>
                          </div>
                          <div class="data">
                            <!-- <v-combobox
                              v-model="car_sequence"
                              :items="cars_sequence"
                              append-icon=""
                              @change="addCarNumber"
                              clear-icon="$clear"
                            ></v-combobox> -->
                            <v-autocomplete
                              :items="cars"
                              v-model="car_sequence"
                              item-text="car_sequence"
                              item-value="car_sequence"
                              :menu-props="menu_props_car"
                              append-icon=""
                              @change="getCarNumber()"
                            >
                            </v-autocomplete>
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
                              readonly
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
                            <label for="">
                              <b>متر مكعب</b>
                            </label>
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
                    :disabled="!this.print_invoice"
                    v-print="'#printMe'"
                    secondary
                    color="secondary"
                    @click="print_invoice_button"
                  >
                    طباعة الفاتورة</v-btn
                  >
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    secondary
                    color="secondary"
                    :disabled="
                      this.quantity_car == '' ||
                      this.car_sequence == '' ||
                      this.quantity_car == null ||
                      this.car_sequence == null ||
                      this.driver_name == '' ||
                      this.driver_name == null
                    "
                    @click="add_process"
                  >
                    حفظ الفاتورة
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn secondary color="secondary" @click="close">
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
      :items="salesCategories"
      :options.sync="pagination"
      :loading="table_loading || false"
      :page.sync="pagination.page"
      :items-per-page="pagination.itemsPerPage"
      hide-default-footer
      loading-text="جاري التحميل يرجى الأنتظار"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ index + 1 }}</td>
          <td class="text-start">
            <v-btn dark color="green" @click="done(item)">بدأ التنفيذ </v-btn>
          </td>
          <td class="text-start" v-if="item.status == 0">
            <v-chip color="yellow">قيد المراجعة</v-chip>
          </td>
          <td class="text-start" v-else-if="item.status == 1">
            <v-chip dark color="green"> تم الترحيل من المبيعات </v-chip>
          </td>

          <td class="text-start" v-else-if="item.status == 2">
            <v-chip color="gray">قيد التفيذ</v-chip>
          </td>

          <td class="text-start" v-if="item.proces_type == 1">
            <v-chip color="primary">معمل العامرية</v-chip>
          </td>
          <td class="text-start" v-else-if="item.proces_type == 2">
            <v-chip dark color="primary"> معمل الفروسية </v-chip>
          </td>

          <td class="text-start" v-else-if="item.proces_type == 3">
            <v-chip color="primary">مشترك</v-chip>
          </td>
          <td class="text-start">{{ item.place }}</td>
          <td class="text-start">{{ item.name_customer }}</td>
          <td class="text-start">{{ item.degree }}/{{ item.type }}</td>
          <td class="text-start">{{ item.quantity }}</td>
          <td class="text-start">{{ item.man_buliding }}</td>
          <td class="text-start">{{ item.workers }}</td>
          <td class="text-start">{{ item.bump }}</td>
          <td class="text-start">{{ item.representativ.full_name }}</td>
          <td class="text-start">{{ item.phone_number }}</td>
          <td class="text-start">{{ item.price }}</td>
          <td class="text-start">{{ item.actual_quantity }}</td>
          <td class="text-start mr-5 ml-5">{{ item.date }}</td>

          <td class="text-start">{{ item.time }}</td>
          <td class="text-start" v-if="item.notes == null">
            <v-chip dark color="new">لايوجد ملاحظات</v-chip>
          </td>
          <td class="text-start" v-else>{{ item.notes }}</td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>جدول المبيعات</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="saleCategoryQuery"
            @input="queryChange"
            append-icon="mdi-magnify"
            label="بحث"
            single-line
            hide-details
            class="mr-5"
          ></v-text-field>
        </v-toolbar>
      </template>
    </v-data-table>
    <div class="text-center pt-2 mt-3">
      <v-row>
        <v-col align-self="center" cols="2" offset="2">
          <v-select
            v-model="pagination.itemsPerPage"
            :items="items"
            label="عدد العناصر في الصفحة"
          ></v-select>
        </v-col>
        <v-col align-self="center" cols="4">
          <v-pagination
            v-model="pagination.page"
            :length="pageCount"
            circle
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      rules: [(value) => !!value || "هذا الحقل مطلوب."],
      driver_name: "",
      sale_category_id: "",
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
      dialog: false,
      printObj: {
        id: "print_me",
        popTitle: "طباعة سند قبض/صرف",
        extraHead: '<meta http-equiv="Content-Language"content="en-ar"/>',
      },
      print_invoice: false,

      headers: [
        {
          text: "التسلسل",
          align: "sequence",
          class: "secondary white--text title",
        },
        {
          text: "ترحيل",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "الحالة",
          value: "status",
          align: "start",
          class: "secondary white--text title ",
        },
        {
          text: "نوع التجهيز",
          value: "proces_type",
          align: "start",
          class: "secondary white--text title ",
        },
        {
          text: "الموقع ",
          value: "place",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "الزبون",
          value: "name_customer",
          align: "start",
          align: "start",
          class: "secondary white--text title  ",
        },
        {
          text: "النوع",
          value: "type",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "الكمية",
          value: "quantity",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "الخلفات",
          value: "man_buliding",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "العمال",
          value: "workers",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "البم",
          value: "bump",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "المندوب",
          value: "name_representative",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "الهاتف",
          value: "phone_number",
          align: "center",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "السعر",
          value: "price",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: " الكمية الفعلية",
          value: "actual_quantity",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "التأريخ",
          value: "date",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "الوقت",
          value: "time",
          align: "start",
          class: "secondary white--text title",
        },
        {
          text: "الملاحضات",
          value: "notes",
          align: "start",
          class: "secondary white--text title",
        },
      ],
      // drivers: [
      //   "قصي أحمد",
      //   "محمود علاء",
      //   "زهير عيفان",
      //   "محمد علي",
      //   "احمد سامي",
      //   "محمد قاسم",
      //   "حقي عبد الحسن",
      //   "اورنس علي",
      //   "سلام ماضي",
      //   "طيب كامل",
      //   "خليل يوسف",
      //   "رواد حامد",
      //   "وليد ياسين",
      //   "هشام ماجد",
      //   "عمار ياسر",
      //   "رائد محمد",
      //   "عمار رافع",
      //   "حسن ابراهيم",
      //   "محمد شهاب",
      //   "حسين هادي",
      //   "محمد اكرم",
      //   "ابراهيم محمد",
      //   "رياض احمد",
      //   "وائل محمد",
      //   "عبدالله سرحان",
      //   "مصطفى طارق",
      //   "حيدر محمد",
      // ],
      // cars_sequence: [
      //   "خ22",
      //   "خ24",
      //   "خ25",
      //   "خ26",
      //   "خ27",
      //   "خ28",
      //   "خ29",
      //   "خ30",
      //   "خ31",
      //   "خ32",
      //   "خ33",
      //   "خ34",
      //   "خ35",
      //   "خ36",
      //   "خ37",
      //   "خ38",
      //   "خ39",
      //   "خ40",
      //   "خ41",
      //   "خ42",
      //   "خ43",
      //   "خ44",
      //   "خ45",
      //   "خ46",
      //   "خ47",
      //   "خ48",
      //   "خ49",
      // ],
      // cars_info: [
      //   { sequence: "خ22", number: "8073" },
      //   { sequence: "خ24", number: "14310" },
      //   { sequence: "خ25", number: "14731" },
      //   { sequence: "خ26", number: "15146" },
      //   { sequence: "خ27", number: "15253" },
      //   { sequence: "خ28", number: "9269" },
      //   { sequence: "خ29", number: "10195" },
      //   { sequence: "خ30", number: "9766" },
      //   { sequence: "خ31", number: "6460" },
      //   { sequence: "خ32", number: "5207" },
      //   { sequence: "خ33", number: "6366" },
      //   { sequence: "خ34", number: "14277" },
      //   { sequence: "خ35", number: "6385" },
      //   { sequence: "خ36", number: "10335" },
      //   { sequence: "خ37", number: "10263" },
      //   { sequence: "خ38", number: "7854" },
      //   { sequence: "خ39", number: "6409" },
      //   { sequence: "خ40", number: "10442" },
      //   { sequence: "خ41", number: "6330" },
      //   { sequence: "خ42", number: "4509" },
      //   { sequence: "خ43", number: "8817" },
      //   { sequence: "خ44", number: "6313" },
      //   { sequence: "خ45", number: "6291" },
      //   { sequence: "خ46", number: "6553" },
      //   { sequence: "خ47", number: "9943" },
      //   { sequence: "خ48", number: "6495" },
      //   { sequence: "خ49", number: "10154" },
      // ],
      car_sequence: "",
      car_number: "",
      invoicement_no: "",
      invoicement_sequence: "",
      item: {},
      pagination: {},
      items: [5, 10, 25, 50, 100],
      menu_props: {
        closeOnClick: false,
        closeOnContentClick: false,
        disableKeys: true,
        openOnClick: false,
        maxHeight: 150,
        offsetY: true,
        offsetOverflow: true,
        transition: false,
      },
      menu_props_car: {
        closeOnClick: false,
        closeOnContentClick: false,
        disableKeys: true,
        openOnClick: false,
        maxHeight: 150,
        offsetY: true,
        offsetOverflow: true,
        transition: false,
      },
    };
  },
  computed: {
    full_name() {
      return localStorage.getItem("full_name");
    },
    getCurrentDate() {
      moment(new Date()).format("DD/MM/YYYY");
    },
    drivers() {
      return this.$store.state.driver.drivers;
    },
    cars() {
      return this.$store.state.car.cars;
    },

    // salesCategoriesSending() {
    //   return this.$store.state.saleCategory.sales_categories_sending;
    // },

    saleCategoryQuery: {
      set(val) {
        this.$store.state.saleCategory.saleCategoryQuery = val;
      },
      get() {
        return this.$store.state.saleCategory.saleCategoryQuery;
      },
    },

    sales_categories_params: {
      set(val) {
        this.$store.state.saleCategory.params = val;
      },
      get() {
        return this.$store.state.saleCategory.params;
      },
    },
    pageCount: function () {
      return this.$store.state.saleCategory.pageCount;
    },
    totalItems: function () {
      return this.$store.state.saleCategory.sales_categories.length;
    },
    salesCategories() {
      return this.$store.state.saleCategory.sales_categories;
    },
    table_loading() {
      return this.$store.state.saleCategory.table_loading;
    },
    invoicemnts() {
      return this.$store.state.invoicement.invoicemnts;
    },
  },
  methods: {
    close() {
      this.dialog = false;
      this.driver_name = "";
      // location.reload();
    },
    // addCarNumber() {
    //   console.log("here car number" + this.car_sequence);
    //   let filter = this.cars_info.filter(
    //     (e) => e.sequence == this.car_sequence
    //   )[0].number;
    //   this.car_number = filter;
    //   console.log(filter);
    // },
    getCarNumber() {
      let filter = this.cars.filter(
        (e) => e.car_sequence == this.car_sequence
      )[0].car_number;
      this.car_number = filter;
      console.log(filter);
    },
    add_process() {
      let data = {};
      data["sale_category_id"] = this.sale_category_id;
      data["driver_name"] = this.driver_name;
      data["car_number"] = this.car_number;
      data["car_sequence"] = this.car_sequence;

      data["quantity_car"] = this.quantity_car;
      data["invoice_no"] = this.invoicement_no + 1;
      data["sequence"] = this.invoicement_sequence + 1;

      this.$store.dispatch("invoicement/addInvoicemnt", data).then((res) => {
        console.log("here i am");
        this.print_invoice = true;
      });
      this.$store.dispatch("saleCategory/getSalesCategories");
      this.$store.dispatch("invoicement/getInvoicemnts");
      // this.dialog = false;
    },
    print_invoice_button() {
      this.print_invoice = false;
      this.dialog = false;
    },
    done(item) {
      this.$store.dispatch("invoicement/getInvoicemnts");
      this.car_number = "";
      this.driver_name = "";
      this.quantity_car = "";
      this.car_sequence = "";
      console.log(item);
      this.dialog = true;
      this.sale_category_id = item.id;
      this.name_representative = item.representativ.full_name;
      this.phone_number = item.phone_number;
      this.place = item.place;
      this.date = item.date;
      this.time = item.time;
      this.type = item.degree;
      this.name_customer = item.name_customer;
      this.employee = item.employee.full_name;

      let invoice = this.invoicemnts.filter(
        (e) => e.sale_category_id == this.sale_category_id
      );
      console.log(invoice.length);
      console.log(this.invoicemnts[0]);
      // this.invoicement_sequence = invoice.length;
      this.invoicement_sequence = item.SequenceInvoicment;

      this.invoicement_no = this.invoicemnts[0].countinvoicemnts;
      // console.log(invoice[0].countinvoicemnts);
      // this.$store.dispatch("saleCategory/sendingToProcessing", item);
    },

    // driver drop down functions with watchers

    getDrivers() {
      // if (this.$store.state.driver.driver_state == "finished") return;
      this.$store.dispatch("driver/getDrivers");
    },

    // car drop down functions with watchers

    getCars() {
      // if (this.$store.state.car.car_state == "finished") return;
      this.$store.dispatch("car/getCars");
    },

    // getSalesSendingCategories() {
    //   this.$store.dispatch("saleCategory/getSalesSendingCategories");
    // },
    queryChange(val) {
      this.searchDebounce();
    },
    getSalesCategories() {
      let pagination = this.pagination;
      let par = {
        ...pagination,
      };
      // // console.log(this.query);
      this.sales_categories_params = par;
      var filter = { name: "status", value: 1 };
      Object.assign(this.$store.state.saleCategory.filter, filter);
      this.$store.dispatch("saleCategory/getSalesCategories");
    },
    searchDebounce() {
      clearTimeout(this._timerId);
      // delay new call 1000ms
      this._timerId = setTimeout(() => {
        this.$store.dispatch("saleCategory/resetFields");
        this.pagination.page = 1;
        console.log(this.saleCategoryQuery);
        this.getSalesCategories();
      }, 1000);
    },
  },
  created() {
    // this.getSalesSendingCategories();
    this.$store.dispatch("saleCategory/resetFields");
    this.$store.dispatch("invoicement/getInvoicemnts");
  },
  watch: {
    pagination: {
      handler() {
        this.getSalesCategories();
        this.getDrivers();
        this.getCars();
        this.sales_categories_params.page = 1;
      },
      deep: true,
    },
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
  min-width: 300px !important;
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
.v-select.v-text-field:not(.v-text-field--single-line) input {
  margin-top: -20px;
  margin-bottom: 16px !important;
  text-align: center;
  /* overflow: hidden; */
  /* outline: none; */
  /* border: none; */
}
</style>
