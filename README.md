## Sample

		const store = new Store();

		store.set({}, 'actionName');
		store.get() === store.s;
		const unsubscribe = store.subscribe(event: string /*optional*/, context: object /*optional*/, callback: function);
		const unsubscribe = store.subscribeOnce(event: string /*optional*/, context: object /*optional*/, callback: function);

		// async subscriptions are notified as soon all other subscriptions (not async) have been notified, useful to listen store on react components
		const unsubscribe = store.subscribeAsync(event: string /*optional*/, context: object /*optional*/, callback: function);
		const unsubscribe = store.subscribeAsyncOnce(event: string /*optional*/, context: object /*optional*/, callback: function);
		
		store.unsubscribe(event: string /*optional*/, context: object /*optional*/, callback: function);
