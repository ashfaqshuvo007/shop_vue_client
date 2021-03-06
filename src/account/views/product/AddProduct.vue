<template>
	<div class="main-shop-page pb-10">
		<div class="container pt-10 pb-10">
			<div class="register-account mb-2">
				<!-- Row Start -->
				<div class="row">
					<div class="col-sm-12" style="padding: 0;">
						<EasyFormBaker :model="model" :schema="formSchema"
									   @on-complete="onComplete"
									   v-show="model !== null">
						</EasyFormBaker>
					</div>
				</div>
			</div>
			<!-- Row End -->
		</div>
	</div>
</template>

<script>
	import GenericForm from "@/components/form/GenericForm";
	import PRODUCT_FORM from "@/account/config/forms/ProductForm";
	import EasyFormBaker from "@/form_baker/EasyFormBaker";
	import axios from 'axios';
	import {uuid} from 'vue-uuid';

	export default {
		name: "AddProduct",
		components: {
			EasyFormBaker,
			GenericForm,
		},
		data: function () {
			return {
				// Sample model data
				model: {
					tsync_id: uuid.v4(),
					category: null,
					name: null,
					description: null,
					keyword: null,
					icons: [],
					selling_price: null,
					discount_amount: null,
					stock_quantity: null,
					product_breakdowns: [{
						tsync_id: uuid.v4(),
						selling_price: null,
						discount_amount: null,
						stock_quantity: null,
						product_attributes: [{
							tsync_id: uuid.v4(),
							product_attribute: null,
							value: null
						}]
					}],
				},
				formSchema: PRODUCT_FORM,
			}
		},
		computed: {},
		watch: {},
		methods: {
			validateTab: function (index) {
				return this.$refs[index][0].validate().then(isValid => {
					return isValid;
				});
			},
			onComplete: function (data) {
				console.log(data);
				let productID = this.$route.params.productID;
				data['supplier'] = this.$store.getters['authStore/userKey'];
				if (productID !== undefined && productID !== null) {
					axios.put(this.formSchema.submitURL + productID + '/', data, {
						headers: {
							"Authorization": "Token " + this.$store.getters['authStore/authToken'],
						},
					}).then(response => {
						this.$router.push({name: 'MyProductList'});
					}).catch(error => {
						console.log(error);
					}).finally(() => {
					});
				} else {
					axios.post(this.formSchema.submitURL, data, {
						headers: {
							"Authorization": "Token " + this.$store.getters['authStore/authToken'],
						},
					}).then(response => {
						this.$router.push({name: 'MyProductList'});
					}).catch(error => {
						console.log(error);
					}).finally(() => {
					});
				}
			},
		},
		mounted() {
			let productID = this.$route.params.productID;
			if (productID !== undefined && productID !== null) {
				axios.get(this.formSchema.getURL + productID, {
					headers: {
						"Authorization": "Token " + this.$store.getters['authStore/authToken'],
					},
				}).then(response => {
					this.model = response.data;
				}).catch(error => {
					console.log(error);
				}).finally(() => {
				});

			}
		}
	}
</script>

<style scoped>

</style>