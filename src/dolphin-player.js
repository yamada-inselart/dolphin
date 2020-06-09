/*----------------------------------------------------
    * DolphinPlayer
----------------------------------------------------*/
import {Debug} from './debug';
import {U} from './utility';

export var DolphinPlayer = (function() {

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
            var frames = this.Player.Data[event].Opts.frames;
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