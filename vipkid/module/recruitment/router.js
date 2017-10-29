import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/a',
		component: resolve => require(['~components/a.vue'], resolve)
	}, {
		path: '/b',
		component: resolve => require(['~components/b.vue'], resolve)
	}
]

const router = new VueRouter({
	routes,
	// mode: 'history'
})

export default router
