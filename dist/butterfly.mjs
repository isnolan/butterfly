function Nn(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const a in r)
        if (a !== "default" && !(a in e)) {
          const s = Object.getOwnPropertyDescriptor(r, a);
          s && Object.defineProperty(e, a, s.get ? s : {
            enumerable: !0,
            get: () => r[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
const Ot = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";
function ot(e) {
  const t = [{ year: "numeric" }, { month: "2-digit" }, { day: "2-digit" }];
  function n(r) {
    return new Intl.DateTimeFormat("en", r).format(e * 1e3);
  }
  return t.map(n).join("-");
}
function Dn(e) {
  return new Promise(async (t, n) => {
    if (/www.tiktok.com\/(.*)\/(\d+)\?/.test(e)) {
      const r = e.match(/www.tiktok.com\/(.*)\/(\d+)\?/);
      t({ type: "tiktok", url: e, id: r && r[2] });
      return;
    }
    if (/www.douyin.com\/video\/(\d+)/.test(e)) {
      const r = e.match(/www.douyin.com\/video\/(\d+)/);
      t({ type: "douyin", url: e, id: r && r[1] });
      return;
    }
    if (/v.douyin.com\/([0-9a-zA-Z]{6,})\//.test(e)) {
      let r;
      try {
        r = await fetch(e, {
          redirect: "manual",
          headers: { "user-agent": Ot }
        }).then(async (a) => {
          const c = (await a.text()).match(/www.iesdouyin.com\/share\/video\/(\d+)/);
          return c && c[1];
        }), e = `https://www.douyin.com/video/${r}`, t({ type: "douyin", url: e, id: r });
      } catch (a) {
        n(a);
      }
      return;
    }
    if (/www.youtube.com\/watch\?v=([0-9a-zA-Z]{11,})/.test(e)) {
      const r = e.match(/www.youtube.com\/watch\?v=([0-9a-zA-Z]{11,})/);
      t({ type: "youtube", url: e, id: r && r[1] });
      return;
    }
    if (/youtu.be\/([0-9a-zA-Z]{11,})/.test(e)) {
      const r = e.match(/youtu.be\/([0-9a-zA-Z]{11,})/);
      e = e.replace(/youtu.be\//, "www.youtube.com/watch?v="), t({ type: "youtube", url: e, id: r && r[1] });
      return;
    }
    if (/www.kuaishou.com\/short-video\/([0-9a-zA-Z]{10,})/.test(e)) {
      const r = e.match(
        /www.kuaishou.com\/short-video\/([0-9a-zA-Z]{10,})/
      );
      t({ type: "kuaishou", url: e, id: r && r[1] });
      return;
    }
    if (/www.kuaishou.com\/f\/([-0-9a-zA-Z]{10,})/.test(e)) {
      try {
        const r = await fetch(e, {
          redirect: "manual",
          headers: { "user-agent": Ot }
        }).then(async (a) => {
          const s = a.headers.get("location"), c = s == null ? void 0 : s.match(/short-video\/([-0-9a-zA-Z]{10,})\?/);
          return c && c[1];
        });
        e = `https://www.kuaishou.com/short-video/${r}`, t({ type: "kuaishou", url: e, id: r });
      } catch (r) {
        n(r);
      }
      return;
    }
  });
}
function Jt(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Kt } = Object.prototype, { getPrototypeOf: st } = Object, ct = ((e) => (t) => {
  const n = Kt.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ae = (e) => (e = e.toLowerCase(), (t) => ct(t) === e), Me = (e) => (t) => typeof t === e, { isArray: ye } = Array, Se = Me("undefined");
function Pn(e) {
  return e !== null && !Se(e) && e.constructor !== null && !Se(e.constructor) && le(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Zt = ae("ArrayBuffer");
function Ln(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Zt(e.buffer), t;
}
const Fn = Me("string"), le = Me("function"), en = Me("number"), lt = (e) => e !== null && typeof e == "object", Bn = (e) => e === !0 || e === !1, De = (e) => {
  if (ct(e) !== "object")
    return !1;
  const t = st(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, xn = ae("Date"), Mn = ae("File"), kn = ae("Blob"), Un = ae("FileList"), qn = (e) => lt(e) && le(e.pipe), $n = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || Kt.call(e) === t || le(e.toString) && e.toString() === t);
}, Vn = ae("URLSearchParams"), Hn = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ie(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, a;
  if (typeof e != "object" && (e = [e]), ye(e))
    for (r = 0, a = e.length; r < a; r++)
      t.call(null, e[r], r, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), c = s.length;
    let p;
    for (r = 0; r < c; r++)
      p = s[r], t.call(null, e[p], p, e);
  }
}
function tn(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, a;
  for (; r-- > 0; )
    if (a = n[r], t === a.toLowerCase())
      return a;
  return null;
}
const nn = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), rn = (e) => !Se(e) && e !== nn;
function et() {
  const { caseless: e } = rn(this) && this || {}, t = {}, n = (r, a) => {
    const s = e && tn(t, a) || a;
    De(t[s]) && De(r) ? t[s] = et(t[s], r) : De(r) ? t[s] = et({}, r) : ye(r) ? t[s] = r.slice() : t[s] = r;
  };
  for (let r = 0, a = arguments.length; r < a; r++)
    arguments[r] && Ie(arguments[r], n);
  return t;
}
const jn = (e, t, n, { allOwnKeys: r } = {}) => (Ie(t, (a, s) => {
  n && le(a) ? e[s] = Jt(a, n) : e[s] = a;
}, { allOwnKeys: r }), e), Gn = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Wn = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, zn = (e, t, n, r) => {
  let a, s, c;
  const p = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (a = Object.getOwnPropertyNames(e), s = a.length; s-- > 0; )
      c = a[s], (!r || r(c, e, t)) && !p[c] && (t[c] = e[c], p[c] = !0);
    e = n !== !1 && st(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Xn = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, Yn = (e) => {
  if (!e)
    return null;
  if (ye(e))
    return e;
  let t = e.length;
  if (!en(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Qn = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && st(Uint8Array)), Jn = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let a;
  for (; (a = r.next()) && !a.done; ) {
    const s = a.value;
    t.call(e, s[0], s[1]);
  }
}, Kn = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, Zn = ae("HTMLFormElement"), er = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, a) {
    return r.toUpperCase() + a;
  }
), Nt = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), tr = ae("RegExp"), an = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  Ie(n, (a, s) => {
    t(a, s, e) !== !1 && (r[s] = a);
  }), Object.defineProperties(e, r);
}, nr = (e) => {
  an(e, (t, n) => {
    if (le(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (le(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, rr = (e, t) => {
  const n = {}, r = (a) => {
    a.forEach((s) => {
      n[s] = !0;
    });
  };
  return ye(e) ? r(e) : r(String(e).split(t)), n;
}, ir = () => {
}, ar = (e, t) => (e = +e, Number.isFinite(e) ? e : t), We = "abcdefghijklmnopqrstuvwxyz", Dt = "0123456789", on = {
  DIGIT: Dt,
  ALPHA: We,
  ALPHA_DIGIT: We + We.toUpperCase() + Dt
}, or = (e = 16, t = on.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function sr(e) {
  return !!(e && le(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const cr = (e) => {
  const t = new Array(10), n = (r, a) => {
    if (lt(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[a] = r;
        const s = ye(r) ? [] : {};
        return Ie(r, (c, p) => {
          const m = n(c, a + 1);
          !Se(m) && (s[p] = m);
        }), t[a] = void 0, s;
      }
    }
    return r;
  };
  return n(e, 0);
}, _ = {
  isArray: ye,
  isArrayBuffer: Zt,
  isBuffer: Pn,
  isFormData: $n,
  isArrayBufferView: Ln,
  isString: Fn,
  isNumber: en,
  isBoolean: Bn,
  isObject: lt,
  isPlainObject: De,
  isUndefined: Se,
  isDate: xn,
  isFile: Mn,
  isBlob: kn,
  isRegExp: tr,
  isFunction: le,
  isStream: qn,
  isURLSearchParams: Vn,
  isTypedArray: Qn,
  isFileList: Un,
  forEach: Ie,
  merge: et,
  extend: jn,
  trim: Hn,
  stripBOM: Gn,
  inherits: Wn,
  toFlatObject: zn,
  kindOf: ct,
  kindOfTest: ae,
  endsWith: Xn,
  toArray: Yn,
  forEachEntry: Jn,
  matchAll: Kn,
  isHTMLForm: Zn,
  hasOwnProperty: Nt,
  hasOwnProp: Nt,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: an,
  freezeMethods: nr,
  toObjectSet: rr,
  toCamelCase: er,
  noop: ir,
  toFiniteNumber: ar,
  findKey: tn,
  global: nn,
  isContextDefined: rn,
  ALPHABET: on,
  generateString: or,
  isSpecCompliantForm: sr,
  toJSONObject: cr
};
function x(e, t, n, r, a) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), a && (this.response = a);
}
_.inherits(x, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: _.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const sn = x.prototype, cn = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  cn[e] = { value: e };
});
Object.defineProperties(x, cn);
Object.defineProperty(sn, "isAxiosError", { value: !0 });
x.from = (e, t, n, r, a, s) => {
  const c = Object.create(sn);
  return _.toFlatObject(e, c, function(m) {
    return m !== Error.prototype;
  }, (p) => p !== "isAxiosError"), x.call(c, e.message, t, n, r, a), c.cause = e, c.name = e.name, s && Object.assign(c, s), c;
};
const lr = null;
function tt(e) {
  return _.isPlainObject(e) || _.isArray(e);
}
function ln(e) {
  return _.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Pt(e, t, n) {
  return e ? e.concat(t).map(function(a, s) {
    return a = ln(a), !n && s ? "[" + a + "]" : a;
  }).join(n ? "." : "") : t;
}
function ur(e) {
  return _.isArray(e) && !e.some(tt);
}
const dr = _.toFlatObject(_, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function ke(e, t, n) {
  if (!_.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = _.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(T, A) {
    return !_.isUndefined(A[T]);
  });
  const r = n.metaTokens, a = n.visitor || l, s = n.dots, c = n.indexes, m = (n.Blob || typeof Blob < "u" && Blob) && _.isSpecCompliantForm(t);
  if (!_.isFunction(a))
    throw new TypeError("visitor must be a function");
  function d(g) {
    if (g === null)
      return "";
    if (_.isDate(g))
      return g.toISOString();
    if (!m && _.isBlob(g))
      throw new x("Blob is not supported. Use a Buffer instead.");
    return _.isArrayBuffer(g) || _.isTypedArray(g) ? m && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function l(g, T, A) {
    let O = g;
    if (g && !A && typeof g == "object") {
      if (_.endsWith(T, "{}"))
        T = r ? T : T.slice(0, -2), g = JSON.stringify(g);
      else if (_.isArray(g) && ur(g) || (_.isFileList(g) || _.endsWith(T, "[]")) && (O = _.toArray(g)))
        return T = ln(T), O.forEach(function(N, F) {
          !(_.isUndefined(N) || N === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            c === !0 ? Pt([T], F, s) : c === null ? T : T + "[]",
            d(N)
          );
        }), !1;
    }
    return tt(g) ? !0 : (t.append(Pt(A, T, s), d(g)), !1);
  }
  const u = [], w = Object.assign(dr, {
    defaultVisitor: l,
    convertValue: d,
    isVisitable: tt
  });
  function f(g, T) {
    if (!_.isUndefined(g)) {
      if (u.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + T.join("."));
      u.push(g), _.forEach(g, function(O, S) {
        (!(_.isUndefined(O) || O === null) && a.call(
          t,
          O,
          _.isString(S) ? S.trim() : S,
          T,
          w
        )) === !0 && f(O, T ? T.concat(S) : [S]);
      }), u.pop();
    }
  }
  if (!_.isObject(e))
    throw new TypeError("data must be an object");
  return f(e), t;
}
function Lt(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function ut(e, t) {
  this._pairs = [], e && ke(e, this, t);
}
const un = ut.prototype;
un.append = function(t, n) {
  this._pairs.push([t, n]);
};
un.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Lt);
  } : Lt;
  return this._pairs.map(function(a) {
    return n(a[0]) + "=" + n(a[1]);
  }, "").join("&");
};
function fr(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function dn(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || fr, a = n && n.serialize;
  let s;
  if (a ? s = a(t, n) : s = _.isURLSearchParams(t) ? t.toString() : new ut(t, n).toString(r), s) {
    const c = e.indexOf("#");
    c !== -1 && (e = e.slice(0, c)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class mr {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    _.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Ft = mr, fn = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, hr = typeof URLSearchParams < "u" ? URLSearchParams : ut, pr = FormData, yr = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), br = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), te = {
  isBrowser: !0,
  classes: {
    URLSearchParams: hr,
    FormData: pr,
    Blob
  },
  isStandardBrowserEnv: yr,
  isStandardBrowserWebWorkerEnv: br,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function gr(e, t) {
  return ke(e, new te.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, a, s) {
      return te.isNode && _.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function wr(e) {
  return _.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Tr(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const a = n.length;
  let s;
  for (r = 0; r < a; r++)
    s = n[r], t[s] = e[s];
  return t;
}
function mn(e) {
  function t(n, r, a, s) {
    let c = n[s++];
    const p = Number.isFinite(+c), m = s >= n.length;
    return c = !c && _.isArray(a) ? a.length : c, m ? (_.hasOwnProp(a, c) ? a[c] = [a[c], r] : a[c] = r, !p) : ((!a[c] || !_.isObject(a[c])) && (a[c] = []), t(n, r, a[c], s) && _.isArray(a[c]) && (a[c] = Tr(a[c])), !p);
  }
  if (_.isFormData(e) && _.isFunction(e.entries)) {
    const n = {};
    return _.forEachEntry(e, (r, a) => {
      t(wr(r), a, n, 0);
    }), n;
  }
  return null;
}
const _r = {
  "Content-Type": void 0
};
function Er(e, t, n) {
  if (_.isString(e))
    try {
      return (t || JSON.parse)(e), _.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const Ue = {
  transitional: fn,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", a = r.indexOf("application/json") > -1, s = _.isObject(t);
    if (s && _.isHTMLForm(t) && (t = new FormData(t)), _.isFormData(t))
      return a && a ? JSON.stringify(mn(t)) : t;
    if (_.isArrayBuffer(t) || _.isBuffer(t) || _.isStream(t) || _.isFile(t) || _.isBlob(t))
      return t;
    if (_.isArrayBufferView(t))
      return t.buffer;
    if (_.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let p;
    if (s) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return gr(t, this.formSerializer).toString();
      if ((p = _.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const m = this.env && this.env.FormData;
        return ke(
          p ? { "files[]": t } : t,
          m && new m(),
          this.formSerializer
        );
      }
    }
    return s || a ? (n.setContentType("application/json", !1), Er(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Ue.transitional, r = n && n.forcedJSONParsing, a = this.responseType === "json";
    if (t && _.isString(t) && (r && !this.responseType || a)) {
      const c = !(n && n.silentJSONParsing) && a;
      try {
        return JSON.parse(t);
      } catch (p) {
        if (c)
          throw p.name === "SyntaxError" ? x.from(p, x.ERR_BAD_RESPONSE, this, null, this.response) : p;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: te.classes.FormData,
    Blob: te.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
_.forEach(["delete", "get", "head"], function(t) {
  Ue.headers[t] = {};
});
_.forEach(["post", "put", "patch"], function(t) {
  Ue.headers[t] = _.merge(_r);
});
const dt = Ue, vr = _.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Ar = (e) => {
  const t = {};
  let n, r, a;
  return e && e.split(`
`).forEach(function(c) {
    a = c.indexOf(":"), n = c.substring(0, a).trim().toLowerCase(), r = c.substring(a + 1).trim(), !(!n || t[n] && vr[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, Bt = Symbol("internals");
function _e(e) {
  return e && String(e).trim().toLowerCase();
}
function Pe(e) {
  return e === !1 || e == null ? e : _.isArray(e) ? e.map(Pe) : String(e);
}
function Cr(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
function Rr(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function ze(e, t, n, r) {
  if (_.isFunction(r))
    return r.call(this, t, n);
  if (_.isString(t)) {
    if (_.isString(r))
      return t.indexOf(r) !== -1;
    if (_.isRegExp(r))
      return r.test(t);
  }
}
function Sr(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Ir(e, t) {
  const n = _.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(a, s, c) {
        return this[r].call(this, t, a, s, c);
      },
      configurable: !0
    });
  });
}
class qe {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const a = this;
    function s(p, m, d) {
      const l = _e(m);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const u = _.findKey(a, l);
      (!u || a[u] === void 0 || d === !0 || d === void 0 && a[u] !== !1) && (a[u || m] = Pe(p));
    }
    const c = (p, m) => _.forEach(p, (d, l) => s(d, l, m));
    return _.isPlainObject(t) || t instanceof this.constructor ? c(t, n) : _.isString(t) && (t = t.trim()) && !Rr(t) ? c(Ar(t), n) : t != null && s(n, t, r), this;
  }
  get(t, n) {
    if (t = _e(t), t) {
      const r = _.findKey(this, t);
      if (r) {
        const a = this[r];
        if (!n)
          return a;
        if (n === !0)
          return Cr(a);
        if (_.isFunction(n))
          return n.call(this, a, r);
        if (_.isRegExp(n))
          return n.exec(a);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = _e(t), t) {
      const r = _.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || ze(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let a = !1;
    function s(c) {
      if (c = _e(c), c) {
        const p = _.findKey(r, c);
        p && (!n || ze(r, r[p], p, n)) && (delete r[p], a = !0);
      }
    }
    return _.isArray(t) ? t.forEach(s) : s(t), a;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, a = !1;
    for (; r--; ) {
      const s = n[r];
      (!t || ze(this, this[s], s, t)) && (delete this[s], a = !0);
    }
    return a;
  }
  normalize(t) {
    const n = this, r = {};
    return _.forEach(this, (a, s) => {
      const c = _.findKey(r, s);
      if (c) {
        n[c] = Pe(a), delete n[s];
        return;
      }
      const p = t ? Sr(s) : String(s).trim();
      p !== s && delete n[s], n[p] = Pe(a), r[p] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return _.forEach(this, (r, a) => {
      r != null && r !== !1 && (n[a] = t && _.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((a) => r.set(a)), r;
  }
  static accessor(t) {
    const r = (this[Bt] = this[Bt] = {
      accessors: {}
    }).accessors, a = this.prototype;
    function s(c) {
      const p = _e(c);
      r[p] || (Ir(a, c), r[p] = !0);
    }
    return _.isArray(t) ? t.forEach(s) : s(t), this;
  }
}
qe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
_.freezeMethods(qe.prototype);
_.freezeMethods(qe);
const ie = qe;
function Xe(e, t) {
  const n = this || dt, r = t || n, a = ie.from(r.headers);
  let s = r.data;
  return _.forEach(e, function(p) {
    s = p.call(n, s, a.normalize(), t ? t.status : void 0);
  }), a.normalize(), s;
}
function hn(e) {
  return !!(e && e.__CANCEL__);
}
function Oe(e, t, n) {
  x.call(this, e ?? "canceled", x.ERR_CANCELED, t, n), this.name = "CanceledError";
}
_.inherits(Oe, x, {
  __CANCEL__: !0
});
function Or(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new x(
    "Request failed with status code " + n.status,
    [x.ERR_BAD_REQUEST, x.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const Nr = te.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(n, r, a, s, c, p) {
        const m = [];
        m.push(n + "=" + encodeURIComponent(r)), _.isNumber(a) && m.push("expires=" + new Date(a).toGMTString()), _.isString(s) && m.push("path=" + s), _.isString(c) && m.push("domain=" + c), p === !0 && m.push("secure"), document.cookie = m.join("; ");
      },
      read: function(n) {
        const r = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
        return r ? decodeURIComponent(r[3]) : null;
      },
      remove: function(n) {
        this.write(n, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function Dr(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Pr(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function pn(e, t) {
  return e && !Dr(t) ? Pr(e, t) : t;
}
const Lr = te.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    let r;
    function a(s) {
      let c = s;
      return t && (n.setAttribute("href", c), c = n.href), n.setAttribute("href", c), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return r = a(window.location.href), function(c) {
      const p = _.isString(c) ? a(c) : c;
      return p.protocol === r.protocol && p.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function Fr(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Br(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let a = 0, s = 0, c;
  return t = t !== void 0 ? t : 1e3, function(m) {
    const d = Date.now(), l = r[s];
    c || (c = d), n[a] = m, r[a] = d;
    let u = s, w = 0;
    for (; u !== a; )
      w += n[u++], u = u % e;
    if (a = (a + 1) % e, a === s && (s = (s + 1) % e), d - c < t)
      return;
    const f = l && d - l;
    return f ? Math.round(w * 1e3 / f) : void 0;
  };
}
function xt(e, t) {
  let n = 0;
  const r = Br(50, 250);
  return (a) => {
    const s = a.loaded, c = a.lengthComputable ? a.total : void 0, p = s - n, m = r(p), d = s <= c;
    n = s;
    const l = {
      loaded: s,
      total: c,
      progress: c ? s / c : void 0,
      bytes: p,
      rate: m || void 0,
      estimated: m && c && d ? (c - s) / m : void 0,
      event: a
    };
    l[t ? "download" : "upload"] = !0, e(l);
  };
}
const xr = typeof XMLHttpRequest < "u", Mr = xr && function(e) {
  return new Promise(function(n, r) {
    let a = e.data;
    const s = ie.from(e.headers).normalize(), c = e.responseType;
    let p;
    function m() {
      e.cancelToken && e.cancelToken.unsubscribe(p), e.signal && e.signal.removeEventListener("abort", p);
    }
    _.isFormData(a) && (te.isStandardBrowserEnv || te.isStandardBrowserWebWorkerEnv) && s.setContentType(!1);
    let d = new XMLHttpRequest();
    if (e.auth) {
      const f = e.auth.username || "", g = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      s.set("Authorization", "Basic " + btoa(f + ":" + g));
    }
    const l = pn(e.baseURL, e.url);
    d.open(e.method.toUpperCase(), dn(l, e.params, e.paramsSerializer), !0), d.timeout = e.timeout;
    function u() {
      if (!d)
        return;
      const f = ie.from(
        "getAllResponseHeaders" in d && d.getAllResponseHeaders()
      ), T = {
        data: !c || c === "text" || c === "json" ? d.responseText : d.response,
        status: d.status,
        statusText: d.statusText,
        headers: f,
        config: e,
        request: d
      };
      Or(function(O) {
        n(O), m();
      }, function(O) {
        r(O), m();
      }, T), d = null;
    }
    if ("onloadend" in d ? d.onloadend = u : d.onreadystatechange = function() {
      !d || d.readyState !== 4 || d.status === 0 && !(d.responseURL && d.responseURL.indexOf("file:") === 0) || setTimeout(u);
    }, d.onabort = function() {
      d && (r(new x("Request aborted", x.ECONNABORTED, e, d)), d = null);
    }, d.onerror = function() {
      r(new x("Network Error", x.ERR_NETWORK, e, d)), d = null;
    }, d.ontimeout = function() {
      let g = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const T = e.transitional || fn;
      e.timeoutErrorMessage && (g = e.timeoutErrorMessage), r(new x(
        g,
        T.clarifyTimeoutError ? x.ETIMEDOUT : x.ECONNABORTED,
        e,
        d
      )), d = null;
    }, te.isStandardBrowserEnv) {
      const f = (e.withCredentials || Lr(l)) && e.xsrfCookieName && Nr.read(e.xsrfCookieName);
      f && s.set(e.xsrfHeaderName, f);
    }
    a === void 0 && s.setContentType(null), "setRequestHeader" in d && _.forEach(s.toJSON(), function(g, T) {
      d.setRequestHeader(T, g);
    }), _.isUndefined(e.withCredentials) || (d.withCredentials = !!e.withCredentials), c && c !== "json" && (d.responseType = e.responseType), typeof e.onDownloadProgress == "function" && d.addEventListener("progress", xt(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && d.upload && d.upload.addEventListener("progress", xt(e.onUploadProgress)), (e.cancelToken || e.signal) && (p = (f) => {
      d && (r(!f || f.type ? new Oe(null, e, d) : f), d.abort(), d = null);
    }, e.cancelToken && e.cancelToken.subscribe(p), e.signal && (e.signal.aborted ? p() : e.signal.addEventListener("abort", p)));
    const w = Fr(l);
    if (w && te.protocols.indexOf(w) === -1) {
      r(new x("Unsupported protocol " + w + ":", x.ERR_BAD_REQUEST, e));
      return;
    }
    d.send(a || null);
  });
}, Le = {
  http: lr,
  xhr: Mr
};
_.forEach(Le, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const kr = {
  getAdapter: (e) => {
    e = _.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    for (let a = 0; a < t && (n = e[a], !(r = _.isString(n) ? Le[n.toLowerCase()] : n)); a++)
      ;
    if (!r)
      throw r === !1 ? new x(
        `Adapter ${n} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        _.hasOwnProp(Le, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`
      );
    if (!_.isFunction(r))
      throw new TypeError("adapter is not a function");
    return r;
  },
  adapters: Le
};
function Ye(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Oe(null, e);
}
function Mt(e) {
  return Ye(e), e.headers = ie.from(e.headers), e.data = Xe.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), kr.getAdapter(e.adapter || dt.adapter)(e).then(function(r) {
    return Ye(e), r.data = Xe.call(
      e,
      e.transformResponse,
      r
    ), r.headers = ie.from(r.headers), r;
  }, function(r) {
    return hn(r) || (Ye(e), r && r.response && (r.response.data = Xe.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = ie.from(r.response.headers))), Promise.reject(r);
  });
}
const kt = (e) => e instanceof ie ? e.toJSON() : e;
function he(e, t) {
  t = t || {};
  const n = {};
  function r(d, l, u) {
    return _.isPlainObject(d) && _.isPlainObject(l) ? _.merge.call({ caseless: u }, d, l) : _.isPlainObject(l) ? _.merge({}, l) : _.isArray(l) ? l.slice() : l;
  }
  function a(d, l, u) {
    if (_.isUndefined(l)) {
      if (!_.isUndefined(d))
        return r(void 0, d, u);
    } else
      return r(d, l, u);
  }
  function s(d, l) {
    if (!_.isUndefined(l))
      return r(void 0, l);
  }
  function c(d, l) {
    if (_.isUndefined(l)) {
      if (!_.isUndefined(d))
        return r(void 0, d);
    } else
      return r(void 0, l);
  }
  function p(d, l, u) {
    if (u in t)
      return r(d, l);
    if (u in e)
      return r(void 0, d);
  }
  const m = {
    url: s,
    method: s,
    data: s,
    baseURL: c,
    transformRequest: c,
    transformResponse: c,
    paramsSerializer: c,
    timeout: c,
    timeoutMessage: c,
    withCredentials: c,
    adapter: c,
    responseType: c,
    xsrfCookieName: c,
    xsrfHeaderName: c,
    onUploadProgress: c,
    onDownloadProgress: c,
    decompress: c,
    maxContentLength: c,
    maxBodyLength: c,
    beforeRedirect: c,
    transport: c,
    httpAgent: c,
    httpsAgent: c,
    cancelToken: c,
    socketPath: c,
    responseEncoding: c,
    validateStatus: p,
    headers: (d, l) => a(kt(d), kt(l), !0)
  };
  return _.forEach(Object.keys(e).concat(Object.keys(t)), function(l) {
    const u = m[l] || a, w = u(e[l], t[l], l);
    _.isUndefined(w) && u !== p || (n[l] = w);
  }), n;
}
const yn = "1.3.2", ft = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  ft[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Ut = {};
ft.transitional = function(t, n, r) {
  function a(s, c) {
    return "[Axios v" + yn + "] Transitional option '" + s + "'" + c + (r ? ". " + r : "");
  }
  return (s, c, p) => {
    if (t === !1)
      throw new x(
        a(c, " has been removed" + (n ? " in " + n : "")),
        x.ERR_DEPRECATED
      );
    return n && !Ut[c] && (Ut[c] = !0, console.warn(
      a(
        c,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, c, p) : !0;
  };
};
function Ur(e, t, n) {
  if (typeof e != "object")
    throw new x("options must be an object", x.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let a = r.length;
  for (; a-- > 0; ) {
    const s = r[a], c = t[s];
    if (c) {
      const p = e[s], m = p === void 0 || c(p, s, e);
      if (m !== !0)
        throw new x("option " + s + " must be " + m, x.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new x("Unknown option " + s, x.ERR_BAD_OPTION);
  }
}
const nt = {
  assertOptions: Ur,
  validators: ft
}, ce = nt.validators;
class Be {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Ft(),
      response: new Ft()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = he(this.defaults, n);
    const { transitional: r, paramsSerializer: a, headers: s } = n;
    r !== void 0 && nt.assertOptions(r, {
      silentJSONParsing: ce.transitional(ce.boolean),
      forcedJSONParsing: ce.transitional(ce.boolean),
      clarifyTimeoutError: ce.transitional(ce.boolean)
    }, !1), a !== void 0 && nt.assertOptions(a, {
      encode: ce.function,
      serialize: ce.function
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let c;
    c = s && _.merge(
      s.common,
      s[n.method]
    ), c && _.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (g) => {
        delete s[g];
      }
    ), n.headers = ie.concat(c, s);
    const p = [];
    let m = !0;
    this.interceptors.request.forEach(function(T) {
      typeof T.runWhen == "function" && T.runWhen(n) === !1 || (m = m && T.synchronous, p.unshift(T.fulfilled, T.rejected));
    });
    const d = [];
    this.interceptors.response.forEach(function(T) {
      d.push(T.fulfilled, T.rejected);
    });
    let l, u = 0, w;
    if (!m) {
      const g = [Mt.bind(this), void 0];
      for (g.unshift.apply(g, p), g.push.apply(g, d), w = g.length, l = Promise.resolve(n); u < w; )
        l = l.then(g[u++], g[u++]);
      return l;
    }
    w = p.length;
    let f = n;
    for (u = 0; u < w; ) {
      const g = p[u++], T = p[u++];
      try {
        f = g(f);
      } catch (A) {
        T.call(this, A);
        break;
      }
    }
    try {
      l = Mt.call(this, f);
    } catch (g) {
      return Promise.reject(g);
    }
    for (u = 0, w = d.length; u < w; )
      l = l.then(d[u++], d[u++]);
    return l;
  }
  getUri(t) {
    t = he(this.defaults, t);
    const n = pn(t.baseURL, t.url);
    return dn(n, t.params, t.paramsSerializer);
  }
}
_.forEach(["delete", "get", "head", "options"], function(t) {
  Be.prototype[t] = function(n, r) {
    return this.request(he(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
_.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(s, c, p) {
      return this.request(he(p || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: c
      }));
    };
  }
  Be.prototype[t] = n(), Be.prototype[t + "Form"] = n(!0);
});
const Fe = Be;
class mt {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const r = this;
    this.promise.then((a) => {
      if (!r._listeners)
        return;
      let s = r._listeners.length;
      for (; s-- > 0; )
        r._listeners[s](a);
      r._listeners = null;
    }), this.promise.then = (a) => {
      let s;
      const c = new Promise((p) => {
        r.subscribe(p), s = p;
      }).then(a);
      return c.cancel = function() {
        r.unsubscribe(s);
      }, c;
    }, t(function(s, c, p) {
      r.reason || (r.reason = new Oe(s, c, p), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new mt(function(a) {
        t = a;
      }),
      cancel: t
    };
  }
}
const qr = mt;
function $r(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Vr(e) {
  return _.isObject(e) && e.isAxiosError === !0;
}
const rt = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(rt).forEach(([e, t]) => {
  rt[t] = e;
});
const Hr = rt;
function bn(e) {
  const t = new Fe(e), n = Jt(Fe.prototype.request, t);
  return _.extend(n, Fe.prototype, t, { allOwnKeys: !0 }), _.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(a) {
    return bn(he(e, a));
  }, n;
}
const j = bn(dt);
j.Axios = Fe;
j.CanceledError = Oe;
j.CancelToken = qr;
j.isCancel = hn;
j.VERSION = yn;
j.toFormData = ke;
j.AxiosError = x;
j.Cancel = j.CanceledError;
j.all = function(t) {
  return Promise.all(t);
};
j.spread = $r;
j.isAxiosError = Vr;
j.mergeConfig = he;
j.AxiosHeaders = ie;
j.formToJSON = (e) => mn(_.isHTMLForm(e) ? new FormData(e) : e);
j.HttpStatusCode = Hr;
j.default = j;
const ht = j;
var X = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function jr(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      if (this instanceof r) {
        var a = [null];
        a.push.apply(a, arguments);
        var s = Function.bind.apply(t, a);
        return new s();
      }
      return t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var a = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, a.get ? a : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var pt = {};
const Gr = {}, Wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gr
}, Symbol.toStringTag, { value: "Module" })), H = /* @__PURE__ */ jr(Wr);
var pe = {}, zr = {
  get exports() {
    return pe;
  },
  set exports(e) {
    pe = e;
  }
}, Qe, qt;
function Xr() {
  if (qt)
    return Qe;
  qt = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, a = r * 7, s = r * 365.25;
  Qe = function(l, u) {
    u = u || {};
    var w = typeof l;
    if (w === "string" && l.length > 0)
      return c(l);
    if (w === "number" && isFinite(l))
      return u.long ? m(l) : p(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function c(l) {
    if (l = String(l), !(l.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (u) {
        var w = parseFloat(u[1]), f = (u[2] || "ms").toLowerCase();
        switch (f) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return w * s;
          case "weeks":
          case "week":
          case "w":
            return w * a;
          case "days":
          case "day":
          case "d":
            return w * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return w * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return w * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return w * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return w;
          default:
            return;
        }
      }
    }
  }
  function p(l) {
    var u = Math.abs(l);
    return u >= r ? Math.round(l / r) + "d" : u >= n ? Math.round(l / n) + "h" : u >= t ? Math.round(l / t) + "m" : u >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function m(l) {
    var u = Math.abs(l);
    return u >= r ? d(l, u, r, "day") : u >= n ? d(l, u, n, "hour") : u >= t ? d(l, u, t, "minute") : u >= e ? d(l, u, e, "second") : l + " ms";
  }
  function d(l, u, w, f) {
    var g = u >= w * 1.5;
    return Math.round(l / w) + " " + f + (g ? "s" : "");
  }
  return Qe;
}
function Yr(e) {
  n.debug = n, n.default = n, n.coerce = m, n.disable = s, n.enable = a, n.enabled = c, n.humanize = Xr(), n.destroy = d, Object.keys(e).forEach((l) => {
    n[l] = e[l];
  }), n.names = [], n.skips = [], n.formatters = {};
  function t(l) {
    let u = 0;
    for (let w = 0; w < l.length; w++)
      u = (u << 5) - u + l.charCodeAt(w), u |= 0;
    return n.colors[Math.abs(u) % n.colors.length];
  }
  n.selectColor = t;
  function n(l) {
    let u, w = null, f, g;
    function T(...A) {
      if (!T.enabled)
        return;
      const O = T, S = Number(new Date()), N = S - (u || S);
      O.diff = N, O.prev = u, O.curr = S, u = S, A[0] = n.coerce(A[0]), typeof A[0] != "string" && A.unshift("%O");
      let F = 0;
      A[0] = A[0].replace(/%([a-zA-Z%])/g, (G, M) => {
        if (G === "%%")
          return "%";
        F++;
        const Z = n.formatters[M];
        if (typeof Z == "function") {
          const y = A[F];
          G = Z.call(O, y), A.splice(F, 1), F--;
        }
        return G;
      }), n.formatArgs.call(O, A), (O.log || n.log).apply(O, A);
    }
    return T.namespace = l, T.useColors = n.useColors(), T.color = n.selectColor(l), T.extend = r, T.destroy = n.destroy, Object.defineProperty(T, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => w !== null ? w : (f !== n.namespaces && (f = n.namespaces, g = n.enabled(l)), g),
      set: (A) => {
        w = A;
      }
    }), typeof n.init == "function" && n.init(T), T;
  }
  function r(l, u) {
    const w = n(this.namespace + (typeof u > "u" ? ":" : u) + l);
    return w.log = this.log, w;
  }
  function a(l) {
    n.save(l), n.namespaces = l, n.names = [], n.skips = [];
    let u;
    const w = (typeof l == "string" ? l : "").split(/[\s,]+/), f = w.length;
    for (u = 0; u < f; u++)
      w[u] && (l = w[u].replace(/\*/g, ".*?"), l[0] === "-" ? n.skips.push(new RegExp("^" + l.slice(1) + "$")) : n.names.push(new RegExp("^" + l + "$")));
  }
  function s() {
    const l = [
      ...n.names.map(p),
      ...n.skips.map(p).map((u) => "-" + u)
    ].join(",");
    return n.enable(""), l;
  }
  function c(l) {
    if (l[l.length - 1] === "*")
      return !0;
    let u, w;
    for (u = 0, w = n.skips.length; u < w; u++)
      if (n.skips[u].test(l))
        return !1;
    for (u = 0, w = n.names.length; u < w; u++)
      if (n.names[u].test(l))
        return !0;
    return !1;
  }
  function p(l) {
    return l.toString().substring(2, l.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function m(l) {
    return l instanceof Error ? l.stack || l.message : l;
  }
  function d() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return n.enable(n.load()), n;
}
var Qr = Yr;
(function(e, t) {
  t.formatArgs = r, t.save = a, t.load = s, t.useColors = n, t.storage = c(), t.destroy = (() => {
    let m = !1;
    return () => {
      m || (m = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), t.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function n() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function r(m) {
    if (m[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + m[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
      return;
    const d = "color: " + this.color;
    m.splice(1, 0, d, "color: inherit");
    let l = 0, u = 0;
    m[0].replace(/%[a-zA-Z%]/g, (w) => {
      w !== "%%" && (l++, w === "%c" && (u = l));
    }), m.splice(u, 0, d);
  }
  t.log = console.debug || console.log || (() => {
  });
  function a(m) {
    try {
      m ? t.storage.setItem("debug", m) : t.storage.removeItem("debug");
    } catch {
    }
  }
  function s() {
    let m;
    try {
      m = t.storage.getItem("debug");
    } catch {
    }
    return !m && typeof process < "u" && "env" in process && (m = process.env.DEBUG), m;
  }
  function c() {
    try {
      return localStorage;
    } catch {
    }
  }
  e.exports = Qr(t);
  const { formatters: p } = e.exports;
  p.j = function(m) {
    try {
      return JSON.stringify(m);
    } catch (d) {
      return "[UnexpectedJSONParseError]: " + d.message;
    }
  };
})(zr, pe);
var yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
function Jr(e) {
  return function(t, n) {
    return new Promise((r, a) => {
      e.call(this, t, n, (s, c) => {
        s ? a(s) : r(c);
      });
    });
  };
}
yt.default = Jr;
var gn = X && X.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
const Kr = H, Zr = gn(pe), ei = gn(yt), Ee = Zr.default("agent-base");
function ti(e) {
  return Boolean(e) && typeof e.addRequest == "function";
}
function Je() {
  const { stack: e } = new Error();
  return typeof e != "string" ? !1 : e.split(`
`).some((t) => t.indexOf("(https.js:") !== -1 || t.indexOf("node:https:") !== -1);
}
function xe(e, t) {
  return new xe.Agent(e, t);
}
(function(e) {
  class t extends Kr.EventEmitter {
    constructor(r, a) {
      super();
      let s = a;
      typeof r == "function" ? this.callback = r : r && (s = r), this.timeout = null, s && typeof s.timeout == "number" && (this.timeout = s.timeout), this.maxFreeSockets = 1, this.maxSockets = 1, this.maxTotalSockets = 1 / 0, this.sockets = {}, this.freeSockets = {}, this.requests = {}, this.options = {};
    }
    get defaultPort() {
      return typeof this.explicitDefaultPort == "number" ? this.explicitDefaultPort : Je() ? 443 : 80;
    }
    set defaultPort(r) {
      this.explicitDefaultPort = r;
    }
    get protocol() {
      return typeof this.explicitProtocol == "string" ? this.explicitProtocol : Je() ? "https:" : "http:";
    }
    set protocol(r) {
      this.explicitProtocol = r;
    }
    callback(r, a, s) {
      throw new Error('"agent-base" has no default implementation, you must subclass and override `callback()`');
    }
    /**
     * Called by node-core's "_http_client.js" module when creating
     * a new HTTP request with this Agent instance.
     *
     * @api public
     */
    addRequest(r, a) {
      const s = Object.assign({}, a);
      typeof s.secureEndpoint != "boolean" && (s.secureEndpoint = Je()), s.host == null && (s.host = "localhost"), s.port == null && (s.port = s.secureEndpoint ? 443 : 80), s.protocol == null && (s.protocol = s.secureEndpoint ? "https:" : "http:"), s.host && s.path && delete s.path, delete s.agent, delete s.hostname, delete s._defaultAgent, delete s.defaultPort, delete s.createConnection, r._last = !0, r.shouldKeepAlive = !1;
      let c = !1, p = null;
      const m = s.timeout || this.timeout, d = (f) => {
        r._hadError || (r.emit("error", f), r._hadError = !0);
      }, l = () => {
        p = null, c = !0;
        const f = new Error(`A "socket" was not created for HTTP request before ${m}ms`);
        f.code = "ETIMEOUT", d(f);
      }, u = (f) => {
        c || (p !== null && (clearTimeout(p), p = null), d(f));
      }, w = (f) => {
        if (c)
          return;
        if (p != null && (clearTimeout(p), p = null), ti(f)) {
          Ee("Callback returned another Agent instance %o", f.constructor.name), f.addRequest(r, s);
          return;
        }
        if (f) {
          f.once("free", () => {
            this.freeSocket(f, s);
          }), r.onSocket(f);
          return;
        }
        const g = new Error(`no Duplex stream was returned to agent-base for \`${r.method} ${r.path}\``);
        d(g);
      };
      if (typeof this.callback != "function") {
        d(new Error("`callback` is not defined"));
        return;
      }
      this.promisifiedCallback || (this.callback.length >= 3 ? (Ee("Converting legacy callback function to promise"), this.promisifiedCallback = ei.default(this.callback)) : this.promisifiedCallback = this.callback), typeof m == "number" && m > 0 && (p = setTimeout(l, m)), "port" in s && typeof s.port != "number" && (s.port = Number(s.port));
      try {
        Ee("Resolving socket for %o request: %o", s.protocol, `${r.method} ${r.path}`), Promise.resolve(this.promisifiedCallback(r, s)).then(w, u);
      } catch (f) {
        Promise.reject(f).catch(u);
      }
    }
    freeSocket(r, a) {
      Ee("Freeing socket %o %o", r.constructor.name, a), r.destroy();
    }
    destroy() {
      Ee("Destroying agent %o", this.constructor.name);
    }
  }
  e.Agent = t, e.prototype = e.Agent.prototype;
})(xe || (xe = {}));
var ni = xe, bt = {}, ri = X && X.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(bt, "__esModule", { value: !0 });
const ii = ri(pe), ve = ii.default("https-proxy-agent:parse-proxy-response");
function ai(e) {
  return new Promise((t, n) => {
    let r = 0;
    const a = [];
    function s() {
      const u = e.read();
      u ? l(u) : e.once("readable", s);
    }
    function c() {
      e.removeListener("end", m), e.removeListener("error", d), e.removeListener("close", p), e.removeListener("readable", s);
    }
    function p(u) {
      ve("onclose had error %o", u);
    }
    function m() {
      ve("onend");
    }
    function d(u) {
      c(), ve("onerror %o", u), n(u);
    }
    function l(u) {
      a.push(u), r += u.length;
      const w = Buffer.concat(a, r);
      if (w.indexOf(`\r
\r
`) === -1) {
        ve("have not received end of HTTP headers yet..."), s();
        return;
      }
      const g = w.toString("ascii", 0, w.indexOf(`\r
`)), T = +g.split(" ")[1];
      ve("got proxy server response: %o", g), t({
        statusCode: T,
        buffered: w
      });
    }
    e.on("error", d), e.on("close", p), e.on("end", m), s();
  });
}
bt.default = ai;
var oi = X && X.__awaiter || function(e, t, n, r) {
  function a(s) {
    return s instanceof n ? s : new n(function(c) {
      c(s);
    });
  }
  return new (n || (n = Promise))(function(s, c) {
    function p(l) {
      try {
        d(r.next(l));
      } catch (u) {
        c(u);
      }
    }
    function m(l) {
      try {
        d(r.throw(l));
      } catch (u) {
        c(u);
      }
    }
    function d(l) {
      l.done ? s(l.value) : a(l.value).then(p, m);
    }
    d((r = r.apply(e, t || [])).next());
  });
}, be = X && X.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(pt, "__esModule", { value: !0 });
const $t = be(H), Vt = be(H), si = be(H), ci = be(H), li = be(pe), ui = ni, di = be(bt), Ae = li.default("https-proxy-agent:agent");
let fi = class extends ui.Agent {
  constructor(t) {
    let n;
    if (typeof t == "string" ? n = si.default.parse(t) : n = t, !n)
      throw new Error("an HTTP(S) proxy server `host` and `port` must be specified!");
    Ae("creating new HttpsProxyAgent instance: %o", n), super(n);
    const r = Object.assign({}, n);
    this.secureProxy = n.secureProxy || pi(r.protocol), r.host = r.hostname || r.host, typeof r.port == "string" && (r.port = parseInt(r.port, 10)), !r.port && r.host && (r.port = this.secureProxy ? 443 : 80), this.secureProxy && !("ALPNProtocols" in r) && (r.ALPNProtocols = ["http 1.1"]), r.host && r.path && (delete r.path, delete r.pathname), this.proxy = r;
  }
  /**
   * Called when the node-core HTTP client library is creating a
   * new HTTP request.
   *
   * @api protected
   */
  callback(t, n) {
    return oi(this, void 0, void 0, function* () {
      const { proxy: r, secureProxy: a } = this;
      let s;
      a ? (Ae("Creating `tls.Socket`: %o", r), s = Vt.default.connect(r)) : (Ae("Creating `net.Socket`: %o", r), s = $t.default.connect(r));
      const c = Object.assign({}, r.headers);
      let m = `CONNECT ${`${n.host}:${n.port}`} HTTP/1.1\r
`;
      r.auth && (c["Proxy-Authorization"] = `Basic ${Buffer.from(r.auth).toString("base64")}`);
      let { host: d, port: l, secureEndpoint: u } = n;
      hi(l, u) || (d += `:${l}`), c.Host = d, c.Connection = "close";
      for (const A of Object.keys(c))
        m += `${A}: ${c[A]}\r
`;
      const w = di.default(s);
      s.write(`${m}\r
`);
      const { statusCode: f, buffered: g } = yield w;
      if (f === 200) {
        if (t.once("socket", mi), n.secureEndpoint) {
          Ae("Upgrading socket connection to TLS");
          const A = n.servername || n.host;
          return Vt.default.connect(Object.assign(Object.assign({}, yi(n, "host", "hostname", "path", "port")), {
            socket: s,
            servername: A
          }));
        }
        return s;
      }
      s.destroy();
      const T = new $t.default.Socket({ writable: !1 });
      return T.readable = !0, t.once("socket", (A) => {
        Ae("replaying proxy buffer for failed request"), ci.default(A.listenerCount("data") > 0), A.push(g), A.push(null);
      }), T;
    });
  }
};
pt.default = fi;
function mi(e) {
  e.resume();
}
function hi(e, t) {
  return Boolean(!t && e === 80 || t && e === 443);
}
function pi(e) {
  return typeof e == "string" ? /^https:?$/i.test(e) : !1;
}
function yi(e, ...t) {
  const n = {};
  let r;
  for (r in e)
    t.includes(r) || (n[r] = e[r]);
  return n;
}
var bi = X && X.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
const it = bi(pt);
function at(e) {
  return new it.default(e);
}
(function(e) {
  e.HttpsProxyAgent = it.default, e.prototype = it.default.prototype;
})(at || (at = {}));
var Ht = at;
const wn = /* @__PURE__ */ Nn({
  __proto__: null,
  default: Ht
}, [Ht]);
class gi {
  constructor(t) {
    this.userAgent = "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet", t && t.agent && (this.agent = wn(t.agent));
  }
  async detail(t) {
    const n = `https://api2.musical.ly/aweme/v1/feed/?aweme_id=${t}&version_code=262&app_name=musical_ly&channel=App&device_id=null&os_version=14.4.2&device_platform=iphone&device_type=iPhone9&region=US&carrier_region=US`;
    return await ht.get(n, {
      timeout: 3e4,
      headers: { "user-agent": this.userAgent },
      httpsAgent: this.agent
    }).then(async ({ data: r }) => {
      const a = r.aweme_list.find(
        (s) => s.aweme_id == t
      );
      return this.parseMeta(a);
    });
  }
  parseMeta(t) {
    const { video: n, statistics: r, author: a } = t;
    return {
      id: t.aweme_id,
      // ID
      url: `https://www.tiktok.com/@${a.unique_id}/video/${t.aweme_id}`,
      // 访问地址
      title: t.preview_title || "",
      // 标题
      description: t.desc,
      // 描述
      tags: t.text_extra.map((c) => c.hashtag_name),
      // 标签
      category: "",
      // 分类
      created_at: ot(t.create_time),
      // 发布日期
      video: {
        quality: n.ratio,
        //质量标签
        width: n.width,
        // 宽度
        height: n.height,
        // 高度
        duration: Math.floor(n.duration / 1e3),
        // 秒长
        cover_url: n.cover.url_list[0],
        // 封面地址，有时效
        video_url: n.play_addr.url_list[0]
        // 无水印视频地址，有时效
      },
      stats: {
        view: r.play_count,
        // 播放
        likes: r.digg_count,
        // 喜欢
        comment: r.comment_count,
        // 评论
        favourite: r.collect_count,
        // 收藏
        share: r.share_count
        // 转发
      },
      author: {
        id: a.uid,
        // 频道ID
        name: a.nickname,
        // 频道名称
        avatar_url: a.avatar_medium.url_list[0],
        // 频道头像，有时效
        channel_url: `https://www.tiktok.com/@${a.unique_id}`,
        // 频道访问地址
        subscriber_count: a.favoriting_count
        // 订阅人数
      }
    };
  }
}
class wi {
  constructor() {
    this.userAgent = "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet";
  }
  async detail(t) {
    const n = `https://www.iesdouyin.com/aweme/v1/web/aweme/detail/?aweme_id=${t}&aid=1128&version_name=23.5.0&device_platform=android&os_version=2333`;
    return await ht.get(n, { headers: { "user-agent": this.userAgent } }).then(async ({ data: r }) => (console.log(r), this.parseMeta(r.aweme_detail)));
  }
  parseMeta(t) {
    const { video: n, statistics: r, author: a } = t;
    return {
      id: t.aweme_id,
      // ID
      url: `https://www.douyin.com/video/${t.aweme_id}`,
      // 访问地址
      title: t.preview_title,
      // 标题
      description: t.desc,
      // 描述
      tags: t.text_extra.map((c) => c.hashtag_name),
      // 标签
      category: "",
      // 分类
      created_at: ot(t.create_time),
      // 发布日期
      video: {
        quality: n.ratio,
        //质量标签
        width: n.width,
        // 宽度
        height: n.height,
        // 高度
        duration: Math.floor(n.duration / 1e3),
        // 秒长
        cover_url: n.cover.url_list[0],
        // 封面地址，有时效
        video_url: n.play_addr.url_list[0]
        // 无水印视频地址，有时效
      },
      stats: {
        view: r.play_count,
        // 播放
        likes: r.digg_count,
        // 喜欢
        comment: r.comment_count,
        // 评论
        favourite: r.collect_count,
        // 收藏
        share: r.share_count
        // 转发
      },
      author: {
        id: a.uid,
        // 频道ID
        name: a.nickname,
        // 频道名称
        avatar_url: a.avatar_thumb.url_list[0],
        // 频道头像，有时效
        channel_url: `https://www.douyin.com/user/${a.sec_uid}`,
        // 频道访问地址
        subscriber_count: a.favoriting_count
        // 订阅人数
      }
    };
  }
}
var Tn = {}, gt = {};
(function(e) {
  (function(t) {
    t.parser = function(o, i) {
      return new r(o, i);
    }, t.SAXParser = r, t.SAXStream = l, t.createStream = d, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var n = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function r(o, i) {
      if (!(this instanceof r))
        return new r(o, i);
      var b = this;
      s(b), b.q = b.c = "", b.bufferCheckPosition = t.MAX_BUFFER_LENGTH, b.opt = i || {}, b.opt.lowercase = b.opt.lowercase || b.opt.lowercasetags, b.looseCase = b.opt.lowercase ? "toLowerCase" : "toUpperCase", b.tags = [], b.closed = b.closedRoot = b.sawRoot = !1, b.tag = b.error = null, b.strict = !!o, b.noscript = !!(o || b.opt.noscript), b.state = y.BEGIN, b.strictEntities = b.opt.strictEntities, b.ENTITIES = b.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), b.attribList = [], b.opt.xmlns && (b.ns = Object.create(T)), b.trackPosition = b.opt.position !== !1, b.trackPosition && (b.position = b.line = b.column = 0), P(b, "onready");
    }
    Object.create || (Object.create = function(o) {
      function i() {
      }
      i.prototype = o;
      var b = new i();
      return b;
    }), Object.keys || (Object.keys = function(o) {
      var i = [];
      for (var b in o)
        o.hasOwnProperty(b) && i.push(b);
      return i;
    });
    function a(o) {
      for (var i = Math.max(t.MAX_BUFFER_LENGTH, 10), b = 0, h = 0, R = n.length; h < R; h++) {
        var B = o[n[h]].length;
        if (B > i)
          switch (n[h]) {
            case "textNode":
              U(o);
              break;
            case "cdata":
              I(o, "oncdata", o.cdata), o.cdata = "";
              break;
            case "script":
              I(o, "onscript", o.script), o.script = "";
              break;
            default:
              Q(o, "Max buffer length exceeded: " + n[h]);
          }
        b = Math.max(b, B);
      }
      var L = t.MAX_BUFFER_LENGTH - b;
      o.bufferCheckPosition = L + o.position;
    }
    function s(o) {
      for (var i = 0, b = n.length; i < b; i++)
        o[n[i]] = "";
    }
    function c(o) {
      U(o), o.cdata !== "" && (I(o, "oncdata", o.cdata), o.cdata = ""), o.script !== "" && (I(o, "onscript", o.script), o.script = "");
    }
    r.prototype = {
      end: function() {
        q(this);
      },
      write: E,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        c(this);
      }
    };
    var p;
    try {
      p = H.Stream;
    } catch {
      p = function() {
      };
    }
    var m = t.EVENTS.filter(function(o) {
      return o !== "error" && o !== "end";
    });
    function d(o, i) {
      return new l(o, i);
    }
    function l(o, i) {
      if (!(this instanceof l))
        return new l(o, i);
      p.apply(this), this._parser = new r(o, i), this.writable = !0, this.readable = !0;
      var b = this;
      this._parser.onend = function() {
        b.emit("end");
      }, this._parser.onerror = function(h) {
        b.emit("error", h), b._parser.error = null;
      }, this._decoder = null, m.forEach(function(h) {
        Object.defineProperty(b, "on" + h, {
          get: function() {
            return b._parser["on" + h];
          },
          set: function(R) {
            if (!R)
              return b.removeAllListeners(h), b._parser["on" + h] = R, R;
            b.on(h, R);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    l.prototype = Object.create(p.prototype, {
      constructor: {
        value: l
      }
    }), l.prototype.write = function(o) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(o)) {
        if (!this._decoder) {
          var i = H.StringDecoder;
          this._decoder = new i("utf8");
        }
        o = this._decoder.write(o);
      }
      return this._parser.write(o.toString()), this.emit("data", o), !0;
    }, l.prototype.end = function(o) {
      return o && o.length && this.write(o), this._parser.end(), !0;
    }, l.prototype.on = function(o, i) {
      var b = this;
      return !b._parser["on" + o] && m.indexOf(o) !== -1 && (b._parser["on" + o] = function() {
        var h = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        h.splice(0, 0, o), b.emit.apply(b, h);
      }), p.prototype.on.call(b, o, i);
    };
    var u = "[CDATA[", w = "DOCTYPE", f = "http://www.w3.org/XML/1998/namespace", g = "http://www.w3.org/2000/xmlns/", T = { xml: f, xmlns: g }, A = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, O = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, S = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, N = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function F(o) {
      return o === " " || o === `
` || o === "\r" || o === "	";
    }
    function V(o) {
      return o === '"' || o === "'";
    }
    function G(o) {
      return o === ">" || F(o);
    }
    function M(o, i) {
      return o.test(i);
    }
    function Z(o, i) {
      return !M(o, i);
    }
    var y = 0;
    t.STATE = {
      BEGIN: y++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: y++,
      // leading whitespace
      TEXT: y++,
      // general stuff
      TEXT_ENTITY: y++,
      // &amp and such.
      OPEN_WAKA: y++,
      // <
      SGML_DECL: y++,
      // <!BLARG
      SGML_DECL_QUOTED: y++,
      // <!BLARG foo "bar
      DOCTYPE: y++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: y++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: y++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: y++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: y++,
      // <!-
      COMMENT: y++,
      // <!--
      COMMENT_ENDING: y++,
      // <!-- blah -
      COMMENT_ENDED: y++,
      // <!-- blah --
      CDATA: y++,
      // <![CDATA[ something
      CDATA_ENDING: y++,
      // ]
      CDATA_ENDING_2: y++,
      // ]]
      PROC_INST: y++,
      // <?hi
      PROC_INST_BODY: y++,
      // <?hi there
      PROC_INST_ENDING: y++,
      // <?hi "there" ?
      OPEN_TAG: y++,
      // <strong
      OPEN_TAG_SLASH: y++,
      // <strong /
      ATTRIB: y++,
      // <a
      ATTRIB_NAME: y++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: y++,
      // <a foo _
      ATTRIB_VALUE: y++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: y++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: y++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: y++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: y++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: y++,
      // <foo bar=&quot
      CLOSE_TAG: y++,
      // </a
      CLOSE_TAG_SAW_WHITE: y++,
      // </a   >
      SCRIPT: y++,
      // <script> ...
      SCRIPT_ENDING: y++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(o) {
      var i = t.ENTITIES[o], b = typeof i == "number" ? String.fromCharCode(i) : i;
      t.ENTITIES[o] = b;
    });
    for (var D in t.STATE)
      t.STATE[t.STATE[D]] = D;
    y = t.STATE;
    function P(o, i, b) {
      o[i] && o[i](b);
    }
    function I(o, i, b) {
      o.textNode && U(o), P(o, i, b);
    }
    function U(o) {
      o.textNode = k(o.opt, o.textNode), o.textNode && P(o, "ontext", o.textNode), o.textNode = "";
    }
    function k(o, i) {
      return o.trim && (i = i.trim()), o.normalize && (i = i.replace(/\s+/g, " ")), i;
    }
    function Q(o, i) {
      return U(o), o.trackPosition && (i += `
Line: ` + o.line + `
Column: ` + o.column + `
Char: ` + o.c), i = new Error(i), o.error = i, P(o, "onerror", i), o;
    }
    function q(o) {
      return o.sawRoot && !o.closedRoot && v(o, "Unclosed root tag"), o.state !== y.BEGIN && o.state !== y.BEGIN_WHITESPACE && o.state !== y.TEXT && Q(o, "Unexpected end"), U(o), o.c = "", o.closed = !0, P(o, "onend"), r.call(o, o.strict, o.opt), o;
    }
    function v(o, i) {
      if (typeof o != "object" || !(o instanceof r))
        throw new Error("bad call to strictFail");
      o.strict && Q(o, i);
    }
    function z(o) {
      o.strict || (o.tagName = o.tagName[o.looseCase]());
      var i = o.tags[o.tags.length - 1] || o, b = o.tag = { name: o.tagName, attributes: {} };
      o.opt.xmlns && (b.ns = i.ns), o.attribList.length = 0, I(o, "onopentagstart", b);
    }
    function se(o, i) {
      var b = o.indexOf(":"), h = b < 0 ? ["", o] : o.split(":"), R = h[0], B = h[1];
      return i && o === "xmlns" && (R = "xmlns", B = ""), { prefix: R, local: B };
    }
    function we(o) {
      if (o.strict || (o.attribName = o.attribName[o.looseCase]()), o.attribList.indexOf(o.attribName) !== -1 || o.tag.attributes.hasOwnProperty(o.attribName)) {
        o.attribName = o.attribValue = "";
        return;
      }
      if (o.opt.xmlns) {
        var i = se(o.attribName, !0), b = i.prefix, h = i.local;
        if (b === "xmlns")
          if (h === "xml" && o.attribValue !== f)
            v(
              o,
              "xml: prefix must be bound to " + f + `
Actual: ` + o.attribValue
            );
          else if (h === "xmlns" && o.attribValue !== g)
            v(
              o,
              "xmlns: prefix must be bound to " + g + `
Actual: ` + o.attribValue
            );
          else {
            var R = o.tag, B = o.tags[o.tags.length - 1] || o;
            R.ns === B.ns && (R.ns = Object.create(B.ns)), R.ns[h] = o.attribValue;
          }
        o.attribList.push([o.attribName, o.attribValue]);
      } else
        o.tag.attributes[o.attribName] = o.attribValue, I(o, "onattribute", {
          name: o.attribName,
          value: o.attribValue
        });
      o.attribName = o.attribValue = "";
    }
    function ne(o, i) {
      if (o.opt.xmlns) {
        var b = o.tag, h = se(o.tagName);
        b.prefix = h.prefix, b.local = h.local, b.uri = b.ns[h.prefix] || "", b.prefix && !b.uri && (v(o, "Unbound namespace prefix: " + JSON.stringify(o.tagName)), b.uri = h.prefix);
        var R = o.tags[o.tags.length - 1] || o;
        b.ns && R.ns !== b.ns && Object.keys(b.ns).forEach(function(It) {
          I(o, "onopennamespace", {
            prefix: It,
            uri: b.ns[It]
          });
        });
        for (var B = 0, L = o.attribList.length; B < L; B++) {
          var $ = o.attribList[B], J = $[0], fe = $[1], W = se(J, !0), re = W.prefix, On = W.local, St = re === "" ? "" : b.ns[re] || "", Ge = {
            name: J,
            value: fe,
            prefix: re,
            local: On,
            uri: St
          };
          re && re !== "xmlns" && !St && (v(o, "Unbound namespace prefix: " + JSON.stringify(re)), Ge.uri = re), o.tag.attributes[J] = Ge, I(o, "onattribute", Ge);
        }
        o.attribList.length = 0;
      }
      o.tag.isSelfClosing = !!i, o.sawRoot = !0, o.tags.push(o.tag), I(o, "onopentag", o.tag), i || (!o.noscript && o.tagName.toLowerCase() === "script" ? o.state = y.SCRIPT : o.state = y.TEXT, o.tag = null, o.tagName = ""), o.attribName = o.attribValue = "", o.attribList.length = 0;
    }
    function Te(o) {
      if (!o.tagName) {
        v(o, "Weird empty close tag."), o.textNode += "</>", o.state = y.TEXT;
        return;
      }
      if (o.script) {
        if (o.tagName !== "script") {
          o.script += "</" + o.tagName + ">", o.tagName = "", o.state = y.SCRIPT;
          return;
        }
        I(o, "onscript", o.script), o.script = "";
      }
      var i = o.tags.length, b = o.tagName;
      o.strict || (b = b[o.looseCase]());
      for (var h = b; i--; ) {
        var R = o.tags[i];
        if (R.name !== h)
          v(o, "Unexpected close tag");
        else
          break;
      }
      if (i < 0) {
        v(o, "Unmatched closing tag: " + o.tagName), o.textNode += "</" + o.tagName + ">", o.state = y.TEXT;
        return;
      }
      o.tagName = b;
      for (var B = o.tags.length; B-- > i; ) {
        var L = o.tag = o.tags.pop();
        o.tagName = o.tag.name, I(o, "onclosetag", o.tagName);
        var $ = {};
        for (var J in L.ns)
          $[J] = L.ns[J];
        var fe = o.tags[o.tags.length - 1] || o;
        o.opt.xmlns && L.ns !== fe.ns && Object.keys(L.ns).forEach(function(W) {
          var re = L.ns[W];
          I(o, "onclosenamespace", { prefix: W, uri: re });
        });
      }
      i === 0 && (o.closedRoot = !0), o.tagName = o.attribValue = o.attribName = "", o.attribList.length = 0, o.state = y.TEXT;
    }
    function je(o) {
      var i = o.entity, b = i.toLowerCase(), h, R = "";
      return o.ENTITIES[i] ? o.ENTITIES[i] : o.ENTITIES[b] ? o.ENTITIES[b] : (i = b, i.charAt(0) === "#" && (i.charAt(1) === "x" ? (i = i.slice(2), h = parseInt(i, 16), R = h.toString(16)) : (i = i.slice(1), h = parseInt(i, 10), R = h.toString(10))), i = i.replace(/^0+/, ""), isNaN(h) || R.toLowerCase() !== i ? (v(o, "Invalid character entity"), "&" + o.entity + ";") : String.fromCodePoint(h));
    }
    function Ne(o, i) {
      i === "<" ? (o.state = y.OPEN_WAKA, o.startTagPosition = o.position) : F(i) || (v(o, "Non-whitespace before first tag."), o.textNode = i, o.state = y.TEXT);
    }
    function C(o, i) {
      var b = "";
      return i < o.length && (b = o.charAt(i)), b;
    }
    function E(o) {
      var i = this;
      if (this.error)
        throw this.error;
      if (i.closed)
        return Q(
          i,
          "Cannot write after close. Assign an onready handler."
        );
      if (o === null)
        return q(i);
      typeof o == "object" && (o = o.toString());
      for (var b = 0, h = ""; h = C(o, b++), i.c = h, !!h; )
        switch (i.trackPosition && (i.position++, h === `
` ? (i.line++, i.column = 0) : i.column++), i.state) {
          case y.BEGIN:
            if (i.state = y.BEGIN_WHITESPACE, h === "\uFEFF")
              continue;
            Ne(i, h);
            continue;
          case y.BEGIN_WHITESPACE:
            Ne(i, h);
            continue;
          case y.TEXT:
            if (i.sawRoot && !i.closedRoot) {
              for (var R = b - 1; h && h !== "<" && h !== "&"; )
                h = C(o, b++), h && i.trackPosition && (i.position++, h === `
` ? (i.line++, i.column = 0) : i.column++);
              i.textNode += o.substring(R, b - 1);
            }
            h === "<" && !(i.sawRoot && i.closedRoot && !i.strict) ? (i.state = y.OPEN_WAKA, i.startTagPosition = i.position) : (!F(h) && (!i.sawRoot || i.closedRoot) && v(i, "Text data outside of root node."), h === "&" ? i.state = y.TEXT_ENTITY : i.textNode += h);
            continue;
          case y.SCRIPT:
            h === "<" ? i.state = y.SCRIPT_ENDING : i.script += h;
            continue;
          case y.SCRIPT_ENDING:
            h === "/" ? i.state = y.CLOSE_TAG : (i.script += "<" + h, i.state = y.SCRIPT);
            continue;
          case y.OPEN_WAKA:
            if (h === "!")
              i.state = y.SGML_DECL, i.sgmlDecl = "";
            else if (!F(h))
              if (M(A, h))
                i.state = y.OPEN_TAG, i.tagName = h;
              else if (h === "/")
                i.state = y.CLOSE_TAG, i.tagName = "";
              else if (h === "?")
                i.state = y.PROC_INST, i.procInstName = i.procInstBody = "";
              else {
                if (v(i, "Unencoded <"), i.startTagPosition + 1 < i.position) {
                  var B = i.position - i.startTagPosition;
                  h = new Array(B).join(" ") + h;
                }
                i.textNode += "<" + h, i.state = y.TEXT;
              }
            continue;
          case y.SGML_DECL:
            (i.sgmlDecl + h).toUpperCase() === u ? (I(i, "onopencdata"), i.state = y.CDATA, i.sgmlDecl = "", i.cdata = "") : i.sgmlDecl + h === "--" ? (i.state = y.COMMENT, i.comment = "", i.sgmlDecl = "") : (i.sgmlDecl + h).toUpperCase() === w ? (i.state = y.DOCTYPE, (i.doctype || i.sawRoot) && v(
              i,
              "Inappropriately located doctype declaration"
            ), i.doctype = "", i.sgmlDecl = "") : h === ">" ? (I(i, "onsgmldeclaration", i.sgmlDecl), i.sgmlDecl = "", i.state = y.TEXT) : (V(h) && (i.state = y.SGML_DECL_QUOTED), i.sgmlDecl += h);
            continue;
          case y.SGML_DECL_QUOTED:
            h === i.q && (i.state = y.SGML_DECL, i.q = ""), i.sgmlDecl += h;
            continue;
          case y.DOCTYPE:
            h === ">" ? (i.state = y.TEXT, I(i, "ondoctype", i.doctype), i.doctype = !0) : (i.doctype += h, h === "[" ? i.state = y.DOCTYPE_DTD : V(h) && (i.state = y.DOCTYPE_QUOTED, i.q = h));
            continue;
          case y.DOCTYPE_QUOTED:
            i.doctype += h, h === i.q && (i.q = "", i.state = y.DOCTYPE);
            continue;
          case y.DOCTYPE_DTD:
            i.doctype += h, h === "]" ? i.state = y.DOCTYPE : V(h) && (i.state = y.DOCTYPE_DTD_QUOTED, i.q = h);
            continue;
          case y.DOCTYPE_DTD_QUOTED:
            i.doctype += h, h === i.q && (i.state = y.DOCTYPE_DTD, i.q = "");
            continue;
          case y.COMMENT:
            h === "-" ? i.state = y.COMMENT_ENDING : i.comment += h;
            continue;
          case y.COMMENT_ENDING:
            h === "-" ? (i.state = y.COMMENT_ENDED, i.comment = k(i.opt, i.comment), i.comment && I(i, "oncomment", i.comment), i.comment = "") : (i.comment += "-" + h, i.state = y.COMMENT);
            continue;
          case y.COMMENT_ENDED:
            h !== ">" ? (v(i, "Malformed comment"), i.comment += "--" + h, i.state = y.COMMENT) : i.state = y.TEXT;
            continue;
          case y.CDATA:
            h === "]" ? i.state = y.CDATA_ENDING : i.cdata += h;
            continue;
          case y.CDATA_ENDING:
            h === "]" ? i.state = y.CDATA_ENDING_2 : (i.cdata += "]" + h, i.state = y.CDATA);
            continue;
          case y.CDATA_ENDING_2:
            h === ">" ? (i.cdata && I(i, "oncdata", i.cdata), I(i, "onclosecdata"), i.cdata = "", i.state = y.TEXT) : h === "]" ? i.cdata += "]" : (i.cdata += "]]" + h, i.state = y.CDATA);
            continue;
          case y.PROC_INST:
            h === "?" ? i.state = y.PROC_INST_ENDING : F(h) ? i.state = y.PROC_INST_BODY : i.procInstName += h;
            continue;
          case y.PROC_INST_BODY:
            if (!i.procInstBody && F(h))
              continue;
            h === "?" ? i.state = y.PROC_INST_ENDING : i.procInstBody += h;
            continue;
          case y.PROC_INST_ENDING:
            h === ">" ? (I(i, "onprocessinginstruction", {
              name: i.procInstName,
              body: i.procInstBody
            }), i.procInstName = i.procInstBody = "", i.state = y.TEXT) : (i.procInstBody += "?" + h, i.state = y.PROC_INST_BODY);
            continue;
          case y.OPEN_TAG:
            M(O, h) ? i.tagName += h : (z(i), h === ">" ? ne(i) : h === "/" ? i.state = y.OPEN_TAG_SLASH : (F(h) || v(i, "Invalid character in tag name"), i.state = y.ATTRIB));
            continue;
          case y.OPEN_TAG_SLASH:
            h === ">" ? (ne(i, !0), Te(i)) : (v(i, "Forward-slash in opening tag not followed by >"), i.state = y.ATTRIB);
            continue;
          case y.ATTRIB:
            if (F(h))
              continue;
            h === ">" ? ne(i) : h === "/" ? i.state = y.OPEN_TAG_SLASH : M(A, h) ? (i.attribName = h, i.attribValue = "", i.state = y.ATTRIB_NAME) : v(i, "Invalid attribute name");
            continue;
          case y.ATTRIB_NAME:
            h === "=" ? i.state = y.ATTRIB_VALUE : h === ">" ? (v(i, "Attribute without value"), i.attribValue = i.attribName, we(i), ne(i)) : F(h) ? i.state = y.ATTRIB_NAME_SAW_WHITE : M(O, h) ? i.attribName += h : v(i, "Invalid attribute name");
            continue;
          case y.ATTRIB_NAME_SAW_WHITE:
            if (h === "=")
              i.state = y.ATTRIB_VALUE;
            else {
              if (F(h))
                continue;
              v(i, "Attribute without value"), i.tag.attributes[i.attribName] = "", i.attribValue = "", I(i, "onattribute", {
                name: i.attribName,
                value: ""
              }), i.attribName = "", h === ">" ? ne(i) : M(A, h) ? (i.attribName = h, i.state = y.ATTRIB_NAME) : (v(i, "Invalid attribute name"), i.state = y.ATTRIB);
            }
            continue;
          case y.ATTRIB_VALUE:
            if (F(h))
              continue;
            V(h) ? (i.q = h, i.state = y.ATTRIB_VALUE_QUOTED) : (v(i, "Unquoted attribute value"), i.state = y.ATTRIB_VALUE_UNQUOTED, i.attribValue = h);
            continue;
          case y.ATTRIB_VALUE_QUOTED:
            if (h !== i.q) {
              h === "&" ? i.state = y.ATTRIB_VALUE_ENTITY_Q : i.attribValue += h;
              continue;
            }
            we(i), i.q = "", i.state = y.ATTRIB_VALUE_CLOSED;
            continue;
          case y.ATTRIB_VALUE_CLOSED:
            F(h) ? i.state = y.ATTRIB : h === ">" ? ne(i) : h === "/" ? i.state = y.OPEN_TAG_SLASH : M(A, h) ? (v(i, "No whitespace between attributes"), i.attribName = h, i.attribValue = "", i.state = y.ATTRIB_NAME) : v(i, "Invalid attribute name");
            continue;
          case y.ATTRIB_VALUE_UNQUOTED:
            if (!G(h)) {
              h === "&" ? i.state = y.ATTRIB_VALUE_ENTITY_U : i.attribValue += h;
              continue;
            }
            we(i), h === ">" ? ne(i) : i.state = y.ATTRIB;
            continue;
          case y.CLOSE_TAG:
            if (i.tagName)
              h === ">" ? Te(i) : M(O, h) ? i.tagName += h : i.script ? (i.script += "</" + i.tagName, i.tagName = "", i.state = y.SCRIPT) : (F(h) || v(i, "Invalid tagname in closing tag"), i.state = y.CLOSE_TAG_SAW_WHITE);
            else {
              if (F(h))
                continue;
              Z(A, h) ? i.script ? (i.script += "</" + h, i.state = y.SCRIPT) : v(i, "Invalid tagname in closing tag.") : i.tagName = h;
            }
            continue;
          case y.CLOSE_TAG_SAW_WHITE:
            if (F(h))
              continue;
            h === ">" ? Te(i) : v(i, "Invalid characters in closing tag");
            continue;
          case y.TEXT_ENTITY:
          case y.ATTRIB_VALUE_ENTITY_Q:
          case y.ATTRIB_VALUE_ENTITY_U:
            var L, $;
            switch (i.state) {
              case y.TEXT_ENTITY:
                L = y.TEXT, $ = "textNode";
                break;
              case y.ATTRIB_VALUE_ENTITY_Q:
                L = y.ATTRIB_VALUE_QUOTED, $ = "attribValue";
                break;
              case y.ATTRIB_VALUE_ENTITY_U:
                L = y.ATTRIB_VALUE_UNQUOTED, $ = "attribValue";
                break;
            }
            h === ";" ? (i[$] += je(i), i.entity = "", i.state = L) : M(i.entity.length ? N : S, h) ? i.entity += h : (v(i, "Invalid character in entity name"), i[$] += "&" + i.entity + h, i.entity = "", i.state = L);
            continue;
          default:
            throw new Error(i, "Unknown state: " + i.state);
        }
      return i.position >= i.bufferCheckPosition && a(i), i;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var o = String.fromCharCode, i = Math.floor, b = function() {
        var h = 16384, R = [], B, L, $ = -1, J = arguments.length;
        if (!J)
          return "";
        for (var fe = ""; ++$ < J; ) {
          var W = Number(arguments[$]);
          if (!isFinite(W) || // `NaN`, `+Infinity`, or `-Infinity`
          W < 0 || // not a valid Unicode code point
          W > 1114111 || // not a valid Unicode code point
          i(W) !== W)
            throw RangeError("Invalid code point: " + W);
          W <= 65535 ? R.push(W) : (W -= 65536, B = (W >> 10) + 55296, L = W % 1024 + 56320, R.push(B, L)), ($ + 1 === J || R.length > h) && (fe += o.apply(null, R), R.length = 0);
        }
        return fe;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: b,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = b;
    }();
  })(e);
})(gt);
var _n = X && X.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
const Ti = _n(H), _i = _n(H), Ei = H, jt = { "http:": Ti.default, "https:": _i.default }, vi = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Ai = /* @__PURE__ */ new Set([429, 503]), Ci = ["connect", "continue", "information", "socket", "timeout", "upgrade"], Ri = ["aborted"];
ee.MinigetError = class extends Error {
  constructor(t, n) {
    super(t), this.statusCode = n;
  }
};
ee.defaultOptions = {
  maxRedirects: 10,
  maxRetries: 2,
  maxReconnects: 0,
  backoff: { inc: 100, max: 1e4 }
};
function ee(e, t = {}) {
  var n;
  const r = Object.assign({}, ee.defaultOptions, t), a = new Ei.PassThrough({ highWaterMark: r.highWaterMark });
  a.destroyed = a.aborted = !1;
  let s, c, p, m = 0, d = 0, l, u = 0, w, f = !1, g = 0, T, A = 0;
  if (!((n = r.headers) === null || n === void 0) && n.Range) {
    let D = /bytes=(\d+)-(\d+)?/.exec(`${r.headers.Range}`);
    D && (g = parseInt(D[1], 10), T = parseInt(D[2], 10));
  }
  r.acceptEncoding && (r.headers = Object.assign({
    "Accept-Encoding": Object.keys(r.acceptEncoding).join(", ")
  }, r.headers));
  const O = () => p && A > 0, S = () => !f || A === w, N = (D) => {
    p = null, d = 0;
    let P = r.backoff.inc, I = Math.min(P, r.backoff.max);
    l = setTimeout(M, I), a.emit("reconnect", u, D);
  }, F = (D) => t.method !== "HEAD" && !S() && u++ < r.maxReconnects ? (N(D), !0) : !1, V = (D) => {
    if (a.destroyed)
      return !1;
    if (O())
      return F(D.err);
    if ((!D.err || D.err.message === "ENOTFOUND") && d++ < r.maxRetries) {
      let P = D.retryAfter || Math.min(d * r.backoff.inc, r.backoff.max);
      return l = setTimeout(M, P), a.emit("retry", d, D.err), !0;
    }
    return !1;
  }, G = (D, P) => {
    for (let I of P)
      D.on(I, a.emit.bind(a, I));
  }, M = () => {
    let D = {}, P;
    try {
      let v = typeof e == "string" ? new URL(e) : e;
      D = Object.assign({}, {
        host: v.host,
        hostname: v.hostname,
        path: v.pathname + v.search + v.hash,
        port: v.port,
        protocol: v.protocol
      }), v.username && (D.auth = `${v.username}:${v.password}`), P = jt[String(D.protocol)];
    } catch {
    }
    if (!P) {
      a.emit("error", new ee.MinigetError(`Invalid URL: ${e}`));
      return;
    }
    if (Object.assign(D, r), f && A > 0) {
      let v = A + g, z = T || "";
      D.headers = Object.assign({}, D.headers, {
        Range: `bytes=${v}-${z}`
      });
    }
    if (r.transform) {
      try {
        D = r.transform(D);
      } catch (v) {
        a.emit("error", v);
        return;
      }
      if ((!D || D.protocol) && (P = jt[String(D == null ? void 0 : D.protocol)], !P)) {
        a.emit("error", new ee.MinigetError("Invalid URL object from `transform` function"));
        return;
      }
    }
    const I = (v) => {
      a.destroyed || a.readableEnded || (k(), V({ err: v }) ? s.removeListener("close", U) : a.emit("error", v));
    }, U = () => {
      k(), V({});
    }, k = () => {
      s.removeListener("close", U), c == null || c.removeListener("data", Q), p == null || p.removeListener("end", q);
    }, Q = (v) => {
      A += v.length;
    }, q = () => {
      k(), F() || a.end();
    };
    s = P.request(D, (v) => {
      if (!a.destroyed) {
        if (vi.has(v.statusCode)) {
          if (m++ >= r.maxRedirects)
            a.emit("error", new ee.MinigetError("Too many redirects"));
          else {
            if (v.headers.location)
              e = v.headers.location;
            else {
              let z = new ee.MinigetError("Redirect status code given with no location", v.statusCode);
              a.emit("error", z), k();
              return;
            }
            setTimeout(M, parseInt(v.headers["retry-after"] || "0", 10) * 1e3), a.emit("redirect", e);
          }
          k();
          return;
        } else if (Ai.has(v.statusCode)) {
          if (!V({ retryAfter: parseInt(v.headers["retry-after"] || "0", 10) })) {
            let z = new ee.MinigetError(`Status code: ${v.statusCode}`, v.statusCode);
            a.emit("error", z);
          }
          k();
          return;
        } else if (v.statusCode && (v.statusCode < 200 || v.statusCode >= 400)) {
          let z = new ee.MinigetError(`Status code: ${v.statusCode}`, v.statusCode);
          v.statusCode >= 500 ? I(z) : a.emit("error", z), k();
          return;
        }
        if (p = v, r.acceptEncoding && v.headers["content-encoding"])
          for (let z of v.headers["content-encoding"].split(", ").reverse()) {
            let se = r.acceptEncoding[z];
            se && (p = p.pipe(se()), p.on("error", I));
          }
        w || (w = parseInt(`${v.headers["content-length"]}`, 10), f = v.headers["accept-ranges"] === "bytes" && w > 0 && r.maxReconnects > 0), v.on("data", Q), p.on("end", q), p.pipe(a, { end: !f }), c = v, a.emit("response", v), v.on("error", I), G(v, Ri);
      }
    }), s.on("error", I), s.on("close", U), G(s, Ci), a.destroyed && y(...Z), a.emit("request", s), s.end();
  };
  a.abort = (D) => {
    console.warn("`MinigetStream#abort()` has been deprecated in favor of `MinigetStream#destroy()`"), a.aborted = !0, a.emit("abort"), a.destroy(D);
  };
  let Z;
  const y = (D) => {
    s.destroy(D), p == null || p.unpipe(a), p == null || p.destroy(), clearTimeout(l);
  };
  return a._destroy = (...D) => {
    a.destroyed = !0, s ? y(...D) : Z = D;
  }, a.text = () => new Promise((D, P) => {
    let I = "";
    a.setEncoding("utf8"), a.on("data", (U) => I += U), a.on("end", () => D(I)), a.on("error", P);
  }), process.nextTick(M), a;
}
var $e = ee, ge = {};
const Si = "ytdl-core", Ii = "YouTube video downloader in pure javascript.", Oi = [
  "youtube",
  "video",
  "download"
], Ni = "4.11.2", Di = {
  type: "git",
  url: "git://github.com/fent/node-ytdl-core.git"
}, Pi = "fent <fentbox@gmail.com> (https://github.com/fent)", Li = [
  "Tobias Kutscha (https://github.com/TimeForANinja)",
  "Andrew Kelley (https://github.com/andrewrk)",
  "Mauricio Allende (https://github.com/mallendeo)",
  "Rodrigo Altamirano (https://github.com/raltamirano)",
  "Jim Buck (https://github.com/JimmyBoh)",
  "Paweł Ruciński (https://github.com/Roki100)",
  "Alexander Paolini (https://github.com/Million900o)"
], Fi = "./lib/index.js", Bi = "./typings/index.d.ts", xi = [
  "lib",
  "typings"
], Mi = {
  test: "nyc --reporter=lcov --reporter=text-summary npm run test:unit",
  "test:unit": "mocha --ignore test/irl-test.js test/*-test.js --timeout 4000",
  "test:irl": "mocha --timeout 16000 test/irl-test.js",
  lint: "eslint ./",
  "lint:fix": "eslint --fix ./",
  "lint:typings": "tslint typings/index.d.ts",
  "lint:typings:fix": "tslint --fix typings/index.d.ts"
}, ki = {
  m3u8stream: "^0.8.6",
  miniget: "^4.2.2",
  sax: "^1.1.3"
}, Ui = {
  "@types/node": "^13.1.0",
  "assert-diff": "^3.0.1",
  dtslint: "^3.6.14",
  eslint: "^6.8.0",
  mocha: "^7.0.0",
  "muk-require": "^1.2.0",
  nock: "^13.0.4",
  nyc: "^15.0.0",
  sinon: "^9.0.0",
  "stream-equal": "~1.1.0",
  typescript: "^3.9.7"
}, qi = {
  node: ">=12"
}, $i = "MIT", En = {
  name: Si,
  description: Ii,
  keywords: Oi,
  version: Ni,
  repository: Di,
  author: Pi,
  contributors: Li,
  main: Fi,
  types: Bi,
  files: xi,
  scripts: Mi,
  dependencies: ki,
  devDependencies: Ui,
  engines: qi,
  license: $i
};
(function(e) {
  const t = $e;
  e.between = (m, d, l) => {
    let u;
    if (d instanceof RegExp) {
      const w = m.match(d);
      if (!w)
        return "";
      u = w.index + w[0].length;
    } else {
      if (u = m.indexOf(d), u === -1)
        return "";
      u += d.length;
    }
    return m = m.slice(u), u = m.indexOf(l), u === -1 ? "" : (m = m.slice(0, u), m);
  }, e.parseAbbreviatedNumber = (m) => {
    const d = m.replace(",", ".").replace(" ", "").match(/([\d,.]+)([MK]?)/);
    if (d) {
      let [, l, u] = d;
      return l = parseFloat(l), Math.round(u === "M" ? l * 1e6 : u === "K" ? l * 1e3 : l);
    }
    return null;
  };
  const n = [
    // Strings
    { start: '"', end: '"' },
    { start: "'", end: "'" },
    { start: "`", end: "`" },
    // RegeEx
    { start: "/", end: "/", startPrefix: /(^|[[{:;,])\s?$/ }
  ];
  e.cutAfterJS = (m) => {
    let d, l;
    if (m[0] === "[" ? (d = "[", l = "]") : m[0] === "{" && (d = "{", l = "}"), !d)
      throw new Error(`Can't cut unsupported JSON (need to begin with [ or { ) but got: ${m[0]}`);
    let u = null, w = !1, f = 0, g;
    for (g = 0; g < m.length; g++) {
      if (!w && u !== null && m[g] === u.end) {
        u = null;
        continue;
      } else if (!w && u === null) {
        for (const T of n)
          if (m[g] === T.start && (!T.startPrefix || m.substring(g - 10, g).match(T.startPrefix))) {
            u = T;
            break;
          }
        if (u !== null)
          continue;
      }
      if (w = m[g] === "\\" && !w, u === null && (m[g] === d ? f++ : m[g] === l && f--, f === 0))
        return m.substring(0, g + 1);
    }
    throw Error("Can't cut unsupported JSON (no matching closing bracket found)");
  }, e.playError = (m, d, l = Error) => {
    let u = m && m.playabilityStatus;
    return u && d.includes(u.status) ? new l(u.reason || u.messages && u.messages[0]) : null;
  }, e.exposedMiniget = (m, d = {}, l) => {
    const u = t(m, l || d.requestOptions);
    return typeof d.requestCallback == "function" && d.requestCallback(u), u;
  }, e.deprecate = (m, d, l, u, w) => {
    Object.defineProperty(m, d, {
      get: () => (console.warn(`\`${u}\` will be removed in a near future release, use \`${w}\` instead.`), l)
    });
  };
  const r = En, a = 1e3 * 60 * 60 * 12;
  e.lastUpdateCheck = 0, e.checkForUpdates = () => !process.env.YTDL_NO_UPDATE && !r.version.startsWith("0.0.0-") && Date.now() - e.lastUpdateCheck >= a ? (e.lastUpdateCheck = Date.now(), t("https://api.github.com/repos/fent/node-ytdl-core/releases/latest", {
    headers: { "User-Agent": "ytdl-core" }
  }).text().then((m) => {
    JSON.parse(m).tag_name !== `v${r.version}` && console.warn('\x1B[33mWARNING:\x1B[0m ytdl-core is out of date! Update with "npm install ytdl-core@latest".');
  }, (m) => {
    console.warn("Error checking for updates:", m.message), console.warn("You can disable this check by setting the `YTDL_NO_UPDATE` env variable.");
  })) : null, e.getRandomIPv6 = (m) => {
    if (!c(m))
      throw Error("Invalid IPv6 format");
    const [d, l] = m.split("/");
    let u = parseInt(l);
    if (!u || u > 128 || u < 24)
      throw Error("Invalid IPv6 subnet");
    const w = p(d);
    return new Array(8).fill(1).map(() => Math.floor(Math.random() * 65535)).map((T, A) => {
      const O = Math.min(u, 16);
      u -= O;
      const S = 65535 - (2 ** (16 - O) - 1);
      return (w[A] & S) + (T & (S ^ 65535));
    }).map((T) => T.toString("16")).join(":");
  };
  const s = /^(([0-9a-f]{1,4}:)(:[0-9a-f]{1,4}){1,6}|([0-9a-f]{1,4}:){1,2}(:[0-9a-f]{1,4}){1,5}|([0-9a-f]{1,4}:){1,3}(:[0-9a-f]{1,4}){1,4}|([0-9a-f]{1,4}:){1,4}(:[0-9a-f]{1,4}){1,3}|([0-9a-f]{1,4}:){1,5}(:[0-9a-f]{1,4}){1,2}|([0-9a-f]{1,4}:){1,6}(:[0-9a-f]{1,4})|([0-9a-f]{1,4}:){1,7}(([0-9a-f]{1,4})|:))\/(1[0-1]\d|12[0-8]|\d{1,2})$/, c = e.isIPv6 = (m) => s.test(m), p = e.normalizeIP = (m) => {
    const d = m.split("::").map((f) => f.split(":")), l = d[0] || [], u = d[1] || [];
    u.reverse();
    const w = new Array(8).fill(0);
    for (let f = 0; f < Math.min(l.length, 8); f++)
      w[f] = parseInt(l[f], 16) || 0;
    for (let f = 0; f < Math.min(u.length, 8); f++)
      w[7 - f] = parseInt(u[f], 16) || 0;
    return w;
  };
})(ge);
var wt = {}, Vi = {
  5: {
    mimeType: 'video/flv; codecs="Sorenson H.283, mp3"',
    qualityLabel: "240p",
    bitrate: 25e4,
    audioBitrate: 64
  },
  6: {
    mimeType: 'video/flv; codecs="Sorenson H.263, mp3"',
    qualityLabel: "270p",
    bitrate: 8e5,
    audioBitrate: 64
  },
  13: {
    mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"',
    qualityLabel: null,
    bitrate: 5e5,
    audioBitrate: null
  },
  17: {
    mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"',
    qualityLabel: "144p",
    bitrate: 5e4,
    audioBitrate: 24
  },
  18: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: "360p",
    bitrate: 5e5,
    audioBitrate: 96
  },
  22: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: "720p",
    bitrate: 2e6,
    audioBitrate: 192
  },
  34: {
    mimeType: 'video/flv; codecs="H.264, aac"',
    qualityLabel: "360p",
    bitrate: 5e5,
    audioBitrate: 128
  },
  35: {
    mimeType: 'video/flv; codecs="H.264, aac"',
    qualityLabel: "480p",
    bitrate: 8e5,
    audioBitrate: 128
  },
  36: {
    mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"',
    qualityLabel: "240p",
    bitrate: 175e3,
    audioBitrate: 32
  },
  37: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: "1080p",
    bitrate: 3e6,
    audioBitrate: 192
  },
  38: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: "3072p",
    bitrate: 35e5,
    audioBitrate: 192
  },
  43: {
    mimeType: 'video/webm; codecs="VP8, vorbis"',
    qualityLabel: "360p",
    bitrate: 5e5,
    audioBitrate: 128
  },
  44: {
    mimeType: 'video/webm; codecs="VP8, vorbis"',
    qualityLabel: "480p",
    bitrate: 1e6,
    audioBitrate: 128
  },
  45: {
    mimeType: 'video/webm; codecs="VP8, vorbis"',
    qualityLabel: "720p",
    bitrate: 2e6,
    audioBitrate: 192
  },
  46: {
    mimeType: 'audio/webm; codecs="vp8, vorbis"',
    qualityLabel: "1080p",
    bitrate: null,
    audioBitrate: 192
  },
  82: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: "360p",
    bitrate: 5e5,
    audioBitrate: 96
  },
  83: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: "240p",
    bitrate: 5e5,
    audioBitrate: 96
  },
  84: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: "720p",
    bitrate: 2e6,
    audioBitrate: 192
  },
  85: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: "1080p",
    bitrate: 3e6,
    audioBitrate: 192
  },
  91: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: "144p",
    bitrate: 1e5,
    audioBitrate: 48
  },
  92: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: "240p",
    bitrate: 15e4,
    audioBitrate: 48
  },
  93: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: "360p",
    bitrate: 5e5,
    audioBitrate: 128
  },
  94: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: "480p",
    bitrate: 8e5,
    audioBitrate: 128
  },
  95: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: "720p",
    bitrate: 15e5,
    audioBitrate: 256
  },
  96: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: "1080p",
    bitrate: 25e5,
    audioBitrate: 256
  },
  100: {
    mimeType: 'audio/webm; codecs="VP8, vorbis"',
    qualityLabel: "360p",
    bitrate: null,
    audioBitrate: 128
  },
  101: {
    mimeType: 'audio/webm; codecs="VP8, vorbis"',
    qualityLabel: "360p",
    bitrate: null,
    audioBitrate: 192
  },
  102: {
    mimeType: 'audio/webm; codecs="VP8, vorbis"',
    qualityLabel: "720p",
    bitrate: null,
    audioBitrate: 192
  },
  120: {
    mimeType: 'video/flv; codecs="H.264, aac"',
    qualityLabel: "720p",
    bitrate: 2e6,
    audioBitrate: 128
  },
  127: {
    mimeType: 'audio/ts; codecs="aac"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 96
  },
  128: {
    mimeType: 'audio/ts; codecs="aac"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 96
  },
  132: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: "240p",
    bitrate: 15e4,
    audioBitrate: 48
  },
  133: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: "240p",
    bitrate: 2e5,
    audioBitrate: null
  },
  134: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: "360p",
    bitrate: 3e5,
    audioBitrate: null
  },
  135: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: "480p",
    bitrate: 5e5,
    audioBitrate: null
  },
  136: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: "720p",
    bitrate: 1e6,
    audioBitrate: null
  },
  137: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: "1080p",
    bitrate: 25e5,
    audioBitrate: null
  },
  138: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: "4320p",
    bitrate: 135e5,
    audioBitrate: null
  },
  139: {
    mimeType: 'audio/mp4; codecs="aac"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 48
  },
  140: {
    mimeType: 'audio/m4a; codecs="aac"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 128
  },
  141: {
    mimeType: 'audio/mp4; codecs="aac"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 256
  },
  151: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: "720p",
    bitrate: 5e4,
    audioBitrate: 24
  },
  160: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: "144p",
    bitrate: 1e5,
    audioBitrate: null
  },
  171: {
    mimeType: 'audio/webm; codecs="vorbis"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 128
  },
  172: {
    mimeType: 'audio/webm; codecs="vorbis"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 192
  },
  242: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "240p",
    bitrate: 1e5,
    audioBitrate: null
  },
  243: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "360p",
    bitrate: 25e4,
    audioBitrate: null
  },
  244: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "480p",
    bitrate: 5e5,
    audioBitrate: null
  },
  247: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "720p",
    bitrate: 7e5,
    audioBitrate: null
  },
  248: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "1080p",
    bitrate: 15e5,
    audioBitrate: null
  },
  249: {
    mimeType: 'audio/webm; codecs="opus"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 48
  },
  250: {
    mimeType: 'audio/webm; codecs="opus"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 64
  },
  251: {
    mimeType: 'audio/webm; codecs="opus"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 160
  },
  264: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: "1440p",
    bitrate: 4e6,
    audioBitrate: null
  },
  266: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: "2160p",
    bitrate: 125e5,
    audioBitrate: null
  },
  271: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "1440p",
    bitrate: 9e6,
    audioBitrate: null
  },
  272: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "4320p",
    bitrate: 2e7,
    audioBitrate: null
  },
  278: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "144p 30fps",
    bitrate: 8e4,
    audioBitrate: null
  },
  298: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: "720p",
    bitrate: 3e6,
    audioBitrate: null
  },
  299: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: "1080p",
    bitrate: 55e5,
    audioBitrate: null
  },
  300: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: "720p",
    bitrate: 1318e3,
    audioBitrate: 48
  },
  302: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "720p HFR",
    bitrate: 25e5,
    audioBitrate: null
  },
  303: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "1080p HFR",
    bitrate: 5e6,
    audioBitrate: null
  },
  308: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "1440p HFR",
    bitrate: 1e7,
    audioBitrate: null
  },
  313: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "2160p",
    bitrate: 13e6,
    audioBitrate: null
  },
  315: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "2160p HFR",
    bitrate: 2e7,
    audioBitrate: null
  },
  330: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "144p HDR, HFR",
    bitrate: 8e4,
    audioBitrate: null
  },
  331: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "240p HDR, HFR",
    bitrate: 1e5,
    audioBitrate: null
  },
  332: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "360p HDR, HFR",
    bitrate: 25e4,
    audioBitrate: null
  },
  333: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "240p HDR, HFR",
    bitrate: 5e5,
    audioBitrate: null
  },
  334: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "720p HDR, HFR",
    bitrate: 1e6,
    audioBitrate: null
  },
  335: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "1080p HDR, HFR",
    bitrate: 15e5,
    audioBitrate: null
  },
  336: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "1440p HDR, HFR",
    bitrate: 5e6,
    audioBitrate: null
  },
  337: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: "2160p HDR, HFR",
    bitrate: 12e6,
    audioBitrate: null
  }
};
(function(e) {
  const t = ge, n = Vi, r = [
    "mp4a",
    "mp3",
    "vorbis",
    "aac",
    "opus",
    "flac"
  ], a = [
    "mp4v",
    "avc1",
    "Sorenson H.283",
    "MPEG-4 Visual",
    "VP8",
    "VP9",
    "H.264"
  ], s = (f) => f.bitrate || 0, c = (f) => a.findIndex((g) => f.codecs && f.codecs.includes(g)), p = (f) => f.audioBitrate || 0, m = (f) => r.findIndex((g) => f.codecs && f.codecs.includes(g)), d = (f, g, T) => {
    let A = 0;
    for (let O of T)
      if (A = O(g) - O(f), A !== 0)
        break;
    return A;
  }, l = (f, g) => d(f, g, [
    (T) => parseInt(T.qualityLabel),
    s,
    c
  ]), u = (f, g) => d(f, g, [
    p,
    m
  ]);
  e.sortFormats = (f, g) => d(f, g, [
    // Formats with both video and audio are ranked highest.
    (T) => +!!T.isHLS,
    (T) => +!!T.isDashMPD,
    (T) => +(T.contentLength > 0),
    (T) => +(T.hasVideo && T.hasAudio),
    (T) => +T.hasVideo,
    (T) => parseInt(T.qualityLabel) || 0,
    s,
    p,
    c,
    m
  ]), e.chooseFormat = (f, g) => {
    if (typeof g.format == "object") {
      if (!g.format.url)
        throw Error("Invalid format given, did you use `ytdl.getInfo()`?");
      return g.format;
    }
    g.filter && (f = e.filterFormats(f, g.filter)), f.some((O) => O.isHLS) && (f = f.filter((O) => O.isHLS || !O.isLive));
    let T;
    const A = g.quality || "highest";
    switch (A) {
      case "highest":
        T = f[0];
        break;
      case "lowest":
        T = f[f.length - 1];
        break;
      case "highestaudio": {
        f = e.filterFormats(f, "audio"), f.sort(u);
        const O = f[0];
        f = f.filter((N) => u(O, N) === 0);
        const S = f.map((N) => parseInt(N.qualityLabel) || 0).sort((N, F) => N - F)[0];
        T = f.find((N) => (parseInt(N.qualityLabel) || 0) === S);
        break;
      }
      case "lowestaudio":
        f = e.filterFormats(f, "audio"), f.sort(u), T = f[f.length - 1];
        break;
      case "highestvideo": {
        f = e.filterFormats(f, "video"), f.sort(l);
        const O = f[0];
        f = f.filter((N) => l(O, N) === 0);
        const S = f.map((N) => N.audioBitrate || 0).sort((N, F) => N - F)[0];
        T = f.find((N) => (N.audioBitrate || 0) === S);
        break;
      }
      case "lowestvideo":
        f = e.filterFormats(f, "video"), f.sort(l), T = f[f.length - 1];
        break;
      default:
        T = w(A, f);
        break;
    }
    if (!T)
      throw Error(`No such format found: ${A}`);
    return T;
  };
  const w = (f, g) => {
    let T = (A) => g.find((O) => `${O.itag}` == `${A}`);
    return Array.isArray(f) ? T(f.find((A) => T(A))) : T(f);
  };
  e.filterFormats = (f, g) => {
    let T;
    switch (g) {
      case "videoandaudio":
      case "audioandvideo":
        T = (A) => A.hasVideo && A.hasAudio;
        break;
      case "video":
        T = (A) => A.hasVideo;
        break;
      case "videoonly":
        T = (A) => A.hasVideo && !A.hasAudio;
        break;
      case "audio":
        T = (A) => A.hasAudio;
        break;
      case "audioonly":
        T = (A) => !A.hasVideo && A.hasAudio;
        break;
      default:
        if (typeof g == "function")
          T = g;
        else
          throw TypeError(`Given filter (${g}) is not supported`);
    }
    return f.filter((A) => !!A.url && T(A));
  }, e.addFormatMeta = (f) => (f = Object.assign({}, n[f.itag], f), f.hasVideo = !!f.qualityLabel, f.hasAudio = !!f.audioBitrate, f.container = f.mimeType ? f.mimeType.split(";")[0].split("/")[1] : null, f.codecs = f.mimeType ? t.between(f.mimeType, 'codecs="', '"') : null, f.videoCodec = f.hasVideo && f.codecs ? f.codecs.split(", ")[0] : null, f.audioCodec = f.hasAudio && f.codecs ? f.codecs.split(", ").slice(-1)[0] : null, f.isLive = /\bsource[/=]yt_live_broadcast\b/.test(f.url), f.isHLS = /\/manifest\/hls_(variant|playlist)\//.test(f.url), f.isDashMPD = /\/manifest\/dash\//.test(f.url), f);
})(wt);
var Tt = {};
(function(e) {
  const t = /* @__PURE__ */ new Set([
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "music.youtube.com",
    "gaming.youtube.com"
  ]), n = /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/;
  e.getURLVideoID = (s) => {
    const c = new URL(s.trim());
    let p = c.searchParams.get("v");
    if (n.test(s.trim()) && !p) {
      const m = c.pathname.split("/");
      p = c.host === "youtu.be" ? m[1] : m[2];
    } else if (c.hostname && !t.has(c.hostname))
      throw Error("Not a YouTube domain");
    if (!p)
      throw Error(`No video id found: "${s}"`);
    if (p = p.substring(0, 11), !e.validateID(p))
      throw TypeError(`Video id (${p}) does not match expected format (${a.toString()})`);
    return p;
  };
  const r = /^https?:\/\//;
  e.getVideoID = (s) => {
    if (e.validateID(s))
      return s;
    if (r.test(s.trim()))
      return e.getURLVideoID(s);
    throw Error(`No video id found: ${s}`);
  };
  const a = /^[a-zA-Z0-9-_]{11}$/;
  e.validateID = (s) => a.test(s.trim()), e.validateURL = (s) => {
    try {
      return e.getURLVideoID(s), !0;
    } catch {
      return !1;
    }
  };
})(Tt);
var oe = {}, _t = {};
Object.defineProperty(_t, "__esModule", { value: !0 });
const Hi = H;
class ji extends Hi.Writable {
  constructor() {
    super(), this._lastLine = "", this._seq = 0, this._nextItemDuration = null, this._nextItemRange = null, this._lastItemRangeEnd = 0, this.on("finish", () => {
      this._parseLine(this._lastLine), this.emit("end");
    });
  }
  _parseAttrList(t) {
    let n = {}, r = /([A-Z0-9-]+)=(?:"([^"]*?)"|([^,]*?))/g, a;
    for (; (a = r.exec(t)) !== null; )
      n[a[1]] = a[2] || a[3];
    return n;
  }
  _parseRange(t) {
    if (!t)
      return null;
    let n = t.split("@"), r = n[1] ? parseInt(n[1]) : this._lastItemRangeEnd + 1, a = r + parseInt(n[0]) - 1, s = { start: r, end: a };
    return this._lastItemRangeEnd = s.end, s;
  }
  _parseLine(t) {
    let n = t.match(/^#(EXT[A-Z0-9-]+)(?::(.*))?/);
    if (n) {
      const r = n[1], a = n[2] || "";
      switch (r) {
        case "EXT-X-PROGRAM-DATE-TIME":
          this.emit("starttime", new Date(a).getTime());
          break;
        case "EXT-X-MEDIA-SEQUENCE":
          this._seq = parseInt(a);
          break;
        case "EXT-X-MAP": {
          let s = this._parseAttrList(a);
          if (!s.URI) {
            this.destroy(new Error("`EXT-X-MAP` found without required attribute `URI`"));
            return;
          }
          this.emit("item", {
            url: s.URI,
            seq: this._seq,
            init: !0,
            duration: 0,
            range: this._parseRange(s.BYTERANGE)
          });
          break;
        }
        case "EXT-X-BYTERANGE": {
          this._nextItemRange = this._parseRange(a);
          break;
        }
        case "EXTINF":
          this._nextItemDuration = Math.round(parseFloat(a.split(",")[0]) * 1e3);
          break;
        case "EXT-X-ENDLIST":
          this.emit("endlist");
          break;
      }
    } else
      !/^#/.test(t) && t.trim() && (this.emit("item", {
        url: t.trim(),
        seq: this._seq++,
        duration: this._nextItemDuration,
        range: this._nextItemRange
      }), this._nextItemRange = null);
  }
  _write(t, n, r) {
    let a = t.toString("utf8").split(`
`);
    this._lastLine && (a[0] = this._lastLine + a[0]), a.forEach((s, c) => {
      this.destroyed || (c < a.length - 1 ? this._parseLine(s) : this._lastLine = s);
    }), r();
  }
}
_t.default = ji;
var Et = {}, de = {};
Object.defineProperty(de, "__esModule", { value: !0 });
de.durationStr = de.humanStr = void 0;
const Gi = /^\d+$/, Wi = /^(?:(?:(\d+):)?(\d{1,2}):)?(\d{1,2})(?:\.(\d{3}))?$/, Ce = {
  ms: 1,
  s: 1e3,
  m: 6e4,
  h: 36e5
};
de.humanStr = (e) => {
  if (typeof e == "number")
    return e;
  if (Gi.test(e))
    return +e;
  const t = Wi.exec(e);
  if (t)
    return +(t[1] || 0) * Ce.h + +(t[2] || 0) * Ce.m + +t[3] * Ce.s + +(t[4] || 0);
  {
    let n = 0;
    const r = /(-?\d+)(ms|s|m|h)/g;
    let a;
    for (; (a = r.exec(e)) !== null; )
      n += +a[1] * Ce[a[2]];
    return n;
  }
};
de.durationStr = (e) => {
  let t = 0;
  const n = /(\d+(?:\.\d+)?)(S|M|H)/g;
  let r;
  for (; (r = n.exec(e)) !== null; )
    t += +r[1] * Ce[r[2].toLowerCase()];
  return t;
};
var zi = X && X.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Et, "__esModule", { value: !0 });
const Xi = H, Yi = zi(gt), Qi = de;
class Ji extends Xi.Writable {
  constructor(t) {
    super(), this._parser = Yi.default.createStream(!1, { lowercase: !0 }), this._parser.on("error", this.destroy.bind(this));
    let n, r = 0, a = 0, s, c, p, m, d, l = [], u = !1, w = !1, f, g, T;
    const A = (S) => {
      const N = {
        RepresentationID: t,
        Number: a,
        Time: r
      };
      return S.replace(/\$(\w+)\$/g, (F, V) => `${N[V]}`);
    };
    this._parser.on("opentag", (S) => {
      switch (S.name) {
        case "mpd":
          r = S.attributes.availabilitystarttime ? new Date(S.attributes.availabilitystarttime).getTime() : 0, f = S.attributes.type !== "dynamic";
          break;
        case "period":
          a = 0, c = 1e3, m = 0, p = 0, d = [], g = 0, T = Qi.durationStr(S.attributes.start) || 0;
          break;
        case "segmentlist":
          a = parseInt(S.attributes.startnumber) || a, c = parseInt(S.attributes.timescale) || c, m = parseInt(S.attributes.duration) || m, p = parseInt(S.attributes.presentationtimeoffset) || p;
          break;
        case "segmenttemplate":
          s = S.attributes, a = parseInt(S.attributes.startnumber) || a, c = parseInt(S.attributes.timescale) || c;
          break;
        case "segmenttimeline":
        case "baseurl":
          n = S.name;
          break;
        case "s":
          l.push({
            duration: parseInt(S.attributes.d),
            repeat: parseInt(S.attributes.r),
            time: parseInt(S.attributes.t)
          });
          break;
        case "adaptationset":
        case "representation":
          g++, t || (t = S.attributes.id), u = S.attributes.id === `${t}`, u && (T && (r += T), p && (r -= p / c * 1e3), this.emit("starttime", r));
          break;
        case "initialization":
          u && this.emit("item", {
            url: d.filter((N) => !!N).join("") + S.attributes.sourceurl,
            seq: a,
            init: !0,
            duration: 0
          });
          break;
        case "segmenturl":
          if (u) {
            w = !0;
            let N = l.shift(), F = ((N == null ? void 0 : N.duration) || m) / c * 1e3;
            this.emit("item", {
              url: d.filter((V) => !!V).join("") + S.attributes.media,
              seq: a++,
              duration: F
            }), r += F;
          }
          break;
      }
    });
    const O = () => {
      f && this.emit("endlist"), u ? this.emit("end") : this.destroy(Error(`Representation '${t}' not found`));
    };
    this._parser.on("closetag", (S) => {
      switch (S) {
        case "adaptationset":
        case "representation":
          if (g--, s && l.length) {
            w = !0, s.initialization && this.emit("item", {
              url: d.filter((N) => !!N).join("") + A(s.initialization),
              seq: a,
              init: !0,
              duration: 0
            });
            for (let { duration: N, repeat: F, time: V } of l) {
              N = N / c * 1e3, F = F || 1, r = V || r;
              for (let G = 0; G < F; G++)
                this.emit("item", {
                  url: d.filter((M) => !!M).join("") + A(s.media),
                  seq: a++,
                  duration: N
                }), r += N;
            }
          }
          w && (this.emit("endearly"), O(), this._parser.removeAllListeners(), this.removeAllListeners("finish"));
          break;
      }
    }), this._parser.on("text", (S) => {
      n === "baseurl" && (d[g] = S, n = null);
    }), this.on("finish", O);
  }
  _write(t, n, r) {
    this._parser.write(t), r();
  }
}
Et.default = Ji;
var Ve = {};
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.Queue = void 0;
class Ki {
  /**
   * A really simple queue with concurrency.
   *
   * @param {Function} worker
   * @param {Object} options
   * @param {!number} options.concurrency
   */
  constructor(t, n = {}) {
    this._worker = t, this._concurrency = n.concurrency || 1, this.tasks = [], this.total = 0, this.active = 0;
  }
  /**
   * Push a task to the queue.
   *
   *  @param {T} item
   *  @param {!Function} callback
   */
  push(t, n) {
    this.tasks.push({ item: t, callback: n }), this.total++, this._next();
  }
  /**
   * Process next job in queue.
   */
  _next() {
    if (this.active >= this._concurrency || !this.tasks.length)
      return;
    const { item: t, callback: n } = this.tasks.shift();
    let r = !1;
    this.active++, this._worker(t, (a, s) => {
      r || (this.active--, r = !0, n == null || n(a, s), this._next());
    });
  }
  /**
   * Stops processing queued jobs.
   */
  die() {
    this.tasks = [];
  }
}
Ve.Queue = Ki;
var vt = X && X.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
const Gt = H, Wt = vt($e), Zi = vt(_t), ea = vt(Et), zt = Ve, vn = de, ta = {
  m3u8: Zi.default,
  "dash-mpd": ea.default
};
let An = (e, t = {}) => {
  const n = new Gt.PassThrough({ highWaterMark: t.highWaterMark }), r = t.chunkReadahead || 3, a = t.liveBuffer || 2e4, s = t.requestOptions, c = ta[t.parser || (/\.mpd$/.test(e) ? "dash-mpd" : "m3u8")];
  if (!c)
    throw TypeError(`parser '${t.parser}' not supported`);
  let p = 0;
  typeof t.begin < "u" && (p = typeof t.begin == "string" ? vn.humanStr(t.begin) : Math.max(t.begin - a, 0));
  const m = (P) => {
    for (let I of ["abort", "request", "response", "redirect", "retry", "reconnect"])
      P.on(I, n.emit.bind(n, I));
  };
  let d;
  const l = new zt.Queue((P, I) => {
    d = P;
    let U = 0;
    P.on("data", (k) => U += k.length), P.pipe(n, { end: !1 }), P.on("end", () => I(null, U));
  }, { concurrency: 1 });
  let u = 0, w = 0;
  const f = new zt.Queue((P, I) => {
    let U = Object.assign({}, s);
    P.range && (U.headers = Object.assign({}, U.headers, {
      Range: `bytes=${P.range.start}-${P.range.end}`
    }));
    let k = Wt.default(new URL(P.url, e).toString(), U);
    k.on("error", I), m(k), l.push(k, (Q, q) => {
      w += +q, n.emit("progress", {
        num: ++u,
        size: q,
        duration: P.duration,
        url: P.url
      }, f.total, w), I(null);
    });
  }, { concurrency: r }), g = (P) => {
    n.emit("error", P), n.end();
  };
  let T, A, O, S = !0, N = !1, F = !1, V;
  const G = (P) => {
    if (d = null, P)
      g(P);
    else if (!S && !N && !F && f.tasks.length + f.active <= T) {
      let I = Math.max(0, A - (Date.now() - V));
      S = !0, O = setTimeout(D, I);
    } else
      (N || F) && !f.tasks.length && !f.active && n.end();
  };
  let M, Z, y = 0;
  const D = () => {
    V = Date.now(), M = Wt.default(e, s), M.on("error", g), m(M);
    const P = M.pipe(new c(t.id));
    P.on("starttime", (q) => {
      y || (y = q, typeof t.begin == "string" && p >= 0 && (p += y));
    }), P.on("endlist", () => {
      F = !0;
    }), P.on("endearly", M.unpipe.bind(M, P));
    let I = [];
    const U = (q) => {
      if (!q.init) {
        if (q.seq <= Z)
          return;
        Z = q.seq;
      }
      p = q.time, f.push(q, G), I.push(q);
    };
    let k = [], Q = 0;
    P.on("item", (q) => {
      let v = Object.assign({ time: y }, q);
      if (p <= v.time)
        U(v);
      else
        for (k.push(v), Q += v.duration; k.length > 1 && Q - k[0].duration > a; ) {
          const z = k.shift();
          Q -= z.duration;
        }
      y += v.duration;
    }), P.on("end", () => {
      M = null, !I.length && k.length && k.forEach((q) => {
        U(q);
      }), T = Math.max(1, Math.ceil(I.length * 0.01)), A = I.reduce((q, v) => v.duration + q, 0), S = !1, G(null);
    });
  };
  return D(), n.end = () => (N = !0, l.die(), f.die(), clearTimeout(O), M == null || M.destroy(), d == null || d.destroy(), Gt.PassThrough.prototype.end.call(n, null), n), n;
};
An.parseTimestamp = vn.humanStr;
var At = An;
const ue = ge, na = H, { parseTimestamp: ra } = At, me = "https://www.youtube.com/watch?v=", Ke = {
  song: { name: "Music", url: "https://music.youtube.com/" }
}, Y = (e) => e ? e.runs ? e.runs[0].text : e.simpleText : null;
oe.getMedia = (e) => {
  let t = {}, n = [];
  try {
    n = e.response.contents.twoColumnWatchNextResults.results.results.contents;
  } catch {
  }
  let r = n.find((a) => a.videoSecondaryInfoRenderer);
  if (!r)
    return {};
  try {
    let a = (r.metadataRowContainer || r.videoSecondaryInfoRenderer.metadataRowContainer).metadataRowContainerRenderer.rows;
    for (let s of a)
      if (s.metadataRowRenderer) {
        let c = Y(s.metadataRowRenderer.title).toLowerCase(), p = s.metadataRowRenderer.contents[0];
        t[c] = Y(p);
        let m = p.runs;
        m && m[0].navigationEndpoint && (t[`${c}_url`] = new URL(
          m[0].navigationEndpoint.commandMetadata.webCommandMetadata.url,
          me
        ).toString()), c in Ke && (t.category = Ke[c].name, t.category_url = Ke[c].url);
      } else if (s.richMetadataRowRenderer) {
        let c = s.richMetadataRowRenderer.contents, p = c.filter((d) => d.richMetadataRenderer.style === "RICH_METADATA_RENDERER_STYLE_BOX_ART");
        for (let { richMetadataRenderer: d } of p) {
          let l = d;
          t.year = Y(l.subtitle);
          let u = Y(l.callToAction).split(" ")[1];
          t[u] = Y(l.title), t[`${u}_url`] = new URL(
            l.endpoint.commandMetadata.webCommandMetadata.url,
            me
          ).toString(), t.thumbnails = l.thumbnail.thumbnails;
        }
        let m = c.filter((d) => d.richMetadataRenderer.style === "RICH_METADATA_RENDERER_STYLE_TOPIC");
        for (let { richMetadataRenderer: d } of m) {
          let l = d;
          t.category = Y(l.title), t.category_url = new URL(
            l.endpoint.commandMetadata.webCommandMetadata.url,
            me
          ).toString();
        }
      }
  } catch {
  }
  return t;
};
const Cn = (e) => !!(e && e.find((t) => t.metadataBadgeRenderer.tooltip === "Verified"));
oe.getAuthor = (e) => {
  let t, n = [], r, a = !1;
  try {
    let p = e.response.contents.twoColumnWatchNextResults.results.results.contents.find((m) => m.videoSecondaryInfoRenderer && m.videoSecondaryInfoRenderer.owner && m.videoSecondaryInfoRenderer.owner.videoOwnerRenderer).videoSecondaryInfoRenderer.owner.videoOwnerRenderer;
    t = p.navigationEndpoint.browseEndpoint.browseId, n = p.thumbnail.thumbnails.map((m) => (m.url = new URL(m.url, me).toString(), m)), r = ue.parseAbbreviatedNumber(Y(p.subscriberCountText)), a = Cn(p.badges);
  } catch {
  }
  try {
    let s = e.player_response.microformat && e.player_response.microformat.playerMicroformatRenderer, c = s && s.channelId || t || e.player_response.videoDetails.channelId, p = {
      id: c,
      name: s ? s.ownerChannelName : e.player_response.videoDetails.author,
      user: s ? s.ownerProfileUrl.split("/").slice(-1)[0] : null,
      channel_url: `https://www.youtube.com/channel/${c}`,
      external_channel_url: s ? `https://www.youtube.com/channel/${s.externalChannelId}` : "",
      user_url: s ? new URL(s.ownerProfileUrl, me).toString() : "",
      thumbnails: n,
      verified: a,
      subscriber_count: r
    };
    return n.length && ue.deprecate(p, "avatar", p.thumbnails[0].url, "author.avatar", "author.thumbnails[0].url"), p;
  } catch {
    return {};
  }
};
const Xt = (e, t) => {
  if (e)
    try {
      let n = Y(e.viewCountText), r = Y(e.shortViewCountText), a = t.find((l) => l.id === e.videoId);
      /^\d/.test(r) || (r = a && a.short_view_count_text || ""), n = (/^\d/.test(n) ? n : r).split(" ")[0];
      let s = e.shortBylineText.runs[0].navigationEndpoint.browseEndpoint, c = s.browseId, p = Y(e.shortBylineText), m = (s.canonicalBaseUrl || "").split("/").slice(-1)[0], d = {
        id: e.videoId,
        title: Y(e.title),
        published: Y(e.publishedTimeText),
        author: {
          id: c,
          name: p,
          user: m,
          channel_url: `https://www.youtube.com/channel/${c}`,
          user_url: `https://www.youtube.com/user/${m}`,
          thumbnails: e.channelThumbnail.thumbnails.map((l) => (l.url = new URL(l.url, me).toString(), l)),
          verified: Cn(e.ownerBadges),
          [Symbol.toPrimitive]() {
            return console.warn("`relatedVideo.author` will be removed in a near future release, use `relatedVideo.author.name` instead."), d.author.name;
          }
        },
        short_view_count_text: r.split(" ")[0],
        view_count: n.replace(/,/g, ""),
        length_seconds: e.lengthText ? Math.floor(ra(Y(e.lengthText)) / 1e3) : t && `${t.length_seconds}`,
        thumbnails: e.thumbnail.thumbnails,
        richThumbnails: e.richThumbnail ? e.richThumbnail.movingThumbnailRenderer.movingThumbnailDetails.thumbnails : [],
        isLive: !!(e.badges && e.badges.find((l) => l.metadataBadgeRenderer.label === "LIVE NOW"))
      };
      return ue.deprecate(
        d,
        "author_thumbnail",
        d.author.thumbnails[0].url,
        "relatedVideo.author_thumbnail",
        "relatedVideo.author.thumbnails[0].url"
      ), ue.deprecate(d, "ucid", d.author.id, "relatedVideo.ucid", "relatedVideo.author.id"), ue.deprecate(
        d,
        "video_thumbnail",
        d.thumbnails[0].url,
        "relatedVideo.video_thumbnail",
        "relatedVideo.thumbnails[0].url"
      ), d;
    } catch {
    }
};
oe.getRelatedVideos = (e) => {
  let t = [], n = [];
  try {
    t = e.response.webWatchNextResponseExtensionData.relatedVideoArgs.split(",").map((a) => na.parse(a));
  } catch {
  }
  try {
    n = e.response.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
  } catch {
    return [];
  }
  let r = [];
  for (let a of n || []) {
    let s = a.compactVideoRenderer;
    if (s) {
      let c = Xt(s, t);
      c && r.push(c);
    } else {
      let c = a.compactAutoplayRenderer || a.itemSectionRenderer;
      if (!c || !Array.isArray(c.contents))
        continue;
      for (let p of c.contents) {
        let m = Xt(p.compactVideoRenderer, t);
        m && r.push(m);
      }
    }
  }
  return r;
};
oe.getLikes = (e) => {
  try {
    let a = e.response.contents.twoColumnWatchNextResults.results.results.contents.find((s) => s.videoPrimaryInfoRenderer).videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons.find((s) => s.toggleButtonRenderer && s.toggleButtonRenderer.defaultIcon.iconType === "LIKE");
    return parseInt(a.toggleButtonRenderer.defaultText.accessibility.accessibilityData.label.replace(/\D+/g, ""));
  } catch {
    return null;
  }
};
oe.getDislikes = (e) => {
  try {
    let a = e.response.contents.twoColumnWatchNextResults.results.results.contents.find((s) => s.videoPrimaryInfoRenderer).videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons.find((s) => s.toggleButtonRenderer && s.toggleButtonRenderer.defaultIcon.iconType === "DISLIKE");
    return parseInt(a.toggleButtonRenderer.defaultText.accessibility.accessibilityData.label.replace(/\D+/g, ""));
  } catch {
    return null;
  }
};
oe.cleanVideoDetails = (e, t) => (e.thumbnails = e.thumbnail.thumbnails, delete e.thumbnail, ue.deprecate(
  e,
  "thumbnail",
  { thumbnails: e.thumbnails },
  "videoDetails.thumbnail.thumbnails",
  "videoDetails.thumbnails"
), e.description = e.shortDescription || Y(e.description), delete e.shortDescription, ue.deprecate(
  e,
  "shortDescription",
  e.description,
  "videoDetails.shortDescription",
  "videoDetails.description"
), e.lengthSeconds = t.player_response.microformat && t.player_response.microformat.playerMicroformatRenderer.lengthSeconds || t.player_response.videoDetails.lengthSeconds, e);
oe.getStoryboards = (e) => {
  const t = e.player_response.storyboards && e.player_response.storyboards.playerStoryboardSpecRenderer && e.player_response.storyboards.playerStoryboardSpecRenderer.spec && e.player_response.storyboards.playerStoryboardSpecRenderer.spec.split("|");
  if (!t)
    return [];
  const n = new URL(t.shift());
  return t.map((r, a) => {
    let [
      s,
      c,
      p,
      m,
      d,
      l,
      u,
      w
    ] = r.split("#");
    n.searchParams.set("sigh", w), p = parseInt(p, 10), m = parseInt(m, 10), d = parseInt(d, 10);
    const f = Math.ceil(p / (m * d));
    return {
      templateUrl: n.toString().replace("$L", a).replace("$N", u),
      thumbnailWidth: parseInt(s, 10),
      thumbnailHeight: parseInt(c, 10),
      thumbnailCount: p,
      interval: parseInt(l, 10),
      columns: m,
      rows: d,
      storyboardCount: f
    };
  });
};
oe.getChapters = (e) => {
  const t = e.response && e.response.playerOverlays && e.response.playerOverlays.playerOverlayRenderer, n = t && t.decoratedPlayerBarRenderer && t.decoratedPlayerBarRenderer.decoratedPlayerBarRenderer && t.decoratedPlayerBarRenderer.decoratedPlayerBarRenderer.playerBar, r = n && n.multiMarkersPlayerBarRenderer && n.multiMarkersPlayerBarRenderer.markersMap, a = Array.isArray(r) && r.find((c) => c.value && Array.isArray(c.value.chapters));
  return a ? a.value.chapters.map((c) => ({
    title: Y(c.chapterRenderer.title),
    start_time: c.chapterRenderer.timeRangeStartMillis / 1e3
  })) : [];
};
var Ct = {};
const { setTimeout: ia } = H;
var Rn = class extends Map {
  constructor(t = 1e3) {
    super(), this.timeout = t;
  }
  set(t, n) {
    this.has(t) && clearTimeout(super.get(t).tid), super.set(t, {
      tid: ia(this.delete.bind(this, t), this.timeout).unref(),
      value: n
    });
  }
  get(t) {
    let n = super.get(t);
    return n ? n.value : null;
  }
  getOrSet(t, n) {
    if (this.has(t))
      return this.get(t);
    {
      let r = n();
      return this.set(t, r), (async () => {
        try {
          await r;
        } catch {
          this.delete(t);
        }
      })(), r;
    }
  }
  delete(t) {
    let n = super.get(t);
    n && (clearTimeout(n.tid), super.delete(t));
  }
  clear() {
    for (let t of this.values())
      clearTimeout(t.tid);
    super.clear();
  }
};
(function(e) {
  const t = H, n = Rn, r = ge, a = H;
  e.cache = new n(), e.getFunctions = (s, c) => e.cache.getOrSet(s, async () => {
    const p = await r.exposedMiniget(s, c).text(), m = e.extractFunctions(p);
    if (!m || !m.length)
      throw Error("Could not extract functions");
    return e.cache.set(s, m), m;
  }), e.extractFunctions = (s) => {
    const c = [], p = (l) => {
      const u = r.between(l, 'a=a.split("");', ".");
      if (!u)
        return "";
      const w = `var ${u}={`, f = s.indexOf(w);
      if (f < 0)
        return "";
      const g = s.slice(f + w.length - 1);
      return `var ${u}=${r.cutAfterJS(g)}`;
    }, m = () => {
      const l = r.between(s, 'a.set("alr","yes");c&&(c=', "(decodeURIC");
      if (l && l.length) {
        const u = `${l}=function(a)`, w = s.indexOf(u);
        if (w >= 0) {
          const f = s.slice(w + u.length);
          let g = `var ${u}${r.cutAfterJS(f)}`;
          g = `${p(g)};${g};${l}(sig);`, c.push(g);
        }
      }
    }, d = () => {
      let l = r.between(s, '&&(b=a.get("n"))&&(b=', "(b)");
      if (l.includes("[") && (l = r.between(s, `${l.split("[")[0]}=[`, "]")), l && l.length) {
        const u = `${l}=function(a)`, w = s.indexOf(u);
        if (w >= 0) {
          const f = s.slice(w + u.length), g = `var ${u}${r.cutAfterJS(f)};${l}(ncode);`;
          c.push(g);
        }
      }
    };
    return m(), d(), c;
  }, e.setDownloadURL = (s, c, p) => {
    const m = (w) => {
      const f = t.parse(w);
      if (!f.s || !c)
        return f.url;
      const g = new URL(decodeURIComponent(f.url));
      return g.searchParams.set(
        f.sp ? f.sp : "signature",
        c.runInNewContext({ sig: decodeURIComponent(f.s) })
      ), g.toString();
    }, d = (w) => {
      const f = new URL(decodeURIComponent(w)), g = f.searchParams.get("n");
      return !g || !p ? w : (f.searchParams.set("n", p.runInNewContext({ ncode: g })), f.toString());
    }, l = !s.url, u = s.url || s.signatureCipher || s.cipher;
    s.url = d(l ? m(u) : u), delete s.signatureCipher, delete s.cipher;
  }, e.decipherFormats = async (s, c, p) => {
    let m = {}, d = await e.getFunctions(c, p);
    const l = d.length ? new a.Script(d[0]) : null, u = d.length > 1 ? new a.Script(d[1]) : null;
    return s.forEach((w) => {
      e.setDownloadURL(w, l, u), m[w.url] = w;
    }), m;
  };
})(Ct);
(function(e) {
  const t = H, n = gt, r = $e, a = ge, { setTimeout: s } = H, c = wt, p = Tt, m = oe, d = Ct, l = Rn, u = "https://www.youtube.com/watch?v=";
  e.cache = new l(), e.cookieCache = new l(1e3 * 60 * 60 * 24), e.watchPageCache = new l();
  let w = "2.20210622.10.00";
  class f extends Error {
  }
  const g = [
    "support.google.com/youtube/?p=age_restrictions",
    "youtube.com/t/community_guidelines"
  ];
  e.getBasicInfo = async (C, E) => {
    E.IPv6Block && (E.requestOptions = Object.assign({}, E.requestOptions, {
      family: 6,
      localAddress: a.getRandomIPv6(E.IPv6Block)
    }));
    const o = Object.assign({}, r.defaultOptions, E.requestOptions);
    E.requestOptions = Object.assign({}, E.requestOptions, {}), E.requestOptions.headers = Object.assign(
      {},
      {
        // eslint-disable-next-line max-len
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36"
      },
      E.requestOptions.headers
    );
    let b = await Z([C, E], (B) => {
      let L = a.playError(B.player_response, ["ERROR"], f), $ = T(B.player_response);
      if (L || $)
        throw L || $;
      return B && B.player_response && (B.player_response.streamingData || A(B.player_response) || O(B.player_response));
    }, o, [
      v,
      q,
      ne
    ]);
    Object.assign(b, {
      formats: Te(b.player_response),
      related_videos: m.getRelatedVideos(b)
    });
    const h = m.getMedia(b), R = {
      author: m.getAuthor(b),
      media: h,
      likes: m.getLikes(b),
      dislikes: m.getDislikes(b),
      age_restricted: !!(h && g.some((B) => Object.values(h).some((L) => typeof L == "string" && L.includes(B)))),
      // Give the standard link to the video.
      video_url: u + C,
      storyboards: m.getStoryboards(b),
      chapters: m.getChapters(b)
    };
    return b.videoDetails = m.cleanVideoDetails(Object.assign(
      {},
      b.player_response && b.player_response.microformat && b.player_response.microformat.playerMicroformatRenderer,
      b.player_response && b.player_response.videoDetails,
      R
    ), b), b;
  };
  const T = (C) => {
    let E = C && C.playabilityStatus;
    return E && E.status === "LOGIN_REQUIRED" && E.messages && E.messages.filter((o) => /This is a private video/.test(o)).length ? new f(E.reason || E.messages && E.messages[0]) : null;
  }, A = (C) => {
    let E = C.playabilityStatus;
    return E && E.status === "UNPLAYABLE" && E.errorScreen && E.errorScreen.playerLegacyDesktopYpcOfferRenderer;
  }, O = (C) => {
    let E = C.playabilityStatus;
    return E && E.status === "LIVE_STREAM_OFFLINE";
  }, S = (C, E) => `${u + C}&hl=${E.lang || "en"}`, N = (C, E) => {
    const o = S(C, E);
    return e.watchPageCache.getOrSet(o, () => a.exposedMiniget(o, E).text());
  }, F = "https://www.youtube.com/embed/", V = (C, E) => {
    const o = `${F + C}?hl=${E.lang || "en"}`;
    return a.exposedMiniget(o, E).text();
  }, G = (C) => {
    let E = /<script\s+src="([^"]+)"(?:\s+type="text\/javascript")?\s+name="player_ias\/base"\s*>|"jsUrl":"([^"]+)"/.exec(C);
    return E ? E[1] || E[2] : null;
  }, M = (C, E, o, i) => e.cookieCache.getOrSet(o, async () => {
    let h = (await N(C, E)).match(/(["'])ID_TOKEN\1[:,]\s?"([^"]+)"/);
    if (!h && i)
      throw new f("Cookie header used in request, but unable to find YouTube identity token");
    return h && h[2];
  }), Z = async (C, E, o, i) => {
    let b;
    for (let h of i)
      try {
        const R = await D(h, C.concat([b]), o);
        if (R.player_response && (R.player_response.videoDetails = y(
          b && b.player_response && b.player_response.videoDetails,
          R.player_response.videoDetails
        ), R.player_response = y(b && b.player_response, R.player_response)), b = y(b, R), E(b, !1))
          break;
      } catch (R) {
        if (R instanceof f || h === i[i.length - 1])
          throw R;
      }
    return b;
  }, y = (C, E) => {
    if (!C || !E)
      return C || E;
    for (let [o, i] of Object.entries(E))
      i != null && (C[o] = i);
    return C;
  }, D = async (C, E, o) => {
    let i = 0, b;
    for (; i <= o.maxRetries; )
      try {
        b = await C(...E);
        break;
      } catch (h) {
        if (h instanceof f || h instanceof r.MinigetError && h.statusCode < 500 || i >= o.maxRetries)
          throw h;
        let R = Math.min(++i * o.backoff.inc, o.backoff.max);
        await new Promise((B) => s(B, R));
      }
    return b;
  }, P = /^[)\]}'\s]+/, I = (C, E, o) => {
    if (!o || typeof o == "object")
      return o;
    try {
      return o = o.replace(P, ""), JSON.parse(o);
    } catch (i) {
      throw Error(`Error parsing ${E} in ${C}: ${i.message}`);
    }
  }, U = (C, E, o, i, b, h) => {
    let R = a.between(o, i, b);
    if (!R)
      throw Error(`Could not find ${E} in ${C}`);
    return I(C, E, a.cutAfterJS(`${h}${R}`));
  }, k = (C, E) => {
    const o = E && (E.args && E.args.player_response || E.player_response || E.playerResponse || E.embedded_player_response);
    return I(C, "player_response", o);
  }, Q = (C, E) => `${S(C, E)}&pbj=1`, q = async (C, E) => {
    const o = Object.assign({ headers: {} }, E.requestOptions);
    let i = o.headers.Cookie || o.headers.cookie;
    o.headers = Object.assign({
      "x-youtube-client-name": "1",
      "x-youtube-client-version": w,
      "x-youtube-identity-token": e.cookieCache.get(i || "browser") || ""
    }, o.headers);
    const b = async ($, J) => {
      o.headers["x-youtube-identity-token"] || (o.headers["x-youtube-identity-token"] = await M(C, E, $, J));
    };
    i && await b(i, !0);
    const h = Q(C, E), R = await a.exposedMiniget(h, E, o).text();
    let B = I("watch.json", "body", R);
    if (B.reload === "now" && await b("browser", !1), B.reload === "now" || !Array.isArray(B))
      throw Error("Unable to retrieve video metadata in watch.json");
    let L = B.reduce(($, J) => Object.assign(J, $), {});
    return L.player_response = k("watch.json", L), L.html5player = L.player && L.player.assets && L.player.assets.js, L;
  }, v = async (C, E) => {
    let o = await N(C, E), i = { page: "watch" };
    try {
      w = a.between(o, '{"key":"cver","value":"', '"}'), i.player_response = U(
        "watch.html",
        "player_response",
        o,
        /\bytInitialPlayerResponse\s*=\s*\{/i,
        "<\/script>",
        "{"
      );
    } catch {
      let h = U("watch.html", "player_response", o, /\bytplayer\.config\s*=\s*{/, "<\/script>", "{");
      i.player_response = k("watch.html", h);
    }
    return i.response = U("watch.html", "response", o, /\bytInitialData("\])?\s*=\s*\{/i, "<\/script>", "{"), i.html5player = G(o), i;
  }, z = "www.youtube.com", se = "/get_video_info", we = "https://youtube.googleapis.com/v/", ne = async (C, E) => {
    const o = new URL(`https://${z}${se}`);
    o.searchParams.set("video_id", C), o.searchParams.set("c", "TVHTML5"), o.searchParams.set("cver", `7${w.substr(1)}`), o.searchParams.set("eurl", we + C), o.searchParams.set("ps", "default"), o.searchParams.set("gl", "US"), o.searchParams.set("hl", E.lang || "en"), o.searchParams.set("html5", "1");
    const i = await a.exposedMiniget(o.toString(), E).text();
    let b = t.parse(i);
    return b.player_response = k("get_video_info", b), b;
  }, Te = (C) => {
    let E = [];
    return C && C.streamingData && (E = E.concat(C.streamingData.formats || []).concat(C.streamingData.adaptiveFormats || [])), E;
  };
  e.getInfo = async (C, E) => {
    let o = await e.getBasicInfo(C, E);
    const i = o.player_response && o.player_response.streamingData && (o.player_response.streamingData.dashManifestUrl || o.player_response.streamingData.hlsManifestUrl);
    let b = [];
    if (o.formats.length) {
      if (o.html5player = o.html5player || G(await N(C, E)) || G(await V(C, E)), !o.html5player)
        throw Error("Unable to find html5player file");
      const R = new URL(o.html5player, u).toString();
      b.push(d.decipherFormats(o.formats, R, E));
    }
    if (i && o.player_response.streamingData.dashManifestUrl) {
      let R = o.player_response.streamingData.dashManifestUrl;
      b.push(je(R, E));
    }
    if (i && o.player_response.streamingData.hlsManifestUrl) {
      let R = o.player_response.streamingData.hlsManifestUrl;
      b.push(Ne(R, E));
    }
    let h = await Promise.all(b);
    return o.formats = Object.values(Object.assign({}, ...h)), o.formats = o.formats.map(c.addFormatMeta), o.formats.sort(c.sortFormats), o.full = !0, o;
  };
  const je = (C, E) => new Promise((o, i) => {
    let b = {};
    const h = n.parser(!1);
    h.onerror = i;
    let R;
    h.onopentag = (L) => {
      if (L.name === "ADAPTATIONSET")
        R = L.attributes;
      else if (L.name === "REPRESENTATION") {
        const $ = parseInt(L.attributes.ID);
        isNaN($) || (b[C] = Object.assign({
          itag: $,
          url: C,
          bitrate: parseInt(L.attributes.BANDWIDTH),
          mimeType: `${R.MIMETYPE}; codecs="${L.attributes.CODECS}"`
        }, L.attributes.HEIGHT ? {
          width: parseInt(L.attributes.WIDTH),
          height: parseInt(L.attributes.HEIGHT),
          fps: parseInt(L.attributes.FRAMERATE)
        } : {
          audioSampleRate: L.attributes.AUDIOSAMPLINGRATE
        }));
      }
    }, h.onend = () => {
      o(b);
    };
    const B = a.exposedMiniget(new URL(C, u).toString(), E);
    B.setEncoding("utf8"), B.on("error", i), B.on("data", (L) => {
      h.write(L);
    }), B.on("end", h.close.bind(h));
  }), Ne = async (C, E) => {
    C = new URL(C, u);
    const o = await a.exposedMiniget(C.toString(), E).text();
    let i = {};
    return o.split(`
`).filter((b) => /^https?:\/\//.test(b)).forEach((b) => {
      const h = parseInt(b.match(/\/itag\/(\d+)\//)[1]);
      i[b] = { itag: h, url: b };
    }), i;
  };
  for (let C of ["getBasicInfo", "getInfo"]) {
    const E = e[C];
    e[C] = async (o, i = {}) => {
      a.checkForUpdates();
      let b = await p.getVideoID(o);
      const h = [C, b, i.lang].join("-");
      return e.cache.getOrSet(h, () => E(b, i));
    };
  }
  e.validateID = p.validateID, e.validateURL = p.validateURL, e.getURLVideoID = p.getURLVideoID, e.getVideoID = p.getVideoID;
})(Tn);
const aa = H.PassThrough, Re = Tn, Yt = ge, Rt = wt, He = Tt, oa = Ct, Qt = $e, sa = At, { parseTimestamp: ca } = At, K = (e, t) => {
  const n = Sn(t);
  return K.getInfo(e, t).then((r) => {
    In(n, r, t);
  }, n.emit.bind(n, "error")), n;
};
var la = K;
K.getBasicInfo = Re.getBasicInfo;
K.getInfo = Re.getInfo;
K.chooseFormat = Rt.chooseFormat;
K.filterFormats = Rt.filterFormats;
K.validateID = He.validateID;
K.validateURL = He.validateURL;
K.getURLVideoID = He.getURLVideoID;
K.getVideoID = He.getVideoID;
K.cache = {
  sig: oa.cache,
  info: Re.cache,
  watch: Re.watchPageCache,
  cookie: Re.cookieCache
};
K.version = En.version;
const Sn = (e) => {
  const t = new aa({
    highWaterMark: e && e.highWaterMark || 524288
  });
  return t._destroy = () => {
    t.destroyed = !0;
  }, t;
}, Ze = (e, t, n) => {
  [
    "abort",
    "request",
    "response",
    "error",
    "redirect",
    "retry",
    "reconnect"
  ].forEach((r) => {
    e.prependListener(r, t.emit.bind(t, r));
  }), e.pipe(t, { end: n });
}, In = (e, t, n) => {
  n = n || {};
  let r = Yt.playError(t.player_response, ["UNPLAYABLE", "LIVE_STREAM_OFFLINE", "LOGIN_REQUIRED"]);
  if (r) {
    e.emit("error", r);
    return;
  }
  if (!t.formats.length) {
    e.emit("error", Error("This video is unavailable"));
    return;
  }
  let a;
  try {
    a = Rt.chooseFormat(t.formats, n);
  } catch (u) {
    e.emit("error", u);
    return;
  }
  if (e.emit("info", t, a), e.destroyed)
    return;
  let s, c = 0;
  const p = (u) => {
    c += u.length, e.emit("progress", u.length, c, s);
  };
  n.IPv6Block && (n.requestOptions = Object.assign({}, n.requestOptions, {
    family: 6,
    localAddress: Yt.getRandomIPv6(n.IPv6Block)
  }));
  const m = n.dlChunkSize || 1024 * 1024 * 10;
  let d, l = !0;
  if (a.isHLS || a.isDashMPD)
    d = sa(a.url, {
      chunkReadahead: +t.live_chunk_readahead,
      begin: n.begin || a.isLive && Date.now(),
      liveBuffer: n.liveBuffer,
      requestOptions: n.requestOptions,
      parser: a.isDashMPD ? "dash-mpd" : "m3u8",
      id: a.itag
    }), d.on("progress", (u, w) => {
      e.emit("progress", u.size, u.num, w);
    }), Ze(d, e, l);
  else {
    const u = Object.assign({}, n.requestOptions, {
      maxReconnects: 6,
      maxRetries: 3,
      backoff: { inc: 500, max: 1e4 }
    });
    if (m !== 0 && (!a.hasAudio || !a.hasVideo)) {
      let f = n.range && n.range.start || 0, g = f + m;
      const T = n.range && n.range.end;
      s = n.range ? (T ? T + 1 : parseInt(a.contentLength)) - f : parseInt(a.contentLength);
      const A = () => {
        !T && g >= s && (g = 0), T && g > T && (g = T), l = !g || g === T, u.headers = Object.assign({}, u.headers, {
          Range: `bytes=${f}-${g || ""}`
        }), d = Qt(a.url, u), d.on("data", p), d.on("end", () => {
          e.destroyed || g && g !== T && (f = g + 1, g += m, A());
        }), Ze(d, e, l);
      };
      A();
    } else
      n.begin && (a.url += `&begin=${ca(n.begin)}`), n.range && (n.range.start || n.range.end) && (u.headers = Object.assign({}, u.headers, {
        Range: `bytes=${n.range.start || "0"}-${n.range.end || ""}`
      })), d = Qt(a.url, u), d.on("response", (f) => {
        e.destroyed || (s = s || parseInt(f.headers["content-length"]));
      }), d.on("data", p), Ze(d, e, l);
  }
  e._destroy = () => {
    e.destroyed = !0, d.destroy(), d.end();
  };
};
K.downloadFromInfo = (e, t) => {
  const n = Sn(t);
  if (!e.full)
    throw Error("Cannot use `ytdl.downloadFromInfo()` when called with info from `ytdl.getBasicInfo()`");
  return setImmediate(() => {
    In(n, e, t);
  }), n;
};
class ua {
  constructor(t) {
    t.agent && (this.agent = wn(t.agent));
  }
  /**
   * 获取视频详情
   * @param postId
   */
  async detail(t) {
    return new Promise(async (n, r) => {
      const a = {
        quality: "highest",
        requestOptions: { agent: this.agent }
      };
      la.getInfo(t, a).then(async (s) => {
        n(this.parseMeta(s));
      });
    });
  }
  parseMeta(t) {
    const { videoDetails: n, formats: r } = t, a = n.thumbnails.sort(
      (m, d) => d.width - m.width
    )[0], s = r.filter((m) => m.hasVideo && m.hasAudio).sort((m, d) => d.bitrate - m.bitrate)[0], c = n.author.thumbnails.sort(
      (m, d) => d.width - m.width
    )[0];
    return {
      id: n.videoId,
      // ID
      url: n.video_url,
      // 访问地址
      title: n.title,
      // 标题
      description: n.description,
      // 描述
      category: n.category,
      // 分类
      tags: [],
      // 标签
      created_at: n.uploadDate,
      // 发布日期
      video: {
        quality: s.qualityLabel,
        //质量标签
        width: s.width,
        // 宽度
        height: s.height,
        // 高度
        duration: Number(n.lengthSeconds),
        // 秒长
        cover_url: a.url,
        // 封面地址，有时效
        video_url: s.url
        // 视频地址，有时效
      },
      stats: {
        view: n.viewCount,
        // 播放
        likes: Number(n.likes),
        // 喜欢
        comment: 0,
        // 评论
        favourite: 0,
        // 收藏
        share: 0
        // 分享
      },
      author: {
        id: n.author.id,
        // 频道ID
        name: n.author.name,
        // 频道名称
        avatar_url: c,
        // 频道头像，有时效
        channel_url: n.author.channel_url,
        // 频道访问地址
        subscriber_count: n.author.subscriber_count
        // 订阅人数
      }
    };
  }
}
class da {
  constructor() {
    this.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";
  }
  async detail(t) {
    return await ht.post(
      "https://www.kuaishou.com/graphql",
      {
        operationName: "visionVideoDetail",
        variables: {
          photoId: `${t}`,
          page: "detail"
        },
        query: `query visionVideoDetail($photoId: String, $type: String, $page: String, $webPageArea: String) {
  visionVideoDetail(photoId: $photoId, type: $type, page: $page, webPageArea: $webPageArea) {
    status
    type
    author {
      id
      name
      following
      headerUrl
      __typename
    }
    photo {
      id
      duration
      caption
      likeCount
      realLikeCount
      coverUrl
      photoUrl
      liked
      timestamp
      expTag
      llsid
      viewCount
      videoRatio
      stereoType
      croppedPhotoUrl
      manifest {
        mediaType
        businessType
        version
        adaptationSet {
          id
          duration
          representation {
            id
            defaultSelect
            backupUrl
            codecs
            url
            height
            width
            avgBitrate
            maxBitrate
            m3u8Slice
            qualityType
            qualityLabel
            frameRate
            featureP2sp
            hidden
            disableAdaptive
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    tags {
      type
      name
      __typename
    }
    commentLimit {
      canAddComment
      __typename
    }
    llsid
    danmakuSwitch
    __typename
  }
}
`
      },
      {
        headers: {
          "content-type": "application/json",
          "user-agent": this.userAgent,
          Cookie: "kpf=PC_WEB; clientid=3; didv=1672015855539; did=web_9663dffb9dd73e09dfdda14434e5202b; clientid=3; kpn=KUAISHOU_VISION"
        }
      }
    ).then(async ({ data: n }) => this.parseMeta(n.data.visionVideoDetail));
  }
  formatCount(t) {
    t = t.toString();
    let n = Number(t.replace(/(万)/, ""));
    return t.indexOf("万") > -1 && (n = n * 1e4), n;
  }
  parseMeta(t) {
    const { photo: n, tags: r, author: a } = t, s = n.manifest.adaptationSet[0].representation[0];
    return {
      id: n.id,
      // ID
      url: `https://www.kuaishou.com/short-video/${n.id}`,
      // 访问地址
      title: n.caption,
      // 标题
      description: "",
      // 描述
      tags: r.map((p) => p.name),
      // 标签
      category: "",
      // 分类
      created_at: ot(n.timestamp / 1e3),
      // 发布日期
      video: {
        quality: s.qualityType,
        //质量标签
        width: s.width,
        // 宽度
        height: s.height,
        // 高度
        duration: Math.floor(n.duration / 1e3),
        // 秒长
        cover_url: n.coverUrl,
        // 封面地址，有时效
        video_url: n.photoUrl
        // 无水印视频地址，有时效
      },
      stats: {
        view: this.formatCount(n.viewCount),
        // 播放
        likes: this.formatCount(n.realLikeCount),
        // 喜欢
        comment: 0,
        // 评论
        favourite: 0,
        // 收藏
        share: 0
        // 转发
      },
      author: {
        id: a.id,
        // 频道ID
        name: a.name,
        // 频道名称
        avatar_url: a.headerUrl,
        // 频道头像，有时效
        channel_url: `https://www.kuaishou.com/profile/${a.id}`,
        // 频道访问地址
        subscriber_count: 0
        // 订阅人数
      }
    };
  }
}
class pa {
  constructor(t, n) {
    if (t == "tiktok") {
      this.client = new gi(n);
      return;
    }
    if (t == "douyin") {
      this.client = new wi();
      return;
    }
    if (t == "youtube") {
      this.client = new ua(n);
      return;
    }
    if (t == "kuaishou") {
      this.client = new da();
      return;
    }
    throw new Error(`unsupport the video type: ${t}`);
  }
  /**
   * 视频地址解析
   * @param url
   * @returns
   */
  static async detect(t) {
    return Dn(t);
  }
  /**
   * 获取视频详情
   */
  detail(t) {
    return this.client.detail(t);
  }
  // 获取数据
  statistics(t) {
  }
}
export {
  pa as Butterfly
};
