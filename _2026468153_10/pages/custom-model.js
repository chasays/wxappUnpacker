function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Custom = void 0;

var o = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), a = require("../utils/base.js"), u = function(u) {
    function r() {
        return e(this, r), t(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this));
    }
    return n(r, a.Base), o(r, [ {
        key: "getBanner",
        value: function(e, t) {
            var e = {
                url: "Custom/getBanner",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "weekChange",
        value: function(e, t) {
            var e = {
                url: "Custom/weekChange",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "getColumn",
        value: function(e, t) {
            var e = {
                url: "Custom/getColumn",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "getContent",
        value: function(e, t) {
            var e = {
                url: "Custom/getContent",
                type: "post",
                data: e,
                loading: "hide",
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "getMallConfig",
        value: function(e) {
            var t = {
                url: "Custom/getMallConfig",
                type: "post",
                loading: "hide",
                sCallback: function(t) {
                    e && e(t);
                }
            };
            this.request(t);
        }
    }, {
        key: "getGoodsList",
        value: function(e, t) {
            var e = {
                url: "Custom/getGoodsList",
                type: "post",
                data: e,
                loading: "hide",
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "getGoodsDetails",
        value: function(e, t) {
            var e = {
                url: "Custom/getGoodsDetails",
                type: "post",
                data: e,
                loading: "hide",
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "addOrder",
        value: function(e, t) {
            var e = {
                url: "Custom/addOrder",
                type: "post",
                data: e,
                loading: "hide",
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "getNewSendCoupon",
        value: function(e, t) {
            var e = {
                url: "Custom/getNewSendCoupon",
                type: "post",
                data: e,
                loading: "hide",
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "newSendCouponHandel",
        value: function(e, t) {
            var e = {
                url: "Custom/newSendCouponHandel",
                type: "post",
                data: e,
                loading: "hide",
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    } ]), r;
}();

exports.Custom = u;