/*----------------------------------------------------

Dolphin ver.1.5.0	
	
Copyright © 2018 inselart. All rights reserved.

This source code or any portion thereof must not be 
reproduced or used in any manner whatsoever.

----------------------------------------------------

Native Promise Only
v0.8.1 (c) Kyle Simpson
MIT License: http://getify.mit-license.org

----------------------------------------------------*/

/* Promise Polyfill */

import {Polyfill} from './polyfill';

import {Debug} from './debug';
import {U} from './utility';
import {Observer} from './observer';

import {DolphinAnalysis} from './dolphin-analysis';
import {DolphinDebugger} from './dolphin-debugger';
import {DolphinLoader} from './dolphin-loader';
import {DolphinPlayer} from './dolphin-player';
import {DolphinScroller} from './dolphin-scroller';
import {Dolphin360} from './dolphin-360';

/*----------------------------------------------------
        * Polyfill
----------------------------------------------------*/
Polyfill();

/*----------------------------------------------------
        * Debug
----------------------------------------------------*/
//Debug.setDebug();

/*----------------------------------------------------
            * Dolphin 本体
----------------------------------------------------*/
window.Dolphin = (function() {

    function Dolphin(selector, opts, debug) {
        var opts = opts || {},
            debug = debug || 0;
        this.initialize(selector, opts, debug);
    }
    Dolphin.prototype = {
        'initialize': function(selector, opts, debug) {
            var self = this;
            self.version = '1.6.0';
            self.$_selector = U.getSelector(selector);

            if(self.$_selector.tagName === 'IMG') {
                self.target = self.$_selector;
            } else {
                self.target = self.$_selector.children[0];
                self.$_selector.style.display = 'inline-block';
                self.$_selector.style.position = 'relative';
            }

            self.debug = debug;
            self.Data = {};
            self.Obs = new Observer();

            if(opts.ga) {
                new DolphinAnalysis(self);
            }
            
            self.DolphinScroller = new DolphinScroller(self);
            self.DolphinPlayer = new DolphinPlayer(self);
            self.DolphinLoader = new DolphinLoader(self);
            self.Dolphin360 = new Dolphin360(self);

            if(Debug.state || self.debug) {
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
        'getPlayerOpt': function(key) {
            return this.DolphinPlayer.getOpt(key);
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
        'changeFrame': function(event, frame) {
            this.DolphinPlayer.changeFrame(event, frame);
        },
        'scrollPlay': function(dir, event, opts) {
            var event = event || 'scroll',
                    opts = opts || {};
            this.DolphinScroller.scrollPlay(dir, event, opts)			
        },
        'scrollPlayMV': function(dir01, dir02, event, opts) {
            var event = event || 'mv',
                    opts = opts || {};
            this.DolphinScroller.scrollPlayMV(dir01, dir02, event, opts);
        },
        'scrollPlaying': function(event, re) {
            if(!this.Data[event]) {
                return false;
            }
            if(!re) {
                re = 0;
            }
            this.DolphinScroller.scrollPlaying(event, re);
        },
        'set360': function(dir) {
            this.Dolphin360.load(dir);
        }
    }
    return Dolphin;
})();