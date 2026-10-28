// Editorial design tokens — shared by the redesigned sections.
export const palette = {
  paper: "#F3EFE7",
  paperDeep: "#EAE4D8",
  ink: "#141413",
  muted: "#6E6A62",
  accent: "#FF4F1A",
  rule: "rgba(20, 20, 19, 0.14)",
};

// Design-tool chrome used by the "canvas" hero + app bar.
export const ui = {
  canvas: "#F3F3F1",
  panel: "#FFFFFF",
  border: "#E6E6E3",
  hover: "#F4F4F2",
  text: "#1E1E1E",
  sub: "#7B7B76",
  select: "#0D99FF",
  selectSoft: "rgba(13, 153, 255, 0.10)",
  dev: "#14AE5C",
  component: "#9747FF",
  redline: "#F24822",
  sticky: "#FFE38F",
  // IDE / .NET + Angular brand
  editor: "#FFFFFF",
  side: "#F8F8FA",
  dotnet: "#512BD4",
  dotnetSoft: "rgba(81, 43, 212, 0.09)",
  angular: "#DD0031",
  ok: "#1A7F37",
};

export const fonts = {
  sans: `"Inter Tight", "Helvetica Neue", Arial, sans-serif`,
  serif: `"Instrument Serif", Georgia, serif`,
  mono: `"JetBrains Mono", ui-monospace, monospace`,
  hand: `"Caveat", cursive`,
};

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.7, 0, 0.2, 1],
};

// Fine film grain, used as a background-image overlay.
export const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
