<template>
	<div class="single-product">
		<div class="row">
			<!-- Product Image Start -->
			<div class="col-lg-3 col-md-4 col-sm-12">
				<div class="pro-img">
					<Lingallery :items="product.images" :responsive="true" :showThumbnails="false"/>
				</div>
			</div>
			<!-- Product Image End -->
			<!-- Product Content Start -->
			<div class="col-lg-8 col-md-7 col-sm-12">
				<div class="pro-content hot-product2">
					<h4><a>{{product.name}}</a></h4>
					<p>
						<span class="price">{{product.sellingPrice}}</span>
						<del class="prev-price">{{product.originalPrice}}</del>
					</p>
					<p>{{product.description}}</p>
					<div class="pro-actions">
						<div class="actions-primary">
							<a title="Update" @click="updateProduct(product)" class="pl-2 pr-2">{{updateProductText}}</a>
						</div>
					</div>
				</div>
			</div>
			<!-- Product Content End -->
		</div>
		<!-- Product Content End -->
		<span class="sticker-new" v-show="product.isNew">new</span>
	</div>
</template>

<script>
	import Lingallery from "@/components/core/photo/Lingallery";

	export default {
		name: "ProductList",
		components: {Lingallery},
		props: {
			updateProduct: {
				type: Function,
			},
			updateProductText: {
				type: String,
				default: function () {
					return 'See Detail'
				}
			},
			product: {
				type: Object,
				default: function () {
					return {
						id: null,
						name: null,
						description: null,
						primaryImage: null,
						secondaryImage: null,
						oldPrice: null,
						currentPrice: null,
						discountPercent: null,
						isNew: false,
					}
				}
			},
		},
		methods: {
		},
		mounted() {
		}
	}
</script>

<style scoped>

</style>