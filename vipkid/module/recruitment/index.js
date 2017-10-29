import Vue from 'vue'
import App from '~components/index2.vue'
import router from './router'

new Vue({
	router,
	render: h => h(App),
	created() {
		console.log(22)
	}
}).$mount('#app')