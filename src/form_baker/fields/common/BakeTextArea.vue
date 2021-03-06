<template>
	<v-textarea :key="inputKey"
				:label="schema.label"
				:ref="'text'"
				:rules="rules"
				counter="500"
				outlined
				v-model="value">
	</v-textarea>
</template>

<script>
	import AbstractField from '../AbstractField'

	export default {
		mixins: [AbstractField],
		props: {
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

		data: function () {
			return {}
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
