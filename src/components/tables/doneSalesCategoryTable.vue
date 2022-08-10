<template>
  <v-card class="elevation-1">
    <!-- dilog to done and print invoice -->
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
      ],

      pagination: {},
      items: [5, 10, 25, 50, 100],
      menu: null,
      currentLocale: "ar",
      date: "",
    };
  },
  computed: {
    user_type() {
      return localStorage.user_type;
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
