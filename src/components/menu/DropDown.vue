<template>
    <ul :class="{'category-sub': isSub}">
        <li :class="{
                        'has-sub': hasDropdown(item),
                        '': !hasDropdown(item),
                    }"
            v-bind:key="item.key"
            v-for="item in dropdownItem.items">
            <a @click.stop="toggleDropdown(item)">
                <span @click.stop="selectDropDown(item)">{{item.name}}</span>
            </a>
            <DropDown :dropdownItem="item" :isSub="true" :onSelection="onSelection"
                      v-show="openDropdown(item)">
            </DropDown>
        </li>
    </ul>
</template>

<script>

    export default {
        name: "DropDown",
        components: {},
        props: {
            onSelection: {
                type: Function,
                default: null,
            },
            dropdownItem: {
                type: Object,
            },
            isSub: {
                type: Boolean,
                default: false,
            }
        },
        computed: {},
        methods: {
            toggleDropdown: function (item) {
                item.active = !item.active;
            },
            selectDropDown: function (item) {
                this.onSelection(item);
            },
            hasDropdown: function (item) {
                return item.items !== undefined && item.items.length > 0;
            },
            openDropdown: function (item) {
                return item.items !== undefined && item.items.length > 0 && item.active;
            },
        },
    }
</script>

<style scoped>

</style>