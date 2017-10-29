import './index.sass'
import Vue from 'vue'
import App from '../../../vue-components/index.vue'

new Vue({
	render: h => h(App),
	created() {
		console.log(22)
	}
}).$mount('#app')