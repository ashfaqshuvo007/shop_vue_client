<template>
    <div>
        <div class="container d-block d-lg-none">
            <div class="vertical-menu mt-30">
            <span @click="setCategoryMenu(!categoryMenu.categoryMenuOpened)"
                  class="categorie-title mobile-categorei-menu">
                Shop by Categories
            </span>
                <nav v-show="categoryMenu.categoryMenuOpened">
                    <div class="category-menu sidebar-menu sidbar-style mobile-categorei-menu-list"
                         id="cate-mobile-toggle">
                        <DropDown :dropdownItem="categoryMenu" :onSelection="onCategorySelected"></DropDown>
                    </div>
                </nav>
            </div>
        </div>
        <!-- Categorie Menu & Slider Area Start Here -->
        <div class="main-page-banner home-3">
            <div class="container">
                <div class="row">
                    <!-- Vertical Menu Start Here -->
                    <div class="col-xl-2 col-lg-2 d-none d-lg-block p-0">
                        <div class="vertical-menu mb-all-30">
                            <nav v-show="categoryMenu.categoryMenuOpened">
                                <ul class="vertical-menu-list">
                                    <li class="" v-for="menu in categoryMenu.items">
                                        <a @click="onCategorySelected(menu)">
                                            {{menu.name}}
                                            <i aria-hidden="true" class="fa fa-angle-right"
                                               v-if="menu.items.length > 0"></i>
                                        </a>
                                        <SubMenu :onSelection="onCategorySelected" :subMenus="menu.items"
                                                 v-if="menu.items.length > 0">
                                        </SubMenu>
                                        <!-- category submenu end-->
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <!-- Vertical Menu End Here -->
                </div>
                <!-- Row End -->
            </div>
            <!-- Container End -->
        </div>
        <!-- Categorie Menu & Slider Area End Here -->
    </div>
</template>

<script>
    import DropDown from './DropDown.vue';
    import {API_PRODUCT_CATEGORIES} from '@/base/config/base_apis';
    import axios from 'axios';
    import SubMenu from "./SubMenu";

    export default {
        name: "CategoryMenu",
        components: {
            SubMenu,
            DropDown,
        },
        props: {
            openCategoryMenu: {
                type: Boolean,
                default: false
            },
            setCategoryMenuStatus: {
                type: Function,
            },
            isOpenDefault: {
                type: Boolean,
                default: function () {
                    return false;
                }
            },
        },
        computed: {
            openCategoryMenuChangeListener() {
                return this.openCategoryMenu;
            },
            isOpenFromStore: function () {
                return this.$store.getters['menuStore/getCategoryDropdownVisibility'];
            },
        },
        watch: {
            isOpenFromStore: function (newValue, oldValue) {
                this.categoryMenu.categoryMenuOpened = newValue;
            },
            openCategoryMenuChangeListener(newValue, oldValue) {
                this.setCategoryMenu(newValue);
            },
        },
        data: function () {
            return {
                categoryMenu: {
                    items: [],
                    categoryMenuOpened: false,
                },
            }
        },
        methods: {
            setCategoryMenu: function (isOpened) {
                this.categoryMenu.categoryMenuOpened = isOpened;
                this.setCategoryMenuStatus(isOpened);
            },
            convertToTreeGroup: function (list) {
                var map = {}, node, roots = [], i;
                for (i = 0; i < list.length; i += 1) {
                    map[list[i].id] = i; // initialize the map
                    list[i].items = []; // initialize the children
                }
                for (i = 0; i < list.length; i += 1) {
                    node = list[i];
                    node['key'] = node.id;
                    node['value'] = node.id;
                    node['href'] = '#';
                    node['active'] = false;
                    if (node.parent !== null) {
                        list[map[node.parent]].items.push(node);
                    } else {
                        roots.push(node);
                    }
                }
                return roots;
            },
            onCategorySelected: function (item) {
                this.$store.dispatch('productStore/setSearchProductCategory', item.value);
                this.$store.dispatch('productStore/executeSearch');
            },
        },
        mounted() {
            axios.get(API_PRODUCT_CATEGORIES, {
                params: {}
            }).then(response => {
                this.categoryMenu.items = this.convertToTreeGroup(response.data.results);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
            this.categoryMenu.categoryMenuOpened = this.isOpenDefault;
        },
    }
</script>

<style scoped>

</style>