<template>
	<div :class="{opened: isOpen, closed: !isOpen}" class="sc-chat-window">
		<Header
			:colors="colors"
			:disableUserListToggle="disableUserListToggle"
			:imageUrl="titleImageUrl"
			:isAttached="isAttached"
			:onClose="onClose"
			:title="title"
			@userList="handleUserListToggle"
		>
			<template>
				<slot name="header">
				</slot>
			</template>
		</Header>
		<UserList
			:participants="participants"
			v-if="showUserList"
		/>
		<MessageList
			:alwaysScrollToBottom="alwaysScrollToBottom"
			:colors="colors"
			:messageStyling="messageStyling"
			:messages="messages"
			:participants="participants"
			:showTypingIndicator="showTypingIndicator"
			@remove="$emit('remove', $event)"
			@resend="$emit('resend', $event)"
			@scrollToTop="$emit('scrollToTop')"
			v-if="!showUserList">
			<template v-slot:user-avatar="scopedProps">
				<slot :message="scopedProps.message" :user="scopedProps.user" name="user-avatar">
				</slot>
			</template>
			<template v-slot:text-message-body="scopedProps">
				<slot :me="scopedProps.me" :message="scopedProps.message" :messageColors="scopedProps.messageColors"
					  :messageText="scopedProps.messageText" name="text-message-body">
				</slot>
			</template>
			<template v-slot:system-message-body="scopedProps">
				<slot :message="scopedProps.message" name="system-message-body">
				</slot>
			</template>
			<template v-slot:text-message-toolbox="scopedProps">
				<slot :me="scopedProps.me" :message="scopedProps.message" name="text-message-toolbox">
				</slot>
			</template>
		</MessageList>
		<UserInput
			:colors="colors"
			:onSubmit="onUserInputSubmit"
			:placeholder="placeholder"
			:showEmoji="showEmoji"
			:showFile="showFile"
			:suggestions="getSuggestions()"
			@edit="$emit('edit', $event)"
			@onType="$emit('onType')"
			v-if="!showUserList"/>
	</div>
</template>

<script>
	import Header from './Header.vue'
	import MessageList from './MessageList.vue'
	import UserInput from './UserInput.vue'
	import UserList from './UserList.vue'

	export default {
		components: {
			Header,
			MessageList,
			UserInput,
			UserList
		},
		props: {
			isAttached: {
				type: Boolean,
				required: false,
				default: false,
			},
			showEmoji: {
				type: Boolean,
				default: false
			},
			showFile: {
				type: Boolean,
				default: false
			},
			participants: {
				type: Array,
				required: true
			},
			title: {
				type: String,
				required: true
			},
			titleImageUrl: {
				type: String,
				default: ''
			},
			onUserInputSubmit: {
				type: Function,
				required: true
			},
			onClose: {
				type: Function,
				required: true
			},
			messageList: {
				type: Array,
				default: () => []
			},
			isOpen: {
				type: Boolean,
				default: () => false
			},
			placeholder: {
				type: String,
				default: 'Write a message...'
			},
			showTypingIndicator: {
				type: String,
				required: true
			},
			colors: {
				type: Object,
				required: true
			},
			alwaysScrollToBottom: {
				type: Boolean,
				required: true
			},
			messageStyling: {
				type: Boolean,
				required: true
			},
			disableUserListToggle: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				showUserList: false
			}
		},
		computed: {
			messages() {
				let messages = this.messageList;

				return messages
			}
		},
		methods: {
			handleUserListToggle(showUserList) {
				this.showUserList = showUserList
			},
			getSuggestions() {
				return [
					'Change Quantity', 'Quote a price', 'Confirm Booking', 'Ready for Booking',
				]
			}
		}
	}
</script>
<style scoped>
	.sc-chat-window {
		width: 100%;
		max-height: 590px;
		/*position: fixed;*/
		right: 25px;
		bottom: 100px;
		box-sizing: border-box;
		box-shadow: 0 7px 40px 2px rgba(148, 149, 150, 0.1);
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 10px;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		animation: fadeIn;
		animation-duration: 0.3s;
		animation-timing-function: ease-in-out;
	}

	.sc-chat-window.closed {
		opacity: 0;
		display: none;
		bottom: 90px;
	}

	@keyframes fadeIn {
		0% {
			display: none;
			opacity: 0;
		}

		100% {
			display: flex;
			opacity: 1;
		}
	}

	.sc-message--me {
		text-align: right;
	}

	.sc-message--them {
		text-align: left;
	}

	@media (max-width: 450px) {
		.sc-chat-window {
			width: 100%;
			height: 100%;
			max-height: 100%;
			right: 0px;
			bottom: 0px;
			border-radius: 0px;
		}

		.sc-chat-window {
			transition: 0.1s ease-in-out;
		}

		.sc-chat-window.closed {
			bottom: 0px;
		}
	}
</style>
