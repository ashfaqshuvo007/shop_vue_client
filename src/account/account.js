import Vue from 'vue';
import '@/assets/truemart/truemart.scss';
import Global from '../views/Global.vue';
import router from './routes/router_account';
import store from './stores/store_account';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import VuePhoneNumberInput from 'vue-phone-number-input';
import VeeValidate from 'vee-validate';
import UUID from 'vue-uuid';
import 'vue-slider-component/theme/default.css';
import VueSession from 'vue-session';
import vuetify from '@/form_baker/plugins/vuetify/vuetify-config'
import '@/form_baker/plugins/vuetify/c_vuetify.scss'
import Toasted from 'vue-toasted';
import Vue2Filters from 'vue2-filters';
import Chat from '@/easy_chat'

var SocialSharing = require('vue-social-sharing');


Vue.config.productionTip = false;

Vue.use(VueSession, {persist: true});
Vue.use(UUID);
Vue.use(VeeValidate);
Vue.component('VuePhoneNumberInput', VuePhoneNumberInput);
Vue.use(Vue2Filters);
Vue.use(Chat);
Vue.use(Toasted, {
    type : 'info',
    duration: 3000,
    className: ['toast-red',]
});
Vue.use(SocialSharing);

new Vue({
    router,
    store,
    vuetify: vuetify,
    render: h => h(Global)
}).$mount('#app');
