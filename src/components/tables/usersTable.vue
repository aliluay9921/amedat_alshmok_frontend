<template>
  <v-card class="elevation-1">
    <template>
      <v-container>
        <v-row justify="center" class="mt-5 mb-5">
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

    <!-- reset password  -->

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="390">
          <v-card>
            <v-card-title class="text-h5 secondary white--text">
              تغير كلمة المرور
            </v-card-title>
            <v-card-text class="mt-5 text-h5 dark--text"
              ><b> هل أنت متأكد من عملية تغير كلمة المرور </b>
              <v-alert v-if="alert" class="text-right" type="error">
                {{ alertText }}</v-alert
              >
              <v-text-field v-model="confirm" label="أدخل رمز التأكيد">
              </v-text-field>
              <v-text-field v-model="password" label="أدخل كلمة المرور">
              </v-text-field>
            </v-card-text>
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
                @click="changePassword()"
              >
                تأكيد
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <!--  -->

    <v-data-table
      :headers="headers"
      :items="users"
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

          <td class="text-start">{{ item.user_name }}</td>
          <td class="text-start">
            <v-chip color="grey" dark v-if="item.user_type == 0">
              مبيعات</v-chip
            >
            <v-chip color="grey" dark v-else-if="item.user_type == 1">
              معمل العامرية</v-chip
            >
            <v-chip color="grey" dark v-else-if="item.user_type == 2">
              معمل الفروسية</v-chip
            >
            <v-chip color="grey" dark v-else-if="item.user_type == 3">
              الحسابات</v-chip
            >
            <v-chip color="grey" dark v-else-if="item.user_type == 6">
              الأدارة</v-chip
            >
            <v-chip color="grey" dark v-else> غير معروف</v-chip>
          </td>
          <td class="text-start">
            <v-btn dark color="error" @click="getItem(item)"
              >تغيرر كلمة المرور</v-btn
            >
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>جدول المستخدمين</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="userQuery"
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
      password: "",
      confirm: "",
      confirm_code: "yousuf98",
      alert: false,
      alertText: "",
      headers: [
        {
          text: "التسلسل",
          align: "sequence",
          class: "secondary white--text title",
        },
        {
          text: " أسم المستخدم",
          value: "user_name",
          align: "start",
          class: "secondary white--text title ",
        },
        {
          text: "نوع المستخدم",
          value: "user_type",
          align: "start",
          class: "secondary white--text title ",
        },
        {
          text: "تغير كلمة المرور",
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
    users() {
      return this.$store.state.user.users;
    },
    table_loading() {
      return this.$store.state.user.table_loading;
    },
    pageCount: function () {
      return this.$store.state.user.pageCount;
    },
    totalItems: function () {
      return this.$store.state.user.users.length;
    },
    userQuery: {
      set(val) {
        this.$store.state.user.userQuery = val;
      },
      get() {
        return this.$store.state.user.userQuery;
      },
    },
    user_params: {
      set(val) {
        this.$store.state.user.params = val;
      },
      get() {
        return this.$store.state.user.params;
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
      console.log(item);
    },
    changePassword() {
      if (this.confirm == this.confirm_code) {
        console.log("test here");
        let data = {};
        data["user_id"] = this.item.id;
        data["password"] = this.password;
        this.$store.dispatch("user/changePassword", data);
        this.dialog = false;
        this.item = {};
      } else {
        this.alert = true;
        this.alertText = "يجب ان تكون يوسف لتستطيع تغير كلمة المرور يا اهبل ";
        setTimeout(() => {
          this.alert = false;
          this.alertText = "";
        }, 3000);
      }
    },
    // deletecar() {
    //   console.log(this.item);

    //   this.$store.dispatch("user/deleteCar", this.item);
    //   this.dialog = false;
    //   this.item = {};
    // },
    getUsers() {
      let pagination = this.pagination;
      let par = {
        ...pagination,
        dropdown: false,
      };
      // // console.log(this.query);
      this.user_params = par;
      this.$store.dispatch("user/getUsers");
    },

    searchDebounce() {
      clearTimeout(this._timerId);
      // delay new call 1000ms
      this._timerId = setTimeout(() => {
        this.$store.dispatch("user/resetFields");
        this.pagination.page = 1;
        this.getUsers();
      }, 1000);
    },
  },
  created() {
    this.$store.dispatch("user/resetFields");

    // this.getInvoicemnts();
  },
  watch: {
    pagination: {
      handler() {
        this.getUsers();
        this.user_params.page = 1;
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
