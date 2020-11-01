require("../../../utils/config.js");

var e = require("../members-model.js"), a = require("../../../utils/function.js"), t = new e.Members();

Page({
    data: {
        sexArr: [ "先生", "女士" ],
        sex: "先生",
        region: [ "选择区", "选择小区", "选择楼栋" ],
        address_guid: !1,
        index: 0,
        region_index: [ 0, 0, 0 ]
    },
    onLoad: function(e) {
        var a = this;
        a.setData(e), a._loadData();
    },
    _loadData: function() {
        var e = this;
        e.getArea(), e.getAddressDetails();
    },
    getArea: function() {
        var e = this;
        t.getArea(function(a) {
            e.setData({
                areaArr: a.data
            });
            var t = {
                level: 1,
                id: 0
            };
            e.getAreaClumn(t);
        });
    },
    getAreaClumn: function(e) {
        var a = this, t = a.data.areaArr, r = a.data.areaClumn, i = [], d = 0, n = [], s = 0, l = [];
        if (1 == e.level) {
            for (u = 0; u < t.length; u++) 0 == t[u].pid && i.push(t[u]);
            i.length > 0 && (d = e.id ? e.id : i[0].id);
            for (u = 0; u < t.length; u++) t[u].pid == d && n.push(t[u]);
            if (n.length > 0) {
                for (var s = n[0].id, u = 0; u < t.length; u++) t[u].pid == s && l.push(t[u]);
                if (l.length > 0) l[0].id;
            }
            o = {
                one_id: d,
                two_id: s,
                three_id: 0
            };
            a.setData({
                areaClumn: [ i, n, l ],
                area_value: o
            });
        } else if (2 == e.level) {
            for (var l = [], u = 0; u < t.length; u++) t[u].pid == e.id && l.push(t[u]);
            r[2] = l;
            var o = {
                one_id: d,
                two_id: s,
                three_id: 0
            };
            a.setData({
                areaClumn: r,
                area_value: o
            });
        }
    },
    bindcolumnchange: function(e) {
        var a = this, t = e.detail.column, r = e.detail.value;
        a.data.area_value;
        if (0 == t) {
            var i = a.data.areaClumn[0];
            if (i.length > 0) {
                n = {
                    level: 1,
                    id: i[r].id
                };
                a.getAreaClumn(n);
            }
        } else if (1 == t) {
            var d = a.data.areaClumn[1];
            if (d.length > 0) {
                var n = {
                    level: 2,
                    id: d[r].id
                };
                a.getAreaClumn(n);
            }
        }
    },
    changeArea: function(e) {
        var a = this, t = e.detail.value, r = t[0], i = t[1], d = t[2];
        if (a.data.areaClumn[0][r]) var n = a.data.areaClumn[0][r].name;
        if (a.data.areaClumn[1][i]) var s = a.data.areaClumn[1][i].name;
        if (a.data.areaClumn[2][d]) var l = a.data.areaClumn[2][d].name;
        a.setData({
            region: [ n, s || "未开放", l || "未开放" ],
            region_index: t
        });
    },
    sexChange: function(e) {
        var a = this, t = e.detail.value;
        a.setData({
            sex: a.data.sexArr[t]
        });
    },
    getAddressDetails: function() {
        var e = this, a = e.data.address_guid;
        if (!a) return !1;
        var r = {
            address_guid: a
        };
        t.getAddressDetails(r, function(a) {
            e.setData({
                data: a.data,
                sex: a.data.sex,
                region: a.data.address
            }), e.getAreaIndex();
        });
    },
    getAreaIndex: function() {
        var e = this;
        e.data.areaClumn, e.data.region;
    },
    bindRegionChange: function(e) {
        var a = this, t = e.detail.value;
        a.setData({
            region: t
        });
    },
    addressDel: function() {
        var e = this.data.address_id;
        wx.showModal({
            title: "提示",
            content: "确定要删除吗？",
            success: function(a) {
                a.confirm && EditAddress.addressDel(e, function(e) {
                    6 == e.code ? (wx.showToast({
                        title: "删除成功",
                        duration: 2e3
                    }), setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1e3)) : wx.showToast({
                        title: "删除失败",
                        duration: 1e3
                    });
                });
            }
        });
    },
    editAddressHandel: function(e) {
        var r = this, i = e.detail.value, d = wx.getStorageSync("members").guid;
        if ("" == i.username) return a.layer("请填收货人姓名"), !1;
        if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(i.userphone)) return a.layer("请输入正确的手机号码"), 
        !1;
        if ("选择区" == r.data.region[0]) return a.layer("选择区"), !1;
        if ("选择小区" == r.data.region[1]) return a.layer("选择小区"), !1;
        if ("选择楼栋" == r.data.region[2]) return a.layer("选择楼栋"), !1;
        if (!i.details) return a.layer("请输入门牌号"), !1;
        var n = {
            members_guid: d,
            username: i.username,
            userphone: i.userphone,
            sex: i.sex,
            address: r.data.region,
            details: i.details,
            is_default: i.is_default
        };
        console.log(n), r.data.address_guid && (n.address_guid = r.data.address_guid), t.editAddressHandel(n, function(e) {
            200 == e.code ? (wx.showToast({
                title: "保存成功",
                duration: 2e3
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 1e3)) : a.layer(e.msg);
        });
    }
});