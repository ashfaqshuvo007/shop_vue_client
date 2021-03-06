<template>
    <!-- Main Wrapper Start Here -->
    <div class="wrapper">
        <HeaderMenu></HeaderMenu>
        <BreadCrumb :linkList="linkDepth"></BreadCrumb>
        <div class="register-account ptb-40 ptb-sm-30">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="register-title">
                            <h3 class="mb-10">REGISTER ACCOUNT</h3>
                            <p class="mb-10">If you already have an account with us, please login at the login page.</p>
                        </div>
                    </div>
                </div>
                <!-- Row End -->
                <div class="row">
                    <div class="col-sm-12">
                        <GenericForm :disabledSubmit="disabledSubmit"
                                     :extraValidation="extraValidation"
                                     :form-class="'form-register'"
                                     :form-config="formConfig"
                                     :submitAlign="'right'"
                                     :submitFormData="register"
                                     :submitName="'Register'">
                            <template v-slot:agree>
                                <small class="text-danger error position-absolute" v-show="!agreed & submitted">
                                    Agree with terms first
                                </small>
                                <span class="d-inline-flex">I have read and agree to the &nbsp;
                                    <a class="agree" href="#"><b>Privacy Policy</b></a>
                                </span>&nbsp;&nbsp;
                                <input class="d-inline-flex" type="checkbox" v-model="agreed">&nbsp;&nbsp;
                            </template>
                        </GenericForm>
                        <div class="float-md-right mt-3"
                             v-show="showMessage">
                            <span class="text-danger mt-3"
                                  v-show="showError">{{errorMessage}}</span>
                            <span class="text-success mt-3"
                                  v-show="showSuccess">{{successMessage}}</span>
                            <span>&nbsp;&nbsp;Returning customer?&nbsp;&nbsp;</span>
                            <input @click="goToLogin" class="return-customer-btn" value="Please Login Now !!!">
                        </div>
                    </div>
                </div>
                <!-- Row End -->
            </div>
            <!-- Container End -->
        </div>
        <FooterMenu></FooterMenu>
    </div>
    <!-- Main Wrapper End Here -->
</template>

<script>
    import HeaderMenu from "@/components/menu/HeaderMenu";
    import BreadCrumb from "@/components/global/BreadCrumb";
    import FooterMenu from "@/components/footer/FooterMenu";
    import GenericForm from "@/components/form/GenericForm";
    import {API_REGISTER_URL} from '@/authentication/config/signing_apis';
    import axios from 'axios';

    export default {
        name: 'SignUp',
        components: {
            GenericForm,
            FooterMenu,
            BreadCrumb,
            HeaderMenu,
        },
        props: {},
        data: function () {
            return {
                linkDepth: [
                    {text: 'Home', url: '#', active: false,},
                    {text: 'Sign up', url: '#', active: true,},
                ],
                agreed: false,
                disabledSubmit: false,
                submitted: false,
                showMessage: false,
                showSuccess: false,
                successMessage: null,
                showError: false,
                errorMessage: null,
                formConfig: {
                    sections: [
                        {
                            title: 'Your Personal Details',
                            fields: [
                                {
                                    key: 'company_name', name: 'Company Name', label: 'Company Name',
                                    placeholder: 'Company Name', type: 'text',
                                    value: null, touched: false,
                                    validation: {
                                        required: true, min: 3
                                    },
                                },
                                {
                                    key: 'first_name', name: 'First Name', label: 'First Name',
                                    placeholder: 'First Name', type: 'text',
                                    value: null, touched: false,
                                    validation: {
                                        required: true, min: 3
                                    },
                                },
                                {
                                    key: 'last_name', name: 'Last Name', label: 'Last Name',
                                    placeholder: 'Last Name', type: 'text',
                                    value: null, touched: false,
                                    validation: {
                                        required: true, min: 3
                                    },
                                },
                                {
                                    key: 'email', name: 'Email Address', label: 'Email Address',
                                    placeholder: 'Enter you email address here...', type: 'email',
                                    value: null, touched: false,
                                    validation: {
                                        required: true, min: 3
                                    },
                                },
                                {
                                    key: 'contact_number', name: 'Contact Number', label: 'Contact Number',
                                    placeholder: 'Contact Number', type: 'phone',
                                    value: null, touched: false,
                                    validation: {
                                        required: true, min: 3
                                    },
                                },
                                {
                                    key: 'address', name: 'Address', label: 'Address',
                                    placeholder: 'Address', type: 'textarea',
                                    value: null, touched: false,
                                    validation: {
                                        required: true, min: 3
                                    },
                                },
                            ],
                        },
                        {
                            title: 'Your Password',
                            fields: [
                                {
                                    key: 'password', name: 'Password', label: 'Password',
                                    placeholder: 'Password', type: 'password',
                                    value: null, touched: false,
                                    validation: {
                                        required: true, min: 6
                                    },
                                },
                                {
                                    key: 'confirm_password', name: 'Confirm Password', label: 'Confirm Password',
                                    placeholder: 'Confirm Password', type: 'password',
                                    value: null, touched: false,
                                    validation: {
                                        required: true, min: 6
                                    },
                                },
                            ],
                        },
                        {
                            title: 'Why you are here?',
                            fields: [
                                {
                                    key: 'user_type', name: 'User Type', label: 'I am a',
                                    placeholder: 'I am a', type: 'radio',
                                    options: [
                                        {text: 'Buyer', value: 2},
                                        {text: 'Supplier', value: 3},
                                        {text: 'Both', value: 4},
                                    ],
                                    value: null, touched: false,
                                },
                            ],
                        },
                    ],
                },
            }
        },
        methods: {
            goToLogin: function () {
                this.$router.push({name: 'Login'});
            },
            extraValidation: function () {
                this.submitted = true;
                this.showError = false;
                this.showSuccess = false;
                this.successMessage = null;
                this.errorMessage = null;

                return this.agreed;
            },
            register: function (data) {
                this.disabledSubmit = true;
                data['username'] = data['email'];
                axios.post(API_REGISTER_URL, data)
                    .then(response => {
                        console.log(response.data);
                        this.showSuccess = true;
                        this.successMessage = 'You have been registered successfully. Please login now!'
                    })
                    .catch(error => {
                        try {
                            let keys = Object.keys(error.response.data);
                            let message = '';
                            for (let index = 0; index < keys.length; index++) {
                                message += error.response.data[keys[index]] + '.';
                            }
                            this.errorMessage = message;
                        } catch (e) {
                            this.errorMessage = this.response.statusText;
                        } finally {
                            this.showError = true;
                        }
                    })
                    .finally(() => {
                        this.showMessage = true;
                        this.disabledSubmit = false;
                    });
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
