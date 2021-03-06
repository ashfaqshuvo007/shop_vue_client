import {API_COUNTRY} from '../../base/config/base_apis';
import axios from 'axios';

const CommonDataStore = {
    namespaced: true,
    state: {
        countries: [],
    },
    mutations: {
        setCountries(state, value) {
            state.countries = value;
        },
    },
    getters: {
        getCountryName(state) {
            return function (value) {
                for (let index = 0; index < state.countries.length; index++) {
                    if (state.countries[index].id === value)
                        return state.countries[index].name;
                }
                return 'Undefined';
            }
        },
        getCountries(state) {
            return state.countries;
        },
    },
    actions: {
        downloadCountryData(state, data) {
            axios.get(API_COUNTRY, {
                headers: {
                    "Authorization": "Token " + data['token'],
                },
            }).then(response => {
                state.commit('setCountries', response.data.results);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
        },
    }
};

export default CommonDataStore;