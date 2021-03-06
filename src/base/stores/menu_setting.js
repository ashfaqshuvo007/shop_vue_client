import {API_USER_PROFILE} from '../../base/config/base_apis';
import axios from 'axios';

const CompanyProfileStore = {
    namespaced: true,
    state: {
        isCategoryDropdownVisible: false
    },
    mutations: {
        setCategoryDropdownVisibility(state, value) {
            state.isCategoryDropdownVisible = value;
        },
    },
    getters: {
        getCategoryDropdownVisibility(state) {
            return state.isCategoryDropdownVisible;
        },
    },
    actions: {
        setCategoryDropdownVisibility(state, value) {
            state.commit('setCategoryDropdownVisibility', value);
        },
    }
};

export default CompanyProfileStore;