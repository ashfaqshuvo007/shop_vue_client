<template>
	<v-autocomplete
		:clearable="true"
		:item-text="itemText"
		:item-value="itemValue"
		:items="items"
		:label="schema.label"
		:loading="isLoading"
		:multiple="schema.multiple"
		:persistent-hint="true"
		:return-object="false"
		:search-input.sync="search"
		ref="dropdown"
		attach
		hide-no-data
		outlined
		v-model="value">
		<template v-if="schema.multiple" v-slot:selection="data">
			<v-chip
				:input-value="data.selected"
				@click="data.select"
				@click:close="remove(data.item)"
				close
				v-bind="data.attrs">
				{{ data.item[itemText] }}
			</v-chip>
		</template>
		<template v-slot:item="data">
			<template v-if="typeof data.item !== 'object'">
				<v-list-item-content v-text="data.item"></v-list-item-content>
			</template>
			<template v-else>
				<v-list-item-content>
					<v-list-item-title v-html="data.item[itemText]"></v-list-item-title>
				</v-list-item-content>
			</template>
		</template>
	</v-autocomplete>
</template>

<script>
	import axios from 'axios';
	import AbstractField from '../AbstractField'

	let REMOTE = 'remote', LOCAL = 'remote'
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
				descriptionLimit: 40,
				entries: [],
				isLoading: false,
				search: null,
			}
		},
		computed: {
			inputType () {
				return this.schema.inputType
			},
			itemText () {
				if (this.schema && this.schema.options) {
					return this.schema.options.itemText
				}
				return 'name'
			},
			itemValue () {
				if (this.schema && this.schema.options) {
					return this.schema.options.itemValue
				}
				return 'value'
			},
			items () {
				let vfb = this;
				return this.entries.map(entry => {
					const itemText = entry[vfb.itemText].length > vfb.descriptionLimit
						? entry[vfb.itemText].slice(0, vfb.descriptionLimit) + '...'
						: entry[vfb.itemText]

					return Object.assign({}, entry, { itemText })
				})
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
		watch: {
			search: function (val) {

			}
		},
		methods: {
			is_valid: function () {
				return this.$refs.dropdown.validate(true)
			},
			remove (item) {
				const index = this.value.indexOf(item[this.itemValue]);
				if (index >= 0) this.value.splice(index, 1)
			},
			loadItems () {
				if (this.inputType === REMOTE) {
					// Items have already been loaded
					if (this.items.length > 0) return;

					// Items have already been requested
					if (this.isLoading) return;

					this.isLoading = true;

					axios.get(this.schema.options.url, {
						params: {}
					}).then(response => {
						this.entries = response.data.results;
					}).catch(error => {
						console.log(error);
					}).finally(() => {
						this.isLoading = false;
					});
				} else {
					this.entries = this.schema.items
				}
			},
		},

		mounted () {
			this.loadItems()
		},

		created () {
		}
	}
</script>

<style lang="scss">
</style>
