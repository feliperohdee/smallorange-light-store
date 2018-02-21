const filter = require('lodash/filter');
const forEach = require('lodash/forEach');
const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');

module.exports = class Events {
	constructor() {		
		this._fns = [];
	}

	destroy() {
		this._fns = null;
	}

	subscribe(event, context, fn, once = false) {
		if (!isString(event)) {
			[event, context, fn] = [null, event, context];
		}

		if (isFunction(context)) {
			[context, fn] = [null, context];
		}

		if (event) {
			fn._event = event;
		}

		if (context) {
			fn._context = context;
		}

		if (once) {
			fn._once = once;
		}

		this._fns.push(fn);

		return () => this.unsubscribe(event, context, fn);
	}

	subscribeOnce(event, context, fn) {
		return this.subscribe(event, context, fn, true);
	}

	unsubscribe(event, context, fn) {
		if (!isString(event)) {
			[event, context, fn] = [null, event, context];
		}

		if (isFunction(context)) {
			[context, fn] = [null, context];
		}

		this._fns = filter(this._fns, _fn => {
			return (event ? _fn._event !== event : false) || (context ? _fn._context !== context : false) || (fn ? _fn !== fn : false);
		});
	}

	trigger(event, data) {
		forEach(this._fns, fn => {
			const canTrigger = fn._event ? (fn._event.replace(/:.*/g, '') === event) : true;

			if (canTrigger) {
				if (fn._once) {
					this.unsubscribe(fn._event, fn._context, fn);
				}

				fn(event, data);
			}
		});
	}
}
