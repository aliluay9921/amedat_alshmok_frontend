<template>
  <v-card class="elevation-1">
    <v-data-table
      :headers="headers"
      :items="sales_categories_represntive"
      :options.sync="pagination"
      :loading="table_loading || false"
      :page.sync="pagination.page"
      :items-per-page="pagination.itemsPerPage"
      hide-default-footer
      loading-text="جاري التحميل يرجى الأنتظار"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-btn dark color="secondary" class="ml-4" to="/">
            الطلبات الشخصية
          </v-btn>
          <v-toolbar-title>جدول المبيعات</v-toolbar-title>

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
            <v-col>
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
      <template v-slot:item="{ item, index }">
        <tr
          @dblclick="selectedRaw(item)"
          :style="
            item.paid == true && user_type == 6
              ? 'background-color:#4CAF50;'
              : '' || item.status != 0
              ? 'background-color:pink;'
              : ''
          "
        >
          <td>{{ index + 1 }}</td>

          <td class="text-start" v-if="item.status == 0">
            <v-chip dark color="warning">قيد المراجعة</v-chip>
          </td>
          <td class="text-start" v-else-if="item.status == 1">
            <v-chip dark color="green" v-if="item.proces_type == 1"
              >تم ألترحيل الى معمل العامرية
            </v-chip>
            <v-chip dark color="green" v-else-if="item.proces_type == 2"
              >تم ألترحيل الى معمل الفروسية
            </v-chip>
            <v-chip dark color="green" v-else>ترحيل مشترك</v-chip>
          </td>
          <td class="text-start" v-else-if="item.status == 2">
            <v-chip dark color="primary">بدأ التنفيذ بها</v-chip>
          </td>
          <td class="text-start" v-else-if="item.status == 3">
            <v-chip dark color="new">تم تنفيذها </v-chip>
          </td>
          <td class="text-start">{{ item.place }}</td>
          <td class="text-start">{{ item.name_customer }}</td>
          <td class="text-start">{{ item.degree }}/{{ item.type }}</td>
          <td class="text-start">{{ item.quantity }}</td>
          <td class="text-start" dir="ltr">{{ item.time }}</td>

          <td class="text-start">{{ item.representativ.full_name }}</td>
          <td
            class="text-start"
            :style="
              item.go_bump == 1 && item.paid == false
                ? 'background-color:pink'
                : ''
            "
          >
            {{ item.bump }}
          </td>
          <td class="text-start">{{ item.man_buliding }}</td>
          <td class="text-start">{{ item.workers }}</td>

          <td class="text-start" dir="ltr">
            {{ item.created_at | moment("DD.MM.YYYY, h:mm A") }}
          </td>
          <td class="text-start">{{ item.phone_number }}</td>
          <td class="text-start">{{ item.price }}</td>
          <td class="text-center">{{ item.actual_quantity }}</td>
          <td class="text-start">{{ item.date }}</td>

          <!-- <span>{{ someDate | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
 -->
          <td class="text-start" v-if="item.notes == null">
            <v-chip dark color="new">لايوجد ملاحظات</v-chip>
          </td>
          <td class="text-start" v-else>{{ item.notes }}</td>

          <td
            class="text-start"
            style="display: flex; flex-diractions: row"
            v-if="item.status == 0"
          >
            <v-btn dark color="green">لم ترحل بعد</v-btn>
          </td>
          <td class="text-start" v-else-if="item.status == 1">
            <v-btn dark color="green">تم الترحيل الى المعمل </v-btn>
          </td>
          <td class="text-start" v-else-if="item.status == 2">
            <v-btn dark color="primary">بدأ التنفيذ بها </v-btn>
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
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      pagination: { itemsPerPage: 50 },
      items: [5, 10, 25, 50, 100],
      headers: [
        {
          text: "تسلسل",
          value: "sequence",
          align: "start",
          class: "secondary white--text title ",
        },
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
          text: "الوقت",
          value: "time",
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
          text: "البم",
          value: "bump",
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
          text: "التأريخ",
          value: "date",
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
          text: "وقت رفع الطلب",
          value: "created_at",
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
      menu: null,
      currentLocale: "ar",
      date: "",
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
      return this.$store.state.saleCategory.sales_categories_represntive.length;
    },
    sales_categories_represntive() {
      return this.$store.state.saleCategory.sales_categories_represntive;
    },
    table_loading() {
      return this.$store.state.saleCategory.table_loading;
    },
    user_type() {
      return localStorage.getItem("user_type");
    },
  },

  methods: {
    filter() {
      var filter = { name: "date", value: this.date };
      Object.assign(this.$store.state.saleCategory.filter, filter);
      this.$store.state.saleCategory.selected_object = {};
      this.$store.state.saleCategory.isEdit = false;
      this.$store.dispatch("saleCategory/getSalesCategoriesRepresntive");
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
      if (item.status == 0) {
        this.$store.state.saleCategory.selected_object = {};
        Object.assign(this.$store.state.saleCategory.selected_object, item);
        this.$store.state.saleCategory.isEdit = true;
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    },

    queryChange(val) {
      this.searchDebounce();
    },

    getSalesCategories() {
      let pagination = this.pagination;
      let par = {
        ...pagination,
        itemsPerPage: 50,
      };

      this.sales_categories_params = par;
      this.$store.dispatch("saleCategory/getSalesCategoriesRepresntive");
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
        // this.$store.dispatch("saleCategory/getSalesCategories");
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
