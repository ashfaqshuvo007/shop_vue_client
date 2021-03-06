<template>
	<file-pond :allow-multiple="this.schema.multiple"
			   :data-field="'file'"
			   :files="files"
			   :label-idle="schema.label"
			   :name="inputKey"
			   accepted-file-types="image/jpeg, image/png"
			   ref="filePond"
			   v-on:init="handleFilePondInit"
			   v-on:updatefiles="handleUpdateFiles">
	</file-pond>
</template>

<script>
	import AbstractField from '../AbstractField'
	import {DOMAIN_NAME} from "@/config/server_config";
	import {uuid} from 'vue-uuid';

	// Import Vue FilePond
	import VueFilePond, {setOptions} from 'vue-filepond';
	// Import FilePond styles
	import 'filepond/dist/filepond.min.css';
	// Import image preview plugin styles
	import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
	// Import image preview and file type validation plugins
	import FilePondPluginImageResize from 'filepond-plugin-image-resize';
	import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
	import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
	// Import FilePond plugins
	// Please note that you need to install these plugins separately
	// Create component
	const FilePond = VueFilePond(FilePondPluginImageResize, FilePondPluginImageTransform,
		FilePondPluginFileValidateType, FilePondPluginImagePreview);

	export default {
		mixins: [AbstractField],
		components: {
			FilePond,
		},
		props: {
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
				initialLoad: true,
				files: [],
			}
		},
		computed: {
			inputType() {
				return this.schema.inputType
			},
		},
		watch: {
			value(newV) {
				if (this.initialLoad) {
					this.initialLoad = false;
					if (this.schema.multiple && newV !== null && newV !== undefined) {
						for (let index = 0; index < newV.length; index++) {
							if (newV[index].url === undefined || newV[index].url === null)
								continue;
							if (newV[index].url.indexOf('/') > -1) {
								this.files.push({
									source: newV[index].url,
									options: {
										type: 'local',
									}
								});
							}
						}
					} else if (newV !== null && newV !== undefined) {
						if (newV.url === undefined || newV.url === null)
							return;
						if (newV.url.indexOf('/') > -1)
							this.files.push({
								source: newV.url,
								options: {
									type: 'local',
								}
							});
					}
				}
			},
		},
		methods: {
			is_valid: function () {
				return true;
			},
			handleFilePondInit: function () {
			},
			handleUpdateFiles: function (data) {
				if (this.schema.multiple) {
					let updatedValue = [];
					for (let index = 0; index < data.length; index++) {
						let added = false;
						if (this.value !== null && this.value !== undefined) {
							for (let index1 = 0; index1 < this.value.length; index1++) {
								if (_.isEqual(this.value[index1].url, data[index].serverId)) {
									updatedValue.push(this.value[index1]);
									added = true;
									break;
								}
							}
						}
					}
					this.value = updatedValue;
				} else {
					if (this.value !== null && this.value !== undefined) {
						this.value['url'] = data.serverID;
					}
				}
			},
		},

		mounted() {
			let _vm = this;
			setOptions({
				maxFiles: 8,
				maxParallelUploads: 1,
				allowMultiple: this.schema.multiple === undefined ? false : this.schema.multiple,
				allowImageResize: true,
				allowImageTransform: true,
				imagePreviewMaxHeight: 256,
				imageResizeTargetWidth: 256,
				imageResizeTargetHeight: 256,
				imageTransformOutputMimeType: 'image/jpeg',
				imageTransformOutputQuality: 100,
				imageTransformOutputQualityMode: 'always',
				imageResizeMode: 'force',
				imageResizeUpscale: false,
				server: {
					url: DOMAIN_NAME + '/media-uploads',
					timeout: 45000,
					process: {
						url: '/process/',
						method: 'POST',
						headers: {
							"Authorization": "Token " + this.$store.getters['authStore/authToken'],
						},
						withCredentials: false,
						onload: function (key) {
							if (!_vm.schema.multiple)
								_vm.value = {
									tsync_id: uuid.v4(),
									token: key,
									url: key,
								};
							else {
								if (_vm.value === null || _vm.value === undefined)
									_vm.value = [];
								_vm.value.push({
									tsync_id: uuid.v4(),
									token: key,
									url: key,
								});
							}
						},
						onerror: function (response) {
						},
						ondata: function (formData) {
							formData.append('fp_upload_field', _vm.inputKey);
							return formData;
						},
					},
					load: (source, load, error, progress, abort, headers) => {
						let myRequest = new Request(DOMAIN_NAME + '/' + source);
						fetch(myRequest, {
							headers: {
								"Authorization": "Token " + this.$store.getters['authStore/authToken'],
							}
						}).then(function (response) {
							response.blob().then(function (myBlob) {
								load(myBlob);
							});
						});
					},
				}
			});
		},

		created() {
		}
	}
</script>

<style lang="scss">
	/* File pond css */
	.filepond--wrapper {
		width: 100%;
	}

	.filepond--item {
		width: calc(50% - .5em);
	}

	@media (min-width: 30em) {
		.filepond--item {
			width: calc(50% - .5em);
		}
	}

	@media (min-width: 50em) {
		.filepond--item {
			width: calc(25% - .5em);
		}
	}

	.filepond--root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
		Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
		'Segoe UI Symbol';
	}

	/* use a hand cursor intead of arrow for the action buttons */
	.filepond--file-action-button {
		cursor: pointer;
	}

	/* the text color of the drop label*/
	.filepond--drop-label {
		color: #555;
	}

	.filepond--drop-label label {
		font-size: 12px;
	}

	/* underline color for "Browse" button */
	.filepond--label-action {
		text-decoration-color: #aaa;
	}

	/* the background color of the filepond drop area */
	.filepond--panel-root {
		background-color: #ffffff !important;
	}

	/* the border radius of the drop area */
	.filepond--panel-root {
		border-radius: 5px;
	}

	/* the border radius of the file item */
	.filepond--item-panel {
		border-radius: 0.5em;
	}

	/* the background color of the file and file panel (used when dropping an image) */
	.filepond--item-panel {
		background-color: #555;
	}

	/* the background color of the drop circle */
	.filepond--drip-blob {
		background-color: #999;
	}

	/* the background color of the black action buttons */
	.filepond--file-action-button {
		background-color: rgba(0, 0, 0, 0.5);
	}

	/* the icon color of the black action buttons */
	.filepond--file-action-button {
		color: white;
	}

	/* the color of the focus ring */
	.filepond--file-action-button:hover,
	.filepond--file-action-button:focus {
		box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.9);
	}

	/* the text color of the file status and info labels */
	.filepond--file {
		color: white;
	}

	/* error state color */
	[data-filepond-item-state*='error'] .filepond--item-panel,
	[data-filepond-item-state*='invalid'] .filepond--item-panel {
		background-color: red;
	}

	[data-filepond-item-state='processing-complete'] .filepond--item-panel {
		background-color: green;
	}

	/* bordered drop area */
	.filepond--panel-root {
		background-color: transparent;
		border: 1px solid #ced4da;
	}

	.filepond--root {
		max-height: 512px;
		overflow-y: scroll;
	}
</style>
