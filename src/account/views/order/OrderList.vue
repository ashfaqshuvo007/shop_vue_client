<script src="messageHistory.js"></script>
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
								<!-- Table Content Start -->
								<div class="table-content table-responsive mb-45">
									<table>
										<thead>
										<tr>
											<th class="product-name">Order ID</th>
											<th class="product-name">Product</th>
											<th class="product-name">Supplier</th>
											<th class="product-name">Attributes</th>
											<th class="product-quantity">Quantity</th>
											<th class="product-price">Price</th>
											<th class="product-subtotal">Total</th>
											<th class="product-name">Order Time</th>
											<th class="product-name">Status</th>
											<th class="product-name">Actions</th>
										</tr>
										</thead>
										<tbody>
										<tr v-for="order in orders">
											<td class="product-name">
												<a @click="seeOrderDetail(order)">
													<u>{{order.id}}</u>
												</a>
											</td>
											<td class="product-name">
												<a @click="gotoProduct(order.product_breakdown.product)">
													{{order.product_breakdown.product.name}} <u>(View Store)</u>
												</a>
											</td>
											<td class="product-name">
												<a @click="$toasted.show('Coming Soon!')" v-if="order.product_breakdown.product.supplier !== null">
													{{order.product_breakdown.product.supplier.first_name}} <u>(View Profile)</u>
												</a>
											</td>
											<td class="product-name">
												<div v-for="attribute in order.product_breakdown.product_attributes">
													<span>{{attribute.product_attribute.name}}:</span>&nbsp;&nbsp;
													<span><b>{{attribute.value}}</b></span>
												</div>
											</td>
											<td class="product-quantity"><span class="amount">{{order.quantity}}</span></td>
											<td class="product-price">
												<span class="amount">
												{{order.unit_price | currency('৳', 0, { spaceBetweenAmountAndSymbol: true })}}
											</span>
											</td>
											<td class="product-price">
												<span class="amount">
													{{order.total_price | currency('৳', 0, { spaceBetweenAmountAndSymbol: true })}}
												</span>
											</td>
											<td class="product-name">{{order.order_initiate_time}}</td>
											<td class="product-name">
												<span v-if="order.status === 1"><b>Confirmed</b></span>
												<span v-else-if="order.status === 2"><b>Delivered</b></span>
												<span v-else-if="order.status === 3"><b>Received</b></span>
												<span v-else><b>Booked</b></span>
											</td>
											<td class="product-name">
												<a @click="$toasted.show('Coming Soon!')"><u>Modify Booking</u></a><br/>
												<a @click="$toasted.show('Coming Soon!')"><u>Confirm Received</u></a>
											</td>
										</tr>
										</tbody>
									</table>
								</div>
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
	import SelectDropdown from "@/components/global/SelectDropdown";

	export default {
		name: "OrderList",
		components: {
			SelectDropdown,
		},
		props: {},
		data: function () {
			return {
				sortCategories: [
					{value: 'name_asc', text: "Name, A to Z",},
					{value: 'name_desc', text: "Name, Z to A",},
				],
				orders: [],
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
			gotoProduct: function (product) {
				window.location.href = '/application/#/product/detail/' + product.id + '/';
			},
			seeOrderDetail: function (order) {
				this.$router.push({path: `/orders/update/${order.id}`})
			},
		},
		computed: {
			orderList: function () {
				return this.$store.getters['orderStore/getOrders'];
			},
		},
		watch: {
			orderList: function (newValue, oldValue) {
				this.orders = newValue;
				console.log(this.orders);
			},
			'$route.params': {
				handler(newValue) {
					this.$store.dispatch('orderStore/downloadOrders', {
						token: "Token " + this.$store.getters['authStore/authToken']
					});
				},
				immediate: true,
			},
		},
		mounted() {
		},
	}
</script>

<style scoped>

</style>