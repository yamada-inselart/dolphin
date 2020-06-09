/*----------------------------------------------------
    * DolphinDebugger
----------------------------------------------------*/
import {Debug} from './debug';
import {U} from './utility';

export var DolphinDebugger = (function() {
    function DolphinDebugger(Dolphin) {
        this.initialize(Dolphin);
    };
    DolphinDebugger.prototype = {
        'initialize': function(Dolphin) {
            this.Dolphin = Dolphin;
            this.loader;
            this.result;
            this.createResult();
            this.createPB(); // ProgressBar
            this.debug();
        },
        'debug': function() {
            var self = this,
                    dolphin = this.Dolphin;

            dolphin.on('ajaxLoad', function(e) {
                var percent = Math.floor((e.index / e.data.Opts.files) * 100),
                        html = '読み込み中： ' + percent + '％ <br>';
                        html += e.url + 'の読み込みが完了しました。';
                self.resultRender(html);
                self.PBRender(percent);
            });

            dolphin.on('ajaxEnd', function(e) {
                var html = '読み込みに成功しました。<br>moaiが利用可能です。<br><br>';
                        html += '読み込み時間: ' + e.data.load.total + 'ms<br>';
                        html += '1フレーム平均: ' + Math.round((e.data.load.total / e.data.Opts.frames) * 100 ) / 100 + 'ms<br>';
                self.resultRender(html);
            });

            dolphin.on('ajaxError', function(e) {
                var html = 'aJax通信に失敗しました。';
                self.resultRender(html);
            });

        },
        'createResult': function() {
            var element = this.Dolphin.$_selector;
            this.result = document.createElement('div');
            this.setResultAttr();
            this.setResultCSS();

            element.parentNode.insertBefore(this.result, element.nextSibling);
        },
        'setResultAttr': function() {
            this.result.innerHTML = '動画読み込み中です。';
            this.result.id = 'js-result';
            this.result.className = 'result';
        },
        'setResultCSS': function() {
            this.result.style.backgroundColor = '#EFF7FA';
            this.result.style.textAlign = 'center';
            this.result.style.padding = '15px';
            this.result.style.minHeight = '105px';			
            this.result.style.width = '100%';
        },
        'resultRender': function(html) {
            this.result.innerHTML = html;
        },
        'createPB': function() {
            var element = this.Dolphin.$_selector;
            this.PB = document.createElement('div');
            this.setPBCSS();

            element.parentNode.insertBefore(this.PB, element.nextSibling);
        },
        'setPBCSS': function() {
            this.PB.style.backgroundColor = '#66c4e2';
            this.PB.style.transition = '0.25s';
            this.PB.style.height = '3px';
            this.PB.style.width = '0%';
        },
        'PBRender': function(percent) {
            this.PB.style.width = percent + '%';
        }
    }
    return DolphinDebugger;
})();