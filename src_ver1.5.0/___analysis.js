import {Debug} from './debug';
import {U} from './utility';
import {Cookie} from './cookie';
import {Access} from './access';

export var Analysis = (function() {

    /*----------------------------------------------------
        * 解析 各動画
    ----------------------------------------------------*/
    function Analysis_Dolphin(Dolphin, Analysis) {
        this.initialize(Dolphin, Analysis);
    }
    Analysis_Dolphin.prototype = {
        'initialize': function(Dolphin, Analysis) {
            this.Dolphin = Dolphin;
            this.Analysis = Analysis;
            this.state = 0;
            this.handleEvents();
        },
        'handleEvents': function() {
            var self = this,
                Dolphin = this.Dolphin,
                $_selector = this.Dolphin.$_selector,
                start,
                isLoad = 0;

            Dolphin.on('animationStart', function(e) {
                if(e.event === 'preLoad') { //仮動画の場合
                    isLoad = 1;
                } else if(isLoad === 1) {
                    isLoad = 0;
                    return false;
                }
                if(self.state === 0) {
                    start = new Date();
                    var time = new Date() - Access.accessTime,
                        time = U.convertTime(time);
                    self.pushTimeline({
                        'id': $_selector,
                        'event': '再生',
                        'time': time,
                    });
                    self.state = 1;
                }
            });
            Dolphin.on('animationStop', function() {
                if(isLoad === 1) {
                    return false;
                }
                if(self.state === 1) {
                    var time = new Date() - Access.accessTime,
                        time = U.convertTime(time),
                        play_time = new Date() - start;
                        play_time = U.convertTime(play_time);
                    self.pushTimeline({
                        'id': $_selector,
                        'event': '停止',
                        'time': time,
                        'playTime': play_time,
                    });
                    self.state = 0;
                }
            });

        },
        'getPlayState': function() {
            return this.Dolphin.DolphinPlayer.state;
        },
        'getPlayTime': function() {
            return this.Dolphin.DolphinPlayer.play_time;
        },
        'pushTimeline': function(obj) {
            this.Analysis.timeline.push(obj);
        }
    }
    /*----------------------------------------------------
        * 解析
    ----------------------------------------------------*/
    function AnalysisCore(state) {
        this.initialize(state);
    }
    AnalysisCore.prototype = {
        'initialize': function(state) {

            this.state = state || 0;

            this.userID = Cookie.getID(),
            this.url = location.href,
            this.referrer = document.referrer,
            this.platform = navigator.platform,
            this.userAgent = navigator.userAgent,
            this.appName = navigator.appName,
            this.appVersion = navigator.appVersion,
            this.language = navigator.language,
            this.accessTime = U.convertDate(Access.accessTime),
            this.lastAccessTime = U.convertDate(Cookie.getLastAccessTime());

            this.Dolphins = [],
            this.timeline = [],
            this.triggers();
        },
        'triggers': function() {
            var self = this;
            
            if(self.getState() === 0) {
                return false;
            }
            setInterval(function() {
                console.log(self);
            }, 10000);
        },
        'push': function(Dolphin) {
            this.Dolphins.push(new Analysis_Dolphin(Dolphin, this));
        },
        'getState': function() {
            return this.state;
        }
    }
    return AnalysisCore;
})();
