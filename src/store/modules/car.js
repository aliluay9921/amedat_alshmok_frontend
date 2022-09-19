import Vue from "vue";
import axios from "axios";

const car = {
    namespaced: true,
    state: () => ({
        cars: [],
        car_state: "done",
        table_loading: false,
        carQuery: "",
        pageCount: 1,
        params: {
            dropdown: true,
            page: 1,
            itemsPerPage: 50,
        },
    }),
    getters: {},
    mutations: {
        cars_success(state, cars) {
            state.cars.splice(0, state.cars.length)
            cars.forEach(element => {
                state.cars.push(element)
            });
            state.car_state = "done"
            state.table_loading = false

        },
        cars_request(state) {
            state.car_state = "loading";
        },

        cars_error(state) {
            state.car_state = "error";
        },
        add_car_success(state, car) {
            state.cars.unshift(car);
            state.car_state = "done";
            state.table_loading = false;
            console.log(car);
        },
        cars_dropdown_success(state, cars) {

            state.table_loading = false;
            if (cars.length == 0) {
                state.car_state = "finished";
                if (state.params.page > 1)
                    state.params.page = state.params.page - 1;
                return;
            }
            state.params.page = state.params.page + 1;
            cars.forEach((car) => {
                state.cars.push(car);
            });
            state.car_state = "done";
        },

        delete_car(state, car) {
            let index = state.cars.findIndex((e) => e.id == car.id);
            state.cars.splice(index, 1)
            state.car_state = "done";
            state.table_loading = false;
        },
    },
    actions: {
        async resetFields({ state }) {
            state.car_state = "done";
            state.cars = [];
            state.table_loading = false;
            state.params = {
                dropdown: true,
                page: 1,
                itemsPerPage: 10,
            };
        },
        async getCars({ commit, state, dispatch, rootState }) {
            if (state.car_state != "done") return -1;
            state.table_loading = true;
            console.log("here")
            let data = state.params;

            let skip = (data.page - 1) * data.itemsPerPage;
            let limit = data.itemsPerPage;
            let query = "";
            if (
                state.carQuery != undefined &&
                state.carQuery != null &&
                state.carQuery.length > 0
            ) query = `&query=${state.carQuery}`;
            return new Promise((resolve, reject) => {

                axios({
                    url: `${rootState.server}` + "/api/get_cars" + "?skip=" + skip +
                        "&limit=" +
                        limit +
                        query,
                    method: "GET",
                }).then(resp => {

                    state.table_loading = false;
                    state.pageCount = resp.data.count;
                    if (data.dropdown == false) {
                        commit('cars_success', resp.data.result)
                        dispatch("snackbarToggle", { toggle: true, text: resp.data.message }, { root: true });
                    } else {
                        commit("cars_dropdown_success", resp.data.result);
                    }

                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    reject(err);
                    commit("cars_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );
                    console.warn(err);
                });
            })

        },
        async addCar({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("cars_request");
                axios({
                    url: `${rootState.server}` + "/api/add_car",
                    data: data,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                }).then(resp => {
                    state.table_loading = false;
                    commit("add_car_success", resp.data.result[0]);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    console.log(err);
                    state.table_loading = false;
                    commit("cars_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },

        async deleteCar({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("cars_request");
                axios({
                    url: `${rootState.server}` + "/api/delete_car",
                    data: { car_id: data.id },
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "delete",
                }).then(resp => {
                    state.table_loading = false;
                    // console.log(resp)
                    commit("delete_car", data);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("cars_error");
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
export default car;
