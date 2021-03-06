<template>
    <!-- Product Color Start -->
    <div class="color mb-40">
        <h3 class="sidebar-title">{{colorCategory.title}}</h3>
        <ul class="color-option sidbar-style">
            <li v-for="item in colorCategory.items">
                <span :class="item.color"></span>
                <a :data-value="item.value">{{item.text}} ({{item.quantity}})</a>
            </li>
        </ul>
    </div>
    <!-- Product Color End -->
</template>

<script>
    export default {
        name: "SearchByColor",
        props: {
            colorCategory: {
                type: Object,
                default: function () {
                    return {
                        title: null,
                        items: [],
                    };
                }
            }
        },
    }
</script>

<style scoped>

</style>