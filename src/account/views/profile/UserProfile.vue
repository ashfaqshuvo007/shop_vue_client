<template>
	<div class="main-shop-page pb-10">
		<div class="container pt-10 pb-10">
			<div class="register-account" v-if="model !== null">
				<!-- Row End -->
				<div :set="sectionValue = model[section.key]"
					 class="row profile-section"
					 v-for="section in profile">
					<div class="col-sm-12 pt-0 pb-0">
						<div class="register-title">
							<h5 class="d-inline ptb-10 mr-20">{{section.title}}</h5>
							<v-btn @click="editForm(section)"
								   class="d-inline"
								   small v-if="!section.edit">Update
							</v-btn>
						</div>
					</div>
					<template v-if="!section.edit">
						<div class="row profile-info-row col-sm-6 pt-0 pb-0"
							 v-for="field in section.fields">
							<div class="col-sm-5 profile-info-label pt-2 pb-2">
								<strong>{{field.label}}</strong>
							</div>
							<div class="col-sm-7 profile-info-value pt-2 pb-2">
								<label v-if="field.storeFunc !== undefined">
									{{executeGetter(field.storeFunc, sectionValue[field.key])}}
								</label>
								<label v-else>{{sectionValue[field.key]}}</label>
							</div>
						</div>
					</template>
					<div class="row col-sm-12 pt-0 pb-0" v-else>
						<EasyFormBaker :class="'col-sm-12'"
									   :model="sectionValue"
									   :schema="section.formSchema"
									   :section="section"
									   @on-cancel="onCancel"
									   @on-complete="onComplete">
						</EasyFormBaker>
					</div>
				</div>
				<!-- Row End -->
			</div>
			<!-- Container End -->
		</div>
	</div>
</template>

<script>
	import EasyFormBaker from "@/form_baker/EasyFormBaker";
	import PROFILE_FORM from "@/account/config/forms/ProfileForm";
	import axios from 'axios';

	export default {
		name: "Profile",
		components: {EasyFormBaker},
		data: function () {
			return {
				model: null,
				countryData: [],
				profile: PROFILE_FORM.sections,
			}
		},
		computed: {
			countries: function () {
				return this.$store.getters['commonDataStore/getCountries'];
			},
			profileStore: function () {
				return this.$store.getters['profileStore/getProfileDetails'];
			},
			submitSuccess: function () {
				return this.$store.getters['profileStore/getSubmitSuccess'];
			},
		},
		methods: {
			editForm: function (section) {
				section.edit = true;
			},
			executeGetter: function (storeGetter, value) {
				return this.$store.getters[storeGetter](value);
			},
			onComplete: function (data, section) {
				this.$store.dispatch('profileStore/putProfileDetails', {
					payload: this.model,
					infoID: this.$store.getters['authStore/profileInfo'],
					token: this.$store.getters['authStore/authToken'],
					section: section.key,
				});
			},
			onCancel: function (section) {
				this.$store.dispatch('profileStore/downloadProfileDetails', {
					infoID: this.$store.getters['authStore/profileInfo'],
					token: this.$store.getters['authStore/authToken'],
				});
				section.edit = false;
			},
		},
		watch: {
			countries: function (newValue) {
				this.countryData = newValue;
			},
			profileStore: function (newValue) {
				this.model = newValue;
			},
			submitSuccess: function (newValue, oldVal) {
				if(!this.executed) {
					for (let index = 0; index < this.profile.length; index++) {
						this.profile[index].edit = !newValue;
					}
					this.executed = true;
					this.$store.dispatch('profileStore/setSubmitSuccess', false);
				} else {
					this.executed = false;
				}
			},
		},
		mounted() {
			this.$store.dispatch('commonDataStore/downloadCountryData', {
				token: this.$store.getters['authStore/authToken'],
			});
			this.$store.dispatch('profileStore/downloadProfileDetails', {
				infoID: this.$store.getters['authStore/profileInfo'],
				token: this.$store.getters['authStore/authToken'],
			});
		}
	}
</script>

<style scoped>

</style>