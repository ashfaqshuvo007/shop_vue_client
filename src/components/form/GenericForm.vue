<template>
	<form :class="formClass" style="overflow: hidden; margin-top: 20px;">
		<fieldset v-for="section in formConfig.sections">
			<legend v-if="section.title">{{section.title}}</legend>
			<div class="form-group d-md-flex align-items-md-center"
				 v-for="field in section.fields">
				<label class="control-label col-md-2" style="text-align: left; padding: 0;">
					<span class="require">*</span>{{field.label}}
				</label>
				<div class="col-md-10" style="padding: 0;" v-if="field.type === 'photo'">
					<file-pond
							:data-field="field.key"
							:files="files"
							accepted-file-types="image/jpeg, image/png"
							allow-multiple="true"
							label-idle="Drop photo here..."
							name="file"
							ref="pond"
							v-on:init="handleFilePondInit"/>
				</div>
				<div class="col-md-10" style="padding: 0;" v-if="field.type === 'phone'">
					<VuePhoneNumberInput :color="'red'"
										 :only-countries="['CN', 'BD']"
										 @update="onPhoneNumberUpdate"
										 data-vv-name="phone"
										 default-country-code="CN"
										 name="phone"
										 required
										 type="phone"
										 v-model="field.value"
										 v-validate="'validatePhone'"/>
					<small class="text-danger error position-absolute">
						{{ errors.first('phone') }}
					</small>
				</div>
				<div class="col-md-10" style="padding: 0;" v-else-if="field.type === 'radio'">
					<label class="radio-inline pr-4" v-for="option in field.options">
						<input :value="option.value" name="optradio"
							   type="radio"
							   v-model="field.value">{{option.text}}
					</label>
				</div>
				<div class="col-md-10" style="padding: 0;" v-else-if="field.type === 'textarea'">
                    <textarea :class="[
                            { 'form-control': !errors.has(field.key) && field.touched },
                            { 'form-control': true },
                            { 'border-danger': errors.has(field.key) }]"
							  :data-vv-as="field.name" :data-vv-name="field.key"
							  :placeholder="field.placeholder" :type="field.type"
							  v-model="field.value"
							  v-validate="field.validation"></textarea>
					<small class="text-danger error position-absolute">
						{{ errors.first(field.key) }}
					</small>
				</div>
				<div class="col-md-10" style="padding: 0;" v-else>
					<input :class="[
                                                { 'form-control': !errors.has(field.key) && field.touched },
                                                { 'form-control': true },
                                                { 'border-danger': errors.has(field.key) }]"
						   :data-vv-as="field.name" :data-vv-name="field.key"
						   :placeholder="field.placeholder" :type="field.type"
						   v-model="field.value"
						   v-validate="field.validation">
					<small class="text-danger error position-absolute">
						{{ errors.first(field.key) }}
					</small>
				</div>
			</div>
		</fieldset>
		<template v-if="showSubmit">
			<div class="float-md-right" v-if="submitAlign === 'right'">
				<slot name="agree"></slot>
				<input :disabled="disabledSubmit" :value="submitName"
					   @click="submitForm" class="return-customer-btn">
			</div>
			<template v-else>
				<slot name="agree"></slot>
				<input :disabled="disabledSubmit" :value="submitName"
					   @click="submitForm" class="return-customer-btn">
			</template>
		</template>
	</form>
</template>

<script>
    import {Validator} from 'vee-validate';

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
        name: "GenericForm",
        components: {
            FilePond,
        },
        props: {
            formClass: {
                type: String,
                default: ''
            },
            submitName: {
                type: String,
                default: ''
            },
            showSubmit: {
                type: Boolean,
                default: true,
            },
            disabledSubmit: {
                type: Boolean,
                default: false,
            },
            submitAlign: {
                type: String,
                default: 'left'
            },
            formConfig: {
                type: Object,
                default: function () {
                    return {
                        sections: [],
                    }
                }
            },
            extraValidation: {
                type: Function,
                default: function () {
                }
            },
            submitFormData: {
                type: Function,
                default: function () {
                }
            },
        },
        data: function () {
            return {
                files: [],
                validations: {
                    validPhone: {},
                },
            }
        },
        methods: {
            onPhoneNumberUpdate(data) {
                for (let index = 0; index < this.formConfig.sections.length; index++) {
                    let section = this.formConfig.sections[index];
                    for (let f_index = 0; f_index < section.fields.length; f_index++) {
                        let field = section.fields[f_index];
                        if (field.value === null || data.phoneNumber === null) continue;
                        if (field.type === 'phone' && field.value.replace(/ /g, "") === data.phoneNumber.replace(/ /g, "")) {
                            field['formattedNumber'] = data.formattedNumber;
                            this.validations.validPhone[field.key] = data.isValid;
                        }
                    }
                }
            },
            validate() {
                let _vm = this;
                return this.$validator.validateAll().then(isValid => {
                    let phoneFields = Object.keys(_vm.validations.validPhone);
                    let validPhones = true;
                    for(let index = 0; index < phoneFields.length; index++) {
                        validPhones = validPhones && _vm.validations.validPhone[phoneFields[index]];
					}
                    return isValid && validPhones;
                });
            },
            handleFilePondInit: function () {
            },
            getFormData: function () {
                let formData = {};
                for (let index = 0; index < this.formConfig.sections.length; index++) {
                    let section = this.formConfig.sections[index];
                    for (let f_index = 0; f_index < section.fields.length; f_index++) {
                        let field = section.fields[f_index];
                        if (field['type'] === 'phone') {
                            formData[field.key] = field['formattedNumber'];
                        } else {
                            formData[field.key] = field.value;
                        }
                    }
                }
                return formData;
            },
            submitForm: async function () {
                let isValid = await this.validate();
                if (isValid && this.extraValidation()) {
                    this.submitFormData(this.getFormData());
                }
            },
        },
        beforeMount() {
            let _vue = this;
            Validator.extend('validatePhone', {
                validate: function () {
                    let keys = Object.keys(_vue.validations.validPhone);
                    let isValidPhone = true;
                    for (let index = 0; index < keys.length; index++) {
                        isValidPhone = isValidPhone && _vue.validations.validPhone[keys[index]];
                    }
                    return isValidPhone;
                }
            });

            // File pond initialization

            let _vm = this;
            setOptions({
                maxFiles: 8,
                maxParallelUploads: 1,
                allowMultiple: true,
                allowImageResize: true,
                allowImageTransform: true,
                imagePreviewMaxHeight: 256,
                imageResizeTargetWidth: 512,
                imageResizeTargetHeight: 512,
                imageTransformOutputMimeType: 'image/jpeg',
                imageTransformOutputQuality: 100,
                imageTransformOutputQualityMode: 'always',
                imageResizeMode: 'contain',
                imageResizeUpscale: false,
                server: {
                    url: '/media-uploads',
                    timeout: 45000,
                    process: {
                        url: '/process/',
                        method: 'POST',
                        headers: {
                            "Authorization": "Token " + this.$store.getters['authStore/authToken'],
                        },
                        withCredentials: false,
                        onload: function (key) {
                        },
                        onerror: function (response) {
                        },
                        ondata: function (formData) {
                            formData.append('fp_upload_field', 'file');
                            return formData;
                        },
                    },
                    load: (source, load, error, progress, abort, headers) => {
                        let myRequest = new Request(source);
                        fetch(myRequest).then(function (response) {
                            response.blob().then(function (myBlob) {
                                load(myBlob);
                            });
                        });
                    },
                }
            });
        },
    }
</script>

<style scoped>

</style>