// import Vue from "vue";
import axios from "axios";

const invoicement = {
    namespaced: true,
    state: () => ({
        invoicemnts: [],
        invoicemnts_state: "done",
        table_loading: false,
    }),
    getters: {},
    mutations: {
        invoicemnts_success(state, invoicemnts) {
            state.invoicemnts.splice(0, state.invoicemnts.length)
            invoicemnts.forEach(element => {
                state.invoicemnts.push(element)
            });
            state.invoicemnt_state = "done"
            state.table_loading = false
            console.log(state.invoicemnts.length)

        },
        invoicemnts_request(state) {
            state.invoicemnt_state = "loading";
        },

        invoicemnts_error(state) {
            state.invoicemnt_state = "error";
        },
        add_invoicemnt_success(state, invoicemnt) {
            state.invoicemnts.puse(invoicemnt);
            state.invoicemnt_state = "done";
            console.log(state.invoicemnts.length)
            state.table_loading = false;
        },
    },
    actions: {
        async resetFields({ state }) {
            state.invoicemnt_state = "done";
            state.invoicemnts = [];
            state.table_loading = false;
            state.filter = {}
        },
        async getInvoicemnts({ commit, state, dispatch, rootState }) {
            if (state.invoicemnts_state != "done") return -1;
            state.table_loading = true;
            console.log("here")

            return new Promise((resolve, reject) => {

                axios({
                    url: `${rootState.server}` + "/api/get_invoicemnts",
                    method: "GET",
                }).then(resp => {

                    state.table_loading = false;
                    commit('invoicemnts_success', resp.data.result)
                    dispatch("snackbarToggle", { toggle: true, text: resp.data.message }, { root: true });
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    reject(err);
                    commit("invoicemnts_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );
                    console.warn(err);
                });
            })

        },

        async addInvoicemnt({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("invoicemnts_request");
                axios({
                    url: `${rootState.server}` + "/api/add_invoicement",
                    data: data,
                    headers: {
                        "Content-Type": "application/json",

                    },
                    method: "POST",
                }).then(resp => {
                    state.table_loading = false;
                    commit("add_invoicemnt_success", resp.data.result[0]);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("invoicemnts_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },


    }

}
export default invoicement;
