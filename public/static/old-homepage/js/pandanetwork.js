function animate() {
    for (var a = 0; a < myUnderlines.length; a++) {
        var b = myUnderlines[a];
        b.clear(), b.update(), b.draw()
    }
    requestAnimFrame(function() {
        animate()
    })
}
function GuitarString(a, b, c, d, e, f) {
    this.ctx = a, this.canvas = a.canvas, this.startPoint = b, this.endPoint = c, this.strokeWidth = d, this.strokeColor = e, this.ratio = f, this.level = musicLevel(this.startPoint, this.endPoint, this.ratio), this.maxGrabDistance = 2 * this.strokeWidth, this.maxControlDistance = 6 * this.strokeWidth, this.ctx.lineWidth = this.strokeWidth, this.ctx.strokeStyle = this.strokeColor, this.ctx.beginPath(), this.ctx.moveTo(this.startPoint.x, this.startPoint.y), this.ctx.lineTo(this.endPoint.x, this.endPoint.y), this.ctx.globalCompositeOperation = "source-over", this.ctx.stroke(), this.currentMouseX, this.currentMouseY, this.lastMouseX, this.lastMouseY, this.waveInitX = (this.startPoint.x + this.endPoint.x) / 2, this.waveInitY = this.startPoint.y - this.maxControlDistance, this.waveCount = 0, this.damping = .95, this.thirdPoint = new Point((this.startPoint.x + this.endPoint.x) / 2, this.startPoint.y), this.userInControl=!1, this.userPlucked=!1, this.waveInControl=!1, this.waveFinished=!1, this.initState=!0, this.lastRedraw=!1, this.redrawActive=!1;
    var g = this;
    this.canvas.addEventListener("mouseover", function(a) {
        g.mouseOver(g, a)
    }, !1), this.canvas.addEventListener("mousemove", function(a) {
        g.mouseMove(g, a)
    }, !1), this.canvas.addEventListener("mouseleave", function(a) {
        g.mouseLeave(g, a)
    }, !1), this.canvas.addEventListener("mouseout", function(a) {
        g.mouseOut(g, a)
    }, !1), this.canvas.addEventListener("touchstart", function(a) {
        g.touchDown(g, a)
    }, !1), this.canvas.addEventListener("touchmove", function(a) {
        g.touchXY(g, a)
    }, !1), this.canvas.addEventListener("touchend", function(a) {
        g.touchUp(g, a)
    }, !1)
}
function SingleUnderline(a, b, c) {
    this.element = a, this.text = this.element.textContent, this.underlineStyles = b, this.elementStyles = c, this.redrawActive=!1, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.ratio = window.devicePixelRatio, this.canvas.width = this.elementStyles.width * this.ratio, this.canvas.height = this.elementStyles.height * this.ratio + 35, this.element.appendChild(this.canvas), this.canvas.style.width = this.elementStyles.width + "px", this.ctx.font = this.font = this.elementStyles.fontStyle + " " + multiplyValue(this.elementStyles.fontSize, this.ratio) + " " + this.elementStyles.fontFamily;
    var d = this.ctx.measureText(".").width;
    if ("auto" == this.underlineStyles["text-underline-width"] ? this.strokeWidth = d / 12 : (this.strokeWidth = this.underlineStyles["text-underline-width"], this.strokeWidth = parseFloat(this.strokeWidth) * this.ratio), "auto" == this.underlineStyles["text-underline-position"])
        this.underlinePosition = parseFloat(this.elementStyles.height) * this.ratio * (1 - this.elementStyles.baselinePositionRatio + .2 * this.elementStyles.baselinePositionRatio) + this.strokeWidth / 2;
    else {
        var e = parseFloat(this.underlineStyles["text-underline-position"]);
        this.underlinePosition = parseFloat(this.elementStyles.height) * this.ratio * (1 - this.elementStyles.baselinePositionRatio + this.elementStyles.baselinePositionRatio * e) + this.strokeWidth / 2
    }
    var f = optimalStrokeWidthPos(this.strokeWidth, this.underlinePosition);
    this.strokeWidth = f.strokeWidth, this.underlinePosition = f.posY, textWidth = this.ctx.measureText(this.text).width, this.myString = new GuitarString(this.ctx, new Point(0, this.underlinePosition), new Point(textWidth, this.underlinePosition), this.strokeWidth, this.underlineStyles["text-underline-color"], this.ratio), this.drawHoles()
}
function MultipleUnderline(a, b, c) {
    this.element = a, this.text = this.element.textContent, this.underlineStyles = b, this.elementStyles = c, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.ratio = window.devicePixelRatio, this.canvas.width = this.elementStyles.width * this.ratio, this.canvas.height = this.elementStyles.height * this.ratio, this.canvas.style.left = this.elementStyles.canvasLeft + "px", this.element.appendChild(this.canvas), this.canvas.style.width = this.elementStyles.width + "px", this.ctx.font = this.font = this.elementStyles.fontStyle + " " + multiplyValue(this.elementStyles.fontSize, this.ratio) + " " + this.elementStyles.fontFamily, this.multipleRedrawActive=!1, this.elementStyles.lineHeight = is_chrome ? this.elementStyles.lineHeight * this.ratio : this.elementStyles.lineHeight * this.ratio;
    var d = this.ctx.measureText(".").width;
    if ("auto" == this.underlineStyles["text-underline-width"] ? this.strokeWidth = d / 12 : (this.strokeWidth = this.underlineStyles["text-underline-width"], this.strokeWidth = parseFloat(this.strokeWidth) * this.ratio), "auto" == this.underlineStyles["text-underline-position"])
        this.underlinePosition = parseFloat(this.elementStyles.fontSize) * this.ratio * (1 - this.elementStyles.baselinePositionRatio + .4 * this.elementStyles.baselinePositionRatio) + this.strokeWidth / 2;
    else {
        var e = parseFloat(this.underlineStyles["text-underline-position"]);
        this.underlinePosition = parseFloat(this.elementStyles.fontSize) * this.ratio * (1 - this.elementStyles.baselinePositionRatio + this.elementStyles.baselinePositionRatio * e) + this.strokeWidth / 2
    }
    var f = optimalStrokeWidthPos(this.strokeWidth, this.underlinePosition);
    this.strokeWidth = f.strokeWidth, this.underlinePosition = f.posY, this.lines = [], this.myStrings = [];
    for (var g = this.text.match(/[^\s-]+-?\s?/g), h = "", i = 0, j = 0, k = 0; k < g.length; k++) {
        if (g[k].match(/\s+$/)) {
            var l = g[k].replace(/\s+$/, ""), m = h + l, n = this.ctx.measureText(m), o = n.width;
            m += " "
        } else 
            var m = h + g[k], n = this.ctx.measureText(m), o = n.width;
        if (j)
            if (o > this.elementStyles.parentWidth * this.ratio && k > 0) {
                if (h.match(/\s+$/))
                    var p = this.ctx.measureText(h.replace(/\s+$/, "")), q = p.width;
                else 
                    var p = this.ctx.measureText(h), q = p.width;
                    var r = {
                        lineText: h,
                        lineTextIndent: - .2,
                        linePositionY: i,
                        lineMeasureWidth: q
                    };
                    this.lines.push(r), h = g[k], i += this.elementStyles.lineHeight
            } else 
                h = m;
        else if (o + this.elementStyles.textIndent * this.ratio > this.elementStyles.parentWidth * this.ratio && k > 0) {
            if (h.match(/\s+$/))
                var p = this.ctx.measureText(h.replace(/\s+$/, "")), q = p.width;
            else 
                var p = this.ctx.measureText(h), q = p.width;
            var r = {
                lineText: h,
                lineTextIndent: this.elementStyles.textIndent * this.ratio - .2,
                linePositionY: i,
                lineMeasureWidth: q
            };
            this.lines.push(r), h = g[k], i += this.elementStyles.lineHeight, j++
        } else 
            h = m
    }
    if (h.match(/\s+$/))
        var p = this.ctx.measureText(h.replace(/\s+$/, "")), q = p.width;
    else 
        var p = this.ctx.measureText(h), q = p.width;
    var r = {
        lineText: h,
        lineTextIndent: - .2,
        linePositionY: i,
        lineMeasureWidth: q
    };
    this.lines.push(r);
    for (var s = 0; s < this.lines.length; s++) {
        var r = this.lines[s], t = new GuitarString(this.ctx, new Point(r.lineTextIndent, r.linePositionY + this.underlinePosition), new Point(r.lineTextIndent + r.lineMeasureWidth, r.linePositionY + this.underlinePosition), this.strokeWidth, this.underlineStyles["text-underline-color"], this.ratio);
        this.myStrings.push(t)
    }
    this.drawUnderline(), this.drawHoles()
}
function align_content() {
    Modernizr.touch || location.reload()
}
function alarma(a) {
    alert(a)
}
window.Modernizr = function(a, b, c) {
    function d(a) {
        s.cssText = a
    }
    function e(a, b) {
        return typeof a === b
    }
    function f(a, b) {
        return !!~("" + a).indexOf(b)
    }
    function g(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!f(e, "-") && s[e] !== c)
                return "pfx" == b ? e : !0
        }
        return !1
    }
    function h(a, b, d) {
        for (var f in a) {
            var g = b[a[f]];
            if (g !== c)
                return d===!1 ? a[f] : e(g, "function") ? g.bind(d || b) : g
        }
        return !1
    }
    function i(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1), f = (a + " " + v.join(d + " ") + d).split(" ");
        return e(b, "string") || e(b, "undefined") ? g(f, b) : (f = (a + " " + w.join(d + " ") + d).split(" "), h(f, b, c))
    }
    var j, k, l, m = "2.8.3", n = {}, o=!0, p = b.documentElement, q = "modernizr", r = b.createElement(q), s = r.style, t = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")), u = "Webkit Moz O ms", v = u.split(" "), w = u.toLowerCase().split(" "), x = {}, y = [], z = y.slice, A = function(a, c, d, e) {
        var f, g, h, i, j = b.createElement("div"), k = b.body, l = k || b.createElement("body");
        if (parseInt(d, 10))
            for (; d--;)
                h = b.createElement("div"), h.id = e ? e[d] : q + (d + 1), j.appendChild(h);
        return f = ["&#173;", '<style id="s', q, '">', a, "</style>"].join(""), j.id = q, (k ? j : l).innerHTML += f, l.appendChild(j), k || (l.style.background = "", l.style.overflow = "hidden", i = p.style.overflow, p.style.overflow = "hidden", p.appendChild(l)), g = c(j, a), k ? j.parentNode.removeChild(j) : (l.parentNode.removeChild(l), p.style.overflow = i), !!g
    }, B = {}.hasOwnProperty;
    l = e(B, "undefined") || e(B.call, "undefined") ? function(a, b) {
        return b in a && e(a.constructor.prototype[b], "undefined")
    } : function(a, b) {
        return B.call(a, b)
    }, Function.prototype.bind || (Function.prototype.bind = function(a) {
        var b = this;
        if ("function" != typeof b)
            throw new TypeError;
        var c = z.call(arguments, 1), d = function() {
            if (this instanceof d) {
                var e = function() {};
                e.prototype = b.prototype;
                var f = new e, g = b.apply(f, c.concat(z.call(arguments)));
                return Object(g) === g ? g : f
            }
            return b.apply(a, c.concat(z.call(arguments)))
        };
        return d
    }), x.touch = function() {
        var c;
        return "ontouchstart"in a || a.DocumentTouch && b instanceof DocumentTouch ? c=!0 : A(["@media (", t.join("touch-enabled),("), q, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
            c = 9 === a.offsetTop
        }), c
    }, x.cssanimations = function() {
        return i("animationName")
    };
    for (var C in x)
        l(x, C) && (k = C.toLowerCase(), n[k] = x[C](), y.push((n[k] ? "" : "no-") + k));
    return n.addTest = function(a, b) {
        if ("object" == typeof a)
            for (var d in a)
                l(a, d) && n.addTest(d, a[d]);
        else {
            if (a = a.toLowerCase(), n[a] !== c)
                return n;
            b = "function" == typeof b ? b() : b, "undefined" != typeof o && o && (p.className += " " + (b ? "" : "no-") + a), n[a] = b
        }
        return n
    }, d(""), r = j = null, function(a, b) {
        function c(a, b) {
            var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }
        function d() {
            var a = s.elements;
            return "string" == typeof a ? a.split(" ") : a
        }
        function e(a) {
            var b = r[a[p]];
            return b || (b = {}, q++, a[p] = q, r[q] = b), b
        }
        function f(a, c, d) {
            if (c || (c = b), k)
                return c.createElement(a);
            d || (d = e(c));
            var f;
            return f = d.cache[a] ? d.cache[a].cloneNode() : o.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), !f.canHaveChildren || n.test(a) || f.tagUrn ? f : d.frag.appendChild(f)
        }
        function g(a, c) {
            if (a || (a = b), k)
                return a.createDocumentFragment();
            c = c || e(a);
            for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++)
                f.createElement(h[g]);
            return f
        }
        function h(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                return s.shivMethods ? f(c, a, b) : b.createElem(c)
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-]+/g, function(a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
            }) + ");return n}")(s, b.frag)
        }
        function i(a) {
            a || (a = b);
            var d = e(a);
            return s.shivCSS&&!j&&!d.hasCSS && (d.hasCSS=!!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || h(a, d), a
        }
        var j, k, l = "3.7.0", m = a.html5 || {}, n = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, o = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, p = "_html5shiv", q = 0, r = {};
        !function() {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", j = "hidden"in a, k = 1 == a.childNodes.length || function() {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                }()
            } catch (c) {
                j=!0, k=!0
            }
        }();
        var s = {
            elements: m.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: l,
            shivCSS: m.shivCSS!==!1,
            supportsUnknownElements: k,
            shivMethods: m.shivMethods!==!1,
            type: "default",
            shivDocument: i,
            createElement: f,
            createDocumentFragment: g
        };
        a.html5 = s, i(b)
    }(this, b), n._version = m, n._prefixes = t, n._domPrefixes = w, n._cssomPrefixes = v, n.testProp = function(a) {
        return g([a])
    }, n.testAllProps = i, n.testStyles = A, n.prefixed = function(a, b, c) {
        return b ? i(a, b, c) : i(a, "pfx")
    }, p.className = p.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (o ? " js " + y.join(" ") : ""), n
}(this, this.document), function(a, b, c) {
    function d(a) {
        return "[object Function]" == q.call(a)
    }
    function e(a) {
        return "string" == typeof a
    }
    function f() {}
    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }
    function h() {
        var a = r.shift();
        s = 1, a ? a.t ? o(function() {
            ("c" == a.t ? m.injectCss : m.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : s = 0
    }
    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!n && g(l.readyState) && (t.r = n = 1, !s && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && o(function() {
                    v.removeChild(l)
                }, 50);
                for (var d in A[c])
                    A[c].hasOwnProperty(d) && A[c][d].onload()
            }
        }
        var j = j || m.errorTimeout, l = b.createElement(a), n = 0, q = 0, t = {
            t: d,
            s: c,
            e: f,
            a: i,
            x: j
        };
        1 === A[c] && (q = 1, A[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, q)
        }, r.splice(e, 0, t), "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null : p), o(k, j)) : A[c].push(l))
    }
    function j(a, b, c, d, f) {
        return s = 0, b = b || "j", e(a) ? i("c" == b ? x : w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a), 1 == r.length && h()), this
    }
    function k() {
        var a = m;
        return a.loader = {
            load: j,
            i: 0
        }, a
    }
    var l, m, n = b.documentElement, o = a.setTimeout, p = b.getElementsByTagName("script")[0], q = {}.toString, r = [], s = 0, t = "MozAppearance"in n.style, u = t&&!!b.createRange().compareNode, v = u ? n: p.parentNode, n = a.opera && "[object Opera]" == q.call(a.opera), n=!!b.attachEvent&&!n, w = t ? "object" : n ? "script" : "img", x = n ? "script" : w, y = Array.isArray || function(a) {
        return "[object Array]" == q.call(a)
    }, z = [], A = {}, B = {
        timeout: function(a, b) {
            return b.length && (a.timeout = b[0]), a
        }
    };
    m = function(a) {
        function b(a) {
            var b, c, d, a = a.split("!"), e = z.length, f = a.pop(), g = a.length, f = {
                url: f,
                origUrl: f,
                prefixes: a
            };
            for (c = 0; g > c; c++)
                d = a[c].split("="), (b = B[d.shift()]) && (f = b(f, d));
            for (c = 0; e > c; c++)
                f = z[c](f);
            return f
        }
        function g(a, e, f, g, h) {
            var i = b(a), j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (A[i.url] ? i.noexec=!0 : A[i.url] = 1, f.load(i.url, i.forceCSS ||!i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), A[i.url] = 2
            })))
        }
        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a))
                        c || (l = function() {
                            var a = [].slice.call(arguments);
                            m.apply(this, a), n()
                        }), g(a, l, b, 0, j);
                    else if (Object(a) === a)
                        for (i in h = function() {
                            var b, c = 0;
                            for (b in a)
                                a.hasOwnProperty(b) && c++;
                                return c
                            }(), a)
                                a.hasOwnProperty(i) && (!c&&!--h && (d(l) ? l = function() {
                                    var a = [].slice.call(arguments);
                                    m.apply(this, a), n()
                                } : l[i] = function(a) {
                                    return function() {
                                        var b = [].slice.call(arguments);
                                        a && a.apply(this, b), n()
                                    }
                                }(m[i])), g(a[i], l, b, i, j))
                } else 
                    !c && n()
            }
            var h, i, j=!!a.test, k = a.load || a.both, l = a.callback || f, m = l, n = a.complete || f;
            c(j ? a.yep : a.nope, !!k), k && c(k)
        }
        var i, j, l = this.yepnope.loader;
        if (e(a))
            g(a, 0, l, 0);
        else if (y(a))
            for (i = 0; i < a.length; i++)
                j = a[i], e(j) ? g(j, 0, l, 0) : y(j) ? m(j) : Object(j) === j && h(j, l);
        else 
            Object(a) === a && h(a, l)
    }, m.addPrefix = function(a, b) {
        B[a] = b
    }, m.addFilter = function(a) {
        z.push(a)
    }, m.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", l = function() {
        b.removeEventListener("DOMContentLoaded", l, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k, l, n = b.createElement("script"), e = e || m.errorTimeout;
        n.src = a;
        for (l in d)
            n.setAttribute(l, d[l]);
        c = j ? h : c || f, n.onreadystatechange = n.onload = function() {
            !k && g(n.readyState) && (k = 1, c(), n.onload = n.onreadystatechange = null)
        }, o(function() {
            k || (k = 1, c(1))
        }, e), i ? n.onload() : p.parentNode.insertBefore(n, p)
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var j, e = b.createElement("link"), c = i ? h: c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d)
            e.setAttribute(j, d[j]);
        g || (p.parentNode.insertBefore(e, p), o(c, 0))
    }
}(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
}, function(a) {
    "use strict";
    function b(a) {
        return new RegExp("(^|\\s+)" + a + "(\\s+|$)")
    }
    function c(a, b) {
        var c = d(a, b) ? f: e;
        c(a, b)
    }
    var d, e, f;
    "classList"in document.documentElement ? (d = function(a, b) {
        return a.classList.contains(b)
    }, e = function(a, b) {
        a.classList.add(b)
    }, f = function(a, b) {
        a.classList.remove(b)
    }) : (d = function(a, c) {
        return b(c).test(a.className)
    }, e = function(a, b) {
        d(a, b) || (a.className = a.className + " " + b)
    }, f = function(a, c) {
        a.className = a.className.replace(b(c), " ")
    });
    var g = {
        hasClass: d,
        addClass: e,
        removeClass: f,
        toggleClass: c,
        has: d,
        add: e,
        remove: f,
        toggle: c
    };
    "function" == typeof define && define.amd ? define(g) : "object" == typeof exports ? module.exports = g : a.classie = g
}(window), function(a, b) {
    "function" == typeof define && define.amd ? define("baselineRatio", [], function() {
        return a.baselineRatio = b()
    }) : "object" == typeof exports ? module.exports = b() : a.baselineRatio = b()
}(this, function() {
    var a = function(a) {
        a = a || document.body;
        var b = document.createElement("div");
        b.style.display = "block", b.style.position = "absolute", b.style.bottom = "0", b.style.right = "0", b.style.width = "0px", b.style.height = "0px", b.style.margin = "0", b.style.padding = "0", b.style.visibility = "hidden", b.style.overflow = "hidden";
        var c = document.createElement("span"), d = document.createElement("span");
        c.style.fontSize = "0px", d.style.fontSize = "2000px", c.innerHTML = "X", d.innerHTML = "X", b.appendChild(c), b.appendChild(d), a.appendChild(b);
        var e = c.getBoundingClientRect(), f = d.getBoundingClientRect();
        a.removeChild(b);
        var g = e.top - f.top, h = f.height;
        return 1 - g / h
    };
    return a
});
var getElementStyles = function(a) {
    var b = a, c = baselineRatio(a), d = parseFloat(window.getComputedStyle(b, null).getPropertyValue("line-height")), e = window.getComputedStyle(b, null).getPropertyValue("font-family"), f = window.getComputedStyle(b, null).getPropertyValue("font-size"), g = window.getComputedStyle(b, null).getPropertyValue("font-style"), h = b.getBoundingClientRect().width, i = b.getBoundingClientRect().height, j = b.parentNode.getBoundingClientRect().width, k = b.offsetLeft, l = b.parentNode.offsetLeft, m = l - k, n = k - l;
    return {
        lineHeight: d,
        width: h,
        height: i,
        parentWidth: j,
        fontFamily: e,
        fontSize: f,
        fontStyle: g,
        baselinePositionRatio: c,
        canvasLeft: m,
        textIndent: n
    }
};
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
        window.setTimeout(a, 1e3 / 60)
    }
}();
var myUnderlines = [], myMultipleUnderlines = [];
window.onload = function() {
    for (var a = document.querySelectorAll(".underline"), b = 0; b < a.length; b++) {
        var c = a[b], d = {
            "text-underline-color": c.getAttribute("underline-color"),
            "text-underline-position": "auto",
            "text-underline-skip": !0,
            "text-underline-width": "5px"
        }, e = getElementStyles(c);
        if (e.height > e.lineHeight) {
            var f = new MultipleUnderline(c, d, e);
            myUnderlines.push(f)
        } else {
            var f = new SingleUnderline(c, d, e);
            myUnderlines.push(f)
        }
    }
}, animate();
var is_chrome = navigator.userAgent.toLowerCase().indexOf("chrome")>-1, circleCenter = function(a, b, c) {
    var d = b.y - a.y, e = b.x - a.x, f = c.y - b.y, g = c.x - b.x, h = d / e, i = f / g, j = (h * i * (a.y - c.y) + i * (a.x + b.x) - h * (b.x + c.x)) / (2 * (i - h)), k =- 1 * (j - (a.x + b.x) / 2) / h + (a.y + b.y) / 2, l = dist(j, k, a.x, a.y);
    return {
        x: j,
        y: k,
        r: l
    }
}, dist = function(a, b, c, d) {
    return Math.sqrt((a -= c) * a + (b -= d) * b)
}, Point = function(a, b) {
    this.x = a, this.y = b
}, intersects = function(a, b, c, d, e, f, g, h) {
    var i, j, k;
    return i = (c - a) * (h - f) - (g - e) * (d - b), 0 === i?!1 : (k = ((h - f) * (g - a) + (e - g) * (h - b)) / i, j = ((b - d) * (g - a) + (c - a) * (h - b)) / i, k > 0 && 1 > k && j > 0 && 1 > j)
}, musicLevel = function(a, b, c) {
    var d = dist(a.x, a.y, b.x, b.y) / c;
    return level = Math.floor(d / 30), level > 19 && (level = 19), level = 19 - level, level < 10 && (level = "0" + level), level
};
GuitarString.prototype.mouseOver = function(a, b) {
    this.currentMouseX = b.layerX * this.ratio, this.currentMouseX = b.layerY * this.ratio
}, GuitarString.prototype.mouseMove = function(a, b) {
    this.lastMouseX = this.currentMouseX, this.lastMouseY = this.currentMouseY, this.currentMouseX = b.layerX * this.ratio, this.currentMouseY = b.layerY * this.ratio;
    var c = circleCenter(new Point(this.startPoint.x, this.startPoint.y), new Point(this.currentMouseX, this.currentMouseY), new Point(this.endPoint.x, this.endPoint.y)).r, d = c - Math.sqrt(Math.pow(c, 2) - Math.pow(Math.abs(this.endPoint.x - this.startPoint.x) / 2, 2)), e = circleCenter(new Point(this.startPoint.x, this.startPoint.y), new Point(this.lastMouseX, this.lastMouseY), new Point(this.endPoint.x, this.endPoint.y)).r, f = e - Math.sqrt(Math.pow(e, 2) - Math.pow(Math.abs(this.endPoint.x - this.startPoint.x) / 2, 2)), g = d < this.maxGrabDistance && this.currentMouseX > this.startPoint.x && this.currentMouseX < this.endPoint.x, h=!(f < this.maxGrabDistance && this.lastMouseX > this.startPoint.x && this.lastMouseX < this.endPoint.x), i=!(d < this.maxControlDistance && this.currentMouseX > this.startPoint.x && this.currentMouseX < this.endPoint.x), j = f < this.maxControlDistance && this.lastMouseX > this.startPoint.x && this.lastMouseY < this.endPoint.x, k = intersects(this.lastMouseX, this.lastMouseY, this.currentMouseX, this.currentMouseY, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
    g && h&&!this.userInControl ? (this.initState=!1, this.userInControl=!0, this.waveInControl=!1, this.waveFinished=!1, this.redrawActive=!0) : i && j && this.userInControl && (this.initState=!1, this.userInControl=!1, this.waveInControl=!0, this.waveFinished=!1, this.waveCount = 0, this.waveInitX = (this.startPoint.x + this.endPoint.x) / 2, this.waveInitY = this.endPoint.y + this.maxControlDistance), !this.userInControl && k && (this.initState=!1, this.userInControl=!1, this.waveInControl=!0, this.waveFinished=!1, this.redrawActive=!0, this.waveCount = 0, this.waveInitX = (this.startPoint.x + this.endPoint.y) / 2, this.waveInitY = this.endPoint.y + 2 * this.maxGrabDistance / 3)
}, GuitarString.prototype.mouseLeave = function(a, b) {
    this.userInControl && (this.initState=!1, this.userInControl=!1, this.waveInControl=!0, this.waveFinished=!1, this.redrawActive=!0, this.waveCount = 0, this.waveInitX = b.layerX * this.ratio, this.waveInitY = b.layerY * this.ratio)
}, GuitarString.prototype.mouseOut = function() {}, GuitarString.prototype.touchDown = function(a, b) {
    this.currentMouseX = b.layerX * this.ratio, this.currentMouseX = b.layerY * this.ratio
}, GuitarString.prototype.touchXY = function(a, b) {
    this.lastMouseX = this.currentMouseX, this.lastMouseY = this.currentMouseY, this.currentMouseX = b.layerX * this.ratio, this.currentMouseY = b.layerY * this.ratio;
    var c = circleCenter(new Point(this.startPoint.x, this.startPoint.y), new Point(this.currentMouseX, this.currentMouseY), new Point(this.endPoint.x, this.endPoint.y)).r, d = c - Math.sqrt(Math.pow(c, 2) - Math.pow(Math.abs(this.endPoint.x - this.startPoint.x) / 2, 2)), e = circleCenter(new Point(this.startPoint.x, this.startPoint.y), new Point(this.lastMouseX, this.lastMouseY), new Point(this.endPoint.x, this.endPoint.y)).r, f = e - Math.sqrt(Math.pow(e, 2) - Math.pow(Math.abs(this.endPoint.x - this.startPoint.x) / 2, 2)), g = d < this.maxGrabDistance && this.currentMouseX > this.startPoint.x && this.currentMouseX < this.endPoint.x, h=!(f < this.maxGrabDistance && this.lastMouseX > this.startPoint.x && this.lastMouseX < this.endPoint.x), i=!(d < this.maxControlDistance && this.currentMouseX > this.startPoint.x && this.currentMouseX < this.endPoint.x), j = f < this.maxControlDistance && this.lastMouseX > this.startPoint.x && this.lastMouseY < this.endPoint.x, k = intersects(this.lastMouseX, this.lastMouseY, this.currentMouseX, this.currentMouseY, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
    g && h&&!this.userInControl ? (this.initState=!1, this.userInControl=!0, this.waveInControl=!1, this.waveFinished=!1, this.redrawActive=!0) : i && j && this.userInControl && (this.initState=!1, this.userInControl=!1, this.waveInControl=!0, this.waveFinished=!1, this.waveCount = 0, this.waveInitX = (this.startPoint.x + this.endPoint.x) / 2, this.waveInitY = this.endPoint.y + this.maxControlDistance, play_multi_sound("audio" + this.level)), !this.userInControl && k && (this.initState=!1, this.userInControl=!1, this.waveInControl=!0, this.waveFinished=!1, this.redrawActive=!0, this.waveCount = 0, this.waveInitX = (this.startPoint.x + this.endPoint.y) / 2, this.waveInitY = this.endPoint.y + 2 * this.maxGrabDistance / 3)
}, GuitarString.prototype.touchUp = function(a, b) {
    this.userInControl && (this.initState=!1, this.userInControl=!1, this.waveInControl=!0, this.waveFinished=!1, this.redrawActive=!0, this.waveCount = 0, this.waveInitX = b.layerX * this.ratio, this.waveInitY = b.layerY * this.ratio)
}, GuitarString.prototype.clear = function() {}, GuitarString.prototype.update = function() {
    if (this.userInControl && (this.thirdPoint = new Point(this.currentMouseX, this.currentMouseY)), this.waveInControl) {
        var a = this.waveInitX, b = this.startPoint.y + (this.waveInitY - this.startPoint.y) * Math.cos(this.waveCount / 5 * Math.PI) * Math.pow(this.damping, this.waveCount);
        Math.pow(this.damping, this.waveCount) > .03 ? (this.thirdPoint = new Point(a, b), this.waveCount++) : (this.waveInControl=!1, this.waveFinished=!0, this.lastRedraw=!0, this.thirdPoint = new Point(a, b))
    }
}, GuitarString.prototype.draw = function() {
    this.lastRedraw ? (this.drawLine(), this.lastRedraw=!1, this.redrawActive=!1) : this.drawArc(this.startPoint, this.thirdPoint, this.endPoint)
}, GuitarString.prototype.drawLine = function() {
    this.ctx.lineWidth = this.strokeWidth, this.ctx.strokeStyle = this.strokeColor, this.ctx.beginPath(), this.ctx.moveTo(this.startPoint.x, this.startPoint.y), this.ctx.lineTo(this.endPoint.x, this.endPoint.y), this.ctx.globalCompositeOperation = "source-over", this.ctx.stroke()
}, GuitarString.prototype.drawArc = function(a, b, c) {
    var d = this.ctx;
    d.lineWidth = this.strokeWidth, d.strokeStyle = this.strokeColor;
    var e = circleCenter(new Point(a.x, a.y), new Point(b.x, b.y), new Point(c.x, c.y)), f = e.x, g = e.y, h = e.r, i = Math.atan2(f - a.x, g - a.y);
    i ? i > Math.PI / 2 ? (d.beginPath(), d.arc(f, g, h, 1.5 * Math.PI - i, 1.5 * Math.PI + i, !0)) : (d.beginPath(), d.arc(f, g, h, 1.5 * Math.PI - i, 1.5 * Math.PI + i, !1)) : (d.beginPath(), d.moveTo(a.x, a.y), d.lineTo(c.x, c.y)), d.globalCompositeOperation = "source-over", d.stroke()
};
var multiplyValue = function(a, b) {
    var c = a, d = b, e = c.match(/(\d*\.?\d*)(.*)/);
    return e[1] * d + e[2]
}, optimalStrokeWidthPos = function(a, b) {
    return 1 > a ? b = Math.round(b - .5) + .5 : a >= 1 && (a = Math.round(a), b = a%2 ? Math.round(b - .5) + .5 : Math.round(b)), {
        strokeWidth: a,
        posY: b
    }
};
SingleUnderline.prototype.drawUnderline = function() {
    this.myString.draw()
}, SingleUnderline.prototype.drawHoles = function() {
    this.ctx.font = this.font, this.ctx.textBaseline = "top", this.ctx.globalCompositeOperation = "destination-out", this.ctx.lineWidth = 2 * this.ratio + 3.6 * this.strokeWidth, this.ctx.strokeStyle = "blue", this.ctx.beginPath(), this.ctx.fillStyle = "green", this.ctx.beginPath()
}, SingleUnderline.prototype.clear = function() {
    this.redrawActive = this.myString.redrawActive, this.myString.redrawActive && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
}, SingleUnderline.prototype.update = function() {
    this.myString.redrawActive && this.myString.update()
}, SingleUnderline.prototype.draw = function() {
    this.redrawActive && (this.drawUnderline(), this.drawHoles())
}, MultipleUnderline.prototype.drawUnderline = function() {
    for (var a = 0; a < this.myStrings.length; a++) {
        var b = this.myStrings[a];
        b.update(), b.draw()
    }
}, MultipleUnderline.prototype.drawHoles = function() {
    for (var a = 0; a < this.lines.length; a++) {
        var b = this.lines[a];
        this.ctx.globalCompositeOperation = "destination-out", this.ctx.font = this.font, this.ctx.fillStyle = "green", this.ctx.textBaseline = "top", this.ctx.fillText(b.lineText, b.lineTextIndent, b.linePositionY), this.ctx.lineWidth = 2 * this.ratio + 3.6 * this.strokeWidth, this.ctx.strokeStyle = "blue", this.ctx.strokeText(b.lineText, b.lineTextIndent, b.linePositionY)
    }
}, MultipleUnderline.prototype.clear = function() {
    this.multipleRedrawActive;
    this.multipleRedrawActive=!1;
    for (var a = 0; a < this.myStrings.length; a++) {
        var b = this.myStrings[a];
        b.redrawActive && (this.multipleRedrawActive=!0)
    }
    this.multipleRedrawActive && (console.log("clear now!"), this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height))
}, MultipleUnderline.prototype.update = function() {}, MultipleUnderline.prototype.draw = function() {
    this.multipleRedrawActive && (this.drawUnderline(), this.drawHoles())
}, function(a, b) {
    "use strict";
    function c(a) {
        var b = a.length, c = ha.type(a);
        return ha.isWindow(a)?!1 : 1 === a.nodeType && b?!0 : "array" === c || "function" !== c && (0 === b || "number" == typeof b && b > 0 && b - 1 in a)
    }
    function d(a) {
        var b = va[a] = {};
        return ha.each(a.match(ja) || [], function(a, c) {
            b[c]=!0
        }), b
    }
    function e(a, c, d, e) {
        if (ha.acceptData(a)) {
            var f, g, h = ha.expando, i = "string" == typeof c, j = a.nodeType, k = j ? ha.cache: a, l = j ? a[h]: a[h] && h;
            if (l && k[l] && (e || k[l].data) ||!i || d !== b)
                return l || (j ? a[h] = l = $.pop() || ha.guid++ : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = ha.noop)), ("object" == typeof c || "function" == typeof c) && (e ? k[l] = ha.extend(k[l], c) : k[l].data = ha.extend(k[l].data, c)), f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[ha.camelCase(c)] = d), i ? (g = f[c], null == g && (g = f[ha.camelCase(c)])) : g = f, g
        }
    }
    function f(a, b, c) {
        if (ha.acceptData(a)) {
            var d, e, f, g = a.nodeType, i = g ? ha.cache: a, j = g ? a[ha.expando]: ha.expando;
            if (i[j]) {
                if (b && (d = c ? i[j] : i[j].data)) {
                    ha.isArray(b) ? b = b.concat(ha.map(b, ha.camelCase)) : b in d ? b = [b] : (b = ha.camelCase(b), b = b in d ? [b] : b.split(" "));
                    for (e = 0, f = b.length; f > e; e++)
                        delete d[b[e]];
                    if (!(c ? h : ha.isEmptyObject)(d))
                        return 
                }(c || (delete i[j].data, h(i[j]))) && (g ? ha.cleanData([a], !0) : ha.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null)
            }
        }
    }
    function g(a, c, d) {
        if (d === b && 1 === a.nodeType) {
            var e = "data-" + c.replace(xa, "-$1").toLowerCase();
            if (d = a.getAttribute(e), "string" == typeof d) {
                try {
                    d = "true" === d?!0 : "false" === d?!1 : "null" === d ? null : + d + "" === d?+d : wa.test(d) ? ha.parseJSON(d) : d
                } catch (f) {}
                ha.data(a, c, d)
            } else 
                d = b
        }
        return d
    }
    function h(a) {
        var b;
        for (b in a)
            if (("data" !== b ||!ha.isEmptyObject(a[b])) && "toJSON" !== b)
                return !1;
        return !0
    }
    function i() {
        return !0
    }
    function j() {
        return !1
    }
    function k(a, b) {
        do 
            a = a[b];
        while (a && 1 !== a.nodeType);
        return a
    }
    function l(a, b, c) {
        if (b = b || 0, ha.isFunction(b))
            return ha.grep(a, function(a, d) {
                var e=!!b.call(a, d, a);
                return e === c
            });
        if (b.nodeType)
            return ha.grep(a, function(a) {
                return a === b === c
            });
        if ("string" == typeof b) {
            var d = ha.grep(a, function(a) {
                return 1 === a.nodeType
            });
            if (Pa.test(b))
                return ha.filter(b, d, !c);
            b = ha.filter(b, d)
        }
        return ha.grep(a, function(a) {
            return ha.inArray(a, b) >= 0 === c
        })
    }
    function m(a) {
        var b = Sa.split("|"), c = a.createDocumentFragment();
        if (c.createElement)
            for (; b.length;)
                c.createElement(b.pop());
        return c
    }
    function n(a, b) {
        return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
    }
    function o(a) {
        var b = a.getAttributeNode("type");
        return a.type = (b && b.specified) + "/" + a.type, a
    }
    function p(a) {
        var b = cb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }
    function q(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++)
            ha._data(c, "globalEval", !b || ha._data(b[d], "globalEval"))
    }
    function r(a, b) {
        if (1 === b.nodeType && ha.hasData(a)) {
            var c, d, e, f = ha._data(a), g = ha._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; e > d; d++)
                        ha.event.add(b, c, h[c][d])
                    }
            g.data && (g.data = ha.extend({}, g.data))
        }
    }
    function s(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !ha.support.noCloneEvent && b[ha.expando]) {
                d = ha._data(b);
                for (e in d.events)
                    ha.removeEvent(b, e, d.handle);
                b.removeAttribute(ha.expando)
            }
            "script" === c && b.text !== a.text ? (o(b).text = a.text, p(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), ha.support.html5Clone && a.innerHTML&&!ha.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && _a.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }
    function t(a, c) {
        var d, e, f = 0, g = a.getElementsByTagName !== b ? a.getElementsByTagName(c || "*"): a.querySelectorAll !== b ? a.querySelectorAll(c || "*"): b;
        if (!g)
            for (g = [], d = a.childNodes || a; null != (e = d[f]); f++)
                !c || ha.nodeName(e, c) ? g.push(e) : ha.merge(g, t(e, c));
        return c === b || c && ha.nodeName(a, c) ? ha.merge([a], g) : g
    }
    function u(a) {
        _a.test(a.type) && (a.defaultChecked = a.checked)
    }
    function v(a, b) {
        if (b in a)
            return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = wb.length; e--;)
            if (b = wb[e] + c, b in a)
                return b;
        return d
    }
    function w(a, b) {
        return a = b || a, "none" === ha.css(a, "display") ||!ha.contains(a.ownerDocument, a)
    }
    function x(a, b) {
        for (var c, d = [], e = 0, f = a.length; f > e; e++)
            c = a[e], c.style && (d[e] = ha._data(c, "olddisplay"), b ? (d[e] || "none" !== c.style.display || (c.style.display = ""), "" === c.style.display && w(c) && (d[e] = ha._data(c, "olddisplay", B(c.nodeName)))) : d[e] || w(c) || ha._data(c, "olddisplay", ha.css(c, "display")));
        for (e = 0; f > e; e++)
            c = a[e], c.style && (b && "none" !== c.style.display && "" !== c.style.display || (c.style.display = b ? d[e] || "" : "none"));
        return a
    }
    function y(a, b, c) {
        var d = pb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }
    function z(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)
            "margin" === c && (g += ha.css(a, c + vb[f], !0, e)),
            d ? ("content" === c && (g -= ha.css(a, "padding" + vb[f], !0, e)), "margin" !== c && (g -= ha.css(a, "border" + vb[f] + "Width", !0, e))) : (g += ha.css(a, "padding" + vb[f], !0, e), "padding" !== c && (g += ha.css(a, "border" + vb[f] + "Width", !0, e)));
        return g
    }
    function A(a, b, c) {
        var d=!0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = ib(a), g = ha.support.boxSizing && "border-box" === ha.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = hb(a, b, f), (0 > e || null == e) && (e = a.style[b]), qb.test(e))
                return e;
            d = g && (ha.support.boxSizingReliable || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }
    function B(a) {
        var b = V, c = sb[a];
        return c || (c = C(a, b), "none" !== c && c || (jb = (jb || ha("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement), b = (jb[0].contentWindow || jb[0].contentDocument).document, b.write("<!doctype html><html><body>"), b.close(), c = C(a, b), jb.detach()), sb[a] = c), c
    }
    function C(a, b) {
        var c = ha(b.createElement(a)).appendTo(b.body), d = ha.css(c[0], "display");
        return c.remove(), d
    }
    function D(a, b, c, d) {
        var e;
        if (ha.isArray(b))
            ha.each(b, function(b, e) {
                c || yb.test(a) ? d(a, e) : D(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
            });
        else if (c || "object" !== ha.type(b))
            d(a, b);
        else 
            for (e in b)
                D(a + "[" + e + "]", b[e], c, d)
    }
    function E(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(ja) || [];
            if (ha.isFunction(c))
                for (; d = f[e++];)
                    "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }
    function F(a, c, d, e) {
        function f(i) {
            var j;
            return g[i]=!0, ha.each(a[i] || [], function(a, i) {
                var k = i(c, d, e);
                return "string" != typeof k || h || g[k] ? h?!(j = k) : b : (c.dataTypes.unshift(k), f(k), !1)
            }), j
        }
        var g = {}, h = a === Pb;
        return f(c.dataTypes[0]) ||!g["*"] && f("*")
    }
    function G(a, c) {
        var d, e, f = ha.ajaxSettings.flatOptions || {};
        for (d in c)
            c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
        return e && ha.extend(!0, a, e), a
    }
    function H(a, c, d) {
        var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields;
        for (f in k)
            f in d && (c[k[f]] = d[f]);
        for (; "*" === j[0];)
            j.shift(), e === b && (e = a.mimeType || c.getResponseHeader("Content-Type"));
        if (e)
            for (f in i)
                if (i[f] && i[f].test(e)) {
                    j.unshift(f);
                    break
                }
        if (j[0]in d)
            g = j[0];
        else {
            for (f in d) {
                if (!j[0] || a.converters[f + " " + j[0]]) {
                    g = f;
                    break
                }
                h || (h = f)
            }
            g = g || h
        }
        return g ? (g !== j[0] && j.unshift(g), d[g]) : b
    }
    function I(a, b) {
        var c, d, e, f, g = {}, h = 0, i = a.dataTypes.slice(), j = i[0];
        if (a.dataFilter && (b = a.dataFilter(b, a.dataType)), i[1])
            for (c in a.converters)
                g[c.toLowerCase()] = a.converters[c];
        for (; e = i[++h];)
            if ("*" !== e) {
                if ("*" !== j && j !== e) {
                    if (c = g[j + " " + e] || g["* " + e], !c)
                        for (d in g)
                            if (f = d.split(" "), f[1] === e && (c = g[j + " " + f[0]] || g["* " + f[0]])) {
                                c===!0 ? c = g[d] : g[d]!==!0 && (e = f[0], i.splice(h--, 0, e));
                                break
                            }
                            if (c!==!0)
                                if (c && a["throws"])
                                    b = c(b);
                                else 
                                    try {
                                        b = c(b)
                                    } catch (k) {
                                        return {
                                            state: "parsererror",
                                            error: c ? k: "No conversion from " + j + " to " + e
                                        }
                                    }
                                }
                                j = e
            }
        return {
            state: "success",
            data: b
        }
    }
    function J() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }
    function K() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }
    function L() {
        return setTimeout(function() {
            Yb = b
        }), Yb = ha.now()
    }
    function M(a, b) {
        ha.each(b, function(b, c) {
            for (var d = (cc[b] || []).concat(cc["*"]), e = 0, f = d.length; f > e; e++)
                if (d[e].call(a, b, c))
                    return 
        })
    }
    function N(a, b, c) {
        var d, e, f = 0, g = bc.length, h = ha.Deferred().always(function() {
            delete i.elem
        }), i = function() {
            if (e)
                return !1;
            for (var b = Yb || L(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)
                j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
        }, j = h.promise({
            elem: a,
            props: ha.extend({}, b),
            opts: ha.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: Yb || L(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = ha.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d
            },
            stop: function(b) {
                var c = 0, d = b ? j.tweens.length: 0;
                if (e)
                    return this;
                for (e=!0; d > c; c++)
                    j.tweens[c].run(1);
                return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
            }
        }), k = j.props;
        for (O(k, j.opts.specialEasing);
        g > f;
        f++)if (d = bc[f].call(j, a, k, j.opts))
            return d;
        return M(j, k), ha.isFunction(j.opts.start) && j.opts.start.call(a, j), ha.fx.timer(ha.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    function O(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = ha.camelCase(c), e = b[d], f = a[c], ha.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = ha.cssHooks[d], g && "expand"in g) {
                f = g.expand(f), delete a[d];
                for (c in f)
                    c in a || (a[c] = f[c], b[c] = e)
            } else 
                b[d] = e
    }
    function P(a, b, c) {
        var d, e, f, g, h, i, j, k, l, m = this, n = a.style, o = {}, p = [], q = a.nodeType && w(a);
        c.queue || (k = ha._queueHooks(a, "fx"), null == k.unqueued && (k.unqueued = 0, l = k.empty.fire, k.empty.fire = function() {
            k.unqueued || l()
        }), k.unqueued++, m.always(function() {
            m.always(function() {
                k.unqueued--, ha.queue(a, "fx").length || k.empty.fire()
            })
        })), 1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], "inline" === ha.css(a, "display") && "none" === ha.css(a, "float") && (ha.support.inlineBlockNeedsLayout && "inline" !== B(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", ha.support.shrinkWrapBlocks || m.done(function() {
            n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (f = b[d], $b.exec(f)) {
                if (delete b[d], i = i || "toggle" === f, f === (q ? "hide" : "show"))
                    continue;
                    p.push(d)
            }
        if (g = p.length) {
            h = ha._data(a, "fxshow") || ha._data(a, "fxshow", {}), "hidden"in h && (q = h.hidden), i && (h.hidden=!q), q ? ha(a).show() : m.done(function() {
                ha(a).hide()
            }), m.done(function() {
                var b;
                ha._removeData(a, "fxshow");
                for (b in o)
                    ha.style(a, b, o[b])
            });
            for (d = 0; g > d; d++)
                e = p[d], j = m.createTween(e, q ? h[e] : 0), o[e] = h[e] || ha.style(a, e), e in h || (h[e] = j.start, q && (j.end = j.start, j.start = "width" === e || "height" === e ? 1 : 0))
            }
    }
    function Q(a, b, c, d, e) {
        return new Q.prototype.init(a, b, c, d, e)
    }
    function R(a, b) {
        var c, d = {
            height: a
        }, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b)
            c = vb[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }
    function S(a) {
        return ha.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var T, U, V = a.document, W = a.location, X = a.jQuery, Y = a.$, Z = {}, $ = [], _ = "1.9.0", aa = $.concat, ba = $.push, ca = $.slice, da = $.indexOf, ea = Z.toString, fa = Z.hasOwnProperty, ga = _.trim, ha = function(a, b) {
        return new ha.fn.init(a, b, T)
    }, ia = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ja = /\S+/g, ka = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, la = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, ma = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, na = /^[\],:{}\s]*$/, oa = /(?:^|:|,)(?:\s*\[)+/g, pa = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, qa = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, ra = /^-ms-/, sa = /-([\da-z])/gi, ta = function(a, b) {
        return b.toUpperCase()
    }, ua = function() {
        V.addEventListener ? (V.removeEventListener("DOMContentLoaded", ua, !1), ha.ready()) : "complete" === V.readyState && (V.detachEvent("onreadystatechange", ua), ha.ready())
    };
    ha.fn = ha.prototype = {
        jquery: _,
        constructor: ha,
        init: function(a, c, d) {
            var e, f;
            if (!a)
                return this;
            if ("string" == typeof a) {
                if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : la.exec(a), !e ||!e[1] && c)
                    return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
                if (e[1]) {
                    if (c = c instanceof ha ? c[0] : c, ha.merge(this, ha.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c : V, !0)), ma.test(e[1]) && ha.isPlainObject(c))
                        for (e in c)
                            ha.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
                    return this
                }
                if (f = V.getElementById(e[2]), f && f.parentNode) {
                    if (f.id !== e[2])
                        return d.find(a);
                    this.length = 1, this[0] = f
                }
                return this.context = V, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : ha.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), ha.makeArray(a, this))
        },
        selector: "",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return ca.call(this)
        },
        get: function(a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function(a) {
            var b = ha.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(a, b) {
            return ha.each(this, a, b)
        },
        ready: function(a) {
            return ha.ready.promise().done(a), this
        },
        slice: function() {
            return this.pushStack(ca.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        },
        eq: function(a) {
            var b = this.length, c =+ a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        map: function(a) {
            return this.pushStack(ha.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: ba,
        sort: [].sort,
        splice: [].splice
    }, ha.fn.init.prototype = ha.fn, ha.extend = ha.fn.extend = function() {
        var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k=!1;
        for ("boolean" == typeof h && (k = h, h = arguments[1] || {}, i = 2), "object" == typeof h || ha.isFunction(h) || (h = {}), j === i && (h = this, --i); j > i; i++)
            if (null != (a = arguments[i]))
                for (c in a)
                    d = h[c], e = a[c], h !== e && (k && e && (ha.isPlainObject(e) || (f = ha.isArray(e))) ? (f ? (f=!1, g = d && ha.isArray(d) ? d : []) : g = d && ha.isPlainObject(d) ? d : {}, h[c] = ha.extend(k, g, e)) : e !== b && (h[c] = e));
        return h
    }, ha.extend({
        noConflict: function(b) {
            return a.$ === ha && (a.$ = Y), b && a.jQuery === ha && (a.jQuery = X), ha
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? ha.readyWait++ : ha.ready(!0)
        },
        ready: function(a) {
            if (a===!0?!--ha.readyWait : !ha.isReady) {
                if (!V.body)
                    return setTimeout(ha.ready);
                ha.isReady=!0, a!==!0&&--ha.readyWait > 0 || (U.resolveWith(V, [ha]), ha.fn.trigger && ha(V).trigger("ready").off("ready"))
            }
        },
        isFunction: function(a) {
            return "function" === ha.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === ha.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? Z[ea.call(a)] || "object" : typeof a
        },
        isPlainObject: function(a) {
            if (!a || "object" !== ha.type(a) || a.nodeType || ha.isWindow(a))
                return !1;
            try {
                if (a.constructor&&!fa.call(a, "constructor")&&!fa.call(a.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (c) {
                return !1
            }
            var d;
            for (d in a);
            return d === b || fa.call(a, d)
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a)
                return !1;
            return !0
        },
        error: function(a) {
            throw Error(a)
        },
        parseHTML: function(a, b, c) {
            if (!a || "string" != typeof a)
                return null;
            "boolean" == typeof b && (c = b, b=!1), b = b || V;
            var d = ma.exec(a), e=!c && [];
            return d ? [b.createElement(d[1])] : (d = ha.buildFragment([a], b, e), e && ha(e).remove(), ha.merge([], d.childNodes))
        },
        parseJSON: function(c) {
            return a.JSON && a.JSON.parse ? a.JSON.parse(c) : null === c ? c : "string" == typeof c && (c = ha.trim(c), c && na.test(c.replace(pa, "@").replace(qa, "]").replace(oa, ""))) ? Function("return " + c)() : (ha.error("Invalid JSON: " + c), b)
        },
        parseXML: function(c) {
            var d, e;
            if (!c || "string" != typeof c)
                return null;
            try {
                a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
            } catch (f) {
                d = b
            }
            return d && d.documentElement&&!d.getElementsByTagName("parsererror").length || ha.error("Invalid XML: " + c), d
        },
        noop: function() {},
        globalEval: function(b) {
            b && ha.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b)
            })(b)
        },
        camelCase: function(a) {
            return a.replace(ra, "ms-").replace(sa, ta)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a);
            if (d) {
                if (h)
                    for (; g > f && (e = b.apply(a[f], d), e!==!1); f++);
                else 
                    for (f in a)
                        if (e = b.apply(a[f], d), e===!1)
                            break
            } else if (h)
                for (; g > f && (e = b.call(a[f], f, a[f]), e!==!1); f++);
            else 
                for (f in a)
                    if (e = b.call(a[f], f, a[f]), e===!1)
                        break;
            return a
        },
        trim: ga&&!ga.call("\ufeff ") ? function(a) {
            return null == a ? "" : ga.call(a)
        }
        : function(a) {
            return null == a ? "" : (a + "").replace(ka, "")
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? ha.merge(d, "string" == typeof a ? [a] : a) : ba.call(d, a)), d
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (da)
                    return da.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                    if (c in b && b[c] === a)
                        return c
            }
            return - 1
        },
        merge: function(a, c) {
            var d = c.length, e = a.length, f = 0;
            if ("number" == typeof d)
                for (; d > f; f++)
                    a[e++] = c[f];
            else 
                for (; c[f] !== b;)
                    a[e++] = c[f++];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            var d, e = [], f = 0, g = a.length;
            for (c=!!c; g > f; f++)
                d=!!b(a[f], f), c !== d && e.push(a[f]);
            return e
        },
        map: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a), i = [];
            if (h)
                for (; g > f; f++)
                    e = b(a[f], f, d), null != e && (i[i.length] = e);
            else 
                for (f in a)
                    e = b(a[f], f, d), null != e && (i[i.length] = e);
            return aa.apply([], i)
        },
        guid: 1,
        proxy: function(a, c) {
            var d, e, f;
            return "string" == typeof c && (d = a[c], c = a, a = d), ha.isFunction(a) ? (e = ca.call(arguments, 2), f = function() {
                return a.apply(c || this, e.concat(ca.call(arguments)))
            }, f.guid = a.guid = a.guid || ha.guid++, f) : b
        },
        access: function(a, c, d, e, f, g, h) {
            var i = 0, j = a.length, k = null == d;
            if ("object" === ha.type(d)) {
                f=!0;
                for (i in d)
                    ha.access(a, c, i, d[i], !0, g, h)
            } else if (e !== b && (f=!0, ha.isFunction(e) || (h=!0), k && (h ? (c.call(a, e), c = null) : (k = c, c = function(a, b, c) {
                return k.call(ha(a), c)
            })), c))
                for (; j > i; i++)
                    c(a[i], d, h ? e : e.call(a[i], i, c(a[i], d)));
            return f ? a : k ? c.call(a) : j ? c(a[0], d) : g
        },
        now: function() {
            return (new Date).getTime()
        }
    }), ha.ready.promise = function(b) {
        if (!U)
            if (U = ha.Deferred(), "complete" === V.readyState)
                setTimeout(ha.ready);
            else if (V.addEventListener)
                V.addEventListener("DOMContentLoaded", ua, !1), a.addEventListener("load", ha.ready, !1);
            else {
                V.attachEvent("onreadystatechange", ua), a.attachEvent("onload", ha.ready);
                var c=!1;
                try {
                    c = null == a.frameElement && V.documentElement
                } catch (d) {}
                c && c.doScroll && function e() {
                    if (!ha.isReady) {
                        try {
                            c.doScroll("left")
                        } catch (a) {
                            return setTimeout(e, 50)
                        }
                        ha.ready()
                    }
                }()
            }
        return U.promise(b)
    }, ha.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        Z["[object " + b + "]"] = b.toLowerCase()
    }), T = ha(V);
    var va = {};
    ha.Callbacks = function(a) {
        a = "string" == typeof a ? va[a] || d(a) : ha.extend({}, a);
        var c, e, f, g, h, i, j = [], k=!a.once && [], l = function(b) {
            for (c = a.memory && b, e=!0, i = g || 0, g = 0, h = j.length, f=!0; j && h > i; i++)
                if (j[i].apply(b[0], b[1])===!1 && a.stopOnFalse) {
                    c=!1;
                    break
                }
            f=!1, j && (k ? k.length && l(k.shift()) : c ? j = [] : m.disable())
        }, m = {
            add: function() {
                if (j) {
                    var b = j.length;
                    !function d(b) {
                        ha.each(b, function(b, c) {
                            var e = ha.type(c);
                            "function" === e ? a.unique && m.has(c) || j.push(c) : c && c.length && "string" !== e && d(c)
                        })
                    }(arguments), f ? h = j.length : c && (g = b, l(c))
                }
                return this
            },
            remove: function() {
                return j && ha.each(arguments, function(a, b) {
                    for (var c; (c = ha.inArray(b, j, c))>-1;)
                        j.splice(c, 1), f && (h >= c && h--, i >= c && i--)
                }), this
            },
            has: function(a) {
                return ha.inArray(a, j)>-1
            },
            empty: function() {
                return j = [], this
            },
            disable: function() {
                return j = k = c = b, this
            },
            disabled: function() {
                return !j
            },
            lock: function() {
                return k = b, c || m.disable(), this
            },
            locked: function() {
                return !k
            },
            fireWith: function(a, b) {
                return b = b || [], b = [a, b.slice ? b.slice(): b], !j || e&&!k || (f ? k.push(b) : l(b)), this
            },
            fire: function() {
                return m.fireWith(this, arguments), this
            },
            fired: function() {
                return !!e
            }
        };
        return m
    }, ha.extend({
        Deferred: function(a) {
            var b = [["resolve", "done", ha.Callbacks("once memory"), "resolved"], ["reject", "fail", ha.Callbacks("once memory"), "rejected"], ["notify", "progress", ha.Callbacks("memory")]], c = "pending", d = {
                state: function() {
                    return c
                },
                always: function() {
                    return e.done(arguments).fail(arguments), this
                },
                then: function() {
                    var a = arguments;
                    return ha.Deferred(function(c) {
                        ha.each(b, function(b, f) {
                            var g = f[0], h = ha.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = h && h.apply(this, arguments);
                                a && ha.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
                            })
                        }), a = null
                    }).promise()
                },
                promise: function(a) {
                    return null != a ? ha.extend(a, d) : d
                }
            }, e = {};
            return d.pipe = d.then, ha.each(b, function(a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1^a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function(a) {
            var b, c, d, e = 0, f = ca.call(arguments), g = f.length, h = 1 !== g || a && ha.isFunction(a.promise) ? g: 0, i = 1 === h ? a: ha.Deferred(), j = function(a, c, d) {
                return function(e) {
                    c[a] = this, d[a] = arguments.length > 1 ? ca.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                }
            };
            if (g > 1)
                for (b = Array(g), c = Array(g), d = Array(g); g > e; e++)
                    f[e] && ha.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise()
        }
    }), ha.support = function() {
        var c, d, e, f, g, h, i, j, k, l, m = V.createElement("div");
        if (m.setAttribute("className", "t"), m.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = m.getElementsByTagName("*"), e = m.getElementsByTagName("a")[0], !d ||!e ||!d.length)
            return {};
        f = V.createElement("select"), g = f.appendChild(V.createElement("option")), h = m.getElementsByTagName("input")[0], e.style.cssText = "top:1px;float:left;opacity:.5", c = {
            getSetAttribute: "t" !== m.className,
            leadingWhitespace: 3 === m.firstChild.nodeType,
            tbody: !m.getElementsByTagName("tbody").length,
            htmlSerialize: !!m.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: "/a" === e.getAttribute("href"),
            opacity: /^0.5/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: !!h.value,
            optSelected: g.selected,
            enctype: !!V.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== V.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === V.compatMode,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, h.checked=!0, c.noCloneChecked = h.cloneNode(!0).checked, f.disabled=!0, c.optDisabled=!g.disabled;
        try {
            delete m.test
        } catch (n) {
            c.deleteExpando=!1
        }
        h = V.createElement("input"), h.setAttribute("value", ""), c.input = "" === h.getAttribute("value"), h.value = "t", h.setAttribute("type", "radio"), c.radioValue = "t" === h.value, h.setAttribute("checked", "t"), h.setAttribute("name", "t"), i = V.createDocumentFragment(), i.appendChild(h), c.appendChecked = h.checked, c.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, m.attachEvent && (m.attachEvent("onclick", function() {
            c.noCloneEvent=!1
        }), m.cloneNode(!0).click());
        for (l in{
            submit: !0,
            change: !0,
            focusin: !0
        })
            m.setAttribute(j = "on" + l, "t"), c[l + "Bubbles"] = j in a || m.attributes[j].expando===!1;
        return m.style.backgroundClip = "content-box", m.cloneNode(!0).style.backgroundClip = "", c.clearCloneStyle = "content-box" === m.style.backgroundClip, ha(function() {
            var d, e, f, g = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", h = V.getElementsByTagName("body")[0];
            h && (d = V.createElement("div"), d.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", h.appendChild(d).appendChild(m), m.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", f = m.getElementsByTagName("td"), f[0].style.cssText = "padding:0;margin:0;border:0;display:none", k = 0 === f[0].offsetHeight, f[0].style.display = "", f[1].style.display = "none", c.reliableHiddenOffsets = k && 0 === f[0].offsetHeight, m.innerHTML = "", m.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", c.boxSizing = 4 === m.offsetWidth, c.doesNotIncludeMarginInBodyOffset = 1 !== h.offsetTop, a.getComputedStyle && (c.pixelPosition = "1%" !== (a.getComputedStyle(m, null) || {}).top, c.boxSizingReliable = "4px" === (a.getComputedStyle(m, null) || {
                width: "4px"
            }).width, e = m.appendChild(V.createElement("div")), e.style.cssText = m.style.cssText = g, e.style.marginRight = e.style.width = "0", m.style.width = "1px", c.reliableMarginRight=!parseFloat((a.getComputedStyle(e, null) || {}).marginRight)), m.style.zoom !== b && (m.innerHTML = "", m.style.cssText = g + "width:1px;padding:1px;display:inline;zoom:1", c.inlineBlockNeedsLayout = 3 === m.offsetWidth, m.style.display = "block", m.innerHTML = "<div></div>", m.firstChild.style.width = "5px", c.shrinkWrapBlocks = 3 !== m.offsetWidth, h.style.zoom = 1), h.removeChild(d), d = m = f = e = null)
        }), d = f = i = g = e = h = null, c
    }();
    var wa = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, xa = /([A-Z])/g;
    ha.extend({
        cache: {},
        expando: "jQuery" + (_ + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? ha.cache[a[ha.expando]] : a[ha.expando], !!a&&!h(a)
        },
        data: function(a, b, c) {
            return e(a, b, c, !1)
        },
        removeData: function(a, b) {
            return f(a, b, !1)
        },
        _data: function(a, b, c) {
            return e(a, b, c, !0)
        },
        _removeData: function(a, b) {
            return f(a, b, !0)
        },
        acceptData: function(a) {
            var b = a.nodeName && ha.noData[a.nodeName.toLowerCase()];
            return !b || b!==!0 && a.getAttribute("classid") === b
        }
    }), ha.fn.extend({
        data: function(a, c) {
            var d, e, f = this[0], h = 0, i = null;
            if (a === b) {
                if (this.length && (i = ha.data(f), 1 === f.nodeType&&!ha._data(f, "parsedAttrs"))) {
                    for (d = f.attributes; d.length > h; h++)
                        e = d[h].name, e.indexOf("data-") || (e = ha.camelCase(e.substring(5)), g(f, e, i[e]));
                    ha._data(f, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof a ? this.each(function() {
                ha.data(this, a)
            }) : ha.access(this, function(c) {
                return c === b ? f ? g(f, a, ha.data(f, a)) : null : (this.each(function() {
                    ha.data(this, a, c)
                }), b)
            }, null, c, arguments.length > 1, null, !0)
        },
        removeData: function(a) {
            return this.each(function() {
                ha.removeData(this, a)
            })
        }
    }), ha.extend({
        queue: function(a, c, d) {
            var e;
            return a ? (c = (c || "fx") + "queue", e = ha._data(a, c), d && (!e || ha.isArray(d) ? e = ha._data(a, c, ha.makeArray(d)) : e.push(d)), e || []) : b
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = ha.queue(a, b), d = c.length, e = c.shift(), f = ha._queueHooks(a, b), g = function() {
                ha.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(), d--), f.cur = e, e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return ha._data(a, c) || ha._data(a, c, {
                empty: ha.Callbacks("once memory").add(function() {
                    ha._removeData(a, b + "queue"), ha._removeData(a, c)
                })
            })
        }
    }), ha.fn.extend({
        queue: function(a, c) {
            var d = 2;
            return "string" != typeof a && (c = a, a = "fx", d--), d > arguments.length ? ha.queue(this[0], a) : c === b ? this : this.each(function() {
                var b = ha.queue(this, a, c);
                ha._queueHooks(this, a), "fx" === a && "inprogress" !== b[0] && ha.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                ha.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            return a = ha.fx ? ha.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, c) {
            var d, e = 1, f = ha.Deferred(), g = this, h = this.length, i = function() {
                --e || f.resolveWith(g, [g])
            };
            for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--;)
                d = ha._data(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
            return i(), f.promise(c)
        }
    });
    var ya, za, Aa = /[\t\r\n]/g, Ba = /\r/g, Ca = /^(?:input|select|textarea|button|object)$/i, Da = /^(?:a|area)$/i, Ea = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, Fa = /^(?:checked|selected)$/i, Ga = ha.support.getSetAttribute, Ha = ha.support.input;
    ha.fn.extend({
        attr: function(a, b) {
            return ha.access(this, ha.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                ha.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return ha.access(this, ha.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = ha.propFix[a] || a, this.each(function() {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {}
            })
        },
        addClass: function(a) {
            var b, c, d, e, f, g = 0, h = this.length, i = "string" == typeof a && a;
            if (ha.isFunction(a))
                return this.each(function(b) {
                    ha(this).addClass(a.call(this, b, this.className))
                });
            if (i)
                for (b = (a || "").match(ja) || []; h > g; g++)
                    if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Aa, " ") : " ")) {
                        for (f = 0; e = b[f++];)
                            0 > d.indexOf(" " + e + " ") && (d += e + " ");
                            c.className = ha.trim(d)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g = 0, h = this.length, i = 0 === arguments.length || "string" == typeof a && a;
            if (ha.isFunction(a))
                return this.each(function(b) {
                    ha(this).removeClass(a.call(this, b, this.className))
                });
            if (i)
                for (b = (a || "").match(ja) || []; h > g; g++)
                    if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Aa, " ") : "")) {
                        for (f = 0; e = b[f++];)
                            for (; d.indexOf(" " + e + " ") >= 0;)
                                d = d.replace(" " + e + " ", " ");
                                c.className = a ? ha.trim(d) : ""
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a, d = "boolean" == typeof b;
            return this.each(ha.isFunction(a) ? function(c) {
                ha(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function() {
                if ("string" === c)
                    for (var e, f = 0, g = ha(this), h = b, i = a.match(ja) || []; e = i[f++];)
                        h = d ? h : !g.hasClass(e), g[h ? "addClass": "removeClass"](e);
                else ("undefined" === c || "boolean" === c) 
                    && (this.className && ha._data(this, "__className__", this.className), this.className = this.className || a===!1 ? "" : ha._data(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Aa, " ").indexOf(b) >= 0)
                    return !0;
            return !1
        },
        val: function(a) {
            var c, d, e, f = this[0];
            return arguments.length ? (e = ha.isFunction(a), this.each(function(d) {
                var f, g = ha(this);
                1 === this.nodeType && (f = e ? a.call(this, d, g.val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : ha.isArray(f) && (f = ha.map(f, function(a) {
                    return null == a ? "" : a + ""
                })), c = ha.valHooks[this.type] || ha.valHooks[this.nodeName.toLowerCase()], c && "set"in c && c.set(this, f, "value") !== b || (this.value = f))
            })) : f ? (c = ha.valHooks[f.type] || ha.valHooks[f.nodeName.toLowerCase()], c && "get"in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, "string" == typeof d ? d.replace(Ba, "") : null == d ? "" : d)) : void 0
        }
    }), ha.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (ha.support.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && ha.nodeName(c.parentNode, "optgroup"))) {
                            if (b = ha(c).val(), f)
                                return b;
                                g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    var c = ha.makeArray(b);
                    return ha(a).find("option").each(function() {
                        this.selected = ha.inArray(ha(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex =- 1), c
                }
            }
        },
        attr: function(a, c, d) {
            var e, f, g, h = a.nodeType;
            return a && 3 !== h && 8 !== h && 2 !== h ? a.getAttribute === b ? ha.prop(a, c, d) : (g = 1 !== h ||!ha.isXMLDoc(a), g && (c = c.toLowerCase(), f = ha.attrHooks[c] || (Ea.test(c) ? za : ya)), d === b ? f && g && "get"in f && null !== (e = f.get(a, c)) ? e : (a.getAttribute !== b && (e = a.getAttribute(c)), null == e ? b : e) : null !== d ? f && g && "set"in f && (e = f.set(a, d, c)) !== b ? e : (a.setAttribute(c, d + ""), d) : (ha.removeAttr(a, c), b)) : void 0
        },
        removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(ja);
            if (f && 1 === a.nodeType)
                for (; c = f[e++];)
                    d = ha.propFix[c] || c, Ea.test(c)?!Ga && Fa.test(c) ? a[ha.camelCase("default-" + c)] = a[d]=!1 : a[d]=!1 : ha.attr(a, c, ""), a.removeAttribute(Ga ? c : d)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!ha.support.radioValue && "radio" === b && ha.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, f, g, h = a.nodeType;
            return a && 3 !== h && 8 !== h && 2 !== h ? (g = 1 !== h ||!ha.isXMLDoc(a), g && (c = ha.propFix[c] || c, f = ha.propHooks[c]), d !== b ? f && "set"in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get"in f && null !== (e = f.get(a, c)) ? e : a[c]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : Ca.test(a.nodeName) || Da.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), za = {
        get: function(a, c) {
            var d = ha.prop(a, c), e = "boolean" == typeof d && a.getAttribute(c), f = "boolean" == typeof d ? Ha && Ga ? null != e: Fa.test(c) ? a[ha.camelCase("default-" + c)]: !!e: a.getAttributeNode(c);
            return f && f.value!==!1 ? c.toLowerCase() : b
        },
        set: function(a, b, c) {
            return b===!1 ? ha.removeAttr(a, c) : Ha && Ga ||!Fa.test(c) ? a.setAttribute(!Ga && ha.propFix[c] || c, c) : a[ha.camelCase("default-" + c)] = a[c]=!0, c
        }
    }, Ha && Ga || (ha.attrHooks.value = {
        get: function(a, c) {
            var d = a.getAttributeNode(c);
            return ha.nodeName(a, "input") ? a.defaultValue : d && d.specified ? d.value : b
        },
        set: function(a, c, d) {
            return ha.nodeName(a, "input") ? (a.defaultValue = c, b) : ya && ya.set(a, c, d)
        }
    }), Ga || (ya = ha.valHooks.button = {
        get: function(a, c) {
            var d = a.getAttributeNode(c);
            return d && ("id" === c || "name" === c || "coords" === c ? "" !== d.value : d.specified) ? d.value : b
        },
        set: function(a, c, d) {
            var e = a.getAttributeNode(d);
            return e || a.setAttributeNode(e = a.ownerDocument.createAttribute(d)), e.value = c += "", "value" === d || c === a.getAttribute(d) ? c : b
        }
    }, ha.attrHooks.contenteditable = {
        get: ya.get,
        set: function(a, b, c) {
            ya.set(a, "" === b?!1 : b, c)
        }
    }, ha.each(["width", "height"], function(a, c) {
        ha.attrHooks[c] = ha.extend(ha.attrHooks[c], {
            set: function(a, d) {
                return "" === d ? (a.setAttribute(c, "auto"), d) : b
            }
        })
    })), ha.support.hrefNormalized || (ha.each(["href", "src", "width", "height"], function(a, c) {
        ha.attrHooks[c] = ha.extend(ha.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return null == d ? b : d
            }
        })
    }), ha.each(["href", "src"], function(a, b) {
        ha.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4)
            }
        }
    })), ha.support.style || (ha.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || b
        },
        set: function(a, b) {
            return a.style.cssText = b + ""
        }
    }), ha.support.optSelected || (ha.propHooks.selected = ha.extend(ha.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    })), ha.support.enctype || (ha.propFix.enctype = "encoding"), ha.support.checkOn || ha.each(["radio", "checkbox"], function() {
        ha.valHooks[this] = {
            get: function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            }
        }
    }), ha.each(["radio", "checkbox"], function() {
        ha.valHooks[this] = ha.extend(ha.valHooks[this], {
            set: function(a, c) {
                return ha.isArray(c) ? a.checked = ha.inArray(ha(a).val(), c) >= 0 : b
            }
        })
    });
    var Ia = /^(?:input|select|textarea)$/i, Ja = /^key/, Ka = /^(?:mouse|contextmenu)|click/, La = /^(?:focusinfocus|focusoutblur)$/, Ma = /^([^.]*)(?:\.(.+)|)$/;
    ha.event = {
        global: {},
        add: function(a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, p, q, r = 3 !== a.nodeType && 8 !== a.nodeType && ha._data(a);
            if (r) {
                for (d.handler && (g = d, d = g.handler, f = g.selector), d.guid || (d.guid = ha.guid++), (j = r.events) || (j = r.events = {}), (h = r.handle) || (h = r.handle = function(a) {
                    return ha === b || a && ha.event.triggered === a.type ? b : ha.event.dispatch.apply(h.elem, arguments)
                }, h.elem = a), c = (c || "").match(ja) || [""], k = c.length; k--;)
                    i = Ma.exec(c[k]) || [], o = q = i[1], p = (i[2] || "").split(".").sort(), m = ha.event.special[o] || {}, o = (f ? m.delegateType : m.bindType) || o, m = ha.event.special[o] || {}, l = ha.extend({
                        type: o,
                        origType: q,
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: f,
                        needsContext: f && ha.expr.match.needsContext.test(f),
                        namespace: p.join(".")
                    }, g), (n = j[o]) || (n = j[o] = [], n.delegateCount = 0, m.setup && m.setup.call(a, e, p, h)!==!1 || (a.addEventListener ? a.addEventListener(o, h, !1) : a.attachEvent && a.attachEvent("on" + o, h))), m.add && (m.add.call(a, l), l.handler.guid || (l.handler.guid = d.guid)), f ? n.splice(n.delegateCount++, 0, l) : n.push(l), ha.event.global[o]=!0;
                a = null
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ha.hasData(a) && ha._data(a);
            if (q && (i = q.events)) {
                for (b = (b || "").match(ja) || [""], j = b.length; j--;)
                    if (h = Ma.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                        for (l = ha.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;)
                            k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h&&!h.test(k.namespace) || d && d !== k.selector && ("**" !== d ||!k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                            g&&!m.length && (l.teardown && l.teardown.call(a, o, q.handle)!==!1 || ha.removeEvent(a, n, q.handle), delete i[n])
                    } else 
                        for (n in i)
                            ha.event.remove(a, n + b[j], c, d, !0);
                ha.isEmptyObject(i) && (delete q.handle, ha._removeData(a, "events"))
            }
        },
        trigger: function(c, d, e, f) {
            var g, h, i, j, k, l, m, n = [e || V], o = c.type || c, p = c.namespace ? c.namespace.split("."): [];
            if (h = i = e = e || V, 3 !== e.nodeType && 8 !== e.nodeType&&!La.test(o + ha.event.triggered) && (o.indexOf(".") >= 0 && (p = o.split("."), o = p.shift(), p.sort()), k = 0 > o.indexOf(":") && "on" + o, c = c[ha.expando] ? c : new ha.Event(o, "object" == typeof c && c), c.isTrigger=!0, c.namespace = p.join("."), c.namespace_re = c.namespace ? RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c.result = b, c.target || (c.target = e), d = null == d ? [c] : ha.makeArray(d, [c]), m = ha.event.special[o] || {}, f ||!m.trigger || m.trigger.apply(e, d)!==!1)) {
                if (!f&&!m.noBubble&&!ha.isWindow(e)) {
                    for (j = m.delegateType || o, La.test(j + o) || (h = h.parentNode); h; h = h.parentNode)
                        n.push(h), i = h;
                    i === (e.ownerDocument || V) && n.push(i.defaultView || i.parentWindow || a)
                }
                for (g = 0; (h = n[g++])&&!c.isPropagationStopped();)
                    c.type = g > 1 ? j : m.bindType || o, l = (ha._data(h, "events") || {})[c.type] && ha._data(h, "handle"), l && l.apply(h, d), l = k && h[k], l && ha.acceptData(h) && l.apply && l.apply(h, d)===!1 && c.preventDefault();
                if (c.type = o, !(f || c.isDefaultPrevented() || m._default && m._default.apply(e.ownerDocument, d)!==!1 || "click" === o && ha.nodeName(e, "a") ||!ha.acceptData(e) ||!k ||!e[o] || ha.isWindow(e))) {
                    i = e[k], i && (e[k] = null), ha.event.triggered = o;
                    try {
                        e[o]()
                    } catch (q) {}
                    ha.event.triggered = b, i && (e[k] = i)
                }
                return c.result
            }
        },
        dispatch: function(a) {
            a = ha.event.fix(a);
            var c, d, e, f, g, h = [], i = ca.call(arguments), j = (ha._data(this, "events") || {})[a.type] || [], k = ha.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a)!==!1) {
                for (h = ha.event.handlers.call(this, a, j), c = 0; (f = h[c++])&&!a.isPropagationStopped();)
                    for (a.currentTarget = f.elem, d = 0; (g = f.handlers[d++])&&!a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(g.namespace)
                        ) && (a.handleObj = g, a.data = g.data, e = ((ha.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), e !== b && (a.result = e)===!1 && (a.preventDefault(), a.stopPropagation()));
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, c) {
            var d, e, f, g, h = [], i = c.delegateCount, j = a.target;
            if (i && j.nodeType && (!a.button || "click" !== a.type))
                for (; j != this; j = j.parentNode || this)
                    if (j.disabled!==!0 || "click" !== a.type) {
                        for (e = [], d = 0; i > d; d++)
                            g = c[d], f = g.selector + " ", e[f] === b && (e[f] = g.needsContext ? ha(f, this).index(j) >= 0 : ha.find(f, this, null, [j]).length), e[f] && e.push(g);
                            e.length && h.push({
                                elem: j,
                                handlers: e
                            })
                    }
            return c.length > i && h.push({
                elem: this,
                handlers: c.slice(i)
            }), h
        },
        fix: function(a) {
            if (a[ha.expando])
                return a;
            var b, c, d = a, e = ha.event.fixHooks[a.type] || {}, f = e.props ? this.props.concat(e.props): this.props;
            for (a = new ha.Event(d), b = f.length; b--;)
                c = f[b], a[c] = d[c];
            return a.target || (a.target = d.srcElement || V), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey=!!a.metaKey, e.filter ? e.filter(a, d) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, c) {
                var d, e, f, g = c.button, h = c.fromElement;
                return null == a.pageX && null != c.clientX && (d = a.target.ownerDocument || V, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), a.which || g === b || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                trigger: function() {
                    return ha.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : b
                }
            },
            focus: {
                trigger: function() {
                    if (this !== V.activeElement && this.focus)
                        try {
                            return this.focus(), !1
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === V.activeElement && this.blur ? (this.blur(), !1) : b
                },
                delegateType: "focusout"
            },
            beforeunload: {
                postDispatch: function(a) {
                    a.result !== b && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = ha.extend(new ha.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? ha.event.trigger(e, null, b) : ha.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, ha.removeEvent = V.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, c, d) {
        var e = "on" + c;
        a.detachEvent && (a[e] === b && (a[e] = null), a.detachEvent(e, d))
    }, ha.Event = function(a, c) {
        return this instanceof ha.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue===!1 || a.getPreventDefault && a.getPreventDefault() ? i : j) : this.type = a, c && ha.extend(this, c), this.timeStamp = a && a.timeStamp || ha.now(), this[ha.expando]=!0, b) : new ha.Event(a, c)
    }, ha.Event.prototype = {
        isDefaultPrevented: j,
        isPropagationStopped: j,
        isImmediatePropagationStopped: j,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = i, a && (a.preventDefault ? a.preventDefault() : a.returnValue=!1)
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = i, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble=!0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = i, this.stopPropagation()
        }
    }, ha.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        ha.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d&&!ha.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), ha.support.submitBubbles || (ha.event.special.submit = {
        setup: function() {
            return ha.nodeName(this, "form")?!1 : (ha.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target, d = ha.nodeName(c, "input") || ha.nodeName(c, "button") ? c.form: b;
                d&&!ha._data(d, "submitBubbles") && (ha.event.add(d, "submit._submit", function(a) {
                    a._submit_bubble=!0
                }), ha._data(d, "submitBubbles", !0))
            }), b)
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode&&!a.isTrigger && ha.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            return ha.nodeName(this, "form")?!1 : (ha.event.remove(this, "._submit"), b)
        }
    }), ha.support.changeBubbles || (ha.event.special.change = {
        setup: function() {
            return Ia.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ha.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed=!0)
            }), ha.event.add(this, "click._change", function(a) {
                this._just_changed&&!a.isTrigger && (this._just_changed=!1), ha.event.simulate("change", this, a, !0)
            })), !1) : (ha.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                Ia.test(b.nodeName)&&!ha._data(b, "changeBubbles") && (ha.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || ha.event.simulate("change", this.parentNode, a, !0)
                }), ha._data(b, "changeBubbles", !0))
            }), b)
        },
        handle: function(a) {
            var c = a.target;
            return this !== c || a.isSimulated || a.isTrigger || "radio" !== c.type && "checkbox" !== c.type ? a.handleObj.handler.apply(this, arguments) : b
        },
        teardown: function() {
            return ha.event.remove(this, "._change"), !Ia.test(this.nodeName)
        }
    }), ha.support.focusinBubbles || ha.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = 0, d = function(a) {
            ha.event.simulate(b, a.target, ha.event.fix(a), !0)
        };
        ha.event.special[b] = {
            setup: function() {
                0 === c++&&V.addEventListener(a, d, !0)
            },
            teardown: function() {
                0===--c && V.removeEventListener(a, d, !0)
            }
        }
    }), ha.fn.extend({
        on: function(a, c, d, e, f) {
            var g, h;
            if ("object" == typeof a) {
                "string" != typeof c && (d = d || c, c = b);
                for (h in a)
                    this.on(h, c, d, a[h], f);
                return this
            }
            if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e===!1)
                e = j;
            else if (!e)
                return this;
            return 1 === f && (g = e, e = function(a) {
                return ha().off(a), g.apply(this, arguments)
            }, e.guid = g.guid || (g.guid = ha.guid++)), this.each(function() {
                ha.event.add(this, a, e, d, c)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, c, d) {
            var e, f;
            if (a && a.preventDefault && a.handleObj)
                return e = a.handleObj, ha(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            if ("object" == typeof a) {
                for (f in a)
                    this.off(f, c, a[f]);
                return this
            }
            return (c===!1 || "function" == typeof c) && (d = c, c = b), d===!1 && (d = j), this.each(function() {
                ha.event.remove(this, a, d, c)
            })
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        },
        trigger: function(a, b) {
            return this.each(function() {
                ha.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, c) {
            var d = this[0];
            return d ? ha.event.trigger(a, c, d, !0) : b
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), ha.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        ha.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, Ja.test(b) && (ha.event.fixHooks[b] = ha.event.keyHooks), Ka.test(b) && (ha.event.fixHooks[b] = ha.event.mouseHooks)
    }), function(a, b) {
        function c(a) {
            return oa.test(a + "")
        }
        function d() {
            var a, b = [];
            return a = function(c, d) {
                return b.push(c += " ") > y.cacheLength && delete a[b.shift()], a[c] = d
            }
        }
        function e(a) {
            return a[N]=!0, a
        }
        function f(a) {
            var b = F.createElement("div");
            try {
                return a(b)
            } catch (c) {
                return !1
            } finally {
                b = null
            }
        }
        function g(a, b, c, d) {
            var e, f, g, h, i, j, k, n, o, p;
            if ((b ? b.ownerDocument || b : O) !== F && E(b), b = b || F, c = c || [], !a || "string" != typeof a)
                return c;
            if (1 !== (h = b.nodeType) && 9 !== h)
                return [];
            if (!H&&!d) {
                if (e = pa.exec(a))
                    if (g = e[1]) {
                        if (9 === h) {
                            if (f = b.getElementById(g), !f ||!f.parentNode)
                                return c;
                                if (f.id === g)
                                    return c.push(f), c
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && L(b, f) && f.id === g)
                            return c.push(f), c
                    } else {
                        if (e[2])
                            return Z.apply(c, $.call(b.getElementsByTagName(a), 0)), c;
                            if ((g = e[3]) && P.getByClassName && b.getElementsByClassName)
                                return Z.apply(c, $.call(b.getElementsByClassName(g), 0)), c
                    }
                if (P.qsa&&!I.test(a)) {
                    if (k=!0, n = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = l(a), (k = b.getAttribute("id")) ? n = k.replace(sa, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;)
                            j[i] = n + m(j[i]);
                        o = na.test(a) && b.parentNode || b, p = j.join(",")
                    }
                    if (p)
                        try {
                            return Z.apply(c, $.call(o.querySelectorAll(p), 0)), c
                    } catch (q) {} finally {
                        k || b.removeAttribute("id")
                    }
                }
            }
            return u(a.replace(ga, "$1"), b, c, d)
        }
        function h(a, b) {
            for (var c = a && b && a.nextSibling; c; c = c.nextSibling)
                if (c === b)
                    return - 1;
            return a ? 1 : - 1
        }
        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }
        function j(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }
        function k(a) {
            return e(function(b) {
                return b =+ b, e(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;)
                        c[e = f[g]] && (c[e]=!(d[e] = c[e]))
                })
            })
        }
        function l(a, b) {
            var c, d, e, f, h, i, j, k = T[a + " "];
            if (k)
                return b ? 0 : k.slice(0);
            for (h = a, i = [], j = y.preFilter; h;) {
                (!c || (d = ia.exec(h))) && (d && (h = h.slice(d[0].length) || h), i.push(e = [])), c=!1, (d = ja.exec(h)) && (c = d.shift(), e.push({
                    value: c,
                    type: d[0].replace(ga, " ")
                }), h = h.slice(c.length));
                for (f in y.filter)
                    !(d = ma[f].exec(h)) || j[f]&&!(d = j[f](d)) || (c = d.shift(), e.push({
                        value: c,
                        type: f,
                        matches: d
                    }), h = h.slice(c.length));
                if (!c)
                    break
            }
            return b ? h.length : h ? g.error(a) : T(a, i).slice(0)
        }
        function m(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++)
                d += a[b].value;
            return d
        }
        function n(a, b, c) {
            var d = b.dir, e = c && "parentNode" === b.dir, f = R++;
            return b.first ? function(b, c, f) {
                for (; b = b[d];)
                    if (1 === b.nodeType || e)
                        return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j, k = Q + " " + f;
                if (g) {
                    for (; b = b[d];)
                        if ((1 === b.nodeType || e) && a(b, c, g))
                            return !0
                } else 
                    for (; b = b[d];)
                        if (1 === b.nodeType || e)
                            if (j = b[N] || (b[N] = {}), (i = j[d]) && i[0] === k) {
                                if ((h = i[1])===!0 || h === x)
                                    return h===!0
                            } else if (i = j[d] = [k], i[1] = a(b, c, g) || x, i[1]===!0)
                                return !0
            }
        }
        function o(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--;)
                    if (!a[e](b, c, d))
                        return !1;
                return !0
            } : a[0]
        }
        function p(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) 
                && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }
        function q(a, b, c, d, f, g) {
            return d&&!d[N] && (d = q(d)), f&&!f[N] && (f = q(f, g)), e(function(e, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, q = e || t(b || "*", h.nodeType ? [h] : h, []), r=!a ||!e && b ? q : p(q, m, a, h, i), s = c ? f || (e ? a : o || d) ? [] : g : r;
                if (c && c(r, s, h, i), d)
                    for (j = p(s, n), d(j, [], h, i), k = j.length; k--;)(l = j[k]) 
                        && (s[n[k]]=!(r[n[k]] = l));
                if (e) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = s.length; k--;)(l = s[k]) 
                                && j.push(r[k] = l);
                            f(null, s = [], j, i)
                        }
                        for (k = s.length; k--;)(l = s[k]) 
                            && (j = f ? _.call(e, l) : m[k])>-1 && (e[j]=!(g[j] = l))
                        }
                } else 
                    s = p(s === g ? s.splice(o, s.length) : s), f ? f(null, g, s, i) : Z.apply(g, s)
            })
        }
        function r(a) {
            for (var b, c, d, e = a.length, f = y.relative[a[0].type], g = f || y.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                return a === b
            }, g, !0), j = n(function(a) {
                return _.call(b, a)>-1
            }, g, !0), k = [function(a, c, d) {
                return !f && (d || c !== D) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
            }
            ]; e > h; h++)
                if (c = y.relative[a[h].type])
                    k = [n(o(k), c)];
                else {
                    if (c = y.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                        for (d=++h; e > d&&!y.relative[a[d].type]; d++);
                        return q(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1)).replace(ga, "$1"), c, d > h && r(a.slice(h, d)), e > d && r(a = a.slice(d)), e > d && m(a))
                    }
                    k.push(c)
                }
            return o(k)
        }
        function s(a, b) {
            var c = 0, d = b.length > 0, f = a.length > 0, h = function(e, h, i, j, k) {
                var l, m, n, o = [], q = 0, r = "0", s = e && [], t = null != k, u = D, v = e || f && y.find.TAG("*", k && h.parentNode || h), w = Q += null == u ? 1: Math.E;
                for (t && (D = h !== F && h, x = c); null != (l = v[r]); r++) {
                    if (f && l) {
                        for (m = 0; n = a[m]; m++)
                            if (n(l, h, i)) {
                                j.push(l);
                                break
                            }
                        t && (Q = w, x=++c)
                    }
                    d && ((l=!n && l) && q--, e && s.push(l))
                }
                if (q += r, d && r !== q) {
                    for (m = 0; n = b[m]; m++)
                        n(s, o, h, i);
                    if (e) {
                        if (q > 0)
                            for (; r--;)
                                s[r] || o[r] || (o[r] = Y.call(j));
                        o = p(o)
                    }
                    Z.apply(j, o), t&&!e && o.length > 0 && q + b.length > 1 && g.uniqueSort(j)
                }
                return t && (Q = w, D = u), s
            };
            return d ? e(h) : h
        }
        function t(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++)
                g(a, b[d], c);
            return c
        }
        function u(a, b, c, d) {
            var e, f, g, h, i, j = l(a);
            if (!d && 1 === j.length) {
                if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && 9 === b.nodeType&&!H && y.relative[f[1].type]) {
                    if (b = y.find.ID(g.matches[0].replace(ua, va), b)[0], !b)
                        return c;
                    a = a.slice(f.shift().value.length)
                }
                for (e = ma.needsContext.test(a)?-1 : f.length - 1; e >= 0 && (g = f[e], !y.relative[h = g.type]);
                e--)if ((i = y.find[h]) && (d = i(g.matches[0].replace(ua, va), na.test(f[0].type) && b.parentNode || b))) {
                    if (f.splice(e, 1), a = d.length && m(f), !a)
                        return Z.apply(c, $.call(d, 0)), c;
                    break
                }
            }
            return B(a, j)(d, b, H, c, na.test(a)), c
        }
        function v() {}
        var w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" +- new Date, O = a.document, P = {}, Q = 0, R = 0, S = d(), T = d(), U = d(), V = typeof b, W = 1<<31, X = [], Y = X.pop, Z = X.push, $ = X.slice, _ = X.indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (this[b] === a)
                    return b;
            return - 1
        }, aa = "[\\x20\\t\\r\\n\\f]", ba = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ca = ba.replace("w", "w#"), da = "([*^$|!~]?=)", ea = "\\[" + aa + "*(" + ba + ")" + aa + "*(?:" + da + aa + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ca + ")|)|)" + aa + "*\\]", fa = ":(" + ba + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ea.replace(3, 8) + ")*)|.*)\\)|)", ga = RegExp("^" + aa + "+|((?:^|[^\\\\])(?:\\\\.)*)" + aa + "+$", "g"), ia = RegExp("^" + aa + "*," + aa + "*"), ja = RegExp("^" + aa + "*([\\x20\\t\\r\\n\\f>+~])" + aa + "*"), ka = RegExp(fa), la = RegExp("^" + ca + "$"), ma = {
            ID: RegExp("^#(" + ba + ")"),
            CLASS: RegExp("^\\.(" + ba + ")"),
            NAME: RegExp("^\\[name=['\"]?(" + ba + ")['\"]?\\]"),
            TAG: RegExp("^(" + ba.replace("w", "w*") + ")"),
            ATTR: RegExp("^" + ea),
            PSEUDO: RegExp("^" + fa),
            CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + aa + "*(even|odd|(([+-]|)(\\d*)n|)" + aa + "*(?:([+-]|)" + aa + "*(\\d+)|))" + aa + "*\\)|)", "i"),
            needsContext: RegExp("^" + aa + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + aa + "*((?:-\\d)?\\d*)" + aa + "*\\)|)(?=[^-]|$)", "i")
        }, na = /[\x20\t\r\n\f]*[+~]/, oa = /\{\s*\[native code\]\s*\}/, pa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, qa = /^(?:input|select|textarea|button)$/i, ra = /^h\d$/i, sa = /'|\\/g, ta = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, ua = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, va = function(a, b) {
            var c = "0x" + b - 65536;
            return c !== c ? b : 0 > c ? String.fromCharCode(c + 65536) : String.fromCharCode(55296 | c>>10, 56320 | 1023 & c)
        };
        try {
            $.call(G.childNodes, 0)[0].nodeType
        } catch (wa) {
            $ = function(a) {
                for (var b, c = []; b = this[a]; a++)
                    c.push(b);
                return c
            }
        }
        A = g.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, E = g.setDocument = function(a) {
            var d = a ? a.ownerDocument || a: O;
            return d !== F && 9 === d.nodeType && d.documentElement ? (F = d, G = d.documentElement, H = A(d), P.tagNameNoComments = f(function(a) {
                return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length
            }), P.attributes = f(function(a) {
                a.innerHTML = "<select></select>";
                var b = typeof a.lastChild.getAttribute("multiple");
                return "boolean" !== b && "string" !== b
            }), P.getByClassName = f(function(a) {
                return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", a.getElementsByClassName && a.getElementsByClassName("e").length ? (a.lastChild.className = "e", 2 === a.getElementsByClassName("e").length) : !1
            }), P.getByName = f(function(a) {
                a.id = N + 0, a.innerHTML = "<a name='" + N + "'></a><div name='" + N + "'></div>", G.insertBefore(a, G.firstChild);
                var b = d.getElementsByName && d.getElementsByName(N).length === 2 + d.getElementsByName(N + 0).length;
                return P.getIdNotName=!d.getElementById(N), G.removeChild(a), b
            }), y.attrHandle = f(function(a) {
                return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== V && "#" === a.firstChild.getAttribute("href")
            }) ? {} : {
                href: function(a) {
                    return a.getAttribute("href", 2)
                },
                type: function(a) {
                    return a.getAttribute("type")
                }
            }, P.getIdNotName ? (y.find.ID = function(a, b) {
                if (typeof b.getElementById !== V&&!H) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, y.filter.ID = function(a) {
                var b = a.replace(ua, va);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (y.find.ID = function(a, c) {
                if (typeof c.getElementById !== V&&!H) {
                    var d = c.getElementById(a);
                    return d ? d.id === a || typeof d.getAttributeNode !== V && d.getAttributeNode("id").value === a ? [d] : b : []
                }
            }, y.filter.ID = function(a) {
                var b = a.replace(ua, va);
                return function(a) {
                    var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), y.find.TAG = P.tagNameNoComments ? function(a, c) {
                return typeof c.getElementsByTagName !== V ? c.getElementsByTagName(a) : b
            } : function(a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e]; e++)
                        1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, y.find.NAME = P.getByName && function(a, c) {
                return typeof c.getElementsByName !== V ? c.getElementsByName(name) : b
            }, y.find.CLASS = P.getByClassName && function(a, c) {
                return typeof c.getElementsByClassName === V || H ? b : c.getElementsByClassName(a)
            }, J = [], I = [":focus"], (P.qsa = c(d.querySelectorAll)) && (f(function(a) {
                a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || I.push("\\[" + aa + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || I.push(":checked")
            }), f(function(a) {
                a.innerHTML = "<input type='hidden' i=''/>", a.querySelectorAll("[i^='']").length && I.push("[*^$]=" + aa + "*(?:\"\"|'')"), a.querySelectorAll(":enabled").length || I.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), I.push(",.*:")
            })), (P.matchesSelector = c(K = G.matchesSelector || G.mozMatchesSelector || G.webkitMatchesSelector || G.oMatchesSelector || G.msMatchesSelector)) && f(function(a) {
                P.disconnectedMatch = K.call(a, "div"), K.call(a, "[s!='']:x"), J.push("!=", fa)
            }), I = RegExp(I.join("|")), J = RegExp(J.join("|")), L = c(G.contains) || G.compareDocumentPosition ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement: a, d = b && b.parentNode;
                return a === d ||!(!d || 1 !== d.nodeType ||!(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    for (; b = b.parentNode;)
                        if (b === a)
                            return !0;
                return !1
            }, M = G.compareDocumentPosition ? function(a, b) {
                var c;
                return a === b ? (C=!0, 0) : (c = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b)) ? 1 & c || a.parentNode && 11 === a.parentNode.nodeType ? a === d || L(O, a)?-1 : b === d || L(O, b) ? 1 : 0 : 4 & c?-1 : 1 : a.compareDocumentPosition?-1 : 1
            } : function(a, b) {
                var c, e = 0, f = a.parentNode, g = b.parentNode, i = [a], j = [b];
                if (a === b)
                    return C=!0, 0;
                if (a.sourceIndex && b.sourceIndex)
                    return (~b.sourceIndex || W) - (L(O, a)&&~a.sourceIndex || W);
                if (!f ||!g)
                    return a === d?-1 : b === d ? 1 : f?-1 : g ? 1 : 0;
                if (f === g)
                    return h(a, b);
                for (c = a; c = c.parentNode;)
                    i.unshift(c);
                for (c = b; c = c.parentNode;)
                    j.unshift(c);
                for (; i[e] === j[e];)
                    e++;
                return e ? h(i[e], j[e]) : i[e] === O?-1 : j[e] === O ? 1 : 0
            }, C=!1, [0, 0].sort(M), P.detectDuplicates = C, F) : F
        }, g.matches = function(a, b) {
            return g(a, null, null, b)
        }, g.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== F && E(a), b = b.replace(ta, "='$1']"), !(!P.matchesSelector || H || J && J.test(b) || I.test(b)))
                try {
                    var c = K.call(a, b);
                    if (c || P.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                        return c
            } catch (d) {}
            return g(b, F, null, [a]).length > 0
        }, g.contains = function(a, b) {
            return (a.ownerDocument || a) !== F && E(a), L(a, b)
        }, g.attr = function(a, b) {
            var c;
            return (a.ownerDocument || a) !== F && E(a), H || (b = b.toLowerCase()), (c = y.attrHandle[b]) ? c(a) : H || P.attributes ? a.getAttribute(b) : ((c = a.getAttributeNode(b)) || a.getAttribute(b)) && a[b]===!0 ? b : c && c.specified ? c.value : null
        }, g.error = function(a) {
            throw Error("Syntax error, unrecognized expression: " + a)
        }, g.uniqueSort = function(a) {
            var b, c = [], d = 1, e = 0;
            if (C=!P.detectDuplicates, a.sort(M), C) {
                for (; b = a[d]; d++)
                    b === a[d - 1] && (e = c.push(d));
                for (; e--;)
                    a.splice(c[e], 1)
            }
            return a
        }, z = g.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent)
                        return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)
                        c += z(a)
                    } else if (3 === e || 4 === e)
                    return a.nodeValue
            } else 
                for (; b = a[d]; d++)
                    c += z(b);
            return c
        }, y = g.selectors = {
            cacheLength: 50,
            createPseudo: e,
            match: ma,
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ua, va), a[3] = (a[4] || a[5] || "").replace(ua, va), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || g.error(a[0]), a[4] =+ (a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] =+ (a[7] + a[8] || "odd" === a[3])) : a[3] && g.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c=!a[5] && a[2];
                    return ma.CHILD.test(a[0]) ? null : (a[4] ? a[2] = a[4] : c && ka.test(c) && (b = l(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    return "*" === a ? function() {
                        return !0
                    } : (a = a.replace(ua, va).toLowerCase(), function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === a
                    })
                },
                CLASS: function(a) {
                    var b = S[a + " "];
                    return b || (b = RegExp("(^|" + aa + ")" + a + "(" + aa + "|$)")) && S(a, function(a) {
                        return b.test(a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = g.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c)>-1 : "$=" === b ? c && e.substr(e.length - c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c)>-1 : "|=" === b ? e === c || e.substr(0, c.length + 1) === c + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice( - 4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling": "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s=!i&&!h;
                        if (q) {
                            if (f) {
                                for (; p;) {
                                    for (l = b; l = l[p];)
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)
                                            return !1;
                                    o = p = "only" === a&&!o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild: q.lastChild], g && s) {
                                for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === Q && j[1], m = j[0] === Q && j[2], l = n && q.childNodes[n]; l=++n && l && l[p] || (m = n = 0) 
                                    || o.pop();
                                )if (1 === l.nodeType&&++m && l === b) {
                                    k[a] = [Q, n, m];
                                    break
                                }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === Q)
                                m = j[1];
                            else 
                                for (; (l=++n && l && l[p] || (m = n = 0) || o.pop()) 
                                    && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType)||!++m || (s && ((l[N] || (l[N] = {}))[a] = [Q, m]), l !== b));
                            );
                            return m -= e, m === d || 0 === m%d && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c, d = y.pseudos[a] || y.setFilters[a.toLowerCase()] || g.error("unsupported pseudo: " + a);
                    return d[N] ? d(b) : d.length > 1 ? (c = [a, a, "", b], y.setFilters.hasOwnProperty(a.toLowerCase()) ? e(function(a, c) {
                        for (var e, f = d(a, b), g = f.length; g--;)
                            e = _.call(a, f[g]), a[e]=!(c[e] = f[g])
                    }) : function(a) {
                        return d(a, 0, c)
                    }) : d
                }
            },
            pseudos: {
                not: e(function(a) {
                    var b = [], c = [], d = B(a.replace(ga, "$1"));
                    return d[N] ? e(function(a, b, c, e) {
                        for (var f, g = d(a, null, e, []), h = a.length; h--;)(f = g[h]) 
                            && (a[h]=!(b[h] = f))
                    }) : function(a, e, f) {
                        return b[0] = a, d(b, null, f, c), !c.pop()
                    }
                }),
                has: e(function(a) {
                    return function(b) {
                        return g(a, b).length > 0
                    }
                }),
                contains: e(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || z(b)).indexOf(a)>-1
                    }
                }),
                lang: e(function(a) {
                    return la.test(a || "") || g.error("unsupported lang: " + a), a = a.replace(ua, va).toLowerCase(), function(b) {
                        var c;
                        do 
                            if (c = H ? b.getAttribute("xml:lang") || b.getAttribute("lang") : b.lang)
                                return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                        while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1
                    }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === G
                },
                focus: function(a) {
                    return a === F.activeElement && (!F.hasFocus || F.hasFocus())&&!!(a.type || a.href||~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled===!1
                },
                disabled: function(a) {
                    return a.disabled===!0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b&&!!a.checked || "option" === b&&!!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected===!0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeName > "@" || 3 === a.nodeType || 4 === a.nodeType)
                            return !1;
                    return !0
                },
                parent: function(a) {
                    return !y.pseudos.empty(a)
                },
                header: function(a) {
                    return ra.test(a.nodeName)
                },
                input: function(a) {
                    return qa.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type)
                },
                first: k(function() {
                    return [0]
                }),
                last: k(function(a, b) {
                    return [b - 1]
                }),
                eq: k(function(a, b, c) {
                    return [0 > c ? c + b: c]
                }),
                even: k(function(a, b) {
                    for (var c = 0; b > c; c += 2)
                        a.push(c);
                    return a
                }),
                odd: k(function(a, b) {
                    for (var c = 1; b > c; c += 2)
                        a.push(c);
                    return a
                }),
                lt: k(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;)
                        a.push(d);
                    return a
                }),
                gt: k(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; b>++d;)
                        a.push(d);
                    return a
                })
            }
        };
        for (w in{
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            y.pseudos[w] = i(w);
        for (w in{
            submit: !0,
            reset: !0
        })
            y.pseudos[w] = j(w);
        B = g.compile = function(a, b) {
            var c, d = [], e = [], f = U[a + " "];
            if (!f) {
                for (b || (b = l(a)), c = b.length; c--;)
                    f = r(b[c]), f[N] ? d.push(f) : e.push(f);
                f = U(a, s(e, d))
            }
            return f
        }, y.pseudos.nth = y.pseudos.eq, y.filters = v.prototype = y.pseudos, y.setFilters = new v, E(), g.attr = ha.attr, ha.find = g, ha.expr = g.selectors, ha.expr[":"] = ha.expr.pseudos, ha.unique = g.uniqueSort, ha.text = g.getText, ha.isXMLDoc = g.isXML, ha.contains = g.contains
    }(a);
    var Na = /Until$/, Oa = /^(?:parents|prev(?:Until|All))/, Pa = /^.[^:#\[\.,]*$/, Qa = ha.expr.match.needsContext, Ra = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    ha.fn.extend({
        find: function(a) {
            var b, c, d;
            if ("string" != typeof a)
                return d = this, this.pushStack(ha(a).filter(function() {
                    for (b = 0; d.length > b; b++)
                        if (ha.contains(d[b], this))
                            return !0
                        }));
            for (c = [], b = 0; this.length > b; b++)
                ha.find(a, this[b], c);
            return c = this.pushStack(ha.unique(c)), c.selector = (this.selector ? this.selector + " " : "") + a, c
        },
        has: function(a) {
            var b, c = ha(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++)
                    if (ha.contains(this, c[b]))
                        return !0
            })
        },
        not: function(a) {
            return this.pushStack(l(this, a, !1))
        },
        filter: function(a) {
            return this.pushStack(l(this, a, !0))
        },
        is: function(a) {
            return !!a && ("string" == typeof a ? Qa.test(a) ? ha(a, this.context).index(this[0]) >= 0 : ha.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = Qa.test(a) || "string" != typeof a ? ha(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c.ownerDocument && c !== b && 11 !== c.nodeType;) {
                    if (g ? g.index(c)>-1 : ha.find.matchesSelector(c, a)) {
                        f.push(c);
                        break
                    }
                    c = c.parentNode
                }
            return this.pushStack(f.length > 1 ? ha.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? ha.inArray(this[0], ha(a)) : ha.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : - 1
        },
        add: function(a, b) {
            var c = "string" == typeof a ? ha(a, b): ha.makeArray(a && a.nodeType ? [a] : a), d = ha.merge(this.get(), c);
            return this.pushStack(ha.unique(d))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }), ha.fn.andSelf = ha.fn.addBack, ha.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return ha.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return ha.dir(a, "parentNode", c)
        },
        next: function(a) {
            return k(a, "nextSibling")
        },
        prev: function(a) {
            return k(a, "previousSibling")
        },
        nextAll: function(a) {
            return ha.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return ha.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return ha.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return ha.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return ha.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return ha.sibling(a.firstChild)
        },
        contents: function(a) {
            return ha.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ha.merge([], a.childNodes)
        }
    }, function(a, b) {
        ha.fn[a] = function(c, d) {
            var e = ha.map(this, b, c);
            return Na.test(a) || (d = c), d && "string" == typeof d && (e = ha.filter(d, e)), e = this.length > 1&&!Ra[a] ? ha.unique(e) : e, this.length > 1 && Oa.test(a) && (e = e.reverse()), this.pushStack(e)
        }
    }), ha.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"), 1 === b.length ? ha.find.matchesSelector(b[0], a) ? [b[0]] : [] : ha.find.matches(a, b)
        },
        dir: function(a, c, d) {
            for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType ||!ha(f).is(d));)
                1 === f.nodeType && e.push(f), f = f[c];
            return e
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling)
                1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var Sa = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Ta = / jQuery\d+="(?:null|\d+)"/g, Ua = RegExp("<(?:" + Sa + ")[\\s/>]", "i"), Va = /^\s+/, Wa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Xa = /<([\w:]+)/, Ya = /<tbody/i, Za = /<|&#?\w+;/, $a = /<(?:script|style|link)/i, _a = /^(?:checkbox|radio)$/i, ab = /checked\s*(?:[^=]|=\s*.checked.)/i, bb = /^$|\/(?:java|ecma)script/i, cb = /^true\/(.*)/, db = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, eb = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: ha.support.htmlSerialize ? [0, "", ""]: [1, "X<div>", "</div>"]
    }, fb = m(V), gb = fb.appendChild(V.createElement("div"));
    eb.optgroup = eb.option, eb.tbody = eb.tfoot = eb.colgroup = eb.caption = eb.thead, eb.th = eb.td, ha.fn.extend({
        text: function(a) {
            return ha.access(this, function(a) {
                return a === b ? ha.text(this) : this.empty().append((this[0] && this[0].ownerDocument || V).createTextNode(a))
            }, null, a, arguments.length)
        },
        wrapAll: function(a) {
            if (ha.isFunction(a))
                return this.each(function(b) {
                    ha(this).wrapAll(a.call(this, b))
                });
            if (this[0]) {
                var b = ha(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)
                        a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return this.each(ha.isFunction(a) ? function(b) {
                ha(this).wrapInner(a.call(this, b))
            } : function() {
                var b = ha(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = ha.isFunction(a);
            return this.each(function(c) {
                ha(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                ha.nodeName(this, "body") || ha(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            return this.domManip(arguments, !1, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, !1, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = 0; null != (c = this[d]); d++)(!a || ha.filter(a, [c]).length > 0) 
                && (b || 1 !== c.nodeType || ha.cleanData(t(c)), c.parentNode && (b && ha.contains(c.ownerDocument, c) && q(t(c, "script")), c.parentNode.removeChild(c)));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                for (1 === a.nodeType && ha.cleanData(t(a, !1)); a.firstChild;)
                    a.removeChild(a.firstChild);
                a.options && ha.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a, b) {
            return a = null == a?!1 : a, b = null == b ? a : b, this.map(function() {
                return ha.clone(this, a, b)
            })
        },
        html: function(a) {
            return ha.access(this, function(a) {
                var c = this[0] || {}, d = 0, e = this.length;
                if (a === b)
                    return 1 === c.nodeType ? c.innerHTML.replace(Ta, "") : b;
                if (!("string" != typeof a || $a.test(a) ||!ha.support.htmlSerialize && Ua.test(a) ||!ha.support.leadingWhitespace && Va.test(a) || eb[(Xa.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(Wa, "<$1></$2>");
                    try {
                        for (; e > d; d++)
                            c = this[d] || {}, 1 === c.nodeType && (ha.cleanData(t(c, !1)), c.innerHTML = a);
                        c = 0
                    } catch (f) {}
                }
                c && this.empty().append(a);

            }, null, a, arguments.length)
        },
        replaceWith: function(a) {
            var b = ha.isFunction(a);
            return b || "string" == typeof a || (a = ha(a).not(this).detach()), this.domManip([a], !0, function(a) {
                var b = this.nextSibling, c = this.parentNode;
                (c && 1 === this.nodeType || 11 === this.nodeType) && (ha(this).remove(), b ? b.parentNode.insertBefore(a, b) : c.appendChild(a))
            })
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, c, d) {
            a = aa.apply([], a);
            var e, f, g, h, i, j, k = 0, l = this.length, m = this, q = l - 1, r = a[0], s = ha.isFunction(r);
            if (s ||!(1 >= l || "string" != typeof r || ha.support.checkClone) && ab.test(r))
                return this.each(function(e) {
                    var f = m.eq(e);
                    s && (a[0] = r.call(this, e, c ? f.html() : b)), f.domManip(a, c, d)
                });
            if (l && (e = ha.buildFragment(a, this[0].ownerDocument, !1, this), f = e.firstChild, 1 === e.childNodes.length && (e = f), f)) {
                for (c = c && ha.nodeName(f, "tr"), g = ha.map(t(e, "script"), o), h = g.length; l > k; k++)
                    i = e, k !== q && (i = ha.clone(i, !0, !0), h && ha.merge(g, t(i, "script"))), d.call(c && ha.nodeName(this[k], "table") ? n(this[k], "tbody") : this[k], i, k);
                if (h)
                    for (j = g[g.length - 1].ownerDocument, ha.map(g, p), k = 0; h > k; k++)
                        i = g[k], bb.test(i.type || "")&&!ha._data(i, "globalEval") && ha.contains(j, i) && (i.src ? ha.ajax({
                            url: i.src,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            "throws": !0
                        }) : ha.globalEval((i.text || i.textContent || i.innerHTML || "").replace(db, "")));
                e = f = null
            }
            return this
        }
    }), ha.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        ha.fn[a] = function(a) {
            for (var c, d = 0, e = [], f = ha(a), g = f.length - 1; g >= d; d++)
                c = d === g ? this : this.clone(!0), ha(f[d])[b](c), ba.apply(e, c.get());
            return this.pushStack(e)
        }
    }), ha.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h, i = ha.contains(a.ownerDocument, a);
            if (ha.support.html5Clone || ha.isXMLDoc(a) ||!Ua.test("<" + a.nodeName + ">") ? h = a.cloneNode(!0) : (gb.innerHTML = a.outerHTML, gb.removeChild(h = gb.firstChild)), !(ha.support.noCloneEvent && ha.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ha.isXMLDoc(a)))
                for (d = t(h), e = t(a), g = 0; null != (f = e[g]); ++g)
                    d[g] && s(f, d[g]);
            if (b)
                if (c)
                    for (e = e || t(a), d = d || t(h), g = 0; null != (f = e[g]); g++)
                        r(f, d[g]);
                else 
                    r(a, h);
            return d = t(h, "script"), d.length > 0 && q(d, !i && t(a, "script")), d = e = f = null, h
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k, l = a.length, n = m(b), o = [], p = 0; l > p; p++)
                if (f = a[p], f || 0 === f)
                    if ("object" === ha.type(f))
                        ha.merge(o, f.nodeType ? [f] : f);
                    else if (Za.test(f)) {
                        for (h = h || n.appendChild(b.createElement("div")), g = (Xa.exec(f) || ["", ""])[1].toLowerCase(), i = eb[g] || eb._default, h.innerHTML = i[1] + f.replace(Wa, "<$1></$2>") + i[2], k = i[0]; k--;)
                            h = h.lastChild;
                            if (!ha.support.leadingWhitespace && Va.test(f) && o.push(b.createTextNode(Va.exec(f)[0])), !ha.support.tbody)
                                for (f = "table" !== g || Ya.test(f) ? "<table>" !== i[1] || Ya.test(f) ? 0 : h : h.firstChild, k = f && f.childNodes.length; k--;)
                                    ha.nodeName(j = f.childNodes[k], "tbody")&&!j.childNodes.length && f.removeChild(j);
                                    for (ha.merge(o, h.childNodes), h.textContent = ""; h.firstChild;)
                                        h.removeChild(h.firstChild);
                                        h = n.lastChild
                    } else 
                        o.push(b.createTextNode(f));
            for (h && n.removeChild(h), ha.support.appendChecked || ha.grep(t(o, "input"), u), p = 0; f = o[p++];)
                if ((!d||-1 === ha.inArray(f, d)) && (e = ha.contains(f.ownerDocument, f), h = t(n.appendChild(f), "script"), e && q(h), c))
                    for (k = 0; f = h[k++];)
                        bb.test(f.type || "") && c.push(f);
            return h = null, n
        },
        cleanData: function(a, c) {
            for (var d, e, f, g, h = 0, i = ha.expando, j = ha.cache, k = ha.support.deleteExpando, l = ha.event.special; null != (f = a[h]); h++)
                if ((c || ha.acceptData(f)) && (e = f[i], d = e && j[e])) {
                    if (d.events)
                        for (g in d.events)
                            l[g] ? ha.event.remove(f, g) : ha.removeEvent(f, g, d.handle);
                            j[e] && (delete j[e], k ? delete f[i] : f.removeAttribute !== b ? f.removeAttribute(i) : f[i] = null, $.push(e))
                }
        }
    });
    var hb, ib, jb, kb = /alpha\([^)]*\)/i, lb = /opacity\s*=\s*([^)]*)/, mb = /^(top|right|bottom|left)$/, nb = /^(none|table(?!-c[ea]).+)/, ob = /^margin/, pb = RegExp("^(" + ia + ")(.*)$", "i"), qb = RegExp("^(" + ia + ")(?!px)[a-z%]+$", "i"), rb = RegExp("^([+-])=(" + ia + ")", "i"), sb = {
        BODY: "block"
    }, tb = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, ub = {
        letterSpacing: 0,
        fontWeight: 400
    }, vb = ["Top", "Right", "Bottom", "Left"], wb = ["Webkit", "O", "Moz", "ms"];
    ha.fn.extend({
        css: function(a, c) {
            return ha.access(this, function(a, c, d) {
                var e, f, g = {}, h = 0;
                if (ha.isArray(c)) {
                    for (e = ib(a), f = c.length; f > h; h++)
                        g[c[h]] = ha.css(a, c[h], !1, e);
                    return g
                }
                return d !== b ? ha.style(a, c, d) : ha.css(a, c)
            }, a, c, arguments.length > 1)
        },
        show: function() {
            return x(this, !0)
        },
        hide: function() {
            return x(this)
        },
        toggle: function(a) {
            var b = "boolean" == typeof a;
            return this.each(function() {
                (b ? a : w(this)) ? ha(this).show() : ha(this).hide()
            })
        }
    }), ha.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = hb(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ha.support.cssFloat ? "cssFloat": "styleFloat"
        },
        style: function(a, c, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f, g, h, i = ha.camelCase(c), j = a.style;
                if (c = ha.cssProps[i] || (ha.cssProps[i] = v(j, i)), h = ha.cssHooks[c] || ha.cssHooks[i], d === b)
                    return h && "get"in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
                if (g = typeof d, "string" === g && (f = rb.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(ha.css(a, c)), g = "number"), !(null == d || "number" === g && isNaN(d) || ("number" !== g || ha.cssNumber[i] || (d += "px"), ha.support.clearCloneStyle || "" !== d || 0 !== c.indexOf("background") || (j[c] = "inherit"), h && "set"in h && (d = h.set(a, d, e)) === b)))
                    try {
                        j[c] = d
                } catch (k) {}
            }
        },
        css: function(a, c, d, e) {
            var f, g, h, i = ha.camelCase(c);
            return c = ha.cssProps[i] || (ha.cssProps[i] = v(a.style, i)), h = ha.cssHooks[c] || ha.cssHooks[i], h && "get"in h && (f = h.get(a, !0, d)), f === b && (f = hb(a, c, e)), "normal" === f && c in ub && (f = ub[c]), d ? (g = parseFloat(f), d===!0 || ha.isNumeric(g) ? g || 0 : f) : f
        },
        swap: function(a, b, c, d) {
            var e, f, g = {};
            for (f in b)
                g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b)
                a.style[f] = g[f];
            return e
        }
    }), a.getComputedStyle ? (ib = function(b) {
        return a.getComputedStyle(b, null)
    }, hb = function(a, c, d) {
        var e, f, g, h = d || ib(a), i = h ? h.getPropertyValue(c) || h[c]: b, j = a.style;
        return h && ("" !== i || ha.contains(a.ownerDocument, a) || (i = ha.style(a, c)), qb.test(i) && ob.test(c) && (e = j.width, f = j.minWidth, g = j.maxWidth, j.minWidth = j.maxWidth = j.width = i, i = h.width, j.width = e, j.minWidth = f, j.maxWidth = g)), i
    }) : V.documentElement.currentStyle && (ib = function(a) {
        return a.currentStyle
    }, hb = function(a, c, d) {
        var e, f, g, h = d || ib(a), i = h ? h[c]: b, j = a.style;
        return null == i && j && j[c] && (i = j[c]), qb.test(i)&&!mb.test(c) && (e = j.left, f = a.runtimeStyle, g = f && f.left, g && (f.left = a.currentStyle.left), j.left = "fontSize" === c ? "1em" : i, i = j.pixelLeft + "px", j.left = e, g && (f.left = g)), "" === i ? "auto" : i
    }), ha.each(["height", "width"], function(a, c) {
        ha.cssHooks[c] = {
            get: function(a, d, e) {
                return d ? 0 === a.offsetWidth && nb.test(ha.css(a, "display")) ? ha.swap(a, tb, function() {
                    return A(a, c, e)
                }) : A(a, c, e) : b
            },
            set: function(a, b, d) {
                var e = d && ib(a);
                return y(a, b, d ? z(a, c, d, ha.support.boxSizing && "border-box" === ha.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), ha.support.opacity || (ha.cssHooks.opacity = {
        get: function(a, b) {
            return lb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style, d = a.currentStyle, e = ha.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")": "", f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === ha.trim(f.replace(kb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d&&!d.filter) || (c.filter = kb.test(f) ? f.replace(kb, e) : f + " " + e)
        }
    }), ha(function() {
        ha.support.reliableMarginRight || (ha.cssHooks.marginRight = {
            get: function(a, c) {
                return c ? ha.swap(a, {
                    display: "inline-block"
                }, hb, [a, "marginRight"]) : b
            }
        }), !ha.support.pixelPosition && ha.fn.position && ha.each(["top", "left"], function(a, c) {
            ha.cssHooks[c] = {
                get: function(a, d) {
                    return d ? (d = hb(a, c), qb.test(d) ? ha(a).position()[c] + "px" : d) : b
                }
            }
        })
    }), ha.expr && ha.expr.filters && (ha.expr.filters.hidden = function(a) {
        return 0 === a.offsetWidth && 0 === a.offsetHeight ||!ha.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || ha.css(a, "display"))
    }, ha.expr.filters.visible = function(a) {
        return !ha.expr.filters.hidden(a)
    }), ha.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        ha.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)
                    e[a + vb[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, ob.test(a) || (ha.cssHooks[a + b].set = y)
    });
    var xb = /%20/g, yb = /\[\]$/, zb = /\r?\n/g, Ab = /^(?:submit|button|image|reset)$/i, Bb = /^(?:input|select|textarea|keygen)/i;
    ha.fn.extend({
        serialize: function() {
            return ha.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = ha.prop(this, "elements");
                return a ? ha.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name&&!ha(this).is(":disabled") && Bb.test(this.nodeName)&&!Ab.test(a) && (this.checked ||!_a.test(a))
            }).map(function(a, b) {
                var c = ha(this).val();
                return null == c ? null : ha.isArray(c) ? ha.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(zb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(zb, "\r\n")
                }
            }).get()
        }
    }), ha.param = function(a, c) {
        var d, e = [], f = function(a, b) {
            b = ha.isFunction(b) ? b() : null == b ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (c === b && (c = ha.ajaxSettings && ha.ajaxSettings.traditional), ha.isArray(a) || a.jquery&&!ha.isPlainObject(a))
            ha.each(a, function() {
                f(this.name, this.value)
            });
        else 
            for (d in a)
                D(d, a[d], c, f);
        return e.join("&").replace(xb, "+")
    };
    var Cb, Db, Eb = ha.now(), Fb = /\?/, Gb = /#.*$/, Hb = /([?&])_=[^&]*/, Ib = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Jb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Kb = /^(?:GET|HEAD)$/, Lb = /^\/\//, Mb = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Nb = ha.fn.load, Ob = {}, Pb = {}, Qb = "*/".concat("*");
    try {
        Db = W.href
    } catch (Rb) {
        Db = V.createElement("a"), Db.href = "", Db = Db.href
    }
    Cb = Mb.exec(Db.toLowerCase()) || [], ha.fn.load = function(a, c, d) {
        if ("string" != typeof a && Nb)
            return Nb.apply(this, arguments);
        var e, f, g, h = this, i = a.indexOf(" ");
        return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), ha.isFunction(c) ? (d = c, c = b) : c && "object" == typeof c && (f = "POST"), h.length > 0 && ha.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: c
        }).done(function(a) {
            g = arguments, h.html(e ? ha("<div>").append(ha.parseHTML(a)).find(e) : a)
        }).complete(d && function(a, b) {
            h.each(d, g || [a.responseText, b, a])
        }), this
    }, ha.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        ha.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), ha.each(["get", "post"], function(a, c) {
        ha[c] = function(a, d, e, f) {
            return ha.isFunction(d) && (f = f || e, e = d, d = b), ha.ajax({
                url: a,
                type: c,
                dataType: f,
                data: d,
                success: e
            })
        }
    }), ha.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Db,
            type: "GET",
            isLocal: Jb.test(Cb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Qb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": ha.parseJSON,
                "text xml": ha.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? G(G(a, ha.ajaxSettings), b) : G(ha.ajaxSettings, a)
        },
        ajaxPrefilter: E(Ob),
        ajaxTransport: E(Pb),
        ajax: function(a, c) {
            function d(a, c, d, h) {
                var j, l, s, t, v, x = c;
                2 !== u && (u = 2, i && clearTimeout(i), e = b, g = h || "", w.readyState = a > 0 ? 4 : 0, d && (t = H(m, w, d)), a >= 200 && 300 > a || 304 === a ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && (ha.lastModified[f] = v), v = w.getResponseHeader("etag"), v && (ha.etag[f] = v)), 304 === a ? (j=!0, x = "notmodified") : (j = I(m, t), x = j.state, l = j.data, s = j.error, j=!s)) : (s = x, (a ||!x) && (x = "error", 0 > a && (a = 0))), w.status = a, w.statusText = (c || x) + "", j ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, k && o.trigger(j ? "ajaxSuccess" : "ajaxError", [w, m, j ? l: s]), q.fireWith(n, [w, x]), k && (o.trigger("ajaxComplete", [w, m]), --ha.active || ha.event.trigger("ajaxStop")))
            }
            "object" == typeof a && (c = a, a = b), c = c || {};
            var e, f, g, h, i, j, k, l, m = ha.ajaxSetup({}, c), n = m.context || m, o = m.context && (n.nodeType || n.jquery) ? ha(n): ha.event, p = ha.Deferred(), q = ha.Callbacks("once memory"), r = m.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === u) {
                        if (!h)
                            for (h = {}; b = Ib.exec(g);)
                                h[b[1].toLowerCase()] = b[2];
                        b = h[a.toLowerCase()]
                    }
                    return null == b ? null : b
                },
                getAllResponseHeaders: function() {
                    return 2 === u ? g : null
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return u || (a = t[c] = t[c] || a, s[a] = b), this
                },
                overrideMimeType: function(a) {
                    return u || (m.mimeType = a), this
                },
                statusCode: function(a) {
                    var b;
                    if (a)
                        if (2 > u)
                            for (b in a)
                                r[b] = [r[b], a[b]];
                        else 
                            w.always(a[w.status]);
                    return this
                },
                abort: function(a) {
                    var b = a || v;
                    return e && e.abort(b), d(0, b), this
                }
            };
            if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ((a || m.url || Db) + "").replace(Gb, "").replace(Lb, Cb[1] + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = ha.trim(m.dataType || "*").toLowerCase().match(ja) || [""], null == m.crossDomain && (j = Mb.exec(m.url.toLowerCase()), m.crossDomain=!(!j || j[1] === Cb[1] && j[2] === Cb[2] && (j[3] || ("http:" === j[1] ? 80 : 443)) == (Cb[3] || ("http:" === Cb[1] ? 80 : 443)))), m.data && m.processData && "string" != typeof m.data && (m.data = ha.param(m.data, m.traditional)), F(Ob, m, c, w), 2 === u)
                return w;
            k = m.global, k && 0 === ha.active++&&ha.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent=!Kb.test(m.type), f = m.url, m.hasContent || (m.data && (f = m.url += (Fb.test(f) ? "&" : "?") + m.data, delete m.data), m.cache===!1 && (m.url = Hb.test(f) ? f.replace(Hb, "$1_=" + Eb++) : f + (Fb.test(f) ? "&" : "?") + "_=" + Eb++)), m.ifModified && (ha.lastModified[f] && w.setRequestHeader("If-Modified-Since", ha.lastModified[f]), ha.etag[f] && w.setRequestHeader("If-None-Match", ha.etag[f])), (m.data && m.hasContent && m.contentType!==!1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Qb + "; q=0.01" : "") : m.accepts["*"]);
            for (l in m.headers)
                w.setRequestHeader(l, m.headers[l]);
            if (m.beforeSend && (m.beforeSend.call(n, w, m)===!1 || 2 === u))
                return w.abort();
            v = "abort";
            for (l in{
                success: 1,
                error: 1,
                complete: 1
            })
                w[l](m[l]);
            if (e = F(Pb, m, c, w)) {
                w.readyState = 1, k && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function() {
                    w.abort("timeout")
                }, m.timeout));
                try {
                    u = 1, e.send(s, d)
                } catch (x) {
                    if (!(2 > u))
                        throw x;
                    d( - 1, x)
                }
            } else 
                d( - 1, "No Transport");
            return w
        },
        getScript: function(a, c) {
            return ha.get(a, b, c, "script")
        },
        getJSON: function(a, b, c) {
            return ha.get(a, b, c, "json")
        }
    }), ha.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return ha.globalEval(a), a
            }
        }
    }), ha.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache=!1), a.crossDomain && (a.type = "GET", a.global=!1)
    }), ha.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var c, d = V.head || ha("head")[0] || V.documentElement;
            return {
                send: function(b, e) {
                    c = V.createElement("script"), c.async=!0, a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function(a, b) {
                        (b ||!c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, c.parentNode && c.parentNode.removeChild(c), c = null, b || e(200, "success"))
                    }, d.insertBefore(c, d.firstChild)
                },
                abort: function() {
                    c && c.onload(b, !0)
                }
            }
        }
    });
    var Sb = [], Tb = /(=)\?(?=&|$)|\?\?/;
    ha.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Sb.pop() || ha.expando + "_" + Eb++;
            return this[a]=!0, a
        }
    }), ha.ajaxPrefilter("json jsonp", function(c, d, e) {
        var f, g, h, i = c.jsonp!==!1 && (Tb.test(c.url) ? "url" : "string" == typeof c.data&&!(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Tb.test(c.data) && "data");
        return i || "jsonp" === c.dataTypes[0] ? (f = c.jsonpCallback = ha.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, i ? c[i] = c[i].replace(Tb, "$1" + f) : c.jsonp!==!1 && (c.url += (Fb.test(c.url) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function() {
            return h || ha.error(f + " was not called"), h[0]
        }, c.dataTypes[0] = "json", g = a[f], a[f] = function() {
            h = arguments
        }, e.always(function() {
            a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Sb.push(f)), h && ha.isFunction(g) && g(h[0]), h = g = b
        }), "script") : b
    });
    var Ub, Vb, Wb = 0, Xb = a.ActiveXObject && function() {
        var a;
        for (a in Ub)
            Ub[a](b, !0)
    };
    ha.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && J() || K()
    } : J, Vb = ha.ajaxSettings.xhr(), ha.support.cors=!!Vb && "withCredentials"in Vb, Vb = ha.support.ajax=!!Vb, Vb && ha.ajaxTransport(function(c) {
        if (!c.crossDomain || ha.support.cors) {
            var d;
            return {
                send: function(e, f) {
                    var g, h, i = c.xhr();
                    if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async), c.xhrFields)
                        for (h in c.xhrFields)
                            i[h] = c.xhrFields[h];
                    c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), c.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (h in e)
                            i.setRequestHeader(h, e[h])
                    } catch (j) {}
                    i.send(c.hasContent && c.data || null), d = function(a, e) {
                        var h, j, k, l, m;
                        try {
                            if (d && (e || 4 === i.readyState))
                                if (d = b, g && (i.onreadystatechange = ha.noop, Xb && delete Ub[g]), e)
                                    4 !== i.readyState && i.abort();
                                else {
                                    l = {}, h = i.status, m = i.responseXML, k = i.getAllResponseHeaders(), m && m.documentElement && (l.xml = m), "string" == typeof i.responseText && (l.text = i.responseText);
                                    try {
                                        j = i.statusText
                                    } catch (n) {
                                        j = ""
                                    }
                                    h ||!c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404
                                }
                        } catch (o) {
                            e || f( - 1, o)
                        }
                        l && f(h, j, l, k)
                    }, c.async ? 4 === i.readyState ? setTimeout(d) : (g=++Wb, Xb && (Ub || (Ub = {}, ha(a).unload(Xb)), Ub[g] = d), i.onreadystatechange = d) : d()
                },
                abort: function() {
                    d && d(b, !0)
                }
            }
        }
    });
    var Yb, Zb, $b = /^(?:toggle|show|hide)$/, _b = RegExp("^(?:([+-])=|)(" + ia + ")([a-z%]*)$", "i"), ac = /queueHooks$/, bc = [P], cc = {
        "*": [function(a, b) {
            var c, d, e = this.createTween(a, b), f = _b.exec(b), g = e.cur(), h =+ g || 0, i = 1, j = 20;
            if (f) {
                if (c =+ f[2], d = f[3] || (ha.cssNumber[a] ? "" : "px"), "px" !== d && h) {
                    h = ha.css(e.elem, a, !0) || c || 1;
                    do 
                        i = i || ".5", h/=i, ha.style(e.elem, a, h + d);
                    while (i !== (i = e.cur() / g) && 1 !== i&&--j)
                    }
                e.unit = d, e.start = h, e.end = f[1] ? h + (f[1] + 1) * c : c
            }
            return e
        }
        ]
    };
    ha.Animation = ha.extend(N, {
        tweener: function(a, b) {
            ha.isFunction(a) ? (b = a, a = ["*"]): a = a.split(" ");
            for (var c,
            d = 0,
            e = a.length;
            e > d;
            d++)c = a[d],
            cc[c] = cc[c] || [],
            cc[c].unshift(b)
        }, prefilter : function(a, b) {
            b ? bc.unshift(a) : bc.push(a)
        }
    }), ha.Tween = Q, Q.prototype = {
        constructor: Q,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (ha.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = Q.propHooks[this.prop];
            return a && a.get ? a.get(this) : Q.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = Q.propHooks[this.prop];
            return this.pos = b = this.options.duration ? ha.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Q.propHooks._default.set(this), this
        }
    }, Q.prototype.init.prototype = Q.prototype, Q.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = ha.css(a.elem, a.prop, "auto"), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                ha.fx.step[a.prop] ? ha.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[ha.cssProps[a.prop]] || ha.cssHooks[a.prop]) ? ha.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, Q.propHooks.scrollTop = Q.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, ha.each(["toggle", "show", "hide"], function(a, b) {
        var c = ha.fn[b];
        ha.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(R(b, !0), a, d, e)
        }
    }), ha.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(w).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            var e = ha.isEmptyObject(a), f = ha.speed(b, c, d), g = function() {
                var b = N(this, ha.extend({}, a), f);
                g.finish = function() {
                    b.stop(!0)
                }, (e || ha._data(this, "finish")) && b.stop(!0)
            };
            return g.finish = g, e || f.queue===!1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function(a, c, d) {
            var e = function(a) {
                var b = a.stop;
                delete a.stop, b(d)
            };
            return "string" != typeof a && (d = c, c = a, a = b), c && a!==!1 && this.queue(a || "fx", []), this.each(function() {
                var b=!0, c = null != a && a + "queueHooks", f = ha.timers, g = ha._data(this);
                if (c)
                    g[c] && g[c].stop && e(g[c]);
                else 
                    for (c in g)
                        g[c] && g[c].stop && ac.test(c) && e(g[c]);
                for (c = f.length; c--;)
                    f[c].elem !== this || null != a && f[c].queue !== a || (f[c].anim.stop(d), b=!1, f.splice(c, 1));
                (b ||!d) && ha.dequeue(this, a)
            })
        },
        finish: function(a) {
            return a!==!1 && (a = a || "fx"), this.each(function() {
                var b, c = ha._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = ha.timers, g = d ? d.length: 0;
                for (c.finish=!0, ha.queue(this, a, []), e && e.cur && e.cur.finish && e.cur.finish.call(this), b = f.length; b--;)
                    f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++)
                    d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }), ha.each({
        slideDown: R("show"),
        slideUp: R("hide"),
        slideToggle: R("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        ha.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), ha.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? ha.extend({}, a): {
            complete: c ||!c && b || ha.isFunction(a) && a,
            duration: a,
            easing: c && b || b&&!ha.isFunction(b) && b
        };
        return d.duration = ha.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in ha.fx.speeds ? ha.fx.speeds[d.duration] : ha.fx.speeds._default, (null == d.queue || d.queue===!0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            ha.isFunction(d.old) && d.old.call(this), d.queue && ha.dequeue(this, d.queue)
        }, d
    }, ha.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, ha.timers = [], ha.fx = Q.prototype.init, ha.fx.tick = function() {
        var a, c = ha.timers, d = 0;
        for (Yb = ha.now(); c.length > d; d++)
            a = c[d], a() || c[d] !== a || c.splice(d--, 1);
        c.length || ha.fx.stop(), Yb = b
    }, ha.fx.timer = function(a) {
        a() && ha.timers.push(a) && ha.fx.start()
    }, ha.fx.interval = 13, ha.fx.start = function() {
        Zb || (Zb = setInterval(ha.fx.tick, ha.fx.interval))
    }, ha.fx.stop = function() {
        clearInterval(Zb), Zb = null
    }, ha.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, ha.fx.step = {}, ha.expr && ha.expr.filters && (ha.expr.filters.animated = function(a) {
        return ha.grep(ha.timers, function(b) {
            return a === b.elem
        }).length
    }), ha.fn.offset = function(a) {
        if (arguments.length)
            return a === b ? this : this.each(function(b) {
                ha.offset.setOffset(this, a, b)
            });
        var c, d, e = {
            top: 0,
            left: 0
        }, f = this[0], g = f && f.ownerDocument;
        return g ? (c = g.documentElement, ha.contains(c, f) ? (f.getBoundingClientRect !== b && (e = f.getBoundingClientRect()), d = S(g), {
            top: e.top + (d.pageYOffset || c.scrollTop) - (c.clientTop || 0),
            left: e.left + (d.pageXOffset || c.scrollLeft) - (c.clientLeft || 0)
        }) : e) : void 0
    }, ha.offset = {
        setOffset: function(a, b, c) {
            var d = ha.css(a, "position");
            "static" === d && (a.style.position = "relative");
            var e, f, g = ha(a), h = g.offset(), i = ha.css(a, "top"), j = ha.css(a, "left"), k = ("absolute" === d || "fixed" === d) && ha.inArray("auto", [i, j])>-1, l = {}, m = {};
            k ? (m = g.position(), e = m.top, f = m.left) : (e = parseFloat(i) || 0, f = parseFloat(j) || 0), ha.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (l.top = b.top - h.top + e), null != b.left && (l.left = b.left - h.left + f), "using"in b ? b.using.call(a, l) : g.css(l)
        }
    }, ha.fn.extend({
        position: function() {
            if (this[0]) {
                var a, b, c = {
                    top: 0,
                    left: 0
                }, d = this[0];
                return "fixed" === ha.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), ha.nodeName(a[0], "html") || (c = a.offset()), c.top += ha.css(a[0], "borderTopWidth", !0), c.left += ha.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - ha.css(d, "marginTop", !0),
                    left: b.left - c.left - ha.css(d, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || V.documentElement; a&&!ha.nodeName(a, "html") && "static" === ha.css(a, "position");)
                    a = a.offsetParent;
                return a || V.documentElement
            })
        }
    }), ha.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, c) {
        var d = /Y/.test(c);
        ha.fn[a] = function(e) {
            return ha.access(this, function(a, e, f) {
                var g = S(a);
                return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : (g ? g.scrollTo(d ? ha(g).scrollLeft() : f, d ? f : ha(g).scrollTop()) : a[e] = f, b)
            }, a, e, arguments.length, null)
        }
    }), ha.each({
        Height: "height",
        Width: "width"
    }, function(a, c) {
        ha.each({
            padding: "inner" + a,
            content: c,
            "": "outer" + a
        }, function(d, e) {
            ha.fn[e] = function(e, f) {
                var g = arguments.length && (d || "boolean" != typeof e), h = d || (e===!0 || f===!0 ? "margin" : "border");
                return ha.access(this, function(c, d, e) {
                    var f;
                    return ha.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? ha.css(c, d, h) : ha.style(c, d, e, h)
                }, c, g ? e : b, g, null)
            }
        })
    }), a.jQuery = a.$ = ha, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return ha
    })
}(window), function(a) {
    "use strict";
    function b(a) {
        return new RegExp("(^|\\s+)" + a + "(\\s+|$)")
    }
    function c(a, b) {
        var c = d(a, b) ? f: e;
        c(a, b)
    }
    var d, e, f;
    "classList"in document.documentElement ? (d = function(a, b) {
        return a.classList.contains(b)
    }, e = function(a, b) {
        a.classList.add(b)
    }, f = function(a, b) {
        a.classList.remove(b)
    }) : (d = function(a, c) {
        return b(c).test(a.className)
    }, e = function(a, b) {
        d(a, b) || (a.className = a.className + " " + b)
    }, f = function(a, c) {
        a.className = a.className.replace(b(c), " ")
    });
    var g = {
        hasClass: d,
        addClass: e,
        removeClass: f,
        toggleClass: c,
        has: d,
        add: e,
        remove: f,
        toggle: c
    };
    "function" == typeof define && define.amd ? define(g) : a.classie = g
}(window), function(a) {
    "use strict";
    function b(a, b) {
        for (var c in b)
            b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }
    function c(a, c) {
        this.el = a, this.options = b({}, this.options), b(this.options, c), this.ctrlClose = this.el.querySelector("[data-dialog-close]"), this.isOpen=!1, this._initEvents()
    }
    var d = {
        animations: Modernizr.cssanimations
    }, e = {
        WebkitAnimation: "webkitAnimationEnd",
        OAnimation: "oAnimationEnd",
        msAnimation: "MSAnimationEnd",
        animation: "animationend"
    }, f = e[Modernizr.prefixed("animation")], g = function(a, b) {
        var c = function(a) {
            if (d.animations) {
                if (a.target != this)
                    return;
                this.removeEventListener(f, c)
            }
            b && "function" == typeof b && b.call()
        };
        d.animations ? a.addEventListener(f, c) : c()
    };
    c.prototype.options = {
        onOpenDialog: function() {
            return !1
        },
        onCloseDialog: function() {
            return !1
        }
    }, c.prototype._initEvents = function() {
        var a = this;
        this.ctrlClose.addEventListener("click", this.toggle.bind(this)), document.addEventListener("keydown", function(b) {
            var c = b.keyCode || b.which;
            27 === c && a.isOpen && a.toggle()
        }), this.el.querySelector(".dialog__overlay").addEventListener("click", this.toggle.bind(this))
    }, c.prototype.toggle = function() {
        var a = this;
        this.isOpen ? (classie.remove(this.el, "dialog--open"), classie.add(a.el, "dialog--close"), g(this.el.querySelector(".dialog__content"), function() {
            classie.remove(a.el, "dialog--close")
        }), this.options.onCloseDialog(this)) : (classie.add(this.el, "dialog--open"), this.options.onOpenDialog(this)), this.isOpen=!this.isOpen
    }, a.DialogFx = c
}(window), "undefined" == typeof console && (this.console = {
    log: function() {}
}), $(window).load(function() {
    $(".loading").fadeOut()
}), setTimeout(function() {
    $(".loading").fadeOut()
}, 5e3), $(function() {
    Modernizr.touch || $(".underline").attr("href", "javascript:;")
});
var resizeTimer = null;
$(window).resize(function() {
    resizeTimer && clearTimeout(resizeTimer), resizeTimer = setTimeout(align_content, 2e3)
});
var isLocal = function() {
    return null != location.href.match(/localhost/)?!0 : void 0
}, canvas, ctx, circles, tick = 0, numCircles = 150;
if ($(window).width() < 1100)
    var numCircles = 100;
if ($(window).width() < 600)
    var numCircles = 50;
var colors = ["#f4705d","#f47b69","#f48576","#f49082","#f59e91","#f6aca2"], randomColor = function() {
    return colors[Math.floor(Math.random() * colors.length)]
}, resize = window.resize = function() {
    canvas.height = $(window).height(), canvas.width = $(window).width()
};
$(window).load(function() {
    canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d"), resize(), circles = [];
    for (var a = 0; numCircles > a; a++) {
        var b = Math.random() * canvas.width, c = Math.random() * canvas.height, d = new Circle(b, c, canvas.width, canvas.height);
        d.draw(), circles.push(d)
    }
    var e = function() {
        window.requestAnimFrame(e), ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var a = 0; a < circles.length; a++)
            circles[a].frame()
    };
    window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
            window.setTimeout(a, 1e3 / 60)
        }
    }(), e()
});
var Circle = function(a, b) {
    this.pos = [a, b], this.r = 	2 * Math.random() + 1, this.c = randomColor(), this.v = [.1 * (Math.random() - .5), .1* (Math.random() - .5)]
};
Circle.prototype.getBound = function(a) {
    return a ? canvas.height : canvas.width
};
var i;
Circle.prototype.frame = function() {
    for (i = 0; 2 > i; i++)
        this.pos[i] > this.getBound(i) - 10 ? this.v[i]*=-1 : this.pos[i] < 10 && (this.v[i]*=-1), this.pos[i] += 3* this.v[i] ;
    this.draw()
}, Circle.prototype.draw = function() {
    ctx.fillStyle = this.c, ctx.beginPath(), ctx.arc(this.pos[0], this.pos[1], this.r, 0, 2 * Math.PI, !1), ctx.fill()
}, jQuery(document).ready(function(a) {
    function b() {
        c(a(".cd-headline.letters").find("b")), d(a(".cd-headline"))
    }
    function c(b) {
        b.each(function() {
            var b = a(this), c = b.text().split(""), d = b.hasClass("is-visible");
            for (i in c)
                b.parents(".rotate-2").length > 0 && (c[i] = "<em>" + c[i] + "</em>"), c[i] = d ? '<i class="in">' + c[i] + "</i>" : "<i>" + c[i] + "</i>";
            var e = c.join("");
            b.html(e).css("opacity", 1)
        })
    }
    function d(b) {
        var c = l;
        b.each(function() {
            var b = a(this);
            if (b.hasClass("loading-bar"))
                c = m, setTimeout(function() {
                    b.find(".cd-words-wrapper").addClass("is-loading")
                }, n);
            else if (b.hasClass("clip")) {
                var d = b.find(".cd-words-wrapper"), f = d.width() + 10;
                d.css("width", f)
            } else if (!b.hasClass("type")) {
                var g = b.find(".cd-words-wrapper b"), h = 0;
                g.each(function() {
                    var b = a(this).width();
                    b > h && (h = b)
                }), b.find(".cd-words-wrapper").css("width", h)
            }
            setTimeout(function() {
                e(b.find(".is-visible").eq(0))
            }, c)
        })
    }
    function e(a) {
        var b = j(a);
        if (a.parents(".cd-headline").hasClass("type")) {
            var c = a.parent(".cd-words-wrapper");
            c.addClass("selected").removeClass("waiting"), setTimeout(function() {
                c.removeClass("selected"), a.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out")
            }, q), setTimeout(function() {
                f(b, p)
            }, r)
        } else if (a.parents(".cd-headline").hasClass("letters")) {
            var d = a.children("i").length >= b.children("i").length?!0 : !1;
            g(a.find("i").eq(0), a, d, o), h(b.find("i").eq(0), b, d, o)
        } else 
            a.parents(".cd-headline").hasClass("clip") ? a.parents(".cd-words-wrapper").animate({
                width: "2px"
            }, s, function() {
                k(a, b), f(b)
            }) : a.parents(".cd-headline").hasClass("loading-bar") ? (a.parents(".cd-words-wrapper").removeClass("is-loading"), k(a, b), setTimeout(function() {
                e(b)
            }, m), setTimeout(function() {
                a.parents(".cd-words-wrapper").addClass("is-loading")
            }, n)) : (k(a, b), setTimeout(function() {
                e(b)
            }, l))
    }
    function f(a, b) {
        a.parents(".cd-headline").hasClass("type") ? (h(a.find("i").eq(0), a, !1, b), a.addClass("is-visible").removeClass("is-hidden")) : a.parents(".cd-headline").hasClass("clip") && a.parents(".cd-words-wrapper").animate({
            width: a.width() + 10
        }, s, function() {
            setTimeout(function() {
                e(a)
            }, t)
        })
    }
    function g(b, c, d, f) {
        if (b.removeClass("in").addClass("out"), b.is(":last-child") ? d && setTimeout(function() {
            e(j(c))
        }, l) : setTimeout(function() {
            g(b.next(), c, d, f)
        }, f), b.is(":last-child") && a("html").hasClass("no-csstransitions")) {
            var h = j(c);
            k(c, h)
        }
    }
    function h(a, b, c, d) {
        a.addClass("in").removeClass("out"), a.is(":last-child") ? (b.parents(".cd-headline").hasClass("type") && setTimeout(function() {
            b.parents(".cd-words-wrapper").addClass("waiting")
        }, 200), c || setTimeout(function() {
            e(b)
        }, l)) : setTimeout(function() {
            h(a.next(), b, c, d)
        }, d)
    }
    function j(a) {
        return a.is(":last-child") ? a.parent().children().eq(0) : a.next()
    }
    function k(a, b) {
        a.removeClass("is-visible").addClass("is-hidden"), b.removeClass("is-hidden").addClass("is-visible")
    }
    var l = 4500, m = 3800, n = m - 3e3, o = 50, p = 150, q = 500, r = q + 800, s = 600, t = 1500;
    b()
}), function() {
    var a = $("#canvas"), b = a.height(), c = document.getElementById("container"), d = document.querySelector("[data-dialog]"), e = document.getElementById(d.getAttribute("data-dialog")), f = new DialogFx(e, {
        onOpenDialog: function() {
            console.log(d.getAttribute("dialog-href")), classie.add(c, "container--move"), a.height(b - 1)
        },
        onCloseDialog: function() {
            classie.remove(c, "container--move"), setTimeout(function() {
                a.height(b)
            }, 1e3)
        }
    });
    Modernizr.touch || $(".trigger").click(f.toggle.bind(f)), $(".trigger").on("click", function() {
        $(".dialog-sub").hide(), $("." + $(this).attr("dialog-href")).show()
    })
}();

