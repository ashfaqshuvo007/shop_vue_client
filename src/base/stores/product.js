import {DOMAIN_NAME_WITH_SLASH} from "../../config/server_config";
import router from '../../application/routes/router_application';
import {API_PRODUCT_OPERATIONS} from '../../base/config/base_apis';
import axios from 'axios';


let convertToProduct = function (state, _product) {
    let productObj = {
        id: _product.id,
        name: _product.name,
        description: _product.description,
        isNew: _product.is_new,
    };
    productObj['images'] = [];
    for (let i = 0; i < _product.icons.length; i++) {
        productObj['images'].push({
            'src': DOMAIN_NAME_WITH_SLASH + _product.icons[i].url,
            'thumbnail': DOMAIN_NAME_WITH_SLASH + _product.icons[i].url,
            'caption': _product.icons[i].title
        })
    }
    productObj['breakdowns'] = [];
    let stockQuantity = 0;
    for (let i = 0; i < _product.product_breakdowns.length; i++) {
        let _breakdown = _product.product_breakdowns[i];
        productObj['breakdowns'].push({
            'id': _breakdown['id'],
            'originalPrice': _breakdown['original_price'],
            'sellingPrice': _breakdown['selling_price'],
            'discountAmount': _breakdown['discount_amount'],
            'discountPercent': _breakdown['discount_percent'],
            'stockQuantity': _breakdown['stock_quantity'],
            'productAttributes': _breakdown['product_attributes'],
        });
        stockQuantity += _breakdown['stock_quantity'];
    }
    let minSellingPrice = Math.min.apply(Math, productObj.breakdowns.map(function (b) {
        return b.sellingPrice;
    }));
    let maxSellingPrice = Math.max.apply(Math, productObj.breakdowns.map(function (b) {
        return b.sellingPrice;
    }));
    if (minSellingPrice === maxSellingPrice) {
        productObj.sellingPrice = minSellingPrice;
    } else {
        productObj.sellingPrice = minSellingPrice + " - " + maxSellingPrice;
    }

    let minOriginalPrice = Math.min.apply(Math, productObj.breakdowns.map(function (b) {
        return b.originalPrice;
    }));
    let maxOriginalPrice = Math.max.apply(Math, productObj.breakdowns.map(function (b) {
        return b.originalPrice;
    }));
    if (minOriginalPrice === maxOriginalPrice) {
        productObj.originalPrice = minOriginalPrice;
    } else {
        productObj.originalPrice = minOriginalPrice + " - " + maxOriginalPrice;
    }


    let minDiscountPercent = Math.min.apply(Math, productObj.breakdowns.map(function (b) {
        return b.discountPercent;
    }));
    let maxDiscountPercent = Math.max.apply(Math, productObj.breakdowns.map(function (b) {
        return b.discountPercent;
    }));
    if (minDiscountPercent === maxDiscountPercent) {
        productObj.discountPercent = minDiscountPercent;
    } else {
        productObj.discountPercent = minDiscountPercent + " - " + maxDiscountPercent;
    }
    productObj.stockQuantity = stockQuantity;
    return productObj;
};

const AuthenticationStore = {
    namespaced: true,
    state: {
        search: {},
        searchBase64: '{}',
        products: [],
        selectedProduct: null,
    },
    mutations: {
        searchBase64(state, value) {
            state.searchBase64 = value;
            state.search = JSON.parse(atob(value));
        },
        search(state, value) {
            state.search = value;
            state.searchBase64 = btoa(JSON.stringify(state.search));
        },
        products(state, value) {
            state.products = value;
        },
        selectedProduct(state, value) {
            state.selectedProduct = value;
        },
    },
    getters: {
        getSearch(state) {
            return state.search;
        },
        getSearchBase64(state) {
            return state.searchBase64;
        },
        getProducts(state) {
            return state.products;
        },
        getSelectedProduct(state) {
            return state.selectedProduct;
        },
    },
    actions: {
        setSearchBase64(state, searchBase64) {
            state.commit('searchBase64', searchBase64);
        },
        setSearch(state, search) {
            state.commit('search', search);
        },
        setSearchProductName(state, value) {
            let searchPayload = state.getters['getSearch'];
            searchPayload['name'] = value;
            state.commit('search', searchPayload);
        },
        setSearchProductCategory(state, value) {
            let searchPayload = state.getters['getSearch'];
            searchPayload['category'] = value;
            state.commit('search', searchPayload);
        },
        convertToProducts: function (state, list) {
            let products = [];
            for (let index = 0; index < list.length; index++) {
                let _product = list[index];
                try {
                    products.push(convertToProduct(state, _product));
                } catch (error) {
                    console.log(error);
                }
            }
            state.commit('products', products);
        },
        convertToSingleProduct: function (state, _product) {
            state.commit('selectedProduct', convertToProduct(state, _product));
        },
        downloadProducts(state) {
            axios.get(API_PRODUCT_OPERATIONS, {
                params: state.getters['getSearch']
            }).then(response => {
                state.dispatch('convertToProducts', response.data.results);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
        },
        downloadSingleProduct(state, id) {
            axios.get(API_PRODUCT_OPERATIONS + id + '/', {}).then(response => {
                state.dispatch('convertToSingleProduct', response.data);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
        },
        executeSearch(state) {
            router.push({
                name: 'ProductCatalog',
                params: {
                    searchCatalog: state.getters['getSearchBase64']
                }
            });
        },
    },
};

export default AuthenticationStore;
