import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FiImage, FiMove } from "react-icons/fi";
import { Bio } from "../../data/constants";
import HeroImg from "../../images/image01.jpg";
import { palette as p, fonts, ease, ui } from "../../utils/palette";
import CodeCard from "./CodeCard";
import Terminal from "./Terminal";
import { SolutionExplorer, PropertiesPanel, StatusBar } from "./Panels";

/* ------------------------------------------------------------------ */
/*  Shell                                                               */
/* ------------------------------------------------------------------ */
const Section = styled.section`
  display: grid;
  grid-template-columns: ${({ $leftOpen }) => ($leftOpen ? "250px" : "42px")} minmax(0, 1fr) ${({ $rightOpen }) => ($rightOpen ? "330px" : "42px")};
  grid-template-rows: minmax(0, 1fr) auto;
  min-height: calc(100vh - 56px);
  background: ${ui.side};
  color: ${ui.text};
  font-family: ${fonts.sans};
  transition: grid-template-columns 0.28s cubic-bezier(0.16, 1, 0.3, 1);

  & * {
    font-family: inherit;
  }

  @media (max-width: 1199px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Editor = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: ${ui.editor};
  container-type: inline-size;
`;

const Crumbs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 38px;
  padding: 0 20px;
  border-bottom: 1px solid ${ui.border};
  font-size: 12px;
  color: ${ui.sub};
  white-space: nowrap;

  .path span + span::before {
    content: "›";
    margin: 0 7px;
    color: #c4c4bf;
  }

  .path b {
    font-weight: 600;
    color: ${ui.text};
  }

  .live {
    font-family: ${fonts.mono} !important;
    font-size: 11px;
    color: ${ui.sub};
  }

  @media (max-width: 640px) {
    .path span:not(:last-child) {
      display: none;
    }
  }
`;

const Stage = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
  align-items: center;
  gap: clamp(24px, 4cqw, 56px);
  padding: 40px clamp(20px, 4cqw, 56px) 56px;
  background: ${ui.editor};

  @media (max-width: 859px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    padding-top: 32px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Left column                                                         */
/* ------------------------------------------------------------------ */
const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
`;

const Comment = styled(motion.div)`
  margin-bottom: 14px;
  font-family: ${fonts.mono} !important;
  font-size: 13px;
  color: #6a8a5a;
`;

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Name = styled.h1`
  margin: 0;
  font-size: clamp(56px, 11cqw, 132px);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.05em;
  color: ${p.ink};

  @media (max-width: 859px) {
    font-size: clamp(56px, 18cqw, 104px);
  }
`;

const Line = styled.span`
  display: block;
  overflow: hidden;
  padding: 0.02em 0.12em 0.08em 0;

  &.indent {
    padding-left: 0.55em;
  }
`;

const LineInner = styled(motion.span)`
  display: inline-block;
`;

const SerifName = styled.em`
  font-family: ${fonts.serif} !important;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.025em;

  .dot {
    font-family: ${fonts.serif} !important;
    color: ${ui.dotnet};
  }

  .caret {
    display: inline-block;
    width: 0.05em;
    height: 0.72em;
    margin-left: 0.08em;
    vertical-align: baseline;
    background: ${ui.dotnet};
    animation: ${blink} 1.1s step-end infinite;
  }
`;

const Role = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 28px;
  margin-top: 22px;
  font-family: ${fonts.mono} !important;
  font-size: clamp(13px, 1.6cqw, 15px);
  color: ${ui.dotnet};

  * {
    font-family: ${fonts.mono} !important;
  }

  .prompt {
    color: ${ui.sub};
  }

  .Typewriter__cursor {
    color: ${ui.dotnet};
  }
`;

const Statement = styled.p`
  max-width: 27ch;
  margin: 18px 0 0;
  font-size: clamp(21px, 2.6cqw, 29px);
  font-weight: 500;
  line-height: 1.28;
  letter-spacing: -0.02em;
  color: ${p.ink};

  .net,
  .ng {
    white-space: nowrap;
    background-repeat: no-repeat;
    background-size: 100% 0.12em;
    background-position: 0 92%;
  }

  .net {
    color: ${ui.dotnet};
    background-image: linear-gradient(${ui.dotnet}33, ${ui.dotnet}33);
  }

  .ng {
    color: ${ui.angular};
    background-image: linear-gradient(${ui.angular}33, ${ui.angular}33);
  }
`;

const Intro = styled.p`
  max-width: 48ch;
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.7;
  color: ${ui.sub};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
`;

const ButtonBase = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 22px;
  border-radius: 10px;
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Primary = styled(ButtonBase)`
  background: ${ui.dotnet};
  color: #fff;
  box-shadow: 0 14px 28px -14px rgba(81, 43, 212, 0.7);

  .arrow {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #4321b8;
  }

  &:hover .arrow {
    transform: translate(2px, -2px);
  }
`;

const Ghost = styled(ButtonBase)`
  background: #fff;
  color: ${p.ink};
  border: 1px solid ${ui.border};

  &:hover {
    border-color: ${p.ink};
  }
`;

const Chips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;

  li {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    height: 28px;
    padding: 0 10px;
    border-radius: 7px;
    background: #fff;
    border: 1px solid ${ui.border};
    font-family: ${fonts.mono} !important;
    font-size: 11.5px;
    color: ${ui.text};
  }

  li i {
    width: 7px;
    height: 7px;
    border-radius: 2px;
  }
`;

const InlineLinks = styled.div`
  display: none;
  gap: 18px;
  margin-top: 22px;
  font-size: 13.5px;

  a {
    color: ${ui.sub};
    text-decoration: none;
    border-bottom: 1px solid ${ui.border};
  }

  a:hover {
    color: ${ui.dotnet};
    border-color: ${ui.dotnet};
  }

  @media (max-width: 1199px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

/* ------------------------------------------------------------------ */
/*  Right column                                                        */
/* ------------------------------------------------------------------ */
const Visual = styled(motion.div)`
  position: relative;
  justify-self: center;
  width: min(100%, 470px);
  min-height: 590px;
  margin: 10px 0 24px;

  @media (max-width: 859px) {
    width: min(100%, 390px);
    min-height: 610px;
    margin: 36px auto 0;
  }
`;

const PhotoCard = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid ${ui.border};
  padding: 8px;
  box-shadow: 0 16px 36px -20px rgba(20, 20, 19, 0.22);
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 42px -18px rgba(81, 43, 212, 0.18);
  }

  @media (max-width: 640px) {
    position: relative;
    right: auto;
    width: 100%;
    max-width: 270px;
    margin: 0 auto;
  }
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px 8px;
  font-family: ${fonts.mono} !important;
  font-size: 11px;
  color: ${ui.sub};

  .dots {
    display: flex;
    gap: 5px;
  }

  .dots i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #e2e2de;
  }

  .file {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: ${ui.text};
    font-weight: 500;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: ${ui.ok};
    font-size: 10.5px;
    font-weight: 600;
  }

  .tag i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${ui.ok};
    box-shadow: 0 0 0 2px rgba(26, 127, 55, 0.2);
  }
`;

const Photo = styled.div`
  aspect-ratio: 3.5 / 4.4;
  overflow: hidden;
  border-radius: 8px;
  background: ${ui.side};

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 8%;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

const Response = styled(motion.div)`
  position: absolute;
  top: 165px;
  left: -68px;
  width: 216px;
  z-index: 4;
  overflow: hidden;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid ${ui.border};
  box-shadow: 0 16px 36px -14px rgba(20, 20, 19, 0.28), 0 2px 6px rgba(20, 20, 19, 0.04);
  cursor: grab;
  user-select: none;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  * {
    font-family: ${fonts.mono} !important;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 11px;
    border-bottom: 1px solid ${ui.border};
    background: ${ui.side};
    font-size: 10.5px;
  }

  .top b {
    color: ${ui.dotnet};
    font-weight: 700;
  }

  .drag-pill {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 1px 6px;
    border-radius: 4px;
    background: #e9e9e5;
    font-size: 9.5px;
    color: ${ui.sub};
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .top em {
    font-style: normal;
    color: ${ui.ok};
    font-weight: 600;
    font-size: 10px;
  }

  pre {
    margin: 0;
    padding: 8px 11px;
    font-size: 10.5px;
    line-height: 1.6;
    color: ${ui.text};
    pointer-events: none;
  }

  .k { color: #0451a5; }
  .s { color: #a31515; }
  .b { color: #0000ff; }

  @media (max-width: 640px) {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    max-width: 270px;
    margin: 12px auto 0;
  }
`;

const CodeWrap = styled(motion.div)`
  position: absolute;
  top: 335px;
  left: -12px;
  width: 335px;
  z-index: 5;
  cursor: grab;
  user-select: none;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 640px) {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    max-width: 320px;
    margin: 12px auto 0;
  }
`;

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const chipColors = {
  "C#": ui.dotnet,
  ".NET": ui.dotnet,
  "ASP.NET Core": ui.dotnet,
  Angular: ui.angular,
  TypeScript: "#3178C6",
  "SQL Server": "#CC2927",
  "Entity Framework": "#7B5CD6",
};

const links = [
  ["GitHub", Bio.github],
  ["LinkedIn", Bio.linkedin],
  ["Instagram", Bio.insta],
  ["Facebook", Bio.facebook],
].filter(([, href]) => href);

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
const HeroSection = () => {
  const stageRef = useRef(null);
  const reduce = useReducedMotion();
  const from = (state) => (reduce ? false : state);

  const [runId, setRunId] = useState(0);
  const [built, setBuilt] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  // "Run" buttons (top bar + terminal) replay the build.
  useEffect(() => {
    const onRun = () => {
      setBuilt(false);
      setRunId((r) => r + 1);
    };
    window.addEventListener("portfolio:run", onRun);
    return () => window.removeEventListener("portfolio:run", onRun);
  }, []);

  const onBuilt = useCallback(() => setBuilt(true), []);

  const rise = (delay) => ({
    initial: from({ opacity: 0, y: 16 }),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: ease.out, delay },
  });

  return (
    <Section
      id="about"
      aria-label="Introduction"
      $leftOpen={leftOpen}
      $rightOpen={rightOpen}
    >
      <SolutionExplorer
        isOpen={leftOpen}
        onToggle={() => setLeftOpen((v) => !v)}
      />

      <Editor>
        <Crumbs>
          <div className="path">
            <span>Portfolio.Api</span>
            <span>Controllers</span>
            <span>
              <b>AboutController.cs</b>
            </span>
          </div>

          <span className="live">localhost:4200</span>
        </Crumbs>

        <Stage ref={stageRef}>
          <Content>
            <Comment {...rise(0)}>{"// hello, world! I'm"}</Comment>

            <Name>
              <Line>
                <LineInner
                  initial={from({ y: "110%" })}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.05, ease: ease.out, delay: 0.1 }}
                >
                  Yohan
                </LineInner>
              </Line>
              <Line className="indent">
                <LineInner
                  initial={from({ y: "110%" })}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.05, ease: ease.out, delay: 0.22 }}
                >
                  <SerifName>
                    Pasindu<span className="dot">.</span>
                    <span className="caret" aria-hidden="true" />
                  </SerifName>
                </LineInner>
              </Line>
            </Name>

            <motion.div {...rise(0.45)} style={{ width: "100%" }}>
              <Role>
                <span className="prompt">&gt;</span>
                <Typewriter
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                    loop: true,
                    delay: 45,
                    deleteSpeed: 25,
                  }}
                />
              </Role>

              <Statement>
                I build robust <span className="net">ASP.NET Core</span> APIs and clean{" "}
                <span className="ng">Angular</span> front-ends, from the database all the way to the
                browser.
              </Statement>
              <Intro>{Bio.heroIntro || Bio.description}</Intro>

              <Actions>
                <Primary id="hero-resume" href={Bio.resume} target="_blank" rel="noopener noreferrer">
                  Read my résumé <span className="arrow" aria-hidden="true">↗</span>
                </Primary>
                <Ghost id="hero-projects" href="#projects">
                  View projects
                </Ghost>
              </Actions>

              {Bio.stack && (
                <Chips aria-label="Main tech stack">
                  {Bio.stack.map((s) => (
                    <li key={s}>
                      <i style={{ background: chipColors[s] || ui.sub }} />
                      {s}
                    </li>
                  ))}
                </Chips>
              )}

              <InlineLinks>
                {links.map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                ))}
              </InlineLinks>
            </motion.div>
          </Content>

          <Visual {...rise(0.3)}>
            <PhotoCard>
              <PhotoHeader>
                <span className="file">
                  <FiImage style={{ verticalAlign: "-2px", marginRight: 5 }} />
                  wwwroot/profile.jpg
                </span>
              </PhotoHeader>
              <Photo>
                <img src={HeroImg} alt={`Portrait of ${Bio.name}`} />
              </Photo>
            </PhotoCard>

            <Response
              drag
              dragConstraints={stageRef}
              dragElastic={0.12}
              dragMomentum={false}
              whileDrag={{
                scale: 1.04,
                zIndex: 60,
                cursor: "grabbing",
                boxShadow: "0 24px 48px -12px rgba(20, 20, 19, 0.35)",
              }}
              initial={from({ opacity: 0, y: -10, scale: 0.96 })}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: ease.out, delay: 0.9 }}
            >
              <div className="top">
                <span>
                  <b>GET</b> /api/dev
                </span>
                <span className="drag-pill" title="Drag to reposition window">
                  <FiMove style={{ verticalAlign: "-1px" }} /> move
                </span>
                <em>● 200 OK</em>
              </div>
              <pre>
                {"{\n  "}
                <span className="k">"name"</span>: <span className="s">"Yohan Pasindu"</span>
                {",\n  "}
                <span className="k">"stack"</span>: [<span className="s">".NET"</span>, <span className="s">"Angular"</span>]
                {",\n  "}
                <span className="k">"cleanCode"</span>: <span className="b">true</span>
                {"\n}"}
              </pre>
            </Response>

            <CodeWrap
              drag
              dragConstraints={stageRef}
              dragElastic={0.12}
              dragMomentum={false}
              whileDrag={{
                scale: 1.02,
                zIndex: 60,
                cursor: "grabbing",
                boxShadow: "0 32px 64px -16px rgba(20, 20, 19, 0.4)",
              }}
              initial={from({ opacity: 0, y: 24 })}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: ease.out, delay: 0.75 }}
            >
              <CodeCard startDelay={1400} />
            </CodeWrap>
          </Visual>
        </Stage>

        <Terminal runId={runId} onDone={onBuilt} />
      </Editor>

      <PropertiesPanel
        isOpen={rightOpen}
        onToggle={() => setRightOpen((v) => !v)}
      />
      <StatusBar built={built} />
    </Section>
  );
};

export default HeroSection;