import {DOMAIN_NAME_WITH_SLASH} from "../../config/server_config";
import axios from 'axios';
import {API_PRODUCT_CATEGORIES, API_FEATURED_CATEGORIES} from "../config/base_apis";

const ProductCategoryStore = {
    namespaced: true,
    state: {
        categories: [],
        featuredCategories: [],
    },
    mutations: {
        categories(state, value) {
            state.categories = value;
        },
        featuredCategories(state, value) {
            state.featuredCategories = value;
        },
    },
    getters: {
        getCategories(state) {
            return state.categories;
        },
        getFeaturedCategories(state) {
            return state.featuredCategories;
        },
    },
    actions: {
        convertToProductCategories: function (state, list) {
            let categories = [];
            let categoryDict = {};
            for (let index = 0; index < list.length; index++) {
                let _category = list[index];
                let categoryObj = {
                    db_id: _category.id,
                    name: _category.name,
                    description: _category.description,
                    parent_id: _category.parent,
                    attributes: _category.attributes,
                    selected: false
                };
                categoryObj['images'] = [];
                for (let i = 0; i < _category.icons.length; i++) {
                    categoryObj['images'].push({
                        'src': DOMAIN_NAME_WITH_SLASH + _category.icons[i].url,
                        'thumbnail': DOMAIN_NAME_WITH_SLASH + _category.icons[i].url,
                        'caption': _category.icons[i].title
                    })
                }
                categoryDict[_category.id] = categoryObj;
            }
            Object.keys(categoryDict).forEach(function (c_id) {
                let _category = categoryDict[c_id];
                _category["subcategories"] = [];
                Object.keys(categoryDict).forEach(function (_id) {
                    let _subcategory = categoryDict[_id];
                    if (_subcategory.parent_id == c_id) {
                        _category["subcategories"].push(_subcategory);
                    }
                });
                if (_category.parent_id === null) {
                    categories.push(_category);
                }
            });

            state.commit('categories', categories);
        },
        convertToFeaturedCategories: function (state, list) {
            let featuredCategories = {
                homeCarouselConfig: {
                    images: [],
                },
                sideCampaigns: [],
                bottomCampaigns: [],
            };
            for (let index = 0; index < list.length; index++) {
                let _sponsor = list[index];
                let categoryObj = {
                    db_id: _sponsor.id,
                    category_id: _sponsor.category,
                };
                categoryObj['images'] = [];
                for (let i = 0; i < _sponsor.icons.length; i++) {
                    categoryObj['images'].push({
                        'src': _sponsor.icons[i].full_url,
                        'thumbnail': _sponsor.icons[i].full_url,
                        'caption': _sponsor.icons[i].title
                    })
                }
                if (_sponsor.is_published) {
                    if (_sponsor.is_master)
                        featuredCategories['homeCarouselConfig'] = categoryObj;
                    else {
                        if (featuredCategories.sideCampaigns.length < 2)
                            featuredCategories.sideCampaigns.push(categoryObj);
                        else if (featuredCategories.bottomCampaigns.length < 5)
                            featuredCategories.bottomCampaigns.push(categoryObj);
                    }
                }
            }
            state.commit('featuredCategories', featuredCategories);
        },
        downloadCategories(state) {
            axios.get(API_PRODUCT_CATEGORIES, {}).then(response => {
                state.dispatch('convertToProductCategories', response.data.results);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
        },
        downloadFeaturedCategories(state) {
            axios.get(API_FEATURED_CATEGORIES, {}).then(response => {
                state.dispatch('convertToFeaturedCategories', response.data.results);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
        },
    }
};

export default ProductCategoryStore;
