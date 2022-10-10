export let activeInstance: any = null
export let isUPdatingChildComponent: boolean = false 

export function setActiveInstance(vm:Component) {
	const prevActiveInstance = activeInstance
	activeInstance = vm 
	return () => {
		activeInstance = prevActiveInstance 
	}
}

export function initLifecycle (vm: Component) {
	const options = vm.$options
	
	// locate first non-abstract parent
	let parent = options.parent 
	if(parent && !options.abstract) {
		while(parent.$options.abstract && parent.$parent) {
			parent = parent.$parent 
		}
		parent.$children.push(vm) 
	}
	
	
}

export function lifecycleMixin (Vue: Class<Component>) {
	Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
		const vm: Component = this 
		const prevEl = vm.$el 
		const prevVnode = vm._vnode 
		// Vue.prototype__patch__ is injected in entry points
		// based on the rendering backend used
		if (!prevVnode) {
			// initial render
			vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /*readOnly*/)
		} else {
			// updates
			vm.$el = vm.__patch__(prevVnode, vnode) 
		}		
	}	 
	Vue.prototype.$forceUpate = function () {
		const vm: Component = this 
		if (vm._watcher) {
			vm._watcher.update()
		}
	}
	Vue.prototype.$destory = function () {
		const vm: Component = this 
		if(vm.isBeingDestoryed) {
			return 
		}
		callHook(vm, "beforeDestory")
		vm._isBeingDestoryed = true 
		// remove self from parent
		const parent = vm.$parent 
		if(parent && parent._isBeingDestoryed && )
	}
}

export function mountComponent () {
	
}

export function updateChildComponent () {
	
}

export function deactiveChildCompoent (vm: Component, direct?: boolean) {
	
}

export function callHook (vm: Component, hook: string) {
	pushTarget()
	const handlers = vm.$options[hook] 
	if (handlers) {
		for (let i = 0, j = handlers.length; i < j; i++) {
			try {
				handlers[i].call(vm) 
			} catch (e) { 
				handlerError(e, vm, `${hook} hook`)
			}
		}
	}
	if(vm._hasHookEvent) {
		vm.emit('hook:' + hook) 
	}
	popTarget()
}