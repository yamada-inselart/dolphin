/*----------------------------------------------------
	* Observerクラス
----------------------------------------------------*/
export var Observer = (function() {
	function Observer() {
		this.listeners = {};
	}
	Observer.prototype = {
		'on': function(event, func) {
			if (! this.listeners[event] ) {
				this.listeners[event] = [];
			}
			this.listeners[event].push(func);
		},
		'off': function(event, func) {
			if (! this.listeners[event] ) {
				this.listeners[event] = [];
			}
			this.listeners[event].push(func);
		},
		'trigger': function(event, args) { // argsは、on('イベント名', function(args)){...} で取得できる。
			if(!this.listeners[event]) {
				return;
			}
			var ref = this.listeners[event];
			for (var i = 0, len = ref.length; i < len; i++) {
				var listener = ref[i];
				if(typeof listener === "function") listener(args);
			}
		}
	}
	return Observer;
})();