<template>
	<v-range-slider
		thumb-label="always"
		v-model="values">
	</v-range-slider>
</template>

<script>
	import AbstractField from '../AbstractField'

	export default {
		mixins: [AbstractField],
		props: {
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

		data: function () {
			return {
				values: [60, 70],
				// values: [
				// 	{ label: 'thumb-color', val: 30, color: 'red' },
				// 	{ label: 'thumb-color', val: 80, color: 'red' },
				// ],
			}
		},
		computed: {
			inputType() {
				return this.schema.inputType
			},
			rules() {
				let rules = [];
				if (this.schema.rules) {
					let ruleKeys = Object.keys(this.schema.rules);
					for (let index = 0; index < ruleKeys.length; index++) {
						rules.push(this.schema.rules[ruleKeys[index]])
					}
				}
				return rules
			}
		},
		methods: {
			is_valid: function () {
				return this.$refs.text.validate(true)
			}
		},

		mounted() {
		},

		created() {
		}
	}
</script>

<style lang="scss">
</style>
