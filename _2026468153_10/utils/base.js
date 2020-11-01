function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Base = void 0;

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), r = (require("access.js"), require("config.js")), o = function() {
    function o() {
        e(this, o), this.baseRestUrl = r.Config.restUrl;
    }
    return t(o, [ {
        key: "request",
        value: function(e) {
            var t = this, r = this.baseRestUrl + e.url, o = "hide" == e.loading ? "hide" : "show";
            e.type || (e.type = "get"), 0 == e.setUpUrl && (r = e.url), "show" == o && wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: r,
                data: e.data,
                method: e.type,
                header: {
                    "content-type": "application/json"
                },
                success: function(r) {
                    "2" == r.statusCode.toString().charAt(0) ? e.sCallback && e.sCallback(r.data) : (t._processError(r), 
                    e.eCallback && e.eCallback(r.data));
                },
                complete: function(e) {
                    "show" == o && wx.hideLoading();
                },
                fail: function(e) {
                    t._processError(e);
                }
            });
        }
    }, {
        key: "_processError",
        value: function(e) {
            console.log(e);
        }
    } ]), o;
}();

exports.Base = o;