import { resolveDirective as F, withDirectives as V, openBlock as l, createElementBlock as r, normalizeClass as v, createCommentVNode as f, renderSlot as w, createTextVNode as $, toDisplayString as g, mergeProps as L, toHandlers as Q, watch as Le, ref as N, getCurrentScope as _s, onScopeDispose as ws, unref as E, createVNode as C, Transition as fe, withCtx as S, createElementVNode as c, resolveComponent as y, Fragment as B, createBlock as _, Teleport as ks, withModifiers as q, normalizeStyle as P, vShow as ee, renderList as M, pushScopeId as te, popScopeId as se, inject as Y, defineComponent as Mt, computed as Ce, resolveDynamicComponent as He, shallowReactive as re, markRaw as We, reactive as ke, h as H, vModelSelect as ct, createStaticVNode as Ss, vModelText as Pt, normalizeProps as ze, guardReactiveProps as Ne, withKeys as me, onMounted as xt, vModelRadio as ht, onUnmounted as Cs, createSlots as Is, render as Ke } from "vue";
const ge = {
  props: {
    color: {
      type: String,
      default: () => "default"
    }
  }
}, D = {
  props: {
    disabled: {
      type: Boolean,
      default: () => !1
    }
  }
}, I = (e, s) => {
  const t = e.__vccOpts || e;
  for (const [i, o] of s)
    t[i] = o;
  return t;
}, Bs = {
  name: "vu-badge",
  mixins: [ge, D],
  emits: ["close", "selected", "update:modelValue"],
  props: {
    value: {
      type: Boolean,
      default: () => {
      }
    },
    text: {
      type: String,
      default: () => ""
    },
    icon: {
      type: String,
      default: () => ""
    },
    selectable: {
      type: Boolean,
      default: () => !1
    },
    togglable: {
      type: Boolean,
      default: () => !0
    },
    closable: {
      type: Boolean,
      default: () => !1
    }
  },
  data() {
    return {
      isSelected: !1
    };
  },
  computed: {
    classes() {
      return [
        "vu-badge",
        `badge-root badge badge-${this.color}`,
        {
          "badge-closable": this.closable,
          "badge-selectable": this.selectable,
          disabled: this.disabled,
          "badge-selected": this.isSelected || this.value
        }
      ];
    },
    iconClasses() {
      return `fonticon fonticon-${this.icon} badge-icon`;
    },
    showContent() {
      return typeof this.$slots.default == "function" || this.text;
    }
  },
  methods: {
    onClickOutside() {
      this.selectable && this.value === void 0 && this.togglable && (this.isSelected = !1);
    },
    selectBadge() {
      this.selectable && (this.value === void 0 && (this.isSelected = this.togglable ? !this.isSelected : !0), this.$emit("selected", this.isSelected), this.$emit("update:modelValue", this.isSelected));
    }
  }
}, Os = {
  key: 1,
  class: "badge-content"
};
function Vs(e, s, t, i, o, n) {
  const a = F("click-outside");
  return V((l(), r("span", {
    class: v(n.classes),
    onClick: s[1] || (s[1] = (d) => n.selectBadge(d))
  }, [
    t.icon ? (l(), r("span", {
      key: 0,
      class: v(n.iconClasses)
    }, null, 2)) : f("", !0),
    n.showContent ? (l(), r("span", Os, [
      w(e.$slots, "default", {}, () => [
        $(g(t.text), 1)
      ], !0)
    ])) : f("", !0),
    t.closable ? (l(), r("span", {
      key: 2,
      class: "fonticon fonticon-cancel",
      onClick: s[0] || (s[0] = (d) => e.$emit("close"))
    })) : f("", !0)
  ], 2)), [
    [a, {
      handler: n.onClickOutside,
      events: ["click"]
    }]
  ]);
}
const Ge = /* @__PURE__ */ I(Bs, [["render", Vs], ["__scopeId", "data-v-adf3135b"]]), $s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ge
}, Symbol.toStringTag, { value: "Module" })), Ms = /^on[^a-z]/, Ps = (e) => Ms.test(e), J = (e, s) => {
  const t = {};
  for (const i in e)
    Ps(i) && (t[s ? i[2].toLowerCase() + i.slice(3) : i] = e[i]);
  return t;
}, xs = {
  name: "vu-icon",
  mixins: [ge],
  data: () => ({
    getListenersFromAttrs: J
  }),
  props: {
    icon: {
      required: !0,
      type: String
    },
    withinText: {
      default: !0,
      type: Boolean
    }
  }
};
function Ls(e, s, t, i, o, n) {
  return l(), r("span", L({
    class: ["vu-icon fonticon", [t.withinText ? "fonticon-within-text" : "", `fonticon-${t.icon}`, `${e.color}`]]
  }, Q(e.getListenersFromAttrs(e.$attrs), !0)), null, 16);
}
const A = /* @__PURE__ */ I(xs, [["render", Ls], ["__scopeId", "data-v-5f019d76"]]), Ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: A
}, Symbol.toStringTag, { value: "Module" }));
var x = {}, W, K;
function Ee() {
  throw new Error("setTimeout has not been defined");
}
function je() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? W = setTimeout : W = Ee;
  } catch {
    W = Ee;
  }
  try {
    typeof clearTimeout == "function" ? K = clearTimeout : K = je;
  } catch {
    K = je;
  }
})();
function Lt(e) {
  if (W === setTimeout)
    return setTimeout(e, 0);
  if ((W === Ee || !W) && setTimeout)
    return W = setTimeout, setTimeout(e, 0);
  try {
    return W(e, 0);
  } catch {
    try {
      return W.call(null, e, 0);
    } catch {
      return W.call(this, e, 0);
    }
  }
}
function As(e) {
  if (K === clearTimeout)
    return clearTimeout(e);
  if ((K === je || !K) && clearTimeout)
    return K = clearTimeout, clearTimeout(e);
  try {
    return K(e);
  } catch {
    try {
      return K.call(null, e);
    } catch {
      return K.call(this, e);
    }
  }
}
var X = [], ce = !1, oe, $e = -1;
function Fs() {
  !ce || !oe || (ce = !1, oe.length ? X = oe.concat(X) : $e = -1, X.length && Tt());
}
function Tt() {
  if (!ce) {
    var e = Lt(Fs);
    ce = !0;
    for (var s = X.length; s; ) {
      for (oe = X, X = []; ++$e < s; )
        oe && oe[$e].run();
      $e = -1, s = X.length;
    }
    oe = null, ce = !1, As(e);
  }
}
x.nextTick = function(e) {
  var s = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var t = 1; t < arguments.length; t++)
      s[t - 1] = arguments[t];
  X.push(new At(e, s)), X.length === 1 && !ce && Lt(Tt);
};
function At(e, s) {
  this.fun = e, this.array = s;
}
At.prototype.run = function() {
  this.fun.apply(null, this.array);
};
x.title = "browser";
x.browser = !0;
x.env = {};
x.argv = [];
x.version = "";
x.versions = {};
function Z() {
}
x.on = Z;
x.addListener = Z;
x.once = Z;
x.off = Z;
x.removeListener = Z;
x.removeAllListeners = Z;
x.emit = Z;
x.prependListener = Z;
x.prependOnceListener = Z;
x.listeners = function(e) {
  return [];
};
x.binding = function(e) {
  throw new Error("process.binding is not supported");
};
x.cwd = function() {
  return "/";
};
x.chdir = function(e) {
  throw new Error("process.chdir is not supported");
};
x.umask = function() {
  return 0;
};
function Ds(e) {
  return _s() ? (ws(e), !0) : !1;
}
function Ie(e) {
  return typeof e == "function" ? e() : E(e);
}
const Ft = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const zs = Object.prototype.toString, Ns = (e) => zs.call(e) === "[object Object]", Es = () => +Date.now(), he = () => {
}, js = /* @__PURE__ */ Rs();
function Rs() {
  var e, s;
  return Ft && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || ((s = window == null ? void 0 : window.navigator) == null ? void 0 : s.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Us(e, s) {
  function t(...i) {
    return new Promise((o, n) => {
      Promise.resolve(e(() => s.apply(this, i), { fn: s, thisArg: this, args: i })).then(o).catch(n);
    });
  }
  return t;
}
function qs(e, s = {}) {
  let t, i, o = he;
  const n = (d) => {
    clearTimeout(d), o(), o = he;
  };
  return (d) => {
    const u = Ie(e), m = Ie(s.maxWait);
    return t && n(t), u <= 0 || m !== void 0 && m <= 0 ? (i && (n(i), i = null), Promise.resolve(d())) : new Promise((h, p) => {
      o = s.rejectOnCancel ? p : h, m && !i && (i = setTimeout(() => {
        t && n(t), i = null, h(d());
      }, m)), t = setTimeout(() => {
        i && n(i), i = null, h(d());
      }, u);
    });
  };
}
function ft(e, s = 200, t = {}) {
  return Us(
    qs(s, t),
    e
  );
}
function Hs(e, s = {}) {
  var t;
  const i = N((t = s.initialValue) != null ? t : null);
  return Le(
    e,
    () => i.value = Es(),
    s
  ), i;
}
function Ws(e, s, t) {
  return Le(
    e,
    (i, o, n) => {
      i && s(i, o, n);
    },
    t
  );
}
function _e(e) {
  var s;
  const t = Ie(e);
  return (s = t == null ? void 0 : t.$el) != null ? s : t;
}
const Ye = Ft ? window : void 0;
function Me(...e) {
  let s, t, i, o;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([t, i, o] = e, s = Ye) : [s, t, i, o] = e, !s)
    return he;
  Array.isArray(t) || (t = [t]), Array.isArray(i) || (i = [i]);
  const n = [], a = () => {
    n.forEach((h) => h()), n.length = 0;
  }, d = (h, p, b, k) => (h.addEventListener(p, b, k), () => h.removeEventListener(p, b, k)), u = Le(
    () => [_e(s), Ie(o)],
    ([h, p]) => {
      if (a(), !h)
        return;
      const b = Ns(p) ? { ...p } : p;
      n.push(
        ...t.flatMap((k) => i.map((O) => d(h, k, O, b)))
      );
    },
    { immediate: !0, flush: "post" }
  ), m = () => {
    u(), a();
  };
  return Ds(m), m;
}
let mt = !1;
function Ks(e, s, t = {}) {
  const { window: i = Ye, ignore: o = [], capture: n = !0, detectIframe: a = !1 } = t;
  if (!i)
    return he;
  js && !mt && (mt = !0, Array.from(i.document.body.children).forEach((b) => b.addEventListener("click", he)), i.document.documentElement.addEventListener("click", he));
  let d = !0;
  const u = (b) => o.some((k) => {
    if (typeof k == "string")
      return Array.from(i.document.querySelectorAll(k)).some((O) => O === b.target || b.composedPath().includes(O));
    {
      const O = _e(k);
      return O && (b.target === O || b.composedPath().includes(O));
    }
  }), h = [
    Me(i, "click", (b) => {
      const k = _e(e);
      if (!(!k || k === b.target || b.composedPath().includes(k))) {
        if (b.detail === 0 && (d = !u(b)), !d) {
          d = !0;
          return;
        }
        s(b);
      }
    }, { passive: !0, capture: n }),
    Me(i, "pointerdown", (b) => {
      const k = _e(e);
      d = !u(b) && !!(k && !b.composedPath().includes(k));
    }, { passive: !0 }),
    a && Me(i, "blur", (b) => {
      setTimeout(() => {
        var k;
        const O = _e(e);
        ((k = i.document.activeElement) == null ? void 0 : k.tagName) === "IFRAME" && !(O != null && O.contains(i.document.activeElement)) && s(b);
      }, 0);
    })
  ].filter(Boolean);
  return () => h.forEach((b) => b());
}
function Gs(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (s) => s.key === e : Array.isArray(e) ? (s) => e.includes(s.key) : () => !0;
}
function Oe(...e) {
  let s, t, i = {};
  e.length === 3 ? (s = e[0], t = e[1], i = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (s = !0, t = e[0], i = e[1]) : (s = e[0], t = e[1]) : (s = !0, t = e[0]);
  const {
    target: o = Ye,
    eventName: n = "keydown",
    passive: a = !1,
    dedupe: d = !1
  } = i, u = Gs(s);
  return Me(o, n, (h) => {
    h.repeat && Ie(d) || u(h) && t(h);
  }, a);
}
const ve = {
  props: {
    show: { type: [Boolean, Object], default: !1 }
  },
  emits: ["update:show"],
  data() {
    return {
      innerShow: !1
    };
  },
  watch: {
    show: {
      immediate: !0,
      handler(e) {
        this.innerShow = !!e;
      }
    },
    innerShow(e) {
      !!e !== this.show && this.$emit("update:show", e);
    }
  }
}, Xe = (e) => {
  const s = typeof e;
  return s === "boolean" || s === "string" ? !0 : e.nodeType === Node.ELEMENT_NODE;
}, Je = {
  name: "detachable",
  props: {
    attach: {
      default: () => !1,
      validator: Xe
    },
    contentClass: {
      type: [String, Object],
      default: ""
    },
    contentStyle: {
      type: [String, Object],
      default: () => ""
    }
  },
  data: () => ({
    hasDetached: !1,
    // the final value of renderTo
    target: null
  }),
  inject: {
    vuDebug: {
      default: !0
    }
  },
  watch: {
    attach() {
      this.hasDetached = !1, this.initDetach();
    }
  },
  mounted() {
    this.initDetach();
  },
  methods: {
    initDetach() {
      if (this._isDestroyed || this.hasDetached || this.attach === "" || this.attach === !0 || this.attach === "attach")
        return;
      let e;
      if (this.attach ? typeof this.attach == "string" ? e = document.querySelector(this.attach) : e = this.attach : e = document.body, !e) {
        this.vuDebug && console.warn(`Unable to locate target ${this.attach}`, this);
        return;
      }
      this.vuDebug && e.tagName.toLowerCase() !== "body" && window.getComputedStyle(e).position !== "relative" && console.warn(`target (${e.tagName.toLowerCase()}${e.id && ` #${e.id}`}${e.className && ` .${e.className}`}) element should have a relative position`), this.target = e, this.hasDetached = !0;
    }
  }
}, Ze = (e, s, t, i = { width: 0, x: 0, y: 0 }, { scrollTop: o = 0, scrollLeft: n = 0 } = {}, a = !1, d = { left: 2, right: 2, top: 0, bottom: 0 }, u = { x: 0, y: 0 }) => {
  let m = s.y - i.y + o + (u.y || 0), h = s.x - i.x + n + (u.x || 0);
  isNaN(s.width) && (s.width = 0), isNaN(s.height) && (s.height = 0), /-right/.test(e) ? h += s.width - t.width : /^(top|bottom)$/.test(e) && (h += s.width / 2 - t.width / 2), /^bottom/.test(e) ? m += s.height : /^(left|right)(-top|-bottom)?$/.test(e) ? (h -= t.width, /^(right|right-\w{3,6})$/.test(e) && (h += s.width + t.width), /(-top|-bottom)/.test(e) ? /-bottom/.test(e) && (m += s.height - t.height) : m += s.height / 2 - t.height / 2) : m -= t.height;
  let p = 0, b = 0;
  const k = s.width / 2;
  if (a) {
    const O = d.left, z = i.width - t.width - d.right, de = Math.max(O, Math.min(h, z));
    p = h - de, h = de;
  }
  return {
    left: h,
    top: m,
    shiftX: p,
    shiftY: b,
    offset: k
  };
}, Ys = {
  name: "vu-tooltip",
  mixins: [ve],
  data: () => ({
    setPosition: Ze
  }),
  props: {
    type: {
      type: String,
      default: () => "tooltip"
    },
    side: {
      type: String,
      default: () => "top"
    },
    arrow: {
      type: Boolean,
      default: !0
    },
    text: {
      type: String,
      default: () => ""
    },
    animated: {
      type: Boolean,
      default: !0
    },
    contentClass: {
      type: String,
      required: !1,
      default: ""
    },
    prerender: {
      type: Boolean,
      required: !1
    }
  }
}, Xs = ["innerHTML"];
function Js(e, s, t, i, o, n) {
  return l(), r("div", {
    ref: "content",
    class: v([`${t.side} ${t.type} ${t.type}-root`, { "without-arrow": !t.arrow }, { prerender: t.prerender }])
  }, [
    C(fe, {
      name: t.animated ? "fade" : ""
    }, {
      default: S(() => [
        e.show ? (l(), r("div", {
          key: 0,
          class: v([`${t.type}-wrapper`])
        }, [
          w(e.$slots, "arrow", { side: t.side }, () => [
            t.arrow ? (l(), r("div", {
              key: 0,
              class: v(`${t.type}-arrow`)
            }, null, 2)) : f("", !0)
          ], !0),
          w(e.$slots, "title", { side: t.side }, void 0, !0),
          c("div", {
            ref: "body",
            class: v(`${t.type}-body`)
          }, [
            t.text ? (l(), r("span", {
              key: 0,
              innerHTML: t.text
            }, null, 8, Xs)) : w(e.$slots, "default", {
              key: 1,
              side: t.side
            }, void 0, !0)
          ], 2)
        ], 2)) : f("", !0)
      ]),
      _: 3
    }, 8, ["name"])
  ], 2);
}
const Qe = /* @__PURE__ */ I(Ys, [["render", Js], ["__scopeId", "data-v-27c2f9f1"]]), Zs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qe
}, Symbol.toStringTag, { value: "Module" })), Qs = function(s, t) {
  let i, o;
  return function(...a) {
    const d = this, u = +/* @__PURE__ */ new Date();
    i && u < i + t ? (clearTimeout(o), o = setTimeout(() => {
      i = u, s.apply(d, a);
    }, t)) : (i = u, s.apply(d, a));
  };
}, en = ["top", "top-right", "right-bottom", "right", "right-top", "bottom-right", "bottom", "bottom-left", "left-top", "left", "left-bottom", "top-left"], tn = (e, s, t, i) => {
  const o = t.indexOf(e), n = t[(o + 1) % t.length];
  return i.includes(n) ? s : n;
}, sn = ({ intersectionRatio: e }) => e < 1, nn = {
  name: "vu-popover",
  mixins: [ve, Je],
  expose: ["updatePosition", "toggle"],
  emits: ["unpositionable"],
  components: { VuTooltip: Qe },
  props: {
    type: {
      type: String,
      default: "popover"
    },
    side: {
      type: String,
      default: "bottom"
    },
    arrow: {
      type: Boolean,
      default: !1
    },
    shift: {
      type: Boolean,
      default: !1
    },
    offsets: {
      type: Object,
      default: void 0
    },
    animated: {
      type: Boolean,
      default: !0
    },
    overlay: {
      type: Boolean,
      default: !1
    },
    click: {
      type: Boolean,
      default: !0
    },
    hover: {
      type: Boolean,
      default: !1
    },
    hoverImmediate: {
      type: Boolean,
      default: !1
    },
    hoverDelay: {
      type: Number,
      default: 500
    },
    title: {
      type: String,
      default: () => ""
    },
    persistent: {
      type: Boolean,
      default: !1
    },
    positions: {
      type: Array,
      required: !1,
      default: () => en
    },
    getNextPosition: {
      type: Function,
      required: !1,
      default: tn
    },
    checkPosition: {
      type: Function,
      required: !1,
      default: sn
    },
    syncWidth: {
      type: Boolean,
      default: !1
    },
    ignoreClickOutside: {
      type: Boolean,
      default: !1
    }
  },
  data: () => ({
    open: !1,
    width: 0,
    resizeObs: null,
    debounce: function() {
    },
    useDebounceFn: ft,
    intersectionObs: null,
    setPositionBound: null,
    shifted: !1,
    positioned: !1,
    fadeTimeout: void 0,
    positionAttempts: [],
    scrollableAncestors: [],
    // put in positionable
    innerSide: ""
  }),
  watch: {
    innerShow: {
      immediate: !0,
      async handler(e) {
        e ? (this.fadeTimeout && (this.fadeTimeout = void 0), await new Promise((s) => setTimeout(s, 10)), this.positioned = !1, this.open = !0, this.positionAttempts = [], await this.$nextTick(), this.setPositionBound(), this.intersectionObs.observe(this.$refs.tooltip.$el), this.resizeObs || (this.resizeObs = new ResizeObserver(async () => {
          this.setPositionBound(!0);
        })), this.listenScrolls()) : (this.$refs.tooltip && (this.intersectionObs.unobserve(this.$refs.tooltip.$el), this.resizeObs.disconnect()), this.stopScrollListening(), this.animated ? this.fadeTimeout = setTimeout(() => {
          this.open = !1;
        }, 500) : this.open = !1);
      }
    },
    innerSide: {
      handler() {
        this.updatePosition();
      }
    },
    attach() {
      this.innerShow && this.updatePosition();
    },
    hover: {
      immediate: !0,
      handler: function() {
        this.attachHover();
      }
    },
    hoverImmediate() {
      this.attachHover();
    },
    hoverDelay() {
      this.attachHover();
    }
  },
  created() {
    this.setPositionBound = Qs(this.setPosition.bind(this), 1);
  },
  async mounted() {
    await this.$nextTick();
    let e = 0;
    const s = 5;
    for (; e < s && this.$refs.activator === void 0 && this.$refs.tooltip === void 0; )
      e++, await this.$nextTick();
    const { target: t, positionAttempts: i } = this;
    this.intersectionObs = new IntersectionObserver(([{ boundingClientRect: o, rootBounds: n, intersectionRatio: a, intersectionRect: d }]) => {
      if (this.$refs.tooltip && this.intersectionObs.unobserve(this.$refs.tooltip.$el), this.checkPosition({ intersectionRatio: a, elementRect: o, targetRect: n, intersectionRect: d, positionAttempts: i })) {
        const u = this.getNextPosition(this.innerSide || this.side, this.side, this.positions, this.positionAttempts);
        if (this.positionAttempts.length > this.positions.length) {
          this.$emit("unpositionable"), this.positioned = !0, this.positionAttempts = [];
          return;
        }
        this.innerSide = u, this.positionAttempts.push(this.innerSide);
      } else
        this.positioned = !0, this.positionAttempts = [], this.resizeObs.observe(this.$refs.tooltip.$el), this.resizeObs.observe(this.target);
    }, { root: t !== document.body ? t : void 0 });
  },
  beforeUnmount() {
    try {
      this.innerShow = !1, this.stopScrollListening(), this.intersectionObs.disconnect(), this.resizeObs.disconnect();
    } catch {
    }
  },
  methods: {
    listenScrolls() {
      const e = [];
      let s = this.$refs.activator.parentElement;
      for (; s && (this.target.contains(s) || s === this.target); ) {
        const { overflow: t } = window.getComputedStyle(s), i = t.split(" ");
        ["auto", "scroll"].some((o) => i.includes(o)) && e.push(s), s = s.parentElement;
      }
      this.scrollableAncestors = e, this.scrollableAncestors.forEach((t) => t.addEventListener("scroll", this.setPositionBound));
    },
    stopScrollListening() {
      this.scrollableAncestors.forEach((e) => e.removeEventListener("scroll", this.setPositionBound));
    },
    updatePosition() {
      var e;
      this.setPositionBound(), this.intersectionObs.observe((e = this.$refs.tooltip) == null ? void 0 : e.$el);
    },
    async setPosition(e) {
      var d;
      e && await this.$nextTick();
      let s = this.$refs.activator.getBoundingClientRect();
      const t = (d = this.$refs.tooltip) == null ? void 0 : d.$el;
      if (!t)
        return;
      let i = t.getBoundingClientRect();
      this.syncWidth && i.width !== s.width && (this.width = s.width, await this.$nextTick(), s = this.$refs.activator.getBoundingClientRect(), i = this.$refs.tooltip.$el.getBoundingClientRect());
      const o = this.target.getBoundingClientRect(), n = this.offsets && this.offsets[this.innerSide || this.side] || {};
      this.positionAttempts.push(this.innerSide || this.side);
      const a = Ze(
        this.innerSide || this.side,
        s,
        i,
        o,
        this.target,
        this.shift,
        { left: 0, right: 0 },
        n
      );
      this.shifted = a.shiftX, t.style.top = `${a.top}px`, t.style.left = `${a.left}px`, this.overlay && (this.$refs.overlay.style.top = `${this.target === document.body ? document.scrollingElement.scrollTop : this.target.scrollTop}px`);
    },
    onClickOutside(e, s = !1) {
      if (this.ignoreClickOutside || !this.innerShow)
        return;
      const { target: t } = e;
      s && e.preventDefault(), !(this.$refs.tooltip && (t === this.$refs.tooltip.$el || this.$refs.tooltip.$el.contains(t))) && (this.innerShow = !1);
    },
    onHover(e) {
      this.debounce(e).then((s) => {
        this.openedByClick || (s === "mouseenter" ? this.innerShow = !0 : (this.innerShow = !1, this.openedByClick = !1));
      }).catch(() => {
      });
    },
    attachHover() {
      this.hover && !this.hoverImmediate ? this.debounce = ft(({ type: e }) => e, this.hoverDelay, { rejectOnCancel: !0 }) : this.debounce = function() {
      };
    },
    onClick() {
      this.toggle(), this.hover && this.innerShow ? this.openedByClick = !0 : this.openedByClick = !1;
    },
    toggle(e = void 0) {
      e !== void 0 ? this.innerShow = e : this.innerShow = !this.innerShow;
    }
  }
};
function ln(e, s, t, i, o, n) {
  const a = y("VuTooltip"), d = F("click-outside");
  return l(), r(B, null, [
    V((l(), r("span", L({
      ref: "activator",
      class: "vu-popover__activator",
      onClick: s[0] || (s[0] = (u) => t.click && n.onClick(!0))
    }, e.$attrs, {
      onMouseenter: s[1] || (s[1] = (u) => t.hover && n.onHover(u)),
      onMouseleave: s[2] || (s[2] = (u) => t.hover && n.onHover(u))
    }), [
      w(e.$slots, "default", {}, void 0, !0)
    ], 16)), [
      [d, { handler: n.onClickOutside, innerShow: e.innerShow }]
    ]),
    e.open || t.persistent ? V((l(), _(ks, {
      key: 0,
      to: e.target
    }, [
      C(fe, {
        name: t.animated ? "fade" : ""
      }, {
        default: S(() => [
          e.innerShow && t.overlay ? (l(), r("div", {
            key: 0,
            class: "mask popover-mask",
            ref: "overlay",
            onWheel: s[3] || (s[3] = q((...u) => n.onClickOutside && n.onClickOutside(...u), ["prevent"])),
            onTouchstart: s[4] || (s[4] = (u) => n.onClickOutside(u, !0))
          }, null, 544)) : f("", !0)
        ]),
        _: 1
      }, 8, ["name"]),
      C(fe, {
        appear: "",
        name: t.animated ? "fade" : ""
      }, {
        default: S(() => [
          V(C(a, {
            ref: "tooltip",
            arrow: t.arrow,
            prerender: !e.positioned,
            type: t.type,
            show: !0,
            side: e.innerSide || t.side,
            class: v(e.contentClass),
            style: P([e.width ? `width: ${e.width}px` : {}, e.contentStyle]),
            "onUpdate:show": s[5] || (s[5] = (u) => e.open = !1),
            onMouseenter: s[6] || (s[6] = (u) => t.hover && n.onHover(u)),
            onMouseleave: s[7] || (s[7] = (u) => t.hover && n.onHover(u))
          }, {
            arrow: S(({ side: u }) => [
              w(e.$slots, "arrow", {
                side: e.innerSide || u,
                shift: e.shifted
              }, void 0, !0)
            ]),
            title: S(({ side: u }) => [
              w(e.$slots, "title", {
                side: e.innerSide || u
              }, () => [
                t.title ? (l(), r(B, { key: 0 }, [
                  $(g(t.title), 1)
                ], 64)) : f("", !0)
              ], !0)
            ]),
            default: S(() => [
              w(e.$slots, "body", {}, void 0, !0)
            ]),
            _: 3
          }, 8, ["arrow", "prerender", "type", "side", "class", "style"]), [
            [ee, e.innerShow || e.show]
          ])
        ]),
        _: 3
      }, 8, ["name"])
    ], 8, ["to"])), [
      [ee, e.open]
    ]) : f("", !0)
  ], 64);
}
const G = /* @__PURE__ */ I(nn, [["render", ln], ["__scopeId", "data-v-2d2a2774"]]), on = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: G
}, Symbol.toStringTag, { value: "Module" })), an = {
  name: "vu-status-bar",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    constrained: Boolean
  },
  data() {
    return {
      overflows: !1,
      ellipsis: !1,
      intObs: null,
      intObs2: null,
      visibleAmount: 0
    };
  },
  mounted() {
    this.watchSize();
  },
  computed: {
    visibleItems() {
      return this.items.slice(0, this.visibleAmount);
    },
    hiddenItems() {
      return this.overflows ? this.items.slice(this.visibleAmount) : [];
    }
  },
  watch: {
    items: {
      immediate: !0,
      // eslint-disable-next-line object-shorthand, func-names
      handler: function(e) {
        this.visibleAmount = e.length, this.ellipsis = !1, this.overflows = !1, this.$el && this.$nextTick(() => this.watchSize());
      }
    }
  },
  methods: {
    watchSize() {
      this.intObs = new IntersectionObserver(this.intersects, {
        root: this.$refs.container,
        threshold: 1
      }), this.intObs.observe(this.$refs.inner), this.intObs2 = new IntersectionObserver(this.intersects2, {
        root: this.$refs.inner,
        threshold: 1
      });
    },
    async intersects() {
      this.intObs.disconnect(), this.ellipsis = !0;
      const e = this.$refs.inner.querySelectorAll(".vu-badge");
      await this.$nextTick(), e.forEach((s) => {
        this.intObs2.observe(s);
      });
    },
    intersects2(e) {
      const s = e.filter((i) => i.intersectionRatio < 1);
      let { length: t } = s;
      if (t) {
        const i = this.$refs.inner.getBoundingClientRect(), { right: o } = i, n = s.shift();
        n && o - n.target.getBoundingClientRect().left - 22 < 0 && (t += 1), this.visibleAmount -= t, this.overflows = !0;
      }
      this.intObs2.disconnect();
    },
    units(e) {
      return this.ellipsis ? e > 99 ? "99+" : `${e}` : `${e}`;
    },
    destroyed() {
      this.intObs1 && delete this.intObs1, this.intObs2 && delete this.intObs2;
    }
  },
  components: { VuBadge: Ge, VuPopover: G, VuIcon: A }
}, rn = {
  class: "status-bar__inner",
  ref: "inner"
};
function un(e, s, t, i, o, n) {
  const a = y("VuBadge"), d = y("VuIcon"), u = y("VuPopover"), m = F("tooltip");
  return l(), r("div", {
    class: v(["vu-status-bar", { "status-bar--constrained": t.constrained }]),
    ref: "container"
  }, [
    c("div", rn, [
      (l(!0), r(B, null, M(n.visibleItems, (h) => V((l(), _(a, {
        key: h.id,
        icon: h.icon,
        text: h.text || h.amount && n.units(h.amount) || "",
        color: h.color || "copy-grey",
        value: h.value,
        togglable: !1,
        style: P([h.amount && h.icon ? "min-width: 45px" : ""])
      }, null, 8, ["icon", "text", "color", "value", "style"])), [
        [
          m,
          h.tooltip || h.text || h.amount || "",
          void 0,
          { hover: !0 }
        ]
      ])), 128)),
      o.overflows ? (l(), _(u, {
        key: 0,
        type: "tooltip",
        "content-class": "vu-status-bar",
        shift: "",
        arrow: ""
      }, {
        default: S(() => [
          C(d, {
            icon: "menu-dot",
            style: { transform: "rotate(90deg)" }
          })
        ]),
        body: S(() => [
          (l(!0), r(B, null, M(n.hiddenItems, (h) => (l(), _(a, {
            key: h.id,
            icon: h.icon,
            text: h.text || `${h.amount}` || "",
            color: h.color || "copy-grey",
            value: h.value,
            togglable: !1
          }, null, 8, ["icon", "text", "color", "value"]))), 128))
        ]),
        _: 1
      })) : f("", !0)
    ], 512)
  ], 2);
}
const et = /* @__PURE__ */ I(an, [["render", un], ["__scopeId", "data-v-5fdbcbd9"]]), dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: et
}, Symbol.toStringTag, { value: "Module" })), cn = {
  name: "vu-lazy",
  props: {
    height: {
      type: [Number, String],
      default: () => "10px"
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["intersect"],
  data: () => ({
    observer: null,
    intersected: !1
  }),
  mounted() {
    "IntersectionObserver" in window ? (this.observer = new IntersectionObserver((e) => {
      e[0].isIntersecting && (this.intersected = !0, this.observer.disconnect(), this.$emit("intersect"));
    }, this.options), this.observer.observe(this.$el)) : (this.intersected = !0, this.$emit("intersect"));
  },
  beforeUnmount() {
    "IntersectionObserver" in window && this.observer && this.observer.disconnect(), delete this.observer;
  }
};
function hn(e, s, t, i, o, n) {
  return l(), r("div", {
    style: P(e.intersected ? "" : `min-height: ${t.height}${typeof t.height === e.number && "px"}`)
  }, [
    e.intersected ? w(e.$slots, "default", { key: 0 }) : w(e.$slots, "placeholder", { key: 1 })
  ], 4);
}
const tt = /* @__PURE__ */ I(cn, [["render", hn]]), fn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tt
}, Symbol.toStringTag, { value: "Module" })), mn = {
  name: "vu-image",
  components: { VuLazy: tt },
  props: {
    lazy: {
      type: Boolean,
      required: !1
    },
    src: {
      type: [URL, String],
      required: !0
    },
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String],
    contain: Boolean,
    aspectRatio: String
  },
  emits: ["load", "error"],
  data: () => ({
    image: void 0,
    calculatedAspectRatio: void 0,
    naturalWidth: void 0,
    isLoading: !0,
    hasError: !1
  }),
  inject: {
    vuDebug: {
      default: !1
    }
  },
  computed: {
    computedAspectRatio() {
      return Number(this.aspectRatio || this.calculatedAspectRatio);
    },
    imageSizerStyle() {
      return this.computedAspectRatio ? { paddingBottom: `${1 / this.computedAspectRatio * 100}%` } : void 0;
    },
    imageStyle() {
      return [
        Number.isNaN(this.width) ? "" : { width: `${this.width}px` },
        Number.isNaN(this.height) ? "" : { height: `${this.height}px` },
        Number.isNaN(this.minHeight) ? "" : { minHeight: `${this.minHeight}px` },
        Number.isNaN(this.maxHeight) ? "" : { maxHeight: `${this.maxHeight}px` },
        Number.isNaN(this.minWidth) ? "" : { minWidth: `${this.minWidth}px` },
        Number.isNaN(this.maxWidth) ? "" : { maxWidth: `${this.maxWidth}px` }
      ];
    },
    imageClasses() {
      return `vu-image__image--${this.contain ? "contain" : "cover"}`;
    }
  },
  watch: {
    src() {
      this.isLoading ? this.loadImage() : this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.lazy || this.loadImage();
    },
    loadImage() {
      const e = new Image();
      this.image = e, this.isLoading = !0, e.onload = () => {
        e.decode ? e.decode().catch((s) => {
          this.vuDebug && console.warn(
            `Failed to decode image, trying to render anyway

src: ${this.src}` + (s.message ? `
Original error: ${s.message}` : ""),
            this
          );
        }).then(this.onLoad) : this.onLoad();
      }, e.onerror = this.onError, e.src = this.src, this.aspectRatio || this.pollForSize(e);
    },
    pollForSize(e, s = 100) {
      const t = () => {
        const { naturalHeight: i, naturalWidth: o } = e;
        i || o ? (this.naturalWidth = o, this.calculatedAspectRatio = o / i, this.image = null) : !e.complete && this.isLoading && !this.hasError && s != null && setTimeout(t, s);
      };
      t();
    },
    onLoad() {
      this.isLoading = !1, this.$emit("load", this.src);
    },
    onError() {
      this.hasError = !0, this.$emit("error", this.src);
    }
  }
}, pn = (e) => (te("data-v-2025e901"), e = e(), se(), e), gn = /* @__PURE__ */ pn(() => /* @__PURE__ */ c("div", { class: "vu-image__fill" }, null, -1));
function vn(e, s, t, i, o, n) {
  const a = y("VuLazy");
  return l(), r("div", {
    class: "vu-image",
    style: P(n.imageStyle)
  }, [
    c("div", {
      class: "vu-image__sizer",
      style: P(n.imageSizerStyle)
    }, null, 4),
    t.lazy ? (l(), _(a, {
      key: 0,
      height: t.height || t.maxHeight || t.minHeight || 10,
      onIntersect: s[0] || (s[0] = (d) => n.loadImage())
    }, {
      default: S(() => [
        c("div", {
          class: v(["vu-image__image", n.imageClasses]),
          style: P([[e.isLoading ? "" : { backgroundImage: `url(${t.src})` }], { "background-position": "center center" }])
        }, null, 6)
      ]),
      _: 1
    }, 8, ["height"])) : (l(), r("div", {
      key: 1,
      class: v(["vu-image__image", n.imageClasses]),
      style: P([[e.isLoading ? "" : { backgroundImage: `url(${t.src})` }], { "background-position": "center center" }])
    }, null, 6)),
    gn,
    w(e.$slots, "default", {}, void 0, !0)
  ], 4);
}
const ye = /* @__PURE__ */ I(mn, [["render", vn], ["__scopeId", "data-v-2025e901"]]), yn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ye
}, Symbol.toStringTag, { value: "Module" })), st = Symbol("vuIsMobileOrTablet"), bn = Symbol("vuAlertDialogConfirmButtonLabel"), _n = Symbol("vuAlertDialogCloseButtonLabel"), wn = Symbol("vuAlertDialogRiskyButtonLabel"), kn = Symbol("vuAlertDialogCloseButtonAltLabel"), Sn = Symbol("vuDropdownMenuOverlay");
function ne() {
  return window ? ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, (e) => (e ^ (window.crypto || window.msCrypto).getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16)) : (void 0)();
}
function Dt(e, s = !0) {
  let t = s;
  return e.forEach((i) => {
    !i.text && !i.label && (!i.class || !i.class.includes("divider")) && (t = !1), i.items && (t = Dt(i.items, t));
  }), t;
}
const Cn = {
  name: "vu-dropdownmenu-items",
  components: { VuIcon: A },
  emits: ["update:responsive", "click-item", "update:selected"],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    target: {
      type: HTMLElement,
      required: !1
    },
    items: {
      type: Array,
      required: !0,
      validator: Dt
    },
    selected: {
      type: Array,
      required: !0
    },
    zIndex: {
      type: Number,
      default: 1e3
    },
    responsive: {
      type: Boolean,
      default: !1
    },
    dividedResponsiveItems: {
      type: Boolean,
      default: !1
    },
    disableResponsive: {
      type: Boolean,
      default: !1
    }
  },
  data: () => ({
    stack: [],
    left: !1,
    uuid: ne,
    root: !1,
    parent: {}
  }),
  computed: {
    classes() {
      return {
        "open-left": this.left,
        "responsive-menu": this.responsive,
        "dropdown-menu-responsive-wrap": this.responsive
      };
    },
    hasIcons() {
      return this.items && this.items.some((e) => e.fonticon);
    },
    _items() {
      return this.stack[this.stack.length - 1] || this.items;
    },
    _parent() {
      return (this.stack[this.stack.length - 2] || this.items).find((e) => JSON.stringify(e.items) === JSON.stringify(this._items));
    }
  },
  async mounted() {
    if (this.disableResponsive)
      return;
    await this.$nextTick();
    const e = {
      root: this.target,
      threshold: 1
    }, s = this.target.getBoundingClientRect(), t = new IntersectionObserver(async ([i]) => {
      t.unobserve(this.$el);
      const o = i.target.getBoundingClientRect();
      s.right < o.right && !this.left ? (this.left = !0, await this.$nextTick(), t.observe(this.$el)) : s.left > o.left && this.left && this.$emit("update:responsive", !0);
    }, e);
    await this.$nextTick(), t.observe(this.$el);
  },
  methods: {
    toggleSelected(e) {
      const s = this.selected.slice(0);
      return e.selected || this.selected.includes(e) ? s.splice(this.selected.indexOf(e), 1) : s.push(e), s;
    },
    onItemClick(e) {
      !e.disabled && (e.selectable || e.selected || this.selected.includes(e)) && this.$emit("update:selected", this.toggleSelected(e)), this.$emit("click-item", e);
    },
    onNextItemClick(e) {
      this.responsive && this.stack.push(e.items);
    },
    onBackItemClick() {
      this.stack.pop();
    }
  }
}, In = (e) => (te("data-v-586bbfcc"), e = e(), se(), e), Bn = {
  key: 0,
  class: "item item-back"
}, On = { class: "item-text" }, Vn = ["onClick"], $n = { class: "item-text" }, Mn = ["onClick"], Pn = /* @__PURE__ */ In(() => /* @__PURE__ */ c("span", { class: "divider" }, null, -1)), xn = {
  key: 0,
  class: "item-text"
};
function Ln(e, s, t, i, o, n) {
  const a = y("VuIcon"), d = y("vu-dropdownmenu-items", !0);
  return l(), r("div", {
    class: v(["dropdown-menu dropdown-menu-root dropdown-root", n.classes]),
    style: P([{ zIndex: t.zIndex }])
  }, [
    c("ul", {
      class: v(["dropdown-menu-wrap", { "dropdown-menu-icons": n.hasIcons }])
    }, [
      t.responsive && e.stack.length ? (l(), r("li", Bn, [
        C(a, {
          icon: "left-open",
          class: "back-item",
          onClick: q(n.onBackItemClick, ["stop"])
        }, null, 8, ["onClick"]),
        c("span", On, g(n._parent.text), 1)
      ])) : f("", !0),
      (l(!0), r(B, null, M(n._items, (u) => (l(), r(B, null, [
        !u.class || !u.class.includes("header") && !u.class.includes("divider") ? (l(), r("li", {
          key: u.text || u.label,
          class: v(["item", {
            "item-submenu": u.items,
            selectable: !u.disabled && u.selectable || u.selected || t.selected.includes(u),
            selected: u.selected || t.selected.includes(u),
            hidden: u.hidden,
            disabled: u.disabled,
            "hide-responsive-divider": !t.dividedResponsiveItems
          }, u.class]),
          onClick: q((m) => u.items && t.responsive && !t.dividedResponsiveItems ? n.onNextItemClick(u) : n.onItemClick(u), ["stop"])
        }, [
          w(e.$slots, "default", { item: u }, () => [
            u.fonticon ? (l(), _(a, {
              key: 0,
              icon: u.fonticon
            }, null, 8, ["icon"])) : f("", !0),
            c("span", $n, g(u.text || u.label), 1)
          ], !0),
          u.items ? (l(), r("div", {
            key: 0,
            class: "next-icon",
            onClick: q((m) => n.onNextItemClick(u), ["stop"])
          }, [
            Pn,
            C(a, { icon: "right-open" })
          ], 8, Mn)) : f("", !0),
          !t.responsive && u.items ? (l(), _(d, {
            key: 1,
            target: t.target,
            items: u.items,
            selected: t.selected,
            onClickItem: n.onItemClick,
            "onUpdate:selected": s[0] || (s[0] = (m) => e.$emit("update:selected", m)),
            "onUpdate:responsive": s[1] || (s[1] = (m) => e.$emit("update:responsive", m))
          }, null, 8, ["target", "items", "selected", "onClickItem"])) : f("", !0)
        ], 10, Vn)) : (l(), r("li", {
          key: u.text || u.label || e.uuid(),
          class: v(u.class)
        }, [
          u.class !== "divider" ? (l(), r("span", xn, g(u.text || u.label), 1)) : f("", !0)
        ], 2))
      ], 64))), 256))
    ], 2)
  ], 6);
}
const nt = /* @__PURE__ */ I(Cn, [["render", Ln], ["__scopeId", "data-v-586bbfcc"]]), Tn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nt
}, Symbol.toStringTag, { value: "Module" })), zt = ["top", "top-right", "bottom-right", "bottom", "bottom-left", "top-left"], Nt = ({ intersectionRatio: e, elementRect: s, targetRect: t }) => e < 1 && (s.top < t.top || s.bottom > t.bottom), Et = (e, s, t, i) => {
  if (i.length === 1) {
    const o = i[0];
    return o.includes("top") ? o.replace("top", "bottom") : o.replace("bottom", "top");
  } else
    i.length > 1 && i.push(...zt);
  return s;
}, An = Y(Sn, !1);
function jt(e, s = !0) {
  let t = s;
  return e.forEach((i) => {
    !i.text && !i.label && (!i.class || !i.class.includes("divider")) && (t = !1), i.items && (t = jt(i.items, t));
  }), t;
}
const Fn = {
  components: { VuDropdownmenuItems: nt, VuPopover: G },
  name: "vu-dropdownmenu",
  mixins: [ve, Je],
  emits: ["close", "click-item"],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      required: !0,
      validator: jt
    },
    dividedResponsiveItems: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      required: !1,
      default: "bottom-left"
    },
    arrow: {
      type: Boolean,
      default: !1
    },
    overlay: {
      type: Boolean,
      default: !1
    },
    zIndex: {
      type: Number,
      default: () => 1e3
    },
    responsive: {
      type: Boolean,
      default: !1
    },
    shift: {
      type: Boolean,
      default: !1
    },
    closeOnClick: {
      type: Boolean,
      default: !0
    },
    positions: {
      type: Array,
      required: !1,
      default: () => zt
    },
    getNextPosition: {
      type: Function,
      required: !1,
      default: Et
    },
    checkPosition: {
      type: Function,
      required: !1,
      default: Nt
    },
    ignoreClickOutside: {
      type: Boolean,
      default: !1
    }
  },
  data: () => ({
    innerResponsive: !1
  }),
  computed: {
    isResponsive: {
      get() {
        return this.innerResponsive || this.responsive;
      },
      set(e) {
        this.innerResponsive = e;
      }
    }
  },
  watch: {
    async items() {
      this.innerShow && (await this.$nextTick(), this.$refs.popover.updatePosition());
    }
  },
  methods: {
    handleClick(e) {
      e.handler && e.handler(e), this.$emit("click-item", e), this.updateShow(!1);
    },
    updateShow(e) {
      e ? this.isResponsive = !1 : this.closeOnClick && (this.innerShow = !1, this.$emit("close"));
    }
  }
}, be = /* @__PURE__ */ Object.assign(Fn, {
  setup(e) {
    return (s, t) => (l(), _(G, {
      ref: "popover",
      show: s.innerShow,
      "onUpdate:show": [
        t[1] || (t[1] = (i) => s.innerShow = i),
        s.updateShow
      ],
      shift: e.shift || e.responsive,
      type: "dropdownmenu popover",
      attach: s.target,
      side: e.position,
      overlay: e.overlay || E(An),
      animated: !1,
      "check-position": E(Nt),
      "get-next-position": E(Et),
      "ignore-click-outside": e.ignoreClickOutside,
      arrow: !1
    }, {
      body: S(() => [
        C(nt, {
          responsive: s.isResponsive,
          "onUpdate:responsive": t[0] || (t[0] = (i) => s.isResponsive = i),
          "divided-responsive-items": e.dividedResponsiveItems,
          target: s.target,
          items: e.items,
          selected: e.value,
          onClickItem: s.handleClick
        }, null, 8, ["responsive", "divided-responsive-items", "target", "items", "selected", "onClickItem"])
      ]),
      default: S(() => [
        w(s.$slots, "default", { active: s.innerShow })
      ]),
      _: 3
    }, 8, ["show", "shift", "attach", "side", "overlay", "check-position", "get-next-position", "ignore-click-outside", "onUpdate:show"]));
  }
}), Dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: be
}, Symbol.toStringTag, { value: "Module" })), it = {
  props: {
    active: {
      type: Boolean,
      default: () => !1
    }
  }
}, zn = {
  props: {
    size: {
      type: String,
      default: () => ""
    }
  }
}, Nn = {
  name: "vu-icon-btn",
  mixins: [it, D, ge, zn],
  components: { VuIcon: A },
  props: {
    icon: {
      required: !0,
      type: String
    },
    disableChevronResize: {
      default: !1,
      type: Boolean
    },
    noActive: {
      default: !1,
      type: Boolean
    },
    noHover: {
      default: !1,
      type: Boolean
    }
  }
};
function En(e, s, t, i, o, n) {
  const a = y("VuIcon");
  return l(), r("div", {
    class: v(["vu-icon-btn", [e.color, e.size, { active: e.active && !t.noActive, "no-active": t.noActive, "no-hover": t.noHover, disabled: e.disabled }]]),
    onClickCapture: s[0] || (s[0] = (d) => {
      this.disabled && d.stopPropagation();
    })
  }, [
    C(a, {
      icon: t.icon,
      color: e.color,
      class: v({ "chevron-menu-icon": t.icon === "chevron-down" && t.disableChevronResize, disabled: e.disabled })
    }, null, 8, ["icon", "color", "class"])
  ], 34);
}
const T = /* @__PURE__ */ I(Nn, [["render", En], ["__scopeId", "data-v-626fc56a"]]), jn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: T
}, Symbol.toStringTag, { value: "Module" })), Rn = {
  name: "vu-tile",
  inject: ["vuCollectionActions", "vuCollectionLazyImages", "lang", "vuTileEmphasizeText", "vuDateFormatWeekday", "vuDateFormatShort"],
  emits: ["click-action"],
  props: {
    /* eslint-disable vue/require-default-prop */
    id: {
      type: String
    },
    src: String,
    type: String,
    title: String,
    text: String,
    author: String,
    date: Date,
    customMetaData: String,
    status: Array,
    active: Boolean,
    actions: Array || String,
    selected: Boolean,
    selectable: Boolean,
    thumbnail: Boolean,
    hideStatusBar: Boolean
  },
  computed: {
    classes() {
      return {
        "tile--selectable": this.selectable || this.selected,
        "tile--selected": this.selected,
        "tile--active": this.active,
        "tile--thumbnail": this.thumbnail
      };
    },
    _actions() {
      return this.actions || this.vuCollectionActions;
    },
    contentClasses() {
      const e = "tile__content";
      return this.thumbnail ? this.meta ? `${e}__title--2rows` : `${e}__title--3rows` : this.meta && this.text ? this.vuTileEmphasizeText ? [
        `${e}__title--1row`,
        `${e}__text--2rows`
      ] : [
        `${e}__title--2row`,
        `${e}__text--1row`
      ] : (this.meta ? !this.text : this.text) ? [`${e}__title--3rows`, `${e}__text--1row`] : `${e}__title--4rows`;
    },
    meta() {
      return this.customMetaData || `${this.author || ""}${this.author && this.date ? " | " : ""}${this.dateFormat}`;
    },
    dateFormatOptions() {
      const e = {
        weekday: this.vuDateFormatShort ? "short" : "long",
        month: this.vuDateFormatShort ? "short" : "long",
        day: "numeric",
        year: "numeric"
      };
      return this.vuDateFormatWeekday || delete e.weekday, e;
    },
    dateFormat() {
      return this.date ? this.date.toLocaleDateString(this.lang, this.dateFormatOptions) : "";
    }
  },
  data() {
    return {
      started: !1
    };
  },
  mounted() {
  },
  watch: {},
  methods: {},
  components: { VuImage: ye, VuIcon: A, VuIcon: A, VuDropdownmenu: be, VuStatusBar: et, VuIconBtn: T }
}, Un = { class: "tile-wrap" }, qn = {
  key: 0,
  class: "tile__thumb"
}, Hn = {
  key: 1,
  class: "tile__image"
}, Wn = { class: "tile__title" }, Kn = { class: "inner" }, Gn = {
  key: 0,
  class: "tile__meta"
}, Yn = { class: "inner" }, Xn = {
  key: 1,
  class: "tile__text"
}, Jn = { class: "inner" }, Zn = {
  key: 2,
  class: "tile__action-icon"
};
function Qn(e, s, t, i, o, n) {
  const a = y("VuImage"), d = y("VuIcon"), u = y("vuIconBtn"), m = y("VuDropdownmenu"), h = y("VuIconBtn"), p = y("VuStatusBar");
  return l(), r("div", {
    class: v(["vu-tile", n.classes])
  }, [
    c("div", Un, [
      t.active ? (l(), r("div", qn)) : f("", !0),
      t.src ? (l(), r("div", Hn, [
        C(a, {
          src: t.src,
          width: "80",
          height: "60",
          contain: "",
          "aspect-ratio": "1",
          lazy: n.vuCollectionLazyImages
        }, null, 8, ["src", "lazy"]),
        t.src && (t.selectable || t.selected) ? (l(), _(d, {
          key: 0,
          icon: "check",
          class: "tile__check"
        })) : f("", !0)
      ])) : f("", !0),
      c("div", {
        class: v(["tile__content", n.contentClasses])
      }, [
        c("div", Wn, [
          t.type ? (l(), _(d, {
            key: 0,
            icon: t.type
          }, null, 8, ["icon"])) : f("", !0),
          c("span", Kn, g(t.title), 1)
        ]),
        n.meta ? (l(), r("div", Gn, [
          c("span", Yn, g(n.meta), 1)
        ])) : f("", !0),
        t.text ? (l(), r("div", Xn, [
          c("span", Jn, g(t.text), 1)
        ])) : f("", !0)
      ], 2),
      n._actions ? (l(), r("div", Zn, [
        n._actions.length > 1 ? (l(), _(m, {
          key: 0,
          items: n._actions,
          onClickItem: s[0] || (s[0] = (b) => e.$emit("click-action", { item: b, id: t.id }))
        }, {
          default: S((b) => [
            C(u, {
              icon: "chevron-down",
              class: v(b)
            }, null, 8, ["class"])
          ]),
          _: 1
        }, 8, ["items"])) : (l(), _(h, {
          key: 1,
          icon: n._actions[0].fonticon,
          onClick: s[1] || (s[1] = (b) => e.$emit("click-action", { item: b, id: t.id }))
        }, null, 8, ["icon"]))
      ])) : f("", !0)
    ]),
    t.hideStatusBar ? f("", !0) : (l(), _(p, {
      key: 0,
      status: t.status
    }, null, 8, ["status"]))
  ], 2);
}
const Rt = /* @__PURE__ */ I(Rn, [["render", Qn], ["__scopeId", "data-v-f0868abb"]]), ei = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rt
}, Symbol.toStringTag, { value: "Module" })), ti = {
  name: "vu-thumbnail",
  inject: ["vuCollectionLazyImages"],
  props: {
    /* eslint-disable vue/require-default-prop */
    id: {
      type: String,
      required: !0
    },
    src: String,
    type: String,
    active: Boolean,
    actions: Array,
    title: String,
    text: String,
    selected: Boolean,
    selectable: Boolean,
    author: String,
    date: Date,
    customMetaData: String,
    status: Array,
    hideStatusBar: Boolean
  },
  data: () => ({
    getListenersFromAttrs: J
  }),
  computed: {
    classes() {
      return {
        "thumbnail--selectable": this.selectable || this.selected,
        "thumbnail--selected": this.selected,
        "thumbnail--active": this.active
      };
    }
  },
  components: { VuImage: ye, VuIcon: A, VuTile: Rt, VuStatusBar: et }
}, si = {
  class: "thumbnail-wrap",
  style: { position: "relative" }
}, ni = {
  key: 0,
  class: "thumbnail__thumb"
}, ii = { class: "thumbnail__content" };
function li(e, s, t, i, o, n) {
  const a = y("VuImage"), d = y("VuIcon"), u = y("VuTile"), m = y("VuStatusBar");
  return l(), r("div", {
    class: v(["vu-thumbnail item", n.classes])
  }, [
    c("div", si, [
      C(a, {
        src: t.src,
        lazy: n.vuCollectionLazyImages,
        "aspect-ratio": "200/150",
        contain: ""
      }, null, 8, ["src", "lazy"]),
      t.active ? (l(), r("div", ni)) : f("", !0),
      t.selectable || t.selected ? (l(), _(d, {
        key: 1,
        icon: "check",
        class: "thumbnail__check"
      })) : f("", !0),
      C(u, {
        thumbnail: "",
        title: t.title,
        type: t.type,
        author: t.author,
        date: t.date,
        actions: t.actions,
        "custom-meta-data": t.customMetaData,
        "hide-status-bar": "",
        onClickAction: e.getListenersFromAttrs(e.$attrs).onClickAction
      }, null, 8, ["title", "type", "author", "date", "actions", "custom-meta-data", "onClickAction"]),
      c("div", ii, g(t.text), 1),
      t.hideStatusBar ? f("", !0) : (l(), _(m, {
        key: 2,
        status: t.status
      }, null, 8, ["status"]))
    ])
  ], 2);
}
const oi = /* @__PURE__ */ I(ti, [["render", li], ["__scopeId", "data-v-a149de4c"]]), ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: oi
}, Symbol.toStringTag, { value: "Module" })), ue = {
  props: {
    loading: {
      type: Boolean,
      default: () => !1
    }
  }
}, ri = {
  name: "vu-accordion",
  mixins: [ue],
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    items: {
      type: Number,
      default: () => 0
    },
    open: {
      type: Boolean,
      default: () => !1
    },
    filled: {
      type: Boolean,
      default: () => !1
    },
    divided: {
      type: Boolean,
      default: () => !1
    },
    outlined: {
      type: Boolean,
      default: () => !1
    },
    separated: {
      type: Boolean,
      default: () => !1
    },
    animated: {
      type: Boolean,
      default: () => !1
    },
    exclusive: {
      type: Boolean,
      default: () => !1
    },
    keepRendered: {
      type: Boolean,
      default: () => !1
    }
  },
  emits: ["update:modelValue"],
  data: () => ({
    guid: ne
  }),
  created() {
    if (this.open && !this.exclusive) {
      let e = this.items;
      const s = [];
      for (; e; )
        s.push(e--);
      this.$emit("update:modelValue", s);
    }
  },
  computed: {
    value() {
      return this.modelValue;
    }
  },
  methods: {
    toggle(e) {
      if (this.value.includes(e)) {
        const s = this.value.slice();
        s.splice(s.indexOf(e), 1), this.$emit("update:modelValue", s);
      } else
        this.exclusive ? this.$emit("update:modelValue", [e]) : this.$emit("update:modelValue", [e].concat(this.value || []));
    }
  }
}, ui = { class: "accordion-container" }, di = ["onClick"], ci = /* @__PURE__ */ c("i", { class: "caret-left" }, null, -1), hi = {
  key: 0,
  class: "content-wrapper"
};
function fi(e, s, t, i, o, n) {
  const a = F("mask");
  return V((l(), r("div", ui, [
    c("div", {
      class: v(["accordion accordion-root", {
        filled: t.filled,
        "filled-separate": t.separated,
        divided: t.divided,
        styled: t.outlined,
        animated: t.animated
      }])
    }, [
      (l(!0), r(B, null, M(t.items, (d) => (l(), r("div", {
        key: `${e.guid}-accordion-${d}`,
        class: v(["accordion-item", { active: n.value.includes(d) }])
      }, [
        c("div", {
          onClick: (u) => n.toggle(d),
          class: "accordion-title"
        }, [
          ci,
          w(e.$slots, "title-" + d)
        ], 8, di),
        t.keepRendered || n.value.includes(d) ? V((l(), r("div", hi, [
          c("div", {
            class: v(["content", { "accordion-animated-content": t.animated }])
          }, [
            w(e.$slots, "item-" + d)
          ], 2)
        ], 512)), [
          [ee, n.value.includes(d)]
        ]) : f("", !0)
      ], 2))), 128))
    ], 2)
  ])), [
    [a, e.loading]
  ]);
}
const mi = /* @__PURE__ */ I(ri, [["render", fi]]), pi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mi
}, Symbol.toStringTag, { value: "Module" })), Ut = (e, ...s) => Object.fromEntries(
  s.filter((t) => t in e).map((t) => [t, e[t]])
), gi = (e, ...s) => Object.fromEntries(
  s.filter(({ key: t }) => t in e).map(({ key: t, newName: i = t }) => [i, e[t]])
), vi = (e) => (te("data-v-a97ca03b"), e = e(), se(), e), yi = { class: "vu-alert-dialog-content" }, bi = /* @__PURE__ */ vi(() => /* @__PURE__ */ c("hr", null, null, -1)), _i = [
  bi
], wi = { class: "vu-alert-dialog-body" }, ki = ["src"], Si = {
  key: 3,
  class: "vu-alert-dialog-title"
}, Ci = {
  key: 4,
  class: "vu-alert-dialog-text"
}, Ii = { class: "vu-alert-dialog-buttons" }, Bi = {
  name: "vu-alert-dialog"
}, Oi = /* @__PURE__ */ Mt({
  ...Bi,
  props: {
    title: {},
    text: {},
    icon: {},
    svg: {},
    svgUrl: {},
    img: {},
    iconCircle: { type: Boolean },
    iconColor: {},
    animate: { type: Boolean },
    animationDuration: {},
    noOverlay: { type: Boolean },
    emitCancelOnClickOutside: { type: Boolean },
    emitCancelOnCloseButtonClick: { type: Boolean },
    showRiskyButton: { type: Boolean },
    showConfirmButton: { type: Boolean },
    showCloseButton: { type: Boolean },
    riskyButtonLabel: {},
    confirmButtonLabel: {},
    closeButtonLabel: {},
    _show: { type: Boolean },
    lazy: { type: Boolean },
    src: {},
    height: {},
    maxHeight: {},
    maxWidth: {},
    minHeight: {},
    minWidth: {},
    width: {},
    contain: { type: Boolean },
    aspectRatio: {}
  },
  emits: ["close", "confirm", "cancel"],
  setup(e, { emit: s }) {
    const t = e, i = s, o = Y(st), n = Ce(() => Ut(t, "height", "maxHeight", "maxWidth", "minHeight", "minWidth", "width", "contain", "aspectRatio")), a = Y(bn, "Confirm"), d = Y(_n, "Close"), u = Y(kn, "Cancel"), m = Y(wn, "Proceed");
    return (h, p) => {
      const b = y("vu-icon"), k = y("vu-btn");
      return l(), r("div", {
        class: v(["vu-alert-dialog vu-alert-dialog-root", {
          "vu-alert-dialog--desktop": !E(o)
        }])
      }, [
        C(fe, { name: "fade" }, {
          default: S(() => [
            !h.noOverlay && !(h.animate && !h._show) ? (l(), r("div", {
              key: 0,
              class: "vu-overlay",
              onClick: p[0] || (p[0] = (O) => h.emitCancelOnClickOutside ? i("cancel") : i("close"))
            })) : f("", !0)
          ]),
          _: 1
        }),
        c("div", {
          class: v(["vu-alert-dialog-wrap", { "vu-alert-dialog--disposed": h.animate && !h._show }])
        }, [
          c("div", yi, [
            c("div", {
              class: "vu-alert-dialog-drag-handle",
              onClick: p[1] || (p[1] = (O) => h.emitCancelOnClickOutside ? i("cancel") : i("close"))
            }, _i),
            c("div", wi, [
              w(h.$slots, "alert-content", {}, () => [
                h.img || h.src ? (l(), _(ye, L({
                  key: 0,
                  class: "vu-alert-dialog-image"
                }, n.value, {
                  src: h.img || h.src
                }), null, 16, ["src"])) : h.svgUrl ? (l(), r("img", {
                  key: 1,
                  src: h.svgUrl,
                  style: { height: "120px !important" }
                }, null, 8, ki)) : h.icon || h.svg ? (l(), r("div", {
                  key: 2,
                  class: v(["vu-alert-dialog-icon-wrap", [{ "vu-alert-dialog-icon-circle": h.iconCircle }, h.iconColor ? `vu-alert-dialog-icon-${h.iconColor}` : ""]])
                }, [
                  h.svg ? (l(), _(He(h.svg), { key: 1 })) : (l(), _(b, {
                    key: 0,
                    icon: h.icon,
                    "within-text": !1
                  }, null, 8, ["icon"]))
                ], 2)) : f("", !0),
                h.title ? (l(), r("div", Si, g(h.title), 1)) : f("", !0),
                h.text ? (l(), r("div", Ci, g(h.text), 1)) : f("", !0)
              ], !0),
              w(h.$slots, "alert-buttons", {}, () => [
                c("div", Ii, [
                  h.showConfirmButton ? (l(), _(k, {
                    key: 0,
                    color: "primary",
                    onClick: p[2] || (p[2] = (O) => i("confirm"))
                  }, {
                    default: S(() => [
                      $(g(h.confirmButtonLabel || E(a)), 1)
                    ]),
                    _: 1
                  })) : f("", !0),
                  h.showRiskyButton ? (l(), _(k, {
                    key: 1,
                    color: "error",
                    onClick: p[3] || (p[3] = (O) => i("confirm"))
                  }, {
                    default: S(() => [
                      $(g(h.riskyButtonLabel || E(m)), 1)
                    ]),
                    _: 1
                  })) : f("", !0),
                  h.showCloseButton ? (l(), _(k, {
                    key: 2,
                    onClick: p[4] || (p[4] = (O) => h.emitCancelOnCloseButtonClick ? i("cancel") : i("close"))
                  }, {
                    default: S(() => [
                      $(g(h.closeButtonLabel || h.showRiskyButton && E(u) || E(d)), 1)
                    ]),
                    _: 1
                  })) : f("", !0)
                ])
              ], !0)
            ])
          ])
        ], 2)
      ], 2);
    };
  }
}), lt = /* @__PURE__ */ I(Oi, [["__scopeId", "data-v-a97ca03b"]]), Vi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lt
}, Symbol.toStringTag, { value: "Module" })), $i = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 128 128"
}, Mi = /* @__PURE__ */ c("path", { d: "M125.26 34.87 93.13 2.74C91.42 1.03 89.15 0 86.73 0H41.28c-2.42 0-4.69 1.03-6.4 2.74L2.74 34.87C1.03 36.58 0 38.85 0 41.27v45.45c0 2.42 1.03 4.69 2.74 6.4l32.13 32.13c1.71 1.71 3.98 2.74 6.4 2.74h45.45c2.42 0 4.69-1.03 6.4-2.74l32.13-32.13c1.71-1.71 2.74-3.98 2.74-6.4V41.27c0-2.42-1.03-4.69-2.74-6.4Zm-24.3 49.37-16.72 16.72L64 80.58l-20.24 20.38-16.72-16.72L47.42 64 27.04 43.76l16.72-16.72L64 47.42l20.24-20.38 16.72 16.72L80.58 64z" }, null, -1), Pi = [
  Mi
];
function xi(e, s) {
  return l(), r("svg", $i, [...Pi]);
}
const Li = { render: xi }, Ti = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 128 128"
}, Ai = /* @__PURE__ */ c("path", { d: "M64 0C28.65 0 0 28.65 0 64s28.65 64 64 64 64-28.65 64-64S99.35 0 64 0m9.14 109.71H54.85V47.02h18.29zM64 36.57c-5.05 0-9.14-4.09-9.14-9.14s4.09-9.14 9.14-9.14 9.14 4.09 9.14 9.14-4.09 9.14-9.14 9.14" }, null, -1), Fi = [
  Ai
];
function Di(e, s) {
  return l(), r("svg", Ti, [...Fi]);
}
const zi = { render: Di }, Ni = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 128 128"
}, Ei = /* @__PURE__ */ c("path", { d: "M64 0C28.65 0 0 28.65 0 64s28.65 64 64 64 64-28.65 64-64S99.35 0 64 0m9.14 111.02H54.85V92.73h18.29zm13.33-43.89c-5.83 4.34-12.1 7.15-13.32 15.15H54.86c.81-11.79 6.46-17.35 11.89-21.55 5.29-4.2 9.8-7.31 9.8-14.63 0-8.27-4.31-12.15-11.49-12.15-9.76 0-13.84 8.01-13.98 17.63H31.23c.41-19.38 13.12-33.57 32.91-33.57 25.62 0 33.7 15.82 33.7 26.25 0 13.15-5.53 18.38-11.36 22.86Z" }, null, -1), ji = [
  Ei
];
function Ri(e, s) {
  return l(), r("svg", Ni, [...ji]);
}
const Ui = { render: Ri }, qi = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 128 112.85"
}, Hi = /* @__PURE__ */ c("path", { d: "M128 105.8c0-1.18-.26-2.39-.91-3.53L70.14 3.53C68.78 1.18 66.38 0 64 0s-4.78 1.17-6.14 3.53L.91 102.27c-.66 1.14-.91 2.35-.91 3.53 0 3.69 2.93 7.05 7.05 7.05h113.89c4.12 0 7.05-3.36 7.05-7.05Zm-54.86-7.84c0 1.44-1.17 2.61-2.61 2.61H57.47c-1.44 0-2.61-1.17-2.61-2.61V84.9c0-1.44 1.17-2.61 2.61-2.61h13.06c1.44 0 2.61 1.17 2.61 2.61zm-1.3-26.12H56.17l-1.31-37.88c0-3.61 2.92-6.53 6.53-6.53h5.22c3.61 0 6.53 2.92 6.53 6.53l-1.31 37.88Z" }, null, -1), Wi = [
  Hi
];
function Ki(e, s) {
  return l(), r("svg", qi, [...Wi]);
}
const pt = { render: Ki };
let qt = {
  show: () => new Promise((e) => e),
  hide: () => {
  },
  information: () => new Promise((e) => e),
  confirm: () => new Promise((e) => e),
  warning: () => new Promise((e) => e),
  confirmWithRisk: () => new Promise((e) => e),
  error: () => new Promise((e) => e),
  _alerts: re([])
};
function Gi(e) {
  const s = re([]), t = We({
    _alerts: s,
    show(i) {
      return this.hide(), new Promise((o, n) => {
        const a = {
          id: ne(),
          component: lt,
          bind: ke({
            height: 120,
            ...i,
            contain: !0,
            _show: !0
          }),
          on: {
            close: () => {
              this.hide(a), o();
            },
            confirm: () => {
              this.hide(a), o();
            },
            cancel: () => {
              this.hide(a), n();
            }
          }
        };
        this._alerts.push(re(a));
      });
    },
    hide(i) {
      if (i) {
        const o = this._alerts.find((n) => n.id === i.id);
        if (!o)
          return;
        o.bind._show = !1, setTimeout(() => {
          const n = this._alerts.findIndex((a) => a.id === i.id);
          n > -1 && this._alerts.splice(n, 1);
        }, o.bind.animationDuration);
      } else
        this._alerts.forEach((o) => {
          o._show = !1;
        }), this._alerts.splice(0, this._alerts.length);
    },
    information(i) {
      return this.show({
        showCloseButton: !0,
        iconColor: "cyan",
        iconCircle: !0,
        icon: "info",
        svg: zi,
        animate: !0,
        animationDuration: 300,
        ...i
      });
    },
    confirm(i) {
      return this.show({
        showCloseButton: !0,
        showConfirmButton: !0,
        iconColor: "cyan",
        iconCircle: !0,
        icon: "help",
        svg: Ui,
        animate: !0,
        animationDuration: 300,
        ...i,
        emitCancelOnClickOutside: !0,
        emitCancelOnCloseButtonClick: !0
      });
    },
    warning(i) {
      return this.show({
        iconColor: "orange",
        icon: "attention",
        svg: pt,
        iconCircle: !0,
        showCloseButton: !0,
        animate: !0,
        animationDuration: 300,
        ...i
      });
    },
    confirmWithRisk(i) {
      return this.show({
        iconColor: "orange",
        icon: "attention",
        svg: pt,
        iconCircle: !0,
        showRiskyButton: !0,
        showCloseButton: !0,
        animate: !0,
        animationDuration: 300,
        ...i,
        emitCancelOnClickOutside: !0,
        emitCancelOnCloseButtonClick: !0
      });
    },
    error(i) {
      return this.show({
        iconColor: "red",
        iconCircle: !0,
        icon: "error",
        svg: Li,
        showCloseButton: !0,
        animate: !0,
        animationDuration: 300,
        ...i
      });
    }
  });
  return qt = t, e.provide("vuAlertDialogAPI", t), e.config.globalProperties.$vuAlertDialog = t, t;
}
const Yi = {
  name: "vu-alert-dialog-container",
  components: {
    VuAlertDialog: lt
  },
  data: () => ({
    _alerts: {
      type: Object
    }
  }),
  created() {
    this._alerts = qt._alerts;
  }
};
function Xi(e, s, t, i, o, n) {
  return l(!0), r(B, null, M(e._alerts, (a) => (l(), _(He(a.component), L({
    key: a.id
  }, a.bind, {
    modelValue: a.value,
    "onUpdate:modelValue": (d) => a.value = d
  }, Q(a.on)), null, 16, ["modelValue", "onUpdate:modelValue"]))), 128);
}
const Ji = /* @__PURE__ */ I(Yi, [["render", Xi]]), Zi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ji
}, Symbol.toStringTag, { value: "Module" })), j = {
  props: {
    modelValue: {
      type: [Object, String, Number, Array, Boolean, Date],
      default: () => ""
    },
    label: {
      type: String,
      default: () => ""
    },
    type: {
      type: String,
      default: () => "text"
    },
    helper: {
      type: String,
      default: () => ""
    },
    placeholder: {
      type: String,
      default: () => ""
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(e) {
        this.$emit("update:modelValue", e);
      }
    }
  }
}, Qi = {
  name: "vu-btn",
  mixins: [ue, it, ge, j, D],
  props: {
    large: {
      type: Boolean,
      default: () => !1
    },
    small: {
      type: Boolean,
      default: () => !1
    },
    block: {
      type: Boolean,
      default: () => !1
    },
    icon: {
      type: String,
      required: !1
    }
  },
  data: () => ({
    getListenersFromAttrs: J
    // tooltip: {},
  }),
  components: { VuIcon: A },
  computed: {
    classes() {
      return [
        `btn btn-${this.color}`,
        {
          "btn-sm": this.small,
          "btn-lg": this.large,
          "btn-block": this.block,
          active: this.active
        }
      ];
    }
  }
}, el = ["disabled"];
function tl(e, s, t, i, o, n) {
  const a = y("VuIcon"), d = F("mask");
  return V((l(), r("button", L({
    type: "button",
    disabled: e.disabled
  }, Q(e.getListenersFromAttrs(e.$attrs), !0), { class: n.classes }), [
    t.icon ? (l(), _(a, {
      key: 0,
      icon: t.icon,
      color: "inherit"
    }, null, 8, ["icon"])) : f("", !0),
    w(e.$slots, "default")
  ], 16, el)), [
    [d, e.loading]
  ]);
}
const ie = /* @__PURE__ */ I(Qi, [["render", tl]]), sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ie
}, Symbol.toStringTag, { value: "Module" })), nl = {
  name: "vu-btn-dropdown",
  components: { VuDropdownMenu: be, VuBtn: ie, VuIcon: A, VuIconBtn: T },
  props: {
    color: {
      type: String,
      default: () => "default"
    },
    icon: {
      type: String,
      required: !1
    },
    label: {
      type: String,
      required: !1
    },
    options: {
      type: Array,
      required: !1
    },
    chevronDown: {
      type: Boolean,
      default: !1,
      required: !1
    }
  }
}, il = { class: "vu-btn-dropdown flex flex-nowrap" }, ll = {
  key: 1,
  class: "caret text-grey-7"
};
function ol(e, s, t, i, o, n) {
  const a = y("VuBtn"), d = y("VuIcon"), u = y("VuDropdownMenu");
  return l(), r("div", il, [
    C(a, {
      icon: t.icon,
      color: t.color,
      class: "flex-basis-auto",
      style: P(t.options && "border-top-right-radius:0;border-bottom-right-radius:0")
    }, {
      default: S(() => [
        w(e.$slots, "default", {}, () => [
          $(g(t.label), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["icon", "color", "style"]),
    t.options ? (l(), _(u, L({ key: 0 }, { items: t.options }, {
      class: "flex-basis-[38px] ml-[2px]",
      style: { display: "flex" }
    }), {
      default: S(({ active: m }) => [
        C(a, {
          color: t.color,
          class: "dropdown_btn",
          active: m
        }, {
          default: S(() => [
            t.chevronDown ? (l(), _(d, {
              key: 0,
              icon: "chevron-down"
            })) : (l(), r("span", ll))
          ]),
          _: 2
        }, 1032, ["color", "active"])
      ]),
      _: 1
    }, 16)) : f("", !0)
  ]);
}
const al = /* @__PURE__ */ I(nl, [["render", ol], ["__scopeId", "data-v-6fe06793"]]), rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: al
}, Symbol.toStringTag, { value: "Module" })), ul = {
  name: "vu-btn-grp",
  mixins: [ue],
  props: {
    color: {
      type: String,
      default: () => "default"
    }
  }
}, dl = { class: "btn-grp" };
function cl(e, s, t, i, o, n) {
  const a = F("mask");
  return V((l(), r("div", dl, [
    w(e.$slots, "default")
  ])), [
    [a, e.loading]
  ]);
}
const hl = /* @__PURE__ */ I(ul, [["render", cl]]), fl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hl
}, Symbol.toStringTag, { value: "Module" })), ml = {
  name: "vu-carousel-slide",
  props: { title: { type: String, default: "" } },
  emits: ["slideclick", "slide-click"],
  data() {
    return {
      width: null,
      id: "",
      carousel: void 0,
      guid: ne
    };
  },
  created() {
    this.id = this.guid(), this.carousel = this.$parent;
  },
  mounted() {
    this.$isServer || this.$el.addEventListener("dragstart", (e) => e.preventDefault()), this.$el.addEventListener(
      this.carousel.isTouch ? "touchend" : "mouseup",
      this.onTouchEnd
    );
  },
  computed: {
    activeSlides() {
      const { currentPage: e = 0, breakpointSlidesPerPage: s, children: t } = this.carousel, i = [], o = t.filter(
        (a) => a.$el && a.$el.className.indexOf("vu-slide") >= 0
      ).map((a) => a._uid || a.id);
      let n = 0;
      for (; n < s; ) {
        const a = o[e * s + n];
        i.push(a), n++;
      }
      return i;
    },
    /**
     * `isActive` describes whether a slide is visible
     * @return {Boolean}
     */
    isActive() {
      return this.activeSlides.indexOf(this._uid) >= 0;
    },
    /**
     * `isCenter` describes whether a slide is in the center of all visible slides
     * if perPage is an even number, we quit
     * @return {Boolean}
     */
    isCenter() {
      const { breakpointSlidesPerPage: e } = this.carousel;
      return e % 2 === 0 || !this.isActive ? !1 : this.activeSlides.indexOf(this._uid) === Math.floor(e / 2);
    },
    /**
     * `isAdjustableHeight` describes if the carousel adjusts its height to the active slide(s)
     * @return {Boolean}
     */
    isAdjustableHeight() {
      const { adjustableHeight: e } = this.carousel;
      return e;
    }
  },
  methods: {
    onTouchEnd(e) {
      const s = this.carousel.isTouch && e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : e.clientX, t = this.carousel.dragStartX - s;
      (this.carousel.minSwipeDistance === 0 || Math.abs(t) < this.carousel.minSwipeDistance) && (this.$emit("slideclick", { ...e.currentTarget.dataset }), this.$emit("slide-click", { ...e.currentTarget.dataset }));
    }
  }
}, pl = ["aria-hidden"];
function gl(e, s, t, i, o, n) {
  return l(), r("div", {
    class: v(["vu-slide", {
      "vu-slide-active": n.isActive,
      "vu-slide-center": n.isCenter,
      "vu-slide-adjustableHeight": n.isAdjustableHeight
    }]),
    tabindex: "-1",
    "aria-hidden": !n.isActive,
    role: "tabpanel"
  }, [
    w(e.$slots, "default")
  ], 10, pl);
}
const vl = /* @__PURE__ */ I(ml, [["render", gl]]), yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vl
}, Symbol.toStringTag, { value: "Module" })), bl = {
  props: {
    /**
     * Flag to enable autoplay
     */
    autoplay: {
      type: Boolean,
      default: !1
    },
    /**
     * Time elapsed before advancing slide
     */
    autoplayTimeout: {
      type: Number,
      default: 3e3
    },
    /**
     * Flag to pause autoplay on hover
     */
    autoplayHoverPause: {
      type: Boolean,
      default: !0
    },
    /**
     * Autoplay direction. User can insert backward to make autoplay move from right to left
     */
    autoplayDirection: {
      type: String,
      default: "forward"
    }
  },
  data() {
    return {
      autoplayInterval: null
    };
  },
  destroyed() {
    this.$isServer || (this.$el.removeEventListener("mouseenter", this.pauseAutoplay), this.$el.removeEventListener("mouseleave", this.startAutoplay));
  },
  methods: {
    pauseAutoplay() {
      this.autoplayInterval && (this.autoplayInterval = clearInterval(this.autoplayInterval));
    },
    startAutoplay() {
      this.autoplay && (this.autoplayInterval = setInterval(
        this.autoplayAdvancePage,
        this.autoplayTimeout
      ));
    },
    restartAutoplay() {
      this.pauseAutoplay(), this.startAutoplay();
    },
    autoplayAdvancePage() {
      this.advancePage(this.autoplayDirection);
    }
  },
  mounted() {
    !this.$isServer && this.autoplayHoverPause && (this.$el.addEventListener("mouseenter", this.pauseAutoplay), this.$el.addEventListener("mouseleave", this.startAutoplay)), this.startAutoplay();
  }
}, _l = (e, s, t) => {
  let i;
  return () => {
    const n = () => {
      i = null, t || e.apply(void 0);
    }, a = t && !i;
    clearTimeout(i), i = setTimeout(n, s), a && e.apply(void 0);
  };
}, Ae = {
  onwebkittransitionend: "webkitTransitionEnd",
  onmoztransitionend: "transitionend",
  onotransitionend: "oTransitionEnd otransitionend",
  ontransitionend: "transitionend"
}, gt = () => {
  const e = Object.keys(Ae).find((s) => s in window);
  return e ? Ae[e] : Ae.ontransitionend;
}, wl = {
  name: "vu-carousel",
  emits: ["pageChange", "page-change", "update:modelValue", "navigation-click", "pagination-click", "transitionStart", "transition-start", "transitionEnd", "transition-end", "mounted"],
  beforeUpdate() {
    this.computeCarouselWidth();
  },
  data() {
    return {
      browserWidth: null,
      carouselWidth: 0,
      currentPage: 0,
      dragging: !1,
      dragMomentum: 0,
      dragOffset: 0,
      dragStartY: 0,
      dragStartX: 0,
      isTouch: typeof window < "u" && "ontouchstart" in window,
      offset: 0,
      refreshRate: 16,
      slideCount: 0,
      transitionstart: "transitionstart",
      transitionend: "transitionend",
      currentHeight: "auto"
    };
  },
  mixins: [bl],
  // use `provide` to avoid `Slide` being nested with other components
  provide() {
    return {
      carousel: this
    };
  },
  props: {
    /**
       *  Adjust the height of the carousel for the current slide
       */
    adjustableHeight: {
      type: Boolean,
      default: !1
    },
    /**
       * Slide transition easing for adjustableHeight
       * Any valid CSS transition easing accepted
       */
    adjustableHeightEasing: {
      type: String,
      default: ""
    },
    /**
       *  Center images when the size is less than the container width
       */
    centerMode: {
      type: Boolean,
      default: !1
    },
    /**
       * Slide transition easing
       * Any valid CSS transition easing accepted
       */
    easing: {
      type: String,
      validator(e) {
        return ["ease", "linear", "ease-in", "ease-out", "ease-in-out"].indexOf(e) !== -1 || e.includes("cubic-bezier");
      },
      default: "ease"
    },
    /**
       * Flag to make the carousel loop around when it reaches the end
       */
    loop: {
      type: Boolean,
      default: !1
    },
    /**
       * Minimum distance for the swipe to trigger
       * a slide advance
       */
    minSwipeDistance: {
      type: Number,
      default: 8
    },
    /**
       * Flag to toggle mouse dragging
       */
    mouseDrag: {
      type: Boolean,
      default: !0
    },
    /**
       * Flag to toggle touch dragging
       */
    touchDrag: {
      type: Boolean,
      default: !0
    },
    /**
       * Flag to render pagination component
       */
    pagination: {
      type: Boolean,
      default: !0
    },
    /**
       * Maximum number of slides displayed on each page
       */
    perPage: {
      type: Number,
      default: 1
    },
    /**
       * Configure the number of visible slides with a particular browser width.
       * This will be an array of arrays, ex. [[320, 2], [1199, 4]]
       * Formatted as [x, y] where x=browser width, and y=number of slides displayed.
       * ex. [1199, 4] means if (window <= 1199) then show 4 slides per page
       */
    // eslint-disable-next-line vue/require-default-prop
    perPageCustom: {
      type: Array
    },
    /**
       * Resistance coefficient to dragging on the edge of the carousel
       * This dictates the effect of the pull as you move towards the boundaries
       */
    resistanceCoef: {
      type: Number,
      default: 20
    },
    /**
       * Scroll per page, not per item
       */
    scrollPerPage: {
      type: Boolean,
      default: !1
    },
    /**
       *  Space padding option adds left and right padding style (in pixels) onto vu-carousel-inner.
       */
    spacePadding: {
      type: Number,
      default: 0
    },
    /**
       *  Specify by how much should the space padding value be multiplied of, to re-arange the final slide padding.
       */
    spacePaddingMaxOffsetFactor: {
      type: Number,
      default: 0
    },
    /**
       * Slide transition speed
       * Number of milliseconds accepted
       */
    speed: {
      type: Number,
      default: 500
    },
    /**
       * Name (tag) of slide component
       * Overwrite when extending slide component
       */
    tagName: {
      type: String,
      default: "slide"
    },
    /**
       * Support for v-model functionality
       */
    modelValue: {
      type: Number,
      default: 0
    },
    /**
       * Support Max pagination dot amount
       */
    maxPaginationDotCount: {
      type: Number,
      default: -1
    }
  },
  watch: {
    value(e) {
      e !== this.currentPage && (this.goToPage(e), this.render());
    },
    currentPage(e) {
      this.$emit("pageChange", e), this.$emit("page-change", e), this.$emit("update:modelValue", e);
    },
    autoplay(e) {
      e === !1 ? this.pauseAutoplay() : this.restartAutoplay();
    }
  },
  computed: {
    children() {
      return this.$slots && this.$slots.default() && this.$slots.default().filter((e) => e.tag && e.tag.match(
        `^vue-component-\\d+-${this.tagName}$`
      ) !== null) || [];
    },
    /**
       * Given a viewport width, find the number of slides to display
       * @param  {Number} width Current viewport width in pixels
       * @return {Number} Number of slides to display
       */
    breakpointSlidesPerPage() {
      if (!this.perPageCustom)
        return this.perPage;
      const e = this.perPageCustom, s = this.browserWidth, i = e.sort(
        (n, a) => n[0] > a[0] ? -1 : 1
      ).filter((n) => s >= n[0]);
      return i[0] && i[0][1] || this.perPage;
    },
    /**
       * @return {Boolean} Can the slider move forward?
       */
    canAdvanceForward() {
      return this.loop || this.offset < this.maxOffset;
    },
    /**
       * @return {Boolean} Can the slider move backward?
       */
    canAdvanceBackward() {
      return this.loop || this.currentPage > 0;
    },
    /**
       * Number of slides to display per page in the current context.
       * This is constant unless responsive perPage option is set.
       * @return {Number} The number of slides per page to display
       */
    currentPerPage() {
      return !this.perPageCustom || this.$isServer ? this.perPage : this.breakpointSlidesPerPage;
    },
    /**
       * The horizontal distance the inner wrapper is offset while navigating.
       * @return {Number} Pixel value of offset to apply
       */
    currentOffset() {
      return this.isCenterModeEnabled ? 0 : (this.offset + this.dragOffset) * -1;
    },
    isHidden() {
      return this.carouselWidth <= 0;
    },
    /**
       * Maximum offset the carousel can slide
       * Considering the spacePadding
       * @return {Number}
       */
    maxOffset() {
      return Math.max(
        this.slideWidth * (this.slideCount - this.currentPerPage) - this.spacePadding * this.spacePaddingMaxOffsetFactor,
        0
      );
    },
    /**
       * Calculate the number of pages of slides
       * @return {Number} Number of pages
       */
    pageCount() {
      return this.scrollPerPage ? Math.ceil(this.slideCount / this.currentPerPage) : this.slideCount - this.currentPerPage + 1;
    },
    /**
       * Calculate the width of each slide
       * @return {Number} Slide width
       */
    slideWidth() {
      const e = this.carouselWidth - this.spacePadding * 2, s = this.currentPerPage;
      return e / s;
    },
    /**
       * @return {Boolean} Is navigation required?
       */
    isNavigationRequired() {
      return this.slideCount > this.currentPerPage;
    },
    /**
       * @return {Boolean} Center images when have less than min currentPerPage value
       */
    isCenterModeEnabled() {
      return this.centerMode && !this.isNavigationRequired;
    },
    transitionStyle() {
      const e = `${this.speed / 1e3}s`, s = `${e} ${this.easing} transform`;
      return this.adjustableHeight ? `${s}, height ${e} ${this.adjustableHeightEasing || this.easing}` : s;
    },
    padding() {
      const e = this.spacePadding;
      return e > 0 ? e : !1;
    }
  },
  methods: {
    /**
       * @return {Number} The index of the next page
       * */
    getNextPage() {
      return this.currentPage < this.pageCount - 1 ? this.currentPage + 1 : this.loop ? 0 : this.currentPage;
    },
    /**
       * @return {Number} The index of the previous page
       * */
    getPreviousPage() {
      return this.currentPage > 0 ? this.currentPage - 1 : this.loop ? this.pageCount - 1 : this.currentPage;
    },
    /**
       * Increase/decrease the current page value
       * @param  {String} direction (Optional) The direction to advance
       */
    advancePage(e) {
      e === "backward" && this.canAdvanceBackward ? this.goToPage(this.getPreviousPage(), "navigation") : (!e || e !== "backward") && this.canAdvanceForward && this.goToPage(this.getNextPage(), "navigation");
    },
    goToLastSlide() {
      this.dragging = !0, setTimeout(() => {
        this.dragging = !1;
      }, this.refreshRate), this.$nextTick(() => {
        this.goToPage(this.pageCount);
      });
    },
    /**
       * A mutation observer is used to detect changes to the containing node
       * in order to keep the magnet container in sync with the height its reference node.
       */
    attachMutationObserver() {
      const e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      if (e) {
        let s = {
          attributes: !0,
          data: !0
        };
        if (this.adjustableHeight && (s = {
          ...s,
          childList: !0,
          subtree: !0,
          characterData: !0
        }), this.mutationObserver = new e(() => {
          this.$nextTick(() => {
            this.computeCarouselWidth(), this.computeCarouselHeight();
          });
        }), this.$parent.$el) {
          const t = this.$el.getElementsByClassName(
            "vu-carousel-inner"
          );
          for (let i = 0; i < t.length; i++)
            this.mutationObserver.observe(t[i], s);
        }
      }
    },
    handleNavigation(e) {
      this.advancePage(e), this.pauseAutoplay(), this.$emit("navigation-click", e);
    },
    /**
       * Stop listening to mutation changes
       */
    detachMutationObserver() {
      this.mutationObserver && this.mutationObserver.disconnect();
    },
    /**
       * Get the current browser viewport width
       * @return {Number} Browser"s width in pixels
       */
    getBrowserWidth() {
      return this.browserWidth = window.innerWidth, this.browserWidth;
    },
    /**
       * Get the width of the carousel DOM element
       * @return {Number} Width of the carousel in pixels
       */
    getCarouselWidth() {
      const e = this.$el.getElementsByClassName(
        "vu-carousel-inner"
      );
      for (let s = 0; s < e.length; s++)
        e[s].clientWidth > 0 && (this.carouselWidth = e[s].clientWidth || 0);
      return this.carouselWidth;
    },
    /**
       * Get the maximum height of the carousel active slides
       * @return {String} The carousel height
       */
    getCarouselHeight() {
      if (!this.adjustableHeight)
        return "auto";
      const e = this.currentPerPage * (this.currentPage + 1) - 1, s = [...Array(this.currentPerPage)].map((t, i) => this.getSlide(e + i)).reduce(
        (t, i) => Math.max(t, i && i.$el.clientHeight || 0),
        0
      );
      return this.currentHeight = s === 0 ? "auto" : `${s}px`, this.currentHeight;
    },
    /**
       * Filter slot contents to slide instances and return length
       * @return {Number} The number of slides
       */
    getSlideCount() {
      return this.children.length;
    },
    /**
       * Gets the slide at the specified index
       * @return {Object} The slide at the specified index
       */
    getSlide(e) {
      return this.children[e];
    },
    /**
       * Set the current page to a specific value
       * This function will only apply the change if the value is within the carousel bounds
       * for carousel scrolling per page.
       * @param  {Number} page The value of the new page number
       * @param  {string|undefined} advanceType An optional value describing the type of page advance
       */
    goToPage(e, s) {
      e >= 0 && e <= this.pageCount && (this.offset = this.scrollPerPage ? Math.min(this.slideWidth * this.currentPerPage * e, this.maxOffset) : this.slideWidth * e, this.autoplay && !this.autoplayHoverPause && this.restartAutoplay(), this.currentPage = e, s === "pagination" && (this.pauseAutoplay(), this.$emit("pagination-click", e)));
    },
    /**
       * Trigger actions when mouse is pressed
       * @param  {Object} e The event object
       */
    /* istanbul ignore next */
    onStart(e) {
      e.button !== 2 && (document.addEventListener(this.isTouch ? "touchend" : "mouseup", this.onEnd, !0), document.addEventListener(this.isTouch ? "touchmove" : "mousemove", this.onDrag, !0), this.startTime = e.timeStamp, this.dragging = !0, this.dragStartX = this.isTouch ? e.touches[0].clientX : e.clientX, this.dragStartY = this.isTouch ? e.touches[0].clientY : e.clientY);
    },
    /**
       * Trigger actions when mouse is released
       * @param  {Object} e The event object
       */
    onEnd(e) {
      this.autoplay && !this.autoplayHoverPause && this.restartAutoplay(), this.pauseAutoplay();
      const s = this.isTouch ? e.changedTouches[0].clientX : e.clientX, t = this.dragStartX - s;
      if (this.dragMomentum = t / (e.timeStamp - this.startTime), this.minSwipeDistance !== 0 && Math.abs(t) >= this.minSwipeDistance) {
        const i = this.scrollPerPage ? this.slideWidth * this.currentPerPage : this.slideWidth;
        this.dragOffset += Math.sign(t) * (i / 2);
      }
      this.offset += this.dragOffset, this.dragOffset = 0, this.dragging = !1, this.render(), document.removeEventListener(this.isTouch ? "touchend" : "mouseup", this.onEnd, !0), document.removeEventListener(this.isTouch ? "touchmove" : "mousemove", this.onDrag, !0);
    },
    /**
       * Trigger actions when mouse is pressed and then moved (mouse drag)
       * @param  {Object} e The event object
       */
    onDrag(e) {
      const s = this.isTouch ? e.touches[0].clientX : e.clientX, t = this.isTouch ? e.touches[0].clientY : e.clientY, i = this.dragStartX - s, o = this.dragStartY - t;
      if (this.isTouch && Math.abs(i) < Math.abs(o))
        return;
      e.stopImmediatePropagation(), this.dragOffset = i;
      const n = this.offset + this.dragOffset;
      n < 0 ? this.dragOffset = -Math.sqrt(-this.resistanceCoef * this.dragOffset) : n > this.maxOffset && (this.dragOffset = Math.sqrt(this.resistanceCoef * this.dragOffset));
    },
    onResize() {
      this.computeCarouselWidth(), this.computeCarouselHeight(), this.dragging = !0, this.render(), setTimeout(() => {
        this.dragging = !1;
      }, this.refreshRate);
    },
    render() {
      this.offset += Math.max(-this.currentPerPage + 1, Math.min(
        Math.round(this.dragMomentum),
        this.currentPerPage - 1
      )) * this.slideWidth;
      const e = this.scrollPerPage ? this.slideWidth * this.currentPerPage : this.slideWidth, s = e * Math.floor(this.slideCount / (this.currentPerPage - 1)), t = s + this.slideWidth * (this.slideCount % this.currentPerPage);
      this.offset > (s + t) / 2 ? this.offset = t : this.offset = e * Math.round(this.offset / e), this.offset = Math.max(0, Math.min(this.offset, this.maxOffset)), this.currentPage = this.scrollPerPage ? Math.round(this.offset / this.slideWidth / this.currentPerPage) : Math.round(this.offset / this.slideWidth);
    },
    /**
       * Re-compute the width of the carousel and its slides
       */
    computeCarouselWidth() {
      this.getSlideCount(), this.getBrowserWidth(), this.getCarouselWidth(), this.setCurrentPageInBounds();
    },
    /**
       * Re-compute the height of the carousel and its slides
       */
    computeCarouselHeight() {
      this.getCarouselHeight();
    },
    /**
       * When the current page exceeds the carousel bounds, reset it to the maximum allowed
       */
    setCurrentPageInBounds() {
      if (!this.canAdvanceForward && this.scrollPerPage) {
        const e = this.pageCount - 1;
        this.currentPage = e >= 0 ? e : 0, this.offset = Math.max(0, Math.min(this.offset, this.maxOffset));
      }
    },
    handleTransitionStart() {
      this.$emit("transitionStart"), this.$emit("transition-start");
    },
    handleTransitionEnd() {
      this.$emit("transitionEnd"), this.$emit("transition-end");
    }
  },
  mounted() {
    window.addEventListener(
      "resize",
      _l(this.onResize, this.refreshRate)
    ), (this.isTouch && this.touchDrag || this.mouseDrag) && this.$refs["vu-carousel-wrapper"].addEventListener(
      this.isTouch ? "touchstart" : "mousedown",
      this.onStart
    ), this.attachMutationObserver(), this.computeCarouselWidth(), this.computeCarouselHeight(), this.transitionstart = gt(), this.$refs["vu-carousel-inner"].addEventListener(this.transitionstart, this.handleTransitionStart), this.transitionend = gt(), this.$refs["vu-carousel-inner"].addEventListener(this.transitionend, this.handleTransitionEnd), this.$emit("mounted"), this.autoplayDirection === "backward" && this.goToLastSlide();
  },
  beforeUnmount() {
    this.detachMutationObserver(), window.removeEventListener("resize", this.getBrowserWidth), this.$refs["vu-carousel-inner"].removeEventListener(
      this.transitionstart,
      this.handleTransitionStart
    ), this.$refs["vu-carousel-inner"].removeEventListener(
      this.transitionend,
      this.handleTransitionEnd
    ), this.$refs["vu-carousel-wrapper"].removeEventListener(
      this.isTouch ? "touchstart" : "mousedown",
      this.onStart
    );
  }
}, kl = { class: "vu-carousel" }, Sl = {
  class: "vu-carousel-wrapper",
  ref: "vu-carousel-wrapper"
}, Cl = {
  key: 0,
  class: "carousel-indicators"
}, Il = ["onClick"];
function Bl(e, s, t, i, o, n) {
  return l(), r("div", kl, [
    c("div", Sl, [
      c("div", {
        ref: "vu-carousel-inner",
        class: v([
          "vu-carousel-inner",
          { "vu-carousel-inner--center": n.isCenterModeEnabled }
        ]),
        style: P({
          transform: `translate(${n.currentOffset}px, 0)`,
          transition: o.dragging ? "none" : n.transitionStyle,
          "ms-flex-preferred-size": `${n.slideWidth}px`,
          "webkit-flex-basis": `${n.slideWidth}px`,
          "flex-basis": `${n.slideWidth}px`,
          visibility: n.slideWidth ? "visible" : "hidden",
          height: `${o.currentHeight}`,
          "padding-left": `${n.padding}px`,
          "padding-right": `${n.padding}px`
        })
      }, [
        w(e.$slots, "default")
      ], 6)
    ], 512),
    t.pagination && n.pageCount > 1 ? (l(), r("ol", Cl, [
      (l(!0), r(B, null, M(n.pageCount, (a, d) => (l(), r("li", {
        key: `carousel-pagination_${d}`,
        class: v(["indicator", { active: d === o.currentPage }]),
        onClick: (u) => n.goToPage(d, "pagination")
      }, null, 10, Il))), 128))
    ])) : f("", !0)
  ]);
}
const Ol = /* @__PURE__ */ I(wl, [["render", Bl]]), Vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ol
}, Symbol.toStringTag, { value: "Module" })), R = {
  exposes: ["validate"],
  props: {
    rules: {
      type: [Array],
      default: () => [() => !0]
    },
    required: {
      type: Boolean,
      default: () => !1
    },
    success: {
      type: Boolean,
      default: () => !1
    }
  },
  data: () => ({
    errorBucket: [],
    valid: !0,
    localRules: []
  }),
  inject: {
    vuDebug: {
      default: !1
    }
  },
  watch: {
    value(e) {
      this.valid = this.validate(e);
    }
  },
  computed: {
    classes() {
      return {
        "has-error": !this.valid,
        "has-success": this.success && this.valid
      };
    },
    hasError() {
      return this.errorBucket.length > 0;
    },
    hasSuccess() {
      return this.errorBucket.length === 0;
    },
    isValid() {
      if (!this.required)
        return !0;
      switch (typeof this.value) {
        case "string":
        case "array":
        case "number":
        case "date":
          return this.value.length !== 0;
        default:
          return !0;
      }
    }
  },
  methods: {
    validate(e, s) {
      const t = [];
      let i = 0;
      const o = e || this.value, n = [...this.localRules, ...this.rules];
      for (let a = 0; a < n.length; a++) {
        const d = n[a], u = typeof d == "function" ? d(o) : d;
        typeof u == "string" ? (t.push(u), i += 1) : typeof u == "boolean" && !u ? i += 1 : typeof u != "boolean" && this.vuDebug && console.error(`Rules should return a string or boolean, received '${typeof u}' instead`, this);
      }
      return s && (this.errorBucket = t), this.valid = i === 0 && this.isValid, this.valid;
    }
  }
}, $l = {
  data: () => ({
    inputs: []
  }),
  exposes: ["validate"],
  provide() {
    return {
      inputs: this.inputs
    };
  },
  methods: {
    validate(e) {
      return this.inputs.map((s) => s.validate(void 0, e)).reduce((s, t) => s && t, !0);
    }
  }
}, U = {
  inject: {
    inputs: {
      default: () => ""
    }
  },
  created() {
    typeof this.inputs == "object" && this.inputs.push(this);
  },
  beforeUnmount() {
    typeof this.inputs == "object" && this.inputs.splice(this.inputs.indexOf(this), 1);
  }
}, vt = [...Array(256).keys()].map((e) => e.toString(16).padStart(2, "0")), le = () => {
  const e = crypto.getRandomValues(new Uint8Array(16));
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, [...e.entries()].map(([s, t]) => [4, 6, 8, 10].includes(s) ? `-${vt[t]}` : vt[t]).join("");
}, Ml = {
  name: "vu-checkbox",
  mixins: [j, R, U, D],
  emits: ["update:modelValue"],
  inheritAttrs: !1,
  props: {
    dense: {
      type: Boolean,
      default: () => !1
    },
    switch: {
      type: Boolean,
      required: !1
    },
    type: {
      type: String,
      default: () => "checkbox"
    }
  },
  data: () => ({ uid: le() }),
  computed: {
    internalClasses() {
      return {
        "toggle-switch": this.type === "switch",
        "toggle-primary": ["checkbox", "radio", "dense"].includes(this.type)
      };
    }
  },
  methods: {
    input(e) {
      if (this.options.length > 1 && this.type !== "radio") {
        if (e.target.checked)
          return this.$emit("update:modelValue", [e.target.value].concat(this.value));
        const s = JSON.parse(JSON.stringify(this.value));
        return s.splice(this.value.indexOf(e.target.value), 1), this.$emit("update:modelValue", s);
      }
      return this.$emit("update:modelValue", e.target.checked ? e.target.value : null);
    },
    isChecked(e) {
      return Array.isArray(this.value) ? this.value.includes(e) : this.type === "radio" ? this.value === e : !!this.value;
    }
  }
}, Pl = {
  key: 0,
  class: "control-label"
}, xl = {
  key: 0,
  class: "label-field-required"
}, Ll = ["type", "id", "value", "disabled", "checked"], Tl = ["innerHTML", "for"], Al = {
  key: 1,
  class: "form-control-helper-text"
};
function Fl(e, s, t, i, o, n) {
  return l(), r("div", {
    class: v(["form-group", { dense: t.dense }])
  }, [
    e.label.length ? (l(), r("label", Pl, [
      $(g(e.label), 1),
      e.required ? (l(), r("span", xl, " *")) : f("", !0)
    ])) : f("", !0),
    (l(!0), r(B, null, M(e.options, (a, d) => (l(), r("div", {
      key: `${e.uid}-${a.value}-${d}`,
      class: v(["toggle", n.internalClasses])
    }, [
      (l(), r("input", {
        type: t.type === "radio" ? "radio" : "checkbox",
        id: `${e.uid}-${a.value}-${d}`,
        value: a.value,
        disabled: e.disabled || a.disabled,
        checked: n.isChecked(a.value),
        key: n.isChecked(a.value),
        onClick: s[0] || (s[0] = q((...u) => n.input && n.input(...u), ["prevent"]))
      }, null, 8, Ll)),
      c("label", {
        class: "control-label",
        innerHTML: a.label,
        for: `${e.uid}-${a.value}-${d}`
      }, null, 8, Tl),
      w(e.$slots, "prepend-icon", { item: a }, void 0, !0)
    ], 2))), 128)),
    (l(!0), r(B, null, M(e.errorBucket, (a, d) => (l(), r("span", {
      key: `${d}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, g(a), 1))), 128)),
    e.helper.length ? (l(), r("span", Al, g(e.helper), 1)) : f("", !0)
  ], 2);
}
const Ht = /* @__PURE__ */ I(Ml, [["render", Fl], ["__scopeId", "data-v-d2a89048"]]), Dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ht
}, Symbol.toStringTag, { value: "Module" })), Wt = (e) => e instanceof Date && !Number.isNaN(e.getTime()), zl = (e) => e % 4 === 0 && e % 100 !== 0 || e % 400 === 0, Nl = (e, s) => [31, zl(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][s], yt = (e, s) => e.getTime() === s.getTime(), El = (e) => {
  let s;
  if (Wt(e))
    s = e;
  else if (e && typeof e == "string")
    try {
      s = new Date(Date.parse(e));
    } catch {
    }
  return s;
}, Te = {
  emits: ["update:modelValue", "boundary-change"],
  props: {
    modelValue: {
      type: [Array],
      default: () => []
    },
    min: {
      type: [Number, Date],
      default: () => -22089888e5
      // 1900-01-01Z00:00:00.000Z
    },
    max: {
      type: [Number, Date],
      default: () => 4102444799999
      // 2099-12-31T23:59:59.999Z
    }
  },
  data: () => ({
    getListenersFromAttrs: J
  }),
  watch: {
    min: {
      handler(e) {
        this.checkBoundary(e, "min");
      },
      immediate: !0
    },
    max: {
      handler(e) {
        this.checkBoundary(e, "max");
      },
      immediate: !0
    }
  },
  methods: {
    checkBoundary(e, s) {
      if (!this.value)
        return;
      const t = this.getListenersFromAttrs(this.$attrs)["boundary-change"] ? "boundary-change" : "update:modelValue";
      (["min"].includes(s) && this.value < e || ["max"].includes(s) && this.value > e) && (e ? this.$emit(t, t === "update:modelValue" ? new Date(e) : { boundary: s, value: new Date(e) }) : this.$emit(t, t === "update:modelValue" ? e : { boundary: s, value: e }));
    }
  }
}, jl = {
  name: "vu-datepicker-table-date",
  mixins: [Te],
  emits: ["select"],
  props: {
    date: {
      type: Date
    },
    year: {
      type: Number,
      required: !0
    },
    month: {
      type: Number,
      required: !0
    },
    unselectableDaysOfWeek: {
      type: Array[Number],
      default: () => []
    },
    firstDay: {
      type: Number,
      default: () => 0
    },
    showWeekNumber: {
      type: Boolean,
      required: !1
    },
    isRTL: {
      type: Boolean,
      required: !1
    },
    // i18n
    weekdaysLabels: {
      type: Array,
      required: !0
    },
    weekdaysShortLabels: {
      type: Array,
      required: !0
    }
  },
  methods: {
    renderTable(e) {
      return H("table", {
        class: "datepicker-table",
        attrs: { cellspacing: "0", cellpadding: "0" }
      }, [
        this.renderHead(),
        this.renderBody(e)
      ]);
    },
    renderHead() {
      const e = [];
      for (let s = 0; s < 7; s++) {
        const t = H("th", {
          attrs: { scope: "col", cellspacing: "0", cellpadding: "0" }
        }, [
          H("abbr", {
            attrs: {
              title: this.renderDayName(s)
            }
          }, this.renderDayName(s, !0))
        ]);
        e.push(t);
      }
      return H("thead", {}, e);
    },
    renderBody(e) {
      return H("tbody", {}, e);
    },
    renderWeek(e, s, t) {
      const i = new Date(t, 0, 1), o = Math.ceil(((new Date(t, s, e) - i) / 864e5 + i.getDay() + 1) / 7), n = `datepicker${this.week}`;
      return H("td", { class: n }, o);
    },
    renderDayName(e, s) {
      let t = e + this.firstDay;
      for (; t >= 7; )
        t -= 7;
      return s ? this.weekdaysShortLabels[t] : this.weekdaysLabels[t];
    },
    renderDay(e, s, t, i, o, n, a) {
      const d = [];
      return a ? H("td", { class: "is-empty" }) : (n && d.push("is-disabled"), o && d.push("is-today"), i && d.push("is-selected"), H("td", {
        class: d.join(" "),
        attrs: {
          "data-day": e
        }
      }, [
        H("button", {
          class: "datepicker-button datepicker-name",
          type: "button",
          "data-year": t,
          "data-month": s,
          "data-day": e,
          onClick: this.onSelect
        }, e)
      ]));
    },
    renderRow(e) {
      return H("tr", {}, e);
    },
    onSelect(e) {
      const s = e.target.getAttribute("data-year"), t = e.target.getAttribute("data-month"), i = e.target.getAttribute("data-day");
      this.$emit("select", new Date(s, t, i));
    }
  },
  render() {
    const e = /* @__PURE__ */ new Date();
    e.setHours(0, 0, 0, 0);
    const s = Nl(this.year, this.month);
    let t = new Date(this.year, this.month, 1).getDay();
    const i = [];
    let o = [], n, a;
    for (this.firstDay > 0 && (t -= this.firstDay, t < 0 && (t += 7)), n = s + t, a = n; a > 7; )
      a -= 7;
    n += 7 - a;
    for (let d = 0, u = 0; d < n; d++) {
      const m = new Date(this.year, this.month, 1 + (d - t)), h = Date.parse(this.min), p = Date.parse(this.max), b = h && m < h || p && m > p || this.unselectableDaysOfWeek && this.unselectableDaysOfWeek.indexOf(m.getDay()) > -1, k = Wt(this.date) ? yt(m, this.date) : !1, O = yt(m, e), z = d < t || d >= s + t;
      o.push(this.renderDay(1 + (d - t), this.month, this.year, k, O, b, z)), ++u === 7 && (this.showWeekNumber && o.unshift(this.renderWeek(d - t, this.month, this.year)), i.push(this.renderRow(o, this.isRTL)), o = [], u = 0);
    }
    return this.renderTable(i);
  }
}, Rl = {
  name: "vu-datepicker",
  mixins: [ve, Te],
  components: {
    "vu-datepicker-table-date": jl
  },
  props: {
    className: { type: String, default: "" },
    modelValue: {
      type: [String, Date],
      default: () => ""
    },
    unselectableDaysOfWeek: {
      type: Array[Number],
      default: () => []
    },
    yearRange: {
      type: Number,
      default: () => 10
    },
    firstDay: {
      type: Number,
      default: () => 1
    },
    // i18n
    previousMonthLabel: {
      type: String,
      default: () => "Next Month"
    },
    nextMonthLabel: {
      type: String,
      default: () => "Previous Month"
    },
    monthsLabels: {
      type: Array,
      default: () => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    weekdaysLabels: {
      type: Array,
      default: () => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    weekdaysShortLabels: {
      type: Array,
      default: () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    showWeekNumber: {
      type: Boolean,
      required: !1
    },
    isRTL: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  data: () => ({
    left: 0,
    top: 38,
    month: 0,
    year: 0
  }),
  computed: {
    date: {
      get() {
        return this.value;
      },
      set(e) {
        return this.$emit("update:modelValue", e);
      }
    },
    isEmpty() {
      return this.value === null || this.value === "" || this.value === void 0;
    },
    currentMonth() {
      return this.monthsLabels[this.month];
    },
    minYear() {
      return new Date(this.min).getFullYear();
    },
    minMonth() {
      return new Date(this.min).getMonth();
    },
    maxYear() {
      return new Date(this.max).getFullYear();
    },
    maxMonth() {
      return new Date(this.max).getMonth();
    },
    hasPrevMonth() {
      return !(this.year === this.minYear && (this.month === 0 || this.minMonth >= this.month));
    },
    hasNextMonth() {
      return !(this.year === this.maxYear && (this.month === 11 || this.maxMonth <= this.month));
    },
    selectableMonths() {
      return this.monthsLabels.map((e, s) => {
        const t = this.year === this.minYear && s < this.minMonth || this.year === this.maxYear && s > this.maxMonth;
        return {
          value: s,
          label: e,
          disabled: t
        };
      });
    },
    selectableYears() {
      const e = Math.max(this.year - this.yearRange, this.minYear), s = Math.min(this.year + 1 + this.yearRange, this.maxYear + 1);
      return Array(s - e).fill({}).map((i, o) => ({ value: e + o }));
    }
  },
  watch: {
    innerShow(e) {
      e && this.setCurrent();
    },
    value() {
      this.innerShow && this.setCurrent();
    },
    month(e) {
      e > 11 ? (this.year++, this.month = 0) : e < 0 && (this.month = 11, this.year--);
    }
  },
  methods: {
    setCurrent() {
      const e = El(this.date) || /* @__PURE__ */ new Date();
      this.month = e.getMonth(), this.year = e.getFullYear();
    },
    onSelect(e) {
      this.month = e.getMonth(), this.year = e.getFullYear(), this.date = e;
    }
  }
}, Ul = { class: "datepicker-calendar" }, ql = { class: "datepicker-title" }, Hl = { class: "datepicker-label" }, Wl = ["disabled", "value"], Kl = { class: "datepicker-label" }, Gl = ["disabled", "value"];
function Yl(e, s, t, i, o, n) {
  const a = y("vu-datepicker-table-date");
  return e.innerShow ? (l(), r("div", {
    key: 0,
    class: v(["datepicker datepicker-root", t.className])
  }, [
    c("div", Ul, [
      c("div", ql, [
        c("div", Hl, [
          $(g(n.currentMonth) + " ", 1),
          V(c("select", {
            class: "datepicker-select datepicker-select-month",
            "onUpdate:modelValue": s[0] || (s[0] = (d) => e.month = d)
          }, [
            (l(!0), r(B, null, M(n.selectableMonths, (d) => (l(), r("option", {
              key: d.value,
              disabled: d.disabled,
              value: d.value
            }, g(d.label), 9, Wl))), 128))
          ], 512), [
            [ct, e.month]
          ])
        ]),
        c("div", Kl, [
          $(g(e.year) + " ", 1),
          V(c("select", {
            class: "datepicker-select datepicker-select-year",
            "onUpdate:modelValue": s[1] || (s[1] = (d) => e.year = d)
          }, [
            (l(!0), r(B, null, M(n.selectableYears, (d) => (l(), r("option", {
              key: d.value,
              disabled: d.disabled,
              value: d.value
            }, g(d.value), 9, Gl))), 128))
          ], 512), [
            [ct, e.year]
          ])
        ]),
        c("button", {
          class: v(["datepicker-prev", { "is-disabled": !n.hasPrevMonth }]),
          type: "button",
          onClick: s[2] || (s[2] = (d) => n.hasPrevMonth && e.month--)
        }, g(t.previousMonthLabel), 3),
        c("button", {
          class: v(["datepicker-next", { "is-disabled": !n.hasNextMonth }]),
          type: "button",
          onClick: s[3] || (s[3] = (d) => n.hasNextMonth && e.month++)
        }, g(t.nextMonthLabel), 3)
      ]),
      C(a, {
        date: n.date,
        year: e.year,
        month: e.month,
        min: e.min,
        max: e.max,
        "first-day": t.firstDay,
        "unselectable-days-of-week": t.unselectableDaysOfWeek,
        "months-labels": t.monthsLabels,
        "show-week-number": t.showWeekNumber,
        "is-r-t-l": t.isRTL,
        "weekdays-labels": t.weekdaysLabels,
        "weekdays-short-labels": t.weekdaysShortLabels,
        onSelect: s[4] || (s[4] = (d) => n.onSelect(d))
      }, null, 8, ["date", "year", "month", "min", "max", "first-day", "unselectable-days-of-week", "months-labels", "show-week-number", "is-r-t-l", "weekdays-labels", "weekdays-short-labels"])
    ])
  ], 2)) : f("", !0);
}
const Kt = /* @__PURE__ */ I(Rl, [["render", Yl]]), Xl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kt
}, Symbol.toStringTag, { value: "Module" })), Jl = {
  name: "vu-facets-bar",
  emits: ["update:modelValue"],
  components: { VuDropdownMenu: be, VuIconBtn: T, VuPopover: G, VuBtn: ie, VuIcon: A },
  props: {
    modelValue: {
      type: Object,
      default: () => {
      }
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    uuidv4: le,
    labelsTruncated: !1,
    activeLabelTruncated: !1,
    startIndex: 0,
    hiddenFacets: 0,
    visibleFacets: 0,
    intxObs: void 0,
    intxObs2: void 0,
    intxObs3: void 0,
    resizeObs: void 0,
    activeFacetVsLongestFacet: 0
  }),
  mounted() {
    this.intxObs = new IntersectionObserver(this.intersects, {
      root: this.$refs.container,
      threshold: 1
    }), this.intxObs2 = new IntersectionObserver(this.intersectsStep2, {
      root: this.$refs.container,
      threshold: 1
    }), this.intxObs3 = new IntersectionObserver(this.intersectsStep3, {
      root: this.$refs.container,
      threshold: 1
    }), this.resizeObs = new ResizeObserver(() => {
      this.hiddenFacets = 0, this.labelsTruncated = !1, this.activeLabelTruncated = !1, this.intxObs.observe();
    }), this.intxObs.observe(this.$refs.inner);
  },
  beforeUnmount() {
    this.intxObs && this.intxObs.disconnect(), this.intxObs2 && this.intxObs.disconnect(), this.intxObs3 && this.intxObs.disconnect(), this.resizeObs && this.resizeObs.disconnect(), delete this.intxObs, delete this.intxObs2, delete this.intxObs3, delete this.resizeObs;
  },
  computed: {
    activeIndex() {
      return this.items.indexOf(this.modelValue);
    },
    visibleItems() {
      return this.hiddenFacets ? this.items.slice(this.startIndex, this.startIndex + this.visibleFacets) : this.items;
    },
    showPrepend() {
      return !1;
    }
  },
  watch: {
    modelValue(e) {
      if (this.hiddenFacets) {
        const s = this.items.indexOf(e);
        let t = 0;
        s > this.visibleFacets - 1 && (t = s - this.visibleFacets + 2), this.startIndex = Math.min(t, this.items.length - this.visibleFacets);
      }
    },
    items(e, s) {
      (e.length !== s.length || e.any((t, i) => t.text !== s[i].text)) && (this.labelsTruncated = !1, this.activeLabelTruncated = !1, this.intxObs.observe());
    }
  },
  methods: {
    async intersects(e) {
      if (this.intxObs.unobserve(this.$refs.inner), e && e[0] && e[0].intersectionRatio < 1) {
        const s = this.$refs.inner.querySelectorAll(".facet"), t = this.$refs.inner.querySelector(".facet.facet--selected"), { width: i = 0 } = t || {}, o = Array.from(s).reduce((n, a) => Math.max(n.width, a));
        this.activeFacetVsLongestFacet = o - i, this.labelsTruncated = !0, await this.$nextTick(), this.intxObs2.observe(this.$refs.inner);
      }
    },
    async intersectsStep2(e) {
      this.intxObs2.unobserve(this.$refs.inner), e && e[0] && e[0].intersectionRatio < 1 && (this.activeLabelTruncated = !0, this.activeFacetVsLongestFacet = 0, await this.$nextTick(), this.$refs.inner.querySelectorAll(".facet").forEach((t) => {
        this.intxObs3.observe(t);
      }));
    },
    // eslint-disable-next-line no-unused-vars
    async intersectsStep3(e) {
      e.forEach((s) => this.intxObs3.unobserve(s.target)), this.hiddenFacets = e.filter((s) => s.intersectionRatio < 1).length, this.hiddenFacets > 0 && (this.visibleFacets = this.items.length - this.hiddenFacets);
    }
  }
}, Zl = {
  class: "vu-facets-bar",
  ref: "container"
}, Ql = {
  class: "facets-bar__inner",
  ref: "inner"
};
function eo(e, s, t, i, o, n) {
  const a = y("VuIcon"), d = y("VuPopover"), u = y("VuBtn"), m = y("VuIconBtn"), h = y("VuDropdownMenu");
  return l(), r("div", Zl, [
    c("div", Ql, [
      (l(!0), r(B, null, M(n.visibleItems, (p) => (l(), _(u, {
        key: `${e.uuidv4()}`,
        class: v([
          "facet",
          {
            default: p !== t.modelValue,
            "facet--selected": p === t.modelValue,
            "facet--unselected": p !== t.modelValue,
            "facet--icon-only": e.labelsTruncated && !(!e.activeLabelTruncated && p === t.modelValue)
          }
        ]),
        onClick: (b) => e.$emit("update:modelValue", p)
      }, {
        default: S(() => [
          !e.labelsTruncated || !e.activeLabelTruncated && p === t.modelValue ? (l(), r(B, { key: 0 }, [
            p.icon ? (l(), _(a, {
              key: 0,
              icon: p.icon,
              active: p === t.modelValue
            }, null, 8, ["icon", "active"])) : f("", !0),
            c("span", null, g(p.text), 1)
          ], 64)) : (l(), _(d, {
            key: 1,
            type: "tooltip",
            arrow: ""
          }, {
            default: S(() => [
              p.icon ? (l(), _(a, {
                key: 0,
                icon: p.icon
              }, null, 8, ["icon"])) : f("", !0)
            ]),
            body: S(() => [
              $(g(p.text), 1)
            ]),
            _: 2
          }, 1024))
        ]),
        _: 2
      }, 1032, ["class", "onClick"]))), 128)),
      e.labelsTruncated && !e.activeLabelTruncated ? (l(), r("div", {
        key: 0,
        style: P([{ visibility: "hidden" }, { width: `${e.activeFacetVsLongestFacet}+px` }])
      }, null, 4)) : f("", !0),
      e.visibleFacets ? (l(), _(h, {
        key: 1,
        shift: !0,
        class: "vu-facets-bar__dropdownmenu",
        items: t.items,
        model: t.modelValue,
        "onUpdate:modelValue": s[0] || (s[0] = (p) => e.$emit("update:modelValue", p)),
        onClickItem: s[1] || (s[1] = (p) => e.$emit("update:modelValue", p))
      }, {
        default: S(() => [
          C(m, { icon: "menu-dot" })
        ]),
        _: 1
      }, 8, ["items", "model"])) : f("", !0)
    ], 512)
  ], 512);
}
const to = /* @__PURE__ */ I(Jl, [["render", eo], ["__scopeId", "data-v-775f5d77"]]), so = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: to
}, Symbol.toStringTag, { value: "Module" })), no = {
  name: "vu-form",
  mixins: [$l]
};
function io(e, s, t, i, o, n) {
  return l(), r("form", {
    novalidate: "novalidate",
    class: "form form-root",
    onSubmit: q(() => {
    }, ["prevent"])
  }, [
    w(e.$slots, "default")
  ], 32);
}
const Gt = /* @__PURE__ */ I(no, [["render", io]]), lo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gt
}, Symbol.toStringTag, { value: "Module" })), oo = {
  props: {
    elevated: {
      type: Boolean,
      default: !1
    }
  }
}, Yt = {
  props: {
    clearable: {
      type: Boolean,
      default: () => !1
    }
  }
}, Fe = {
  offline: "status-empty",
  online: "status-ok",
  busy: "status-noway",
  away: "status-clock"
}, ao = {
  name: "vu-user-picture",
  inject: [
    "vuUserPictureSrcUrl"
  ],
  props: {
    size: {
      type: String,
      default: "medium",
      validator: (e) => ["tiny", "small", "medium", "medium-1", "big", "bigger", "large", "extra-large"].includes(e)
    },
    circle: {
      type: Boolean,
      default: !0
    },
    clickable: {
      type: Boolean,
      default: !1
    },
    gutter: {
      type: Boolean,
      default: !1
    },
    hoverable: {
      type: Boolean,
      default: !1
    },
    inheritBackground: {
      type: Boolean,
      default: !0
    },
    // eslint-disable-next-line vue/require-default-prop
    presence: {
      type: String,
      required: !1,
      validator: (e) => e ? Fe[e] !== void 0 : !0
    },
    src: {
      type: String,
      required: !1,
      default: void 0
    },
    id: {
      type: String,
      required: !1,
      default: void 0
    }
  },
  data: () => ({
    presenceStates: Fe,
    hovered: !1
  }),
  watch: {
    hoverable: {
      // eslint-disable-next-line object-shorthand, func-names
      handler: function(e) {
        !e && this.hovered && (this.hovered = !1);
      }
    }
  },
  computed: {
    fonticon() {
      return this.presence && Fe[this.presence];
    },
    _src() {
      return this.vuUserPictureSrcUrl && this.id && !this.src ? `${this.vuUserPictureSrcUrl}/${this.id}` : this.src;
    }
  }
}, ro = {
  key: 0,
  class: "vu-user-picture__hover-mask"
}, uo = {
  key: 1,
  class: "vu-presence"
};
function co(e, s, t, i, o, n) {
  return l(), r("div", {
    class: v(["vu-user-picture", [t.size ? `vu-user-picture--${t.size}` : "", {
      "vu-user-picture--gutter": t.gutter,
      "vu-user-picture--circle": t.circle,
      "vu-user-picture--clickable": t.clickable,
      "vu-user-picture--bg-inherit": t.inheritBackground
    }]]),
    onMouseover: s[0] || (s[0] = () => {
      t.hoverable && (e.hovered = !0);
    }),
    onMouseleave: s[1] || (s[1] = () => {
      t.hoverable && (e.hovered = !1);
    })
  }, [
    c("div", {
      class: "vu-user-picture-wrap",
      style: P([t.presence ? { background: "inherit" } : ""])
    }, [
      c("div", {
        class: "vu-user-picture__image",
        style: P({ "background-image": `url(${n._src})` })
      }, null, 4),
      e.hovered ? (l(), r("div", ro)) : f("", !0),
      t.size !== "tiny" ? (l(), r("div", uo, [
        c("div", {
          class: v(`vu-presence__indicator vu-presence__indicator--${t.presence}`)
        }, null, 2)
      ])) : f("", !0)
    ], 4)
  ], 34);
}
const pe = /* @__PURE__ */ I(ao, [["render", co], ["__scopeId", "data-v-24c158c9"]]), ho = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pe
}, Symbol.toStringTag, { value: "Module" })), fo = {
  name: "vu-select-options",
  props: {
    options: {
      type: Array,
      required: !0
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    user: {
      type: Boolean,
      required: !1
    },
    selected: {
      type: Array,
      required: !0
    },
    placeholder: {
      type: String,
      default: () => ""
    },
    keyIndex: {
      type: Number,
      default: () => -1
    }
  },
  expose: ["focus"],
  emits: ["click-item", "select-keydown"],
  data: () => ({
    uuidv4: le
  }),
  methods: {
    focus() {
      var e;
      (e = this.$refs.nativeSelect) == null || e.focus();
    }
  },
  components: { VuIcon: A, VuUserPicture: pe }
}, mo = { class: "option__text" }, po = ["disabled", "onClick"], go = {
  key: 0,
  class: "flex items-center"
}, vo = { class: "option__text" }, yo = { class: "option__text" };
function bo(e, s, t, i, o, n) {
  const a = y("VuUserPicture"), d = y("VuIcon");
  return l(), r("ul", {
    class: v(["vu-select-options", { "select-options--multiple": t.multiple, "select-options--single": !t.multiple, "select-options--user": t.user }])
  }, [
    c("select", {
      ref: "nativeSelect",
      class: "select-hidden",
      onKeydown: s[0] || (s[0] = (u) => e.$emit("select-keydown", u))
    }, null, 544),
    !t.multiple && t.placeholder ? (l(), r("li", {
      key: 0,
      class: v([{ "option--selected": t.selected[0].value === void 0 }, "option__placeholder"]),
      onClick: s[1] || (s[1] = (u) => e.$emit("click-item", { value: "" }))
    }, [
      c("span", mo, g(t.placeholder), 1)
    ], 2)) : f("", !0),
    (l(!0), r(B, null, M(t.options, (u, m) => (l(), r("li", {
      key: `${u.id || e.uuidv4()}`,
      class: v({
        "option--selected": u.selected || t.selected.includes(u),
        "option--keyboard": m === t.keyIndex
      }),
      disabled: u.disabled,
      onClick: (h) => !u.disabled && e.$emit("click-item", u)
    }, [
      t.user ? (l(), r("div", go, [
        C(a, {
          size: "small",
          id: u.value,
          src: u.src
        }, null, 8, ["id", "src"]),
        c("span", vo, g(u.text || u.label), 1)
      ])) : w(e.$slots, "default", {
        key: 1,
        item: u
      }, () => [
        u.fonticon ? (l(), _(d, {
          key: 0,
          icon: u.fonticon
        }, null, 8, ["icon"])) : f("", !0),
        c("span", yo, g(u.text || u.label), 1)
      ], !0)
    ], 10, po))), 128))
  ], 2);
}
const ot = /* @__PURE__ */ I(fo, [["render", bo], ["__scopeId", "data-v-0d268806"]]), _o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ot
}, Symbol.toStringTag, { value: "Module" })), wo = {
  name: "vu-spinner",
  props: {
    mask: {
      type: Boolean,
      default: () => !1
    },
    text: {
      type: String,
      default: () => ""
    }
  }
}, ko = { class: "mask-wrapper" }, So = { class: "mask-content" }, Co = /* @__PURE__ */ Ss('<div class="spinner spinning fade in"><span class="spinner-bar"></span><span class="spinner-bar spinner-bar1"></span><span class="spinner-bar spinner-bar2"></span><span class="spinner-bar spinner-bar3"></span></div>', 1), Io = {
  key: 0,
  class: "text"
};
function Bo(e, s, t, i, o, n) {
  return l(), r("div", {
    class: v({ mask: t.mask })
  }, [
    c("div", ko, [
      c("div", So, [
        Co,
        t.text.length ? (l(), r("span", Io, g(t.text), 1)) : f("", !0)
      ])
    ])
  ], 2);
}
const at = /* @__PURE__ */ I(wo, [["render", Bo]]), Oo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: at
}, Symbol.toStringTag, { value: "Module" })), Vo = {
  name: "vu-scroller",
  exposes: ["stopLoading", "stopLoadingBefore"],
  props: {
    reverse: {
      type: Boolean,
      default: !1
    },
    infinite: {
      type: Boolean,
      default: !1
    },
    showLoading: {
      type: Boolean,
      default: !1
    },
    // alias for infinite
    dataAfter: {
      type: Boolean,
      default: !1
    },
    dataBefore: {
      type: Boolean,
      default: !1
    },
    infiniteMargin: {
      type: Number,
      default: 200
    },
    infiniteHeight: {
      type: String,
      default: "50px"
    },
    infiniteBeforeHeight: {
      type: String,
      default: "50px"
    },
    loadingText: {
      type: String,
      default: ""
    },
    horizontal: {
      type: Boolean,
      default: !1
    },
    alwaysShow: {
      type: Boolean,
      default: !1
    },
    // Allows to configure timeout for innerScroll to happen.
    // The new content needs to be rerender to not endlessly loop on the intersection.
    updateSleep: {
      type: Number,
      default: 15
    },
    noIntersectionRoot: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["loading-before", "loading", "mounted"],
  data() {
    return {
      lazyKeyIndex: 0,
      lazyKeyIndex2: 0,
      wait: !1,
      waitBefore: !1
    };
  },
  computed: {
    rootMargin() {
      return Array(4).fill(`${this.infiniteMargin}px`).join(" ");
    },
    options() {
      const e = {}, { rootMargin: s } = this;
      return this.noIntersectionRoot || (e.root = this.$refs["scroll-container"]), {
        ...e,
        rootMargin: s
      };
    }
  },
  mounted() {
    this.$emit("mounted");
  },
  methods: {
    stopLoading(e) {
      e ? (this.lazyKeyIndex2 += 1, this.sleep()) : (this.lazyKeyIndex += 1, this.sleep());
    },
    async sleep() {
      this.wait = !0, this.waitBefore = !0, await setTimeout(() => {
      }, this.updateSleep), this.wait = !1, this.waitBefore = !1;
    }
  },
  components: { VuSpinner: at, VuLazy: tt }
}, $o = { class: "vu-scroll-container__inner" };
function Mo(e, s, t, i, o, n) {
  const a = y("VuSpinner"), d = y("VuLazy"), u = y("vu-spinner");
  return l(), r("div", {
    ref: "scroll-container",
    class: v([{ "vu-scroll-container--reverse": t.reverse, "vu-scroll-container--horizontal": t.horizontal, "vu-scroll-container--always-show": t.alwaysShow }, "vu-scroll-container"])
  }, [
    c("div", $o, [
      t.dataBefore && !o.waitBefore ? (l(), _(d, {
        key: `lazy-key-${o.lazyKeyIndex2}`,
        onIntersect: s[0] || (s[0] = (m) => {
          e.$emit("loading-before"), e.$emit("loading", !0);
        }),
        options: n.options,
        height: t.infiniteBeforeHeight || t.infiniteHeight,
        class: "vu-scroll__lazy vu-scroll__lazy-top"
      }, {
        default: S(() => [
          w(e.$slots, "loadingBefore", {}, () => [
            C(a, { text: t.loadingText }, null, 8, ["text"])
          ], !0)
        ]),
        _: 3
      }, 8, ["options", "height"])) : f("", !0),
      w(e.$slots, "default", {}, void 0, !0),
      (t.infinite || t.dataAfter) && !o.wait ? (l(), _(d, {
        key: `lazy-key-${o.lazyKeyIndex}`,
        onIntersect: s[1] || (s[1] = (m) => e.$emit("loading")),
        options: n.options,
        height: t.infiniteHeight,
        style: { "min-width": "30px" },
        class: "vu-scroll__lazy vu-scroll__lazy-bottom"
      }, {
        default: S(() => [
          w(e.$slots, "loading", {}, () => [
            C(a, { text: t.loadingText }, null, 8, ["text"])
          ], !0)
        ]),
        _: 3
      }, 8, ["options", "height"])) : t.showLoading ? w(e.$slots, "loading", { key: 2 }, () => [
        C(u, { text: t.loadingText }, null, 8, ["text"])
      ], !0) : f("", !0)
    ])
  ], 2);
}
const Be = /* @__PURE__ */ I(Vo, [["render", Mo], ["__scopeId", "data-v-e9e7797c"]]), Po = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Be
}, Symbol.toStringTag, { value: "Module" })), xo = {
  name: "vu-select",
  inheritAttrs: !1,
  mixins: [j, Yt, D, R, U],
  props: {
    autocomplete: {
      type: Boolean,
      default: () => !1
    },
    hidePlaceholderOption: {
      type: Boolean,
      default: () => !1
    },
    grouped: {
      type: Boolean,
      default: () => !1
    },
    maxVisible: {
      type: Number,
      default: () => 5
    },
    dropdownZIndex: {
      type: Number,
      default: 1020
    },
    // detachable props
    attach: {
      default: () => !0,
      validator: Xe
    },
    contentClass: {
      type: [String, Object],
      default: ""
    },
    contentStyle: {
      type: [String, Object],
      default: () => ""
    }
    // end detachable
  },
  emits: ["update:modelValue"],
  data: () => ({
    open: !1,
    focused: !1,
    search: "",
    uid: le()
  }),
  watch: {
    value() {
      this.search = this.selected.label;
    },
    open(e) {
      e && this.focus();
    }
  },
  created() {
    this.search = this.value && this.selected.label || this.value;
  },
  computed: {
    isIos() {
      return window ? !!(/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) : !1;
    },
    hasSomeEnabledOptions() {
      return this.enabledOptions.length > 0;
    },
    firstEnabledOption() {
      return this.enabledOptions.slice(0)[0];
    },
    lastEnabledOption() {
      return this.enabledOptions.slice(-1)[0];
    },
    enabledOptions() {
      return (this.autocomplete && this.search ? this.options : this.innerOptions).filter((s) => !s.disabled);
    },
    innerOptions() {
      return this.autocomplete ? this.options.filter((e) => e.label.toLowerCase().includes(this.search.toLowerCase()) || e.value.toLowerCase().includes(this.search.toLowerCase())) : this.options;
    },
    selected() {
      return this.options.find((e) => e.value === this.value) || {
        label: this.placeholder
      };
    },
    willDetach() {
      return this.attach === !1 || this.attach !== "" && typeof this.attach === String;
    },
    groupedOptions() {
      return this.grouped ? this.options.reduce((e, s) => (e[s.group] || (e[s.group] = []), e[s.group].push(s), e), {}) : null;
    },
    internMaxVisible() {
      return this.maxVisible > this.options.length ? this.options.length : this.maxVisible;
    }
  },
  methods: {
    innerSelectKeydown(e) {
      switch (e.code) {
        case "Space":
        case "Enter":
        case "NumpadEnter":
          this.open = !this.open, e.preventDefault(), e.stopPropagation();
          break;
        case "Escape":
          this.open = !1, e.preventDefault(), e.stopPropagation();
          break;
        case "ArrowUp":
          this.browse(), e.stopPropagation();
          break;
        case "ArrowDown":
          this.open ? this.browse(!0) : this.open = !0, e.stopPropagation();
          break;
      }
    },
    focus() {
      var e, s;
      this.focused = !0, !this.autocomplete && (this.willDetach ? setTimeout(() => {
        var t, i;
        (i = (t = this.$refs) == null ? void 0 : t.selectOptions) == null || i.focus();
      }, 50) : (s = (e = this.$refs) == null ? void 0 : e.nativeSelect) == null || s.focus());
    },
    blur() {
      this.focused = !1;
    },
    async browse(e) {
      if (!this.grouped) {
        if (!this.hasSomeEnabledOptions)
          return;
        if (this.firstEnabledOption === this.lastEnabledOption)
          this.value = this.modelValue ? void 0 : this.firstEnabledOption.value;
        else if (!e && this.selected === this.firstEnabledOption)
          this.value = this.hidePlaceholderOption ? this.lastEnabledOption.value : void 0;
        else if (e && this.selected === this.lastEnabledOption)
          this.value = this.hidePlaceholderOption ? this.firstEnabledOption.value : void 0;
        else if (!this.modelValue)
          this.value = e ? this.firstEnabledOption.value : this.lastEnabledOption.value;
        else {
          let s = this.enabledOptions.indexOf(this.selected);
          s += e ? 1 : -1;
          const t = this.innerOptions.indexOf(this.enabledOptions[s]);
          this.value = this.innerOptions.slice(t, t + 1)[0].value;
        }
        this.$nextTick(() => {
          var i;
          const s = this.$refs && this.$refs.dropdown;
          let t;
          if (s && (t = (i = this.$refs) == null ? void 0 : i.dropdown.querySelector("ul li.result-option-selected")), t) {
            const o = t.offsetTop + t.clientHeight;
            (o > s.scrollTop + s.clientHeight || o < s.scrollTop) && this.$refs.dropdown.scrollTo({ top: t.offsetTop });
          }
        });
      }
    }
  },
  components: { VuIconBtn: T, VuPopover: G, VuSelectOptions: ot, VuScroller: Be }
}, Lo = {
  key: 0,
  class: "control-label"
}, To = {
  key: 0,
  class: "label-field-required"
}, Ao = ["disabled", "placeholder"], Fo = {
  key: 2,
  class: "select-handle"
}, Do = ["disabled"], zo = {
  key: 4,
  class: "select-handle"
}, No = {
  key: 5,
  class: "select-choices form-control"
}, Eo = { class: "select-choice" }, jo = { class: "select-results" }, Ro = ["onClick"], Uo = { class: "result-group-label" }, qo = { class: "result-group-sub" }, Ho = ["onClick"], Wo = {
  key: 1,
  class: "form-control-helper-text"
};
function Ko(e, s, t, i, o, n) {
  const a = y("VuIconBtn"), d = y("VuSelectOptions"), u = y("VuScroller"), m = y("VuPopover"), h = F("click-outside");
  return l(), r("div", {
    class: v(["form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", Lo, [
      $(g(e.label), 1),
      e.required ? (l(), r("span", To, " *")) : f("", !0)
    ])) : f("", !0),
    V((l(), r("div", {
      onClick: s[8] || (s[8] = (p) => {
        e.open = !e.open && !e.disabled, e.search = e.value && n.selected.label || e.value;
      }),
      class: v([
        "vu-select",
        "select",
        {
          "select-placeholder": !t.autocomplete,
          "select-no-placeholder-option": t.hidePlaceholderOption,
          "select-not-chosen": !t.autocomplete && !e.value,
          "dropdown-visible": e.open,
          "select-disabled": e.disabled,
          "select-autocomplete": t.autocomplete,
          "select-clearable": e.clearable,
          "select-focus": e.focused && !e.disabled
        }
      ])
    }, [
      t.autocomplete ? V((l(), r("input", {
        key: 0,
        ref: "innerInput",
        disabled: e.disabled,
        placeholder: n.selected.label,
        class: "form-control",
        "onUpdate:modelValue": s[0] || (s[0] = (p) => e.search = p)
      }, null, 8, Ao)), [
        [Pt, e.search]
      ]) : f("", !0),
      e.value && (t.autocomplete || e.clearable) ? (l(), _(a, {
        key: 1,
        icon: "clear",
        class: v(["select__clear-icon", { "select--has-handle": t.autocomplete }]),
        onClick: s[1] || (s[1] = (p) => {
          var b, k;
          e.$emit("update:modelValue", ""), (k = (b = e.$refs) == null ? void 0 : b.innerInput) == null || k.focus(), e.search = "";
        })
      }, null, 8, ["class"])) : f("", !0),
      t.autocomplete ? f("", !0) : (l(), r("div", Fo)),
      !t.autocomplete && !n.willDetach ? (l(), r("select", {
        key: 3,
        class: "form-control select-hidden",
        disabled: e.disabled,
        ref: "nativeSelect",
        onFocus: s[2] || (s[2] = (p) => e.focused = !0),
        onBlur: s[3] || (s[3] = (p) => n.blur()),
        onKeydown: s[4] || (s[4] = (p) => n.innerSelectKeydown(p))
      }, null, 40, Do)) : f("", !0),
      t.autocomplete ? f("", !0) : (l(), r("div", zo)),
      t.autocomplete ? f("", !0) : (l(), r("ul", No, [
        c("li", Eo, g(n.selected.label), 1)
      ])),
      t.attach && e.open ? (l(), r("div", {
        key: 6,
        class: "select-dropdown",
        ref: "dropdown",
        style: P(`height: ${38 * (n.innerOptions.length + (!t.autocomplete && !t.hidePlaceholderOption ? 1 : 0))}px; max-height: ${38 * (n.internMaxVisible + 1)}px;`)
      }, [
        c("ul", jo, [
          !t.autocomplete && !t.hidePlaceholderOption ? (l(), r("li", {
            key: 0,
            class: v(["result-option result-option-placeholder", { "result-option-selected": !e.modelValue }]),
            onClick: s[5] || (s[5] = (p) => {
              e.$emit("update:modelValue", ""), e.search = "";
            })
          }, g(e.placeholder), 3)) : f("", !0),
          t.grouped ? (l(!0), r(B, { key: 2 }, M(n.groupedOptions, (p, b) => (l(), r("li", {
            key: `${e.uid}-${p.group}`,
            class: "result-group"
          }, [
            c("span", Uo, g(b), 1),
            c("ul", qo, [
              (l(!0), r(B, null, M(p, (k) => (l(), r("li", {
                key: `${e.uid}-${k.value}`,
                class: v([{
                  "result-option-disabled": k.disabled,
                  "result-option-selected": k.value === e.value
                }, "result-option"]),
                onClick: (O) => k.disabled ? null : e.$emit("update:modelValue", k.value)
              }, g(k.label), 11, Ho))), 128))
            ])
          ]))), 128)) : (l(!0), r(B, { key: 1 }, M(n.innerOptions, (p) => (l(), r("li", {
            key: `${e.uid}-${p.value || p.label}`,
            class: v([{
              "result-option-disabled": p.disabled,
              "result-option-selected": p.value === e.value
            }, "result-option"]),
            onClick: (b) => {
              p.disabled || e.$emit("update:modelValue", p.value), e.search = p.label;
            }
          }, g(p.label), 11, Ro))), 128))
        ])
      ], 4)) : n.willDetach && e.open ? (l(), _(m, {
        key: 7,
        attach: t.attach,
        type: "vu-select-dropdown",
        show: e.open,
        positions: ["bottom-left", "top-left"],
        side: "bottom-left",
        "sync-width": !0,
        animated: !1,
        "content-class": t.contentClass,
        offsets: { "bottom-left": { y: 3 }, "top-left": { y: -43 } },
        "content-style": [{ zIndex: t.dropdownZIndex }, "position: absolute;", t.contentStyle],
        "onUpdate:show": s[7] || (s[7] = (p) => {
          e.open = p;
        })
      }, {
        body: S(() => [
          C(u, { "always-show": "" }, {
            default: S(() => [
              C(d, L({ ref: "selectOptions" }, { options: n.innerOptions, selected: [n.selected], placeholder: e.placeholder }, {
                onSelectKeydown: n.innerSelectKeydown,
                onClickItem: s[6] || (s[6] = (p) => {
                  this.focus(), e.$emit("update:modelValue", p.value);
                })
              }), null, 16, ["onSelectKeydown"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["attach", "show", "content-class", "content-style"])) : f("", !0)
    ], 2)), [
      [h, {
        events: ["click"],
        handler: function() {
          e.open = !1, e.search = e.value && n.selected.label || e.value;
        }
      }]
    ]),
    (l(!0), r(B, null, M(e.errorBucket, (p, b) => (l(), r("span", {
      key: `${b}-error-${p}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, g(p), 1))), 128)),
    e.helper.length ? (l(), r("span", Wo, g(e.helper), 1)) : f("", !0)
  ], 2);
}
const Xt = /* @__PURE__ */ I(xo, [["render", Ko], ["__scopeId", "data-v-0a18a7c8"]]), Go = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xt
}, Symbol.toStringTag, { value: "Module" })), Yo = {
  name: "vu-grid-view",
  mixins: [ue, oo],
  props: {
    value: {
      type: [Object, Array],
      default: () => []
    },
    items: {
      type: Array,
      required: !0
    },
    headers: {
      type: Array,
      required: !0
    },
    dense: {
      type: Boolean,
      default: !1
    },
    rich: {
      type: Boolean,
      default: !0
    },
    selectable: {
      type: Boolean,
      default: !1
    },
    allSelectable: {
      type: Boolean,
      default: !0
    },
    serverItemsLength: {
      type: Number,
      default: 0
    },
    rowsPerPage: {
      type: Number,
      default: 5
    },
    topPagination: {
      type: Boolean,
      default: !1
    },
    whiteBackground: {
      type: Boolean,
      default: !1
    },
    sort: {
      type: Function,
      default(e, s) {
        return this.isAscending ? e[this.sortKey] < s[this.sortKey] ? -1 : e[this.sortKey] > s[this.sortKey] ? 1 : 0 : e[this.sortKey] > s[this.sortKey] ? -1 : e[this.sortKey] < s[this.sortKey] ? 1 : 0;
      }
    },
    itemPerPageOptions: {
      type: Array,
      default: () => [10, 20, 50]
    },
    labels: {
      type: Object,
      default: () => ({
        previousLabel: "Previous",
        nextLabel: "Next"
      })
    }
  },
  emits: ["cellClick", "update:modelValue", "update:rowsPerPage", "pageUp", "pageDown"],
  data() {
    return {
      sortKey: "",
      isAscending: void 0,
      startRow: 0,
      selectedCellItem: "",
      selectedCellProperty: ""
    };
  },
  computed: {
    hasSelected() {
      return this.value.length > 0;
    },
    sortedItems() {
      const e = this.startRow + this.rowsPerPage;
      return this.sortKey ? [...this.items].sort(this.sort.bind(this)).slice(this.startRow, e) : this.items.slice(this.startRow, e);
    },
    itemMax() {
      const e = this.startRow + this.rowsPerPage;
      return e > this.items.length ? this.items.length : e;
    }
  },
  methods: {
    isEqual(e, s) {
      return e === s;
    },
    selectAll() {
      this.value.length === this.items.length ? this.$emit("update:modelValue", []) : this.$emit("update:modelValue", this.items);
    },
    selectItem(e) {
      const s = this.value.includes(e), t = [...this.value];
      if (s) {
        const i = t.indexOf(e);
        t.splice(i, 1);
      } else
        t.push(e);
      this.$emit("update:modelValue", t);
    },
    updateRows(e) {
      this.$emit("update:rowsPerPage", e);
    },
    scrollHorizontal(e) {
      const s = e.currentTarget;
      s.offsetWidth !== s.scrollWidth && (e.preventDefault(), e.deltaX && (s.scrollLeft -= Math.round(e.deltaX / 4)), e.deltaY && (s.scrollLeft += Math.round(e.deltaY / 4)));
    },
    sortBy(e) {
      this.sortKey === e ? this.isAscending = !this.isAscending : (this.sortKey = e, this.isAscending = !0);
    },
    pageUp() {
      this.startRow += this.rowsPerPage, this.$emit("pageUp");
    },
    pageDown() {
      this.startRow -= this.rowsPerPage, this.$emit("pageDown");
    }
  },
  components: { VuCheckbox: Ht, VuIconBtn: T, VuSelect: Xt, VuBtn: ie }
}, Xo = {
  key: 0,
  class: "grid-view__table__header-intersection"
}, Jo = { class: "grid-view__table__body" }, Zo = ["onClick"], Qo = {
  key: 0,
  class: "grid-view__table__row__header"
}, ea = ["onClick"], ta = { style: { "margin-right": "5px" } };
function sa(e, s, t, i, o, n) {
  const a = y("VuCheckbox"), d = y("VuIconBtn"), u = y("VuSelect"), m = y("VuBtn"), h = F("mask");
  return V((l(), r("div", {
    class: v(["vu-grid-view", { elevated: e.elevated, "vu-grid-view--rich": t.rich }, e.classes]),
    onWheel: s[0] || (s[0] = (...p) => n.scrollHorizontal && n.scrollHorizontal(...p))
  }, [
    c("div", {
      class: "grid-view__container",
      style: P(`height: ${(t.dense ? 24 : 38) + (t.dense ? 24 : 38) * (n.sortedItems.length < t.rowsPerPage ? n.sortedItems.length : t.rowsPerPage)}px;`)
    }, [
      c("table", {
        class: v([
          "grid-view__table",
          { dense: t.dense, "grid-view__table--has-selection": n.hasSelected }
        ])
      }, [
        c("thead", null, [
          c("tr", null, [
            t.selectable ? (l(), r("th", Xo, [
              t.allSelectable ? (l(), _(a, {
                key: 0,
                dense: "",
                class: "grid-view__table__checkbox",
                value: t.value.length === t.items.length && t.items.length,
                options: [{}],
                onInput: n.selectAll
              }, null, 8, ["value", "onInput"])) : f("", !0)
            ])) : f("", !0),
            (l(!0), r(B, null, M(t.headers, (p, b) => (l(), r("th", {
              key: `header_${p.property}_${b}`
            }, [
              $(g(p.label) + " ", 1),
              p.sortable !== !1 ? (l(), _(d, {
                key: 0,
                class: "icon-smaller",
                icon: p.property === o.sortKey && o.isAscending ? "expand-up" : "expand-down",
                active: p.property === o.sortKey,
                onClick: (k) => n.sortBy(p.property)
              }, null, 8, ["icon", "active", "onClick"])) : f("", !0)
            ]))), 128))
          ])
        ]),
        c("tbody", Jo, [
          (l(!0), r(B, null, M(n.sortedItems, (p, b) => (l(), r("tr", {
            class: v({ dense: t.dense, selected: t.value.includes(p) }),
            key: `line_${b}`,
            onClick: (k) => n.selectItem(p)
          }, [
            t.selectable ? (l(), r("td", Qo, [
              C(a, {
                dense: "",
                class: "grid-view__table__body__checkbox",
                onInput: (k) => n.selectItem(p),
                value: t.value.includes(p),
                options: [{}]
              }, null, 8, ["onInput", "value"])
            ])) : f("", !0),
            (l(!0), r(B, null, M(t.headers, (k) => (l(), r("td", {
              key: `${k.property}_${p[k.property]}`,
              class: v([
                n.isEqual(p, o.selectedCellItem) && n.isEqual(k.property, o.selectedCellProperty) ? "selected" : ""
              ]),
              onClick: () => {
                o.selectedCellItem = p, o.selectedCellProperty = k.property, e.$emit("cellClick", { item: p, header: k, property: e.property });
              }
            }, [
              w(e.$slots, k.property, ze(Ne(p)), () => [
                $(g(p[k.property]), 1)
              ], !0)
            ], 10, ea))), 128))
          ], 10, Zo))), 128))
        ])
      ], 2)
    ], 4),
    c("div", {
      class: v(["grid-view__pagination", { "grid-view__pagination--top": t.topPagination }])
    }, [
      w(e.$slots, "pagination", {}, () => [
        C(u, {
          options: t.itemPerPageOptions.map((p) => ({ value: p, label: p })),
          rules: [(p) => p.length > 0],
          "hide-placeholder-option": !0,
          value: t.rowsPerPage,
          onInput: n.updateRows
        }, null, 8, ["options", "rules", "value", "onInput"]),
        c("div", ta, g(o.startRow + 1) + "-" + g(n.itemMax) + " / " + g(t.serverItemsLength || t.items.length), 1),
        C(m, {
          disabled: o.startRow === 0,
          onClick: n.pageDown
        }, {
          default: S(() => [
            $(g(t.labels.previousLabel), 1)
          ]),
          _: 1
        }, 8, ["disabled", "onClick"]),
        C(m, {
          disabled: o.startRow + t.rowsPerPage >= (t.serverItemsLength || t.items.length),
          onClick: n.pageUp
        }, {
          default: S(() => [
            $(g(t.labels.nextLabel), 1)
          ]),
          _: 1
        }, 8, ["disabled", "onClick"])
      ], !0)
    ], 2)
  ], 34)), [
    [h, e.loading]
  ]);
}
const na = /* @__PURE__ */ I(Yo, [["render", sa], ["__scopeId", "data-v-598f3552"]]), ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: na
}, Symbol.toStringTag, { value: "Module" })), la = {
  name: "vu-icon-link",
  components: { VuIcon: A },
  mixins: [it],
  props: {
    label: {
      type: String,
      default: () => ""
    },
    icon: {
      type: String,
      default: () => ""
    }
  },
  data: () => ({
    pressed: !1
  })
}, oa = { class: "icon-link__link" };
function aa(e, s, t, i, o, n) {
  const a = y("VuIcon");
  return l(), r("a", {
    class: v(["vu-icon-link", { active: e.active }])
  }, [
    t.icon ? (l(), _(a, {
      key: 0,
      icon: t.icon,
      active: e.active
    }, null, 8, ["icon", "active"])) : (l(), r(B, { key: 1 }, [
      $(" ")
    ], 64)),
    c("span", oa, [
      w(e.$slots, "default", {}, () => [
        $(g(t.label), 1)
      ], !0)
    ])
  ], 2);
}
const Jt = /* @__PURE__ */ I(la, [["render", aa], ["__scopeId", "data-v-0b39185d"]]), ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jt
}, Symbol.toStringTag, { value: "Module" })), ua = {
  name: "vu-input-date",
  mixins: [j, Te, Yt, R, U, D],
  emits: ["update:modelValue"],
  components: { VuDatepicker: Kt },
  props: {
    modelValue: {
      type: Date,
      default: () => null
    },
    contentClass: {
      type: String,
      default: () => ""
    },
    contentStyle: {
      type: [String, Object],
      default: () => ""
    },
    unselectableDaysOfWeek: {
      type: Array[Number],
      default: () => []
    },
    yearRange: {
      type: Number,
      default: () => 10
    },
    firstDay: {
      type: Number,
      default: () => 1
    },
    // input
    placeholder: {
      type: String,
      default: () => "Select a value"
    },
    // i18n
    dateFormatLocale: {
      type: String,
      default: () => "en"
    },
    dateFormatOptions: {
      type: Object,
      default: () => ({
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit"
      })
    },
    hideOnSelect: {
      type: Boolean,
      default: () => !0
    },
    previousMonthLabel: {
      type: String,
      required: !1,
      default: void 0
    },
    nextMonthLabel: {
      type: String,
      required: !1,
      default: void 0
    },
    monthsLabels: {
      type: Array,
      required: !1,
      default: () => {
      }
    },
    weekdaysLabels: {
      type: Array,
      required: !1,
      default: () => {
      }
    },
    weekdaysShortLabels: {
      type: Array,
      required: !1,
      default: () => {
      }
    },
    showWeekNumber: {
      type: Boolean,
      required: !1
    },
    isRTL: {
      type: Boolean,
      required: !1
    }
  },
  data: () => ({
    open: !1,
    stringifedValue: ""
  }),
  mounted() {
    console.log(this);
  },
  computed: {
    date: {
      get() {
        return this.modelValue;
      },
      set(e) {
        this.$emit("update:modelValue", e);
      }
    },
    isEmpty() {
      return this.value === null || this.value === "" || this.value === void 0;
    }
  },
  watch: {
    modelValue: {
      immediate: !0,
      handler() {
        this.date ? this.stringifedValue = new Intl.DateTimeFormat(this.dateFormatLocale, this.dateFormatOptions).format(this.date) : this.stringifedValue = "";
      }
    }
  },
  methods: {
    click() {
      this.date = "";
    },
    handleSelect(e) {
      this.date = e, this.hideOnSelect && (this.open = !1);
    }
  }
}, da = {
  key: 0,
  class: "control-label"
}, ca = {
  key: 0,
  class: "label-field-required"
}, ha = {
  ref: "activator",
  class: "input-date"
}, fa = ["value", "placeholder", "disabled"], ma = {
  key: 1,
  class: "form-control-helper-text"
};
function pa(e, s, t, i, o, n) {
  const a = y("VuDatepicker"), d = F("click-outside");
  return l(), r("div", {
    class: v(["form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", da, [
      $(g(e.label), 1),
      e.required ? (l(), r("span", ca, " * ")) : f("", !0)
    ])) : f("", !0),
    V((l(), r("div", ha, [
      c("input", {
        ref: "input",
        value: e.stringifedValue,
        placeholder: t.placeholder,
        disabled: e.disabled,
        readonly: "",
        type: "text",
        class: v(["form-control input-date", { filled: !n.isEmpty }]),
        onClick: s[0] || (s[0] = (u) => {
          e.open = !0;
        })
      }, null, 10, fa),
      e.clearable ? (l(), r("span", {
        key: 0,
        class: "input-date-reset fonticon fonticon-clear",
        onClick: s[1] || (s[1] = (u) => n.click())
      })) : f("", !0),
      C(a, {
        style: P([{ position: "absolute", top: "38px" }, t.contentStyle]),
        class: v(t.contentClass),
        "v-model": e.value,
        show: e.open,
        min: e.min,
        max: e.max,
        "unselectable-days-of-week": t.unselectableDaysOfWeek,
        "year-range": t.yearRange,
        "first-day": t.firstDay,
        "show-week-number": t.showWeekNumber,
        "is-r-t-l": t.isRTL,
        "previous-month-label": t.previousMonthLabel,
        "next-month-label": t.nextMonthLabel,
        "months-labels": t.monthsLabels,
        "weekdays-labels": t.weekdaysLabels,
        "weekdays-short-labels": t.weekdaysShortLabels,
        "onUpdate:modelValue": n.handleSelect,
        onBoundaryChange: s[2] || (s[2] = (u) => n.date = u.value)
      }, null, 8, ["style", "class", "v-model", "show", "min", "max", "unselectable-days-of-week", "year-range", "first-day", "show-week-number", "is-r-t-l", "previous-month-label", "next-month-label", "months-labels", "weekdays-labels", "weekdays-short-labels", "onUpdate:modelValue"])
    ])), [
      [d, function() {
        e.open = !1;
      }]
    ]),
    (l(!0), r(B, null, M(e.errorBucket, (u, m) => (l(), r("span", {
      key: `${m}-error-${u}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, g(u), 1))), 128)),
    e.helper.length ? (l(), r("span", ma, g(e.helper), 1)) : f("", !0)
  ], 2);
}
const ga = /* @__PURE__ */ I(ua, [["render", pa], ["__scopeId", "data-v-d5a1e2ab"]]), va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ga
}, Symbol.toStringTag, { value: "Module" })), ya = {
  name: "vu-input-number",
  inheritAttrs: !1,
  mixins: [j, R, U, D],
  props: {
    step: {
      type: Number,
      default: () => 0.1
    },
    decimal: {
      type: Number,
      default: () => 2
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    showButtons: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["update:modelValue"],
  methods: {
    input(e, s) {
      if (s && e === "" && this.value !== "") {
        this.$refs.input.value = this.value;
        return;
      }
      if (e === "" && s === "-" || s === "." || s === ",")
        return;
      let t = e !== "" ? this.parseValue(this.fixed(e)) : void 0;
      this.$emit("update:modelValue", t), this.$refs.input.value = this.value;
    },
    decrement() {
      let e = parseFloat(this.value);
      e = Number.isNaN(e) ? this.max : e, this.input(e - this.step);
    },
    increment() {
      let e = parseFloat(this.value);
      e = Number.isNaN(e) ? this.min : e, this.input(e + this.step);
    },
    parseValue(e) {
      const s = parseFloat(e);
      return s > this.max ? this.max : s < this.min ? this.min : s;
    },
    fixed(e) {
      return Math.round(e * 10 ** this.decimal) / 10 ** this.decimal;
    }
  }
}, ba = {
  key: 0,
  class: "control-label"
}, _a = {
  key: 0,
  class: "label-field-required"
}, wa = { class: "input-number" }, ka = ["disabled"], Sa = ["value", "placeholder", "disabled", "min", "max", "step"], Ca = ["disabled"], Ia = {
  key: 1,
  class: "form-control-helper-text"
};
function Ba(e, s, t, i, o, n) {
  return l(), r("div", {
    class: v(["vu-number form-group", { ...e.classes, "vu-number--no-buttons": !t.showButtons }])
  }, [
    e.label.length ? (l(), r("label", ba, [
      $(g(e.label), 1),
      e.required ? (l(), r("span", _a, " *")) : f("", !0)
    ])) : f("", !0),
    c("div", wa, [
      t.showButtons ? (l(), r("button", {
        key: 0,
        type: "button",
        disabled: e.disabled,
        class: "input-number-button input-number-button-left btn btn-default",
        onClick: s[0] || (s[0] = (...a) => n.decrement && n.decrement(...a))
      }, null, 8, ka)) : f("", !0),
      c("input", L(e.$attrs, {
        ref: "input",
        value: e.value,
        placeholder: e.placeholder,
        disabled: e.disabled,
        min: t.min,
        max: t.max,
        step: t.step,
        type: "number",
        class: "form-control",
        onKeypress: [
          s[1] || (s[1] = me((...a) => n.increment && n.increment(...a), ["up"])),
          s[2] || (s[2] = me((...a) => n.decrement && n.decrement(...a), ["down"]))
        ],
        onInput: s[3] || (s[3] = (a) => n.input(a.target.value, a.data))
      }), null, 16, Sa),
      t.showButtons ? (l(), r("button", {
        key: 1,
        type: "button",
        disabled: e.disabled,
        class: "input-number-button input-number-button-right btn btn-default",
        onClick: s[4] || (s[4] = (...a) => n.increment && n.increment(...a))
      }, null, 8, Ca)) : f("", !0)
    ]),
    (l(!0), r(B, null, M(e.errorBucket, (a, d) => (l(), r("span", {
      key: `${d}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, g(a), 1))), 128)),
    e.helper.length ? (l(), r("span", Ia, g(e.helper), 1)) : f("", !0)
  ], 2);
}
const Oa = /* @__PURE__ */ I(ya, [["render", Ba], ["__scopeId", "data-v-0671176e"]]), Va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oa
}, Symbol.toStringTag, { value: "Module" })), $a = {
  name: "vu-input",
  inheritAttrs: !1,
  inject: {
    vuInputComposition: {
      default: !1
    }
  },
  mixins: [j, R, D, U],
  emits: ["update:modelValue"]
}, Ma = {
  key: 0,
  class: "control-label"
}, Pa = {
  key: 0,
  class: "label-field-required"
}, xa = ["value", "placeholder", "disabled", "type"], La = {
  key: 1,
  class: "form-control-helper-text"
};
function Ta(e, s, t, i, o, n) {
  return l(), r("div", {
    class: v(["form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", Ma, [
      $(g(e.label), 1),
      e.required ? (l(), r("span", Pa, " *")) : f("", !0)
    ])) : f("", !0),
    c("input", L(e.$attrs, {
      value: e.value,
      placeholder: e.placeholder,
      disabled: e.disabled,
      type: e.type,
      class: "form-control",
      onInput: s[0] || (s[0] = ({ target: a }) => {
        n.vuInputComposition || (a.composing = !1), e.$emit("update:modelValue", a.value);
      })
    }), null, 16, xa),
    (l(!0), r(B, null, M(e.errorBucket, (a, d) => (l(), r("span", {
      key: `${d}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, g(a), 1))), 128)),
    e.helper.length ? (l(), r("span", La, g(e.helper), 1)) : f("", !0)
  ], 2);
}
const Zt = /* @__PURE__ */ I($a, [["render", Ta], ["__scopeId", "data-v-2bbbe8aa"]]), Aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zt
}, Symbol.toStringTag, { value: "Module" })), Qt = (e) => typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1), Fa = {
  name: "vu-lightbox-bar",
  emits: ["close", "click-comment", "click-download", "click-information", "click-share", "media-type-drag-start", "media-type-drag", "media-type-drag-end", "click-compass"],
  props: {
    // eslint-disable-next-line vue/require-prop-types
    showCloseIcon: { default: () => !0 },
    // eslint-disable-next-line vue/require-prop-types
    showCompass: { default: () => !0 },
    label: {
      type: String,
      default: () => ""
    },
    type: {
      type: Object,
      default: () => {
      }
    },
    items: {
      type: Array,
      default: () => []
    },
    customItems: {
      type: Array,
      default: () => []
    },
    subItems: {
      type: Array,
      default: () => []
    },
    rightItems: {
      type: Array,
      default: () => []
    },
    responsive: {
      type: Boolean,
      default: () => !1
    },
    widget: {
      type: Boolean,
      default: () => !1
    },
    moreActionsLabel: {
      type: String,
      default: () => "More"
    },
    disableCompass: {
      type: Boolean,
      required: !0
    },
    closeLabel: {
      type: String,
      default: () => "Close"
    },
    dropdownOverlay: Boolean,
    /* eslint-disable vue/require-default-prop */
    onMediaTypeDragStart: Function,
    onMediaTypeDrag: Function,
    onMediaTypeDragEnd: Function
  },
  data: () => ({
    getListenersFromAttrs: J,
    capitalize: Qt,
    uid: le()
  }),
  computed: {
    menuIcon() {
      return this.responsive ? "menu-dot" : "chevron-down";
    },
    hasLeftToDividerContent() {
      return this.items.length > 0 && this.items.some((e) => !e.hidden) || this._dropdownMenuItems.length > 0 || this.$slots["lightbox-bar__special-actions"];
    },
    hasRightToDividerContent() {
      return this.showCloseIcon || this.rightItems && this.rightItems.length > 0 && this.rightItems.some((e) => !e.hidden);
    },
    hasDragEvent() {
      return this.onMediaTypeDragStart || this.onMediaTypeDrag || this.onMediaTypeDragEnd;
    },
    _items() {
      return this.actionsMergeSubs(this.items, this.customItems);
    },
    dropdownMenuListeners() {
      const e = this.getListenersFromAttrs(this.$attrs);
      if (e.close) {
        const s = { ...e };
        return delete s.close, s;
      }
      return e;
    },
    _dropdownMenuItems() {
      if (this.responsive) {
        const e = this._items.filter(({ nonResponsive: s, hidden: t }) => !s && !t);
        return this.subItems && this.subItems.length > 0 && e.push({
          name: "more-actions",
          label: this.moreActionsLabel,
          items: this.subItems
        }), e;
      }
      return this.subItems;
    }
  },
  methods: {
    icon(e) {
      return e.icon ? `${e.icon}` : `${e.fonticon}`;
    },
    actionClick(e, s = "primary-action") {
      e.disabled || (e.handler && e.handler(e), this.$emit(`click-${e.name.toLowerCase()}`, e, { type: s }));
    },
    actionsMergeSubs(e, s) {
      const t = s.filter(({ name: n }) => e.find(({ name: a }) => n === a)), i = s.filter(({ name: n }) => !t.find(({ name: a }) => n === a));
      e.forEach(({ name: n, items: a }) => {
        const d = t.find(({ name: u }) => u === n);
        if (d) {
          const { items: u } = d;
          u && (Array.isArray(a) || (a = []), a.push(...u));
        }
      });
      let o = [...e, ...i];
      return o = o.map((n) => {
        if (n.text === void 0) {
          const a = this.capitalize(n.name);
          n.text = a;
        }
        return n;
      }), o;
    },
    selectedItemsArray(e) {
      return this.customItems ? this.getSelectedItems(e) : [];
    },
    getSelectedItems(e) {
      let s = [];
      return Array.isArray(e) && e.forEach((t) => {
        if (t.items) {
          const i = this.getSelectedItems(t);
          s = [s, ...i];
        }
      }), s.filter((t) => t.selected);
    }
  },
  components: { VuIconBtn: T, VuDropdownMenu: be }
}, es = (e) => (te("data-v-14413ab3"), e = e(), se(), e), Da = { class: "lightbox-bar__left" }, za = /* @__PURE__ */ es(() => /* @__PURE__ */ c("div", { class: "lightbox-bar__compass-active" }, null, -1)), Na = [
  za
], Ea = { class: "lightbox-bar-menu-item lightbox-bar-menu-item--no-cursor" }, ja = ["draggable"], Ra = { class: "lightbox-bar__title" }, Ua = { class: "lightbox-bar__right" }, qa = { class: "lightbox-bar__menu" }, Ha = {
  key: 2,
  class: "lightbox-bar__divider"
}, Wa = /* @__PURE__ */ es(() => /* @__PURE__ */ c("hr", { class: "divider divider--vertical" }, null, -1)), Ka = [
  Wa
];
function Ga(e, s, t, i, o, n) {
  const a = y("VuIconBtn"), d = y("VuDropdownMenu"), u = F("tooltip");
  return l(), r("div", {
    class: v(["vu-lightbox-bar", {
      "lightbox-bar--responsive": t.responsive,
      "lightbox-bar--widget-header": t.widget
    }])
  }, [
    c("div", Da, [
      t.showCompass && !t.widget ? (l(), r("div", {
        key: 0,
        class: v(["lightbox-bar__compass", { "lightbox-bar__compass--disabled": t.disableCompass }]),
        onClick: s[0] || (s[0] = (m) => e.$emit("click-compass"))
      }, Na, 2)) : f("", !0),
      w(e.$slots, "lightbox-bar__object-type", {}, () => [
        c("div", Ea, [
          c("div", {
            class: "lightbox-bar__media-type",
            style: P({ "background-color": t.type.backgroundColor }),
            onDragstart: s[1] || (s[1] = (m) => e.$emit("media-type-drag-start", m)),
            onDrag: s[2] || (s[2] = (m) => e.$emit("media-type-drag", m)),
            onDragend: s[3] || (s[3] = (m) => e.$emit("media-type-drag-end", m)),
            draggable: n.hasDragEvent ? "true" : "false"
          }, [
            c("span", {
              class: v(`fonticon fonticon-${t.type.icon}`)
            }, null, 2)
          ], 44, ja)
        ])
      ], !0),
      c("div", Ra, [
        w(e.$slots, "lightbox-bar__title", {}, () => [
          c("span", null, g(t.label), 1)
        ], !0)
      ])
    ]),
    c("div", Ua, [
      c("div", qa, [
        t.responsive ? f("", !0) : (l(!0), r(B, { key: 0 }, M(n._items, (m, h) => (l(), r(B, {
          key: `${e.uid}-${h}-rm`
        }, [
          m.items && !m.hidden ? (l(), _(d, L({
            "v-model": n.selectedItemsArray(n._items),
            key: `lightbox-dropdownmenu_${e.uid}-${h}`,
            items: m.items,
            shift: !0,
            disabled: m.disabled
          }, { overlay: t.dropdownOverlay }, { class: "lightbox-bar-dropdown-wrap" }, Q(n.dropdownMenuListeners)), {
            default: S(({ active: p }) => [
              V(C(a, {
                icon: n.icon(m),
                active: m.selected || p,
                disabled: m.disabled,
                color: t.widget ? "default" : "secondary",
                class: "lightbox-bar-menu-item",
                onClick: () => n.actionClick(m)
              }, null, 8, ["icon", "active", "disabled", "color", "onClick"]), [
                [
                  u,
                  `${m.label || e.capitalize(m.name)}`,
                  void 0,
                  {
                    body: !0,
                    bottom: !0
                  }
                ]
              ])
            ]),
            _: 2
          }, 1040, ["v-model", "items", "disabled"])) : m.hidden ? f("", !0) : V((l(), _(a, {
            key: 1,
            icon: n.icon(m),
            active: m.selected,
            disabled: m.disabled,
            color: t.widget ? "default" : "secondary",
            class: "lightbox-bar-menu-item",
            onClick: () => n.actionClick(m)
          }, null, 8, ["icon", "active", "disabled", "color", "onClick"])), [
            [
              u,
              `${m.label || e.capitalize(m.name)}`,
              void 0,
              {
                body: !0,
                bottom: !0
              }
            ]
          ])
        ], 64))), 128)),
        n._dropdownMenuItems.length > 0 ? (l(), _(d, L({
          key: 1,
          "v-model": n.selectedItemsArray(n._dropdownMenuItems),
          class: "lightbox-bar-dropdown-wrap",
          "prevent-dropup": !0,
          items: n._dropdownMenuItems,
          position: "bottom-left",
          shift: !0
        }, { overlay: t.dropdownOverlay }, Q(n.dropdownMenuListeners)), {
          default: S(({ active: m }) => [
            V(C(a, {
              icon: n.menuIcon,
              active: m,
              color: t.widget ? "default" : "secondary",
              class: v(["lightbox-bar-menu-item", t.responsive ? "" : "chevron-menu-icon"])
            }, null, 8, ["icon", "active", "color", "class"]), [
              [
                u,
                `${t.moreActionsLabel}`,
                void 0,
                {
                  body: !0,
                  bottom: !0
                }
              ]
            ])
          ]),
          _: 1
        }, 16, ["v-model", "items"])) : f("", !0),
        w(e.$slots, "lightbox-bar__special-actions", {}, void 0, !0),
        n.hasLeftToDividerContent && n.hasRightToDividerContent ? (l(), r("div", Ha, Ka)) : f("", !0),
        (l(!0), r(B, null, M(t.rightItems, (m, h) => (l(), r(B, null, [
          m.hidden ? f("", !0) : V((l(), _(a, {
            key: `${e.uid}-sa-${h}`,
            class: "lightbox-bar-menu-item",
            color: t.widget ? "default" : "secondary",
            icon: n.icon(m),
            active: m.selected,
            disabled: m.disabled,
            onClick: (p) => n.actionClick(m, "side-action")
          }, null, 8, ["color", "icon", "active", "disabled", "onClick"])), [
            [
              u,
              `${m.label || e.capitalize(m.name)}`,
              void 0,
              {
                body: !0,
                bottom: !0
              }
            ]
          ])
        ], 64))), 256)),
        t.showCloseIcon ? V((l(), _(a, {
          key: 3,
          class: "lightbox-bar-menu-item",
          color: t.widget ? "default" : "secondary",
          icon: "close",
          onClick: s[4] || (s[4] = (m) => e.$emit("close", !1))
        }, null, 8, ["color"])), [
          [
            u,
            t.closeLabel,
            void 0,
            {
              body: !0,
              bottom: !0
            }
          ]
        ]) : f("", !0)
      ])
    ])
  ], 2);
}
const ts = /* @__PURE__ */ I(Fa, [["render", Ga], ["__scopeId", "data-v-14413ab3"]]), Ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ts
}, Symbol.toStringTag, { value: "Module" })), bt = {
  picture: {
    id: 1,
    icon: "picture",
    backgroundColor: "#70036b"
    // $violet-dv-1
  },
  audio: {
    id: 2,
    icon: "sound",
    backgroundColor: "#70036b"
    // $violet-dv-1
  },
  video: {
    id: 3,
    icon: "video",
    backgroundColor: "#70036b"
    // $violet-dv-1
  },
  "3dmodel": {
    id: 4,
    icon: "3d-object",
    backgroundColor: "#70036b"
    // $violet-dv-1
  },
  document: {
    id: 5,
    icon: "doc",
    backgroundColor: "#70036b"
    // $violet-dv-1
  }
}, _t = [
  {
    name: "comment",
    fonticon: "topbar-comment",
    disabled: !1,
    hidden: !1
  },
  {
    name: "share",
    fonticon: "share-alt",
    disabled: !1,
    hidden: !1
  },
  {
    name: "download",
    fonticon: "download",
    disabled: !1,
    hidden: !1
  },
  {
    name: "information",
    fonticon: "topbar-info",
    disabled: !1,
    hidden: !1
  }
], wt = [
  {
    name: "previous",
    fonticon: "chevron-left",
    selected: !1,
    disabled: !1,
    hidden: !1
  },
  {
    name: "next",
    fonticon: "chevron-right",
    selected: !1,
    disabled: !1,
    hidden: !1
  }
], Xa = {
  name: "vu-lightbox",
  components: { VuLightboxBar: ts, VuIconBtn: T, VuIconBtn: T },
  data() {
    return {
      panelStates: [],
      openCompass: !1,
      compassAlreadyOpened: !1,
      compassPath: "webapps/i3DXCompassStandalone/i3DXCompassStandalone.html",
      resizeObserver: {},
      transforms: {
        responsive: !1,
        left: {},
        center: {},
        right: {}
      },
      capitalize: Qt,
      customItems: [],
      getListenersFromAttrs: J,
      uid: le()
    };
  },
  emits: ["close", "click-comment", "click-information", "click-share", "click-download", "media-type-drag-start", "media-type-drag", "media-type-drag-end", "click-compass"],
  props: {
    title: {
      type: String,
      default: () => ""
    },
    // eslint-disable-next-line vue/require-default-prop
    userId: {
      type: String,
      required: !1
    },
    panels: {
      type: Array,
      required: !1,
      default: () => [{}]
    },
    widget: {
      type: Boolean,
      default: () => !1
    },
    objectType: {
      type: [String, Object],
      default: () => "picture",
      validator: (e) => !!bt[e] || e && e.icon && e.backgroundColor
    },
    primaryActions: {
      type: [Array, String],
      default: () => _t
    },
    customActions: {
      type: Boolean,
      default: () => !1
    },
    menuActions: {
      type: Array,
      required: !1,
      default: () => []
    },
    sideActions: {
      type: Array,
      default: () => wt
    },
    customSideActions: {
      type: Boolean,
      default: () => !1
    },
    noObjectType: {
      type: Boolean,
      default: () => !1
    },
    disableCompass: {
      type: Boolean,
      default: () => !1
    },
    zIndex: {
      type: Number,
      default: () => 100
    },
    moreActionsLabel: {
      type: String,
      default: () => "More"
    },
    closeLabel: {
      type: String,
      default: () => "Close"
    },
    noAnimation: {
      type: Boolean,
      default: () => !1
    },
    fasterAnimation: {
      type: Boolean,
      default: () => !1
    },
    hideCloseIcon: {
      type: Boolean,
      default: () => !1
    },
    dropdownOverlay: Boolean,
    /* eslint-disable vue/prop-name-casing, vue/require-default-prop */
    onClose: Function,
    "onClick-comment": Function,
    "onClick-download": Function,
    "onClick-information": Function,
    "onClick-share": Function,
    "onMedia-type-drag-start": Function,
    "onMedia-type-drag": Function,
    "onMedia-type-drag-end": Function
  },
  created() {
    this.panels.find(({ show: e }) => e !== void 0) || (this.panelStates = this.panels.map((e) => ({ ...e, show: !1 })));
  },
  computed: {
    typeInfo() {
      return typeof this.objectType == "object" ? this.objectType : bt[this.objectType];
    },
    compassIframeUrl() {
      return `${this.serviceUrl || ""}/${this.compassPath}${this.userId ? `#userId:${this.userId}` : ""}`;
    },
    listeners() {
      return J(this.$attrs, !0);
    },
    listenersFromProps() {
      return this.getListenersFromAttrs(this.$props, !0);
    },
    _panels() {
      return this.panelStates.length > 0 ? this.panelStates : this.panels;
    },
    showRightPanel() {
      return this._panels.find(({ show: e }) => e);
    },
    noCompass() {
      return this.widget;
    },
    _primaryActions() {
      const e = this.primaryActions, s = _t;
      if (this.widget) {
        const t = e.find(({ name: o }) => o === "information"), i = e.find(({ name: o }) => o === "comment");
        t && !t.fonticon && (s.find(({ name: o }) => o === "information").fonticon = "info"), i && !i.fonticon && (s.find(({ name: o }) => o === "comment").fonticon = "comment");
      }
      return this.actionsMerge(e, s, this.customActions);
    },
    _sideActions() {
      return this.actionsMerge(this.sideActions, wt, this.customSideActions);
    }
  },
  mounted() {
    this.onResize();
    const e = new ResizeObserver(() => {
      this.onResize();
    });
    e.observe(this.$refs.lightbox), this.resizeObserver = e;
    const s = this;
    !this.noCompass && window && window.require && window.require(["DS/UWPClientCode/Data/Utils", "DS/UWPClientCode/PublicAPI"], (t, i) => {
      this.getCompassUrl = () => {
        t.getServiceUrl({
          serviceName: "3DCompass",
          onComplete: (o) => {
            s.serviceUrl = o;
          },
          onFailure: () => {
            UWA && UWA.debug && console.error("Lightbox Compass failed to retrieve 3DCompass service url");
          },
          scope: s
        });
      }, this.userId ? this.getCompassUrl() : i.getCurrentUser().then(
        ({ login: o }) => {
          s.userId = o, this.getCompassUrl();
        },
        // eslint-disable-next-line comma-dangle
        () => this.getCompassUrl()
      );
    });
  },
  watch: {
    openCompass() {
      this.onResize();
    },
    showRightPanel() {
      this.onResize();
    }
  },
  methods: {
    addCustomAction(e) {
      const s = this.customItems.find(({ name: t }) => t === e.name);
      s ? this.customItems[this.customItems.indexOf(s)] = e : this.customItems.push(e);
    },
    clearCustomActions() {
      this.customItems = [];
    },
    showPanel(e, s = !0) {
      if (!this.panelStates.length)
        return;
      s && this.hideAllPanels(e);
      const t = this.panelStates.find(({ name: i }) => e === i);
      t.show = !0;
    },
    hidePanel(e) {
      if (!this.panelStates.length)
        return;
      const s = this.panelStates.find(({ name: t }) => e === t);
      s.show = !1;
    },
    // eslint-disable-next-line no-unused-vars
    hideAllPanels(e = "") {
      this.panelStates.length && this.panelStates.filter(({ name: s }) => s !== e).forEach((s) => {
        s.show = !1;
      });
    },
    actionsMerge(e, s, t) {
      let i = e;
      return t || (i = e.slice(0, s.length).filter(({ name: o }) => s.find(({ name: n }) => o === n)), i = i.map((o) => ({
        // If component user messes up order \o/
        ...s.find(({ name: n }) => o.name === n),
        ...o
      }))), i = i.map((o) => {
        if (o.text === void 0) {
          const n = this.capitalize(o.name);
          o.text = n;
        }
        return o;
      }), i;
    },
    onResize() {
      const { clientWidth: e } = this.$refs.lightbox;
      let s;
      if (e > 639) {
        const t = Math.min(e * 0.125 + 240, 480);
        s = {
          responsive: !1,
          left: {
            width: `${t}px`
          },
          center: {
            "margin-left": this.openCompass ? `${t}px` : 0,
            "margin-right": this.showRightPanel ? `${t}px` : 0
          },
          right: {
            width: `${t}px`
          }
        };
      } else
        s = { responsive: !0, center: {}, right: {} };
      this.transforms = s;
    }
  },
  beforeUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect(), delete this.resizeObserver;
  }
}, Ja = (e) => (te("data-v-7f266739"), e = e(), se(), e), Za = ["data-id"], Qa = /* @__PURE__ */ Ja(() => /* @__PURE__ */ c("div", { class: "lightbox__overlay" }, null, -1)), er = ["src"], tr = {
  key: 0,
  class: "panel__header"
}, sr = { class: "panel__title" }, nr = { class: "panel__title__text" };
function ir(e, s, t, i, o, n) {
  const a = y("VuLightboxBar"), d = y("VuIconBtn");
  return l(), r("div", null, [
    w(e.$slots, "lightbox-activator", {}, void 0, !0),
    c("div", {
      ref: "lightbox",
      class: v(["vu-lightbox", {
        "lightbox--responsive": o.transforms.responsive,
        "lightbox--widget-header": t.widget,
        "vu-lightbox--appear-faster": !t.widget && !t.noAnimation && t.fasterAnimation,
        "vu-lightbox--appear-fast": !t.widget && !t.noAnimation && !t.fasterAnimation
      }]),
      style: P({
        zIndex: t.zIndex
      }),
      "data-id": o.uid
    }, [
      C(a, L({
        label: t.title,
        "show-compass": !n.noCompass,
        class: { "lightbox-bar--compass-open": o.openCompass },
        type: n.typeInfo,
        items: n._primaryActions,
        "sub-items": t.menuActions,
        "right-items": n._sideActions,
        responsive: o.transforms.responsive
      }, Q({ ...n.listeners, ...n.listenersFromProps }), { disableCompass: t.disableCompass, customItems: o.customItems, dropdownOverlay: t.dropdownOverlay, widget: t.widget, moreActionsLabel: t.moreActionsLabel, closeLabel: t.closeLabel }, {
        onClickCompass: s[0] || (s[0] = () => {
          t.disableCompass || (o.openCompass = !o.openCompass, o.compassAlreadyOpened = !0), e.$emit("click-compass", o.openCompass);
        })
      }), {
        "lightbox-bar__object-type": S((u) => [
          w(e.$slots, "lightbox-bar__object-type", ze(Ne(u)), void 0, !0)
        ]),
        "lightbox-bar__title": S((u) => [
          w(e.$slots, "lightbox-bar__title", ze(Ne(u)), void 0, !0)
        ]),
        "lightbox-bar__special-actions": S(() => [
          w(e.$slots, "lightbox-bar__special-actions", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["label", "show-compass", "class", "type", "items", "sub-items", "right-items", "responsive"]),
      Qa,
      c("div", {
        class: "lightbox__content",
        ref: "content",
        style: P(o.transforms.center || {})
      }, [
        w(e.$slots, "lightbox-content", {}, void 0, !0)
      ], 4),
      !n.noCompass && o.compassAlreadyOpened ? V((l(), r("div", {
        key: 0,
        class: "vu-panel lightbox__panel lightbox__panel--left column",
        style: P(o.transforms.left || {})
      }, [
        c("iframe", {
          class: "compass",
          src: n.compassIframeUrl
        }, null, 8, er),
        o.transforms.responsive ? (l(), _(d, {
          key: 0,
          icon: "close",
          style: { position: "absolute", right: "0", top: "0", zindex: "21" },
          onClick: s[1] || (s[1] = (u) => o.openCompass = !1)
        })) : f("", !0)
      ], 4)), [
        [ee, o.openCompass]
      ]) : f("", !0),
      (l(!0), r(B, null, M(n._panels, ({ name: u, show: m, showClose: h = !1, showEdit: p, classes: b = [], title: k }, O) => V((l(), r("div", {
        key: `${o.uid}-${O}`,
        class: v(["vu-panel lightbox__panel column", [...b, "lightbox__panel--right", { "panel--responsive": o.transforms.responsive }]]),
        style: P(o.transforms.right)
      }, [
        k ? (l(), r("div", tr, [
          c("span", sr, [
            c("span", nr, g(k), 1),
            p ? (l(), _(d, {
              key: 0,
              class: "panel__edit__icon",
              icon: "pencil",
              onClick: (z) => e.$emit(`panel-edit-${u}`)
            }, null, 8, ["onClick"])) : f("", !0)
          ]),
          h ? (l(), _(d, {
            key: 0,
            class: "panel__close_icon",
            icon: "close",
            onClick: (z) => e.$emit(`close-panel-${u}`)
          }, null, 8, ["onClick"])) : f("", !0)
        ])) : o.transforms.responsive || h ? (l(), _(d, {
          key: 1,
          class: "panel__close_icon",
          icon: "close",
          onClick: (z) => e.$emit(`close-panel-${u}`)
        }, null, 8, ["onClick"])) : f("", !0),
        c("div", {
          class: v([`vu-dynamic-panel-wrap-${u}`, "panel__content"])
        }, [
          w(e.$slots, `lightbox-panel-${u}`, {}, void 0, !0)
        ], 2)
      ], 6)), [
        [ee, m]
      ])), 128))
    ], 14, Za)
  ]);
}
const lr = /* @__PURE__ */ I(Xa, [["render", ir], ["__scopeId", "data-v-7f266739"]]), or = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lr
}, Symbol.toStringTag, { value: "Module" })), ar = {
  name: "vu-media-upload-droppable",
  props: {
    isOver: {
      type: Boolean
    },
    validDrop: {
      type: Boolean
    }
  },
  emits: ["drop"],
  inject: {
    vuMediaUploadDropText: {
      default: "Drop your files to upload"
    }
  },
  computed: {
    classes() {
      return {
        "vu-media-upload-droppable--valid": this.validDrop
      };
    }
  },
  mounted() {
  },
  beforeUnmount() {
  },
  methods: {},
  components: { VuIcon: A }
}, rr = { class: "vu-media-upload-droppable__icon" }, ur = { class: "vu-media-upload-droppable__label" };
function dr(e, s, t, i, o, n) {
  const a = y("VuIcon");
  return l(), r("div", {
    class: v(["vu-media-upload-droppable", n.classes]),
    onDrop: s[0] || (s[0] = q((d) => e.$emit("drop", d), ["prevent", "stop"]))
  }, [
    w(e.$slots, "drop-main", {}, () => [
      c("div", rr, [
        C(a, {
          icon: "up",
          color: "none"
        })
      ])
    ]),
    w(e.$slots, "drop-alt", {}, () => [
      c("span", ur, g(n.vuMediaUploadDropText), 1)
    ])
  ], 34);
}
const ss = /* @__PURE__ */ I(ar, [["render", dr]]), cr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ss
}, Symbol.toStringTag, { value: "Module" })), hr = {
  name: "vu-media-upload-empty",
  components: { VuIcon: A, VuBtn: ie, VuIconLink: Jt },
  props: {
    rich: {
      // default: true,
      type: Boolean
    }
  },
  emits: ["browse"],
  inject: {
    vuMediaUploadPlaceholderLong: {
      default: "Drag & Drop files here"
    },
    vuMediaUploadPlaceholder: {
      default: "Drag & Drop or"
    },
    vuMediaUploadOR: {
      default: "or"
    },
    vuMediaUploadBrowse: {
      default: "Browse Files"
    }
  }
}, fr = { class: "vu-media-upload-empty" }, mr = { class: "vu-media-upload-empty__OR" }, pr = { key: 1 };
function gr(e, s, t, i, o, n) {
  const a = y("VuIcon"), d = y("VuBtn"), u = y("VuIconLink");
  return l(), r("div", fr, [
    C(a, { icon: "drag-drop" }),
    t.rich ? (l(), r(B, { key: 0 }, [
      c("span", null, g(n.vuMediaUploadPlaceholderLong), 1),
      c("span", mr, g(n.vuMediaUploadOR), 1),
      C(d, {
        onClick: s[0] || (s[0] = (m) => e.$emit("browse")),
        color: "primary"
      }, {
        default: S(() => [
          $(g(n.vuMediaUploadBrowse), 1)
        ]),
        _: 1
      })
    ], 64)) : (l(), r("div", pr, [
      $(g(n.vuMediaUploadPlaceholder), 1),
      C(u, {
        onClick: s[1] || (s[1] = (m) => e.$emit("browse"))
      }, {
        default: S(() => [
          $(g(n.vuMediaUploadBrowse), 1)
        ]),
        _: 1
      })
    ]))
  ]);
}
const ns = /* @__PURE__ */ I(hr, [["render", gr], ["__scopeId", "data-v-e72d88bf"]]), vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ns
}, Symbol.toStringTag, { value: "Module" })), yr = {
  name: "vu-media-upload-error",
  inject: {
    vuMediaUploadRetry: {
      default: "Retry"
    }
  },
  emits: ["retry"],
  props: {
    icon: {
      type: String,
      default: "attention"
    },
    // eslint-disable-next-line vue/require-prop-types
    errorBucket: {
      default: () => []
    }
  },
  components: { VuIconBtn: T, VuBtn: ie }
}, br = { class: "vu-media-upload-error" };
function _r(e, s, t, i, o, n) {
  const a = y("VuIconBtn"), d = y("VuBtn");
  return l(), r("div", br, [
    C(a, {
      icon: t.icon,
      class: "vu-media-upload-error__icon"
    }, null, 8, ["icon"]),
    (l(!0), r(B, null, M(t.errorBucket, (u, m) => (l(), r("span", {
      class: "vu-media-upload-error__error_label",
      key: m
    }, g(u), 1))), 128)),
    C(d, {
      onClick: s[0] || (s[0] = (u) => e.$emit("retry")),
      class: "vu-media-upload-error__retry",
      small: ""
    }, {
      default: S(() => [
        $(g(n.vuMediaUploadRetry), 1)
      ]),
      _: 1
    })
  ]);
}
const is = /* @__PURE__ */ I(yr, [["render", _r], ["__scopeId", "data-v-1ea45111"]]), wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: is
}, Symbol.toStringTag, { value: "Module" })), kr = {
  name: "vu-progress-circular",
  mixins: [ge],
  data() {
    return {
      progressAngle: this.value / this.total * 100 * 3.6,
      intervalId: null,
      completedView: this.value >= this.total
    };
  },
  props: {
    value: {
      default: 0,
      type: Number
    },
    total: {
      default: 100,
      type: Number
    },
    radius: {
      default: 60,
      type: Number
    },
    noHatch: {
      default: !1,
      type: Boolean
    },
    unfilledColor: {
      type: String,
      default: "#d1d4d4"
      // $grey-4
    },
    color: {
      type: String,
      default: () => "default",
      validator(e) {
        return ["default", "success", "warning", "error"].includes(e);
      }
    },
    hexColor: {
      type: String,
      required: !1,
      default: ""
    },
    speedModifier: {
      type: Number,
      default: 1
    }
  },
  watch: {
    total() {
      this.animateProgress();
    },
    value() {
      this.animateProgress();
    }
  },
  computed: {
    radiusPx() {
      return `${this.radius}px`;
    },
    formattedCompletedCount() {
      return this.value < this.total ? this.value : this.total;
    },
    progressPercentage() {
      return this.value / this.total * 100;
    },
    renderHatch() {
      return !this.noHatch && this.value < this.total;
    }
  },
  methods: {
    updateAngle(e) {
      this.completedView = !1;
      const s = Math.abs(this.progressAngle - e);
      Math.round(this.progressAngle) < Math.round(e) ? s <= this.speedModifier ? this.progressAngle = e : this.progressAngle += this.speedModifier : Math.round(this.progressAngle) > Math.round(e) ? s <= this.speedModifier ? this.progressAngle = e : this.progressAngle -= this.speedModifier : (clearInterval(this.intervalId), this.value >= this.total && (this.completedView = !0));
    },
    animateProgress() {
      this.intervalId && clearInterval(this.intervalId);
      const e = this.progressPercentage * 3.6;
      this.intervalId = setInterval(this.updateAngle.bind(this, e), 5);
    }
  },
  beforeUnmount() {
    this.intervalId && clearInterval(this.intervalId);
  }
}, Sr = { class: "vu-progress-circular" }, Cr = { class: "vu-progress-circular__content" };
function Ir(e, s, t, i, o, n) {
  return l(), r("div", Sr, [
    c("div", {
      class: v(["vu-progress-circular__circle", t.hexColor ? "" : `vu-progress-circular--${t.color}`]),
      style: P({
        background: `conic-gradient( currentcolor ${o.progressAngle}deg, ${t.unfilledColor} ${o.progressAngle}deg)`,
        width: n.radiusPx,
        height: n.radiusPx,
        color: t.hexColor !== void 0 && t.hexColor,
        "-webkit-mask": `radial-gradient(${t.radius * (2 / 5)}px, #0000 98%, #000)`
      })
    }, [
      n.renderHatch ? (l(), r("div", {
        key: 0,
        class: v(["vu-progress-circular__hatch-container", { "vu-progress-circular__hatch-clip": o.progressAngle < 180 }])
      }, [
        c("div", {
          class: "vu-progress-circular__hatch",
          style: P(`transform: rotate(${o.progressAngle}deg)`)
        }, null, 4)
      ], 2)) : f("", !0)
    ], 6),
    c("div", Cr, [
      o.completedView && this.$slots.complete ? w(e.$slots, "complete", { key: 0 }, void 0, !0) : w(e.$slots, "default", { key: 1 }, () => [
        C(fe, {
          name: "fade",
          mode: "out-in"
        }, {
          default: S(() => [
            c("div", {
              key: "uncomplete-view",
              style: P({ fontSize: `${t.radius / 5}px` })
            }, g(Math.round(o.progressAngle / 360 * 100)) + "% ", 5)
          ]),
          _: 1
        })
      ], !0)
    ])
  ]);
}
const ls = /* @__PURE__ */ I(kr, [["render", Ir], ["__scopeId", "data-v-2cca5b59"]]), Br = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ls
}, Symbol.toStringTag, { value: "Module" })), Or = {
  name: "vu-media-upload-loading",
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  inject: {
    vuMediaUploadAbortButton: {
      default: "Abort"
    }
  },
  emits: ["upload-abort"],
  components: { VuProgressCircular: ls, VuBtn: ie }
}, Vr = { class: "vu-media-upload-loading" };
function $r(e, s, t, i, o, n) {
  const a = y("VuProgressCircular"), d = y("VuBtn");
  return l(), r("div", Vr, [
    C(a, { value: t.progress }, null, 8, ["value"]),
    C(d, {
      color: "default",
      onClick: s[0] || (s[0] = (u) => e.$emit("upload-abort")),
      small: "",
      class: "vu-media-upload-loading__abort"
    }, {
      default: S(() => [
        $(g(n.vuMediaUploadAbortButton), 1)
      ]),
      _: 1
    })
  ]);
}
const os = /* @__PURE__ */ I(Or, [["render", $r], ["__scopeId", "data-v-65c4aae6"]]), Mr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: os
}, Symbol.toStringTag, { value: "Module" })), Pr = {
  name: "vu-media-upload-preview",
  computed: {
    videoSizer() {
      var i;
      const [e, s] = (i = this.displayRatio) == null ? void 0 : i.replace(",", "").split("/"), t = Number(e) / Number(s);
      return t ? { paddingBottom: `${1 / t * 100}%` } : void 0;
    }
  },
  props: {
    deleteIcon: {
      type: String,
      default: () => "trash"
    },
    src: {
      type: String,
      required: !0
    },
    isVideo: {
      type: Boolean
    },
    videoControls: {
      type: Boolean,
      required: !1
    },
    displayRatio: {
      type: String,
      default: () => "16 / 9"
    }
  },
  emits: ["delete"],
  components: { VuImage: ye, VuIconBtn: T }
}, xr = ["src", "controls"];
function Lr(e, s, t, i, o, n) {
  const a = y("VuIconBtn"), d = y("VuImage"), u = y("vu-spinner");
  return l(), r(B, null, [
    t.isVideo ? (l(), r("div", {
      key: 0,
      class: "vu-media-upload-preview__video-container",
      style: P(n.videoSizer)
    }, [
      c("video", {
        class: "vu-media-upload-preview",
        src: t.src,
        controls: t.videoControls
      }, null, 8, xr)
    ], 4)) : t.isVideo ? e.loading ? (l(), _(u, { key: 2 })) : f("", !0) : (l(), _(d, {
      key: 1,
      class: "vu-media-upload-preview",
      "aspect-ratio": t.displayRatio,
      src: t.src,
      contain: "",
      style: { height: "100%" }
    }, {
      default: S(() => [
        c("div", {
          class: "vu-media-upload-preview__delete-icon",
          onClick: s[0] || (s[0] = (m) => e.$emit("delete"))
        }, [
          C(a, { icon: t.deleteIcon }, null, 8, ["icon"])
        ])
      ]),
      _: 1
    }, 8, ["aspect-ratio", "src"])),
    t.isVideo ? (l(), r("div", {
      key: 3,
      class: "vu-media-upload-preview__delete-icon",
      onClick: s[1] || (s[1] = (m) => e.$emit("delete"))
    }, [
      C(a, { icon: t.deleteIcon }, null, 8, ["icon"])
    ])) : f("", !0)
  ], 64);
}
const as = /* @__PURE__ */ I(Pr, [["render", Lr], ["__scopeId", "data-v-d9cd5744"]]), Tr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: as
}, Symbol.toStringTag, { value: "Module" })), Ar = {
  empty: "empty",
  loading: "loading",
  error: "error",
  complete: "complete"
}, Fr = {
  name: "vu-media-upload",
  mixins: [j, D, ue, R, U],
  props: {
    icon: {
      type: String,
      default: () => ""
    },
    mediaUrl: {
      type: String,
      default: () => ""
    },
    video: {
      type: Boolean,
      default: !1
    },
    videoControls: {
      type: Boolean,
      default: !0
    },
    uploadProgress: {
      type: Number,
      required: !1,
      default: void 0
    },
    fileMaxSize: {
      type: Number,
      default: () => 1 / 0
    },
    displayRatio: {
      type: String,
      default: () => "16 / 9"
    },
    showLabel: {
      type: Boolean
    },
    multiple: {
      type: Boolean
    },
    allowLoadingDrop: {
      type: Boolean
    },
    allowErrorDrop: {
      type: Boolean
    },
    skipTypeCheck: {
      type: Boolean,
      required: !1
    },
    noDragNDrop: {
      type: Boolean,
      required: !1
    },
    acceptVideo: Boolean,
    acceptImage: {
      type: Boolean,
      default: !0
    },
    state: {
      type: String,
      default: ""
    }
  },
  inject: {
    vuMediaUploadSizeExcess: {
      default: "File exceeds maximum size."
    },
    vuMediaUploadShouldBeImage: {
      default: "Please select an image."
    },
    vuMediaUploadShouldBeVideo: {
      default: "Please select a video."
    }
  },
  data() {
    return {
      states: Ar,
      innerState: "empty",
      innerVideo: !1,
      allowDrop: !1,
      dragged: !1,
      error: ""
    };
  },
  created() {
    this.localRules = [this.checkVideoType, this.checkImgType, this.checkFileSize];
  },
  emits: ["update:state", "upload-abort", "select", "delete", "retry"],
  computed: {
    preview() {
      return {
        src: this.mediaUrl,
        isVideo: this.video || this.innerVideo,
        displayRatio: this.displayRatio,
        videoControls: this.videoControls
      };
    },
    hasLabel() {
      return this.showLabel && !this.multiple;
    },
    wrapStyle() {
      return {
        "aspect-ratio": this.displayRatio
      };
    },
    status: {
      get() {
        return this.state || this.innerState;
      },
      set(e) {
        this.$emit("update:state", e), this.innerState = e;
      }
    }
  },
  watch: {
    hasError(e) {
      e && (this.status = this.states.error);
    }
  },
  methods: {
    selectFiles(e) {
      this.multiple && e.length > 1 ? (this.status = this.states.loading, this.$emit("select", e)) : this.skipTypeCheck ? (this.status = this.states.loading, this.$emit("select", e)) : this.validate(e[0]) && (this.status = this.states.loading, this.$emit("select", e));
    },
    dragOver() {
      this.noDragNDrop || this.state !== this.states.complete && (this.state === this.states.loading && !this.allowLoadingDrop || this.state === this.states.error && !this.allowErrorDrop || (this.allowDrop = !0, this.dragged = !0));
    },
    dragLeave(e) {
      e.currentTarget.contains(e.relatedTarget) || (this.dragged = !1, this.allowDrop = !1);
    },
    onFileDrop(e) {
      this.dragged = !1, this.allowDrop = !1, this.status = this.states.loading, this.selectFiles(e.dataTransfer.files);
    },
    checkFileSize({ size: e }) {
      return this.fileMaxSize && e / 1024 / 1024 >= this.fileMaxSize ? this.vuMediaUploadSizeExcess : !0;
    },
    /* 3 checks disablable with skipTypeCheck */
    checkImgType({ type: e }) {
      if (this.acceptImage) {
        const s = /image\/(jpg|jpeg|png|webp)$/i.test(e);
        if (s && (this.innerVideo = !1), !this.acceptVideo)
          return s || this.vuMediaUploadShouldBeImage;
      }
      return !0;
    },
    checkVideoType({ type: e }) {
      if (this.acceptVideo) {
        const s = /video\/(mp4|avi)$/i.test(e);
        if (this.innerVideo = s, !this.acceptImage)
          return s || this.vuMediaUploadShouldBeVideo;
      }
      return !0;
    },
    checkVideoAndImgType({ type: e }) {
      return this.acceptVideo && this.acceptImage ? /video\/(mp4|avi)$/i.test(e) && /image\/(jpg|jpeg|png|webp)$/i.test(e) || this.vuMediaUploadTypeUnexpected : !0;
    },
    onRetry() {
      this.errorBucket = [], this.status = this.states.empty, this.$emit("retry", this.$refs["upload-input"].value);
    }
  },
  components: { VuIcon: A, VuMediaUploadDroppable: ss, VuMediaUploadLoading: os, VuMediaUploadError: is, VuMediaUploadEmpty: ns, VuMediaUploadPreview: as }
}, Dr = {
  key: 0,
  class: "control-label"
}, zr = {
  key: 0,
  class: "label-field-required"
}, Nr = ["multiple"];
function Er(e, s, t, i, o, n) {
  const a = y("VuIcon"), d = y("VuMediaUploadDroppable"), u = y("VuMediaUploadEmpty"), m = y("VuMediaUploadLoading"), h = y("VuMediaUploadError"), p = y("vuMediaUploadPreview");
  return l(), r("div", {
    class: v(["vu-media-upload", [{ "has-error": o.error, "vu-media-upload--border": !n.hasLabel, "vu-media-upload--inner-flex": n.hasLabel }]]),
    style: P(n.hasLabel ? {} : n.wrapStyle)
  }, [
    n.hasLabel ? (l(), r("label", Dr, [
      t.icon ? (l(), _(a, {
        key: 0,
        icon: t.icon
      }, null, 8, ["icon"])) : f("", !0),
      w(e.$slots, "label", {}, () => [
        $(g(e.label), 1),
        e.required ? (l(), r("span", zr, " *")) : f("", !0)
      ], !0)
    ])) : f("", !0),
    c("input", {
      ref: "upload-input",
      type: "file",
      name: "upload",
      style: { display: "none" },
      onChange: s[0] || (s[0] = (b) => n.selectFiles(e.$refs["upload-input"].files)),
      multiple: t.multiple
    }, null, 40, Nr),
    c("div", {
      class: v(["vu-media-upload__inner", { "vu-media-upload--border": n.hasLabel, "full-height": !n.hasLabel }]),
      ref: "inner",
      style: P(n.hasLabel ? n.wrapStyle : ""),
      onDragover: s[4] || (s[4] = q((b) => n.dragOver(), ["prevent"])),
      onDragenter: s[5] || (s[5] = q((b) => n.dragOver(), ["prevent"])),
      onDragleave: s[6] || (s[6] = (...b) => n.dragLeave && n.dragLeave(...b)),
      onDragend: s[7] || (s[7] = (...b) => n.dragLeave && n.dragLeave(...b))
    }, [
      o.dragged ? (l(), _(d, {
        key: 0,
        "valid-drop": o.allowDrop,
        onDrop: n.onFileDrop
      }, {
        "drop-icon": S(() => [
          w(e.$slots, "drop-icon", {}, void 0, !0)
        ]),
        "drop-label": S(() => [
          w(e.$slots, "drop-label", {}, void 0, !0)
        ]),
        _: 3
      }, 8, ["valid-drop", "onDrop"])) : f("", !0),
      n.status === o.states.empty ? w(e.$slots, "empty", {
        key: 1,
        input: e.$refs["upload-input"]
      }, () => [
        C(u, {
          onBrowse: s[1] || (s[1] = (b) => {
            e.$refs["upload-input"].value = "", e.$refs["upload-input"].click();
          })
        })
      ], !0) : n.status === o.states.loading ? w(e.$slots, "loading", { key: 2 }, () => [
        C(m, {
          progress: t.uploadProgress,
          onUploadAbort: s[2] || (s[2] = (b) => e.$emit("upload-abort"))
        }, null, 8, ["progress"])
      ], !0) : n.status === o.states.error ? w(e.$slots, "error", { key: 3 }, () => [
        C(h, L({ onRetry: n.onRetry }, { errorBucket: e.errorBucket }), null, 16, ["onRetry"])
      ], !0) : n.status === o.states.complete ? w(e.$slots, "preview", { key: 4 }, () => [
        C(p, L(n.preview, {
          onDelete: s[3] || (s[3] = (b) => {
            e.$emit("delete"), n.status = o.states.empty;
          })
        }), null, 16)
      ], !0) : f("", !0)
    ], 38)
  ], 6);
}
const jr = /* @__PURE__ */ I(Fr, [["render", Er], ["__scopeId", "data-v-b2db812d"]]), Rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jr
}, Symbol.toStringTag, { value: "Module" })), Ur = {
  name: "vu-message",
  mixins: [ve, ge],
  props: {
    text: {
      type: String,
      default: () => ""
    },
    closable: {
      type: Boolean,
      default: () => !0
    },
    color: {
      type: String,
      default: () => "primary"
    },
    animate: {
      type: Boolean,
      default: () => !0
    },
    timeout: {
      type: Number,
      default: () => 0
    },
    animationDuration: {
      type: Number,
      default: 500
    },
    // eslint-disable-next-line vue/require-default-prop
    target: String
  },
  emits: ["update:show"],
  data: () => ({
    activeTimeout: 0,
    in: !0,
    _disposed: !1
  }),
  computed: {
    colored() {
      return !!this.color;
    },
    classes() {
      return [`alert-${this.color}`, {
        "alert-closable": this.closable
      }];
    }
  },
  watch: {
    show: {
      immediate: !0,
      handler() {
        this.setTimeout();
      }
    },
    _dispose(e) {
      e && this.dispose();
    }
  },
  methods: {
    dispose() {
      if (this._disposed = !0, !this.animate) {
        this.$emit("update:show", !1);
        return;
      }
      window.setTimeout(() => {
        this.$emit("update:show", !1);
      }, this.animationDuration);
    },
    setTimeout() {
      this.show && this.timeout && (window.clearTimeout(this.activeTimeout), this.activeTimeout = window.setTimeout(() => {
        this.dispose();
      }, this.timeout));
    }
  }
}, qr = {
  key: 0,
  class: "icon fonticon"
}, Hr = { class: "alert-message-wrap" }, Wr = ["innerHTML"];
function Kr(e, s, t, i, o, n) {
  return l(), _(fe, { name: "alert-fade" }, {
    default: S(() => [
      e.show && !e._disposed ? (l(), r("div", {
        key: 0,
        class: v(["vu-message alert-has-icon", n.classes])
      }, [
        n.colored ? (l(), r("span", qr)) : f("", !0),
        c("span", Hr, [
          w(e.$slots, "default", {}, () => [
            c("div", { innerHTML: t.text }, null, 8, Wr)
          ], !0)
        ]),
        t.closable ? (l(), r("span", {
          key: 1,
          class: "close fonticon fonticon-cancel",
          onClick: s[0] || (s[0] = (...a) => n.dispose && n.dispose(...a))
        })) : f("", !0)
      ], 2)) : f("", !0)
    ]),
    _: 3
  });
}
const rs = /* @__PURE__ */ I(Ur, [["render", Kr], ["__scopeId", "data-v-796a8f24"]]), Gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rs
}, Symbol.toStringTag, { value: "Module" }));
let Pe = {
  create: () => {
  },
  hide: () => {
  },
  _exists: () => !1,
  _register: () => {
  }
};
function Yr(e) {
  const s = ke([]), t = ke({});
  Pe = We({
    _messages: t,
    namespaces: s,
    create(o) {
      const { target: n = "main" } = o;
      if (!this._exists(n))
        throw new Error("Target namespace is unknown");
      const a = {
        id: ne(),
        bind: {
          target: n,
          _dispose: !1,
          show: !0,
          ...o
        },
        dispose() {
          this.bind._dispose = !0;
        }
      };
      return this._messages[n].push(ke(a)), a;
    },
    hide(o) {
      const { target: n = "main" } = o.bind;
      this._messages[n].splice(this._messages[n].indexOf(o), 1);
    },
    _exists(o) {
      return s.includes(o);
    },
    _register(o) {
      s.push(o), this._messages[o] = re([]);
    }
  }), e.provide("vuMessageAPI", Pe), e.config.globalProperties.$vuMessage = Pe;
}
const Xr = {
  name: "vu-message-container",
  props: {
    namespace: {
      type: String,
      default: "main"
    }
  },
  created() {
    this.api = Pe, this.api._exists(this.namespace) ? this.disabled = !0 : this.api._register(this.namespace);
  },
  data: () => ({
    api: {},
    disabled: !1
  }),
  components: { VuMessage: rs }
}, Jr = {
  key: 0,
  class: "alert alert-root",
  style: { visibility: "visible" }
};
function Zr(e, s, t, i, o, n) {
  const a = y("VuMessage");
  return e.disabled ? f("", !0) : (l(), r("div", Jr, [
    (l(!0), r(B, null, M(e.api._messages[t.namespace], (d) => (l(), _(a, L(d.bind, {
      key: `${d.id}`,
      "onUpdate:show": (u) => e.api.hide(d)
    }), null, 16, ["onUpdate:show"]))), 128))
  ]));
}
const Qr = /* @__PURE__ */ I(Xr, [["render", Zr], ["__scopeId", "data-v-b369376b"]]), eu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qr
}, Symbol.toStringTag, { value: "Module" })), tu = {
  name: "vu-mobile-dialog",
  emits: ["close", "confirm"],
  components: { VuScroller: Be, VuIconBtn: T },
  props: {
    title: {
      type: String,
      default: ""
    },
    backIcon: {
      type: String,
      default: "close"
    },
    backIconTooltip: {
      type: String,
      default: "Close"
    },
    nextIcon: {
      type: String,
      default: "check"
    },
    nextIconTooltip: {
      type: String,
      default: "OK"
    },
    scrollable: {
      type: Boolean,
      default: !0
    },
    customNextIcon: {
      type: Boolean
    },
    customBackIcon: {
      type: Boolean
    },
    nextIconDisabled: {
      type: Boolean
    }
  },
  computed: {
    _backIcon() {
      return this.customBackIcon ? this.backIcon : ["chevron-left", "close"].includes(this.backIcon) ? this.backIcon : "-";
    },
    _icon() {
      return this.customNextIcon ? this.nextIcon : ["chevron-right", "send", "check"].includes(this.nextIcon) ? this.nextIcon : "-";
    },
    backClasses() {
      return [this._backIcon === "chevron-left" ? "chevron" : ""];
    },
    nextClasses() {
      return [this._icon === "chevron-right" ? "chevron" : ""];
    }
  }
}, su = { class: "vu-mobile-dialog" }, nu = { class: "vu-mobile-dialog__header" }, iu = { class: "vu-mobile-dialog__header__default" }, lu = {
  class: "vu-label-wrap",
  style: { overflow: "hidden" }
};
function ou(e, s, t, i, o, n) {
  const a = y("VuIconBtn"), d = y("VuScroller"), u = F("tooltip");
  return l(), r("div", su, [
    c("div", nu, [
      w(e.$slots, "mobile-dialog-header", {}, () => [
        c("div", iu, [
          V(C(a, {
            icon: n._backIcon,
            class: v([n.backClasses, "vu-mobile-dialog__header_back topbar"]),
            onClick: s[0] || (s[0] = (m) => e.$emit("close"))
          }, null, 8, ["icon", "class"]), [
            [
              u,
              t.backIconTooltip,
              void 0,
              { bottom: !0 }
            ]
          ]),
          c("div", lu, [
            V((l(), r("label", null, [
              $(g(t.title), 1)
            ])), [
              [
                u,
                t.title,
                void 0,
                { bottom: !0 }
              ]
            ])
          ]),
          V(C(a, {
            icon: n._icon,
            class: v([n.nextClasses, "vu-mobile-dialog__header_next topbar"]),
            disabled: t.nextIconDisabled,
            onClick: s[1] || (s[1] = (m) => e.$emit("confirm"))
          }, null, 8, ["icon", "class", "disabled"]), [
            [
              u,
              t.nextIconTooltip,
              void 0,
              { bottom: !0 }
            ]
          ])
        ])
      ], !0)
    ]),
    c("div", {
      class: v(["vu-mobile-dialog__content", `vu-mobile-dialog__content--${t.scrollable ? "" : "non-"}scrollable`])
    }, [
      t.scrollable ? (l(), _(d, { key: 0 }, {
        default: S(() => [
          w(e.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      })) : w(e.$slots, "default", { key: 1 }, void 0, !0)
    ], 2)
  ]);
}
const us = /* @__PURE__ */ I(tu, [["render", ou], ["__scopeId", "data-v-37f003ee"]]), au = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: us
}, Symbol.toStringTag, { value: "Module" })), ru = {
  name: "vu-modal",
  data: () => ({
    model: "",
    mobileWidth: !1,
    resizeObs: {},
    pick: Ut,
    pickNRename: gi
  }),
  emits: ["close", "cancel", "confirm"],
  mixins: [ve],
  props: {
    show: {
      type: Boolean,
      required: !1,
      default: () => !1
    },
    keepRendered: {
      type: Boolean,
      default: () => !1
    },
    title: {
      type: String,
      default: () => ""
    },
    message: {
      type: String,
      default: () => ""
    },
    rawContent: {
      type: String,
      default: ""
    },
    keyboard: {
      type: Boolean,
      default: () => !0
    },
    showCancelIcon: {
      type: Boolean,
      default: () => !0
    },
    showCancelButton: {
      type: Boolean,
      default: () => !1
    },
    showFooter: {
      type: Boolean,
      default: () => !0
    },
    showInput: {
      type: Boolean,
      default: () => !1
    },
    /* input props */
    label: {
      type: String,
      default: () => ""
    },
    helper: {
      type: String,
      default: () => ""
    },
    placeholder: {
      type: String,
      default: () => ""
    },
    rules: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean,
      default: () => !0
    },
    success: {
      type: Boolean,
      default: () => !1
    },
    /* input props */
    cancelLabel: {
      type: String,
      default: () => "Cancel"
    },
    okLabel: {
      type: String,
      default: () => "OK"
    },
    /* mobile specific props */
    noMobile: {
      type: Boolean
    },
    /* eslint-disable vue/require-default-prop */
    mobileNextIcon: {
      type: String
    },
    mobileNextIconTooltip: {
      type: String
    },
    mobileCustomNextIcon: {
      type: Boolean
    },
    mobileNextIconDisabled: {
      type: Boolean
    },
    mobileBackIcon: {
      type: String
    },
    mobileBackIconTooltip: {
      type: String
    },
    mobileCustomBackIcon: {
      type: Boolean
    },
    mobileScrollable: {
      type: Boolean
    },
    /* cancel */
    // eslint-disable-next-line vue/prop-name-casing
    _cancel: Boolean
  },
  inject: {
    vuMobileBreakpoint: {
      default: () => "640"
    }
  },
  watch: {
    _cancel(e) {
      e && this.cancel();
    }
  },
  beforeMount() {
    this.noMobile || (this.checkWidth(), window.addEventListener("resize", this.checkWidth));
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkWidth);
  },
  methods: {
    cancel(e = !1) {
      this.innerShow = !1, this.$emit(e ? "close" : "cancel"), this.showInput && this.clear();
    },
    confirm() {
      this.showInput ? this.$refs.form.validate() && (this.$emit("confirm", this.model), this.innerShow = !1, this.clear()) : (this.$emit("confirm", !0), this.innerShow = !1);
    },
    validate(e) {
      this.$refs.form.validate(e);
    },
    clear() {
      this.model = "";
    },
    checkWidth() {
      window.document.documentElement.clientWidth < this.vuMobileBreakpoint ? this.mobileWidth = !0 : this.mobileWidth = !1;
    }
  },
  components: { VuMobileDialog: us, VuInput: Zt, VuForm: Gt, VuBtn: ie }
}, uu = { key: 0 }, du = ["innerHTML"], cu = { key: 1 }, hu = {
  class: "vu-modal modal modal-root",
  style: { display: "block" }
}, fu = { class: "modal-wrap" }, mu = { class: "modal-header" }, pu = { class: "modal-body" }, gu = ["innerHTML"], vu = { key: 1 }, yu = {
  key: 0,
  class: "modal-footer"
}, bu = /* @__PURE__ */ c("div", { class: "modal-overlay in" }, null, -1);
function _u(e, s, t, i, o, n) {
  const a = y("VuInput"), d = y("VuForm"), u = y("VuMobileDialog"), m = y("VuBtn");
  return t.keepRendered || e.innerShow ? V((l(), r("div", uu, [
    !t.noMobile && e.mobileWidth ? (l(), _(u, L({ key: 0 }, {
      ...e.pick(e.$props, "title"),
      ...e.pickNRename(
        e.$props,
        { key: "mobileBackIcon", newName: "backIcon" },
        { key: "mobileBackIconTooltip", newName: "backIconTooltip" },
        { key: "mobileCustomBackIcon", newName: "customBackIcon" },
        { key: "mobileNextIcon", newName: "nextIcon" },
        { key: "mobileNextIconTooltip", newName: "nextIconTooltip" },
        { key: "mobileNextIconDisabled", newName: "nextIconDisabled" },
        { key: "mobileCustomNextIcon", newName: "customNextIcon" },
        { key: "mobileScrollable", newName: "scrollable" }
      ),
      disabled: e.valid
    }, {
      onClose: s[1] || (s[1] = (h) => n.cancel()),
      onConfirm: s[2] || (s[2] = (h) => n.confirm())
    }), {
      "mobile-dialog-header": S(() => [
        w(e.$slots, "mobile-header")
      ]),
      default: S(() => [
        w(e.$slots, "modal-body", {}, () => [
          t.rawContent ? (l(), r("div", {
            key: 0,
            innerHTML: t.rawContent
          }, null, 8, du)) : t.message ? (l(), r("p", cu, g(t.message), 1)) : f("", !0),
          t.showInput ? (l(), _(d, {
            key: 2,
            ref: "form"
          }, {
            default: S(() => [
              C(a, {
                label: t.label,
                required: t.required,
                helper: t.helper,
                success: t.success,
                placeholder: t.placeholder,
                rules: t.rules,
                modelValue: e.model,
                "onUpdate:modelValue": s[0] || (s[0] = (h) => e.model = h)
              }, null, 8, ["label", "required", "helper", "success", "placeholder", "rules", "modelValue"])
            ]),
            _: 1
          }, 512)) : f("", !0)
        ])
      ]),
      _: 3
    }, 16)) : (l(), r(B, { key: 1 }, [
      c("div", hu, [
        c("div", fu, [
          c("div", {
            class: "modal-content",
            onKeyup: [
              s[6] || (s[6] = me(() => {
                t.keyboard && (!t.showInput || e.$refs.form.validate()) && n.confirm();
              }, ["enter"])),
              s[7] || (s[7] = me(() => {
                t.keyboard && (t.showCancelButton ? n.cancel() : e.close());
              }, ["escape"]))
            ]
          }, [
            c("div", mu, [
              w(e.$slots, "modal-header", {}, () => [
                t.showCancelIcon ? (l(), r("span", {
                  key: 0,
                  onClick: s[3] || (s[3] = (h) => n.cancel(!0)),
                  class: "close fonticon fonticon-cancel",
                  title: ""
                })) : f("", !0),
                c("h4", null, g(t.title), 1)
              ])
            ]),
            c("div", pu, [
              w(e.$slots, "modal-body", {}, () => [
                t.rawContent ? (l(), r("div", {
                  key: 0,
                  innerHTML: t.rawContent
                }, null, 8, gu)) : t.message ? (l(), r("p", vu, g(t.message), 1)) : f("", !0),
                t.showInput ? (l(), _(d, {
                  key: 2,
                  ref: "form"
                }, {
                  default: S(() => [
                    C(a, {
                      label: t.label,
                      required: t.required,
                      helper: t.helper,
                      success: t.success,
                      placeholder: t.placeholder,
                      rules: t.rules,
                      modelValue: e.model,
                      "onUpdate:modelValue": s[4] || (s[4] = (h) => e.model = h)
                    }, null, 8, ["label", "required", "helper", "success", "placeholder", "rules", "modelValue"])
                  ]),
                  _: 1
                }, 512)) : f("", !0)
              ])
            ]),
            t.showFooter ? (l(), r("div", yu, [
              w(e.$slots, "modal-footer", {}, () => [
                C(m, {
                  color: "primary",
                  onClick: n.confirm
                }, {
                  default: S(() => [
                    $(g(t.okLabel), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                t.showCancelButton ? (l(), _(m, {
                  key: 0,
                  color: "default",
                  onClick: s[5] || (s[5] = (h) => n.cancel())
                }, {
                  default: S(() => [
                    $(g(t.cancelLabel), 1)
                  ]),
                  _: 1
                })) : f("", !0)
              ])
            ])) : f("", !0)
          ], 32)
        ])
      ]),
      bu
    ], 64))
  ], 512)), [
    [ee, e.innerShow]
  ]) : f("", !0);
}
const rt = /* @__PURE__ */ I(ru, [["render", _u]]), wu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rt
}, Symbol.toStringTag, { value: "Module" }));
let we = {
  show: () => {
  },
  hide: () => {
  },
  alert: () => {
  },
  confirm: () => {
  },
  prompt: () => {
  },
  _modals: re([])
};
function ku(e) {
  const s = re([]);
  return we = We({
    _modals: s,
    show(i) {
      return this.hide(), new Promise((o, n) => {
        const a = {
          id: ne(),
          component: rt,
          bind: ke({ ...i, show: !0 }),
          on: {
            close: () => {
              this.hide(a), n();
            },
            confirm: (d) => {
              this.hide(a), o(d);
            },
            cancel: () => {
              this.hide(a), n();
            }
          }
        };
        this._modals.push(re(a));
      });
    },
    hide(i) {
      if (i) {
        const o = this._modals.find((n) => n.id === i.id);
        if (!o)
          return;
        o.bind.show = !1, setTimeout(() => {
          const n = this._modals.findIndex((a) => a.id === i.id);
          n > -1 && this._modals.splice(n, 1);
        }, 1e3);
      } else
        this._modals.forEach((o) => {
          o._cancel = !0;
        }), this._modals.splice(0, this._modals.length);
    },
    alert(i) {
      return this.show(i);
    },
    confirm(i) {
      return this.show({
        showCancelIcon: !0,
        showCancelButton: !0,
        ...i
      });
    },
    prompt(i) {
      return this.show({
        showCancelIcon: !0,
        showCancelButton: !0,
        showInput: !0,
        ...i
      });
    }
  }), e.provide("vuModalAPI", we), e.config.globalProperties.$vuModal = we, we;
}
const Su = {
  name: "vu-modal-container",
  components: {
    VuModal: rt
  },
  data: () => ({
    // eslint-disable-next-line vue/no-reserved-keys
    _modals: {
      type: Object
    }
  }),
  created() {
    this._modals = we._modals;
  }
};
function Cu(e, s, t, i, o, n) {
  return l(!0), r(B, null, M(e._modals, (a) => (l(), _(He(a.component), L({
    key: a.id
  }, a.bind, {
    modelValue: a.value,
    "onUpdate:modelValue": (d) => a.value = d
  }, Q(a.on)), null, 16, ["modelValue", "onUpdate:modelValue"]))), 128);
}
const Iu = /* @__PURE__ */ I(Su, [["render", Cu]]), Bu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Iu
}, Symbol.toStringTag, { value: "Module" }));
function kt(e, s) {
  var t;
  e.value > -1 ? e.value -= 1 : e.value = (((t = s.value) == null ? void 0 : t.length) || 0) - 1;
}
function St(e, s) {
  var t;
  e.value > (((t = s.value) == null ? void 0 : t.length) || 0) - 2 ? e.value = -1 : e.value += 1;
}
function Ve(e, s) {
  const { target: t = !1 } = s;
  return t instanceof HTMLInputElement ? e && t.value : !1;
}
function Ct(e, s) {
  const {
    target: t,
    items: i,
    debug: o = !1,
    disabled: n = !1
  } = e || {}, {
    direction: a = "vertical",
    discardWhenValue: d = !1,
    preserveIndexOnRemoval: u = !1
  } = s || {};
  if (!t) {
    o && console.warn("VUEKIT - Warning Keyboard Navigation cannot be applied. Please use onMount hook and check target element is mounted.");
    return;
  }
  const m = a === "vertical", h = N(-1);
  Le(i, (b, k) => {
    u && b.length < k.length ? h.value === k.length - 1 && (h.value = b.length - 1) : h.value = -1;
  });
  const p = Hs(h, { initialValue: -1 });
  return !m && Oe("ArrowLeft", (b) => {
    n || Ve(d, b) || kt(h, i);
  }, { target: t }), !m && Oe("ArrowRight", (b) => {
    n || Ve(d, b) || St(h, i);
  }, { target: t }), m && Oe("ArrowUp", (b) => {
    n || Ve(d, b) || kt(h, i);
  }, { target: t }), m && Oe("ArrowDown", (b) => {
    n || Ve(d, b) || St(h, i);
  }, { target: t }), { currentIndex: h, last: p };
}
const Ou = {
  name: "vu-multiple-select",
  inject: {
    vuMultipleSelectLabels: {
      default: () => ({
        noResults: "No results."
      })
    },
    vuDebug: {
      default: !1
    },
    vuInputComposition: {
      default: !1
    }
  },
  mixins: [j, D, ue, R, Je, U],
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    itemHeight: {
      type: Number,
      default: () => 38
    },
    minSearchLength: {
      type: Number,
      default: () => 0
    },
    shortPlaceholder: {
      type: String,
      required: !1,
      default: () => ""
    },
    user: {
      type: Boolean,
      required: !1
    },
    userBigBadges: {
      type: Boolean,
      required: !1
    },
    maxVisible: {
      type: Number,
      default: () => 5
    },
    maxSelectable: {
      type: Number,
      default: () => 1 / 0
    },
    caseSensitive: {
      type: Boolean,
      default: !1
    },
    preserveSearchOnBlur: {
      type: Boolean,
      default: !1
    },
    preserveSearchOnItemClick: {
      type: Boolean,
      default: !1
    },
    preserveSearchOnItemKeyboard: {
      type: [Boolean, void 0],
      default: void 0
    },
    noLocalFiltering: {
      type: Boolean,
      default: !1
    },
    disableUnselectionWithinOptions: {
      type: Boolean,
      default: !1
    },
    keepFocusOnInputOnItemClick: {
      type: Boolean,
      default: !1
    },
    keepFocusOnInputOnItemKeyboard: {
      type: [Boolean, void 0],
      default: void 0
    }
  },
  expose: ["toggle"],
  emits: ["search", "update:modelValue", "notify:already-selected"],
  data: () => ({
    open: !1,
    inputInFocus: !1,
    positioned: !0,
    intxObs: null,
    search: "",
    keyIndexItems: -1,
    lastItemChange: -1,
    keyIndexBadges: -1,
    lastBadgeChange: -1,
    bottom: 40,
    top: !1,
    resizeObs: null,
    uid: le()
  }),
  created() {
    this.resizeObs = new ResizeObserver((e) => {
      this.bottom = e[0].contentRect.height + 4;
    });
  },
  mounted() {
    this.$refs.searchfield && this.resizeObs.observe(this.$refs.searchfield), this.target && (this.intxObs = new IntersectionObserver((t) => {
      this.intxObs.unobserve(this.$refs.dropdown);
      const i = this.target.getBoundingClientRect(), o = this.$refs.dropdown.getBoundingClientRect();
      i.bottom < o.bottom && (this.top = !0), this.positioned = !0;
    }, {
      root: this.target,
      threshold: 1
    }));
    const e = Ct({
      disabled: this.disabled,
      items: Ce(() => this.innerOptions),
      target: this.$refs.input,
      debug: this.vuDebug
    });
    this.lastItemChange = e == null ? void 0 : e.last, this.keyIndexItems = e == null ? void 0 : e.currentIndex;
    const s = Ct({
      disabled: this.disabled,
      items: Ce(() => this.modelValue),
      target: this.$refs.input,
      debug: this.vuDebug
    }, {
      direction: "horizontal",
      discardWhenValue: !0,
      preserveIndexOnRemoval: !0
    });
    this.keyIndexBadges = s == null ? void 0 : s.currentIndex, this.lastBadgeChange = s == null ? void 0 : s.last;
  },
  watch: {
    search(e) {
      this.executeSearch(e);
    }
  },
  computed: {
    searchLengthMet() {
      return this.search.length >= this.minSearchLength;
    },
    innerOptions() {
      return this.searchLengthMet ? this.noLocalFiltering ? this.options : this.caseSensitive ? this.options.filter((e) => e.label.includes(this.search) || e.value.includes(this.search)) : this.options.filter((e) => e.label.toLowerCase().includes(this.search.toLowerCase()) || e.value.toLowerCase().includes(this.search.toLowerCase())) : [];
    },
    innerOptionsLength() {
      return this.innerOptions.length;
    },
    noResults() {
      return this.options && this.innerOptions.length === 0 && this.searchLengthMet;
    },
    values() {
      return (this.value || []).map((e) => e.value);
    },
    dropdownHeight() {
      return this.noResults ? this.$slots.noResults ? "auto" : this.itemHeight : this.innerOptionsLength > this.maxVisible ? this.itemHeight * ((this.innerOptionsLength === this.maxVisible ? 0 : 0.5) + this.maxVisible) : this.itemHeight * this.innerOptionsLength + 1;
    },
    keepFocusKeyboard() {
      return this.keepFocusOnInputOnItemKeyboard !== void 0 ? this.keepFocusOnInputOnItemKeyboard : this.keepFocusOnInputOnItemClick;
    },
    preserveSearchKeyboard() {
      return this.preserveSearchOnItemKeyboard !== void 0 ? this.preserveSearchOnItemKeyboard : this.preserveSearchOnItemClick;
    }
  },
  methods: {
    executeSearch(e) {
      this.$emit("search", e), e && !this.open && this.openAndIntersect();
    },
    toggle(e, { fromOptionsClick: s = !1, fromOptionsKeyboard: t = !1 } = { fromOptionsClick: !1, fromOptionsKeyboard: !1 }) {
      if (e.disabled)
        return;
      const i = this.value || [], o = i.findIndex((n) => n.value === e.value);
      if (this.values.includes(e.value))
        if (this.maxSelectable === 1)
          this.$emit("update:modelValue", []);
        else if ((s || t) && this.disableUnselectionWithinOptions)
          this.$emit("notify:already-selected", e);
        else {
          const n = i.slice();
          n.splice(o, 1), this.$emit("update:modelValue", n);
        }
      else
        this.maxSelectable === 1 ? (this.$emit("update:modelValue", [e]), this.search = "", this.close()) : this.$emit("update:modelValue", i.concat([e]));
      (s || t) && ((s && this.keepFocusOnInputOnItemClick || t && this.keepFocusKeyboard) && this.$refs.input.focus(), (s && !this.preserveSearchOnItemClick || t && !this.preserveSearchKeyboard) && (this.search = ""));
    },
    getOption(e) {
      return this.options.find((s) => s.value === e) || {};
    },
    close() {
      this.open = !1, this.top = !1, this.preserveSearchOnBlur || (this.search = "");
    },
    async openAndIntersect() {
      if (this.searchLengthMet && !this.open)
        if (this.target && ["scroll", "auto", "visible"].includes(window.getComputedStyle(this.target).overflowY)) {
          const e = this.target.getBoundingClientRect(), s = this.$refs.searchfield.getBoundingClientRect();
          !this.top && (this.maxVisible + 0.5) * this.itemHeight > e.bottom - s.bottom && (this.top = !0), this.open = !0;
        } else
          this.open = !0, this.positioned = !1, await new Promise((e) => setTimeout(e, 10)), await this.$nextTick(), this.intxObs.observe(this.$refs.dropdown);
    },
    beforeUnmount() {
      this.intxObs.disconnect(), delete this.intxObs;
    },
    onDelete(e) {
      var s;
      if (this.open && this.lastItemChange > this.lastBadgeChange) {
        if (this.keyIndexItems > -1) {
          const t = this.innerOptions[this.keyIndexItems];
          !(t != null && t.disabled) && this.values.includes(t.value) && (this.toggle(t, { fromOptionsKeyboard: !0 }), e.preventDefault());
        }
      } else
        this.keyIndexBadges > -1 && !((s = this.value[this.keyIndexBadges]) != null && s.disabled) && this.toggle(this.value[this.keyIndexBadges]);
    },
    onEnter() {
      var e;
      this.open && this.lastItemChange > this.lastBadgeChange && this.keyIndexItems > -1 && !((e = this.value[this.keyIndexBadges]) != null && e.disabled) && this.toggle(this.innerOptions[this.keyIndexItems], { fromOptionsKeyboard: !0 });
    },
    onInput({ target: e }) {
      this.keyIndexBadges > -1 && (this.keyIndexBadges = -1), this.vuInputComposition || (e.composing = !1);
    }
  },
  components: { VuUserPicture: pe, VuBadge: Ge, VuIconBtn: T, VuScroller: Be, VuSelectOptions: ot }
}, Vu = {
  key: 0,
  class: "control-label"
}, $u = {
  key: 0,
  class: "label-field-required"
}, Mu = {
  key: 1,
  style: { "line-height": "30px" }
}, Pu = ["placeholder"], xu = { style: { "padding-top": "15px" } }, Lu = { class: "message" }, Tu = { class: "multiple-select__no-results" }, Au = {
  key: 1,
  class: "form-control-helper-text"
};
function Fu(e, s, t, i, o, n) {
  const a = y("VuUserPicture"), d = y("vu-icon-btn"), u = y("VuBadge"), m = y("VuIconBtn"), h = y("VuSelectOptions"), p = y("vu-spinner"), b = y("VuScroller"), k = F("click-outside");
  return l(), r("div", {
    class: v(["vu-multiple-select form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", Vu, [
      $(g(e.label), 1),
      e.required ? (l(), r("span", $u, " *")) : f("", !0)
    ])) : f("", !0),
    V((l(), r("div", {
      ref: "searchfield",
      class: v([
        "select",
        "select-autocomplete",
        {
          "dropdown-visible": e.open,
          "select-disabled": e.disabled,
          "single-select": t.maxSelectable === 1
        }
      ])
    }, [
      c("div", {
        class: v(["autocomplete-searchbox", {
          "autocomplete-searchbox-active": e.inputInFocus || e.open,
          disabled: e.disabled,
          "autocomplete-searchbox--user": t.user,
          "autocomplete-searchbox--user-big-badges": t.user && t.userBigBadges
        }]),
        onClick: s[9] || (s[9] = (O) => {
          t.maxSelectable === 1 && n.values.length || (e.$refs.input.focus(), n.openAndIntersect());
        })
      }, [
        t.user ? (l(!0), r(B, { key: 0 }, M(e.value, (O, z) => (l(), r("div", {
          key: `${e.uid}-tag-${O}`,
          class: v(["vu-user-badge", {
            "vu-user-badge--hovered": z === e.keyIndexBadges
          }])
        }, [
          C(a, {
            id: O.value,
            src: O.src,
            size: "tiny"
          }, null, 8, ["id", "src"]),
          c("span", null, g(O.label), 1),
          C(d, {
            class: "vu-user-badge__close",
            icon: "close",
            size: "icon-smaller",
            onClick: (de) => n.toggle(O)
          }, null, 8, ["onClick"])
        ], 2))), 128)) : (l(!0), r(B, { key: 1 }, M(e.value, (O, z) => (l(), r("span", {
          key: `${e.uid}-tag-${O}`,
          onClick: s[1] || (s[1] = (...de) => n.toggle && n.toggle(...de))
        }, [
          w(e.$slots, "badge", { value: O }, () => [
            t.maxSelectable !== 1 ? (l(), _(u, {
              key: 0,
              value: z === e.keyIndexBadges,
              closable: "",
              onClick: s[0] || (s[0] = q(() => {
              }, ["stop"])),
              onClose: (de) => n.toggle(O)
            }, {
              default: S(() => [
                $(g(O.label), 1)
              ]),
              _: 2
            }, 1032, ["value", "onClose"])) : (l(), r("span", Mu, g(O.label), 1))
          ], !0)
        ]))), 128)),
        n.values.length < t.maxSelectable ? V((l(), r("input", {
          key: 2,
          "onUpdate:modelValue": s[2] || (s[2] = (O) => e.search = O),
          ref: "input",
          type: "text",
          class: "autocomplete-input",
          placeholder: n.values.length && t.shortPlaceholder ? t.shortPlaceholder : e.placeholder,
          onInput: s[3] || (s[3] = (...O) => n.onInput && n.onInput(...O)),
          onBlur: s[4] || (s[4] = (O) => e.inputInFocus = !1),
          onFocus: s[5] || (s[5] = (O) => e.inputInFocus = !0),
          onKeydown: s[6] || (s[6] = me((...O) => n.onDelete && n.onDelete(...O), ["delete", "backspace"])),
          onKeyup: s[7] || (s[7] = me((...O) => n.onEnter && n.onEnter(...O), ["enter"])),
          onClick: s[8] || (s[8] = (O) => {
            n.openAndIntersect();
          })
        }, null, 40, Pu)), [
          [Pt, e.search]
        ]) : f("", !0)
      ], 2),
      t.maxSelectable === 1 && !t.user && e.value && e.value.length ? (l(), _(m, {
        key: 0,
        icon: "clear",
        class: "select__clear-icon",
        onClick: s[10] || (s[10] = q((O) => {
          n.toggle(e.value[0]), this.search = "";
        }, ["stop"]))
      })) : f("", !0),
      e.open && n.searchLengthMet ? (l(), r("div", {
        key: 1,
        ref: "dropdown",
        class: v(["select-dropdown", [{ "select-dropdown--no-results": n.noResults, "select-dropdown--dropup": e.top }, e.contentClass]]),
        style: P([
          `height: ${n.dropdownHeight}${n.dropdownHeight !== "auto" ? "px" : ""}`,
          e.top ? `bottom: ${e.bottom}px` : "",
          e.positioned ? "" : "opacity: 0",
          e.contentStyle
        ])
      }, [
        C(b, { "always-show": "" }, {
          default: S(() => [
            V(C(h, {
              multiple: "",
              user: t.user,
              selected: e.value,
              options: n.innerOptions,
              "key-index": e.keyIndexItems,
              onClickItem: s[11] || (s[11] = (O) => n.toggle(O, { fromOptionsClick: !0 }))
            }, {
              default: S(({ item: O }) => [
                w(e.$slots, "default", { item: O }, void 0, !0)
              ]),
              _: 3
            }, 8, ["user", "selected", "options", "key-index"]), [
              [ee, n.searchLengthMet && !e.loading]
            ]),
            e.loading ? w(e.$slots, "loading", { key: 0 }, () => [
              c("ul", xu, [
                c("li", Lu, [
                  C(p, { show: "" })
                ])
              ])
            ], !0) : f("", !0),
            !e.loading && n.noResults ? w(e.$slots, "noResults", { key: 1 }, () => [
              c("ul", Tu, [
                c("li", null, g(n.vuMultipleSelectLabels.noResults), 1)
              ])
            ], !0) : f("", !0)
          ]),
          _: 3
        })
      ], 6)) : f("", !0)
    ], 2)), [
      [k, function() {
        n.close();
      }]
    ]),
    (l(!0), r(B, null, M(e.errorBucket, (O, z) => (l(), r("span", {
      key: `${z}-error-${O}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, g(O), 1))), 128)),
    e.helper.length ? (l(), r("span", Au, g(e.helper), 1)) : f("", !0)
  ], 2);
}
const Du = /* @__PURE__ */ I(Ou, [["render", Fu], ["__scopeId", "data-v-8f42d3ae"]]), zu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Du
}, Symbol.toStringTag, { value: "Module" })), Nu = {
  name: "vu-range",
  mixins: [j, Te, D, R, U],
  props: {
    step: {
      type: Number,
      default: 1
    },
    showLabels: {
      type: Boolean,
      default: !0
    },
    customLabels: {
      type: Array,
      required: !1,
      default: void 0
    }
  },
  emits: ["update:modelValue", "mouseup"],
  data() {
    return {
      lowervalue: 0,
      uppervalue: 1
    };
  },
  watch: {
    value: {
      immediate: !0,
      handler() {
        this.lowervalue = Math.min(...this.value), this.uppervalue = Math.max(...this.value);
      }
    }
  },
  computed: {
    value() {
      return this.modelValue || [];
    },
    minLabel() {
      return this.customLabels && this.customLabels.length ? this.customLabels[0] : this.min;
    },
    maxLabel() {
      return this.customLabels && this.customLabels.length ? this.customLabels[(this.max + this.max % this.step) / this.step - this.min] : this.max;
    },
    lowerLabel() {
      return this.customLabels && this.customLabels.length ? this.customLabels[(this.lowervalue - this.min) / this.step] : this.lowervalue;
    },
    upperLabel() {
      return this.customLabels && this.customLabels.length ? this.customLabels[(this.uppervalue - this.min) / this.step] : this.uppervalue;
    },
    computedStyles() {
      const e = (this.lowervalue - this.min) / (this.max - this.min) * 100;
      return {
        width: `${(this.uppervalue - this.min - (this.lowervalue - this.min)) / (this.max - this.min) * 100}%`,
        left: `${e}%`
      };
    }
  },
  methods: {
    commit() {
      this.disabled || this.$emit("mouseup", [this.lowervalue, this.uppervalue]);
    },
    update(e, s) {
      if (this.disabled)
        return;
      let t, i;
      e === "lower" ? (i = Math.min(s, this.uppervalue), t = Math.max(s, this.uppervalue), i > t && (t = Math.min(t + this.step, this.max))) : (i = Math.min(s, this.lowervalue), t = Math.max(s, this.lowervalue), i > t && (i = Math.max(i - this.step, this.min))), this.lowervalue = i, this.uppervalue = t, this.$emit("update:modelValue", [this.lowervalue, this.uppervalue]);
    }
  }
}, Eu = {
  key: 0,
  class: "control-label"
}, ju = {
  key: 0,
  class: "label-field-required"
}, Ru = ["disabled", "value", "min", "max", "step"], Uu = ["disabled", "value", "min", "max", "step"], qu = { class: "vu-range__grey-bar" }, Hu = {
  key: 0,
  class: "vu-range__labels-container"
}, Wu = { class: "vu-range__left vu-range__left-label" }, Ku = { class: "vu-range__right vu-range__right-label" }, Gu = {
  key: 1,
  class: "form-control-helper-text"
};
function Yu(e, s, t, i, o, n) {
  return l(), r("div", {
    class: v(["form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", Eu, [
      $(g(e.label), 1),
      e.required ? (l(), r("span", ju, " *")) : f("", !0)
    ])) : f("", !0),
    c("div", {
      class: v(["vu-range", { disabled: e.disabled }])
    }, [
      c("div", {
        onMouseup: s[2] || (s[2] = (...a) => n.commit && n.commit(...a)),
        class: "vu-range__inputs-container"
      }, [
        c("input", {
          disabled: e.disabled,
          onInput: s[0] || (s[0] = (a) => n.update("lower", parseFloat(a.target.value))),
          value: o.lowervalue,
          min: e.min,
          max: e.max,
          step: t.step,
          class: "slider vu-range__left",
          type: "range"
        }, null, 40, Ru),
        c("input", {
          disabled: e.disabled,
          onInput: s[1] || (s[1] = (a) => n.update("upper", parseFloat(a.target.value))),
          value: o.uppervalue,
          min: e.min,
          max: e.max,
          step: t.step,
          class: "slider vu-range__right",
          type: "range"
        }, null, 40, Uu),
        c("div", qu, [
          c("div", {
            class: "vu-range__blue-bar",
            style: P(n.computedStyles)
          }, null, 4)
        ])
      ], 32),
      t.showLabels ? (l(), r("div", Hu, [
        c("div", Wu, g(n.minLabel), 1),
        c("div", Ku, g(n.maxLabel), 1),
        o.lowervalue !== e.min && o.uppervalue !== o.lowervalue ? (l(), r("div", {
          key: 0,
          class: "vu-range__lower-label",
          style: P("left: " + (o.lowervalue - e.min) / (e.max - e.min) * 100 + "%")
        }, g(n.lowerLabel), 5)) : f("", !0),
        o.uppervalue !== e.max ? (l(), r("div", {
          key: 1,
          class: "vu-range__upper-label",
          style: P("left: " + (o.uppervalue - e.min) / (e.max - e.min) * 100 + "%")
        }, g(n.upperLabel), 5)) : f("", !0)
      ])) : f("", !0)
    ], 2),
    (l(!0), r(B, null, M(e.errorBucket, (a, d) => (l(), r("span", {
      key: `${d}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, g(a), 1))), 128)),
    e.helper.length ? (l(), r("span", Gu, g(e.helper), 1)) : f("", !0)
  ], 2);
}
const Xu = /* @__PURE__ */ I(Nu, [["render", Yu], ["__scopeId", "data-v-0d8b5e40"]]), Ju = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xu
}, Symbol.toStringTag, { value: "Module" })), Zu = {
  name: "vu-single-checkbox",
  mixins: [R, U, D],
  inheritAttrs: !1,
  props: {
    // String for Radio, Boolean for Switch/Default
    modelValue: {
      type: [String, Boolean],
      default: () => ""
    },
    label: {
      type: String,
      default: ""
    },
    // Removes slot and label
    standalone: {
      type: Boolean,
      default: !1
    },
    // Optional
    // eslint-disable-next-line vue/require-default-prop
    icon: {
      type: String,
      required: !1
    },
    // Exclusive with Switch
    radio: {
      type: Boolean,
      required: !1
    },
    // Required by radio.
    // eslint-disable-next-line vue/require-default-prop
    group: {
      type: String,
      required: !1
    },
    // Required by radio
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: String,
      required: !1
    },
    // Excludes radio
    switch: {
      type: Boolean,
      required: !1
    },
    // eslint-disable-next-line vue/require-default-prop
    id: {
      type: [String, Number],
      required: !1
    }
  },
  emits: ["update:modelValue"],
  data: () => ({ uid: le() }),
  computed: {
    topClasses() {
      return {
        "vu-single-checkbox--switch": this.switch,
        "vu-single-checkbox--standalone": this.standalone,
        "vu-single-checkbox--checkbox": !this.switch && !this.radio,
        "vu-single-checkbox--radio": this.radio,
        "vu-single-checkbox--extra-content": this.hasExtraContent
      };
    },
    internalClasses() {
      return {
        "toggle-icon": this.icon,
        "toggle-switch": this.switch,
        "toggle-primary": !this.switch
      };
    },
    hasExtraContent() {
      return this.$slots.default && !this.standalone;
    }
  },
  methods: {
    input(e) {
      return this.radio ? this.$emit("update:modelValue", e.target.value) : this.$emit("update:modelValue", e.target.checked);
    }
  },
  components: { VuIcon: A }
}, Qu = ["type", "checked", "name", "value", "id", "disabled"], ed = ["for"], td = { class: "vu-single-checkbox__inner-span" }, sd = {
  key: 0,
  class: "vu-single-checkbox__extra-content"
};
function nd(e, s, t, i, o, n) {
  const a = y("VuIcon");
  return l(), r("div", {
    class: v(["vu-single-checkbox", n.topClasses])
  }, [
    c("div", {
      class: v(["toggle", n.internalClasses])
    }, [
      c("input", L({
        class: "vu-single-checkbox__input",
        type: t.radio ? "radio" : "checkbox",
        checked: t.radio ? t.group === t.modelValue : t.modelValue
      }, e.$attrs, {
        name: t.radio ? t.group : void 0,
        value: t.radio ? t.value : void 0,
        id: e.$attrs[t.id] || `${e.uid}`,
        disabled: e.disabled,
        onClick: s[0] || (s[0] = (...d) => n.input && n.input(...d))
      }), null, 16, Qu),
      t.standalone ? f("", !0) : (l(), r(B, { key: 0 }, [
        c("label", {
          class: "control-label vu-single-checkbox__label",
          for: e.$attrs[t.id] || `${e.uid}`
        }, [
          t.icon ? (l(), _(a, {
            key: 0,
            icon: t.icon
          }, null, 8, ["icon"])) : f("", !0),
          c("span", td, g(t.label), 1)
        ], 8, ed),
        w(e.$slots, "label-prepend", {}, void 0, !0)
      ], 64))
    ], 2),
    n.hasExtraContent ? (l(), r("div", sd, [
      w(e.$slots, "default", {}, void 0, !0)
    ])) : f("", !0)
  ], 2);
}
const id = /* @__PURE__ */ I(Zu, [["render", nd], ["__scopeId", "data-v-b4e9d368"]]), ld = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: id
}, Symbol.toStringTag, { value: "Module" })), od = {
  name: "vu-slider",
  mixins: [j, D, R, U],
  props: {
    labels: {
      required: !1,
      type: Object,
      default: () => ({
        min: "Min",
        max: "Max"
      })
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    step: {
      type: Number,
      default: 1
    },
    stepped: {
      type: Boolean,
      default: !1
    },
    showLabels: {
      type: Boolean,
      default: !1
    },
    labelsBeneath: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["mouseUp", "input"],
  data: () => ({
    labelsWidth: 0,
    innerValue: 0
  }),
  created() {
    this.innerValue = this.value;
  },
  mounted() {
    const { leftLabel: { offsetWidth: e = 0 } = {}, rightLabel: { offsetWidth: s = 0 } = {} } = this.$refs;
    this.labelsWidth = Math.max(e, s);
  },
  computed: {
    steps() {
      return [];
    },
    labelsMargin() {
      return this.labelsBeneath ? "" : `${this.labelsWidth}px`;
    },
    computedStyle() {
      return {
        left: this.labelsMargin,
        right: this.labelsMargin,
        width: `calc(100% - ${2 * this.labelsWidth}px + 14px)`
      };
    },
    innerBlueBarStyle() {
      return {
        // right: `calc(${percent}%${ left ? (` + ${ left }`) : ''})`,
        width: `${(this.innerValue - this.min) / (this.max - this.min) * 100}%`
      };
    }
  },
  methods: {
    commit() {
      this.disabled || this.$emit("mouseUp", this.value);
    },
    update(e) {
      this.disabled || (this.innerValue = e, this.$emit("input", this.innerValue));
    }
  }
}, ad = {
  key: 0,
  class: "control-label"
}, rd = {
  key: 0,
  class: "label-field-required"
}, ud = ["disabled", "value", "min", "max", "step"], dd = {
  key: 0,
  class: "vu-slider__steps"
}, cd = {
  key: 1,
  class: "form-control-helper-text"
};
function hd(e, s, t, i, o, n) {
  return l(), r("div", {
    class: v(["form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", ad, [
      $(g(e.label), 1),
      e.required ? (l(), r("span", rd, " *")) : f("", !0)
    ])) : f("", !0),
    c("div", {
      class: v(["vu-slider", { disabled: e.disabled }])
    }, [
      c("div", {
        onMouseup: s[1] || (s[1] = (...a) => n.commit && n.commit(...a)),
        class: "vu-slider__container"
      }, [
        c("div", {
          ref: "leftLabel",
          class: "vu-slider__left vu-slider__label"
        }, g(t.showLabels ? t.labels.min : t.min), 513),
        c("div", {
          ref: "rightLabel",
          class: "vu-slider__right vu-slider__label"
        }, g(t.showLabels ? t.labels.max : t.max), 513),
        c("input", {
          class: "slider vu-slider__left",
          type: "range",
          disabled: e.disabled,
          value: e.innerValue,
          min: t.min,
          max: t.max,
          step: t.step,
          style: P(t.labelsBeneath ? {} : n.computedStyle),
          onInput: s[0] || (s[0] = (a) => n.update(parseFloat(a.target.value)))
        }, null, 44, ud),
        c("div", {
          class: "vu-slider__grey-bar",
          style: P({ left: n.labelsMargin, right: n.labelsMargin })
        }, [
          c("div", {
            class: "vu-slider__blue-bar vu-slider__blue-bar--left",
            style: P(n.innerBlueBarStyle)
          }, null, 4)
        ], 4)
      ], 32),
      t.stepped ? (l(), r("div", dd, [
        (l(!0), r(B, null, M(n.steps, (a, d) => (l(), r("div", {
          key: d,
          class: "vu-slider__step",
          style: P(a.style)
        }, null, 4))), 128))
      ])) : f("", !0)
    ], 2),
    (l(!0), r(B, null, M(e.errorBucket, (a, d) => (l(), r("span", {
      key: `${d}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, g(a), 1))), 128)),
    e.helper.length ? (l(), r("span", cd, g(e.helper), 1)) : f("", !0)
  ], 2);
}
const fd = /* @__PURE__ */ I(od, [["render", hd], ["__scopeId", "data-v-c2dadf12"]]), md = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fd
}, Symbol.toStringTag, { value: "Module" })), pd = {
  name: "vu-textarea",
  mixins: [j, D, R, U],
  props: {
    rows: {
      type: [Number, String],
      default: () => 2
    },
    name: {
      type: [String],
      required: !1
    },
    minlength: {
      type: Number,
      required: !1
    },
    maxlength: {
      type: Number,
      required: !1
    },
    readonly: {
      type: [Boolean, String, void 0],
      required: !1,
      default: void 0
    },
    spellcheck: {
      type: [Boolean, String, void 0],
      required: !1,
      default: void 0
    },
    wrap: {
      type: String,
      required: !1
    },
    autocomplete: {
      type: [Boolean, String, void 0],
      required: !1,
      default: void 0
    },
    autocorrect: {
      type: [Boolean, String, void 0],
      required: !1,
      default: void 0
    },
    autofocus: {
      type: [Boolean, String, void 0],
      required: !1,
      default: void 0
    }
  },
  emits: ["update:modelValue"]
}, gd = {
  key: 0,
  class: "control-label"
}, vd = {
  key: 0,
  class: "label-field-required"
}, yd = ["value", "placeholder", "disabled", "name", "minlength", "maxlength", "readonly", "spellcheck", "rows", "wrap", "autocomplete", "autocorrect", "autofocus", "required"], bd = {
  key: 1,
  class: "form-control-helper-text"
};
function _d(e, s, t, i, o, n) {
  return l(), r("div", {
    class: v(["form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", gd, [
      $(g(e.label), 1),
      e.required ? (l(), r("span", vd, " *")) : f("", !0)
    ])) : f("", !0),
    c("textarea", {
      value: e.value,
      placeholder: e.placeholder,
      disabled: e.disabled,
      name: t.name,
      minlength: t.minlength,
      maxlength: t.maxlength,
      readonly: t.readonly,
      spellcheck: t.spellcheck,
      rows: t.rows,
      wrap: t.wrap,
      autocomplete: t.autocomplete,
      autocorrect: t.autocorrect,
      autofocus: t.autofocus,
      required: e.required,
      class: "form-control",
      onInput: s[0] || (s[0] = (a) => e.$emit("update:modelValue", a.target.value))
    }, null, 40, yd),
    (l(!0), r(B, null, M(e.errorBucket, (a, d) => (l(), r("p", {
      key: `${d}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, g(a), 1))), 128)),
    e.helper.length ? (l(), r("span", bd, g(e.helper), 1)) : f("", !0)
  ], 2);
}
const wd = /* @__PURE__ */ I(pd, [["render", _d], ["__scopeId", "data-v-161593fc"]]), kd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wd
}, Symbol.toStringTag, { value: "Module" })), Sd = { class: "list-item__thumbnail" }, Cd = { class: "list-item__body" }, Id = { key: 0 }, Bd = ["innerHTML"], Od = {
  key: 0,
  class: "body__description"
}, Vd = {
  key: 0,
  class: "list-item__action-menu"
}, $d = {
  name: "vu-thumbnail-list-item"
}, Md = /* @__PURE__ */ Mt({
  ...$d,
  props: {
    icon: { default: "" },
    iconColor: { default: "default" },
    iconSelectedColor: { default: "secondary" },
    title: { default: "" },
    rawTitle: {},
    imgUrl: {},
    unread: { type: Boolean, default: !1 },
    selected: { type: Boolean, default: !1 },
    description: {},
    actions: { default: () => [] },
    iconFill: { type: Boolean },
    value: { default: void 0 },
    lazyImage: { type: Boolean, default: !0 }
  },
  emits: ["click", "click-action"],
  setup(e, { emit: s }) {
    const t = e, i = s, o = N(null), n = N(null), a = N(!1);
    function d() {
      var u;
      (u = o.value) != null && u.scrollIntoViewIfNeeded && o.value.scrollIntoViewIfNeeded({ behavior: "smooth" });
    }
    return Ws(() => t.selected, d), xt(() => {
      t.selected && d();
    }), (u, m) => {
      const h = F("tooltip");
      return l(), r("div", {
        ref_key: "container",
        ref: o,
        class: v(["vu-thumbnail-list-item", [{
          "menu-is-open": a.value,
          selected: u.selected,
          "with-unread-content": u.unread
        }]]),
        onClick: m[3] || (m[3] = ({ target: p }) => {
          var b, k;
          return !((k = (b = n.value) == null ? void 0 : b.$el) != null && k.contains(p)) && i("click", t.value);
        })
      }, [
        c("div", Sd, [
          w(u.$slots, "thumbnail", {}, () => [
            u.icon ? (l(), r("div", {
              key: 0,
              class: v(["thumbnail__container", [{ "bg-grey-4": u.iconFill }]])
            }, [
              C(A, {
                class: "thumbnail__icon",
                color: u.selected ? t.iconSelectedColor : t.iconColor,
                icon: u.icon
              }, null, 8, ["color", "icon"])
            ], 2)) : u.imgUrl ? (l(), _(ye, {
              key: 1,
              src: u.imgUrl || "",
              lazy: u.lazyImage
            }, null, 8, ["src", "lazy"])) : f("", !0)
          ], !0)
        ]),
        c("div", Cd, [
          w(u.$slots, "title", {
            isMenuOpen: a.value,
            listItemRef: o.value
          }, () => [
            u.title ? (l(), r("div", {
              key: 0,
              class: v(["body__title", [{
                "font-bold": u.unread,
                "!line-clamp-1": !!u.$slots.description || u.description
              }]])
            }, [
              u.rawTitle ? (l(), r("span", {
                key: 1,
                innerHTML: u.rawTitle
              }, null, 8, Bd)) : (l(), r("span", Id, g(u.title), 1))
            ], 2)) : f("", !0)
          ], !0),
          w(u.$slots, "description", {}, () => [
            u.description ? (l(), r("div", Od, g(u.description), 1)) : f("", !0)
          ], !0)
        ]),
        u.unread || u.actions.length ? (l(), r("div", Vd, [
          u.unread ? (l(), _(T, {
            key: 0,
            class: "action-menu__unread-icon",
            "no-active": !0,
            "no-hover": "",
            icon: "record"
          })) : f("", !0),
          u.actions.length > 1 ? (l(), _(be, {
            key: 1,
            ref_key: "actionMenu",
            ref: n,
            show: a.value,
            "onUpdate:show": m[0] || (m[0] = (p) => a.value = p),
            items: u.actions,
            side: "bottom-right",
            onClickItem: m[1] || (m[1] = (p) => i("click-action", p))
          }, {
            default: S(() => [
              C(T, {
                clickable: "",
                color: u.selected && "secondary" || void 0,
                class: "action-menu__action",
                icon: "chevron-down",
                active: a.value,
                "within-text": !1
              }, null, 8, ["color", "active"])
            ]),
            _: 1
          }, 8, ["show", "items"])) : u.actions.length === 1 ? V((l(), _(T, {
            key: 2,
            ref_key: "actionMenu",
            ref: n,
            clickable: "",
            color: u.selected && "secondary" || void 0,
            class: "action-menu__action",
            icon: u.actions[0].fonticon,
            active: a.value,
            "within-text": !1,
            onClick: m[2] || (m[2] = (p) => i("click-action", u.actions[0]))
          }, null, 8, ["color", "icon", "active"])), [
            [h, u.actions[0].text || u.actions[0].label]
          ]) : f("", !0)
        ])) : f("", !0)
      ], 2);
    };
  }
}), Pd = /* @__PURE__ */ I(Md, [["__scopeId", "data-v-6158ff83"]]), xd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pd
}, Symbol.toStringTag, { value: "Module" })), Ld = {
  key: 0,
  class: "control-label"
}, Td = {
  key: 0,
  class: "label-field-required"
}, Ad = { key: 1 }, Fd = ["value", "placeholder", "disabled"], Dd = { class: "vu-time-picker__display form-control" }, zd = { class: "vu-time-picker__body" }, Nd = { class: "vu-time-picker__hours" }, Ed = ["value"], jd = { class: "vu-time-picker__minutes" }, Rd = ["value"], Ud = {
  key: 3,
  class: "form-control vu-time-picker__display",
  disabled: ""
}, qd = {
  key: 4,
  class: "form-control-helper-text"
}, Hd = {
  name: "vu-time-picker",
  inheritAttrs: !1,
  mixins: [j, R, D, U],
  props: {
    useNativeInput: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      minutes: "00",
      hours: "00",
      isPopoverOpen: !1
    };
  },
  watch: {
    modelValue(e) {
      const [s, t] = this.splitTime(e);
      this.hours = s, this.minutes = t;
    },
    minutes(e) {
      this.$emit("update:modelValue", `${this.hours}:${e}`);
    },
    hours(e) {
      this.$emit("update:modelValue", `${e}:${this.minutes}`);
    }
  },
  beforeMount() {
    const [e, s] = this.splitTime(this.modelValue);
    this.hours = e, this.minutes = s;
  },
  methods: {
    splitTime(e) {
      return e.split(":");
    },
    formatNumberForTime(e) {
      return e < 10 ? `0${e}` : `${e}`;
    }
  },
  components: { VuPopover: G, VuPopover: G }
}, Wd = /* @__PURE__ */ Object.assign(Hd, {
  setup(e) {
    const s = Y("vuInputComposition", !1), t = Y(st, !1);
    return (i, o) => (l(), r("div", {
      class: v(["vu-time-picker form-group", i.classes])
    }, [
      i.label.length ? (l(), r("label", Ld, [
        $(g(i.label) + " ", 1),
        i.required ? (l(), r("span", Td, " *")) : f("", !0)
      ])) : f("", !0),
      e.useNativeInput || E(t) ? (l(), r("div", Ad, [
        c("input", L(i.$attrs, {
          value: i.value,
          placeholder: i.placeholder,
          disabled: i.disabled,
          type: "time",
          class: "vu-time-picker__display-native form-control",
          style: { width: "fit-content" },
          onInput: o[0] || (o[0] = ({ target: n }) => {
            E(s) || (n.composing = !1), i.$emit("update:modelValue", n.value);
          })
        }), null, 16, Fd)
      ])) : i.disabled ? (l(), r("div", Ud, [
        c("span", null, g(i.hours), 1),
        $(":"),
        c("span", null, g(i.minutes), 1)
      ])) : (l(), _(G, {
        key: 2,
        class: "vu-time-picker__popover",
        style: { width: "fit-content" },
        show: i.isPopoverOpen
      }, {
        body: S(() => [
          c("div", zd, [
            c("div", Nd, [
              (l(!0), r(B, null, M([...Array(24).keys()], (n) => (l(), r("label", {
                key: n,
                class: v({ "vu-time-picker__hours--selected": i.hours === i.formatNumberForTime(n) })
              }, [
                c("span", null, g(i.formatNumberForTime(n)), 1),
                V(c("input", {
                  "onUpdate:modelValue": o[1] || (o[1] = (a) => i.hours = a),
                  type: "radio",
                  name: "hours",
                  value: i.formatNumberForTime(n)
                }, null, 8, Ed), [
                  [ht, i.hours]
                ])
              ], 2))), 128))
            ]),
            c("div", jd, [
              (l(!0), r(B, null, M([...Array(60).keys()], (n) => (l(), r("label", {
                key: n,
                class: v({ "vu-time-picker__minutes--selected": i.minutes === i.formatNumberForTime(n) })
              }, [
                c("span", null, g(i.formatNumberForTime(n)), 1),
                V(c("input", {
                  "onUpdate:modelValue": o[2] || (o[2] = (a) => i.minutes = a),
                  type: "radio",
                  name: "minutes",
                  value: i.formatNumberForTime(n)
                }, null, 8, Rd), [
                  [ht, i.minutes]
                ])
              ], 2))), 128))
            ])
          ])
        ]),
        default: S(() => [
          c("div", Dd, [
            c("span", null, g(i.hours), 1),
            $(":"),
            c("span", null, g(i.minutes), 1)
          ])
        ]),
        _: 1
      }, 8, ["show"])),
      (l(!0), r(B, null, M(i.errorBucket, (n, a) => (l(), r("span", {
        key: `${a}-error-${n}`,
        style: { display: "block" },
        class: "form-control-error-text"
      }, g(n), 1))), 128)),
      i.helper.length ? (l(), r("span", qd, g(i.helper), 1)) : f("", !0)
    ], 2));
  }
}), Kd = /* @__PURE__ */ I(Wd, [["__scopeId", "data-v-cf359eaf"]]), Gd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kd
}, Symbol.toStringTag, { value: "Module" }));
function Yd(e, s, t) {
  const i = N(!1), o = N({}), n = N({}), a = N({}), d = N([]), u = N(/* @__PURE__ */ new WeakMap()), m = Ce(() => d.value.map((b) => u.value.get(b)).reduce((b, k) => b || k, !1)), h = Ce(
    () => (!n.value || i.value === !1) && m.value
  );
  return xt(() => {
    var p;
    if (e) {
      a.value = new IntersectionObserver(
        (k) => {
          k.forEach(({ intersectionRatio: O, target: z }) => {
            u.value.set(z, O > 0);
          });
        }
      ), o.value = new IntersectionObserver(
        (k) => {
          i.value = k[0].intersectionRatio > 0;
        }
      );
      let { nextElementSibling: b } = s.value;
      for (; b && b.className.indexOf(t) === -1; )
        a.value.observe(b), d.value.push(b), b = b.nextElementSibling;
      (p = s == null ? void 0 : s.value) != null && p.previousElementSibling && (n.value = s.value.previousElementSibling, o.value.observe(s.value.previousElementSibling));
    }
  }), Cs(() => {
    a.value && a.value.disconnect(), o.value && o.value.disconnect(), delete a.value, delete o.value;
  }), { stick: h };
}
const ds = (e) => (te("data-v-81975a38"), e = e(), se(), e), Xd = /* @__PURE__ */ ds(() => /* @__PURE__ */ c("hr", null, null, -1)), Jd = { class: "vu-timeline-separator-date__date" }, Zd = /* @__PURE__ */ ds(() => /* @__PURE__ */ c("hr", null, null, -1)), Qd = {
  name: "vu-timeline-divider"
}, ec = /* @__PURE__ */ Object.assign(Qd, {
  props: ["date", "label", "sticky", "forceStick", "scrollSelector"],
  setup(e) {
    const s = Y("lang"), t = N(null), i = e, { stick: o } = Yd(i.sticky || i.forceStick, t, "vu-timeline-separator-date"), n = (a) => {
      const d = new Date(a), u = d.getFullYear(), m = (/* @__PURE__ */ new Date()).getFullYear(), h = u === m ? { weekday: "long", month: "long", day: "numeric" } : {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      };
      return d.toLocaleDateString(s, h);
    };
    return (a, d) => (l(), r("div", {
      class: v(["vu-timeline-separator-date", { "vu-timeline-separator-date--top": E(o) }]),
      ref_key: "el",
      ref: t
    }, [
      Xd,
      c("div", Jd, g(e.label || n(e.date)), 1),
      Zd
    ], 2));
  }
}), tc = /* @__PURE__ */ I(ec, [["__scopeId", "data-v-81975a38"]]), sc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tc
}, Symbol.toStringTag, { value: "Module" })), nc = (e) => {
  try {
    const { label: s, id: t } = e;
    if (s && t)
      return !0;
  } catch {
  }
  return !1;
}, ic = {
  name: "vu-tree-view-item",
  mixins: [ue],
  emits: ["load-complete", "click", "expand", "select"],
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    expanded: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Array,
      default: () => []
    },
    depth: {
      type: Number,
      default: () => 0
    },
    hover: {
      type: Boolean,
      default: !1
    },
    siblingsHaveNoType: {
      type: Boolean,
      default: !1
    },
    item: {
      type: Object,
      validator: nc,
      required: !0
    },
    main: {
      type: Boolean,
      default: !1
    },
    leftPadding: {
      type: Number,
      default: 0
    }
  },
  inject: {
    vuTreeViewLazy: {
      default: !1
    },
    vuTreeViewLeftPadBase: {
      default: 38
    },
    vuTreeViewLeftPadFunc: {
      type: Function,
      default: void 0
    },
    vuTreeViewLeftPadReduce: {
      type: Boolean,
      default: !1
    },
    vuTreeIcon: {
      type: String,
      default: "expand"
    }
  },
  data: () => ({
    guid: ne
  }),
  watch: {
    item: {
      deep: !0,
      handler(e) {
        this.isLoading && this.$emit("load-complete", e);
      }
    }
  },
  created() {
    this.item.expanded && !this.isExpanded && this.$emit("expand", this.item), this.item.selected && !this.isSelected && this.$emit("select", this.item);
  },
  computed: {
    otherSlots() {
      return Object.fromEntries(this.$slots.filter((e) => e.startsWith("item-")));
    },
    showTreeIcon() {
      return (
        // eslint-disable-next-line operator-linebreak
        this.hasItems || this.vuTreeViewLazy && !this.item.leaf && this.item.items === void 0 && !this.isLoading
      );
    },
    hasItems() {
      return this.item.items && this.item.items.length > 0;
    },
    isSelected() {
      return this.selected.includes(this.item);
    },
    isExpanded() {
      return this.expanded.includes(this.item);
    },
    isLoading() {
      return this.vuTreeViewLazy && this.loading.includes(this.item);
    },
    anyChildrenHasIcon() {
      return this.hasItems && this.item.items.some((e) => e.icon !== void 0);
    },
    getTreeIconClass() {
      return this.isExpanded ? `${this.vuTreeIcon}-down` : `${this.vuTreeIcon}-right`;
    },
    calcLeftPadding() {
      return this.vuTreeViewLeftPadFunc ? this.vuTreeViewLeftPadFunc(this.depth, this.leftPadding) : this.depth ? this.vuTreeViewLeftPadReduce ? Math.max(this.leftPadding + this.vuTreeViewLeftPadBase - 6 * this.depth, this.leftPadding + 6) : this.leftPadding + this.vuTreeViewLeftPadBase : 0;
    }
  },
  methods: {
    onClick(e) {
      var t, i;
      [(t = this.$refs.loadingSpinner) == null ? void 0 : t.$el, (i = this.$refs.treeIcon) == null ? void 0 : i.$el].filter((o) => o).every((o) => !o.contains(e.target)) && this.$emit("select", this.item);
    }
  },
  components: { VuIconBtn: T }
}, lc = (e) => (te("data-v-a2b9f9ba"), e = e(), se(), e), oc = {
  key: 1,
  class: "vu-tree-view-item__tree-icon-loading",
  ref: "loadingSpinner"
}, ac = /* @__PURE__ */ lc(() => /* @__PURE__ */ c("svg", {
  class: "vu-spin",
  viewBox: "25 25 50 50"
}, [
  /* @__PURE__ */ c("circle", {
    class: "path",
    cx: "50",
    cy: "50",
    r: "20",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "5",
    "stroke-miterlimit": "10"
  })
], -1)), rc = {
  key: 2,
  class: "vu-tree-view-item__tree-icon-placeholder"
}, uc = {
  key: 4,
  class: "vu-tree-view-item__type-icon-placeholder"
}, dc = { class: "vu-tree-view-item__label" };
function cc(e, s, t, i, o, n) {
  const a = y("VuIconBtn"), d = y("VuTreeViewItem", !0), u = F("tooltip");
  return l(), r(B, null, [
    c("div", {
      class: v(["vu-tree-view-item", {
        "vu-tree-view-item--selected": n.isSelected,
        "vu-tree-view-item--unselected": !n.isSelected,
        "vu-tree-view-item--main": t.main,
        "vu-tree-view-item--child": !t.main,
        "vu-tree-view-item--chevron-icon": n.vuTreeIcon === "chevron"
      }]),
      style: P({
        "padding-left": `${n.calcLeftPadding}px`
      }),
      onClick: s[1] || (s[1] = (...m) => n.onClick && n.onClick(...m))
    }, [
      n.showTreeIcon ? (l(), _(a, {
        key: 0,
        icon: n.getTreeIconClass,
        class: "vu-tree-view-item__tree-icon",
        onClick: s[0] || (s[0] = (m) => e.$emit("expand", t.item)),
        ref: "treeIcon"
      }, null, 8, ["icon"])) : n.isLoading ? (l(), r("div", oc, [
        w(e.$slots, "itemLoading", {}, () => [
          ac
        ], !0)
      ], 512)) : (l(), r("div", rc)),
      t.item.icon ? (l(), _(a, {
        key: 3,
        class: "vu-tree-view-item__type-icon",
        color: "default-inactive",
        icon: t.item.icon
      }, null, 8, ["icon"])) : t.siblingsHaveNoType ? (l(), r("div", uc)) : f("", !0),
      w(e.$slots, "item-" + t.item.type || "default", {}, () => [
        V((l(), r("div", dc, [
          $(g(t.item.label), 1)
        ])), [
          [
            u,
            t.item.label,
            void 0,
            { ellipsis: !0 }
          ]
        ])
      ], !0)
    ], 6),
    n.hasItems && n.isExpanded ? (l(!0), r(B, { key: 0 }, M(t.item.items, (m) => (l(), _(d, {
      key: `${m.id}`,
      item: m,
      depth: t.depth + 1,
      "left-padding": n.calcLeftPadding,
      selected: t.selected,
      loading: t.loading,
      expanded: t.expanded,
      "siblings-have-no-type": n.anyChildrenHasIcon,
      onLoadComplete: s[2] || (s[2] = (h) => e.$emit("load-complete", h)),
      onExpand: s[3] || (s[3] = (h) => e.$emit("expand", h)),
      onSelect: s[4] || (s[4] = (h) => e.$emit("select", h))
    }, null, 8, ["item", "depth", "left-padding", "selected", "loading", "expanded", "siblings-have-no-type"]))), 128)) : f("", !0)
  ], 64);
}
const Re = /* @__PURE__ */ I(ic, [["render", cc], ["__scopeId", "data-v-a2b9f9ba"]]), hc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Re
}, Symbol.toStringTag, { value: "Module" })), fc = {
  name: "vu-tree-view",
  emits: ["update:selected", "update:expanded", "fetch", "item-click", "update:loading"],
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    expanded: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Array,
      required: !1,
      default: void 0
    },
    items: {
      type: Array,
      required: !0
    },
    exclusive: {
      type: Boolean,
      default: !0
    },
    firstLevelBigger: {
      type: Boolean,
      default: !1
    }
  },
  data: () => ({
    innerLoading: []
  }),
  methods: {
    toggleSelect(e) {
      if (this.selected.includes(e)) {
        const s = this.expanded.slice();
        s.splice(s.indexOf(e), 1), this.$emit("update:selected", s);
      } else
        this.exclusive ? this.$emit("update:selected", [e]) : this.$emit("update:selected", [e].concat(this.expanded || []));
    },
    toggleExpand(e) {
      const s = this.expanded.slice();
      this.expanded.includes(e) ? (s.splice(s.indexOf(e), 1), this.$emit("update:expanded", s)) : e.items === void 0 ? (this.$emit("fetch", e), this.loading === void 0 ? this.innerLoading.push(e) : this.$emit("update:loading", [e].concat(this.loading || []))) : (s.push(e), this.$emit("update:expanded", s));
    },
    onLoad(e) {
      this.loading === void 0 && this.innerLoading.splice(this.innerLoading.indexOf(e)), e.items && e.items.length > 0 && !e.leaf && this.$emit("update:expanded", [e].concat(this.expanded || []));
    }
  },
  components: { VuTreeViewItem: Re, VuScroller: Be, VuTreeViewItem: Re }
}, mc = { class: "vu-tree-view" };
function pc(e, s, t, i, o, n) {
  const a = y("VuTreeViewItem"), d = y("VuScroller");
  return l(), r("div", mc, [
    C(d, null, {
      default: S(() => [
        (l(!0), r(B, null, M(t.items, (u) => (l(), _(a, {
          key: `${u.id}`,
          item: u,
          loading: t.loading || e.innerLoading,
          expanded: t.expanded,
          selected: t.selected,
          main: t.firstLevelBigger,
          onExpand: n.toggleExpand,
          onSelect: n.toggleSelect,
          onLoadComplete: n.onLoad
        }, null, 8, ["item", "loading", "expanded", "selected", "main", "onExpand", "onSelect", "onLoadComplete"]))), 128))
      ]),
      _: 1
    })
  ]);
}
const gc = /* @__PURE__ */ I(fc, [["render", pc]]), vc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gc
}, Symbol.toStringTag, { value: "Module" })), Se = "__v-click-outside", cs = typeof window < "u", yc = typeof navigator < "u", bc = cs && ("ontouchstart" in window || yc && navigator.msMaxTouchPoints > 0), _c = bc ? ["touchstart"] : ["click"];
function wc(e) {
  const s = typeof e == "function";
  if (!s && typeof e != "object")
    throw new Error("v-click-outside: Binding value must be a function or an object");
  return {
    handler: s ? e : e.handler,
    middleware: e.middleware || ((t) => t),
    events: e.events || _c,
    innerShow: e.innerShow !== !1
  };
}
function kc({
  el: e,
  event: s,
  handler: t,
  middleware: i
}) {
  const o = s.path || s.composedPath && s.composedPath(), n = o ? o.indexOf(e) < 0 : !e.contains(s.target);
  s.target !== e && n && i(s) && t(s);
}
function hs(e, { value: s }) {
  const {
    events: t,
    handler: i,
    middleware: o,
    innerShow: n
  } = wc(s);
  n && (e[Se] = t.map((a) => ({
    event: a,
    handler: (d) => kc({
      event: d,
      el: e,
      handler: i,
      middleware: o
    })
  })), e[Se].forEach(({ event: a, handler: d }) => setTimeout(() => {
    e[Se] && document.documentElement.addEventListener(a, d, !1);
  }, 0)));
}
function fs(e) {
  (e[Se] || []).forEach(({ event: t, handler: i }) => document.documentElement.removeEventListener(t, i, !1)), delete e[Se];
}
function Sc(e, { value: s, oldValue: t }) {
  JSON.stringify(s) !== JSON.stringify(t) && (fs(e), hs(e, { value: s }));
}
const Cc = {
  beforeMount: hs,
  updated: Sc,
  beforeUnmount: fs
}, Ue = cs ? Cc : {}, Ic = {
  viewAll: "View all",
  contactsInCommon: "### contact$(s) in common",
  profile: "See full profile",
  message: "Start conversation",
  network: "Add user to my network",
  audio: "Add audio",
  conferencing: "Add video",
  screenshare: "Share screen",
  FR: "France",
  BR: "Brazil",
  CN: "China",
  DE: "Germany",
  ES: "Spain",
  GB: "United-Kingdom",
  HU: "Hungary",
  IT: "Italy",
  JP: "Japan",
  PL: "Poland",
  PT: "Portugal",
  RU: "Russia",
  SE: "Sweden",
  TR: "Turkey"
}, Bc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#73AF00;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<path style="fill:#FFE15A;" d="M251.41,135.209L65.354,248.46c-5.651,3.439-5.651,11.641,0,15.081L251.41,376.793  c2.819,1.716,6.36,1.716,9.18,0l186.057-113.251c5.651-3.439,5.651-11.641,0-15.081L260.59,135.209  C257.771,133.493,254.229,133.493,251.41,135.209z"/>
<circle style="fill:#41479B;" cx="256" cy="256.001" r="70.62"/>
<g>
	<path style="fill:#F5F5F5;" d="M195.401,219.874c-3.332,5.578-5.905,11.64-7.605,18.077c39.149-2.946,97.062,8.006,133.922,43.773   c2.406-6.141,3.994-12.683,4.59-19.522C288.247,230.169,235.628,218.778,195.401,219.874z"/>
	<path style="fill:#F5F5F5;" d="M258.925,280.1l1.88,5.638l5.943,0.046c0.769,0.006,1.088,0.988,0.47,1.445l-4.781,3.531   l1.793,5.666c0.232,0.734-0.604,1.341-1.229,0.893l-4.835-3.456l-4.835,3.456c-0.626,0.448-1.461-0.159-1.229-0.893l1.793-5.666   l-4.781-3.531c-0.619-0.457-0.3-1.439,0.469-1.445l5.943-0.046l1.88-5.638C257.649,279.37,258.681,279.37,258.925,280.1z"/>
	<path style="fill:#F5F5F5;" d="M282.024,294.685l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C281.474,294.37,281.919,294.37,282.024,294.685z"/>
	<path style="fill:#F5F5F5;" d="M248.938,269.39l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C248.388,269.076,248.833,269.076,248.938,269.39z"/>
	<path style="fill:#F5F5F5;" d="M204.13,266.448l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C203.581,266.134,204.025,266.134,204.13,266.448z"/>
	<path style="fill:#F5F5F5;" d="M241.614,293.847l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C241.065,293.534,241.51,293.534,241.614,293.847z"/>
	<path style="fill:#F5F5F5;" d="M220.99,264.755l0.662,1.984l2.092,0.017c0.27,0.002,0.383,0.348,0.166,0.509l-1.683,1.242   l0.631,1.994c0.082,0.258-0.212,0.472-0.433,0.314l-1.702-1.216l-1.702,1.216c-0.221,0.158-0.514-0.056-0.433-0.314l0.631-1.994   l-1.683-1.242c-0.217-0.161-0.106-0.507,0.166-0.509l2.092-0.017l0.662-1.984C220.541,264.498,220.904,264.498,220.99,264.755z"/>
	<path style="fill:#F5F5F5;" d="M283.819,223.794l0.828,2.482l2.616,0.02c0.339,0.002,0.479,0.435,0.206,0.636l-2.104,1.554   l0.789,2.495c0.103,0.323-0.266,0.59-0.541,0.393l-2.129-1.522l-2.129,1.522c-0.276,0.198-0.643-0.071-0.541-0.393l0.789-2.495   l-2.104-1.554c-0.273-0.201-0.132-0.633,0.206-0.636l2.616-0.02l0.828-2.482C283.257,223.472,283.712,223.472,283.819,223.794z"/>
	<path style="fill:#F5F5F5;" d="M207.012,252.617l0.662,1.984l2.092,0.017c0.27,0.002,0.383,0.348,0.166,0.509l-1.683,1.242   l0.631,1.994c0.082,0.258-0.212,0.472-0.433,0.314l-1.702-1.216l-1.702,1.216c-0.221,0.158-0.514-0.056-0.433-0.314l0.631-1.994   l-1.683-1.242c-0.217-0.161-0.106-0.506,0.166-0.509l2.092-0.017l0.662-1.984C206.563,252.36,206.926,252.36,207.012,252.617z"/>
	<path style="fill:#F5F5F5;" d="M217.112,280.581l1.002,3.006l3.168,0.024c0.41,0.003,0.58,0.526,0.25,0.77l-2.549,1.882l0.956,3.02   c0.124,0.391-0.321,0.715-0.655,0.476l-2.578-1.842l-2.578,1.842c-0.333,0.238-0.779-0.085-0.655-0.476l0.956-3.02l-2.549-1.882   c-0.33-0.244-0.16-0.767,0.25-0.77l3.168-0.024l1.002-3.006C216.433,280.193,216.983,280.193,217.112,280.581z"/>
	<path style="fill:#F5F5F5;" d="M294.903,295.315l0.63,1.891l1.993,0.015c0.258,0.002,0.365,0.331,0.158,0.484l-1.603,1.184   l0.601,1.9c0.078,0.246-0.202,0.449-0.413,0.299l-1.621-1.159l-1.622,1.159c-0.21,0.15-0.49-0.053-0.413-0.299l0.601-1.9   l-1.603-1.184c-0.207-0.153-0.1-0.482,0.158-0.484l1.993-0.015l0.63-1.891C294.475,295.07,294.822,295.07,294.903,295.315z"/>
	<path style="fill:#F5F5F5;" d="M301.877,280.885l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C301.327,280.57,301.772,280.57,301.877,280.885z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, Oc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#FF4B55;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<g>
	<path style="fill:#FFE15A;" d="M85.007,140.733l8.416,25.234l26.6,0.206c3.444,0.026,4.872,4.422,2.101,6.467l-21.398,15.801   l8.023,25.362c1.038,3.284-2.7,5.999-5.502,3.997l-21.64-15.469l-21.64,15.468c-2.802,2.003-6.54-0.714-5.502-3.997l8.023-25.362   l-21.398-15.8c-2.771-2.046-1.343-6.441,2.101-6.467l26.6-0.206l8.416-25.234C79.297,137.465,83.918,137.465,85.007,140.733z"/>
	<path style="fill:#FFE15A;" d="M181.599,146.951l6.035,8.23l9.739-3.046c1.261-0.394,2.298,1.044,1.526,2.115l-5.962,8.281   l5.906,8.321c0.765,1.077-0.282,2.508-1.54,2.105l-9.719-3.111l-6.089,8.189c-0.788,1.06-2.473,0.506-2.478-0.814l-0.045-10.205   l-9.67-3.261c-1.251-0.423-1.246-2.195,0.009-2.609l9.69-3.196l0.114-10.204C179.129,146.427,180.818,145.886,181.599,146.951z"/>
	<path style="fill:#FFE15A;" d="M144.857,122.421l10.145,1.102l4.328-9.241c0.561-1.196,2.321-0.991,2.591,0.302l2.086,9.988   l10.126,1.26c1.311,0.163,1.66,1.901,0.513,2.558l-8.855,5.07l1.931,10.02c0.25,1.298-1.295,2.166-2.274,1.279l-7.559-6.855   l-8.932,4.932c-1.156,0.639-2.461-0.563-1.919-1.768l4.183-9.308l-7.452-6.972C142.805,123.89,143.544,122.279,144.857,122.421z"/>
	<path style="fill:#FFE15A;" d="M160.895,221.314l-6.035,8.23l-9.739-3.046c-1.261-0.394-2.298,1.044-1.526,2.115l5.962,8.281   l-5.906,8.321c-0.765,1.077,0.282,2.508,1.54,2.105l9.719-3.111l6.089,8.189c0.788,1.06,2.473,0.506,2.478-0.814l0.045-10.205   l9.67-3.261c1.252-0.423,1.246-2.195-0.009-2.609l-9.69-3.196l-0.114-10.204C163.363,220.791,161.676,220.248,160.895,221.314z"/>
	<path style="fill:#FFE15A;" d="M197.635,198.263l-10.145,1.102l-4.328-9.241c-0.561-1.196-2.321-0.991-2.591,0.302l-2.087,9.988   l-10.126,1.26c-1.311,0.163-1.66,1.901-0.513,2.558l8.855,5.07l-1.931,10.02c-0.25,1.298,1.295,2.166,2.274,1.279l7.559-6.855   l8.932,4.932c1.156,0.639,2.461-0.563,1.919-1.768l-4.183-9.308l7.452-6.972C199.689,199.732,198.95,198.121,197.635,198.263z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, Vc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#464655;" d="M512,200.093H0V97.104c0-4.875,3.953-8.828,8.828-8.828h494.345c4.875,0,8.828,3.953,8.828,8.828  L512,200.093L512,200.093z"/>
<path style="fill:#FFE15A;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V311.909h512v102.988  C512,419.773,508.047,423.725,503.172,423.725z"/>
<rect y="200.091" style="fill:#FF4B55;" width="512" height="111.81"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, $c = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#C8414B;" d="M8.828,423.725h494.345c4.875,0,8.828-3.953,8.828-8.828V97.104c0-4.875-3.953-8.828-8.828-8.828  H8.828C3.953,88.277,0,92.229,0,97.104v317.793C0,419.773,3.953,423.725,8.828,423.725z"/>
<rect y="158.901" style="fill:#FFD250;" width="512" height="194.21"/>
<path style="fill:#C8414B;" d="M216.276,256.001l7.485-33.681c0.69-3.102-1.671-6.044-4.849-6.044h-5.272  c-3.177,0-5.537,2.942-4.849,6.044L216.276,256.001z"/>
<rect x="207.45" y="238.341" style="fill:#F5F5F5;" width="17.655" height="75.03"/>
<rect x="203.03" y="229.521" style="fill:#FAB446;" width="26.483" height="8.828"/>
<g>
	<rect x="185.38" y="256.001" style="fill:#C8414B;" width="44.14" height="8.828"/>
	<polygon style="fill:#C8414B;" points="229.517,291.311 203.034,282.484 203.034,273.656 229.517,282.484  "/>
	<path style="fill:#C8414B;" d="M83.862,256.001l7.485-33.681c0.69-3.102-1.671-6.044-4.849-6.044h-5.272   c-3.177,0-5.537,2.942-4.849,6.044L83.862,256.001z"/>
</g>
<path style="fill:#F5F5F5;" d="M114.759,229.518c-4.875,0-8.828,3.953-8.828,8.828v57.379c0,10.725,10.01,30.897,44.138,30.897  s44.138-20.171,44.138-30.897v-57.379c0-4.875-3.953-8.828-8.828-8.828H114.759z"/>
<g>
	<path style="fill:#C8414B;" d="M150.069,273.656h-44.138v-35.31c0-4.875,3.953-8.828,8.828-8.828h35.31V273.656z"/>
	<path style="fill:#C8414B;" d="M150.069,273.656h44.138v22.069c0,12.189-9.88,22.069-22.069,22.069l0,0   c-12.189,0-22.069-9.88-22.069-22.069V273.656z"/>
</g>
<path style="fill:#FAB446;" d="M105.931,273.656h44.138v22.069c0,12.189-9.88,22.069-22.069,22.069l0,0  c-12.189,0-22.069-9.88-22.069-22.069V273.656z"/>
<g>
	<path style="fill:#C8414B;" d="M141.241,313.281v-39.625h-8.828v43.693C135.697,316.683,138.664,315.229,141.241,313.281z"/>
	<path style="fill:#C8414B;" d="M123.586,317.349v-43.693h-8.828v39.625C117.336,315.229,120.303,316.683,123.586,317.349z"/>
</g>
<rect x="114.76" y="256.001" style="fill:#FFB441;" width="26.483" height="8.828"/>
<g>
	<rect x="114.76" y="238.341" style="fill:#FAB446;" width="26.483" height="8.828"/>
	<rect x="119.17" y="243.591" style="fill:#FAB446;" width="17.655" height="15.992"/>
</g>
<rect x="75.03" y="238.341" style="fill:#F5F5F5;" width="17.655" height="75.03"/>
<g>
	<rect x="70.62" y="308.971" style="fill:#FAB446;" width="26.483" height="8.828"/>
	<rect x="70.62" y="229.521" style="fill:#FAB446;" width="26.483" height="8.828"/>
</g>
<rect x="66.21" y="317.791" style="fill:#5064AA;" width="35.31" height="8.828"/>
<rect x="207.45" y="308.971" style="fill:#FAB446;" width="26.483" height="8.828"/>
<rect x="198.62" y="317.791" style="fill:#5064AA;" width="35.31" height="8.828"/>
<rect x="123.59" y="220.691" style="fill:#FAB446;" width="52.966" height="8.828"/>
<rect x="145.66" y="194.211" style="fill:#FFB441;" width="8.828" height="26.483"/>
<g>
	<path style="fill:#F5F5F5;" d="M141.241,207.449c-7.302,0-13.241-5.94-13.241-13.241c0-7.302,5.94-13.241,13.241-13.241   c7.302,0,13.241,5.94,13.241,13.241C154.483,201.509,148.543,207.449,141.241,207.449z M141.241,189.794   c-2.435,0-4.414,1.978-4.414,4.414c0,2.435,1.978,4.414,4.414,4.414s4.414-1.978,4.414-4.414   C145.655,191.773,143.677,189.794,141.241,189.794z"/>
	<path style="fill:#F5F5F5;" d="M158.897,207.449c-7.302,0-13.241-5.94-13.241-13.241c0-7.302,5.94-13.241,13.241-13.241   c7.302,0,13.241,5.94,13.241,13.241S166.198,207.449,158.897,207.449z M158.897,189.794c-2.435,0-4.414,1.978-4.414,4.414   c0,2.435,1.978,4.414,4.414,4.414c2.435,0,4.414-1.978,4.414-4.414C163.31,191.773,161.332,189.794,158.897,189.794z"/>
	<path style="fill:#F5F5F5;" d="M176.552,216.277c-7.302,0-13.241-5.94-13.241-13.241c0-7.302,5.94-13.241,13.241-13.241   c7.302,0,13.241,5.94,13.241,13.241S183.853,216.277,176.552,216.277z M176.552,198.622c-2.435,0-4.414,1.978-4.414,4.414   c0,2.435,1.978,4.414,4.414,4.414c2.435,0,4.414-1.978,4.414-4.414S178.987,198.622,176.552,198.622z"/>
	<path style="fill:#F5F5F5;" d="M123.586,216.277c-7.302,0-13.241-5.94-13.241-13.241c0-7.302,5.94-13.241,13.241-13.241   c7.302,0,13.241,5.94,13.241,13.241C136.828,210.337,130.888,216.277,123.586,216.277z M123.586,198.622   c-2.435,0-4.414,1.978-4.414,4.414c0,2.435,1.978,4.414,4.414,4.414s4.414-1.979,4.414-4.415   C128,200.6,126.022,198.622,123.586,198.622z"/>
</g>
<path style="fill:#FAB446;" d="M176.552,291.311v4.414c0,2.434-1.98,4.414-4.414,4.414s-4.414-1.98-4.414-4.414v-4.414H176.552   M185.379,282.484h-26.483v13.241c0,7.302,5.94,13.241,13.241,13.241c7.302,0,13.241-5.94,13.241-13.241v-13.241H185.379z"/>
<path style="fill:#FFA0D2;" d="M172.138,264.829L172.138,264.829c-4.875,0-8.828-3.953-8.828-8.828v-8.828  c0-4.875,3.953-8.828,8.828-8.828l0,0c4.875,0,8.828,3.953,8.828,8.828v8.828C180.966,260.876,177.013,264.829,172.138,264.829z"/>
<circle style="fill:#5064AA;" cx="150.07" cy="273.651" r="13.241"/>
<rect x="145.66" y="176.551" style="fill:#FAB446;" width="8.828" height="26.483"/>
<path style="fill:#C8414B;" d="M123.586,220.691l-8.828-8.828l5.171-5.171c7.993-7.993,18.835-12.484,30.14-12.484l0,0  c11.305,0,22.146,4.491,30.14,12.484l5.171,5.171l-8.828,8.828H123.586z"/>
<g>
	<circle style="fill:#FFD250;" cx="150.07" cy="211.861" r="4.414"/>
	<circle style="fill:#FFD250;" cx="132.41" cy="211.861" r="4.414"/>
	<circle style="fill:#FFD250;" cx="167.72" cy="211.861" r="4.414"/>
</g>
<g>
	<rect x="70.62" y="256.001" style="fill:#C8414B;" width="44.14" height="8.828"/>
	<polygon style="fill:#C8414B;" points="70.621,291.311 97.103,282.484 97.103,273.656 70.621,282.484  "/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, Mc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#41479B;" d="M170.667,423.721H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.1c0-4.875,3.953-8.828,8.828-8.828  h161.839V423.721z"/>
<rect x="170.67" y="88.277" style="fill:#F5F5F5;" width="170.67" height="335.45"/>
<path style="fill:#FF4B55;" d="M503.172,423.721H341.333V88.273h161.839c4.875,0,8.828,3.953,8.828,8.828v317.793  C512,419.77,508.047,423.721,503.172,423.721z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, Pc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.002 512.002" style="enable-background:new 0 0 512.002 512.002;" xml:space="preserve">
<path style="fill:#41479B;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.772,508.047,423.725,503.172,423.725z"/>
<path style="fill:#F5F5F5;" d="M512,97.104c0-4.875-3.953-8.828-8.828-8.828h-39.495l-163.54,107.147V88.276h-88.276v107.147  L48.322,88.276H8.828C3.953,88.276,0,92.229,0,97.104v22.831l140.309,91.927H0v88.276h140.309L0,392.066v22.831  c0,4.875,3.953,8.828,8.828,8.828h39.495l163.54-107.147v107.147h88.276V316.578l163.54,107.147h39.495  c4.875,0,8.828-3.953,8.828-8.828v-22.831l-140.309-91.927H512v-88.276H371.691L512,119.935V97.104z"/>
<g>
	<polygon style="fill:#FF4B55;" points="512,229.518 282.483,229.518 282.483,88.276 229.517,88.276 229.517,229.518 0,229.518    0,282.483 229.517,282.483 229.517,423.725 282.483,423.725 282.483,282.483 512,282.483  "/>
	<path style="fill:#FF4B55;" d="M178.948,300.138L0.25,416.135c0.625,4.263,4.14,7.59,8.577,7.59h12.159l190.39-123.586h-32.428   V300.138z"/>
	<path style="fill:#FF4B55;" d="M346.388,300.138H313.96l190.113,123.404c4.431-0.472,7.928-4.09,7.928-8.646v-7.258   L346.388,300.138z"/>
	<path style="fill:#FF4B55;" d="M0,106.849l161.779,105.014h32.428L5.143,89.137C2.123,90.54,0,93.555,0,97.104V106.849z"/>
	<path style="fill:#FF4B55;" d="M332.566,211.863L511.693,95.586c-0.744-4.122-4.184-7.309-8.521-7.309h-12.647L300.138,211.863   H332.566z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, xc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#FF4B55;" d="M512,200.093H0V97.104c0-4.875,3.953-8.828,8.828-8.828h494.345c4.875,0,8.828,3.953,8.828,8.828  L512,200.093L512,200.093z"/>
<path style="fill:#73AF00;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V311.909h512v102.988  C512,419.773,508.047,423.725,503.172,423.725z"/>
<rect y="200.091" style="fill:#F5F5F5;" width="512" height="111.81"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, Lc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#73AF00;" d="M170.667,423.721H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.1c0-4.875,3.953-8.828,8.828-8.828  h161.839V423.721z"/>
<rect x="170.67" y="88.277" style="fill:#F5F5F5;" width="170.67" height="335.45"/>
<path style="fill:#FF4B55;" d="M503.172,423.721H341.333V88.273h161.839c4.875,0,8.828,3.953,8.828,8.828v317.793  C512,419.77,508.047,423.721,503.172,423.721z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, Tc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#F5F5F5;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<circle style="fill:#FF4B55;" cx="256" cy="256.001" r="97.1"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, Ac = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#FF4B55;" d="M0,256h512v158.897c0,4.875-3.953,8.828-8.828,8.828H8.828c-4.875,0-8.828-3.953-8.828-8.828V256z"/>
<path style="fill:#F5F5F5;" d="M512,256H0V97.103c0-4.875,3.953-8.828,8.828-8.828h494.345c4.875,0,8.828,3.953,8.828,8.828L512,256  L512,256z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, Fc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#FF4B55;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<path style="fill:#73AF00;" d="M185.379,88.277H8.828C3.953,88.277,0,92.229,0,97.104v317.793c0,4.875,3.953,8.828,8.828,8.828  H185.38V88.277H185.379z"/>
<circle style="fill:#FFE15A;" cx="185.45" cy="256.001" r="79.38"/>
<path style="fill:#FF4B55;" d="M211.932,229.518v35.31c0,14.603-11.88,26.483-26.483,26.483s-26.483-11.88-26.483-26.483v-35.31  H211.932 M220.759,211.863h-70.621c-4.875,0-8.828,3.953-8.828,8.828v44.138c0,24.376,19.762,44.138,44.138,44.138  s44.138-19.762,44.138-44.138v-44.138C229.587,215.816,225.634,211.863,220.759,211.863L220.759,211.863z"/>
<path style="fill:#F5F5F5;" d="M211.932,229.518v35.31c0,14.603-11.88,26.483-26.483,26.483s-26.483-11.88-26.483-26.483v-35.31  H211.932"/>
<g>
	<circle style="fill:#FFE15A;" cx="150.07" cy="220.691" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="220.69" cy="220.691" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="150.07" cy="256.001" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="220.69" cy="256.001" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="185.38" cy="220.691" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="211.88" cy="288.551" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="159.4" cy="288.551" r="4.414"/>
</g>
<g>
	<path style="fill:#41479B;" d="M191.149,253.763v7.602c0,3.144-2.558,5.702-5.702,5.702s-5.702-2.558-5.702-5.702v-7.602   L191.149,253.763"/>
	<path style="fill:#41479B;" d="M191.149,235.741v7.602c0,3.144-2.558,5.702-5.702,5.702s-5.702-2.558-5.702-5.702v-7.602H191.149"/>
	<path style="fill:#41479B;" d="M191.149,271.97v7.602c0,3.144-2.558,5.702-5.702,5.702s-5.702-2.558-5.702-5.702v-7.602H191.149"/>
	<path style="fill:#41479B;" d="M206.506,253.763v7.602c0,3.144-2.558,5.702-5.702,5.702s-5.702-2.558-5.702-5.702v-7.602   L206.506,253.763"/>
	<path style="fill:#41479B;" d="M175.794,253.763v7.602c0,3.144-2.558,5.702-5.702,5.702s-5.702-2.558-5.702-5.702v-7.602   L175.794,253.763"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, Dc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#F5F5F5;" d="M512,200.093H0V97.104c0-4.875,3.953-8.828,8.828-8.828h494.345c4.875,0,8.828,3.953,8.828,8.828  L512,200.093L512,200.093z"/>
<path style="fill:#FF4B55;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V311.909h512v102.988  C512,419.773,508.047,423.725,503.172,423.725z"/>
<rect y="200.091" style="fill:#41479B;" width="512" height="111.81"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, zc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#4173CD;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<polygon style="fill:#FFE15A;" points="512,229.518 211.862,229.518 211.862,88.277 158.897,88.277 158.897,229.518 0,229.518   0,282.484 158.897,282.484 158.897,423.725 211.862,423.725 211.862,282.484 512,282.484 "/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, Nc = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#FF4B55;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<g>
	<path style="fill:#F5F5F5;" d="M253.474,225.753l13.837,18.101l21.606-7.232c1.208-0.404,2.236,0.962,1.512,2.01l-12.939,18.753   l13.555,18.314c0.758,1.024-0.224,2.423-1.444,2.059l-21.834-6.511l-13.228,18.55c-0.739,1.037-2.375,0.536-2.406-0.737   l-0.555-22.777l-21.73-6.849c-1.215-0.383-1.244-2.092-0.042-2.515l21.491-7.566l-0.202-22.783   C251.083,225.296,252.701,224.741,253.474,225.753z"/>
	<path style="fill:#F5F5F5;" d="M176.956,326.662c-38.995,0-70.627-31.633-70.627-70.663c0-38.958,31.633-70.662,70.627-70.662   c14.508,0,27.887,4.462,39.037,12.014c1.707,1.156,3.656-1.087,2.227-2.573c-16.664-17.325-40.248-27.894-66.398-27.001   c-44.926,1.533-82.118,37.553-84.989,82.413c-3.287,51.383,37.399,94.086,88.055,94.086c24.953,0,47.379-10.432,63.393-27.112   c1.415-1.473-0.538-3.683-2.229-2.537C204.89,322.196,191.489,326.662,176.956,326.662z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, It = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BR: Bc,
  CN: Oc,
  DE: Vc,
  ES: $c,
  FR: Mc,
  GB: Pc,
  HU: xc,
  IT: Lc,
  JP: Tc,
  PL: Ac,
  PT: Fc,
  RU: Dc,
  SE: zc,
  TR: Nc
}, Symbol.toStringTag, { value: "Module" })), ms = (e) => {
  if (e && e.id)
    return !0;
}, Ec = (e) => {
  try {
    const { firstName: s } = e;
    if (s)
      return !0;
  } catch {
  }
  return !1;
}, jc = (e) => `${e.firstName}${e.lastName ? ` ${e.lastName}` : ""}`, ae = {
  message: {
    name: "message",
    icon: "chat-alt"
  },
  network: {
    name: "network",
    icon: "user-add",
    left: !0
  },
  audio: {
    name: "audio",
    icon: "phone"
  },
  conferencing: {
    name: "conferencing",
    icon: "videocamera"
  },
  screenshare: {
    name: "screenshare",
    icon: "monitor"
  }
};
ae.network;
const Rc = [ae.message, ae.audio, ae.conferencing, ae.screenshare], xe = (e) => {
  const s = Object.keys(ae);
  return !(e.length > 0 && e.filter((t) => s.indexOf(t)) === -1);
}, Uc = {
  name: "vu-rich-user-tooltip",
  emits: ["network", "message", "audio", "conferencing", "screenshare", "see-profile"],
  directives: {
    "click-outside": Ue
  },
  inject: {
    vuUserLabels: {
      default: () => Ic
    },
    vuDebug: {
      default: !1
    }
  },
  props: {
    show: {
      type: Boolean,
      required: !1
    },
    user: {
      type: Object,
      validator: ms,
      required: !0
    },
    disabledActions: {
      type: Array,
      validator: xe,
      required: !1,
      default: () => []
    },
    hiddenActions: {
      type: Array,
      validator: xe,
      required: !1,
      default: () => []
    },
    side: {
      type: String,
      default: "bottom"
    },
    // eslint-disable-next-line vue/require-prop-types
    attach: {
      default: !1
    },
    activator: {
      type: Object,
      default: void 0
    }
  },
  watch: {
    show(e) {
      this.innerShow = e;
    },
    contacts: {
      immediate: !0,
      handler() {
        this.parseContactsInCommonLabel();
      }
    }
  },
  /* eslint-disable no-unused-vars */
  data: () => ({
    overflowHover: !1,
    actions: ae,
    RHSactions: Rc,
    uuid: ne,
    getFullname: jc,
    validateName: Ec,
    contactsLabelPart2: "",
    contactsLabelPart1: "",
    visibleAmount: 7
  }),
  /* eslint-enable no-unused-vars */
  computed: {
    hasInfo() {
      return this.user.company || this.user.country;
    },
    hasContacts() {
      return Array.isArray(this.user.contacts) && this.user.contacts.length > 0;
    },
    contacts() {
      return this.hasContacts ? this.user.contacts : [];
    },
    countryImg() {
      return !this.user.countryCode || !It[this.user.countryCode.toUpperCase()] ? !1 : It[this.user.countryCode.toUpperCase()];
    },
    countryLabel() {
      return this.user.countryCode && this.vuUserLabels[this.user.countryCode];
    },
    overflows() {
      return this.user.contacts && this.user.contacts.length > 7;
    },
    visibleContacts() {
      return this.hasContacts && this.overflows ? this.contacts.slice(0, this.visibleAmount) : this.contacts;
    },
    overflowContact() {
      return this.hasContacts && this.overflows ? this.contacts[this.visibleAmount] : null;
    },
    numberOfOverflowingContactsCssVariable() {
      return `"${this.contacts.length - this.visibleAmount}"`;
    }
  },
  methods: {
    parseContactsInCommonLabel() {
      if (!this.vuUserLabels.contactsInCommon && this.vuDebug) {
        console.warn("contactsInCommon nls is missing");
        return;
      }
      let { contactsInCommon: e } = this.vuUserLabels;
      const s = e.match(/\$\(.*\)/).length > 0;
      this.contacts.length > 1 && s ? e = e.replace("$(", "").replace(")", "") : e = e.replace(/\$\(.*\)/, ""), e = e.split("###"), this.contactsLabelPart1 = e[0], this.contactsLabelPart2 = e[1];
    },
    isDisabled(e) {
      return this.disabledActions.length > 0 && this.disabledActions.includes(e);
    }
  },
  components: { VuPopover: G, VuUserPicture: pe, VuIconBtn: T }
}, qc = (e) => (te("data-v-8d121700"), e = e(), se(), e), Hc = { class: "rich-user-tooltip__header__wrap-name" }, Wc = /* @__PURE__ */ qc(() => /* @__PURE__ */ c("div", { class: "rich-user-tooltip__header__topbar" }, null, -1)), Kc = { class: "rich-user-tooltip__avatar-wrap" }, Gc = {
  key: 0,
  class: "rich-user-tooltip__info"
}, Yc = {
  key: 0,
  class: "rich-user-tooltip__info__company"
}, Xc = {
  key: 1,
  class: "rich-user-tooltip__info__locale"
}, Jc = ["src"], Zc = {
  key: 1,
  class: "rich-user-tooltip__info__country"
}, Qc = { class: "rich-user-tooltip__contacts__label" }, eh = { class: "rich-user-tooltip__contacts__list" }, th = { class: "rich-user-tooltip__footer" }, sh = { class: "rich-user-tooltip__footer__left" };
function nh(e, s, t, i, o, n) {
  const a = y("VuUserPicture"), d = y("VuIconBtn"), u = y("VuPopover"), m = F("tooltip");
  return l(), _(u, {
    side: t.side,
    show: t.show,
    arrow: "",
    shift: "",
    positions: ["bottom", "top"],
    attach: "body",
    "content-class": "vu-rich-user-tooltip",
    activator: t.activator
  }, Is({
    default: S(() => [
      w(e.$slots, "default", {}, () => [
        V(C(a, {
          id: t.user.id,
          clickable: "",
          src: t.user.imgSrc,
          presence: t.user.presence,
          class: "rich-user-tooltip__default-content"
        }, null, 8, ["id", "src", "presence"]), [
          [
            m,
            e.getFullname(t.user),
            void 0,
            { top: !0 }
          ]
        ])
      ], !0)
    ]),
    arrow: S(({ side: h, shift: p }) => [
      V(c("div", {
        class: v(["rich-user-tooltip__arrow popover-arrow", `rich-user-tooltip__arrow--${h}`])
      }, null, 2), [
        [ee, !p]
      ])
    ]),
    title: S(({ side: h }) => [
      c("div", {
        class: v(["rich-user-tooltip__header", `rich-user-tooltip__header--${h}`])
      }, [
        c("div", Hc, [
          V((l(), r("label", {
            class: "rich-user-tooltip__header__name",
            onClick: s[0] || (s[0] = (p) => e.$emit("see-profile", t.user.id))
          }, [
            $(g(e.getFullname(t.user)), 1)
          ])), [
            [m, e.getFullname(t.user)]
          ])
        ]),
        Wc,
        V((l(), r("div", Kc, [
          C(a, {
            class: "rich-user-tooltip__header__avatar",
            size: "big",
            clickable: !0,
            id: t.user && t.user.id,
            gutter: !0,
            presence: t.user.presence,
            onClick: s[1] || (s[1] = (p) => e.$emit("see-profile", t.user.id))
          }, null, 8, ["id", "presence"])
        ])), [
          [
            m,
            e.getFullname(t.user),
            void 0,
            { bottom: !0 }
          ]
        ])
      ], 2)
    ]),
    _: 2
  }, [
    (n.hasInfo || n.hasContacts, {
      name: "body",
      fn: S(() => [
        n.hasInfo ? (l(), r("div", Gc, [
          t.user.company ? (l(), r("label", Yc, g(t.user.company), 1)) : f("", !0),
          n.countryImg || n.countryLabel ? (l(), r("label", Xc, [
            n.countryImg ? (l(), r("img", {
              key: 0,
              class: "rich-user-tooltip__info__flag",
              src: n.countryImg
            }, null, 8, Jc)) : f("", !0),
            n.countryLabel ? (l(), r("span", Zc, g(n.countryLabel), 1)) : f("", !0)
          ])) : f("", !0)
        ])) : f("", !0),
        w(e.$slots, "content", {}, void 0, !0),
        n.hasContacts ? (l(), r(B, { key: 1 }, [
          c("label", Qc, [
            $(g(e.contactsLabelPart1), 1),
            V((l(), r("span", {
              class: "rich-user-tooltip__contacts__amount",
              onClick: s[2] || (s[2] = (h) => e.$emit("see-profile", t.user.id))
            }, [
              $(g(n.contacts.length), 1)
            ])), [
              [
                m,
                n.vuUserLabels.profile,
                void 0,
                { bottom: !0 }
              ]
            ]),
            e.contactsLabelPart2 ? (l(), r(B, { key: 0 }, [
              $(g(e.contactsLabelPart2), 1)
            ], 64)) : f("", !0)
          ]),
          c("div", eh, [
            (l(!0), r(B, null, M(n.visibleContacts, (h) => V((l(), _(a, {
              key: h.id || e.uuid(),
              id: h.id || e.uuid(),
              clickable: !0,
              onClick: (p) => e.$emit("see-profile", h.id)
            }, null, 8, ["id", "onClick"])), [
              [
                m,
                e.getFullname(h),
                void 0,
                { bottom: !0 }
              ]
            ])), 128)),
            n.overflowContact ? V((l(), _(a, {
              key: 0,
              class: "rich-user-tooltip__overflow_contact",
              style: P({
                "--numberOfOverflowingContacts": n.numberOfOverflowingContactsCssVariable
              }),
              clickable: !0,
              hoverable: "",
              id: n.overflowContact.id || e.uuid(),
              onClick: s[3] || (s[3] = (h) => e.$emit("see-profile", n.overflowContact.id))
            }, null, 8, ["style", "id"])), [
              [
                m,
                n.vuUserLabels.profile,
                void 0,
                { bottom: !0 }
              ]
            ]) : f("", !0)
          ])
        ], 64)) : f("", !0),
        c("div", th, [
          c("div", sh, [
            w(e.$slots, "footer-left", {}, () => [
              t.hiddenActions.length && t.hiddenActions.includes("network") ? f("", !0) : V((l(), _(a, {
                key: 0,
                icon: e.actions.network.icon,
                class: "add-network",
                disabled: t.disabledActions.length > 0 && t.disabledActions.includes("network"),
                onClick: s[4] || (s[4] = (h) => {
                  n.isDisabled("network") || e.$emit("network", t.user.id);
                })
              }, null, 8, ["icon", "disabled"])), [
                [
                  m,
                  n.vuUserLabels.network,
                  void 0,
                  { bottom: !0 }
                ]
              ])
            ], !0)
          ]),
          w(e.$slots, "footer-right", {}, () => [
            (l(!0), r(B, null, M(e.RHSactions, (h) => (l(), r(B, {
              key: h.name
            }, [
              t.hiddenActions.length && t.hiddenActions.includes(h.name) ? f("", !0) : V((l(), _(d, {
                key: 0,
                class: "right-btn",
                icon: h.icon,
                disabled: n.isDisabled(h.name),
                onClick: (p) => {
                  n.isDisabled(h.name) || e.$emit(h.name, t.user.id);
                }
              }, null, 8, ["icon", "disabled", "onClick"])), [
                [
                  m,
                  n.vuUserLabels[h.name],
                  void 0,
                  { bottom: !0 }
                ]
              ])
            ], 64))), 128))
          ], !0)
        ])
      ]),
      key: "0"
    })
  ]), 1032, ["side", "show", "activator"]);
}
const ps = /* @__PURE__ */ I(Uc, [["render", nh], ["__scopeId", "data-v-8d121700"]]), ih = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ps
}, Symbol.toStringTag, { value: "Module" })), lh = {
  name: "vu-user-name",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    firstName: String,
    // eslint-disable-next-line vue/require-default-prop
    lastName: String,
    toUpper: {
      type: Boolean,
      required: !1,
      default: !0
    },
    shift: Boolean,
    clickable: Boolean
  },
  emits: ["click"],
  computed: {
    _lastName() {
      return this.toUpper ? this.lastName.toUpperCase() : this.lastName;
    }
  }
};
function oh(e, s, t, i, o, n) {
  return l(), r("div", {
    class: v(["vu-user-name", [
      "vu-user-name--default-color",
      "vu-user-name--default-size",
      { "vu-user-name--with-avatar": t.shift },
      { "vu-user-name--clickable": t.clickable }
    ]])
  }, [
    w(e.$slots, "default", {}, () => [
      c("span", {
        class: "content",
        onClick: s[0] || (s[0] = (a) => e.$emit("click"))
      }, g(t.firstName + " " + n._lastName), 1)
    ], !0)
  ], 2);
}
const gs = /* @__PURE__ */ I(lh, [["render", oh], ["__scopeId", "data-v-7c3b1fc7"]]), ah = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gs
}, Symbol.toStringTag, { value: "Module" })), rh = {
  name: "vu-user",
  emits: ["click-other-user", "click-user"],
  props: {
    user: {
      type: Object,
      required: !0,
      validator: ms
    },
    disabledActions: {
      type: Array,
      required: !1,
      default: () => [],
      validator: xe
    },
    hiddenActions: {
      type: Array,
      required: !1,
      default: () => [],
      validator: xe
    },
    showPicture: {
      type: Boolean,
      required: !1,
      default: !0
    },
    showName: {
      type: Boolean,
      required: !1,
      default: !1
    },
    showUserTooltip: {
      type: Boolean,
      required: !1,
      default: !0
    },
    clickable: {
      type: Boolean,
      required: !1,
      default: !0
    },
    pictureBackground: {
      type: String,
      required: !1,
      default: "#fff"
    },
    attach: {
      default: () => !1,
      validator: Xe
    }
  },
  computed: {
    listeners() {
      return J(this.$attrs, !0);
    }
  },
  data: () => ({
    getListenersFromAttrs: J
  }),
  components: { VuRichUserTooltip: ps, VuUserPicture: pe, VuUserName: gs, VuUserPicture: pe }
}, uh = { class: "vu-user" };
function dh(e, s, t, i, o, n) {
  const a = y("VuUserPicture"), d = y("VuUserName"), u = y("VuRichUserTooltip");
  return l(), r("div", uh, [
    t.showUserTooltip ? (l(), _(u, L({
      key: 0,
      user: t.user,
      "disabled-actions": t.disabledActions,
      "hidden-actions": t.hiddenActions,
      attach: t.attach
    }, Q(n.listeners.vOn || {})), {
      default: S(() => [
        t.showPicture ? (l(), _(a, {
          key: 0,
          id: t.user.id,
          src: t.user.imgSrc,
          presence: t.user.presence,
          clickable: t.clickable,
          style: P({ background: t.pictureBackground }),
          onClick: s[0] || (s[0] = (m) => e.$emit("click-user", e.value))
        }, null, 8, ["id", "src", "presence", "clickable", "style"])) : f("", !0),
        t.showName ? (l(), _(d, {
          key: 1,
          "first-name": t.user.firstName,
          "last-name": t.user.lastName,
          clickable: t.clickable,
          shift: t.showPicture,
          onClick: s[1] || (s[1] = (m) => e.$emit("click-user", m))
        }, {
          default: S(() => [
            w(e.$slots, "userName", {}, void 0, !0)
          ]),
          _: 3
        }, 8, ["first-name", "last-name", "clickable", "shift"])) : f("", !0)
      ]),
      _: 3
    }, 16, ["user", "disabled-actions", "hidden-actions", "attach"])) : (l(), r(B, { key: 1 }, [
      t.showPicture ? (l(), _(a, {
        key: 0,
        id: t.user.id,
        src: t.user.imgSrc,
        presence: t.user.presence,
        clickable: t.clickable,
        style: P({ background: t.pictureBackground }),
        onClick: s[2] || (s[2] = (m) => e.$emit("click-user", m))
      }, null, 8, ["id", "src", "presence", "clickable", "style"])) : f("", !0),
      t.showName ? (l(), _(d, {
        key: 1,
        "first-name": t.user.firstName,
        "last-name": t.user.lastName,
        clickable: t.clickable,
        shift: t.showPicture,
        onClick: s[3] || (s[3] = (m) => e.$emit("click-user", m))
      }, {
        default: S(() => [
          w(e.$slots, "userName", {}, void 0, !0)
        ]),
        _: 3
      }, 8, ["first-name", "last-name", "clickable", "shift"])) : f("", !0)
    ], 64))
  ]);
}
const ch = /* @__PURE__ */ I(rh, [["render", dh], ["__scopeId", "data-v-4a92d15b"]]), hh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ch
}, Symbol.toStringTag, { value: "Module" })), ut = (e) => {
  const { userAgent: s } = e;
  return s.match(/ipad/i) || e.platform === "MacIntel" && e.maxTouchPoints > 1;
}, dt = ({ userAgent: e }) => e.match(/android/i);
let vs = null;
function fh({ disableTooltipsOnDevices: e }) {
  vs = e;
}
function ys(e, s, t, i) {
  const o = s.getBoundingClientRect(), {
    left: n,
    right: a,
    top: d,
    shiftX: u,
    offset: m
  } = Ze(e, o, t.getBoundingClientRect(), i.getBoundingClientRect(), {}, !0);
  t.style.top = `${d}px`, t.style.left = `${n}px`;
  const h = t.querySelector(".tooltip-arrow") || { style: {} };
  return u > 0 ? (h.style.right = `${u - 5}px`, h.style.left = "initial") : u < 0 && (h.style.left = `${o.left - n + s.clientWidth / 2}px`, h.style.right = "initial"), !0;
}
function bs(e) {
  switch (!0) {
    case e.left:
      return "left";
    case e.right:
      return "right";
    case e.bottom:
      return "bottom";
    default:
      return "top";
  }
}
async function Bt(e, s) {
  if (!s.value || s.modifiers.ellipsis && e.offsetWidth >= e.scrollWidth)
    return;
  const t = bs(s.modifiers);
  Ke(e.tooltip, document.body), e.tooltip.component.props.show = !0, e.tooltip.component.props.side = t, await new Promise((i) => setTimeout(i, 1)), ys(t, e, e.tooltip.el, document.body), (dt(navigator) || ut(navigator)) && (e.stopClickOutside = Ks(e, () => qe(e), { detectIframe: !0 }));
}
function qe(e) {
  const { tooltip: { component: s } } = e;
  s.props.show = !1, (dt(navigator) || ut(navigator) && e.stopClickOutside) && (e.stopClickOutside(), delete e.stopClickOutside);
}
async function mh(e, s, t) {
  var o;
  const { tooltip: i } = e;
  if (i) {
    const { component: n } = i;
    if (i.props.text = s.value, n && (n.props.text = s.value), (o = n == null ? void 0 : n.props) != null && o.show) {
      const a = bs(s.modifiers);
      await new Promise((d) => setTimeout(d, 1)), ys(a, t.el, i.el, document.body);
    }
  }
}
const De = {
  setConfig: fh,
  mounted(e, s, t) {
    const { modifiers: i } = s, { forceOnDevices: o = !1 } = i, n = dt(navigator) || ut(navigator);
    if (vs && !o && n || s.disabled)
      return;
    const a = C({ ...Qe }, {
      type: s.modifiers.popover ? "popover" : "tooltip",
      text: s.value
    });
    e.tooltip = a, s.modifiers.click || n ? e.addEventListener("click", () => {
      var d, u, m;
      (m = (u = (d = e == null ? void 0 : e.tooltip) == null ? void 0 : d.component) == null ? void 0 : u.props) != null && m.show ? qe(e) : Bt(e, s);
    }) : (e.addEventListener("mouseenter", Bt.bind(null, e, s, t)), e.addEventListener("mouseleave", qe.bind(null, e, s, t)));
  },
  updated(e, s, t) {
    s.value !== s.oldValue && mh(e, s, t);
  },
  beforeUnmount(e) {
    var s, t, i, o, n;
    if (e.tooltip) {
      const { tooltip: a } = e;
      a && ((t = (s = a == null ? void 0 : a.component) == null ? void 0 : s.el) == null || t.remove(), (n = (o = (i = a == null ? void 0 : a.component) == null ? void 0 : i.vnode) == null ? void 0 : o.el) == null || n.remove());
    }
  }
}, Ot = (e, s, t) => {
  const i = C(at, { mask: !0 });
  if (Ke(i, t.el), e.spinner = i, i && typeof s.value == "string") {
    const { component: o } = i;
    i.props.text = s.value, o && (o.props.text = s.value);
  }
  e.classList.add("masked");
}, Vt = (e, s, t) => {
  e.spinner && (Ke(null, t.el), e.spinner = null, e.classList.remove("masked"));
}, $t = {
  mounted(e, s, t) {
    s.value && Ot(e, s, t);
  },
  updated(e, s, t) {
    s.value !== s.oldValue && (s.value ? Ot : Vt)(e, s, t);
  },
  unmounted(e, s, t) {
    Vt(e, s, t);
  }
}, ph = {
  install(e, s = { disableTooltipsOnDevices: !0 }) {
    e.directive("click-outside", Ue), e.directive("mask", $t), De.setConfig(s), e.directive("tooltip", De);
  },
  clickOutside: Ue,
  tooltip: De,
  mask: $t
  // denseGroup,
  // denseClass,
};
function gh() {
  return window ? !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) : !1;
}
function vh(e, s = {}) {
  const { lang: t = "en", country: i = "US", isMobile: o, globalRegister: n = !0, disableTooltipsOnDevices: a = !0 } = s;
  if (ku(e), Yr(e), Gi(e), n) {
    const d = /* @__PURE__ */ Object.assign({ "./components/layouts/vu-status-bar.vue": dn, "./components/layouts/vu-thumbnail.vue": ai, "./components/layouts/vu-tile.vue": ei, "./components/vu-accordion.vue": pi, "./components/vu-alert-dialog/vu-alert-dialog-container.vue": Zi, "./components/vu-alert-dialog/vu-alert-dialog.vue": Vi, "./components/vu-badge.vue": $s, "./components/vu-btn-dropdown.vue": rl, "./components/vu-btn-group.vue": fl, "./components/vu-btn.vue": sl, "./components/vu-carousel-slide.vue": yl, "./components/vu-carousel.vue": Vl, "./components/vu-checkbox.vue": Dl, "./components/vu-datepicker.vue": Xl, "./components/vu-dropdownmenu-items.vue": Tn, "./components/vu-dropdownmenu.vue": Dn, "./components/vu-facets-bar.vue": so, "./components/vu-form.vue": lo, "./components/vu-grid-view.vue": ia, "./components/vu-icon-btn.vue": jn, "./components/vu-icon-link.vue": ra, "./components/vu-icon.vue": Ts, "./components/vu-image.vue": yn, "./components/vu-input-date.vue": va, "./components/vu-input-number.vue": Va, "./components/vu-input.vue": Aa, "./components/vu-lazy.vue": fn, "./components/vu-lightbox/vu-lightbox-bar.vue": Ya, "./components/vu-lightbox/vu-lightbox.vue": or, "./components/vu-media-upload-droppable.vue": cr, "./components/vu-media-upload-empty.vue": vr, "./components/vu-media-upload-error.vue": wr, "./components/vu-media-upload-loading.vue": Mr, "./components/vu-media-upload-preview.vue": Tr, "./components/vu-media-upload.vue": Rr, "./components/vu-message/vu-message-container.vue": eu, "./components/vu-message/vu-message.vue": Gr, "./components/vu-modal/vu-mobile-dialog.vue": au, "./components/vu-modal/vu-modal-container.vue": Bu, "./components/vu-modal/vu-modal.vue": wu, "./components/vu-multiple-select.vue": zu, "./components/vu-popover.vue": on, "./components/vu-progress-circular.vue": Br, "./components/vu-range.vue": Ju, "./components/vu-scroller.vue": Po, "./components/vu-select-options.vue": _o, "./components/vu-select.vue": Go, "./components/vu-single-checkbox.vue": ld, "./components/vu-slider.vue": md, "./components/vu-spinner.vue": Oo, "./components/vu-textarea.vue": kd, "./components/vu-thumbnail-list-item.vue": xd, "./components/vu-time-picker.vue": Gd, "./components/vu-timeline-divider.vue": sc, "./components/vu-tooltip.vue": Zs, "./components/vu-tree-view-item.vue": hc, "./components/vu-tree-view.vue": vc, "./components/vu-user/vu-rich-user-tooltip.vue": ih, "./components/vu-user/vu-user-name.vue": ah, "./components/vu-user/vu-user-picture.vue": ho, "./components/vu-user/vu-user.vue": hh });
    for (const u in d) {
      const m = d[u];
      e.component(m.default.name, m.default);
    }
  }
  t && i ? e.provide("lang", `${t}-${i}`) : e.provide("lang", "en-US"), e.provide(st, o !== void 0 ? o : gh()), e.provide("vuCollectionActions", null), e.provide("vuCollectionLazyImages", !0), e.provide("vuTileEmphasizeText", !1), e.provide("vuDateFormatWeekday", !0), e.provide("vuDateFormatShort", !1), e.provide("vuTreeViewLazy", !0), e.provide("vuTreeViewIcon", "chevron"), ph.install(e, s);
}
const bh = { install: vh };
export {
  qt as alertDialog,
  vh as default,
  vh as install,
  Pe as message,
  we as modal,
  bh as plugin
};
