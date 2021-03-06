import Vue from 'vue';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import VuePhoneNumberInput from 'vue-phone-number-input';
import '@/assets/truemart/truemart.scss';
import Global from '../views/Global.vue';
import router from './routes/router_signing';
import store from './stores/store_signing';
import VeeValidate from 'vee-validate';
import UUID from 'vue-uuid';
import Transitions from 'vue2-transitions';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import VueSession from 'vue-session';


Vue.config.productionTip = false;

Vue.use(VueSession, {persist: true});
Vue.use(UUID);
Vue.use(VeeValidate);
Vue.component('VueSlider', VueSlider);
Vue.component('VuePhoneNumberInput', VuePhoneNumberInput);
Vue.use(Transitions);

new Vue({
    router,
    store,
    render: h => h(Global)
}).$mount('#app');
