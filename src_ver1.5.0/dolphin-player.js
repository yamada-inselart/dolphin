/*----------------------------------------------------
    * DolphinPlayer
----------------------------------------------------*/
import {Debug} from './debug';
import {U} from './utility';

export var DolphinPlayer = (function() {
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
            if(this.Opts.autoplay === 1 || this.Dolphin.DolphinScroller.visible === 1) {
                this.animateStart(event);
            }
        }
    }
    return DolphinPlayer;
})();