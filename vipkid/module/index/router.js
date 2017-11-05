import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/h',
		component: resolve => require(['~components/h.vue'], resolve)
	}, {
		path: '/c',
		component: resolve => require(['~components/c.vue'], resolve)
	}
]

const router = new VueRouter({
	routes,
	// mode: 'history'
})

export default router
