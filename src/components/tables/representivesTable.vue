<template>
  <v-card class="elevation-1">
    <!-- show password -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog1" persistent max-width="390">
          <v-card>
            <v-card-title class="text-h5 secondary white--text">
              عرض كلمة المرور
            </v-card-title>
            <v-card-text class="mt-5 text-h5 dark--text"
              >كلمة المرور الخاصة بهذا المستخدم
              <v-spacer> </v-spacer>
              <h3 style="color: blue">
                <b>{{ password }}</b>
              </h3>
            </v-card-text>
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
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <!-- dilog to delete representive -->

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="390">
          <v-card>
            <v-card-title class="text-h5 secondary white--text">
              حذف المندوب
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
                @click="deleteRepresentive()"
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
          <v-col cols="12" sm="2">
            <v-btn dark color="primary" to="/representive">المندوبين</v-btn>
          </v-col>
          <v-col cols="12" sm="2">
            <v-btn dark color="primary" to="/driver">السواق</v-btn>
          </v-col>
          <v-col cols="12" sm="2">
            <v-btn dark color="primary" to="/car">السيارات</v-btn>
          </v-col>
          <v-col cols="12" sm="2">
            <v-btn dark color="primary" to="/users">المستخدمين</v-btn>
          </v-col>
          <v-col cols="12" sm="2">
            <v-btn dark color="primary" to="/doneSaleCategory"
              >المبيعات المكتملة</v-btn
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
      <template v-slot:item="{ item, index }">
        <tr @dblclick="selectedRaw(item)">
          <td>{{ index + 1 }}</td>

          <td class="text-start">{{ item.full_name }}</td>
          <td class="text-start">{{ item.user_name }}</td>

          <td class="text-start">
            <v-btn dark color="error" @click="getItem(item, (type = 1))"
              >حذف</v-btn
            >
            <v-btn
              dark
              color="primary"
              class="mr-2 ml-2"
              @click="getItem(item, (type = 2))"
              >عرض كلمة المرور</v-btn
            >
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>جدول المندوبين</v-toolbar-title>

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
      dialog: false,
      dialog1: false,
      item: {},

      headers: [
        {
          text: "التسلسل",
          align: "sequence",
          class: "secondary white--text title",
        },
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
      return this.$store.state.representive.representives.length;
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
    password() {
      return this.$store.state.representive.infoUser;
    },
  },
  methods: {
    selectedRaw(item) {
      console.log(item);
      this.$store.state.representive.selected_object = {};
      Object.assign(this.$store.state.representive.selected_object, item);
      this.$store.state.representive.isEdit = true;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    queryChange(val) {
      this.searchDebounce();
    },
    getItem(item, type) {
      console.log(item);
      if (type == 1) {
        this.dialog = true;
        this.item = item;
      } else if (type == 2) {
        this.$store.dispatch("representive/getUserInfo", item.id);
        this.dialog1 = true;
      }
    },
    deleteRepresentive() {
      this.$store.dispatch("representive/deleteRepresentive", this.item);
      this.dialog = false;
      this.item = {};
    },
    getRepresentives() {
      let pagination = this.pagination;
      let par = {
        ...pagination,
        dropdown: false,
      };
      // // console.log(this.query);
      this.representive_params = par;
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
        this.representive_params.page = 1;
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
