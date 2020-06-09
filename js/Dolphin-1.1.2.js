/*----------------------------------------------------
	* Dolphin ver.1.1.2
----------------------------------------------------*/

var Dolphin = (function() {

	/*----------------------------------------------------
		* 関数定義

	*/
	/*----------------------------------------------------
		再生時間を計算する関数
	----------------------------------------------------*/
	function convertTime(count, interval) {
		var current = Math.round((count * interval) / 10) / 100;
		return current;
	}

	/*----------------------------------------------------
		fpsをミリ秒に変換
	----------------------------------------------------*/
	function fps_to_ms(fps) {
		var ms = 1e3 / fps;
		return ms;
	}

	/*----------------------------------------------------
		ゼロパディング変換
	----------------------------------------------------*/
	function zeroPadding(index) {
		var new_index = index;
		if(index < 10 ) { // indexが10以下なら
			new_index = '0' + index;
		}
		return new_index;
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
		* Ajaxクラス
	----------------------------------------------------*/
	function Ajax(obj) {
		this.initialize(obj);
	}
	Ajax.prototype = {
		'initialize': function(obj) {
			this.Dolphin = obj,
			this.animeDatas = this.Dolphin.animeDatas,
			this.defaultDatas = {
				'info': {},
				'data': [],
				'loadCount': 0,  //ajaxカウント用
				'complete': 0,
				'error': {
					'count': 0,
					'during': 0,
					'error': 0,
				},
				'timing': 0, //動画再生のタイミング
				'time': 0, //再生時間
				'loop': 0,
				'loadTime': {
					'total': 0, //合計読み込み時間
					'start': 0, //読み込み開始時間
					'errorTime': 0,
					'timeout': 0,
				}
			};
		},
		'ajax': function(dir, event, args) {
			var self = this,
					dir = dir,
					event = event,
					args = args;

			function init() {
				var eventData = self.animeDatas[event];
				// 読み込みが開始されている場合
				if(eventData) {
					// 読み込みが終わっている場合、再生。
					if (eventData.complete === 1)  {
						self.Dolphin.animateStart(event, args);
						return;
					}
					return;
				}
			}
			function ajaxLoop() {
				var Current, //ajax通信後のpromiseの一時保存用変数
						files = self.animeDatas[event].info.files;
				for(var i=1;i<=files;i++) {

					if(i === 1) { // 一回目のとき
						Current = self.ajaxLoad(dir + '/data' + zeroPadding(i) + '.json', event)();
					} else { //それ以外
						Current = Current.then(self.ajaxLoad(dir + '/data' + zeroPadding(i) + '.json', event));
					}
				}
				// ループが終了すれば
				Current.then(self.ajaxComplete.bind(self, event)());				
			}

			init();
			self.ajaxInit(dir + '/dolphin.json', event, args).then(ajaxLoop);

		},
		'ajaxInit': function(url, event, args) {
			var self = this,
					dir = dir,
					event = event,
					args = args;

			function init() {
				if(!self.animeDatas[event]) { // 初期化
					self.animeDatas[event] = self.defaultDatas;
					self.animeDatas[event].timing = args.timing || 0;
					self.animeDatas[event].loop = args.loop || 0;
				}
			}
			function success(data) {
					var eventData = self.animeDatas[event];
					eventData.info = data;
					eventData.time = convertTime(eventData.info.frames - 1, self.Dolphin.interval);
					eventData.loadTime.start = new Date(); //読み込み開始時間
					eventData.loadTime.errorTime = Math.round((eventData.time / eventData.info.files)*1000) * 5;
			}
			function error(jqXHR, textStatus, errorThrown) {
				self.ajaxDebug({
					'type': 'error'
				});
				console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
			}

			init();
			var Def = $.ajax({
				type: "GET",
				url: url,
				dataType:"json",
				success: success,
				error: error
			});

			return Def;

		},
		'ajaxLoad': function (url, event) {
			var self = this,
					dir = dir,
					event = event;

			function speedCheck() {
				if(eventData.loadCount === 2) {
					var eventData = self.animeDatas[event],
							nowTime = new Date(),
							loadTime = nowTime - eventData.loadTime.start,
							timeout = eventData.loadTime.errorTime*2

					// パフォーマンスが悪いときは中断
					if(timeout*2 < loadTime) {
						eventData.loadTime.timeout = 1;
						return;
					}
				}
			}
			function success(data) {
				var eventData = self.animeDatas[event];

				Array.prototype.push.apply(eventData.data, data);
				eventData.loadCount++;

				if(eventData.loadCount === eventData.timing) {
					self.Dolphin.animateStart(event);
				}
				self.ajaxDebug({
					'type': 'load',
					'url': url
				});
			}
			function error(jqXHR, textStatus, errorThrown) {
				self.ajaxDebug({
					'type': 'error'
				});
				console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
			}
		
			return function(data) {
				// ロードに時間がかかりすぎた場合、 強制終了
				var timeout = self.animeDatas[event].loadTime.timeout;
				if(timeout) {
					return false;
				}

				var Def = $.ajax({
					type: "GET",
					url: url,
					dataType:"json",
					success: success,
					error: error
				});
				return Def;

			}
		},
		'ajaxComplete': function (event) {
			var self = this,
					event = event;
			function init() {
				var eventData = self.animeDatas[event];
				if(eventData.loadTime.timeout === 0) {
					var nowTime = new Date(); //読み込み終了時間
					eventData.loadTime.total = nowTime - eventData.loadTime.start; //読み込み合計時間
					eventData.complete = 1; //全データ取得OK
				}
			}
			function ajaxEndCallback() {
				//ajaxのロードが完了したときのイベント
				var eventData = self.animeDatas[event];
				if(eventData.complete) {
						self.Dolphin.Obs.trigger('ajaxEnd', {
							'event': event,
						});
				}
			}
			function debug() {
				var eventData = self.animeDatas[event];
				if(eventData.loadTime.timeout) {
					self.ajaxDebug({
						'type': 'timeout'
					});	
				} else {
					self.ajaxDebug({
						'type': 'success',
						'event': event
					});	
				}
			}
			return function() {
				init();
				ajaxEndCallback();
				debug();
			}
		},
		'ajaxDebug': function(args) {
			var $_result = $('#js-result')
			if(this.Dolphin.debug === 0) {
				return;
			}
			switch (args.type) {
			  case 'load':
			    $_result.html(args.url + 'が読み込み完了しました。');
			    break;
			  case 'error':
			    $_result.html('aJax通信に失敗しました。');
			    break;
			  case 'success':
			    var eventData = this.animeDatas[args.event],
			    		html = '';
					    html += '読み込みに成功しました。<br>moaiが利用可能です。<br><br>';
							html += '読み込み時間: ' + eventData.loadTime.total + 'ms<br>';
							//html += 'Json: ' + Math.round((self.animeDatas[event].loadTime.total / self.animeDatas[event].info.files) * 100 ) / 100 + 'ms<br>';
							html += '1フレーム平均: ' + Math.round((eventData.loadTime.total / eventData.info.frames) * 100 ) / 100 + 'ms<br>';

					$_result.html(html);
			    break;
			  case 'timeout':
			    $_result.html('回線速度が遅いため終了しました。');
			    break;
			}
		}
	}


	/*----------------------------------------------------
		* Dolphin
	----------------------------------------------------*/
	function Dolphin(selector, param) {
		this.initialize(selector, param);
	}
	Dolphin.prototype = {
		'initialize': function(selector, param) {
			var self = this;
			
			this.debug = param.debug || 0;

			this.$_window = $(window),
			this.$_selector = $(selector),
			this.position = this.$_selector.offset().top;

			this.$_window.on('load', function() {
				self.position = self.$_selector.offset().top;
			});

			this.$_window.on('resize', function() {
				self.position = self.$_selector.offset().top;
			});

			if(this.$_selector.prop('tagName') === 'IMG') {
				this.target = this.$_selector;
			} else {
				this.target = $('img' ,selector);
			}

			this.animeDatas = {}, // アニメーションのデータ
			this.animeState = 0, // 停止 0, 再生中はイベント名を返す
			this.timer, // 再生用タイマー
			this.count = 0, // タイマー用カウンター
			this.currentTime = 0, //再生時間

			this.interval = fps_to_ms(param.fps) || 67,
			this.loop = param.loop || 0,
			this.count_reset = param.count_reset || 0; //動画を切り替えたときにカウントをリセットするか

			this.Obs = new Observer();
			this.debugMode();

		},
		'debugMode': function() {
			if(this.debug) {
				this.$_selector.parent().append('<div id="js-result" class="result">画読み込み中です。</div>	');
			}
		},
		'getState': function() {
			return this.animeState;
		},
		'getPosition': function() {
			return this.position;
		},
		'load': function (dir, event, args) { //ajax実行 dir=>読み込むjsonのディレクトリ, event=>event名, timing=>再生させるタイミング、デフォルトはロードのみ
			var	self = this,
					ajaxLoader = new Ajax(self); //Ajax通信用クラス

			return (function(dir, event, args) {
				if(!args) {
					args = {};
				}
				ajaxLoader.ajax(dir, event, args);
			})(dir, event, args);
		},
		'on': function(eventType, callback) {
			switch (eventType) {
				case 'animationStart':
					this.Obs.on('start', callback);
					break;
				case 'animationEnd':
					this.Obs.on('end', callback);
					break;
				case 'animationRestart':
					this.Obs.on('restart', callback);
					break;
				case 'animationNow':
					this.Obs.on('now', callback);
					break;
				case 'ajaxEnd':
					this.Obs.on('ajaxEnd', callback);
					break;
				default:
					console.log('error');
			}
		},
		'animateStart': function(event, args) {
			var self = this,
					event = event,
					args = args;		
			if(!self.animeDatas[event]) {
				return;
			}
			if(args) {
				self.animeDatas[event].loop = args.loop || 0;
			}
			function start() {
				self.clearTimer();
				self.timer = setTimer();
				self.animeState = event;
			}
			function setTimer() {
				var timerFunc = self.animateTimer,
						interval = self.interval;
				return setInterval(timerFunc.bind(self, event), interval);
			}
			function startCallback() {
				self.Obs.trigger('start', {
					'event': event,
				}); //設定したスタート時発火イベントを実行
			}

			if(this.animeState !== event) {
				start();
				startCallback();
			}
		},		
		'animateStop': function() {
			this.clearTimer();
			this.animeState = 0;
		},
		'animateTimer': function(event) {
			var self = this,
					animeData = self.animeDatas[event];

			// エラー確認
			function error_check() {
				//エラーが一定数を超えいる場合、Ajaxの読み込みが終わるまで再生を待つ。
				if(animeData.error.error) {
					if(animeData.complete === 1) {
						animeData.error.error = 0;
						return true;
					} else {
						return false;
					}
				}
				return true;
			}

			// 次フレームの有無を確認
			function nextFrame_check() {
				if(!animeData.data[self.count]) {
					error();
					return false;
				}
				return true;
			}
			function error() {
				// エラー発生中なら

				function errorPush() {
					animeData.error.count = 0; //エラーのカウントをリセット
					animeData.error.error = 1;					
				}
				function errorDuring() {
					animeData.error.during = 1;
				}

				if(animeData.error.during) {
					return;
				}

				animeData.error.count++; //エラーをカウント

				if(animeData.error.count >= 1) {
					errorPush(); //エラー発生
				} else {
					errorDuring();
				}
			}


			function error_during_reset() {
				if(animeData.error.during) {
					animeData.error.during = 0;
				}
			}
			function step() {
				self.target.attr('src', animeData.data[self.count].d);
				if(self.count === animeData.info.frames - 1) {
					loopEnd();
				} else {
					loop();
				}
			}
			function loop() {
				self.count++;
				self.currentTime = convertTime(self.count, self.interval);
				nowCallback();
			}
			function loopEnd() {
				if( self.loop || animeData.loop ) {
					loopRestart();
				} else {
					loopStop();
				}
			}
			function loopRestart() {
				self.count = 0;
				restartCallback();
			}
			function loopStop() {
				self.count = 0;
				self.animateStop();
				endCallback();		
			}

			// コールバック
			function restartCallback() {
				self.Obs.trigger('restart', {
					'event': event,
				});
			}
			function endCallback() {
				self.Obs.trigger('end', {
					'event': event,
				}); //設定した終了時時発火イベントを実行
			}
			function nowCallback() {
				self.Obs.trigger('now', {
					'current': self.currentTime,
					'event': event,
					'frame': self.count,
				});
			}

			function Success() {
				error_during_reset();
				step();
			}


			error_check() && nextFrame_check() && Success();
		},
		'clearTimer': function() {
			var self = this;
			function count_reset() {
				if(self.count_reset === 1) {
					self.count = 0;
				}
			}
			if(self.timer) {
				clearTimeout(self.timer);
				count_reset(); //アニメーションストップ時 カウントを維持するか否か
			}
		},
		'scrollPlay': function(dir, event, load) { //要素が画面内に入ったらスルロールで再生する命令
			var self = this,
				loadState = 0, //ロード未開始：0, 開始：1
				animeState = 0,  //アニメ未再生：0, アニメ再生中：1
				wH, //ウインドウの横幅
				sH, //セレクタの高さ
				loadStartPosition, //ロードを開始する最初の位置
				loadEndPosition, //ロードを開始する最後の位置
				animeStartPosition, //アニメーションを開始する最初の位置
				animeEndPosition; //アニメーションを開始する最後の位置

			//初期設定
			function init() {
				wH = self.$_window.height(),
				sH = self.$_selector.outerHeight(),
				loadStartPosition = self.position - wH - (wH / 2),
				loadEndPosition = self.position + sH + (wH / 2),
				animeStartPosition = self.position - wH,
				animeEndPosition = self.position + sH;
			}

			//スクロール時イベント
			function scrollEvent(args) {
				var scroll = self.$_window.scrollTop();

				if(self.animeDatas[event]) { //ロード済みか確認
					loadState = 1;
				}

				if(loadState === 0) {

					if(args === 'load') { //最初の一回のみ
						if(animeStartPosition < scroll && scroll < animeEndPosition) {
							self.load(dir, event, {
								'timing': 2,
							});
							loadState = 1;
							animeState = 1;
							return;
						}
					}

					if(loadStartPosition < scroll && scroll < loadEndPosition) {
						self.load(dir, event, {
								'timing': 2,
							});
						loadState = 1;
					}
				}

				if(self.animeDatas[event]) {
					if(self.animeDatas[event].complete) {

						if(animeStartPosition < scroll && scroll < animeEndPosition) {
							if(animeState === 0) {
								self.animateStart(event);
								animeState = 1;
							}
						} else {
							if(animeState === 1) {
								self.animateStop(event);
								animeState = 0;
							}
						}

					}
				}
				
			}

			init();
			if(load === 1) { // すでにロードが完了している場合
				scrollEvent('load');
			}

			self.$_window.on('load', function() {
				init();
				scrollEvent('load');
			});

			self.$_window.on('resize', function() {
				init();
			});

			self.$_window.on('scroll', function() {
				scrollEvent();
			});

		},
		'scrollPlayMV': function(dir01, dir02, event, same) { //dir01: ローダーディレクトリ dir02: メイン動画ディレクトリ event: イベント名 same: ローダーとメインが一緒かどうか
			var flag = 0,
					self = this;

			//ローダーの読み込み
			self.load(dir01, 'load', {
				'timing': 2,
				'loop': 1
			});

			self.$_window.on('load', function() {

				if(same === 1) {
					self.load(dir02, event, {});
					self.on('ajaxEnd', function(e) {
						if(e.event === event) {
								self.scrollPlay(dir01, event, 1);
						}
					});
			  } else {
					self.load(dir02, event, {});

					self.on('ajaxEnd', function(e) {
						if(e.event === event) {
							flag = 1;

							if(self.getState() === 0) { //ローダーが再生されていない場合
								self.scrollPlay(dir01, event, 1);
							}
						}
					});

			    self.on('animationRestart', function(e) {
			      if(flag === 1 && e.event === 'load') {
			        self.scrollPlay(dir01, event, 1);
			      }
			    });
			  }

			});

		},
		'scrollPlaying': function(event, re) { //試しに作成 スクロールで再生 reは、1で上スクロールで巻き戻しモード
			var self = this,
				count = 0,
				flug = 0, //スクロール発火調整用フラグ
				prev = self.$_window.scrollTop();

			self.$_window.on('scroll', function() {

				if(!self.animeDatas[event] || !self.animeDatas[event].complete) { //そもそもイベントがなかったり、ロードが終わってなかったら動かさない。
					return;
				}

				if(self.animeState) { //タイマーで再生中の場合は動かさない。
					return;
				}

				if(flug === 0) {
					flug = 1;
					self.target.attr('src', self.animeDatas[event].data[count].d);
					if(prev < self.$_window.scrollTop() || !re) {
						count++;
					} else if(prev > self.$_window.scrollTop()) {
						count--;
					}

					prev = self.$_window.scrollTop();

					if(count === self.animeDatas[event].info.frames) {
						count = 0;
					} else if(count < 0) {
						count = self.animeDatas[event].info.frames - 1;
					}

					setTimeout(function() {
						flug = 0;
					}, 20)
				}
			});
		}
	}

	return Dolphin;

})();