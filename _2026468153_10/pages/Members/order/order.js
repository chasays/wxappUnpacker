var e = require("../../../utils/config.js"), t = require("../../custom-model.js"), a = require("../members-model.js"), s = require("../../../utils/function.js"), r = new t.Custom(), i = new a.Members();

Page({
    data: {
        url: e.Config.Url,
        msg_layer: !1,
        type: 1
    },
    onShow: function() {
        this._loadData();
    },
    _loadData: function() {
        var e = this;
        e.getMallConfig(), e.getOrderList();
    },
    getMallConfig: function() {
        var e = this;
        r.getMallConfig(function(t) {
            e.setData({
                config: t.data
            });
        });
    },
    changeTab: function(e) {
        var t = this, a = s.getDataSet(e, "type");
        t.setData({
            type: a
        }), t.getOrderList();
    },
    getOrderList: function() {
        var e = this, t = {
            members_guid: wx.getStorageSync("members").guid,
            type: e.data.type
        };
        i.getOrderList(t, function(t) {
            e.setData({
                data: t.data
            });
        });
    },
    payOrder: function(e) {
        var t = this;
        if ("no" == t.data.config.buy_status) return s.layer(t.data.config.buy_msg), !1;
        var a = s.getDataSet(e, "ordercode");
        i.wxPay(a, function(e) {
            200 == e.code ? (wx.showToast({
                title: "支付成功",
                duration: 2e3
            }), setTimeout(function() {
                t.getOrderList();
            }, 1e3)) : s.layer(e.msg);
        });
    },
    link: function(e) {
        var t = s.getDataSet(e, "surl");
        s.linkTo(t);
    },
    upStatus: function(e) {
        var t = this, a = s.getDataSet(e, "status"), r = {
            ordercode: s.getDataSet(e, "ordercode"),
            status: a
        };
        i.upOrderStatus(r, function(e) {
            200 == e.code ? t.getOrderList() : s.layer(data.msg);
        });
    },
    delorder: function(e) {
        var t = this, a = {
            ordercode: s.getDataSet(e, "ordercode")
        };
        wx.showModal({
            title: "温馨提示",
            content: "您确定要删除吗？",
            success: function(e) {
                e.confirm && i.delOrder(a, function(e) {
                    200 == e.code ? t.getOrderList() : s.layer(data.msg);
                });
            }
        });
    },
    getValue: function(e) {
        var t = this, a = e.detail.value;
        t.setData({
            messages: a
        });
    },
    cancel: function() {
        this.setData({
            msg_layer: !1
        });
    },
    editMessages: function(e) {
        var t = this, a = s.getDataSet(e, "index");
        t.setData({
            messages: t.data.data[a].messages,
            index: a,
            msg_layer: !0
        });
    },
    editMessagesHandel: function() {
        var e = this, t = e.data.messages, a = e.data.index;
        if (t == e.data.data[a].messages) return e.cancel(), !1;
        if (!t) return s.layer("请输入备注信息"), !1;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });
        var r = {
            members_guid: wx.getStorageSync("members").guid,
            ordercode: e.data.data[a].ordercode,
            messages: t
        };
        i.editMessagesHandel(r, function(t) {
            wx.hideLoading(), (t.code = 200) && (e.cancel(), e.getOrderList(), wx.showToast({
                title: "修改成功",
                duration: 1500
            }));
        });
    }
});