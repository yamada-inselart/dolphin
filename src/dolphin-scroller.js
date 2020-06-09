/*----------------------------------------------------
    * DolphinScroller
----------------------------------------------------*/
import {Debug} from './debug';
import {U} from './utility';

export var DolphinScroller = (function() {

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