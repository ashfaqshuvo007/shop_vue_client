<template>
	<div>
		<v-switch label="John" v-model="people" value="John"></v-switch>
		<v-switch label="Jacob" v-model="people" value="Jacob"></v-switch>
	</div>
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
				people: ['John'],
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
