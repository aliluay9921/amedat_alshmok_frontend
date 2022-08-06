<template>
  <v-card class="elevation-1">
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
      <template v-slot:top>
        <v-toolbar flat>
          <v-btn
            dark
            color="secondary"
            class="ml-4"
            @click.prevent="reloadPage"
          >
            تحميل البيانات</v-btn
          >
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
      <template v-slot:item="{ item }">
        <tr @dblclick="selectedRaw(item)">
          <td class="text-start" v-if="item.status == 0">
            <v-chip dark color="warning">قيد المراجعة</v-chip>
          </td>
          <td class="text-start" v-else-if="item.status == 1">
            <v-chip dark color="green">تم ألترحيل الى المعمل </v-chip>
          </td>
          <td class="text-start" v-else>
            <v-chip dark color="new">تم تنفيذها </v-chip>
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
          <td class="text-center">{{ item.actual_quantity }}</td>
          <td class="text-start">{{ item.date }}</td>

          <td class="text-start">{{ item.time }}</td>
          <td class="text-start">{{ item.notes }}</td>

          <td
            class="text-start"
            style="display: flex; flex-diractions: row"
            v-if="item.status == 0"
          >
            <v-btn
              style="margin-left: 5px; margin-top: 5px"
              dark
              color="warning"
              @click="sending(item)"
              >ترحيل
            </v-btn>
            <v-btn
              style="margin-left: 5px; margin-top: 5px"
              dark
              color="red"
              @click="getItem(item)"
              >حذف
            </v-btn>
          </td>
          <td class="text-start" v-else-if="item.status == 1">
            <v-btn dark color="green">تم الترحيل الى المعمل </v-btn>
          </td>
          <td class="text-start" v-else>
            <v-btn dark color="new">تم تنفيذها </v-btn>
          </td>
        </tr>
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

    <!-- delete item  -->

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog1" persistent max-width="390">
          <v-card>
            <v-card-title class="text-h5 secondary white--text">
              حذف الصبة
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
                @click="dialog1 = false"
              >
                غلق
              </v-btn>
              <v-btn
                class="secondary"
                color="white darken-1"
                text
                @click="deleteSaleCategory()"
              >
                تأكيد الحذف
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      dialog1: false,
      item: {},
      pagination: {},
      items: [5, 10, 25, 50, 100],
      headers: [
        {
          text: "الحالة",
          value: "status",
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
          text: "ترحيل",
          align: "start",
          class: "secondary white--text title ",
        },
      ],
    };
  },
  computed: {
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
    reloadPage() {
      location.reload();
      // this.$store.dispatch("saleCategory/resetFields");
      // this.getSalesCategories();
    },
    getItem(item) {
      this.dialog1 = true;
      this.item = item;
    },
    deleteSaleCategory() {
      console.log(this.item);
      this.$store.dispatch("saleCategory/deleteSaleCategory", this.item);
      this.dialog1 = false;
      this.item = {};
    },

    selectedRaw(item) {
      console.log(item);
      this.$store.state.saleCategory.selected_object = {};
      Object.assign(this.$store.state.saleCategory.selected_object, item);
      this.$store.state.saleCategory.isEdit = true;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },

    queryChange(val) {
      this.searchDebounce();
    },
    sending(item) {
      console.log(item);

      this.$store.dispatch("saleCategory/sendingToProcessing", item);
    },

    getSalesCategories() {
      let pagination = this.pagination;
      let par = {
        ...pagination,
      };
      // // console.log(this.query);
      this.sales_categories_params = par;
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
    // this.getSalesCategories();
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

.actions {
  padding-left: 20px;
}
</style>
