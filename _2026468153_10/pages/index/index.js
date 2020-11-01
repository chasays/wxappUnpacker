var t = require("../../utils/config.js"), e = require("../../utils/access.js"), n = require("../custom-model.js"), o = require("../Members/members-model.js"), a = require("../Content/content-model.js"), s = require("../../utils/function.js"), i = new e.Access(), u = new n.Custom(), d = new o.Members();

new a.Content();

Page({
    data: {
        url: t.Config.Url,
        auth: !1,
        ad_status: !0,
        banner: 1,
        column_id: 1,
        column: 4,
        old_send_coupon_condition: 0,
        service_layer: !1,
        isShow: !0,
        btn_status: !0
    },
    onLoad: function() {
        this._loadData();
    },
    onShow: function() {
        var t = this;
        t.getColumn(), t.getMallConfig(), t.getOldCouponStatus();
    },
    _loadData: function() {
        var t = this;
        t.getHeight(), t.getConfig(), t.getBanner(), t.getGoodsList(), t.welfare();
    },
    getHeight: function() {
        var t = this, e = wx.getSystemInfoSync(), n = e.windowHeight - e.statusBarHeight;
        t.setData({
            height: (n - 260) / 4
        });
    },
    getMallConfig: function() {
        var t = this;
        u.getMallConfig(function(e) {
            "no" == e.data.buy_status && t.closeAd(), t.setData({
                config: e.data
            });
        });
    },
    getColumn: function() {
        var t = this;
        u.getColumn(!1, function(e) {
            t.setData({
                column: e.data,
                column_id: e.data[0].id
            }), t.change(0);
        });
    },
    getOldCouponStatus: function() {
        var t = this, e = {
            members_guid: wx.getStorageSync("members").guid
        };
        d.getOldCouponStatus(e, function(e) {
            t.setData({
                old_send_coupon_condition: e.data
            });
        });
    },
    setOldCoupon: function() {
        var t = this;
        wx.showLoading({
            title: "领取中...",
            mask: !0
        });
        var e = {
            members_guid: wx.getStorageSync("members").guid
        };
        d.setOldCoupon(e, function(e) {
            wx.hideLoading(), 200 == e.code && (wx.showToast({
                title: "领取成功",
                duration: 1500
            }), setTimeout(function() {
                t.getOldCouponStatus();
            }, 1500));
        });
    },
    getContent: function() {
        var t = this, e = {
            type: "weekfood"
        };
        u.getContent(e, function(e) {
            t.setData({
                weekfood: e.data.content
            });
        });
    },
    change: function(t) {
        var e = this, n = t ? s.getDataSet(t, "column_id") : e.data.column_id;
        e.setData({
            column_id: n
        }), 1 == n ? e.getGoodsList() : 2 == n ? e.getContent() : 4 == n && e.getGoodsList();
    },
    getGoodsList: function() {
        var t = this;
        if (1 == t.data.column_id) e = 1; else if (4 == t.data.column_id) var e = 2;
        var n = {
            cate_id: e
        };
        u.getGoodsList(n, function(e) {
            t.setData({
                goods: e.data
            });
        });
    },
    getConfig: function() {
        var t = this;
        s.getConfig("p_title,p_status,ad_status,new_send_coupon_status,new_send_coupon,new_send_coupon_name,new_send_coupon_title,ad_pic,ad_url,share_title,share_pic,old_send_coupon_status,old_send_coupon,old_send_coupon_name,old_send_coupon_title,service_qrcode,service_weixin,coupon_ad_status,coupon_ad,banner_ad_status,banner_ad,banner_ad_url", function(e) {
            2 == e.p_status && wx.hideTabBar(), t.setData({
                p_status: e.p_status,
                p_title: e.p_title,
                new_send_coupon: {
                    new_send_coupon_name: e.new_send_coupon_name,
                    new_send_coupon_title: e.new_send_coupon_title,
                    new_send_coupon_status: e.new_send_coupon_status,
                    new_send_coupon: (10 * e.new_send_coupon).toFixed(1)
                },
                old_send_coupon: {
                    old_send_coupon_status: e.old_send_coupon_status,
                    old_send_coupon: (10 * e.old_send_coupon).toFixed(1),
                    old_send_coupon_name: e.old_send_coupon_name,
                    old_send_coupon_title: e.old_send_coupon_title
                },
                share: {
                    share_title: e.share_title,
                    share_pic: e.share_pic
                },
                ad: {
                    status: e.ad_status,
                    pic: e.ad_pic,
                    url: e.ad_url
                },
                service: {
                    qrcode: e.service_qrcode,
                    weixin: e.service_weixin
                }
            });
        });
    },
    getBanner: function() {
        var t = this, e = {
            place: 1
        };
        u.getBanner(e, function(e) {
            t.setData({
                banner: e.data
            });
        });
    },
    link: function(t) {
        var e = this;
        if (!wx.getStorageSync("members")) return e.setData({
            auth: !0
        }), !1;
        var n = s.getDataSet(t, "surl");
        s.linkTo(n);
    },
    serverLayer: function() {
        this.setData({
            service_layer: !0
        });
    },
    toConfirm: function(t) {
        var e = this;
        if (!wx.getStorageSync("members")) return e.setData({
            auth: !0
        }), !1;
        var n = s.getDataSet(t, "surl"), o = s.getDataSet(t, "index");
        200 == e.data.goods[o].btn.status && s.linkTo(n);
    },
    copWeixin: function() {
        var t = this.data.service.weixin;
        wx.setClipboardData({
            data: t
        });
    },
    serverClose: function() {
        this.setData({
            service_layer: !1
        });
    },
    getUserInfo: function(t) {
        var e = this;
        "getUserInfo:ok" == t.detail.errMsg ? (wx.showLoading({
            title: "授权中...",
            mask: !0
        }), wx.getUserInfo({
            lang: "zh_CN",
            success: function(t) {
                i.updateUserInfo(t.userInfo, function(t) {
                    200 == t.code ? (wx.hideLoading(), e.welfare(), e.setData({
                        auth: !1
                    })) : s.layer(t.msg);
                });
            }
        })) : s.layer("为了更好的体验，请重新授权");
    },
    cancelAuth: function() {
        this.setData({
            auth: !1
        });
    },
    closeAd: function() {
        this.setData({
            ad_status: !1
        });
    },
    close: function() {
        var t = this;
        t.setData({
            exit: !0
        }), setTimeout(function() {
            t.setData({
                isShow: !0
            });
        }, 450);
    },
    welfare: function() {
        var t = this, e = wx.getStorageSync("members");
        if (!e) return !1;
        var n = {
            members_guid: e.guid
        };
        u.getNewSendCoupon(n, function(e) {
            200 == e.code && t.setData({
                coupon: e.data,
                isShow: !1
            });
        });
    },
    newSendCouponHandel: function() {
        var t = this, e = wx.getStorageSync("members");
        if (!e) return t.setData({
            auth: !0
        }), !1;
        t.setData({
            btn_status: !1
        });
        var n = {
            members_guid: e.guid
        };
        u.newSendCouponHandel(n, function(e) {
            200 == e.code ? (wx.showToast({
                title: e.msg,
                duration: 1500
            }), setTimeout(function() {
                t.close();
            }, 1500)) : (t.setData({
                btn_status: !0
            }), s.layer(e.msg));
        });
    },
    onPullDownRefresh: function() {
        this._loadData(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 2e3);
    },
    onShareAppMessage: function() {
        var t = this, e = wx.getStorageSync("members").guid, n = t.data.url + t.data.share.share_pic, o = "“" + wx.getStorageSync("members").nickname + "”";
        return {
            title: t.data.share.share_title.replace("*", o),
            imageUrl: n,
            path: "pages/index/index?top_guid=" + e
        };
    }
});