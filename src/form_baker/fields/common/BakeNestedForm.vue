<template>
	<div class="row" v-if="schema.many">
		<v-container :class="options.formGroupClass">
			<div :class="options.formGroupClass" class="group-title" v-if="schema.legend">
				{{ schema.label }}
			</div>
			<v-row>
				<v-col :sm="schema.column" style="padding: 0">
					<v-row class="nested-form" v-for="(item, idx) in value">
						<!--{{item}}-->
						<template v-for='(field, idx) in schema.fields'>
							<easy-form-group :class="options.inputGroupClass" :model="item"
											 :options="options" :ref="'nested_group'" :schema="field"
											 :vfb="vfb">
							</easy-form-group>
						</template>
						<v-btn @click="removeItem(idx)" class="mt-3"
							   color="red" icon text outlined
							   v-if="value.length > 1">
							<v-icon>delete_outline</v-icon>
						</v-btn>
					</v-row>
				</v-col>
			</v-row>
			<v-btn @click="addNewProperty" outlined small tile>
				<v-icon left>add</v-icon>
				Add new
			</v-btn>
		</v-container>
	</div>
	<div class="row" v-else>
		<v-container :class="options.formGroupClass">
			<div :class="options.formGroupClass" class="group-title" v-if="schema.legend">
				{{ schema.label }}
			</div>
			<v-row>
				{{value}}
				<template v-for='(field, idx) in schema.fields'>
					<easy-form-group :class="options.inputGroupClass" :model="model"
									 :options="options" :ref="'nested_group'" :schema="field"
									 :vfb="vfb">
					</easy-form-group>
				</template>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	import AbstractField from '../AbstractField';
	import {uuid} from 'vue-uuid';

	export default {
		name: 'BakeNestedForm',
		mixins: [AbstractField],
		components: {
			EasyFormGroup: () => import('@/form_baker/EasyFormGroup'),
		},
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

		data: function () {
			return {}
		},
		computed: {
			inputType() {
				return this.schema.inputType
			},
		},
		methods: {
			is_valid: function () {
				let valid = true;
				if (this.$refs.nested_group !== undefined)
					for (let index = 0; index < this.$refs.nested_group.length; index++) {
						valid = valid && this.$refs.nested_group[index].is_valid();
					}
				return valid;
			},
			formatValueToModel(value) {
				return value;
			},
			defineEmptyObject(fields) {
				let result = {
					tsync_id: uuid.v4(),
				};
				for (let index = 0; index < fields.length; index++) {
					let field = fields[index];
					if(field.type === "nested-form") {
						result[field.model] = [];
					} else {
						result[field.model] = null;
					}
				}
				return result;
			},
			addNewProperty() {
				this.value.push(this.defineEmptyObject(this.schema.fields));
			},
			removeItem(index) {
				this.value.splice(index, 1);
			},
		},

		mounted() {
		},

		created() {
		}
	}
</script>

<style lang="scss">
	.nested-form {
		border: 1px solid #eeeeee;
		padding: 10px;
		margin: 10px 0 5px 0;
		box-shadow: 0 1px 1px 0 #8080804d;
	}
</style>
