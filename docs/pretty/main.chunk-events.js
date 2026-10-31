import {
  d as $t,
  e as T,
  j as ta,
  k as ee,
  l as ht,
  t as Ke,
  u as W,
} from "./chunk-CXVKRLVB.js";
import { a as D } from "./chunk-53SIT7PA.js";
import {
  $ as ho,
  $a as Zs,
  $b as Gs,
  $c as J,
  Ac as Co,
  Ad as Qe,
  B as Ee,
  Bc as Io,
  Bd as ea,
  Cc as Mn,
  Dc as xn,
  Ec as On,
  F as $s,
  Fc as bo,
  Jd as Ro,
  Mb as So,
  N as xe,
  O as zs,
  Pc as Eo,
  Sb as Bt,
  Tb as An,
  Zb as Hs,
  _ as go,
  _b as Ut,
  _c as Xs,
  a as l,
  aa as Oe,
  ad as Ys,
  bd as Qs,
  c as Bs,
  ca as Ft,
  cd as ke,
  d as Us,
  de as Nn,
  ea as mt,
  f as be,
  g as mo,
  ha as yo,
  l as Rn,
  ma as gt,
  na as wo,
  nc as Po,
  oc as qs,
  r as Ws,
  sc as De,
  tc as Wt,
  u as js,
  uc as Ks,
  va as Te,
  vb as vo,
  vc as jt,
  wb as Ye,
  wc as Vs,
  xb as qe,
  xc as _o,
  xd as To,
  yc as Ne,
  yd as Dn,
  zb as ko,
  zc as Js,
} from "./chunk-CJROBAMZ.js";
import { a as X } from "./chunk-CM2YMK3U.js";
import { a as i, b as Np, d as Lp, e as r, g as o } from "./chunk-HH7N2YVI.js";
var Qc = Np((kW, Yc) => {
  r();
  o();
  function Hc(e) {
    return Array.isArray(e) ? e : [e];
  }
  i(Hc, "makeArray");
  var fi = "",
    Gc = " ",
    ui = "\\",
    zh = /^\s+$/,
    Zh = /(?:[^\\]|^)\\$/,
    Hh = /^\\!/,
    Gh = /^\\#/,
    qh = /\r?\n/g,
    Kh = /^\.*\/|^\.+$/,
    pi = "/",
    Vc = "node-ignore";
  typeof Symbol < "u" && (Vc = Symbol.for("node-ignore"));
  var qc = Vc,
    Vh = i((e, t, n) => Object.defineProperty(e, t, { value: n }), "define"),
    Jh = /([0-z])-([0-z])/g,
    Jc = i(() => !1, "RETURN_FALSE"),
    Xh = i(
      (e) =>
        e.replace(Jh, (t, n, s) =>
          n.charCodeAt(0) <= s.charCodeAt(0) ? t : fi,
        ),
      "sanitizeRange",
    ),
    Yh = i((e) => {
      let { length: t } = e;
      return e.slice(0, t - (t % 2));
    }, "cleanRangeBackSlash"),
    Qh = [
      [/^\uFEFF/, () => fi],
      [
        /((?:\\\\)*?)(\\?\s+)$/,
        (e, t, n) => t + (n.indexOf("\\") === 0 ? Gc : fi),
      ],
      [
        /(\\+?)\s/g,
        (e, t) => {
          let { length: n } = t;
          return t.slice(0, n - (n % 2)) + Gc;
        },
      ],
      [/[\\$.|*+(){^]/g, (e) => `\\${e}`],
      [/(?!\\)\?/g, () => "[^/]"],
      [/^\//, () => "^"],
      [/\//g, () => "\\/"],
      [/^\^*\\\*\\\*\\\//, () => "^(?:.*\\/)?"],
      [
        /^(?=[^^])/,
        i(function () {
          return /\/(?!$)/.test(this) ? "^" : "(?:^|\\/)";
        }, "startingReplacer"),
      ],
      [
        /\\\/\\\*\\\*(?=\\\/|$)/g,
        (e, t, n) => (t + 6 < n.length ? "(?:\\/[^\\/]+)*" : "\\/.+"),
      ],
      [
        /(^|[^\\]+)(\\\*)+(?=.+)/g,
        (e, t, n) => {
          let s = n.replace(/\\\*/g, "[^\\/]*");
          return t + s;
        },
      ],
      [/\\\\\\(?=[$.|*+(){^])/g, () => ui],
      [/\\\\/g, () => ui],
      [
        /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
        (e, t, n, s, a) =>
          t === ui
            ? `\\[${n}${Yh(s)}${a}`
            : a === "]" && s.length % 2 === 0
              ? `[${Xh(n)}${s}]`
              : "[]",
      ],
      [/(?:[^*])$/, (e) => (/\/$/.test(e) ? `${e}$` : `${e}(?=$|\\/$)`)],
      [/(\^|\\\/)?\\\*$/, (e, t) => `${t ? `${t}[^/]+` : "[^/]*"}(?=$|\\/$)`],
    ],
    Kc = Object.create(null),
    ey = i((e, t) => {
      let n = Kc[e];
      return (
        n ||
          ((n = Qh.reduce((s, [a, c]) => s.replace(a, c.bind(e)), e)),
          (Kc[e] = n)),
        t ? new RegExp(n, "i") : new RegExp(n)
      );
    }, "makeRegex"),
    hi = i((e) => typeof e == "string", "isString"),
    ty = i(
      (e) => e && hi(e) && !zh.test(e) && !Zh.test(e) && e.indexOf("#") !== 0,
      "checkPattern",
    ),
    ny = i((e) => e.split(qh), "splitPattern"),
    mi = class {
      static {
        i(this, "IgnoreRule");
      }
      constructor(t, n, s, a) {
        ((this.origin = t),
          (this.pattern = n),
          (this.negative = s),
          (this.regex = a));
      }
    },
    ry = i((e, t) => {
      let n = e,
        s = !1;
      (e.indexOf("!") === 0 && ((s = !0), (e = e.substr(1))),
        (e = e.replace(Hh, "!").replace(Gh, "#")));
      let a = ey(e, t);
      return new mi(n, e, s, a);
    }, "createRule"),
    oy = i((e, t) => {
      throw new t(e);
    }, "throwError"),
    Ze = i(
      (e, t, n) =>
        hi(e)
          ? e
            ? Ze.isNotRelative(e)
              ? n(
                  `path should be a \`path.relative()\`d string, but got "${t}"`,
                  RangeError,
                )
              : !0
            : n("path must not be empty", TypeError)
          : n(`path must be a string, but got \`${t}\``, TypeError),
      "checkPath",
    ),
    Xc = i((e) => Kh.test(e), "isNotRelative");
  Ze.isNotRelative = Xc;
  Ze.convert = (e) => e;
  var gi = class {
      static {
        i(this, "Ignore");
      }
      constructor({
        ignorecase: t = !0,
        ignoreCase: n = t,
        allowRelativePaths: s = !1,
      } = {}) {
        (Vh(this, qc, !0),
          (this._rules = []),
          (this._ignoreCase = n),
          (this._allowRelativePaths = s),
          this._initCache());
      }
      _initCache() {
        ((this._ignoreCache = Object.create(null)),
          (this._testCache = Object.create(null)));
      }
      _addPattern(t) {
        if (t && t[qc]) {
          ((this._rules = this._rules.concat(t._rules)), (this._added = !0));
          return;
        }
        if (ty(t)) {
          let n = ry(t, this._ignoreCase);
          ((this._added = !0), this._rules.push(n));
        }
      }
      add(t) {
        return (
          (this._added = !1),
          Hc(hi(t) ? ny(t) : t).forEach(this._addPattern, this),
          this._added && this._initCache(),
          this
        );
      }
      addPattern(t) {
        return this.add(t);
      }
      _testOne(t, n) {
        let s = !1,
          a = !1;
        return (
          this._rules.forEach((c) => {
            let { negative: d } = c;
            if ((a === d && s !== a) || (d && !s && !a && !n)) return;
            c.regex.test(t) && ((s = !d), (a = d));
          }),
          { ignored: s, unignored: a }
        );
      }
      _test(t, n, s, a) {
        let c = t && Ze.convert(t);
        return (
          Ze(c, t, this._allowRelativePaths ? Jc : oy),
          this._t(c, n, s, a)
        );
      }
      _t(t, n, s, a) {
        if (t in n) return n[t];
        if ((a || (a = t.split(pi)), a.pop(), !a.length))
          return (n[t] = this._testOne(t, s));
        let c = this._t(a.join(pi) + pi, n, s, a);
        return (n[t] = c.ignored ? c : this._testOne(t, s));
      }
      ignores(t) {
        return this._test(t, this._ignoreCache, !1).ignored;
      }
      createFilter() {
        return (t) => !this.ignores(t);
      }
      filter(t) {
        return Hc(t).filter(this.createFilter());
      }
      test(t) {
        return this._test(t, this._testCache, !0);
      }
    },
    mr = i((e) => new gi(e), "factory"),
    iy = i((e) => Ze(e && Ze.convert(e), e, Jc), "isPathValid");
  mr.isPathValid = iy;
  mr.default = mr;
  Yc.exports = mr;
  if (
    typeof process < "u" &&
    ((process.env && process.env.IGNORE_TEST_WIN32) ||
      process.platform === "win32")
  ) {
    let e = i(
      (n) =>
        /^\\\\\?\\/.test(n) || /["<>|\u0000-\u001F]+/u.test(n)
          ? n
          : n.replace(/\\/g, "/"),
      "makePosix",
    );
    Ze.convert = e;
    let t = /^[a-z]:\//i;
    Ze.isNotRelative = (n) => t.test(n) || Xc(n);
  }
});
r();
o();
import { lstatSync as Fp } from "node:fs";
import { cp as Bp } from "node:fs/promises";
import { createHash as Up } from "node:crypto";
import { basename as Wp, join as Le, win32 as yt } from "node:path";
import { homedir as jp } from "node:os";
var Ao = null,
  oa = "ZCODE_WINDOWS_APP_INSTALL_DIR",
  na = process.env.ZCODE_DATA_BASE_DIR?.trim() || null,
  $p = process.env.HOME?.trim() || jp();
function zp(e) {
  Ao = e?.trim() || null;
}
i(zp, "setDataBaseDir");
function Re() {
  return Ao || na || $p;
}
i(Re, "getDataBaseDir");
function Fe() {
  return Le(Re(), ".zcode");
}
i(Fe, "getZCodeDataRootDir");
function Ln() {
  return Le(Fe(), "workspace", "default");
}
i(Ln, "getConversationWorkspaceDir");
function G() {
  return Le(Fe(), "v2");
}
i(G, "getAppConfigDir");
function zt(e, t) {
  let n = e[t]?.trim();
  if (n) return n;
  let s = t.toLowerCase();
  for (let [a, c] of Object.entries(e)) {
    if (a.toLowerCase() !== s) continue;
    let d = c?.trim();
    if (d) return d;
  }
}
i(zt, "readEnvValue");
function Mo(e) {
  let t = e.trim();
  if (!t) return null;
  let n = yt.normalize(t).replace(/[\\/]+$/, "");
  return n
    ? yt
        .resolve(n)
        .replace(/[\\/]+$/, "")
        .toLowerCase()
    : null;
}
i(Mo, "normalizeWindowsComparablePath");
function Zp(e, t) {
  let n = Mo(e),
    s = Mo(t);
  return !n || !s ? !1 : n === s || n.startsWith(`${s}\\`);
}
i(Zp, "isWindowsPathEqualOrInside");
function Hp(e) {
  let t = e.env,
    n = zt(t, "ProgramFiles"),
    s = zt(t, "ProgramFiles(x86)"),
    a = zt(t, "ProgramW6432"),
    c = zt(t, "LOCALAPPDATA"),
    d = [
      e.appInstallDir,
      zt(t, oa),
      n ? yt.join(n, "ZCode") : null,
      s ? yt.join(s, "ZCode") : null,
      a ? yt.join(a, "ZCode") : null,
      c ? yt.join(c, "Programs", "ZCode") : null,
    ],
    m = new Set(),
    f = [];
  for (let g of d) {
    let h = typeof g == "string" ? Mo(g) : null;
    !g || !h || m.has(h) || (m.add(h), f.push(g));
  }
  return f;
}
i(Hp, "collectWindowsForbiddenAppInstallDirs");
function xo(e, t = {}) {
  if ((t.platform ?? process.platform) !== "win32") return { ok: !0 };
  for (let n of Hp({
    env: t.env ?? process.env,
    appInstallDir: t.appInstallDir ?? null,
  }))
    if (Zp(e, n)) return { ok: !1, code: ea, forbiddenDir: n };
  return { ok: !0 };
}
i(xo, "validateDataBaseDirTarget");
function Gp() {
  return Le(Fe(), "export-log-stage");
}
i(Gp, "getExportLogStageDir");
function qp() {
  return Le(Fe(), "export-log");
}
i(qp, "getExportLogDir");
function Oo() {
  return Le(Fe(), "feedback");
}
i(Oo, "getFeedbackRootDir");
function ia() {
  return Le(Oo(), "logs");
}
i(ia, "getFeedbackLogArchiveDir");
function Kp(e, t) {
  return t?.trim() || e;
}
i(Kp, "getWorkspaceKey");
function Zt(e, t) {
  return Up("sha256").update(Kp(e, t)).digest("hex").slice(0, 12);
}
i(Zt, "getWorkspaceHash");
async function Do(e, t) {
  let n = Le(e, ".zcode", "v2"),
    s = Le(t, ".zcode", "v2");
  await Bp(n, s, {
    recursive: !0,
    force: !1,
    filter: i((a) => {
      let c = Wp(a);
      if (c === "setting.json" || c.startsWith("setting.json.")) return !1;
      try {
        if (Fp(a).isSymbolicLink()) return !1;
      } catch {}
      return !0;
    }, "filter"),
  });
}
i(Do, "copyDataDirectory");
r();
o();
import { readFile as Ba, mkdir as Wa, rename as im } from "node:fs/promises";
import { dirname as ja, join as sm } from "node:path";
import { homedir as $a } from "node:os";
r();
o();
function sa(e) {
  let t = { ...e };
  if (
    ("locale" in t &&
      !("localePreference" in t) &&
      typeof t.locale == "string" &&
      (t.localePreference = t.locale),
    "terminalFontFamily" in t && typeof t.terminalFontFamily == "string")
  ) {
    let n = t.terminalFontFamily.trim();
    t.terminalFontFamily = n.length > 0 ? n : void 0;
  }
  if ("integratedTerminalShell" in t) {
    let n = t.integratedTerminalShell;
    n?.mode === "auto"
      ? (t.integratedTerminalShell = void 0)
      : n?.mode === "shell" &&
        (t.integratedTerminalShell = {
          ...n,
          id: n.id.trim(),
          label: n.label.trim(),
          path: n.path.trim(),
        });
  }
  if ("httpProxy" in t && typeof t.httpProxy == "string") {
    let n = t.httpProxy.trim();
    t.httpProxy = n.length > 0 ? n : void 0;
  }
  if ("httpProxyNoProxy" in t && typeof t.httpProxyNoProxy == "string") {
    let n = t.httpProxyNoProxy.trim();
    t.httpProxyNoProxy = n.length > 0 ? n : void 0;
  }
  if ("httpProxyCaCertPath" in t && typeof t.httpProxyCaCertPath == "string") {
    let n = t.httpProxyCaCertPath.trim();
    t.httpProxyCaCertPath = n.length > 0 ? n : void 0;
  }
  if ("zcodeEndpointOrigin" in t && typeof t.zcodeEndpointOrigin == "string") {
    let n = t.zcodeEndpointOrigin.trim();
    t.zcodeEndpointOrigin = n.length > 0 ? n : void 0;
  }
  if (
    "providerFamilyDomain" in t &&
    typeof t.providerFamilyDomain == "string"
  ) {
    let n = t.providerFamilyDomain.trim();
    t.providerFamilyDomain = n.length > 0 ? t.providerFamilyDomain : void 0;
  }
  return (
    "dynamicWorkflowMode" in t &&
      t.dynamicWorkflowMode === "" &&
      (t.dynamicWorkflowMode = void 0),
    t
  );
}
i(sa, "normalizeSettingsPatch");
r();
o();
var Un = "ZCODE_E2E_FS_FAULTS",
  ua = "ZCODE_E2E_FS_FAULTS_ALLOW",
  Vp = new Set([
    "any",
    "appendFile",
    "createWriteStream",
    "mkdir",
    "open",
    "readFile",
    "readdir",
    "rename",
    "rm",
    "sqliteOpen",
    "sqliteRun",
    "stat",
    "writeFile",
  ]);
function pa(e) {
  return e.replace(/\\/g, "/");
}
i(pa, "normalizePathForFaultMatch");
function aa(e) {
  return e === void 0 ? void 0 : pa(e);
}
i(aa, "normalizePathPattern");
function ca(e, t, n) {
  if (typeof e != "string" || e.trim().length === 0)
    throw new Error(
      `Invalid fs fault rule at index ${n}: ${t} must be a non-empty string`,
    );
  return e.trim();
}
i(ca, "assertNonEmptyString");
function Jp(e, t) {
  if (e === void 0) return ["any"];
  if (!Array.isArray(e) || e.length === 0)
    throw new Error(
      `Invalid fs fault rule at index ${t}: operations must be a non-empty array`,
    );
  return e.map((n) => {
    if (typeof n != "string" || !Vp.has(n))
      throw new Error(
        `Invalid fs fault rule at index ${t}: unsupported operation ${String(n)}`,
      );
    return n;
  });
}
i(Jp, "parseOperations");
function Xp(e, t) {
  if (e === void 0) return 1;
  if (typeof e != "number" || !Number.isInteger(e) || e < 0)
    throw new Error(
      `Invalid fs fault rule at index ${t}: maxMatches must be a non-negative integer`,
    );
  return e;
}
i(Xp, "parseMaxMatches");
function Fn(e, t, n) {
  if (e !== void 0) {
    if (typeof e != "string")
      throw new Error(
        `Invalid fs fault rule at index ${n}: ${t} must be a string`,
      );
    return e;
  }
}
i(Fn, "parseOptionalString");
function Yp(e, t) {
  let n = e,
    s = ca(n.id, "id", t),
    a = ca(n.code, "code", t),
    c = new Set(Jp(n.operations, t)),
    d = Xp(n.maxMatches, t),
    m = aa(Fn(n.pathIncludes, "pathIncludes", t)),
    f = aa(Fn(n.pathEndsWith, "pathEndsWith", t)),
    g = Fn(n.pathRegex, "pathRegex", t),
    h = Fn(n.message, "message", t),
    y;
  if (g !== void 0)
    try {
      y = new RegExp(g);
    } catch (S) {
      throw new Error(
        `Invalid fs fault rule at index ${t}: pathRegex is invalid: ${S instanceof Error ? S.message : String(S)}`,
      );
    }
  return {
    code: a,
    id: s,
    matchedCount: 0,
    maxMatches: d,
    message: h,
    operations: c,
    pathEndsWith: f,
    pathIncludes: m,
    pathRegex: y,
  };
}
i(Yp, "normalizeRule");
function Qp(e, t) {
  return e.operations.has("any") || e.operations.has(t);
}
i(Qp, "operationMatches");
function ef(e, t) {
  let n = pa(t);
  return !(
    (e.pathIncludes !== void 0 && !n.includes(e.pathIncludes)) ||
    (e.pathEndsWith !== void 0 && !n.endsWith(e.pathEndsWith)) ||
    (e.pathRegex !== void 0 && !e.pathRegex.test(n))
  );
}
i(ef, "pathMatches");
function tf(e) {
  return e.maxMatches === 0 || e.matchedCount < e.maxMatches;
}
i(tf, "hasRemainingMatches");
function nf(e) {
  let t = new Error(
    e.message ?? `Injected fs fault ${e.code} for ${e.operation}: ${e.path}`,
  );
  return (
    (t.code = e.code),
    (t.path = e.path),
    (t.syscall = e.operation),
    (t.zcodeFsFaultId = e.id),
    t
  );
}
i(nf, "createInjectedFsFaultError");
function fa(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    "zcodeFsFaultId" in e &&
    typeof e.zcodeFsFaultId == "string"
  );
}
i(fa, "isInjectedFsFaultError");
function Bn(e = []) {
  let t = e.map((s, a) => Yp(s, a)),
    n = [];
  return {
    isEnabled() {
      return t.length > 0;
    },
    maybeThrow(s) {
      for (let a of t)
        if (!(!tf(a) || !Qp(a, s.operation) || !ef(a, s.path)))
          throw (
            (a.matchedCount += 1),
            n.push({
              code: a.code,
              id: a.id,
              matchIndex: a.matchedCount,
              matchedAt: new Date().toISOString(),
              operation: s.operation,
              path: s.path,
            }),
            nf({
              code: a.code,
              id: a.id,
              message: a.message,
              operation: s.operation,
              path: s.path,
            })
          );
    },
    getHits() {
      return [...n];
    },
    reset() {
      n.length = 0;
      for (let s of t) s.matchedCount = 0;
    },
  };
}
i(Bn, "createFsFaultInjector");
function ma(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch (n) {
    throw new Error(
      `Invalid ${Un}: ${n instanceof Error ? n.message : String(n)}`,
    );
  }
  if (!Array.isArray(t))
    throw new Error(`Invalid ${Un}: expected a JSON array`);
  return t.map((n, s) => {
    if (typeof n != "object" || n === null || Array.isArray(n))
      throw new Error(
        `Invalid fs fault rule at index ${s}: rule must be an object`,
      );
    return n;
  });
}
i(ma, "parseFsFaultRulesFromEnvValue");
function rf(e = process.env) {
  let t = e[Un]?.trim();
  return !t || (e.ZCODE_ENV !== "test" && e[ua] !== "1") ? Bn() : Bn(ma(t));
}
i(rf, "createFsFaultInjectorFromEnv");
var da = null,
  la = null;
function ga() {
  return la || ((da ??= rf()), da);
}
i(ga, "getProcessFsFaultInjector");
function Be(e) {
  ga().maybeThrow(e);
}
i(Be, "maybeThrowInjectedFsFault");
r();
o();
import {
  mkdir as Zf,
  writeFile as Hf,
  rename as Gf,
  rm as Ra,
  readdir as qf,
  stat as Kf,
} from "node:fs/promises";
import { dirname as Aa, basename as Ma, join as xa } from "node:path";
import { setTimeout as Vf } from "node:timers/promises";
r();
o();
r();
o();
import {
  mkdir as of,
  readFile as Lo,
  readdir as wa,
  rmdir as jn,
  rm as Ht,
  stat as $n,
  writeFile as sf,
} from "node:fs/promises";
import { join as Wn } from "node:path";
import { setTimeout as af } from "node:timers/promises";
r();
o();
function ha() {
  let e = new Map();
  return (t, n, s) => {
    let a = [n.dev, n.ino, n.birthtimeMs, n.mtimeMs].join(":"),
      c = e.get(t);
    return c?.identity === a
      ? c.firstObservedAt
      : (e.set(t, { firstObservedAt: s, identity: a }), s);
  };
}
i(ha, "createLockInstanceObserver");
var cf = 5 * 6e4;
function et(e) {
  if (typeof e != "object" || e === null || !("code" in e)) return;
  let t = e.code;
  return typeof t == "string" ? t : void 0;
}
i(et, "getErrorCode");
function df(e) {
  return et(e) === "EEXIST";
}
i(df, "isFileExistsError");
function Fo(e, t) {
  return typeof e == "number" && Number.isFinite(e) && e >= 0 && e <= t + cf
    ? e
    : null;
}
i(Fo, "parseLockTimestamp");
function lf(e, t) {
  try {
    let n = JSON.parse(e);
    return {
      createdAt: Fo(n.createdAt, t),
      pid:
        typeof n.pid == "number" && Number.isSafeInteger(n.pid) && n.pid > 0
          ? n.pid
          : null,
    };
  } catch {
    return { createdAt: null, pid: null };
  }
}
i(lf, "parseLockMetadata");
function uf(e) {
  try {
    return (process.kill(e, 0), !0);
  } catch (t) {
    return et(t) !== "ESRCH";
  }
}
i(uf, "isProcessAlive");
async function No(e, t, n) {
  let s = Date.now(),
    a = await Lo(e, "utf-8"),
    c = lf(a, s),
    d = c.createdAt;
  if (d === null) {
    let g = await $n(e);
    d = Fo(g.mtimeMs, s) ?? n(e, g, s);
  }
  let m = c.pid !== null && !uf(c.pid),
    f = c.pid === null && s - d >= t;
  return m || f;
}
i(No, "isOwnerFileReclaimable");
async function pf(e, t, n) {
  try {
    let s = await $n(e);
    if (s.isDirectory()) {
      let c = await wa(e),
        d = c.filter((g) => g.startsWith("owner-") && g.endsWith(".json"));
      if (d.length === 1) {
        let g = Wn(e, d[0]);
        return (await No(g, t, n))
          ? (await Ht(g, { force: !0 }), await jn(e), { removed: !0 })
          : { removed: !1 };
      }
      let m = Date.now(),
        f = Fo(s.mtimeMs, m) ?? n(e, s, m);
      if (m - f < t) return { removed: !1 };
      for (let g of d) if (!(await No(Wn(e, g), t, n))) return { removed: !1 };
      return (
        await Promise.all(c.map((g) => Ht(Wn(e, g), { force: !0 }))),
        await jn(e),
        { removed: !0 }
      );
    }
    let a = await Lo(e, "utf-8");
    return (await No(e, t, n))
      ? (await Lo(e, "utf-8")) !== a
        ? { removed: !1 }
        : (await Ht(e, { force: !0 }), { removed: !0 })
      : { removed: !1 };
  } catch (s) {
    return et(s) === "ENOENT" || et(s) === "ENOTEMPTY"
      ? { removed: !1 }
      : { removed: !1, error: s };
  }
}
i(pf, "removeAbandonedLock");
function ya(e, t, n, s) {
  let a = new Error(
    `Timed out after ${n}ms waiting for the ZCode file lock: ${t}`,
  );
  return ((a.code = js), (a.path = e), (a.syscall = "mkdir"), (a.cause = s), a);
}
i(ya, "createFileLockTimeoutError");
async function tt(e, t, n, s) {
  let a = `${e}.lock`,
    c = `${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    d = Wn(a, `owner-${c}.json`),
    m = `${JSON.stringify({ pid: process.pid, createdAt: Date.now(), token: c })}
`,
    f = Date.now(),
    g = Math.min(Math.max(n, 0), Math.max(Math.floor(s / 2), 0)),
    h = ha(),
    y;
  for (let S = 0; ; S += 1) {
    let v = !1;
    try {
      (await of(a), (v = !0));
      let k = await $n(a);
      await sf(d, m, { encoding: "utf-8", flag: "wx" });
      let M = await $n(a),
        R = (await wa(a)).filter(
          (w) => w.startsWith("owner-") && w.endsWith(".json"),
        );
      if (
        M.dev !== k.dev ||
        M.ino !== k.ino ||
        R.length !== 1 ||
        R[0] !== `owner-${c}.json`
      )
        throw Object.assign(
          new Error("ZCode file lock ownership changed during acquire"),
          { code: "EEXIST" },
        );
      return async () => {
        (await Ht(d, { force: !0 }).catch(() => {}),
          await jn(a).catch(() => {}));
      };
    } catch (k) {
      v &&
        (await Ht(d, { force: !0 }).catch(() => {}),
        await jn(a).catch(() => {}));
      let M = v && et(k) === "ENOENT";
      if (!df(k) && !M) throw k;
      let R = Date.now() - f;
      if (R >= s) {
        let _ = et(y);
        throw _ === "EACCES" || _ === "EPERM" ? y : ya(e, a, R, k);
      }
      let w = await pf(a, g, h);
      if (w.removed) continue;
      w.error && (y = w.error);
      let C = Math.max(s - R, 0);
      if (t.length === 0 || C === 0) {
        let _ = et(y);
        throw _ === "EACCES" || _ === "EPERM" ? y : ya(e, a, R, y ?? k);
      }
      let x = t[Math.min(S, t.length - 1)] ?? C;
      await af(Math.min(x, C));
    }
  }
}
i(tt, "acquireFileLock");
r();
o();
import { AsyncLocalStorage as ff } from "node:async_hooks";
import { channel as zn } from "node:diagnostics_channel";
var mf = new ff();
function gf(e, t) {
  let n = null,
    s = [],
    a = 0,
    c,
    d = i(() => {
      if (((c = void 0), !n)) return;
      let h = { captureId: n, records: s, dropped: a };
      ((s = []), (a = 0));
      try {
        t(h);
      } catch {}
    }, "flush"),
    m = i((h, y) => {
      if (!n || mf.getStore() || h === "CONNECT") return;
      if (s.length >= 100) {
        a++;
        return;
      }
      let S = Us(y);
      S &&
        (s.push({
          timestamp: Date.now(),
          processType: e,
          pid: process.pid,
          method: h.slice(0, 32),
          url: S,
        }),
        (c ??= setTimeout(d, 250)),
        c.unref());
    }, "record"),
    f = i((h) => {
      try {
        let { request: y } = h,
          S = new URL(y.path, y.origin);
        (y.upgrade?.toLowerCase() === "websocket" &&
          (S.protocol = S.protocol === "https:" ? "wss:" : "ws:"),
          m(y.method, S.href));
      } catch {}
    }, "undici"),
    g = i((h) => {
      try {
        let { request: y } = h,
          S = new URL(
            y.path,
            `${y.protocol}//${String(y.getHeader("host") ?? y.host)}`,
          );
        (String(y.getHeader("upgrade")).toLowerCase() === "websocket" &&
          (S.protocol = S.protocol === "https:" ? "wss:" : "ws:"),
          m(y.method, S.href));
      } catch {}
    }, "http");
  return {
    setCaptureId(h) {
      n !== h &&
        (n &&
          (zn("undici:request:create").unsubscribe(f),
          zn("http.client.request.start").unsubscribe(g)),
        c && clearTimeout(c),
        (c = void 0),
        (s = []),
        (a = 0),
        (n = h),
        n &&
          (zn("undici:request:create").subscribe(f),
          zn("http.client.request.start").subscribe(g)));
    },
  };
}
i(gf, "createNodeNetworkCapture");
r();
o();
r();
o();
r();
o();
r();
o();
var va = l.union([l.string(), l.number().finite(), l.boolean()]),
  Gt = {
    callback: l.string().min(1).max(128),
    label: l.string().min(1).max(120),
    reference: l.string().max(160).optional(),
  },
  hf = l.discriminatedUnion("type", [
    l
      .object({
        ...Gt,
        type: l.literal("range"),
        currentValue: l.number().finite(),
        min: l.number().finite(),
        max: l.number().finite(),
        step: l.number().positive(),
      })
      .strict(),
    l
      .object({
        ...Gt,
        type: l.literal("color"),
        currentValue: l
          .string()
          .regex(/^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i),
      })
      .strict(),
    l
      .object({ ...Gt, type: l.literal("toggle"), currentValue: l.boolean() })
      .strict(),
    l
      .object({
        ...Gt,
        type: l.literal("select"),
        currentValue: l.string().max(120),
        options: l
          .array(
            l
              .object({
                label: l.string().min(1).max(120),
                value: l.string().max(120),
              })
              .strict(),
          )
          .min(1)
          .max(12),
      })
      .strict(),
  ]);
function yf(e, t) {
  switch (e.type) {
    case "range":
      return (
        typeof t == "number" && Number.isFinite(t) && t >= e.min && t <= e.max
      );
    case "color":
      return (
        typeof t == "string" &&
        /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(t)
      );
    case "toggle":
      return typeof t == "boolean";
    case "select":
      return typeof t == "string" && e.options.some((n) => n.value === t);
  }
}
i(yf, "isGenUiAnnotationValue");
var ka = l
    .object({
      controlsMode: l.literal("replace"),
      controls: l.array(hf).min(1).max(12),
    })
    .strict()
    .superRefine((e, t) => {
      (new Set(e.controls.map((s) => s.callback)).size !== e.controls.length ||
        e.controls.some((s) => !yf(s, s.currentValue)) ||
        JSON.stringify(e).length > 16384) &&
        t.addIssue({ code: "custom", message: "Invalid annotation controls" });
    }),
  Zn = l
    .object({
      id: l.string().min(1).max(128),
      label: l.string().min(1).max(80),
      selector: l.string().max(1024),
      tagName: l.string().min(1).max(120),
      rect: l
        .object({
          x: l.number().finite(),
          y: l.number().finite(),
          width: l.number().nonnegative(),
          height: l.number().nonnegative(),
        })
        .strict(),
    })
    .strict(),
  wt = {
    registrationId: l.string().min(1).max(128),
    annotationControls: ka,
    targets: l.array(Zn).length(1),
  },
  BT = l.discriminatedUnion("type", [
    l.object({ type: l.literal("register"), ...wt }).strict(),
    l.object({ type: l.literal("update"), ...wt }).strict(),
    l
      .object({ type: l.literal("dispose"), registrationId: wt.registrationId })
      .strict(),
    l
      .object({
        type: l.literal("select"),
        registrationId: wt.registrationId,
        targetId: Zn.shape.id,
      })
      .strict(),
    l.object({ type: l.literal("escape") }).strict(),
  ]),
  UT = l.object({ annotationControls: ka.optional() }).strict(),
  WT = l
    .object({
      active: l.boolean(),
      selection: l
        .object({ registrationId: wt.registrationId, targetId: Zn.shape.id })
        .nullable(),
      changes: l
        .array(
          l
            .object({
              registrationId: wt.registrationId,
              targetId: Zn.shape.id,
              annotationControlChanges: l
                .array(
                  l
                    .object({
                      callback: Gt.callback,
                      previousValue: va,
                      value: va,
                    })
                    .strict(),
                )
                .max(12),
            })
            .strict(),
        )
        .max(64),
    })
    .strict();
var wf = 16 * 1024;
var GT = 64 * 1024;
var qT = l.record(l.string().regex(/^--gen-ui-[a-z-]+$/), l.string());
var Sa = l
    .string()
    .min(1)
    .max(4096)
    .refine((e) => {
      if (e.includes("\0") || /[\r\n]/u.test(e)) return !1;
      let t = e.split(/[\\/]/u);
      return (
        /^(?:\/|[A-Za-z]:[\\/]|\\\\)/u.test(e) &&
        !t.includes("..") &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*\.html$/u.test(t.at(-1) ?? "")
      );
    }, "Expected an absolute executor path to a lowercase-hyphenated HTML file"),
  KT = l
    .object({
      path: Sa,
      title: l.string().max(250).optional(),
      mode: l.enum(["wide"]).optional(),
    })
    .strict(),
  Bo = l
    .object({
      workspacePath: l.string().min(1).max(4096),
      workspaceIdentity: l.string().max(4096).optional(),
      sessionId: l.string().min(1).max(512),
    })
    .strict(),
  qt = Bo.extend({ path: Sa });
function vf(e) {
  return JSON.stringify(e, (t, n) => {
    if (
      typeof n > "u" ||
      typeof n == "function" ||
      typeof n == "symbol" ||
      typeof n == "bigint" ||
      (typeof n == "number" && !Number.isFinite(n))
    )
      throw new Error("Widget state must contain JSON values only");
    return n;
  });
}
i(vf, "serializeJson");
var Pa = l
    .object({
      modelContent: l.unknown().default(null),
      privateContent: l.unknown().default(null),
    })
    .strict()
    .transform((e, t) => {
      try {
        let n = vf(e);
        if (new TextEncoder().encode(n).byteLength > wf)
          throw new Error("Widget state exceeds 16 KiB");
        return JSON.parse(n);
      } catch (n) {
        return (
          t.addIssue({
            code: "custom",
            message: n instanceof Error ? n.message : "Invalid widget state",
          }),
          l.NEVER
        );
      }
    }),
  VT = l
    .object({
      prompt: l
        .string()
        .trim()
        .min(1)
        .max(64 * 1024),
      title: l.string().max(250).optional(),
    })
    .strict(),
  Hn = {
    id: l.string().regex(/^[a-zA-Z][a-zA-Z0-9_-]{0,63}$/),
    label: l.string().min(1).max(120),
    reference: l
      .string()
      .regex(/^[\w./:@$#-]{1,160}$/u)
      .optional(),
  },
  kf = l.discriminatedUnion("type", [
    l
      .object({
        ...Hn,
        type: l.literal("slider"),
        value: l.number().finite(),
        min: l.number().finite(),
        max: l.number().finite(),
        step: l.number().positive().optional(),
        unit: l.string().max(24).optional(),
      })
      .strict(),
    l
      .object({
        ...Hn,
        type: l.literal("color"),
        value: l
          .string()
          .regex(/^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i),
      })
      .strict(),
    l.object({ ...Hn, type: l.literal("toggle"), value: l.boolean() }).strict(),
    l
      .object({
        ...Hn,
        type: l.literal("select"),
        value: l.string().max(120),
        options: l
          .array(
            l.union([
              l.string().min(1).max(120),
              l
                .object({
                  label: l.string().min(1).max(120),
                  value: l.string().max(120),
                })
                .strict(),
            ]),
          )
          .min(1)
          .max(12),
      })
      .strict(),
  ]),
  JT = l
    .object({
      title: l.string().min(1).max(120),
      controls: l.array(kf).min(1).max(12),
    })
    .strict()
    .superRefine((e, t) => {
      let n = new Set();
      for (let s of e.controls)
        ((n.has(s.id) ||
          (s.type === "slider" &&
            (s.min >= s.max || s.value < s.min || s.value > s.max)) ||
          (s.type === "select" &&
            !s.options.some(
              (a) => (typeof a == "string" ? a : a.value) === s.value,
            ))) &&
          t.addIssue({
            code: "custom",
            message: "Invalid or duplicate tweak control",
          }),
          n.add(s.id));
    });
r();
o();
r();
o();
r();
o();
r();
o();
import { createHash as bf } from "node:crypto";
import {
  chmod as Ef,
  mkdir as Ca,
  readFile as Tf,
  rename as Rf,
  rm as Af,
  writeFile as Ia,
} from "node:fs/promises";
import { basename as Mf, dirname as ba, join as xf } from "node:path";
import { setTimeout as Of } from "node:timers/promises";
var Df = [25, 50, 100, 200, 400],
  Nf = 100,
  Lf = 8e3,
  Ff = [50, 100, 200, 400, 800],
  Gn = new Map();
function Ea(e) {
  if (typeof e != "object" || e === null || !("code" in e)) return;
  let t = e.code;
  return typeof t == "string" ? t : void 0;
}
i(Ea, "getErrorCode");
function Bf(e) {
  let t = Ea(e);
  return t === "EPERM" || t === "EBUSY" || t === "EACCES";
}
i(Bf, "isRetryableRenameError");
async function Uf(e, t, n) {
  for (let s = 0; ; s += 1)
    try {
      await Rf(e, t);
      return;
    } catch (a) {
      let c = n[s];
      if (c === void 0 || !Bf(a)) throw a;
      await Of(c);
    }
}
i(Uf, "renameWithRetry");
async function ye(e, t, n = {}) {
  let s = Gn.get(e) ?? Promise.resolve(),
    a,
    c = new Promise((m) => {
      a = m;
    });
  (Gn.set(e, c), await s);
  let d;
  try {
    return (
      await Ca(ba(e), { recursive: !0 }),
      (d = await tt(
        e,
        n.lockRetryDelaysMs ?? Df,
        n.lockOwnerlessGraceMs ?? Nf,
        n.lockMaxWaitMs ?? Lf,
      )),
      await t()
    );
  } finally {
    try {
      await d?.();
    } finally {
      (a(), Gn.get(e) === c && Gn.delete(e));
    }
  }
}
i(ye, "withFileLock");
async function Ue(e, t, n = Ff) {
  let s = ba(e),
    a = xf(
      s,
      `.${Mf(e)}.${process.pid}.${Date.now()}.${Math.random().toString(16).slice(2)}.tmp`,
    );
  await Ca(s, { recursive: !0 });
  try {
    (await Ia(a, t, { encoding: "utf-8", mode: 384 }), await Uf(a, e, n));
  } catch (c) {
    throw (await Af(a, { force: !0 }).catch(() => {}), c);
  }
}
i(Ue, "atomicWritePrivateTextFile");
async function Uo(e) {
  let t = await Tf(e),
    n = bf("sha256").update(t).digest("hex").slice(0, 24),
    s = `${e}.corrupt-${n}.bak`;
  try {
    await Ia(s, t, { flag: "wx", mode: 384 });
  } catch (a) {
    if (Ea(a) !== "EEXIST") throw a;
  }
  return (await Ef(s, 384), s);
}
i(Uo, "backupCorruptFile");
r();
o();
var Jf = [50, 100, 200, 400, 800, 1600, 3200],
  Oa = [25, 50, 100, 200, 400],
  Da = 100,
  Na = 8e3,
  Xf = 6e4;
async function La(e, t, n) {
  let s = await tt(
    e,
    n?.lockRetryDelaysMs ?? Oa,
    n?.lockOwnerlessGraceMs ?? Da,
    n?.lockMaxWaitMs ?? Na,
  );
  try {
    return await t();
  } finally {
    await s();
  }
}
i(La, "withAtomicFileLock");
function Yf(e) {
  if (typeof e != "object" || e === null || !("code" in e)) return;
  let t = e.code;
  return typeof t == "string" ? t : void 0;
}
i(Yf, "getErrorCode");
function Qf(e) {
  if (fa(e)) return !1;
  let t = Yf(e);
  return t === "EPERM" || t === "EBUSY" || t === "EACCES";
}
i(Qf, "isRetryableAtomicRenameError");
async function em(e, t, n = Jf) {
  for (let s = 0; ; s += 1)
    try {
      (Be({ operation: "rename", path: t }), await Gf(e, t));
      return;
    } catch (a) {
      let c = n[s];
      if (c === void 0 || !Qf(a)) throw a;
      await Vf(c);
    }
}
i(em, "renameWithRetry");
async function tm(e, t, n) {
  let s = Aa(e),
    c = `${Ma(e)}.`,
    d = Date.now();
  try {
    let m = await qf(s);
    await Promise.all(
      m.map(async (f) => {
        if (!f.startsWith(c) || !f.endsWith(".tmp")) return;
        let g = xa(s, f);
        if (g !== t)
          try {
            let h = await Kf(g);
            if (d - h.mtimeMs < n) return;
            await Ra(g, { force: !0 });
          } catch {}
      }),
    );
  } catch {}
}
i(tm, "cleanupStaleTempFilesForTarget");
async function Kt(e, t, n) {
  let s = Aa(e),
    a = xa(
      s,
      `${Ma(e)}.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`,
    );
  (Be({ operation: "mkdir", path: s }), await Zf(s, { recursive: !0 }));
  let c =
    n?.useFileLock === !1
      ? null
      : await tt(
          e,
          n?.lockRetryDelaysMs ?? Oa,
          n?.lockOwnerlessGraceMs ?? Da,
          n?.lockMaxWaitMs ?? Na,
        );
  try {
    (await tm(e, a, n?.tempFileStaleMs ?? Xf),
      Be({ operation: "writeFile", path: a }),
      await Hf(a, t, "utf-8"),
      await n?.beforeRename?.());
    let d = i(() => em(a, e, n?.renameRetryDelaysMs), "renameFile");
    n?.runRename ? await n.runRename(d) : await d();
  } catch (d) {
    throw (await Ra(a, { force: !0 }).catch(() => {}), d);
  } finally {
    await c?.();
  }
}
i(Kt, "atomicWriteText");
r();
o();
var nm = "ZCODE_SETTING_WRITE_QUEUE_TIMEOUT_MS";
function rm() {
  let e = process.env[nm]?.trim();
  if (!e) return 3e4;
  let t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : 3e4;
}
i(rm, "getSettingsWriteQueueTimeoutMs");
function Fa(e, t) {
  let n = rm(),
    s,
    a = !1,
    c = i(() => {
      s && (clearTimeout(s), (s = void 0));
    }, "clearQueueTimeout"),
    d = i(() => {
      ((a = !0), c());
    }, "enterCommitPhase"),
    m = new Promise((f, g) => {
      ((s = setTimeout(() => {
        a ||
          (t(), g(new Error(`settingService update timed out after ${n}ms`)));
      }, n)),
        s.unref?.());
    });
  return Promise.race([e(d), m]).finally(c);
}
i(Fa, "withSettingsWriteQueueTimeout");
r();
o();
import { readFile as om } from "node:fs/promises";
function We(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
i(We, "record");
function Vt(e) {
  if (!qn(e)) return [];
  let t = We(e),
    n = We(t.modelProviderFamilyModes),
    s = We(t.modelProviderFamilySelectedKeys);
  return ["zai", "bigmodel"].flatMap((a) => {
    if (n[a] === "apiKey") return [];
    let c = `team-plan:builtin:${a}-coding-plan:`,
      d = typeof s[a] == "string" ? s[a].trim() : "";
    if (!d.startsWith(c)) return [];
    try {
      let m = d
        .slice(c.length)
        .split(":")
        .map((f) => decodeURIComponent(f).trim());
      return m.length !== 2 || m.some((f) => !f)
        ? []
        : [{ family: a, productId: m[0], projectId: m[1] }];
    } catch {
      return [];
    }
  });
}
i(Vt, "readIncompleteLegacyTeamConnections");
async function Jt(e) {
  try {
    return We(JSON.parse(await om(e, "utf8")));
  } catch (t) {
    if (t.code === "ENOENT") return {};
    throw t;
  }
}
i(Jt, "readLegacyAccountConnectionSettingsFile");
function qn(e) {
  let t = We(e);
  return (
    !Object.hasOwn(t, "providerFamilyConnectionSelections") &&
    (Object.hasOwn(t, "modelProviderFamilySelectedKeys") ||
      Object.hasOwn(t, "modelProviderFamilyModes"))
  );
}
i(qn, "needsLegacyAccountConnectionMigration");
function Wo(e) {
  if (!qn(e)) return e;
  let t = We(e),
    n = We(t.modelProviderFamilyModes),
    s = We(t.modelProviderFamilySelectedKeys),
    a = {};
  for (let c of ["zai", "bigmodel"]) {
    if (n[c] === "apiKey") continue;
    let d = typeof s[c] == "string" ? s[c].trim() : "";
    if (d === `coding-plan:builtin:${c}-start-plan`)
      a[c] = { kind: "start-plan" };
    else if (d === `coding-plan:builtin:${c}-coding-plan`)
      a[c] = { kind: "individual-coding-plan" };
    else {
      let m = `team-plan:builtin:${c}-coding-plan:`;
      if (!d.startsWith(m)) continue;
      try {
        let f = d
          .slice(m.length)
          .split(":")
          .map((S) => decodeURIComponent(S).trim());
        if (f.length !== 3 || f.some((S) => !S)) continue;
        let [g, h, y] = f;
        a[c] = {
          kind: "team-coding-plan",
          productId: g,
          organizationId: h,
          projectId: y,
        };
      } catch {}
    }
  }
  return { ...t, providerFamilyConnectionSelections: a };
}
i(Wo, "migrateLegacyAccountConnectionSettings");
function Kn(e) {
  let t = We(e);
  return Object.fromEntries(
    ["modelProviderFamilyModes", "modelProviderFamilySelectedKeys"]
      .filter((n) => Object.hasOwn(t, n))
      .map((n) => [n, t[n]]),
  );
}
i(Kn, "retainLegacyAccountConnectionFields");
var am = 10,
  cm = 300,
  dm = 3,
  je = i((...e) => console.log(Qe("settingService", process.pid), ...e), "log"),
  Ua = i((...e) => {
    $t() && console.debug(Qe("settingService", process.pid), ...e);
  }, "debugLog");
function lm() {
  let e =
    process.env.ZCODE_DESKTOP_HOME_DIR?.trim() ||
    process.env.HOME?.trim() ||
    process.env.USERPROFILE?.trim();
  return e && e.length > 0 ? e : $a();
}
i(lm, "resolveUserHomeDir");
function Vn() {
  return gt.parse({});
}
i(Vn, "defaultSettings");
function um(e) {
  let t = new Date().toISOString().replace(/[:.]/g, "-");
  return `${e}.corrupt-${t}`;
}
i(um, "buildCorruptSettingsBackupPath");
async function pm(e, t) {
  let n = um(e);
  try {
    (Be({ operation: "rename", path: e }),
      await im(e, n),
      je("invalid settings json backed up:", n, "error:", t));
  } catch (s) {
    if (s && typeof s == "object" && "code" in s && s.code === "ENOENT") {
      je(
        "invalid settings json already quarantined by another reader, returning defaults",
      );
      return;
    }
    je("invalid settings json backup failed, returning defaults. error:", s);
  }
}
i(pm, "quarantineCorruptSettingsFile");
function fm(e) {
  return new Promise((t) => setTimeout(t, e));
}
i(fm, "delay");
function mm(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return !1;
  let t = e;
  return (
    t.remoteBoundaryOnboardingVersion === 3 ||
    (qn(e) && Vt(e).length === 0) ||
    t.closeToTrayOnWindowsMigrationInitialized !== !0 ||
    t.messageStreamShowReasoningMigrationInitialized !== !0 ||
    t.taskAutoArchiveResetVersion !== 1
  );
}
i(mm, "shouldPersistSettingsMigrations");
async function gm(e) {
  try {
    Ua("reading settings from:", e);
    let t = await Ba(e, "utf-8"),
      n;
    try {
      n = JSON.parse(t);
    } catch (a) {
      let c = a;
      for (let d = 1; d <= dm; d += 1) {
        await fm(cm);
        try {
          n = JSON.parse(await Ba(e, "utf-8"));
          break;
        } catch (m) {
          c = m;
        }
      }
      if (n === void 0)
        return (await pm(e, c), { settings: Vn(), needsMigrationPersist: !1 });
    }
    let s = gt.safeParse(Wo(n));
    return s.success
      ? { settings: s.data, needsMigrationPersist: mm(n) }
      : (je(
          "read failed schema validation, returning defaults. error:",
          An(s.error),
        ),
        { settings: Vn(), needsMigrationPersist: !1 });
  } catch (t) {
    return t && typeof t == "object" && "code" in t && t.code === "ENOENT"
      ? (Ua("settings file missing, using defaults"),
        { settings: Vn(), needsMigrationPersist: !1 })
      : (je("read failed, returning defaults. error:", t),
        { settings: Vn(), needsMigrationPersist: !1 });
  }
}
i(gm, "readSettingsWithMetaAt");
async function hm(e, t, n = () => !0, s = () => {}, a = !1) {
  let c = ja(e);
  if (
    (je("writing settings to:", e, JSON.stringify(t)),
    Be({ operation: "mkdir", path: c }),
    await Wa(c, { recursive: !0 }),
    !n())
  )
    return;
  Be({ operation: "writeFile", path: e });
  let d = await Jt(e),
    f = { ...Kn(d), ...t };
  (!a && Vt(d).length > 0 && delete f.providerFamilyConnectionSelections,
    await Kt(e, JSON.stringify(f, null, 2), {
      useFileLock: !1,
      beforeRename: i(() => {
        if (!n())
          throw new Error("stale settings write skipped before atomic rename");
        s();
      }, "beforeRename"),
    }),
    je("write done"));
}
i(hm, "writeSettingsAt");
function za() {
  return jo().service;
}
i(za, "createSettingService");
function jo() {
  let e = sm(lm(), ".zcode", "v2", "setting.json"),
    t = i(() => e, "getSettingsFile"),
    n = i(() => ja(e), "getSettingsDir"),
    s = i(() => gm(e), "readSettingsWithMeta"),
    a = i(async () => (await s()).settings, "readSettings"),
    c = i((k, M, R, w) => hm(e, k, M, R, w), "writeSettings"),
    d = Promise.resolve(),
    m = 0,
    f,
    g = i(
      async (k) => (f ? gt.parse({ ...k, ...(await f(k)) }) : k),
      "projectSettings",
    ),
    h = i(async (k) => {
      let M = i(async () => {
          let w = ++m,
            C = i(() => w === m, "shouldCommit");
          return (
            await Wa(n(), { recursive: !0 }),
            La(t(), () =>
              Fa(
                (x) => k(C, x),
                () => {
                  m === w && (m += 1);
                },
              ),
            )
          );
        }, "runCurrentUpdate"),
        R = d.then(
          () => M(),
          () => M(),
        );
      ((d = R.catch(() => {})), await R);
    }, "enqueueSettingsWrite"),
    y = {
      async get() {
        await d;
        let k = await s(),
          M = await g(k.settings);
        return !k.needsMigrationPersist &&
          JSON.stringify(M) === JSON.stringify(k.settings)
          ? M
          : (await h(async (R, w) => {
              let C = await s(),
                x = await g(C.settings);
              (!C.needsMigrationPersist &&
                JSON.stringify(x) === JSON.stringify(C.settings)) ||
                (await c(x, R, w));
            }),
            a());
      },
      async update(k, M) {
        await h(
          i(async (w, C) => {
            let x = wo.parse(sa(k)),
              _ = await a(),
              I = Object.hasOwn(k, "providerFamilyConnectionSelections");
            if (I && M?.providerFamilyDomainUpdatedAt === void 0)
              throw new Error("Account connection CAS required");
            if (M) {
              let A = wo.parse(M);
              if (
                _.providerFamilyDomain !== A.providerFamilyDomain ||
                (A.providerFamilyDomainUpdatedAt !== void 0 &&
                  (_.providerFamilyDomainUpdatedAt ?? 0) !==
                    A.providerFamilyDomainUpdatedAt) ||
                JSON.stringify(_.providerFamilyConnectionSelections ?? {}) !==
                  JSON.stringify(A.providerFamilyConnectionSelections ?? {})
              )
                throw new Error("Account connection settings changed");
            }
            let b = gt.parse({ ..._, ...x });
            (I &&
              (b.providerFamilyDomainUpdatedAt = Math.max(
                x.providerFamilyDomainUpdatedAt ?? Date.now(),
                (_.providerFamilyDomainUpdatedAt ?? 0) + 1,
              )),
              b.recentProjects &&
                (b.recentProjects = [...new Set(b.recentProjects)].slice(
                  0,
                  am,
                )),
              await c(
                await g(b),
                w,
                C,
                Object.hasOwn(k, "providerFamilyConnectionSelections"),
              ));
          }, "runUpdate"),
        );
      },
      async updateDataBaseDir(k) {
        let M = Re(),
          R = k?.trim() || $a(),
          w = xo(R);
        if (!w.ok) {
          let C = new Error(`${w.code}: ${w.forbiddenDir}`);
          throw ((C.code = w.code), C);
        }
        (M !== R &&
          (je("copying data directory from", M, "to", R),
          await Do(M, R),
          je("data directory copy done")),
          await this.update({ dataBaseDir: k }));
      },
    },
    S = null,
    v = !1;
  return {
    service: y,
    setWorkspaceProjection(k) {
      if (f) throw new Error("settings.workspace-projection-already-bound");
      f = k;
    },
    prepareLegacyAccountConnections(k) {
      if (v) return Promise.resolve([]);
      if (S) return S;
      let R = i(async () => {
        await y.get();
        let w = await Jt(t()),
          C = Vt(w);
        if (C.length === 0) return [];
        let x = await Promise.all(
          C.map(async (_) => ({
            ..._,
            organizationId: await k(_).catch(() => null),
          })),
        );
        return (
          await h(async (_, I) => {
            let b = await Jt(t());
            if (
              Object.hasOwn(b, "providerFamilyConnectionSelections") ||
              b.providerFamilyDomain !== w.providerFamilyDomain ||
              JSON.stringify(Kn(b)) !== JSON.stringify(Kn(w)) ||
              x.some((O) => !O.organizationId?.trim())
            )
              return;
            let A = gt.parse(Wo(b)),
              E = { ...A.providerFamilyConnectionSelections };
            for (let {
              family: O,
              productId: P,
              projectId: N,
              organizationId: F,
            } of x)
              E[O] = {
                kind: "team-coding-plan",
                productId: P,
                projectId: N,
                organizationId: F.trim(),
              };
            await c(
              await g({ ...A, providerFamilyConnectionSelections: E }),
              _,
              I,
              !0,
            );
          }),
          Vt(await Jt(t())).map((_) => _.family)
        );
      }, "run")();
      return (
        (S = R),
        R.then(
          (w) => {
            ((v = w.length === 0), S === R && (S = null));
          },
          () => {
            S === R && (S = null);
          },
        ),
        R
      );
    },
  };
}
i(jo, "createSettingServiceWithMigrations");
r();
o();
import { readFile as Tm } from "node:fs/promises";
import { join as Rm } from "node:path";
r();
o();
import {
  createCipheriv as ym,
  createDecipheriv as wm,
  createHash as vm,
  randomBytes as km,
} from "node:crypto";
import { homedir as Sm, platform as Pm, userInfo as _m } from "node:os";
var $o = "enc:v1:",
  Za = "aes-256-gcm",
  Ha = 12,
  Cm = 16,
  Im = "ZCODE_CREDENTIAL_SECRET";
function bm(e) {
  return vm("sha256").update(e).digest();
}
i(bm, "deriveCipherKey");
function Em(e) {
  let t = e[Im];
  if (t) return t;
  let n = "unknown";
  try {
    n = _m().username;
  } catch {}
  return `zcode-credential-fallback:${Pm()}:${Sm()}:${n}`;
}
i(Em, "defaultCredentialSecret");
function zo(e) {
  return Buffer.from(e, "base64url");
}
i(zo, "base64urlToBuffer");
function Zo(e) {
  return e.toString("base64url");
}
i(Zo, "bufferToBase64url");
function Jn(e) {
  return Object.assign(new Error(`${Ys}${e}`), { code: Qs });
}
i(Jn, "createCredentialDecryptError");
function Ho(e = {}) {
  let t = e.env ?? process.env,
    n = bm(Em(t));
  return {
    encrypt(s) {
      let a = km(Ha),
        c = ym(Za, n, a),
        d = Buffer.concat([c.update(s, "utf-8"), c.final()]),
        m = c.getAuthTag();
      return [$o, Zo(a), ".", Zo(m), ".", Zo(d)].join("");
    },
    decrypt(s) {
      if (!s.startsWith($o)) return s;
      let c = s.slice($o.length).split("."),
        [d, m, f] = c;
      if (!d || !m || f === void 0 || c.length !== 3)
        throw Jn("\u5BC6\u6587\u683C\u5F0F\u975E\u6CD5");
      let g = zo(d),
        h = zo(m),
        y = zo(f);
      if (g.length !== Ha) throw Jn("IV \u957F\u5EA6\u975E\u6CD5");
      if (h.length !== Cm) throw Jn("AuthTag \u957F\u5EA6\u975E\u6CD5");
      let S = wm(Za, n, g);
      S.setAuthTag(h);
      try {
        return Buffer.concat([S.update(y), S.final()]).toString("utf-8");
      } catch {
        throw Jn(
          "\u5BC6\u94A5\u4E0D\u5339\u914D\u6216\u5BC6\u6587\u5DF2\u635F\u574F",
        );
      }
    },
  };
}
i(Ho, "createCredentialCipherProvider");
var Am = T("credentialService");
function Mm() {
  return G();
}
i(Mm, "getCredentialsDir");
function Yn() {
  return Rm(Mm(), "credentials.json");
}
i(Yn, "getCredentialsFile");
function xm(e) {
  if (typeof e != "object" || e === null || !("code" in e)) return;
  let t = e.code;
  return typeof t == "string" ? t : void 0;
}
i(xm, "getErrorCode");
async function Xn(e = Yn()) {
  let t;
  try {
    t = await Tm(e, "utf-8");
  } catch (n) {
    if (xm(n) === "ENOENT") return {};
    throw new Error(`Unable to read ZCode credentials: ${e}`, { cause: n });
  }
  try {
    let n = JSON.parse(t),
      s = Hs.safeParse(n);
    if (!s.success) throw new Error(An(s.error));
    return s.data;
  } catch (n) {
    let s = await Uo(e).catch(() => {});
    throw (
      Am.warn(
        void 0,
        "read failed; refusing to overwrite corrupt credential store",
        { backupPath: s, credentialsFile: e },
      ),
      new Error(`ZCode credentials are corrupt: ${e}`, { cause: n })
    );
  }
}
i(Xn, "readAll");
async function Go(e, t) {
  await Ue(
    e,
    `${JSON.stringify(t, null, 2)}
`,
  );
}
i(Go, "writeAll");
function Ga(e = {}) {
  let t = e.cipherProvider ?? Ho();
  return {
    async recoverUnreadable(n, s) {
      let a = Ut.parse(n),
        c = Yn(),
        d = !1,
        m = await ye(c, async () => {
          s();
          let f = await Xn(c);
          s();
          let g = f[a];
          if (g === void 0) return null;
          try {
            return t.decrypt(g);
          } catch (h) {
            if (!ke(h)) throw h;
          }
          return (s(), delete f[a], await Go(c, f), (d = !0), null);
        });
      return (d && e.onDidMutate?.({ operation: "delete", key: a }), m);
    },
    async load(n) {
      let s = Ut.parse(n),
        c = (await Xn())[s];
      return c === void 0 ? null : t.decrypt(c);
    },
    async save(n, s, a) {
      let c = Ut.parse(n),
        d = Gs.parse(s),
        m = t.encrypt(d),
        f = Yn();
      (await ye(f, async () => {
        let g = await Xn(f);
        (a?.(), (g[c] = m), await Go(f, g));
      }),
        e.onDidMutate?.({ operation: "save", key: c }));
    },
    async delete(n, s) {
      let a = Ut.parse(n),
        c = Yn();
      (await ye(c, async () => {
        let d = await Xn(c);
        (s?.(), delete d[a], await Go(c, d));
      }),
        e.onDidMutate?.({ operation: "delete", key: a }));
    },
  };
}
i(Ga, "createCredentialService");
r();
o();
import { execFileSync as jm, spawn as $m } from "node:child_process";
import { accessSync as zm, constants as Zm } from "node:fs";
r();
o();
import { accessSync as Om, constants as Dm, existsSync as qa } from "node:fs";
import {
  delimiter as Qn,
  dirname as Nm,
  join as Lm,
  resolve as Ve,
} from "node:path";
function qo(e) {
  try {
    return (Om(e, Dm.X_OK), !0);
  } catch {
    return !1;
  }
}
i(qo, "isExecutableFile");
function Fm(e) {
  for (let t of e) if (t && qa(t) && qo(t)) return t;
  return null;
}
i(Fm, "resolveExistingPath");
function Bm(e, t = process.env) {
  let n = t.PATH;
  if (!n) return null;
  let s =
      process.platform === "win32"
        ? (t.PATHEXT?.split(";").filter(Boolean) ?? [
            ".EXE",
            ".CMD",
            ".BAT",
            ".COM",
          ])
        : [""],
    a = process.platform === "win32" && !e.includes(".") ? s : [""];
  for (let c of n.split(Qn))
    if (c)
      for (let d of a) {
        let m = Lm(c, `${e}${d}`);
        if (qo(m)) return m;
      }
  return null;
}
i(Bm, "resolveCommandOnPath");
function Um(e) {
  let t = `${process.platform}-${process.arch}`;
  return [
    Ve(process.cwd(), "bundled-tools", t),
    Ve(process.cwd(), "packages", "desktop", "bundled-tools", t),
    Ve(process.cwd(), "..", "desktop", "bundled-tools", t),
    e ? Ve(e, "..", "..", "..", "desktop", "bundled-tools", t) : null,
    e ? Ve(e, "..", "..", "desktop", "bundled-tools", t) : null,
  ];
}
i(Um, "resolvePlatformScopedBundledToolRoots");
function Ka(e, t) {
  let n = e?.split(Qn).filter(Boolean) ?? [];
  return Va([...t, ...n]);
}
i(Ka, "prependPathEntries");
function Ko(e, t) {
  let n = e?.split(Qn).filter(Boolean) ?? [];
  return Va([...n, ...t]);
}
i(Ko, "appendPathEntries");
function Va(e) {
  let t = [],
    n = new Set();
  for (let s of e) !s || n.has(s) || (n.add(s), t.push(s));
  return t.join(Qn);
}
i(Va, "joinUniquePathEntries");
function Wm(e, t = process.env) {
  let n = Ro(e),
    s = n.resolveEntrySegments(process.platform),
    a = t[n.binaryEnvVar]?.trim();
  if (a && qa(a) && qo(a)) return a;
  let c =
      typeof process.resourcesPath == "string" ? process.resourcesPath : null,
    d = t.ZCODE_SERVER_RUNTIME_ROOT?.trim(),
    m = import.meta.dirname,
    f = Fm([
      d ? Ve(d, "tools", n.bundledResourceDir, ...s) : null,
      c ? Ve(c, "tools", n.bundledResourceDir, ...s) : null,
      ...Um(m).map((h) => (h ? Ve(h, n.bundledResourceDir, ...s) : null)),
    ]);
  if (f) return f;
  let g = s[s.length - 1];
  return g ? Bm(g.replace(/\.exe$/i, ""), t) : null;
}
i(Wm, "findRuntimeToolBinary");
function Ja(e, t = process.env) {
  let n = {},
    s = [];
  for (let a of e) {
    let c = Ro(a),
      d = Wm(a, t);
    d && ((n[c.binaryEnvVar] = d), s.push(Nm(d)));
  }
  return (s.length > 0 && (n.PATH = Ko(t.PATH, s)), n);
}
i(Ja, "buildRuntimeToolEnvPatch");
var Xa = "__ZCODE_LOGIN_ENV_START__",
  Ya = "__ZCODE_LOGIN_ENV_END__",
  Hm =
    process.platform === "darwin"
      ? "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
      : "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
  $e;
function Gm(e) {
  try {
    return (zm(e, Zm.X_OK), !0);
  } catch {
    return !1;
  }
}
i(Gm, "isExecutableFile");
function Qa(e) {
  let t = [e.SHELL, "/bin/zsh", "/bin/bash", "/bin/sh"];
  for (let n of t) if (n && Gm(n)) return n;
  return null;
}
i(Qa, "resolveShellPathForLoginEnv");
function Vo(e) {
  return Ka(e, Hm.split(":"));
}
i(Vo, "buildShellBootstrapPath");
function ec(e) {
  let t = `printf '%s\\0' '${Xa}'; env -0; printf '%s\\0' '${Ya}'`;
  return e.endsWith("/zsh") || e.endsWith("/bash") ? ["-ilc", t] : ["-lc", t];
}
i(ec, "buildLoginShellArgs");
function tc(e) {
  return {
    encoding: "utf8",
    windowsHide: !0,
    timeout: 4e3,
    maxBuffer: 2 * 1024 * 1024,
    env: { ...e, PATH: Vo(e.PATH), TERM: "dumb", CI: "1" },
  };
}
i(tc, "buildLoginShellExecutionOptions");
function qm(e) {
  if (process.platform !== "win32" && e.pid)
    try {
      process.kill(-e.pid, "SIGKILL");
      return;
    } catch {}
  try {
    e.kill("SIGKILL");
  } catch {}
}
i(qm, "killLoginShellProcessTree");
var Km = i(
  (e, t, n) =>
    new Promise((s, a) => {
      let c = $m(e, t, {
          env: n.env,
          windowsHide: n.windowsHide,
          stdio: ["ignore", "pipe", "pipe"],
          detached: process.platform !== "win32",
        }),
        d = "",
        m = 0,
        f = !1,
        g = i(() => {
          (qm(c), c.stdout.destroy(), c.stderr.destroy());
        }, "killProcessTree"),
        h = i(() => {
          (g(),
            y(
              new Error(
                `login shell environment capture timed out after ${n.timeout}ms`,
              ),
            ));
        }, "handleAbort"),
        y = i((v) => {
          f ||
            ((f = !0),
            n.signal?.removeEventListener("abort", h),
            v ? a(v) : s(d));
        }, "settle"),
        S = i((v, k) => {
          let M = typeof v == "string" ? v : v.toString("utf8");
          ((m += Buffer.byteLength(M)),
            m > n.maxBuffer
              ? (g(),
                y(
                  new Error(
                    `login shell environment capture exceeded ${n.maxBuffer} bytes`,
                  ),
                ))
              : k && (d += M));
        }, "appendOutput");
      (c.stdout.on("data", (v) => S(v, !0)),
        c.stderr.on("data", (v) => S(v, !1)),
        c.once("error", (v) => y(v)),
        c.once("close", (v, k) => {
          v === 0
            ? y()
            : y(
                new Error(
                  `login shell environment capture exited with code ${v ?? "null"}, signal ${k ?? "none"}`,
                ),
              );
        }),
        n.signal?.addEventListener("abort", h, { once: !0 }),
        n.signal?.aborted && h());
    }),
  "executeLoginShell",
);
function nc(e) {
  let t = `${Xa}\0`,
    n = `${Ya}\0`,
    s = e.lastIndexOf(t),
    a = e.lastIndexOf(n);
  return s < 0 || a <= s ? null : Vm(e.slice(s + t.length, a));
}
i(nc, "extractCapturedEnvSnapshot");
function Vm(e) {
  let t = {};
  for (let n of e.split("\0")) {
    if (!n) continue;
    let s = n.indexOf("=");
    if (s <= 0) continue;
    let a = n.slice(0, s).trim();
    /^[A-Za-z_][A-Za-z0-9_]*$/.test(a) && (t[a] = n.slice(s + 1));
  }
  return t;
}
i(Vm, "parseNullSeparatedEnvSnapshot");
async function Jo(e = {}) {
  let t = e.baseEnv ?? process.env;
  if ((e.platform ?? process.platform) === "win32" || t.VITEST) return null;
  let s = e.shellPath === void 0 ? Qa(t) : e.shellPath;
  if (!s) return null;
  let a = e.timeoutMs ?? 4e3,
    c = new AbortController(),
    d = null;
  try {
    let m = (e.executeShell ?? Km)(s, ec(s), {
        ...tc(t),
        timeout: a,
        signal: c.signal,
      }),
      f = new Promise((h, y) => {
        d = setTimeout(() => {
          (c.abort(),
            y(
              new Error(
                `login shell environment capture timed out after ${a}ms`,
              ),
            ));
        }, a);
      }),
      g = await Promise.race([m, f]);
    return nc(g);
  } catch {
    return null;
  } finally {
    d && clearTimeout(d);
  }
}
i(Jo, "captureLoginShellEnvSnapshot");
function rc(e) {
  if ($e !== void 0) return $e;
  if (process.platform === "win32" || process.env.VITEST)
    return (($e = null), $e);
  let t = Qa(e);
  if (!t) return (($e = null), $e);
  try {
    let n = jm(t, ec(t), tc(e));
    $e = nc(n);
  } catch {
    $e = null;
  }
  return $e;
}
i(rc, "captureLoginShellEnvSnapshotSync");
r();
o();
import { existsSync as Xm } from "node:fs";
import { delimiter as Ym } from "node:path";
var Qm = [
    "%APPDATA%\\npm",
    "%ProgramFiles%\\nodejs",
    "%ProgramFiles(x86)%\\nodejs",
    "%LOCALAPPDATA%\\Programs\\nodejs",
  ],
  eg = { PYTHONIOENCODING: "utf-8", PYTHONUTF8: "1" };
function tg(e, t) {
  let n = Object.keys(e).find((s) => s.toUpperCase() === t.toUpperCase());
  return n ? e[n] : void 0;
}
i(tg, "readWindowsEnvValue");
function ng(e, t) {
  return e.replace(/%([^%]+)%/g, (n, s) => tg(t, s) || "");
}
i(ng, "expandWindowsEnvVars");
function rg(e) {
  let t = [];
  for (let n of Qm) {
    let s = ng(n, e);
    s && Xm(s) && t.push(s);
  }
  return t;
}
i(rg, "resolveWindowsNodePaths");
var og = [
  /^KUBECONFIG$/i,
  /^KUBE_CONFIG_PATH$/i,
  /^KUBECTL_KUBECONFIG$/i,
  /^SSH_AUTH_SOCK$/i,
  /^AWS_PROFILE$/i,
  /^AWS_REGION$/i,
  /^AWS_DEFAULT_REGION$/i,
  /^AWS_SDK_LOAD_CONFIG$/i,
  /^GOOGLE_APPLICATION_CREDENTIALS$/i,
  /^LANG$/i,
  /^LC_[A-Z0-9_]+$/i,
  /^XDG_CONFIG_HOME$/i,
  /^XDG_DATA_HOME$/i,
  /^XDG_CACHE_HOME$/i,
  /^TERM$/i,
  /^COLORTERM$/i,
  /^TERM_PROGRAM$/i,
  /^TERM_PROGRAM_VERSION$/i,
  /^NPM_CONFIG_USERCONFIG$/i,
  /^NPM_CONFIG_PREFIX$/i,
  /^PNPM_HOME$/i,
  /^NVM_DIR$/i,
  /^NVM_CD_FLAGS$/i,
  /^FNM_[A-Z0-9_]+$/i,
  /^VOLTA_HOME$/i,
  /^CARGO_HOME$/i,
  /^RUSTUP_HOME$/i,
  /^GOPATH$/i,
  /^GOROOT$/i,
  /^GOENV_ROOT$/i,
  /^GVM_ROOT$/i,
  /^gvm_[A-Za-z0-9_]+$/i,
  /^JAVA_HOME$/i,
  /^JENV_ROOT$/i,
  /^SDKMAN_DIR$/i,
  /^SDKMAN_CANDIDATES_DIR$/i,
  /^SDKMAN_PLATFORM$/i,
  /^VIRTUAL_ENV$/i,
  /^CONDA_PREFIX$/i,
  /^PYENV_ROOT$/i,
  /^PYENV_VERSION$/i,
  /^PYENV_VIRTUALENV_[A-Z0-9_]+$/i,
  /^PIP_CONFIG_FILE$/i,
  /^DIRENV_[A-Z0-9_]+$/i,
  /^MISE_[A-Z0-9_]+$/i,
  /^rvm_[A-Za-z0-9_]+$/i,
  /^MY_RUBY_HOME$/i,
  /^GEM_HOME$/i,
  /^GEM_PATH$/i,
  /^RUBIES$/i,
  /^CHRUBY_ROOT$/i,
  /^RBENV_ROOT$/i,
  /^NODENV_ROOT$/i,
  /^AUTOENV_[A-Z0-9_]+$/i,
];
function ig(e) {
  return og.some((t) => t.test(e));
}
i(ig, "shouldInheritLoginShellEnvKey");
function sg(e) {
  let t = {};
  for (let [n, s] of Object.entries(e)) s !== void 0 && ig(n) && (t[n] = s);
  return { ...t, ...Eo(e) };
}
i(sg, "buildLoginShellEnvPatch");
function oc(e, t = process.platform) {
  let n = { ...e };
  if (t !== "win32") return n;
  let s;
  for (let [a, c] of Object.entries(e))
    a.toUpperCase() === "PATH" && c !== void 0 && (s = c);
  for (let a of Object.keys(n)) a.toUpperCase() === "PATH" && delete n[a];
  return (s !== void 0 && (n.PATH = s), n);
}
i(oc, "normalizeRuntimeProcessEnv");
function ic(e = process.env, t = rc(e), n = {}) {
  let s = n.platform ?? process.platform,
    a = oc(e, s),
    c = t?.PATH?.trim() || null,
    d = t ? sg(t) : {},
    m = Eo({ ...a, ...d }),
    f = Ja(["bfs", "ripgrep", "ugrep"], { ...a, PATH: void 0 }),
    g = f.PATH?.split(Ym).filter(Boolean) ?? [],
    h = s === "win32" ? a.PATH : Vo(a.PATH),
    y = c ?? h,
    S = { ...d, ...m, ...f, ...eg };
  if (s === "win32") {
    let k = n.windowsNodePaths ?? rg(a);
    g.push(...k);
  }
  if (
    !!c ||
    g.length > 0 ||
    (s === "win32" && !!a.PATH) ||
    (s !== "win32" && y !== a.PATH)
  ) {
    let k = Ko(y, g);
    k && (S.PATH = k);
  }
  return S;
}
i(ic, "buildRuntimeProcessEnvPatch");
r();
o();
import {
  mkdir as cc,
  open as ag,
  readFile as dc,
  stat as cg,
  unlink as lc,
  writeFile as dg,
} from "node:fs/promises";
import { createHash as lg } from "node:crypto";
import { version as ug } from "node:os";
import { dirname as uc, join as nr } from "node:path";
var Xo = Ws;
function pg(e, t) {
  let n = lg("sha256")
    .update(JSON.stringify(["zcode:session_create:v1", e, t]))
    .digest()
    .subarray(0, 16);
  ((n[6] = (n[6] & 15) | 128), (n[8] = (n[8] & 63) | 128));
  let s = n.toString("hex");
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`;
}
i(pg, "sessionCreateEventId");
var fg = 10,
  mg = 200,
  gg = 300 * 1e3,
  hg = 300 * 1e3,
  yg = 5e3,
  wg = 300,
  vg = 1e3,
  sc = 2,
  Se = class extends Error {
    constructor(n, s, a) {
      super(
        a === void 0
          ? `Telemetry report failed: ${n}`
          : `Telemetry report failed with status ${a}`,
      );
      this.category = n;
      this.retryable = s;
    }
    category;
    retryable;
    static {
      i(this, "TelemetryReportError");
    }
  },
  Xt = new Map();
function kg(e) {
  switch (e) {
    case "darwin":
      return "macos";
    case "win32":
      return "windows";
    default:
      return "linux";
  }
}
i(kg, "normalizeOsCategory");
function Sg(e, t) {
  let s = new Intl.DateTimeFormat("en-CA", {
      timeZone: t,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date(e)),
    a = s.find((m) => m.type === "year")?.value ?? "0000",
    c = s.find((m) => m.type === "month")?.value ?? "01",
    d = s.find((m) => m.type === "day")?.value ?? "01";
  return `${a}-${c}-${d}`;
}
i(Sg, "toLocalDateKey");
function rr(e) {
  return e
    ? nr(e, ".zcode", "v2", "telemetry-state.json")
    : nr(G(), "telemetry-state.json");
}
i(rr, "resolveTelemetryStateFile");
function Pg(e) {
  return e
    ? nr(e, ".zcode", "v2", "telemetry-state.lock")
    : nr(G(), "telemetry-state.lock");
}
i(Pg, "resolveTelemetryLockFile");
function _g(e, t, n) {
  return !e || e.date !== t ? !1 : n - e.startedAt < hg;
}
i(_g, "isFreshDailyActiveInFlight");
async function Cg(e) {
  try {
    let t = await dc(rr(e), "utf-8"),
      n = JSON.parse(t);
    return typeof n == "object" && n ? n : {};
  } catch {
    return {};
  }
}
i(Cg, "readTelemetryState");
async function er(e, t) {
  let n = rr(t);
  (await cc(uc(n), { recursive: !0 }),
    await dg(n, JSON.stringify(e, null, 2), "utf-8"));
}
i(er, "writeTelemetryState");
async function pc(e) {
  await new Promise((t) => setTimeout(t, e));
}
i(pc, "sleep");
async function Ig(e, t) {
  try {
    let n = await cg(e);
    if (t - n.mtimeMs < gg) {
      let s = await bg(e);
      if (!s || Eg(s.pid)) return !1;
    }
    return (await lc(e).catch(() => {}), !0);
  } catch {
    return !1;
  }
}
i(Ig, "removeStaleTelemetryLockIfNeeded");
async function bg(e) {
  try {
    let t = await dc(e, "utf-8"),
      n = JSON.parse(t);
    if (
      typeof n.pid == "number" &&
      Number.isInteger(n.pid) &&
      n.pid > 0 &&
      typeof n.createdAt == "number" &&
      Number.isFinite(n.createdAt)
    )
      return { pid: n.pid, createdAt: n.createdAt };
  } catch {
    return null;
  }
  return null;
}
i(bg, "readTelemetryLockOwner");
function Eg(e) {
  try {
    return (process.kill(e, 0), !0);
  } catch (t) {
    return t instanceof Error && "code" in t && t.code !== "ESRCH";
  }
}
i(Eg, "isProcessAlive");
async function tr(e, t) {
  let n = Pg(e);
  await cc(uc(n), { recursive: !0 });
  for (let s = 0; s < mg; s += 1)
    try {
      let a = await ag(n, "wx");
      try {
        await a.writeFile(
          JSON.stringify({ pid: process.pid, createdAt: Date.now() }),
          "utf-8",
        );
        let c = await Cg(e);
        return await t(c);
      } finally {
        (await a.close(), await lc(n).catch(() => {}));
      }
    } catch (a) {
      if (!(a instanceof Error && "code" in a && a.code === "EEXIST")) throw a;
      if (await Ig(n, Date.now())) continue;
      await pc(fg);
    }
  throw new Error("Telemetry state lock timeout");
}
i(tr, "withTelemetryStateLock");
function ac(e, t) {
  return (Xt.set(e, Promise.resolve(t)), t);
}
i(ac, "rememberDeviceMid");
async function fc(e, t) {
  let n = rr(t.homeDir);
  if (e.deviceMid) return ac(n, e.deviceMid);
  let s = (t.randomUUID ?? To)();
  return ((e.deviceMid = s), await er(e, t.homeDir), ac(n, s));
}
i(fc, "ensureDeviceMidInLockedState");
function Yo(e = {}) {
  let t = rr(e.homeDir),
    n = Xt.get(t);
  if (n) return n;
  let s = tr(e.homeDir, async (a) => fc(a, e)).catch((a) => {
    throw (Xt.get(t) === s && Xt.delete(t), a);
  });
  return (Xt.set(t, s), s);
}
i(Yo, "ensureTelemetryDeviceMid");
function Tg(e = {}) {
  let t = e.fetchImpl ?? fetch,
    n = e.loadUserId ?? (async () => ""),
    s = e.loadMarketingParams ?? (async () => null),
    a = T("telemetry-core"),
    c = e.warn ?? ((I) => a.warn(void 0, I)),
    d = !1,
    m = e.randomUUID ?? (() => To()),
    f = e.now ?? Date.now,
    g = e.appVersion ?? be,
    h = e.platform ?? process.platform,
    y = e.osVersion ?? ug(),
    S = e.requestTimeoutMs ?? yg,
    v = e.sleep ?? pc,
    k = new Set(),
    M = { homeDir: e.homeDir, randomUUID: m };
  function R(I) {
    return I === 408
      ? new Se("http_408", !0, I)
      : I === 429
        ? new Se("http_429", !0, I)
        : I >= 500 && I <= 599
          ? new Se("http_5xx", !0, I)
          : I >= 400 && I <= 499
            ? new Se("http_4xx", !1, I)
            : new Se("http_other", !1, I);
  }
  i(R, "classifyHttpFailure");
  async function w(I, b, A, E) {
    let O = null;
    try {
      O = (await e.loadAuthorization?.(E)) ?? null;
    } catch {}
    let P = new AbortController(),
      N = setTimeout(() => P.abort(), S),
      F;
    try {
      F = await t(I, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...A,
          ...(O ? { Authorization: O } : {}),
        },
        redirect: "error",
        body: b,
        signal: P.signal,
      });
    } catch {
      throw new Se(P.signal.aborted ? "timeout" : "network", !0);
    } finally {
      clearTimeout(N);
    }
    if (!F.ok) throw R(F.status);
  }
  i(w, "sendReportAttempt");
  async function C(I, b, A, E, O) {
    if (!Xo) return;
    let P = null;
    try {
      P = await s();
    } catch {
      d ||
        ((d = !0),
        c(
          "Telemetry marketing attribution load failed; continuing without attribution",
        ));
    }
    let N = JSON.stringify({
        event_id: A,
        client_timezone: b.clientTimezone,
        client_language: b.clientLanguage,
        element_name: I.elementName,
        event_region: I.eventRegion,
        event_type: I.eventType,
        event_text: I.eventText ?? "",
        event_extra_detail: $s(I.elementName, I.eventExtraDetail),
        user_id: E,
        screen_resolution: b.screenResolution,
        app_version: g,
        device_os_category: kg(h),
        device_os_version: y,
        device_mid: O,
        mac_id: "",
        marketing_params: JSON.stringify(P ?? {}),
        ...(I.talkId ? { talk_id: I.talkId } : {}),
        ...(I.messageId ? { message_id: I.messageId } : {}),
      }),
      F = String(yo(Xo, (await e.resolveZCodeEndpointOrigin?.()) ?? Xo)),
      H = bo({
        appVersion: g,
        platform: h,
        arch: e.arch ?? process.arch,
        osVersion: y,
        releaseChannel: e.releaseChannel ?? Rn,
        clientLanguage: b.clientLanguage,
        clientTimezone: b.clientTimezone,
        deviceMid: O,
        endpointOrigin: new URL(F).origin,
      }),
      K = Date.now(),
      L = null,
      j = 0;
    for (let $ = 1; $ <= sc; $ += 1) {
      j = $;
      try {
        await w(F, N, H, E);
        return;
      } catch (ue) {
        if (
          ((L = ue instanceof Se ? ue : new Se("network", !0)),
          !L.retryable || $ === sc)
        )
          break;
        (a.debug(
          void 0,
          `retry event=${I.elementName} eventId=${A} attempt=${$} category=${L.category}`,
        ),
          await v(L.category === "http_429" ? vg : wg));
      }
    }
    let z = L ?? new Se("network", !0);
    throw (
      c(
        `Telemetry report failed; event=${I.elementName} eventId=${A} attempts=${j} category=${z.category} elapsedMs=${Date.now() - K}`,
      ),
      z
    );
  }
  i(C, "sendReport");
  function x(I) {
    let b = I.finally(() => k.delete(b));
    return (k.add(b), b);
  }
  i(x, "trackReport");
  async function _({ timeoutMs: I }) {
    let b = !1,
      A,
      E = new Promise((O) => {
        A = setTimeout(() => {
          ((b = !0), O());
        }, I);
      });
    try {
      for (; !b && k.size > 0;) await Promise.race([Promise.allSettled(k), E]);
    } finally {
      A !== void 0 && clearTimeout(A);
    }
    k.size > 0 && c(`Telemetry flush timed out; pending=${k.size}`);
  }
  return (
    i(_, "flushPendingReports"),
    {
      reportEvent(I) {
        return x(
          (async () => {
            let b = I.userId ?? (await n()),
              A =
                I.elementName === "session_create" && I.talkId
                  ? pg(b, I.talkId)
                  : m(),
              E = await Yo(M);
            await C(
              {
                elementName: I.elementName,
                eventRegion: I.eventRegion,
                eventType: I.eventType,
                eventText: I.eventText,
                eventExtraDetail: I.eventExtraDetail,
                userId: b,
                talkId: I.talkId,
                messageId: I.messageId,
              },
              I.context,
              A,
              b,
              E,
            );
          })(),
        );
      },
      reportAppLaunch(I) {
        return x(
          (async () => {
            let b = m(),
              A = await n(),
              E = await Yo(M);
            await C(
              {
                elementName: "app_launch",
                eventRegion: "app",
                eventType: "view",
                eventExtraDetail: {},
                userId: A,
              },
              I,
              b,
              A,
              E,
            );
          })(),
        );
      },
      reportAppDailyActive(I) {
        return x(
          (async () => {
            let b = f(),
              A = Sg(b, I.clientTimezone),
              E = await n(),
              O = await tr(e.homeDir, async (P) => {
                if (
                  P.lastDailyActiveDate === A ||
                  _g(P.dailyActiveInFlight, A, b)
                )
                  return null;
                let N = m(),
                  F = await fc(P, M);
                return (
                  (P.dailyActiveInFlight = { date: A, startedAt: b }),
                  await er(P, e.homeDir),
                  { eventId: N, deviceMid: F }
                );
              });
            if (O) {
              try {
                await C(
                  {
                    elementName: "app_daily_active",
                    eventRegion: "app",
                    eventType: "view",
                    eventExtraDetail: {},
                    userId: E,
                  },
                  I,
                  O.eventId,
                  E,
                  O.deviceMid,
                );
              } catch (P) {
                throw (
                  await tr(e.homeDir, async (N) => {
                    N.dailyActiveInFlight?.date === A &&
                      (delete N.dailyActiveInFlight, await er(N, e.homeDir));
                  }),
                  P
                );
              }
              await tr(e.homeDir, async (P) => {
                ((P.lastDailyActiveDate = A),
                  P.dailyActiveInFlight?.date === A &&
                    delete P.dailyActiveInFlight,
                  await er(P, e.homeDir));
              });
            }
          })(),
        );
      },
      flushPendingReports: _,
    }
  );
}
i(Tg, "createTelemetryCore");
r();
o();
r();
o();
r();
o();
var mc = {
    sessionStore: "none",
    subagentTranscripts: "safe",
    toolOutputs: "none",
    modelTrajectory: "safe",
    devTraces: "safe",
    logs: "safe",
    backups: "confirm",
    exports: "safe",
    runtimes: "none",
    config: "none",
    other: "none",
  },
  Rg = [
    {
      categoryId: "subagentTranscripts",
      pattern: /^cli\/agents\/[^/]+\/[^/]+\/transcript\.jsonl$/,
      entryKeySegments: 3,
    },
    {
      categoryId: "sessionStore",
      pattern: /^v2\/[^/]+\.sqlite(?:-wal|-shm)?$/,
    },
    {
      categoryId: "sessionStore",
      pattern: /^cli\/db\/db\.sqlite(?:-wal|-shm)?$/,
    },
    {
      categoryId: "toolOutputs",
      pattern: /^v2\/checkpoints\/(?:.+\/)?(?:pending|tmp)\//,
    },
    { categoryId: "backups", pattern: /^cli\/db\/db\.sqlite\.[^/]+$/ },
    { categoryId: "backups", pattern: /^cli\/config\.json\.bak[^/]*$/ },
    { categoryId: "backups", pattern: /^v2\/[^/]+\.bak$/ },
    { categoryId: "backups", pattern: /^v2\/[^/]+\.backup\.json$/ },
    {
      categoryId: "backups",
      pattern: /^v2\/setting\.json\.(?:corrupt-|[^/]*backup)[^/]*$/,
    },
    { categoryId: "backups", pattern: /^v2\/config\.json\.pre-[^/]+$/ },
    { categoryId: "toolOutputs", pattern: /^v2\/coding-plan-cache\.json$/ },
    { categoryId: "toolOutputs", pattern: /^v2\/bots-model-cache[^/]*\.json$/ },
    { categoryId: "logs", pattern: /^computer-use\/run\/[^/]+\.log$/ },
    { categoryId: "config", pattern: /^v2\/[^/]+\.json$/ },
    { categoryId: "config", pattern: /^cli\/config\.json$/ },
    { categoryId: "config", pattern: /^agents\/[^/]+\.md$/ },
    { categoryId: "config", pattern: /^AGENTS\.md$/ },
  ],
  gc = {
    sessionStore: ["v2/sessions", "v2/session-bindings", "v2/checkpoints"],
    subagentTranscripts: [],
    toolOutputs: [
      "cli/artifacts",
      "cli/agents",
      "cli/sessions",
      "cli/exec",
      "cli/image-cache",
      "cli/pdf-cache",
      "clipboard",
      "git-checkpoint-index",
      "editor-icon",
      "tmp",
      "cache",
    ],
    modelTrajectory: ["cli/debug", "cli/rollout"],
    devTraces: ["v2/dev", "v2/acp-traffic-proxy", "v2/acp-stream-diagnostics"],
    logs: [
      "v2/logs",
      "cli/log",
      "logs",
      "v2/crash",
      "v2/perf",
      "feedback/logs",
    ],
    backups: [
      "backup",
      "v2/backup",
      "v2/migrations",
      "cli/db/backup",
      "cli/db/backups",
    ],
    exports: ["export-log", "export-log-stage", "feedback"],
    runtimes: [
      "agents",
      "bundled-agents",
      "lite",
      "computer-use",
      "cli/plugins",
    ],
    config: [
      "v2/agent-config",
      "v2/bots-runtime-locks",
      "v2/bot-attachments",
      "v2/certs",
      "v2/acp-auth",
      "v2/acp-config",
      "v2/provider",
      "cli/models",
      "cli/memories",
      "cli/workflows",
      "security",
      "commands",
      "skills",
      "workflows",
      "workspace",
      "mailbox",
      "server",
      "controller",
      "launcher",
      "dev-signing",
      "cua-helper-dev-identity",
      "perf-task-manifests",
      "plugin-workspace",
      "projects",
    ],
  },
  Ag = Object.entries(gc)
    .flatMap(([e, t]) => t.map((n) => ({ prefix: n, categoryId: e })))
    .sort((e, t) => t.prefix.length - e.prefix.length),
  Mg = new Set([
    "setting.json",
    "setting.json.lock",
    "credentials.json",
    ".credentials.json",
    ".tokens",
    "zcode-stdio-tap.json",
  ]),
  xg = ["v2/crash/live"];
function Yt(e) {
  return e.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
}
i(Yt, "normalizeStorageRelativePath");
function or(e, t) {
  return e === t || e.startsWith(`${t}/`);
}
i(or, "isUnderPrefix");
function Og(e, t) {
  let s = e.slice(t.length + 1).split("/")[0];
  return s ? `${t}/${s}` : t;
}
i(Og, "entryKeyBelow");
function ir(e, t) {
  let n = Yt(e);
  if (t.rootId === "home" && t.hasCustomDataBaseDir && or(n, "v2"))
    return { categoryId: "other", entryKey: "v2" };
  if (or(n, "agent")) return { categoryId: "other", entryKey: "agent" };
  for (let s of Rg)
    if (s.pattern.test(n)) {
      let a = s.entryKeySegments
        ? n.split("/").slice(0, s.entryKeySegments).join("/")
        : n;
      return { categoryId: s.categoryId, entryKey: a };
    }
  for (let { prefix: s, categoryId: a } of Ag)
    if (or(n, s)) return { categoryId: a, entryKey: Og(n, s) };
  return { categoryId: "other", entryKey: n.split("/")[0] ?? n };
}
i(ir, "classifyStoragePath");
function vt(e) {
  return mc[e];
}
i(vt, "getStorageCategoryCleanability");
function hc(e) {
  let t = Yt(e),
    n = t.split("/").at(-1) ?? t;
  return Mg.has(n) ? !0 : xg.some((s) => or(t, s));
}
i(hc, "isProtectedStoragePath");
var Dg = { backups: ["cli/db", "cli", "v2"], logs: ["computer-use/run"] },
  Ng = { subagentTranscripts: ["cli/agents"] };
function yc(e) {
  if (e === "other" || mc[e] === "none") return [];
  let t = [...gc[e], ...(Ng[e] ?? [])].map((s) => ({
      prefix: s,
      recursive: !0,
    })),
    n = (Dg[e] ?? []).map((s) => ({ prefix: s, recursive: !1 }));
  return [...t, ...n];
}
i(yc, "getStorageCleanScopes");
var Fg = 100;
function wc(e, t = {}) {
  let n = t.maxEntriesPerCategory ?? Fg,
    s = { rootId: e.id, hasCustomDataBaseDir: e.hasCustomDataBaseDir },
    a = new Map(),
    c = 0,
    d = 0;
  return {
    add(m) {
      let { categoryId: f, entryKey: g } = ir(m.relativePath, s),
        h = a.get(f);
      (h || ((h = { bytes: 0, fileCount: 0, entries: new Map() }), a.set(f, h)),
        (h.bytes += m.bytes),
        (h.fileCount += 1));
      let y = h.entries.get(g);
      (y
        ? ((y.bytes += m.bytes), (y.fileCount += 1))
        : h.entries.set(g, { bytes: m.bytes, fileCount: 1 }),
        (c += m.bytes),
        (d += 1));
    },
    snapshot(m) {
      let f = Xs.map((g) => {
        let h = a.get(g);
        return {
          id: g,
          bytes: h?.bytes ?? 0,
          fileCount: h?.fileCount ?? 0,
          cleanability: vt(g),
          entries: h ? Bg(h.entries, n) : [],
        };
      });
      return {
        id: e.id,
        path: e.path,
        volume: m,
        bytes: c,
        fileCount: d,
        categories: f,
      };
    },
  };
}
i(wc, "createStorageUsageAccumulator");
function Bg(e, t) {
  let n = [...e.entries()]
    .map(([c, d]) => ({ relativePath: c, ...d }))
    .sort(
      (c, d) =>
        d.bytes - c.bytes || c.relativePath.localeCompare(d.relativePath),
    );
  if (n.length <= t) return n;
  let s = n.slice(0, t),
    a = n.slice(t);
  return (
    s.push({
      relativePath: "\u2026",
      bytes: a.reduce((c, d) => c + d.bytes, 0),
      fileCount: a.reduce((c, d) => c + d.fileCount, 0),
    }),
    s
  );
}
i(Bg, "foldEntries");
r();
o();
import { lstat as Ug, opendir as Wg } from "node:fs/promises";
import { join as jg, relative as $g, sep as zg } from "node:path";
function Zg() {
  return new DOMException("storage scan aborted", "AbortError");
}
i(Zg, "createStorageAbortError");
function sr(e) {
  return e && typeof e == "object" && "code" in e && typeof e.code == "string"
    ? e.code
    : "UNKNOWN";
}
i(sr, "errorCode");
function Qo(e, t) {
  return $g(e, t).split(zg).join("/");
}
i(Qo, "toRelative");
async function ar(e) {
  let { rootPath: t, onEntry: n, onError: s, signal: a } = e,
    c = Math.max(1, e.concurrency ?? 4),
    d = Math.max(1, e.yieldEvery ?? 256),
    m = [t],
    f = { directoriesScanned: 0, filesScanned: 0, missingRoot: !1 },
    g = 0,
    h = 0,
    y = i(() => {
      if (a?.aborted) throw Zg();
    }, "throwIfAborted"),
    S = i(async () => {
      ((g += 1),
        g >= d && ((g = 0), await new Promise((k) => setImmediate(k)), y()));
    }, "maybeYield"),
    v = i(async (k) => {
      y();
      let M;
      try {
        M = await Wg(k);
      } catch (R) {
        if (k === t && sr(R) === "ENOENT") {
          f.missingRoot = !0;
          return;
        }
        s?.({ path: Qo(t, k), code: sr(R) });
        return;
      }
      f.directoriesScanned += 1;
      try {
        for await (let R of M) {
          y();
          let w = jg(k, R.name);
          if (!R.isSymbolicLink()) {
            if (R.isDirectory()) {
              m.push(w);
              continue;
            }
            if (R.isFile()) {
              try {
                let C = await Ug(w);
                if (!C.isFile()) continue;
                ((f.filesScanned += 1),
                  n({
                    relativePath: Qo(t, w),
                    bytes: C.size,
                    mtimeMs: C.mtimeMs,
                  }));
              } catch (C) {
                sr(C) !== "ENOENT" && s?.({ path: Qo(t, w), code: sr(C) });
              }
              await S();
            }
          }
        }
      } finally {
        await M.close().catch(() => {});
      }
    }, "scanDirectory");
  return (
    await new Promise((k, M) => {
      let R = !1,
        w = i(() => {
          if (!R) {
            if (m.length === 0 && h === 0) {
              k();
              return;
            }
            for (; h < c && m.length > 0;) {
              let C = m.pop();
              ((h += 1),
                v(C)
                  .then(() => {
                    ((h -= 1), w());
                  })
                  .catch((x) => {
                    ((R = !0), M(x));
                  }));
            }
          }
        }, "pump");
      w();
    }),
    f
  );
}
i(ar, "walkStorageRoot");
r();
o();
import { stat as vc, statfs as Hg } from "node:fs/promises";
import { dirname as Gg } from "node:path";
async function qg(e) {
  try {
    let t = (await vc(e)).dev,
      n = e;
    for (;;) {
      let a = Gg(n);
      if (a === n) break;
      let c;
      try {
        c = (await vc(a)).dev;
      } catch {
        break;
      }
      if (c !== t) break;
      n = a;
    }
    let s = await Hg(n);
    return {
      deviceId: String(t),
      mountPoint: n,
      totalBytes: Number(s.blocks) * Number(s.bsize),
      freeBytes: Number(s.bavail) * Number(s.bsize),
    };
  } catch {
    return null;
  }
}
i(qg, "probeStorageVolume");
function ei() {
  return { probe: qg };
}
i(ei, "createFsVolumeProbe");
async function Kg(e) {
  let t = e.now ?? Date.now,
    n = e.volumeProbe ?? ei(),
    s = e.progressIntervalMs ?? 300,
    a = [],
    c = [],
    d = -1 / 0;
  for (let f of e.roots) {
    let g = wc(f),
      h = await n.probe(f.path),
      y = i(() => {
        ((d = t()),
          e.onProgress({ roots: [...c, g.snapshot(h)], errors: [...a] }));
      }, "report");
    (await ar({
      rootPath: f.path,
      signal: e.signal,
      concurrency: e.concurrency,
      onEntry: i((S) => {
        (g.add(S), t() - d >= s && y());
      }, "onEntry"),
      onError: i((S) => a.push({ ...S, path: `${f.id}:${S.path}` }), "onError"),
    }),
      c.push(g.snapshot(h)));
  }
  let m = { roots: c, errors: a };
  return (e.onProgress(m), m);
}
i(Kg, "runStorageScan");
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var ce = l.string().trim().min(1),
  Vg = l.discriminatedUnion("kind", [
    l
      .object({
        kind: l.literal("ssh"),
        host: ce,
        username: ce,
        port: l.number().int().min(1).max(65535).optional(),
        sshConfigAlias: l.string().optional(),
        privateKeyPath: l.string().optional(),
        passwordCredentialKey: ce.optional(),
        privateKeyPassphraseCredentialKey: ce.optional(),
        assetInstallMode: l.enum(zs).optional(),
        resourcePackages: l
          .object({ selectedPackageIds: l.array(l.string()).optional() })
          .strict()
          .optional(),
      })
      .strict(),
    l
      .object({
        kind: l.literal("wsl"),
        distro: ce.optional(),
        user: ce.optional(),
      })
      .strict(),
    l.object({ kind: l.literal("docker"), container: ce }).strict(),
    l
      .object({
        kind: l.literal("server"),
        url: l.url(),
        name: ce.optional(),
        workspacePath: ce.optional(),
        serverId: ce.optional(),
        tokenCredentialKey: ce.optional(),
      })
      .strict(),
  ]),
  Pc = l
    .object({
      rootPath: ce,
      position: l.number().int().nonnegative(),
      isPrimary: l.boolean(),
    })
    .strict(),
  Jg = l
    .object({ projectId: ce, name: ce, roots: l.array(Pc) })
    .strict()
    .refine(
      ({ roots: e }) =>
        new Set(e.map((t) => t.rootPath)).size === e.length &&
        (e.length === 0 || e.filter((t) => t.isPrimary).length === 1),
      "remote-project.invalid-roots",
    );
r();
o();
r();
o();
r();
o();
var Vx = 300 * 1e3;
var tO = l
  .object({
    reuseExistingRoot: l.boolean().optional(),
    id: l.string().min(1).optional(),
    hostId: l.string().min(1).optional(),
    restoreProjectId: l.string().min(1).optional(),
    name: l.string().optional(),
    defaultName: l.string().optional(),
    roots: l.array(l.string().min(1)).optional(),
    primaryRoot: l.string().min(1).optional(),
    pinned: l.boolean().optional(),
  })
  .strict()
  .refine(
    (e) =>
      !e.reuseExistingRoot ||
      (e.roots?.length === 1 &&
        (!e.hostId || e.hostId === "local") &&
        Object.keys(e).every((t) =>
          ["roots", "hostId", "reuseExistingRoot"].includes(t),
        )),
    "project.invalid-directory-open",
  )
  .refine((e) => !(e.id && e.restoreProjectId), "project.ambiguous-save")
  .refine(
    (e) => !e.restoreProjectId || e.roots !== void 0,
    "project.restore-roots-required",
  );
r();
o();
r();
o();
var dh = l
    .object({
      hostId: l.string().min(1),
      workspacePath: l.string().min(1),
      workspaceIdentity: l.string().trim().min(1).optional(),
      taskId: l.string().min(1),
    })
    .strict()
    .refine(
      (e) => (De(e.workspaceIdentity ?? "") ?? "local") === e.hostId,
      "task-group.host-identity-mismatch",
    ),
  vO = l.discriminatedUnion("type", [
    l.object({ type: l.literal("group"), groupId: l.string().min(1) }).strict(),
    l.object({ type: l.literal("task"), task: dh }).strict(),
  ]);
r();
o();
r();
o();
r();
o();
r();
o();
var UO = 96 * 1024;
var WO = l.object({ target: qt, state: Pa, updatedAt: l.number() }).strict();
var tD = qt.extend({
  html: l.string(),
  ownerWebContentsId: l.number().int().positive(),
  instanceKey: l.string().min(1).max(1024),
});
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var cr = Ye.shape,
  kt = Ye.pick({ enabled: !0 }).extend({
    enabled: qe.shape.enabled,
    properties: cr.properties
      .pick({
        contextWindow: !0,
        supportsJsonSchemaOutput: !0,
        supportsNativeWebSearch: !0,
        supportsMidConversationSystem: !0,
      })
      .extend({
        inputFormat: cr.properties.shape.inputFormat.pick({
          supportsImage: !0,
          supportsVideo: !0,
          supportsPdf: !0,
        }),
      }),
    optionSpecs: cr.optionSpecs
      .pick({ reasoningLevel: !0 })
      .extend({
        maxOutputTokens: cr.optionSpecs.shape.maxOutputTokens.pick({ max: !0 }),
      }),
  });
r();
o();
r();
o();
var en = class {
  static {
    i(this, "ConfigOverlay");
  }
  overlayValue(t, n) {
    return n === void 0 ? t : n;
  }
  overlayConfig(t, n) {
    return n === void 0
      ? t
      : n === null || t === null || t === void 0
        ? n
        : t.overlay(n);
  }
};
r();
o();
r();
o();
r();
o();
var uh = l.enum([
    "anthropic-messages",
    "openai-chat-completions",
    "openai-responses",
  ]),
  tn = l.enum(["standard-personal", "zai-family", "bigmodel-family"]),
  ph = l.enum([
    "start-plan",
    "individual-coding-plan",
    "team-coding-plan",
    "off-peak",
    "highspeed",
  ]),
  fh = l.enum(["visible", "hidden"]),
  mh = l
    .object({ type: l.literal("builtin"), key: l.string().min(1) })
    .strict(),
  Ic = l
    .string()
    .refine((e) => e.trim().length > 0, {
      message: "\u5FC5\u586B\u914D\u7F6E\u4E0D\u80FD\u4E3A\u7A7A",
      params: { configIssueCode: "required-field-missing" },
    }),
  lr = l
    .object({
      type: l.enum(["api-key", "zhipu-coding-plan-api-key"]),
      apiKey: l.string().nullable().optional(),
      apiKeyManagementUrl: l.string().url().nullable().optional(),
    })
    .strict(),
  bc = lr.extend({ apiKey: Ic }),
  dr = l
    .object({
      type: l.literal("zhipu-account"),
      accountType: l.enum(["zai", "bigmodel"]),
      mode: ph,
      entitled: l.boolean(),
    })
    .strict(),
  ri = l.object({ ...vo(dr.shape), type: dr.shape.type }).strict(),
  gh = l.discriminatedUnion("type", [lr, ri]),
  hh = l.discriminatedUnion("type", [bc, dr]),
  oi = l
    .object({
      type: uh,
      baseUrl: Ic.pipe(l.string().url()),
      headers: l
        .record(l.string(), l.string())
        .readonly()
        .nullable()
        .optional(),
    })
    .strict(),
  Ec = l
    .object({
      ...vo(oi.shape),
      baseUrl: l.string().url().nullable().optional(),
    })
    .strict(),
  Tc = Ec.extend({ baseUrl: l.string().nullable().optional() }),
  ni = l.array(l.string().min(1)).readonly().nullable().optional(),
  ze = l
    .object({
      group: tn.nullable().optional(),
      logo: mh.nullable().optional(),
      access: gh.nullable().optional(),
      api: Ec.nullable().optional(),
      builtinModelIds: ni,
      personalModelIds: ni,
      modelOrder: ni,
      visibility: fh.nullable().optional(),
    })
    .strict(),
  yh = ze.extend({ group: tn, access: hh, api: oi }),
  wh = l
    .object({
      "zh-CN": l.string().min(1).optional(),
      "en-US": l.string().min(1).optional(),
    })
    .strict(),
  Rc = l
    .object({ templateId: l.string().min(1), templateNameMap: wh, config: ze })
    .strict();
var St = l.string().min(1),
  ur = l
    .string()
    .min(1)
    .refine((e) => {
      try {
        return (new RegExp(`^(?:${e})$`), !0);
      } catch {
        return !1;
      }
    }, "\u65E0\u6548\u5339\u914D\u6B63\u5219"),
  si = l.object({ modelMatch: ur, config: qe }).strict(),
  vh = si.extend({ apiTypeMatch: ur }),
  kh = si.extend({ baseUrlMatch: ur, apiTypeMatch: ur.optional() }),
  Ac = l.object({ templateId: St, modelId: St, config: qe }).strict(),
  pr = Ac.omit({ templateId: !0 }).extend({ providerId: St }),
  Mc = pr.extend({ config: kt }),
  xc = l
    .object({
      modelRules: l.array(si),
      modelApiRules: l.array(vh),
      providerSiteRules: l.array(kh),
      templateModelRules: l.array(Ac),
      builtinProviderModelRules: l.array(pr),
    })
    .strict(),
  Oc = l
    .object({
      providerModelRules: l.array(pr),
      manualProviderModelRules: l.array(Mc),
    })
    .strict()
    .superRefine((e, t) => {
      let n = new Set(
        e.providerModelRules.map((s) =>
          JSON.stringify([s.providerId, s.modelId]),
        ),
      );
      e.manualProviderModelRules.forEach((s, a) => {
        n.has(JSON.stringify([s.providerId, s.modelId])) &&
          t.addIssue({
            code: "custom",
            path: ["manualProviderModelRules", a],
            message:
              "\u540C\u4E00 Provider/Model \u4E0D\u80FD\u540C\u65F6\u58F0\u660E\u667A\u80FD\u548C\u624B\u52A8\u914D\u7F6E",
          });
      });
    }),
  ai = l
    .object({
      providerId: St,
      templateId: St.nullable().optional(),
      providerName: St.nullable().optional(),
      enabled: l.boolean().optional(),
      config: ze,
    })
    .strict(),
  Dc = Rc.extend({
    config: ze
      .pick({ logo: !0, access: !0, api: !0, builtinModelIds: !0 })
      .extend({ access: lr.omit({ apiKey: !0 }).nullable().optional() }),
  }),
  Nc = ai.extend({
    config: ze
      .omit({ personalModelIds: !0, modelOrder: !0 })
      .extend({ group: tn.exclude(["standard-personal"]) }),
  }),
  Sh = ai
    .extend({
      config: ze
        .omit({ builtinModelIds: !0 })
        .extend({
          group: tn.extract(["standard-personal"]).nullable().optional(),
          api: Tc.nullable().optional(),
        }),
    })
    .superRefine((e, t) => {
      e.providerId.startsWith("account:") &&
        e.config.access !== void 0 &&
        t.addIssue({
          code: "custom",
          path: ["config", "access"],
          message:
            "\u56FA\u5B9A Account Provider \u7684 Access \u53EA\u80FD\u7531 ZCode Built-in Config \u58F0\u660E",
        });
    }),
  Ph = l
    .object({ templateRules: l.array(Dc), providerRules: l.array(Nc) })
    .strict()
    .superRefine((e, t) => {
      (ii(
        e.templateRules.map((n) => n.templateId),
        "templateRules",
        "templateId",
        t,
      ),
        ii(
          e.providerRules.map((n) => n.providerId),
          "providerRules",
          "providerId",
          t,
        ));
    }),
  _h = l
    .object({ providerRules: l.array(Sh) })
    .strict()
    .superRefine((e, t) => {
      ii(
        e.providerRules.map((n) => n.providerId),
        "providerRules",
        "providerId",
        t,
      );
    });
function ii(e, t, n, s) {
  let a = new Set();
  e.forEach((c, d) => {
    (a.has(c) &&
      s.addIssue({
        code: "custom",
        path: [t, d, n],
        message: `\u91CD\u590D ${n}: ${c}`,
      }),
      a.add(c));
  });
}
i(ii, "checkUniqueIds");
r();
o();
var Ae = class e extends en {
  static {
    i(this, "ProviderConfigMap");
  }
  #e;
  constructor(t = []) {
    super();
    let n = new Map();
    for (let s of t) {
      let a = "providerId" in s ? s : { providerId: s[0], config: s[1] };
      if (n.has(a.providerId))
        throw new Error(`\u91CD\u590D Provider key: ${a.providerId}`);
      n.set(a.providerId, Object.freeze({ ...a }));
    }
    ((this.#e = n), Object.freeze(this));
  }
  static empty() {
    return new e();
  }
  overlay(t) {
    let n = new Map(this.#e);
    for (let [s, a] of t.#e) {
      let c = n.get(s);
      n.set(
        s,
        c
          ? {
              providerId: s,
              templateId: this.overlayValue(c.templateId, a.templateId),
              providerName: this.overlayValue(c.providerName, a.providerName),
              enabled: this.overlayValue(c.enabled, a.enabled),
              config: c.config.overlay(a.config),
            }
          : a,
      );
    }
    return new e(n.values());
  }
  mapConfigs(t) {
    return new e(
      this.rules().map((n) => ({ ...n, config: t(n.config, n.providerId, n) })),
    );
  }
  reorder(t) {
    let n = new Map();
    for (let s of t) {
      let a = this.#e.get(s);
      a && !n.has(s) && n.set(s, a);
    }
    for (let [s, a] of this.#e) n.has(s) || n.set(s, a);
    return new e(n.values());
  }
  set(t, n) {
    return this.setRule({ ...this.#e.get(t), providerId: t, config: n });
  }
  setRule(t) {
    let n = new Map(this.#e);
    return (n.set(t.providerId, t), new e(n.values()));
  }
  delete(t) {
    return new e(this.rules().filter((n) => n.providerId !== t));
  }
  validateComplete(t = []) {
    return this.entries().flatMap(([n, s]) => s.validateComplete([...t, n]));
  }
  get(t) {
    return this.#e.get(t)?.config;
  }
  getRule(t) {
    return this.#e.get(t);
  }
  has(t) {
    return this.#e.has(t);
  }
  keys() {
    return [...this.#e.keys()];
  }
  rules() {
    return [...this.#e.values()];
  }
  entries() {
    return this.rules().map((t) => [t.providerId, t.config]);
  }
  toJSON() {
    return this.rules().map(({ config: t, ...n }) =>
      Ih({ ...n, config: t.toJSON() }),
    );
  }
};
function Ih(e) {
  return Object.fromEntries(Object.entries(e).filter(([, t]) => t !== void 0));
}
i(Ih, "objectWithoutUndefined");
r();
o();
var mN = ze
  .pick({ builtinModelIds: !0 })
  .extend({
    access: ri.pick({ type: !0, entitled: !0 }).nullable().optional(),
  });
r();
o();
r();
o();
var DN = Object.freeze({
  revision: "empty-account-config-v1",
  basedOnZCodeBuiltinRevision: "uninitialized",
  providers: Ae.empty(),
});
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var Rh = 1;
var h0 = l
  .object({
    schemaVersion: l.literal(Rh),
    revision: l.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
    config: l
      .object({
        providerConfigRules: l.unknown(),
        modelConfigRules: l.unknown(),
      })
      .strict(),
  })
  .strict();
r();
o();
var A0 = l
  .object({
    code: l.literal(0),
    data: l
      .object({
        configs: l
          .object({
            builtin_provider_config_json: l
              .string()
              .url()
              .refine((e) => {
                let t = new URL(e);
                return t.protocol === "https:" && !t.username && !t.password;
              })
              .optional(),
          })
          .passthrough(),
      })
      .passthrough(),
  })
  .passthrough();
r();
o();
var L0 = 3600 * 1e3;
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var Oh = 1;
var yF = l
  .object({
    schemaVersion: l.literal(Oh),
    config: l
      .object({
        providerOrder: l.array(l.string().min(1)).optional(),
        providerConfigRules: l.unknown(),
        modelConfigRules: l.unknown(),
        defaultModelSelection: xe.optional(),
      })
      .strict(),
  })
  .strict();
var wF = Ye.extend({ enabled: qe.shape.enabled }),
  vF = kt.extend({
    properties: kt.shape.properties.extend({
      requiresMfjsToolSchema: Ye.shape.properties.shape.requiresMfjsToolSchema,
    }),
  });
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
import { DatabaseSync as UB } from "node:sqlite";
r();
o();
r();
o();
import * as Lh from "yauzl";
var ZB = 8 * 1024 * 1024,
  HB = 32 * 1024 * 1024,
  GB = 128 * 1024 * 1024;
r();
o();
r();
o();
var Bh = l.enum(["zh-CN", "en-US"]);
var fU = l.object({
  locale: Bh,
  scope: l.string().uuid(),
  campaignId: l.string().trim().min(1).max(128),
  actionType: l.enum(["confirm", "cancel"]),
});
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var sy = Lp(Qc(), 1);
var qW = 128 * 1024,
  KW = 256 * 1024,
  VW = 4 * 1024 * 1024,
  JW = 8 * 1024 * 1024,
  XW = 256 * 1024,
  YW = 1024 * 1024,
  QW = 25 * 1024 * 1024,
  ej = 25 * 1024 * 1024;
r();
o();
var aj = 16 * 1024 * 1024;
r();
o();
r();
o();
import { join as gr } from "node:path";
var cy = 10 * 6e4;
var ed = 512 * 1024,
  dy = 8 * 1024 * 1024,
  ly = 1024 * 1024,
  uy = 1024 * 1024,
  py = 64 * 1024;
var fj = [
  gr(
    process.env.ProgramW6432 ?? process.env.ProgramFiles ?? "C:\\Program Files",
    "Git",
    "cmd",
    "git.exe",
  ),
  gr(
    process.env.ProgramW6432 ?? process.env.ProgramFiles ?? "C:\\Program Files",
    "Git",
    "bin",
    "git.exe",
  ),
  gr(
    process.env["ProgramFiles(x86)"] ?? "C:\\Program Files (x86)",
    "Git",
    "cmd",
    "git.exe",
  ),
  gr(
    process.env["ProgramFiles(x86)"] ?? "C:\\Program Files (x86)",
    "Git",
    "bin",
    "git.exe",
  ),
];
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var h$ = T("git-repo");
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
import { spawn as vy } from "node:child_process";
import { existsSync as yr } from "node:fs";
import { glob as ky, readFile as Sy } from "node:fs/promises";
import { homedir as id } from "node:os";
import {
  delimiter as Py,
  dirname as _y,
  isAbsolute as Cy,
  join as rt,
  resolve as wi,
} from "node:path";
var yi = 3e4,
  Iy = 200,
  by = 1500,
  Ey = 3,
  Ty = 8,
  Pt = null;
function nd(e) {
  return e.map((t) => ({ ...t }));
}
i(nd, "cloneAliasOptions");
function Ry(e) {
  let t = e.trim();
  return !t || t === "*" || t.startsWith("!") ? !1 : !/[?*[\\\]]/.test(t);
}
i(Ry, "isConnectableAliasPattern");
function Ay(e) {
  let t = null,
    n = !1;
  for (let s = 0; s < e.length; s += 1) {
    let a = e.charAt(s);
    if (n) {
      n = !1;
      continue;
    }
    if (a === "\\") {
      n = !0;
      continue;
    }
    if (t) {
      a === t && (t = null);
      continue;
    }
    if (a === "'" || a === '"') {
      t = a;
      continue;
    }
    if (a === "#") return e.slice(0, s);
  }
  return e;
}
i(Ay, "stripInlineComment");
function My(e) {
  let t = [],
    n = "",
    s = null;
  for (let a = 0; a < e.length; a += 1) {
    let c = e.charAt(a);
    if (s) {
      if (c === "\\") {
        let d = e.charAt(a + 1);
        if (!d) {
          n += "\\";
          continue;
        }
        if (d === s || d === "\\") {
          ((n += d), (a += 1));
          continue;
        }
        n += "\\";
        continue;
      }
      if (c === s) {
        s = null;
        continue;
      }
      n += c;
      continue;
    }
    if (c === "'" || c === '"') {
      s = c;
      continue;
    }
    if (/\s/.test(c)) {
      n.length > 0 && (t.push(n), (n = ""));
      continue;
    }
    if (c === "\\") {
      let d = e.charAt(a + 1);
      if (!d) {
        n += "\\";
        continue;
      }
      if (/\s/.test(d) || d === "\\" || d === "'" || d === '"' || d === "#") {
        ((n += d), (a += 1));
        continue;
      }
      n += "\\";
      continue;
    }
    n += c;
  }
  return (n.length > 0 && t.push(n), t);
}
i(My, "splitSshTokens");
function xy(e) {
  return /[*?[\]]/.test(e);
}
i(xy, "hasGlobPattern");
function sd(e) {
  let t = e.trim();
  if (!t) return t;
  let n = id(),
    s = t.replace(/^%d(?=$|[\\/])/, n);
  return s === "~"
    ? n
    : s.startsWith("~/") || s.startsWith("~\\")
      ? rt(n, s.slice(2))
      : s;
}
i(sd, "expandHomeToken");
async function Oy(e, t) {
  let n = [],
    s = new Set();
  for (let a of e) {
    let c = sd(a);
    if (!c) continue;
    let d = Cy(c) ? c : wi(t, c);
    if (!xy(d)) {
      yr(d) && !s.has(d) && (s.add(d), n.push(d));
      continue;
    }
    try {
      for await (let m of ky(d)) {
        let f = wi(m);
        s.has(f) || (s.add(f), n.push(f));
      }
    } catch {}
  }
  return n;
}
i(Oy, "resolveIncludeTargets");
async function ad(e, t, n) {
  let s = wi(e);
  if (t.has(s) || n > Ty) return [];
  t.add(s);
  let a = "";
  try {
    a = await Sy(s, "utf8");
  } catch {
    return [];
  }
  let c = [],
    d = { patterns: ["*"], directives: [], source: s, fromHostDirective: !1 };
  c.push(d);
  let m = a.split(/\r?\n/);
  for (let f of m) {
    let g = Ay(f).trim();
    if (!g) continue;
    let h = My(g);
    if (h.length === 0) continue;
    let y = h[0];
    if (!y) continue;
    let S = y.toLowerCase();
    if (S === "include") {
      let v = h.slice(1),
        k = await Oy(v, _y(s));
      for (let M of k) {
        let R = await ad(M, t, n + 1);
        c.push(...R);
      }
      continue;
    }
    if (S === "host") {
      ((d = {
        patterns: h.slice(1),
        directives: [],
        source: s,
        fromHostDirective: !0,
      }),
        c.push(d));
      continue;
    }
    h.length < 2 || d.directives.push({ key: S, value: h.slice(1).join(" ") });
  }
  return c;
}
i(ad, "parseConfigBlocks");
function Dy(e) {
  let t = [],
    n = new Set();
  for (let s of e) {
    if (!s.fromHostDirective || s.patterns.length !== 1) continue;
    let a = s.patterns[0]?.trim();
    if (
      !(!a || !Ry(a) || n.has(a)) &&
      (n.add(a), t.push({ alias: a, source: s.source }), t.length >= Iy)
    )
      break;
  }
  return t;
}
i(Dy, "buildAliasMetas");
function rd(e, t) {
  if (e === "*") return !0;
  if (!/[*?]/.test(e)) return e === t;
  let n = Array.from(e, (a) =>
    a === "*"
      ? ".*"
      : a === "?"
        ? "."
        : a.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"),
  ).join("");
  return new RegExp(`^${n}$`).test(t);
}
i(rd, "matchHostPattern");
function Ny(e, t) {
  let n = !1;
  for (let s of e) {
    let a = s.trim();
    if (a) {
      if (a.startsWith("!")) {
        let c = a.slice(1);
        if (c && rd(c, t)) return !1;
        continue;
      }
      rd(a, t) && (n = !0);
    }
  }
  return n;
}
i(Ny, "blockMatchesAlias");
function cd(e) {
  let t = Number.parseInt(e, 10);
  if (!(!Number.isInteger(t) || t <= 0 || t > 65535)) return t;
}
i(cd, "toValidPort");
function Ly(e) {
  let t = sd(e).trim();
  return t.length > 0 ? t : void 0;
}
i(Ly, "normalizeIdentityPath");
function Fy(e, t) {
  return t.map((n) => {
    let s, a, c, d;
    for (let m of e)
      if (Ny(m.patterns, n.alias))
        for (let f of m.directives)
          switch (f.key) {
            case "hostname":
              if (!s) {
                let g = f.value.trim();
                s = g.length > 0 ? g : void 0;
              }
              break;
            case "port":
              a == null && (a = cd(f.value.trim()));
              break;
            case "user":
              if (!c) {
                let g = f.value.trim();
                c = g.length > 0 ? g : void 0;
              }
              break;
            case "identityfile":
              d || (d = Ly(f.value));
              break;
            default:
              break;
          }
    return {
      alias: n.alias,
      host: s ?? n.alias,
      port: a,
      username: c,
      privateKeyPath: d,
      source: n.source,
    };
  });
}
i(Fy, "buildFallbackOptions");
function od(e) {
  let t = process.env.PATH;
  if (!t) return null;
  for (let n of t.split(Py)) {
    let s = n.trim();
    if (!s) continue;
    let a = rt(s, e);
    if (yr(a)) return a;
  }
  return null;
}
i(od, "findExecutableFromPath");
function By() {
  if (process.platform !== "win32") return od("ssh");
  let e = od("ssh.exe");
  if (e) return e;
  let t = process.env.WINDIR?.trim() || "C:\\Windows",
    n = process.env.ProgramFiles?.trim() || "C:\\Program Files",
    s = process.env["ProgramFiles(x86)"]?.trim() || "C:\\Program Files (x86)";
  return (
    [
      rt(t, "System32", "OpenSSH", "ssh.exe"),
      rt(n, "OpenSSH", "ssh.exe"),
      rt(n, "Git", "usr", "bin", "ssh.exe"),
      rt(s, "Git", "usr", "bin", "ssh.exe"),
    ].find((c) => yr(c)) ?? null
  );
}
i(By, "resolveSshExecutablePath");
async function Uy(e) {
  let { sshExecutablePath: t, configPath: n, alias: s } = e;
  return await new Promise((a) => {
    let c = !1,
      d = "",
      m = vy(t, ["-G", "-F", n, "-o", "BatchMode=yes", s], {
        stdio: ["ignore", "pipe", "ignore"],
        windowsHide: !0,
        env: {
          ...process.env,
          SSH_ASKPASS_REQUIRE: "never",
          SSH_ASKPASS: "",
          DISPLAY: "",
        },
      }),
      f = setTimeout(() => {
        c || ((c = !0), m.kill(), a(null));
      }, by);
    (m.stdout.on("data", (g) => {
      c || ((d += g.toString()), d.length > 128e3 && (d = d.slice(0, 128e3)));
    }),
      m.on("error", () => {
        c || ((c = !0), clearTimeout(f), a(null));
      }),
      m.on("close", (g) => {
        c || ((c = !0), clearTimeout(f), a(g === 0 ? d : null));
      }));
  });
}
i(Uy, "runSshConfigQuery");
function Wy(e) {
  let t, n, s;
  for (let a of e.split(/\r?\n/)) {
    let c = a.trim();
    if (!c) continue;
    let d = /^(\S+)\s+(.*)$/.exec(c);
    if (!d) continue;
    let m = d[1],
      f = d[2];
    if (!m || f == null) continue;
    let g = m.toLowerCase(),
      h = f.trim();
    switch (g) {
      case "hostname":
        !t && h.length > 0 && (t = h);
        break;
      case "port":
        n == null && (n = cd(h));
        break;
      case "user":
        !s && h.length > 0 && (s = h);
        break;
      default:
        break;
    }
  }
  return { host: t, port: n, username: s };
}
i(Wy, "parseSshGOutput");
async function jy(e, t, n) {
  if (e.length === 0) return [];
  let s = Math.max(1, Math.min(t, e.length)),
    a = Array.from({ length: e.length }),
    c = e.map((f, g) => ({ item: f, index: g })),
    d = 0;
  async function m() {
    for (;;) {
      let f = d;
      if (((d += 1), f >= c.length)) return;
      let g = c[f];
      g && (a[g.index] = await n(g.item, g.index));
    }
  }
  return (
    i(m, "worker"),
    await Promise.all(
      Array.from({ length: s }, async () => {
        await m();
      }),
    ),
    a
  );
}
i(jy, "mapWithConcurrency");
async function $y() {
  let e = Date.now();
  if (Pt && Pt.expiresAt > e) return nd(Pt.options);
  let t = rt(id(), ".ssh", "config");
  if (!yr(t)) return ((Pt = { expiresAt: e + yi, options: [] }), []);
  let n = await ad(t, new Set(), 0),
    s = Dy(n);
  if (s.length === 0) return ((Pt = { expiresAt: e + yi, options: [] }), []);
  let a = Fy(n, s),
    c = new Map(a.map((f) => [f.alias, f])),
    d = By(),
    m =
      d == null
        ? a
        : await jy(s, Ey, async (f) => {
            let g = c.get(f.alias) ?? {
                alias: f.alias,
                host: f.alias,
                source: f.source,
              },
              h = await Uy({
                sshExecutablePath: d,
                configPath: t,
                alias: f.alias,
              });
            if (!h) return g;
            let y = Wy(h);
            return {
              alias: f.alias,
              host: y.host ?? g.host ?? f.alias,
              port: y.port ?? g.port,
              username: y.username ?? g.username,
              privateKeyPath: g.privateKeyPath,
              source: f.source,
            };
          });
  return ((Pt = { expiresAt: e + yi, options: m }), nd(m));
}
i($y, "listSSHConfigAliasesFromLocalConfig");
r();
o();
import { createRequire as ww } from "node:module";
r();
o();
import { existsSync as ki, readFileSync as Si } from "node:fs";
import { homedir as dw } from "node:os";
import { join as Y } from "node:path";
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
function zy(e, t) {
  let n = e.slice(0, t).split(/\r\n|\n|\r/g);
  return [n.length, n.pop().length + 1];
}
i(zy, "getLineColFromPtr");
function Zy(e, t, n) {
  let s = e.split(/\r\n|\n|\r/g),
    a = "",
    c = (Math.log10(t + 1) | 0) + 1;
  for (let d = t - 1; d <= t + 1; d++) {
    let m = s[d - 1];
    m &&
      ((a += d.toString().padEnd(c, " ")),
      (a += ":  "),
      (a += m),
      (a += `
`),
      d === t &&
        ((a += " ".repeat(c + n + 2)),
        (a += `^
`)));
  }
  return a;
}
i(Zy, "makeCodeBlock");
var U = class extends Error {
  static {
    i(this, "TomlError");
  }
  line;
  column;
  codeblock;
  constructor(t, n) {
    let [s, a] = zy(n.toml, n.ptr),
      c = Zy(n.toml, s, a);
    (super(
      `Invalid TOML document: ${t}

${c}`,
      n,
    ),
      (this.line = s),
      (this.column = a),
      (this.codeblock = c));
  }
};
function Hy(e, t) {
  let n = 0;
  for (; e[t - ++n] === "\\";);
  return --n && n % 2;
}
i(Hy, "isEscaped");
function wr(e, t = 0, n = e.length) {
  let s = e.indexOf(
    `
`,
    t,
  );
  return (e[s - 1] === "\r" && s--, s <= n ? s : -1);
}
i(wr, "indexOfNewline");
function _t(e, t) {
  for (let n = t; n < e.length; n++) {
    let s = e[n];
    if (
      s ===
      `
`
    )
      return n;
    if (
      s === "\r" &&
      e[n + 1] ===
        `
`
    )
      return n + 1;
    if ((s < " " && s !== "	") || s === "\x7F")
      throw new U("control characters are not allowed in comments", {
        toml: e,
        ptr: t,
      });
  }
  return e.length;
}
i(_t, "skipComment");
function me(e, t, n, s) {
  let a;
  for (;;) {
    for (
      ;
      (a = e[t]) === " " ||
      a === "	" ||
      (!n &&
        (a ===
          `
` ||
          (a === "\r" &&
            e[t + 1] ===
              `
`)));
    )
      t++;
    if (s || a !== "#") break;
    t = _t(e, t);
  }
  return t;
}
i(me, "skipVoid");
function dd(e, t, n, s, a = !1) {
  if (!s) return ((t = wr(e, t)), t < 0 ? e.length : t);
  for (let c = t; c < e.length; c++) {
    let d = e[c];
    if (d === "#") c = wr(e, c);
    else {
      if (d === n) return c + 1;
      if (
        d === s ||
        (a &&
          (d ===
            `
` ||
            (d === "\r" &&
              e[c + 1] ===
                `
`)))
      )
        return c;
    }
  }
  throw new U("cannot find end of structure", { toml: e, ptr: t });
}
i(dd, "skipUntil");
function vr(e, t) {
  let n = e[t],
    s = n === e[t + 1] && e[t + 1] === e[t + 2] ? e.slice(t, t + 3) : n;
  t += s.length - 1;
  do t = e.indexOf(s, ++t);
  while (t > -1 && n !== "'" && Hy(e, t));
  return (
    t > -1 &&
      ((t += s.length), s.length > 1 && (e[t] === n && t++, e[t] === n && t++)),
    t
  );
}
i(vr, "getStringEnd");
r();
o();
var Gy =
    /^(\d{4}-\d{2}-\d{2})?[T ]?(?:(\d{2}):\d{2}(?::\d{2}(?:\.\d+)?)?)?(Z|[-+]\d{2}:\d{2})?$/i,
  rn = class e extends Date {
    static {
      i(this, "TomlDate");
    }
    #e = !1;
    #n = !1;
    #t = null;
    constructor(t) {
      let n = !0,
        s = !0,
        a = "Z";
      if (typeof t == "string") {
        let c = t.match(Gy);
        c
          ? (c[1] || ((n = !1), (t = `0000-01-01T${t}`)),
            (s = !!c[2]),
            s && t[10] === " " && (t = t.replace(" ", "T")),
            c[2] && +c[2] > 23
              ? (t = "")
              : ((a = c[3] || null),
                (t = t.toUpperCase()),
                !a && s && (t += "Z")))
          : (t = "");
      }
      (super(t),
        isNaN(this.getTime()) || ((this.#e = n), (this.#n = s), (this.#t = a)));
    }
    isDateTime() {
      return this.#e && this.#n;
    }
    isLocal() {
      return !this.#e || !this.#n || !this.#t;
    }
    isDate() {
      return this.#e && !this.#n;
    }
    isTime() {
      return this.#n && !this.#e;
    }
    isValid() {
      return this.#e || this.#n;
    }
    toISOString() {
      let t = super.toISOString();
      if (this.isDate()) return t.slice(0, 10);
      if (this.isTime()) return t.slice(11, 23);
      if (this.#t === null) return t.slice(0, -1);
      if (this.#t === "Z") return t;
      let n = +this.#t.slice(1, 3) * 60 + +this.#t.slice(4, 6);
      return (
        (n = this.#t[0] === "-" ? n : -n),
        new Date(this.getTime() - n * 6e4).toISOString().slice(0, -1) + this.#t
      );
    }
    static wrapAsOffsetDateTime(t, n = "Z") {
      let s = new e(t);
      return ((s.#t = n), s);
    }
    static wrapAsLocalDateTime(t) {
      let n = new e(t);
      return ((n.#t = null), n);
    }
    static wrapAsLocalDate(t) {
      let n = new e(t);
      return ((n.#n = !1), (n.#t = null), n);
    }
    static wrapAsLocalTime(t) {
      let n = new e(t);
      return ((n.#e = !1), (n.#t = null), n);
    }
  };
var qy = /^((0x[0-9a-fA-F](_?[0-9a-fA-F])*)|(([+-]|0[ob])?\d(_?\d)*))$/,
  Ky = /^[+-]?\d(_?\d)*(\.\d(_?\d)*)?([eE][+-]?\d(_?\d)*)?$/,
  Vy = /^[+-]?0[0-9_]/,
  Jy = /^[0-9a-f]{2,8}$/i,
  ld = {
    b: "\b",
    t: "	",
    n: `
`,
    f: "\f",
    r: "\r",
    e: "\x1B",
    '"': '"',
    "\\": "\\",
  };
function kr(e, t = 0, n = e.length) {
  let s = e[t] === "'",
    a = e[t++] === e[t] && e[t] === e[t + 1];
  a &&
    ((n -= 2),
    e[(t += 2)] === "\r" && t++,
    e[t] ===
      `
` && t++);
  let c = 0,
    d,
    m = "",
    f = t;
  for (; t < n - 1;) {
    let g = e[t++];
    if (
      g ===
        `
` ||
      (g === "\r" &&
        e[t] ===
          `
`)
    ) {
      if (!a)
        throw new U("newlines are not allowed in strings", {
          toml: e,
          ptr: t - 1,
        });
    } else if ((g < " " && g !== "	") || g === "\x7F")
      throw new U("control characters are not allowed in strings", {
        toml: e,
        ptr: t - 1,
      });
    if (d) {
      if (((d = !1), g === "x" || g === "u" || g === "U")) {
        let h = e.slice(t, (t += g === "x" ? 2 : g === "u" ? 4 : 8));
        if (!Jy.test(h))
          throw new U("invalid unicode escape", { toml: e, ptr: c });
        try {
          m += String.fromCodePoint(parseInt(h, 16));
        } catch {
          throw new U("invalid unicode escape", { toml: e, ptr: c });
        }
      } else if (
        a &&
        (g ===
          `
` ||
          g === " " ||
          g === "	" ||
          g === "\r")
      ) {
        if (
          ((t = me(e, t - 1, !0)),
          e[t] !==
            `
` && e[t] !== "\r")
        )
          throw new U(
            "invalid escape: only line-ending whitespace may be escaped",
            { toml: e, ptr: c },
          );
        t = me(e, t);
      } else if (g in ld) m += ld[g];
      else throw new U("unrecognized escape sequence", { toml: e, ptr: c });
      f = t;
    } else !s && g === "\\" && ((c = t - 1), (d = !0), (m += e.slice(f, c)));
  }
  return m + e.slice(f, n - 1);
}
i(kr, "parseString");
function ud(e, t, n, s) {
  if (e === "true") return !0;
  if (e === "false") return !1;
  if (e === "-inf") return -1 / 0;
  if (e === "inf" || e === "+inf") return 1 / 0;
  if (e === "nan" || e === "+nan" || e === "-nan") return NaN;
  if (e === "-0") return s ? 0n : 0;
  let a = qy.test(e);
  if (a || Ky.test(e)) {
    if (Vy.test(e))
      throw new U("leading zeroes are not allowed", { toml: t, ptr: n });
    e = e.replace(/_/g, "");
    let d = +e;
    if (isNaN(d)) throw new U("invalid number", { toml: t, ptr: n });
    if (a) {
      if ((a = !Number.isSafeInteger(d)) && !s)
        throw new U("integer value cannot be represented losslessly", {
          toml: t,
          ptr: n,
        });
      (a || s === !0) && (d = BigInt(e));
    }
    return d;
  }
  let c = new rn(e);
  if (!c.isValid()) throw new U("invalid value", { toml: t, ptr: n });
  return c;
}
i(ud, "parseValue");
r();
o();
function Xy(e, t, n) {
  let s = e.slice(t, n),
    a = s.indexOf("#");
  return (a > -1 && (_t(e, a), (s = s.slice(0, a))), [s.trimEnd(), a]);
}
i(Xy, "sliceAndTrimEndOf");
function on(e, t, n, s, a) {
  if (s === 0)
    throw new U("document contains excessively nested structures. aborting.", {
      toml: e,
      ptr: t,
    });
  let c = e[t];
  if (c === "[" || c === "{") {
    let [f, g] = c === "[" ? fd(e, t, s, a) : pd(e, t, s, a);
    if (n) {
      if (((g = me(e, g)), e[g] === ",")) g++;
      else if (e[g] !== n)
        throw new U("expected comma or end of structure", { toml: e, ptr: g });
    }
    return [f, g];
  }
  let d;
  if (c === '"' || c === "'") {
    d = vr(e, t);
    let f = kr(e, t, d);
    if (n) {
      if (
        ((d = me(e, d)),
        e[d] &&
          e[d] !== "," &&
          e[d] !== n &&
          e[d] !==
            `
` &&
          e[d] !== "\r")
      )
        throw new U("unexpected character encountered", { toml: e, ptr: d });
      d += +(e[d] === ",");
    }
    return [f, d];
  }
  d = dd(e, t, ",", n);
  let m = Xy(e, t, d - +(e[d - 1] === ","));
  if (!m[0])
    throw new U("incomplete key-value declaration: no value specified", {
      toml: e,
      ptr: t,
    });
  return (
    n && m[1] > -1 && ((d = me(e, t + m[1])), (d += +(e[d] === ","))),
    [ud(m[0], e, t, a), d]
  );
}
i(on, "extractValue");
var Yy = /^[a-zA-Z0-9-_]+[ \t]*$/;
function Sr(e, t, n = "=") {
  let s = t - 1,
    a = [],
    c = e.indexOf(n, t);
  if (c < 0)
    throw new U("incomplete key-value: cannot find end of key", {
      toml: e,
      ptr: t,
    });
  do {
    let d = e[(t = ++s)];
    if (d !== " " && d !== "	")
      if (d === '"' || d === "'") {
        if (d === e[t + 1] && d === e[t + 2])
          throw new U("multiline strings are not allowed in keys", {
            toml: e,
            ptr: t,
          });
        let m = vr(e, t);
        if (m < 0)
          throw new U("unfinished string encountered", { toml: e, ptr: t });
        s = e.indexOf(".", m);
        let f = e.slice(m, s < 0 || s > c ? c : s),
          g = wr(f);
        if (g > -1)
          throw new U("newlines are not allowed in keys", {
            toml: e,
            ptr: t + s + g,
          });
        if (f.trimStart())
          throw new U("found extra tokens after the string part", {
            toml: e,
            ptr: m,
          });
        if (c < m && ((c = e.indexOf(n, m)), c < 0))
          throw new U("incomplete key-value: cannot find end of key", {
            toml: e,
            ptr: t,
          });
        a.push(kr(e, t, m));
      } else {
        s = e.indexOf(".", t);
        let m = e.slice(t, s < 0 || s > c ? c : s);
        if (!Yy.test(m))
          throw new U(
            "only letter, numbers, dashes and underscores are allowed in keys",
            { toml: e, ptr: t },
          );
        a.push(m.trimEnd());
      }
  } while (s + 1 && s < c);
  return [a, me(e, c + 1, !0, !0)];
}
i(Sr, "parseKey");
function pd(e, t, n, s) {
  let a = {},
    c = new Set(),
    d;
  for (t++; (d = e[t++]) !== "}" && d;) {
    if (d === ",")
      throw new U("expected value, found comma", { toml: e, ptr: t - 1 });
    if (d === "#") t = _t(e, t);
    else if (
      d !== " " &&
      d !== "	" &&
      d !==
        `
` &&
      d !== "\r"
    ) {
      let m,
        f = a,
        g = !1,
        [h, y] = Sr(e, t - 1);
      for (let k = 0; k < h.length; k++) {
        if (
          (k && (f = g ? f[m] : (f[m] = {})),
          (m = h[k]),
          (g = Object.hasOwn(f, m)) && (typeof f[m] != "object" || c.has(f[m])))
        )
          throw new U("trying to redefine an already defined value", {
            toml: e,
            ptr: t,
          });
        !g &&
          m === "__proto__" &&
          Object.defineProperty(f, m, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
          });
      }
      if (g)
        throw new U("trying to redefine an already defined value", {
          toml: e,
          ptr: t,
        });
      let [S, v] = on(e, y, "}", n - 1, s);
      (c.add(S), (f[m] = S), (t = v));
    }
  }
  if (!d) throw new U("unfinished table encountered", { toml: e, ptr: t });
  return [a, t];
}
i(pd, "parseInlineTable");
function fd(e, t, n, s) {
  let a = [],
    c;
  for (t++; (c = e[t++]) !== "]" && c;) {
    if (c === ",")
      throw new U("expected value, found comma", { toml: e, ptr: t - 1 });
    if (c === "#") t = _t(e, t);
    else if (
      c !== " " &&
      c !== "	" &&
      c !==
        `
` &&
      c !== "\r"
    ) {
      let d = on(e, t - 1, "]", n - 1, s);
      (a.push(d[0]), (t = d[1]));
    }
  }
  if (!c) throw new U("unfinished array encountered", { toml: e, ptr: t });
  return [a, t];
}
i(fd, "parseArray");
function md(e, t, n, s) {
  let a = t,
    c = n,
    d,
    m = !1,
    f;
  for (let g = 0; g < e.length; g++) {
    if (g) {
      if (
        ((a = m ? a[d] : (a[d] = {})),
        (c = (f = c[d]).c),
        s === 0 && (f.t === 1 || f.t === 2))
      )
        return null;
      if (f.t === 2) {
        let h = a.length - 1;
        ((a = a[h]), (c = c[h].c));
      }
    }
    if (((d = e[g]), (m = Object.hasOwn(a, d)) && c[d]?.t === 0 && c[d]?.d))
      return null;
    m ||
      (d === "__proto__" &&
        (Object.defineProperty(a, d, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        Object.defineProperty(c, d, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })),
      (c[d] = { t: g < e.length - 1 && s === 2 ? 3 : s, d: !1, i: 0, c: {} }));
  }
  if (
    ((f = c[d]),
    (f.t !== s && !(s === 1 && f.t === 3)) ||
      (s === 2 &&
        (f.d || ((f.d = !0), (a[d] = [])),
        a[d].push((a = {})),
        (f.c[f.i++] = f = { t: 1, d: !1, i: 0, c: {} })),
      f.d))
  )
    return null;
  if (((f.d = !0), s === 1)) a = m ? a[d] : (a[d] = {});
  else if (s === 0 && m) return null;
  return [d, a, f.c];
}
i(md, "peekTable");
function Pr(e, { maxDepth: t = 1e3, integersAsBigInt: n } = {}) {
  let s = {},
    a = {},
    c = s,
    d = a;
  for (let m = me(e, 0); m < e.length;) {
    if (e[m] === "[") {
      let f = e[++m] === "[",
        g = Sr(e, (m += +f), "]");
      if (f) {
        if (e[g[1] - 1] !== "]")
          throw new U("expected end of table declaration", {
            toml: e,
            ptr: g[1] - 1,
          });
        g[1]++;
      }
      let h = md(g[0], s, a, f ? 2 : 1);
      if (!h)
        throw new U("trying to redefine an already defined table or value", {
          toml: e,
          ptr: m,
        });
      ((d = h[2]), (c = h[1]), (m = g[1]));
    } else {
      let f = Sr(e, m),
        g = md(f[0], c, d, 0);
      if (!g)
        throw new U("trying to redefine an already defined table or value", {
          toml: e,
          ptr: m,
        });
      let h = on(e, f[1], void 0, t, n);
      ((g[1][g[0]] = h[0]), (m = h[1]));
    }
    if (
      ((m = me(e, m, !0)),
      e[m] &&
        e[m] !==
          `
` &&
        e[m] !== "\r")
    )
      throw new U(
        "each key-value declaration must be followed by an end-of-line",
        { toml: e, ptr: m },
      );
    m = me(e, m);
  }
  return s;
}
i(Pr, "parse");
r();
o();
import { parse as lw } from "yaml";
r();
o();
import { execFileSync as Qy } from "node:child_process";
import { existsSync as ew } from "node:fs";
import { homedir as tw } from "node:os";
import { join as gd } from "node:path";
var nw = 2e3;
function hd(e) {
  return e.HOME?.trim() || e.USERPROFILE?.trim() || tw();
}
i(hd, "resolveHomeDir");
function br(e) {
  let t = e?.trim();
  return t || null;
}
i(br, "normalizeFontFamily");
function yd(e) {
  let t =
    typeof e == "number"
      ? e
      : typeof e == "string"
        ? Number.parseFloat(e.trim())
        : Number.NaN;
  return !Number.isFinite(t) || t < 6 || t > 72 ? null : t;
}
i(yd, "normalizeFontSize");
function _r(e, t) {
  let n = e;
  for (let s of t) {
    if (typeof n != "object" || n === null || Array.isArray(n)) return null;
    n = n[s];
  }
  return typeof n == "string" ? br(n) : null;
}
i(_r, "readNestedString");
function wd(e) {
  if (process.platform !== "darwin" || !ew(e)) return null;
  try {
    let t = Qy("plutil", ["-convert", "json", "-o", "-", e], {
        encoding: "utf8",
        windowsHide: !0,
        timeout: nw,
        maxBuffer: 2097152,
      }),
      n = JSON.parse(t);
    if (typeof n == "object" && n !== null && !Array.isArray(n)) return n;
  } catch {
    return null;
  }
  return null;
}
i(wd, "readMacOsPlistFile");
function vi(e) {
  let t = br(e);
  if (!t) return null;
  let n = t.replace(/\s+\d+(?:\.\d+)?$/, "");
  return br(n.replace(/-/g, " "));
}
i(vi, "normalizeMacOsFontName");
function vd(e) {
  let t = typeof e == "string" ? e : e?.toString(),
    n = vi(t) ?? void 0,
    s = yd(t?.match(/\s+(\d+(?:\.\d+)?)$/)?.[1]) ?? void 0;
  return { fontFamily: n, fontSize: s };
}
i(vd, "readMacOsFontDescriptor");
function rw(e) {
  let t =
      typeof e == "string"
        ? e
        : typeof e == "object" && e !== null && !Array.isArray(e)
          ? e.NS?.toString()
          : null,
    n = br(t);
  if (!n) return null;
  try {
    let a = Buffer.from(n, "base64")
      .toString("latin1")
      .match(
        /([A-Za-z][A-Za-z0-9 ._-]*(?:Mono|Code|Nerd|Powerline|Console|Menlo|Monaco|Courier|Cascadia|Consolas|Hack|Meslo)[A-Za-z0-9 ._-]*)/i,
      );
    return vi(a?.[1]);
  } catch {
    return null;
  }
}
i(rw, "readMacOsArchivedFontName");
function Cr(e) {
  let t =
    typeof e == "number"
      ? e
      : typeof e == "string"
        ? Number.parseFloat(e.trim())
        : Number.NaN;
  return Number.isFinite(t)
    ? t >= 0 && t <= 1
      ? t
      : t >= 0 && t <= 255
        ? t / 255
        : t >= 0 && t <= 65535
          ? t / 65535
          : null
    : null;
}
i(Cr, "normalizeColorComponent");
function Ir(e, t) {
  for (let n of t) if (e[n] !== void 0) return e[n];
}
i(Ir, "readColorRecordValue");
function ow(e) {
  if (typeof e == "string") {
    let g = e.trim();
    return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?(?:[0-9a-f]{2})?$/i.test(g) ||
      /^rgba?\(/i.test(g)
      ? g
      : null;
  }
  if (typeof e != "object" || e === null || Array.isArray(e)) return null;
  let t = e,
    n = Cr(Ir(t, ["Red Component", "red", "Red"])),
    s = Cr(Ir(t, ["Green Component", "green", "Green"])),
    a = Cr(Ir(t, ["Blue Component", "blue", "Blue"])),
    c = Cr(Ir(t, ["Alpha Component", "alpha", "Alpha", "Opacity"])) ?? 1;
  if (n === null || s === null || a === null) return null;
  let d = Math.round(n * 255),
    m = Math.round(s * 255),
    f = Math.round(a * 255);
  return c < 1
    ? `rgba(${d}, ${m}, ${f}, ${+c.toFixed(3)})`
    : `#${[d, m, f].map((g) => g.toString(16).padStart(2, "0")).join("")}`;
}
i(ow, "normalizeMacOsColor");
function Pe(e, t, n, s) {
  for (let a of s) {
    let c = ow(e[a]);
    if (c) {
      t[n] = c;
      return;
    }
  }
}
i(Pe, "readThemeColor");
var kd = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite",
];
function Sd(e) {
  return Object.keys(e).length > 0 ? e : void 0;
}
i(Sd, "compactTheme");
function iw(e) {
  let t = {};
  return (
    Pe(e, t, "foreground", ["Foreground Color"]),
    Pe(e, t, "background", ["Background Color"]),
    Pe(e, t, "cursor", ["Cursor Color"]),
    Pe(e, t, "cursorAccent", ["Cursor Text Color"]),
    Pe(e, t, "selectionBackground", ["Selection Color"]),
    kd.forEach((n, s) => {
      Pe(e, t, n, [`Ansi ${s} Color`, `ANSI ${s} Color`]);
    }),
    Sd(t)
  );
}
i(iw, "readIterm2Theme");
function sw(e) {
  let t = {};
  (Pe(e, t, "foreground", ["TextColor"]),
    Pe(e, t, "background", ["BackgroundColor"]),
    Pe(e, t, "cursor", ["CursorColor"]),
    Pe(e, t, "selectionBackground", ["SelectionColor"]));
  let n = [
    "ANSIBlackColor",
    "ANSIRedColor",
    "ANSIGreenColor",
    "ANSIYellowColor",
    "ANSIBlueColor",
    "ANSIMagentaColor",
    "ANSICyanColor",
    "ANSIWhiteColor",
    "ANSIBrightBlackColor",
    "ANSIBrightRedColor",
    "ANSIBrightGreenColor",
    "ANSIBrightYellowColor",
    "ANSIBrightBlueColor",
    "ANSIBrightMagentaColor",
    "ANSIBrightCyanColor",
    "ANSIBrightWhiteColor",
  ];
  return (
    kd.forEach((s, a) => {
      let c = n[a];
      c && Pe(e, t, s, [c]);
    }),
    Sd(t)
  );
}
i(sw, "readMacOsTerminalTheme");
function Pd(e) {
  return !!(e.fontFamily || e.fontSize || e.theme);
}
i(Pd, "hasDetectedProfile");
function aw(e) {
  let t = hd(e),
    n = wd(gd(t, "Library", "Preferences", "com.googlecode.iterm2.plist")),
    s = Array.isArray(n?.["New Bookmarks"]) ? n["New Bookmarks"] : [],
    a = s.find(
      (d) =>
        typeof d == "object" &&
        d !== null &&
        !Array.isArray(d) &&
        d["Default Bookmark"] === !0,
    ),
    c = a ? [a, ...s.filter((d) => d !== a)] : s;
  for (let d of c) {
    if (typeof d != "object" || d === null || Array.isArray(d)) continue;
    let m = d,
      f = { ...vd(m["Normal Font"]), theme: iw(m) };
    if (Pd(f)) return f;
  }
  return null;
}
i(aw, "detectIterm2Profile");
function cw(e) {
  let t = hd(e),
    n = wd(gd(t, "Library", "Preferences", "com.apple.Terminal.plist")),
    s = [
      _r(n, ["Startup Window Settings"]),
      _r(n, ["Default Window Settings"]),
    ].filter((a) => !!a);
  for (let a of s) {
    let c = n?.[a];
    if (typeof c != "object" || c === null || Array.isArray(c)) continue;
    let d = c,
      f = {
        fontFamily:
          _r(d, ["FontName"]) ?? vi(_r(d, ["Font"])) ?? rw(d.Font) ?? void 0,
        fontSize: yd(d.FontSize) ?? vd(d.Font).fontSize,
        theme: sw(d),
      };
    if (Pd(f)) return f;
  }
  return null;
}
i(cw, "detectMacOsTerminalProfile");
function _d() {
  return [
    { id: "iterm2", platforms: ["darwin"], detect: aw },
    { id: "macos-terminal", platforms: ["darwin"], detect: cw },
  ];
}
i(_d, "createMacOsTerminalProfileDetectors");
function Pi(e) {
  return e.HOME?.trim() || e.USERPROFILE?.trim() || dw();
}
i(Pi, "resolveHomeDir");
function Id(e) {
  let t = e?.trim();
  return t || null;
}
i(Id, "normalizeFontFamily");
function uw(e) {
  let t = "",
    n = !1,
    s = !1;
  for (let a = 0; a < e.length; a += 1) {
    let c = e[a],
      d = e[a + 1];
    if (n) {
      ((t += c), s ? (s = !1) : c === "\\" ? (s = !0) : c === '"' && (n = !1));
      continue;
    }
    if (c === '"') ((n = !0), (t += c));
    else if (c === "/" && d === "/") {
      for (
        ;
        a < e.length &&
        e[a] !==
          `
`;
      )
        a += 1;
      t += `
`;
    } else if (c === "/" && d === "*") {
      for (a += 2; a < e.length && !(e[a] === "*" && e[a + 1] === "/");) a += 1;
      a += 1;
    } else t += c;
  }
  return t;
}
i(uw, "stripJsonComments");
function pw(e) {
  let t = "",
    n = !1,
    s = !1;
  for (let a = 0; a < e.length; a += 1) {
    let c = e[a];
    if (n) {
      ((t += c), s ? (s = !1) : c === "\\" ? (s = !0) : c === '"' && (n = !1));
      continue;
    }
    if ((c === '"' && (n = !0), c === ",")) {
      let d = a + 1;
      for (; /\s/.test(e[d] ?? "");) d += 1;
      if (e[d] === "}" || e[d] === "]") continue;
    }
    t += c;
  }
  return t;
}
i(pw, "removeJsonTrailingCommas");
function fw(e) {
  let t = [e, pw(uw(e))];
  for (let n of t)
    try {
      let s = JSON.parse(n);
      if (typeof s == "object" && s !== null && !Array.isArray(s)) return s;
    } catch {}
  return null;
}
i(fw, "parseJsonc");
function bd(e) {
  if (!ki(e)) return null;
  try {
    let t = Si(e, "utf8");
    return fw(t);
  } catch {
    return null;
  }
}
i(bd, "readJsoncFile");
function ot(e, t) {
  let n = e;
  for (let s of t) {
    if (typeof n != "object" || n === null || Array.isArray(n)) return null;
    n = n[s];
  }
  return typeof n == "string" ? Id(n) : null;
}
i(ot, "readNestedString");
function Cd(e, t) {
  if (!ki(e)) return null;
  try {
    let n = t(Si(e, "utf8"));
    if (typeof n == "object" && n !== null && !Array.isArray(n)) return n;
  } catch {
    return null;
  }
  return null;
}
i(Cd, "readObjectFile");
function mw(e) {
  if (process.platform !== "win32") return null;
  let t = e.LOCALAPPDATA?.trim() || e.APPDATA?.trim();
  if (!t) return null;
  let n = [
    Y(
      t,
      "Packages",
      "Microsoft.WindowsTerminal_8wekyb3d8bbwe",
      "LocalState",
      "settings.json",
    ),
    Y(
      t,
      "Packages",
      "Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe",
      "LocalState",
      "settings.json",
    ),
    Y(t, "Microsoft", "Windows Terminal", "settings.json"),
  ];
  for (let s of n) {
    let a = bd(s);
    if (!a) continue;
    let c = ot(a, ["defaultProfile"]),
      d = a.profiles,
      m = Array.isArray(d?.list) ? d?.list : [];
    if (c)
      for (let h of m) {
        let y = h;
        if (!y || y.guid !== c) continue;
        let S = ot(y, ["font", "face"]);
        if (S) return { fontFamily: S };
      }
    let f = d?.defaults,
      g = ot(f, ["font", "face"]);
    if (g) return { fontFamily: g };
    for (let h of m) {
      let y = h;
      if (!y) continue;
      let S = ot(y, ["font", "face"]);
      if (S) return { fontFamily: S };
    }
  }
  return null;
}
i(mw, "detectWindowsTerminalFontFamily");
function gw(e) {
  let t = Pi(e),
    n = e.APPDATA?.trim(),
    s = e.XDG_CONFIG_HOME?.trim(),
    a = [
      n && Y(n, "Code", "User", "settings.json"),
      n && Y(n, "Code - Insiders", "User", "settings.json"),
      s && Y(s, "Code", "User", "settings.json"),
      s && Y(s, "Code - Insiders", "User", "settings.json"),
      Y(t, ".config", "Code", "User", "settings.json"),
      Y(t, ".config", "Code - Insiders", "User", "settings.json"),
      Y(t, "Library", "Application Support", "Code", "User", "settings.json"),
      Y(
        t,
        "Library",
        "Application Support",
        "Code - Insiders",
        "User",
        "settings.json",
      ),
    ].filter((c) => !!c);
  for (let c of a) {
    let d = bd(c),
      m = ot(d, ["terminal.integrated.fontFamily"]);
    if (m) return { fontFamily: m };
  }
  return null;
}
i(gw, "detectVsCodeTerminalFontFamily");
function hw(e) {
  let t = Pi(e),
    n = e.XDG_CONFIG_HOME?.trim() || Y(t, ".config"),
    s = [
      Y(n, "kitty", "kitty.conf"),
      Y(t, "Library", "Application Support", "kitty", "kitty.conf"),
    ];
  for (let a of s)
    if (ki(a))
      try {
        let d = Si(a, "utf8").match(/^\s*font_family\s+(.+)$/m),
          m = Id(d?.[1]);
        if (m) return { fontFamily: m.replace(/^"|"$/g, "") };
      } catch {}
  return null;
}
i(hw, "detectKittyFontFamily");
function yw(e) {
  let t = Pi(e),
    n = e.XDG_CONFIG_HOME?.trim() || Y(t, ".config"),
    s = [Y(n, "alacritty", "alacritty.toml"), Y(t, ".alacritty.toml")],
    a = [
      Y(n, "alacritty", "alacritty.yml"),
      Y(n, "alacritty", "alacritty.yaml"),
    ];
  for (let c of s) {
    let d = Cd(c, Pr),
      m = ot(d, ["font", "normal", "family"]);
    if (m) return { fontFamily: m };
  }
  for (let c of a) {
    let d = Cd(c, lw),
      m = ot(d, ["font", "normal", "family"]);
    if (m) return { fontFamily: m };
  }
  return null;
}
i(yw, "detectAlacrittyFontFamily");
var tH = [
  { id: "windows-terminal", platforms: ["win32"], detect: mw },
  { id: "vscode", detect: gw },
  ..._d(),
  {
    id: "kitty",
    platforms: ["darwin", "linux", "freebsd", "openbsd"],
    detect: hw,
  },
  {
    id: "alacritty",
    platforms: ["darwin", "linux", "freebsd", "openbsd"],
    detect: yw,
  },
];
var uH = ww(import.meta.url);
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var HH = 384 * 1024;
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
import { DatabaseSync as RG } from "node:sqlite";
r();
o();
var MG = 1024 * 1024;
r();
o();
import { DatabaseSync as GG } from "node:sqlite";
var JG = l.object({
  version: l.literal(1),
  database: l.string(),
  journalTable: l
    .enum(["schema_migration", "tasks_schema_migration"])
    .optional(),
  migrations: l.array(l.string()),
  tables: l.array(
    l.object({
      name: l.string(),
      columns: l.array(l.string()),
      rows: l.number().int().nonnegative(),
      hash: l.string(),
    }),
  ),
  skipped: l.literal("insufficient-space").optional(),
});
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var Dw = "'completed','failed','cancelled'",
  Nw = `session_id IS NOT NULL AND status NOT IN (${Dw})`,
  Q1 = `CREATE UNIQUE INDEX IF NOT EXISTS idx_off_peak_bound_active ON off_peak_tasks(workspace_key,session_id) WHERE ${Nw}`;
import { createRequire as Bw } from "node:module";
var Uw = Bw(import.meta.url),
  { DatabaseSync: wq } = Uw("node:sqlite");
var Ww = 15 * 6e4;
var jw = 10 * 6e4;
r();
o();
r();
o();
var Rq = 60 * 1e3,
  Aq = 1800 * 1e3;
r();
o();
import { createRequire as qw } from "node:module";
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var _K = l.array(l.string().min(1)).max(256);
r();
o();
r();
o();
r();
o();
var Kw = qw(import.meta.url),
  { DatabaseSync: _V } = Kw("node:sqlite");
var CV = T("task-index-repo");
r();
o();
r();
o();
var bi = class {
    static {
      i(this, "LocalRuntimeNetworkCapture");
    }
    clients = new Map();
    captureId = null;
    sink;
    register(t, n) {
      return (
        this.clients.set(t, { pid: n }),
        this.captureId && this.configure(t),
        () => {
          (this.clients.get(t)?.subscription?.dispose(),
            this.clients.delete(t));
        }
      );
    }
    setCaptureId(t, n) {
      ((this.captureId = t), (this.sink = n));
      for (let s of this.clients.keys()) this.configure(s);
    }
    configure(t) {
      let n = this.clients.get(t);
      if (
        (n.subscription?.dispose(), (n.subscription = void 0), t.isDisposed)
      ) {
        this.clients.delete(t);
        return;
      }
      (this.captureId &&
        (n.subscription = t.onNotification((s) => {
          if (s.method !== So.processNetworkRequests) return;
          let a = Bs.safeParse(s.params);
          !a.success ||
            a.data.captureId !== this.captureId ||
            this.sink?.({
              ...a.data,
              records: a.data.records.map((c) => ({
                ...c,
                pid: n.pid,
                processType: "cli",
              })),
            });
        })),
        t
          .notify(Bt.processNetworkCapture, { captureId: this.captureId })
          .catch(() => {}));
    }
  },
  Rd = new bi();
r();
o();
r();
o();
var $V =
  typeof process.resourcesPath == "string" ? process.resourcesPath : null;
r();
o();
r();
o();
var r2 = 3 * 6e4;
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var mJ = T("zcode-agent-process-tree");
r();
o();
import {
  existsSync as Yw,
  mkdirSync as Qw,
  readFileSync as ev,
  writeFileSync as tv,
} from "node:fs";
import { join as Ei } from "node:path";
function Nd() {
  return $t();
}
i(Nd, "isZCodeStdioTapDevVisible");
function Ti() {
  return Ei(G(), "dev");
}
i(Ti, "getZCodeStdioTapDevDir");
function Ld() {
  return Ei(Ti(), "stdio-traffic");
}
i(Ld, "getZCodeStdioTapDevLogDir");
function Fd() {
  return Ei(Ti(), "zcode-stdio-tap.json");
}
i(Fd, "getZCodeStdioTapDevStatePath");
function nv(e) {
  if (!Yw(e)) return {};
  try {
    let t = JSON.parse(ev(e, "utf-8"));
    return t && typeof t == "object" ? t : {};
  } catch {
    return {};
  }
}
i(nv, "readStateFile");
function Ri() {
  let e = Nd(),
    t = Fd(),
    n = nv(t);
  return {
    enabled: e && n.enabled === !0,
    visible: e,
    logDir: Ld(),
    statePath: t,
  };
}
i(Ri, "readZCodeStdioTapDevState");
function rv(e) {
  let t = Nd(),
    n = Fd();
  return (
    Qw(Ti(), { recursive: !0 }),
    tv(
      n,
      `${JSON.stringify({ enabled: t && e, updatedAt: new Date().toISOString() }, null, 2)}
`,
    ),
    Ri()
  );
}
i(rv, "setZCodeStdioTapDevEnabled");
r();
o();
var l4 = T("zcode-agent");
r();
o();
r();
o();
var s5 = T("zcode-agent-service"),
  a5 = T("cua-operation-turn");
var c5 = 5 * 6e4,
  d5 = 5 * 6e4;
var l5 = 5 * 6e4;
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var I5 = 32 * 1024 * 1024;
var N5 = T("model-trajectory");
r();
o();
import { randomBytes as wv } from "node:crypto";
var vv = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function kv(e = Date.now()) {
  let t = wv(16),
    n = BigInt(e);
  ((t[0] = Number((n >> 40n) & 0xffn)),
    (t[1] = Number((n >> 32n) & 0xffn)),
    (t[2] = Number((n >> 24n) & 0xffn)),
    (t[3] = Number((n >> 16n) & 0xffn)),
    (t[4] = Number((n >> 8n) & 0xffn)),
    (t[5] = Number(n & 0xffn)),
    (t[6] = 112 | (t[6] & 15)),
    (t[8] = 128 | (t[8] & 63)));
  let s = "";
  for (let a of t) s += vv[a];
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`;
}
i(kv, "uuidv7");
var Z5 = `host-services-${kv()}`;
r();
o();
import {
  copyFile as Ov,
  mkdir as Dv,
  readdir as Zd,
  rename as Nv,
  stat as Ni,
} from "node:fs/promises";
import { homedir as Lv } from "node:os";
import {
  basename as Fv,
  dirname as Bv,
  join as Rr,
  normalize as Kd,
  resolve as Vd,
  sep as Hd,
} from "node:path";
r();
o();
r();
o();
function an(e, t) {
  if (e.length > 0) return e.slice(0, 50) + (e.length > 50 ? "..." : "");
  let n = t[0];
  if (!n) return "";
  let s = t.length - 1;
  return s > 0 ? `${n.filename} +${s}` : n.filename;
}
i(an, "deriveSessionTitle");
r();
o();
function se(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
i(se, "isObjectRecord");
function He(e) {
  if (typeof e != "string") return;
  let t = e.trim();
  return t.length > 0 ? t : void 0;
}
i(He, "readTrimmedString");
var Sv = /<ide_opened_file>[\s\S]*?<\/ide_opened_file>/gi,
  Pv =
    /<(?:local-command|command)-[^>]+>[\s\S]*?<\/(?:local-command|command)-[^>]+>/gi;
function $d(e) {
  if (typeof e == "number" && Number.isFinite(e))
    return e > 1e12 ? Math.trunc(e) : e > 1e9 ? Math.trunc(e * 1e3) : void 0;
  if (typeof e != "string") return;
  let t = e.trim();
  if (!t) return;
  let n = Number(t);
  if (Number.isFinite(n)) return $d(n);
  let s = Date.parse(t);
  return Number.isFinite(s) ? s : void 0;
}
i($d, "toTimestampMs");
function _v(e) {
  let t = se(e.message) ? e.message : void 0,
    n = se(e.request) ? e.request : void 0,
    s = [
      e.timestamp,
      e.createdAt,
      e.updatedAt,
      e.created_at,
      e.updated_at,
      e.time,
      t?.timestamp,
      t?.createdAt,
      t?.updatedAt,
      n?.timestamp,
    ];
  for (let a of s) {
    let c = $d(a);
    if (c !== void 0) return c;
  }
}
i(_v, "readEntryTimestamp");
function Cv(e) {
  let t = se(e.message) ? e.message : void 0,
    n = se(e.request) ? e.request : void 0;
  return He(e.cwd) ?? He(t?.cwd) ?? He(n?.cwd);
}
i(Cv, "readEntryWorkspacePath");
function Iv(e) {
  let t = se(e.message) ? e.message : void 0;
  return He(e.model) ?? He(t?.model);
}
i(Iv, "readEntryModel");
function bv(e) {
  let t = se(e.message) ? e.message : void 0,
    n = se(e.request) ? e.request : void 0;
  return e.isSidechain === !0 || t?.isSidechain === !0 || n?.isSidechain === !0;
}
i(bv, "isClaudeNativeSidechainEntry");
function Mi(e) {
  return e.some(bv);
}
i(Mi, "hasClaudeNativeSidechainMarker");
function It(e) {
  return e
    .replace(Sv, " ")
    .replace(Pv, " ")
    .replace(
      /\r\n/g,
      `
`,
    )
    .trim();
}
i(It, "sanitizeClaudeVisibleText");
function Ev(e) {
  let t = se(e.message) ? e.message : void 0;
  return (
    e.isApiErrorMessage === !0 ||
    t?.isApiErrorMessage === !0 ||
    Iv(e) === "<synthetic>"
  );
}
i(Ev, "isClaudeNativeNonVisibleAssistantEntry");
function zd(e) {
  return typeof e == "string"
    ? e
    : se(e)
      ? (He(e.text) ?? He(e.content) ?? "")
      : "";
}
i(zd, "extractTextField");
function Tv(e) {
  if (e.type !== "user") return null;
  let t = se(e.message) ? e.message : void 0;
  if (e.isMeta === !0 || t?.isMeta === !0) return null;
  let n = t?.content ?? (se(e.request) ? e.request.prompt : void 0);
  if (typeof n == "string") {
    let a = It(n);
    return a.length > 0 ? a : null;
  }
  if (!Array.isArray(n)) return null;
  let s = n
    .flatMap((a) => {
      if (typeof a == "string") {
        let d = It(a);
        return d.length > 0 ? [d] : [];
      }
      if (!se(a) || a.type === "tool_result") return [];
      let c = It(zd(a));
      return c.length > 0 ? [c] : [];
    })
    .filter((a) => a.length > 0);
  return s.length > 0
    ? s.join(`

`)
    : null;
}
i(Tv, "extractClaudeUserText");
function Rv(e) {
  if (e.type !== "assistant") return null;
  let t = se(e.message) ? e.message : void 0;
  if (Ev(e)) return null;
  let n = t?.content;
  if (typeof n == "string") {
    let c = It(n);
    return c.length > 0 ? c : null;
  }
  if (!Array.isArray(n)) return null;
  let s = n
      .flatMap((c) => {
        if (typeof c == "string") {
          let m = It(c);
          return m.length > 0 ? [m] : [];
        }
        if (!se(c) || c.type !== "text") return [];
        let d = It(zd(c));
        return d.length > 0 ? [d] : [];
      })
      .filter((c) => c.length > 0),
    a = s.length > 0 ? s.join("") : "";
  return a.length > 0 ? a : null;
}
i(Rv, "extractClaudeAssistantText");
function xi(e) {
  let t;
  for (let n of e) {
    let s = Tv(n),
      a = Rv(n);
    if ((!t && (s || a) && (t = Cv(n)), !!s))
      return { workspacePath: t, previewTitle: an(s, []), createdAt: _v(n) };
  }
  return { workspacePath: t };
}
i(xi, "extractClaudeNativeSessionHeadInfo");
r();
o();
import { createReadStream as Av } from "node:fs";
import { createInterface as Mv } from "node:readline";
function xv(e, t, n) {
  try {
    return JSON.parse(t);
  } catch (s) {
    let a = s instanceof Error ? s.message : String(s);
    throw new Error(
      `[claude-native] \u89E3\u6790 JSONL \u5931\u8D25 ${e}:${n} ${a}`,
    );
  }
}
i(xv, "parseJsonLine");
async function Oi(e, t) {
  if (t <= 0) return [];
  let n = [],
    s = Av(e, { encoding: "utf-8" }),
    a = Mv({ input: s, crlfDelay: 1 / 0 }),
    c = 0;
  try {
    for await (let d of a)
      if (
        ((c += 1),
        d.trim().length !== 0 && (n.push(xv(e, d, c)), n.length >= t))
      )
        break;
    return n;
  } finally {
    (a.close(), s.destroy());
  }
}
i(Oi, "readJsonLinesFileHead");
var Di = T("claude-native-import"),
  Uv = new Set(["subagents", "worktree", "worktrees"]);
function Ar(e) {
  let t = Kd(Vd(e));
  return process.platform === "win32" ? t.toLowerCase() : t;
}
i(Ar, "normalizePathForComparison");
function Gd(e) {
  let t = Kd(Vd(e))
    .replaceAll("\\", "/")
    .split("/")
    .map((n) => n.toLowerCase());
  return t.some(
    (n, s) =>
      n === ".claude" && (t[s + 1] === "worktree" || t[s + 1] === "worktrees"),
  );
}
i(Gd, "isClaudeWorktreeWorkspacePath");
function qd(e) {
  return Uv.has(e.toLowerCase());
}
i(qd, "shouldIgnoreClaudeNativeTranscriptDir");
async function Wv(e) {
  try {
    return (await Ni(e), !0);
  } catch {
    return !1;
  }
}
i(Wv, "pathExists");
var Li = class {
    static {
      i(this, "ClaudeNativeSessionImportRepo");
    }
    getNativeProjectsRoots() {
      let t = new Set();
      t.add(Lv());
      let n = process.env.HOME?.trim();
      n && t.add(n);
      let s = Re();
      return (s && t.add(s), [...t].map((a) => Rr(a, ".claude", "projects")));
    }
    async findSessionFile(t, n) {
      try {
        let s = await Zd(t, { withFileTypes: !0 });
        for (let a of s) {
          let c = Rr(t, a.name);
          if (a.isDirectory()) {
            if (qd(a.name)) continue;
            let d = await this.findSessionFile(c, n);
            if (d) return d;
            continue;
          }
          if (a.isFile() && a.name === `${n}.jsonl`) return c;
        }
      } catch {
        return null;
      }
      return null;
    }
    async collectJsonlFiles(t) {
      try {
        let n = await Zd(t, { withFileTypes: !0 }),
          s = [];
        for (let a of n) {
          let c = Rr(t, a.name);
          if (a.isDirectory()) {
            if (qd(a.name)) continue;
            s.push(...(await this.collectJsonlFiles(c)));
            continue;
          }
          a.isFile() && a.name.endsWith(".jsonl") && s.push(c);
        }
        return s;
      } catch {
        return [];
      }
    }
    getRelativeProjectsPath(t) {
      let n = `${Hd}projects${Hd}`,
        s = t.lastIndexOf(n);
      if (s < 0)
        throw new Error(
          `[claude-native] Claude \u539F\u751F session \u8DEF\u5F84\u975E\u6CD5: ${t}`,
        );
      return t.slice(s + n.length);
    }
    async scanImportableSessions(t) {
      let n = t.workspacePath ? Ar(t.workspacePath) : null,
        s = [
          ...new Set(
            (
              await Promise.all(
                this.getNativeProjectsRoots().map((d) =>
                  this.collectJsonlFiles(d),
                ),
              )
            ).flat(),
          ),
        ],
        a = [];
      for (let d of s) {
        let m;
        try {
          m = await Ni(d);
        } catch {
          continue;
        }
        let f = Math.trunc(m.mtimeMs);
        if (!(t.modifiedSince && f < t.modifiedSince))
          try {
            let g = await Oi(d, 16);
            if (Mi(g)) continue;
            let h = xi(g);
            if (
              !h.workspacePath ||
              Gd(h.workspacePath) ||
              (n !== null && Ar(h.workspacePath) !== n)
            )
              continue;
            a.push({
              provider: "claude",
              sessionId: Fv(d, ".jsonl"),
              workspacePath: h.workspacePath,
              sourcePath: d,
              updatedAt: f,
              ...(h.createdAt ? { createdAt: h.createdAt } : {}),
              ...(h.previewTitle ? { previewTitle: h.previewTitle } : {}),
            });
          } catch (g) {
            Di.warn(
              void 0,
              `\u626B\u63CF Claude \u539F\u751F session \u5931\u8D25 path=${d}`,
              g,
            );
          }
      }
      a.sort((d, m) => m.updatedAt - d.updatedAt);
      let c =
        typeof t.limit == "number" && t.limit > 0 ? a.slice(0, t.limit) : a;
      return (
        Di.info(
          void 0,
          `Claude \u539F\u751F session \u626B\u63CF\u5B8C\u6210 workspaceFilter=${t.workspacePath ?? "all"} fileCount=${s.length} candidateCount=${c.length}`,
        ),
        c
      );
    }
    async findImportableSession(t) {
      let n = t.workspacePath ? Ar(t.workspacePath) : null;
      for (let s of this.getNativeProjectsRoots()) {
        let a = await this.findSessionFile(s, t.sessionId);
        if (a)
          try {
            let c = await Ni(a),
              d = await Oi(a, 16);
            if (Mi(d)) return null;
            let m = xi(d);
            if (!m.workspacePath) continue;
            if (Gd(m.workspacePath)) return null;
            if (n !== null && Ar(m.workspacePath) !== n) continue;
            return {
              provider: "claude",
              sessionId: t.sessionId,
              workspacePath: m.workspacePath,
              sourcePath: a,
              updatedAt: Math.trunc(c.mtimeMs),
              ...(m.createdAt ? { createdAt: m.createdAt } : {}),
              ...(m.previewTitle ? { previewTitle: m.previewTitle } : {}),
            };
          } catch (c) {
            Di.warn(
              void 0,
              `\u67E5\u627E Claude \u539F\u751F session \u5931\u8D25 sessionId=${t.sessionId}`,
              c,
            );
          }
      }
      return null;
    }
    async copySessionFileToWorkspace(t) {
      let n = this.getRelativeProjectsPath(t.sourcePath),
        s = Rr(
          G(),
          "agent-config",
          "claude",
          Zt(t.workspacePath, t.workspaceIdentity),
          "projects",
          n,
        ),
        a = Bv(s),
        c = await Wv(s),
        d = `${s}.${process.pid}.${Date.now().toString(36)}.${Math.random().toString(36).slice(2, 8)}.tmp`;
      return (
        await Dv(a, { recursive: !0 }),
        await Ov(t.sourcePath, d),
        await Nv(d, s),
        { outputPath: s, createdOutputPaths: c ? [] : [s] }
      );
    }
  },
  Fi = new Li();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var K3 = qs.extend({ meta: Po.extend({ mode: ko.optional() }) });
var m8 = T("claude-native-import");
r();
o();
r();
o();
var VQ = T("zcode-task-service");
r();
o();
r();
o();
r();
o();
r();
o();
var u9 = T("zcode-session-service");
r();
o();
var M9 = T("zcode-session-service");
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var Yd = [
    "broker_info",
    "controller_status",
    "controller_takeover",
    "controller_stop",
    "request_access",
    "permission_status",
    "input_permission_status",
    "screen_capture_status",
    "screen_capture_probe",
    "supports_accessibility",
    "list_applications",
    "application_info",
    "list_windows",
    "capture_app",
    "element_at_point",
    "read_element",
    "click",
    "scroll",
    "drag",
    "type_text",
    "type_text_to_app",
    "press_key",
    "press_key_to_app",
    "hold_key",
    "hold_key_to_app",
    "cancel_input_holds",
    "element_press",
    "element_show_menu",
    "element_focus",
    "element_set_value",
    "element_perform_action",
    "element_select_text",
    "element_scroll",
    "paste",
    "prevent_activation",
    "reenable_activation",
    "is_focus_steal_prevented",
    "pip_start",
    "pip_stop",
    "pip_is_running",
    "pip_clear_dismissed",
    "pip_session_handshake",
    "pip_session_event",
  ],
  W9 = new Set(Yd);
r();
o();
r();
o();
var l7 = 16 * 1024 * 1024;
var Qd = 8e3;
r();
o();
r();
o();
r();
o();
r();
o();
var uk = "ZCODE_CUA_DEV_MODE";
function Mr(e = process.env) {
  let t = e[uk]?.trim().toLowerCase();
  return t === "1" || t === "true" || t === "on";
}
i(Mr, "isCuaDevModeRequested");
r();
o();
var Bi = "pipeline-316520-a82dd43e";
r();
o();
r();
o();
var F7 = 1440 * 60 * 1e3;
function xr(e) {
  return e.startsWith("\\\\.\\pipe\\");
}
i(xr, "isWindowsNamedPipePath");
r();
o();
r();
o();
import { existsSync as Ak } from "node:fs";
import { join as bl } from "node:path";
r();
o();
import { execFile as mk } from "node:child_process";
function _e(e, t) {
  return new Promise((n, s) => {
    mk(e, t, { encoding: "utf8" }, (a, c, d) => {
      if (a) {
        let m = `${e} ${t.join(" ")} failed: ${te(a)}${
          d
            ? `
${d}`
            : ""
        }`;
        s(new Error(m));
        return;
      }
      n({ stdout: c, stderr: d });
    });
  });
}
i(_e, "execFileText");
function te(e) {
  return e instanceof Error ? e.message : String(e);
}
i(te, "formatErrorMessage");
r();
o();
var gk =
  typeof __ZCODE_LOCAL_DEVELOPMENT_RUNTIME__ < "u"
    ? __ZCODE_LOCAL_DEVELOPMENT_RUNTIME__
    : process.env.NODE_ENV !== "production";
function ae(e = process.env, t = gk) {
  return t && e.ZCODE_RUNTIME_ENV?.trim().toLowerCase() !== "production";
}
i(ae, "isCuaLocalDevelopmentRuntime");
r();
o();
var nl = "/usr/bin:/bin:/usr/sbin:/sbin",
  ne = {
    codesign: "/usr/bin/codesign",
    ditto: "/usr/bin/ditto",
    lsof: "/usr/sbin/lsof",
    mdfind: "/usr/bin/mdfind",
    open: "/usr/bin/open",
    osascript: "/usr/bin/osascript",
    pbcopy: "/usr/bin/pbcopy",
    pbpaste: "/usr/bin/pbpaste",
    pgrep: "/usr/bin/pgrep",
    plist: "/usr/bin/plutil",
    plistBuddy: "/usr/libexec/PlistBuddy",
    ps: "/bin/ps",
    screencapture: "/usr/sbin/screencapture",
    sh: "/bin/sh",
    spctl: "/usr/sbin/spctl",
    syspolicyCheck: "/usr/bin/syspolicy_check",
    unzip: "/usr/bin/unzip",
    xattr: "/usr/bin/xattr",
  };
r();
o();
import { open as hk } from "node:fs/promises";
var rl = 4096,
  ol = 4277009102,
  il = 4277009103,
  sl = 3405691582,
  Ui = 3405691583,
  yk = 4278190080,
  wk = new Map([
    ["7:3", "i386"],
    ["16777223:3", "x86_64"],
    ["16777223:8", "x86_64h"],
    ["12:6", "armv6"],
    ["12:9", "armv7"],
    ["12:11", "armv7s"],
    ["12:12", "armv7k"],
    ["16777228:0", "arm64"],
    ["16777228:1", "arm64v8"],
    ["16777228:2", "arm64e"],
    ["33554444:1", "arm64_32"],
  ]);
function al(e, t) {
  let n = (t & ~yk) >>> 0,
    s = wk.get(`${e >>> 0}:${n}`);
  return (
    s ||
    `unknown(0x${(e >>> 0).toString(16).padStart(8, "0")},0x${n.toString(16).padStart(8, "0")})`
  );
}
i(al, "archName");
function vk(e) {
  if (e.length < 8)
    throw new Error("not a Mach-O file: header shorter than 8 bytes");
  let t = e.readUInt32BE(0),
    n = e.readUInt32LE(0),
    s = t === sl || t === Ui;
  if (s || n === sl || n === Ui) {
    let m = s ? t : n,
      f = i((v) => (s ? e.readUInt32BE(v) : e.readUInt32LE(v)), "readU32"),
      g = f(4),
      h = m === Ui ? 32 : 20,
      y = 8 + g * h;
    if (y > e.length)
      throw new Error(
        `not a Mach-O file: fat header declares ${g} slices (needs ${y} bytes, have ${e.length})`,
      );
    let S = [];
    for (let v = 0; v < g; v += 1) {
      let k = 8 + v * h;
      S.push(al(f(k), f(k + 4)));
    }
    return S;
  }
  let c = t === ol || t === il;
  if (c || n === ol || n === il) {
    if (e.length < 12)
      throw new Error(
        "not a Mach-O file: thin header truncated before cpusubtype",
      );
    let m = i((f) => (c ? e.readUInt32BE(f) : e.readUInt32LE(f)), "readU32");
    return [al(m(4), m(8))];
  }
  throw new Error(
    `not a Mach-O file: unrecognized magic 0x${t.toString(16).padStart(8, "0")}`,
  );
}
i(vk, "parseMachoArchNames");
async function cl(e) {
  let t = await hk(e, "r");
  try {
    let n = Buffer.alloc(rl),
      { bytesRead: s } = await t.read(n, 0, rl, 0);
    return vk(n.subarray(0, s));
  } finally {
    await t.close();
  }
}
i(cl, "readMachoArchNames");
r();
o();
import { execFile as _k } from "node:child_process";
import { realpath as ll, rm as Nee } from "node:fs/promises";
import { basename as Ck, join as Et } from "node:path";
r();
o();
r();
o();
var q = "ZCode Computer Use.app",
  it = "ZCode Computer Use Dev.app";
var st = "dev.zcode.cua-helper",
  cn = "dev.zcode.cua-helper.dev";
var bt = "8A5X4JJ39T";
var dn = "ZCODE_CUA_HELPER_INSTALL_VARIANT",
  Or = ["stable", "preview", "dev-desktop", "standalone"];
function Ik(e) {
  if (!ae(e)) return !1;
  let t = e.ZCODE_CUA_HELPER_ALLOW_UNSIGNED_LOCAL?.trim().toLowerCase();
  return t === "1" || t === "true" || t === "on" || Mr(e);
}
i(Ik, "isDevMode");
function Dr(e = process.env) {
  return Ik(e) ? it : q;
}
i(Dr, "resolveHelperAppName");
function Wi(e, t) {
  return new Promise((n, s) => {
    _k(
      ne.plistBuddy,
      ["-c", `Print :${t}`, Et(e, "Contents", "Info.plist")],
      { encoding: "utf8", env: Tk(void 0), timeout: 2e3 },
      (a, c) => {
        if (a) {
          s(a);
          return;
        }
        n(c.trim());
      },
    );
  });
}
i(Wi, "plistValue");
async function Zee(e) {
  let t = await ll(e),
    [n, s, a] = await Promise.all([
      Wi(t, "CFBundleIdentifier"),
      Wi(t, "CFBundleDisplayName"),
      Wi(t, "CFBundleExecutable"),
    ]),
    c = s.trim() || Ck(t, ".app");
  if (!n.trim() || !c || !a.trim())
    throw new D(
      "verification_failed",
      `ZCode Computer Use Info.plist is missing its permission identity at ${t}`,
    );
  let d = await ll(Et(t, "Contents", "MacOS", a.trim()));
  return { appPath: t, executablePath: d, displayName: c, bundleId: n.trim() };
}
i(Zee, "resolveHelperPermissionSubjectIdentity");
var bk = new Set([
  "HOME",
  "TMPDIR",
  "TMP",
  "TEMP",
  "USER",
  "LOGNAME",
  "SHELL",
  "TERM",
  "LANG",
  "LC_ALL",
  "LC_CTYPE",
  "__CF_USER_TEXT_ENCODING",
  "ZCODE_CUA_PIP_DEBUG",
]);
function Ek(e) {
  let t = e.toUpperCase();
  return bk.has(t) || t.startsWith("LC_");
}
i(Ek, "isAllowedHelperLaunchEnvKey");
function Tk(e) {
  let t = e ?? process.env,
    n = {};
  for (let [s, a] of Object.entries(t)) a !== void 0 && Ek(s) && (n[s] = a);
  return ((n.PATH = nl), n);
}
i(Tk, "sanitizeHelperLaunchEnv");
function Nr(e) {
  return (
    e.ZCODE_HOME?.trim() ||
    (e.HOME?.trim() ? Et(e.HOME.trim(), ".zcode") : null)
  );
}
i(Nr, "resolveZcodeHome");
function Cl(e) {
  let t = e[dn]?.trim();
  return t && Or.includes(t)
    ? t
    : t
      ? null
      : ae(e)
        ? "dev-desktop"
        : e.ZCODE_ENV?.trim().toLowerCase() === "test"
          ? "preview"
          : "stable";
}
i(Cl, "resolveCuaHelperInstallVariant");
function ji(e) {
  let t = Nr(e);
  if (!t) return null;
  let n = Et(t, "computer-use"),
    s = Cl(e);
  return s
    ? s === "dev-desktop" || Dr(e) === it
      ? Et(n, "dev")
      : s === "preview"
        ? Et(n, "preview")
        : n
    : null;
}
i(ji, "resolveCuaHelperInstallRoot");
var Mk = "dev.zcode.app",
  xk = "dev.zcode.app.preview",
  ste = Object.freeze([Mk, xk]);
var Lr = {
  readBundleInfo: Dk,
  readExecutableArchs: cl,
  verifyCodeSignature: Nk,
  inspectCodesignDetails: Lk,
  assessGatekeeper: Fk,
};
async function Fr(e, t, n, s = {}) {
  let a = await n.readBundleInfo(e);
  if (a.bundleId !== t.expectedBundleId)
    throw new D(
      "verification_failed",
      `${q} bundle id ${a.bundleId ?? "<missing>"} does not match ${t.expectedBundleId}`,
    );
  let c = t.source.kind === "bundled" ? void 0 : t.version;
  if (!Bk(a, c)) throw new D("verification_failed", Uk(a, t.version));
  if (t.expectedBuildId && a.buildId !== t.expectedBuildId)
    throw new D(
      "verification_failed",
      `${q} build id ${a.buildId ?? "<missing>"} does not match ${t.expectedBuildId}`,
    );
  if (!a.executableName)
    throw new D(
      "verification_failed",
      `${q} Info.plist is missing CFBundleExecutable`,
    );
  let d = bl(e, "Contents", "MacOS", a.executableName),
    m = await n.readExecutableArchs(d);
  if (!m.includes(t.arch))
    throw new D(
      "verification_failed",
      `${q} executable archs [${m.join(", ") || "<none>"}] do not include ${t.arch}`,
    );
  if (t.allowUnsignedLocalDev) {
    let g = await Ok(e, n);
    return {
      bundleInfo: a,
      codesign: g,
      releaseEligible: !1,
      mode: "local_dev_unsigned",
    };
  }
  await n.verifyCodeSignature(e);
  let f = await n.inspectCodesignDetails(e);
  if (f.adHoc || !f.teamIdentifier)
    throw new D(
      "verification_failed",
      `${q} is not signed with a stable Apple TeamIdentifier`,
    );
  if (!t.expectedTeamIdentifier)
    throw new D(
      "verification_failed",
      `${q} release verification requires a pinned Apple TeamIdentifier; refusing to trust an unpinned signing team as the TCC owner`,
    );
  if (f.teamIdentifier !== t.expectedTeamIdentifier)
    throw new D(
      "verification_failed",
      `${q} TeamIdentifier ${f.teamIdentifier} does not match ${t.expectedTeamIdentifier}`,
    );
  return (
    s.skipGatekeeperAssessment || (await n.assessGatekeeper(e)),
    { bundleInfo: a, codesign: f, releaseEligible: !0, mode: "release" }
  );
}
i(Fr, "verifyCuaHelperBundle");
async function Ok(e, t) {
  try {
    return await t.inspectCodesignDetails(e);
  } catch {
    return null;
  }
}
i(Ok, "inspectCodesignDetailsBestEffort");
async function Dk(e) {
  let t = bl(e, "Contents", "Info.plist"),
    { stdout: n } = await _e(ne.plist, ["-convert", "json", "-o", "-", t]),
    s = JSON.parse(n);
  return {
    bundleId: ln(s.CFBundleIdentifier),
    version: ln(s.CFBundleShortVersionString),
    buildVersion: ln(s.CFBundleVersion),
    executableName: ln(s.CFBundleExecutable),
    buildId: ln(s.ZCodeCUAHelperBuildId),
  };
}
i(Dk, "defaultReadBundleInfo");
async function Nk(e) {
  await _e(ne.codesign, ["--verify", "--deep", "--strict", e]);
}
i(Nk, "defaultVerifyCodeSignature");
async function Lk(e) {
  let { stdout: t, stderr: n } = await _e(ne.codesign, [
      "-dv",
      "--verbose=4",
      e,
    ]),
    s = `${t}
${n}`,
    a = s.match(/^TeamIdentifier=(.+)$/mu)?.[1]?.trim() || null,
    c = [...s.matchAll(/^Authority=(.+)$/gmu)]
      .map((d) => d[1]?.trim())
      .filter((d) => !!d);
  return {
    teamIdentifier: a === "not set" ? null : a,
    authorities: c,
    rawOutput: s,
    adHoc: /^Signature=adhoc$/mu.test(s),
  };
}
i(Lk, "defaultInspectCodesignDetails");
async function Fk(e) {
  if (Ak(ne.syspolicyCheck)) {
    await _e(ne.syspolicyCheck, ["distribution", e]);
    return;
  }
  await _e(ne.spctl, ["-a", "-vv", "-t", "exec", e]);
}
i(Fk, "defaultAssessGatekeeper");
function Bk(e, t) {
  return t === void 0 ? !0 : e.version === t && e.buildVersion === t;
}
i(Bk, "isExpectedHelperVersion");
function Uk(e, t) {
  let n = e.version ?? "<missing>",
    s = e.buildVersion ?? "<missing>";
  return `${q} version mismatch: expected short/build ${t}, got short ${n}, build ${s}`;
}
i(Uk, "describeHelperVersionMismatch");
function ln(e) {
  return typeof e == "string" && e.trim() ? e.trim() : null;
}
i(ln, "readString");
r();
o();
r();
o();
var wte = Object.freeze([
  "associate-title-elements",
  "flatten-into-selectable-ancestor",
  "prune-empty-disabled-elements",
  "merge-single-item-groups",
  "flatten-repetitive-static-text",
  "flatten-links-into-text",
]);
r();
o();
r();
o();
r();
o();
var Zk = new Set([
    "textfield",
    "textarea",
    "searchfield",
    "securefield",
    "combobox",
  ]),
  Vte = new Set([...Zk, "slider", "stepper"]);
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var $ne = new Set([
  ..."abcdefghijklmnopqrstuvwxyz0123456789".split(""),
  "=",
  "*",
  "-",
  "]",
  "[",
  "'",
  ";",
  "\\",
  ",",
  "/",
  ".",
  "`",
  "enter",
  "tab",
  "space",
  "backspace",
  "delete",
  "esc",
  "command",
  "meta",
  "super",
  "win",
  "shift",
  "capslock",
  "alt",
  "ctrl",
  "help",
  "home",
  "pageup",
  "forwarddelete",
  "end",
  "pagedown",
  "left",
  "right",
  "down",
  "up",
  ...Array.from({ length: 16 }, (e, t) => `f${t + 1}`),
]);
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var Tl = 64,
  aoe = Tl * Tl;
r();
o();
r();
o();
r();
o();
var voe = 16 * 1024 * 1024;
r();
o();
r();
o();
r();
o();
r();
o();
var Hoe = 128 * 1024 * 1024;
r();
o();
import {
  appendFileSync as yS,
  existsSync as Bae,
  mkdirSync as wS,
  readdirSync as vS,
  unlinkSync as kS,
  writeFileSync as Uae,
} from "node:fs";
import { dirname as Ml, isAbsolute as jae, join as SS } from "node:path";
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var nS = Object.freeze({
  Button: "button",
  SplitButton: "button",
  MenuItem: "menuitem",
  Menu: "menuitem",
  MenuBar: "menuitem",
  Edit: "textfield",
  Document: "textarea",
  Password: "securefield",
  ComboBox: "combobox",
  CheckBox: "checkbox",
  RadioButton: "radio",
  Hyperlink: "link",
  Slider: "slider",
  ProgressBar: "slider",
  Text: "text",
  StatusBar: "text",
  Image: "image",
  ListItem: "row",
  DataItem: "row",
  TreeItem: "row",
  TabItem: "tab",
  Custom: "",
  Pane: "",
  Window: "",
  Group: "",
});
var Rl = new Set(["textfield", "textarea", "securefield", "combobox"]),
  rS = new Set([...Rl, "slider", "stepper"]);
r();
o();
r();
o();
function zi(e = process.env) {
  let t = ae(e),
    n = t ? e.ZCODE_CUA_HELPER_BUNDLE_ID?.trim() : void 0;
  return n || (t && pn(e) ? cn : st);
}
i(zi, "resolveExpectedCuaHelperBundleId");
function iS(e) {
  let t = e?.trim().toLowerCase();
  return t === "1" || t === "true" || t === "on";
}
i(iS, "isExplicitLocalDevOptIn");
function pn(e = process.env) {
  return ae(e) ? iS(e.ZCODE_CUA_HELPER_ALLOW_UNSIGNED_LOCAL) || Mr(e) : !1;
}
i(pn, "isUnsignedHelperLocalDevRequested");
r();
o();
r();
o();
import { dirname as tse, isAbsolute as nse, join as sS } from "node:path";
var ose = sS("build", "Release", "ax_native.node");
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var Al = "__zcode_pip_no_active_session_v2__";
var Me = l
    .string()
    .trim()
    .min(1)
    .max(255)
    .refine((e) => !e.includes("\0"), "identifier cannot contain NUL")
    .refine(
      (e) => e !== Al,
      "identifier is reserved by the PiP session runtime",
    ),
  Br = l.number().int().nonnegative().safe(),
  Hi = l.discriminatedUnion("kind", [
    l
      .object({
        kind: l.literal("focus-changed"),
        revision: Br,
        sourceWindowId: Me,
        sessionId: Me.nullable(),
      })
      .strict(),
    l
      .object({
        kind: l.literal("turn-started"),
        sessionId: Me,
        turnId: Me,
        sequenceNumber: Br,
        eventId: Me,
      })
      .strict(),
    l
      .object({
        kind: l.literal("turn-ended"),
        sessionId: Me,
        turnId: Me,
        sequenceNumber: Br,
        eventId: Me,
        outcome: l.enum(["completed", "failed"]),
      })
      .strict(),
    l
      .object({
        kind: l.literal("session-closed"),
        sessionId: Me,
        sequenceNumber: Br,
        eventId: Me,
      })
      .strict(),
  ]),
  zse = l
    .object({
      windowId: l.number().int().positive().safe(),
      presentationWindowId: l.number().int().positive().safe().optional(),
      pid: l.number().int().positive().safe(),
      bundleId: l.string().trim().min(1).max(255),
    })
    .strict();
var Jse = l
    .object({ protocolVersion: l.number().int(), runtimeId: l.string() })
    .strict(),
  Xse = l.object({ event: Hi }).strict();
r();
o();
r();
o();
(() => {
  let e = process.argv.indexOf("--exit-log"),
    t = e >= 0 && e + 1 < process.argv.length ? process.argv[e + 1] : null;
  if (!t) return;
  try {
    wS(Ml(t), { recursive: !0 });
  } catch {}
  _S(Ml(t));
  let n = process.stderr.write.bind(process.stderr);
  process.stderr.write = (s, ...a) => {
    try {
      let c = typeof s == "string" ? s : String(s);
      yS(t, PS(c));
    } catch {}
    return n(s, ...a);
  };
})();
function PS(e) {
  let t = new Date().toISOString(),
    n = "";
  for (let s of e.split(`
`)) {
    let a = s.trim();
    if (!a) continue;
    let c, d;
    try {
      d = JSON.parse(a);
    } catch {
      d = null;
    }
    if (d && typeof d == "object" && !Array.isArray(d)) {
      let m = d,
        { scope: f, level: g, event: h, evidence: y, ...S } = m;
      c = {
        timestamp: t,
        level: typeof g == "string" ? g : "info",
        event: typeof h == "string" ? h : "helper runtime event",
        module: typeof f == "string" ? f : "zcode-cua-helper",
        pid: process.pid,
        ...(y === void 0 ? {} : { context: y }),
        ...S,
      };
    } else {
      let m = /^\[([a-z0-9-]+)\]/iu.exec(a);
      c = {
        timestamp: t,
        level: "info",
        event: m ? m[1] : "helper stderr",
        module: "zcode-cua-helper",
        pid: process.pid,
        message: m ? a.slice(m[0].length).trim() : a,
      };
    }
    n += `${JSON.stringify(c)}
`;
  }
  return n;
}
i(PS, "helperLogLines");
function _S(e) {
  try {
    let t = vS(e)
      .filter((n) => /^zcode-cua-helper-\d{4}-\d{2}-\d{2}\.jsonl$/u.test(n))
      .sort()
      .reverse()
      .slice(CS);
    for (let n of t)
      try {
        kS(SS(e, n));
      } catch {}
  } catch {}
}
i(_S, "pruneHelperLogs");
var CS = 7;
r();
o();
var Oce = l.object({
  platform: l.literal("win32"),
  socketPath: l.string().refine((e) => xr(e) && e.length > 9),
  parentPid: l.coerce.number().int().positive(),
});
r();
o();
import {
  constants as fn,
  createWriteStream as RS,
  existsSync as Qi,
  fstatSync as AS,
  lstatSync as MS,
} from "node:fs";
import {
  cp as xS,
  lstat as jr,
  mkdir as es,
  mkdtemp as OS,
  open as $l,
  readdir as ts,
  readFile as zr,
  readlink as Xi,
  realpath as Yi,
  rename as Ji,
  rm as $r,
  writeFile as DS,
} from "node:fs/promises";
import {
  basename as NS,
  dirname as LS,
  join as re,
  resolve as Kl,
  sep as FS,
} from "node:path";
import { Readable as BS, Transform as US } from "node:stream";
import { pipeline as WS } from "node:stream/promises";
r();
o();
r();
o();
var Ur = "3.16.3";
r();
o();
function Ll(e) {
  return e?.trim().toLowerCase() === "production" ? "production" : "test";
}
i(Ll, "normalizeZCodeEnv");
var IS = Ll("production");
var bS = typeof process < "u" ? process.env.ZCODE_DEBUG : void 0;
r();
o();
var Fl = "studio.zcode-ai.com";
function Bl() {
  return globalThis.process?.env ?? {};
}
i(Bl, "readProcessEnv");
function Gi(e = Bl()) {
  return e.INTRANET_MACHINE_HOST?.trim() || Fl;
}
i(Gi, "resolveIntranetMachineHost");
var qi = Gi(),
  Ki = 12345,
  Ul = `http://${qi}:${Ki}/zcode`,
  ES = `${Ul}/deps`,
  Wl = 3850,
  jl = "/api/intranet/probe",
  TS = `http://${qi}:${Wl}${jl}`;
function Vi(e = Bl()) {
  let t = e.ZCODE_DEPS_BASE_URL?.trim();
  return t ? t.replace(/\/+$/, "") : `http://${Gi(e)}:${Ki}/zcode/deps`;
}
i(Vi, "resolveIntranetDepsBaseUrl");
r();
o();
var jS = ".zcode-cua-helper-meta.json",
  zl = 3e4,
  $S = "ZCODE_CUA_HELPER_DOWNLOAD_TIMEOUT_MS",
  Zl = 200 * 1024 * 1024,
  zS = "ZCODE_CUA_HELPER_MAX_DOWNLOAD_BYTES",
  Hl = ".zcode-cua-helper-install.lock",
  ZS = 12e4,
  HS = 50,
  GS = 32,
  Wr = new Map();
function qS(e = process.env) {
  let t = e[zS]?.trim();
  if (!t) return Zl;
  let n = Number(t);
  return Number.isInteger(n) && n > 0 ? n : Zl;
}
i(qS, "resolveMaxDownloadBytes");
function KS(e) {
  let t = 0;
  return new US({
    transform(n, s, a) {
      if (((t += n.length), t > e)) {
        a(
          new Error(`ZCode Computer Use download exceeded max size ${e} bytes`),
        );
        return;
      }
      a(null, n);
    },
  });
}
i(KS, "createDownloadSizeLimiter");
function VS(e = {}) {
  let t = e.env ?? process.env,
    n = ae(t),
    s = fP(
      (n ? (e.targetPlatform ?? t.ZCODE_TARGET_OS) : void 0) ??
        process.platform,
    );
  if (s !== "darwin")
    throw new D(
      "install_failed",
      `ZCode Computer Use auto-install is only supported on macOS, got ${s}`,
    );
  let a = mP(
      (n
        ? (e.targetArch ?? t.ZCODE_TARGET_ARCH ?? t.npm_config_arch)
        : void 0) ?? process.arch,
    ),
    c =
      JS({ env: t, explicitVersion: e.version, localDevelopmentRuntime: n }) ??
      "0.0.0";
  if (!Nr(t))
    throw new D(
      "install_failed",
      "Cannot resolve ${ZCODE_HOME:-$HOME/.zcode}; set ZCODE_HOME or HOME before installing ZCode Computer Use.",
    );
  let m = `${s}-${a}`,
    f = XS(t, e.embeddedBuildId ?? Bi);
  if (!n && !f)
    throw new D(
      "install_failed",
      "Packaged ZCode is missing its embedded Computer Use Helper build identity; refusing an unpinned Helper install",
    );
  let g = e.bundledAppPath?.trim() || null;
  if (!n && !g)
    throw new D(
      "install_failed",
      "Packaged ZCode is missing its bundled ZCode Computer Use.app path",
    );
  let h = g
      ? { kind: "bundled", appPath: g }
      : (() => {
          let S = `ZCode-CUA-Helper-${c}-mac-${a}.zip`;
          return {
            kind: "download",
            fileName: S,
            url:
              t.ZCODE_CUA_HELPER_DOWNLOAD_URL?.trim() || `${uP(c, f, t)}/${S}`,
          };
        })(),
    y = ji(t);
  if (!y)
    throw new D(
      "install_failed",
      `Cannot resolve a safe Computer Use Helper install root from ${dn}.`,
    );
  return {
    version: c,
    platform: s,
    arch: a,
    platformKey: m,
    installRoot: y,
    appPath: re(y, Dr(t)),
    source: h,
    expectedBundleId: zi(t),
    expectedTeamIdentifier: n ? t.ZCODE_CUA_HELPER_TEAM_ID?.trim() || bt : bt,
    expectedBuildId: f,
    allowUnsignedLocalDev: pn(t),
  };
}
i(VS, "resolveCuaHelperInstallPlan");
function JS(e = {}) {
  let t = e.env ?? process.env;
  return (e.localDevelopmentRuntime ?? ae(t))
    ? e.explicitVersion?.trim() || t.ZCODE_CUA_HELPER_VERSION?.trim() || void 0
    : Ur;
}
i(JS, "resolveCuaHelperRuntimeVersion");
function XS(e = process.env, t = Bi) {
  let n = ae(e) ? e.ZCODE_CUA_HELPER_BUILD_ID?.trim() : void 0;
  return pP(t.trim() || n);
}
i(XS, "resolveExpectedCuaHelperBuildId");
function ns(e = {}) {
  let n = {
    plan: e.plan ?? VS({ env: e.env, bundledAppPath: e.bundledAppPath }),
    logger: e.logger,
    dependencies: {
      downloadFile: hP,
      extractZip: SP,
      clearQuarantine: PP,
      acquireInstallLease: oP,
      ...Lr,
      ...e.dependencies,
    },
  };
  return {
    ensureInstalled: i(() => iP(n), "ensureInstalled"),
    verifyInstalled: i(async (s, a) => {
      await Fr(s, n.plan, n.dependencies, a);
    }, "verifyInstalled"),
  };
}
i(ns, "createCuaHelperInstaller");
function Vl() {
  return typeof process.getuid == "function" ? process.getuid() : void 0;
}
i(Vl, "currentUid");
function YS(e, t) {
  let n = Vl();
  if (
    t.isSymbolicLink() ||
    !t.isDirectory() ||
    (n !== void 0 && t.uid !== n) ||
    (Number(t.mode) & 18) !== 0
  )
    throw new D(
      "install_failed",
      `Refusing insecure ZCode Computer Use install-lock directory ${e}; it must be a real owner-controlled directory without group/other write access`,
    );
}
i(YS, "assertOwnedSecureDirectory");
function At(e, t) {
  let n = Vl();
  if (
    t.isSymbolicLink() ||
    !t.isFile() ||
    t.nlink !== 1 ||
    (n !== void 0 && t.uid !== n) ||
    (Number(t.mode) & 511) !== 384
  )
    throw new D(
      "install_failed",
      `Refusing insecure ZCode Computer Use install lock ${e}; it must be a real owner-only regular file with exactly one link`,
    );
}
i(At, "assertOwnedSecureLockFile");
var Zr = class extends Error {
  static {
    i(this, "HelperInstallLockContendedError");
  }
  constructor(t) {
    (super(`ZCode Computer Use install lock is held by another owner: ${t}`),
      (this.name = "HelperInstallLockContendedError"));
  }
};
function QS(e) {
  let t = e?.code;
  return t === "EAGAIN" || t === "EWOULDBLOCK";
}
i(QS, "isLockContendedError");
async function eP(e) {
  let t = await Yi(e).catch((c) => {
    throw new D(
      "install_failed",
      `Cannot resolve ZCode Computer Use install-lock directory ${e}: ${te(c)}`,
      { cause: c },
    );
  });
  YS(e, await jr(e));
  let n = re(e, Hl),
    s = fn.O_RDWR | fn.O_NOFOLLOW | GS | fn.O_NONBLOCK,
    a;
  try {
    a = await $l(n, fn.O_CREAT | fn.O_EXCL | s, 384);
  } catch (c) {
    if (c.code !== "EEXIST")
      throw new D(
        "install_failed",
        `Cannot create ZCode Computer Use install lock ${n}: ${te(c)}`,
        { cause: c },
      );
    try {
      (At(n, await jr(n)), (a = await $l(n, s)));
    } catch (d) {
      throw QS(d)
        ? new Zr(n)
        : new D(
            "install_failed",
            `Refusing unsafe ZCode Computer Use install lock ${n}: ${te(d)}`,
            { cause: d },
          );
    }
  }
  try {
    let [c, d, m] = await Promise.all([a.stat(), jr(n), Yi(n)]);
    if (
      (At(n, c),
      At(n, d),
      m !== re(t, Hl) || c.dev !== d.dev || c.ino !== d.ino)
    )
      throw new D(
        "install_failed",
        `ZCode Computer Use install lock changed while it was being opened: ${n}`,
      );
    return {
      lockPath: n,
      identity: { device: d.dev, inode: d.ino },
      handle: a,
    };
  } catch (c) {
    throw (await a.close(), c);
  }
}
i(eP, "prepareHelperInstallLockFile");
function tP(e, t) {
  if (t)
    throw new D(
      "install_failed",
      "ZCode Computer Use install lease has already been released",
    );
  try {
    let n = AS(e.handle.fd),
      s = MS(e.lockPath);
    if (
      (At(e.lockPath, n),
      At(e.lockPath, s),
      n.dev !== e.identity.device ||
        n.ino !== e.identity.inode ||
        s.dev !== e.identity.device ||
        s.ino !== e.identity.inode)
    )
      throw new D(
        "install_failed",
        `ZCode Computer Use install lock changed while its lease was held: ${e.lockPath}`,
      );
  } catch (n) {
    throw n instanceof D
      ? n
      : new D(
          "install_failed",
          `ZCode Computer Use install lease is no longer verifiable: ${te(n)}`,
          { cause: n },
        );
  }
}
i(tP, "assertInstallLeaseDescriptorHeld");
function nP(e, t) {
  return new Promise((n, s) => {
    let a = i(() => {
        (clearTimeout(c), s(rs()));
      }, "onAbort"),
      c = setTimeout(() => {
        (t?.removeEventListener("abort", a), n());
      }, e);
    t?.addEventListener("abort", a, { once: !0 });
  });
}
i(nP, "delayWithAbort");
function rs() {
  return new D(
    "install_failed",
    "ZCode Computer Use install lease acquisition was aborted",
  );
}
i(rs, "installLeaseAbortedError");
async function rP(e, t, n) {
  let s = Date.now() + t;
  for (;;) {
    if (n?.aborted) throw rs();
    try {
      return await eP(e);
    } catch (a) {
      if (!(a instanceof Zr)) throw a;
      if (Date.now() >= s)
        throw new D(
          "install_failed",
          `Failed to acquire ZCode Computer Use install lease: timed out after ${t}ms; ${a.message}`,
          { cause: a },
        );
      await nP(HS, n);
    }
  }
}
i(rP, "acquireLockedInstallLockFile");
async function oP(e, t = {}) {
  if (process.platform !== "darwin")
    throw new D(
      "install_failed",
      `ZCode Computer Use install lease requires macOS (O_EXLOCK); got ${process.platform}`,
    );
  if (t.signal?.aborted) throw rs();
  let n =
      typeof t.waitTimeoutMs == "number" &&
      Number.isFinite(t.waitTimeoutMs) &&
      t.waitTimeoutMs > 0
        ? t.waitTimeoutMs
        : ZS,
    s = await rP(e.installRoot, n, t.signal);
  try {
    await t.faultInjection?.afterLockFilePrepared?.(s.lockPath);
    let d = await jr(s.lockPath);
    if (
      (At(s.lockPath, d),
      d.dev !== s.identity.device || d.ino !== s.identity.inode)
    )
      throw new D(
        "install_failed",
        `ZCode Computer Use install lock changed before its lease was used: ${s.lockPath}`,
      );
  } catch (d) {
    throw (
      await s.handle.close().catch(() => {}),
      d instanceof D
        ? d
        : new D(
            "install_failed",
            `Failed to acquire ZCode Computer Use install lease: ${te(d)}`,
            { cause: d },
          )
    );
  }
  let a = !1,
    c;
  return {
    assertHeld() {
      tP(s, a);
    },
    release() {
      return (
        (c ??= (async () => {
          a || (await s.handle.close(), (a = !0));
        })()),
        c
      );
    },
  };
}
i(oP, "acquireMacOSCuaHelperInstallLease");
function iP(e) {
  let t = Kl(e.plan.appPath),
    n = Wr.get(t);
  if (n) return n;
  let a = (async () => {
    await es(e.plan.installRoot, { recursive: !0, mode: 448 });
    let c = await e.dependencies.acquireInstallLease(e.plan);
    try {
      return (c.assertHeld(), await sP(e, c));
    } finally {
      await c.release();
    }
  })().finally(() => {
    Wr.get(t) === a && Wr.delete(t);
  });
  return (Wr.set(t, a), a);
}
i(iP, "ensureCuaHelperInstalledSingleFlight");
async function sP(e, t) {
  let { plan: n, logger: s, dependencies: a } = e;
  if ((t.assertHeld(), Qi(n.appPath)))
    try {
      let d = await Fr(n.appPath, n, a);
      if (await cP(n, d.bundleInfo.executableName))
        s?.info(
          void 0,
          `local bundled cua helper payload changed; replacing ${n.appPath}`,
        );
      else {
        (t.assertHeld(), await Gl(n.appPath, e));
        try {
          await ql(n, d);
        } catch (f) {
          s?.warn(
            void 0,
            `verified installed cua helper but failed to refresh install metadata: ${te(f)}`,
          );
        }
        return (
          s?.info(
            void 0,
            n.allowUnsignedLocalDev
              ? `local unsigned cua helper ${n.version} already installed at ${n.appPath}`
              : `cua helper ${n.version} already installed at ${n.appPath}`,
          ),
          n.appPath
        );
      }
    } catch (d) {
      if (n.allowUnsignedLocalDev && n.source.kind !== "bundled")
        throw new D(
          "verification_failed",
          `Local unsigned ZCode Computer Use.app failed dev verification: ${te(d)}. Rebuild and reinstall it at ${n.appPath}, or unset ZCODE_CUA_HELPER_ALLOW_UNSIGNED_LOCAL for the signed release path.`,
          { cause: d },
        );
      s?.warn(
        void 0,
        `installed cua helper is not usable, reinstalling: ${te(d)}`,
      );
    }
  if (n.allowUnsignedLocalDev && n.source.kind !== "bundled")
    throw new D(
      "helper_missing",
      `Local unsigned ZCode Computer Use.app is not installed at ${n.appPath}. Build the Helper locally and copy it there, or unset ZCODE_CUA_HELPER_ALLOW_UNSIGNED_LOCAL for the signed release installer.`,
    );
  let c = await OS(re(n.installRoot, ".cua-helper-install-"));
  try {
    let d =
        n.source.kind === "bundled"
          ? await dP(n.source.appPath, c)
          : await lP(e, c, n.source),
      m = await Fr(d, n, a);
    (t.assertHeld(),
      await _P(d, n.appPath),
      t.assertHeld(),
      await Gl(n.appPath, e));
    try {
      await ql(n, m);
    } catch (f) {
      s?.warn(
        void 0,
        `installed cua helper but failed to write install metadata: ${te(f)}`,
      );
    }
    return (
      s?.info(void 0, `installed cua helper ${n.version} at ${n.appPath}`),
      n.appPath
    );
  } finally {
    await $r(c, { recursive: !0, force: !0 });
  }
}
i(sP, "ensureCuaHelperInstalledUnderLease");
var aP = [["Contents", "Info.plist"]];
async function Jl(e, t) {
  let n = i(async (m) => {
      try {
        return await ts(m, { withFileTypes: !0 });
      } catch {
        return null;
      }
    }, "readEntries"),
    [s, a] = await Promise.all([n(e), n(t)]);
  if (s === null || a === null) return s !== a;
  let c = new Map(s.map((m) => [m.name, m])),
    d = new Map(a.map((m) => [m.name, m]));
  if (c.size !== d.size) return !0;
  for (let [m, f] of d) {
    let g = c.get(m);
    if (!g) return !0;
    let h = re(e, m),
      y = re(t, m);
    if (
      f.isDirectory() !== g.isDirectory() ||
      f.isSymbolicLink() !== g.isSymbolicLink()
    )
      return !0;
    if (f.isDirectory()) {
      if (await Jl(h, y)) return !0;
      continue;
    }
    if (f.isSymbolicLink()) {
      let [k, M] = await Promise.all([Xi(h), Xi(y)]);
      if (k !== M) return !0;
      continue;
    }
    let [S, v] = await Promise.all([zr(h), zr(y)]);
    if (!S.equals(v)) return !0;
  }
  return !1;
}
i(Jl, "localDevPayloadTreeChanged");
async function cP(e, t) {
  if (!e.allowUnsignedLocalDev || e.source.kind !== "bundled" || !t) return !1;
  let n = [["Contents", "MacOS", t], ...aP];
  for (let s of n) {
    let a = re(e.appPath, ...s),
      c = re(e.source.appPath, ...s);
    try {
      let [d, m] = await Promise.all([zr(a), zr(c)]);
      if (!d.equals(m)) return !0;
    } catch {
      return !0;
    }
  }
  return Jl(
    re(e.appPath, "Contents", "Resources"),
    re(e.source.appPath, "Contents", "Resources"),
  );
}
i(cP, "shouldRefreshLocalDevBundledHelper");
async function dP(e, t) {
  if (!Qi(e))
    throw new D(
      "helper_missing",
      `Bundled ZCode Computer Use.app is missing at ${e}`,
    );
  let n = re(t, q);
  return (
    await xS(e, n, {
      recursive: !0,
      errorOnExist: !0,
      preserveTimestamps: !0,
    }).catch((s) => {
      throw new D(
        "install_failed",
        `Failed to stage bundled ZCode Computer Use.app: ${te(s)}`,
        { cause: s },
      );
    }),
    n
  );
}
i(dP, "stageBundledHelperApp");
async function lP(e, t, n) {
  let { plan: s, logger: a, dependencies: c } = e;
  a?.info(
    void 0,
    `installing local-development cua helper ${s.version} ${s.platformKey} from ${Hr(n.url)}`,
  );
  let d = re(t, n.fileName),
    m = re(t, "extract");
  (await c.downloadFile(n.url, d).catch((g) => {
    let h = Hr(n.url),
      y = te(g).split(n.url).join(h);
    throw new D(
      "download_failed",
      `Failed to download ZCode Computer Use from ${h}: ${y}`,
      { cause: g },
    );
  }),
    await es(m, { recursive: !0 }),
    await c.extractZip(d, m).catch((g) => {
      throw new D(
        "install_failed",
        `Failed to extract ZCode Computer Use archive ${d}: ${te(g)}`,
        { cause: g },
      );
    }));
  let f = await Xl(m);
  if (!f)
    throw new D(
      "install_failed",
      `ZCode Computer Use archive did not contain ${q}`,
    );
  return f;
}
i(lP, "stageDownloadedHelperApp");
function uP(e, t, n) {
  let s = n.ZCODE_CUA_HELPER_DOWNLOAD_BASE_URL?.trim();
  if (s) return s.replace(/\/+$/, "");
  let a = `${Vi(n)}/zcode-cua-helper-${e}`;
  return t ? `${a}/${t}` : a;
}
i(uP, "resolveCuaHelperDownloadBaseUrl");
function pP(e) {
  let t = e?.trim();
  if (!t) return null;
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/u.test(t))
    throw new D(
      "install_failed",
      "ZCODE_CUA_HELPER_BUILD_ID must use 1-128 ASCII letters, digits, dots, underscores, or hyphens",
    );
  return t;
}
i(pP, "normalizeHelperBuildId");
function fP(e) {
  switch (e.toLowerCase()) {
    case "mac":
    case "macos":
    case "osx":
    case "darwin":
      return "darwin";
    default:
      return e;
  }
}
i(fP, "normalizeHelperPlatform");
function mP(e) {
  switch (e.toLowerCase()) {
    case "aarch64":
    case "arm64":
      return "arm64";
    case "amd64":
    case "x86_64":
    case "x64":
      return "x64";
    default:
      throw new D(
        "install_failed",
        `Unsupported ZCode Computer Use arch: ${e}`,
      );
  }
}
i(mP, "normalizeHelperArch");
function gP(e) {
  let t;
  try {
    t = new URL(e);
  } catch {
    throw new D(
      "download_failed",
      `invalid ZCode Computer Use download URL: ${Hr(e)}`,
    );
  }
  if (t.protocol !== "https:" && t.protocol !== "http:")
    throw new D(
      "download_failed",
      `refusing to download ZCode Computer Use over unsupported scheme "${t.protocol}" (only http/https are allowed)`,
    );
}
i(gP, "assertSafeHelperDownloadUrl");
async function hP(e, t) {
  gP(e);
  let n = yP(process.env),
    s = new AbortController(),
    a = setTimeout(() => {
      s.abort(new Error(`download timed out after ${n}ms`));
    }, n);
  a.unref?.();
  try {
    let c = await fetch(e, { redirect: "follow", signal: s.signal });
    if (!c.ok) throw new Error(`HTTP ${c.status} ${c.statusText}`);
    if (!c.body) throw new Error("empty response body");
    let d = qS(process.env),
      m = Number(c.headers.get("content-length"));
    if (Number.isFinite(m) && m > d)
      throw new Error(
        `ZCode Computer Use download declares ${m} bytes, exceeding max ${d}`,
      );
    await WS(BS.fromWeb(c.body), KS(d), RS(t));
  } catch (c) {
    throw s.signal.aborted
      ? new Error(`download timed out after ${n}ms`, { cause: c })
      : c;
  } finally {
    clearTimeout(a);
  }
}
i(hP, "defaultDownloadFile");
function yP(e) {
  let t = e[$S]?.trim();
  if (!t) return zl;
  let n = Number(t);
  return Number.isFinite(n) && n > 0 ? n : zl;
}
i(yP, "resolveDownloadTimeoutMs");
function Hr(e) {
  try {
    let t = new URL(e);
    return (
      (t.username = ""),
      (t.password = ""),
      (t.search = ""),
      (t.hash = ""),
      t.toString()
    );
  } catch {
    let n = (e.split(/[?#]/u)[0] ?? e).split("/");
    return n[n.length - 1] || "<redacted-url>";
  }
}
i(Hr, "redactHelperDownloadUrl");
function wP(e) {
  return e.length === 0 ||
    e.includes("\0") ||
    e.startsWith("/") ||
    e.startsWith("\\") ||
    /^[A-Za-z]:[\\/]/.test(e)
    ? !0
    : e.split(/[\\/]/u).some((n) => n === "..");
}
i(wP, "isUnsafeZipEntryName");
async function vP(e) {
  let { stdout: t } = await _e(ne.unzip, ["-Z1", e]),
    n = t
      .split(
        `
`,
      )
      .map((s) => s.replace(/\r$/u, ""))
      .filter((s) => s.length > 0);
  for (let s of n)
    if (wP(s))
      throw new D(
        "install_failed",
        `refusing to extract Computer Use Helper archive: unsafe zip entry path ${JSON.stringify(s)}`,
      );
}
i(vP, "assertSafeZipArchiveEntries");
async function kP(e) {
  let t = await Yi(e),
    n = i((a) => a === t || a.startsWith(`${t}${FS}`), "withinRoot"),
    s = [e];
  for (; s.length > 0;) {
    let a = s.pop(),
      c = await ts(a, { withFileTypes: !0 });
    for (let d of c) {
      let m = re(a, d.name);
      if (d.isSymbolicLink()) {
        let f = await Xi(m),
          g = Kl(a, f);
        if (!n(g))
          throw new D(
            "install_failed",
            `refusing extracted Computer Use Helper: symlink escapes staging (${m} -> ${f})`,
          );
      } else d.isDirectory() && s.push(m);
    }
  }
}
i(kP, "assertNoSymlinkEscape");
async function SP(e, t) {
  (await vP(e), await _e(ne.ditto, ["-x", "-k", e, t]), await kP(t));
}
i(SP, "defaultExtractZip");
async function PP(e) {
  process.platform === "darwin" &&
    (await _e(ne.xattr, ["-dr", "com.apple.quarantine", e]).catch((t) => {
      let n = te(t);
      if (
        !/No such xattr|No such file|No such file or directory|not found/iu.test(
          n,
        )
      )
        throw t;
    }));
}
i(PP, "defaultClearQuarantine");
async function Gl(e, t) {
  await t.dependencies.clearQuarantine(e).catch((n) => {
    t.logger?.warn(
      void 0,
      `cua helper installed and verified, but quarantine cleanup failed: ${te(n)}`,
    );
  });
}
i(Gl, "clearHelperQuarantine");
async function Xl(e) {
  let t = await ts(e, { withFileTypes: !0 });
  for (let n of t) {
    let s = re(e, n.name);
    if (!n.isDirectory()) continue;
    if (n.name === q) return s;
    let a = await Xl(s);
    if (a) return a;
  }
  return null;
}
i(Xl, "findHelperAppRecursively");
async function _P(e, t) {
  let n = LS(t);
  await es(n, { recursive: !0 });
  let s = re(n, `.${q}.backup-${process.pid}-${Date.now()}`),
    a = !1;
  Qi(t) &&
    (await $r(s, { recursive: !0, force: !0 }), await Ji(t, s), (a = !0));
  try {
    await Ji(e, t);
  } catch (c) {
    throw (
      a && (await $r(t, { recursive: !0, force: !0 }), await Ji(s, t)),
      new D("install_failed", `Failed to promote ${q} into ${t}: ${te(c)}`, {
        cause: c,
      })
    );
  }
  a && (await $r(s, { recursive: !0, force: !0 }));
}
i(_P, "promoteHelperApp");
async function ql(e, t) {
  await DS(
    re(e.installRoot, jS),
    `${JSON.stringify({ provider: "zcode-cua-helper", version: e.version, buildId: t.bundleInfo.buildId, platform: e.platformKey, source: e.source.kind === "bundled" ? "bundled:zcode-app" : Hr(e.source.url), bundleId: t.bundleInfo.bundleId, displayName: NS(e.appPath, ".app"), teamIdentifier: t.codesign?.teamIdentifier ?? null, verificationMode: t.mode, releaseEligible: t.releaseEligible }, null, 2)}
`,
    "utf8",
  );
}
i(ql, "writeInstallMeta");
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
import { join as CP } from "node:path";
var ule = CP("computer-use", "run");
r();
o();
var due = Qd + 2e3;
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
import { dirname as Gue, join as TP, resolve as que } from "node:path";
var Kue = ["zcode.json", TP(".zcode", "config.json")];
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var Yl = Object.freeze(["1", "true", "yes", "on"]);
r();
o();
var Gr = "broker_not_accepting",
  qr = "permission_refresh_in_progress",
  Kr = "permission_refresh_invalid",
  Vr = "broker_response_ambiguous",
  Jr = "caller_timeout",
  Xr = "restart_deferred_active_turn",
  AP = Object.freeze({
    [Gr]: !0,
    [qr]: !0,
    [Kr]: !1,
    [Vr]: !1,
    [Jr]: !0,
    [Xr]: !0,
  }),
  MP = Object.freeze([Gr, qr, Kr, Vr, Jr, Xr]);
r();
o();
var is =
    "The ZCode Computer Use is starting up and its permission broker socket is not accepting connections yet. Retry the same tool call after a brief wait.",
  ss =
    "The Helper may have accepted this action, but its response was lost. Do not replay it automatically; observe the target state first.",
  mn =
    "ZCode is still refreshing the permission Helper. Retry after the refresh finishes.",
  gn =
    "ZCode's permission refresh marker is invalid or unsafe. ZCode must recreate the marker in its private runtime directory.",
  xP = Object.freeze({
    broker_not_accepting: is,
    broker_response_ambiguous: ss,
    permission_refresh_in_progress: mn,
    permission_refresh_invalid: gn,
  });
r();
o();
r();
o();
r();
o();
var DP = 30 * 1e3,
  NP = 5 * 1e3;
r();
o();
r();
o();
var BP = Object.freeze({ verifySocketPeer(e, t) {} });
r();
o();
r();
o();
import { AsyncLocalStorage as UP } from "node:async_hooks";
var tme = new UP();
r();
o();
var Sme = Object.freeze(new Set(["schema", "kind", "deadlineEpochMs"]));
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
function ou(e) {
  switch (e.trim().toLowerCase()) {
    case "amd64":
    case "x86_64":
    case "x64":
      return "x64";
    case "aarch64":
    case "arm64":
      return "arm64";
    default:
      return e.trim();
  }
}
i(ou, "normalizeCuaHelperArch");
function iu(e) {
  return [...new Set(e.map(ou).filter(Boolean))];
}
i(iu, "normalizeCuaHelperArchs");
function a_(e) {
  let t = e.dependencies?.readExecutableArchs ?? Lr.readExecutableArchs;
  return {
    ...e,
    dependencies: {
      ...e.dependencies,
      readExecutableArchs: i(
        async (n) => iu(await t(n)),
        "readExecutableArchs",
      ),
    },
  };
}
i(a_, "canonicalizeCuaHelperInstallerOptions");
r();
o();
var $he = l
  .object({
    projectId: l.string().min(1).nullable().optional(),
    hostId: l.string().min(1).optional(),
    draftId: l.string().uuid().optional(),
    reuseDraft: l.boolean().optional(),
    task: l
      .object({ taskId: l.string().min(1), workspaceKey: l.string().min(1) })
      .strict()
      .optional(),
  })
  .strict()
  .refine(
    (e) =>
      (!e.task || (e.projectId === void 0 && e.draftId === void 0)) &&
      (!e.draftId || !e.projectId) &&
      (!e.reuseDraft || !!e.draftId),
    "Task navigation cannot prepare a draft",
  );
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var p_ = [
    "status",
    "new",
    "workspace",
    "model",
    "mode",
    "thoughtLevel",
    "reply",
  ],
  cu = ["help", ...p_, "bind"];
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var k_ = 1e3,
  S_ = 60 * k_,
  P_ = 60 * S_,
  Uke = 24 * P_;
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var M_e = T("bots");
var x_e = 5 * 1024 * 1024;
var O_e = 2 * 6e4,
  D_e = 2 * 6e4,
  N_e = 5 * 6e4;
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var b_ = "/api/biz/customer/getCustomerInfo";
var eCe = {
  id: J,
  displayName: "BigModel",
  enabled: !0,
  order: 0,
  authorizeUrl: "https://bigmodel.cn/login",
  tokenUrl: "https://zcode.z.ai/api/v1/oauth/token",
  userinfoUrl: Ft({ ZCODE_ENV: "production" }, b_),
  appId: "zcode",
  redirectUri: "zcode://oauth/callback",
};
r();
o();
r();
o();
r();
o();
var ECe = 3600 * 1e3;
r();
o();
r();
o();
var LCe = T("bigmodelOAuth");
r();
o();
r();
o();
var $Ce = 300 * 1e3;
r();
o();
import { Buffer as E_ } from "node:buffer";
var yn = "oauth:active_provider",
  Yr = "oauth:login_attribution",
  wn = "zcodejwttoken",
  T_ = [J, "zai"],
  R_ = T("oauthCredentialRepo");
function Qr(e) {
  return `oauth:${e}:access_token`;
}
i(Qr, "accessTokenKey");
function eo(e) {
  return `oauth:${e}:refresh_token`;
}
i(eo, "refreshTokenKey");
function to(e) {
  return `oauth:${e}:user_info`;
}
i(to, "userInfoKey");
function A_(e = []) {
  let t = new Set(T_);
  for (let n of e) t.add(n);
  return [...t];
}
i(A_, "collectKnownOAuthProviderIds");
function M_(e) {
  return e.length >= 8 &&
    e[0] === 137 &&
    e[1] === 80 &&
    e[2] === 78 &&
    e[3] === 71
    ? "image/png"
    : e.length >= 3 && e[0] === 255 && e[1] === 216 && e[2] === 255
      ? "image/jpeg"
      : e.length >= 6 && e.toString("ascii", 0, 3) === "GIF"
        ? "image/gif"
        : e.length >= 12 &&
            e.toString("ascii", 0, 4) === "RIFF" &&
            e.toString("ascii", 8, 12) === "WEBP"
          ? "image/webp"
          : "image/png";
}
i(M_, "inferBase64ImageMimeType");
function x_(e) {
  let t = e.replace(/\s/g, "");
  if (t.length < 16 || !/^[A-Za-z0-9+/]+={0,2}$/.test(t)) return null;
  let n = E_.from(t, "base64");
  return n.length === 0 ||
    n.toString("base64").replace(/=+$/, "") !== t.replace(/=+$/, "")
    ? null
    : `data:${M_(n)};base64,${t}`;
}
i(x_, "toBase64ImageDataUrl");
function O_(e) {
  let t = e?.trim();
  if (!t) return;
  if (/^data:image\/[^;]+;base64,/i.test(t) || /^https?:\/\//i.test(t))
    return t;
  let n = x_(t);
  return n || t;
}
i(O_, "normalizeStoredZaiAvatarUrl");
function D_(e) {
  let t = typeof e.user_id == "string" ? e.user_id : "unknown",
    n = typeof e.name == "string" ? e.name.trim() : "",
    s = typeof e.email == "string" ? e.email : "",
    a = n || s || t,
    c = O_(typeof e.avatar == "string" ? e.avatar : void 0);
  return !n && !s && t === "unknown"
    ? null
    : {
        id: t,
        username: a,
        displayName: a,
        ...(c ? { avatarUrl: c } : {}),
        rawProfile: e,
      };
}
i(D_, "toOAuthUserProfileFromRawZaiUser");
var xt = class {
  constructor(t, n = {}) {
    this.credentialService = t;
    ((this.knownProviderIds = A_(n.providerIds)),
      (this.onCorruptOAuthSessionCleared = n.onCorruptOAuthSessionCleared));
  }
  credentialService;
  static {
    i(this, "OAuthCredentialRepo");
  }
  knownProviderIds;
  onCorruptOAuthSessionCleared;
  async getActiveProvider() {
    return this.loadActiveProvider();
  }
  async setActiveProvider(t) {
    await this.saveActiveProvider(t);
  }
  async loadActiveProvider() {
    try {
      return await this.credentialService.load(yn);
    } catch (t) {
      if (!ke(t)) throw t;
      return (await this.clearCorruptOAuthSession(), null);
    }
  }
  async saveActiveProvider(t) {
    if (!t) {
      await this.credentialService.delete(yn);
      return;
    }
    await this.credentialService.save(yn, t);
  }
  async loadActiveTokenSet() {
    let t = await this.loadActiveProvider();
    if (!t) return null;
    let n = await this.loadTokenSet(t);
    return n || null;
  }
  async saveActiveTokenSet(t) {
    let n = await this.loadActiveProvider();
    if (!n)
      throw new Error(
        "\u4FDD\u5B58\u5F53\u524D\u767B\u5F55 token \u524D\u7F3A\u5C11 active provider",
      );
    await this.saveTokenSet(n, t);
  }
  async loadActiveUserProfile() {
    let t = await this.loadActiveProvider();
    if (!t) return null;
    let n = await this.loadUserProfile(t);
    return n || null;
  }
  async saveActiveUserProfile(t) {
    let n = await this.loadActiveProvider();
    if (!n)
      throw new Error(
        "\u4FDD\u5B58\u5F53\u524D\u767B\u5F55 user \u524D\u7F3A\u5C11 active provider",
      );
    await this.saveUserProfile(n, t);
  }
  async saveLoginAttribution(t) {
    let n = Object.fromEntries(
      Object.entries(t).flatMap(([s, a]) => {
        let c = typeof a == "string" ? a.trim() : "";
        return c ? [[s, c]] : [];
      }),
    );
    Object.keys(n).length !== 0 &&
      (await this.credentialService.save(Yr, JSON.stringify(n)));
  }
  async loadLoginAttribution() {
    let t;
    try {
      t = await this.credentialService.load(Yr);
    } catch (n) {
      if (!ke(n)) throw n;
      return null;
    }
    if (!t) return null;
    try {
      let n = JSON.parse(t),
        s = n.params && typeof n.params == "object" ? n.params : n,
        a = Object.fromEntries(
          Object.entries(s).flatMap(([c, d]) =>
            (c === "channel_id" ||
              c === "utm_source" ||
              c === "utm_campaign") &&
            typeof d == "string" &&
            d.trim()
              ? [[c, d.trim()]]
              : [],
          ),
        );
      return Object.keys(a).length === 0
        ? (await this.credentialService.delete(Yr), null)
        : a;
    } catch {
      return (await this.credentialService.delete(Yr), null);
    }
  }
  async clearActiveSession() {
    let t = await this.loadActiveProvider();
    (t && (await this.clearProvider(t)),
      await this.credentialService.delete(yn));
  }
  async loadTokenSet(t) {
    try {
      let n = await this.credentialService.load(Qr(t));
      if (!n) return null;
      let s = await this.credentialService.load(eo(t)),
        a =
          t === "zai" || t === J ? await this.credentialService.load(wn) : null;
      return {
        accessToken: n,
        ...(s ? { refreshToken: s } : {}),
        ...(a ? { zcodeJwtToken: a } : {}),
      };
    } catch (n) {
      if (!ke(n)) throw n;
      return (await this.clearCorruptOAuthSession(), null);
    }
  }
  async loadCachedSessionTokens(t) {
    try {
      return await Promise.all(
        [wn, Qr(t)].map(async (n) => ({
          key: n,
          value: (await this.credentialService.load(n))?.trim() ?? "",
        })),
      );
    } catch (n) {
      if (!ke(n)) throw n;
      return (await this.clearCorruptOAuthSession(), null);
    }
  }
  async saveTokenSet(t, n) {
    (await this.credentialService.save(Qr(t), n.accessToken),
      n.refreshToken
        ? await this.credentialService.save(eo(t), n.refreshToken)
        : await this.credentialService.delete(eo(t)),
      (t === "zai" || t === J) &&
        (n.zcodeJwtToken
          ? await this.credentialService.save(wn, n.zcodeJwtToken)
          : await this.credentialService.delete(wn)));
  }
  async loadUserProfile(t) {
    return this.loadUserProfileFromKey(to(t), t);
  }
  async loadUserProfileFromKey(t, n) {
    let s;
    try {
      s = await this.credentialService.load(t);
    } catch (a) {
      if (!ke(a)) throw a;
      return (await this.clearCorruptOAuthSession(), null);
    }
    if (!s) return null;
    try {
      let a = JSON.parse(s);
      if (
        typeof a.id == "string" &&
        typeof a.username == "string" &&
        typeof a.displayName == "string"
      ) {
        let c = typeof a.avatarUrl == "string" ? a.avatarUrl : void 0,
          d =
            typeof a.rawProfile == "object" && a.rawProfile !== null
              ? a.rawProfile
              : void 0;
        return {
          id: a.id,
          username: a.username,
          displayName: a.displayName,
          ...(c ? { avatarUrl: c } : {}),
          ...(d ? { rawProfile: d } : {}),
        };
      }
      if (n === "zai" && typeof a == "object" && a !== null) {
        let c = D_(a);
        if (c) return c;
      }
    } catch {}
    return null;
  }
  async saveUserProfile(t, n) {
    let s = t === "zai" && n.rawProfile ? n.rawProfile : n;
    await this.credentialService.save(to(t), JSON.stringify(s));
  }
  async clearUserProfile(t) {
    await this.credentialService.delete(to(t));
  }
  async clearProvider(t) {
    (await this.credentialService.delete(Qr(t)),
      await this.credentialService.delete(eo(t)),
      await this.credentialService.delete(to(t)),
      N_(t) && (await this.credentialService.delete(wn)));
  }
  async clearAll(t) {
    for (let n of t) await this.clearProvider(n);
    await this.saveActiveProvider(null);
  }
  async clearCorruptOAuthSession() {
    for (let t of this.knownProviderIds) await this.clearProvider(t);
    await this.credentialService.delete(yn);
    try {
      await this.onCorruptOAuthSessionCleared?.(this.knownProviderIds);
    } catch (t) {
      R_.warn(
        void 0,
        "clear derived provider keys after corrupt OAuth session failed",
        t,
      );
    }
  }
};
function N_(e) {
  return e === "zai" || e === J;
}
i(N_, "shouldClearZcodeJwtOnLogout");
r();
o();
var zIe = 300 * 1e3,
  ZIe = 30 * 1e3;
var HIe = T("oauthService");
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var F_ = l.object({
    haiku: l.string(),
    sonnet: l.string(),
    opus: l.string(),
    reasoning: l.string(),
  }),
  Pu = l.object({ claude: F_.optional() }).catchall(l.unknown()),
  _u = l.enum(["anthropic", "openai", "responses", "gemini"]),
  vn = l.enum([
    "anthropic-messages",
    "openai-chat-completions",
    "openai-responses",
  ]),
  oe = l.enum(["anthropic", "openai", "openai-compatible"]),
  no = l.enum(["china-llm-zcode-dev"]),
  ku = l.enum(["text", "image", "video", "audio", "pdf"]),
  Su = l.object({ path: l.array(l.string().min(1)).min(1) }),
  B_ = l.object({
    set: l.array(Su.extend({ value: l.unknown() })).optional(),
    unset: l.array(Su).optional(),
  }),
  ro = l.object({
    defaultLevel: l.string().min(1).optional(),
    levels: l.record(l.string().min(1), l.partialRecord(oe, B_)),
  }),
  Cu = l.partialRecord(oe, l.string()),
  U_ = l.object({ baseURL: l.string(), paths: Cu }),
  Iu = l.object({
    id: l.string().min(1),
    name: l.string().optional(),
    kinds: l.array(oe),
    defaultKind: oe.optional(),
    modelIdByKind: l.partialRecord(oe, l.string().min(1)).optional(),
    modalities: l.object({ input: l.array(ku), output: l.array(ku) }),
    contextWindow: l.number().int().positive(),
    maxOutputTokens: l.number().int().positive().optional(),
    reasoning: ro.optional(),
    priority: l.number().finite().optional(),
  }),
  W_ = l.object({
    id: l.string().min(1),
    name: l.string().min(1),
    endpoints: U_,
    defaultKind: oe.optional(),
    models: l.array(Iu),
  }),
  pbe = l.object({
    schemaVersion: l.literal("zcode.model-providers.v1"),
    providers: l.array(W_),
  }),
  j_ = Iu.extend({
    disabledReason: l.string().optional(),
    supportsTools: l.boolean().optional(),
    supportsStructuredOutput: l.boolean().optional(),
    modified: l.boolean().optional(),
    deleted: l.boolean().optional(),
  }),
  kn = l.enum(["builtin", "models-dev", "custom", "workspace"]),
  Sn = l.enum([
    "coding_plan_not_authenticated",
    "coding_plan_not_connected",
    "coding_plan_auth_failed",
    "coding_plan_not_entitled",
    "oauth_provider_inactive",
  ]),
  bu = l.object({
    anthropic: l.string().default(""),
    openai: l.string().default(""),
    gemini: l.string().default(""),
  }),
  oo = bu.extend({
    anthropic: l.string().optional(),
    openai: l.string().optional(),
    gemini: l.string().optional(),
    baseURL: l.string().optional(),
    paths: Cu.optional(),
  }),
  $_ = l.object({
    id: l.string(),
    name: l.string(),
    enabled: l.boolean().optional(),
    systemDisabledReason: Sn.optional(),
    endpoints: bu,
    apiFormat: vn.optional(),
    source: kn.optional(),
    modelsDevProviderId: l.string().optional(),
    apiKeyRequired: l.boolean().optional(),
    headers: l.record(l.string(), l.string()).optional(),
    logoUrl: l.string().optional(),
    apiKey: l.string(),
    apiKeyUrl: l.string().optional(),
    models: l.array(l.string()).default([]),
    modelDisplayNames: l.record(l.string(), l.string()).optional(),
    modelSupportedFormats: l.record(l.string(), l.array(_u)).optional(),
    providerMappings: Pu.optional(),
    createdAt: l.number(),
    updatedAt: l.number(),
  }),
  z_ = l.array($_),
  Z_ = l.object({
    id: l.string(),
    name: l.string(),
    enabled: l.boolean().optional(),
    systemDisabledReason: Sn.optional(),
    endpoints: oo,
    apiFormat: vn.optional(),
    source: kn.optional(),
    catalogSourceId: no.optional(),
    catalogProviderId: l.string().optional(),
    modelsDevProviderId: l.string().optional(),
    apiKeyRequired: l.boolean().optional(),
    headers: l.record(l.string(), l.string()).optional(),
    logoUrl: l.string().optional(),
    apiKey: l.string(),
    apiKeyUrl: l.string().optional(),
    defaultKind: oe.optional(),
    models: l.array(j_).default([]),
    modelDisplayNames: l.record(l.string(), l.string()).optional(),
    modelSupportedFormats: l.record(l.string(), l.array(_u)).optional(),
    providerMappings: Pu.optional(),
    createdAt: l.number(),
    updatedAt: l.number(),
  }),
  H_ = l.array(Z_),
  fbe = l.object({
    schemaVersion: l.literal("zcode.model-providers.v2"),
    providers: H_,
  }),
  mbe = l.object({
    providerIds: l.array(l.string().min(1)),
    updatedAt: l.number().int().nonnegative(),
  });
r();
o();
r();
o();
r();
o();
var Abe = l.object({
    code: l.number().optional(),
    success: l.boolean().optional(),
    data: l.unknown().optional(),
  }),
  Mbe = l.object({
    productId: l.string().optional(),
    productName: l.string().optional(),
    status: l.string(),
    inCurrentPeriod: l.boolean(),
    autoRenew: l.union([l.number(), l.boolean()]).optional(),
    nextRenewTime: l.string().optional(),
    valid: l.string().optional(),
    billingCycle: l.string().optional(),
  }),
  xbe = l.object({
    hasSubscription: l.boolean(),
    status: l.string().nullish(),
    memberGrantStatus: l.string().nullish(),
    productId: l.string().nullish(),
    productName: l.string().nullish(),
    subscribeEndTime: l.string().nullish(),
    subscribePeriod: l.string().nullish(),
  });
r();
o();
r();
o();
var Hbe = ho(process.env).zcodePlanBillingBalanceUrl;
r();
o();
r();
o();
var hEe = 3600 * 1e3;
var yEe = T("codingPlanSubscription");
var wEe = Object.freeze({ revision: 0, providers: Object.freeze([]) });
var OEe = T("coding-plan-availability");
r();
o();
r();
o();
r();
o();
var pTe = T("provider-runtime");
r();
o();
var ls = [
  "oauth:active_provider",
  "oauth:zai:access_token",
  "oauth:zai:refresh_token",
  "oauth:zai:user_info",
  "oauth:bigmodel:access_token",
  "oauth:bigmodel:refresh_token",
  "oauth:bigmodel:user_info",
  "zcodejwttoken",
];
r();
o();
var MTe = new Set(ls);
r();
o();
r();
o();
var ZTe = T("account-provider-team-plan-request-key");
r();
o();
var QTe = T("project-access-token");
r();
o();
var iRe = T("account-project-token");
r();
o();
r();
o();
r();
o();
var uRe = Dn.map((e) => `'${e}'`).join(", ");
import { createRequire as lC } from "node:module";
var uC = lC(import.meta.url),
  { backup: bRe, DatabaseSync: ERe } = uC("node:sqlite");
r();
o();
var XRe = T("source-server-workspace-identity");
r();
o();
import { createRequire as mC } from "node:module";
var gC = mC(import.meta.url),
  { DatabaseSync: iAe } = gC("node:sqlite");
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var FAe = T("official-mcp");
var qAe = T("usage-stats"),
  wC = l.object({
    used: l.number().finite(),
    limit: l.number().finite(),
    remaining: l.number().finite(),
  }),
  vC = l.object({
    server_time: l.number().finite(),
    next_refresh_at: l.number().finite().optional(),
    level: l.string().optional(),
    total_usage: wC.optional(),
  }),
  KAe = l.object({
    code: l.number(),
    msg: l.string().optional(),
    data: vC.optional().nullable(),
  });
var wMe = T("usage-stats");
var vMe = l.object({
    code: l.number(),
    msg: l.string().optional(),
    data: l.unknown().optional(),
  }),
  Au = l.object({ expire_at: l.number().finite().positive() }),
  Mu = l.object({ used_at: l.number().finite().positive() }),
  kMe = l.object({
    available_five_hour_resets: l.array(Au),
    available_week_resets: l.array(Au),
    latest_five_hour_reset_history: Mu.nullable(),
    latest_week_reset_history: Mu.nullable(),
    has_unread_history: l.boolean(),
  }),
  SMe = l.object({ used: l.literal(!0) }),
  PMe = l.object({ granted: l.literal(!0) }),
  _Me = l.object({
    granted: l.literal(!1),
    next_try_at: l.number().int().positive(),
  });
var MMe = 5 * 6e4;
r();
o();
r();
o();
var SC = 1440 * 60 * 1e3;
function xu(e) {
  let { categoryId: t, candidates: n, context: s, now: a } = e;
  if (vt(t) === "none") return { targets: [], skippedCount: n.length };
  let c = n.filter(
      (m) => ir(m.relativePath, s).categoryId === t && !hc(m.relativePath),
    ),
    d = c;
  return (
    t === "logs"
      ? (d = c.filter((m) => !PC(m.mtimeMs, a)))
      : t === "subagentTranscripts" && (d = _C(c, n, a)),
    { targets: d, skippedCount: n.length - d.length }
  );
}
i(xu, "planStorageClean");
function PC(e, t) {
  let n = new Date(e),
    s = new Date(t);
  return (
    n.getFullYear() === s.getFullYear() &&
    n.getMonth() === s.getMonth() &&
    n.getDate() === s.getDate()
  );
}
i(PC, "isSameLocalDay");
function _C(e, t, n) {
  let s = new Map(),
    a = i((c) => c.split("/").slice(0, 3).join("/"), "sessionKey");
  for (let c of t) {
    let d = a(c.relativePath);
    s.set(d, Math.max(s.get(d) ?? 0, c.mtimeMs));
  }
  return e.filter((c) => n - (s.get(a(c.relativePath)) ?? 0) > SC);
}
i(_C, "filterInactiveSessionDirs");
r();
o();
function Ou(e) {
  return e instanceof Error && e.name === "AbortError";
}
i(Ou, "isAbortError");
function Du(e) {
  let { jobId: t, roots: n, runner: s, now: a, throttleMs: c, emit: d } = e,
    m = e.setTimer ?? ((x, _) => setTimeout(x, _)),
    f = e.clearTimer ?? ((x) => clearTimeout(x)),
    g = new AbortController(),
    h = a(),
    y = {
      jobId: t,
      status: "scanning",
      startedAt: h,
      roots: n.map((x) => ({
        id: x.id,
        path: x.path,
        volume: null,
        bytes: 0,
        fileCount: 0,
        categories: [],
      })),
      errors: [],
    },
    S = -1 / 0,
    v = null,
    k = !1,
    M = i(() => {
      ((v = null), (S = a()), d(y));
    }, "flush"),
    R = i((x) => {
      if (k) return;
      y = { ...y, roots: x.roots, errors: x.errors };
      let _ = a() - S;
      _ >= c ? M() : v == null && (v = m(M, c - _));
    }, "onProgress"),
    w = i(
      (x) => ((k = !0), v != null && (f(v), (v = null)), (y = x), d(y), y),
      "settle",
    ),
    C = s
      .run({ roots: n, signal: g.signal, onProgress: R })
      .then((x) =>
        w({
          ...y,
          roots: x.roots,
          errors: x.errors,
          status: g.signal.aborted ? "cancelled" : "complete",
          finishedAt: a(),
        }),
      )
      .catch((x) =>
        w({
          ...y,
          status: Ou(x) || g.signal.aborted ? "cancelled" : "failed",
          finishedAt: a(),
          errors: Ou(x) ? y.errors : [...y.errors, { path: "", code: CC(x) }],
        }),
      );
  return { jobId: t, done: C, cancel: i(() => g.abort(), "cancel") };
}
i(Du, "createScanJob");
function CC(e) {
  return e && typeof e == "object" && "code" in e && typeof e.code == "string"
    ? e.code
    : e instanceof Error
      ? e.name
      : "UNKNOWN";
}
i(CC, "errorCode");
var IC = 300;
function bC(e) {
  let t = e.now ?? Date.now,
    n = e.progressThrottleMs ?? IC,
    s = new X(),
    a = null,
    c = null,
    d = null,
    m = 0;
  function f() {
    (a?.cancel(), (a = null));
  }
  i(f, "cancelCurrentJob");
  async function g(h) {
    let y = (await e.roots.resolveRoots()).find((S) => S.id === h);
    if (!y) throw new Error(`storage root not available: ${h}`);
    return y;
  }
  return (
    i(g, "resolveRoot"),
    {
      async startScan() {
        f();
        let h = `scan-${++m}`;
        d = h;
        let y = await e.roots.resolveRoots(),
          S = Du({
            jobId: h,
            roots: y,
            runner: e.scanRunner,
            now: t,
            throttleMs: n,
            emit: i((v) => {
              (h === d && (c = v), s.fire(v));
            }, "emit"),
          });
        return (
          (a = S),
          S.done.then(() => {
            a?.jobId === h && (a = null);
          }),
          { jobId: h }
        );
      },
      async cancelScan(h) {
        a?.jobId === h && f();
      },
      async getSnapshot() {
        return c;
      },
      onScanProgress: s.event,
      async clean(h) {
        if (vt(h.categoryId) === "none")
          throw new Error(`storage category is not cleanable: ${h.categoryId}`);
        f();
        let y = await g(h.rootId),
          S = yc(h.categoryId),
          v = await e.cleaner.listCandidates(y.path, S),
          k = xu({
            categoryId: h.categoryId,
            candidates: v,
            context: {
              rootId: y.id,
              hasCustomDataBaseDir: y.hasCustomDataBaseDir,
            },
            now: t(),
          });
        return {
          ...(await e.cleaner.deleteFiles(y.path, k.targets, {
            keepDirectories: S.map((R) => R.prefix),
          })),
          skippedCount: k.skippedCount,
        };
      },
      dispose() {
        (f(), s.dispose());
      },
    }
  );
}
i(bC, "createStorageService");
r();
o();
import {
  lstat as EC,
  readdir as TC,
  rm as RC,
  rmdir as AC,
} from "node:fs/promises";
import {
  dirname as Nu,
  join as _n,
  relative as MC,
  sep as xC,
} from "node:path";
var OC = 8;
function DC(e) {
  return e && typeof e == "object" && "code" in e && typeof e.code == "string"
    ? e.code
    : "UNKNOWN";
}
i(DC, "errorCode");
async function NC(e, t) {
  let n = _n(e, t),
    s;
  try {
    s = await TC(n);
  } catch {
    return [];
  }
  let a = [];
  for (let c of s)
    try {
      let d = await EC(_n(n, c));
      if (!d.isFile()) continue;
      a.push({ relativePath: `${t}/${c}`, bytes: d.size, mtimeMs: d.mtimeMs });
    } catch {}
  return a;
}
i(NC, "listShallow");
async function LC(e, t) {
  let n = [];
  return (
    await ar({
      rootPath: _n(e, t),
      onEntry: i(
        (s) => n.push({ ...s, relativePath: `${t}/${s.relativePath}` }),
        "onEntry",
      ),
    }),
    n
  );
}
i(LC, "listRecursive");
async function FC(e, t, n) {
  let s = new Set();
  for (let c of t) {
    let d = Nu(c);
    for (; d && d !== "." && !n.has(d);) (s.add(d), (d = Nu(d)));
  }
  let a = [...s].sort((c, d) => d.split("/").length - c.split("/").length);
  for (let c of a) await AC(_n(e, c)).catch(() => {});
}
i(FC, "pruneEmptyParents");
function BC() {
  return {
    async listCandidates(e, t) {
      let n = await Promise.all(
          t.map((a) => (a.recursive ? LC(e, a.prefix) : NC(e, a.prefix))),
        ),
        s = new Map();
      for (let a of n.flat()) s.set(Yt(a.relativePath), a);
      return [...s.values()];
    },
    async deleteFiles(e, t, n) {
      let s = { deletedCount: 0, freedBytes: 0, failures: [] },
        a = [],
        c = [...t],
        d = i(async () => {
          for (let m = c.shift(); m; m = c.shift()) {
            let f = Yt(m.relativePath),
              g = _n(e, f),
              h = MC(e, g);
            if (h.startsWith("..") || h.split(xC).includes("..")) {
              s.failures.push({ path: f, code: "EOUTSIDE" });
              continue;
            }
            try {
              (await RC(g, { force: !1 }),
                (s.deletedCount += 1),
                (s.freedBytes += m.bytes),
                a.push(f));
            } catch (y) {
              s.failures.push({ path: f, code: DC(y) });
            }
          }
        }, "worker");
      return (
        await Promise.all(Array.from({ length: OC }, d)),
        await FC(e, a, new Set(n.keepDirectories)),
        s
      );
    },
  };
}
i(BC, "createFsStorageCleaner");
r();
o();
import { join as Lu, resolve as Fu } from "node:path";
var Bu = ".zcode";
function Uu(e) {
  let t = Fu(e.homeDir),
    n = Fu(e.dataBaseDir),
    s = n !== t,
    a = [{ id: "home", path: Lu(t, Bu), hasCustomDataBaseDir: s }];
  return (
    s &&
      a.push({ id: "dataBaseDir", path: Lu(n, Bu), hasCustomDataBaseDir: s }),
    a
  );
}
i(Uu, "resolveStorageRoots");
function UC(e) {
  return {
    resolveRoots: i(
      async () =>
        Uu({ homeDir: e.getHomeDir(), dataBaseDir: e.getDataBaseDir() }),
      "resolveRoots",
    ),
  };
}
i(UC, "createStorageRootsResolver");
r();
o();
r();
o();
r();
o();
var Axe = 3600 * 1e3;
r();
o();
r();
o();
var jC = Oe(process.env, "/api/v1/client/scenes"),
  $C = mt(process.env);
r();
o();
import { homedir as ZC } from "node:os";
import {
  basename as oOe,
  dirname as iOe,
  isAbsolute as sOe,
  join as Ot,
  relative as aOe,
  resolve as cOe,
  sep as dOe,
} from "node:path";
import { parse as uOe } from "yaml";
r();
o();
r();
o();
var gOe = Ot(Hu(), ".zcode", "v2"),
  HC = Ot(Hu(), ".zcode", "cli"),
  hOe = Ot(HC, "config.json");
var yOe = Ot(".zcode-plugin", "plugin.json"),
  wOe = Ot(".claude-plugin", "plugin.json"),
  vOe = Ot(".codex-plugin", "plugin.json");
function Hu() {
  let e = process.env.HOME?.trim() || process.env.USERPROFILE?.trim();
  return e && e.length > 0 ? e : ZC();
}
i(Hu, "resolveUserHomeDir");
r();
o();
import { parse as YOe } from "yaml";
r();
o();
import { promisify as VC } from "node:util";
import { createGunzip as LOe, gzip as JC } from "node:zlib";
r();
o();
r();
o();
var UOe = VC(JC),
  XC = 512,
  WOe = XC * 2;
r();
o();
var oDe = 20 * 1024 * 1024;
r();
o();
r();
o();
r();
o();
import { promisify as Gu } from "node:util";
import { gunzip as tI, gzip as nI } from "node:zlib";
r();
o();
var SDe = Gu(nI),
  PDe = Gu(tI),
  rI = 512,
  _De = rI * 2;
var NDe = 50 * 1024 * 1024;
r();
o();
r();
o();
r();
o();
import {
  basename as zNe,
  dirname as ZNe,
  isAbsolute as HNe,
  join as us,
  relative as GNe,
  resolve as qNe,
} from "node:path";
r();
o();
r();
o();
import { parse as oNe, stringify as iNe } from "yaml";
r();
o();
r();
o();
r();
o();
var hNe = T("subagentRuntimeConfig");
var ENe = T("subagentRuntimeConfig");
var nLe = T("subagents");
var rLe = [
  us(".zcode-plugin", "plugin.json"),
  us(".claude-plugin", "plugin.json"),
  us(".codex-plugin", "plugin.json"),
];
r();
o();
import {
  basename as gLe,
  dirname as hLe,
  isAbsolute as yLe,
  join as ps,
  relative as wLe,
  resolve as vLe,
  sep as kLe,
} from "node:path";
r();
o();
var ILe = ps(".zcode-plugin", "plugin.json"),
  bLe = ps(".claude-plugin", "plugin.json"),
  ELe = ps(".codex-plugin", "plugin.json"),
  qu = {
    agentSource: "zcodeAgent",
    directorySource: "zcode",
    userDirectorySegments: [".zcode", "commands"],
    workspaceDirectorySegments: [".zcode", "commands"],
    fileExtension: ".md",
    format: "markdown",
    namespaceSeparator: "/",
    supportsArgumentHint: !0,
  };
var TLe = [
  qu,
  {
    ...qu,
    directorySource: "agents",
    userDirectorySegments: [".agents", "commands"],
    workspaceDirectorySegments: [".agents", "commands"],
  },
];
r();
o();
r();
o();
r();
o();
var Cn = l.number().finite().positive(),
  sI = l
    .object({
      type: l.literal("process"),
      command: l.string().min(1),
      enabled: l.boolean().optional(),
      args: l.array(l.string()).optional(),
      timeoutMs: Cn.optional(),
      statusMessage: l.string().min(1).optional(),
    })
    .passthrough(),
  aI = l
    .object({
      type: l.literal("command"),
      command: l.string().min(1),
      enabled: l.boolean().optional(),
      async: l.boolean().optional(),
      shell: l.union([l.literal(!0), l.string().min(1)]).optional(),
      timeout: Cn.optional(),
      timeoutMs: Cn.optional(),
      statusMessage: l.string().min(1).optional(),
    })
    .passthrough(),
  at = l
    .object({
      matcher: l.string().min(1).optional(),
      hooks: l.array(l.discriminatedUnion("type", [sI, aI])).min(1),
    })
    .strict(),
  Ku = l
    .object({
      enabled: l.boolean().optional(),
      timeoutMs: Cn.optional(),
      maxOutputBytes: Cn.optional(),
      events: l
        .object({
          SessionStart: l.array(at).optional(),
          UserPromptSubmit: l.array(at).optional(),
          PreToolUse: l.array(at).optional(),
          PermissionRequest: l.array(at).optional(),
          PostToolUse: l.array(at).optional(),
          PostToolUseFailure: l.array(at).optional(),
          Stop: l.array(at).optional(),
        })
        .strict()
        .optional(),
    })
    .strict();
r();
o();
r();
o();
var cI = 1,
  dI = l.enum([
    "SessionStart",
    "UserPromptSubmit",
    "PreToolUse",
    "PermissionRequest",
    "PostToolUse",
    "PostToolUseFailure",
    "Stop",
  ]),
  io = l.string().trim().min(1),
  Vu = l.string().regex(/^[a-f0-9]{64}$/u),
  fs = l.number().int().nonnegative(),
  lI = l
    .object({
      workspaceIdentity: io,
      hookDeclarationDigest: Vu,
      digestAlgorithm: l.literal("sha256"),
      decision: l.literal("trusted"),
      grantedAt: l.string().datetime(),
      lastUsedAt: l.string().datetime().optional(),
      bundleDigestAtGrant: Vu.optional(),
      eventAtGrant: dI,
      displayCommandAtGrant: io,
      sourcePathAtGrant: io,
      sourceDiscoveryOrderAtGrant: fs.optional(),
      matcherAtGrant: l.string().nullable().optional(),
      matcherIndexAtGrant: fs.optional(),
      hookIndexAtGrant: fs.optional(),
      appVersionAtGrant: io.optional(),
    })
    .strict(),
  QLe = l
    .object({ schemaVersion: l.literal(cI), records: l.array(lI) })
    .strict()
    .superRefine((e, t) => {
      let n = e.records.map(
        (s) => `${s.workspaceIdentity}\0${s.hookDeclarationDigest}`,
      );
      new Set(n).size !== n.length &&
        t.addIssue({
          code: l.ZodIssueCode.custom,
          path: ["records"],
          message:
            "workspace identity and declaration digest keys must be unique",
        });
    });
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var H0e = 5 * 1024 * 1024;
r();
o();
r();
o();
import { parse as cFe } from "yaml";
var fFe = T("settings-sync");
r();
o();
import { constants as Ju, createWriteStream as pI } from "node:fs";
import {
  lstat as Xu,
  mkdir as fI,
  mkdtemp as mI,
  open as gI,
  readdir as hI,
  realpath as Yu,
  rm as yI,
  stat as wI,
} from "node:fs/promises";
import { arch as vI, platform as kI, release as SI } from "node:os";
import { join as ms, posix as PI } from "node:path";
import { pipeline as _I } from "node:stream/promises";
import { ZipFile as CI } from "yazl";
var gs = 8 * 1024 * 1024,
  Qu = 32 * 1024 * 1024;
function II(e) {
  try {
    let t =
        e[0] === 255 && e[1] === 254
          ? "utf-16le"
          : e[0] === 254 && e[1] === 255
            ? "utf-16be"
            : "utf-8",
      n = new TextDecoder(t, { fatal: !0 }).decode(e);
    for (let s of n) {
      let a = s.charCodeAt(0);
      if (a < 32 && a !== 9 && a !== 10 && a !== 13) return null;
    }
    return n;
  } catch {
    return null;
  }
}
i(II, "decodeDiagnosticLog");
function hs(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
i(hs, "isRecord");
function ep(e, t = {}, n = [], s = []) {
  if (!hs(e)) return;
  let a = {};
  for (let [c, d] of Object.entries(t)) typeof e[c] === d && (a[c] = e[c]);
  for (let c of n) {
    let d = e[c];
    Array.isArray(d) && d.every((m) => typeof m == "string") && (a[c] = d);
  }
  for (let c of s) {
    let d = e[c];
    hs(d) && Object.values(d).every((m) => typeof m == "boolean") && (a[c] = d);
  }
  return Object.keys(a).length > 0 ? a : void 0;
}
i(ep, "pickSafeSection");
function bI(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch {
    return null;
  }
  if (!hs(t)) return null;
  let n = {},
    s = ep(t, { model: "string" });
  s && Object.assign(n, s);
  let a = [
    { key: "modelStream", scalarFields: { idleTimeoutMs: "number" } },
    {
      key: "permission",
      scalarFields: {
        mode: "string",
        autoApproveHighRisk: "boolean",
        allowMediumRiskInAuto: "boolean",
      },
      stringArrayFields: ["allowedTools", "disallowedTools"],
    },
    {
      key: "features",
      scalarFields: {
        compact: "boolean",
        rewind: "boolean",
        subagent: "boolean",
        memory: "boolean",
        skill: "boolean",
        mcp: "boolean",
      },
    },
    { key: "memory", scalarFields: { use: "boolean" } },
    {
      key: "plugins",
      scalarFields: { enabled: "boolean" },
      stringArrayFields: ["suppressedBuiltins"],
      booleanMapFields: ["enabledPlugins"],
    },
    {
      key: "skills",
      scalarFields: {
        enabled: "boolean",
        includeInstructions: "boolean",
        metadataBudget: "number",
      },
    },
    { key: "logging", scalarFields: { level: "string", format: "string" } },
    { key: "ui", scalarFields: { locale: "string", theme: "string" } },
    { key: "toolConcurrency", scalarFields: { maxConcurrency: "number" } },
    {
      key: "modelAnomalyGuard",
      scalarFields: {
        toolCallWarningThreshold: "number",
        repeatedToolCallWarningThreshold: "number",
        maxBudgetWarningsPerTurn: "number",
      },
    },
  ];
  for (let c of a) {
    let d = ep(
      t[c.key],
      c.scalarFields,
      c.stringArrayFields,
      c.booleanMapFields,
    );
    d && (n[c.key] = d);
  }
  return Nn(JSON.stringify(n, null, 2), { diagnostic: !0 });
}
i(bI, "sanitizeCliConfig");
async function tp(e) {
  let t = e.now?.() ?? new Date(),
    n = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(),
    s = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1).getTime(),
    a = i((v) => v >= n && v < s, "isToday");
  await fI(e.outputRootDir, { recursive: !0 });
  let c = await mI(ms(e.outputRootDir, "archive-")),
    d = ms(c, "zcode-diagnostic-logs.zip"),
    m = [],
    f = {},
    g = i((v) => {
      f[v] = (f[v] ?? 0) + 1;
    }, "skipLogFile"),
    h = 0,
    y = 0,
    S = Math.min(e.maxTotalBytes ?? Qu, Qu);
  try {
    e.onProgress?.({ processedBytes: 0, totalBytes: 0 });
    for (let w of e.sources) {
      let C = await Yu(w.directory).catch(() => null);
      if (!C || !(await Xu(w.directory).catch(() => null))?.isDirectory())
        continue;
      let x = i(async (_, I, b) => {
        if (b > 4 || y >= 2e3) return;
        let A = await hI(_, { withFileTypes: !0 }).catch(() => []);
        for (let E of A.sort((O, P) => O.name.localeCompare(P.name))) {
          if (++y > 2e3) return;
          if (E.isSymbolicLink()) continue;
          let O = ms(_, E.name),
            P = PI.join(I, E.name),
            N = w.includeFileNames !== void 0;
          if (E.isDirectory() && !w.exitLogsOnly && !N) {
            await x(O, P, b + 1);
            continue;
          }
          if (
            !E.isFile() ||
            (N
              ? !w.includeFileNames.includes(E.name)
              : !(w.exitLogsOnly
                  ? E.name.endsWith(".exit.log")
                  : /(?:\.log(?:\.\d+)?|\.jsonl|\.ndjson)$/i.test(E.name)))
          )
            continue;
          if ((await Yu(O).catch(() => null)) !== O) {
            g("unsafe-path");
            continue;
          }
          let F = await Xu(O).catch(() => null);
          if (
            !F?.isFile() ||
            F.nlink !== 1 ||
            F.size > gs ||
            h + F.size > S ||
            (w.onlyCurrentDay !== !1 && !a(F.mtimeMs))
          ) {
            g("metadata-policy");
            continue;
          }
          let H = await gI(O, Ju.O_RDONLY | (Ju.O_NOFOLLOW ?? 0)).catch(
            () => null,
          );
          if (!H) {
            g("open-failed");
            continue;
          }
          try {
            let K = await H.stat();
            if (
              !K.isFile() ||
              K.nlink !== 1 ||
              K.ino !== F.ino ||
              K.dev !== F.dev ||
              (w.onlyCurrentDay !== !1 && !a(K.mtimeMs)) ||
              K.size > gs ||
              h + K.size > S
            ) {
              g("opened-file-policy");
              continue;
            }
            let L = Buffer.alloc(K.size),
              j = 0;
            for (; j < L.length;) {
              let fe = await H.read(L, j, L.length - j, j);
              if (!fe.bytesRead) break;
              j += fe.bytesRead;
            }
            if (j !== K.size) {
              g("short-read");
              continue;
            }
            let z = II(L.subarray(0, j));
            if (z === null) {
              g("unsupported-text");
              continue;
            }
            let $ =
              w.contentPolicy === "cli-config"
                ? bI(z)
                : Nn(z, { diagnostic: !0 });
            if ($ === null) {
              g("invalid-config");
              continue;
            }
            let ue = Buffer.from($);
            if (ue.length > gs || h + ue.length > S) {
              g("redacted-size-limit");
              continue;
            }
            (m.push({ name: P, data: ue }), (h += Math.max(j, ue.length)));
          } finally {
            await H.close();
          }
        }
      }, "walk");
      await x(C, w.archivePrefix, 0);
    }
    let v = new CI(),
      k = pI(d, { mode: 384 }),
      M = _I(v.outputStream, k);
    for (let w of m) v.addBuffer(w.data, w.name);
    (v.addBuffer(
      Buffer.from(
        [
          "ZCode diagnostic logs",
          `timestamp: ${t.toISOString()}`,
          `appVersion: ${be}`,
          `commit: ${mo}`,
          `node: ${process.version}`,
          `os: ${kI()} ${SI()} (${vI()})`,
          `includedLogFiles: ${m.length}`,
          `skippedLogFiles: ${Object.values(f).reduce((w, C) => w + C, 0)}`,
          `skippedLogFilesByReason: ${JSON.stringify(f)}`,
          "Scope: diagnostic text log files modified today (local time), plus an explicit non-sensitive CLI config projection; credentials and structured payloads redacted.",
        ].join(`
`),
      ),
      "about.txt",
    ),
      v.end(),
      await M);
    let { size: R } = await wI(d);
    return (
      e.onProgress?.({ processedBytes: R, totalBytes: R }),
      { path: d, size: R }
    );
  } catch (v) {
    throw (await yI(c, { recursive: !0, force: !0 }), v);
  }
}
i(tp, "createFeedbackDiagnosticArchive");
r();
o();
r();
o();
r();
o();
r();
o();
var HFe = T("feedback-http"),
  GFe = 100 * 1024 * 1024,
  qFe = 1024 * 1024 * 1024;
r();
o();
r();
o();
r();
o();
r();
o();
var MBe = 512 * 1024;
r();
o();
r();
o();
var JBe = T("node-api-client");
var XBe = 64 * 1024;
r();
o();
import { Agent as rUe, ProxyAgent as oUe, fetch as iUe } from "undici";
r();
o();
import { createRequire as AI } from "node:module";
var MI = AI(import.meta.url),
  { DatabaseSync: gUe } = MI("node:sqlite"),
  xI = 10 * 6e4,
  hUe = Dn.map((e) => `'${e}'`).join(", ");
r();
o();
r();
o();
r();
o();
r();
o();
var rp = l.enum([
    "queued",
    "ready",
    "active",
    "expired",
    "settled",
    "not_found",
  ]),
  UUe = l
    .object({
      ticket_id: l.string().min(1),
      task_id: l.string().optional(),
      state: rp,
      accepted: l.boolean().optional(),
      position: l.number().int().nonnegative().nullish(),
      next_poll_after: l.number().nonnegative().optional(),
      queued_at: l.number().optional(),
      ready_deadline: l.number().optional(),
    })
    .passthrough(),
  LI = l
    .object({
      ticket_id: l.string().min(1),
      task_id: l.string().optional(),
      state: rp,
      position: l.number().int().nonnegative().nullish(),
      active_deadline: l.number().optional(),
    })
    .passthrough(),
  WUe = l
    .object({
      next_poll_after: l.number().nonnegative().optional(),
      tickets: l.array(LI).default([]),
    })
    .passthrough(),
  jUe = l
    .object({
      ticket_id: l.string().min(1).optional(),
      task_id: l.string().optional(),
      state: l.string().optional(),
      settled_at: l.number().optional(),
    })
    .passthrough(),
  $Ue = l
    .object({
      can_take_number: l.boolean(),
      next_take_at: l.number().int().positive().optional(),
    })
    .passthrough(),
  zUe = l
    .object({
      code: l.number().optional(),
      msg: l.string().optional(),
      message: l.string().optional(),
      next_take_at: l.number().optional(),
      data: l
        .object({ next_take_at: l.number().int().positive().optional() })
        .passthrough()
        .nullish(),
    })
    .passthrough();
r();
o();
var iWe = 5 * 6e4;
r();
o();
import { createHash as bp, randomUUID as uo } from "node:crypto";
import {
  mkdir as Is,
  readFile as po,
  readdir as pp,
  rename as fp,
  rm as dt,
  stat as mb,
  writeFile as lt,
} from "node:fs/promises";
import { basename as Ep, join as ge } from "node:path";
r();
o();
r();
o();
import { createHash as BI } from "node:crypto";
function op(e) {
  for (let t = 0; t < e.length; t += 1) {
    let n = e.charCodeAt(t);
    if (n >= 55296 && n <= 56319) {
      let s = e.charCodeAt(t + 1);
      if (!(s >= 56320 && s <= 57343))
        throw new TypeError("Conversation share JSON contains invalid Unicode");
      t += 1;
      continue;
    }
    if (n >= 56320 && n <= 57343)
      throw new TypeError("Conversation share JSON contains invalid Unicode");
  }
}
i(op, "assertValidUnicode");
function ys(e) {
  if (e === null) return "null";
  switch (typeof e) {
    case "boolean":
      return e ? "true" : "false";
    case "number": {
      if (!Number.isFinite(e))
        throw new TypeError("Conversation share JSON numbers must be finite");
      return JSON.stringify(e);
    }
    case "string":
      return (op(e), JSON.stringify(e));
    case "object": {
      if (Array.isArray(e)) return `[${e.map((s) => ys(s)).join(",")}]`;
      let t = e;
      return `{${Object.keys(t)
        .sort()
        .map((s) => {
          op(s);
          let a = t[s];
          if (a === void 0)
            throw new TypeError(
              "Conversation share JSON cannot contain undefined values",
            );
          return `${JSON.stringify(s)}:${ys(a)}`;
        })
        .join(",")}}`;
    }
    default:
      throw new TypeError(`Conversation share JSON cannot contain ${typeof e}`);
  }
}
i(ys, "canonicalizeValue");
function UI(e) {
  return ys(e);
}
i(UI, "canonicalizeConversationShareJson");
function In(e) {
  return BI("sha256").update(UI(e), "utf8").digest("hex");
}
i(In, "sha256ConversationShareJson");
function ip(e) {
  let t = [...e.artifacts].sort((d, m) =>
      d.artifact_id.localeCompare(m.artifact_id),
    ),
    n = In(e.projection.rows),
    s = In(t),
    { artifacts: a, ...c } = e;
  return Io.parse({
    ...c,
    integrity: {
      ...(e.projection.content_blocks === void 0
        ? {}
        : { content_blocks_sha256: In(e.projection.content_blocks) }),
      projection_sha256: n,
      artifact_set_sha256: s,
    },
  });
}
i(ip, "buildConversationShareConfirmRequest");
var NWe = T("conversation-share-http"),
  bn = class extends Error {
    static {
      i(this, "ConversationShareClientError");
    }
    kind;
    status;
    code;
    requestId;
    details;
    constructor(t) {
      (super(t.message, t.cause === void 0 ? void 0 : { cause: t.cause }),
        (this.name = "ConversationShareClientError"),
        (this.kind = t.kind),
        (this.status = t.status),
        (this.code = t.code));
      let n = t.requestId?.trim();
      n && /^[A-Za-z0-9._:-]{1,128}$/u.test(n) && (this.requestId = n);
      let s = WI(t.clientRequestId);
      ((this.requestId || s || t.status !== void 0 || t.code !== void 0) &&
        (this.details = {
          ...(this.requestId ? { requestId: this.requestId } : {}),
          ...(s ? { clientRequestId: s } : {}),
          ...(t.status === void 0 ? {} : { status: t.status }),
          ...(t.code === void 0 ? {} : { code: t.code }),
          ...(t.rejection ? { rejection: t.rejection } : {}),
        }),
        t.retryAfterMs !== void 0 && (this.retryAfterMs = t.retryAfterMs));
    }
  };
var LWe = 128 * 1024;
function WI(e) {
  let t = e?.trim();
  return t && /^[A-Za-z0-9._:-]{1,128}$/u.test(t) ? t : void 0;
}
i(WI, "normalizeRequestId");
r();
o();
import { createHash as Ss } from "node:crypto";
r();
o();
import { createHash as jI } from "node:crypto";
import { basename as $I, extname as zI } from "node:path";
var ZI = 2e4,
  HI = 200,
  GI = 512 * 1024,
  sp = "workflow-share-fallback-";
function so(e) {
  return e.kind === "assistantText" && !!e.entityId?.startsWith(sp);
}
i(so, "isWorkflowShareFallbackRow");
function ws(e, t) {
  return Object.fromEntries(
    Object.entries(e).filter(([n, s]) => t.includes(n) && s !== void 0),
  );
}
i(ws, "pick");
async function vs(e) {
  let { agent: t, input: n, capabilities: s } = e,
    a = e.rows.filter(
      (w) =>
        (w.kind === "turnHeader" &&
          (w.workflowLaunch ||
            w.originMeta?.backgroundSource === "workflow")) ||
        (w.kind === "toolCall" &&
          (w.display?.kind === "create_workflow" ||
            w.display?.kind === "resume_workflow_run")),
    );
  if (a.length === 0) return { rows: e.rows, drafts: [], bytes: new Map() };
  let c = await Promise.resolve()
      .then(() => t.conversationWorkflowRunsV4({ ...n, limit: 64 }))
      .catch(() => ({ runs: [] })),
    d = [],
    m = new Set();
  for (let w of a) {
    let C;
    if (w.kind === "turnHeader") {
      let b = w.workflowLaunch,
        A = w.originMeta,
        E = A?.workflowNotification;
      C = {
        row: w,
        runId: b?.runId ?? A?.workId,
        name: b?.name ?? A?.title ?? "Workflow",
        completion: E?.kind === "terminal" && E.status === "completed",
        ...(E?.kind === "terminal"
          ? { summary: (E.error ?? E.summary).slice(0, 2048) }
          : {}),
        ...(b?.display?.causalityGraph
          ? { graph: b.display.causalityGraph }
          : {}),
        ...(E?.kind === "terminal" && E.durationMs !== void 0
          ? { duration: Math.floor(E.durationMs) }
          : {}),
      };
    } else if (w.kind === "toolCall") {
      let b = c.runs.find((E) => E.toolCallId === w.toolCallId);
      if (!b && w.display?.kind === "create_workflow" && !w.display.ok)
        continue;
      let A =
        typeof w.input == "object" &&
        w.input &&
        "name" in w.input &&
        typeof w.input.name == "string"
          ? w.input.name
          : (b?.label ?? "Workflow");
      C = {
        row: w,
        name: A,
        completion: !1,
        runId:
          w.display?.kind === "resume_workflow_run"
            ? w.display.runId
            : b?.runId,
        ...(w.display?.kind === "create_workflow" && w.display.causalityGraph
          ? { graph: w.display.causalityGraph }
          : {}),
      };
    }
    if (!C || !w.productTurnId) continue;
    let x = `${w.productTurnId}:${C.runId ?? w.rowId}`;
    if (m.has(x)) continue;
    m.add(x);
    let _ = c.runs.find((b) => b.runId === C.runId),
      I = e.allRows.find(
        (b) => b.kind === "toolCall" && b.toolCallId === _?.toolCallId,
      );
    (!C.graph &&
      I?.kind === "toolCall" &&
      I.display?.kind === "create_workflow" &&
      (C.graph = I.display.causalityGraph),
      d.push(C));
  }
  let f = new Map(),
    g = [],
    h = [],
    y = new Map(),
    S = new Map(),
    v = Math.max(0, ...e.rows.map((w) => w.rowId)),
    k = 0,
    M = 0;
  for (let w of d) {
    let C = w.row,
      x = C.productTurnId,
      _ = {
        name: w.name.slice(0, 512) || "Workflow",
        completion: w.completion,
        ...(w.summary ? { summary: w.summary } : {}),
        artifacts: [],
        ...(w.graph ? { graph: w.graph } : {}),
        ...(w.duration === void 0 ? {} : { duration_ms: w.duration }),
      };
    try {
      if (!w.runId) throw new Error("Missing workflow identity");
      let O = S.get(w.runId);
      if (O)
        _ = {
          ...O,
          completion: w.completion,
          name: _.name,
          ...(w.summary ? { summary: w.summary } : {}),
          ...(w.graph ? { graph: w.graph } : {}),
          ...(w.duration === void 0 ? {} : { duration_ms: w.duration }),
        };
      else {
        let P,
          N = -1,
          F = 0;
        for (;;) {
          let L = await t.conversationWorkflowRunEventsV4({
            ...n,
            runId: w.runId,
            ...(N < 0 ? {} : { afterSequence: N }),
          });
          if (
            ((F += L.events.length),
            F > ZI || (!L.events.length && (L.hasMore || F === 0)))
          )
            throw new Error("Incomplete workflow snapshot");
          for (let j of L.events) {
            if (j.sequence <= N) throw new Error("Unordered workflow journal");
            ((N = j.sequence),
              (P =
                ta(P, {
                  runId: w.runId,
                  eventType: j.type,
                  sequence: j.sequence,
                  payload: j.payload,
                }) ?? P));
          }
          if (!L.hasMore) break;
        }
        let H = P?.runs[0];
        if (!H) throw new Error("Missing workflow state");
        (!_.summary && H.error && (_.summary = H.error.slice(0, 2048)),
          (_.run = jt.parse({
            ...ws(H, Object.keys(jt.shape)),
            actors: H.actors.map((L) =>
              ws(L, Object.keys(jt.shape.actors.element.shape)),
            ),
            nodes: H.nodes.map((L) =>
              ws(L, Object.keys(jt.shape.nodes.element.shape)),
            ),
          })));
        let K = await t.conversationWorkflowRunArtifactsV4({
          ...n,
          runId: w.runId,
        });
        for (let L of H.artifacts ?? []) {
          let z = K.artifacts
              .find((Ce) => Ce.id === L.id)
              ?.versions.find((Ce) => Ce.version === L.version),
            $ = {
              id: L.id,
              kind: L.kind,
              title: z?.title ?? L.title ?? L.id,
              version: L.version,
              ...(L.primary ? { primary: !0 } : {}),
              ...(z?.description ? { description: z.description } : {}),
            },
            ue,
            fe;
          try {
            if (!z) throw new Error("Missing artifact version");
            if ($.kind === "file" || $.kind === "markdown") {
              let ve =
                  z.contentType ??
                  ($.kind === "markdown"
                    ? "text/markdown"
                    : "application/octet-stream"),
                Ge =
                  zI(z.sourcePath ?? "").slice(1) ||
                  ($.kind === "markdown" ? "md" : ""),
                Z = s.allowed_artifacts.find(
                  (he) =>
                    he.mime_types.includes(ve) &&
                    he.extensions.some((ft) => ft.replace(/^\./u, "") === Ge),
                );
              if (!Z) {
                _.artifacts.push({
                  ...$,
                  kind: $.kind,
                  unavailable: "unsupported",
                });
                continue;
              }
              let V = s.max_total_artifact_bytes - M;
              if (
                k >= s.max_artifact_count ||
                V <= 0 ||
                (z.bytes ?? 0) > Math.min(s.max_artifact_bytes, V)
              ) {
                _.artifacts.push({
                  ...$,
                  kind: $.kind,
                  unavailable: "limit_exceeded",
                });
                continue;
              }
              if (e.preflight) {
                let he = z.bytes ?? 0;
                (_.artifacts.push({
                  ...$,
                  kind: $.kind,
                  bytes: he,
                  content_type: ve,
                }),
                  (M += he),
                  (k += 1));
                continue;
              }
              let Ie = [],
                ie = 0;
              for (;;) {
                let he = await t.conversationWorkflowRunArtifactReadV4({
                    ...n,
                    runId: w.runId,
                    artifactId: L.id,
                    version: L.version,
                    offset: ie,
                    limit: GI,
                  }),
                  ft = Buffer.from(he.dataBase64, "base64");
                if (he.totalBytes > Math.min(s.max_artifact_bytes, V))
                  throw new RangeError("Artifact size limit");
                if (ie + ft.length > he.totalBytes || !ft.length)
                  throw new Error("Invalid artifact bytes");
                if ((Ie.push(ft), (ie += ft.length), he.nextOffset === null)) {
                  if (ie !== he.totalBytes)
                    throw new Error("Incomplete artifact bytes");
                  break;
                }
                if (he.nextOffset !== ie)
                  throw new Error("Invalid artifact cursor");
              }
              let pt = Buffer.concat(Ie),
                Lt = `workflow-resource-${k + 1}`,
                fo = $I($.title).replace(/[\\/]/gu, "_") || "artifact",
                Op = fo.toLowerCase().endsWith(`.${Ge.toLowerCase()}`)
                  ? fo
                  : `${fo}.${Ge}`,
                Dp = {
                  rowId: v + 1,
                  turnId: C.turnId,
                  productTurnId: x,
                  createdAt: e.capturedAt,
                  createdAtSeq: v + 1,
                  kind: "artifact",
                  artifactVersionId: Lt,
                  logicalArtifactKey: Lt,
                  displayName: Op,
                  artifactType: Z.type,
                  mimeType: ve,
                  sizeBytes: pt.length,
                  sha256: jI("sha256").update(pt).digest("hex"),
                  ref: Lt,
                  state: "current",
                };
              ((fe = { id: Lt, data: pt, row: Dp }),
                (ue = {
                  ...$,
                  kind: $.kind,
                  resource_id: Lt,
                  content_type: ve,
                  ...((s.content_block_versions?.workflow ?? 0) >= 2 &&
                  (ve === "text/markdown" || ve === "text/plain") &&
                  pt.length <= 65536
                    ? {
                        preview_text: new TextDecoder("utf-8", {
                          fatal: !0,
                          ignoreBOM: !0,
                        }).decode(pt),
                      }
                    : {}),
                  bytes: pt.length,
                }));
            } else {
              let ve = $.kind,
                Ge = Ks[ve].parse(z.spec),
                Z = [],
                V;
              for (;;) {
                let Ie = await t.conversationWorkflowRunArtifactDataV4({
                  ...n,
                  runId: w.runId,
                  artifactId: L.id,
                  limit: HI,
                  ...(V === void 0 ? {} : { afterSequence: V }),
                });
                for (let ie of Ie.items) {
                  if (ie.sequence <= (V ?? -1))
                    throw new Error("Invalid artifact item cursor");
                  ((V = ie.sequence), ie.sequence <= N && Z.push(ie));
                }
                if (Z.length > 256) throw new Error("Artifact item limit");
                if (!Ie.hasMore || (V ?? -1) >= N) break;
                if (!Ie.items.length)
                  throw new Error("Incomplete artifact items");
              }
              ue = { ...$, kind: ve, spec: Ge, items: Z };
            }
            let Ce = Vs.shape.artifacts.element.parse(ue);
            (fe &&
              (f.set(fe.id, fe.data),
              g.push(fe.row),
              (M += fe.data.length),
              (k += 1),
              (v += 1)),
              _.artifacts.push(Ce));
          } catch (Ce) {
            _.artifacts.push({
              ...$,
              kind: $.kind,
              unavailable:
                Ce instanceof RangeError
                  ? "limit_exceeded"
                  : "source_unavailable",
            });
          }
        }
        S.set(w.runId, _);
      }
    } catch {
      _.unavailable = "source_unavailable";
    }
    let I = `${sp}${h.length + 1}`,
      b = _.run?.status ?? "unavailable",
      A = [
        _.name,
        `Workflow \xB7 ${b}`,
        ...(_.summary ? [_.summary] : []),
        ...(_.run?.phases?.map((O) => O.name) ?? []),
        ...(_.run?.actors.map((O) => O.name ?? O.siteId) ?? []),
        ..._.artifacts.map(
          (O) =>
            `${O.title}${O.unavailable ? " (\u672A\u5305\u542B / not included)" : ""}`,
        ),
        ...(_.unavailable
          ? [
              "Workflow snapshot unavailable / \u5DE5\u4F5C\u6D41\u5FEB\u7167\u4E0D\u53EF\u7528",
            ]
          : []),
      ].join(`

`),
      E = y.get(x) ?? [];
    (E.push({
      rowId: ++v,
      entityId: I,
      turnId: C.turnId,
      productTurnId: x,
      createdAt: e.capturedAt,
      createdAtSeq: v,
      kind: "assistantText",
      state: "complete",
      text: A,
    }),
      y.set(x, E),
      h.push({
        version: (s.content_block_versions?.workflow ?? 0) >= 2 ? 2 : 1,
        entityId: I,
        productTurnId: x,
        capturedAt: e.capturedAt,
        payload: _,
      }));
  }
  let R = [];
  for (let [w, C] of e.rows.entries())
    ((C.kind === "userInput" && C.origin === "workflowLaunch") || R.push(C),
      C.productTurnId !== e.rows[w + 1]?.productTurnId &&
        C.productTurnId &&
        R.push(
          ...(y.get(C.productTurnId) ?? []),
          ...g.filter((x) => x.productTurnId === C.productTurnId),
        ));
  return { rows: R, drafts: h, bytes: f };
}
i(vs, "collectConversationShareWorkflowSnapshot");
function Ps(e) {
  return JSON.stringify(
    e.map((t) => ({
      sourceRef: t.sourceRef,
      displayName: t.displayName,
      previewKind: t.previewKind,
      artifactType: t.artifactType,
      mimeType: t.mimeType,
      productTurnId: t.productTurnId,
      requiresFileChanges: t.requiresFileChanges,
    })),
  );
}
i(Ps, "getConversationSharePreviewCandidateFingerprint");
function ks(e) {
  throw new W("invalid_conversation", e);
}
i(ks, "throwDiscoveryError");
function qI(e) {
  return e.replace(/\\/gu, "/").split("/").at(-1) ?? e;
}
i(qI, "fileNameOf");
function ap(e) {
  let t = qI(e),
    n = t.lastIndexOf(".");
  return n > 0 && n < t.length - 1 ? t.slice(n + 1).toLowerCase() : null;
}
i(ap, "extensionOf");
function KI(e, t) {
  if (t.previewKind === "video" || t.previewKind === "audio") return null;
  let n = ap(t.sourceRef);
  if (!n) return null;
  let s = e.allowed_artifacts.find(
    (a) =>
      a.extensions.some((c) => c.replace(/^\./u, "").toLowerCase() === n) &&
      a.mime_types.some((c) => c.toLowerCase() === t.mimeType),
  );
  return s ? { artifactType: s.type, mimeType: t.mimeType } : null;
}
i(KI, "matchAllowedArtifact");
async function VI(e) {
  let t = [];
  for (let n of e.artifacts) {
    let s = e.inlineBytesBySourceRef?.get(n.sourceRef),
      { bytes: a, canonicalPath: c } = s
        ? { bytes: s, canonicalPath: n.sourceRef }
        : await e.artifactSource.read({
            workspacePath: e.workspacePath,
            ref: n.sourceRef,
            maxBytes: e.maxArtifactBytes,
          }),
      d = Ss("sha256").update(a).digest("hex");
    ((a.byteLength !== n.descriptor.size_bytes || d !== n.descriptor.sha256) &&
      ks("Conversation artifact changed after it was registered"),
      t.push({ sourceRef: n.sourceRef, canonicalPath: c, bytes: a }));
  }
  return t;
}
i(VI, "materializeRegisteredArtifacts");
async function JI(e) {
  let t = new Map();
  for (let d of e.selectedRows)
    d.kind === "turnHeader" &&
      d.productTurnId &&
      (d.state === "completedSuccess" || d.state === "completedInterrupted") &&
      t.set(d.productTurnId, d);
  let n = new Map(e.turnOrdinalByProductTurnId);
  for (let d of e.selectedRows)
    d.kind !== "turnHeader" ||
      !d.productTurnId ||
      n.has(d.productTurnId) ||
      n.set(d.productTurnId, n.size + 1);
  let s = new Map();
  for (let d of e.selectedRows) {
    if (d.kind !== "assistantText" || !d.productTurnId || so(d)) continue;
    let m = s.get(d.productTurnId) ?? [];
    (m.push(d.text), s.set(d.productTurnId, m));
  }
  let a = [],
    c = e.selectedRows.reduce((d, m) => Math.max(d, m.rowId), 0);
  for (let [d, m] of s) {
    let f = t.get(d);
    if (!f) continue;
    let g = m.join(`

`),
      y = xn(g, e.input.workspacePath).some(
        (_) => _.kind === "markdown" || _.kind === "html",
      ),
      S;
    if (y && f.fileChanges?.state !== "reverted") {
      (!f.entityId || !f.productTurnId) &&
        ks("Conversation file changes are missing a stable turn identity");
      let _;
      try {
        _ = await e.zcodeAgentService.conversationFileChangesV4({
          workspacePath: e.input.workspacePath,
          ...(e.input.workspaceIdentity
            ? { workspaceIdentity: e.input.workspaceIdentity }
            : {}),
          ...(e.input.remoteSessionId
            ? { remoteSessionId: e.input.remoteSessionId }
            : {}),
          sessionId: e.input.sessionId,
          target: { rowId: f.rowId, entityId: f.entityId },
          baseRevision: e.revision,
          baseLogEpoch: e.logEpoch,
        });
      } catch (I) {
        let b = I instanceof Error ? I.message : String(I);
        throw (
          (b.includes("proto.staleRevision") ||
            b.includes("proto.staleLogEpoch")) &&
            ks("Conversation changed while preparing share"),
          I
        );
      }
      S = _.items.map((I) => ({
        path: I.path,
        state: _.state === "reverted" ? "reverted" : "active",
      }));
    }
    let v = On({
        assistantText: g,
        productTurnId: d,
        workspacePath: e.input.workspacePath,
        fileChanges: S,
      }),
      k = e.preflightPreviewSnapshots?.get(d),
      R =
        k !== void 0 &&
        k.revision === e.revision &&
        k.logEpoch === e.logEpoch &&
        k.capabilitiesFingerprint === e.currentCapabilitiesFingerprint &&
        k.candidateFingerprint === Ps(v)
          ? v.filter((_) => k.visibleSourceRefs.includes(_.sourceRef))
          : v,
      w = [],
      C = new Set(),
      x = new Map();
    for (let _ of R) {
      let I = { workspacePath: e.input.workspacePath, ref: _.sourceRef };
      try {
        if (e.artifactSource.stat) {
          let b = await e.artifactSource.stat(I);
          if (C.has(b.canonicalPath)) continue;
          C.add(b.canonicalPath);
        } else {
          let b = await e.artifactSource.read({
            ...I,
            maxBytes: e.capabilities.max_artifact_bytes,
          });
          if (C.has(b.canonicalPath)) continue;
          (C.add(b.canonicalPath), x.set(_.sourceRef, b));
        }
      } catch (b) {
        if (b instanceof W && b.reasonCode === "artifact_read_failed") {
          e.warnings.push({
            code: "artifact_read_failed",
            scope: "artifact",
            rowId: f.rowId,
            turnOrdinal: n.get(d),
            artifactDisplayName: _.displayName,
            artifactType: _.artifactType,
            extension: _.displayName.split(".").at(-1)?.toLowerCase(),
            mimeType: _.mimeType,
            availability:
              b.diagnostics?.errno === "ENOENT" ? "not_found" : "unknown",
          });
          continue;
        }
        throw b;
      }
      w.length < Mn && w.push(_);
    }
    for (let _ of w) {
      let I = KI(e.capabilities, _);
      if (!I) {
        e.warnings.push({
          code: "artifact_type_not_allowed",
          scope: "artifact",
          rowId: f.rowId,
          turnOrdinal: n.get(d),
          artifactDisplayName: _.displayName,
          artifactType: _.artifactType,
          extension: _.displayName.split(".").at(-1)?.toLowerCase(),
          mimeType: _.mimeType,
          allowedFormats: e.capabilities.allowed_artifacts.flatMap((O) =>
            O.extensions.map(
              (P) => `${O.type.toUpperCase()} (.${P.replace(/^\./u, "")})`,
            ),
          ),
          allowedArtifacts: e.capabilities.allowed_artifacts.map((O) => ({
            type: O.type,
            extensions: O.extensions,
            mimeTypes: O.mime_types,
          })),
        });
        continue;
      }
      let b,
        A = x.get(_.sourceRef);
      try {
        A
          ? (b = A)
          : (b = await e.artifactSource.read({
              workspacePath: e.input.workspacePath,
              ref: _.sourceRef,
              maxBytes: e.capabilities.max_artifact_bytes,
            }));
      } catch (O) {
        if (!(O instanceof W) || O.reasonCode !== "artifact_read_failed")
          throw O;
        e.warnings.push({
          code: "artifact_read_failed",
          scope: "artifact",
          rowId: f.rowId,
          turnOrdinal: n.get(d),
          artifactDisplayName: _.displayName,
          artifactType: _.artifactType,
          extension: _.displayName.split(".").at(-1)?.toLowerCase(),
          mimeType: _.mimeType,
          availability:
            O.diagnostics?.errno === "ENOENT" ? "not_found" : "unknown",
        });
        continue;
      }
      if (e.existingCanonicalPaths.has(b.canonicalPath)) continue;
      e.existingCanonicalPaths.add(b.canonicalPath);
      let E = `preview:${d}:${_.sourceRef}`;
      a.push({
        sourceRef: _.sourceRef,
        canonicalPath: b.canonicalPath,
        bytes: b.bytes,
        row: {
          rowId: c + a.length + 1,
          turnId: f.turnId,
          productTurnId: f.productTurnId,
          createdAt: f.endedAt ?? f.createdAt,
          createdAtSeq: f.createdAtSeq,
          kind: "artifact",
          artifactVersionId: E,
          logicalArtifactKey: E,
          displayName: _.displayName,
          artifactType: I.artifactType,
          mimeType: I.mimeType,
          sizeBytes: b.bytes.byteLength,
          sha256: Ss("sha256").update(b.bytes).digest("hex"),
          ref: _.sourceRef,
          state: "current",
        },
      });
    }
  }
  return a;
}
i(JI, "discoverPreviewArtifacts");
async function XI(e) {
  let t = e.row.attachments?.[e.attachmentIndex];
  if (!t || !e.row.entityId)
    throw new W(
      "invalid_conversation",
      "Conversation input attachment is missing a stable row identity",
    );
  let n = [],
    s = 0,
    a,
    c = t.mime;
  for (;;) {
    let f = await e.zcodeAgentService.conversationAttachmentReadV4({
        workspacePath: e.input.workspacePath,
        ...(e.input.workspaceIdentity
          ? { workspaceIdentity: e.input.workspaceIdentity }
          : {}),
        ...(e.input.remoteSessionId
          ? { remoteSessionId: e.input.remoteSessionId }
          : {}),
        sessionId: e.input.sessionId,
        ref: t.ref,
        target: { rowId: e.row.rowId, entityId: e.row.entityId },
        attachmentIndex: e.attachmentIndex,
        offset: s,
        limit: Math.min(Te.attachmentChunkMaxBytes, e.maxBytes),
      }),
      g = new Uint8Array(Buffer.from(f.dataBase64, "base64"));
    if (
      ((a ??= f.totalBytes),
      (c = f.mediaType || c),
      a > e.maxBytes || (g.byteLength === 0 && f.nextOffset !== null))
    )
      throw new W(
        "limit_exceeded",
        "Conversation input attachment exceeds the byte limit",
      );
    if ((n.push(g), (s += g.byteLength), f.nextOffset === null)) break;
    if (f.nextOffset !== s || f.nextOffset > a)
      throw new W(
        "invalid_conversation",
        "Conversation input attachment returned invalid read progress",
      );
  }
  let d = new Uint8Array(s),
    m = 0;
  for (let f of n) (d.set(f, m), (m += f.byteLength));
  if (a !== d.byteLength || (t.bytes > 0 && t.bytes !== d.byteLength))
    throw new W(
      "invalid_conversation",
      "Conversation input attachment changed before sharing",
    );
  if (d.byteLength === 0)
    throw new W(
      "invalid_conversation",
      "Conversation input attachment is empty",
    );
  return { bytes: d, mediaType: c };
}
i(XI, "readInputAttachment");
async function YI(e) {
  let t = e.selectedRows.map((c) =>
      c.kind === "userInput"
        ? { ...c, attachments: c.attachments?.map((d) => ({ ...d })) }
        : c,
    ),
    n = [],
    s = new Map(),
    a = 0;
  for (let c of t) {
    if (c.kind !== "userInput" || !c.attachments || c.attachments.length === 0)
      continue;
    let d = [];
    for (let [m, f] of c.attachments.entries()) {
      let g = ap(f.fileName) ?? "txt",
        h = f.mime.split(";", 1)[0]?.trim().toLowerCase() || "text/plain",
        y = e.capabilities.allowed_artifacts.find(
          (v) =>
            v.extensions.some(
              (k) => k.replace(/^\./u, "").toLowerCase() === g,
            ) && v.mime_types.some((k) => k.toLowerCase() === h),
        ),
        S = c.productTurnId
          ? e.turnOrdinalByProductTurnId?.get(c.productTurnId)
          : void 0;
      if (!y) {
        e.warnings.push({
          code: "artifact_type_not_allowed",
          scope: "artifact",
          rowId: c.rowId,
          ...(S === void 0 ? {} : { turnOrdinal: S }),
          artifactDisplayName: f.fileName,
          artifactType: g === "txt" ? "text" : g,
          extension: g,
          mimeType: h,
          allowedArtifacts: e.capabilities.allowed_artifacts.map((v) => ({
            type: v.type,
            extensions: v.extensions,
            mimeTypes: v.mime_types,
          })),
        });
        continue;
      }
      try {
        let v = await XI({
            zcodeAgentService: e.zcodeAgentService,
            input: e.input,
            row: c,
            attachmentIndex: m,
            maxBytes: e.capabilities.max_artifact_bytes,
          }),
          k = `input:${c.rowId}:${m}`,
          M = `share-input-artifact-${++a}`,
          R = `zcode-artifact://share/${M}`,
          w = Ss("sha256").update(v.bytes).digest("hex");
        (n.push({
          sourceRef: k,
          descriptor: {
            artifact_id: M,
            logical_artifact_key: `share-input-key-${a}`,
            producer_product_turn_id: c.productTurnId ?? c.turnId,
            artifact_version: 1,
            state: "current",
            ref: R,
            artifact_type: y.type,
            display_name: f.fileName,
            extension: g,
            mime_type: h,
            size_bytes: v.bytes.byteLength,
            sha256: w,
          },
        }),
          s.set(k, v.bytes),
          d.push({ ...f, ref: R, previewRef: R, bytes: v.bytes.byteLength }));
      } catch (v) {
        let k = ht(v);
        if (
          k === ee.shareReadNotAuthorized ||
          k === ee.shareReadConnectionUntrusted
        )
          throw new W(
            "artifact_protocol_not_ready",
            "Conversation input attachment is not authorized",
            { reasonCode: "artifact_protocol_not_ready" },
          );
        if (k === ee.previewTooLarge || k === ee.shareStatTooLarge)
          throw new W(
            "limit_exceeded",
            "Conversation input attachment exceeds the artifact size limit",
            {
              reasonCode: "artifact_size_limit",
              issues: [
                {
                  code: "artifact_size_limit",
                  scope: "artifact",
                  rowId: c.rowId,
                  ...(S === void 0 ? {} : { turnOrdinal: S }),
                  ...(c.productTurnId
                    ? { productTurnId: c.productTurnId }
                    : {}),
                  artifactDisplayName: f.fileName,
                  artifactType: y.type,
                  extension: g,
                  mimeType: h,
                  limit: e.capabilities.max_artifact_bytes,
                },
              ],
            },
          );
        e.warnings.push({
          code: "input_attachment_unavailable",
          scope: "artifact",
          rowId: c.rowId,
          ...(S === void 0 ? {} : { turnOrdinal: S }),
          ...(c.productTurnId ? { productTurnId: c.productTurnId } : {}),
          artifactDisplayName: f.fileName,
          artifactType: y.type,
          extension: g,
          mimeType: h,
          availability:
            k === ee.shareStatNotFound ||
            k === ee.statNotFile ||
            (v instanceof W && v.diagnostics?.errno === "ENOENT")
              ? "not_found"
              : "unknown",
        });
      }
    }
    d.length > 0 ? (c.attachments = d) : delete c.attachments;
  }
  return { rows: t, artifacts: n, bytesBySourceRef: s };
}
i(YI, "discoverInputAttachments");
function QI(e, t) {
  if (t.length === 0) return e;
  let n = new Map();
  for (let a of t) {
    let c = a.row.productTurnId ?? "",
      d = n.get(c);
    d ? d.push(a.row) : n.set(c, [a.row]);
  }
  let s = new Map();
  return (
    e.forEach((a, c) => {
      a.productTurnId && s.set(a.productTurnId, c);
    }),
    e.flatMap((a, c) =>
      !a.productTurnId || s.get(a.productTurnId) !== c
        ? [a]
        : [a, ...(n.get(a.productTurnId) ?? [])],
    )
  );
}
i(QI, "insertDiscoveredArtifacts");
async function cp(e) {
  let t = [],
    n = [],
    s = await YI({
      zcodeAgentService: e.zcodeAgentService,
      input: e.input,
      selectedRows: e.selectedRows,
      capabilities: e.capabilities,
      warnings: n,
      turnOrdinalByProductTurnId: e.turnOrdinalByProductTurnId,
    }),
    a = s.rows,
    c = await VI({
      workspacePath: e.input.workspacePath,
      maxArtifactBytes: e.capabilities.max_artifact_bytes,
      artifacts: e.registeredArtifacts,
      inlineBytesBySourceRef: e.inlineBytesBySourceRef,
      artifactSource: e.artifactSource,
    }),
    d = await JI({
      ...e,
      selectedRows: a,
      issues: t,
      warnings: n,
      existingCanonicalPaths: new Set(c.map((m) => m.canonicalPath)),
      turnOrdinalByProductTurnId: e.turnOrdinalByProductTurnId,
      preflightPreviewSnapshots: e.preflightPreviewSnapshots,
      currentCapabilitiesFingerprint: e.currentCapabilitiesFingerprint,
    });
  return {
    rows: QI(a, d),
    bytesBySourceRef: new Map(
      [
        ...c,
        ...d,
        ...[...s.bytesBySourceRef.entries()].map(([m, f]) => ({
          sourceRef: m,
          bytes: f,
          canonicalPath: m,
        })),
      ].map((m) => [m.sourceRef, m.bytes]),
    ),
    additionalArtifacts: s.artifacts,
    issues: t,
    warnings: n,
  };
}
i(cp, "buildConversationShareArtifactSnapshot");
r();
o();
import { createHash as eb } from "node:crypto";
function _s(e, t, n) {
  let s = [],
    a = new Map(),
    c = new Map(),
    d = [],
    m = e.reduce((f, g) => Math.max(f, g.rowId), 0);
  for (let f of e) {
    if (f.kind !== "toolCall") {
      s.push(f);
      continue;
    }
    let g = f.display?.kind === "node_repl_images" ? f.display : void 0,
      h = f.output?.display?.kind === "cua" ? f.output.display.media : void 0;
    h?.some((S) => S.artifactUri && !S.data) &&
      d.push({
        code: "content_unavailable",
        scope: "turn",
        rowId: f.rowId,
        productTurnId: f.productTurnId,
      });
    let y = [
      ...(g?.images ?? []),
      ...(h ?? []).flatMap((S) =>
        S.data && S.mimeType.startsWith("image/")
          ? [
              {
                base64: S.data.replace(/^data:[^;]+;base64,/u, ""),
                mimeType: S.mimeType,
              },
            ]
          : [],
      ),
    ];
    if (g) {
      let { display: S, ...v } = f;
      s.push(v);
    } else s.push(f);
    for (let [S, v] of y.entries()) {
      let k = v.mimeType.toLowerCase(),
        M = t.allowed_artifacts.find(
          (A) =>
            A.type === "image" &&
            A.mime_types.some((E) => E.toLowerCase() === k),
        ),
        R = {
          "image/png": ["png"],
          "image/jpeg": ["jpg", "jpeg"],
          "image/webp": ["webp"],
          "image/gif": ["gif"],
          "image/svg+xml": ["svg"],
        },
        w = M?.extensions
          .map((A) => A.replace(/^\./u, "").toLowerCase())
          .find((A) => R[k]?.includes(A)),
        C = `tool-image-${f.rowId}-${S + 1}.${w ?? "image"}`,
        x = {
          scope: "artifact",
          rowId: f.rowId,
          productTurnId: f.productTurnId,
          turnOrdinal: f.productTurnId ? n.get(f.productTurnId) : void 0,
          artifactDisplayName: C,
          artifactType: "image",
          mimeType: k,
        };
      if (!w) {
        d.push({
          ...x,
          code: "artifact_type_not_allowed",
          allowedArtifacts: t.allowed_artifacts.map((A) => ({
            type: A.type,
            extensions: A.extensions,
            mimeTypes: A.mime_types,
          })),
        });
        continue;
      }
      let _ = Buffer.from(v.base64, "base64");
      if (
        !_.length ||
        _.toString("base64").replace(/=+$/u, "") !==
          v.base64.replace(/=+$/u, "")
      ) {
        d.push({ ...x, code: "artifact_read_failed", availability: "unknown" });
        continue;
      }
      let I = `inline-tool-image:${f.rowId}:${S}`;
      c.set(I, _);
      let b = a.get(f.rowId) ?? [];
      (b.push({ resourceId: I, mimeType: k }),
        a.set(f.rowId, b),
        s.push({
          kind: "artifact",
          rowId: ++m,
          turnId: f.turnId,
          productTurnId: f.productTurnId,
          createdAt: f.createdAt,
          createdAtSeq: f.createdAtSeq,
          artifactVersionId: I,
          logicalArtifactKey: I,
          displayName: C,
          artifactType: "image",
          mimeType: k,
          sizeBytes: _.byteLength,
          sha256: eb("sha256").update(_).digest("hex"),
          ref: I,
          state: "current",
        }));
    }
  }
  return { rows: s, bytesBySourceRef: c, warnings: d, toolImages: a };
}
i(_s, "materializeConversationShareInlineImages");
r();
o();
var tb = new Set(["inputStreaming", "pendingApproval", "running"]),
  dp = /^share-product-turn-[1-9]\d*$/u,
  nb = /^share-turn-[1-9]\d*$/u,
  rb = /^share-entity-[1-9]\d*$/u,
  ob = /^share-tool-call-[1-9]\d*$/u,
  ib = /^share-artifact-[1-9]\d*$/u;
function B(e, t, n) {
  throw new W(e, t, { diagnostics: n });
}
i(B, "throwProjectionError");
function Nt(e, t) {
  if (typeof e == "string") {
    t(e);
    return;
  }
  if (Array.isArray(e)) {
    for (let n of e) Nt(n, t);
    return;
  }
  if (e && typeof e == "object") for (let n of Object.values(e)) Nt(n, t);
}
i(Nt, "visitStrings");
function ao(e) {
  (/^zcode-artifact:\/\//iu.test(e) &&
    B(
      "artifact_protocol_not_ready",
      "Artifact references must be represented by formal conversation artifact rows",
    ),
    /^(?:data|file):/iu.test(e) &&
      B("unsafe_structure", "Local and inline URLs cannot be shared"));
}
i(ao, "assertSafeString");
function sb(e) {
  let t = Zs.safeParse(e.display);
  if (
    (t.success ||
      B("invalid_conversation", "Invalid tool display in shared conversation", {
        rowKind: e.kind,
        rowId: e.rowId,
        field: ["display", ...(t.error.issues[0]?.path ?? [])].join("."),
      }),
    t.data.kind === "mcp_tool")
  ) {
    let { ui: n, ...s } = t.data;
    return s;
  }
  return t.data;
}
i(sb, "projectToolDisplay");
function co(e) {
  return /^zcode-artifact:\/\/share\/[A-Za-z0-9._~-]+$/u.test(e);
}
i(co, "isPublicArtifactRef");
function lp(e) {
  for (let t of e)
    if (
      (t.productTurnId === void 0 &&
        B(
          "invalid_conversation",
          "Conversation row is missing its product turn identity",
        ),
      t.kind === "turnHeader" &&
        t.state === "running" &&
        B("invalid_conversation", "Running turns cannot be shared", {
          rowKind: t.kind,
          rowId: t.rowId,
        }),
      (t.kind === "assistantText" || t.kind === "reasoning") &&
        t.state === "streaming" &&
        B("invalid_conversation", "Streaming rows cannot be shared", {
          rowKind: t.kind,
          rowId: t.rowId,
        }),
      t.kind === "toolCall" &&
        tb.has(t.status) &&
        B("invalid_conversation", "Active tool calls cannot be shared", {
          rowKind: t.kind,
          rowId: t.rowId,
        }),
      t.kind === "subagent" &&
        t.status === "running" &&
        B("invalid_conversation", "Active subagents cannot be shared", {
          rowKind: t.kind,
          rowId: t.rowId,
        }),
      t.kind === "timelineMarker" &&
        ((t.marker.type === "compact" && t.marker.status === "running") ||
          (t.marker.type === "goalVerify" && t.marker.outcome === "running")) &&
        B(
          "invalid_conversation",
          "Active timeline operations cannot be shared",
        ),
      t.kind === "toolCall" &&
        t.display?.kind === "node_repl_images" &&
        B("unsafe_structure", "Inline tool images cannot be shared", {
          rowKind: t.kind,
          rowId: t.rowId,
        }),
      t.kind === "timelineMarker" &&
        ((t.marker.type === "forkNotice" ||
          t.marker.type === "forkCreated" ||
          t.marker.type === "checkpointRestored") &&
          B(
            "invalid_conversation",
            "Timeline references outside the shared projection are not supported",
          ),
        t.marker.type === "compact" &&
          t.marker.summaryRef !== void 0 &&
          B(
            "artifact_protocol_not_ready",
            "Conversation summary references require the artifact row protocol",
          )),
      t.kind === "artifact")
    ) {
      let { ref: n, ...s } = t;
      Nt(s, ao);
    } else if (t.kind === "toolCall" && t.output)
      Nt({ ...t, output: { text: t.output.text } }, ao);
    else if (t.kind === "userInput") {
      let { attachments: n, ...s } = t;
      Nt(s, ao);
    } else Nt(t, ao);
}
i(lp, "assertTerminalAndSafe");
function Dt(e, t) {
  let n = new Map();
  for (let s of e) n.has(s) || n.set(s, `${t}-${n.size + 1}`);
  return n;
}
i(Dt, "allocateIds");
function we(e, t, n) {
  let s = e.get(t);
  return (
    s ||
      B(
        "invalid_conversation",
        `Conversation ${n} reference is outside the shared projection`,
      ),
    s
  );
}
i(we, "requiredMappedId");
function ab(e, t) {
  return {
    productTurnIds: Dt(t, "share-product-turn"),
    turnIds: Dt(
      e.map((n) => n.turnId),
      "share-turn",
    ),
    entityIds: Dt(
      e.flatMap((n) => (n.entityId ? [n.entityId] : [])),
      "share-entity",
    ),
    toolCallIds: Dt(
      e.flatMap((n) => (n.kind === "toolCall" ? [n.toolCallId] : [])),
      "share-tool-call",
    ),
    artifactIds: Dt(
      e.flatMap((n) => (n.kind === "artifact" ? [n.artifactVersionId] : [])),
      "share-artifact",
    ),
    artifactKeys: Dt(
      e.flatMap((n) => (n.kind === "artifact" ? [n.logicalArtifactKey] : [])),
      "share-artifact-key",
    ),
  };
}
i(ab, "buildIdMaps");
function cb(e, t, n) {
  return (
    e.productTurnId ||
      B(
        "invalid_conversation",
        "Conversation row is missing its product turn identity",
      ),
    {
      rowId: t + 1,
      turnId: we(n.turnIds, e.turnId, "turn"),
      ...(e.entityId
        ? { entityId: we(n.entityIds, e.entityId, "entity") }
        : {}),
      productTurnId: we(n.productTurnIds, e.productTurnId, "product turn"),
      ...(e.visibility ? { visibility: e.visibility } : {}),
      createdAt: e.createdAt,
      createdAtSeq: e.createdAtSeq,
    }
  );
}
i(cb, "projectBase");
function db(e) {
  switch (e.marker.type) {
    case "compact":
      return {
        type: "compact",
        origin: e.marker.origin,
        status: e.marker.status,
        ...(e.marker.tokensBefore === void 0
          ? {}
          : { tokensBefore: e.marker.tokensBefore }),
        ...(e.marker.tokensAfter === void 0
          ? {}
          : { tokensAfter: e.marker.tokensAfter }),
      };
    case "modelChange":
      return { ...e.marker };
    case "goalSet":
      return { ...e.marker };
    case "goalVerify":
      return { ...e.marker };
    case "retryNotice":
      return { ...e.marker };
    case "forkNotice":
    case "forkCreated":
    case "checkpointRestored":
      B(
        "invalid_conversation",
        "Timeline references outside the shared projection are not supported",
      );
  }
}
i(db, "projectTimelineMarker");
function lb(e, t, n) {
  let s = cb(e, t, n);
  switch (e.kind) {
    case "turnHeader":
      return {
        ...s,
        kind: "turnHeader",
        origin: e.origin,
        ...(e.executionKind ? { executionKind: e.executionKind } : {}),
        state: e.state,
        startedAt: e.startedAt,
        ...(e.endedAt === void 0 ? {} : { endedAt: e.endedAt }),
        ...(e.activeMs === void 0 ? {} : { activeMs: e.activeMs }),
        ...(e.workSegments
          ? {
              workSegments: e.workSegments.map((a) => ({
                segmentId: a.segmentId,
                ...(a.triggerEntityId
                  ? {
                      triggerEntityId: we(
                        n.entityIds,
                        a.triggerEntityId,
                        "work segment entity",
                      ),
                    }
                  : {}),
                startedAt: a.startedAt,
                ...(a.endedAt === void 0 ? {} : { endedAt: a.endedAt }),
                ...(a.activeMs === void 0 ? {} : { activeMs: a.activeMs }),
              })),
            }
          : {}),
        ...(e.fileChanges ? { fileChanges: { ...e.fileChanges } } : {}),
      };
    case "userInput": {
      let a = e.originMeta
          ? {
              ...(e.originMeta.backgroundSource
                ? { backgroundSource: e.originMeta.backgroundSource }
                : {}),
              ...(e.originMeta.senderLabel
                ? { senderLabel: e.originMeta.senderLabel }
                : {}),
            }
          : void 0,
        c = e.attachments?.flatMap((d) =>
          co(d.ref)
            ? d.previewRef !== void 0 && !co(d.previewRef)
              ? []
              : [
                  {
                    ref: d.ref,
                    fileName: d.fileName,
                    mime: d.mime,
                    bytes: d.bytes,
                    ...(d.previewRef ? { previewRef: d.previewRef } : {}),
                  },
                ]
            : [],
        );
      return {
        ...s,
        kind: "userInput",
        text: e.text,
        origin: e.origin,
        ...(a && Object.keys(a).length > 0 ? { originMeta: a } : {}),
        ...(e.guided ? { guided: e.guided } : {}),
        ...(c && c.length > 0 ? { attachments: c } : {}),
      };
    }
    case "assistantText":
      return {
        ...s,
        kind: "assistantText",
        text: e.text,
        state: e.state,
        ...(e.model ? { model: e.model } : {}),
      };
    case "reasoning":
      return {
        ...s,
        kind: "reasoning",
        text: e.text,
        state: e.state,
        ...(e.durationMs === void 0 ? {} : { durationMs: e.durationMs }),
      };
    case "toolCall":
      return {
        ...s,
        kind: "toolCall",
        toolCallId: we(n.toolCallIds, e.toolCallId, "tool call"),
        toolName: e.toolName,
        status: e.status,
        inputText: e.inputText,
        ...(e.input === void 0 ? {} : { input: e.input }),
        ...(e.output ? { output: { text: e.output.text } } : {}),
        ...(e.display ? { display: sb(e) } : {}),
        ...(e.error ? { error: { ...e.error } } : {}),
        ...(e.backgrounded ? { backgrounded: e.backgrounded } : {}),
        ...(e.startedAt === void 0 ? {} : { startedAt: e.startedAt }),
        ...(e.endedAt === void 0 ? {} : { endedAt: e.endedAt }),
      };
    case "artifact": {
      let a = we(n.artifactIds, e.artifactVersionId, "artifact");
      return {
        ...s,
        kind: "artifact",
        artifactVersionId: a,
        logicalArtifactKey: we(
          n.artifactKeys,
          e.logicalArtifactKey,
          "artifact key",
        ),
        displayName: e.displayName,
        artifactType: e.artifactType,
        mimeType: e.mimeType,
        sizeBytes: e.sizeBytes,
        sha256: e.sha256,
        ref: `zcode-artifact://share/${a}`,
        state: e.state,
      };
    }
    case "timelineMarker":
      return {
        ...s,
        kind: "timelineMarker",
        ...(e.lane ? { lane: e.lane } : {}),
        marker: db(e),
      };
    case "subagent":
      B(
        "invalid_conversation",
        "Subagent detail rows must be filtered before public projection",
      );
    case "hookInvocation":
      B(
        "invalid_conversation",
        "Hook invocation rows are not part of the V1 public projection",
      );
  }
}
i(lb, "projectRow");
function ct(e, t) {
  new Set(e).size !== e.length &&
    B(
      "invalid_conversation",
      `Conversation public ${t} identities must be unique`,
    );
}
i(ct, "assertUnique");
function ub(e) {
  ((e.rows.length === 0 || e.selectedProductTurnIds.length === 0) &&
    B("invalid_conversation", "Conversation public projection cannot be empty"),
    lp(e.rows),
    ct(e.selectedProductTurnIds, "product turn"),
    e.selectedProductTurnIds.some((m) => !dp.test(m)) &&
      B(
        "invalid_conversation",
        "Conversation public product turn identity is invalid",
      ));
  let t = new Set(e.selectedProductTurnIds),
    n = new Map(),
    s = new Set(),
    a = [],
    c = [],
    d = new Set();
  for (let [m, f] of e.rows.entries())
    if (
      (f.rowId !== m + 1 &&
        B(
          "invalid_conversation",
          "Conversation public row identities must be contiguous",
        ),
      nb.test(f.turnId) ||
        B(
          "invalid_conversation",
          "Conversation public turn identity is invalid",
        ),
      d.add(f.turnId),
      (!f.productTurnId ||
        !dp.test(f.productTurnId) ||
        !t.has(f.productTurnId)) &&
        B(
          "invalid_conversation",
          "Conversation row belongs to an unselected product turn",
        ),
      f.entityId &&
        (rb.test(f.entityId) ||
          B(
            "invalid_conversation",
            "Conversation public entity identity is invalid",
          ),
        s.add(f.entityId)),
      f.actions !== void 0 &&
        B(
          "invalid_conversation",
          "Conversation public rows cannot contain local actions",
        ),
      f.kind === "turnHeader")
    )
      (n.set(f.productTurnId, (n.get(f.productTurnId) ?? 0) + 1),
        f.originMeta !== void 0 &&
          B(
            "invalid_conversation",
            "Conversation public turn headers cannot contain local work identity",
          ));
    else if (f.kind === "userInput") {
      (f.sourceCommandId !== void 0 ||
        f.rootSourceCommandId !== void 0 ||
        f.clientId !== void 0 ||
        f.originMeta?.workId !== void 0 ||
        f.originMeta?.senderSessionId !== void 0) &&
        B(
          "invalid_conversation",
          "Conversation public input contains local write identity",
        );
      for (let g of f.attachments ?? [])
        (co(g.ref) ||
          B(
            "invalid_conversation",
            "Conversation public input attachment reference is invalid",
          ),
          g.previewRef !== void 0 &&
            !co(g.previewRef) &&
            B(
              "invalid_conversation",
              "Conversation public input preview reference is invalid",
            ));
    } else
      f.kind === "assistantText"
        ? f.feedback !== void 0 &&
          B(
            "invalid_conversation",
            "Conversation public assistant text contains local feedback",
          )
        : f.kind === "toolCall"
          ? (ob.test(f.toolCallId) ||
              B(
                "invalid_conversation",
                "Conversation public tool call identity is invalid",
              ),
            a.push(f.toolCallId),
            (f.progress !== void 0 ||
              f.approvalInteractionId !== void 0 ||
              f.workId !== void 0) &&
              B(
                "invalid_conversation",
                "Conversation public tool call contains local runtime identity",
              ))
          : f.kind === "artifact"
            ? ((!ib.test(f.artifactVersionId) ||
                f.ref !== `zcode-artifact://share/${f.artifactVersionId}`) &&
                B(
                  "invalid_conversation",
                  "Conversation public artifact identity is invalid",
                ),
              c.push(f.artifactVersionId))
            : f.kind === "timelineMarker"
              ? f.sourceCommandId !== void 0 &&
                B(
                  "invalid_conversation",
                  "Conversation public timeline contains local command identity",
                )
              : f.kind === "subagent" &&
                B(
                  "invalid_conversation",
                  "Conversation public projection cannot contain subagent details",
                );
  (ct(a, "tool call"),
    ct(c, "artifact"),
    d.size === 0 &&
      B("invalid_conversation", "Conversation public projection has no turns"));
  for (let m of e.selectedProductTurnIds)
    n.get(m) !== 1 &&
      B(
        "invalid_conversation",
        "Conversation public product turns require exactly one header",
      );
  for (let m of e.rows)
    if (m.kind === "turnHeader")
      for (let f of m.workSegments ?? [])
        f.triggerEntityId !== void 0 &&
          !s.has(f.triggerEntityId) &&
          B(
            "invalid_conversation",
            "Conversation work segment entity reference is unresolved",
          );
}
i(ub, "assertConversationSharePublicProjection");
function lo(e) {
  (lp(e.rows),
    ct(e.selectedProductTurnIds, "source product turn"),
    e.selectedProductTurnIds.length === 0 &&
      B(
        "invalid_conversation",
        "Conversation product turn selection cannot be empty",
      ));
  let t = new Set(e.selectedProductTurnIds);
  e.rows.some((h) => !h.productTurnId || !t.has(h.productTurnId)) &&
    B(
      "invalid_conversation",
      "Conversation rows fall outside the selected product turns",
    );
  let n = e.rows.filter(
      (h) => h.kind !== "subagent" && h.kind !== "hookInvocation",
    ),
    s = n.filter((h) => h.kind === "artifact");
  (ct(
    s.map((h) => h.artifactVersionId),
    "source artifact",
  ),
    ct(
      s.map((h) => h.logicalArtifactKey),
      "source artifact logical key",
    ));
  let a = ab(n, e.selectedProductTurnIds),
    c = n.map((h, y) => lb(h, y, a)),
    d = s.map((h) => {
      let y = c.find(
        (v) =>
          v.kind === "artifact" &&
          v.artifactVersionId === a.artifactIds.get(h.artifactVersionId),
      );
      y?.productTurnId ||
        B("invalid_conversation", "Projected artifact row is missing");
      let S = pb(y.displayName);
      return {
        sourceRef: h.ref,
        descriptor: {
          artifact_id: y.artifactVersionId,
          logical_artifact_key: y.logicalArtifactKey,
          producer_product_turn_id: y.productTurnId,
          artifact_version: 1,
          state: y.state,
          ref: y.ref,
          artifact_type: y.artifactType,
          display_name: y.displayName,
          extension: S,
          mime_type: y.mimeType,
          size_bytes: y.sizeBytes,
          sha256: y.sha256,
        },
      };
    }),
    m = (e.additionalArtifacts ?? []).map((h) => ({
      ...h,
      descriptor: {
        ...h.descriptor,
        producer_product_turn_id: we(
          a.productTurnIds,
          h.descriptor.producer_product_turn_id,
          "input attachment product turn",
        ),
      },
    })),
    f = [
      ...d.map((h) => h.descriptor.artifact_id),
      ...m.map((h) => h.descriptor.artifact_id),
    ];
  ct(f, "artifact manifest");
  let g = {
    rows: c,
    selectedProductTurnIds: e.selectedProductTurnIds.map((h) =>
      we(a.productTurnIds, h, "product turn"),
    ),
    artifacts: [...d, ...m],
  };
  if (
    (e.contentDrafts?.length &&
      (g.contentBlocks = e.contentDrafts.map((h, y) => {
        let S = we(a.entityIds, h.entityId, "content fallback"),
          v = c.find((M) => M.entityId === S);
        v || B("invalid_conversation", "Content fallback is missing");
        let k = h.payload.artifacts.map((M) =>
          "resource_id" in M && M.resource_id
            ? {
                ...M,
                resource_id: we(
                  a.artifactIds,
                  M.resource_id,
                  "content resource",
                ),
              }
            : M,
        );
        return _o.parse({
          id: `share-content-${y + 1}`,
          type: "workflow",
          version: h.version ?? 1,
          product_turn_id: we(
            a.productTurnIds,
            h.productTurnId,
            "content turn",
          ),
          fallback_row_id: v.rowId,
          captured_at: h.capturedAt,
          resource_ids: k.flatMap((M) =>
            "resource_id" in M && M.resource_id ? [M.resource_id] : [],
          ),
          payload: { ...h.payload, artifacts: k },
        });
      })),
    e.toolPresentation)
  ) {
    let h = new Map(e.sourceRows?.map((v) => [v.rowId, v]) ?? []),
      y = new Map(
        e.sourceRows?.flatMap((v) =>
          v.kind === "subagent" ? [[v.parentToolCallId, v.subagentType]] : [],
        ) ?? [],
      ),
      S = n.flatMap((v, k) => {
        if (v.kind !== "toolCall") return [];
        let M = Wt(v.output?.display),
          R = (e.toolImages?.get(v.rowId) ?? []).flatMap((I) => {
            let b = a.artifactIds.get(I.resourceId);
            return b ? [{ resource_id: b, mime_type: I.mimeType }] : [];
          }),
          w = y.get(v.toolCallId),
          C = h.get(v.rowId),
          x = C?.kind === "toolCall" ? C : v,
          _ =
            x.cuaApp?.name ??
            (x.output?.display?.kind === "cua"
              ? x.output.display.targetApp?.displayName
              : void 0) ??
            (x.display?.kind === "node_repl_images"
              ? x.display.app?.displayName
              : void 0);
        return !M && !R.length && !w && !_
          ? []
          : [
              _o.parse({
                id: `share-content-${(g.contentBlocks?.length ?? 0) + k + 1}`,
                type: "tool-presentation",
                version: 1,
                product_turn_id: c[k].productTurnId,
                fallback_row_id: c[k].rowId,
                captured_at: v.endedAt ?? v.createdAt,
                resource_ids: [...new Set(R.map((I) => I.resource_id))],
                payload: {
                  ...(M ? { display: M } : {}),
                  ...(R.length ? { images: R } : {}),
                  ...(w ? { agent_type: w } : {}),
                  ...(_ ? { app_name: _ } : {}),
                },
              }),
            ];
      });
    S.length && (g.contentBlocks = [...(g.contentBlocks ?? []), ...S]);
  }
  return (ub(g), g);
}
i(lo, "buildConversationSharePublicProjection");
function pb(e) {
  let t = e.trim(),
    n = t.lastIndexOf(".");
  return (
    (n <= 0 || n === t.length - 1) &&
      B("invalid_conversation", "Conversation artifact extension is missing"),
    t.slice(n + 1).toLowerCase()
  );
}
i(pb, "extensionOf");
r();
o();
import { createHash as fb } from "node:crypto";
function Cs(e) {
  let t = e.includes("```") ? "````" : "```";
  return `${t}
${e}
${t}`;
}
i(Cs, "fenced");
function up(e) {
  let t = new Map(e.installedArtifacts.map((c) => [c.artifactId, c])),
    n = [`# Shared conversation: ${e.share.title}`],
    s = new Set();
  for (let c of e.rows)
    switch (c.kind) {
      case "turnHeader":
        break;
      case "userInput":
        {
          let d = (c.attachments ?? []).flatMap((m) => {
            let f = m.ref.startsWith("zcode-artifact://share/")
                ? m.ref.slice(23)
                : "",
              g = t.get(f);
            return g
              ? [
                  `- ${g.displayName}`,
                  `  - Path: ${g.workspaceRelativePath}`,
                  `  - MIME: ${g.mimeType}`,
                  `  - SHA-256: ${g.sha256}`,
                ]
              : [];
          });
          n.push(`## User

${c.text}${
            d.length > 0
              ? `

### Attachments

${d.join(`
`)}`
              : ""
          }`);
        }
        break;
      case "assistantText":
        n.push(`## Assistant

${c.text}`);
        break;
      case "reasoning":
        n.push(`## Reasoning

${c.text}`);
        break;
      case "toolCall":
        n.push(`## Tool: ${c.toolName}

### Input

${Cs(c.inputText)}${
          c.output?.text
            ? `

### Output

${Cs(c.output.text)}`
            : ""
        }`);
        break;
      case "timelineMarker":
        n.push(`## Timeline

${Cs(JSON.stringify(c.marker))}`);
        break;
      case "artifact": {
        let d = t.get(c.artifactVersionId);
        if (!d)
          throw new W(
            "invalid_contract",
            "Shared context artifact was not installed",
          );
        n.push(
          [
            `## Artifact: ${d.displayName}`,
            `- Path: ${d.workspaceRelativePath}`,
            `- MIME: ${d.mimeType}`,
            `- SHA-256: ${d.sha256}`,
          ].join(`
`),
        );
        break;
      }
      case "subagent":
      case "hookInvocation":
        throw new W(
          "invalid_contract",
          `Unsupported shared context row: ${c.kind}`,
        );
      default:
        s.add(c.kind ?? "unknown");
        break;
    }
  let a = `${n.join(`

`)}
`;
  return {
    formatterVersion: 1,
    markdown: a,
    markdownSha256: fb("sha256").update(a, "utf8").digest("hex"),
    unsupportedKinds: [...s],
  };
}
i(up, "formatSharedContextV1");
var gb = 5e3,
  hb = 12e4,
  yb = 12e4,
  wb = new Set(["ENOENT", "ENOTDIR", "EISDIR"]),
  vb = 200,
  mp = 6;
function kb(e) {
  return new Promise((t) => setTimeout(t, e));
}
i(kb, "wait");
async function gp(e, t, n) {
  if (e.length === 0) return [];
  let s = new Array(e.length),
    a = 0,
    c = Array.from({ length: Math.min(t, e.length) }, async () => {
      for (;;) {
        let d = a++;
        if (d >= e.length) return;
        s[d] = await n(e[d], d);
      }
    });
  return (await Promise.all(c), s);
}
i(gp, "mapWithConcurrency");
async function hp(e) {
  try {
    return { ok: !0, value: await e() };
  } catch (t) {
    return { ok: !1, error: t };
  }
}
i(hp, "settle");
function Sb(e) {
  return (
    e instanceof W &&
    e.reasonCode === "artifact_read_failed" &&
    typeof e.diagnostics?.errno == "string" &&
    wb.has(e.diagnostics.errno)
  );
}
i(Sb, "isMissingArtifactReadError");
function As(e) {
  let t = new Set(["<", ">", ":", '"', "/", "\\", "|", "?", "*"]);
  return [...e.normalize("NFKC")]
    .map((n) => (n.codePointAt(0) < 32 || t.has(n) ? "-" : n))
    .join("");
}
i(As, "sanitizeFileSegment");
function Pb(e, t, n) {
  let s =
      As(Ep(e.replace(/\\/gu, "/")))
        .replace(/^[. ]+|[. ]+$/gu, "")
        .slice(0, 180) || "artifact",
    a = s;
  if (n.has(a.toLowerCase())) {
    let c = s.lastIndexOf("."),
      d = t.replace(/[^A-Za-z0-9]/gu, "").slice(-8) || "artifact";
    a = c > 0 ? `${s.slice(0, c)}-${d}${s.slice(c)}` : `${s}-${d}`;
  }
  return (n.add(a.toLowerCase()), a);
}
i(Pb, "uniqueImportedFileName");
var Ls = Symbol("conversationShareConnectionScopeFactory"),
  _b = new Set([
    "fault.conversation.rowsRangeConnectionUntrusted",
    "fault.connection.handshakeRequired",
    "fault.connection.closed",
  ]);
function bs(e) {
  return e instanceof Error && _b.has(e.message)
    ? new W(
        "connection_unavailable",
        "Conversation share connection is not ready",
      )
    : e;
}
i(bs, "normalizeConversationShareConnectionError");
function ut(e, t) {
  return t?.trim() || e?.trim() || "__default_conversation_workspace__";
}
i(ut, "workspaceKeyOf");
function Es(e, t) {
  return `${e}\0${t}`;
}
i(Es, "importDedupeKey");
function Ts(e, t) {
  return [
    ut(e.workspacePath, e.workspaceIdentity),
    e.remoteSessionId ?? "",
    e.sessionId,
    t,
  ].join("\0");
}
i(Ts, "previewPreflightKey");
var Cb = { "zh-CN": "\u6765\u81EA\u5206\u4EAB\uFF1A", "en-US": "From Share: " };
function Ib(e, t) {
  return `${Cb[t ?? "zh-CN"]}${e.trim()}`;
}
i(Ib, "formatImportedShareSessionTitle");
function yp(e, t) {
  if (!t) return e;
  let n = Js(e.share_url, t);
  return n === e.share_url ? e : { ...e, share_url: n };
}
i(yp, "localizePublishedShare");
var wp = 1,
  bb = l
    .object({
      formatVersion: l.number().int().positive(),
      shareId: l.string().trim().min(1),
      contextId: l.string().trim().min(1),
      title: l.string(),
      rows: l.array(l.unknown()),
      content_blocks: l.array(l.unknown()).optional(),
      artifacts: l.array(
        l.object({
          artifactId: l.string().trim().min(1),
          displayName: l.string(),
          mimeType: l.string().optional(),
          workspaceRelativePath: l.string().optional(),
        }),
      ),
    })
    .strip();
function Xe(e) {
  let t = new Map();
  for (let n of e)
    n.kind !== "turnHeader" ||
      !n.productTurnId ||
      t.has(n.productTurnId) ||
      t.set(n.productTurnId, t.size + 1);
  return t;
}
i(Xe, "turnOrdinalByProductTurn");
function Ms(e, t) {
  return e.productTurnId ? t.get(e.productTurnId) : void 0;
}
i(Ms, "rowTurnOrdinal");
function xs(e) {
  return typeof e == "string"
    ? /^(?:data|file):/iu.test(e)
    : Array.isArray(e)
      ? e.some(xs)
      : !e || typeof e != "object"
        ? !1
        : Object.entries(e).some(([t, n]) => (t === "ref" ? !1 : xs(n)));
}
i(xs, "hasUnsafeShareString");
function Os(e) {
  return typeof e == "string"
    ? /^zcode-artifact:\/\//iu.test(e)
    : Array.isArray(e)
      ? e.some(Os)
      : !e || typeof e != "object"
        ? !1
        : Object.entries(e).some(([t, n]) => (t === "ref" ? !1 : Os(n)));
}
i(Os, "hasUnsupportedArtifactReference");
function vp(e) {
  let t = [];
  for (let n of e) {
    if (n.kind === "timelineMarker") {
      if (
        (n.marker.type === "compact" && n.marker.status === "running") ||
        (n.marker.type === "goalVerify" && n.marker.outcome === "running")
      ) {
        t.push(n);
        continue;
      }
      if (
        n.marker.type === "forkNotice" ||
        n.marker.type === "forkCreated" ||
        n.marker.type === "checkpointRestored"
      )
        continue;
      continue;
    }
    (n.kind === "toolCall" && n.toolName === "EnterPlanMode") || t.push(n);
  }
  return t;
}
i(vp, "sanitizeUnsupportedShareStructures");
function kp(e, t, n) {
  let s = Xe(n),
    a = [];
  return {
    rows: e.filter((d) => {
      if (d.kind !== "artifact") return !0;
      let m = Tn(d.displayName),
        f = Rp(d.mimeType);
      return t.allowed_artifacts.find(
        (h) =>
          h.type === d.artifactType &&
          h.extensions.some((y) => y.replace(/^\./u, "").toLowerCase() === m) &&
          h.mime_types.some((y) => y.toLowerCase() === f),
      )
        ? !0
        : (a.push({
            code: "artifact_type_not_allowed",
            scope: "artifact",
            rowId: d.rowId,
            ...(d.productTurnId && s.has(d.productTurnId)
              ? { turnOrdinal: s.get(d.productTurnId) }
              : {}),
            ...(d.productTurnId ? { productTurnId: d.productTurnId } : {}),
            artifactDisplayName: d.displayName,
            artifactType: d.artifactType,
            ...(m ? { extension: m } : {}),
            mimeType: f,
            allowedFormats: Tp(t),
            allowedArtifacts: Ds(t),
          }),
          !1);
    }),
    warnings: a,
  };
}
i(kp, "sanitizeUnsupportedShareArtifacts");
function Sp(e, t = e) {
  let n = [],
    s = Xe(t),
    a = i((c, d) => {
      n.push({
        code: d,
        scope: d === "missing_product_turn" ? "conversation" : "turn",
        ...(c.rowId === void 0 ? {} : { rowId: c.rowId }),
        ...(Ms(c, s) === void 0 ? {} : { turnOrdinal: Ms(c, s) }),
        ...(c.productTurnId ? { productTurnId: c.productTurnId } : {}),
      });
    }, "add");
  for (let c of e)
    (c.productTurnId || a(c, "missing_product_turn"),
      c.kind === "turnHeader" && c.state === "running" && a(c, "running_turn"),
      (c.kind === "assistantText" || c.kind === "reasoning") &&
        c.state === "streaming" &&
        a(c, "streaming_row"),
      c.kind === "toolCall" &&
        (c.status === "inputStreaming" ||
          c.status === "pendingApproval" ||
          c.status === "running") &&
        a(c, "active_tool_call"),
      c.kind === "subagent" &&
        c.status === "running" &&
        a(c, "active_subagent"),
      c.kind === "timelineMarker" &&
        ((c.marker.type === "compact" && c.marker.status === "running") ||
          (c.marker.type === "goalVerify" && c.marker.outcome === "running")) &&
        a(c, "unsupported_timeline"),
      xs(c) && a(c, "unsafe_url"),
      Os(c) && a(c, "artifact_protocol_not_ready"));
  return n;
}
i(Sp, "collectShareStructureIssues");
function Tp(e) {
  return e.allowed_artifacts.flatMap((t) =>
    t.extensions.map(
      (n) => `${t.type.toUpperCase()} (.${n.replace(/^\./u, "")})`,
    ),
  );
}
i(Tp, "allowedFormatLabels");
function Ds(e) {
  return e.allowed_artifacts.map((t) => ({
    type: t.type,
    extensions: [...t.extensions],
    mimeTypes: [...t.mime_types],
  }));
}
i(Ds, "allowedArtifactSummaries");
function En(e) {
  return bp("sha256").update(JSON.stringify(e)).digest("hex");
}
i(En, "capabilitiesFingerprint");
function Tn(e) {
  let t = e.replace(/\\/gu, "/").split("/").at(-1) ?? e,
    n = t.lastIndexOf(".");
  return n > 0 && n < t.length - 1 ? t.slice(n + 1).toLowerCase() : void 0;
}
i(Tn, "fileExtension");
function Rp(e) {
  return e.split(";", 1)[0]?.trim().toLowerCase() || "application/octet-stream";
}
i(Rp, "normalizedMimeType");
function Rs(e) {
  return Ep(e.replace(/\\/gu, "/")) || "\u9644\u4EF6";
}
i(Rs, "attachmentDisplayName");
function Pp(e, t, n) {
  if (t)
    return e.allowed_artifacts.find(
      (s) =>
        s.extensions.some((a) => a.replace(/^\./u, "").toLowerCase() === t) &&
        s.mime_types.some((a) => a.toLowerCase() === n),
    );
}
i(Pp, "allowedArtifactFor");
function Eb(e) {
  let t = ht(e);
  if (t) return t === ee.shareStatNotFound || t === ee.statNotFile;
  let n = e instanceof Error ? e.message : String(e);
  return /ENOENT|not found|not_found|statNotFile|is_directory/iu.test(n);
}
i(Eb, "isDefiniteMissingAttachment");
function Tb(e) {
  let t = ht(e);
  if (t)
    return (
      t === ee.shareStatNotAuthorized ||
      t === ee.shareReadNotAuthorized ||
      t === ee.shareStatConnectionUntrusted ||
      t === ee.shareReadConnectionUntrusted
    );
  let n = e instanceof Error ? e.message : String(e);
  return /shareStatNotAuthorized|shareReadNotAuthorized|connectionUntrusted/iu.test(
    n,
  );
}
i(Tb, "isAttachmentAuthorizationError");
function Rb(e) {
  let t = ht(e);
  return t === ee.shareStatTooLarge || t === ee.previewTooLarge;
}
i(Rb, "isAttachmentTooLargeError");
function _p(e, t, n, s, a) {
  return e.map((c) => {
    let d = t.get(c),
      m = i(
        (f) =>
          f.filter(
            (g) =>
              g.turnOrdinal === d ||
              (g.turnOrdinal === void 0 &&
                g.rowId === void 0 &&
                g.artifactDisplayName === void 0 &&
                (g.scope === "conversation" || g.scope === "transport")),
          ),
        "forTurn",
      );
    return {
      productTurnId: c,
      blockingIssues: m(n),
      skippableWarnings: m(s),
      deferredIssues: m(a),
    };
  });
}
i(_p, "buildTurnPreflightResults");
function Cp(e) {
  return e.filter((t) => t.kind !== "artifact");
}
i(Cp, "removeIndependentArtifactRows");
function le(e, t) {
  throw new W(e, t);
}
i(le, "throwServiceError");
function Ip(e, t) {
  let n;
  if (t.kind === "all")
    n = new Set(
      e
        .filter((d) => d.kind === "turnHeader")
        .map((d) => d.productTurnId)
        .filter((d) => d !== void 0),
    );
  else if (t.kind === "productTurns")
    (t.productTurnIds.length === 0 &&
      le("invalid_selection", "At least one product turn must be selected"),
      (n = new Set(t.productTurnIds)));
  else {
    t.rowIds.length === 0 &&
      le("invalid_selection", "At least one conversation row must be selected");
    let d = new Map(e.map((m) => [m.rowId, m]));
    n = new Set();
    for (let m of new Set(t.rowIds)) {
      let f = d.get(m);
      (f?.productTurnId ||
        le("invalid_selection", "A selected row no longer exists"),
        n.add(f.productTurnId));
    }
  }
  let s = [],
    a = new Map();
  for (let d of e)
    d.kind !== "turnHeader" ||
      !d.productTurnId ||
      (a.set(d.productTurnId, (a.get(d.productTurnId) ?? 0) + 1),
      n.has(d.productTurnId) && s.push(d.productTurnId));
  (s.length === 0 || s.length !== n.size || s.some((d) => a.get(d) !== 1)) &&
    le(
      "invalid_selection",
      "Selected product turns are incomplete or ambiguous",
    );
  let c = new Set(
    e
      .filter(
        (d) =>
          d.kind === "turnHeader" &&
          d.productTurnId !== void 0 &&
          n.has(d.productTurnId),
      )
      .map((d) => d.turnId),
  );
  return {
    productTurnIds: s,
    rows: e.filter(
      (d) =>
        (d.productTurnId !== void 0 && n.has(d.productTurnId)) ||
        (d.productTurnId === void 0 && c.has(d.turnId)),
    ),
  };
}
i(Ip, "selectRows");
var Ns = class {
  static {
    i(this, "ConversationShareService");
  }
  zcodeAgentService;
  client;
  artifactSource;
  confirmPollIntervalMs;
  confirmPollTimeoutMs;
  now;
  sleep;
  progressEmitters = new Map();
  importProgressEmitters = new Map();
  zcodeSessionService;
  download;
  downloadTimeoutMs;
  conversationWorkspaceRoot;
  shareWebUrl;
  importIndexPath;
  logger;
  publishPhases = new Map();
  previewPreflightSnapshots = new Map();
  completedImports = new Map();
  completedImportsByWorkspace = new Map();
  inFlightImports = new Map();
  inFlightImportsByWorkspace = new Map();
  completedImportsLoaded;
  importIndexWriteChain = Promise.resolve();
  constructor(t) {
    ((this.zcodeAgentService = t.zcodeAgentService),
      (this.client = t.client),
      (this.artifactSource = t.artifactSource),
      (this.confirmPollIntervalMs = t.confirmPollIntervalMs ?? gb),
      (this.confirmPollTimeoutMs = t.confirmPollTimeoutMs ?? hb),
      (this.now = t.now ?? Date.now),
      (this.sleep = t.sleep ?? kb),
      (this.zcodeSessionService = t.zcodeSessionService),
      (this.download =
        t.download ?? ((n, s) => fetch(n, { signal: s?.signal }))),
      (this.downloadTimeoutMs = t.downloadTimeoutMs ?? yb),
      (this.conversationWorkspaceRoot = t.conversationWorkspaceRoot ?? Ln()),
      (this.shareWebUrl = (
        t.shareWebUrl ??
        process.env.ZCODE_CONVERSATION_SHARE_WEB_URL ??
        `${go(process.env)}/cn/share`
      ).replace(/\/+$/u, "")),
      (this.importIndexPath = ge(
        this.conversationWorkspaceRoot,
        ".zcode-share-imports.json",
      )),
      (this.logger = t.logger ?? T("conversation-share")),
      (this.completedImportsLoaded = this.loadCompletedImportIndex()),
      this.zcodeSessionService &&
        this.cleanupAbandonedImports().catch(() => {}));
  }
  getCapabilities() {
    return this.client.getCapabilities();
  }
  setPreviewPreflightSnapshot(t, n) {
    for (
      this.previewPreflightSnapshots.delete(t),
        this.previewPreflightSnapshots.set(t, n);
      this.previewPreflightSnapshots.size > vb;
    ) {
      let s = this.previewPreflightSnapshots.keys().next().value;
      if (s === void 0) break;
      this.previewPreflightSnapshots.delete(s);
    }
  }
  clearPreviewPreflightSnapshots(t) {
    let n = Ts(t, "");
    for (let s of this.previewPreflightSnapshots.keys())
      s.startsWith(n) && this.previewPreflightSnapshots.delete(s);
  }
  async preflight(t) {
    try {
      return await this.preflightWithAgent(t, this.zcodeAgentService);
    } catch (n) {
      throw bs(n);
    }
  }
  async preflightWithAgent(t, n) {
    let s = await this.client.getCapabilities(),
      a = Ds(s),
      c = await this.loadAllRows(t, n),
      d = [],
      m = [],
      f = [],
      g;
    try {
      g = Ip(c.rows, t.selection);
    } catch (P) {
      if (P instanceof W)
        d.push({ code: "invalid_selection", scope: "conversation" });
      else throw P;
      return {
        revision: c.revision,
        logEpoch: c.logEpoch,
        capabilitiesFingerprint: En(s),
        blockingIssues: d,
        skippableWarnings: m,
        deferredIssues: f,
        supportedArtifactTypes: a,
        turnResults: [],
      };
    }
    let h = _s(Cp(vp(g.rows)), s, Xe(c.rows)),
      y = kp(h.rows, s, c.rows),
      S = await vs({
        agent: n,
        input: t,
        rows: y.rows,
        allRows: c.rows,
        capabilities: s,
        capturedAt: this.now(),
        preflight: !0,
      });
    if (!Ne(s, "tool-presentation"))
      for (let P of g.rows)
        P.kind === "toolCall" &&
          (Wt(P.output?.display) || P.display?.kind === "node_repl_images") &&
          h.warnings.push({
            code: "content_unavailable",
            scope: "turn",
            productTurnId: P.productTurnId,
            rowId: P.rowId,
          });
    let v = S.rows,
      k = S.drafts.flatMap((P) =>
        P.payload.unavailable ||
        P.payload.artifacts.some((N) => N.unavailable) ||
        !Ne(s)
          ? [
              {
                code: "content_unavailable",
                scope: "turn",
                productTurnId: P.productTurnId,
                turnOrdinal: Xe(c.rows).get(P.productTurnId),
              },
            ]
          : [],
      );
    (m.push(...h.warnings, ...y.warnings, ...k), d.push(...Sp(v, c.rows)));
    let M = v.some((P) =>
        P.kind === "turnHeader" || P.kind === "timelineMarker"
          ? !1
          : P.kind === "assistantText" ||
              P.kind === "reasoning" ||
              P.kind === "userInput"
            ? P.text.trim().length > 0
            : P.kind === "toolCall"
              ? !!(
                  P.inputText?.trim() ||
                  P.output?.text?.trim() ||
                  P.error?.message?.trim()
                )
              : !0,
      ),
      R = Xe(c.rows),
      w = [];
    for (let P of v)
      if (!(P.kind !== "userInput" || !P.attachments))
        for (let [N, F] of P.attachments.entries()) {
          let H = Tn(F.fileName),
            K = Rp(F.mime),
            L = Pp(s, H, K),
            j = {
              scope: "artifact",
              rowId: P.rowId,
              ...(P.productTurnId && R.has(P.productTurnId)
                ? { turnOrdinal: R.get(P.productTurnId) }
                : {}),
              ...(P.productTurnId ? { productTurnId: P.productTurnId } : {}),
              artifactDisplayName: Rs(F.fileName),
              ...(H ? { extension: H } : {}),
              mimeType: K,
              ...(L
                ? { artifactType: L.type }
                : { artifactType: H ?? "unknown" }),
              allowedArtifacts: a,
            };
          if (!P.entityId) {
            d.push({
              code: "input_attachment",
              scope: "artifact",
              rowId: P.rowId,
              ...(j.turnOrdinal === void 0
                ? {}
                : { turnOrdinal: j.turnOrdinal }),
              ...(j.productTurnId === void 0
                ? {}
                : { productTurnId: j.productTurnId }),
              artifactDisplayName: Rs(F.fileName),
            });
            continue;
          }
          w.push({
            row: { ...P, entityId: P.entityId },
            attachmentIndex: N,
            attachment: F,
            allowed: L,
            baseIssue: j,
          });
        }
    let C = await gp(w, mp, (P) =>
      hp(() =>
        n.conversationAttachmentStatV4({
          workspacePath: t.workspacePath,
          ...(t.workspaceIdentity
            ? { workspaceIdentity: t.workspaceIdentity }
            : {}),
          ...(t.remoteSessionId ? { remoteSessionId: t.remoteSessionId } : {}),
          sessionId: t.sessionId,
          target: { rowId: P.row.rowId, entityId: P.row.entityId },
          attachmentIndex: P.attachmentIndex,
          ref: P.attachment.ref,
        }),
      ),
    );
    for (let [P, N] of w.entries()) {
      let { row: F, attachment: H, allowed: K, baseIssue: L } = N,
        j = C[P];
      if (j.ok) {
        let z = j.value;
        K
          ? z.totalBytes > s.max_artifact_bytes
            ? d.push({
                code: "artifact_size_limit",
                ...L,
                actual: z.totalBytes,
                limit: s.max_artifact_bytes,
              })
            : H.bytes > 0 && z.totalBytes !== H.bytes
              ? m.push({
                  code: "artifact_changed",
                  ...L,
                  availability: "changed",
                })
              : (M = !0)
          : m.push({ code: "artifact_type_not_allowed", ...L });
      } else {
        let z = j.error;
        Tb(z)
          ? d.push({
              code: "artifact_protocol_not_ready",
              scope: "artifact",
              rowId: F.rowId,
              ...(L.turnOrdinal === void 0
                ? {}
                : { turnOrdinal: L.turnOrdinal }),
              ...(L.productTurnId === void 0
                ? {}
                : { productTurnId: L.productTurnId }),
              artifactDisplayName: Rs(H.fileName),
            })
          : Rb(z)
            ? d.push({
                code: "artifact_size_limit",
                ...L,
                limit: s.max_artifact_bytes,
              })
            : Eb(z)
              ? m.push({
                  code: "input_attachment_unavailable",
                  ...L,
                  availability: "not_found",
                })
              : ((M = !0),
                f.push({
                  code: "artifact_read_failed",
                  ...L,
                  availability: "unknown",
                }));
      }
    }
    if (
      (M || d.push({ code: "no_shareable_content", scope: "conversation" }),
      d.length > 0)
    ) {
      let P = Ke(d),
        N = Ke(m),
        F = Ke(f);
      return {
        revision: c.revision,
        logEpoch: c.logEpoch,
        capabilitiesFingerprint: En(s),
        blockingIssues: P.issues,
        skippableWarnings: N.issues,
        deferredIssues: F.issues,
        supportedArtifactTypes: a,
        turnResults: _p(g.productTurnIds, R, P.issues, N.issues, F.issues),
      };
    }
    let x = lo({
      rows: v,
      selectedProductTurnIds: g.productTurnIds,
      toolPresentation: Ne(s, "tool-presentation"),
      toolImages: h.toolImages,
      sourceRows: c.rows,
    });
    x.rows.length > s.max_rows &&
      d.push({
        code: "rows_limit",
        scope: "conversation",
        actual: x.rows.length,
        limit: s.max_rows,
      });
    let _ = this.collectArtifactManifestIssues(s, x.artifacts).map((P) => {
      let N = v.find(
        (F) => F.kind === "artifact" && F.displayName === P.artifactDisplayName,
      );
      return N
        ? {
            ...P,
            rowId: N.rowId,
            productTurnId: N.productTurnId,
            turnOrdinal: Ms(N, R),
          }
        : P;
    });
    (d.push(..._.filter((P) => P.code !== "artifact_type_not_allowed")),
      m.push(..._.filter((P) => P.code === "artifact_type_not_allowed")));
    let I = new Map(),
      b = new Map();
    for (let P of v)
      if (
        (P.kind === "turnHeader" &&
          P.productTurnId &&
          I.set(P.productTurnId, P),
        P.kind === "assistantText" && P.productTurnId && !so(P))
      ) {
        let N = b.get(P.productTurnId) ?? [];
        (N.push(P.text), b.set(P.productTurnId, N));
      }
    for (let [P, N] of b) {
      let F = I.get(P);
      if (!F) continue;
      let H = N.join(`

`),
        L = xn(H, t.workspacePath).some(
          (Z) => Z.kind === "markdown" || Z.kind === "html",
        ),
        j;
      if (L && F.fileChanges?.state !== "reverted") {
        if (!F.entityId) {
          f.push({
            code: "artifact_read_failed",
            scope: "artifact",
            rowId: F.rowId,
            turnOrdinal: R.get(P),
            productTurnId: P,
            availability: "unknown",
          });
          continue;
        }
        let Z = await n.conversationFileChangesV4({
          workspacePath: t.workspacePath,
          ...(t.workspaceIdentity
            ? { workspaceIdentity: t.workspaceIdentity }
            : {}),
          ...(t.remoteSessionId ? { remoteSessionId: t.remoteSessionId } : {}),
          sessionId: t.sessionId,
          target: { rowId: F.rowId, entityId: F.entityId },
          baseRevision: c.revision,
          baseLogEpoch: c.logEpoch,
        });
        j = Z.items.map((V) => ({
          path: V.path,
          state: Z.state === "reverted" ? "reverted" : "active",
        }));
      }
      let z = On({
          assistantText: H,
          productTurnId: P,
          workspacePath: t.workspacePath,
          fileChanges: j,
        }),
        $ = [],
        ue = new Set(),
        fe = this.artifactSource.stat !== void 0,
        Ce = this.artifactSource.stat,
        ve = Ce
          ? await gp(z, mp, (Z) =>
              hp(() =>
                Ce({ workspacePath: t.workspacePath, ref: Z.sourceRef }),
              ),
            )
          : [];
      for (let [Z, V] of z.entries()) {
        let Ie = {
            scope: "artifact",
            rowId: F.rowId,
            turnOrdinal: R.get(P),
            productTurnId: P,
            artifactDisplayName: V.displayName,
            artifactType: V.artifactType,
            extension: Tn(V.displayName),
            mimeType: V.mimeType,
            allowedArtifacts: a,
          },
          ie = ve[Z];
        if (!ie) {
          ((fe = !1),
            f.push({
              code: "artifact_read_failed",
              ...Ie,
              availability: "unknown",
            }));
          continue;
        }
        if (ie.ok) {
          if (ue.has(ie.value.canonicalPath)) continue;
          ue.add(ie.value.canonicalPath);
        } else {
          if (Sb(ie.error)) continue;
          ((fe = !1),
            f.push({
              code: "artifact_read_failed",
              ...Ie,
              availability: "unknown",
            }));
          continue;
        }
        $.length < Mn && $.push(V);
      }
      for (let Z of $) {
        let V = {
          scope: "artifact",
          rowId: F.rowId,
          turnOrdinal: R.get(P),
          productTurnId: P,
          artifactDisplayName: Z.displayName,
          artifactType: Z.artifactType,
          extension: Tn(Z.displayName),
          mimeType: Z.mimeType,
          allowedArtifacts: a,
        };
        (!(Z.previewKind === "video" || Z.previewKind === "audio") &&
          Pp(s, Tn(Z.displayName), Z.mimeType)) ||
          m.push({ code: "artifact_type_not_allowed", ...V });
      }
      let Ge = Ts(t, P);
      fe
        ? this.setPreviewPreflightSnapshot(Ge, {
            revision: c.revision,
            logEpoch: c.logEpoch,
            capabilitiesFingerprint: En(s),
            candidateFingerprint: Ps(z),
            visibleSourceRefs: $.map((Z) => Z.sourceRef),
          })
        : this.previewPreflightSnapshots.delete(Ge);
    }
    let A = Ke(d),
      E = Ke(m),
      O = Ke(f);
    return {
      revision: c.revision,
      logEpoch: c.logEpoch,
      capabilitiesFingerprint: En(s),
      blockingIssues: A.issues,
      skippableWarnings: E.issues,
      deferredIssues: O.issues,
      supportedArtifactTypes: a,
      turnResults: _p(g.productTurnIds, R, A.issues, E.issues, O.issues).map(
        (P) => ({
          ...P,
          rowBudget: {
            count: x.rows.filter(
              (N) =>
                N.productTurnId ===
                x.selectedProductTurnIds[
                  g.productTurnIds.indexOf(P.productTurnId)
                ],
            ).length,
            limit: s.max_rows,
          },
        }),
      ),
    };
  }
  getPreview(t) {
    return this.client.getPreview(t);
  }
  getContinuation(t) {
    return this.client.getContinuation(t.shareCode, {
      schema_version: 1,
      client_request_id: t.clientRequestId,
    });
  }
  [Ls](t) {
    return {
      getCapabilities: i(() => this.getCapabilities(), "getCapabilities"),
      preflight: i(async (n) => {
        try {
          return await this.preflightWithAgent(n, t);
        } catch (s) {
          throw bs(s);
        }
      }, "preflight"),
      publish: i((n, s) => this.publishWithAgent(n, s, t), "publish"),
      onDynamicPublishProgress: i(
        (n) => this.onDynamicPublishProgress(n),
        "onDynamicPublishProgress",
      ),
      importShare: i((n, s) => this.importShare(n, s), "importShare"),
      onDynamicImportProgress: i(
        (n) => this.onDynamicImportProgress(n),
        "onDynamicImportProgress",
      ),
      getImportedConversation: i(
        (n) => this.getImportedConversation(n),
        "getImportedConversation",
      ),
      getPreview: i((n) => this.getPreview(n), "getPreview"),
      getContinuation: i((n) => this.getContinuation(n), "getContinuation"),
    };
  }
  onDynamicPublishProgress(t) {
    return this.getProgressEmitter(t).event;
  }
  onDynamicImportProgress(t) {
    return this.getImportProgressEmitter(t).event;
  }
  async downloadArtifactBytes(t) {
    let n = i(
        (c, d) => ({
          code: c,
          scope: "artifact",
          artifactDisplayName: t.display_name,
          artifactType: t.artifact_type,
          extension: t.extension,
          mimeType: t.mime_type,
          phase: "downloading",
          ...(d?.actual === void 0 ? {} : { actual: d.actual }),
          ...(d?.limit === void 0 ? {} : { limit: d.limit }),
        }),
        "artifactIssue",
      ),
      s = new AbortController(),
      a = setTimeout(() => s.abort(), this.downloadTimeoutMs);
    try {
      let c = await this.download(t.download_url, { signal: s.signal });
      if (!c.ok)
        throw new W("network", "Conversation artifact download failed", {
          issues: [n("unknown")],
        });
      let d = Number(c.headers.get("content-length"));
      if (Number.isFinite(d) && d > t.size_bytes)
        throw (
          s.abort(),
          new W(
            "invalid_contract",
            "Conversation artifact integrity check failed",
            {
              issues: [
                n("artifact_changed", { actual: d, limit: t.size_bytes }),
              ],
            },
          )
        );
      let m = new Uint8Array(await c.arrayBuffer()),
        f = c.headers.get("content-type")?.split(";", 1)[0]?.trim();
      return { bytes: m, responseMimeType: f };
    } catch (c) {
      throw s.signal.aborted && !(c instanceof W)
        ? new W("network", "Conversation artifact download timed out", {
            issues: [n("unknown")],
          })
        : c;
    } finally {
      clearTimeout(a);
    }
  }
  async importShare(t, n) {
    await this.completedImportsLoaded;
    let s = ut(t.targetWorkspacePath, t.targetWorkspaceIdentity),
      a = Es(t.shareCode, s),
      c = `${a}\0${t.clientRequestId}`,
      d =
        this.completedImports.get(c) ?? this.completedImportsByWorkspace.get(a);
    if (d)
      return (
        this.logger.info(void 0, "conversation share import reused", {
          operationId: n,
          phase: "complete",
        }),
        { ...d, reused: !0 }
      );
    let m =
      this.inFlightImports.get(c) ?? this.inFlightImportsByWorkspace.get(a);
    if (m) return m;
    let f = this.importShareInternal(t, n)
      .then(
        (g) => (
          this.completedImports.set(c, g),
          this.completedImportsByWorkspace.set(a, g),
          this.persistCompletedImportIndex()
            .catch(() => {})
            .then(() => g)
        ),
      )
      .finally(() => {
        this.inFlightImports.delete(c);
      });
    return (
      this.inFlightImports.set(c, f),
      this.inFlightImportsByWorkspace.set(a, f),
      f.then(
        () => {
          this.inFlightImportsByWorkspace.get(a) === f &&
            this.inFlightImportsByWorkspace.delete(a);
        },
        () => {
          this.inFlightImportsByWorkspace.get(a) === f &&
            this.inFlightImportsByWorkspace.delete(a);
        },
      ),
      f
    );
  }
  async importShareInternal(t, n) {
    this.zcodeSessionService ||
      le("feature_disabled", "Conversation share import is unavailable");
    let s = await this.getContinuation(t),
      a = t.targetWorkspaceKind === "remote" || !!t.targetWorkspaceIdentity,
      c =
        t.targetWorkspacePath && !a
          ? t.targetWorkspacePath
          : this.conversationWorkspaceRoot,
      d = t.targetWorkspaceIdentity && !a ? t.targetWorkspaceIdentity : void 0,
      m = ge(c, ".zcode-share"),
      f = ge(m, As(s.share.share_id)),
      g = ge(f, ".zcode-share-import.json"),
      h = ge(f, ".share-import-staging"),
      y = ge(f, "shared-artifacts"),
      S = ge(f, "shared-conversation.json"),
      v = uo(),
      k = `shared-context-${uo()}`,
      M = `share-import-${uo()}`,
      R = `${this.shareWebUrl}/${encodeURIComponent(t.shareCode)}`;
    await Is(m, { recursive: !0 });
    try {
      let C = JSON.parse(await po(g, "utf8"));
      if (
        C.shareCode === t.shareCode &&
        typeof C.sessionId == "string" &&
        C.sessionId.startsWith("share-import-")
      ) {
        let _ = (
          await this.zcodeSessionService.listSessions({
            workspacePath: c,
            limit: 100,
          })
        ).find((I) => I.sessionId === C.sessionId);
        if (
          _ &&
          typeof C.contextId == "string" &&
          typeof C.shareUrl == "string"
        )
          return {
            workspacePath: c,
            ...(d ? { workspaceIdentity: d } : {}),
            sessionId: _.sessionId,
            contextId: C.contextId,
            shareUrl: C.shareUrl,
            title: _.title,
            reused: !0,
          };
        await dt(f, { recursive: !0, force: !0 });
      }
    } catch {}
    let w = !1;
    try {
      (await Is(f), (w = !0));
    } catch (C) {
      throw (
        C.code === "EEXIST" &&
          le("unknown", "Conversation share import is already in progress"),
        C
      );
    }
    try {
      await lt(
        g,
        JSON.stringify({
          importId: v,
          shareCode: t.shareCode,
          clientRequestId: t.clientRequestId,
          sessionId: M,
          shareId: s.share.share_id,
          contextId: k,
          shareUrl: R,
          workspaceKey: ut(c, d),
          phase: "preparing",
          createdAt: this.now(),
        }),
        "utf8",
      );
    } catch (C) {
      throw (await dt(f, { recursive: !0, force: !0 }).catch(() => {}), C);
    }
    try {
      await Is(h);
      let C = [],
        x = new Set(),
        _ = 0;
      (this.reportImportProgress(n, "downloading", 0, s.artifacts.length),
        await lt(
          g,
          JSON.stringify({
            importId: v,
            shareCode: t.shareCode,
            clientRequestId: t.clientRequestId,
            sessionId: M,
            shareId: s.share.share_id,
            contextId: k,
            shareUrl: R,
            workspaceKey: ut(c, d),
            phase: "downloading",
            createdAt: this.now(),
          }),
          "utf8",
        ));
      for (let A of s.artifacts) {
        let { bytes: E, responseMimeType: O } =
            await this.downloadArtifactBytes(A),
          P = bp("sha256").update(E).digest("hex");
        if (E.byteLength !== A.size_bytes || P !== A.sha256)
          throw new W(
            "invalid_contract",
            "Conversation artifact integrity check failed",
            {
              issues: [
                {
                  code: "artifact_changed",
                  scope: "artifact",
                  artifactDisplayName: A.display_name,
                  artifactType: A.artifact_type,
                  extension: A.extension,
                  mimeType: A.mime_type,
                  actual: E.byteLength,
                  limit: A.size_bytes,
                  phase: "downloading",
                },
              ],
            },
          );
        O &&
          O.toLowerCase() !== A.mime_type.toLowerCase() &&
          this.logger.info(
            void 0,
            "conversation share artifact content-type differs",
            {
              artifactType: A.artifact_type,
              extension: A.extension,
              expectedMimeType: A.mime_type,
              responseMimeType: O,
            },
          );
        let N = Pb(A.display_name, A.artifact_id, x);
        (await lt(ge(h, N), E),
          C.push({
            artifactId: A.artifact_id,
            workspaceRelativePath: `.zcode-share/${As(s.share.share_id)}/shared-artifacts/${N}`,
            displayName: A.display_name,
            mimeType: A.mime_type,
            sha256: A.sha256,
          }),
          (_ += 1),
          this.reportImportProgress(n, "downloading", _, s.artifacts.length));
      }
      (this.reportImportProgress(n, "installing", _, s.artifacts.length),
        await lt(
          g,
          JSON.stringify({
            importId: v,
            shareCode: t.shareCode,
            clientRequestId: t.clientRequestId,
            sessionId: M,
            shareId: s.share.share_id,
            contextId: k,
            shareUrl: R,
            workspaceKey: ut(c, d),
            phase: "installing",
            createdAt: this.now(),
          }),
          "utf8",
        ),
        await fp(h, y),
        await lt(
          S,
          JSON.stringify({
            formatVersion: wp,
            shareId: s.share.share_id,
            contextId: k,
            title: s.share.title,
            rows: s.rawRows,
            ...(s.content_blocks ? { content_blocks: s.content_blocks } : {}),
            artifacts: s.artifacts.map((A) => ({
              artifactId: A.artifact_id,
              displayName: A.display_name,
              mimeType: A.mime_type,
              workspaceRelativePath: C.find(
                (E) => E.artifactId === A.artifact_id,
              )?.workspaceRelativePath,
            })),
          }),
          "utf8",
        ));
      let I = up({
        share: { shareId: s.share.share_id, title: s.share.title },
        rows: s.rows,
        installedArtifacts: C,
      });
      (I.unsupportedKinds.length > 0 &&
        this.logger.info(
          void 0,
          "shared context skipped row kinds this build cannot format",
          { kinds: I.unsupportedKinds },
        ),
        this.reportImportProgress(n, "committing", _, s.artifacts.length),
        await lt(
          g,
          JSON.stringify({
            importId: v,
            shareCode: t.shareCode,
            clientRequestId: t.clientRequestId,
            sessionId: M,
            shareId: s.share.share_id,
            contextId: k,
            shareUrl: R,
            workspaceKey: ut(c, d),
            phase: "committing",
            createdAt: this.now(),
          }),
          "utf8",
        ));
      let b = await this.zcodeSessionService.createSession({
        workspacePath: c,
        ...(d ? { workspaceIdentity: d } : {}),
        sessionId: M,
        persistence: "immediate",
        importedHistory: {
          source: "sharedContext",
          title: Ib(s.share.title, t.locale),
          markdown: I.markdown,
          provenance: {
            shareId: s.share.share_id,
            contextId: k,
            shareUrl: R,
            status: "pending",
            projectionSha256: s.integrity.projection_sha256,
            artifactSetSha256: s.integrity.artifact_set_sha256,
            formatterVersion: 1,
            markdownSha256: I.markdownSha256,
            installedArtifacts: C.map((A) => ({
              artifactId: A.artifactId,
              workspaceRelativePath: A.workspaceRelativePath,
            })),
          },
        },
      });
      return (
        (w = !1),
        await dt(g, { force: !0 }).catch(() => {}),
        this.reportImportProgress(n, "complete", _, s.artifacts.length),
        {
          workspacePath: c,
          workspaceIdentity: d,
          sessionId: b.session.sessionId,
          contextId: k,
          shareUrl: R,
          title: s.share.title,
          reused: !1,
          ...(a
            ? { fallbackReason: "remote_workspace" }
            : t.targetWorkspacePath
              ? {}
              : { fallbackReason: "default_workspace" }),
        }
      );
    } catch (C) {
      throw (
        w && (await dt(f, { recursive: !0, force: !0 }).catch(() => {})),
        C
      );
    }
  }
  async getImportedConversation(t) {
    let n = ge(t.workspacePath, ".zcode-share"),
      s;
    try {
      s = await pp(n, { withFileTypes: !0 });
    } catch {
      return null;
    }
    for (let a of s) {
      if (!a.isDirectory()) continue;
      let c;
      try {
        c = JSON.parse(
          await po(ge(n, a.name, "shared-conversation.json"), "utf8"),
        );
      } catch {
        continue;
      }
      let d = bb.safeParse(c);
      if (!d.success || d.data.contextId !== t.contextId) continue;
      let m = Co(d.data.rows),
        f = m.unsupportedCount + (d.data.formatVersion > wp ? 1 : 0);
      return (
        f > 0 &&
          this.logger.info(
            void 0,
            "imported conversation share has content this build can't read",
            {
              formatVersion: d.data.formatVersion,
              kinds: m.unsupportedKinds,
              droppedCount: m.unsupportedCount,
              keptCount: m.rows.length,
            },
          ),
        {
          shareId: d.data.shareId,
          contextId: d.data.contextId,
          title: d.data.title,
          rows: m.rows,
          contentBlocks: d.data.content_blocks,
          artifacts: d.data.artifacts,
          unsupportedRowCount: f,
        }
      );
    }
    return null;
  }
  async loadCompletedImportIndex() {
    let t;
    try {
      t = JSON.parse(await po(this.importIndexPath, "utf8"));
    } catch {
      return;
    }
    if (!(!t || typeof t != "object"))
      for (let [n, s] of Object.entries(t)) {
        if (!s || typeof s != "object") continue;
        let a = s;
        if (
          typeof a.workspacePath != "string" ||
          typeof a.sessionId != "string" ||
          typeof a.title != "string" ||
          typeof a.contextId != "string" ||
          typeof a.shareUrl != "string"
        )
          continue;
        try {
          if (!(await mb(a.workspacePath)).isDirectory()) continue;
        } catch {
          continue;
        }
        let c = n.split("\0"),
          d = c[0],
          m = c[1] ?? ut(a.workspacePath, a.workspaceIdentity),
          f = Es(d, m),
          g = {
            workspacePath: a.workspacePath,
            ...(a.workspaceIdentity
              ? { workspaceIdentity: a.workspaceIdentity }
              : {}),
            sessionId: a.sessionId,
            contextId: a.contextId,
            shareUrl: a.shareUrl,
            title: a.title,
            reused: !0,
          };
        (this.completedImports.set(n, g),
          this.completedImportsByWorkspace.set(f, g));
      }
  }
  async writeCompletedImportIndexOnce() {
    let t = Object.fromEntries(this.completedImports.entries()),
      n = `${this.importIndexPath}.${uo()}.tmp`;
    try {
      (await lt(n, JSON.stringify(t), "utf8"),
        await fp(n, this.importIndexPath));
    } finally {
      await dt(n, { force: !0 }).catch(() => {});
    }
  }
  persistCompletedImportIndex() {
    let t = this.importIndexWriteChain
      .catch(() => {})
      .then(() => this.writeCompletedImportIndexOnce());
    return ((this.importIndexWriteChain = t.catch(() => {})), t);
  }
  async publish(t, n) {
    return this.publishWithAgent(t, n, this.zcodeAgentService);
  }
  async publishWithAgent(t, n, s) {
    this.logger.info(void 0, "conversation share publish started", {
      operationId: n,
      accessMode: t.accessMode,
      selectionKind: t.selection.kind,
      remoteWorkspace: !!(t.workspaceIdentity || t.remoteSessionId),
    });
    try {
      let a = await this.publishInternal(t, n, s);
      return (
        this.logger.info(void 0, "conversation share publish completed", {
          operationId: n,
          phase: "complete",
        }),
        this.clearPreviewPreflightSnapshots(t),
        a
      );
    } catch (a) {
      let c = bs(a),
        d = c !== null && typeof c == "object" ? c : null;
      throw (
        this.logger.warn(void 0, "conversation share publish failed", {
          operationId: n,
          phase: this.publishPhases.get(n) ?? "collecting",
          kind: typeof d?.kind == "string" ? d.kind : "unknown",
          ...(typeof d?.reasonCode == "string"
            ? { reasonCode: d.reasonCode }
            : {}),
          ...(d?.diagnostics && typeof d.diagnostics == "object"
            ? { diagnostics: d.diagnostics }
            : {}),
          ...(typeof d?.status == "number" ? { status: d.status } : {}),
          ...(typeof d?.code == "number" ? { code: d.code } : {}),
          ...(typeof d?.requestId == "string"
            ? { requestId: d.requestId }
            : {}),
          ...(c instanceof bn && c.details?.clientRequestId
            ? { clientRequestId: c.details.clientRequestId }
            : {}),
          errorName:
            typeof d?.name == "string"
              ? d.name
              : c instanceof Error
                ? c.name
                : "UnknownError",
        }),
        c
      );
    } finally {
      this.publishPhases.delete(n);
    }
  }
  async publishInternal(t, n, s = this.zcodeAgentService) {
    let a = i((E, O = 0, P = 0, N) => {
      n &&
        (this.publishPhases.set(n, E),
        this.logger.info(void 0, "conversation share publish phase changed", {
          operationId: n,
          phase: E,
          completedArtifacts: O,
          totalArtifacts: P,
          ...(N ? { warningCount: N.issueCount } : {}),
        }),
        this.getProgressEmitter(n).fire({
          operationId: n,
          phase: E,
          completedArtifacts: O,
          totalArtifacts: P,
          ...(N
            ? { warnings: N.issues, omittedWarningCount: N.omittedIssueCount }
            : {}),
        }));
    }, "report");
    (a("collecting"),
      (!t.title.trim() || !t.clientRequestId.trim()) &&
        le("invalid_contract", "Share title and request identity are required"),
      (!Number.isSafeInteger(t.disclosureAcceptedAt) ||
        t.disclosureAcceptedAt <= 0) &&
        le(
          "disclosure_required",
          "Explicit disclosure confirmation is required",
        ),
      t.selection.kind === "rowAnchors" &&
        t.selection.rowIds.length === 0 &&
        le(
          "invalid_selection",
          "At least one conversation row must be selected",
        ));
    let c = await this.client.getCapabilities();
    c.access_modes.includes(t.accessMode) ||
      le("feature_disabled", "Requested share access mode is unavailable");
    let d = await this.loadAllRows(t, s),
      m = Ip(d.rows, t.selection),
      f = _s(Cp(vp(m.rows)), c, Xe(d.rows)),
      g = kp(f.rows, c, d.rows),
      h = await vs({
        agent: s,
        input: t,
        rows: g.rows,
        allRows: d.rows,
        capabilities: c,
        capturedAt: this.now(),
      });
    if (!Ne(c, "tool-presentation"))
      for (let E of m.rows)
        E.kind === "toolCall" &&
          (Wt(E.output?.display) || E.display?.kind === "node_repl_images") &&
          f.warnings.push({
            code: "content_unavailable",
            scope: "turn",
            productTurnId: E.productTurnId,
            rowId: E.rowId,
          });
    let y = h.rows,
      S = h.drafts.flatMap((E) =>
        E.payload.unavailable ||
        E.payload.artifacts.some((O) => O.unavailable) ||
        !Ne(c)
          ? [
              {
                code: "content_unavailable",
                scope: "turn",
                productTurnId: E.productTurnId,
                turnOrdinal: Xe(d.rows).get(E.productTurnId),
              },
            ]
          : [],
      ),
      v = [...f.warnings, ...g.warnings, ...S],
      k = Sp(y, d.rows);
    if (k.length > 0) {
      let E = k.some((O) => O.code === "artifact_protocol_not_ready")
        ? "artifact_protocol_not_ready"
        : k.some((O) => O.code === "unsafe_url")
          ? "unsafe_structure"
          : "invalid_conversation";
      throw new W(E, "Selected conversation contains unsupported structure", {
        issues: k,
      });
    }
    let M = lo({
      rows: y,
      selectedProductTurnIds: m.productTurnIds,
      toolPresentation: Ne(c, "tool-presentation"),
      toolImages: f.toolImages,
      sourceRows: d.rows,
    });
    this.validateArtifactManifest(c, M.artifacts);
    let R = new Map();
    for (let E of m.productTurnIds) {
      let O = this.previewPreflightSnapshots.get(Ts(t, E));
      O && R.set(E, O);
    }
    let w = await cp({
      zcodeAgentService: s,
      artifactSource: this.artifactSource,
      input: t,
      selectedRows: y,
      registeredArtifacts: M.artifacts,
      inlineBytesBySourceRef: new Map([...f.bytesBySourceRef, ...h.bytes]),
      capabilities: c,
      revision: d.revision,
      logEpoch: d.logEpoch,
      turnOrdinalByProductTurnId: Xe(d.rows),
      preflightPreviewSnapshots: R,
      currentCapabilitiesFingerprint: En(c),
    });
    if (w.issues.length > 0)
      throw new W(
        "artifact_not_allowed",
        "Conversation result artifacts are not allowed by server capabilities",
        { issues: w.issues },
      );
    (w.warnings.length > 0 && v.push(...w.warnings),
      v.length > 0 && a("collecting", 0, 0, Ke(v)));
    let C = lo({
      rows: w.rows,
      selectedProductTurnIds: m.productTurnIds,
      additionalArtifacts: w.additionalArtifacts,
      toolPresentation: Ne(c, "tool-presentation"),
      toolImages: f.toolImages,
      sourceRows: d.rows,
      ...(Ne(c) ? { contentDrafts: h.drafts } : {}),
    });
    if (
      (this.validateArtifactManifest(c, C.artifacts),
      C.rows.length > c.max_rows)
    )
      throw new W(
        "limit_exceeded",
        "Conversation contains too many rows to share",
        {
          issues: [
            {
              code: "rows_limit",
              scope: "conversation",
              actual: C.rows.length,
              limit: c.max_rows,
            },
          ],
        },
      );
    let x = ip({
      selected_product_turn_ids: C.selectedProductTurnIds,
      projection: {
        rows: C.rows,
        ...(C.contentBlocks ? { content_blocks: C.contentBlocks } : {}),
      },
      artifacts: C.artifacts.map((E) => E.descriptor),
      disclosure_confirmation: {
        version: 1,
        accepted_at: t.disclosureAcceptedAt,
        acknowledged_no_secret_detection: !0,
      },
    });
    if (Buffer.byteLength(JSON.stringify(x), "utf8") > c.max_payload_bytes) {
      let E = Buffer.byteLength(JSON.stringify(x), "utf8");
      throw new W("limit_exceeded", "Conversation share payload is too large", {
        issues: [
          {
            code: "payload_size_limit",
            scope: "conversation",
            actual: E,
            limit: c.max_payload_bytes,
          },
        ],
      });
    }
    let _ = In(x),
      I = await this.client.createPreparation({
        client_request_id: t.clientRequestId,
        title: t.title.trim(),
        schema_version: 1,
        access_mode: t.accessMode,
        payload_sha256: _,
        artifact_count: C.artifacts.length,
      });
    if (I.status === "confirmed")
      return (
        a("complete", C.artifacts.length, C.artifacts.length),
        yp(I.share, t.locale)
      );
    a("uploading", 0, C.artifacts.length);
    let b = 0;
    for (let E of C.artifacts) {
      let O = w.bytesBySourceRef.get(E.sourceRef);
      O ||
        le(
          "invalid_conversation",
          "Conversation artifact bytes are missing from the publication snapshot",
        );
      let P = await this.client.uploadArtifact(
        I.preparation_id,
        E.descriptor,
        new Blob([Uint8Array.from(O).buffer], { type: E.descriptor.mime_type }),
      );
      if (
        P.artifact_id !== E.descriptor.artifact_id ||
        P.size_bytes !== E.descriptor.size_bytes ||
        P.sha256 !== E.descriptor.sha256
      )
        throw new W(
          "upload_incomplete",
          "Conversation artifact upload acknowledgement does not match the manifest",
          {
            issues: [
              {
                code: "upload_incomplete",
                scope: "artifact",
                artifactDisplayName: E.descriptor.display_name,
                artifactType: E.descriptor.artifact_type,
                extension: E.descriptor.extension,
                mimeType: E.descriptor.mime_type,
                actual: P.size_bytes,
                limit: E.descriptor.size_bytes,
              },
            ],
          },
        );
      ((b += 1), a("uploading", b, C.artifacts.length));
    }
    a("checking", b, C.artifacts.length);
    let A = await this.confirmUntilReady(I.preparation_id, x);
    return (a("complete", b, C.artifacts.length), yp(A, t.locale));
  }
  getProgressEmitter(t) {
    let n = this.progressEmitters.get(t);
    if (n) return n;
    let s = new X({
      onDidRemoveLastListener: i(() => {
        (this.progressEmitters.delete(t), s.dispose());
      }, "onDidRemoveLastListener"),
    });
    return (this.progressEmitters.set(t, s), s);
  }
  getImportProgressEmitter(t) {
    let n = this.importProgressEmitters.get(t);
    if (n) return n;
    let s = new X({
      onDidRemoveLastListener: i(() => {
        (this.importProgressEmitters.delete(t), s.dispose());
      }, "onDidRemoveLastListener"),
    });
    return (this.importProgressEmitters.set(t, s), s);
  }
  reportImportProgress(t, n, s, a) {
    this.getImportProgressEmitter(t).fire({
      operationId: t,
      phase: n,
      completedArtifacts: s,
      totalArtifacts: a,
    });
  }
  async cleanupAbandonedImports() {
    if (!this.zcodeSessionService) return;
    await this.completedImportsLoaded;
    let t = ge(this.conversationWorkspaceRoot, ".zcode-share"),
      n = await pp(t, { withFileTypes: !0 }).catch(() => []);
    for (let s of n) {
      if (!s.isDirectory()) continue;
      let a = ge(t, s.name),
        c = ge(a, ".zcode-share-import.json"),
        d;
      try {
        d = JSON.parse(await po(c, "utf8"));
      } catch {
        continue;
      }
      if (!(
        typeof d.sessionId != "string" ||
        !d.sessionId.startsWith("share-import-")
      ))
        try {
          let f = (
            await this.zcodeSessionService.listSessions({
              workspacePath: this.conversationWorkspaceRoot,
              limit: 100,
            })
          ).find((g) => g.sessionId === d.sessionId);
          if (f) {
            if (
              typeof d.shareCode == "string" &&
              typeof d.clientRequestId == "string" &&
              typeof d.contextId == "string" &&
              typeof d.shareUrl == "string"
            ) {
              let g = Es(
                  d.shareCode,
                  typeof d.workspaceKey == "string"
                    ? d.workspaceKey
                    : this.conversationWorkspaceRoot,
                ),
                h = {
                  workspacePath: this.conversationWorkspaceRoot,
                  sessionId: f.sessionId,
                  contextId: d.contextId,
                  shareUrl: d.shareUrl,
                  title: f.title,
                  reused: !0,
                };
              (this.completedImports.set(`${g}\0${d.clientRequestId}`, h),
                this.completedImportsByWorkspace.set(g, h),
                await this.persistCompletedImportIndex().catch(() => {}));
            }
            await dt(c, { force: !0 });
          } else await dt(a, { recursive: !0, force: !0 });
        } catch {}
    }
  }
  collectArtifactManifestIssues(t, n) {
    let s = new Set(),
      a = [];
    n.length > t.max_artifact_count &&
      a.push({
        code: "artifact_count_limit",
        scope: "conversation",
        actual: n.length,
        limit: t.max_artifact_count,
      });
    let c = 0;
    for (let { descriptor: d } of n) {
      if (s.has(d.artifact_id)) {
        a.push({
          code: "artifact_manifest",
          scope: "artifact",
          artifactDisplayName: d.display_name,
        });
        continue;
      }
      (s.add(d.artifact_id),
        (c += d.size_bytes),
        d.size_bytes > t.max_artifact_bytes &&
          a.push({
            code: "artifact_size_limit",
            scope: "artifact",
            artifactDisplayName: d.display_name,
            artifactType: d.artifact_type,
            extension: d.extension,
            mimeType: d.mime_type,
            actual: d.size_bytes,
            limit: t.max_artifact_bytes,
          }),
        t.allowed_artifacts.some(
          (f) =>
            f.type === d.artifact_type &&
            f.extensions.some(
              (g) => g.replace(/^\./u, "").toLowerCase() === d.extension,
            ) &&
            f.mime_types.some(
              (g) => g.toLowerCase() === d.mime_type.toLowerCase(),
            ),
        ) ||
          a.push({
            code: "artifact_type_not_allowed",
            scope: "artifact",
            artifactDisplayName: d.display_name,
            artifactType: d.artifact_type,
            extension: d.extension,
            mimeType: d.mime_type,
            allowedFormats: Tp(t),
            allowedArtifacts: Ds(t),
          }));
    }
    return (
      c > t.max_total_artifact_bytes &&
        a.push({
          code: "artifact_total_size_limit",
          scope: "conversation",
          actual: c,
          limit: t.max_total_artifact_bytes,
        }),
      a
    );
  }
  validateArtifactManifest(t, n) {
    let s = this.collectArtifactManifestIssues(t, n);
    if (s.length > 0) {
      let a = s.some((c) => c.code === "artifact_type_not_allowed");
      throw new W(
        a ? "artifact_not_allowed" : "limit_exceeded",
        "Conversation artifacts cannot be shared",
        { issues: s },
      );
    }
  }
  async confirmUntilReady(t, n) {
    let s, a, c, d;
    for (;;)
      try {
        return await this.client.confirm(t, n);
      } catch (m) {
        if (!(m instanceof bn) || m.kind !== "safety_check_pending") throw m;
        ((a = m.requestId ?? a), (c = m.status ?? c), (d = m.code ?? d));
        let f = this.now();
        s ??= f + this.confirmPollTimeoutMs;
        let g = s - f;
        if (g <= 0)
          throw new W(
            "safety_check_timeout",
            "Conversation share safety check timed out",
            {
              ...(a === void 0 ? {} : { requestId: a }),
              ...(c === void 0 ? {} : { status: c }),
              ...(d === void 0 ? {} : { code: d }),
            },
          );
        let h = m.retryAfterMs ?? this.confirmPollIntervalMs;
        if ((await this.sleep(Math.min(h, g)), this.now() >= s))
          throw new W(
            "safety_check_timeout",
            "Conversation share safety check timed out",
            {
              ...(a === void 0 ? {} : { requestId: a }),
              ...(c === void 0 ? {} : { status: c }),
              ...(d === void 0 ? {} : { code: d }),
            },
          );
      }
  }
  async loadAllRows(t, n) {
    let s = [],
      a,
      c,
      d;
    for (;;) {
      let f = await n.conversationRowsRangeV4({
        workspacePath: t.workspacePath,
        ...(t.workspaceIdentity
          ? { workspaceIdentity: t.workspaceIdentity }
          : {}),
        ...(t.remoteSessionId ? { remoteSessionId: t.remoteSessionId } : {}),
        sessionId: t.sessionId,
        ...(a === void 0 ? {} : { beforeRowId: a }),
        limit: Te.rowsRangeMaxLimit,
      });
      if (
        (((c !== void 0 && f.atLogEpoch !== c) ||
          (d !== void 0 && f.atRevision !== d)) &&
          le(
            "invalid_conversation",
            "Conversation changed while preparing share",
          ),
        (c = f.atLogEpoch),
        (d = f.atRevision),
        s.unshift(f.rows),
        !f.hasMore)
      )
        break;
      let g = f.rows[0]?.rowId;
      ((g === void 0 || g === a) &&
        le("invalid_contract", "Conversation row pagination did not advance"),
        (a = g));
    }
    let m = s.flat();
    for (let f = 1; f < m.length; f += 1) {
      let g = m[f - 1],
        h = m[f];
      g.rowId >= h.rowId &&
        le("invalid_contract", "Conversation rows are not globally ordered");
    }
    return (
      (c === void 0 || d === void 0) &&
        le(
          "invalid_contract",
          "Conversation rows are missing a read watermark",
        ),
      { rows: m, revision: d, logEpoch: c }
    );
  }
};
r();
o();
var Yje = T("onboardingRecordService");
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
r();
o();
var H$e = T("zcode-task-index-syncer");
var G$e = 32 * 1024 * 1024;
r();
o();
r();
o();
var Sze = new Set([
  "zai-api",
  Ee.zaiIndividualCodingPlan,
  Ee.zaiStartPlan,
  "bigmodel-api",
  Ee.bigmodelIndividualCodingPlan,
  Ee.bigmodelStartPlan,
]);
var Fs = l.record(l.string(), l.unknown()),
  Ap = l.enum(["text", "image", "video", "audio", "pdf"]),
  Mp = l.record(l.string(), l.unknown()),
  Ab = l
    .object({
      enabled: l.boolean().optional(),
      variants: l.array(l.string().min(1)).optional(),
      defaultVariant: l.string().min(1).optional(),
      aliases: l.record(l.string(), l.string()).optional(),
    })
    .passthrough(),
  Mb = l
    .object({
      kinds: l.array(oe).optional(),
      defaultKind: oe.optional(),
      modelIdByKind: l.partialRecord(oe, l.string().min(1)).optional(),
      disabledReason: l.string().optional(),
      supportsTools: l.boolean().optional(),
      supportsStructuredOutput: l.boolean().optional(),
      reasoning: ro.optional(),
      hasMaxOutputTokens: l.boolean().optional(),
      priority: l.number().finite().optional(),
      modified: l.boolean().optional(),
      deleted: l.boolean().optional(),
    })
    .passthrough(),
  xb = l
    .object({
      id: l.string().optional(),
      name: l.string().optional(),
      reasoning: l.union([l.boolean(), Ab]).optional(),
      limit: l
        .object({
          context: l.number().positive().optional(),
          input: l.number().positive().optional(),
          output: l.number().positive().optional(),
        })
        .optional(),
      contextWindow: l.number().positive().optional(),
      maxOutputTokens: l.number().positive().optional(),
      modalities: l
        .object({
          input: l.array(Ap).optional(),
          output: l.array(Ap).optional(),
        })
        .optional(),
      options: Fs.optional(),
      headers: l.record(l.string(), l.string()).optional(),
      variants: l.record(l.string(), Fs).optional(),
      kinds: l.array(oe).optional(),
      defaultKind: oe.optional(),
      modelIdByKind: l.partialRecord(oe, l.string().min(1)).optional(),
      disabledReason: l.string().optional(),
      supportsTools: l.boolean().optional(),
      supportsStructuredOutput: l.boolean().optional(),
      reasoningSpec: ro.optional(),
      hasMaxOutputTokens: l.boolean().optional(),
      priority: l.number().finite().optional(),
      modified: l.boolean().optional(),
      deleted: l.boolean().optional(),
      zcode: Mb.optional(),
    })
    .passthrough(),
  Ob = l
    .object({
      enabled: l.boolean().optional(),
      systemDisabledReason: Sn.optional(),
      endpoints: oo.optional(),
      apiFormat: vn.optional(),
      source: kn.optional(),
      catalogSourceId: no.optional(),
      catalogProviderId: l.string().optional(),
      modelsDevProviderId: l.string().optional(),
      apiKeyRequired: l.boolean().optional(),
      headers: l.record(l.string(), l.string()).optional(),
      logoUrl: l.string().optional(),
      apiKeyUrl: l.string().optional(),
      defaultKind: oe.optional(),
      providerMappings: Mp.optional(),
      createdAt: l.number().optional(),
      updatedAt: l.number().optional(),
      deletedModels: l.array(l.string().min(1)).optional(),
    })
    .passthrough(),
  Db = l
    .object({
      api: l.string().optional(),
      name: l.string().optional(),
      env: l.array(l.string()).optional(),
      id: l.string().optional(),
      kind: oe.optional(),
      npm: l.string().optional(),
      whitelist: l.array(l.string()).optional(),
      blacklist: l.array(l.string()).optional(),
      options: Fs.optional(),
      enabled: l.boolean().optional(),
      systemDisabledReason: Sn.optional(),
      endpoints: oo.optional(),
      apiFormat: vn.optional(),
      source: kn.optional(),
      catalogSourceId: no.optional(),
      catalogProviderId: l.string().optional(),
      modelsDevProviderId: l.string().optional(),
      apiKeyRequired: l.boolean().optional(),
      headers: l.record(l.string(), l.string()).optional(),
      logoUrl: l.string().optional(),
      apiKeyUrl: l.string().optional(),
      defaultKind: oe.optional(),
      providerMappings: Mp.optional(),
      createdAt: l.number().optional(),
      updatedAt: l.number().optional(),
      models: l.record(l.string(), xb).optional(),
      zcode: Ob.optional(),
    })
    .passthrough(),
  Pze = l
    .object({
      $schema: l.string().optional(),
      provider: l.record(l.string(), Db).optional(),
    })
    .passthrough();
r();
o();
r();
o();
r();
o();
var jze = T("account-project-token-resolver");
r();
o();
r();
o();
r();
o();
r();
o();
import lZe from "node-forge";
r();
o();
r();
o();
var _Ze = T("stable-cua-transport");
r();
o();
r();
o();
import { execFile as Lb } from "node:child_process";
import { promisify as Fb } from "node:util";
var NZe = Fb(Lb),
  LZe = 256 * 1024;
r();
o();
var TVe = "ZCODE_CUA_BUNDLED_HELPER_APP_PATH";
function RVe(e) {
  let t = T("telemetry-user-id");
  return async () => {
    try {
      let n = (await e.load("oauth:active_provider"))?.trim() ?? "";
      if (!n) return "";
      let s = await e.load(`oauth:${n}:user_info`);
      return xp(s);
    } catch (n) {
      if (!ke(n)) throw n;
      return (
        t.warn(
          void 0,
          "skip telemetry user id: OAuth credential decrypt failed",
          n,
        ),
        ""
      );
    }
  };
}
i(RVe, "createTelemetryUserIdLoader");
function AVe(e) {
  return async (t) => {
    if (!t) return null;
    try {
      let n = (await e.load("oauth:active_provider"))?.trim();
      if (n !== "zai" && n !== "bigmodel") return null;
      let s = i(
        async () => xp(await e.load(`oauth:${n}:user_info`)),
        "readUserId",
      );
      if ((await s()) !== t) return null;
      let a = (await e.load("zcodejwttoken"))?.trim();
      return (await e.load("oauth:active_provider"))?.trim() !== n ||
        (await s()) !== t
        ? null
        : a && /^[\x21-\x7e]+$/.test(a)
          ? `Bearer ${a}`
          : null;
    } catch {
      return null;
    }
  };
}
i(AVe, "createTelemetryAuthorizationLoader");
function MVe(e) {
  let t = new xt(e);
  return () => t.loadLoginAttribution();
}
i(MVe, "createTelemetryMarketingParamsLoader");
function xp(e) {
  if (!e) return "";
  try {
    let t = JSON.parse(e),
      n = typeof t.id == "string" ? t.id : "",
      s = typeof t.user_id == "string" ? t.user_id : "";
    return n.trim() || s.trim();
  } catch {
    return "";
  }
}
i(xp, "readTelemetryOAuthUserId");
r();
o();
function RJe(e) {
  return typeof e == "object" && e !== null && e.type === "abort";
}
i(RJe, "isStorageScanWorkerCommand");
function AJe(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e.type;
  return t === "progress" || t === "done" || t === "aborted" || t === "error";
}
i(AJe, "isStorageScanWorkerMessage");
export {
  oa as a,
  zp as b,
  Re as c,
  Fe as d,
  Ln as e,
  G as f,
  Gp as g,
  qp as h,
  ia as i,
  gf as j,
  Be as k,
  $y as l,
  za as m,
  Ga as n,
  Jo as o,
  oc as p,
  ic as q,
  Ri as r,
  rv as s,
  q as t,
  it as u,
  Zee as v,
  ns as w,
  a_ as x,
  Tg as y,
  bC as z,
  BC as A,
  UC as B,
  Kg as C,
  tp as D,
  TVe as E,
  RVe as F,
  AVe as G,
  MVe as H,
  RJe as I,
  AJe as J,
};
