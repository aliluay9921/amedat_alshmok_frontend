import Vue from "vue";
import axios from "axios";

const user = {
    namespaced: true,
    state: () => ({
        users: [],
        user_state: "done",
        table_loading: false,
        userQuery: "",
        pageCount: 1,
        params: {
            dropdown: true,
            page: 1,
            itemsPerPage: 50,
        },
    }),
    getters: {},
    mutations: {
        users_success(state, users) {
            state.users.splice(0, state.users.length)
            users.forEach(element => {
                state.users.push(element)
            });
            state.user_state = "done"
            state.table_loading = false

        },
        users_request(state) {
            state.user_state = "loading";
        },

        users_error(state) {
            state.user_state = "error";
        },
        // add_user_success(state, user) {
        //     state.users.unshift(user);
        //     state.user_state = "done";
        //     state.table_loading = false;
        //     console.log(user);
        // },
        // users_dropdown_success(state, users) {

        //     state.table_loading = false;
        //     if (users.length == 0) {
        //         state.user_state = "finished";
        //         if (state.params.page > 1)
        //             state.params.page = state.params.page - 1;
        //         return;
        //     }
        //     state.params.page = state.params.page + 1;
        //     users.forEach((user) => {
        //         state.users.push(user);
        //     });
        //     state.user_state = "done";
        // },

        // delete_user(state, user) {
        //     let index = state.users.findIndex((e) => e.id == user.id);
        //     state.users.splice(index, 1)
        //     state.user_state = "done";
        //     state.table_loading = false;
        // },
    },
    actions: {
        async resetFields({ state }) {
            state.user_state = "done";
            state.users = [];
            state.table_loading = false;
            state.params = {
                dropdown: true,
                page: 1,
                itemsPerPage: 10,
            };
        },
        async getUsers({ commit, state, dispatch, rootState }) {
            if (state.user_state != "done") return -1;
            state.table_loading = true;
            let data = state.params;

            let skip = (data.page - 1) * data.itemsPerPage;
            let limit = data.itemsPerPage;
            let query = "";
            if (
                state.userQuery != undefined &&
                state.userQuery != null &&
                state.userQuery.length > 0
            ) query = `&query=${state.userQuery}`;
            return new Promise((resolve, reject) => {

                axios({
                    url: `${rootState.server}` + "/api/get_users" + "?skip=" + skip +
                        "&limit=" +
                        limit +
                        query,
                    method: "GET",
                }).then(resp => {

                    state.table_loading = false;
                    state.pageCount = resp.data.count;
                    if (data.dropdown == false) {
                        commit('users_success', resp.data.result)
                        dispatch("snackbarToggle", { toggle: true, text: resp.data.message }, { root: true });
                    } else {
                        commit("users_dropdown_success", resp.data.result);
                    }

                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    reject(err);
                    commit("users_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );
                    console.warn(err);
                });
            })

        },
        async changePassword({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            console.log(data);
            return new Promise((resolve, reject) => {
                commit("users_request");
                axios({
                    url: `${rootState.server}` + "/api/reset_password",
                    data: data,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "PUT",
                }).then(resp => {
                    state.table_loading = false
                    // commit("user_reset_success", resp.data.result[0])
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("users_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },
        // async addUser({ commit, state, dispatch, rootState }, data) {
        //     state.table_loading = true
        //     return new Promise((resolve) => {
        //         commit("users_request");
        //         axios({
        //             url: `${rootState.server}` + "/api/add_user",
        //             data: data,
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             method: "POST",
        //         }).then(resp => {
        //             state.table_loading = false;
        //             commit("add_user_success", resp.data.result[0]);
        //             dispatch(
        //                 "snackbarToggle",
        //                 { toggle: true, text: resp.data.message },
        //                 { root: true }
        //             );
        //             resolve(resp);
        //         }).catch((err) => {
        //             console.log(err);
        //             state.table_loading = false;
        //             commit("users_error");
        //             dispatch(
        //                 "snackbarToggle",
        //                 { toggle: true, text: err.response.data.message },
        //                 { root: true }
        //             );

        //             console.warn(err);
        //         });
        //     });
        // },

        // async deleteuser({ commit, state, dispatch, rootState }, data) {
        //     state.table_loading = true
        //     return new Promise((resolve) => {
        //         commit("users_request");
        //         axios({
        //             url: `${rootState.server}` + "/api/delete_user",
        //             data: { user_id: data.id },
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             method: "delete",
        //         }).then(resp => {
        //             state.table_loading = false;
        //             // console.log(resp)
        //             commit("delete_user", data);
        //             dispatch(
        //                 "snackbarToggle",
        //                 { toggle: true, text: resp.data.message },
        //                 { root: true }
        //             );
        //             resolve(resp);
        //         }).catch((err) => {
        //             state.table_loading = false;
        //             commit("users_error");
        //             dispatch(
        //                 "snackbarToggle",
        //                 { toggle: true, text: err.response.data.message },
        //                 { root: true }
        //             );

        //             console.warn(err);
        //         });
        //     });
        // },
    }

}
export default user;
