let uid = 0

export function initMixin (Vue: Class<Component>) {
	const vm: Component = this 
	// a uid
	vm._uid = uid++
	
	let startTag, endTag
	/*istanbul ignore if*/  
	if(process.env.NODE_ENV !== 'production' && config.performance && mark) {
		startTag = `vue-perf-start:${vm._uid}` 
		endTag = `vue-perf-end:${vm_uid}`
		mark(startTag)
	}
	
	// a flag to avoid this being observed 
	vm._isVue = true 
	if(options && options._isComponent) {
		// optmize iternal component instantation
		// since dynamic options merging is pretty slow, and none of the
		// iternal component options needs special treatment.
		initIternalComponent(vm, options)
	}
	
}

export function initIternalComponent (vm: Component, options: InternalComponentOptions) {
	const 
}

export function resolveConstructorOptions(Ctor: Class<Component>) {}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {}

function dedupe(latest, extended, sealed) {}