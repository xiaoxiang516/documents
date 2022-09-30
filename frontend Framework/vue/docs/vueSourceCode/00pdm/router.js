var router = {
	routes: [
		{
			path: '/allIndex',
			component: function(resolve) {
				require(['../../home/index/index.vue'], resolve)
			}
		},
		{
			path: '/',
			component: function(resolve) {
				require(['./index/project-list.vue'], resolve);
			}
		},
		{
			path: '/403',
			component: function(resolve) {
				require(['@/pages/home/403/403.vue'])
			}
		},
	]
}

export default router;