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
        </v-row>
      </v-container>
    </template>

    <v-data-table
      :headers="headers"
      :items="representives"
      :options.sync="pagination"
      :loading="table_loading || false"
      :page.sync="pagination.page"
      :items-per-page="pagination.itemsPerPage"
      hide-default-footer
      loading-text="جاري التحميل يرجى الأنتظار"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.full_name }}</td>
          <td class="text-start">{{ item.user_name }}</td>

          <td class="text-start">
            <v-btn dark color="green" @click="getItem(item)">طباعة</v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>جدول المبيعات</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="representiveQuery"
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

      item: {},

      headers: [
        {
          text: "اسم المندوب",
          value: "full_name",
          align: "start",
          class: "secondary white--text title ",
        },
        {
          text: "اسم المستخدم",
          value: "user_name",
          align: "start",
          class: "secondary white--text title ",
        },

        {
          text: "العمليات",
          align: "start",
          class: "secondary white--text title",
        },
      ],
      pagination: {},
      items: [5, 10, 25, 50, 100],
    };
  },
  computed: {
    representives() {
      return this.$store.state.representive.representives;
    },
    table_loading() {
      return this.$store.state.representive.table_loading;
    },
    pageCount: function () {
      return this.$store.state.representive.pageCount;
    },
    totalItems: function () {
      return this.$store.state.representive.sales_categories.length;
    },
    representiveQuery: {
      set(val) {
        this.$store.state.representive.representiveQuery = val;
      },
      get() {
        return this.$store.state.representive.representiveQuery;
      },
    },
    representive_params: {
      set(val) {
        this.$store.state.representive.params = val;
      },
      get() {
        return this.$store.state.representive.params;
      },
    },
  },
  methods: {
    queryChange(val) {
      this.searchDebounce();
    },
    getItem(item) {
      console.log(item);
    },
    getRepresentives() {
      let pagination = this.pagination;
      let par = {
        ...pagination,
      };
      // // console.log(this.query);
      this.invoicemnt_params = par;
      this.$store.dispatch("representive/getRepresentives");
    },

    searchDebounce() {
      clearTimeout(this._timerId);
      // delay new call 1000ms
      this._timerId = setTimeout(() => {
        this.$store.dispatch("representive/resetFields");
        this.pagination.page = 1;
        this.getRepresentives();
      }, 1000);
    },
  },
  created() {
    this.$store.dispatch("representive/resetFields");

    // this.getInvoicemnts();
  },
  watch: {
    pagination: {
      handler() {
        this.getRepresentives();
        this.invoicemnt_params.page = 1;
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
