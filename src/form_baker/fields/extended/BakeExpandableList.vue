<template>
	<div class="row">
		<v-col :sm="4" class="expandable-list" v-for="(segment, si) in segments">
			<v-list :max-height="300" dense style="overflow-y: scroll">
				<v-subheader>{{schema.label}}</v-subheader>
				<v-list-item-group :return-object="true" color="primary" v-model="selections[si]">
					<v-list-item :key="item.key" @click="itemClicked(segment, si, item, i)"
								 v-for="(item, i) in segment">
						<v-list-item-content>
							<v-list-item-title v-text="item.text"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-col>
		<v-col :sm="12" class="selected-items">
			<template v-for="(segment, si) in segments">
				<a class="arrow" v-if="segment[selections[si]] !== undefined">
					{{segment[selections[si]].text}}
				</a>
			</template>
		</v-col>
	</div>
</template>

<script>
	import axios from 'axios';
	import AbstractField from '../AbstractField'

	export default {
		mixins: [AbstractField],
		props: {
			vfb: {
				type: Object,
				default() {
					return null
				}
			},
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
				initialDataLock: true,
				selections: [],
				selectedKeys: [],
				allItems: [],
				itemMaps: {},
				childMaps: {},
			}
		},
		computed: {
			inputType() {
				return this.schema.inputType
			},
			items() {
				this.itemMaps = {};
				this.childMaps = {};
				for (let index = 0; index < this.allItems.length; index++) {
					this.itemMaps[this.allItems[index].key] = this.allItems[index];
					if (this.allItems[index].parent !== null) {
						if (!this.childMaps.hasOwnProperty(this.allItems[index].parent)) {
							this.childMaps[this.allItems[index].parent] = []
						}
						this.childMaps[this.allItems[index].parent].push(this.allItems[index])
					}
				}
				if (this.itemMaps.hasOwnProperty(this.value)) {
					let selectedItem = this.itemMaps[this.value];
					let selections = [];
					while (selectedItem !== null) {
						selections.push(selectedItem.key);
						if (this.itemMaps.hasOwnProperty(selectedItem.parent))
							selectedItem = this.itemMaps[selectedItem.parent];
						else
							selectedItem = null;
					}
					this.selectedKeys = selections.reverse();
				}
				console.log("selectedKeys", this.selectedKeys);
				return this.allItems
			},
			segments() {
				let segments = [], _vm = this;
				let segmentIndex = 1;

				let currentLayer = _.filter(this.items, function (o) {
					return o.parent === null
				});
				segments.push(currentLayer);
				let selection = null;
				let selectedIndex = null;
				if (this.selectedKeys.length > 0 && this.initialDataLock)
					_.forEach(segments[segmentIndex - 1], (item, index) => {
						if (item.key === this.selectedKeys[segmentIndex - 1]) {
							selectedIndex = index;
						}
					});
				if (this.selections.length < segmentIndex) {
					this.selections.push(selectedIndex);
				} else if(this.initialDataLock){
					this.selections[segmentIndex - 1] = selectedIndex;
				}
				selection = this.selections[segmentIndex - 1];
				while (currentLayer.length > 0 && selection !== null) {
					let newLayer = [];
					_.forEach(currentLayer, (item, index) => {
						if (_vm.childMaps.hasOwnProperty(item.key) && index === selection) {
							newLayer = _.concat(newLayer, _vm.childMaps[item.key])
						}
					});
					if (newLayer.length > 0) {
						segments.push(newLayer);
						currentLayer = newLayer;
						segmentIndex++;

						let selectedIndex = null;
						if (this.selectedKeys.length > 0 && this.initialDataLock)
							_.forEach(segments[segmentIndex - 1], (item, index) => {
								if (item.key === this.selectedKeys[segmentIndex - 1]) {
									selectedIndex = index;
								}
							});
						if (this.selections.length < segmentIndex) {
							this.selections.push(selectedIndex)
						} else if(this.initialDataLock){
							this.selections[segmentIndex - 1] = selectedIndex;
						}
						selection = this.selections[segmentIndex - 1]
					} else {
						currentLayer = []
					}
				}
				return segments
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
		watch: {
			value(newValue, oldValue) {
				// console.log(newValue, oldValue)
			},
			selections: {
				handler: function (newValue) {
					let array = _.zip(this.segments, newValue);
					let selectedValue = null;
					_.forEach(array, (item, i) => {
						if (item[0] !== undefined && item[1] !== undefined &&
							item[0][item[1]] !== undefined) {
							selectedValue = item[0][item[1]].key
						}
					});
					if (!this.initialDataLock)
						this.value = selectedValue
				},
				deep: true,
			}
		},
		methods: {
			is_valid: function () {
				return this.selections.length > 0 && this.selections[0] !== null && this.selections[0] >= 0
			},
			itemClicked: function (segment, segIndex, item, itemIndex) {
				this.initialDataLock = false;
				for (let index = segIndex; index < this.selections.length; index++) {
					this.selections[index] = null;
				}
			},
			getFirstNonNullIndex: function (arr) {
				let index = arr.length - 1;
				_.forEach(arr, (item, i) => {
					if (item == null) {
						index = i - 1
					}
				});
				return index
			},
		},

		mounted() {
			let _vm = this;
			if (this.schema.remote !== undefined) {
				axios.get(_vm.schema.remote.url, {
					params: {}
				}).then(response => {
					let results = response.data.results;
					if (_vm.schema.remote.viewProperty === undefined) {
						_vm.schema.remote.viewProperty = 'text';
					}
					if (_vm.schema.remote.valueProperty === undefined) {
						_vm.schema.remote.valueProperty = 'key';
					}
					for (let index = 0; index < results.length; index++) {
						results[index]['key'] = results[index][_vm.schema.remote.valueProperty];
						results[index]['text'] = results[index][_vm.schema.remote.viewProperty];
					}
					_vm.allItems = results;
				}).catch(error => {
					console.log(error);
				}).finally(() => {
				});
			}
		},

		created() {
		}
	}
</script>

<style lang="scss">
	.selected-items {
		/*border: 1px solid #dedede;*/
	}

	.arrow {
		font-weight: bold;

		&:before {
			padding: 0 5px;
			content: '>>';
		}
	}
</style>
