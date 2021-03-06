import Vue from 'vue';
import '@/assets/truemart/truemart.scss';
import Global from '../views/Global.vue';
import router from './routes/router_application';
import store from './stores/store_application';
import UUID from 'vue-uuid';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import VueSession from 'vue-session';
import VueCarousel from 'vue-carousel';
import VeeValidate from "vee-validate";
import vuetify from '@/form_baker/plugins/vuetify/vuetify-config'
import '@/form_baker/plugins/vuetify/c_vuetify.scss'
import Toasted from 'vue-toasted';
import Vue2Filters from 'vue2-filters';

var SocialSharing = require('vue-social-sharing');

Vue.config.productionTip = false;

Vue.use(UUID);
Vue.use(VeeValidate);
Vue.component('VueSlider', VueSlider);
Vue.use(VueSession, {persist: true});
Vue.use(VueCarousel);
Vue.use(Vue2Filters);
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
