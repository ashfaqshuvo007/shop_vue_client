<template>
	<!-- Shop Page Start -->
	<div class="main-shop-page pb-20 ptb-sm-60">
		<div class="container pt-10 pb-10">
			<!-- Row End -->
			<div class="row p-0">
				<!-- Slider Area Start Here -->
				<div class="col-xl-2 col-lg-2">
				</div>
				<div class="col-xl-8 col-lg-8 mb-2">
					<Lingallery :items="featuredCategories.homeCarouselConfig.images"
								:object="featuredCategories.homeCarouselConfig"
								:responsive="true"
								:showThumbnails="false"
								:selectedCallback="featuredCategorySelected"/>
				</div>
				<div class="col-xl-2 col-lg-2 mb-2">
					<Lingallery :height="200"
								:object="item"
								:items="item.images"
								:responsive="false"
								:showThumbnails="false"
								:selectedCallback="featuredCategorySelected"
								class="mb-1"
								v-for="item in featuredCategories.sideCampaigns"/>
				</div>
			</div>
			<div class="row p-0 mb-2">
				<div class="col-xl-2 col-lg-2">
				</div>
				<div class="col-xl-2 col-lg-2"
					 @click="featuredCategorySelected(item)"
					 v-for="item in featuredCategories.bottomCampaigns">
					<lingallery :height="180"
								:object="item"
								:items="item.images"
								:responsive="true"
								:showThumbnails="false"
								class="mb-1"/>
				</div>
				<!-- Slider Area End Here -->
			</div>
			<div class="row mt-2">
				<div class="col-xl-12 col-lg-12 col-md-12">
					<carousel :mouse-drag="false"
							  :navigationEnabled="true"
							  :paginationEnabled="true"
							  :per-page="7">
						<slide class="pl-1 pr-1" v-for="item in mainCategories">
							<CategoryGrid :category="item"
										  :selected="item.selected"
										  :selectedCallback="mainCategorySelected">
							</CategoryGrid>
						</slide>
					</carousel>
				</div>
			</div>
			<div class="row mt-0 category-jombobox" v-show="showSubCategories">
				<!-- Row End -->
				<div class="col-xl-2 col-lg-2 col-md-2 pl-1 pr-1 pt-1 pb-1"
					 v-for="item in subCategories">
					<CategoryGrid :category="item"
								  :selectedCallback="subcategorySelected"></CategoryGrid>
				</div>
			</div>
		</div>
	</div>
	<!-- Shop Page End -->
</template>

<script>
	import {Carousel, Slide} from 'vue-carousel';
	import Lingallery from "@/components/core/photo/Lingallery";
	import CategoryGrid from "@/components/shop/category/CategoryGrid";

	export default {
		name: "ProductCatalog",
		components: {
			CategoryGrid,
			Lingallery, Carousel, Slide
		},
		data: function () {
			return {
				featuredCategories: {
					homeCarouselConfig: {
						images: [],
					},
					sideCampaigns: [],
					bottomCampaigns: [],
				},
				bottomCampaigns: [],
				mainCategories: [],
				subCategories: [],
				sortCategories: [
					{value: 'relevance', text: "Relevance",},
					{value: 'name_asc', text: "Name, A to Z",},
					{value: 'name_desc', text: "Name, Z to A",},
					{value: 'price_asc', text: "Price low to high",},
					{value: 'price_desc', text: "Price high to low",},
				],
				pageSizes: [
					{value: 5, text: "5",},
					{value: 10, text: "10",},
					{value: 25, text: "25",},
					{value: 50, text: "50",},
					{value: 100, text: "100",},
				],
				searchCatalog: {},
				showSubCategories: false,
			}
		},
		methods: {
			shuffle: function (a) {
				var j, x, i;
				for (i = a.length - 1; i > 0; i--) {
					j = Math.floor(Math.random() * (i + 1));
					x = a[i];
					a[i] = a[j];
					a[j] = x;
				}
				return a;
			},
			mainCategorySelected: function (categroy, selected) {
				this.showSubCategories = false;
				for (let index = 0; index < this.mainCategories.length; index++) {
					this.mainCategories[index].selected = false;
				}
				if (!selected) {
					categroy.selected = true;
					this.subCategories = categroy.subcategories;
					this.showSubCategories = true;
				} else {
					categroy.selected = false;
					this.showSubCategories = false;
				}
			},
			subcategorySelected: function (category) {
				this.$store.dispatch('productStore/setSearchProductCategory', category.db_id);
				this.$store.dispatch('productStore/executeSearch');
			},
			featuredCategorySelected: function (featuredCategory) {
				this.$store.dispatch('productStore/setSearchProductCategory', featuredCategory.category_id);
				this.$store.dispatch('productStore/executeSearch');
			},
		},
		computed: {
			productCategoryStore: function () {
				return this.$store.getters['productCategoryStore/getCategories'];
			},
			featuredCategoryStore: function () {
				return this.$store.getters['productCategoryStore/getFeaturedCategories'];
			},
		},
		watch: {
			productCategoryStore: function (newValue, oldValue) {
				this.mainCategories = newValue;
			},
			featuredCategoryStore: function (newValue, oldValue) {
				this.featuredCategories = newValue;
			},
			'$route.params': {
				handler(newValue) {
					this.$store.dispatch('productCategoryStore/downloadCategories');
					this.$store.dispatch('productCategoryStore/downloadFeaturedCategories');
				},
				immediate: true,
			},
		},
		mounted() {
			this.$store.dispatch('menuStore/setCategoryDropdownVisibility', true);
			this.$store.dispatch('productCategoryStore/downloadCategories');
			this.$store.dispatch('productCategoryStore/downloadFeaturedCategories');
		},
	}
</script>

<style>
	.VueCarousel-dot, .VueCarousel-dot-container {
		margin-top: 0 !important;
	}
</style>