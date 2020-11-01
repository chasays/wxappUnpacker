var t = require("../../../utils/config.js"), e = require("../../../utils/access.js"), a = require("../../custom-model.js"), s = require("../content-model.js"), i = require("../../../utils/function.js"), n = new e.Access(), o = new a.Custom(), u = new s.Content();

Page({
    data: {
        url: t.Config.Url,
        auth: !1
    },
    onLoad: function(t) {
        var e = this;
        e.setData(t), e._loadData();
    },
    onShow: function() {
        var t = this;
        wx.getStorageSync("members") ? t.setData({
            auth: !0
        }) : t.setData({
            auth: !1
        });
    },
    _loadData: function() {
        this.getNewsDetails();
    },
    link: function(t) {
        var e = i.getDataSet(t, "surl");
        i.linkTo(e);
    },
    getNewsDetails: function() {
        var t = this, e = {
            news_guid: t.data.guid,
            members_guid: wx.getStorageSync("members").guid
        };
        u.getNewsDetails(e, function(e) {
            t.setData({
                data: e.data
            }), wx.setNavigationBarTitle({
                title: e.data.title
            });
        });
    },
    collectHandel: function() {
        var t = this, e = t.data.data.collect.status, a = {
            members_guid: wx.getStorageSync("members").guid,
            relation_guid: t.data.guid,
            type: 3
        };
        if (0 == e) {
            a.methods = "add";
            e = 1;
        } else {
            a.methods = "del";
            e = 0;
        }
        var s = t.data.data;
        s.collect.status = e, t.setData({
            data: s
        }), o.collectHandel(a, function(e) {
            i.layer(e.msg), setTimeout(function() {
                t.getNewsDetails();
            }, 1500);
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
                n.updateUserInfo(t.userInfo, function(t) {
                    200 == t.code ? (wx.hideLoading(), e.setData({
                        auth: !1
                    })) : i.layer(t.msg);
                });
            }
        })) : i.layer("为了更好的体验，请重新授权");
    },
    onShareAppMessage: function() {
        return {
            title: this.data.data.title,
            path: "pages/index/index"
        };
    }
});