/*----------------------------------------------------
    * デバッグ
----------------------------------------------------*/
export var Debug = {
    'state': 0,
    'create': 0,
    'setDebug': function() {
        var self = this;
        self.state = 1;
        document.addEventListener('DOMContentLoaded', function() {
            self.createFixLog();
        });        
    },
    'log': function(m) {
        if(this.state) {
        console.log(m);
        this.fLog(m);
        }
    },
    'fLog': function(m) {
        var p = document.createElement('p');
        p.innerHTML = m;
        this.FixLog.insertBefore(p, this.FixLog.firstChild);
    },
    'createFixLog': function() {
        if(this.create === 0) {
            this.FixLog = document.createElement('div');
            this.FixLog.innerHTML = '';
            this.FixLog.id = 'js-fixlog';
            this.FixLog.className = 'fixlog';

            this.FixLog.style.backgroundColor = '#EFF7FA';
            this.FixLog.style.borderTop = '1px solid #66c4e2';
            this.FixLog.style.position = 'fixed';
            this.FixLog.style.bottom = '0';
            this.FixLog.style.left = '0';
            this.FixLog.style.height = '150px';
            this.FixLog.style.width = '100%';
            this.FixLog.style.overflow = 'scroll';

            document.body.appendChild(this.FixLog);
            this.create = 1;
        }        	
    }
};