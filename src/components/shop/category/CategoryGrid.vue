<template>
    <div class="single-product" :class="{ 'selected': selected }" style="min-height: 220px;">
        <!-- Product Image Start -->
        <div class="pro-img">
            <lingallery :disableImageClick="true"
                        :height="150"
                        :items="category.images"
                        :responsive="true"
                        :showThumbnails="false"
                        :weight="150"/>
        </div>
        <!-- Product Image End -->
        <!-- Product Content Start -->
        <div class="pro-content p-2 category-content" v-if="selectedCallback !== null">
            <div class="pro-info" style="margin-top: 5px; text-align: center;">
                <h4><a>{{category.name}}</a></h4>
            </div>
            <div class="pro-actions category-pro-actions">
                <div class="actions-primary">
                    <a @click="selectedCategory" v-if="category.parent_id">Go Shopping</a>
                    <a @click="selectedCategory" v-else-if="selected">Hide Detail</a>
                    <a @click="selectedCategory" v-else>Show Detail</a>
                </div>
            </div>
        </div>
        <div class="pro-content p-2 category-content" v-else>
            <div style="margin-top: 15px; text-align: center;">
                <h4><a>{{category.name}}</a></h4>
            </div>
        </div>
    </div>
</template>

<script>
	import Lingallery from "@/components/core/photo/Lingallery";

    export default {
        name: "CategoryGrid",
        components: {
            Lingallery,
        },
        props: {
            category: {
                type: Object,
                default: function () {
                    return {
                        name: "Error",
                        images: []
                    }
                }
            },
            selectedCallback: {
                type: Function,
                default: null,
            },
            selected: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            selectedCategory: function () {
                if (this.selectedCallback !== null) {
                    this.selectedCallback(this.category, this.selected);
                }
            }
        },
    }
</script>

<style scoped>

</style>