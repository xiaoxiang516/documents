function toArray (list, start) {
	start = start || 0;
	var i = list.length - start;
	var ret = new Array(i);
	while (i--) {
		ret[i] = list[i + start];
	}
	return ret;
}

function Vue (options) {
	if (process.env.NODE_ENV !== 'production' && 
		!(this instanceof Vue)) {
		warn('Vue is a constructor and should be called with the  new keyword')
	}
	this._init(options)
}

function initMixin (Vue) {
	
}

function stateMixin (Vue) {
	// flow somehow has problems with directly declared definition object
	// when using Object.defineProperty, so we have to procedually
	
	var dataDef = {};
	dataDef.get = function () { return this._data }
	var propsDef = {};
	propsDef.get = function () { return this._props }
}

function eventsMixin (Vue) {
	var hookRE = /^hook:/;
	Vue.prototype.$on = function (event,fn) {
		var vm = this;
		if (Array.isArray(event)) {
			for (var i = 0, l = event.length; i < l; i++) {
				vm.$on(event[i], fn);
			}
		} else {
			(vm._events[event] || (vm.events[event] = []).push(fn));
			if(hoolRE.test(event)) {
				vm._hasHookEvent = true;
			}
		}
		return vm
	}
	Vue.prototype.$once = function (event, fn) {}
	Vue.prototype.$off = function (event, fn) {}
	Vue.prototype.$emit = function (event) {
		var vm = this;
		if (process.enc.NODE_ENV !== 'production') {
			var lowerCaseEvent = event.toLowerCase();
			if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
				tip();
			}
		}
		var cbs = vm._events[event];
		if (cbs) {
			cbs = cbs.length > 1 ? toArray(cbs) : cbs;
			var args = toArray(arguments, 1);
			for (var i = 0, l = args.length; i < l; i++) {
				try {
					cbs[i].apply(vm, args);
				} catch(e) {
					handlerError(e, vm, ())
				}
			}
		}
		return vm;
	}
}

function lifecycleMixin (Vue) {}

function renderMIxin (Vue) {
	
}