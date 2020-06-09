	/*----------------------------------------------------
	Dolphin ver.1.4.0	
		
	Copyright © 2018 inselart. All rights reserved.

	This source code or any portion thereof must not be 
	reproduced or used in any manner whatsoever.
	----------------------------------------------------*/

	var Dolphin = (function() {

		/*----------------------------------------------------
			* Polyfill */

		/* Promise Polyfill */

		/*! Native Promise Only
		    v0.8.1 (c) Kyle Simpson
		    MIT License: http://getify.mit-license.org
		*/
		!function(t,n,e){n[t]=n[t]||e(),"undefined"!=typeof module&&module.exports?module.exports=n[t]:"function"==typeof define&&define.amd&&define(function(){return n[t]})}("Promise","undefined"!=typeof global?global:this,function(){"use strict";function t(t,n){l.add(t,n),h||(h=y(l.drain))}function n(t){var n,e=typeof t;return null==t||"object"!=e&&"function"!=e||(n=t.then),"function"==typeof n&&n}function e(){for(var t=0;t<this.chain.length;t++)o(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function o(t,e,o){var r,i;try{!1===e?o.reject(t.msg):(r=!0===e?t.msg:e.call(void 0,t.msg))===o.promise?o.reject(TypeError("Promise-chain cycle")):(i=n(r))?i.call(r,o.resolve,o.reject):o.resolve(r)}catch(t){o.reject(t)}}function r(o){var c,u=this;if(!u.triggered){u.triggered=!0,u.def&&(u=u.def);try{(c=n(o))?t(function(){var t=new f(u);try{c.call(o,function(){r.apply(t,arguments)},function(){i.apply(t,arguments)})}catch(n){i.call(t,n)}}):(u.msg=o,u.state=1,u.chain.length>0&&t(e,u))}catch(t){i.call(new f(u),t)}}}function i(n){var o=this;o.triggered||(o.triggered=!0,o.def&&(o=o.def),o.msg=n,o.state=2,o.chain.length>0&&t(e,o))}function c(t,n,e,o){for(var r=0;r<n.length;r++)!function(r){t.resolve(n[r]).then(function(t){e(r,t)},o)}(r)}function f(t){this.def=t,this.triggered=!1}function u(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function a(n){if("function"!=typeof n)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var o=new u(this);this.then=function(n,r){var i={success:"function"!=typeof n||n,failure:"function"==typeof r&&r};return i.promise=new this.constructor(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");i.resolve=t,i.reject=n}),o.chain.push(i),0!==o.state&&t(e,o),i.promise},this.catch=function(t){return this.then(void 0,t)};try{n.call(void 0,function(t){r.call(o,t)},function(t){i.call(o,t)})}catch(t){i.call(o,t)}}var s,h,l,p=Object.prototype.toString,y="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),s=function(t,n,e,o){return Object.defineProperty(t,n,{value:e,writable:!0,configurable:!1!==o})}}catch(t){s=function(t,n,e){return t[n]=e,t}}l=function(){function t(t,n){this.fn=t,this.self=n,this.next=void 0}var n,e,o;return{add:function(r,i){o=new t(r,i),e?e.next=o:n=o,e=o,o=void 0},drain:function(){var t=n;for(n=e=h=void 0;t;)t.fn.call(t.self),t=t.next}}}();var d=s({},"constructor",a,!1);return a.prototype=d,s(d,"__NPO__",0,!1),s(a,"resolve",function(t){var n=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new n(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");n(t)})}),s(a,"reject",function(t){return new this(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");e(t)})}),s(a,"all",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):0===t.length?n.resolve([]):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");var r=t.length,i=Array(r),f=0;c(n,t,function(t,n){i[t]=n,++f===r&&e(i)},o)})}),s(a,"race",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");c(n,t,function(t,n){e(n)},o)})}),a});

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



	  /*----------------------------------------------------
	    初期設定
	  ----------------------------------------------------*/
	  var Scroll,
	  		AccessTime = new Date(),
	  		TimeOut = 0,
	  		Debug = {
	        'state': 0,
	        'create': 0,
	        'log': function(m) {
	          if(this.state) {
	          	this.createFixLog();
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

		/*----------------------------------------------------
			* イベント
		----------------------------------------------------*/
		document.addEventListener('DOMContentLoaded', function() {
		  Scroll = document.documentElement.scrollTop || document.body.scrollTop;
		});
		window.addEventListener('scroll', function() {
			Scroll = document.documentElement.scrollTop || document.body.scrollTop;
		});
		window.addEventListener('load', function() {
			PageSpeedCheck();
		});

		/*----------------------------------------------------
			* 読み込みスピード 制限
		----------------------------------------------------*/
		function PageSpeedCheck() {
			var DataLoadTime = new Date() - AccessTime;
			if(15000 <  DataLoadTime) {
				TimeOut = 1;
			}
			Debug.log(DataLoadTime);
		}


		/*----------------------------------------------------
			* Observerクラス
		----------------------------------------------------*/
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

		/*----------------------------------------------------
			* DolphinData
		----------------------------------------------------*/
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
						interval = U.fps_to_ms(this.Opts.fps);
				this.Opts.duration = U.getCurrentTime(frames, interval);
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

		/*----------------------------------------------------
			* DolphinScoller
		----------------------------------------------------*/
		function DolphinScoller(Dolphin) {
			this.initialize(Dolphin);
		}
		DolphinScoller.prototype = {
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
				this.position = U.getOffsetTop(this.Dolphin.$_selector),
				this.loadStartPosition = this.position - this.wH - (this.wH / 2),
				this.loadEndPosition = this.position + this.sH + (this.wH / 2),
				this.animeStartPosition = this.position - (this.wH - (this.sH * 0.4)),
				this.animeEndPosition = this.position + (this.sH - (this.sH * 0.4));
			},
			'scrollPlay': function(dir, event, opts) {
				var self = this;
				self.Dolphin.setPlayer({
					'autoplay': 0,
					'loop': 1,
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
						this.Dolphin.animatePause();
						this.visible = 0;
					}
				}
			},
			'scrollPlayMV': function(dir01, dir02, event, opts) {
				var self = this;
				self.Dolphin.setPlayer({
			    'autoplay': 1,
			    'loop': 1,
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
		
		/*----------------------------------------------------
			* DolphinPlayer
		----------------------------------------------------*/
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
				this.interval = U.fps_to_ms(this.Data[event].Opts.fps * this.Opts.speed);
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
				var t = t || new Date();

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
				this.Dolphin.Obs.trigger('now', {
					'current': this.interval * this.frame,
					'event': event,
					'frame': this.frame,
					'data': this.Data[event]
				});
				this.increment_frame(event, time);

				this.play_time += time;
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
				if(this.Opts.autoplay === 1 || this.Dolphin.DolphinScoller.visible === 1) {
					this.animateStart(event);
				}
			}
		}

		/*----------------------------------------------------
			* DolphinLoader
		----------------------------------------------------*/
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
				if(TimeOut === 1) {
					return false;
				} 

				self.Data[event] = new DolphinData();

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
				var d = U.ajax(url, {
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
						Current = this.ajaxLoad(dir + '/data' + U.zeroPadding(i) + '.json', event)();
					} else { //それ以外
						Current = Current.then(this.ajaxLoad(dir + '/data' + U.zeroPadding(i) + '.json', event));
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
					var d = U.ajax(url, {
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

		/*----------------------------------------------------
			* DolphinDebugger
		----------------------------------------------------*/
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

		/*----------------------------------------------------
			* Dolphin 本体
		----------------------------------------------------*/
		function Dolphin(selector, opts, debug) {
			var opts = opts || {},
					debug = debug || 0;
			this.initialize(selector, opts, debug);
		}
		Dolphin.prototype = {
			'initialize': function(selector, opts, debug) {
				var self = this;
				self.version = '1.4.0';
				self.$_selector = U.getSelector(selector);

				if(self.$_selector.tagName === 'IMG') {
					self.target = self.$_selector;
				} else {
					self.target = self.$_selector.children[0];
				}

				self.debug = debug;
				self.Data = {};
				self.Obs = new Observer();

				self.DolphinScoller = new DolphinScoller(self);
				self.DolphinPlayer = new DolphinPlayer(self);
				self.DolphinLoader = new DolphinLoader(self);

				if(self.debug) {
					Debug.state = 0;
					self.DolphinDebugger = new DolphinDebugger(self);
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
			'scrollPlay': function(dir, event, opts) {
				var event = event || 'scroll',
						opts = opts || {};
				this.DolphinScoller.scrollPlay(dir, event, opts)			
			},
			'scrollPlayMV': function(dir01, dir02, event, opts) {
				var event = event || 'mv',
						opts = opts || {};
			  this.DolphinScoller.scrollPlayMV(dir01, dir02, event, opts);
			},
			'scrollPlaying': function(event, re) {
				if(!this.Data[event]) {
					return false;
				}
				if(!re) {
					re = 0;
				}
				this.DolphinScoller.scrollPlaying(event, re);
			}
		}
		return Dolphin;

	})();