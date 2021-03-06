import router from '../../authentication/routes/router_signing';

const AuthenticationStore = {
    namespaced: true,
    state: {
        token: null,
        first_name: null,
        last_name: null,
        user_key: null,
        verification_status: null,
        profile_info: null,
        user_type: null,
        isAuthenticated: false,
        loggedInUser: null
    },
    mutations: {
        authenticate(state) {
            let token = this._vm.$session.get('token');
            state.token = null;
            // state.expiry = null;
            state.isAuthenticated = false;
            if (token !== undefined && token !== null) {
                state.token = token;
                state.isAuthenticated = true;
                state.first_name = this._vm.$session.get('first_name');
                state.last_name = this._vm.$session.get('last_name');
                state.user_key = this._vm.$session.get('user_key');
                state.profile_info = this._vm.$session.get('profile_info');
                state.user_type = this._vm.$session.get('user_type');
                state.verification_status = this._vm.$session.get('verification_status');
                // let currentTimeInMilliseconds = new Date().valueOf();
                // let expiry = this._vm.$session.get('expiry');
                // if (currentTimeInMilliseconds < expiry) {
                //     state.expiry = expiry;
                //     state.isAuthenticated = true;
                // }
            }
        },
        logout(state) {
            let token = this._vm.$session.get('token');
            state.token = null;
            // state.expiry = null;
            state.isAuthenticated = false;
            this._vm.$session.set('token', null);
            this._vm.$session.set('first_name', null);
            this._vm.$session.set('last_name', null);
            this._vm.$session.set('user_key', null);
            this._vm.$session.set('profile_info', null);
            this._vm.$session.set('user_type', null);
            this._vm.$session.set('verification_status', null);
            window.location.href = '/';
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        authToken(state) {
            return state.token;
        },
        userKey(state) {
            return state.user_key;
        },
        profileInfo(state) {
            return state.profile_info;
        },
        userType(state) {
            return state.user_type;
        },
        userInfo(state) {
            return {
                token: state.token,
                first_name: state.first_name,
                last_name: state.last_name,
                user_key: state.user_key,
                verification_status: state.verification_status,
            };
        },
    },
    actions: {
        authenticate(state) {
            state.commit('authenticate');
        },
        logoutUser(state) {
            state.commit('logout');
        },
    }
};

export default AuthenticationStore;
