import store from '@/base/stores/store_base';

let signingMiddleware = function ({next, context, router}) {
    if (store.getters['authStore/isAuthenticated']) {
        window.location.href = '/application/';
        return;
    }
    return next();
};

let securityMiddleware = function ({next, context, router}) {
    if (!store.getters['authStore/isAuthenticated']) {
        window.location.href = '/authentication/';
        return;
    }
    return next();
};

export  {signingMiddleware, securityMiddleware};