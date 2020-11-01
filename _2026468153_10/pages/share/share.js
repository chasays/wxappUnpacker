var e = require("../../utils/config.js"), a = require("../../utils/function.js");

Page({
    data: {
        url: e.Config.Url
    },
    onLoad: function() {
        this._loadData();
    },
    _loadData: function() {
        this.getConfig();
    },
    getConfig: function() {
        var e = this;
        a.getConfig("share_title,share_pic,share_ad", function(a) {
            e.setData({
                share: a
            });
        });
    },
    onShareAppMessage: function() {
        var e = this, a = wx.getStorageSync("members").guid, t = e.data.url + e.data.share.share_pic, i = "“" + wx.getStorageSync("members").nickname + "”";
        return {
            title: e.data.share.share_title.replace("*", i),
            imageUrl: t,
            path: "pages/index/index?top_guid=" + a
        };
    }
});