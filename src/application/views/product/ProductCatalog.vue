<template>
	<!-- Shop Page Start -->
	<div class="main-shop-page pb-20 ptb-sm-60">
		<div class="container pt-10">
			<!-- Row End -->
			<div class="row">
				<!-- Sidebar Shopping Option Start -->
				<div class="col-lg-2 order-2 order-lg-1 search-sidebar">
					<div class="sidebar">
						<SearchByExpand :expandableCategory="category"
										v-for="category in productCategories">
						</SearchByExpand>
						<SearchByRange></SearchByRange>
						<SearchByCheck :checkCategory="category"
									   v-for="category in checkCategories">
						</SearchByCheck>
						<SearchByColor :colorCategory="category"
									   v-for="category in colorCategories">
						</SearchByColor>
					</div>
				</div>
				<!-- Sidebar Shopping Option End -->
				<!-- Product Categorie List Start -->
				<div class="col-lg-9 order-1 order-lg-2">
					<!-- Grid & List View Start -->
					<div
						class="grid-list-top border-default universal-padding d-md-flex justify-content-md-between align-items-center mb-30">
						<div class="grid-list-view  mb-sm-15">
							<ul class="nav tabs-area d-flex align-items-center">
								<li>
									<a :class="{'active': showGrid}"
									   @click="() => showGrid = true">
										<i class="fa fa-th"></i>
									</a>
								</li>
								<li>
									<a :class="{'active': !showGrid}"
									   @click="() => showGrid = false">
										<i class="fa fa-list-ul"></i>
									</a>
								</li>
							</ul>
						</div>
						<!-- Toolbar Short Area Start -->
						<div class="main-toolbar-sorter clearfix">
							<div class="toolbar-sorter d-flex align-items-center">
								<label>Sort By:</label>
								<SelectDropdown :items="sortCategories"></SelectDropdown>
							</div>
						</div>
						<!-- Toolbar Short Area End -->
						<!-- Toolbar Short Area Start -->
						<div class="main-toolbar-sorter clearfix">
							<div class="toolbar-sorter d-flex align-items-center">
								<label>Show:</label>
								<SelectDropdown :items="pageSizes"></SelectDropdown>
							</div>
						</div>
						<!-- Toolbar Short Area End -->
					</div>
					<!-- Grid & List View End -->
					<div class="main-categorie mb-all-40">
						<!-- Grid & List Main Area End -->
						<div class="tab-content fix">
							<div id="grid-view" v-show="showGrid">
								<div class="row">
									<!-- Single Product Start -->
									<div class="col-lg-3 col-md-3 col-sm-3 col-6 p-1" v-for="product in products">
										<ProductGrid :product="product"
													 :updateProduct="updateProduct"></ProductGrid>
									</div>
									<!-- Single Product End -->
								</div>
								<!-- Row End -->
							</div>
							<!-- #grid view End -->
							<div id="list-view" v-show="!showGrid">
								<!-- Single Product Start -->
								<ProductListItem :product="product"
												 :updateProduct="updateProduct"
												 v-for="product in products"></ProductListItem>
								<!-- Single Product End -->
							</div>
							<!-- #list view End -->
							<div class="pro-pagination" v-show="false">
								<ul class="blog-pagination">
									<li class="active"><a href="#">1</a></li>
									<li><a href="#">2</a></li>
									<li><a href="#">3</a></li>
									<li><a href="#"><i class="fa fa-angle-right"></i></a></li>
								</ul>
								<div class="product-pagination">
									<span class="grid-item-list">Showing 1 to 12 of 51 (5 Pages)</span>
								</div>
							</div>
							<!-- Product Pagination Info -->
						</div>
						<!-- Grid & List Main Area End -->
					</div>
				</div>
				<!-- product Categorie List End -->
			</div>
			<!-- Row End -->
		</div>
	</div>
	<!-- Shop Page End -->
</template>

<script>
	import SearchByExpand from "@/components/shop/search/SearchByExpand";
	import SearchByCheck from "@/components/shop/search/SearchByCheck";
	import SearchByRange from "@/components/shop/search/SearchByRange";
	import SearchByColor from "@/components/shop/search/SearchByColor";
	import ProductGrid from "@/components/shop/product/ProductGrid";
	import ProductListItem from "@/components/shop/product/ProductListItem";
	import SelectDropdown from "@/components/global/SelectDropdown";
	import ProductPopup from "@/components/shop/product/ProductPopup";
	import SlideYDownTransition from "vue2-transitions/src/Slide/SlideYDownTransition";

	export default {
		name: "ProductCatalog",
		components: {
			SlideYDownTransition,
			ProductPopup,
			SelectDropdown,
			ProductListItem, ProductGrid,
			SearchByColor, SearchByRange, SearchByCheck, SearchByExpand
		},
		data: function () {
			return {
				productCategories: [
					{
						title: 'Electronics',
						items: [
							{
								name: 'Category 1',
								href: '#',
								active: false,
								key: this.$uuid.v4(),
								items: [
									{name: 'Category 1A', href: '#', active: false, key: this.$uuid.v4(),},
									{name: 'Category 1B', href: '#', active: false, key: this.$uuid.v4(),},
									{name: 'Category 1C', href: '#', active: false, key: this.$uuid.v4(),},
								]
							},
							{
								name: 'Category 2',
								href: '#',
								active: false,
								key: this.$uuid.v4(),
								items: [
									{name: 'Category 2A', href: '#', active: false, key: this.$uuid.v4(),},
									{name: 'Category 2B', href: '#', active: false, key: this.$uuid.v4(),},
									{name: 'Category 2C', href: '#', active: false, key: this.$uuid.v4(),},
								]
							},
							{
								name: 'Category 3',
								href: '#',
								active: false,
								key: this.$uuid.v4(),
								items: [
									{name: 'Category 3A', href: '#', active: false, key: this.$uuid.v4(),},
									{name: 'Category 3B', href: '#', active: false, key: this.$uuid.v4(),},
									{name: 'Category 3C', href: '#', active: false, key: this.$uuid.v4(),},
								]
							},
							{
								name: 'Category 4',
								href: '#',
								active: false,
								key: this.$uuid.v4(),
								items: [
									{name: 'Category 4A', href: '#', active: false, key: this.$uuid.v4(),},
									{name: 'Category 4B', href: '#', active: false, key: this.$uuid.v4(),},
									{name: 'Category 4C', href: '#', active: false, key: this.$uuid.v4(),},
								]
							},
						],
					}
				],
				checkCategories: [
					{
						title: 'Size',
						items: [
							{text: 'S', value: 'small', state: false, quantity: 8},
							{text: 'M', value: 'medium', state: false, quantity: 2},
							{text: 'L', value: 'large', state: false, quantity: 1},
							{text: 'XL', value: 'x-large', state: false, quantity: 3},
						]
					},
					{
						title: 'Categories',
						items: [
							{text: 'Cameras', value: 'camera', state: false, quantity: 14},
							{text: 'Gamepad', value: 'gamepad', state: false, quantity: 7},
							{text: 'Virtual Reality', value: 'vr', state: false, quantity: 2},
							{text: 'Digital Cameras', value: 'dslr-camera', state: false, quantity: 5},
						]
					},
				],
				colorCategories: [
					{
						title: 'Color',
						items: [
							{text: 'White', value: 'white', color: 'white', quantity: 8},
							{text: 'Orange', value: 'orange', color: 'orange', quantity: 2},
							{text: 'Blue', value: 'blue', color: 'blue', quantity: 1},
							{text: 'Yellow', value: 'yellow', color: 'yellow', quantity: 3},
						]
					},
				],
				sortCategories: [
					{value: 'relevance', text: "Relevance",},
					{value: 'name_asc', text: "Name, A to Z",},
					{value: 'name_desc', text: "Name, Z to A",},
					{value: 'price_asc', text: "Price low to high",},
					{value: 'price_desc', text: "Price high to low",},
				],
				products: [],
				showGrid: true,
				pageSizes: [
					{value: 5, text: "5",},
					{value: 10, text: "10",},
					{value: 25, text: "25",},
					{value: 50, text: "50",},
					{value: 100, text: "100",},
				],
				showProductPopup: false,
				searchCatalog: {},
			}
		},
		methods: {
			updateProduct: function (product) {
				this.$router.push({name: 'ProductDetail', params: {productID: product.id}});
			},
			closeProductPopup: function () {
				this.showProductPopup = false;
			},
		},
		computed: {
			productList: function () {
				return this.$store.getters['productStore/getProducts'];
			},
		},
		watch: {
			productList: function (newValue, oldValue) {
				this.products = newValue;
			},
			'$route.params': {
				handler(newValue) {
					this.$store.dispatch('productStore/setSearchBase64', this.$route.params.searchCatalog);
					this.$store.dispatch('productStore/downloadProducts');
				},
				immediate: true,
			},
		},
		mounted() {
			this.$store.dispatch('menuStore/setCategoryDropdownVisibility', false);
			this.$store.dispatch('productStore/setSearchBase64', this.$route.params.searchCatalog);
			this.$store.dispatch('productStore/downloadProducts');
		},
	}
</script>

<style scoped>

</style>