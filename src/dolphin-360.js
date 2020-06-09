/*----------------------------------------------------
    * DolphinScroller
----------------------------------------------------*/
import {Debug} from './debug';
import {U} from './utility';

export var Dolphin360 = (function() {

    function Dolphin360(Dolphin) {
        this.initialize(Dolphin);
    }
    Dolphin360.prototype = {
        'initialize': function(Dolphin) {
            if( window.ontouchstart === null ){
				this.touch = 1;
			}else{
			   this.touch = 0;
            }
            
            this.Dolphin = Dolphin,
            this.Data = this.Dolphin.Data;
            this.$_touchBox = this.Dolphin.$_selector;

            this.loadState = 0,
            this.event = '',

            this.pageX;
			this.pageY;
			this.prevX;
            this.prevY;
            
			this.frame = 0;

			this.tf = 0;

		},
		'setHtml': function() {
			var layerElement = document.createElement('div');
			this.$_touchBox.appendChild(layerElement);

			this.$_touchBox.style.cursor = 'pointer';
			this.$_touchBox.style.position = 'relative';
			layerElement.style.position = 'absolute';
			layerElement.style.top = '0';
			layerElement.style.left = '0';
			layerElement.style.height = '100%';
			layerElement.style.width = '100%';
		},
        'load': function(dir) {
            var self = this;
            self.Dolphin.setPlayer({
                'autoplay': 0,
			});
			self.setHtml();
			self.Dolphin.load(dir, '360', {});
			self.Dolphin.on('ajaxEnd', function(e) {
				self.Events();
			});
        },
		'Events': function() {
			if(!this.touch) {				
				this.mouseEvents();
			} else {
				this.touchEvents();
			}
		},
		'mouseEvents': function() {
			var self = this,
				md = 0;

			self.$_touchBox.addEventListener('mousedown', function(e) {
                md = 1;
			});
			self.$_touchBox.addEventListener('mouseup', function(e) {
                md = 0;
			});
			self.$_touchBox.addEventListener('mouseleave', function(e) {
                md = 0;
			});
			self.$_touchBox.addEventListener('mousemove', function(e) {
                if(md === 1) {
					self.updateXY(e);
                    self.moveX();
				}
			});
		},
		'touchEvents': function() {
			var self = this;

			self.$_touchBox.addEventListener('touchstart', function(e) {
				self.updateXY(e);
			});
			self.$_touchBox.addEventListener('touchmove', function(e) {
				self.updateXY(e);
				self.moveX();
			});
			self.$_touchBox.addEventListener('touchend', function(e) {
				self.updateXY(e);
			});
		},
		'updateXY': function(event) {
			var X = event.offsetX || event.changedTouches[0].pageX,
				Y = event.offsetY || event.changedTouches[0].pageY;

			this.prevX = this.pageX || X;
			this.prevY = this.pageY || Y;
			this.pageX = X;
			this.pageY = Y;
		},
		'moveX': function() {
			var self = this;
			if(this.tf === 1) {
				return false;
			}

			var move = this.pageX - this.prevX,
                frame,
                frameMax = this.Data['360'].Opts.frames - 1;
			if(move > 0) {
				frame = this.frame + 1;
			} else {
				frame = this.frame - 1;
			}
			if(frame < 0) {
				frame = frameMax;
			} else if(frameMax < frame) {
				frame = 0;
            }

			this.frame = frame;
			this.Dolphin.target.setAttribute('src', this.Data['360'].Data[this.frame].d);

			self.tf = 1;
			setTimeout(function() {
				self.tf = 0;
			}, 15);
		}
    }
    return Dolphin360;
})();