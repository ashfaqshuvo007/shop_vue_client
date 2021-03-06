<template>
    <!-- Main Wrapper Start Here -->
    <div class="wrapper">
        <HeaderMenu></HeaderMenu>
        <BreadCrumb :linkList="linkDepth"></BreadCrumb>
        <div class="log-in ptb-40 ptb-sm-30">
            <div class="container">
                <div class="row">
                    <!-- New Customer Start -->
                    <div class="col-md-6">
                        <div class="well mb-sm-30">
                            <div class="new-customer">
                                <h3 class="custom-title">new customer</h3>
                                <p class="mtb-10"><strong>Register</strong></p>
                                <p>By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made</p>
                                <a class="customer-btn" @click="() => $router.push({name: 'SignUp'})">continue</a>
                            </div>
                        </div>
                    </div>
                    <!-- New Customer End -->
                    <!-- Returning Customer Start -->
                    <div class="col-md-6">
                        <div class="well">
                            <div class="return-customer">
                                <h3 class="mb-10 custom-title">returnng customer</h3>
                                <p class="mb-10"><strong>I am a returning customer</strong></p>
                                <GenericForm :disabledSubmit="disabledSubmit"
                                             :extraValidation="extraValidation"
                                             :form-config="formConfig"
                                             :submitFormData="login"
                                             :submitName="'Login'">
                                    <template v-slot:agree>
                                        <p class="lost-password"><a href="forgot-password.html">Forgot password?</a></p>
                                    </template>
                                </GenericForm>
                                <div class="mt-3"
                                     v-show="showMessage">
                                    <span class="text-danger"
                                          v-show="showError">{{errorMessage}}</span>
                                    <span class="text-success"
                                          v-show="showSuccess">{{successMessage}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Returning Customer End -->
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
    import {API_LOGIN_URL} from '@/authentication/config/signing_apis';
    import axios from 'axios';

    export default {
        name: 'Login',
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
                    {text: 'Account', url: '#', active: true,},
                ],
                formConfig: {
                    sections: [
                        {
                            title: '',
                            fields: [
                                {
                                    key: 'username', name: 'Username', label: 'Email',
                                    placeholder: 'Email Address', type: 'email',
                                    value: 'shamilsakib@gmail.com', touched: false,
                                    validation: {
                                        required: true, min: 6
                                    },
                                },
                                {
                                    key: 'password', name: 'Password', label: 'Password',
                                    placeholder: 'Password', type: 'password',
                                    value: '123456', touched: false,
                                    validation: {
                                        required: true, min: 6
                                    },
                                },
                            ],
                        },
                    ],
                },
                disabledSubmit: false,
                showMessage: false,
                showSuccess: false,
                successMessage: null,
                showError: false,
                errorMessage: null,
            }
        },
        methods: {
            extraValidation: function () {
                this.showError = false;
                this.showSuccess = false;
                this.successMessage = null;
                this.errorMessage = null;

                return true;
            },
            login: function (data) {
                axios.post(API_LOGIN_URL, data)
                    .then(response => {
                        console.log(response.data);
                        this.showSuccess = true;
                        this.successMessage = 'You have been logged in successfully. Redirecting in seconds...';
                        this.$session.start();
                        this.$session.set('token', response.data.token);
                        this.$session.set('first_name', response.data.first_name);
                        this.$session.set('last_name', response.data.last_name);
                        this.$session.set('user_key', response.data.user);
                        this.$session.set('profile_info', response.data.profile_info);
                        this.$session.set('user_type', response.data.user_type);
                        this.$session.set('verification_status', response.data.verification_status);
                        setTimeout(function () {
                            window.location.href = '/application/';
                        }, 1500);
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
