<template>
    <!-- Sidebar Categorie Start -->
    <div class="sidebar-categorie mb-40">
        <h3 class="sidebar-title">{{checkCategory.title}}</h3>
        <ul class="sidbar-style">
            <li class="form-check" v-for="item in checkCategory.items">
                <input class="form-check-input" :id="item.value" type="checkbox" :value="item.value" v-model="item.state">
                <label class="form-check-label" :for="item.value">{{item.text}} ({{item.quantity}})</label>
            </li>
        </ul>
    </div>
    <!-- Sidebar Categorie Start -->
</template>

<script>
    export default {
        name: "SearchByCheck",
        props: {
            checkCategory: {
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