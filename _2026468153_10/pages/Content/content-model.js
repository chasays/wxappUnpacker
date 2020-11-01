function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function n(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Content = void 0;

var o = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), r = require("../../utils/base.js"), i = function(i) {
    function u() {
        return t(this, u), e(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this));
    }
    return n(u, r.Base), o(u, [ {
        key: "getContent",
        value: function(t, e) {
            var t = {
                url: "Content/getContent",
                type: "post",
                data: t,
                sCallback: function(t) {
                    e && e(t);
                }
            };
            this.request(t);
        }
    }, {
        key: "getNewsList",
        value: function(t, e) {
            var t = {
                url: "Content/getNewsList",
                type: "post",
                data: t,
                sCallback: function(t) {
                    e && e(t);
                }
            };
            this.request(t);
        }
    }, {
        key: "getNewsDetails",
        value: function(t, e) {
            var t = {
                url: "Content/getNewsDetails",
                type: "post",
                data: t,
                sCallback: function(t) {
                    e && e(t);
                }
            };
            this.request(t);
        }
    } ]), u;
}();

exports.Content = i;