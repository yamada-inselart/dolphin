/*----------------------------------------------------
	* Dolphin ver1.1.1
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
		var ms = Math.round(1000 / fps);
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
	Observer.prototype.on = function(event, func) {
		if (! this.listeners[event] ) {
			this.listeners[event] = [];
		}
		this.listeners[event].push(func);
	};

	Observer.prototype.off = function(event, func) {
		var ref = this.listeners[event],
		len = ref.length;
		for (var i = 0; i < len; i++) {
			var listener = ref[i];
			if (listener === func) {
				ref.splice(i, 1);
			}
		}
	};
	Observer.prototype.trigger = function(event, args) { // argsは、on('イベント名', function(args)){...} で取得できる。

		if(!this.listeners[event]) {
			return;
		}

		var ref = this.listeners[event];

		for (var i = 0, len = ref.length; i < len; i++) {
			var listener = ref[i];
			if(typeof listener === "function") listener(args);
		}
	};



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
			this.countReset = param.count_hold || 0; //動画を切り替えたときにカウントをリセットするか

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

			if(!this.animeDatas[event]) {
				return;
			}

			if(args) {
				this.animeDatas[event].loop = 0 || args.loop;
			}

			if(this.animeState !== event) {
				this.clearTimer();
				this.timer = setInterval(this.animateTimer.bind(this, event), this.interval);
				
				this.animeState = event;

				this.Obs.trigger('start', {
					'event': event,
				}); //設定したスタート時発火イベントを実行
			}
		},		
		'animateStop': function() {
			clearTimeout(this.timer);
			this.animeState = 0;
		},
		'animateTimer': function(event) {

			var animeData = this.animeDatas[event];

			if(animeData.error.typeB) { //エラーが一定数を超えるとajaxの読み込みが終わるまで再生を待つ。
				if(animeData.complete === 1) {
					animeData.error.typeB = 0;
				} else {
					return;
				}
			}

			if(animeData.data[this.count]) { //アニメーション(ループ)の処理

				if(animeData.error.typeA) { //エラー中だったらリセット
					animeData.error.typeA = 0;
				}

				this.target.attr('src', animeData.data[this.count].d);
				if(this.count === animeData.info.frames - 1) {
					if( this.loop || animeData.loop ) {
						this.count = 0;
						this.Obs.trigger('restart', {
							'event': event,
						});
					} else {
						this.count = 0;
						this.animateStop();
						this.Obs.trigger('end', {
							'event': event,
						}); //設定した終了時時発火イベントを実行
					}
				} else {
					this.count++;
					this.currentTime = convertTime(this.count, this.interval);

					this.Obs.trigger('now', {
						'current': this.currentTime,
						'event': event,
						'frame': this.count,
					});

				}
			} else { //データの読み込みが追いつかない場合の処理(エラーの処理)
				if(animeData.error.typeA) {
					return;
				}
				animeData.error.count++; //エラーをカウント

				if(animeData.error.count >= 1) {
					animeData.error.count = 0; //エラーのカウントをリセット
					animeData.error.typeB = 1;
				} else {
					animeData.error.typeA = 1;
				}
			}

		},
		'clearTimer': function() {
			if(this.timer) {
				clearTimeout(this.timer);

				if(this.count_hold === 0) {
					this.count = 0;
				}

			}
		},
		'load': function (dir, event, args) { //ajax実行 dir=>読み込むjsonのディレクトリ, event=>event名, timing=>再生させるタイミング、デフォルトはロードのみ
			var self = this,
				timing, //ajax通信後アニメーションさせるタイミング
				current; //ajax通信後のpromiseの一時保存用変数

				if(!args) {
					args = {};
				}


			if(!self.animeDatas[event]) { // 読み込みがまだなら

				self.ajaxInit(dir + '/dolphin.json', event, args).then(function() {

					var animeData = self.animeDatas[event];
					for(var i = 1;i<=animeData.info.files;i++) {

						if(i === 1) { // 一回目のとき
							current = self.ajaxLoad(dir + '/data' + zeroPadding(i) + '.json', event)();
						} else { //それ以外
							current = current.then(self.ajaxLoad(dir + '/data' + zeroPadding(i) + '.json', event));
						}
					}
					// ループが終了すれば
					current.then(self.ajaxComplete.bind(self, event)());

				});

				return self;

			} else if (self.animeDatas[event].complete === 1)  { // 読み込みが終わっている場合、再生。
				self.animateStart(event, args);
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
		},
		'ajaxInit': function(url, event, args) {
			var self = this;

			if(!self.animeDatas[event]) {
				self.animeDatas[event] = {
					'count': 0,  //ajaxカウント用
					'complete': 0,
					'data': [],
					'error': {
						'count': 0,
						'typeA': 0,
						'typeB': 0,
					},
					'info': {},
					'timing': 0 || args.timing, //動画再生のタイミング
					'time': 0, //再生時間
					'loop': 0 || args.loop,
					'loadTime': {
						'total': 0, //合計読み込み時間
						'start': 0, //読み込み開始時間
						'end': 0, //読み込み終了時間
						'first': 0,
						'errorTime': 0,
						'error': 0,
					}
				};
			}

			var def = $.ajax({
				type: "GET",
				url: url,
				dataType:"json",
				success: function(data) {
					self.animeDatas[event].info = data;
					self.animeDatas[event].time = convertTime(self.animeDatas[event].info.frames - 1, self.interval);
					self.animeDatas[event].loadTime.start = new Date(); //読み込み開始時間
					self.animeDatas[event].loadTime.errorTime = Math.round((self.animeDatas[event].time / self.animeDatas[event].info.files)*1000) * 5;
				},
				error: function (jqXHR, textStatus, errorThrown) {
					// 通信エラー時のダイアログ表示
					console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
					if(self.debug) {
						$('#js-result').html('aJax通信に失敗しました。');
					}
				}
			});

			return def;		

		},
		'ajaxLoad': function (url, event) {
			var self = this;
		
			return function() {

				// ロードに時間がかかりすぎた場合、 強制終了
				if(self.animeDatas[event].loadTime.error) {
					return false;
				}

				var def = $.ajax({
					type: "GET",
					url: url,
					dataType:"json",
					success: function(data) {
						Array.prototype.push.apply(self.animeDatas[event].data, data);
						self.animeDatas[event].count++;

						if(self.debug) {
							$('#js-result').html(url + 'が読み込み完了しました。');
						}

						if(self.animeDatas[event].count === self.animeDatas[event].timing) {

							// パフォーマンスが悪いときは中断
							self.animeDatas[event].loadTime.first = new Date();
							if(self.animeDatas[event].loadTime.errorTime*self.animeDatas[event].timing < self.animeDatas[event].loadTime.first - self.animeDatas[event].loadTime.start) {
								self.animeDatas[event].loadTime.error = 1;
								return;
							}

							self.animateStart(event);
						}

					},
					error: function (jqXHR, textStatus, errorThrown) {
						// 通信エラー時のダイアログ表示
						console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
						if(self.debug) {
							$('#js-result').html('aJax通信に失敗しました。');
						}
					}
				});
				return def;

			}
		},
		'ajaxComplete': function (event) {
			var self = this;

			return function() {
				if(self.animeDatas[event].loadTime.error === 0) {
					self.animeDatas[event].complete = 1; //全データ取得OK
				}
				self.animeDatas[event].loadTime.end = new Date(); //読み込み終了時間
				self.animeDatas[event].loadTime.total = self.animeDatas[event].loadTime.end - self.animeDatas[event].loadTime.start; //読み込み合計時間

				//ajaxのロードが完了したときのイベント
				if(self.animeDatas[event].complete) {
						self.Obs.trigger('ajaxEnd', {
							'event': event,
						});
				}

				// デバッグOn
				if(self.debug) {
					var html = '';

					if(self.animeDatas[event].loadTime.error) {
						$('#js-result').html('回線速度が遅いため終了しました。');
					} else {
						html += '読み込みに成功しました。<br>moaiが利用可能です。<br><br>';
						html += '読み込み時間: ' + self.animeDatas[event].loadTime.total + 'ms<br>';
						//html += 'Json: ' + Math.round((self.animeDatas[event].loadTime.total / self.animeDatas[event].info.files) * 100 ) / 100 + 'ms<br>';
						html += '1フレーム平均: ' + Math.round((self.animeDatas[event].loadTime.total / self.animeDatas[event].info.frames) * 100 ) / 100 + 'ms<br>';

						$('#js-result').html(html);
					}
				}
			}
		}
	}

	return Dolphin;

})();