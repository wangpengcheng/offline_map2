load: function(a, b, c) {
    var d = this.ib(a);
    if (d.Ad == this.Ej.Xp) c && b();
    else {
        if (d.Ad == this.Ej.nG) {
            this.jK(a);
            this.xN(a);
            var e = this;
            e.AC == q && (e.AC = o, setTimeout(function() {
                for (var a = [], b = 0, c = e.Od.Bn.length; b < c; b++) {
                    var d = e.Od.Bn[b],
                    l = "";
                    ja.Gy.dK(d) ? l = ja.Gy.get(d) : (l = "", a.push(d + "_" + Rb[d]));
                    e.Od.Ov.push({
                        QM: d,
                        HE: l
                    })
                }
                e.AC = q;
                e.Od.Bn.length = 0;
                //0 == a.length ? e.UK() : Qb(e.gG.XP + "&mod=" + a.join(","))

                console.log(a);     //这里很重要！帮助我们找到我们需要加载的模块！
                    0 == a.length ? e.UK() : Qb("js/getmodules2.0.js")
            },
            1));
            d.Ad = this.Ej.GP
        }
        d.Nu.push(b)
    }