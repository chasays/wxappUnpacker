require("../../utils/config.js");

var o = require("../../utils/access.js"), n = require("../Members/members-model.js"), e = require("../../utils/function.js"), t = new o.Access(), s = new n.Members();

Page({
    data: {
        auth: !1,
        old_send_coupon_condition: 0,
        old_coupon_status: !1
    },
    onShow: function() {
        this._loadData();
    },
    _loadData: function() {
        var o = this;
        o.getUseCoupon(), o.getConfig(), o.getOldCouponStatus();
    },
    getOldCouponStatus: function() {
        var o = this, n = {
            members_guid: wx.getStorageSync("members").guid
        };
        s.getOldCouponStatus(n, function(n) {
            o.setData({
                old_send_coupon_condition: n.data
            });
        });
    },
    setOldCoupon: function() {
        var o = this;
        wx.showLoading({
            title: "领取中...",
            mask: !0
        });
        var n = {
            members_guid: wx.getStorageSync("members").guid
        };
        s.setOldCoupon(n, function(n) {
            wx.hideLoading(), 200 == n.code && (wx.showToast({
                title: "领取成功",
                duration: 1500
            }), setTimeout(function() {
                o._loadData();
            }, 1500));
        });
    },
    getConfig: function() {
        var o = this;
        e.getConfig("new_send_coupon_status,new_send_coupon,new_send_coupon_name,new_send_coupon_title,old_send_coupon_status,old_send_coupon,old_send_coupon_name,old_send_coupon_title", function(n) {
            o.setData({
                new_send_coupon: {
                    new_send_coupon_status: n.new_send_coupon_status,
                    new_send_coupon: (10 * n.new_send_coupon).toFixed(1),
                    new_send_coupon_name: n.new_send_coupon_name,
                    new_send_coupon_title: n.new_send_coupon_title
                },
                old_send_coupon: {
                    old_send_coupon_status: n.old_send_coupon_status,
                    old_send_coupon: (10 * n.old_send_coupon).toFixed(1),
                    old_send_coupon_name: n.old_send_coupon_name,
                    old_send_coupon_title: n.old_send_coupon_title
                }
            });
        });
    },
    getUseCoupon: function() {
        var o = this, n = {
            members_guid: wx.getStorageSync("members").guid
        };
        s.getUseCoupon(n, function(n) {
            o.setData({
                new_coupon: n.data
            });
        });
    },
    getOldCoupon: function() {
        var o = this;
        if (o.data.old_coupon) return !1;
        var n = {
            members_guid: wx.getStorageSync("members").guid
        };
        s.getOldCoupon(n, function(n) {
            o.setData({
                old_coupon: n.data
            });
        });
    },
    changeHistoryStatus: function() {
        var o = this, n = o.data.old_coupon_status;
        o.setData({
            old_coupon_status: !n
        }), o.getOldCoupon();
    },
    link: function(o) {
        var n = this;
        if (!wx.getStorageSync("members")) return n.setData({
            auth: !0
        }), !1;
        var t = e.getDataSet(o, "surl");
        e.linkTo(t);
    },
    getUserInfo: function(o) {
        var n = this;
        "getUserInfo:ok" == o.detail.errMsg ? (wx.showLoading({
            title: "授权中...",
            mask: !0
        }), wx.getUserInfo({
            lang: "zh_CN",
            success: function(o) {
                t.updateUserInfo(o.userInfo, function(o) {
                    200 == o.code ? (wx.hideLoading(), n.setData({
                        auth: !1
                    }), n._loadData()) : e.layer(o.msg);
                });
            }
        })) : e.layer("为了更好的体验，请重新授权");
    },
    cancelAuth: function() {
        this.setData({
            auth: !1
        });
    }
});