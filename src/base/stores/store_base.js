import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationStore from "@/base/stores/authentication";

Vue.use(Vuex);

export default new Vuex.Store({
    // strict: process.env.NODE_ENV !== 'production',
    strict: false,
    modules: {
        authStore: AuthenticationStore,
    },
    state: {},
    mutations: {},
    getters: {},
    actions: {}
});