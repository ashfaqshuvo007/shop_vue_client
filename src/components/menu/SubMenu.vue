<template>
    <ul class="ht-dropdown mega-child">
        <li v-for="subItem in subMenus">
            <a @click="onSelection(subItem)">
                {{subItem.name}}&nbsp;
                <i class="fa fa-angle-right" v-if="subItem.items.length > 0"></i>
            </a>
            <!-- category submenu end-->
            <SubMenu :subMenus="subItem.items" v-if="subItem.items.length > 0"
                     :onSelection="onSelection">
            </SubMenu>
        </li>
    </ul>
</template>

<script>

    export default {
        name: "SubMenu",
        components: {},
        props: {
            subMenus: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            onSelection: {
                type: Function,
                default: null,
            },
        },
        computed: {},
        methods: {},
        mounted() {
        },
    }
</script>

<style scoped>

</style>