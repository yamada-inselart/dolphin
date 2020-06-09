/*----------------------------------------------------
    * DolphinLoader
----------------------------------------------------*/
import {Debug} from './debug';
import {U} from './utility';
import {Access} from './access';

import {DolphinData} from './dolphin-data';   

export var DolphinLoader = (function() {
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
            if(Access.timeOut === 1) {
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
    return DolphinLoader;
})();