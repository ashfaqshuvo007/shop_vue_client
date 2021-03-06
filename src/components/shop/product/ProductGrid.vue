<template>
	<div class="single-product">
		<!-- Product Image Start -->
		<div class="pro-img">
			<lingallery :items="product.images" :responsive="true" :showThumbnails="false"/>
		</div>
		<!-- Product Image End -->
		<!-- Product Content Start -->
		<div class="pro-content">
			<div class="pro-info">
				<h4><a>{{product.name}}</a></h4>
				<p>
					<span class="price">{{product.sellingPrice}}</span>
					<del class="prev-price">{{product.originalPrice}}</del>
				</p>
				<div class="label-product l_sale">
					{{product.discountPercent}}<span class="symbol-percent">%</span>
				</div>
			</div>
			<div class="pro-actions">
				<div class="actions-primary">
					<a @click="updateProduct(product)" title="Add to Cart">{{updateProductText}}</a>
				</div>
				<div class="actions-secondary">
					<a title="Compare"><i class="lnr lnr-sync"></i>
						<span>Add To Compare</span></a>
					<a title="WishList"><i class="lnr lnr-heart"></i>
						<span>Add to WishList</span></a>
				</div>
			</div>
		</div>
		<!-- Product Content End -->
		<span class="sticker-new" v-show="product.isNew">new</span>
	</div>
</template>

<script>
	import Lingallery from "@/components/core/photo/Lingallery";

	export default {
		name: "ProductGrid",
		components: {
			Lingallery,
		},
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
						name: null,
						primaryImage: null,
						secondaryImage: null,
						oldPrice: null,
						currentPrice: null,
						discountPercent: null,
						isNew: false,
					}
				}
			},
			triggerProductPopup: {
				type: Function,
			},
		},
	}
</script>

<style scoped>

</style>