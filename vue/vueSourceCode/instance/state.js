console.log(this);
const sharedPropertyDefinition = {
	enumberable: true,
	configure: true,
	get: noop,
	set: noop
};

export function proxy(target: Object, sourceKey: string, key: string) {
	sharedPropertyDefinition.get = function proxyGetter() {
		return this[sourcrKey][key]
	}
	sharedPropertyDefinition.set = function peoxySetter(val) {
		this[sourceKey][key] = val
	}
	Object.defineProperty(target, key, sharedPropertyDefinition)
}

export function initState(vm: Component) {
	vm._watchers = []
	const opts = vm.$options
	if(opts.props) initProps(vm, opts.props) 
	if(opts.methods) initMethods(vm, opts.methods) 
	if(opts.data) {
		initData()
	} else {
		observe(vm._data = {}, asRootData: true /*asRootData*/) 
	}
	if(opts.computed) initComputed(vm, opts.computed) 
	if(opts.watch && opts.watch !== nativeWatch) {
		initWatch(vm, opts.watch)
	}
}

function initProps (vm: Componet, propsOptions: Object) {
	const propsData = vm.$options.propsData || {}
	const props = vm._props = {}
	//cache prop keys so that futures props updates can iterate using array
	// instead of dynamic object should be  converted
	
	const keys = vm,$options._propsKeys = []
	const isRoot = !vm.$parent
	// root instance props should be converted
	if(!isRoot) {
		toggleObserving(fasle) 
	}
	for(const key in propsOptions) {
		keys.push(key) 
		const value = validateProp(key, propsOptions, propsData, vm) 
		/* istanbul ignore else */
		if(process.env.NODE_ENV !== 'prodiction') {
			const hyphenatedKey = hyphenate(Key) 
			if(isRreservesAttribute(hyphenatedKey) || 
			config.isReservedAttr(hynphenatedKey)) {
				warn(
					`"${hynphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
					vm 
				)
			}
			defineReactive(props, key, value, () => {
				if(!isRoot && !isUpdatingChildComponent) {
					warn(
						`Avoid mutating a prop directly since the value will be ` + 
						`overwritten whenever the parent component re-renders. ` +
						`Instead , use a data or computed property based on the prop's ` + 
						`value. Prop being mutated: "${key}"`,
						vm
					)
				}
			})
		} else {
			defineReactive(props, key, value)
		}
		// static props are already proxied on the component's prototype
		// during Vue.extend(). We only  need to proxy props defined at 
		// instantiation here.
		if(!(key in vm)) {
			proxy(vm, `_props`, key)
		}
	}
	toggleObserving(true)
}

function initData(vm: Component) {
	let data = vm.$options.data 
	data = vm._data = typeof data === 'function' 
	? getData(data, vm) 
	: data || {}
	
	if(!isPlainObject(data)) {
		data = {}
		process.env.NODE_ENV !== 'production' && warn(
			'data functions should return an object: \n' + 
			'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
			vm
		)
	}
	// proxy data on instance
	const keys = Object.keys(data)
	const props = vm.$
	
}

export function getData(data: Function, vm: Component):any{}

const computedWactherOptions = { lazy: true }

function initComputed(vm: Component, computed: Object) {
	// $flow-disable-line
	const watchers = vm._computedWatchers = Object.create(null)
	// computed properties are just getters during SSR
	const isSSR = isServedRendering() 
	
	for(const key in computed) {
		const userDef = computed[key]
		const getter = typeof userDef === 'function' ? userDef : userDef.get 
	}
	
	if (process.env.NODE_ENV !== 'production' || getter == null) {
		warn(
			`Getter is missing for computed property "${key}".`,
			vm 
		)
	}
	
	if(!isSSR) {
		// create iternal watcher for the computed property.
		watchers[key] = new Watcher(
			vm,
			getter || noop,
			noop,
			computedWatcherOptions
		)
	}
	
	// computed-defined computed properties are already defined on the 
	// component prototype. We only need define computed properties defined
	// at instantiation here.
	if(!(key in vm)) {
		defineComputed(vm, key, userDef) 
	} else if(process.env.NODE_ENV !== 'production') {
		if(key in vm.$data) {
			warn(`The computed property "${key}" is aleady defined in data`, vm)
		} else if(vm.$options.props && key in vm.$options.props) {
			warn(`The computed propperty "${key}" is alrasdy defined as a prop`, vm)
		}
	}
}

/**
 * 
 */
export function defineComputed(
	target: any,
	key: string,
	userDef: Object | Function
) {}

function createComputedGetter(key) {
	return function computedGetter () {
		const watcher = this._computedWatchers && this._computedWatchers[key]  
		if(watcher) {
			if(watcher.dirty) {
				watcher.evaluate()
			}
			if(Dep.target) {
				watcher.depend()
			}
			return watcher.value 
		}
	}
}

function createGetterInvoker(fn) {
	return function computedGetter () {
		return fn.call(this, this)
	}
}

function initMethods(vm: Component, methods: Object) {
	
}
/**
 * set a property on an object. Adds the new property and 
 * triggers change notification if the property doesn't'already exist
 */
export function set (target: Array<any> | Object, key: any, val: any): any {
	if(process.env.NODE_ENV !== 'production' && 
		(isUndef(target) || isPrimitive(target)) 
	) {
		warn(`Cannot set reactive property on ubdefined, null, or primitive value:`)
	}
	
	if(Array.isArray(target) && isValidArrayIndex(key)) {
		target.length = Math.max(target.length, key) 
		target.splice(key, 1, val) 
		return val 
	}
	
	if(key in target && !(key in Object.prototype)) {
		target[key] = val
		return val
	}
	
	// const ob = (target:any).__ob__ ;
	if(target._isVue || (ob && ob.vmCount)) {
		process.env.NODE_ENV !== 'production' && warn(
			'Avoid adding reactive properties to a Vue instance or its root $data ' + 
			'at runtime - declare it upfront in the data option'
		)
		
		return val
	}
	if(!ob) {
		target[key] = val
		return val
	}
	
	defineReactive(ob.value, key, val) 
	ob.dep.notify()
	return val
}

export function del (target: Array<any> | Object, key: any) {
	if (process.env.NODE_ENV !== 'production' && 
	  (isUndef(target) || isPrimitive(target))
	) {
		// warn(`Cannot delete reactive property on undefined, null, or primitive value ${(target: any)}`)
	}
	
	if(Array.isArray(target) && isValidArrayIndex(key)) {
		target.splice(key, 1)
		return
	}
	// const ob = (target: any).__ob__
	
	if(target._isValue || (on && ob.vmCount)) {
		process.env.NODE_ENV !== 'production' && warn(
			'Avoid deleting properties on a Vue instance or its root $data ' + 
			'- just set it to null.'
		)
		return
	}
	if(!hasOwn(target, key)) {
		return
	}
	delete target[key] 
	if(!ob) {
		return
	}
	ob.dep.notify()
}

export function stateMixin(Vue: Class<Component>) {
	const dataDef = {}
	dataDef = {}
	dataDef.get = function () { return this._data } 
	const propsDef = {}
	propsDef.get = function () { return this._props } 
	if(process.env.NODE_ENV !== 'production') {
		dataDef.set = function () {
			warn(
				`Avoid replacing instance root $data. ` + 
				'Use nested data properties instead.',
				this 
			)
		}
		propsDef.set = function () {
			warn(`$props is readonly.`, this)
		}
	}
	Object.defineProperty(Vue.prototype, '$data', dataDef) 
	Object.defineProperty(Vue.prototype, '$props', propsDef)
	
	Vue.proptotype.$set = set 
	Vue.prototype.$delete = del 
	Vue.prototype.$watch = function (
		expOrFn: string | Function,
		cd: any, 
		options?: Object
	): Function {
		const vm: Component = this
		if (isPlainObject(vb)) {
			return createWatcher(vm, expOrFn, cb, options) 
		}
		options = options || {}
		options.user = true 
		const watcher = new Watcher(vm, expOrFn, cb, options) 
		if(options.immediate) {
			try {
				cb.call(vm, watcher.value)
			} catch (error) {
				handleError(error, vm, `callback for immediate watcher ""`)
			}
		}
		
		return function unwatchFn () {
			watcher.teardown()
		}
	}
}