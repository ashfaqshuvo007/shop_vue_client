import {DOMAIN_NAME_WITH_SLASH} from "../../config/server_config";
import {API_CHAT_THREAD_MESSAGES} from '../../base/config/base_apis';
import axios from 'axios';

const ChatStore = {
    namespaced: true,
    state: {
        messages: [],
        deliveredMessage: null,
        failedMessage: null,
    },
    mutations: {
        messages(state, value) {
            state.messages = value;
        },
        deliveredMessage(state, value) {
            state.deliveredMessage = value;
        },
        failedMessage(state, value) {
            state.failedMessage = value;
        },
    },
    getters: {
        getMessages(state) {
            return state.messages;
        },
        getDeliveredMessage(state) {
            return state.deliveredMessage;
        },
        getFailedMessage(state) {
            return state.failedMessage;
        },
    },
    actions: {
        downloadThreadMessage(state, data) {
            axios.get(
                API_CHAT_THREAD_MESSAGES  + '?chat_thread=' + data.id,
                {
                    headers: {
                        "Authorization": data.token,
                    },
                }
            ).then(response => {
                state.commit('messages', response.data.results);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
        },
        sendMessage(state, data) {
            axios.post(API_CHAT_THREAD_MESSAGES, data.payload, {
                headers: {
                    "Authorization": data.token,
                },
            }).then(response => {
                state.commit('deliveredMessage', response.data);
            }).catch(error => {
                state.commit('failedMessage', data.payload);
            }).finally(() => {
            });
        },
    },
};

export default ChatStore;
