import {U} from './utility';
import {Access} from './access';
/*----------------------------------------------------
	* cookie
----------------------------------------------------*/
export var Cookie = {
	'ID': null,
	'LastAccessTime': null,
	'Expires': (function() {
		var expires = new Date();
			expires.setTime(expires.getTime() + 730*24*60*60*1000); //2年間保存
		return expires;
	})(),
	'getID': function() {
		this.ID = U.getCookie('userID');
		this.setID();
		return this.ID;
	},
	'setID': function() {
		if(!this.ID) {			
			this.ID = this.createID();
			document.cookie = 'userID=' + this.ID + ';expires=' + this.Expires;
		}
	},
	'createID': function() {
		var id = Math.floor(Math.random() * 10000000000);
		return id;
	},
	'getLastAccessTime': function() {
		this.lastAccessTime = new Date(U.getCookie('lastAccessTime')) || '';
		if(this.lastAccessTime !== '') {
			this.lastAccessTime = new Date(this.lastAccessTime);
		}
		this.setLastAccessTime();
		return this.lastAccessTime;
	},
	'setLastAccessTime': function() {
		document.cookie = 'lastAccessTime=' + Access.accessTime + ';expires=' + this.Expires;
	}
}