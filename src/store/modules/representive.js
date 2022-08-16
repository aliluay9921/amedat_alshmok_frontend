import Vue from "vue";
import axios from "axios";

const representive = {
    namespaced: true,
    state: () => ({
        representives: [],
        representives_state: "done",
        table_loading: false,
        representiveQuery: "",
        selected_object: {},
        isEdit: false,
        pageCount: 1,
        infoUser: "",
        params: {
            dropdown: true,
            page: 1,
            itemsPerPage: 3,
        },
    }),
    getters: {},
    mutations: {
        representives_success(state, representives) {
            state.representives.splice(0, state.representives.length)
            representives.forEach(element => {
                state.representives.push(element)
            });
            state.representives_state = "done"
            state.table_loading = false

        },
        representives_request(state) {
            state.representives_state = "loading";
        },

        representives_error(state) {
            state.representives_state = "error";
        },
        add_representive_success(state, representive) {
            state.representives.push(representive);
            state.representives_state = "done";
            state.table_loading = false;
            console.log(representive);
        },
        representive_edit_success(state, representive) {
            let index = state.representives.findIndex((e) => e.id == representive.id);
            Vue.set(state.representives, index, representive);
            state.representives_state = "done";
            state.table_loading = false;
        },
        delete_representive(state, representive) {
            let index = state.representives.findIndex((e) => e.id == representive.id);
            state.representives.splice(index, 1)
            state.representives_state = "done";
            state.table_loading = false;
        },
        representive_dropdown_success(state, representives) {

            state.table_loading = false;
            if (representives.length == 0) {
                state.representives_state = "finished";
                if (state.params.page > 1)
                    state.params.page = state.params.page - 1;
                return;
            }
            state.params.page = state.params.page + 1;
            representives.forEach((representive) => {
                state.representives.push(representive);
            });
            state.representives_state = "done";
        },
        show_info(state, data) {
            state.infoUser = data.password
        },
    },
    actions: {
        async resetFields({ state }) {
            state.representives_state = "done";
            state.representives = [];
            state.table_loading = false;
            state.params = {
                dropdown: true,
                page: 1,
                itemsPerPage: 10,
            };
        },
        async getRepresentives({ commit, state, dispatch, rootState }) {
            if (state.representives_state != "done") return -1;
            state.table_loading = true;
            console.log("here")
            let data = state.params;

            let skip = (data.page - 1) * data.itemsPerPage;
            let limit = data.itemsPerPage;
            let query = "";
            if (
                state.representiveQuery != undefined &&
                state.representiveQuery != null &&
                state.representiveQuery.length > 0
            ) query = `&query=${state.representiveQuery}`;
            return new Promise((resolve, reject) => {

                axios({
                    url: `${rootState.server}` + "/api/get_representatives" + "?skip=" + skip +
                        "&limit=" +
                        limit +
                        query,
                    method: "GET",
                }).then(resp => {

                    state.table_loading = false;
                    state.pageCount = resp.data.count;
                    if (data.dropdown == false) {
                        commit('representives_success', resp.data.result)
                        dispatch("snackbarToggle", { toggle: true, text: resp.data.message }, { root: true });
                    } else {
                        commit("representive_dropdown_success", resp.data.result);
                    }

                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    reject(err);
                    commit("representives_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );
                    console.warn(err);
                });
            })

        },

        async addRepresentive({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("representives_request");
                axios({
                    url: `${rootState.server}` + "/api/add_representative",
                    data: data,
                    headers: {
                        "Content-Type": "application/json",

                    },
                    method: "POST",
                }).then(resp => {
                    state.table_loading = false;
                    commit("add_representive_success", resp.data.result[0]);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    console.log(err);
                    state.table_loading = false;
                    commit("representives_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },

        async editRepresentives({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve, reject) => {
                commit("representives_request");
                axios({
                    url: `${rootState.server}` + "/api/update_represenivet",
                    data: data,
                    headers: {
                        "Content-Type": "application/json",

                    },
                    method: "PUT",
                }).then(resp => {
                    state.table_loading = false
                    commit("representive_edit_success", resp.data.result[0])
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("representives_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },

        async deleteRepresentive({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("representives_request");
                axios({
                    url: `${rootState.server}` + "/api/delete_representive",
                    data: { representive_id: data.id },
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "delete",
                }).then(resp => {
                    state.table_loading = false;
                    // console.log(resp)
                    commit("delete_representive", data);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("representives_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },
        async getUserInfo({ commit, state, rootState }, data) {
            return new Promise((resolve, reject) => {
                axios({
                    url: `${rootState.server}` + "/api/show_password",
                    data: { user_id: data },
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                }).then(resp => {
                    commit("show_info", resp.data.result[0])
                    resolve(resp);
                }).catch((err) => {
                    reject(err);
                    commit("user_error");
                    console.warn(err);
                });

            })
        },


    }

}
export default representive;
