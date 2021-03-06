<template>
	<div :style="{background: colors.header.bg, color: colors.header.text}" class="sc-header">
		<slot>
			<img :src="imageUrl" alt="" class="sc-header--img" v-if="imageUrl"/>
			<div @click="toggleUserList" class="sc-header--title enabled" v-if="!disableUserListToggle"> {{title}}</div>
			<div class="sc-header--title" v-else> {{title}}</div>
		</slot>
		<div @click="onClose" class="sc-header--close-button" v-if="!isAttached">
			<img :alt="icons.close.name" :src="icons.close.img"/>
		</div>
	</div>
</template>
<script>

	import CloseIcon from './assets/close-icon-big.png'

	export default {
		props: {
			isAttached: {
				type: Boolean,
				required: false,
				default: false,
			},
			icons: {
				type: Object,
				default: function () {
					return {
						close: {
							img: CloseIcon,
							name: 'default',
						},
					}
				}
			},
			imageUrl: {
				type: String,
				required: true
			},
			title: {
				type: String
			},
			onClose: {
				type: Function,
				required: true
			},
			colors: {
				type: Object,
				required: true
			},
			disableUserListToggle: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			toggleUserList() {
				this.inUserList = !this.inUserList;
				this.$emit("userList", this.inUserList)
			}
		},
		data() {
			return {
				inUserList: false
			}
		}
	}
</script>
<style scoped>
	.sc-header {
		min-height: 48px;
		padding: 10px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
		position: relative;
		box-sizing: border-box;
		display: flex;
	}

	.sc-header--img {
		border-radius: 50%;
		align-self: center;
		padding: 10px;
	}

	.sc-header--title {
		align-self: center;
		padding: 10px;
		flex: 1;
		user-select: none;
		font-size: 14px;
	}

	.sc-header--title.enabled {
		cursor: pointer;
		border-radius: 5px;
	}

	.sc-header--title.enabled:hover {
		box-shadow: 0 2px 5px rgba(0.2, 0.2, 0.5, .1);
	}

	.sc-header--close-button {
		width: 40px;
		align-self: center;
		height: 40px;
		margin-right: 10px;
		box-sizing: border-box;
		cursor: pointer;
		border-radius: 5px;
		margin-left: auto;
	}

	.sc-header--close-button:hover {
		box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, .1);
	}

	.sc-header--close-button img {
		width: 100%;
		height: 100%;
		padding: 13px;
		box-sizing: border-box;
	}

	@media (max-width: 450px) {
		.sc-header {
			border-radius: 0px;
		}
	}
</style>
