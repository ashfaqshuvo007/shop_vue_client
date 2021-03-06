import store from '@/base/stores/store_base';

let authMiddleware = function ({next, context, router}) {
    store.dispatch('authStore/authenticate');
    return next();
};

export  {authMiddleware};