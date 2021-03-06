<template>
    <!-- Sidebar Electronics Categorie Start -->
    <div class="electronics mb-40">
        <h3 class="sidebar-title">{{expandableCategory.title}}</h3>
        <div class="category-menu sidebar-menu sidbar-style" id="shop-cate-toggle">
            <DropDown :dropdownItem="expandableCategory"></DropDown>
        </div>
        <!-- category-menu-end -->
    </div>
    <!-- Sidebar Electronics Categorie End -->
</template>

<script>
    import DropDown from "@/components/menu/DropDown";

    export default {
        name: "SearchByExpand",
        components: {DropDown,},
        props: {
            expandableCategory: {
                type: Object,
                default: function () {
                    return {
                        title: null,
                    }
                },
            }
        },
        data: function () {
            return {}
        }
    }
</script>

<style scoped>

</style>