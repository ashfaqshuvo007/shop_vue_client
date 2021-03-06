import Vue from 'vue'
import VueRouter from "vue-router";
import Application from "../views/Application";
import {authMiddleware} from "@/base/middleware/auth_middleware";
import ProductCatalog from "@/application/views/product/ProductCatalog";
import CategoryHome from "@/application/views/home/CategoryHome";
import ProductDetail from "@/application/views/product/ProductDetail";

Vue.use(VueRouter);

let applicationRoutes = {
    path: "/",
    redirect: "/home/",
    component: Application,
    name: "Application",
    children: [
        {
            path: "home/",
            name: "CategoryHome",
            component: CategoryHome,
            meta: {}
        },
        {
            path: "shop/",
            redirect: "/shop/e30=/",
        },
        {
            path: "shop/:searchCatalog",
            name: "ProductCatalog",
            component: ProductCatalog,
            meta: {}
        },
        {
            path: "product/detail/:productID",
            name: "ProductDetail",
            component: ProductDetail,
            meta: {}
        },
    ],
};

const globalMiddleware = [authMiddleware];

let router = new VueRouter({
    routes: [applicationRoutes,],
    // mode: 'history',
    saveScrollPosition: true,
    history: true,
    linkExactActiveClass: "nav-item active",
    scrollBehavior: to => {
        if (to.hash) {
            return {selector: to.hash};
        } else {
            return {x: 0, y: 0};
        }
    }
});

/************************ Calling the middlewares ******************************/
// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function callNextMiddleware(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Then run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = callNextMiddleware(context, middleware, index + 1);
        subsequentMiddleware({...context, next: nextMiddleware});
    };
}

router.beforeEach((to, from, next) => {
    let middleware = globalMiddleware;
    if (to.meta.middleware) {
        middleware = Array.isArray(to.meta.middleware)
            ? middleware.concat(to.meta.middleware)
            : middleware.concat([to.meta.middleware]);
    }
    if (middleware.length > 0) {
        const context = {from, next, router, to,};
        const nextMiddleware = callNextMiddleware(context, middleware, 1);
        return middleware[0]({...context, context: context, next: nextMiddleware});
    }
    return next();
});
/************************ Ending the middlewares ******************************/

export default router;