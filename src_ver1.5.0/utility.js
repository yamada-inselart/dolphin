/*----------------------------------------------------
	* 汎用関数
----------------------------------------------------*/
export var U = {
	/*----------------------------------------------------
		ajax
	----------------------------------------------------*/
	'ajax': function(url, opts) {
		function callback(resolve, reject) {
			var XHR = new XMLHttpRequest();

			XHR.open('GET', url, true);
			XHR.responseType = opts.dataType;
			XHR.send(null);
			XHR.onreadystatechange = function() {
				if (XHR.readyState == 4) { // 通信の完了時
				if (XHR.status == 200) { // 通信の成功時
					var res = XHR.response;
					if(typeof res === 'string') {
						res = JSON.parse(res);
					}
					opts.success(res);
					resolve();
				} else {
					opts.error();
					reject();
				}
				}
			}		
		}
		return new Promise(callback);
	},
	/*----------------------------------------------------
		再生時間を計算
	----------------------------------------------------*/
	'getCurrentTime': function(frame, interval) {
		var current = Math.round((frame * interval) / 10) / 100;
		return current;
	},
	'convertTime': function(ms) {
		var h = String(Math.floor(ms / 3600000) + 100).substring(1);
		var m = String(Math.floor((ms - h * 3600000)/60000)+ 100).substring(1);
		var s = String(Math.round((ms - h * 3600000 - m * 60000)/1000)+ 100).substring(1);
		return h+':'+m+':'+s;
	},
	'convertDate': function(date) {
		if(date instanceof Date === false) {
			return date;
		}
		var Y = date.getFullYear(),
			m = ('0' + (date.getMonth() + 1)).slice(-2),
			d = ('0' + date.getDay()).slice(-2),
			h = ('0' + date.getHours()).slice(-2),
			min = ('0' + date.getMinutes()).slice(-2),
			s = ('0' + date.getSeconds()).slice(-2);
		return Y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
	},
	/*----------------------------------------------------
		fpsをミリ秒に変換
	----------------------------------------------------*/
	'fps_to_ms': function(fps) {
		var ms = 1e3 / fps;
		return ms;
	},
	'getSelector': function(selector) {
		if(selector.indexOf('#') !== -1) {
			return document.getElementById(selector.split('#')[1]);
		} else {
			return document.getElementById(selector);
		}
	},
	/*----------------------------------------------------
		セレクタの位置を取得
	----------------------------------------------------*/
	'getOffsetTop': function(selector) {
		var rect = selector.getBoundingClientRect();
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return (rect.top + scrollTop);
	},
	/*----------------------------------------------------
		クッキーの取得
	----------------------------------------------------*/
	'getCookie': function (name) {
		var result = null;

		var cookieName = name + '=';
		var allcookies = document.cookie;

		var position = allcookies.indexOf( cookieName );
		if( position != -1 )
		{
			var startIndex = position + cookieName.length;

			var endIndex = allcookies.indexOf( ';', startIndex );
			if( endIndex == -1 )
			{
				endIndex = allcookies.length;
			}

			result = decodeURIComponent(
				allcookies.substring( startIndex, endIndex ) );
		}

		return result;
	},
	/*----------------------------------------------------
		ゼロパディング変換
	----------------------------------------------------*/
	'zeroPadding': function(index) {
		var new_index = index;
		if(index < 10 ) { // indexが10以下なら
			new_index = '0' + index;
		}
		return new_index;
	}
}