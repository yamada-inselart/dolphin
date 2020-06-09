import {Debug} from './debug';
import {U} from './utility';

export var DolphinAnalysis = (function() {

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
