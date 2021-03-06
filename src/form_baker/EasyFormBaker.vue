<template>
	<v-app class="easy-form-baker" v-if='schema != null'>
		<template v-if="schema.wizards !== undefined">
			<form-wizard :color="wizardOptions.wizard.color"
						 :ref="'wizard'"
						 :shape="wizardOptions.wizard.shape" @on-complete="onComplete">
				<div :slot="'title'"></div>
				<tab-content :before-change="validateWizard"
							 :title="wizard.title"
							 v-for="wizard in schema.wizards">
					<easy-form-wizard :model="model" :options="wizardTabOptions" :ref="'form'"
									  :schema="wizard" :vfb="vfb">
					</easy-form-wizard>
				</tab-content>
			</form-wizard>
		</template>
		<v-row v-else>
			<EasyFormGroup :class="wizardTabOptions.inputGroupClass"
						   :model="model" :options="wizardTabOptions"
						   :ref="'group'" :schema="field" :vfb="vfb"
						   v-for='field in schema.fields'>
			</EasyFormGroup>
			<v-col :sm='12'>
				<v-btn :class="'float-right'" color="success" small @click="validateForm">Save</v-btn>
				<v-btn :class="'float-right mr-3'" depressed small @click="cancelForm">Cancel</v-btn>
			</v-col>
		</v-row>
	</v-app>
</template>

<script>
	import {FormWizard, TabContent} from './wizard'
	import EasyFormWizard from '@/form_baker/EasyFormWizardTab'
	import EasyFormGroup from "@/form_baker/EasyFormGroup";

	export default {
		name: 'EasyFormBaker',
		components: {
			EasyFormGroup,
			EasyFormWizard,
			FormWizard, TabContent,
		},
		mixins: [],
		props: {
			schema: Object,
			section: Object,
			model: Object,
			wizardOptions: {
				type: Object,
				default() {
					return {
						wizard: {
							shape: 'circle',
							color: '#e62e03'
						}
					}
				}
			},
			wizardTabOptions: {
				type: Object,
				default() {
					return {
						formGroupClass: "form-group",
						groupHeaderClass: "group-title",
						inputGroupClass: "input-group",
					}
				}
			},
			multiple: {
				type: Boolean,
				default: false
			},
			isNewModel: {
				type: Boolean,
				default: false
			},
			tag: {
				type: String,
				default: 'fieldset',
				validator: function (value) {
					return value.length > 0
				}
			}
		},

		data() {
			return {
				vfb: this,
			}
		},

		computed: {},

		watch: {},

		mounted() {

		},

		methods: {
			cancelForm: function () {
				this.$emit('on-cancel', this.section, this.model);
			},
			onComplete: function () {
				this.$emit('on-complete', this.model, this.section);
			},
			validateWizard: function () {
				let valid = true;
				valid = valid && this.$refs.form[this.$refs.wizard.activeTabIndex].is_valid();
				return valid;
			},
			validateForm: function () {
				let valid = true;
				if (this.$refs.group !== undefined)
					for (let index = 0; index < this.$refs.group.length; index++) {
						valid = valid && this.$refs.group[index].is_valid();
					}
				if (valid)
					this.onComplete(this.model);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./assets/formBaker";
</style>
