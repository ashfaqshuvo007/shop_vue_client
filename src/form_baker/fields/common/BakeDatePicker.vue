<template>
	<v-menu :close-on-content-click="false"
			attach
			max-width="290px"
			min-width="290px"
			offset-y
			transition="scale-transition"
			v-model="menu">
		<template v-slot:activator="{ on }">
			<v-text-field hint="DD/MM/YYYY format"
						  label="Date (read only text field)"
						  outlined
						  persistent-hint
						  readonly
						  v-model="computedDateFormatted"
						  v-on="on">
			</v-text-field>
		</template>
		<v-date-picker @input="menu = false"
					   type="month"
					   no-title v-model="value">
		</v-date-picker>
	</v-menu>
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
			return {
				menu: false,
				date: new Date().toISOString().substr(0, 10),
				dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
			}
		},
		computed: {
			inputType() {
				return this.schema.inputType
			},
			computedDateFormatted() {
				return this.formatDate(this.value)
			},
		},
		watch: {
			date(val) {
				this.dateFormatted = this.formatDate(this.value)
			},
		},
		methods: {
			is_valid: function () {
				return true;
			},
			formatDate(date) {
				if (!date) return null;

				const [year, month, day] = date.split('-');
				return `${day}/${month}/${year}`
			},
			parseDate(date) {
				if (!date) return null;

				const [day, month, year] = date.split('/');
				return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
			},
		},

		mounted() {
		},

		created() {
		}
	}
</script>

<style lang="scss">
</style>
