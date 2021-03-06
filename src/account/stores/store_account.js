import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationStore from "@/base/stores/authentication";
import MenuSettingStore from "@/base/stores/menu_setting";
import ProductStore from "@/base/stores/product";
import ProductCategoryStore from "@/base/stores/category";
import CompanyProfileStore from "@/base/stores/company_profile";
import CommonDataStore from "@/base/stores/common_data";
import OrderStore from "@/base/stores/order";
import ChatStore from "@/base/stores/chat";

Vue.use(Vuex);

export default new Vuex.Store({
    // strict: process.env.NODE_ENV !== 'production',
    strict: false,
    modules: {
        commonDataStore: CommonDataStore,
        authStore: AuthenticationStore,
        menuStore: MenuSettingStore,
        productStore: ProductStore,
        productCategoryStore: ProductCategoryStore,
        profileStore: CompanyProfileStore,
        orderStore: OrderStore,
        chatStore: ChatStore,
    },
    state: {},
    mutations: {},
    getters: {},
    actions: {}
});