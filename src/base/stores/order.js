import {DOMAIN_NAME_WITH_SLASH} from "../../config/server_config";
import {API_PRODUCT_BOOKING} from '../../base/config/base_apis';
import axios from 'axios';

const OrderStore = {
    namespaced: true,
    state: {
        orders: [],
        selectedOrder: null,
    },
    mutations: {
        orders(state, value) {
            state.orders = value;
        },
        selectedOrder(state, value) {
            state.selectedOrder = value;
        },
    },
    getters: {
        getOrders(state) {
            return state.orders;
        },
        getSelectedOrder(state) {
            return state.selectedOrder;
        },
    },
    actions: {
        downloadOrders(state, data) {
            axios.get(
                API_PRODUCT_BOOKING,
                {
                    headers: {
                        "Authorization": data.token,
                    },
                }
            ).then(response => {
                state.commit('orders', response.data.results);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
        },
        downloadSingleOrder(state, data) {
            axios.get(
                API_PRODUCT_BOOKING + data.id + '/',
                {
                    headers: {
                        "Authorization": data.token,
                    },
                }
            ).then(response => {
                state.commit('selectedOrder', response.data);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
        },
    },
};

export default OrderStore;
