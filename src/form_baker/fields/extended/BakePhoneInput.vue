<template>
	<div :class="[{ 'dark': dark }, size]"
		 class="vue-phone-number-input flex">
		<input type="hidden" v-model="value">
		<div class="select-country-container">
			<bake-phone-country-selector
				:color="color"
				:dark="dark"
				:disabled="disabled"
				:error="shouldChooseCountry"
				:hint="shouldChooseCountry ? translate.countrySelectorError : null"
				:id="`${id}_country_selector`"
				:ignored-countries="ignoredCountries"
				:items="codesCountries"
				:label="translate.countrySelectorLabel"
				:no-flags="noFlags"
				:only-countries="onlyCountries"
				:preferred-countries="preferredCountries"
				:size="size"
				:valid="isValid && !noValidatorState"
				:valid-color="validColor"
				class="input-country-selector"
				ref="CountrySelector"
				v-model="countryCode"/>
		</div>
		<div class="flex-1">
			<v-text-field :label="schema.label"
						  :ref="'PhoneNumberInput'"
						  :type="'tel'"
						  @blur="$emit('phone-number-blur')"
						  @focus="$emit('phone-number-focused')"
						  counter="30"
						  outlined
						  class="v-phone-input"
						  v-bind="$attrs"
						  v-model="phoneNumber">
			</v-text-field>
		</div>
	</div>
</template>
<script>
	/* eslint-disable */
	import {countries, countriesIso} from './js/CountryPhoneCode.js'
	import examples from 'libphonenumber-js/examples.mobile.json'
	import {parsePhoneNumberFromString, AsYouType, getExampleNumber} from 'libphonenumber-js'
	import BakePhoneCountrySelector from './_subs/BakePhoneCountrySelector'
	import locales from './js/PhoneLocales'
	import AbstractField from '../AbstractField'

	const browserLocale = () => {
		if (!window) return null;
		const browserLocale = window.navigator.userLanguage || window.navigator.language;
		let locale = browserLocale ? browserLocale.substr(3, 4).toUpperCase() : null;
		if (locale === '') locale = browserLocale.substr(0, 2).toUpperCase();
		return locale
	};

	const isCountryAvailable = (locale) => {
		return countriesIso.includes(locale)
	};

	export default {
		mixins: [AbstractField],
		components: {
			BakePhoneCountrySelector
		},
		props: {
			id: {type: String, default: 'VuePhoneNumberInput'},
			color: {type: String, default: 'dodgerblue'},
			validColor: {type: String, default: 'yellowgreen'},
			dark: {type: Boolean, default: Boolean},
			disabled: {type: Boolean, default: Boolean},
			defaultCountryCode: {type: String, default: null},
			size: {type: String, default: String},
			preferredCountries: {type: Array, default: null},
			onlyCountries: {type: Array, default: null},
			ignoredCountries: {type: Array, default: Array},
			translations: {type: Object, default: Object},
			noValidatorState: {type: Boolean, default: false},
			noUseBrowserLocale: {type: Boolean, default: false},
			noFlags: {type: Boolean, default: false},
			error: {type: Boolean, default: false},
			noExample: {type: Boolean, default: false},
			required: {type: Boolean, default: false},
			schema: {type: Object, default: null},
			options: {type: Object, default: {}},
		},
		data() {
			return {
				results: null,
				focusInput: false,
				nationalNumber: null,
			}
		},
		computed: {
			translate() {
				return {
					...locales,
					...this.translations
				}
			},
			codesCountries() {
				return countries
			},
			locale() {
				const locale = this.defaultCountryCode || (!this.noUseBrowserLocale ? browserLocale() : null);
				const countryAvailable = isCountryAvailable(locale);

				if (countryAvailable && locale) {
					this.countryCode = locale
				} else if (!countryAvailable && this.defaultCountryCode) {
					// If default country code is not available
					console.warn(`The locale ${locale} is not available`)
				}
				return countryAvailable ? locale : null
			},
			countryCode: {
				get() {
					if(!this.results) {
						this.results = this.getParsePhoneNumberFromString(this.value);
						this.nationalNumber = this.results.nationalNumber;
					}
					return this.results.countryCode || this.locale;
				},
				set(newCountry) {
					this.emitValues({countryCode: newCountry, phoneNumber: this.phoneNumber});
					if (this.focusInput) {
						this.$refs.PhoneNumberInput.$el.querySelector('input').focus()
					}
					this.focusInput = true
				}
			},
			phoneNumber: {
				get() {
					if(!this.results) {
						this.results = this.getParsePhoneNumberFromString(this.value);
						this.nationalNumber = this.results.nationalNumber;
					}
					return this.nationalNumber;
				},
				set(newPhone) {
					this.nationalNumber = newPhone;
					this.emitValues({countryCode: this.countryCode, phoneNumber: this.nationalNumber})
				}
			},
			shouldChooseCountry() {
				return !this.countryCode && !!this.phoneNumber
			},
			phoneFormatted() {
				return this.results.formatInternational
			},
			isValid() {
				return this.results.isValid
			},
			phoneNumberExample() {
				const phoneNumber = this.countryCode ? getExampleNumber(this.countryCode, examples) : null;
				return phoneNumber ? phoneNumber.formatNational() : null
			},
			hasEmptyPhone() {
				return this.phoneNumber === '' || this.phoneNumber === null
			},
			hintValue() {
				return this.noExample || !this.phoneNumberExample
					? null
					: this.hasEmptyPhone || this.isValid ? null : `${this.translate.example} ${this.phoneNumberExample}`
			}
		},
		methods: {
			getAsYouTypeFormat(payload) {
				const asYouType = new AsYouType(payload.countryCode);
				return asYouType.input(payload.phoneNumber)
			},
			getParsePhoneNumberFromString(phoneNumber) {
				const parsing = phoneNumber ? parsePhoneNumberFromString(phoneNumber) : null;
				return {
					phoneNumber: parsing ? parsing.nationalNumber : null,
					countryCode: parsing.country,
					isValid: false,
					...(parsing
							? {
								formattedNumber: parsing.number,
								nationalNumber: parsing.nationalNumber,
								isValid: parsing.isValid(),
								type: parsing.getType(),
								formatInternational: parsing.formatInternational(),
								formatNational: parsing.formatNational(),
								uri: parsing.getURI(),
								e164: parsing.format('E.164')
							}
							: null
					)
				}
			},
			getParsePhoneNumberFromPayload({phoneNumber, countryCode}) {
				const parsing = phoneNumber ? parsePhoneNumberFromString(phoneNumber, countryCode) : null;
				return {
					phoneNumber: parsing ? parsing.nationalNumber : null,
					countryCode: parsing.country,
					isValid: false,
					...(parsing
							? {
								formattedNumber: parsing.number,
								nationalNumber: parsing.nationalNumber,
								isValid: parsing.isValid(),
								type: parsing.getType(),
								formatInternational: parsing.formatInternational(),
								formatNational: parsing.formatNational(),
								uri: parsing.getURI(),
								e164: parsing.format('E.164')
							}
							: null
					)
				}
			},
			emitValues(payload) {
				const asYouType = this.getAsYouTypeFormat(payload);
				this.$emit('input', asYouType);
				this.results = this.getParsePhoneNumberFromPayload(payload);
				this.$emit('update', this.results);
				this.value = this.results.formattedNumber;
			}
		}
	}
</script>
<style lang="scss">
	@import "./scss/phoneInput";

	.vue-phone-number-input {
		*, *::before, *::after {
			box-sizing: border-box;
		}

		font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
		Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

		.select-country-container {
			flex: 0 0 120px;
			width: 120px;
			min-width: 120px;
			max-width: 120px;
		}

		&.sm .select-country-container {
			flex: 0 0 110px;
			width: 110px;
			min-width: 110px;
			max-width: 110px;
		}

		&.lg .select-country-container {
			flex: 0 0 130px;
			width: 130px;
			min-width: 130px;
			max-width: 130px;
		}

		.country-selector {
			cursor: pointer;
		}

		.select-country-container {
			.input-country-selector input {
				border-top-right-radius: 0 !important;
				border-bottom-right-radius: 0 !important;
			}
		}

		.input-phone-number input {
			margin-left: -3px !important;
			border-top-left-radius: 0 !important;
			border-bottom-left-radius: 0 !important;
		}

		.input-phone-number:not(.is-dark):not(.is-disabled) {
			input {
				background-color: transparent !important;
			}
		}
	}
</style>
