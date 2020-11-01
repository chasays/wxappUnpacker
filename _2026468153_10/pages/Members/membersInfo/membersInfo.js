var a = require("../members-model.js"), e = require("../../../utils/function.js"), t = new a.Members();

Page({
    data: {
        sexArr: [ "先生", "女士" ],
        sex: "先生",
        birthday: "请选择生日",
        region: [ "选择区", "选择小区", "选择楼栋" ],
        region_index: [ 0, 0, 0 ]
    },
    onLoad: function() {
        this._loadData();
    },
    _loadData: function() {
        var a = this;
        a.getMembersInfo(), a.getArea();
    },
    getMembersInfo: function() {
        var a = this, e = {
            members_guid: wx.getStorageSync("members").guid
        };
        t.getMembersInfo(e, function(e) {
            a.setData({
                data: e.data,
                sex: e.data.sex,
                region: e.data.region,
                birthday: e.data.birthday
            });
        });
    },
    getArea: function() {
        var a = this;
        t.getArea(function(e) {
            a.setData({
                areaArr: e.data
            });
            var t = {
                level: 1,
                id: e.data[0].id
            };
            a.getAreaClumn(t);
        });
    },
    getAreaClumn: function(a) {
        var e = this, t = e.data.areaArr, r = e.data.areaClumn, i = [], n = 0, d = [], l = 0, s = [];
        if (1 == a.level) {
            for (u = 0; u < t.length; u++) 0 == t[u].pid && i.push(t[u]);
            i.length > 0 && (n = a.id ? a.id : i[0].id);
            for (u = 0; u < t.length; u++) t[u].pid == n && d.push(t[u]);
            if (d.length > 0) {
                for (var l = d[0].id, u = 0; u < t.length; u++) t[u].pid == l && s.push(t[u]);
                if (s.length > 0) s[0].id;
            }
            o = {
                one_id: n,
                two_id: l,
                three_id: 0
            };
            e.setData({
                areaClumn: [ i, d, s ],
                area_value: o
            });
        } else if (2 == a.level) {
            for (var s = [], u = 0; u < t.length; u++) t[u].pid == a.id && s.push(t[u]);
            r[2] = s;
            var o = {
                one_id: n,
                two_id: l,
                three_id: 0
            };
            e.setData({
                areaClumn: r,
                area_value: o
            });
        }
    },
    bindcolumnchange: function(a) {
        var e = this, t = a.detail.column, r = a.detail.value;
        e.data.area_value;
        if (0 == t) {
            var i = e.data.areaClumn[0];
            if (i.length > 0) {
                d = {
                    level: 1,
                    id: i[r].id
                };
                console.log(d), e.getAreaClumn(d);
            }
        } else if (1 == t) {
            var n = e.data.areaClumn[1];
            if (n.length > 0) {
                var d = {
                    level: 2,
                    id: n[r].id
                };
                e.getAreaClumn(d);
            }
        }
    },
    changeArea: function(a) {
        var e = this, t = a.detail.value, r = t[0], i = t[1], n = t[2];
        if (e.data.areaClumn[0][r]) var d = e.data.areaClumn[0][r].name;
        if (e.data.areaClumn[1][i]) var l = e.data.areaClumn[1][i].name;
        if (e.data.areaClumn[2][n]) var s = e.data.areaClumn[2][n].name;
        e.setData({
            region: [ d, l || "未开放", s || "未开放" ],
            region_index: t
        });
    },
    sexChange: function(a) {
        var e = this, t = a.detail.value;
        e.setData({
            sex: e.data.sexArr[t]
        });
    },
    addressChange: function(a) {
        this.setData({
            address: a.detail.value
        });
    },
    birthdayChange: function(a) {
        this.setData({
            birthday: a.detail.value
        });
    },
    editMembersHandel: function(a) {
        var r = this, i = /^1[3|4|5|7|8][0-9]{9}$/, n = a.detail.value;
        return n.username ? n.userphone ? "" == n.userphone || i.test(n.userphone) ? (n.members_guid = wx.getStorageSync("members").guid, 
        n.area1 = r.data.region[0], n.area2 = r.data.region[1], n.area3 = r.data.region[2], 
        console.log(n), void t.editMembersHandel(n, function(a) {
            200 == a.code && (wx.showToast({
                title: "保存成功",
                duration: 1500
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 1e3));
        })) : (e.layer("请输入正确的电话号码"), !1) : (e.layer("手机号不能为空"), !1) : (e.layer("姓名不能为空"), 
        !1);
    }
});