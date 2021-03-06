<template>
	<v-radio-group v-model="column" column>
		<v-radio label="Option 1" value="radio-1"></v-radio>
		<v-radio label="Option 2" value="radio-2"></v-radio>
	</v-radio-group>
</template>

<script>
	import AbstractField from '../AbstractField'

	export default {
		mixins: [AbstractField],
		props: {
			schema: {
				type: Object,
				default () {
					return null
				}
			},
			options: {
				type: Object,
				default () {
					return {}
				}
			},
		},

		data: function () {
			return {
				column: null,
				row: null,
			}
		},
		computed: {
			inputType () {
				return this.schema.inputType
			},
			rules () {
				let rules = []
				if (this.schema.rules) {
					let ruleKeys = Object.keys(this.schema.rules)
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

		mounted () {
		},

		created () {
		}
	}
</script>

<style lang="scss">
</style>
