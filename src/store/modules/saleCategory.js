import Vue from "vue";
import axios from "axios";

const ExamModule = {
    namespaced: true,
    state: () => ({
        sales_categories: [],
        sela_category_state: "done",
        table_loading: false,
        selected_object: {},
        isEdit: false,
        filter: {},
        saleCategoryQuery: "",
        pageCount: 1,
        params: {

            page: 1,
            itemsPerPage: 10,
        },
    }),
    getters: {},
    mutations: {

        sale_category_success(state, sales_categories) {
            state.sales_categories.splice(0, state.sales_categories.length)
            sales_categories.forEach(element => {
                state.sales_categories.push(element)
            });
            state.sela_category_state = "done"
            state.table_loading = false
        },
        sale_category_request(state) {
            state.sela_category_state = "loading";
        },

        sale_category_error(state) {
            state.sela_category_state = "error";
        },
        add_sale_category_success(state, sale_category) {
            console.log(sale_category);
            state.sales_categories.unshift(sale_category);
            state.sela_category_state = "done";
            state.table_loading = false;
            console.log(sales_categories);

        },
        sale_category_edit_success(state, sale_category) {
            let index = state.sales_categories.findIndex((e) => e.id == sale_category.id);
            Vue.set(state.sales_categories, index, sale_category);
            state.sela_category_state = "done";
            state.table_loading = false;
        },
        sending_to_process(state, sale_category) {
            let index = state.sales_categories.findIndex((e) => e.id == sale_category.id);
            Vue.set(state.sales_categories, index, sale_category);
            state.sela_category_state = "done";
            state.table_loading = false;
        },
        delete_sale_category(state, sale_category) {
            let index = state.sales_categories.findIndex((e) => e.id == sale_category.id);
            state.sales_categories.splice(index, 1)
            state.sela_category_state = "done";
            state.table_loading = false;
        },
        done_invoice_succsess(state, done_sale_category) {
            console.log(done_sale_category)
            let index = state.sales_categories.findIndex((e) => e.id == done_sale_category.id);
            Vue.set(state.sales_categories, index, done_sale_category);
            state.sela_category_state = "done";
            state.table_loading = false;
        }




    },
    actions: {
        async resetFields({ state }) {
            state.pageCount = 1;
            state.sela_category_state = "done";
            state.sales_categories = [];
            state.table_loading = false;
            state.params = {
                page: 1,
                itemsPerPage: 10,
            };
        },
        async getSalesCategories({ commit, state, dispatch, rootState }) {

            if (state.sela_category_state != "done") return -1;
            state.table_loading = true;
            let data = state.params;

            let skip = (data.page - 1) * data.itemsPerPage;
            let limit = data.itemsPerPage;
            let query = "";
            var filterSaleCategory = "";
            if (
                state.saleCategoryQuery != undefined &&
                state.saleCategoryQuery != null &&
                state.saleCategoryQuery.length > 0
            ) query = `&query=${state.saleCategoryQuery}`;

            if (Object.keys(state.filter).length != 0)
                filterSaleCategory = "&filter=" + JSON.stringify(state.filter);
            console.log(filterSaleCategory);
            return new Promise((resolve, reject) => {

                axios({
                    url: `${rootState.server}` + "/api/get_sale" + "?skip=" + skip +
                        "&limit=" +
                        limit +
                        query + filterSaleCategory,

                    method: "GET",
                }).then(resp => {
                    state.table_loading = false;
                    state.pageCount = resp.data.count;

                    commit('sale_category_success', resp.data.result)
                    dispatch("snackbarToggle", { toggle: true, text: resp.data.message }, { root: true });
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    reject(err);
                    commit("sale_category_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            })

        },

        async addSaleCategorie({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("sale_category_request");
                axios({
                    url: `${rootState.server}` + "/api/add_sale",
                    data: data,
                    headers: {
                        "Content-Type": "application/json",

                    },
                    method: "POST",
                }).then(resp => {
                    state.table_loading = false;
                    commit("add_sale_category_success", resp.data.result[0]);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("sale_category_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },
        async editSaleCategory({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve, reject) => {
                commit("sale_category_request");
                axios({
                    url: `${rootState.server}` + "/api/update_sale_category",
                    data: data,
                    headers: {
                        "Content-Type": "application/json",

                    },
                    method: "PUT",
                }).then(resp => {
                    state.table_loading = false
                    commit("sale_category_edit_success", resp.data.result[0])
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("sale_category_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },
        async sendingToProcessing({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve, reject) => {
                commit("sale_category_request");
                axios({
                    url: `${rootState.server}` + "/api/sending_to_processing",
                    data: data,
                    headers: {
                        "Content-Type": "application/json",

                    },
                    method: "PUT",
                }).then(resp => {
                    state.table_loading = false
                    commit("sending_to_process", resp.data.result[0])
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("sale_category_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },
        async doneInvoice({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve, reject) => {
                commit("sale_category_request");
                axios({
                    url: `${rootState.server}` + "/api/done_invoice",
                    data: { sale_category_id: data },
                    headers: {
                        "Content-Type": "application/json",

                    },
                    method: "PUT",
                }).then(resp => {
                    state.table_loading = false
                    commit("done_invoice_succsess", resp.data.result[0])
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("sale_category_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },

        async deleteSaleCategory({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("sale_category_request");
                axios({
                    url: `${rootState.server}` + "/api/delete_sale_category",
                    data: { sale_category_id: data.id },
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "delete",
                }).then(resp => {
                    state.table_loading = false;
                    // console.log(resp)
                    commit("delete_sale_category", data);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("sale_category_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        }








    }

}
export default ExamModule;
