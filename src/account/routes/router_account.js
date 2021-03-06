import Vue from 'vue'
import VueRouter from "vue-router";
import Account from "../views/Account";
import {authMiddleware} from "@/base/middleware/auth_middleware";
import UserProfile from "@/account/views/profile/UserProfile";
import AddProduct from "@/account/views/product/AddProduct";
import MyProductList from "@/account/views/product/MyProductList";
import OrderList from "@/account/views/order/OrderList";
import OrderDetail from "@/account/views/order/OrderDetail";
import {securityMiddleware} from "@/base/middleware/signing_middleware";

Vue.use(VueRouter);

let accountRoutes = {
    path: "/",
    redirect: "/profile/",
    component: Account,
    name: "Account",
    children: [
        {
            path: "profile/",
            name: "UserProfile",
            component: UserProfile,
            meta: {
                breadCrumb: 'User profile',
            }
        },
        {
            path: "product/create/",
            name: "AddProduct",
            component: AddProduct,
            meta: {
                breadCrumb: 'Display a new product',
            }
        },
        {
            path: "product/update/:productID",
            name: "UpdateProduct",
            component: AddProduct,
            meta: {
                breadCrumb: 'Update product',
            }
        },
        {
            path: "product/list/",
            name: "MyProductList",
            component: MyProductList,
            meta: {
                breadCrumb: 'My Products',
            },
        },
        {
            path: "orders/list/",
            name: "OrderList",
            component: OrderList,
            meta: {
                breadCrumb: 'Orders',
            },
        },
        {
            path: "orders/update/:orderID",
            name: "OrderDetail",
            component: OrderDetail,
            meta: {
                breadCrumb: 'Orders Detail',
            },
        },
    ],
    meta: {
        breadCrumb: 'Account',
    }
};

const globalMiddleware = [authMiddleware, securityMiddleware];

let router = new VueRouter({
    routes: [accountRoutes,],
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