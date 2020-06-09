!function(t) {
    function e(n) {
        if (r[n])
            return r[n].exports; //あれば作らず返す
        var i = r[n] = {
            exports: {}, //モジュール
            id: n, // 0,1,2...
            loaded: !1 // 読み込まれたらtrue
        };
        // t[n]は引数の関数（下のfunction(t, e, r) {... ）
        return t[n].call(i.exports, i, i.exports, e),
        i.loaded = !0,
        i.exports //r(index)でこれが返ってくる。
    }
    var r = {};
    return e.m = t, //引数（関数の配列）
    e.c = r, //
    e.p = "",
    e(0)

/*
this = t.exports;
t = {
  exports: {},
  id: n,
  loaded: !1
}
e = t.exports;
r = e(n);

nはr()で呼び出した番号
*/
}
}([function(t, e, r) { // 0
    "use strict";
    function n(t) { //t="" 初期化部分
        void 0 === t && (t = "");
        var e = {}
          , r = document.getElementsByClassName("shark-player");
        Array.prototype.forEach.call(r, function(t) {
            var r = new i.BullPlayer(t)
              , n = t.getAttribute("data-video-id")
              , o = t.getAttribute("data-thumbs-mode");
            o ? e[n + "-thumb"] = r : e[n] = r
        }),
        window.shark_players = e,
        window.shark_tracker = new a.ClickTracker(t) //解析の追加
    }
    var i = r(7) // 最初のe(n)と一緒
      , o = r(1)
      , a = r(8) // 解析
      , s = r(31);

    //メソッドがなければ、定義する
    Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function u(t) {
            if (null == this)
                throw new TypeError("Array.prototype.findIndex called on null or undefined");
            if ("function" != typeof t)
                throw new TypeError("predicate must be a function");
            for (var u, e = Object(this), r = e.length >>> 0, n = arguments[1], i = 0; i < r; i++)
                if (u = e[i],
                t.call(n, u, i, e))
                    return i;
            return -1
        },
        enumerable: !1,
        configurable: !1,
        writable: !1
    }),
    //メソッドがなければ、定義する
    String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
        return e = e || 0,
        this.substr(e, t.length) === t
    }
    ),
    // 2597行目
    s.config("https://7d6935bea4f04fb0bd43b49758cad1e2@sentry.io/112010").install(),
    window._shk_init = n, //shark 初期化
    function() {
        var t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        window.requestAnimationFrame = t,
        o.Util.bindEvent(window, "DOMContentLoaded", function() {
            void 0 === window.shark_players && n("")
        })
    }()
}
, function(t, e) { // 1
    "use strict";
    function r(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    var n = function() {
        function t(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, r, n) {
            return r && t(e.prototype, r),
            n && t(e, n),
            e
        }
    }()
      , i = function() {
        function t() {
            r(this, t)
        }
        return n(t, null, [{
            key: "findParentByTagName",
            value: function(t, e) {
                for (var r = t; void 0 !== r && r.tagName !== e.toUpperCase(); )
                    r = r.parentNode;
                return r
            }
        }, {
            key: "bindEvent",
            value: function(t, e, r) {
                t.attachEvent ? t.attachEvent("on" + e, r) : t.addEventListener(e, r, !1)
            }
        }, {
            key: "unbindEvent",
            value: function(t, e, r) {
                t.detachEvent ? t.detachEvent("on" + e, r) : t.removeEventListener(e, r, !1)
            }
        }, {
            key: "uuidv4",
            value: function() {
                for (var t = "", e = 0; e < 32; e++) {
                    var r = 16 * Math.random() | 0;
                    t += (12 == e ? 4 : 16 == e ? 3 & r | 8 : r).toString(16)
                }
                return t
            }
        }, {
            key: "getXpath",
            value: function(t) {
                var e = [];
                do {
                    if (t.id) {
                        var r = '/*[@id="' + t.id + '"]';
                        e.unshift(r);
                        break
                    }
                    var n = t.nodeName.toLowerCase()
                      , i = t.parentNode.childNodes;
                    if (i.length > 1) {
                        for (var o = [], a = 0; a < i.length; a++)
                            t.nodeName === i[a].nodeName && o.push(i[a]);
                        if (o.length > 1)
                            for (var s = 0; s < o.length; s++)
                                if (t === o[s]) {
                                    n += "[" + (s + 1) + "]";
                                    break
                                }
                    }
                    e.unshift(n)
                } while (t = t.parentElement);return "/" + e.join("/").toLowerCase()
            }
        }, {
            key: "getSharkEye",
            value: function(t) {
                if (t.length > 1) {
                    t = t.substring(1);
                    for (var e = t.split("&"), r = 0; r < e.length; r++) {
                        var n = e[r].split("=");
                        if ("shark_eye" == n[0])
                            return decodeURIComponent(n[1])
                    }
                }
                return ""
            }
        }, {
            key: "_get_window_height",
            value: function() {
                return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
            }
        }, {
            key: "_get_window_Yscroll",
            value: function() {
                return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0
            }
        }, {
            key: "_get_doc_height",
            value: function() {
                return Math.max(document.body.scrollHeight || 0, document.documentElement.scrollHeight || 0, document.body.offsetHeight || 0, document.documentElement.offsetHeight || 0, document.body.clientHeight || 0, document.documentElement.clientHeight || 0)
            }
        }, {
            key: "getScrollPercent",
            value: function() {
                return (this._get_window_Yscroll() + this._get_window_height()) / this._get_doc_height()
            }
        }]),
        t
    }();
    e.Util = i
}
, function(t, e, r) { // 2
    (function(t, n) {
        "use strict";
        function i() {
            try {
                var t = new Uint8Array(1);
                return t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                },
                42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
            } catch (e) {
                return !1
            }
        }
        function o() {
            return t.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }
        function a(e, r) {
            if (o() < r)
                throw new RangeError("Invalid typed array length");
            return t.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(r),
            e.__proto__ = t.prototype) : (null === e && (e = new t(r)),
            e.length = r),
            e
        }
        function t(e, r, n) {
            if (!(t.TYPED_ARRAY_SUPPORT || this instanceof t))
                return new t(e,r,n);
            if ("number" == typeof e) {
                if ("string" == typeof r)
                    throw new Error("If encoding is specified then the first argument must be a string");
                return c(this, e)
            }
            return s(this, e, r, n)
        }
        function s(t, e, r, n) {
            if ("number" == typeof e)
                throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? p(t, e, r, n) : "string" == typeof e ? f(t, e, r) : d(t, e)
        }
        function u(t) {
            if ("number" != typeof t)
                throw new TypeError('"size" argument must be a number');
            if (t < 0)
                throw new RangeError('"size" argument must not be negative')
        }
        function l(t, e, r, n) {
            return u(e),
            e <= 0 ? a(t, e) : void 0 !== r ? "string" == typeof n ? a(t, e).fill(r, n) : a(t, e).fill(r) : a(t, e)
        }
        function c(e, r) {
            if (u(r),
            e = a(e, r < 0 ? 0 : 0 | g(r)),
            !t.TYPED_ARRAY_SUPPORT)
                for (var n = 0; n < r; ++n)
                    e[n] = 0;
            return e
        }
        function f(e, r, n) {
            if ("string" == typeof n && "" !== n || (n = "utf8"),
            !t.isEncoding(n))
                throw new TypeError('"encoding" must be a valid string encoding');
            var i = 0 | m(r, n);
            e = a(e, i);
            var o = e.write(r, n);
            return o !== i && (e = e.slice(0, o)),
            e
        }
        function h(t, e) {
            var r = e.length < 0 ? 0 : 0 | g(e.length);
            t = a(t, r);
            for (var n = 0; n < r; n += 1)
                t[n] = 255 & e[n];
            return t
        }
        function p(e, r, n, i) {
            if (r.byteLength,
            n < 0 || r.byteLength < n)
                throw new RangeError("'offset' is out of bounds");
            if (r.byteLength < n + (i || 0))
                throw new RangeError("'length' is out of bounds");
            return r = void 0 === n && void 0 === i ? new Uint8Array(r) : void 0 === i ? new Uint8Array(r,n) : new Uint8Array(r,n,i),
            t.TYPED_ARRAY_SUPPORT ? (e = r,
            e.__proto__ = t.prototype) : e = h(e, r),
            e
        }
        function d(e, r) {
            if (t.isBuffer(r)) {
                var n = 0 | g(r.length);
                return e = a(e, n),
                0 === e.length ? e : (r.copy(e, 0, 0, n),
                e)
            }
            if (r) {
                if ("undefined" != typeof ArrayBuffer && r.buffer instanceof ArrayBuffer || "length"in r)
                    return "number" != typeof r.length || K(r.length) ? a(e, 0) : h(e, r);
                if ("Buffer" === r.type && Q(r.data))
                    return h(e, r.data)
            }
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
        }
        function g(t) {
            if (t >= o())
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
            return 0 | t
        }
        function v(e) {
            return +e != e && (e = 0),
            t.alloc(+e)
        }
        function m(e, r) {
            if (t.isBuffer(e))
                return e.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))
                return e.byteLength;
            "string" != typeof e && (e = "" + e);
            var n = e.length;
            if (0 === n)
                return 0;
            for (var i = !1; ; )
                switch (r) {
                case "ascii":
                case "latin1":
                case "binary":
                    return n;
                case "utf8":
                case "utf-8":
                case void 0:
                    return q(e).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * n;
                case "hex":
                    return n >>> 1;
                case "base64":
                    return z(e).length;
                default:
                    if (i)
                        return q(e).length;
                    r = ("" + r).toLowerCase(),
                    i = !0
                }
        }
        function _(t, e, r) {
            var n = !1;
            if ((void 0 === e || e < 0) && (e = 0),
            e > this.length)
                return "";
            if ((void 0 === r || r > this.length) && (r = this.length),
            r <= 0)
                return "";
            if (r >>>= 0,
            e >>>= 0,
            r <= e)
                return "";
            for (t || (t = "utf8"); ; )
                switch (t) {
                case "hex":
                    return O(this, e, r);
                case "utf8":
                case "utf-8":
                    return A(this, e, r);
                case "ascii":
                    return B(this, e, r);
                case "latin1":
                case "binary":
                    return I(this, e, r);
                case "base64":
                    return R(this, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return U(this, e, r);
                default:
                    if (n)
                        throw new TypeError("Unknown encoding: " + t);
                    t = (t + "").toLowerCase(),
                    n = !0
                }
        }
        function y(t, e, r) {
            var n = t[e];
            t[e] = t[r],
            t[r] = n
        }
        function b(e, r, n, i, o) {
            if (0 === e.length)
                return -1;
            if ("string" == typeof n ? (i = n,
            n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648),
            n = +n,
            isNaN(n) && (n = o ? 0 : e.length - 1),
            n < 0 && (n = e.length + n),
            n >= e.length) {
                if (o)
                    return -1;
                n = e.length - 1
            } else if (n < 0) {
                if (!o)
                    return -1;
                n = 0
            }
            if ("string" == typeof r && (r = t.from(r, i)),
            t.isBuffer(r))
                return 0 === r.length ? -1 : w(e, r, n, i, o);
            if ("number" == typeof r)
                return r = 255 & r,
                t.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, r, n) : Uint8Array.prototype.lastIndexOf.call(e, r, n) : w(e, [r], n, i, o);
            throw new TypeError("val must be string, number or Buffer")
        }
        function w(t, e, r, n, i) {
            function o(t, e) {
                return 1 === a ? t[e] : t.readUInt16BE(e * a)
            }
            var a = 1
              , s = t.length
              , u = e.length;
            if (void 0 !== n && (n = String(n).toLowerCase(),
            "ucs2" === n || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                if (t.length < 2 || e.length < 2)
                    return -1;
                a = 2,
                s /= 2,
                u /= 2,
                r /= 2
            }
            var l;
            if (i) {
                var c = -1;
                for (l = r; l < s; l++)
                    if (o(t, l) === o(e, c === -1 ? 0 : l - c)) {
                        if (c === -1 && (c = l),
                        l - c + 1 === u)
                            return c * a
                    } else
                        c !== -1 && (l -= l - c),
                        c = -1
            } else
                for (r + u > s && (r = s - u),
                l = r; l >= 0; l--) {
                    for (var f = !0, h = 0; h < u; h++)
                        if (o(t, l + h) !== o(e, h)) {
                            f = !1;
                            break
                        }
                    if (f)
                        return l
                }
            return -1
        }
        function E(t, e, r, n) {
            r = Number(r) || 0;
            var i = t.length - r;
            n ? (n = Number(n),
            n > i && (n = i)) : n = i;
            var o = e.length;
            if (o % 2 !== 0)
                throw new TypeError("Invalid hex string");
            n > o / 2 && (n = o / 2);
            for (var a = 0; a < n; ++a) {
                var s = parseInt(e.substr(2 * a, 2), 16);
                if (isNaN(s))
                    return a;
                t[r + a] = s
            }
            return a
        }
        function k(t, e, r, n) {
            return J(q(e, t.length - r), t, r, n)
        }
        function T(t, e, r, n) {
            return J($(e), t, r, n)
        }
        function x(t, e, r, n) {
            return T(t, e, r, n)
        }
        function S(t, e, r, n) {
            return J(z(e), t, r, n)
        }
        function C(t, e, r, n) {
            return J(X(e, t.length - r), t, r, n)
        }
        function R(t, e, r) {
            return 0 === e && r === t.length ? G.fromByteArray(t) : G.fromByteArray(t.slice(e, r))
        }
        function A(t, e, r) {
            r = Math.min(t.length, r);
            for (var n = [], i = e; i < r; ) {
                var o = t[i]
                  , a = null
                  , s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                if (i + s <= r) {
                    var u, l, c, f;
                    switch (s) {
                    case 1:
                        o < 128 && (a = o);
                        break;
                    case 2:
                        u = t[i + 1],
                        128 === (192 & u) && (f = (31 & o) << 6 | 63 & u,
                        f > 127 && (a = f));
                        break;
                    case 3:
                        u = t[i + 1],
                        l = t[i + 2],
                        128 === (192 & u) && 128 === (192 & l) && (f = (15 & o) << 12 | (63 & u) << 6 | 63 & l,
                        f > 2047 && (f < 55296 || f > 57343) && (a = f));
                        break;
                    case 4:
                        u = t[i + 1],
                        l = t[i + 2],
                        c = t[i + 3],
                        128 === (192 & u) && 128 === (192 & l) && 128 === (192 & c) && (f = (15 & o) << 18 | (63 & u) << 12 | (63 & l) << 6 | 63 & c,
                        f > 65535 && f < 1114112 && (a = f))
                    }
                }
                null === a ? (a = 65533,
                s = 1) : a > 65535 && (a -= 65536,
                n.push(a >>> 10 & 1023 | 55296),
                a = 56320 | 1023 & a),
                n.push(a),
                i += s
            }
            return P(n)
        }
        function P(t) {
            var e = t.length;
            if (e <= tt)
                return String.fromCharCode.apply(String, t);
            for (var r = "", n = 0; n < e; )
                r += String.fromCharCode.apply(String, t.slice(n, n += tt));
            return r
        }
        function B(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i)
                n += String.fromCharCode(127 & t[i]);
            return n
        }
        function I(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i)
                n += String.fromCharCode(t[i]);
            return n
        }
        function O(t, e, r) {
            var n = t.length;
            (!e || e < 0) && (e = 0),
            (!r || r < 0 || r > n) && (r = n);
            for (var i = "", o = e; o < r; ++o)
                i += W(t[o]);
            return i
        }
        function U(t, e, r) {
            for (var n = t.slice(e, r), i = "", o = 0; o < n.length; o += 2)
                i += String.fromCharCode(n[o] + 256 * n[o + 1]);
            return i
        }
        function L(t, e, r) {
            if (t % 1 !== 0 || t < 0)
                throw new RangeError("offset is not uint");
            if (t + e > r)
                throw new RangeError("Trying to access beyond buffer length")
        }
        function M(e, r, n, i, o, a) {
            if (!t.isBuffer(e))
                throw new TypeError('"buffer" argument must be a Buffer instance');
            if (r > o || r < a)
                throw new RangeError('"value" argument is out of bounds');
            if (n + i > e.length)
                throw new RangeError("Index out of range")
        }
        function N(t, e, r, n) {
            e < 0 && (e = 65535 + e + 1);
            for (var i = 0, o = Math.min(t.length - r, 2); i < o; ++i)
                t[r + i] = (e & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i)
        }
        function F(t, e, r, n) {
            e < 0 && (e = 4294967295 + e + 1);
            for (var i = 0, o = Math.min(t.length - r, 4); i < o; ++i)
                t[r + i] = e >>> 8 * (n ? i : 3 - i) & 255
        }
        function j(t, e, r, n, i, o) {
            if (r + n > t.length)
                throw new RangeError("Index out of range");
            if (r < 0)
                throw new RangeError("Index out of range")
        }
        function D(t, e, r, n, i) {
            return i || j(t, e, r, 4, 3.4028234663852886e38, -3.4028234663852886e38),
            Z.write(t, e, r, n, 23, 4),
            r + 4
        }
        function Y(t, e, r, n, i) {
            return i || j(t, e, r, 8, 1.7976931348623157e308, -1.7976931348623157e308),
            Z.write(t, e, r, n, 52, 8),
            r + 8
        }
        function H(t) {
            if (t = V(t).replace(et, ""),
            t.length < 2)
                return "";
            for (; t.length % 4 !== 0; )
                t += "=";
            return t
        }
        function V(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        }
        function W(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16)
        }
        function q(t, e) {
            e = e || 1 / 0;
            for (var r, n = t.length, i = null, o = [], a = 0; a < n; ++a) {
                if (r = t.charCodeAt(a),
                r > 55295 && r < 57344) {
                    if (!i) {
                        if (r > 56319) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (a + 1 === n) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = r;
                        continue
                    }
                    if (r < 56320) {
                        (e -= 3) > -1 && o.push(239, 191, 189),
                        i = r;
                        continue
                    }
                    r = (i - 55296 << 10 | r - 56320) + 65536
                } else
                    i && (e -= 3) > -1 && o.push(239, 191, 189);
                if (i = null,
                r < 128) {
                    if ((e -= 1) < 0)
                        break;
                    o.push(r)
                } else if (r < 2048) {
                    if ((e -= 2) < 0)
                        break;
                    o.push(r >> 6 | 192, 63 & r | 128)
                } else if (r < 65536) {
                    if ((e -= 3) < 0)
                        break;
                    o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                } else {
                    if (!(r < 1114112))
                        throw new Error("Invalid code point");
                    if ((e -= 4) < 0)
                        break;
                    o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                }
            }
            return o
        }
        function $(t) {
            for (var e = [], r = 0; r < t.length; ++r)
                e.push(255 & t.charCodeAt(r));
            return e
        }
        function X(t, e) {
            for (var r, n, i, o = [], a = 0; a < t.length && !((e -= 2) < 0); ++a)
                r = t.charCodeAt(a),
                n = r >> 8,
                i = r % 256,
                o.push(i),
                o.push(n);
            return o
        }
        function z(t) {
            return G.toByteArray(H(t))
        }
        function J(t, e, r, n) {
            for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i)
                e[i + r] = t[i];
            return i
        }
        function K(t) {
            return t !== t
        }
        var G = r(12)
          , Z = r(16)
          , Q = r(17);
        e.Buffer = t,
        e.SlowBuffer = v,
        e.INSPECT_MAX_BYTES = 50,
        t.TYPED_ARRAY_SUPPORT = void 0 !== n.TYPED_ARRAY_SUPPORT ? n.TYPED_ARRAY_SUPPORT : i(),
        e.kMaxLength = o(),
        t.poolSize = 8192,
        t._augment = function(e) {
            return e.__proto__ = t.prototype,
            e
        }
        ,
        t.from = function(t, e, r) {
            return s(null, t, e, r)
        }
        ,
        t.TYPED_ARRAY_SUPPORT && (t.prototype.__proto__ = Uint8Array.prototype,
        t.__proto__ = Uint8Array,
        "undefined" != typeof Symbol && Symbol.species && t[Symbol.species] === t && Object.defineProperty(t, Symbol.species, {
            value: null,
            configurable: !0
        })),
        t.alloc = function(t, e, r) {
            return l(null, t, e, r)
        }
        ,
        t.allocUnsafe = function(t) {
            return c(null, t)
        }
        ,
        t.allocUnsafeSlow = function(t) {
            return c(null, t)
        }
        ,
        t.isBuffer = function(t) {
            return !(null == t || !t._isBuffer)
        }
        ,
        t.compare = function(e, r) {
            if (!t.isBuffer(e) || !t.isBuffer(r))
                throw new TypeError("Arguments must be Buffers");
            if (e === r)
                return 0;
            for (var n = e.length, i = r.length, o = 0, a = Math.min(n, i); o < a; ++o)
                if (e[o] !== r[o]) {
                    n = e[o],
                    i = r[o];
                    break
                }
            return n < i ? -1 : i < n ? 1 : 0
        }
        ,
        t.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
            }
        }
        ,
        t.concat = function(e, r) {
            if (!Q(e))
                throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e.length)
                return t.alloc(0);
            var n;
            if (void 0 === r)
                for (r = 0,
                n = 0; n < e.length; ++n)
                    r += e[n].length;
            var i = t.allocUnsafe(r)
              , o = 0;
            for (n = 0; n < e.length; ++n) {
                var a = e[n];
                if (!t.isBuffer(a))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                a.copy(i, o),
                o += a.length
            }
            return i
        }
        ,
        t.byteLength = m,
        t.prototype._isBuffer = !0,
        t.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 !== 0)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e = 0; e < t; e += 2)
                y(this, e, e + 1);
            return this
        }
        ,
        t.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 !== 0)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e = 0; e < t; e += 4)
                y(this, e, e + 3),
                y(this, e + 1, e + 2);
            return this
        }
        ,
        t.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 !== 0)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e = 0; e < t; e += 8)
                y(this, e, e + 7),
                y(this, e + 1, e + 6),
                y(this, e + 2, e + 5),
                y(this, e + 3, e + 4);
            return this
        }
        ,
        t.prototype.toString = function() {
            var t = 0 | this.length;
            return 0 === t ? "" : 0 === arguments.length ? A(this, 0, t) : _.apply(this, arguments)
        }
        ,
        t.prototype.equals = function(e) {
            if (!t.isBuffer(e))
                throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === t.compare(this, e)
        }
        ,
        t.prototype.inspect = function() {
            var t = ""
              , r = e.INSPECT_MAX_BYTES;
            return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "),
            this.length > r && (t += " ... ")),
            "<Buffer " + t + ">"
        }
        ,
        t.prototype.compare = function(e, r, n, i, o) {
            if (!t.isBuffer(e))
                throw new TypeError("Argument must be a Buffer");
            if (void 0 === r && (r = 0),
            void 0 === n && (n = e ? e.length : 0),
            void 0 === i && (i = 0),
            void 0 === o && (o = this.length),
            r < 0 || n > e.length || i < 0 || o > this.length)
                throw new RangeError("out of range index");
            if (i >= o && r >= n)
                return 0;
            if (i >= o)
                return -1;
            if (r >= n)
                return 1;
            if (r >>>= 0,
            n >>>= 0,
            i >>>= 0,
            o >>>= 0,
            this === e)
                return 0;
            for (var a = o - i, s = n - r, u = Math.min(a, s), l = this.slice(i, o), c = e.slice(r, n), f = 0; f < u; ++f)
                if (l[f] !== c[f]) {
                    a = l[f],
                    s = c[f];
                    break
                }
            return a < s ? -1 : s < a ? 1 : 0
        }
        ,
        t.prototype.includes = function(t, e, r) {
            return this.indexOf(t, e, r) !== -1
        }
        ,
        t.prototype.indexOf = function(t, e, r) {
            return b(this, t, e, r, !0)
        }
        ,
        t.prototype.lastIndexOf = function(t, e, r) {
            return b(this, t, e, r, !1)
        }
        ,
        t.prototype.write = function(t, e, r, n) {
            if (void 0 === e)
                n = "utf8",
                r = this.length,
                e = 0;
            else if (void 0 === r && "string" == typeof e)
                n = e,
                r = this.length,
                e = 0;
            else {
                if (!isFinite(e))
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                e = 0 | e,
                isFinite(r) ? (r = 0 | r,
                void 0 === n && (n = "utf8")) : (n = r,
                r = void 0)
            }
            var i = this.length - e;
            if ((void 0 === r || r > i) && (r = i),
            t.length > 0 && (r < 0 || e < 0) || e > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var o = !1; ; )
                switch (n) {
                case "hex":
                    return E(this, t, e, r);
                case "utf8":
                case "utf-8":
                    return k(this, t, e, r);
                case "ascii":
                    return T(this, t, e, r);
                case "latin1":
                case "binary":
                    return x(this, t, e, r);
                case "base64":
                    return S(this, t, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return C(this, t, e, r);
                default:
                    if (o)
                        throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(),
                    o = !0
                }
        }
        ,
        t.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }
        ;
        var tt = 4096;
        t.prototype.slice = function(e, r) {
            var n = this.length;
            e = ~~e,
            r = void 0 === r ? n : ~~r,
            e < 0 ? (e += n,
            e < 0 && (e = 0)) : e > n && (e = n),
            r < 0 ? (r += n,
            r < 0 && (r = 0)) : r > n && (r = n),
            r < e && (r = e);
            var i;
            if (t.TYPED_ARRAY_SUPPORT)
                i = this.subarray(e, r),
                i.__proto__ = t.prototype;
            else {
                var o = r - e;
                i = new t(o,(void 0));
                for (var a = 0; a < o; ++a)
                    i[a] = this[a + e]
            }
            return i
        }
        ,
        t.prototype.readUIntLE = function(t, e, r) {
            t = 0 | t,
            e = 0 | e,
            r || L(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
                n += this[t + o] * i;
            return n
        }
        ,
        t.prototype.readUIntBE = function(t, e, r) {
            t = 0 | t,
            e = 0 | e,
            r || L(t, e, this.length);
            for (var n = this[t + --e], i = 1; e > 0 && (i *= 256); )
                n += this[t + --e] * i;
            return n
        }
        ,
        t.prototype.readUInt8 = function(t, e) {
            return e || L(t, 1, this.length),
            this[t]
        }
        ,
        t.prototype.readUInt16LE = function(t, e) {
            return e || L(t, 2, this.length),
            this[t] | this[t + 1] << 8
        }
        ,
        t.prototype.readUInt16BE = function(t, e) {
            return e || L(t, 2, this.length),
            this[t] << 8 | this[t + 1]
        }
        ,
        t.prototype.readUInt32LE = function(t, e) {
            return e || L(t, 4, this.length),
            (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }
        ,
        t.prototype.readUInt32BE = function(t, e) {
            return e || L(t, 4, this.length),
            16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }
        ,
        t.prototype.readIntLE = function(t, e, r) {
            t = 0 | t,
            e = 0 | e,
            r || L(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
                n += this[t + o] * i;
            return i *= 128,
            n >= i && (n -= Math.pow(2, 8 * e)),
            n
        }
        ,
        t.prototype.readIntBE = function(t, e, r) {
            t = 0 | t,
            e = 0 | e,
            r || L(t, e, this.length);
            for (var n = e, i = 1, o = this[t + --n]; n > 0 && (i *= 256); )
                o += this[t + --n] * i;
            return i *= 128,
            o >= i && (o -= Math.pow(2, 8 * e)),
            o
        }
        ,
        t.prototype.readInt8 = function(t, e) {
            return e || L(t, 1, this.length),
            128 & this[t] ? (255 - this[t] + 1) * -1 : this[t]
        }
        ,
        t.prototype.readInt16LE = function(t, e) {
            e || L(t, 2, this.length);
            var r = this[t] | this[t + 1] << 8;
            return 32768 & r ? 4294901760 | r : r
        }
        ,
        t.prototype.readInt16BE = function(t, e) {
            e || L(t, 2, this.length);
            var r = this[t + 1] | this[t] << 8;
            return 32768 & r ? 4294901760 | r : r
        }
        ,
        t.prototype.readInt32LE = function(t, e) {
            return e || L(t, 4, this.length),
            this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }
        ,
        t.prototype.readInt32BE = function(t, e) {
            return e || L(t, 4, this.length),
            this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }
        ,
        t.prototype.readFloatLE = function(t, e) {
            return e || L(t, 4, this.length),
            Z.read(this, t, !0, 23, 4)
        }
        ,
        t.prototype.readFloatBE = function(t, e) {
            return e || L(t, 4, this.length),
            Z.read(this, t, !1, 23, 4)
        }
        ,
        t.prototype.readDoubleLE = function(t, e) {
            return e || L(t, 8, this.length),
            Z.read(this, t, !0, 52, 8)
        }
        ,
        t.prototype.readDoubleBE = function(t, e) {
            return e || L(t, 8, this.length),
            Z.read(this, t, !1, 52, 8)
        }
        ,
        t.prototype.writeUIntLE = function(t, e, r, n) {
            if (t = +t,
            e = 0 | e,
            r = 0 | r,
            !n) {
                var i = Math.pow(2, 8 * r) - 1;
                M(this, t, e, r, i, 0)
            }
            var o = 1
              , a = 0;
            for (this[e] = 255 & t; ++a < r && (o *= 256); )
                this[e + a] = t / o & 255;
            return e + r
        }
        ,
        t.prototype.writeUIntBE = function(t, e, r, n) {
            if (t = +t,
            e = 0 | e,
            r = 0 | r,
            !n) {
                var i = Math.pow(2, 8 * r) - 1;
                M(this, t, e, r, i, 0)
            }
            var o = r - 1
              , a = 1;
            for (this[e + o] = 255 & t; --o >= 0 && (a *= 256); )
                this[e + o] = t / a & 255;
            return e + r
        }
        ,
        t.prototype.writeUInt8 = function(e, r, n) {
            return e = +e,
            r = 0 | r,
            n || M(this, e, r, 1, 255, 0),
            t.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            this[r] = 255 & e,
            r + 1
        }
        ,
        t.prototype.writeUInt16LE = function(e, r, n) {
            return e = +e,
            r = 0 | r,
            n || M(this, e, r, 2, 65535, 0),
            t.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & e,
            this[r + 1] = e >>> 8) : N(this, e, r, !0),
            r + 2
        }
        ,
        t.prototype.writeUInt16BE = function(e, r, n) {
            return e = +e,
            r = 0 | r,
            n || M(this, e, r, 2, 65535, 0),
            t.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 8,
            this[r + 1] = 255 & e) : N(this, e, r, !1),
            r + 2
        }
        ,
        t.prototype.writeUInt32LE = function(e, r, n) {
            return e = +e,
            r = 0 | r,
            n || M(this, e, r, 4, 4294967295, 0),
            t.TYPED_ARRAY_SUPPORT ? (this[r + 3] = e >>> 24,
            this[r + 2] = e >>> 16,
            this[r + 1] = e >>> 8,
            this[r] = 255 & e) : F(this, e, r, !0),
            r + 4
        }
        ,
        t.prototype.writeUInt32BE = function(e, r, n) {
            return e = +e,
            r = 0 | r,
            n || M(this, e, r, 4, 4294967295, 0),
            t.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 24,
            this[r + 1] = e >>> 16,
            this[r + 2] = e >>> 8,
            this[r + 3] = 255 & e) : F(this, e, r, !1),
            r + 4
        }
        ,
        t.prototype.writeIntLE = function(t, e, r, n) {
            if (t = +t,
            e = 0 | e,
            !n) {
                var i = Math.pow(2, 8 * r - 1);
                M(this, t, e, r, i - 1, -i)
            }
            var o = 0
              , a = 1
              , s = 0;
            for (this[e] = 255 & t; ++o < r && (a *= 256); )
                t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1),
                this[e + o] = (t / a >> 0) - s & 255;
            return e + r
        }
        ,
        t.prototype.writeIntBE = function(t, e, r, n) {
            if (t = +t,
            e = 0 | e,
            !n) {
                var i = Math.pow(2, 8 * r - 1);
                M(this, t, e, r, i - 1, -i)
            }
            var o = r - 1
              , a = 1
              , s = 0;
            for (this[e + o] = 255 & t; --o >= 0 && (a *= 256); )
                t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1),
                this[e + o] = (t / a >> 0) - s & 255;
            return e + r
        }
        ,
        t.prototype.writeInt8 = function(e, r, n) {
            return e = +e,
            r = 0 | r,
            n || M(this, e, r, 1, 127, -128),
            t.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            e < 0 && (e = 255 + e + 1),
            this[r] = 255 & e,
            r + 1
        }
        ,
        t.prototype.writeInt16LE = function(e, r, n) {
            return e = +e,
            r = 0 | r,
            n || M(this, e, r, 2, 32767, -32768),
            t.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & e,
            this[r + 1] = e >>> 8) : N(this, e, r, !0),
            r + 2
        }
        ,
        t.prototype.writeInt16BE = function(e, r, n) {
            return e = +e,
            r = 0 | r,
            n || M(this, e, r, 2, 32767, -32768),
            t.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 8,
            this[r + 1] = 255 & e) : N(this, e, r, !1),
            r + 2
        }
        ,
        t.prototype.writeInt32LE = function(e, r, n) {
            return e = +e,
            r = 0 | r,
            n || M(this, e, r, 4, 2147483647, -2147483648),
            t.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & e,
            this[r + 1] = e >>> 8,
            this[r + 2] = e >>> 16,
            this[r + 3] = e >>> 24) : F(this, e, r, !0),
            r + 4
        }
        ,
        t.prototype.writeInt32BE = function(e, r, n) {
            return e = +e,
            r = 0 | r,
            n || M(this, e, r, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            t.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 24,
            this[r + 1] = e >>> 16,
            this[r + 2] = e >>> 8,
            this[r + 3] = 255 & e) : F(this, e, r, !1),
            r + 4
        }
        ,
        t.prototype.writeFloatLE = function(t, e, r) {
            return D(this, t, e, !0, r)
        }
        ,
        t.prototype.writeFloatBE = function(t, e, r) {
            return D(this, t, e, !1, r)
        }
        ,
        t.prototype.writeDoubleLE = function(t, e, r) {
            return Y(this, t, e, !0, r)
        }
        ,
        t.prototype.writeDoubleBE = function(t, e, r) {
            return Y(this, t, e, !1, r)
        }
        ,
        t.prototype.copy = function(e, r, n, i) {
            if (n || (n = 0),
            i || 0 === i || (i = this.length),
            r >= e.length && (r = e.length),
            r || (r = 0),
            i > 0 && i < n && (i = n),
            i === n)
                return 0;
            if (0 === e.length || 0 === this.length)
                return 0;
            if (r < 0)
                throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length)
                throw new RangeError("sourceStart out of bounds");
            if (i < 0)
                throw new RangeError("sourceEnd out of bounds");
            i > this.length && (i = this.length),
            e.length - r < i - n && (i = e.length - r + n);
            var o, a = i - n;
            if (this === e && n < r && r < i)
                for (o = a - 1; o >= 0; --o)
                    e[o + r] = this[o + n];
            else if (a < 1e3 || !t.TYPED_ARRAY_SUPPORT)
                for (o = 0; o < a; ++o)
                    e[o + r] = this[o + n];
            else
                Uint8Array.prototype.set.call(e, this.subarray(n, n + a), r);
            return a
        }
        ,
        t.prototype.fill = function(e, r, n, i) {
            if ("string" == typeof e) {
                if ("string" == typeof r ? (i = r,
                r = 0,
                n = this.length) : "string" == typeof n && (i = n,
                n = this.length),
                1 === e.length) {
                    var o = e.charCodeAt(0);
                    o < 256 && (e = o)
                }
                if (void 0 !== i && "string" != typeof i)
                    throw new TypeError("encoding must be a string");
                if ("string" == typeof i && !t.isEncoding(i))
                    throw new TypeError("Unknown encoding: " + i)
            } else
                "number" == typeof e && (e = 255 & e);
            if (r < 0 || this.length < r || this.length < n)
                throw new RangeError("Out of range index");
            if (n <= r)
                return this;
            r >>>= 0,
            n = void 0 === n ? this.length : n >>> 0,
            e || (e = 0);
            var a;
            if ("number" == typeof e)
                for (a = r; a < n; ++a)
                    this[a] = e;
            else {
                var s = t.isBuffer(e) ? e : q(new t(e,i).toString())
                  , u = s.length;
                for (a = 0; a < n - r; ++a)
                    this[a + r] = s[a % u]
            }
            return this
        }
        ;
        var et = /[^+\/0-9A-Za-z-_]/g
    }
    ).call(e, r(2).Buffer, function() {
        return this
    }())
}
, function(t, e) { // 3
    function r(t) {
        var e = typeof t;
        return null != t && ("object" == e || "function" == e)
    }
    t.exports = r
}
, function(t, e, r) { // 4
    var n = r(5)
      , i = n.Symbol;
    t.exports = i
}
, function(t, e, r) { // 5
    var n = r(20)
      , i = "object" == typeof self && self && self.Object === Object && self
      , o = n || i || Function("return this")();
    t.exports = o
}
, function(t, e, r) { // 6
    function n(t, e, r) {
        var n = !0
          , s = !0;
        if ("function" != typeof t)
            throw new TypeError(a);
        return o(r) && (n = "leading"in r ? !!r.leading : n,
        s = "trailing"in r ? !!r.trailing : s),
        i(t, e, {
            leading: n,
            maxWait: e,
            trailing: s
        })
    }
    var i = r(23)
      , o = r(3)
      , a = "Expected a function";
    t.exports = n
}
, function(t, e, r) { // 7 animation??
    "use strict";
    function n(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function i(t, e) {
        if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }
    function o(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    var a = function() {
        function t(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, r, n) {
            return r && t(e.prototype, r),
            n && t(e, n),
            e
        }
    }()
      , s = r(11)
      , u = r(10)
      , l = function(t) { // tはsharkplayerのセレクタ
        function e(t) {
            n(this, e);
            var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
            return r.onManifestLoaded = function(t) {
                r._fps = t.fps
            }
            ,
            r.onReady = function() {
                r._thumbsMode ? r.setCurrentFrame(0) : r.elementInView() && r.start()
            }
            ,
            r.onElementVisibleChanged = function(t) {
                t ? r.start() : r.pause()
            }
            ,
            r.step = function(t) {
                if (r._isPlaying) {
                    var e = t - r._lastTimeStamp;
                    if (e >= 1e3 / r._fps && (r._lastTimeStamp = t,
                    r.setFrame() && ++r._currentFrame >= r._loader.getMovieLength() - 1)) {
                        if (!r._loopPlay)
                            return;
                        r._currentFrame = 0,
                        r._loopCount++
                    }
                    window.requestAnimationFrame(r.step)
                }
            }
            ,
            r._targetImgTag = t,
            r._videoId = t.getAttribute("data-video-id"),
            r._currentFrame = 0,
            r._lastTimeStamp = -1e3,
            r._fps = 20,
            t.dataset.loopPlay && "true" == t.dataset.loopPlay ? r._loopPlay = !0 : r._loopPlay = !1,
            r._loopCount = 0,
            t.dataset.thumbsMode && "true" == t.dataset.thumbsMode ? (r._thumbsMode = !0,
            r._loader = new s.ResourceLoader(t.dataset.manifestUrl,1e3,(void 0),r.onReady)) : (r._thumbsMode = !1,
            r._loader = new s.ResourceLoader(t.dataset.manifestUrl,2,r.onManifestLoaded,r.onReady),
            r.setVisibleChangedCallback(r.onElementVisibleChanged)),
            r._isPlaying = !1,
            r._onStartPlayCallback = void 0,
            r
        }
        return o(e, t),
        a(e, [{
            key: "setStartPlayCallback",
            value: function(t) {
                this._onStartPlayCallback = t,
                this._isPlaying && this._onStartPlayCallback(this._videoId)
            }
        }, {
            key: "getPlayedSeconds",
            value: function() {
                if (this._loader.getManifestLoaded()) {
                    var t = this._loader.getMovieLength() * this._loopCount + this._currentFrame;
                    return t / this._fps
                }
                return 0
            }
        }, {
            key: "getCurrentFrame",
            value: function() {
                return this._loader.getManifestLoaded() ? this._currentFrame : 0
            }
        }, {
            key: "setCurrentFrame",
            value: function(t) {
                this._currentFrame = t,
                this.setFrame()
            }
        }, {
            key: "getLoopCount",
            value: function() {
                return this._loopCount
            }
        }, {
            key: "setFrame",
            value: function() {
                var t = this._loader.getFrame(this._currentFrame);
                return !!t && (this._targetImgTag.src = this._loader.getFrame(this._currentFrame),
                !0)
            }
        }, {
            key: "start",
            value: function() {
                this._isPlaying || (window.requestAnimationFrame(this.step),
                this._isPlaying = !0,
                this._onStartPlayCallback && this._onStartPlayCallback(this._videoId))
            }
        }, {
            key: "pause",
            value: function() {
                this._isPlaying && (this._isPlaying = !1)
            }
        }]),
        e // これが返る
    }(u.InViewport);
    e.BullPlayer = l
}
, function(t, e, r) { // 8 解析??
    "use strict";
    function n(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    var i = function() {
        function t(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, r, n) {
            return r && t(e.prototype, r),
            n && t(e, n),
            e
        }
    }()
      , o = r(1)
      , a = r(9)
      , s = r(6)
      , u = r(15)
      , l = "https://t.shark-lp.jp/api/v1/track"
      , c = function() {
        function t(e) {
            var r = this;
            n(this, t),
            this.videoPlayTrack = function(t) {
                var e = r.createBaseTrackingInfoV07();
                e.et = "start_video",
                e.ed = t,
                r.sendTrack(e),
                r.flowTrack("video_" + t)
            }
            ,
            this.conversionTrack = function(t) {
                var e = t.target;
                if ("a" === e.tagName.toLowerCase()) {
                    if (e.href.startsWith("#"))
                        return;
                    if (e.href.startsWith("javascript:"))
                        return
                }
                var n = r.createBaseTrackingInfoV07()
                  , i = o.Util.getXpath(e);
                n.ed = i,
                n.et = "link",
                r.sendTrack(n),
                r.flowTrack("link_" + i)
            }
            ,
            this.scrollTrack = function() {
                r.resetTimeTrack();
                var t = o.Util.getScrollPercent()
                  , e = r.createBaseTrackingInfoV07();
                e.et = "scroll",
                e.sp = t,
                r.sendTrack(e)
            }
            ,
            this.timeTrack = function() {
                var t = r.createBaseTrackingInfoV07();
                t.et = "time",
                r.sendTrack(t),
                r._timeTrackTimeoutId = -1,
                r.resetTimeTrack()
            }
            ,
            this.flowTrack = function(t) {
                if (r._lastAction != t) {
                    var e = r.createBaseTrackingInfoV07();
                    e.et = "flow",
                    e.ed = r._lastAction + "," + t,
                    t.startsWith("link_") || (r._lastAction = t),
                    r.sendTrack(e)
                }
            }
            ,
            this.clickTrack = function(t) {
                r.resetTimeTrack();
                var e = t.target
                  , n = o.Util.getXpath(e)
                  , i = window.getComputedStyle(e)
                  , a = t.offsetX / (e.scrollWidth + parseFloat(i.marginLeft) + parseFloat(i.marginRight) + parseFloat(i.borderLeftWidth) + parseFloat(i.borderRightWidth))
                  , s = t.offsetY / (e.scrollHeight + parseFloat(i.borderBottomWidth) + parseFloat(i.borderTopWidth))
                  , u = r.createBaseTrackingInfoV07();
                u.et = "click",
                u.cex = n,
                u.cepx = a,
                u.cepy = s,
                r.sendTrack(u)
            }
            ;
            var i = /\/\/(localhost|(dev\.)?manage\.shark-lp\.jp)/;
            this._ignoreTrack = i.test(location.href),
            this._userId = this.getUserId(),
            this._landingTime = Date.now(),
            this._visitCount = this.getVisitCount(),
            this._timeTrackTimeoutId = -1,
            this._lp_id = e,
            this._lastAction = "pv",
            this._shark_eye = o.Util.getSharkEye(document.location.search);
            for (var a = document.getElementsByTagName("a"), u = a.length, l = 0; l < u; l++)
                o.Util.bindEvent(a[l], "click", this.conversionTrack);
            for (var c = document.getElementsByTagName("form"), f = c.length, h = 0; h < f; h++)
                o.Util.bindEvent(c[h], "submit", this.conversionTrack);
            o.Util.bindEvent(document, "scroll", s(this.scrollTrack, 3e3)),
            o.Util.bindEvent(document, "click", s(this.clickTrack, 3e3));
            for (var p in window.shark_players) {
                var d = window.shark_players[p];
                d.setStartPlayCallback(this.videoPlayTrack)
            }
            this.pvTrack(),
            this.resetTimeTrack()
        }
        return i(t, [{
            key: "resetTimeTrack",
            value: function() {
                this._timeTrackTimeoutId !== -1 && window.clearTimeout(this._timeTrackTimeoutId),
                this._timeTrackTimeoutId = window.setTimeout(this.timeTrack, 3e3)
            }
        }, {
            key: "getUserId",
            value: function() {
                var t = a.CookieUtil.getItem("_shklp.uid");
                return void 0 === t && (t = o.Util.uuidv4(),
                a.CookieUtil.setItem("_shklp.uid", t, a.FutureDate.afterDays(720), "/")),
                t
            }
        }, {
            key: "getVisitCount",
            value: function() {
                var t = a.CookieUtil.getItem("_shklp.vs");
                return void 0 === t ? t = 1 : t++,
                a.CookieUtil.setItem("_shklp.vs", t, a.FutureDate.afterDays(720)),
                t
            }
        }, {
            key: "pvTrack",
            value: function() {
                var t = this.createBaseTrackingInfoV07();
                t.et = "pv",
                this.sendTrack(t)
            }
        }, {
            key: "createBaseTrackingInfoV07",
            value: function() {
                var t = [];
                for (var e in window.shark_players) {
                    var r = window.shark_players[e];
                    t.push({
                        vi: e,
                        vlc: r.getLoopCount(),
                        vfi: r.getCurrentFrame(),
                        vps: r.getPlayedSeconds()
                    })
                }
                return {
                    ui: this._userId,
                    lu: location.href,
                    li: this._lp_id,
                    lvc: this._visitCount,
                    llt: this._landingTime,
                    lr: document.referrer,
                    lm: this._shark_eye,
                    eem: Date.now() - this._landingTime,
                    tv: 1,
                    vil: t,
                    co: navigator.platform,
                    cua: navigator.userAgent,
                    cbn: navigator.appName,
                    cbv: navigator.appVersion,
                    cal: navigator.language,
                    csw: screen.width,
                    csh: screen.height
                }
            }
        }, {
            key: "sendTrack",
            value: function(t) {
                if (this._ignoreTrack)
                    return void console.log("manage.shark-lp.jp or localhost is Ignore Tracking");
                if (navigator.sendBeacon) {
                    var e = new Blob([JSON.stringify(t)],{
                        type: "application/json"
                    });
                    navigator.sendBeacon(l, e) //l = https://t.shark-lp.jp/api/v1/track
                } else { // <image src="~"でGETを用いて、データを送信
                    var r = JSON.stringify(t)
                      , n = "?d=" + u["default"].encode(r)
                      , i = new Image;
                    i.src = l + n
                }
            }
        }]),
        t
    }();
    e.ClickTracker = c
}
, function(t, e) { // 9 cookie操作?
    "use strict";
    function r(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    var n = function() {
        function t(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, r, n) {
            return r && t(e.prototype, r),
            n && t(e, n),
            e
        }
    }()
      , i = function() {
        function t() {
            r(this, t)
        }
        return n(t, null, [{
            key: "getItem",
            value: function(t) {
                if (t && this.hasItem(t))
                    return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
            }
        }, {
            key: "setItem",
            value: function(t, e, r, n, i) {
                var o = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
                if (t && !/^(?:expires|max\-age|path|domain|secure)$/i.test(t)) {
                    var a = "";
                    if (r)
                        switch (r.constructor) {
                        case Number:
                            a = r === 1 / 0 ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + r;
                            break;
                        case String:
                            a = "; expires=" + r;
                            break;
                        case Date:
                            a = "; expires=" + r.toUTCString()
                        }
                    document.cookie = escape(t) + "=" + escape(e) + a + (i ? "; domain=" + i : "") + (n ? "; path=" + n : "") + (o ? "; secure" : "")
                }
            }
        }, {
            key: "removeItem",
            value: function(t, e) {
                t && this.hasItem(t) && (document.cookie = escape(t) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (e ? "; path=" + e : ""))
            }
        }, {
            key: "hasItem",
            value: function(t) {
                return new RegExp("(?:^|;\\s*)" + escape(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
            }
        }, {
            key: "keys",
            value: function() {
                for (var t = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), e = 0; e < t.length; e++)
                    t[e] = unescape(t[e]);
                return t
            }
        }, {
            key: "checkEnabled",
            value: function() {
                var e = !1;
                try {
                    var r = "testEnabled";
                    t.setItem(r, "test"),
                    e = !(void 0 === t.getItem(r)),
                    e && t.removeItem(r)
                } catch (n) {
                    return !1
                }
                return e
            }
        }]),
        t
    }();
    e.CookieUtil = i;
    var o = function() {
        function t() {
            r(this, t)
        }
        return n(t, null, [{
            key: "getNow",
            value: function() {
                return new Date
            }
        }, {
            key: "afterSeconds",
            value: function(e) {
                var r = t.getNow();
                return r.setTime(r.getTime() + 1e3 * e),
                r
            }
        }, {
            key: "afterMinutes",
            value: function(e) {
                var r = t.getNow();
                return r.setTime(r.getTime() + 60 * e * 1e3),
                r
            }
        }, {
            key: "afterHours",
            value: function(e) {
                var r = t.getNow();
                return r.setTime(r.getTime() + 60 * e * 60 * 1e3),
                r
            }
        }, {
            key: "afterDays",
            value: function(e) {
                var r = t.getNow();
                return r.setTime(r.getTime() + 24 * e * 60 * 60 * 1e3),
                r
            }
        }]),
        t
    }();
    e.FutureDate = o
}
, function(t, e, r) { // 10
    "use strict";
    function n(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    var i = function() {
        function t(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, r, n) {
            return r && t(e.prototype, r),
            n && t(e, n),
            e
        }
    }()
      , o = r(1)
      , a = r(6)
      , s = function() {
        function t(e) {
            var r = this;
            n(this, t),
            this._visible = !1,
            this.onVisibilityChanged = function() { // スクロールで停止
                var t = r.elementInView();
                t !== r._visible && (r._visible = t,
                r._onVisibilityChangedCallback && r._onVisibilityChangedCallback(t))
            }
            ,
            this._element = e,
            this._visible = this.elementInView(),
            o.Util.bindEvent(window, "resize", a(this.onVisibilityChanged, 200)),
            o.Util.bindEvent(window, "scroll", a(this.onVisibilityChanged, 200))
        }
        return i(t, [{
            key: "setVisibleChangedCallback",
            value: function(t) {
                this._onVisibilityChangedCallback = t
            }
        }, {
            key: "elementInView",
            value: function() {
                var t = this._element.getBoundingClientRect();
                return t.right >= 0 && t.bottom >= 0 && t.left <= (window.innerWidth || document.documentElement.clientWidth) && t.top <= (window.innerHeight || document.documentElement.clientHeight)
            }
        }]),
        t
    }();
    e.InViewport = s
}
, function(t, e) { // 11 動画読み込み?
    "use strict";
    function r(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    }
    : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }
      , i = function() {
        function t(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, r, n) {
            return r && t(e.prototype, r),
            n && t(e, n),
            e
        }
    }()
      , o = function() {
        function t(e, n, i, o) {
            var a = this;
            r(this, t),
            this.FRAMES_PER_BLOCK = 10,
            this.onManifestLoaded = function(t) {
                a._manifest = JSON.parse(t),
                a._loadingBlock = Array.apply(void 0, { //a._loadingBlock = [0, 0, 0, 0, ...]
                    length: a._manifest.resources.length
                }).map(function() {
                    return 0
                }),
                a.downloadResource(0),
                a._manifestLoaded = !0,
                a._onManifestLoadedCallback && a._onManifestLoadedCallback(a._manifest)
            }
            ,
            this.onBlockDownloaded = function(t) {
                var e = JSON.parse(t);
                if (0 != e.length) {
                    var r = Math.floor(e[0].f / a.FRAMES_PER_BLOCK);
                    a._loadingBlock[r] = 2;
                    for (var n in e)
                        a._imageList[e[n].f] = e[n].d;
                    if (!a._initialBuffered) {
                        var i = Math.floor(a._manifest.fps * a._bufferSeconds / a.FRAMES_PER_BLOCK) - 1;
                        i > a._manifest.resources.length - 1 && (i = a._manifest.resources.length - 1),
                        a._loadingBlock.slice(0, i).filter(function(t) {
                            return 2 === t
                        }).length === i && (a._initialBuffered = !0,
                        a._onReadyCallback())
                    }
                }
            }
            ,
            this._initialBuffered = !1,
            this._imageList = [],
            this._manifestUrl = e,
            this._onManifestLoadedCallback = i,
            this._onReadyCallback = o,
            this._bufferSeconds = n,
            this._manifestLoaded = !1,
            this.getFile(this._manifestUrl, this.onManifestLoaded)
        }
        return i(t, [{
            key: "getMovieLength",
            value: function() {
                return this._manifest.length
            }
        }, {
            key: "getFrame",
            value: function(t) {
                return this.downloadResource(t),
                this._imageList[t]
            }
        }, {
            key: "getManifestLoaded",
            value: function() {
                return this._manifestLoaded
            }
        }, {
            key: "downloadResource",
            value: function(t) {
                var e = t + this._manifest.fps * this._bufferSeconds;
                e > this._manifest.length && (e = this._manifest.length);
                var r = Math.floor(t / this.FRAMES_PER_BLOCK)
                  , n = Math.floor(e / this.FRAMES_PER_BLOCK)
                  , i = this._loadingBlock.slice(r, n + 1).findIndex(function(t) {
                    return 0 === t
                });
                if (i !== -1)
                    for (var o = r; o <= n; o++)
                        0 === this._loadingBlock[o] && (this.getFile(this._manifest.resources[o], this.onBlockDownloaded),
                        this._loadingBlock[o] = 1)
            }
        }, {
            key: "getFile",
            value: function(t, e) {
                var r = new XMLHttpRequest;
                r && (void 0 !== n(r.onload) ? r.onload = function(t) {
                    e(r.responseText),
                    r = void 0
                }
                : r.onreadystatechange = function(t) {
                    4 === r.readyState && (e(r.responseText),
                    r = void 0)
                }
                ,
                r.open("GET", t, !0),
                r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
                r.send(void 0))
            }
        }]),
        t
    }();
    e.ResourceLoader = o
}
, function(t, e) { // 12
    "use strict";
    function r(t) {
        var e = t.length;
        if (e % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
        return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0
    }
    function n(t) {
        return 3 * t.length / 4 - r(t)
    }
    function i(t) {
        var e, n, i, o, a, s, u = t.length;
        a = r(t),
        s = new c(3 * u / 4 - a),
        i = a > 0 ? u - 4 : u;
        var f = 0;
        for (e = 0,
        n = 0; e < i; e += 4,
        n += 3)
            o = l[t.charCodeAt(e)] << 18 | l[t.charCodeAt(e + 1)] << 12 | l[t.charCodeAt(e + 2)] << 6 | l[t.charCodeAt(e + 3)],
            s[f++] = o >> 16 & 255,
            s[f++] = o >> 8 & 255,
            s[f++] = 255 & o;
        return 2 === a ? (o = l[t.charCodeAt(e)] << 2 | l[t.charCodeAt(e + 1)] >> 4,
        s[f++] = 255 & o) : 1 === a && (o = l[t.charCodeAt(e)] << 10 | l[t.charCodeAt(e + 1)] << 4 | l[t.charCodeAt(e + 2)] >> 2,
        s[f++] = o >> 8 & 255,
        s[f++] = 255 & o),
        s
    }
    function o(t) {
        return u[t >> 18 & 63] + u[t >> 12 & 63] + u[t >> 6 & 63] + u[63 & t]
    }
    function a(t, e, r) {
        for (var n, i = [], a = e; a < r; a += 3)
            n = (t[a] << 16) + (t[a + 1] << 8) + t[a + 2],
            i.push(o(n));
        return i.join("")
    }
    function s(t) {
        for (var e, r = t.length, n = r % 3, i = "", o = [], s = 16383, l = 0, c = r - n; l < c; l += s)
            o.push(a(t, l, l + s > c ? c : l + s));
        return 1 === n ? (e = t[r - 1],
        i += u[e >> 2],
        i += u[e << 4 & 63],
        i += "==") : 2 === n && (e = (t[r - 2] << 8) + t[r - 1],
        i += u[e >> 10],
        i += u[e >> 4 & 63],
        i += u[e << 2 & 63],
        i += "="),
        o.push(i),
        o.join("")
    }
    e.byteLength = n,
    e.toByteArray = i,
    e.fromByteArray = s;
    for (var u = [], l = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, p = f.length; h < p; ++h)
        u[h] = f[h],
        l[f.charCodeAt(h)] = h;
    l["-".charCodeAt(0)] = 62,
    l["_".charCodeAt(0)] = 63
}
, function(t, e, r) { // 13
    (function(t) {
        "use strict";
        function n(e, r) {
            return void 0 === r && (r = "utf8"),
            a(t.isBuffer(e) ? e.toString("base64") : new t(e,r).toString("base64"))
        }
        function i(e, r) {
            return void 0 === r && (r = "utf8"),
            new t(o(e),"base64").toString(r)
        }
        function o(t) {
            return t = t.toString(),
            u["default"](t).replace(/\-/g, "+").replace(/_/g, "/")
        }
        function a(t) {
            return t.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
        }
        function s(e) {
            return new t(o(e),"base64")
        }
        var u = r(14)
          , l = n;
        l.encode = n,
        l.decode = i,
        l.toBase64 = o,
        l.fromBase64 = a,
        l.toBuffer = s,
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e["default"] = l
    }
    ).call(e, r(2).Buffer)
}
, function(t, e, r) { // 14
    (function(t) {
        "use strict";
        function r(e) {
            var r = 4
              , n = e.length
              , i = n % r;
            if (!i)
                return e;
            var o = n
              , a = r - i
              , s = n + a
              , u = new t(s);
            for (u.write(e); a--; )
                u.write("=", o++);
            return u.toString()
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e["default"] = r
    }
    ).call(e, r(2).Buffer)
}
, function(t, e, r) { // 15
    t.exports = r(13)["default"],
    t.exports["default"] = t.exports
}
, function(t, e) { // 16
    e.read = function(t, e, r, n, i) {
        var o, a, s = 8 * i - n - 1, u = (1 << s) - 1, l = u >> 1, c = -7, f = r ? i - 1 : 0, h = r ? -1 : 1, p = t[e + f];
        for (f += h,
        o = p & (1 << -c) - 1,
        p >>= -c,
        c += s; c > 0; o = 256 * o + t[e + f],
        f += h,
        c -= 8)
            ;
        for (a = o & (1 << -c) - 1,
        o >>= -c,
        c += n; c > 0; a = 256 * a + t[e + f],
        f += h,
        c -= 8)
            ;
        if (0 === o)
            o = 1 - l;
        else {
            if (o === u)
                return a ? NaN : (p ? -1 : 1) * (1 / 0);
            a += Math.pow(2, n),
            o -= l
        }
        return (p ? -1 : 1) * a * Math.pow(2, o - n)
    }
    ,
    e.write = function(t, e, r, n, i, o) {
        var a, s, u, l = 8 * o - i - 1, c = (1 << l) - 1, f = c >> 1, h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = n ? 0 : o - 1, d = n ? 1 : -1, g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e),
        isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0,
        a = c) : (a = Math.floor(Math.log(e) / Math.LN2),
        e * (u = Math.pow(2, -a)) < 1 && (a--,
        u *= 2),
        e += a + f >= 1 ? h / u : h * Math.pow(2, 1 - f),
        e * u >= 2 && (a++,
        u /= 2),
        a + f >= c ? (s = 0,
        a = c) : a + f >= 1 ? (s = (e * u - 1) * Math.pow(2, i),
        a += f) : (s = e * Math.pow(2, f - 1) * Math.pow(2, i),
        a = 0)); i >= 8; t[r + p] = 255 & s,
        p += d,
        s /= 256,
        i -= 8)
            ;
        for (a = a << i | s,
        l += i; l > 0; t[r + p] = 255 & a,
        p += d,
        a /= 256,
        l -= 8)
            ;
        t[r + p - d] |= 128 * g
    }
}
, function(t, e) { // 17
    var r = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == r.call(t)
    }
}
, function(t, e) { // 18
    function r(t, e, r, i) {
        return JSON.stringify(t, n(e, i), r)
    }
    function n(t, e) {
        var r = []
          , n = [];
        return null == e && (e = function(t, e) {
            return r[0] === e ? "[Circular ~]" : "[Circular ~." + n.slice(0, r.indexOf(e)).join(".") + "]"
        }
        ),
        function(i, o) {
            if (r.length > 0) {
                var a = r.indexOf(this);
                ~a ? r.splice(a + 1) : r.push(this),
                ~a ? n.splice(a, 1 / 0, i) : n.push(i),
                ~r.indexOf(o) && (o = e.call(this, i, o))
            } else
                r.push(o);
            return null == t ? o : t.call(this, i, o)
        }
    }
    e = t.exports = r,
    e.getSerialize = n
}
, function(t, e, r) { // 19
    function n(t) {
        return null == t ? void 0 === t ? u : s : (t = Object(t),
        l && l in t ? o(t) : a(t))
    }
    var i = r(4)
      , o = r(21)
      , a = r(22)
      , s = "[object Null]"
      , u = "[object Undefined]"
      , l = i ? i.toStringTag : void 0;
    t.exports = n
}
, function(t, e) { // 20
    (function(e) {
        var r = "object" == typeof e && e && e.Object === Object && e;
        t.exports = r
    }
    ).call(e, function() {
        return this
    }())
}
, function(t, e, r) { // 21
    function n(t) {
        var e = a.call(t, u)
          , r = t[u];
        try {
            t[u] = void 0;
            var n = !0
        } catch (i) {}
        var o = s.call(t);
        return n && (e ? t[u] = r : delete t[u]),
        o
    }
    var i = r(4)
      , o = Object.prototype
      , a = o.hasOwnProperty
      , s = o.toString
      , u = i ? i.toStringTag : void 0;
    t.exports = n
}
, function(t, e) { // 22
    function r(t) {
        return i.call(t)
    }
    var n = Object.prototype
      , i = n.toString;
    t.exports = r
}
, function(t, e, r) { // 23
    function n(t, e, r) {
        function n(e) {
            var r = _
              , n = y;
            return _ = y = void 0,
            T = e,
            w = t.apply(n, r)
        }
        function c(t) {
            return T = t,
            E = setTimeout(p, e),
            x ? n(t) : w
        }
        function f(t) {
            var r = t - k
              , n = t - T
              , i = e - r;
            return S ? l(i, b - n) : i
        }
        function h(t) {
            var r = t - k
              , n = t - T;
            return void 0 === k || r >= e || r < 0 || S && n >= b
        }
        function p() {
            var t = o();
            return h(t) ? d(t) : void (E = setTimeout(p, f(t)))
        }
        function d(t) {
            return E = void 0,
            C && _ ? n(t) : (_ = y = void 0,
            w)
        }
        function g() {
            void 0 !== E && clearTimeout(E),
            T = 0,
            _ = k = y = E = void 0
        }
        function v() {
            return void 0 === E ? w : d(o())
        }
        function m() {
            var t = o()
              , r = h(t);
            if (_ = arguments,
            y = this,
            k = t,
            r) {
                if (void 0 === E)
                    return c(k);
                if (S)
                    return E = setTimeout(p, e),
                    n(k)
            }
            return void 0 === E && (E = setTimeout(p, e)),
            w
        }
        var _, y, b, w, E, k, T = 0, x = !1, S = !1, C = !0;
        if ("function" != typeof t)
            throw new TypeError(s);
        return e = a(e) || 0,
        i(r) && (x = !!r.leading,
        S = "maxWait"in r,
        b = S ? u(a(r.maxWait) || 0, e) : b,
        C = "trailing"in r ? !!r.trailing : C),
        m.cancel = g,
        m.flush = v,
        m
    }
    var i = r(3)
      , o = r(26)
      , a = r(27)
      , s = "Expected a function"
      , u = Math.max
      , l = Math.min;
    t.exports = n
}
, function(t, e) { // 24
    function r(t) {
        return null != t && "object" == typeof t
    }
    t.exports = r
}
, function(t, e, r) { // 25
    function n(t) {
        return "symbol" == typeof t || o(t) && i(t) == a
    }
    var i = r(19)
      , o = r(24)
      , a = "[object Symbol]";
    t.exports = n
}
, function(t, e, r) { // 26
    var n = r(5)
      , i = function() {
        return n.Date.now()
    };
    t.exports = i
}
, function(t, e, r) { // 27
    function n(t) {
        if ("number" == typeof t)
            return t;
        if (o(t))
            return a;
        if (i(t)) {
            var e = "function" == typeof t.valueOf ? t.valueOf() : t;
            t = i(e) ? e + "" : e
        }
        if ("string" != typeof t)
            return 0 === t ? t : +t;
        t = t.replace(s, "");
        var r = l.test(t);
        return r || c.test(t) ? f(t.slice(2), r ? 2 : 8) : u.test(t) ? a : +t
    }
    var i = r(3)
      , o = r(25)
      , a = NaN
      , s = /^\s+|\s+$/g
      , u = /^[-+]0x[0-9a-f]+$/i
      , l = /^0b[01]+$/i
      , c = /^0o[0-7]+$/i
      , f = parseInt;
    t.exports = n
}
, function(t, e) { // 28
    "use strict";
    function r(t) {
        this.name = "RavenConfigError",
        this.message = t
    }
    r.prototype = new Error,
    r.prototype.constructor = r,
    t.exports = r
}
, function(t, e) { // 29
    "use strict";
    var r = function(t, e, r) {
        var n = t[e]
          , i = t;
        if (e in t) {
            var o = "warn" === e ? "warning" : e;
            t[e] = function() {
                var t = [].slice.call(arguments)
                  , e = "" + t.join(" ")
                  , a = {
                    level: o,
                    logger: "console",
                    extra: {
                        arguments: t
                    }
                };
                r && r(e, a),
                n && Function.prototype.apply.call(n, i, t)
            }
        }
    };
    t.exports = {
        wrapMethod: r
    }
}
, function(t, e, r) { // 30 初期設定?
    "use strict";
    function n() {
        return +new Date
    }
    function i() {
        this._hasJSON = !("object" != typeof JSON || !JSON.stringify),
        this._hasDocument = !o(A),
        this._lastCapturedException = null,
        this._lastEventId = null,
        this._globalServer = null,
        this._globalKey = null,
        this._globalProject = null,
        this._globalContext = {},
        this._globalOptions = {
            logger: "javascript",
            ignoreErrors: [],
            ignoreUrls: [],
            whitelistUrls: [],
            includePaths: [],
            crossOrigin: "anonymous",
            collectWindowErrors: !0,
            maxMessageLength: 0,
            stackTraceLimit: 50,
            autoBreadcrumbs: !0
        },
        this._ignoreOnError = 0,
        this._isRavenInstalled = !1,
        this._originalErrorStackTraceLimit = Error.stackTraceLimit,
        this._originalConsole = R.console || {},
        this._originalConsoleMethods = {},
        this._plugins = [],
        this._startTime = n(),
        this._wrappedBuiltIns = [],
        this._breadcrumbs = [],
        this._lastCapturedEvent = null,
        this._keypressTimeout,
        this._location = R.location,
        this._lastHref = this._location && this._location.href;
        for (var t in this._originalConsole)
            this._originalConsoleMethods[t] = this._originalConsole[t]
    }
    function o(t) {
        return void 0 === t
    }
    function a(t) {
        return "function" == typeof t
    }
    function s(t) {
        return "[object String]" === P.toString.call(t)
    }
    function u(t) {
        return "object" == typeof t && null !== t
    }
    function l(t) {
        for (var e in t)
            return !1;
        return !0
    }
    function c(t) {
        var e = P.toString.call(t);
        return u(t) && "[object Error]" === e || "[object Exception]" === e || t instanceof Error
    }
    function f(t, e) {
        var r, n;
        if (o(t.length))
            for (r in t)
                d(t, r) && e.call(null, r, t[r]);
        else if (n = t.length)
            for (r = 0; r < n; r++)
                e.call(null, r, t[r])
    }
    function h(t, e) {
        return e ? (f(e, function(e, r) {
            t[e] = r
        }),
        t) : t
    }
    function p(t, e) {
        return !e || t.length <= e ? t : t.substr(0, e) + "\u2026"
    }
    function d(t, e) {
        return P.hasOwnProperty.call(t, e)
    }
    function g(t) {
        for (var e, r = [], n = 0, i = t.length; n < i; n++)
            e = t[n],
            s(e) ? r.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : e && e.source && r.push(e.source);
        return new RegExp(r.join("|"),"i")
    }
    function v(t) {
        var e = [];
        return f(t, function(t, r) {
            e.push(encodeURIComponent(t) + "=" + encodeURIComponent(r))
        }),
        e.join("&")
    }
    function m(t) {
        var e = t.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!e)
            return {};
        var r = e[6] || ""
          , n = e[8] || "";
        return {
            protocol: e[2],
            host: e[4],
            path: e[5],
            relative: e[5] + r + n
        }
    }
    function _() {
        var t = window.crypto || window.msCrypto;
        if (!o(t) && t.getRandomValues) {
            var e = new Uint16Array(8);
            t.getRandomValues(e),
            e[3] = 4095 & e[3] | 16384,
            e[4] = 16383 & e[4] | 32768;
            var r = function(t) {
                for (var e = t.toString(16); e.length < 4; )
                    e = "0" + e;
                return e
            };
            return r(e[0]) + r(e[1]) + r(e[2]) + r(e[3]) + r(e[4]) + r(e[5]) + r(e[6]) + r(e[7])
        }
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(t) {
            var e = 16 * Math.random() | 0
              , r = "x" === t ? e : 3 & e | 8;
            return r.toString(16)
        })
    }
    function y(t) {
        for (var e, r = 5, n = 80, i = [], o = 0, a = 0, s = " > ", u = s.length; t && o++ < r && (e = b(t),
        !("html" === e || o > 1 && a + i.length * u + e.length >= n)); )
            i.push(e),
            a += e.length,
            t = t.parentNode;
        return i.reverse().join(s)
    }
    function b(t) {
        var e, r, n, i, o, a = [];
        if (!t || !t.tagName)
            return "";
        if (a.push(t.tagName.toLowerCase()),
        t.id && a.push("#" + t.id),
        e = t.className,
        e && s(e))
            for (r = e.split(" "),
            o = 0; o < r.length; o++)
                a.push("." + r[o]);
        var u = ["type", "name", "title", "alt"];
        for (o = 0; o < u.length; o++)
            n = u[o],
            i = t.getAttribute(n),
            i && a.push("[" + n + '="' + i + '"]');
        return a.join("")
    }
    function w(t, e, r, n) {
        var i = t[e];
        t[e] = r(i),
        n && n.push([t, e, i])
    }
    var E = r(32) //スタックトレース
      , k = r(28) //エラー
      , T = r(18) // json変換
      , x = r(29).wrapMethod
      , S = "source protocol user pass host port path".split(" ")
      , C = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/
      , R = "undefined" != typeof window ? window : void 0
      , A = R && R.document;
    i.prototype = { //本体
        VERSION: "3.8.0",
        debug: !1,
        TraceKit: E, //スタックトレース
        config: function(t, e) {
            var r = this;
            if (r._globalServer)
                return this._logDebug("error", "Error: Raven has already been configured"),
                r;
            if (!t)
                return r;
            var n = r._globalOptions;
            e && f(e, function(t, e) {
                "tags" === t || "extra" === t ? r._globalContext[t] = e : n[t] = e
            }),
            r.setDSN(t),
            n.ignoreErrors.push(/^Script error\.?$/),
            n.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),
            n.ignoreErrors = g(n.ignoreErrors),
            n.ignoreUrls = !!n.ignoreUrls.length && g(n.ignoreUrls),
            n.whitelistUrls = !!n.whitelistUrls.length && g(n.whitelistUrls),
            n.includePaths = g(n.includePaths),
            n.maxBreadcrumbs = Math.max(0, Math.min(n.maxBreadcrumbs || 100, 100));
            var i = {
                xhr: !0,
                console: !0,
                dom: !0,
                location: !0
            }
              , o = n.autoBreadcrumbs;
            return "[object Object]" === {}.toString.call(o) ? o = h(i, o) : o !== !1 && (o = i),
            n.autoBreadcrumbs = o,
            E.collectWindowErrors = !!n.collectWindowErrors,
            r
        },
        install: function() {
            var t = this;
            return t.isSetup() && !t._isRavenInstalled && (E.report.subscribe(function() {
                t._handleOnErrorStackInfo.apply(t, arguments)
            }),
            t._instrumentTryCatch(),
            t._globalOptions.autoBreadcrumbs && t._instrumentBreadcrumbs(),
            t._drainPlugins(),
            t._isRavenInstalled = !0),
            Error.stackTraceLimit = t._globalOptions.stackTraceLimit,
            this
        },
        setDSN: function(t) { //sentry
            var e = this
              , r = e._parseDSN(t)
              , n = r.path.lastIndexOf("/")
              , i = r.path.substr(1, n);
            e._dsn = t,
            e._globalKey = r.user,
            e._globalSecret = r.pass && r.pass.substr(1),
            e._globalProject = r.path.substr(n + 1),
            e._globalServer = e._getGlobalServer(r),
            e._globalEndpoint = e._globalServer + "/" + i + "api/" + e._globalProject + "/store/"
        },
        context: function(t, e, r) {
            return a(t) && (r = e || [],
            e = t,
            t = void 0),
            this.wrap(t, e).apply(this, r)
        },
        wrap: function(t, e, r) {
            function n() {
                var n = []
                  , o = arguments.length
                  , s = !t || t && t.deep !== !1;
                for (r && a(r) && r.apply(this, arguments); o--; )
                    n[o] = s ? i.wrap(t, arguments[o]) : arguments[o];
                try {
                    return e.apply(this, n)
                } catch (u) {
                    throw i._ignoreNextOnError(),
                    i.captureException(u, t),
                    u
                }
            }
            var i = this;
            if (o(e) && !a(t))
                return t;
            if (a(t) && (e = t,
            t = void 0),
            !a(e))
                return e;
            try {
                if (e.__raven__)
                    return e;
                if (e.__raven_wrapper__)
                    return e.__raven_wrapper__
            } catch (s) {
                return e
            }
            for (var u in e)
                d(e, u) && (n[u] = e[u]);
            return n.prototype = e.prototype,
            e.__raven_wrapper__ = n,
            n.__raven__ = !0,
            n.__inner__ = e,
            n
        },
        uninstall: function() {
            return E.report.uninstall(),
            this._restoreBuiltIns(),
            Error.stackTraceLimit = this._originalErrorStackTraceLimit,
            this._isRavenInstalled = !1,
            this
        },
        captureException: function(t, e) {
            if (!c(t))
                return this.captureMessage(t, h({
                    trimHeadFrames: 1,
                    stacktrace: !0
                }, e));
            this._lastCapturedException = t;
            try {
                var r = E.computeStackTrace(t);
                this._handleStackInfo(r, e)
            } catch (n) {
                if (t !== n)
                    throw n
            }
            return this
        },
        captureMessage: function(t, e) {
            if (!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(t)) {
                var r = h({
                    message: t + ""
                }, e);
                if (e && e.stacktrace) {
                    var n;
                    try {
                        throw new Error(t)
                    } catch (i) {
                        n = i
                    }
                    n.name = null,
                    e = h({
                        fingerprint: t,
                        trimHeadFrames: (e.trimHeadFrames || 0) + 1
                    }, e);
                    var o = E.computeStackTrace(n)
                      , a = this._prepareFrames(o, e);
                    r.stacktrace = {
                        frames: a.reverse()
                    }
                }
                return this._send(r),
                this
            }
        },
        captureBreadcrumb: function(t) {
            var e = h({
                timestamp: n() / 1e3
            }, t);
            return this._breadcrumbs.push(e),
            this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs && this._breadcrumbs.shift(),
            this
        },
        addPlugin: function(t) {
            var e = [].slice.call(arguments, 1);
            return this._plugins.push([t, e]),
            this._isRavenInstalled && this._drainPlugins(),
            this
        },
        setUserContext: function(t) {
            return this._globalContext.user = t,
            this
        },
        setExtraContext: function(t) {
            return this._mergeContext("extra", t),
            this
        },
        setTagsContext: function(t) {
            return this._mergeContext("tags", t),
            this
        },
        clearContext: function() {
            return this._globalContext = {},
            this
        },
        getContext: function() {
            return JSON.parse(T(this._globalContext))
        },
        setEnvironment: function(t) {
            return this._globalOptions.environment = t,
            this
        },
        setRelease: function(t) {
            return this._globalOptions.release = t,
            this
        },
        setDataCallback: function(t) {
            var e = this._globalOptions.dataCallback;
            return this._globalOptions.dataCallback = a(t) ? function(r) {
                return t(r, e)
            }
            : t,
            this
        },
        setShouldSendCallback: function(t) {
            var e = this._globalOptions.shouldSendCallback;
            return this._globalOptions.shouldSendCallback = a(t) ? function(r) {
                return t(r, e)
            }
            : t,
            this
        },
        setTransport: function(t) {
            return this._globalOptions.transport = t,
            this
        },
        lastException: function() {
            return this._lastCapturedException
        },
        lastEventId: function() {
            return this._lastEventId
        },
        isSetup: function() {
            return !!this._hasJSON && (!!this._globalServer || (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0,
            this._logDebug("error", "Error: Raven has not been configured.")),
            !1))
        },
        afterLoad: function() {
            var t = R.RavenConfig;
            t && this.config(t.dsn, t.config).install()
        },
        showReportDialog: function(t) {
            if (A) {
                t = t || {};
                var e = t.eventId || this.lastEventId();
                if (!e)
                    throw new k("Missing eventId");
                var r = t.dsn || this._dsn;
                if (!r)
                    throw new k("Missing DSN");
                var n = encodeURIComponent
                  , i = "";
                i += "?eventId=" + n(e),
                i += "&dsn=" + n(r);
                var o = t.user || this._globalContext.user;
                o && (o.name && (i += "&name=" + n(o.name)),
                o.email && (i += "&email=" + n(o.email)));
                var a = this._getGlobalServer(this._parseDSN(r))
                  , s = A.createElement("script");
                s.async = !0,
                s.src = a + "/api/embed/error-page/" + i,
                (A.head || A.body).appendChild(s)
            }
        },
        _ignoreNextOnError: function() {
            var t = this;
            this._ignoreOnError += 1,
            setTimeout(function() {
                t._ignoreOnError -= 1
            })
        },
        _triggerEvent: function(t, e) {
            var r, n;
            if (this._hasDocument) {
                e = e || {},
                t = "raven" + t.substr(0, 1).toUpperCase() + t.substr(1),
                A.createEvent ? (r = A.createEvent("HTMLEvents"),
                r.initEvent(t, !0, !0)) : (r = A.createEventObject(),
                r.eventType = t);
                for (n in e)
                    d(e, n) && (r[n] = e[n]);
                if (A.createEvent)
                    A.dispatchEvent(r);
                else
                    try {
                        A.fireEvent("on" + r.eventType.toLowerCase(), r)
                    } catch (i) {}
            }
        },
        _breadcrumbEventHandler: function(t) {
            var e = this;
            return function(r) {
                if (e._keypressTimeout = null,
                e._lastCapturedEvent !== r) {
                    e._lastCapturedEvent = r;
                    var n, i = r.target;
                    try {
                        n = y(i)
                    } catch (o) {
                        n = "<unknown>"
                    }
                    e.captureBreadcrumb({
                        category: "ui." + t,
                        message: n
                    })
                }
            }
        },
        _keypressEventHandler: function() {
            var t = this
              , e = 1e3;
            return function(r) {
                var n = r.target
                  , i = n && n.tagName;
                if (i && ("INPUT" === i || "TEXTAREA" === i || n.isContentEditable)) {
                    var o = t._keypressTimeout;
                    o || t._breadcrumbEventHandler("input")(r),
                    clearTimeout(o),
                    t._keypressTimeout = setTimeout(function() {
                        t._keypressTimeout = null
                    }, e)
                }
            }
        },
        _captureUrlChange: function(t, e) {
            var r = m(this._location.href)
              , n = m(e)
              , i = m(t);
            this._lastHref = e,
            r.protocol === n.protocol && r.host === n.host && (e = n.relative),
            r.protocol === i.protocol && r.host === i.host && (t = i.relative),
            this.captureBreadcrumb({
                category: "navigation",
                data: {
                    to: e,
                    from: t
                }
            })
        },
        _instrumentTryCatch: function() {
            function t(t) {
                return function(e, n) {
                    for (var i = new Array(arguments.length), o = 0; o < i.length; ++o)
                        i[o] = arguments[o];
                    var s = i[0];
                    return a(s) && (i[0] = r.wrap(s)),
                    t.apply ? t.apply(this, i) : t(i[0], i[1])
                }
            }
            function e(t) {
                var e = R[t] && R[t].prototype;
                e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (w(e, "addEventListener", function(e) {
                    return function(n, o, a, s) {
                        try {
                            o && o.handleEvent && (o.handleEvent = r.wrap(o.handleEvent))
                        } catch (u) {}
                        var l;
                        return i && i.dom && ("EventTarget" === t || "Node" === t) && ("click" === n ? l = r._breadcrumbEventHandler(n) : "keypress" === n && (l = r._keypressEventHandler())),
                        e.call(this, n, r.wrap(o, void 0, l), a, s)
                    }
                }, n),
                w(e, "removeEventListener", function(t) {
                    return function(e, r, n, i) {
                        try {
                            r = r && (r.__raven_wrapper__ ? r.__raven_wrapper__ : r)
                        } catch (o) {}
                        return t.call(this, e, r, n, i)
                    }
                }, n))
            }
            var r = this
              , n = r._wrappedBuiltIns
              , i = this._globalOptions.autoBreadcrumbs;
            w(R, "setTimeout", t, n),
            w(R, "setInterval", t, n),
            R.requestAnimationFrame && w(R, "requestAnimationFrame", function(t) {
                return function(e) {
                    return t(r.wrap(e))
                }
            }, n);
            for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], s = 0; s < o.length; s++)
                e(o[s]);
            var u = R.jQuery || R.$;
            u && u.fn && u.fn.ready && w(u.fn, "ready", function(t) {
                return function(e) {
                    return t.call(this, r.wrap(e))
                }
            }, n)
        },
        _instrumentBreadcrumbs: function() {
            function t(t, r) {
                t in r && a(r[t]) && w(r, t, function(t) {
                    return e.wrap(t)
                })
            }
            var e = this
              , r = this._globalOptions.autoBreadcrumbs
              , n = e._wrappedBuiltIns;
            if (r.xhr && "XMLHttpRequest"in R) {
                var i = XMLHttpRequest.prototype;
                w(i, "open", function(t) {
                    return function(r, n) {
                        return s(n) && n.indexOf(e._globalKey) === -1 && (this.__raven_xhr = {
                            method: r,
                            url: n,
                            status_code: null
                        }),
                        t.apply(this, arguments)
                    }
                }, n),
                w(i, "send", function(r) {
                    return function(n) {
                        function i() {
                            if (o.__raven_xhr && (1 === o.readyState || 4 === o.readyState)) {
                                try {
                                    o.__raven_xhr.status_code = o.status
                                } catch (t) {}
                                e.captureBreadcrumb({
                                    type: "http",
                                    category: "xhr",
                                    data: o.__raven_xhr
                                })
                            }
                        }
                        for (var o = this, s = ["onload", "onerror", "onprogress"], u = 0; u < s.length; u++)
                            t(s[u], o);
                        return "onreadystatechange"in o && a(o.onreadystatechange) ? w(o, "onreadystatechange", function(t) {
                            return e.wrap(t, void 0, i)
                        }) : o.onreadystatechange = i,
                        r.apply(this, arguments)
                    }
                }, n)
            }
            r.xhr && "fetch"in R && w(R, "fetch", function(t) {
                return function(r, n) {
                    for (var i = new Array(arguments.length), o = 0; o < i.length; ++o)
                        i[o] = arguments[o];
                    var a = "GET";
                    i[1] && i[1].method && (a = i[1].method);
                    var s = {
                        method: a,
                        url: i[0],
                        status_code: null
                    };
                    return e.captureBreadcrumb({
                        type: "http",
                        category: "fetch",
                        data: s
                    }),
                    t.apply(this, i).then(function(t) {
                        return s.status_code = t.status,
                        t
                    })
                }
            }, n),
            r.dom && this._hasDocument && (A.addEventListener ? (A.addEventListener("click", e._breadcrumbEventHandler("click"), !1),
            A.addEventListener("keypress", e._keypressEventHandler(), !1)) : (A.attachEvent("onclick", e._breadcrumbEventHandler("click")),
            A.attachEvent("onkeypress", e._keypressEventHandler())));
            var o = R.chrome
              , u = o && o.app && o.app.runtime
              , l = !u && R.history && history.pushState;
            if (r.location && l) {
                var c = R.onpopstate;
                R.onpopstate = function() {
                    var t = e._location.href;
                    if (e._captureUrlChange(e._lastHref, t),
                    c)
                        return c.apply(this, arguments)
                }
                ,
                w(history, "pushState", function(t) {
                    return function() {
                        var r = arguments.length > 2 ? arguments[2] : void 0;
                        return r && e._captureUrlChange(e._lastHref, r + ""),
                        t.apply(this, arguments)
                    }
                }, n)
            }
            if (r.console && "console"in R && console.log) {
                var h = function(t, r) {
                    e.captureBreadcrumb({
                        message: t,
                        level: r.level,
                        category: "console"
                    })
                };
                f(["debug", "info", "warn", "error", "log"], function(t, e) {
                    x(console, e, h)
                })
            }
        },
        _restoreBuiltIns: function() {
            for (var t; this._wrappedBuiltIns.length; ) {
                t = this._wrappedBuiltIns.shift();
                var e = t[0]
                  , r = t[1]
                  , n = t[2];
                e[r] = n
            }
        },
        _drainPlugins: function() {
            var t = this;
            f(this._plugins, function(e, r) {
                var n = r[0]
                  , i = r[1];
                n.apply(t, [t].concat(i))
            })
        },
        _parseDSN: function(t) {
            var e = C.exec(t)
              , r = {}
              , n = 7;
            try {
                for (; n--; )
                    r[S[n]] = e[n] || ""
            } catch (i) {
                throw new k("Invalid DSN: " + t)
            }
            if (r.pass && !this._globalOptions.allowSecretKey)
                throw new k("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
            return r
        },
        _getGlobalServer: function(t) {
            var e = "//" + t.host + (t.port ? ":" + t.port : "");
            return t.protocol && (e = t.protocol + ":" + e),
            e
        },
        _handleOnErrorStackInfo: function() {
            this._ignoreOnError || this._handleStackInfo.apply(this, arguments)
        },
        _handleStackInfo: function(t, e) {
            var r = this._prepareFrames(t, e);
            this._triggerEvent("handle", {
                stackInfo: t,
                options: e
            }),
            this._processException(t.name, t.message, t.url, t.lineno, r, e)
        },
        _prepareFrames: function(t, e) {
            var r = this
              , n = [];
            if (t.stack && t.stack.length && (f(t.stack, function(t, e) {
                var i = r._normalizeFrame(e);
                i && n.push(i)
            }),
            e && e.trimHeadFrames))
                for (var i = 0; i < e.trimHeadFrames && i < n.length; i++)
                    n[i].in_app = !1;
            return n = n.slice(0, this._globalOptions.stackTraceLimit)
        },
        _normalizeFrame: function(t) {
            if (t.url) {
                var e = {
                    filename: t.url,
                    lineno: t.line,
                    colno: t.column,
                    "function": t.func || "?"
                };
                return e.in_app = !(this._globalOptions.includePaths.test && !this._globalOptions.includePaths.test(e.filename) || /(Raven|TraceKit)\./.test(e["function"]) || /raven\.(min\.)?js$/.test(e.filename)),
                e
            }
        },
        _processException: function(t, e, r, n, i, o) {
            var a;
            if ((!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(e)) && (e += "",
            i && i.length ? (r = i[0].filename || r,
            i.reverse(),
            a = {
                frames: i
            }) : r && (a = {
                frames: [{
                    filename: r,
                    lineno: n,
                    in_app: !0
                }]
            }),
            (!this._globalOptions.ignoreUrls.test || !this._globalOptions.ignoreUrls.test(r)) && (!this._globalOptions.whitelistUrls.test || this._globalOptions.whitelistUrls.test(r)))) {
                var s = h({
                    exception: {
                        values: [{
                            type: t,
                            value: e,
                            stacktrace: a
                        }]
                    },
                    culprit: r
                }, o);
                this._send(s)
            }
        },
        _trimPacket: function(t) {
            var e = this._globalOptions.maxMessageLength;
            if (t.message && (t.message = p(t.message, e)),
            t.exception) {
                var r = t.exception.values[0];
                r.value = p(r.value, e)
            }
            return t
        },
        _getHttpData: function() {
            if (this._hasDocument && A.location && A.location.href) {
                var t = {
                    headers: {
                        "User-Agent": navigator.userAgent
                    }
                };
                return t.url = A.location.href,
                A.referrer && (t.headers.Referer = A.referrer),
                t
            }
        },
        _send: function(t) {
            var e = this._globalOptions
              , r = {
                project: this._globalProject,
                logger: e.logger,
                platform: "javascript"
            }
              , i = this._getHttpData();
            i && (r.request = i),
            t.trimHeadFrames && delete t.trimHeadFrames,
            t = h(r, t),
            t.tags = h(h({}, this._globalContext.tags), t.tags),
            t.extra = h(h({}, this._globalContext.extra), t.extra),
            t.extra["session:duration"] = n() - this._startTime,
            this._breadcrumbs && this._breadcrumbs.length > 0 && (t.breadcrumbs = {
                values: [].slice.call(this._breadcrumbs, 0)
            }),
            l(t.tags) && delete t.tags,
            this._globalContext.user && (t.user = this._globalContext.user),
            e.environment && (t.environment = e.environment),
            e.release && (t.release = e.release),
            e.serverName && (t.server_name = e.serverName),
            a(e.dataCallback) && (t = e.dataCallback(t) || t),
            t && !l(t) && (a(e.shouldSendCallback) && !e.shouldSendCallback(t) || this._sendProcessedPayload(t))
        },
        _getUuid: function() {
            return _()
        },
        _sendProcessedPayload: function(t, e) {
            var r = this
              , n = this._globalOptions;
            if (this._lastEventId = t.event_id || (t.event_id = this._getUuid()),
            t = this._trimPacket(t),
            this._logDebug("debug", "Raven about to send:", t),
            this.isSetup()) {
                var i = {
                    sentry_version: "7",
                    sentry_client: "raven-js/" + this.VERSION,
                    sentry_key: this._globalKey
                };
                this._globalSecret && (i.sentry_secret = this._globalSecret);
                var o = t.exception && t.exception.values[0];
                this.captureBreadcrumb({
                    category: "sentry",
                    message: o ? (o.type ? o.type + ": " : "") + o.value : t.message,
                    event_id: t.event_id,
                    level: t.level || "error"
                });
                var a = this._globalEndpoint;
                (n.transport || this._makeRequest).call(this, {
                    url: a,
                    auth: i,
                    data: t,
                    options: n,
                    onSuccess: function() {
                        r._triggerEvent("success", {
                            data: t,
                            src: a
                        }),
                        e && e()
                    },
                    onError: function(n) {
                        r._triggerEvent("failure", {
                            data: t,
                            src: a
                        }),
                        n = n || new Error("Raven send failed (no additional details provided)"),
                        e && e(n)
                    }
                })
            }
        },
        _makeRequest: function(t) {
            function e() {
                200 === r.status ? t.onSuccess && t.onSuccess() : t.onError && t.onError(new Error("Sentry error code: " + r.status))
            }
            var r = new XMLHttpRequest
              , n = "withCredentials"in r || "undefined" != typeof XDomainRequest;
            if (n) {
                var i = t.url;
                "withCredentials"in r ? r.onreadystatechange = function() {
                    4 === r.readyState && e()
                }
                : (r = new XDomainRequest,
                i = i.replace(/^https?:/, ""),
                r.onload = e),
                r.open("POST", i + "?" + v(t.auth)),
                r.send(T(t.data))
            }
        },
        _logDebug: function(t) {
            this._originalConsoleMethods[t] && this.debug && Function.prototype.apply.call(this._originalConsoleMethods[t], this._originalConsole, [].slice.call(arguments, 1))
        },
        _mergeContext: function(t, e) {
            o(e) ? delete this._globalContext[t] : this._globalContext[t] = h(this._globalContext[t] || {}, e)
        }
    };
    var P = Object.prototype; //Object.prototype を拡張するため
    i.prototype.setUser = i.prototype.setUserContext,
    i.prototype.setReleaseContext = i.prototype.setRelease,
    t.exports = i //これがreturnされる
}
, function(t, e, r) { // 31 30番の初期化？
    "use strict";
    var n = r(30)
      , i = window.Raven
      , o = new n;
    o.noConflict = function() {
        return window.Raven = i,
        o
    }
    ,
    o.afterLoad(),
    t.exports = o
}
, function(t, e) { // 32 スタックトレース?
    "use strict";
    function r() {
        return "undefined" == typeof document ? "" : document.location.href
    }
    var n = {
        collectWindowErrors: !0,
        debug: !1
    }
      , i = [].slice
      , o = "?"
      , a = /^(?:Uncaught (?:exception: )?)?((?:Eval|Internal|Range|Reference|Syntax|Type|URI)Error): ?(.*)$/;
    n.report = function() {
        function t(t) {
            c(),
            v.push(t)
        }
        function e(t) {
            for (var e = v.length - 1; e >= 0; --e)
                v[e] === t && v.splice(e, 1)
        }
        function s() {
            f(),
            v = []
        }
        function u(t, e) {
            var r = null;
            if (!e || n.collectWindowErrors) {
                for (var o in v)
                    if (v.hasOwnProperty(o))
                        try {
                            v[o].apply(null, [t].concat(i.call(arguments, 2)))
                        } catch (a) {
                            r = a
                        }
                if (r)
                    throw r
            }
        }
        function l(t, e, i, s, l) {
            var c = null;
            if (y)
                n.computeStackTrace.augmentStackTraceWithInitialElement(y, e, i, t),
                h();
            else if (l)
                c = n.computeStackTrace(l),
                u(c, !0);
            else {
                var f, p = {
                    url: e,
                    line: i,
                    column: s
                }, g = void 0, v = t;
                if ("[object String]" === {}.toString.call(t)) {
                    var f = t.match(a);
                    f && (g = f[1],
                    v = f[2])
                }
                p.func = o,
                c = {
                    name: g,
                    message: v,
                    url: r(),
                    stack: [p]
                },
                u(c, !0)
            }
            return !!d && d.apply(this, arguments)
        }
        function c() {
            g || (d = window.onerror,
            window.onerror = l,
            g = !0)
        }
        function f() {
            g && (window.onerror = d,
            g = !1,
            d = void 0)
        }
        function h() {
            var t = y
              , e = m;
            m = null,
            y = null,
            _ = null,
            u.apply(null, [t, !1].concat(e))
        }
        function p(t, e) {
            var r = i.call(arguments, 1);
            if (y) {
                if (_ === t)
                    return;
                h()
            }
            var o = n.computeStackTrace(t);
            if (y = o,
            _ = t,
            m = r,
            setTimeout(function() {
                _ === t && h()
            }, o.incomplete ? 2e3 : 0),
            e !== !1)
                throw t
        }
        var d, g, v = [], m = null, _ = null, y = null;
        return p.subscribe = t,
        p.unsubscribe = e,
        p.uninstall = s,
        p
    }(),
    n.computeStackTrace = function() {
        function t(t) {
            if ("undefined" != typeof t.stack && t.stack) {
                for (var e, n, i = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|<anonymous>).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, a = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i, s = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, u = t.stack.split("\n"), l = [], c = (/^(.*) is undefined$/.exec(t.message),
                0), f = u.length; c < f; ++c) {
                    if (e = i.exec(u[c])) {
                        var h = e[2] && e[2].indexOf("native") !== -1;
                        n = {
                            url: h ? null : e[2],
                            func: e[1] || o,
                            args: h ? [e[2]] : [],
                            line: e[3] ? +e[3] : null,
                            column: e[4] ? +e[4] : null
                        }
                    } else if (e = s.exec(u[c]))
                        n = {
                            url: e[2],
                            func: e[1] || o,
                            args: [],
                            line: +e[3],
                            column: e[4] ? +e[4] : null
                        };
                    else {
                        if (!(e = a.exec(u[c])))
                            continue;
                        n = {
                            url: e[3],
                            func: e[1] || o,
                            args: e[2] ? e[2].split(",") : [],
                            line: e[4] ? +e[4] : null,
                            column: e[5] ? +e[5] : null
                        }
                    }
                    !n.func && n.line && (n.func = o),
                    l.push(n)
                }
                return l.length ? (l[0].column || "undefined" == typeof t.columnNumber || (l[0].column = t.columnNumber + 1),
                {
                    name: t.name,
                    message: t.message,
                    url: r(),
                    stack: l
                }) : null
            }
        }
        function e(t, e, r, n) {
            var i = {
                url: e,
                line: r
            };
            if (i.url && i.line) {
                if (t.incomplete = !1,
                i.func || (i.func = o),
                t.stack.length > 0 && t.stack[0].url === i.url) {
                    if (t.stack[0].line === i.line)
                        return !1;
                    if (!t.stack[0].line && t.stack[0].func === i.func)
                        return t.stack[0].line = i.line,
                        !1
                }
                return t.stack.unshift(i),
                t.partial = !0,
                !0
            }
            return t.incomplete = !0,
            !1
        }
        function i(t, s) {
            for (var u, l, c = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, f = [], h = {}, p = !1, d = i.caller; d && !p; d = d.caller)
                if (d !== a && d !== n.report) {
                    if (l = {
                        url: null,
                        func: o,
                        line: null,
                        column: null
                    },
                    d.name ? l.func = d.name : (u = c.exec(d.toString())) && (l.func = u[1]),
                    "undefined" == typeof l.func)
                        try {
                            l.func = u.input.substring(0, u.input.indexOf("{"))
                        } catch (g) {}
                    h["" + d] ? p = !0 : h["" + d] = !0,
                    f.push(l)
                }
            s && f.splice(0, s);
            var v = {
                name: t.name,
                message: t.message,
                url: r(),
                stack: f
            };
            return e(v, t.sourceURL || t.fileName, t.line || t.lineNumber, t.message || t.description),
            v
        }
        function a(e, o) {
            var a = null;
            o = null == o ? 0 : +o;
            try {
                if (a = t(e))
                    return a
            } catch (s) {
                if (n.debug)
                    throw s
            }
            try {
                if (a = i(e, o + 1))
                    return a
            } catch (s) {
                if (n.debug)
                    throw s
            }
            return {
                name: e.name,
                message: e.message,
                url: r()
            }
        }
        return a.augmentStackTraceWithInitialElement = e,
        a.computeStackTraceFromStackProp = t,
        a
    }(),
    t.exports = n
}
]);
