/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Debug; });
/*----------------------------------------------------
    * デバッグ
----------------------------------------------------*/
var Debug = {
    'state': 0,
    'create': 0,
    'setDebug': function() {
        var self = this;
        self.state = 1;
        document.addEventListener('DOMContentLoaded', function() {
            self.createFixLog();
        });        
    },
    'log': function(m) {
        if(this.state) {
        console.log(m);
        this.fLog(m);
        }
    },
    'fLog': function(m) {
        var p = document.createElement('p');
        p.innerHTML = m;
        this.FixLog.insertBefore(p, this.FixLog.firstChild);
    },
    'createFixLog': function() {
        if(this.create === 0) {
            this.FixLog = document.createElement('div');
            this.FixLog.innerHTML = '';
            this.FixLog.id = 'js-fixlog';
            this.FixLog.className = 'fixlog';

            this.FixLog.style.backgroundColor = '#EFF7FA';
            this.FixLog.style.borderTop = '1px solid #66c4e2';
            this.FixLog.style.position = 'fixed';
            this.FixLog.style.bottom = '0';
            this.FixLog.style.left = '0';
            this.FixLog.style.height = '150px';
            this.FixLog.style.width = '100%';
            this.FixLog.style.overflow = 'scroll';

            document.body.appendChild(this.FixLog);
            this.create = 1;
        }        	
    }
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return U; });
/*----------------------------------------------------
	* 汎用関数
----------------------------------------------------*/
var U = {
	/*----------------------------------------------------
		ajax
	----------------------------------------------------*/
	'ajax': function(url, opts) {
		function callback(resolve, reject) {
			var XHR = new XMLHttpRequest();

			XHR.open('GET', url, true);
			XHR.responseType = opts.dataType;
			XHR.send(null);
			XHR.onreadystatechange = function() {
				if (XHR.readyState == 4) { // 通信の完了時
				if (XHR.status == 200) { // 通信の成功時
					var res = XHR.response;
					if(typeof res === 'string') {
						res = JSON.parse(res);
					}
					opts.success(res);
					resolve();
				} else {
					opts.error();
					reject();
				}
				}
			}		
		}
		return new Promise(callback);
	},
	/*----------------------------------------------------
		再生時間を計算
	----------------------------------------------------*/
	'getCurrentTime': function(frame, interval) {
		var current = Math.round((frame * interval) / 10) / 100;
		return current;
	},
	'convertTime': function(ms) {
		var h = String(Math.floor(ms / 3600000) + 100).substring(1);
		var m = String(Math.floor((ms - h * 3600000)/60000)+ 100).substring(1);
		var s = String(Math.round((ms - h * 3600000 - m * 60000)/1000)+ 100).substring(1);
		return h+':'+m+':'+s;
	},
	'convertDate': function(date) {
		if(date instanceof Date === false) {
			return date;
		}
		var Y = date.getFullYear(),
			m = ('0' + (date.getMonth() + 1)).slice(-2),
			d = ('0' + date.getDay()).slice(-2),
			h = ('0' + date.getHours()).slice(-2),
			min = ('0' + date.getMinutes()).slice(-2),
			s = ('0' + date.getSeconds()).slice(-2);
		return Y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
	},
	/*----------------------------------------------------
		fpsをミリ秒に変換
	----------------------------------------------------*/
	'fps_to_ms': function(fps) {
		var ms = 1e3 / fps;
		return ms;
	},
	'getSelector': function(selector) {
		if(selector.indexOf('#') !== -1) {
			return document.getElementById(selector.split('#')[1]);
		} else {
			return document.getElementById(selector);
		}
	},
	/*----------------------------------------------------
		セレクタの位置を取得
	----------------------------------------------------*/
	'getOffsetTop': function(selector) {
		var rect = selector.getBoundingClientRect();
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return (rect.top + scrollTop);
	},
	/*----------------------------------------------------
		クッキーの取得
	----------------------------------------------------*/
	'getCookie': function (name) {
		var result = null;

		var cookieName = name + '=';
		var allcookies = document.cookie;

		var position = allcookies.indexOf( cookieName );
		if( position != -1 )
		{
			var startIndex = position + cookieName.length;

			var endIndex = allcookies.indexOf( ';', startIndex );
			if( endIndex == -1 )
			{
				endIndex = allcookies.length;
			}

			result = decodeURIComponent(
				allcookies.substring( startIndex, endIndex ) );
		}

		return result;
	},
	/*----------------------------------------------------
		ゼロパディング変換
	----------------------------------------------------*/
	'zeroPadding': function(index) {
		var new_index = index;
		if(index < 10 ) { // indexが10以下なら
			new_index = '0' + index;
		}
		return new_index;
	}
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfill__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__debug__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utility__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__observer__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dolphin_analysis__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dolphin_debugger__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dolphin_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dolphin_player__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dolphin_scroller__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dolphin_360__ = __webpack_require__(18);
/*----------------------------------------------------

Dolphin ver.1.5.0	
	
Copyright © 2018 inselart. All rights reserved.

This source code or any portion thereof must not be 
reproduced or used in any manner whatsoever.

----------------------------------------------------

Native Promise Only
v0.8.1 (c) Kyle Simpson
MIT License: http://getify.mit-license.org

----------------------------------------------------*/

/* Promise Polyfill */














/*----------------------------------------------------
        * Polyfill
----------------------------------------------------*/
Object(__WEBPACK_IMPORTED_MODULE_0__polyfill__["a" /* Polyfill */])();

/*----------------------------------------------------
        * Debug
----------------------------------------------------*/
//Debug.setDebug();

/*----------------------------------------------------
            * Dolphin 本体
----------------------------------------------------*/
window.Dolphin = (function() {

    function Dolphin(selector, opts, debug) {
        var opts = opts || {},
            debug = debug || 0;
        this.initialize(selector, opts, debug);
    }
    Dolphin.prototype = {
        'initialize': function(selector, opts, debug) {
            var self = this;
            self.version = '1.6.0';
            self.$_selector = __WEBPACK_IMPORTED_MODULE_2__utility__["a" /* U */].getSelector(selector);

            if(self.$_selector.tagName === 'IMG') {
                self.target = self.$_selector;
            } else {
                self.target = self.$_selector.children[0];
                self.$_selector.style.display = 'inline-block';
                self.$_selector.style.position = 'relative';
            }

            self.debug = debug;
            self.Data = {};
            self.Obs = new __WEBPACK_IMPORTED_MODULE_3__observer__["a" /* Observer */]();

            if(opts.ga) {
                new __WEBPACK_IMPORTED_MODULE_4__dolphin_analysis__["a" /* DolphinAnalysis */](self);
            }
            
            self.DolphinScroller = new __WEBPACK_IMPORTED_MODULE_8__dolphin_scroller__["a" /* DolphinScroller */](self);
            self.DolphinPlayer = new __WEBPACK_IMPORTED_MODULE_7__dolphin_player__["a" /* DolphinPlayer */](self);
            self.DolphinLoader = new __WEBPACK_IMPORTED_MODULE_6__dolphin_loader__["a" /* DolphinLoader */](self);
            self.Dolphin360 = new __WEBPACK_IMPORTED_MODULE_9__dolphin_360__["a" /* Dolphin360 */](self);

            if(__WEBPACK_IMPORTED_MODULE_1__debug__["a" /* Debug */].state || self.debug) {
                self.DolphinDebugger = new __WEBPACK_IMPORTED_MODULE_5__dolphin_debugger__["a" /* DolphinDebugger */](self);
            }

            self.setPlayer(opts);
        },
        'on': function(eventType, callback) {
            switch (eventType) {
                case 'animationStart':
                    this.Obs.on('start', callback.bind(this));
                    break;
                case 'animationStop':
                    this.Obs.on('stop', callback.bind(this));
                    break;
                case 'animationEnd':
                    this.Obs.on('end', callback.bind(this));
                    break;
                case 'animationRestart':
                    this.Obs.on('restart', callback.bind(this));
                    break;
                case 'animationNow':
                    this.Obs.on('now', callback.bind(this));
                    break;
                case 'ajaxLoad':
                    this.Obs.on('ajaxLoad', callback.bind(this));
                    break;
                case 'ajaxEnd':
                    this.Obs.on('ajaxEnd', callback.bind(this));
                    break;
                case 'ajaxError':
                    this.Obs.on('ajaxError', callback.bind(this));
                    break;
                default:
                    console.log('error');
            }
        },
        'load': function(dir, event, opts) {
            var event = event || 'default',
                    opts = opts || {};
            this.DolphinLoader.load(dir, event, opts);
            return this;
        },
        'unload': function(event) {
            this.DolphinLoader.unload(event);
        },
        'getEventState': function(event) {
            if(!this.Data[event]) {
                return -2;
            }
            return this.Data[event].state;
        },
        'getPlayerState': function() {
            return this.DolphinPlayer.state;
        },
        'setPlayer': function(opts) {
            this.DolphinPlayer.setOpts(opts);
        },
        'getPlayerOpt': function(key) {
            return this.DolphinPlayer.getOpt(key);
        },
        'animateStart': function(event, opts) {
            var opts = opts || {};
            this.DolphinPlayer.setOpts(opts);
            this.DolphinPlayer.animateStart(event);
        },
        'animateStop': function() {
            this.DolphinPlayer.animateStop();
        },
        'animatePause': function() {
            this.DolphinPlayer.animatePause();
        },
        'changeFrame': function(event, frame) {
            this.DolphinPlayer.changeFrame(event, frame);
        },
        'scrollPlay': function(dir, event, opts) {
            var event = event || 'scroll',
                    opts = opts || {};
            this.DolphinScroller.scrollPlay(dir, event, opts)			
        },
        'scrollPlayMV': function(dir01, dir02, event, opts) {
            var event = event || 'mv',
                    opts = opts || {};
            this.DolphinScroller.scrollPlayMV(dir01, dir02, event, opts);
        },
        'scrollPlaying': function(event, re) {
            if(!this.Data[event]) {
                return false;
            }
            if(!re) {
                re = 0;
            }
            this.DolphinScroller.scrollPlaying(event, re);
        },
        'set360': function(dir) {
            this.Dolphin360.load(dir);
        }
    }
    return Dolphin;
})();

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate, module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Polyfill; });
var Polyfill = function() {
  /*----------------------------------------------------
    * Polyfill */
  !function (t, n, e) {
    n[t] = n[t] || e(),
    "undefined" != typeof module && module.exports
        ? module.exports = n[t]
        : "function" == typeof define && __webpack_require__(9) && define(function () {
            return n[t]
        })
    }(
        "Promise",
        "undefined" != typeof global
            ? global
            : this,
        function () {
            "use strict";
            function t(t, n) {
                l.add(t, n),
                h || (h = y(l.drain))
            }
            function n(t) {
                var n,
                    e = typeof t;
                return null == t || "object" != e && "function" != e || (n = t.then),
                "function" == typeof n && n
            }
            function e() {
                for (var t = 0; t < this.chain.length; t++) 
                    o(
                        this,
                        1 === this.state
                            ? this.chain[t].success
                            : this.chain[t].failure,
                        this.chain[t]
                    );
                this.chain.length = 0
            }
            function o(t, e, o) {
                var r,
                    i;
                try {
                    !1 === e
                        ? o.reject(t.msg)
                        : (
                            r = !0 === e
                                ? t.msg
                                : e.call(void 0, t.msg)
                        ) === o.promise
                            ? o.reject(TypeError("Promise-chain cycle"))
                            : (i = n(r))
                                ? i.call(r, o.resolve, o.reject)
                                : o.resolve(r)
                } catch (t) {
                    o.reject(t)
                }
            }
            function r(o) {
                var c,
                    u = this;
                if (!u.triggered) {
                    u.triggered = !0,
                    u.def && (u = u.def);
                    try {
                        (c = n(o))
                            ? t(function () {
                                var t = new f(u);
                                try {
                                    c.call(o, function () {
                                        r.apply(t, arguments)
                                    }, function () {
                                        i.apply(t, arguments)
                                    })
                                } catch (n) {
                                    i.call(t, n)
                                }
                            })
                            : (u.msg = o, u.state = 1, u.chain.length > 0 && t(e, u))
                    } catch (t) {
                        i.call(new f(u), t)
                    }
                }
            }
            function i(n) {
                var o = this;
                o.triggered || (
                    o.triggered = !0,
                    o.def && (o = o.def),
                    o.msg       = n,
                    o.state     = 2,
                    o.chain.length > 0 && t(e, o)
                )
            }
            function c(t, n, e, o) {
                for (var r = 0; r < n.length; r++) 
                    !function (r) {
                        t
                            .resolve(n[r])
                            .then(function (t) {
                                e(r, t)
                            }, o)
                    }
                (r)
            }
            function f(t) {
                this.def       = t,
                this.triggered = !1
            }
            function u(t) {
                this.promise   = t,
                this.state     = 0,
                this.triggered = !1,
                this.chain     = [],
                this.msg       = void 0
            }
            function a(n) {
                if ("function" != typeof n) 
                    throw TypeError("Not a function");
                if (0 !== this.__NPO__) 
                    throw TypeError("Not a promise");
                this.__NPO__ = 1;
                var o = new u(this);
                this.then  = function (n, r) {
                    var i = {
                        failure: "function" == typeof r && r,
                        success: "function" != typeof n || n
                    };
                    return i.promise = new this.constructor(function (t, n) {
                        if ("function" != typeof t || "function" != typeof n) 
                            throw TypeError("Not a function");
                        i.resolve = t,
                        i.reject  = n
                    }),
                    o
                        .chain
                        .push(i),
                    0 !== o.state && t(e, o),
                    i.promise
                },
                this.catch = function (t) {
                    return this.then(void 0, t)
                };
                try {
                    n.call(void 0, function (t) {
                        r.call(o, t)
                    }, function (t) {
                        i.call(o, t)
                    })
                } catch (t) {
                    i.call(o, t)
                }
            }
            var s,
                h,
                l,
                p = Object.prototype.toString,
                y = "undefined" != typeof setImmediate
                    ? function (t) {
                        return setImmediate(t)
                    }
                    : setTimeout;
            try {
                Object.defineProperty({}, "x", {}),
                s = function (t, n, e, o) {
                    return Object.defineProperty(t, n, {
                        configurable: !1 !== o,
                        value       : e,
                        writable    : !0
                    })
                }
            } catch (t) {
                s = function (t, n, e) {
                    return t[n] = e,
                    t
                }
            }
            l = function () {
                function t(t, n) {
                    this.fn   = t,
                    this.self = n,
                    this.next = void 0
                }
                var n,
                    e,
                    o;
                return {
                    add  : function (r, i) {
                        o            = new t(r, i),
                        e
                            ? e.next = o
                            : n      = o,
                        e            = o,
                        o            = void 0
                    },
                    drain: function () {
                        var t = n;
                        for (n = e = h = void 0; t;) 
                            t
                                .fn
                                .call(t.self),
                            t = t.next
                    }
                }
            }();
            var d = s({}, "constructor", a, !1);
            return a.prototype = d,
            s(d, "__NPO__", 0, !1),
            s(a, "resolve", function (t) {
                var n = this;
                return t && "object" == typeof t && 1 === t.__NPO__
                    ? t
                    : new n(function (n, e) {
                        if ("function" != typeof n || "function" != typeof e) 
                            throw TypeError("Not a function");
                        n(t)
                    })
            }),
            s(a, "reject", function (t) {
                return new this(function (n, e) {
                    if ("function" != typeof n || "function" != typeof e) 
                        throw TypeError("Not a function");
                    e(t)
                })
            }),
            s(a, "all", function (t) {
                var n = this;
                return "[object Array]" != p.call(t)
                    ? n.reject(TypeError("Not an array"))
                    : 0 === t.length
                        ? n.resolve([])
                        : new n(function (e, o) {
                            if ("function" != typeof e || "function" != typeof o) 
                                throw TypeError("Not a function");
                            var r = t.length,
                                i = Array(r),
                                f = 0;
                            c(n, t, function (t, n) {
                                i[t] = n,
                                ++f === r && e(i)
                            }, o)
                        })
            }),
            s(a, "race", function (t) {
                var n = this;
                return "[object Array]" != p.call(t)
                    ? n.reject(TypeError("Not an array"))
                    : new n(function (e, o) {
                        if ("function" != typeof e || "function" != typeof o) 
                            throw TypeError("Not a function");
                        c(n, t, function (t, n) {
                            e(n)
                        }, o)
                    })
            }),
            a
        }
    );
  
    /* Object.assign Polyfill */
    if (typeof Object.assign != 'function') {
      (function () {
        Object.assign = function (target) {
          'use strict';
          if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
          }
          var output = Object(target);
          for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
              for (var nextKey in source) {
                if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
                  output[nextKey] = source[nextKey];
                }
              }
            }
          }
          return output;
        };
      })();
    }
  
    /* requestAnimationFrame Polyfill */
    window.requestAnimationFrame = (function() {
      return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function(f) { return window.setTimeout(f); };
    }());
    window.cancelAnimationFrame = (function() {
      return window.cancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            function(f) { return window.clearTimeout(f); };
    })();
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2), __webpack_require__(5).setImmediate, __webpack_require__(8)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(6);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observer; });
/*----------------------------------------------------
	* Observerクラス
----------------------------------------------------*/
var Observer = (function() {
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

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DolphinAnalysis; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__debug__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility__ = __webpack_require__(1);



var DolphinAnalysis = (function() {

    /*----------------------------------------------------
        * 解析 各動画
    ----------------------------------------------------*/
    function DolphinAnalysis(Dolphin) {
        this.initialize(Dolphin);
    }
    DolphinAnalysis.prototype = {
        'initialize': function(Dolphin) {
            this.Dolphin = Dolphin;
            this.state = 0;
            this.handleEvents();
        },
        'handleEvents': function() {
            var self = this,
                Dolphin = this.Dolphin,
                $_selector = this.Dolphin.$_selector,
                $_selectorName = $_selector.id,
                isLoad = 0;

            Dolphin.on('animationStart', function(e) {
                if(!window.ga) {
                    return false;
                }

                if(e.event === 'preLoad') { //仮動画の場合
                    isLoad = 1;
                } else if(isLoad === 1) {
                    isLoad = 0;
                    return false;
                }
                if(self.state === 0) {
                    if(window.gtag) {
                        gtag('event', 'play', {
                            'event_category' : 'Dolphin',
                            'event_label' : $_selectorName,
                        });
                    } else {
                        ga('send', 'event', 'Dolphin', 'play', $_selectorName);
                    }
                    self.state = 1;
                }
            });
            Dolphin.on('animationStop', function() {
                if(!window.ga) {
                    return false;
                }

                if(isLoad === 1) {
                    return false;
                }
                if(self.state === 1) {
                    if(window.gtag) {
                        gtag('event', 'pause', {
                            'event_category' : 'Dolphin',
                            'event_label' : $_selectorName,
                        });
                    } else {
                        ga('send', 'event', 'Dolphin', 'pause', $_selectorName);
                    }
                    self.state = 0;
                }
            });

        }
    }
    return DolphinAnalysis;
})();


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DolphinDebugger; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__debug__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility__ = __webpack_require__(1);
/*----------------------------------------------------
    * DolphinDebugger
----------------------------------------------------*/



var DolphinDebugger = (function() {
    function DolphinDebugger(Dolphin) {
        this.initialize(Dolphin);
    };
    DolphinDebugger.prototype = {
        'initialize': function(Dolphin) {
            this.Dolphin = Dolphin;
            this.loader;
            this.result;
            this.createResult();
            this.createPB(); // ProgressBar
            this.debug();
        },
        'debug': function() {
            var self = this,
                    dolphin = this.Dolphin;

            dolphin.on('ajaxLoad', function(e) {
                var percent = Math.floor((e.index / e.data.Opts.files) * 100),
                        html = '読み込み中： ' + percent + '％ <br>';
                        html += e.url + 'の読み込みが完了しました。';
                self.resultRender(html);
                self.PBRender(percent);
            });

            dolphin.on('ajaxEnd', function(e) {
                var html = '読み込みに成功しました。<br>moaiが利用可能です。<br><br>';
                        html += '読み込み時間: ' + e.data.load.total + 'ms<br>';
                        html += '1フレーム平均: ' + Math.round((e.data.load.total / e.data.Opts.frames) * 100 ) / 100 + 'ms<br>';
                self.resultRender(html);
            });

            dolphin.on('ajaxError', function(e) {
                var html = 'aJax通信に失敗しました。';
                self.resultRender(html);
            });

        },
        'createResult': function() {
            var element = this.Dolphin.$_selector;
            this.result = document.createElement('div');
            this.setResultAttr();
            this.setResultCSS();

            element.parentNode.insertBefore(this.result, element.nextSibling);
        },
        'setResultAttr': function() {
            this.result.innerHTML = '動画読み込み中です。';
            this.result.id = 'js-result';
            this.result.className = 'result';
        },
        'setResultCSS': function() {
            this.result.style.backgroundColor = '#EFF7FA';
            this.result.style.textAlign = 'center';
            this.result.style.padding = '15px';
            this.result.style.minHeight = '105px';			
            this.result.style.width = '100%';
        },
        'resultRender': function(html) {
            this.result.innerHTML = html;
        },
        'createPB': function() {
            var element = this.Dolphin.$_selector;
            this.PB = document.createElement('div');
            this.setPBCSS();

            element.parentNode.insertBefore(this.PB, element.nextSibling);
        },
        'setPBCSS': function() {
            this.PB.style.backgroundColor = '#66c4e2';
            this.PB.style.transition = '0.25s';
            this.PB.style.height = '3px';
            this.PB.style.width = '0%';
        },
        'PBRender': function(percent) {
            this.PB.style.width = percent + '%';
        }
    }
    return DolphinDebugger;
})();

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DolphinLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__debug__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__access__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dolphin_data__ = __webpack_require__(15);
/*----------------------------------------------------
    * DolphinLoader
----------------------------------------------------*/




   

var DolphinLoader = (function() {
    function DolphinLoader(Dolphin) {
        this.initialize(Dolphin);
    }
    DolphinLoader.prototype = {
        'initialize': function(Dolphin) {
            this.Dolphin = Dolphin,
            this.Player = this.Dolphin.DolphinPlayer,
            this.Scoller = this.Dolphin.DolphinScoller,
            this.Data = this.Dolphin.Data;
            this.state = 0;
        },
        'load': function(dir, event, opts) {
            var self = this;

            if(self.Data[event]) {
                self.Dolphin.animateStart(event);
                return false;
            }
            if(__WEBPACK_IMPORTED_MODULE_2__access__["a" /* Access */].timeOut === 1) {
                return false;
            } 

            self.Data[event] = new __WEBPACK_IMPORTED_MODULE_3__dolphin_data__["a" /* DolphinData */]();

            self.state = event;
            self.setOpts(dir, event, opts);
            self.ajaxInit(dir + '/dolphin.json', event, opts)
                    .then(function() {
                        self.ajax(dir, event);
                    });			
        },
        'unload': function(event) {
            if(this.Data[event]) {
                delete this.Data[event];
            }
        },
        'setOpts': function(dir, event, opts) {
            var data = this.Data[event];
            data.setOpts(opts);
        },
        'ajaxInit': function(url, event) {
            var self = this,
                    data = this.Data[event];

            var success = function(response) {
                data.setOpts(response);
                data.setLoadStart();
            };
            var error = function(jqXHR, textStatus, errorThrown) {
                self.Dolphin.Obs.trigger('ajaxError', {});
            };
            var d = __WEBPACK_IMPORTED_MODULE_1__utility__["a" /* U */].ajax(url, {
                dataType:'json',
                success: success,
                error: error
            });
            return d;
        },
        'ajax': function(dir, event) {
            var Current, //ajax通信後のpromiseの一時保存用変数
                    files = this.Data[event].Opts.files;
            for(var i=1;i<=files;i++) {
                if(i === 1) { // 一回目のとき
                    Current = this.ajaxLoad(dir + '/data' + __WEBPACK_IMPORTED_MODULE_1__utility__["a" /* U */].zeroPadding(i) + '.json', event)();
                } else { //それ以外
                    Current = Current.then(this.ajaxLoad(dir + '/data' + __WEBPACK_IMPORTED_MODULE_1__utility__["a" /* U */].zeroPadding(i) + '.json', event));
                }				
            }
            Current.then(this.ajaxComplete.bind(this, event)());
        },
        'ajaxLoad': function(url, event) {
            var self = this,
                    data = self.Data[event];
            var success = function(response) {
                Array.prototype.push.apply(data.Data, response);
                data.setLoad();
                self.Dolphin.Obs.trigger('ajaxLoad', {
                    'index': data.load.count,
                    'url': url,
                    'event': event,
                    'data': self.Data[event],
                    'response': response,
                });
            };
            var error = function() {
                self.Dolphin.Obs.trigger('ajaxError', {});
            };
            return function(response) {
                var d = __WEBPACK_IMPORTED_MODULE_1__utility__["a" /* U */].ajax(url, {
                    dataType:'json',
                    success: success,
                    error: error
                });
                return d;
            }
        },
        'ajaxComplete': function(event) {
            var self = this,
                    data = this.Data[event];
            return function() {
                self.state = 0;
                data.setLoadEnd();
                self.Dolphin.Obs.trigger('ajaxEnd', {
                    'event': event,
                    'data': self.Data[event],
                });
            }
        }
    }
    return DolphinLoader;
})();

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Access; });
var Access = (function() {
    function Access() {
        this.initialize();
    }
    Access.prototype = {
        'initialize': function() {
            this.accessTime = new Date();
            this.timeOut = 0;

            this.handleEvents();
        },
        'handleEvents': function() {
            var self = this;
            window.addEventListener('load', function() {
                self.PageSpeedCheck();
            });
        },
        'PageSpeedCheck': function() {
            var DataLoadTime = new Date() - this.accessTime;
            if(15000 <  DataLoadTime) {
                this.timeOut = 1;
            }
        }
    }
    return new Access();
})();

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DolphinData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__debug__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility__ = __webpack_require__(1);
/*----------------------------------------------------
    * DolphinData
----------------------------------------------------*/



var DolphinData = (function() {
    function DolphinData() {
        this.initialize();
    }
    DolphinData.prototype = {
        'initialize': function() {
            this.Data = [];
            this.Opts = {
                'files': 0,
                'frames': 0,
                'duration': 0,
                'fps': 15,
                'timing': 0,
            };
            this.load = {
                'count': 0,
                'start': 0,
                'current': 0,
                'end': 0,
                'total': 0,
            };
            this.error = {
                'state': 0, //-1: エラーカウント待機中, 0:エラーなし, 1:エラー発生
                'count': 0,
            };
            this.state = -1; //-1:未読み込み, 0:読み込み中, 1:再生可能, 2:読み込み完了
        },
        'setOpts': function(opts) {
            this.Opts = Object.assign(this.Opts, opts);
            this.setDuration();
        },
        'setDuration': function() {
            var frames = this.Opts.frames - 1,
                    interval = __WEBPACK_IMPORTED_MODULE_1__utility__["a" /* U */].fps_to_ms(this.Opts.fps);
            this.Opts.duration = __WEBPACK_IMPORTED_MODULE_1__utility__["a" /* U */].getCurrentTime(frames, interval);
        },
        'setLoadStart': function() {
            this.load.start = new Date();
            this.state = 0; //0:読み込み中,
        },
        'setLoad': function() {
            this.load.count++;
            this.load.current = new Date();
            if(this.state !== 0) {
                return false;
            }
            if(this.Opts.timing !== 0 && this.Opts.timing <= this.load.count) {
                this.state = 1; //1:再生可能
            }
        },
        'setLoadEnd': function() {
            this.load.end = new Date();
            this.load.total = this.load.end - this.load.start;
            this.state = 2; //2:読み込み完了
        },
        'pushError': function() {
            if(this.error.state === 0) { //エラーカウント待機中でなければ、エラーをカウント
                this.error.count++;
            } else if(this.error.state === -1) {
                return;
            }
            if(2 <= this.error.count) { //エラーカウントが一定以上でエラー発生
                this.error.count = 0;
                this.error.state = 2;
            } else {
                this.error.state = -1; //エラーカウント待機中
            }			
        },
        'resetError': function() {
            this.error.state = 0;
        }
    }
    return DolphinData;
})();

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DolphinPlayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__debug__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility__ = __webpack_require__(1);
/*----------------------------------------------------
    * DolphinPlayer
----------------------------------------------------*/



var DolphinPlayer = (function() {

    function PlayerController(Player) {
        this.initialize(Player);
    }
    PlayerController.prototype = {
        'initialize': function(Player) {
            this.Player = Player;
            this.Dolphin = this.Player.Dolphin;

            this.createController();
            this.handleEvents();
        },
        'handleEvents': function() {
            var self = this;

            self.ctrlElement.onclick = function(e) {
                self.clickEvent(e);
            }
        },
        'clickEvent': function(e) {
            var X = e.offsetX,
                event = this.Player.state || this.Player.preState;
            if(!event) {
                return false;
            }
            console.log(this.Player.Data[event].Opts.frames);
        },
        'createController': function() {
            this.ctrlElement = document.createElement('div');
            this.ctrlBar = document.createElement('div');

            this.setCSS();

            this.ctrlElement.appendChild(this.ctrlBar);
            this.Dolphin.$_selector.appendChild(this.ctrlElement);
        },
        'setCSS': function() {
            this.ctrlElement.style.backgroundColor = '#eee';
            this.ctrlElement.style.position = 'absolute';
            this.ctrlElement.style.bottom = '0';
            this.ctrlElement.style.left = '0';
            this.ctrlElement.style.height = '15px';
            this.ctrlElement.style.width = '100%';
            this.ctrlElement.style.zIndex = '99';

            this.ctrlBar.style.backgroundColor = '#66c4e2';
            this.ctrlBar.style.position = 'absolute';
            this.ctrlBar.style.top = '0';
            this.ctrlBar.style.left = '0';
            this.ctrlBar.style.height = '5px';
            this.ctrlBar.style.width = '0%';
            this.ctrlBar.style.zIndex = '99';
            this.ctrlBar.style.transition = '0.05s';

        },
        'renderCtrlBar': function(eventData, frame) {
            var frames = eventData.Opts.frames,
                framePercentage = this.getPercentage(frames - 1, frame);

            this.ctrlBar.style.width = framePercentage + '%';
        },
        'getPercentage': function(a, b) {
            return Math.round( (b / a) * 100 );
        }
    }

    function DolphinPlayer(Dolphin) {
        this.initialize(Dolphin);
    }
    DolphinPlayer.prototype = {
        'initialize': function(Dolphin) {
            this.Dolphin = Dolphin,
            this.Data = this.Dolphin.Data;
            this.Opts = {
                'autoplay': 0,
                'loop': 0,
                'speed': 1,
            };
            this.frame = 0,
            this.timer,
            this.timer_lastTime,
            this.interval,
            this.play_time = 0,
            this.state = 0,
            this.preState = 0;

            this.loadEvents();

            this.PlayerController = new PlayerController(this);
        },
        'loadEvents': function() {
            var self = this;
            self.Dolphin.on('ajaxLoad', function(e) {
                self.autoplay(e.event);
            });
            self.Dolphin.on('ajaxEnd', function(e) {
                self.autoplay(e.event);
            });
        },
        'setOpts': function(opts) {
            Object.assign(this.Opts, opts);
        },
        'getOpt': function(key) {
            if(this.Opts.hasOwnProperty(key)) {
                return this.Opts[key];
            } else {
                return false;
            }
        },
        'animateStart': function(event) {
            if(!this.Data[event] || this.state === event) { //イベントが同じ場合
                return false;
            }
            if(this.Data[event].state === 0 || this.Data[event].state === -1 ) { //読み込みがまだなら
                return false;
            }
            if(this.state === 'preLoad' || this.preState === event) { // フレームの維持
                this.animatePause();
            } else {
                this.animateStop();
            }			
            this.interval = __WEBPACK_IMPORTED_MODULE_1__utility__["a" /* U */].fps_to_ms(this.Data[event].Opts.fps * this.Opts.speed);
            this.timer = requestAnimationFrame(this.animateTimer.bind(this, event));
            this.state = event;
            this.Dolphin.Obs.trigger('start', {
                'event': event,
                'data': this.Data[event]
            });
        },
        'animateStop': function() {
            this.clearTimer();
            this.preState = this.state; //直前のイベントを保存
            this.state = 0;
            this.frame = 0;
        },
        'animatePause': function() {
            this.clearTimer();
            this.preState = this.state; //直前のイベントを保存
            this.state = 0;
        },
        'animateTimer': function(event, t) { // tは経過時間
            var t = t || new Date(),
                time;

            if(this.timer_lastTime) {
                time = t - this.timer_lastTime;
            } else {				
                time = this.interval;
            }

            this.timer = requestAnimationFrame(this.animateTimer.bind(this, event));

            if(time < this.interval) {
                return false;
            }

            this.timer_lastTime = t;

            if( !this.error_check(this.Data[event]) ) {
                return;
            }
            this.render_frame(this.Data[event]);
            this.PlayerController.renderCtrlBar(this.Data[event], this.frame);
            this.Dolphin.Obs.trigger('now', {
                'current': this.interval * this.frame,
                'event': event,
                'frame': this.frame,
                'data': this.Data[event]
            });
            this.increment_frame(event, time);

            this.play_time += time;
        },
        'changeFrame': function(event, frame) {
            var data = this.Data[event];
            if(data.Opts.frames <= frame) {
               return false; 
            }
            this.frame = frame;
            this.render_frame(data);
            this.preState = event;
        },
        'clearTimer': function() {
            if(this.timer) {
                cancelAnimationFrame(this.timer);
                this.timer_lastTime = null;
                this.Dolphin.Obs.trigger('stop', {
                    'event': this.state,
                    'data': this.Data[this.state]
                });
            }
        },
        'error_check': function(data) {
            if(data.error.state === 2) { //エラーが一定以上で強制停止
                if(data.state === 2) { //読み込み完了でエラーをリセット
                    data.resetError();
                }
                return false;
            }
            if(!data.Data[this.frame]) { //次フレームがまだなら、エラーをカウント
                data.pushError();
                return false;
            }
            data.resetError();
            return true;
        },
        'render_frame': function(data) {
            this.Dolphin.target.setAttribute('src', data.Data[this.frame].d);
        },
        'increment_frame': function(event, time) {
            this.frame++;
            if(this.Data[event].Opts.frames <= this.frame) {
                this.frame = 0;
                if(!this.Opts.loop) {
                    this.animateStop();
                    this.Dolphin.Obs.trigger('end', {
                        'event': event,
                        'data': this.Data[event]
                    });
                } else {
                    this.Dolphin.Obs.trigger('restart', {
                        'event': event,
                        'data': this.Data[event]
                    });
                }
            }
        },
        'autoplay': function(event) {
            if(this.Opts.autoplay === 1 || this.Dolphin.DolphinScroller.visible === 1) {
                this.animateStart(event);
            }
        }
    }
    return DolphinPlayer;
})();

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DolphinScroller; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__debug__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility__ = __webpack_require__(1);
/*----------------------------------------------------
    * DolphinScroller
----------------------------------------------------*/



var DolphinScroller = (function() {

    var Scroll;

    document.addEventListener('DOMContentLoaded', function() {
        Scroll = document.documentElement.scrollTop || document.body.scrollTop;
    });
    window.addEventListener('scroll', function() {
        Scroll = document.documentElement.scrollTop || document.body.scrollTop;
    });

    function DolphinScroller(Dolphin) {
        this.initialize(Dolphin);
    }
    DolphinScroller.prototype = {
        'initialize': function(Dolphin) {
            this.Dolphin = Dolphin,
            this.Data = this.Dolphin.Data;

            this.loadState = 0,
            this.event = '',
            this.visible = 0;

            this.setOpts();
            this.handleEvents();
        },
        'handleEvents': function() {
            var self = this;
            
            window.addEventListener('load', function() {
                self.setOpts();
            });
            window.addEventListener('resize', function() {
                self.setOpts();
            });			
        },
        'setOpts': function() {
            this.wH = window.innerHeight,
            this.sH = this.Dolphin.$_selector.clientHeight,
            this.position = __WEBPACK_IMPORTED_MODULE_1__utility__["a" /* U */].getOffsetTop(this.Dolphin.$_selector),
            this.loadStartPosition = this.position - this.wH - (this.wH / 2),
            this.loadEndPosition = this.position + this.sH + (this.wH / 2),
            this.animeStartPosition = this.position - (this.wH - (this.sH * 0.4)),
            this.animeEndPosition = this.position + (this.sH - (this.sH * 0.4));
        },
        'scrollPlay': function(dir, event, opts) {
            var self = this;
            self.Dolphin.setPlayer({
                'autoplay': 0,
            });
            self.scrollEvent(dir, event, opts);
            window.addEventListener('scroll', function() {
                self.scrollEvent(dir, event, opts);
            });
        },
        'scrollEvent': function(dir, event, opts) {
            if(this.loadState === 0) {
                this.load(dir, event, opts);
            }
            this.toggle(event);
        },
        'load': function(dir, event, opts) {
            if(this.loadStartPosition < Scroll && Scroll < this.loadEndPosition) {
                this.Dolphin.load(dir, event, opts);
                this.loadState = 1;
            }
        },
        'toggle': function(event) {
            var eventState = this.Dolphin.getEventState(event),
                    preLoadState = this.Dolphin.getEventState('preLoad');
            if(this.animeStartPosition < Scroll && Scroll < this.animeEndPosition) {
                if(this.visible === 0) {
                    if(preLoadState != -2 && eventState <= 0) {
                        this.Dolphin.animateStart('preLoad');
                    } else {
                        this.Dolphin.animateStart(event);
                    }
                    this.visible = 1;
                }
            } else {
                if(this.visible === 1) {
                    if(this.Dolphin.getPlayerOpt('loop') === 1) {
                        this.Dolphin.animatePause();
                    } else {
                        this.Dolphin.animateStop();
                    }                    
                    this.visible = 0;
                }
            }
        },
        'scrollPlayMV': function(dir01, dir02, event, opts) {
            var self = this;
            self.Dolphin.setPlayer({
            'autoplay': 1,
            });
            self.Dolphin.load(dir01, 'preLoad', {
            'timing': 2,
            });
            window.addEventListener('load', function() {
            if(self.Dolphin.getEventState('preLoad') === 2) {
                self.scrollPlay(dir02, event, opts);
            } else {
                self.Dolphin.on('ajaxEnd', function(e) {
                if(e.event === 'preLoad') {	
                    if(e.data.load.total < 5000) {
                        self.scrollPlay(dir02, event, opts);
                    } else {
                        self.scrollPlay(dir01, event, opts);
                    }       
                }
                });
            }
            });
        },
        'scrollPlaying': function(event, re) {
            var self = this,
                    flag = 0,
                    frame = 0,
                    frames = self.Data[event].Opts.frames,
                    data = self.Data[event].Data,
                    prev = Scroll;

            function setFlag() {
                flag = 1;
                setTimeout(function() {
                    flag = 0;
                }, 40);
            }
            function render_frame() {
                console.log(frame)
                self.Dolphin.target.setAttribute('src', data[frame].d);
            }
            function increment_frame() {
                if(!re || prev < Scroll) {
                    frame++;
                    if(frame === frames) {
                        frame = 0;
                    }
                } else if(prev > Scroll) {
                    frame--;
                    if(frame < 0) {
                        frame = frames - 1;
                    }
                }
                prev = Scroll;
            }

            window.addEventListener('scroll', function() {
                if(flag === 1) {
                    return false;
                }
                if(self.Dolphin.getPlayerState()) {
                    return false;
                }
                if(self.Dolphin.getEventState(event) !== 2){
                    return false;
                }
                setFlag();
                render_frame();
                increment_frame();
            });

        }
    }
    return DolphinScroller;
})();

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dolphin360; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__debug__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility__ = __webpack_require__(1);
/*----------------------------------------------------
    * DolphinScroller
----------------------------------------------------*/



var Dolphin360 = (function() {

    function Dolphin360(Dolphin) {
        this.initialize(Dolphin);
    }
    Dolphin360.prototype = {
        'initialize': function(Dolphin) {
            if( window.ontouchstart === null ){
				this.touch = 1;
			}else{
			   this.touch = 0;
            }
            
            this.Dolphin = Dolphin,
            this.Data = this.Dolphin.Data;
            this.$_touchBox = this.Dolphin.$_selector;

            this.loadState = 0,
            this.event = '',

            this.pageX;
			this.pageY;
			this.prevX;
            this.prevY;
            
			this.frame = 0;

			this.tf = 0;

		},
		'setHtml': function() {
			var layerElement = document.createElement('div');
			this.$_touchBox.appendChild(layerElement);

			this.$_touchBox.style.cursor = 'pointer';
			this.$_touchBox.style.position = 'relative';
			layerElement.style.position = 'absolute';
			layerElement.style.top = '0';
			layerElement.style.left = '0';
			layerElement.style.height = '100%';
			layerElement.style.width = '100%';
		},
        'load': function(dir) {
            var self = this;
            self.Dolphin.setPlayer({
                'autoplay': 0,
			});
			self.setHtml();
			self.Dolphin.load(dir, '360', {});
			self.Dolphin.on('ajaxEnd', function(e) {
				self.Events();
			});
        },
		'Events': function() {
			if(!this.touch) {				
				this.mouseEvents();
			} else {
				this.touchEvents();
			}
		},
		'mouseEvents': function() {
			var self = this,
				md = 0;

			self.$_touchBox.addEventListener('mousedown', function(e) {
                md = 1;
			});
			self.$_touchBox.addEventListener('mouseup', function(e) {
                md = 0;
			});
			self.$_touchBox.addEventListener('mouseleave', function(e) {
                md = 0;
			});
			self.$_touchBox.addEventListener('mousemove', function(e) {
                if(md === 1) {
					self.updateXY(e);
                    self.moveX();
				}
			});
		},
		'touchEvents': function() {
			var self = this;

			self.$_touchBox.addEventListener('touchstart', function(e) {
				self.updateXY(e);
			});
			self.$_touchBox.addEventListener('touchmove', function(e) {
				self.updateXY(e);
				self.moveX();
			});
			self.$_touchBox.addEventListener('touchend', function(e) {
				self.updateXY(e);
			});
		},
		'updateXY': function(event) {
			var X = event.offsetX || event.changedTouches[0].pageX,
				Y = event.offsetY || event.changedTouches[0].pageY;

			this.prevX = this.pageX || X;
			this.prevY = this.pageY || Y;
			this.pageX = X;
			this.pageY = Y;
		},
		'moveX': function() {
			var self = this;
			if(this.tf === 1) {
				return false;
			}

			var move = this.pageX - this.prevX,
                frame,
                frameMax = this.Data['360'].Opts.frames - 1;
			if(move > 0) {
				frame = this.frame + 1;
			} else {
				frame = this.frame - 1;
			}
			if(frame < 0) {
				frame = frameMax;
			} else if(frameMax < frame) {
				frame = 0;
            }

			this.frame = frame;
			this.Dolphin.target.setAttribute('src', this.Data['360'].Data[this.frame].d);

			self.tf = 1;
			setTimeout(function() {
				self.tf = 0;
			}, 15);
		}
    }
    return Dolphin360;
})();

/***/ })
/******/ ]);