import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useReducedMotion } from "framer-motion";
import { FiMove } from "react-icons/fi";
import { fonts, ui } from "../../utils/palette";

/* ------------------------------------------------------------------ */
/*  Snippets (Visual Studio / VS Code light syntax colours)             */
/* ------------------------------------------------------------------ */
const cs = {
  kw: "#0000FF",
  type: "#2B91AF",
  str: "#A31515",
  prop: "#1F377F",
  fn: "#74531F",
  p: "#3B3B3B",
};

const ts = {
  kw: "#0000FF",
  type: "#267F99",
  str: "#A31515",
  prop: "#001080",
  fn: "#795E26",
  p: "#3B3B3B",
};

const jsonPalette = {
  kw: "#0000FF",
  type: "#267F99",
  str: "#A31515",
  prop: "#0451A5",
  fn: "#795E26",
  p: "#3B3B3B",
};

const files = {
  cs: {
    name: "DevController.cs",
    badge: "C#",
    color: ui.dotnet,
    done: "✓ Build succeeded",
    palette: cs,
    tokens: [
      ["[", "p"], ["ApiController", "type"], [", ", "p"], ["Route", "type"], ["(", "p"], ['"api/dev"', "str"], [")]\n", "p"],
      ["public class ", "kw"], ["DevController", "type"], [" : ", "p"], ["ControllerBase", "type"], ["\n{\n", "p"],
      ["  [", "p"], ["HttpGet", "type"], ["]\n", "p"],
      ["  public ", "kw"], ["IActionResult", "type"], [" ", "p"], ["Get", "fn"], ["() => ", "p"], ["Ok", "fn"], ["(", "p"], ["new", "kw"], [" {\n", "p"],
      ["    Name", "prop"], ["  = ", "p"], ['"Yohan Pasindu"', "str"], [",\n", "p"],
      ["    Stack", "prop"], [" = ", "p"], ["new", "kw"], ["[] { ", "p"], ['".NET"', "str"], [", ", "p"], ['"Angular"', "str"], [" },\n", "p"],
      ["    Loves", "prop"], [" = ", "p"], ['"clean architecture"', "str"], ["\n", "p"],
      ["  });\n}", "p"],
    ],
  },
  ts: {
    name: "hero.component.ts",
    badge: "A",
    color: ui.angular,
    done: "✓ Compiled",
    palette: ts,
    tokens: [
      ["@", "fn"], ["Component", "fn"], ["({\n", "p"],
      ["  selector", "prop"], [": ", "p"], ["'app-hero'", "str"], [",\n", "p"],
      ["  standalone", "prop"], [": ", "p"], ["true", "kw"], [",\n", "p"],
      ["  templateUrl", "prop"], [": ", "p"], ["'./hero.html'", "str"], [",\n", "p"],
      ["})\n", "p"],
      ["export class ", "kw"], ["HeroComponent", "type"], [" {\n", "p"],
      ["  private ", "kw"], ["http", "prop"], [" = ", "p"], ["inject", "fn"], ["(", "p"], ["HttpClient", "type"], [");\n", "p"],
      ["  dev$", "prop"], [" = ", "p"], ["this", "kw"], [".", "p"], ["http", "prop"], [".", "p"], ["get", "fn"], ["<", "p"], ["Dev", "type"], [">(", "p"], ["'/api/dev'", "str"], [");\n", "p"],
      ["}", "p"],
    ],
  },
  json: {
    name: "api/dev.json",
    badge: "{ }",
    color: ui.ok,
    done: "✓ 200 OK",
    palette: jsonPalette,
    tokens: [
      ["{\n", "p"],
      ['  "name"', "prop"], [": ", "p"], ['"Yohan Pasindu"', "str"], [",\n", "p"],
      ['  "role"', "prop"], [": ", "p"], ['"Full-Stack Dev"', "str"], [",\n", "p"],
      ['  "stack"', "prop"], [": [\n", "p"],
      ['    "ASP.NET Core"', "str"], [",\n", "p"],
      ['    "Angular"', "str"], [",\n", "p"],
      ['    "SQL Server"', "str"], ["\n", "p"],
      ["  ],\n", "p"],
      ['  "cleanCode"', "prop"], [": ", "p"], ["true", "kw"], ["\n", "p"],
      ["}", "p"],
    ],
  },
};

Object.values(files).forEach((f) => {
  f.full = f.tokens.map((t) => t[0]).join("");
  f.lines = f.full.split("\n").length;
});
const gutterLines = Math.max(...Object.values(files).map((f) => f.lines));

/* ------------------------------------------------------------------ */
/*  Styles                                                              */
/* ------------------------------------------------------------------ */
const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Card = styled.div`
  overflow: hidden;
  background: #fff;
  border: 1px solid ${ui.border};
  border-radius: 12px;
  box-shadow: 0 30px 60px -30px rgba(20, 20, 19, 0.3), 0 2px 6px rgba(20, 20, 19, 0.04);

  * {
    font-family: ${fonts.mono} !important;
  }

  button {
    font: inherit;
    border: 0;
    background: none;
    cursor: pointer;
  }
`;

const Tabs = styled.div`
  display: flex;
  align-items: stretch;
  height: 36px;
  background: ${ui.side};
  border-bottom: 1px solid ${ui.border};
  font-size: 11px;
`;

const Tab = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  color: ${ui.sub};
  border-right: 1px solid ${ui.border} !important;
  transition: color 0.2s ease, background 0.2s ease;

  .b {
    display: grid;
    place-items: center;
    min-width: 16px;
    height: 16px;
    padding: 0 3px;
    border-radius: 3px;
    color: #fff;
    font-size: 8.5px;
    font-weight: 700;
  }

  &.on {
    color: ${ui.text};
    background: #fff !important;
  }

  &.on::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    background: ${({ $color }) => $color};
  }

  &:not(.on):hover {
    color: ${ui.text};
  }
`;

const DragHint = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  padding: 0 10px;
  font-size: 10px;
  color: ${ui.sub};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  user-select: none;

  svg {
    font-size: 11px;
  }
`;

const Body = styled.div`
  display: flex;
  padding: 12px 0 14px;
  font-size: 11.5px;
  line-height: 1.75;
`;

const Gutter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 34px;
  padding-right: 12px;
  color: #c4c4bf;
  user-select: none;

  .on {
    color: ${ui.text};
  }
`;

const Code = styled.pre`
  margin: 0;
  padding-right: 12px;
  white-space: pre;
  overflow: hidden;
`;

const Caret = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.2em;
  margin-left: 1px;
  vertical-align: text-bottom;
  background: ${ui.text};
  animation: ${blink} 1s step-end infinite;
`;

const Foot = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px 12px;
  border-top: 1px solid ${ui.border};
  background: ${ui.side};
  font-size: 10.5px;
  color: ${ui.sub};

  .done {
    color: ${ui.ok};
  }
`;

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
const CodeCard = ({ startDelay = 1500 }) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("cs");
  const [n, setN] = useState(0);
  const [first, setFirst] = useState(true);
  const file = files[active];

  useEffect(() => {
    if (reduce) {
      setN(file.full.length);
      return undefined;
    }
    if (n >= file.full.length) return undefined;
    const wait = n === 0 ? (first ? startDelay : 250) : file.full[n - 1] === "\n" ? 150 : 24;
    const t = setTimeout(() => setN((v) => v + 1), wait);
    return () => clearTimeout(t);
  }, [n, reduce, startDelay, file, first]);

  const open = (key) => {
    if (key === active) return;
    setFirst(false);
    setActive(key);
    setN(0);
  };

  const typed = file.full.slice(0, n);
  const done = n >= file.full.length;
  const line = typed.split("\n").length;
  const col = typed.length - typed.lastIndexOf("\n");

  let left = n;
  const rendered = file.tokens.map(([text, kind], i) => {
    if (left <= 0) return null;
    const part = text.slice(0, left);
    left -= text.length;
    return (
      <span key={i} style={{ color: file.palette[kind] }}>
        {part}
      </span>
    );
  });

  return (
    <Card>
      <Tabs role="tablist" aria-label="Code samples">
        {Object.entries(files).map(([key, f]) => (
          <Tab
            key={key}
            id={`code-tab-${key}`}
            role="tab"
            aria-selected={active === key}
            className={active === key ? "on" : ""}
            $color={f.color}
            onClick={() => open(key)}
          >
            <span className="b" style={{ background: f.color }}>
              {f.badge}
            </span>
            {f.name}
          </Tab>
        ))}
        <DragHint title="Drag to reposition window">
          <FiMove /> drag
        </DragHint>
      </Tabs>
      <Body>
        <Gutter aria-hidden="true">
          {Array.from({ length: gutterLines }, (_, i) => (
            <span key={i} className={i + 1 === line ? "on" : ""}>
              {i + 1}
            </span>
          ))}
        </Gutter>
        <Code aria-label={file.full}>
          {rendered}
          <Caret aria-hidden="true" />
        </Code>
      </Body>
      <Foot>
        <span className={done ? "done" : ""}>{done ? file.done : "Typing…"}</span>
        <span>
          Ln {line}, Col {col}
        </span>
      </Foot>
    </Card>
  );
};

export default CodeCard;
