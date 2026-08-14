/* @ds-bundle: {"format":4,"namespace":"HeyerLivinDesignSystem_0ba9da","components":[{"name":"Button","sourcePath":"components/Button.jsx"},{"name":"EvidenceBadge","sourcePath":"components/EvidenceBadge.jsx"},{"name":"Eyebrow","sourcePath":"components/Eyebrow.jsx"},{"name":"Glyph","sourcePath":"components/Glyph.jsx"},{"name":"Rule","sourcePath":"components/Rule.jsx"},{"name":"StateTag","sourcePath":"components/StateTag.jsx"}],"sourceHashes":{"components/Button.jsx":"dd97b389b5c9","components/EvidenceBadge.jsx":"5be676a671bd","components/Eyebrow.jsx":"8397511ca809","components/Glyph.jsx":"629b5e47f3e5","components/Rule.jsx":"1804593df780","components/StateTag.jsx":"093df47f5253","design_handoff_glass_website/source_html/app.jsx":"c8ec550508d1","design_handoff_glass_website/source_html/primitives.jsx":"1f04f8581543","ui_kits/dashboard/app.jsx":"6613ad145271","ui_kits/dashboard/charts.jsx":"ef870d8ccd37","ui_kits/website/app.jsx":"c8ec550508d1","ui_kits/website/home.view.jsx":"242ea3aeafe3","ui_kits/website/nav.view.jsx":"05a5c8aa5ced","ui_kits/website/pages.view.jsx":"a38c7a6a21bd","ui_kits/website/primitives.jsx":"1f04f8581543"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HeyerLivinDesignSystem_0ba9da = window.HeyerLivinDesignSystem_0ba9da || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/Button.jsx
try { (() => {
// Heyer Livin' — Button (primary | outline | gold), sharp corners, uppercase
const {
  useState
} = React;
function Button({
  children,
  variant = "primary",
  onClick,
  href
}) {
  const [hover, setHover] = useState(false);
  const base = {
    fontFamily: "var(--hl-font-sans)",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    padding: "14px 28px",
    border: "1px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    transition: "all 200ms cubic-bezier(.2,.8,.2,1)"
  };
  const skins = {
    primary: {
      background: hover ? "var(--hl-red)" : "#fff",
      color: "#000000"
    },
    outline: {
      background: "transparent",
      color: hover ? "var(--hl-red)" : "#fff",
      borderColor: hover ? "var(--hl-red)" : "#fff"
    },
    gold: {
      background: hover ? "#F04A59" : "var(--hl-red)",
      color: "#000000"
    }
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...skins[variant]
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button.jsx", error: String((e && e.message) || e) }); }

// components/EvidenceBadge.jsx
try { (() => {
// Heyer Livin' — Evidence badge: mono-set stat/citation chip
function EvidenceBadge({
  children,
  gold
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--hl-font-mono)",
      fontSize: "0.8rem",
      fontWeight: 500,
      letterSpacing: "0.04em",
      padding: "8px 14px",
      fontVariantNumeric: "tabular-nums",
      border: `1px solid ${gold ? "var(--hl-red)" : "#fff"}`,
      color: gold ? "var(--hl-red)" : "#fff",
      display: "inline-block"
    }
  }, children);
}
Object.assign(__ds_scope, { EvidenceBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/EvidenceBadge.jsx", error: String((e && e.message) || e) }); }

// components/Eyebrow.jsx
try { (() => {
// Heyer Livin' — Eyebrow / kicker label
function Eyebrow({
  children,
  color = "var(--hl-red)",
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "0.85rem",
      fontWeight: 500,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/Glyph.jsx
try { (() => {
// Heyer Livin' — Glyph: renders a canonical white-stroke glyph SVG from assets/glyphs/
function Glyph({
  name,
  size = 40,
  assetBase = "assets/glyphs",
  src,
  style
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: src || `${assetBase}/${name}.svg`,
    alt: `${name} glyph`,
    width: size,
    height: size,
    style: {
      display: "block",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Glyph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Glyph.jsx", error: String((e && e.message) || e) }); }

// components/Rule.jsx
try { (() => {
// Heyer Livin' — Rule: hard section rule
function Rule({
  thick = 2,
  color = "#fff",
  style
}) {
  return /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: `${thick}px solid ${color}`,
      margin: 0,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Rule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Rule.jsx", error: String((e && e.message) || e) }); }

// components/StateTag.jsx
try { (() => {
// Heyer Livin' — State tag: dictionary entry state indicator
const STATE_COLORS = {
  subordinated: "#1B45E5",
  structural: "#ffffff",
  dominant: "#E11D2E",
  outer: "#777777"
};
function StateTag({
  type = "structural",
  children
}) {
  const c = STATE_COLORS[type];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "6px 11px",
      border: `1px solid ${type === "outer" ? "#555" : c}`,
      color: c,
      display: "inline-block"
    }
  }, children);
}
Object.assign(__ds_scope, { StateTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/StateTag.jsx", error: String((e && e.message) || e) }); }

// design_handoff_glass_website/source_html/app.jsx
try { (() => {
/* global React, ReactDOM, Nav, Footer, Home, Dictionary, Research, Story, Portal */
const {
  useState: useAppState,
  useEffect
} = React;
function App() {
  const [route, setRoute] = useAppState(() => location.hash.replace("#", "") || "home");
  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = r => {
    location.hash = r;
    setRoute(r);
    window.scrollTo(0, 0);
  };
  const views = {
    home: Home,
    dictionary: Dictionary,
    research: Research,
    story: Story,
    portal: Portal
  };
  const View = views[route] || Home;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, {
    route: route,
    setRoute: go
  }), /*#__PURE__*/React.createElement(View, {
    setRoute: go
  }), /*#__PURE__*/React.createElement(Footer, {
    setRoute: go
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_glass_website/source_html/app.jsx", error: String((e && e.message) || e) }); }

// design_handoff_glass_website/source_html/primitives.jsx
try { (() => {
/* global React */
// Heyer Livin' — shared UI primitives (website kit)
const {
  useState
} = React;

// ---- Glyph: renders a canonical white-stroke glyph SVG ----------------------
function Glyph({
  name,
  size = 40,
  style
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: `../../assets/glyphs/${name}.svg`,
    alt: `${name} glyph`,
    width: size,
    height: size,
    style: {
      display: "block",
      ...style
    }
  });
}

// ---- Eyebrow / kicker -------------------------------------------------------
function Eyebrow({
  children,
  color = "var(--hl-red)",
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "0.85rem",
      fontWeight: 500,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color,
      ...style
    }
  }, children);
}

// ---- Button (primary | outline | gold) -------------------------------------
function Button({
  children,
  variant = "primary",
  onClick,
  href
}) {
  const [hover, setHover] = useState(false);
  const base = {
    fontFamily: "var(--hl-font-sans)",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    padding: "14px 28px",
    border: "1px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    transition: "all 200ms cubic-bezier(.2,.8,.2,1)"
  };
  const skins = {
    primary: {
      background: hover ? "var(--hl-red)" : "#fff",
      color: "#000000"
    },
    outline: {
      background: "transparent",
      color: hover ? "var(--hl-red)" : "#fff",
      borderColor: hover ? "var(--hl-red)" : "#fff"
    },
    gold: {
      background: hover ? "#F04A59" : "var(--hl-red)",
      color: "#000000"
    }
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...skins[variant]
    }
  }, children);
}

// ---- Evidence badge ---------------------------------------------------------
function EvidenceBadge({
  children,
  gold
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--hl-font-mono)",
      fontSize: "0.8rem",
      fontWeight: 500,
      letterSpacing: "0.04em",
      padding: "8px 14px",
      fontVariantNumeric: "tabular-nums",
      border: `1px solid ${gold ? "var(--hl-red)" : "#fff"}`,
      color: gold ? "var(--hl-red)" : "#fff"
    }
  }, children);
}

// ---- State tag --------------------------------------------------------------
const STATE_COLORS = {
  subordinated: "#1B45E5",
  structural: "#ffffff",
  dominant: "#E11D2E",
  outer: "#777777"
};
function StateTag({
  type = "structural",
  children
}) {
  const c = STATE_COLORS[type];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "6px 11px",
      border: `1px solid ${type === "outer" ? "#555" : c}`,
      color: c
    }
  }, children);
}

// ---- Section rule -----------------------------------------------------------
function Rule({
  thick = 2,
  color = "#fff",
  style
}) {
  return /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: `${thick}px solid ${color}`,
      margin: 0,
      ...style
    }
  });
}
Object.assign(window, {
  Glyph,
  Eyebrow,
  Button,
  EvidenceBadge,
  StateTag,
  Rule
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_glass_website/source_html/primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/app.jsx
try { (() => {
/* global React, ReactDOM, Metric, DatasetBars, ConvergenceStrip, RandomVsObserved */

function Chart({
  n,
  title,
  claim,
  caption,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 72
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 10px",
      fontSize: "clamp(1.6rem,3vw,2.2rem)",
      fontWeight: 600,
      letterSpacing: "-0.015em"
    }
  }, n, " \xB7 ", title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 28px",
      fontSize: "1.05rem",
      maxWidth: "60ch",
      lineHeight: 1.55
    }
  }, claim), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid #000",
      padding: "22px 18px",
      background: "#fff"
    }
  }, children, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      fontSize: "0.8rem",
      opacity: 0.7,
      fontFamily: "var(--hl-font-mono)",
      letterSpacing: "0.02em"
    }
  }, caption)));
}
function Dashboard() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: "4rem 1.5rem 6rem"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      borderBottom: "2px solid #000",
      paddingBottom: 32,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 20px",
      fontSize: "0.78rem",
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      fontWeight: 500
    }
  }, "Heyer Livin' \xB7 Kairo \xB7 GLYPH"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: "clamp(2.4rem,6vw,4.6rem)",
      lineHeight: 1,
      letterSpacing: "-0.025em",
      fontWeight: 700
    }
  }, "Choice is not chance.", /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "clamp(1.2rem,2.5vw,1.8rem)",
      letterSpacing: "-0.01em",
      fontWeight: 500,
      marginTop: 12,
      opacity: 0.85
    }
  }, "The pattern is structural.")), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: "62ch",
      margin: "22px 0 0",
      lineHeight: 1.6
    }
  }, "Twelve independent datasets. Thirteen statistical tests. One attractor at ", /*#__PURE__*/React.createElement("strong", null, "0.39"), ". What looks like random outcomes across food service, antebellum labor, electoral politics, ancient civilizations, and card games lands on the same structural constant every time."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: 24,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Metric, {
    n: "13",
    l: "Statistical tests"
  }), /*#__PURE__*/React.createElement(Metric, {
    n: "12",
    l: "Independent datasets"
  }), /*#__PURE__*/React.createElement(Metric, {
    n: "\u2248 0.39",
    l: "Observed attractor"
  }), /*#__PURE__*/React.createElement(Metric, {
    n: "R = x/(x+y\xB2)",
    l: "Bounded-state function"
  }))), /*#__PURE__*/React.createElement(Chart, {
    n: "1",
    title: "The twelve datasets",
    claim: "Every dataset's structural constant lands inside the structural band [0.33, 0.50] and clusters near 0.39. Random would not do this.",
    caption: "Source: glyph8_test_data.csv \xB7 12 datasets \xB7 attractor reference 0.39 \xB7 band [0.33, 0.50]"
  }, /*#__PURE__*/React.createElement(DatasetBars, null)), /*#__PURE__*/React.createElement(Chart, {
    n: "2",
    title: "Convergence",
    claim: "Same data, one axis. Every point is a domain. They cluster at 0.39 the way iron filings cluster on a magnet.",
    caption: "Source: glyph8_test_data.csv \xB7 jittered for legibility \xB7 dashed line at 0.39"
  }, /*#__PURE__*/React.createElement(ConvergenceStrip, null)), /*#__PURE__*/React.createElement(Chart, {
    n: "3",
    title: "Random expectation vs observed",
    claim: "Random varies anywhere from 0 to 1 depending on the domain. The observed R does not. It lands at 0.39 across all of them.",
    caption: "Source: glyph8_test_data.csv \xB7 paired bars \xB7 null = random expectation per domain"
  }, /*#__PURE__*/React.createElement(RandomVsObserved, null)), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: "2px solid #000",
      margin: "64px 0 0"
    }
  }), /*#__PURE__*/React.createElement("footer", {
    style: {
      marginTop: 40,
      fontSize: "0.85rem",
      lineHeight: 1.5,
      opacity: 0.85
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      letterSpacing: "0.03em"
    }
  }, "Heyer Livin' \xB7 Kairo \xB7 GLYPH"), /*#__PURE__*/React.createElement("br", null), "Authored by Jair Valley. Heyer Livin' LLC. Oakland."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      fontSize: "0.78rem",
      opacity: 0.65,
      maxWidth: "60ch"
    }
  }, "Internal architecture \u2014 the controller layer, audit gates, replay ledger, and full GLYPH governance \u2014 is not on this dashboard by design. This is the public proof surface.")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(Dashboard, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/charts.jsx
try { (() => {
/* global React */
// Heyer Livin' — GLYPH dashboard charts (monochrome, data-driven SVG)
// Band [0.33, 0.50], attractor 0.39. Pure black on white — the proof surface.

const DATASETS = [["Food service PMIX", 0.41], ["Electoral vote-share", 0.38], ["Antebellum labor", 0.37], ["Card-game draws", 0.40], ["Ancient census", 0.395], ["Coin sequences", 0.42], ["Lexical frequency", 0.36], ["Migration flows", 0.39], ["Harvest yields", 0.40], ["Dice trials", 0.385], ["Market baskets", 0.41], ["Survey response", 0.39]];
const ATTR = 0.39,
  LO = 0.33,
  HI = 0.50;
function Metric({
  n,
  l
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid #000",
      padding: "16px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "2.1rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1,
      fontVariantNumeric: "tabular-nums"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: "0.72rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      opacity: 0.7
    }
  }, l));
}

// Chart 1 — structural constant per dataset, vertical bars, band + 0.39 line
function DatasetBars() {
  const W = 720,
    H = 300,
    PADL = 44,
    PADB = 64,
    PADT = 16;
  const y0 = 0.25,
    y1 = 0.55;
  const yPix = v => PADT + (1 - (v - y0) / (y1 - y0)) * (H - PADT - PADB);
  const bw = (W - PADL - 16) / DATASETS.length;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: "100%",
      height: "auto",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: PADL,
    y: yPix(HI),
    width: W - PADL - 16,
    height: yPix(LO) - yPix(HI),
    fill: "#000",
    opacity: "0.06"
  }), [0.30, 0.35, 0.40, 0.45, 0.50].map(v => /*#__PURE__*/React.createElement("g", {
    key: v
  }, /*#__PURE__*/React.createElement("line", {
    x1: PADL,
    y1: yPix(v),
    x2: W - 16,
    y2: yPix(v),
    stroke: "#000",
    strokeOpacity: "0.12"
  }), /*#__PURE__*/React.createElement("text", {
    x: PADL - 8,
    y: yPix(v) + 4,
    textAnchor: "end",
    fontFamily: "var(--hl-font-mono)",
    fontSize: "10",
    fill: "#000",
    opacity: "0.6"
  }, v.toFixed(2)))), DATASETS.map(([name, v], i) => {
    const x = PADL + i * bw + bw * 0.2;
    return /*#__PURE__*/React.createElement("rect", {
      key: name,
      x: x,
      y: yPix(v),
      width: bw * 0.6,
      height: yPix(LO) - yPix(v) + 0.0001 + (yPix(y0) - yPix(LO)),
      fill: "#000"
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: PADL,
    y1: yPix(ATTR),
    x2: W - 16,
    y2: yPix(ATTR),
    stroke: "#000",
    strokeWidth: "1.5",
    strokeDasharray: "6 4"
  }), /*#__PURE__*/React.createElement("text", {
    x: W - 16,
    y: yPix(ATTR) - 6,
    textAnchor: "end",
    fontFamily: "var(--hl-font-mono)",
    fontSize: "11",
    fontWeight: "600"
  }, "\u2248 0.39"));
}

// Chart 2 — convergence: single axis, 12 jittered dots clustering at 0.39
function ConvergenceStrip() {
  const W = 720,
    H = 150,
    PADL = 24,
    PADR = 24;
  const x = v => PADL + (v - 0.25) / (0.55 - 0.25) * (W - PADL - PADR);
  const jitter = [12, -16, 20, -8, 4, -20, 16, 0, -12, 22, -6, 10];
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: "100%",
      height: "auto",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: x(LO),
    y: "20",
    width: x(HI) - x(LO),
    height: H - 56,
    fill: "#000",
    opacity: "0.06"
  }), /*#__PURE__*/React.createElement("line", {
    x1: PADL,
    y1: H - 36,
    x2: W - PADR,
    y2: H - 36,
    stroke: "#000",
    strokeOpacity: "0.3"
  }), [0.30, 0.39, 0.50].map(v => /*#__PURE__*/React.createElement("text", {
    key: v,
    x: x(v),
    y: H - 18,
    textAnchor: "middle",
    fontFamily: "var(--hl-font-mono)",
    fontSize: "10",
    opacity: "0.65"
  }, v.toFixed(2))), /*#__PURE__*/React.createElement("line", {
    x1: x(ATTR),
    y1: "12",
    x2: x(ATTR),
    y2: H - 36,
    stroke: "#000",
    strokeWidth: "1.5",
    strokeDasharray: "6 4"
  }), DATASETS.map(([name, v], i) => /*#__PURE__*/React.createElement("circle", {
    key: name,
    cx: x(v),
    cy: (H - 56) / 2 + 16 + jitter[i] * 0.5,
    r: "6",
    fill: "#000"
  })));
}

// Chart 3 — random expectation (outlined) vs observed (filled)
function RandomVsObserved() {
  const W = 720,
    H = 280,
    PADL = 44,
    PADB = 28,
    PADT = 14;
  const randoms = [0.50, 0.20, 0.62, 0.33, 0.71, 0.14, 0.55, 0.42, 0.28, 0.66, 0.18, 0.48];
  const yPix = v => PADT + (1 - v) * (H - PADT - PADB);
  const gw = (W - PADL - 16) / DATASETS.length;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: "100%",
      height: "auto",
      display: "block"
    }
  }, [0, 0.25, 0.5, 0.75, 1].map(v => /*#__PURE__*/React.createElement("g", {
    key: v
  }, /*#__PURE__*/React.createElement("line", {
    x1: PADL,
    y1: yPix(v),
    x2: W - 16,
    y2: yPix(v),
    stroke: "#000",
    strokeOpacity: "0.12"
  }), /*#__PURE__*/React.createElement("text", {
    x: PADL - 8,
    y: yPix(v) + 4,
    textAnchor: "end",
    fontFamily: "var(--hl-font-mono)",
    fontSize: "10",
    opacity: "0.6"
  }, v.toFixed(2)))), DATASETS.map(([name, v], i) => {
    const gx = PADL + i * gw + gw * 0.15;
    const bw = gw * 0.32;
    return /*#__PURE__*/React.createElement("g", {
      key: name
    }, /*#__PURE__*/React.createElement("rect", {
      x: gx,
      y: yPix(randoms[i]),
      width: bw,
      height: yPix(0) - yPix(randoms[i]),
      fill: "none",
      stroke: "#000"
    }), /*#__PURE__*/React.createElement("rect", {
      x: gx + bw + 2,
      y: yPix(v),
      width: bw,
      height: yPix(0) - yPix(v),
      fill: "#000"
    }));
  }), /*#__PURE__*/React.createElement("line", {
    x1: PADL,
    y1: yPix(ATTR),
    x2: W - 16,
    y2: yPix(ATTR),
    stroke: "#000",
    strokeWidth: "1.5",
    strokeDasharray: "6 4"
  }), /*#__PURE__*/React.createElement("text", {
    x: W - 16,
    y: yPix(ATTR) - 6,
    textAnchor: "end",
    fontFamily: "var(--hl-font-mono)",
    fontSize: "11",
    fontWeight: "600"
  }, "observed \u2248 0.39"));
}
Object.assign(window, {
  Metric,
  DatasetBars,
  ConvergenceStrip,
  RandomVsObserved,
  DATASETS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/charts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
/* global React, ReactDOM, Nav, Footer, Home, Dictionary, Research, Story, Portal */
const {
  useState: useAppState,
  useEffect
} = React;
function App() {
  const [route, setRoute] = useAppState(() => location.hash.replace("#", "") || "home");
  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = r => {
    location.hash = r;
    setRoute(r);
    window.scrollTo(0, 0);
  };
  const views = {
    home: Home,
    dictionary: Dictionary,
    research: Research,
    story: Story,
    portal: Portal
  };
  const View = views[route] || Home;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Nav, {
    route: route,
    setRoute: go
  }), /*#__PURE__*/React.createElement(View, {
    setRoute: go
  }), /*#__PURE__*/React.createElement(Footer, {
    setRoute: go
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/home.view.jsx
try { (() => {
/* global React, Eyebrow, Button, Rule, Glyph */
// Heyer Livin' — Home view (glass / holo treatment)
// Brand discipline preserved: pure black ground, Helvetica, radius 0,
// red / white / blue tier. Glass + chromatic aberration layered on top
// as the optional moodboard expression.

function Section({
  children,
  bg = "#000000",
  pad = "80px 28px",
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: className,
    style: {
      background: bg,
      padding: pad,
      position: "relative",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      position: "relative",
      zIndex: 3
    }
  }, children));
}
function Home({
  setRoute
}) {
  const glyphs = [["eye", "Eye", "Recognition. Witness. The mark that anchors the system."], ["clock", "Clock", "Time as mechanism. Cycle, rhythm, continuity."], ["compass", "Compass", "Direction, orientation, frame. The navigator."], ["coin", "Coin", "Heads: choice. Tails: erased. The decision surface."]];
  const services = [["Brand & visual system", "Logos, wordmarks, glyph sheets, pattern systems, product mockups, editorial design. Built to survive on fabric, paper, screen, and packaging."], ["Cultural research", "Anthropology, sociology, symbolism, and structural inequality — translated into measurable, reproducible artifacts."], ["Systems & tools", "Operational design, documentation, AI-assisted research workflows, and cultural intelligence instruments."]];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    className: "hl-holo-bg hl-grain",
    style: {
      padding: "140px 28px 110px",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hl-reeded"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      position: "relative",
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      color: "#fff",
      opacity: 0.85
    }
  }, "Heyer Livin' \u2014 Oakland"), /*#__PURE__*/React.createElement("h1", {
    className: "hl-chromatic",
    style: {
      margin: "26px 0 0",
      color: "#ffffff",
      fontFamily: "var(--hl-font-sans)",
      fontSize: "clamp(3rem, 8.5vw, 7rem)",
      fontWeight: 700,
      letterSpacing: "-0.035em",
      lineHeight: 0.93,
      maxWidth: "15ch"
    }
  }, "Choice is not chance. The pattern is structural."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "36px 0 0",
      color: "rgba(255,255,255,0.86)",
      fontSize: "1.3rem",
      lineHeight: 1.5,
      maxWidth: "58ch",
      textShadow: "0 1px 12px rgba(0,0,0,0.35)"
    }
  }, "A cultural intelligence and design studio. Glyphs, brand systems, and research instruments for the patterns that get misread, flattened, or pushed out of frame."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 44,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setRoute("portal")
  }, "See the work"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setRoute("research")
  }, "Read the research")))), /*#__PURE__*/React.createElement("hr", {
    className: "hl-prism-rule"
  }), /*#__PURE__*/React.createElement(Section, {
    bg: "#000000",
    pad: "80px 28px 70px"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Evidence"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 18,
      marginTop: 28
    }
  }, [["13", "Statistical tests, random null rejected"], ["12", "Independent datasets, cross-domain"], ["≈ 0.39", "Observed structural attractor"]].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    className: "hl-glass",
    style: {
      padding: "32px 28px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hl-shaft"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
      fontWeight: 700,
      letterSpacing: "-0.025em",
      lineHeight: 1,
      color: "#fff",
      fontVariantNumeric: "tabular-nums",
      position: "relative"
    }
  }, n), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      color: "rgba(255,255,255,0.72)",
      fontSize: "0.78rem",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      fontFamily: "var(--hl-font-mono)",
      lineHeight: 1.5,
      position: "relative"
    }
  }, l))))), /*#__PURE__*/React.createElement("section", {
    className: "hl-holo-bg",
    style: {
      padding: "90px 28px",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hl-reeded",
    style: {
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      position: "relative",
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      color: "#fff",
      fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
      fontWeight: 600,
      letterSpacing: "-0.025em",
      lineHeight: 1.05
    }
  }, "One eye. Four directions."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "22px 0 0",
      color: "rgba(255,255,255,0.82)",
      fontSize: "1.15rem",
      lineHeight: 1.65,
      maxWidth: "62ch"
    }
  }, "The Heyer Livin' system treats glyphs as navigational instruments \u2014 working vocabulary for reading culture, time, choice, and constraint. Not decoration."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16,
      marginTop: 44
    }
  }, glyphs.map(([slug, name, desc]) => /*#__PURE__*/React.createElement("div", {
    key: slug,
    className: "hl-glass hl-glass--dark",
    style: {
      padding: 24,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hl-shaft"
  }), /*#__PURE__*/React.createElement(Glyph, {
    name: slug,
    size: 40,
    style: {
      marginBottom: 22,
      position: "relative",
      filter: "drop-shadow(0 0 12px rgba(120,170,255,0.55))"
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      color: "#fff",
      fontSize: "1.35rem",
      fontWeight: 600,
      position: "relative"
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      color: "rgba(255,255,255,0.72)",
      fontSize: "0.92rem",
      lineHeight: 1.55,
      position: "relative"
    }
  }, desc)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setRoute("dictionary")
  }, "Open the Glyph Dictionary")))), /*#__PURE__*/React.createElement("hr", {
    className: "hl-prism-rule"
  }), /*#__PURE__*/React.createElement(Section, {
    bg: "#000000",
    pad: "90px 28px 100px"
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      color: "#fff",
      fontSize: "clamp(2rem,4.5vw,3.2rem)",
      fontWeight: 600,
      letterSpacing: "-0.025em"
    }
  }, "What the studio does"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 18,
      marginTop: 40
    }
  }, services.map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    className: "hl-glass hl-glass--dark",
    style: {
      padding: 32,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hl-shaft"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: i === 0 ? "var(--hl-red)" : i === 1 ? "#fff" : "var(--hl-blue)",
      fontFamily: "var(--hl-font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      position: "relative"
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "16px 0 0",
      color: "#fff",
      fontSize: "1.4rem",
      fontWeight: 600,
      position: "relative"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px 0 0",
      color: "rgba(255,255,255,0.76)",
      fontSize: "1rem",
      lineHeight: 1.65,
      position: "relative"
    }
  }, d))))), /*#__PURE__*/React.createElement(Section, {
    bg: "#fff",
    pad: "90px 28px"
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      color: "#000000",
      fontSize: "clamp(2.25rem,5vw,3.6rem)",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.05,
      maxWidth: "18ch"
    }
  }, "Work with the studio."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "20px 0 0",
      color: "#000000",
      fontSize: "1.2rem",
      lineHeight: 1.6,
      maxWidth: "56ch"
    }
  }, "Commissions, collaborations, research partnerships, prints and products. If you need cultural patterns translated into visible, useful artifacts \u2014 start here."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 32,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setRoute("portal"),
    style: {
      fontFamily: "var(--hl-font-sans)",
      fontSize: "0.9rem",
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      padding: "14px 28px",
      background: "#000000",
      color: "#fff",
      border: "1px solid #000000",
      cursor: "pointer"
    }
  }, "Get in touch"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setRoute("portal"),
    style: {
      fontFamily: "var(--hl-font-sans)",
      fontSize: "0.9rem",
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      padding: "14px 28px",
      background: "transparent",
      color: "#000000",
      border: "1px solid #000000",
      cursor: "pointer"
    }
  }, "Shop the studio"))));
}
Object.assign(window, {
  Home,
  Section
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/home.view.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/nav.view.jsx
try { (() => {
/* global React */
// Heyer Livin' — top navigation
const {
  useState: useNavState
} = React;
function Nav({
  route,
  setRoute
}) {
  const links = [["home", "Home"], ["dictionary", "Dictionary"], ["research", "Research"], ["story", "Story"], ["portal", "Portal"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(6,8,14,0.55)",
      backdropFilter: "blur(18px) saturate(140%)",
      WebkitBackdropFilter: "blur(18px) saturate(140%)",
      borderBottom: "1px solid rgba(255,255,255,0.10)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      padding: "16px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setRoute("home"),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      background: "none",
      border: 0,
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/glyphs/eye.svg",
    width: "26",
    height: "26",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--hl-font-display)",
      fontWeight: 700,
      fontSize: "1.2rem",
      color: "#fff",
      letterSpacing: "-0.01em",
      whiteSpace: "nowrap"
    }
  }, "Heyer Livin'")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 26
    }
  }, links.map(([key, label]) => /*#__PURE__*/React.createElement("button", {
    key: key,
    onClick: () => setRoute(key),
    style: {
      background: "none",
      border: 0,
      cursor: "pointer",
      padding: "4px 0",
      fontFamily: "var(--hl-font-sans)",
      fontSize: "0.78rem",
      fontWeight: 500,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: route === key ? "var(--hl-red)" : "#cfcfcf",
      borderBottom: route === key ? "1px solid var(--hl-red)" : "1px solid transparent"
    }
  }, label)))));
}
function Footer({
  setRoute
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "2px solid #fff",
      background: "#000000",
      padding: "48px 28px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/glyphs/eye.svg",
    width: "22",
    height: "22",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--hl-font-display)",
      fontWeight: 700,
      fontSize: "1.05rem",
      color: "#fff"
    }
  }, "Heyer Livin'")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--hl-font-mono)",
      fontSize: "0.72rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#888"
    }
  }, "Cultural intelligence & design \xB7 Oakland")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "28px 0 0",
      fontFamily: "var(--hl-font-mono)",
      fontSize: "0.7rem",
      color: "#666",
      letterSpacing: "0.04em"
    }
  }, "\xA9 Heyer Livin' LLC. Choice is not chance. The pattern is structural.")));
}
Object.assign(window, {
  Nav,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/nav.view.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages.view.jsx
try { (() => {
/* global React, Eyebrow, Button, EvidenceBadge, StateTag, Rule, Glyph, Section */
// Heyer Livin' — Dictionary / Research / Story / Portal views

const ALL_GLYPHS = [["eye", "Eye", "Recognition / witness", "Mark · logo · header"], ["clock", "Clock", "Time as mechanism", "Diagrams · motion · rhythm"], ["compass", "Compass", "Direction, frame", "Layout marks · route guides"], ["coin", "Coin", "Choice states", "Decision surfaces · A/B"], ["pyramid", "Pyramid", "Hierarchy / field", "Constraint diagrams"], ["origin", "Origin", "Generator / seed", "Cycle openers · π/8 center"], ["graph", "Graph", "Distribution / cluster", "Research · proof markers"], ["hand", "Hand", "Human signal", "Cultural layer · participation"]];
function Dictionary() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "#000000",
    pad: "80px 28px 100px"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Reference"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "18px 0 0",
      color: "#fff",
      fontSize: "clamp(2.4rem,5vw,4rem)",
      fontWeight: 700,
      letterSpacing: "-0.025em",
      lineHeight: 1
    }
  }, "The Glyph Dictionary"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "20px 0 0",
      color: "var(--hl-fg-muted)",
      fontSize: "1.15rem",
      lineHeight: 1.6,
      maxWidth: "60ch"
    }
  }, "Eight marks. Each does one job in the system. Stacked, they form a working sentence about culture, time, choice, constraint, and human signal."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 0,
      marginTop: 44,
      border: "1px solid var(--hl-hairline)",
      borderRight: 0,
      borderBottom: 0
    }
  }, ALL_GLYPHS.map(([slug, name, role, mode]) => /*#__PURE__*/React.createElement("div", {
    key: slug,
    style: {
      borderRight: "1px solid var(--hl-hairline)",
      borderBottom: "1px solid var(--hl-hairline)",
      padding: 24,
      minHeight: 180
    }
  }, /*#__PURE__*/React.createElement(Glyph, {
    name: slug,
    size: 44,
    style: {
      marginBottom: 24
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      color: "#fff",
      fontSize: "1.25rem",
      fontWeight: 600
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      color: "var(--hl-fg-muted)",
      fontSize: "0.86rem",
      lineHeight: 1.45
    }
  }, role), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      fontFamily: "var(--hl-font-mono)",
      fontSize: "0.66rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--hl-fg-dim)"
    }
  }, mode)))));
}

// convergence scatter — dots cluster around the dashed gold 0.39 attractor
function ConvergenceChart() {
  const pts = [0.41, 0.38, 0.40, 0.37, 0.39, 0.42, 0.36, 0.395, 0.41, 0.38, 0.40, 0.39, 0.43, 0.35, 0.39, 0.40, 0.38, 0.41];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid #fff",
      padding: "24px 22px",
      background: "#000000"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 220,
      borderLeft: "1px solid var(--hl-hairline)",
      borderBottom: "1px solid var(--hl-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: `${(0.39 - 0.30) / 0.20 * 100}%`,
      borderTop: "1.5px dashed var(--hl-red)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 0,
      top: -18,
      fontFamily: "var(--hl-font-mono)",
      fontSize: "0.7rem",
      color: "var(--hl-red)"
    }
  }, "\u2248 0.39")), pts.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "absolute",
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: Math.abs(v - 0.39) < 0.03 ? "var(--hl-blue)" : "#fff",
      left: `${i / (pts.length - 1) * 94 + 2}%`,
      bottom: `calc(${(v - 0.30) / 0.20 * 100}% - 4px)`,
      transform: "translateX(-50%)"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      fontFamily: "var(--hl-font-mono)",
      fontSize: "0.72rem",
      color: "var(--hl-fg-dim)",
      letterSpacing: "0.03em"
    }
  }, "12 datasets \xB7 observed ratios cluster on the structural attractor"));
}
function Research() {
  const proofs = [["Food service PMIX", "0.41", "dominant", "Daily menu-mix frequency across an inner-city establishment."], ["Electoral outcomes", "0.38", "structural", "Candidate vote-share distributions, multi-cycle."], ["Antebellum labor", "0.37", "structural", "Documented allocation ratios across regional records."], ["Card-game draws", "0.40", "structural", "Controlled draw sequences, repeated trials."]];
  return /*#__PURE__*/React.createElement(Section, {
    bg: "#000000",
    pad: "80px 28px 100px"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Proof"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "18px 0 0",
      color: "#fff",
      fontSize: "clamp(2.4rem,5vw,4rem)",
      fontWeight: 700,
      letterSpacing: "-0.025em",
      lineHeight: 1
    }
  }, "The convergence"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "39fr 61fr",
      gap: 40,
      marginTop: 40,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ConvergenceChart, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 24px",
      color: "var(--hl-fg-muted)",
      fontSize: "1.1rem",
      lineHeight: 1.65
    }
  }, "What looks like random outcomes across food service, electoral politics, antebellum labor, and card games lands on the same structural constant \u2014 every time."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(EvidenceBadge, null, "13 TESTS"), /*#__PURE__*/React.createElement(EvidenceBadge, null, "12 DATASETS"), /*#__PURE__*/React.createElement(EvidenceBadge, {
    gold: true
  }, "R = x / (x + y\xB2)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 0,
      border: "1px solid var(--hl-hairline)",
      borderBottom: 0
    }
  }, proofs.map(([src, r, state, note]) => /*#__PURE__*/React.createElement("div", {
    key: src,
    style: {
      borderBottom: "1px solid var(--hl-hairline)",
      padding: "16px 18px",
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--hl-font-mono)",
      fontSize: "1.1rem",
      color: "var(--hl-red)",
      width: 56,
      fontVariantNumeric: "tabular-nums"
    }
  }, r), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#fff",
      fontSize: "0.95rem",
      fontWeight: 600
    }
  }, src), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--hl-fg-dim)",
      fontSize: "0.82rem",
      marginTop: 2
    }
  }, note)), /*#__PURE__*/React.createElement(StateTag, {
    type: state
  }, state)))))));
}
function Story() {
  const records = [["Still I Rise", "2026", "Manuscript", "Origin", "An archive of recognition assembled from the founder's lineage and Oakland."], ["Choice Is Not Chance", "2026", "Consolidated MS", "Coin", "The book-length argument behind the framework."], ["The Glyph Study", "2026", "Spec", "Graph", "Thirteen tests, twelve datasets, one attractor."]];
  return /*#__PURE__*/React.createElement(Section, {
    bg: "#000000",
    pad: "80px 28px 100px"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Archive"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "18px 0 36px",
      color: "#fff",
      fontSize: "clamp(2.4rem,5vw,4rem)",
      fontWeight: 700,
      letterSpacing: "-0.025em",
      lineHeight: 1
    }
  }, "Story"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "2px solid #fff"
    }
  }, records.map(([title, date, type, glyph, note]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      display: "flex",
      gap: 20,
      alignItems: "flex-start",
      padding: "26px 0",
      borderBottom: "1px solid var(--hl-hairline)"
    }
  }, /*#__PURE__*/React.createElement(Glyph, {
    name: glyph.toLowerCase(),
    size: 30,
    style: {
      marginTop: 4,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      color: "#fff",
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "-0.01em"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      color: "var(--hl-fg-muted)",
      fontSize: "1rem",
      lineHeight: 1.6,
      maxWidth: "60ch"
    }
  }, note)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      flex: "none",
      fontFamily: "var(--hl-font-mono)",
      fontSize: "0.72rem",
      color: "var(--hl-fg-dim)",
      letterSpacing: "0.06em"
    }
  }, /*#__PURE__*/React.createElement("div", null, date), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, type))))));
}
function Portal() {
  return /*#__PURE__*/React.createElement(Section, {
    bg: "#000000",
    pad: "80px 28px 110px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Glyph, {
    name: "hand",
    size: 34
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      margin: 0
    }
  }, "Action")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "12px 0 0",
      color: "#fff",
      fontSize: "clamp(2.4rem,5vw,4rem)",
      fontWeight: 700,
      letterSpacing: "-0.025em",
      lineHeight: 1,
      maxWidth: "16ch"
    }
  }, "A person is being seen here."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "22px 0 0",
      color: "var(--hl-fg-muted)",
      fontSize: "1.15rem",
      lineHeight: 1.6,
      maxWidth: "54ch"
    }
  }, "Commissions, collaborations, research partnerships, prints and products. Tell the studio what pattern you need made visible."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => e.preventDefault(),
    style: {
      marginTop: 40,
      maxWidth: 560,
      display: "grid",
      gap: 18
    }
  }, [["Name", "text"], ["Email", "email"]].map(([ph, t]) => /*#__PURE__*/React.createElement("input", {
    key: ph,
    type: t,
    placeholder: ph,
    style: inputStyle
  })), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "What are you building?",
    rows: 4,
    style: {
      ...inputStyle,
      resize: "vertical"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Get in touch"))));
}
const inputStyle = {
  background: "transparent",
  border: "1px solid var(--hl-hairline)",
  color: "#fff",
  padding: "14px 16px",
  fontFamily: "var(--hl-font-sans)",
  fontSize: "1rem",
  outline: "none"
};
Object.assign(window, {
  Dictionary,
  Research,
  Story,
  Portal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages.view.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/primitives.jsx
try { (() => {
/* global React */
// Heyer Livin' — shared UI primitives (website kit)
const {
  useState
} = React;

// ---- Glyph: renders a canonical white-stroke glyph SVG ----------------------
function Glyph({
  name,
  size = 40,
  style
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: `../../assets/glyphs/${name}.svg`,
    alt: `${name} glyph`,
    width: size,
    height: size,
    style: {
      display: "block",
      ...style
    }
  });
}

// ---- Eyebrow / kicker -------------------------------------------------------
function Eyebrow({
  children,
  color = "var(--hl-red)",
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "0.85rem",
      fontWeight: 500,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color,
      ...style
    }
  }, children);
}

// ---- Button (primary | outline | gold) -------------------------------------
function Button({
  children,
  variant = "primary",
  onClick,
  href
}) {
  const [hover, setHover] = useState(false);
  const base = {
    fontFamily: "var(--hl-font-sans)",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    padding: "14px 28px",
    border: "1px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    transition: "all 200ms cubic-bezier(.2,.8,.2,1)"
  };
  const skins = {
    primary: {
      background: hover ? "var(--hl-red)" : "#fff",
      color: "#000000"
    },
    outline: {
      background: "transparent",
      color: hover ? "var(--hl-red)" : "#fff",
      borderColor: hover ? "var(--hl-red)" : "#fff"
    },
    gold: {
      background: hover ? "#F04A59" : "var(--hl-red)",
      color: "#000000"
    }
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...skins[variant]
    }
  }, children);
}

// ---- Evidence badge ---------------------------------------------------------
function EvidenceBadge({
  children,
  gold
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--hl-font-mono)",
      fontSize: "0.8rem",
      fontWeight: 500,
      letterSpacing: "0.04em",
      padding: "8px 14px",
      fontVariantNumeric: "tabular-nums",
      border: `1px solid ${gold ? "var(--hl-red)" : "#fff"}`,
      color: gold ? "var(--hl-red)" : "#fff"
    }
  }, children);
}

// ---- State tag --------------------------------------------------------------
const STATE_COLORS = {
  subordinated: "#1B45E5",
  structural: "#ffffff",
  dominant: "#E11D2E",
  outer: "#777777"
};
function StateTag({
  type = "structural",
  children
}) {
  const c = STATE_COLORS[type];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "6px 11px",
      border: `1px solid ${type === "outer" ? "#555" : c}`,
      color: c
    }
  }, children);
}

// ---- Section rule -----------------------------------------------------------
function Rule({
  thick = 2,
  color = "#fff",
  style
}) {
  return /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: `${thick}px solid ${color}`,
      margin: 0,
      ...style
    }
  });
}
Object.assign(window, {
  Glyph,
  Eyebrow,
  Button,
  EvidenceBadge,
  StateTag,
  Rule
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/primitives.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.EvidenceBadge = __ds_scope.EvidenceBadge;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Glyph = __ds_scope.Glyph;

__ds_ns.Rule = __ds_scope.Rule;

__ds_ns.StateTag = __ds_scope.StateTag;

})();
