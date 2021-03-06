<template>
	<!-- Shop Page Start -->
	<div>
		<!-- Product Thumbnail Start -->
		<div class="main-product-thumbnail ptb-5 ptb-sm-20">
			<div class="container">
				<div class="thumb-bg">
					<div class="row" v-if="order !== null">
						<div class="col-lg-12 p-0">
							<div id="list-view">
								<!-- Table Content Start -->
								<div class="table-content table-responsive">
									<table>
										<thead>
										<tr>
											<th class="product-name">Order ID</th>
											<th class="product-name">Product</th>
											<th class="product-name">Supplier</th>
											<th class="product-name">Attributes</th>
											<th class="product-quantity">Quantity</th>
											<th class="product-price">Price</th>
											<th class="product-subtotal">Total</th>
											<th class="product-name">Order Time</th>
											<th class="product-name">Status</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td class="product-name">
												<u>{{order.id}}</u>
											</td>
											<td class="product-name">
												<a @click="gotoProduct(order.product_breakdown.product)">
													{{order.product_breakdown.product.name}} <u>(View Store)</u>
												</a>
											</td>
											<td class="product-name">
												<a @click="$toasted.show('Coming Soon!')" v-if="order.product_breakdown.product.supplier !== null">
													{{order.product_breakdown.product.supplier.first_name}} <u>(View Profile)</u>
												</a>
											</td>
											<td class="product-name">
												<div v-for="attribute in order.product_breakdown.product_attributes">
													<span>{{attribute.product_attribute.name}}:</span>&nbsp;&nbsp;
													<span><b>{{attribute.value}}</b></span>
												</div>
											</td>
											<td class="product-quantity"><span class="amount">{{order.quantity}}</span></td>
											<td class="product-price">
													<span class="amount">
													{{order.unit_price | currency('৳', 0, { spaceBetweenAmountAndSymbol: true })}}
												</span>
											</td>
											<td class="product-price">
													<span class="amount">
														{{order.total_price | currency('৳', 0, { spaceBetweenAmountAndSymbol: true })}}
													</span>
											</td>
											<td class="product-name">{{order.order_initiate_time}}</td>
											<td class="product-name">
												<span v-if="order.status === 1"><b>Confirmed</b></span>
												<span v-else-if="order.status === 2"><b>Delivered</b></span>
												<span v-else-if="order.status === 3"><b>Received</b></span>
												<span v-else><b>Booked</b></span>
											</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-lg-12 p-0">
							<beautiful-chat
								:alwaysScrollToBottom="alwaysScrollToBottom"
								:close="closeChat"
								:colors="colors"
								:disableUserListToggle="true"
								:isAttached="true"
								:isOpen="isChatOpen"
								:messageList="messageList"
								:messageStyling="messageStyling"
								:newMessagesCount="newMessagesCount"
								:onMessageWasSent="onMessageWasSent"
								:open="openChat"
								:participants="participants"
								:showEmoji="false"
								:showFile="false"
								:showTypingIndicator="showTypingIndicator"
								:title="orderTitle"
								@edit="editMessage"
								@onType="handleOnType"
								@remove="removeMessage"
								@resend="resendMessage"
								attach
								style="z-index:9999; width: 100%;">
								<template v-slot:text-message-toolbox="scopedProps">
									<button @click.prevent="like(scopedProps.message.tsync_id)" v-if="!scopedProps.me && scopedProps.message.type==='text'">
										👍
									</button>
								</template>
								<template v-slot:text-message-body="scopedProps">
									<p class="sc-message--text-content" v-html="scopedProps.messageText"></p>
									<p :style="{color: scopedProps.messageColors.color}" class='sc-message--meta'
									   v-if="scopedProps.message.data.meta">
										{{scopedProps.message.data.meta}}</p>
									<p class='sc-message--edited' v-if="scopedProps.message.isEdited || scopedProps.message.liked">
										<template v-if="scopedProps.message.isEdited">✎</template>
										<template v-if="scopedProps.message.liked">👍</template>
									</p>
								</template>
							</beautiful-chat>
						</div>
					</div>
					<!-- Row End -->
				</div>
			</div>
			<!-- Container End -->
		</div>
		<!-- Product Thumbnail End -->
	</div>
	<!-- Shop Page End -->
</template>

<script>
	import {API_PRODUCT_CATEGORY_ATTRIBUTES, API_PRODUCT_BOOKING} from '@/base/config/base_apis';
	import axios from 'axios';
	import Lingallery from "@/components/core/photo/Lingallery";
	import {uuid} from 'vue-uuid';
	import messageHistory from './messageHistory'
	import chatParticipants from './chatProfiles'
	import availableColors from './colors'

	export default {
		name: "OrderDetail",
		components: {Lingallery},
		data: function () {
			return {
				userID: null,
				order: null,
				orderLoading: false,

				// Chat Start
				participants: chatParticipants,
				messageList: [],
				newMessagesCount: 0,
				isChatOpen: true,
				showTypingIndicator: '',
				colors: null,
				availableColors,
				chosenColor: null,
				alwaysScrollToBottom: true,
				messageStyling: true,
				userIsTyping: false,
				// Chat End
			}
		},
		methods: {
			handleTyping(text) {
				this.showTypingIndicator =
					text.length > 0
						? this.participants[this.participants.length - 1].id
						: ''
			},
			convertMessageIntoChat(message, isOld, options) {
				let author = 'other';
				try {
					author = options.userID === message.sent_by ? `me` : 'other';
				} catch (e) {
					console.log(e);
				}
				return {
					type: 'text',
					author: author,
					isFailed: false,
					isDelivered: isOld,
					tsync_id: message.tsync_id,
					data: {
						text: message.text
					}
				};
			},
			onMessageWasSent(message) {
				let messageData = {
					tsync_id: this.$uuid.v4(),
					text: message.data.text,
					chat_thread: this.order.thread,
					sent_by: this.userID,
				};
				this.messageList = [...this.messageList,
					this.convertMessageIntoChat(messageData, false, {
						userID: this.userID,
					})
				];
				this.$store.dispatch('chatStore/sendMessage', {
					token: "Token " + this.$store.getters['authStore/authToken'],
					payload: messageData,
				});
			},
			openChat() {
				this.isChatOpen = true;
				this.newMessagesCount = 0
			},
			closeChat() {
				this.isChatOpen = false
			},
			setColor(color) {
				this.colors = this.availableColors[color];
				this.chosenColor = color
			},
			handleOnType() {
				this.$root.$emit('onType');
				this.userIsTyping = true
			},
			successDelivery(message) {
				const m = this.messageList.find(m => m.tsync_id === message.tsync_id);
				m.isDelivered = true;
				m.isFailed = false;
				console.log(m)
			},
			failedDelivery(message) {
				const m = this.messageList.find(m => m.tsync_id === message.tsync_id);
				m.isFailed = true;
				m.isDelivered = false;
				console.log(m)
			},
			editMessage(message) {
				const m = this.messageList.find(m => m.tsync_id === message.tsync_id);
				m.isEdited = true;
				m.data.text = message.data.text;
			},
			removeMessage(message) {
				if (confirm('Delete?')) {
					const m = this.messageList.find(m => m.tsync_id === message.tsync_id);
					m.type = 'system';
					m.data.text = 'This message has been removed';
				}
			},
			resendMessage(message) {
				let messageData = {
					tsync_id: message.tsync_id,
					text: message.data.text,
					chat_thread: this.order.thread,
					sent_by: this.userID,
				};
				this.$store.dispatch('chatStore/sendMessage', {
					token: "Token " + this.$store.getters['authStore/authToken'],
					payload: messageData,
				});
			},
			like(id) {
				const m = this.messageList.findIndex(m => m.tsync_id === id);
				var msg = this.messageList[m];
				msg.liked = !msg.liked;
				this.$set(this.messageList, m, msg);
			}
		},
		computed: {
			selectedOrder: function () {
				return this.$store.getters['orderStore/getSelectedOrder'];
			},
			getMessages: function () {
				return this.$store.getters['chatStore/getMessages'];
			},
			deliveredMessage: function () {
				return this.$store.getters['chatStore/getDeliveredMessage'];
			},
			failedMessage: function () {
				return this.$store.getters['chatStore/getFailedMessage'];
			},
			orderTitle: function () {
				try {
					return 'Thread for booking id: ' + this.order.id + ', Product: ' + this.order.product_breakdown.product.name
				} catch (error) {
					return '';
				}
			},
			linkColor() {
				return this.chosenColor === 'dark'
					? this.colors.sentMessage.text
					: this.colors.launcher.bg
			},
			backgroundColor() {
				return this.chosenColor === 'dark' ? this.colors.messageList.bg : '#fff'
			}
		},
		watch: {
			selectedOrder: function (newValue, oldValue) {
				this.order = newValue;
				this.$store.dispatch('chatStore/downloadThreadMessage', {
					token: "Token " + this.$store.getters['authStore/authToken'],
					id: this.order.thread,
				});
			},
			getMessages: function (newValue, oldValue) {
				for (let index = 0; index < newValue.length; index++) {
					this.messageList.unshift(
						this.convertMessageIntoChat(newValue[index], true, {
							userID: this.userID,
						})
					);
				}
			},
			deliveredMessage: function (newValue, oldValue) {
				this.successDelivery(newValue);
			},
			failedMessage: function (newValue, oldValue) {
				this.failedDelivery(newValue);
			},
		},
		created() {
			this.setColor('red')
		},
		mounted() {
			this.userID = this.$store.getters['authStore/userKey'];
			this.$store.dispatch('orderStore/downloadSingleOrder', {
				token: "Token " + this.$store.getters['authStore/authToken'],
				id: this.$route.params.orderID,
			});
			this.messageList.forEach(x => x.liked = false);
		},
	}
</script>

<style lang="scss" scoped>
	.sub-sku-list {
		display: inline-flex;

		.sub-sku {
			display: inline-block;
			padding: 5px;
			min-width: 150px;
			border: 1px solid #e3e3e3;
			margin-right: 15px;

			&:hover {
				border: 1px solid #e62e04;
			}

			&.selected {
				border: 1px solid #34b141;
			}

			span {
				i {
					font-size: 24px;
				}
			}
		}
	}
</style>