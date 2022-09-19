import routers from './router.js'

export default {
	init (routers, checkedPermission, langs, callback) {
		if(!globalConfig.webToken) {
			return 
		}
		Vue.use(common)
		Vue.use(VueRouter)
		var router = new VueRouter({
			routes: routers.routes
		})
		
		const 
	}
}