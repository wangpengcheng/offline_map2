/*
* 王鹏程 2018/7/14 对原有百度路书进行了修改
*
* 参数说明：2018/7/17 19:06
* 1、defultContent:车辆行驶过程中infow显示的文字
* 2、speed:车辆运行显示速度
* 3、icon1、2车辆开启循环返回时的交替车辆iocn
* 4、autoView:是否视角切换
* 5、enableRotation：车辆是否旋转
* 6、isCircle车辆动画是否循环运行
*
* 主要修改点：在move后添加判断使得汽车能够循环运动
* 需要进一步修改的地方：制造接口，输入下一位置坐标使得汽车能够平稳移动，而不是取数组中的坐标，将定速显示转变为 定时显示，如果没有接受到坐标，就暂停等待，并马上请求坐标，连续请求三次后弹出提示
* 主要思路，不断添加新的位置坐标到数组中，更新位置，销毁前一个坐标，使得数组中保持只有两个元素，连续不断的替换
* */
var BMapLib = window.BMapLib = BMapLib || {}; (function() {
    //设置变量a,b
    var b, a = b = a || {
        version: "1.5.0"
    };
    //构造对象a
    a.guid = "$BAIDU$"; (function() {
        //设置原型
        window[a.guid] = window[a.guid] || {};
        //设置对象dom节点，并初始化
        a.dom = a.dom || {};
        //设置dom.g功能为获取节点，
        a.dom.g = function(e) {
            //判断输入是否为字符串或者对象实例
            if ("string" == typeof e || e instanceof String) {
                //是则返回获取的dom节点
                return document.getElementById(e)
            } else {
                //否，判断e是否为节点，并且层次为1-9是则返回
                if (e && e.nodeName && (e.nodeType == 1 || e.nodeType == 9)) {
                    return e
                }
            }
            //都不是返回空节点
            return null
        };
        //构造a成员g为获取dom节点方法
        a.g = a.G = a.dom.g;
        //构造a成员lang
        a.lang = a.lang || {};
        //重载lang成员的isString方法，判断它是否为String
        a.lang.isString = function(e) {
            //
            return "[object String]" == Object.prototype.toString.call(e)//利用call指向e调用其父类的原型判断是否为String对象
        };
        //a的isString判断它是否为String类型
        a.isString = a.lang.isString;
        a.dom._g = function(e) {
            //判断e是否为字符串是则通过id获取对象节点，并返回
            if (a.lang.isString(e)) {
                return document.getElementById(e)
            }
            //不是字符串（是dom节点）则直接返回节点
            return e
        };
        a._g = a.dom._g;
        //获取根节点
        a.dom.getDocument = function(e) {
            e = a.dom.g(e);//获取节点
            //判断其是否为根节点（document），是则返回，否则利用ownerDocument返回其根节点
            return e.nodeType == 9 ? e: e.ownerDocument || e.document
        };
        //浏览器属性
        a.browser = a.browser || {};
        a.browser.ie = a.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp["\x241"]) : undefined;
        //获取文档根节点指定样式属性值
        a.dom.getComputedStyle = function(f, e) {
            //获取节点
            f = a.dom._g(f);
            //找到文档根节点
            var h = a.dom.getDocument(f),
                g;//设置变量g
            if (h.defaultView && h.defaultView.getComputedStyle) {//defaultView返回document关联浏览器对象，没有则为null,getComputedStyle获取其根节点CSSStyleDeclaration不为空
                g = h.defaultView.getComputedStyle(f, null);//获取根节点属性
                if (g) {//如果根节点属性存在
                    //返回指定样式e的值；例如e为color 返回red
                    return g[e] || g.getPropertyValue(e)
                }
            }
            return ""
        };
        a.dom._styleFixer = a.dom._styleFixer || {};
        a.dom._styleFilter = a.dom._styleFilter || [];
        a.dom._styleFilter.filter = function(f, j, k) {
            for (var e = 0,
                     h = a.dom._styleFilter,
                     g; g = h[e]; e++) {
                if (g = g[k]) {
                    j = g(f, j)
                }
            }
            return j
        };
        a.string = a.string || {};
        a.string.toCamelCase = function(e) {
            if (e.indexOf("-") < 0 && e.indexOf("_") < 0) {
                return e
            }
            return e.replace(/[-_][^-_]/g,
                function(f) {
                    return f.charAt(1).toUpperCase()
                })
        };
        a.dom.getStyle = function(g, f) {
            var i = a.dom;
            g = i.g(g);
            f = a.string.toCamelCase(f);
            var h = g.style[f] || (g.currentStyle ? g.currentStyle[f] : "") || i.getComputedStyle(g, f);
            if (!h) {
                var e = i._styleFixer[f];
                if (e) {
                    h = e.get ? e.get(g) : a.dom.getStyle(g, e)
                }
            }
            if (e = i._styleFilter) {
                h = e.filter(f, h, "get")
            }
            return h
        };
        a.getStyle = a.dom.getStyle;
        a.dom._NAME_ATTRS = (function() {
            var e = {
                cellpadding: "cellPadding",
                cellspacing: "cellSpacing",
                colspan: "colSpan",
                rowspan: "rowSpan",
                valign: "vAlign",
                usemap: "useMap",
                frameborder: "frameBorder"
            };
            if (a.browser.ie < 8) {
                e["for"] = "htmlFor";
                e["class"] = "className"
            } else {
                e.htmlFor = "for";
                e.className = "class"
            }
            return e
        })();
        a.dom.setAttr = function(f, e, g) {
            f = a.dom.g(f);
            if ("style" == e) {
                f.style.cssText = g
            } else {
                e = a.dom._NAME_ATTRS[e] || e;
                f.setAttribute(e, g)
            }
            return f
        };
        a.setAttr = a.dom.setAttr;
        a.dom.setAttrs = function(g, e) {
            g = a.dom.g(g);
            for (var f in e) {
                a.dom.setAttr(g, f, e[f])
            }
            return g
        };
        a.setAttrs = a.dom.setAttrs;
        a.dom.create = function(g, e) {
            var h = document.createElement(g),
                f = e || {};
            return a.dom.setAttrs(h, f)
        };
        a.object = a.object || {};
        a.extend = a.object.extend = function(g, e) {
            for (var f in e) {
                if (e.hasOwnProperty(f)) {
                    g[f] = e[f]
                }
            }
            return g
        }
    })();
    //路书
    var c = BMapLib.LuShu = function(g, f, e) {
        if (!f || f.length < 1) {
            return
        }
        this._map = g;//地图对象
        this._path = f;//路径
        this.i = 0;//记录当前位置坐标
        this._setTimeoutQuene = [];//设置时间外队列
        this._projection = this._map.getMapType().getProjection();//返回地图类型所使用的投影实例Projection
        this._opts = {//设置参数
            icon: null,//icon1
            icon1:null,//icon2
            speed: 4000,//速度
            defaultContent: "",//行驶过程中的显示字符
            isCircle:true//是否循环显示
        };
        this._setOptions(e);//设置初始化参数方法
        this._rotation = 0;//旋转角度
        //如果icon类型不是BMap.Icon则设置为defaultIcon
        if (!this._opts.icon instanceof BMap.Icon) {
            this._opts.icon = defaultIcon;
        }
        //设置循环路径
        this._return_path=this.get_return_path(f);//见底部
        this._isIcon=true;
    };
    c.prototype._setOptions = function(e) {//设置参数
        if (!e) {//空则返回
            return
        }
        for (var f in e) {//遍历输入参数
            if (e.hasOwnProperty(f)) {  //判断e中是否有f(path)对象
                this._opts[f] = e[f]//将e中设置参数拷贝到_opts中
            }
        }
    };
    //设置原型拓展的start方法
    c.prototype.start = function() {
        var f = this,
            e = f._path.length;
        //根据现在位置判断是否运行
        if (f.i && f.i < e - 1) {//判断是否为终点或起点，没则移动
            if (!f._fromPause) {//判断是否暂停，false则直接返回不移动，true则继续
                return
            } else {
                if (!f._fromStop) {//判断是否停止,false则移动动画
                    f._moveNext(++f.i)//移动到第i个节点
                }
            }
        } else{
            f._addMarker();//添加Marker
            f._timeoutFlag = setTimeout(function() {//返回动画ID
                    f._addInfoWin();//添加信息窗口
                    if (f._opts.defaultContent == "") {//没有则隐藏窗口
                        f.hideInfoWindow()//隐藏窗口
                    }
                    f._moveNext(f.i)//移动到i点
                },
                200)//设置动画为200ms
        }
        this._fromPause = false;//不暂停
        this._fromStop = false;//不停止
    },
        //停止
        c.prototype.stop = function() {//设置stop方法
            this.i = 0;//将i设置为0
            this._fromStop = true;//停止
            clearInterval(this._intervalFlag);
            this._clearTimeout();
            //统计中间站点并设置站点为不显示
            for (var g = 0,
                     f = this._opts.landmarkPois,
                     e = f.length; g < e; g++) {
                f[g].bShow = false
            }
        };
    //暂停
    c.prototype.pause = function() {
        clearInterval(this._intervalFlag);
        this._fromPause = true;
        this._clearTimeout()
    };
    //隐藏信息窗口
    c.prototype.hideInfoWindow = function() {
        this._overlay._div.style.visibility = "hidden"
    };
    //显示信息窗口
    c.prototype.showInfoWindow = function() {
        this._overlay._div.style.visibility = "visible"
    };
    //a对象扩展
    a.object.extend(c.prototype, {
        //添加Marker
        _addMarker: function(f) {
            if (this._marker) {//如果marker存在
                this.stop();//停止动画
                this._map.removeOverlay(this._marker);//移除添加的marker
                //取消延迟
                clearTimeout(this._timeoutFlag)
            }
            this._overlay && this._map.removeOverlay(this._overlay);
            var e = new BMap.Marker(this._path[0]);
            this._opts.icon && e.setIcon(this._opts.icon);
            //设置Css-z层级为0
            e.setZIndex(0);
            this._map.addOverlay(e);
            //设置marker起跳动画
           //e.setAnimation(BMAP_ANIMATION_DROP);
            this._marker = e
        },
        _addInfoWin: function() {
            var f = this;
            //返回当前点坐标和显示文字
            var e = new d(f._marker.getPosition(), f._opts.defaultContent);
            e.setRelatedClass(this);
            this._overlay = e;
            this._map.addOverlay(e)
        },
        //输出位置点
        _getMercator: function(e) {
            return this._map.getMapType().getProjection().lngLatToPoint(e)
        },
        //计算距离
        _getDistance: function(f, e) {//计算距离
            return Math.sqrt(Math.pow(f.x - e.x, 2) + Math.pow(f.y - e.y, 2))
        },
        //设置移动
        _move: function(n, j, m) {//输入起点坐标，终点坐标，
            var i = this,
                h = 0,//设置线性插值时所用的时间
                e = 10,//设置动画时间为10ms
                f = this._opts.speed / (1000 / e),//速度/100
                l = this._projection.lngLatToPoint(n),//将起点坐标投影到屏幕上
                k = this._projection.lngLatToPoint(j),//将终点坐标投影到屏幕上
                g = Math.round(i._getDistance(l, k) / f);//计算距离并除以速度，得到需要时间
            if (g < 1) {//如果时间小于1ms直接移动到下一个点
                i._moveNext(++i.i);
                return
            }
            i._intervalFlag = setInterval(function() {//设置循环动画，返回动画id
                    if (h >= g) {//如果h大于所需时间g，
                        clearInterval(i._intervalFlag);//停止动画
                        if (i.i > i._path.length) {//如果超过路径长度返回空值
                            return
                        }
                        i._moveNext(++i.i)//移动到下一个点
                    } else {
                        h++;//增加时间h<g的执行次数,即线性插值的第几个点
                        var o = m(l.x, k.x, h, g),//线性插值x
                            r = m(l.y, k.y, h, g),//线性插值y
                            q = i._projection.pointToLngLat(new BMap.Pixel(o, r));//设置新的坐标点
                        if (h == 1) {
                            var p = null;
                            if (i.i - 1 >= 0) {//现在坐标点顺序--不是起点
                                p = i._path[i.i - 1]//获取当前点坐标
                            }
                            if (i._opts.enableRotation == true) {//如果需要转向
                                i.setRotation(p, n, j)//设置转向
                            }
                            if (i._opts.autoView) {
                                //开启视野自动调整
                                if (!i._map.getBounds().containsPoint(q)) {
                                    i._map.setCenter(q)
                                }
                            }
                        }
                        i._marker.setPosition(q);//设置新坐标为q
                        i._setInfoWin(q)//设置提示弹窗坐标为q
                    }
                },
                e)
        },
        //设置旋转函数，输入起点、终点
        setRotation: function(l, f, m) {
            var j = this;
            var e = 0;
            f = j._map.pointToPixel(f);
            m = j._map.pointToPixel(m);
            if (m.x != f.x) {
                var k = (m.y - f.y) / (m.x - f.x),
                    g = Math.atan(k);
                e = g * 360 / (2 * Math.PI);
                if (m.x < f.x) {
                    e = -e + 90 + 90
                } else {
                    e = -e
                }
                j._marker.setRotation( - e);
            } else {
                var h = m.y - f.y;
                var i = 0;
                if (h > 0) {
                    i = -1
                } else {
                    i = 1
                }
                j._marker.setRotation( - i * 90)
            }
            return
        },
        linePixellength: function(f, e) {
            return Math.sqrt(Math.abs(f.x - e.x) * Math.abs(f.x - e.x) + Math.abs(f.y - e.y) * Math.abs(f.y - e.y))
        },
        pointToPoint: function(f, e) {
            return Math.abs(f.x - e.x) * Math.abs(f.x - e.x) + Math.abs(f.y - e.y) * Math.abs(f.y - e.y)
        },
        _moveNext: function(e) {
            var f = this;
            if (e < this._path.length - 1) {
                f._move(f._path[e], f._path[e + 1], f._tween.linear)
              //  console.log(e);
            }else if(e==this._path.length-1){//判断是否到终点实现循环调用
                if(this._opts.isCircle){
                   //console.log(f.i);
                    f.change_path();
                    this.start();//再次运行；
                    //更改车辆iocn使得车辆翻转
                    if(this._isIcon){
                        this._marker.setIcon(this._opts.icon1);
                    }else {
                        this._marker.setIcon(this._opts.icon);
                    }
                    //更改信号变量
                    this._isIcon=!this._isIcon;
                }
            }
        },
        _setInfoWin: function(g) {//输入新窗口位置
            var f = this;
            if (!f._overlay) {
                return
            }
            f._overlay.setPosition(g, f._marker.getIcon().size);
            var e = f._troughPointIndex(g);
            if (e != -1) {
                clearInterval(f._intervalFlag);
                f._overlay.setHtml(f._opts.landmarkPois[e].html);
                f._overlay.setPosition(g, f._marker.getIcon().size);
                f._pauseForView(e)
            } else {
                f._overlay.setHtml(f._opts.defaultContent)
            }
        },
        _pauseForView: function(e) {
            var g = this;
            var f = setTimeout(function() {
                    g._moveNext(++g.i)
                },
                g._opts.landmarkPois[e].pauseTime * 1000);
            g._setTimeoutQuene.push(f)
        },
        _clearTimeout: function() {
            for (var e in this._setTimeoutQuene) {
                clearTimeout(this._setTimeoutQuene[e])
            }
            this._setTimeoutQuene.length = 0
        },
        _tween: {
            //双端线性插值，输入
            linear: function(f, j, h, i) {
                var e = f,
                    l = j - f,
                    g = h,
                    k = i;
                return l * g / k + e
            }
        },
        _troughPointIndex: function(f) {//输入目标位置
            var h = this._opts.landmarkPois,
                j;
            for (var g = 0, e = h.length; g < e; g++) {
                if (!h[g].bShow) {
                    j = this._map.getDistance(new BMap.Point(h[g].lng, h[g].lat), f);//获取目标位置与目标位置距离
                    if (j < 10) {//如果距离小于10则显示路过站点信息
                        h[g].bShow = true;
                        return g //返回站点次序坐标
                    }
                }
            }
            return - 1  //返回-1
        }
    });
    //构造函数添加_point和_html
    function d(e, f) {
        this._point = e;
        this._html = f
    }
    d.prototype = new BMap.Overlay();//d继承BMap.Overlay
    //初始化d
    d.prototype.initialize = function(e) {
        //创建div
        var f = this._div = a.dom.create("div", {
            style: "border:solid 1px #ccc;width:auto;min-width:50px;text-align:center;position:absolute;background:#fff;color:#000;font-size:12px;border-radius: 10px;padding:5px;white-space: nowrap;"
        });
        //设置html样式
        f.innerHTML = this._html;
        e.getPanes().floatPane.appendChild(f);
        this._map = e;
        return f
    };
    d.prototype.draw = function() {
        this.setPosition(this.lushuMain._marker.getPosition(), this.lushuMain._marker.getIcon().size)
    };
    //a对象扩展
    a.object.extend(d.prototype, {
        setPosition: function(h, i) {
            var f = this._map.pointToOverlayPixel(h),
                e = a.dom.getStyle(this._div, "width"),
                g = a.dom.getStyle(this._div, "height");
            overlayW = parseInt(this._div.clientWidth || e, 10),
                overlayH = parseInt(this._div.clientHeight || g, 10);
            this._div.style.left = f.x - overlayW / 2 + "px";
            this._div.style.bottom = -(f.y - i.height) + "px"
        },
        setHtml: function(e) {
            this._div.innerHTML = e
        },
        setRelatedClass: function(e) {
            this.lushuMain = e
        }
    })

    //设置汽车循环的扩展函数
    c.prototype.get_return_path=function(){
        var f=this._path;
        var tem=[];
        for(var i=f.length-1;i>0;--i){
            tem.push(f[i]);
        }
        return tem;
    }
    //更改路径
    /*
    c.prototype.change_path=function(f){
        this._path=f;
        return this._path;
    }
    */
    //反转线路
    c.prototype.change_path=function(){
        this._path.reverse();
    }
    //设置是否循环
    c.prototype.set_circle=function () {
        this._opts.isCircle=!this._opts.isCircle;
    }
    c.prototype.change_iocn=function (f) {
        this._marker.setIcon(f);
    }
    /*
    luShu拓展：此函数用于获取车辆坐标并实现实时定位

    //首先更改_nextmove，让其变为单点运动
    c.prototype.bus_move_next=function () {
        
    }
    */
    //设置函数实现对象的拷贝
})();