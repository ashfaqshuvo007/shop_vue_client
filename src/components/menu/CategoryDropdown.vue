<template>
    <!-- Categories Search Box Start Here -->
        <div class="col-lg-7 col-md-7 col-7">
            <div class="categorie-search-box">
                <div class="form-group">
                    <SelectDropdown :items="categories" :onSelection="onCategorySelected"></SelectDropdown>
                </div>
                <input name="search" placeholder="I’m shopping for..." type="text" v-model="searchText">
                <button @click="executeSearch" type="button"><i class="lnr lnr-magnifier"></i></button>
            </div>
        </div>
    <!-- Categories Search Box End Here -->
</template>

<script>
    import SelectDropdown from "@/components/global/SelectDropdown";
    import {API_PRODUCT_CATEGORIES} from '@/base/config/base_apis';
    import axios from 'axios';

    export default {
        name: "CategoryDropdown",
        components: {SelectDropdown,},
        data: function () {
            return {
                categories: [
                    {value: 0, text: "All categories",},
                ],
                searchText: '',
            }
        },
        watch: {
            searchText: function (newValue, oldValue) {
                this.$store.dispatch('productStore/setSearchProductName', newValue);
            }
        },
        methods: {
            onCategorySelected: function (item) {
                this.$store.dispatch('productStore/setSearchProductCategory', item.value);
            },
            executeSearch: function () {
                this.$store.dispatch('productStore/executeSearch');
            },
        },
        mounted() {
            axios.get(API_PRODUCT_CATEGORIES, {
                params: {parent: 0}
            }).then(response => {
            	let results = response.data.results;
                this.categories = [{value: 0, text: "All categories",}];
                for (let index = 0; index < results.length; index++) {
                    let category = results[index];
                    this.categories.push({value: category.id, text: category.name,});
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
        },
    }
</script>

<style scoped>

</style>