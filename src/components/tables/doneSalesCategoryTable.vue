<template>
  <v-card class="elevation-1">
    <!-- dilog to done and print invoice -->

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
                        <div style="text-align: center">
                          <p><b>الفاتورة النهائية</b></p>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row dir="rtl">
                      <div class="col-4 d-block">
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
                              الكمية النهائية
                            </label>
                          </div>
                          <div class="data">
                            <input
                              type="text"
                              style="text-align: center"
                              v-model="actual_quantity"
                              readonly
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
                  <v-btn secondary color="secondary" v-print="'#printMe'">
                    طباعة
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

    <template v-if="user_type != 3">
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
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start" v-if="item.status == 0">
            <v-chip color="yellow">قيد المراجعة</v-chip>
          </td>
          <td class="text-start" v-else-if="item.status == 1">
            <v-chip dark color="green"> تم الترحيل من المبيعات </v-chip>
          </td>

          <td class="text-start" v-else-if="item.status == 2">
            <v-chip color="gray">قيد التفيذ</v-chip>
          </td>
          <td class="text-start" v-else-if="item.status == 3">
            <v-chip color="primary">نفذت</v-chip>
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
          <td class="text-start">{{ item.name_representative }}</td>
          <td class="text-start">{{ item.phone_number }}</td>
          <td class="text-start">{{ item.price }}</td>
          <td class="text-start">{{ item.actual_quantity }}</td>
          <td class="text-start mr-5 ml-5">{{ item.date }}</td>

          <td class="text-start">{{ item.time }}</td>
          <td class="text-start" v-if="item.notes == null">
            <v-chip dark color="new">لايوجد ملاحظات</v-chip>
          </td>
          <td class="text-start" v-else>{{ item.notes }}</td>
          <td class="text-start">
            <v-btn dark color="green" @click="done(item)">طباعة القيد</v-btn>
          </td>
        </tr>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>جدول المبيعات المكتملة</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-row style="margin-top: 15px">
            <v-col>
              <v-text-field
                v-model="saleCategoryQuery"
                @input="queryChange"
                append-icon="mdi-magnify"
                label="بحث"
                single-line
                hide-details
                class="mr-5"
              ></v-text-field>
              <v-spacer></v-spacer>
            </v-col>
            <v-col v-if="user_type == 3">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                style="margin-top: 60px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="التأريخ"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu = false"
                  :locale="currentLocale"
                  @change="filter"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
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
      headers: [
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
        {
          text: "العمليات",
          align: "start",
          class: "secondary white--text title",
        },
      ],

      pagination: {},
      items: [5, 10, 25, 50, 100],
      menu: null,
      currentLocale: "ar",
      date: "",
      printObj: {
        id: "print_me",
        popTitle: "طباعة سند قبض/صرف",
        extraHead: '<meta http-equiv="Content-Language"content="en-ar"/>',
      },
      type: "",
      date: "",
      name_customer: "",
      name_representative: "",
      place: "",
      created_at: "",
      actual_quantity: "",
      dialog: false,
    };
  },
  computed: {
    user_type() {
      return localStorage.user_type;
    },
    full_name() {
      return localStorage.full_name;
    },
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
  },
  methods: {
    close() {
      this.dialog = false;
    },
    queryChange(val) {
      this.searchDebounce();
    },
    filter() {
      this.$store.state.saleCategory.filter_date = this.date;
      console.log(this.date);

      this.$store.dispatch("saleCategory/getSalesCategories");
    },
    getSalesCategories() {
      let pagination = this.pagination;
      let par = {
        ...pagination,
      };
      // // console.log(this.query);
      this.sales_categories_params = par;
      var filter = { name: "status", value: 3 };
      Object.assign(this.$store.state.saleCategory.filter, filter);

      const current = new Date();
      const moment = require("moment");
      this.date = moment(current).format("YYYY-MM-DD");
      this.$store.state.saleCategory.filter_date = this.date;
      console.log(this.date);
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
    done(item) {
      console.log(item);

      this.dialog = true;
      this.type = item.degree;
      this.place = item.place;
      this.date = item.date;
      this.name_customer = item.name_customer;
      this.name_representative = item.name_representative;
      this.created_at = item.created_at;
      this.actual_quantity = item.actual_quantity;
      // this.$store.dispatch("saleCategory/sendingToProcessing", item);
    },
  },
  created() {
    // this.getSalesSendingCategories();
    this.$store.dispatch("saleCategory/resetFields");
  },
  watch: {
    pagination: {
      handler() {
        this.getSalesCategories();
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
.v-select.v-text-field:not(.v-text-field--single-line) input {
  margin-top: -20px;
  margin-bottom: 5px;
  text-align: center;
  /* overflow: hidden; */
  /* outline: none; */
  /* border: none; */
}
</style>
