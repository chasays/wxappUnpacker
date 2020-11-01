var e = require("../../../utils/config.js"), t = require("../../../utils/access.js"), i = require("../members-model.js"), a = require("../../../utils/function.js"), r = new t.Access(), s = new i.Members();

Page({
    data: {
        auth: !1,
        service_layer: !1,
        url: e.Config.Url
    },
    onLoad: function() {
        this._loadData();
    },
    _loadData: function() {
        var e = this;
        e.getConfig(), e.getMembersInfo();
    },
    onShow: function() {
        var e = this;
        e.data.members || e.getMembersInfo();
    },
    getConfig: function() {
        var e = this;
        a.getConfig("service_qrcode,service_weixin", function(t) {
            e.setData({
                service: {
                    qrcode: t.service_qrcode,
                    weixin: t.service_weixin
                }
            });
        });
    },
    getMembersInfo: function() {
        var e = this, t = wx.getStorageSync("members");
        if (!t) return !1;
        var i = {
            members_guid: t.guid
        };
        s.getMembersInfo(i, function(t) {
            e.setData({
                members: t.data
            });
        });
    },
    link: function(e) {
        var t = this;
        if (!wx.getStorageSync("members")) return t.setData({
            auth: !0
        }), !1;
        var i = a.getDataSet(e, "surl");
        a.linkTo(i);
    },
    serverLayer: function() {
        this.setData({
            service_layer: !0
        });
    },
    copWeixin: function() {
        var e = this.data.service.weixin;
        wx.setClipboardData({
            data: e
        });
    },
    serverClose: function() {
        this.setData({
            service_layer: !1
        });
    },
    getUserInfo: function(e) {
        var t = this;
        "getUserInfo:ok" == e.detail.errMsg ? (wx.showLoading({
            title: "授权中...",
            mask: !0
        }), wx.getUserInfo({
            lang: "zh_CN",
            success: function(e) {
                r.updateUserInfo(e.userInfo, function(e) {
                    200 == e.code ? (wx.hideLoading(), t.setData({
                        auth: !1
                    }), t._loadData()) : a.layer(e.msg);
                });
            }
        })) : a.layer("为了更好的体验，请重新授权");
    },
    cancelAuth: function() {
        this.setData({
            auth: !1
        });
    }
});