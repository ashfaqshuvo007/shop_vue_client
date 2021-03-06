<template>
	<div :style="messageColors" class="sc-message--text">
		<template>
			<div :style="{background: messageColors.backgroundColor}" class="sc-message--toolbox">
				<!--<button :disabled="isEditing" @click="edit" v-if="me && message.tsync_id != null && message.tsync_id != undefined">-->
					<!--<icon-base :color="isEditing? 'black': messageColors.color" icon-name="edit" width="10">-->
						<!--<icon-edit/>-->
					<!--</icon-base>-->
				<!--</button>-->
				<!--<button @click="$emit('remove')" v-if="me && message.tsync_id != null && message.tsync_id != undefined">-->
					<!--<icon-base :color="messageColors.color" icon-name="remove" width="10">-->
						<!--<icon-cross/>-->
					<!--</icon-base>-->
				<!--</button>-->
				<slot :me="me" :message="message" name="text-message-toolbox">
				</slot>
			</div>
		</template>
		<slot :me="me" :message="message" :messageColors="messageColors" :messageText="messageText">
			<p class="sc-message--text-content" v-html="messageText"></p>
			<p :style="{color: messageColors.color}" class='sc-message--meta' v-if="message.data.meta">{{message.data.meta}}</p>
			<p class='sc-message--edited' v-if="message.isEdited">
				<icon-base icon-name="edited" width="10">
					<icon-edit/>
				</icon-base>
				edited
			</p>
		</slot>
		<button class='sc-message--edited' @click="$emit('resend')" v-if="me && message.isFailed">
			! failed, try again
		</button>
		<p class='sc-message--edited' v-else-if="me && message.isDelivered">
			delivered
		</p>
	</div>
</template>

<script>
	import IconBase from './../components/IconBase.vue'
	import IconEdit from './../components/icons/IconEdit.vue'
	import IconCross from './../components/icons/IconCross.vue'
	import escapeGoat from 'escape-goat'
	import Autolinker from 'autolinker'
	import store from "./../store/"

	const fmt = require('msgdown');

	export default {
		data() {
			return {
				store
			}
		},
		props: {
			message: {
				type: Object,
				required: true
			},
			messageColors: {
				type: Object,
				required: true
			},
			messageStyling: {
				type: Boolean,
				required: true
			}
		},
		computed: {
			messageText() {
				const escaped = escapeGoat.htmlEscape(this.message.data.text);

				return Autolinker.link(this.messageStyling ? fmt(escaped) : escaped, {
					className: 'chatLink',
					truncate: {length: 50, location: 'smart'}
				})
			},
			me() {
				return this.message.author === 'me';
			},
			isEditing() {
				return (store.editMessage && store.editMessage.tsync_id) == this.message.tsync_id;
			}
		},
		methods: {
			edit() {
				this.store.editMessage = this.message;
			}
		},
		components: {
			IconBase,
			IconCross,
			IconEdit,
		}
	}
</script>

<style scoped>
	a.chatLink {
		color: inherit !important;
	}
</style>
