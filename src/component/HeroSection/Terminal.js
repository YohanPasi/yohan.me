import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useReducedMotion } from "framer-motion";
import { FiPlay, FiTerminal } from "react-icons/fi";
import { fonts, ui } from "../../utils/palette";

const script = [
  { wait: 700, parts: [["PS D:\\yohan> ", "dim"], ["dotnet run --project Portfolio.Api", "cmd"]] },
  { wait: 900, parts: [["info: ", "ok"], ["Now listening on: ", ""], ["https://localhost:7148", "link"]] },
  { wait: 600, parts: [["PS D:\\yohan\\portfolio-web> ", "dim"], ["ng serve", "cmd"]] },
  { wait: 1100, parts: [["✔ ", "ok"], ["Compiled successfully · ", ""], ["http://localhost:4200", "link"]] },
  { wait: 700, parts: [["GET ", "get"], ["/api/dev ", ""], ["200 OK", "ok"], [" · 14 ms", "dim"]] },
];

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(3px); }
  to   { opacity: 1; transform: none; }
`;

const Wrap = styled.div`
  border-top: 1px solid ${ui.border};
  background: ${ui.side};

  * {
    font-family: ${fonts.mono} !important;
  }

  button {
    border: 0;
    background: none;
    font: inherit;
    cursor: pointer;
  }
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  height: 34px;
  padding: 0 16px;
  border-bottom: 1px solid ${ui.border};
  font-size: 11px;
  color: ${ui.sub};

  .tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 100%;
    border-bottom: 1.5px solid transparent;
  }

  .tab.on {
    color: ${ui.text};
    border-color: ${ui.dotnet};
  }

  .count {
    padding: 0 5px;
    border-radius: 8px;
    background: #e8e8ec;
    font-size: 10px;
  }

  .run {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
    height: 24px;
    padding: 0 10px;
    border-radius: 6px;
    color: ${ui.ok};
    font-size: 11px;
    font-weight: 600;
    transition: background 0.2s ease;
  }

  .run:hover {
    background: rgba(26, 127, 55, 0.1);
  }

  @media (max-width: 640px) {
    .hide-sm {
      display: none;
    }
  }
`;

const Body = styled.div`
  height: 142px;
  padding: 10px 16px 12px;
  overflow: hidden;
  font-size: 11.5px;
  line-height: 1.85;
  color: ${ui.text};

  .ln {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    animation: ${fadeIn} 0.3s ease both;
  }

  .dim { color: ${ui.sub}; }
  .cmd { color: ${ui.text}; font-weight: 500; }
  .ok { color: ${ui.ok}; }
  .get { color: ${ui.dotnet}; font-weight: 600; }
  .link { color: #0b63c4; text-decoration: underline; text-underline-offset: 2px; }

  .caret {
    display: inline-block;
    width: 7px;
    height: 1.1em;
    vertical-align: text-bottom;
    background: ${ui.text};
    animation: ${blink} 1s step-end infinite;
  }

  @media (max-width: 640px) {
    height: 128px;
    font-size: 10.5px;
  }
`;

const Terminal = ({ runId, onDone }) => {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? script.length : 0);

  // restart whenever "Run" is pressed
  useEffect(() => {
    setShown(reduce ? script.length : 0);
  }, [runId, reduce]);

  useEffect(() => {
    if (shown >= script.length) {
      if (onDone) onDone();
      return undefined;
    }
    const t = setTimeout(() => setShown((s) => s + 1), script[shown].wait);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  const done = shown >= script.length;

  return (
    <Wrap>
      <Head>
        <span className="tab on">
          <FiTerminal /> Terminal
        </span>
        <span className="tab hide-sm">Output</span>
        <span className="tab hide-sm">
          Problems <span className="count">0</span>
        </span>
        <button
          id="terminal-run"
          type="button"
          className="run"
          onClick={() => window.dispatchEvent(new CustomEvent("portfolio:run"))}
          aria-label="Run the project again"
        >
          <FiPlay /> Run
        </button>
      </Head>
      <Body aria-live="polite">
        {script.slice(0, shown).map((l, i) => (
          <div className="ln" key={`${runId}-${i}`}>
            {l.parts.map(([t, c], j) => (
              <span key={j} className={c}>
                {t}
              </span>
            ))}
          </div>
        ))}
        {done && (
          <div className="ln">
            <span className="dim">PS D:\yohan&gt; </span>
            <span className="caret" aria-hidden="true" />
          </div>
        )}
      </Body>
    </Wrap>
  );
};

export default Terminal;
