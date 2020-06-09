/*----------------------------------------------------
    * DolphinData
----------------------------------------------------*/
import {Debug} from './debug';
import {U} from './utility';

export var DolphinData = (function() {
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
    return DolphinData;
})();