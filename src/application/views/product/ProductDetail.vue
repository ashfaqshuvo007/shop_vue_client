<template>
	<!-- Shop Page Start -->
	<div>
		<!-- Product Thumbnail Start -->
		<div class="main-product-thumbnail ptb-5 ptb-sm-20" v-if="product !== null">
			<div class="container">
				<div class="thumb-bg">
					<div class="row">
						<!-- Main Thumbnail Image Start -->
						<div class="col-lg-5 mb-all-40">
							<lingallery :imageStyle="'height: 384px;'"
										:items="product.images"
										:responsive="true"
										:showThumbnails="true"/>
						</div>
						<!-- Main Thumbnail Image End -->
						<!-- Thumbnail Description Start -->
						<div class="col-lg-7">
							<div class="thubnail-desc fix">
								<h3 class="product-header">{{product.name}}</h3>
								<div class="rating-summary fix mtb-10">
									<div class="rating">
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
									</div>
								</div>
								<div class="pro-price mtb-30">
									<p class="d-flex align-items-center" v-if="selectedSKU !== null">
										<span class="prev-price">{{selectedSKU.originalPrice}}</span>
										<span class="price">{{selectedSKU.sellingPrice}}</span>
										<span class="saving-price">{{selectedSKU.discountPercent}} %</span>
									</p>
									<p class="d-flex align-items-center" v-else>
										<span class="prev-price">{{product.originalPrice}}</span>
										<span class="price">{{product.sellingPrice}}</span>
										<span class="saving-price">{{product.discountPercent}} %</span>
									</p>
								</div>
								<div class="mb-10 pro-desc-details" v-html="product.description"></div>
								<div class="mt-25" style="font-weight: bold">Select product type:</div>
								<div :key="skuUnitsKey" class="sub-sku-list mt-2 mb-30">
									<div :class="{
										 'selected': selectedSKU !== null && sku.id === selectedSKU.id
										 }"
										 @click="onSKUSelected(sku)"
										 class="sub-sku" v-for="(sku, index) in product.breakdowns" v-if="product.breakdowns.length > 0">
										<div class="right" style="float: right" v-if="selectedSKU !== null && sku.id === selectedSKU.id">
											<span class="in-stock">
												<i class="ion-checkmark-round"></i>
											</span>
										</div>
										<template v-if="sku.productAttributes.length > 0">
											<div v-for="(attribute, index1) in sku.productAttributes">
												{{attribute.name}}: <b>{{attribute.value}}</b>
											</div>
										</template>
										<div v-else>
											<b>Default Attributes</b>
										</div>
									</div>
									<div class="sub-sku" v-else>
										<div class="right" style="float: right">
											<span class="in-stock">
												<i class="ion-checkmark-round"></i>
											</span>
										</div>
									</div>
								</div>
								<div class="box-quantity d-flex hot-product2">
									<form action="#">
										<input class="quantity mr-15" min="1" type="number" v-model="selectedSKUQuantity">
									</form>
									<div class="pro-actions">
										<div :class="{
										'loading': bookingLoading
										}"
											 class="actions-primary">
											<a @click="placeBooking" data-original-title="Contact Supplier">
												<i class="fa fa-refresh fa-spin" v-if="bookingLoading"></i>
												Book & Contact Supplier
											</a>
											<span class="error"
												  v-if="selectedSKU === null && showSKUError">Please, select a product type first!</span>
										</div>
										<div class="actions-secondary">
											<a @click="$toasted.show('Not enabled yet. Coming Soon!')" data-original-title="Compare" title="">
												<i class="lnr lnr-sync"></i>
												<span>Add To Compare</span>
											</a>
											<a @click="$toasted.show('Not enabled yet. Coming Soon!')" data-original-title="WishList" title="">
												<i class="lnr lnr-heart"></i>
												<span>Add to WishList</span>
											</a>
										</div>
									</div>
								</div>
								<div class="pro-ref mt-20" v-if="selectedSKU !== null">
									<p v-if="selectedSKU.stockQuantity > 0">
										<span class="in-stock">
											<i class="ion-checkmark-round"></i>
											IN STOCK ({{selectedSKU.stockQuantity}})
										</span>
									</p>
									<p v-else>
										<span class="out-stock">
											<i class="ion-close-round"></i>
											OUT STOCK
										</span>
									</p>
								</div>
								<div class="socila-sharing mt-25">
									<ul class="d-flex">
										<li>Share</li>
										<li>
											<social-sharing :description="product.description"
															:quote="product.description"
															:title="product.name"
															:url="$route.query.page"
															hashtags="sol-factory"
															inline-template
															twitter-user="sol-factory">
												<div>
													<network class="mr-2" network="email">
														<i class="fa fa-envelope"></i> Email
													</network>
													<network class="mr-2" network="facebook">
														<i class="fa fa-facebook"></i> Facebook
													</network>
													<network class="mr-2" network="pinterest">
														<i class="fa fa-pinterest"></i> Pinterest
													</network>
													<network class="mr-2" network="twitter">
														<i class="fa fa-twitter"></i> Twitter
													</network>
													<network class="mr-2" network="weibo">
														<i class="fa fa-weibo"></i> Weibo
													</network>
													<network class="mr-2" network="whatsapp">
														<i class="fa fa-whatsapp"></i> Whatsapp
													</network>
												</div>
											</social-sharing>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<!-- Thumbnail Description End -->
					</div>
					<!-- Row End -->
				</div>
			</div>
			<!-- Container End -->
			<!-- Product Thumbnail Description Start -->
			<div class="thumnail-desc pb-50 pb-sm-30">
				<div class="container">
					<div class="row pb-5">
						<div class="col-sm-12 p-0">
							<ul class="main-thumb-desc nav tabs-area" role="tablist">
								<li><a class="active" data-toggle="tab" href="#dtail">Product Details</a></li>
							</ul>
							<!-- Product Thumbnail Tab Content Start -->
							<div class="tab-content thumb-content border-default">
								<div class="tab-pane fade show active" id="dtail">
									<p v-html="product.description"></p>
								</div>
							</div>
							<!-- Product Thumbnail Tab Content End -->
						</div>
					</div>
					<!-- Row End -->
				</div>
				<!-- Container End -->
			</div>
			<!-- Product Thumbnail Description End -->
		</div>
		<!-- Product Thumbnail End -->
	</div>
	<!-- Shop Page End -->
</template>

<script>
	import {API_PRODUCT_CATEGORY_ATTRIBUTES, API_PRODUCT_BOOKING} from '@/base/config/base_apis';
	import axios from 'axios';
	import Lingallery from "@/components/core/photo/Lingallery";
	import {uuid} from 'vue-uuid';

	export default {
		name: "ProductDetail",
		components: {Lingallery},
		data: function () {
			return {
				product: null,
				categoryAttributeMap: [],
				selectedSKU: null,
				selectedSKUQuantity: 1,
				showSKUError: false,
				bookingLoading: false,
				skuUnitsKey: uuid.v4(),
			}
		},
		methods: {
			updateBreakdown: function () {
				for (let index = 0; index < this.product.breakdowns.length; index++) {
					let breakdown = this.product.breakdowns[index];
					for (let index1 = 0; index1 < breakdown.productAttributes.length; index1++) {
						let productAttribute = breakdown.productAttributes[index1];
						if (this.categoryAttributeMap.hasOwnProperty(productAttribute.product_attribute)) {
							productAttribute['name'] = this.categoryAttributeMap[productAttribute.product_attribute]['name'];
						}
					}
				}
				this.skuUnitsKey = uuid.v4();
			},
			onSKUSelected: function (sku) {
				if (this.selectedSKU !== null && this.selectedSKU.id === sku.id)
					this.selectedSKU = null;
				else
					this.selectedSKU = sku;
			},
			placeBooking: function (sku) {
				if (this.selectedSKU == null) {
					this.showSKUError = true;
					return;
				}
				this.bookingLoading = true;
				axios.post(API_PRODUCT_BOOKING, {
					status: 0,
					product_breakdown: this.selectedSKU.id,
					buyer: this.$store.getters['authStore/userKey'],
					quantity: this.selectedSKUQuantity,
					unit_price: this.selectedSKU.sellingPrice,
					discount: this.selectedSKU.originalPrice - this.selectedSKU.sellingPrice,
					total_price: this.selectedSKU.sellingPrice * this.selectedSKUQuantity,
				}, {
					headers: {
						"Authorization": "Token " + this.$store.getters['authStore/authToken'],
					},
				}).then(response => {
					window.location.href = '/account/#/orders/list/'
				}).catch(error => {
					this.bookingLoading = false;
					console.log(error);
				}).finally(() => {
				});
			},
		},
		computed: {
			selectedProduct: function () {
				return this.$store.getters['productStore/getSelectedProduct'];
			},
			subSKUs: function () {
				return this.product.breakdowns;
			},
		},
		watch: {
			selectedSKU: function (newValue, oldValue) {
				this.showSKUError = false;
			},
			selectedProduct: function (newValue, oldValue) {
				this.product = newValue;
				this.updateBreakdown();
			},
		},
		mounted() {
			let _vm = this;
			this.$store.dispatch('menuStore/setCategoryDropdownVisibility', false);
			this.$store.dispatch('productStore/downloadSingleProduct', this.$route.params.productID);

			axios.get(API_PRODUCT_CATEGORY_ATTRIBUTES, {
				params: {}
			}).then(response => {
				let attributes = response.data.results;
				for (let index = 0; index < attributes.length; index++) {
					_vm.categoryAttributeMap[attributes[index].id] = attributes[index];
				}
				_vm.updateBreakdown();
			}).catch(error => {
				console.log(error);
			}).finally(() => {
			});
		},
	}
</script>

<style lang="scss" scoped>
	.sub-sku-list {
		display: inline-flex;

		.sub-sku {
			display: inline-block;
			padding: 5px;
			min-width: 150px;
			border: 1px solid #e3e3e3;
			margin-right: 15px;

			&:hover {
				border: 1px solid #e62e04;
			}

			&.selected {
				border: 1px solid #34b141;
			}

			span {
				i {
					font-size: 24px;
				}
			}
		}
	}
</style>