<template lang="pug">
	div.easy-form-wizard(v-if='schema != null')
		v-form()
			v-container(v-for='group in groups' :class="options.formGroupClass")
				div(v-if='group.legend' :class="options.groupHeaderClass") {{ group.legend }}
				v-row(class="pt-4")
					template(v-for='field in group.fields')
						easy-form-group(:schema="field", :options="options", :model="model", :vfb="vfb", :ref="'group'", :class="options.inputGroupClass")
</template>

<script>
	import {forEach} from 'lodash'
	import EasyFormGroup from '@/form_baker/EasyFormGroup'

	export default {
		name: 'EasyFormWizard',
		components: {EasyFormGroup},
		mixins: [],
		props: {
			vfb: {
				type: Object,
				required: true
			},
			model: Object,
			schema: {
				type: Object,
				default() {
					return null
				}
			},
			options: {
				type: Object,
				default() {
					return {}
				}
			},
		},

		data() {
			return {}
		},

		computed: {
			fields() {
				let res = [];
				if (this.schema && this.schema.fields) {
					forEach(this.schema.fields, field => {
						res.push(field)
					})
				}
				return res
			},
			groups() {
				let res = [];
				if (this.schema && this.schema.groups) {
					forEach(this.schema.groups.slice(0), group => {
						res.push(group)
					})
				}
				return res
			}
		},

		watch: {},

		mounted() {
		},

		methods: {
			is_valid: function () {
				let valid = true;
				if (this.$refs.group !== undefined)
					for (let index = 0; index < this.$refs.group.length; index++) {
						valid = valid && this.$refs.group[index].is_valid();
					}
				return valid;
			}
		}
	}
</script>

<style lang="scss">
</style>
