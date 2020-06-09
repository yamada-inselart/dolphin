export var Access = (function() {
    function Access() {
        this.initialize();
    }
    Access.prototype = {
        'initialize': function() {
            this.accessTime = new Date();
            this.timeOut = 0;

            this.handleEvents();
        },
        'handleEvents': function() {
            var self = this;
            window.addEventListener('load', function() {
                self.PageSpeedCheck();
            });
        },
        'PageSpeedCheck': function() {
            var DataLoadTime = new Date() - this.accessTime;
            if(15000 <  DataLoadTime) {
                this.timeOut = 1;
            }
        }
    }
    return new Access();
})();