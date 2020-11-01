require("../../../utils/config.js");

var e = require("../members-model.js"), t = require("../../../utils/function.js"), s = new e.Members();

Page({
    data: {},
    onLoad: function(e) {
        this.setData(e);
    },
    onShow: function() {
        this._loadData();
    },
    _loadData: function() {
        this.getAddress();
    },
    tolink: function(e) {
        var s = this, i = t.getDataSet(e, "guid"), a = s.data.goods_guid;
        if (a) {
            var d = "/pages/confirm/confirm?goods_guid=" + a + "&address_guid=" + i;
            t.linkTo(d);
        }
    },
    getAddress: function() {
        var e = this, t = {
            members_guid: wx.getStorageSync("members").guid
        };
        s.getAddress(t, function(t) {
            e.setData({
                data: t.data
            });
        });
    },
    setDefault: function(e) {
        var i = this, a = t.getDataSet(e, "guid"), d = {
            members_guid: wx.getStorageSync("members").guid,
            address_guid: a
        };
        s.setDefault(d, function(e) {
            i.getAddress(), 200 !== e.code && t.layer(e.msg);
        });
    },
    addressDelete: function(e) {
        var i = this, a = (t.getDataSet(e, "index"), t.getDataSet(e, "guid"));
        wx.showModal({
            title: "温馨提示",
            content: "您确定要删除吗？",
            success: function(e) {
                if (e.confirm) {
                    var d = {
                        address_guid: a
                    };
                    s.addressDelete(d, function(e) {
                        200 == e.code ? (wx.showToast({
                            title: e.msg,
                            duration: 1500
                        }), setTimeout(function() {
                            i.getAddress();
                        }, 1e3)) : t.layer(e.msg);
                    });
                }
            }
        });
    },
    link: function(e) {
        var s = t.getDataSet(e, "surl");
        t.linkTo(s);
    }
});