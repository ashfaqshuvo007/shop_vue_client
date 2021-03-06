
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

const vuetify = new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#e62e03',
				secondary: '#b0bec5',
				accent: '#8c9eff',
				error: '#f34e43',
			},
		},
	},
	icons: {
		iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
	},
});

export default vuetify;
