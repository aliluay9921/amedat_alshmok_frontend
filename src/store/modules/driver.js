// import Vue from "vue";
import axios from "axios";

const driver = {
    namespaced: true,
    state: () => ({
        drivers: [],
        driver_state: "done",
        table_loading: false,
        driverQuery: "",
        pageCount: 1,
        params: {
            dropdown: true,
            page: 1,
            itemsPerPage: 100,
        },
    }),
    getters: {},
    mutations: {
        drivers_success(state, drivers) {
            state.drivers.splice(0, state.drivers.length)
            drivers.forEach(element => {
                state.drivers.push(element)
            });
            state.driver_state = "done"
            state.table_loading = false

        },
        drivers_request(state) {
            state.driver_state = "loading";
        },

        drivers_error(state) {
            state.driver_state = "error";
        },
        add_driver_success(state, driver) {
            state.drivers.unshift(driver);
            state.driver_state = "done";
            state.table_loading = false;
            console.log(driver);
        },
        drivers_dropdown_success(state, drivers) {

            state.table_loading = false;
            if (drivers.length == 0) {
                state.driver_state = "finished";
                if (state.params.page > 1)
                    state.params.page = state.params.page - 1;
                return;
            }
            state.params.page = state.params.page + 1;
            drivers.forEach((driver) => {
                state.drivers.push(driver);
            });
            state.driver_state = "done";
        },
        delete_driver(state, driver) {
            let index = state.drivers.findIndex((e) => e.id == driver.id);
            state.drivers.splice(index, 1)
            state.driver_state = "done";
            state.table_loading = false;
        },
    },
    actions: {
        async resetFields({ state }) {
            state.pageCount = 1;
            state.driver_state = "done";
            state.drivers = [];
            state.table_loading = false;
            state.params = {
                dropdown: true,
                page: 1,
                itemsPerPage: 10,
            };
        },
        async getDrivers({ commit, state, dispatch, rootState }) {
            if (state.driver_state != "done") return -1;
            state.table_loading = true;
            console.log("here")
            let data = state.params;

            let skip = (data.page - 1) * data.itemsPerPage;
            let limit = data.itemsPerPage;
            let query = "";
            if (
                state.driverQuery != undefined &&
                state.driverQuery != null &&
                state.driverQuery.length > 0
            ) query = `&query=${state.driverQuery}`;
            return new Promise((resolve, reject) => {

                axios({
                    url: `${rootState.server}` + "/api/get_drivers" + "?skip=" + skip +
                        "&limit=" +
                        limit +
                        query,
                    method: "GET",
                }).then(resp => {

                    state.table_loading = false;
                    state.pageCount = resp.data.count;
                    if (data.dropdown == false) {
                        commit('drivers_success', resp.data.result)
                        dispatch("snackbarToggle", { toggle: true, text: resp.data.message }, { root: true });
                    } else {
                        commit("drivers_dropdown_success", resp.data.result);
                    }

                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    reject(err);
                    commit("drivers_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );
                    console.warn(err);
                });
            })

        },
        async addDriver({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("drivers_request");
                axios({
                    url: `${rootState.server}` + "/api/add_driver",
                    data: data,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                }).then(resp => {
                    state.table_loading = false;
                    commit("add_driver_success", resp.data.result[0]);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    console.log(err);
                    state.table_loading = false;
                    commit("drivers_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },

        async deleteDriver({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("drivers_request");
                axios({
                    url: `${rootState.server}` + "/api/delete_driver",
                    data: { driver_id: data.id },
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "delete",
                }).then(resp => {
                    state.table_loading = false;
                    // console.log(resp)
                    commit("delete_driver", data);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("drivers_error");
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
export default driver;
