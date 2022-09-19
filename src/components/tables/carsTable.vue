<template>
  <v-card class="elevation-1">
    <!-- show password -->

    <!-- dilog to delete car -->

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="390">
          <v-card>
            <v-card-title class="text-h5 secondary white--text">
              حذف سيارة
            </v-card-title>
            <v-card-text class="mt-5 text-h5 dark--text"
              ><b> هل أنت متأكد من عملية الحذف </b></v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="secondary"
                color="white darken-1"
                text
                @click="dialog = false"
              >
                غلق
              </v-btn>
              <v-btn
                class="secondary"
                color="white darken-1"
                text
                @click="deletecar()"
              >
                تأكيد الحذف
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <!-- dilog to done and print invoice -->
    <template>
      <v-container>
        <v-row justify="center" class="mt-5">
          <v-col cols="12" sm="3">
            <v-btn dark color="primary" to="/representive">المندوبين</v-btn>
          </v-col>
          <v-col cols="12" sm="3">
            <v-btn dark color="primary" to="/driver">السواق</v-btn>
          </v-col>
          <v-col cols="12" sm="3">
            <v-btn dark color="primary" to="/car">السيارات</v-btn>
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
      :items="cars"
      :options.sync="pagination"
      :loading="table_loading || false"
      :page.sync="pagination.page"
      :items-per-page="pagination.itemsPerPage"
      hide-default-footer
      loading-text="جاري التحميل يرجى الأنتظار"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.car_number }}</td>
          <td class="text-start">{{ item.car_sequence }}</td>
          <td class="text-start">
            <v-btn dark color="error" @click="getItem(item)">حذف</v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>جدول السيارات</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="carQuery"
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
      item: {},

      headers: [
        {
          text: "رقم السيارة",
          value: "car_number",
          align: "start",
          class: "secondary white--text title ",
        },
        {
          text: "تسلسل السيارة",
          value: "car_sequence",
          align: "start",
          class: "secondary white--text title ",
        },
        {
          text: "الحذف",
          value: "action",
          align: "start",
          class: "secondary white--text title ",
        },
      ],
      pagination: {},
      items: [5, 10, 25, 50, 100],
      dialog: false,
    };
  },
  computed: {
    cars() {
      return this.$store.state.car.cars;
    },
    table_loading() {
      return this.$store.state.car.table_loading;
    },
    pageCount: function () {
      return this.$store.state.car.pageCount;
    },
    totalItems: function () {
      return this.$store.state.car.cars.length;
    },
    carQuery: {
      set(val) {
        this.$store.state.car.carQuery = val;
      },
      get() {
        return this.$store.state.car.carQuery;
      },
    },
    car_params: {
      set(val) {
        this.$store.state.car.params = val;
      },
      get() {
        return this.$store.state.car.params;
      },
    },
  },
  methods: {
    queryChange(val) {
      this.searchDebounce();
    },
    getItem(item) {
      this.item = item;
      this.dialog = true;
    },
    deletecar() {
      console.log(this.item);

      this.$store.dispatch("car/deleteCar", this.item);
      this.dialog = false;
      this.item = {};
    },
    getCars() {
      let pagination = this.pagination;
      let par = {
        ...pagination,
        dropdown: false,
      };
      // // console.log(this.query);
      this.car_params = par;
      this.$store.dispatch("car/getCars");
    },

    searchDebounce() {
      clearTimeout(this._timerId);
      // delay new call 1000ms
      this._timerId = setTimeout(() => {
        this.$store.dispatch("car/resetFields");
        this.pagination.page = 1;
        this.getCars();
      }, 1000);
    },
  },
  created() {
    this.$store.dispatch("car/resetFields");

    // this.getInvoicemnts();
  },
  watch: {
    pagination: {
      handler() {
        this.getCars();
        this.car_params.page = 1;
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
</style>
