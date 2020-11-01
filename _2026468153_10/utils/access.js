function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Access = void 0;

var t = function() {
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
}(), n = require("config.js"), o = (require("base.js"), function() {
    function o() {
        e(this, o);
    }
    return t(o, [ {
        key: "getOpenid",
        value: function(e) {
            wx.login({
                success: function(t) {
                    wx.request({
                        url: n.Config.restUrl + "wechat/getOpenid",
                        method: "POST",
                        data: {
                            code: t.code
                        },
                        success: function(t) {
                            if (200 == t.data.code) {
                                var n = t.data.data.openid;
                                e && e(n);
                            } else wx.showToast({
                                title: "APPID或者APPSECRET不匹配",
                                icon: "none",
                                duration: 2e3
                            });
                        }
                    });
                }
            });
        }
    }, {
        key: "updateUserInfo",
        value: function(e, t) {
            this.getOpenid(function(o) {
                var a = wx.getStorageSync("top_guid");
                e.top_guid = a || 0, e.openid = o;
                var r = {
                    url: n.Config.restUrl + "members/addMembers",
                    method: "POST",
                    data: e,
                    success: function(e) {
                        200 == e.data.code && wx.setStorage({
                            key: "members",
                            data: e.data.data
                        }), t && t(e.data);
                    }
                };
                wx.request(r);
            });
        }
    } ]), o;
}());

exports.Access = o;