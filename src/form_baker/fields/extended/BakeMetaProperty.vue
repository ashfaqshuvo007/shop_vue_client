<template>
	<div :key="inputKey" class="col-sm-12">
		<div class="mb-4">{{schema.label}}</div>
		<div class="row"
			 v-for="(row, idx) in value">
			<v-text-field :label="schema.labelProp"
						  :ref="'text'"
						  :rules="rules"
						  :type="schema.inputType"
						  class="pr-1"
						  outlined
						  v-model="row[0]">
			</v-text-field>
			<v-text-field :label="schema.labelValue"
						  :ref="'text'"
						  :rules="rules"
						  :type="schema.inputType"
						  outlined
						  v-model="row[1]">
			</v-text-field>
			<v-btn text icon color="deep-orange" @click="removeItem(idx)">
				<v-icon>delete_outline</v-icon>
			</v-btn>
		</div>
		<v-btn tile outlined small @click="addNewProperty">
			<v-icon left>add</v-icon> Add new
		</v-btn>
	</div>
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
				return true
			},
			formatValueToModel(value) {
				if (value != null && this.schema.inputType === 'number') {
					if (value) return parseFloat(value);
				}
				return value;
			},
			removeItem(index) {
				this.value.splice(index, 1);
			},
			addNewProperty() {
				this.value.push(['', ''])
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
