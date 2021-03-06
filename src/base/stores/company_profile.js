import {API_USER_PROFILE} from '../../base/config/base_apis';
import axios from 'axios';

const CompanyProfileStore = {
    namespaced: true,
    state: {
        submitSuccess: false,
        profileDetails: {}
    },
    mutations: {
        submitSuccess(state, value) {
            state.submitSuccess = value;
        },
        profileDetails(state, value) {
            state.profileDetails = value;
        },
    },
    getters: {
        getProfileDetails(state) {
            return state.profileDetails;
        },
        getSubmitSuccess(state) {
            return state.submitSuccess;
        },
    },
    actions: {
        setSubmitSuccess(state, data) {
            state.commit('submitSuccess', data);
        },
        setProfileDetails(state, responseData) {
            state.commit('profileDetails', responseData);
        },
        downloadProfileDetails(state, data) {
            axios.get(API_USER_PROFILE + data['infoID'] + '/', {
                headers: {
                    "Authorization": "Token " + data['token'],
                },
            }).then(response => {
                state.dispatch('setProfileDetails', response.data);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
        },
        putProfileDetails(state, data) {
            axios.put(API_USER_PROFILE + data['infoID'] + '/', data['payload'], {
                headers: {
                    "Authorization": "Token " + data['token'],
                },
            }).then(response => {
                state.dispatch('setProfileDetails', response.data);
                state.commit('submitSuccess', true);
            }).catch(error => {
                state.commit('submitSuccess', false);
                console.log(error);
            }).finally(() => {
            });
        },
    }

};

export default CompanyProfileStore;