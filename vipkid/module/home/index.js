import Vue from 'vue'
import App from '~components/index.vue'
import router from './router'

new Vue({
	router,
	render: h => h(App),
	created() {
		console.log(44422)
	}
}).$mount('#app')