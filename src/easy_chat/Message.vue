<template>
	<div class="sc-message">
		<div :class="{
        sent: message.author === 'me',
        received: message.author !== 'me' && message.type !== 'system',
        system: message.type === 'system'
      }" class="sc-message--content">
			<slot
				:message="message"
				:user="user"
				name="user-avatar">
				<div :style="{
            backgroundImage: `url(${chatImageUrl})`
          }" :title="authorName" class="sc-message--avatar" v-if="message.type !== 'system'" v-tooltip="authorName"></div>
			</slot>

			<TextMessage
				:message="message"
				:messageColors="determineMessageColors()"
				:messageStyling="messageStyling"
				@remove="$emit('remove')"
				@resend="$emit('resend')"
				v-if="message.type === 'text'">
				<template v-slot:default="scopedProps">
					<slot :me="scopedProps.me" :message="scopedProps.message" :messageColors="scopedProps.messageColors"
						  :messageText="scopedProps.messageText" name="text-message-body">
					</slot>
				</template>
				<template v-slot:text-message-toolbox="scopedProps">
					<slot :me="scopedProps.me" :message="scopedProps.message" name="text-message-toolbox">
					</slot>
				</template>
			</TextMessage>
			<EmojiMessage :data="message.data" v-else-if="message.type === 'emoji'"/>
			<FileMessage :data="message.data" :messageColors="determineMessageColors()" v-else-if="message.type === 'file'"/>
			<TypingMessage :messageColors="determineMessageColors()" v-else-if="message.type === 'typing'"/>
			<SystemMessage :data="message.data" :messageColors="determineMessageColors()" v-else-if="message.type === 'system'">
				<slot :message="message.data" name="system-message-body">
				</slot>
			</SystemMessage>
		</div>
	</div>
</template>

<script>
	import TextMessage from './messages/TextMessage.vue'
	import FileMessage from './messages/FileMessage.vue'
	import EmojiMessage from './messages/EmojiMessage.vue'
	import TypingMessage from './messages/TypingMessage.vue'
	import SystemMessage from './messages/SystemMessage.vue'
	import chatIcon from './assets/chat-icon.svg'
	import store from "./store/";

	export default {
		data() {
			return {}
		},
		components: {
			TextMessage,
			FileMessage,
			EmojiMessage,
			TypingMessage,
			SystemMessage
		},
		props: {
			message: {
				type: Object,
				required: true
			},
			colors: {
				type: Object,
				required: true
			},
			messageStyling: {
				type: Boolean,
				required: true
			},
			user: {
				type: Object,
				required: true
			}
		},
		methods: {
			sentColorsStyle() {
				return {
					color: this.colors.sentMessage.text,
					backgroundColor: this.colors.sentMessage.bg
				}
			},
			receivedColorsStyle() {
				return {
					color: this.colors.receivedMessage.text,
					backgroundColor: this.colors.receivedMessage.bg
				}
			},
			determineMessageColors() {
				return this.message.author === 'me' ? this.sentColorsStyle() : this.receivedColorsStyle()
			}
		},
		computed: {
			authorName() {
				return this.user && this.user.name;
			},
			chatImageUrl() {
				return (this.user && this.user.imageUrl) || this.chatIcon;
			}
		}
	}
</script>
<style lang="scss">
	.sc-message {
		width: 95%;
		margin: auto;
		padding-bottom: 10px;
		display: flex;

		.sc-message--edited {
			opacity: 0.7;
			word-wrap: normal;
			font-size: xx-small;
			text-align: center;
		}
	}

	.sc-message--content {
		width: 100%;
		display: flex;
	}

	.sc-message--content.sent {
		justify-content: flex-end;
	}

	.sc-message--content.sent:hover {
		background: #f8f8f8;
	}

	.sc-message--content.system {
		justify-content: center;
	}

	.sc-message--content.sent .sc-message--avatar {
		display: none;
	}

	.sc-message--avatar {
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center;
		min-width: 30px;
		min-height: 30px;
		border-radius: 50%;
		align-self: center;
		margin-right: 15px;
	}

	.sc-message--meta {
		font-size: xx-small;
		margin-bottom: 0px;
		color: white;
		text-align: center;
	}

	@media (max-width: 450px) {
		.sc-message {
			width: 80%;
		}
	}

	.sc-message--text {
		padding: 5px 20px;
		border-radius: 6px;
		font-weight: 300;
		font-size: 14px;
		line-height: 1.4;
		position: relative;
		-webkit-font-smoothing: subpixel-antialiased;

		.sc-message--text-body {
			.sc-message--text-content {
				white-space: pre-wrap;
				color: white;
			}
		}

		&:hover .sc-message--toolbox {
			left: -20px;
			opacity: 1;
		}

		.sc-message--toolbox {
			transition: left 0.2s ease-out 0s;
			white-space: normal;
			opacity: 0;
			position: absolute;
			left: 0px;
			width: 25px;
			top: 0;

			button {
				background: none;
				border: none;
				padding: 0px;
				margin: 0px;
				outline: none;
				width: 100%;
				text-align: center;
				cursor: pointer;

				&:focus {
					outline: none;
				}
			}
		}
	}

	.sc-message--content.sent .sc-message--text {
		color: white;
		background-color: #e62e03;
		max-width: calc(100% - 120px);
		word-wrap: break-word;
	}

	.sc-message--text code {
		font-family: 'Courier New', Courier, monospace !important;
	}

	.sc-message--content.received .sc-message--text {
		color: #9a2003;
		background-color: #f4f7f9;
		margin-right: 40px;
	}

	.tooltip {
		display: block !important;
		z-index: 10000;

		.tooltip-inner {
			background: black;
			color: white;
			border-radius: 16px;
			padding: 5px 10px 4px;
		}

		.tooltip-arrow {
			width: 0;
			height: 0;
			border-style: solid;
			position: absolute;
			margin: 5px;
			border-color: black;
			z-index: 1;
		}

		&[x-placement^="top"] {
			margin-bottom: 5px;

			.tooltip-arrow {
				border-width: 5px 5px 0 5px;
				border-left-color: transparent !important;
				border-right-color: transparent !important;
				border-bottom-color: transparent !important;
				bottom: -5px;
				left: calc(50% - 5px);
				margin-top: 0;
				margin-bottom: 0;
			}
		}

		&[x-placement^="bottom"] {
			margin-top: 5px;

			.tooltip-arrow {
				border-width: 0 5px 5px 5px;
				border-left-color: transparent !important;
				border-right-color: transparent !important;
				border-top-color: transparent !important;
				top: -5px;
				left: calc(50% - 5px);
				margin-top: 0;
				margin-bottom: 0;
			}
		}

		&[x-placement^="right"] {
			margin-left: 5px;

			.tooltip-arrow {
				border-width: 5px 5px 5px 0;
				border-left-color: transparent !important;
				border-top-color: transparent !important;
				border-bottom-color: transparent !important;
				left: -5px;
				top: calc(50% - 5px);
				margin-left: 0;
				margin-right: 0;
			}
		}

		&[x-placement^="left"] {
			margin-right: 5px;

			.tooltip-arrow {
				border-width: 5px 0 5px 5px;
				border-top-color: transparent !important;
				border-right-color: transparent !important;
				border-bottom-color: transparent !important;
				right: -5px;
				top: calc(50% - 5px);
				margin-left: 0;
				margin-right: 0;
			}
		}

		&[aria-hidden='true'] {
			visibility: hidden;
			opacity: 0;
			transition: opacity .15s, visibility .15s;
		}

		&[aria-hidden='false'] {
			visibility: visible;
			opacity: 1;
			transition: opacity .15s;
		}

		&.info {
			$color: rgba(#004499, .9);

			.tooltip-inner {
				background: $color;
				color: white;
				padding: 24px;
				border-radius: 5px;
				box-shadow: 0 5px 30px rgba(black, .1);
			}

			.tooltip-arrow {
				border-color: $color;
			}
		}

		&.popover {
			$color: #f9f9f9;

			.popover-inner {
				background: $color;
				color: black;
				padding: 24px;
				border-radius: 5px;
				box-shadow: 0 5px 30px rgba(black, .1);
			}

			.popover-arrow {
				border-color: $color;
			}
		}
	}
</style>
