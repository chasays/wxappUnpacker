function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function a(e, t) {
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
}), exports.Members = void 0;

var s = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var s = t[a];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, a, s) {
        return a && e(t.prototype, a), s && e(t, s), t;
    };
}(), r = require("../../utils/base.js"), n = function(n) {
    function o() {
        return e(this, o), t(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this));
    }
    return a(o, r.Base), s(o, [ {
        key: "getMembersInfo",
        value: function(e, t) {
            var e = {
                url: "Members/getMembersInfo",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "editMembersHandel",
        value: function(e, t) {
            var e = {
                url: "Members/editMembersHandel",
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
        key: "getCheckedAddress",
        value: function(e, t) {
            var e = {
                url: "Members/getCheckedAddress",
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
        key: "getArea",
        value: function(e) {
            var t = {
                url: "Members/getArea",
                type: "post",
                sCallback: function(t) {
                    e && e(t);
                }
            };
            this.request(t);
        }
    }, {
        key: "getUseCoupon",
        value: function(e, t) {
            var e = {
                url: "Members/getUseCoupon",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "getOldCoupon",
        value: function(e, t) {
            var e = {
                url: "Members/getOldCoupon",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "getAddress",
        value: function(e, t) {
            var e = {
                url: "Members/getAddress",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "getAddressDetails",
        value: function(e, t) {
            var e = {
                url: "Members/getAddressDetails",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "editAddressHandel",
        value: function(e, t) {
            var e = {
                url: "Members/editAddressHandel",
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
        key: "setDefault",
        value: function(e, t) {
            var e = {
                url: "Members/setDefault",
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
        key: "addressDelete",
        value: function(e, t) {
            var e = {
                url: "Members/addressDelete",
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
        key: "getOrderList",
        value: function(e, t) {
            var e = {
                url: "Members/getOrderList",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "getOrderDetails",
        value: function(e, t) {
            var e = {
                url: "Members/getOrderDetails",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "getOldCouponStatus",
        value: function(e, t) {
            var e = {
                url: "Members/getOldCouponStatus",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "setOldCoupon",
        value: function(e, t) {
            var e = {
                url: "Members/setOldCoupon",
                type: "post",
                loading: "hide",
                data: e,
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(e);
        }
    }, {
        key: "wxPay",
        value: function(e, t) {
            var a = this, s = {
                url: "Members/payOrder",
                type: "post",
                loading: "hide",
                data: {
                    ordercode: e
                },
                sCallback: function(s) {
                    200 == s.code ? wx.requestPayment({
                        timeStamp: s.data.timeStamp.toString(),
                        nonceStr: s.data.nonceStr,
                        package: s.data.package,
                        signType: s.data.signType,
                        paySign: s.data.paySign,
                        success: function() {
                            a.sendTplMsg(e), t && t({
                                code: 200,
                                msg: "支付成功"
                            });
                        },
                        fail: function() {
                            t && t({
                                code: 201,
                                msg: "支付已取消"
                            });
                        }
                    }) : t && t({
                        code: 201,
                        msg: s.msg
                    });
                }
            };
            a.request(s);
        }
    }, {
        key: "sendTplMsg",
        value: function(e) {
            var t = {
                url: "Members/sendTplMsg",
                type: "post",
                data: {
                    ordercode: e
                },
                loading: "hide",
                sCallback: function(e) {}
            };
            this.request(t);
        }
    }, {
        key: "upOrderStatus",
        value: function(e, t) {
            var a = {
                url: "Members/upOrderStatus",
                type: "post",
                data: e,
                loading: "hide",
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(a);
        }
    }, {
        key: "delOrder",
        value: function(e, t) {
            var a = {
                url: "Members/delOrder",
                type: "post",
                data: e,
                loading: "hide",
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(a);
        }
    }, {
        key: "editMessagesHandel",
        value: function(e, t) {
            var a = {
                url: "Members/editMessagesHandel",
                type: "post",
                data: e,
                loading: "hide",
                sCallback: function(e) {
                    t && t(e);
                }
            };
            this.request(a);
        }
    } ]), o;
}();

exports.Members = n;