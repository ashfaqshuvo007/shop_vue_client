<template>
	<li :class="{active:tab.active}">
		<a :class="{disabled: !tab.checked}" href="javascript:void(0)">
			<div :aria-controls="tab.tabId"
				 :aria-disabled="tab.active"
				 :aria-selected="tab.active"
				 :class="{checked: tab.checked,square_shape:isStepSquare, tab_shape:isTabShape}"
				 :id="`step-${tab.tabId}`"
				 :style="[tab.checked ? stepCheckedStyle : {}, tab.validationError ? errorStyle : {}]"
				 :tabindex="tab.checked ? 0 : ''"
				 class="wizard-icon-circle md"
				 role="tab">

				<transition :name="transition" mode="out-in">

					<div :class="{square_shape:isStepSquare, tab_shape:isTabShape}" :style="[tab.active ? iconActiveStyle: {}, tab.validationError ? errorStyle : {}]"
						 class="wizard-icon-container"
						 v-if="tab.active">
						<slot name="active-step">
							<i :class="tab.icon" class="wizard-icon" v-if="tab.icon"></i>
							<i class="wizard-icon" v-else>{{index + 1}}</i>
						</slot>
					</div>
					<slot v-if="!tab.active">
						<i :class="tab.icon" class="wizard-icon" v-if="!tab.active && tab.icon"></i>
						<i class="wizard-icon" v-if="!tab.active && !tab.icon">{{index + 1}}</i>
					</slot>
				</transition>

			</div>
			<slot name="title">
        <span :class="{active:tab.active, has_error:tab.validationError}"
			  :style="tab.active ? stepTitleStyle : {}"
			  class="stepTitle">
              {{tab.title}}
        </span>
			</slot>
		</a>
	</li>
</template>
<script>
	export default {
		name: 'wizard-step',
		props: {
			tab: {
				type: Object,
				default: () => {

				}
			},
			transition: {
				type: String,
				default: ''
			},
			index: {
				type: Number,
				default: 0
			}
		},
		computed: {
			iconActiveStyle() {
				return {
					backgroundColor: this.tab.color
				}
			},
			stepCheckedStyle() {
				return {
					borderColor: this.tab.color
				}
			},
			errorStyle() {
				return {
					borderColor: this.tab.errorColor,
					backgroundColor: this.tab.errorColor
				}
			},
			stepTitleStyle() {
				let isError = this.tab.validationError;
				return {
					color: isError ? this.tab.errorColor : this.tab.color
				}
			},
			isStepSquare() {
				return this.tab.shape === 'square'
			},
			isTabShape() {
				return this.tab.shape === 'tab'
			}
		}
	}
</script>
<style>
</style>
