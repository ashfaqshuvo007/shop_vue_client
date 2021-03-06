<template>
    <div>
        <div :class="{
                 'open': isDropDownOpened,
                 '': !isDropDownOpened
             }"
             @click="toggleDropDown"
             class="nice-select bootstrap-select"
             tabindex="0">
            <span class="current">{{selectedItem.text}}</span>
            <ul class="list" v-show="isDropDownOpened">
                <li :data-value="item.value"
                    @click.stop="onItemSelected(item)"
                    class="option"
                    v-for="item in items">
                    {{item.text}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SelectDropdown",
        props: {
            items: {
                type: Array,
                default: function () {
                    return [];
                },
            },
            onSelection: {
                type: Function,
                default: null,
            }
        },
        data: function () {
            return {
                selectedItem: {text: '', value: null,},
                isDropDownOpened: false,
            }
        },
        methods: {
            onItemSelected: function (item) {
                this.isDropDownOpened = false;
                this.selectedItem = item;
                if(this.onSelection !== null) {
                    this.onSelection(item);
                }
            },
            toggleDropDown: function () {
                this.isDropDownOpened = !this.isDropDownOpened;
            },
        },
        mounted() {
            this.selectedItem = (this.items.length > 0) ? this.items[0] : {text: '', value: null,};
        },
    }
</script>

<style scoped>

</style>