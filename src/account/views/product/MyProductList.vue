<template>
	<!-- Shop Page Start -->
	<div class="main-shop-page pb-20 ptb-sm-60">
		<div class="container pt-10">
			<!-- Row End -->
			<div class="row">
				<!-- Product Categorie List Start -->
				<div class="col-lg-12 order-1 order-lg-2">
					<!-- Grid & List View Start -->
					<div
						class="grid-list-top border-default universal-padding d-md-flex justify-content-md-between align-items-center mb-30">
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
							<div id="list-view">
								<!-- Single Product Start -->
								<ProductListItemCompact :product="product"
														:updateProduct="updateProduct"
														:updateProductText="'Update Information'"
														v-for="product in products"></ProductListItemCompact>
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
	import ProductListItemCompact from "@/components/shop/product/ProductListItemCompact";
	import SelectDropdown from "@/components/global/SelectDropdown";

	export default {
		name: "MyProductList",
		components: {
			SelectDropdown,
			ProductListItemCompact,
		},
		props: {},
		data: function () {
			return {
				sortCategories: [
					{value: 'name_asc', text: "Name, A to Z",},
					{value: 'name_desc', text: "Name, Z to A",},
				],
				products: [],
				pageSizes: [
					{value: 5, text: "5",},
					{value: 10, text: "10",},
					{value: 25, text: "25",},
					{value: 50, text: "50",},
					{value: 100, text: "100",},
				],
			}
		},
		methods: {
			triggerProductPopup: function (product) {
				this.selectedProduct = product;
			},
			closeProductPopup: function () {
			},
			updateProduct: function (product) {
				this.$router.push({path: `/product/update/${product.id}`})
			},
		},
		computed: {
			orderList: function () {
				return this.$store.getters['productStore/getProducts'];
			},
		},
		watch: {
			orderList: function (newValue, oldValue) {
				this.products = newValue;
			},
			'$route.params': {
				handler(newValue) {
					this.$store.dispatch('productStore/downloadProducts');
				},
				immediate: true,
			},
		},
		mounted() {
			this.$store.dispatch('productStore/downloadProducts');
		},
	}
</script>

<style scoped>

</style>