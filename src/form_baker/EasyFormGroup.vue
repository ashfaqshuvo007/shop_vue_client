<template>
	<v-col :sm="schema.column" class="pl-2 pr-2">
		<component :is="getFieldType(schema)" :model="model" :options="options" :ref="'input'"
				   :schema="schema" :vfb="vfb" ref="child">
		</component>
	</v-col>

</template>

<script>
	import BakedComponents from './utils/BakeComponentLoader'

	export default {
		name: 'easy-form-group',
		components: BakedComponents,
		mixins: [],
		props: {
			vfb: {
				type: Object,
				required: true
			},
			model: Object,
			schema: {
				type: Object,
				required: true
			},
			options: {
				type: Object
			},
		},
		methods: {
			// Get type of field 'field-xxx'. It'll be the name of HTML element
			getFieldType(fieldSchema) {
				return 'bake-' + fieldSchema.type
			},
			// Get current hint.
			fieldHint(field) {
				// if (isFunction(field.hint)) return field.hint.call(this, this.model, field, this)
				return field.hint
			},
			// Get current errors.
			fieldErrors(field) {
				return this.errors.filter((e) => e.field === field).map((item) => item.error)
			},
			is_valid: function () {
				return this.$refs.input.is_valid();
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
