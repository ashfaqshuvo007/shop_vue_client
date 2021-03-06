<template>
	<div class="v-date-range">
		<v-menu
			:close-on-content-click="false"
			offset-y
			v-bind="menuProps"
			v-model="menu">
			<template v-slot:activator="{ on }">
				<v-text-field
					:disabled="disabled"
					:placeholder="placeholder"
					:value="inputValue"
					class="v-date-range__input-field"
					readonly
					v-bind="inputProps"
					v-on="on"></v-text-field>
			</template>
			<v-card class="v-date-range__menu-content">
				<v-card-text>
					<div
						:class="{
								  'v-date-range__pickers': true,
								  'v-date-range--highlighted': highlightDates.length
							   }"
						:data-days="highlightDates.length">
						<v-card-title v-if="$slots.title">
							<slot name="title" v-if="$slots.title"></slot>
						</v-card-title>
						<v-card-text>
							<div class="v-date-range__content">
								<v-list class="mr-4" v-if="!noPresets">
									<v-subheader>{{ presetLabel }}</v-subheader>
									<v-list-item
										:key="index"
										@click="selectPreset(index)"
										v-for="(preset, index) in presets"
										v-model="isPresetActive[index]">
										<v-list-item-content>
											{{ preset.label }}
										</v-list-item-content>
									</v-list-item>
								</v-list>
								<v-date-picker
									:event-color="highlightClasses"
									:events="highlightDates"
									:first-day-of-week="firstDayOfWeek"
									:locale="locale"
									:max="pickerEnd || max"
									:min="min"
									:next-icon="nextIcon"
									:no-title="noTitle"
									:prev-icon="prevIcon"
									class="mr-4 v-date-range__picker--start v-date-range__picker"
									v-model="pickerStart">
								</v-date-picker>
								<v-date-picker
									:event-color="highlightClasses"
									:events="highlightDates"
									:first-day-of-week="firstDayOfWeek"
									:locale="locale"
									:max="max"
									:min="pickerStart || min"
									:next-icon="nextIcon"
									:no-title="noTitle"
									:prev-icon="prevIcon"
									class="v-date-range__picker--end v-date-range__picker"
									v-model="pickerEnd">
								</v-date-picker>
							</div>
						</v-card-text>
					</div>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="reset" text>Reset</v-btn>
					<v-btn @click="menu = false" text>Cancel</v-btn>
					<v-btn :disabled="!bothSelected" @click="applyRange" color="primary">Apply
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-menu>
	</div>
</template>

<script>
	import AbstractField from '../AbstractField';

	import {format, parse, differenceInCalendarDays, addDays} from 'date-fns';

	const isoFormat = 'dd-MM-yyyy';
	const defaultDate = format(new Date(), isoFormat);

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
			range: {
				type: Object,
				default: () => {
					return {start: defaultDate, end: defaultDate};
				}
			},
			disabled: {
				type: Boolean,
				default: false
			},
			presets: {
				type: Array,
				default: () => {
					return [];
				}
			},
			noPresets: {
				type: Boolean,
				default: false
			},
			// Denotes the Placeholder string for start date.
			startLabel: {
				type: String,
				default: 'Start Date'
			},
			// Denotes the Placeholder string for start date.
			endLabel: {
				type: String,
				default: 'End Date'
			},
			// The string that gets placed between `startLabel` and `endLabel`
			separatorLabel: {
				type: String,
				default: 'To'
			},
			presetLabel: {
				type: String,
				default: 'Presets'
			},
			/**
			 * Following values are all passable to vuetify's own datepicker
			 * component.
			 */
			// Min selectable date.
			min: {
				type: String,
				default: undefined
			},
			// Max selectable date
			max: {
				type: String,
				default: undefined
			},
			// Locale
			locale: {
				type: String,
				default: 'en-us'
			},
			firstDayOfWeek: {
				type: [String, Number],
				default: 0
			},
			noTitle: {
				type: Boolean,
				default: false
			},
			displayFormat: {
				type: String
			},
			highlightColor: {
				type: String,
				default: 'blue lighten-5'
			},
			showReset: {
				type: Boolean,
				default: true
			},
			/**
			 * Icons
			 */
			nextIcon: {
				type: String,
				default: '$vuetify.icons.next'
			},
			prevIcon: {
				type: String,
				default: '$vuetify.icons.prev'
			},
			inputProps: {
				type: Object,
				default: () => {
					return {};
				}
			},
			menuProps: {
				type: Object,
				default: () => {
					return {};
				}
			},
		},

		data: function () {
			if (this.range)
				return {
					menu: false,
					pickerStart: this.range.start,
					pickerEnd: this.range.end,
					highlightDates: [],
					highlightClasses: {},
				};
			return {
				menu: false,
				pickerStart: defaultDate,
				pickerEnd: defaultDate,
				highlightDates: [],
				highlightClasses: {},
			};
		},
		computed: {
			inputType() {
				return this.schema.inputType
			},
			inputValue() {
				if (this.range) {
					if (this.isValueEmpty) {
						return '';
					}
					const start = this.displayFormat
						? this.formatDate(this.range.start, this.displayFormat)
						: this.range.start;
					const end = this.displayFormat
						? this.formatDate(this.range.end, this.displayFormat)
						: this.range.end;
					return `${start}    ${this.separatorLabel}     ${end}`;
				}
				return `--    ${this.separatorLabel}     --`;
			},
			placeholder() {
				return `${this.startLabel}    ${this.separatorLabel}    ${this.endLabel}`;
			},
			/**
			 * If the value prop doesn't have any start value,
			 * its most likely that an empty object was passed.
			 */
			isValueEmpty() {
				return !this.range && !this.range.start;
			},
			/**
			 * If the user has selected both the dates or not
			 */
			bothSelected() {
				return this.pickerStart && this.pickerEnd;
			},
			isPresetActive() {
				return this.presets.map(
					preset =>
						preset.range[0] === this.pickerStart &&
						preset.range[1] === this.pickerEnd
				);
			},
		},
		methods: {
			is_valid: function () {
				return this.$refs.text.validate(true)
			},
			/**
			 * Emit the input event with the updated range data.
			 * This makes v-model work.
			 */
			applyRange() {
				this.menu = false;
				this.emitRange();
			},
			/**
			 * Called every time the menu is closed.
			 * It also emits an event to tell the parent
			 * that the menu has closed.
			 *
			 * Upon closing the datepicker values are set
			 * to the current selected value.
			 */
			closeMenu() {
				// Reset the changed values for datepicker models.
				if (this.range) {
					this.pickerStart = this.range.start;
					this.pickerEnd = this.range.end;
				}
				this.highlight();
				this.$emit('menu-closed');
			},
			formatDate(date, fmt) {
				return format(parse(date, isoFormat), fmt);
			},
			highlight() {
				if (!this.bothSelected) {
					return;
				}
				const dates = [];
				const classes = {};
				const start = parse(this.pickerStart, isoFormat, new Date());
				const end = parse(this.pickerEnd, isoFormat, new Date());
				const diff = Math.abs(differenceInCalendarDays(start, end));

				// Loop though all the days in range.
				for (let i = 0; i <= diff; i++) {
					const date = format(addDays(start, i), isoFormat);
					dates.push(date);
					const classesArr = [];
					classesArr.push(`v-date-range__in-range`);
					classesArr.push(this.highlightColor);
					i === 0 && classesArr.push(`v-date-range__range-start`);
					i === diff && classesArr.push(`v-date-range__range-end`);
					classes[date] = classesArr.join(' ');
				}
				this.highlightDates = dates;
				this.highlightClasses = classes;
			},
			selectPreset(presetIndex) {
				this.pickerStart = this.presets[presetIndex].range[0];
				this.pickerEnd = this.presets[presetIndex].range[1];
			},
			reset() {
				// Reset Picker Values
				this.pickerStart = '';
				this.pickerEnd = '';
				this.highlightDates = [];
				this.highlightClasses = {};
				this.emitRange();
			},
			emitRange() {
				this.$emit('input', {
					start: this.pickerStart,
					end: this.pickerEnd
				});
			},
		},
		watch: {
			// Watching to see if the menu is closed.
			menu(isOpen) {
				if (!isOpen) {
					this.closeMenu();
				} else {
					this.highlight();
				}
			},
			pickerStart: 'highlight',
			pickerEnd: 'highlight'
		},
		mounted() {
		},
		created() {
		}
	}
</script>
<style scoped lang="scss">
	.v-date-range__input-field input {
		text-align: center;
	}

	/* =============================================
    =            Menu Content            =
    ============================================= */
	.v-date-range__content {
		display: flex;

		.v-date-picker-table {
			.v-btn {
				border-radius: 0;
			}
		}
	}

	/* =====  End of Menu Content  ====== */
	.v-date-range__pickers .v-date-picker-table__events {
		height: 100%;
		width: 100%;
		top: 0;
		z-index: -1;
	}

	/* =============================================
    =            Date buttons            =
    ============================================= */
	.v-date-range__pickers .v-date-picker-table table {
		width: auto;
		margin: auto;
		border-collapse: collapse;

		& th, & td {
			height: 32px;
			width: 32px;
		}

		& td {
			.v-btn {
				&.v-btn--outline {
					border: none;
					box-shadow: 0 0 0 1px currentColor inset;
				}

				&.v-btn--active::before {
					background-color: transparent !important;
				}
			}
		}
	}

	/* =====  End of Date buttons  ====== */
	/* =============================================
    =            Highlighting the even bubble dot            =
    ============================================= */
	.v-date-range__pickers .v-date-range__in-range {
		height: 100%;
		width: 100%;
		margin: 0;
		border-radius: 0;
	}

	/* =====  End of Highlighting the even bubble dot  ====== */
</style>
