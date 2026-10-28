import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  FiChevronDown,
  FiChevronRight,
  FiChevronLeft,
  FiFolder,
  FiSearch,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiFacebook,
  FiGitBranch,
  FiSend,
  FiCpu,
  FiSliders,
  FiRotateCcw,
  FiExternalLink,
  FiTerminal,
  FiCode,
  FiUser,
  FiCornerDownLeft,
} from "react-icons/fi";
import { Bio, projects } from "../../data/constants";
import HeroImg from "../../images/image01.jpg";
import { fonts, ui } from "../../utils/palette";
import { useLocalTime } from "../../utils/useLocalTime";

/* ------------------------------------------------------------------ */
/*  Shared panel chrome                                                 */
/* ------------------------------------------------------------------ */
const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  background: ${ui.side};
  border-right: 1px solid ${ui.border};
  font-size: 12px;
  color: ${ui.text};

  &.right {
    border-right: 0;
    border-left: 1px solid ${ui.border};
  }

  @media (max-width: 1199px) {
    display: none;
  }
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  padding: 0 14px;
  border-bottom: 1px solid ${ui.border};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${ui.sub};
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  margin: 10px 10px 6px;
  padding: 0 9px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid ${ui.border};
  font-size: 11.5px;
  color: ${ui.sub};

  kbd {
    margin-left: auto;
    font-family: ${fonts.mono} !important;
    font-size: 10px;
    color: ${ui.sub};
  }
`;

/* ------------------------------------------------------------------ */
/*  Solution Explorer (doubles as section navigation)                   */
/* ------------------------------------------------------------------ */
const Tree = styled.nav`
  flex: 1;
  padding: 4px 6px 12px;
  overflow: hidden;
`;

const Row = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 8px 0 ${({ $d = 0 }) => 6 + $d * 14}px;
  border-radius: 5px;
  color: ${ui.text};
  text-decoration: none;
  white-space: nowrap;
  cursor: default;

  svg {
    flex-shrink: 0;
    font-size: 12px;
    color: ${ui.sub};
  }

  .ico {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    min-width: 16px;
    height: 15px;
    padding: 0 2px;
    border-radius: 3px;
    color: #fff;
    font-family: ${fonts.mono} !important;
    font-size: 8px;
    font-weight: 700;
  }

  .ext {
    color: ${ui.sub};
  }

  .go {
    margin-left: auto;
    font-size: 10.5px;
    color: ${ui.dotnet};
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &[href] {
    cursor: pointer;
  }

  &[href]:hover {
    background: ${ui.dotnetSoft};
  }

  &[href]:hover .go {
    opacity: 1;
    transform: translateX(0);
  }

  &.sel {
    background: ${ui.dotnet};
    color: #fff;
  }

  &.sel .ext,
  &.sel svg {
    color: rgba(255, 255, 255, 0.75);
  }

  &.sel .go {
    display: none;
  }
`;

const Ico = ({ label, color }) => (
  <span className="ico" style={{ background: color }} aria-hidden="true">
    {label}
  </span>
);

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border-top: 1px solid ${ui.border};

  .who {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 15%;
    box-shadow: 0 0 0 2px #fff, 0 0 0 3.5px ${ui.dotnet};
  }

  strong {
    display: block;
    font-size: 12.5px;
    font-weight: 600;
  }

  small {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: ${ui.sub};
    font-variant-numeric: tabular-nums;
  }

  small i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${ui.ok};
  }

  .socials {
    display: flex;
    gap: 2px;
  }

  .socials a {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 7px;
    font-size: 14px;
    color: ${ui.text};
    transition: background 0.2s ease, color 0.2s ease;
  }

  .socials a:hover {
    background: #fff;
    color: ${ui.dotnet};
  }
`;

const controllers = [
  { id: "skills", name: "Skills" },
  { id: "education", name: "Education" },
  { id: "projects", name: "Projects" },
  { id: "experience", name: "Experience" },
  { id: "contact", name: "Contact" },
];

const socials = [
  { href: Bio.github, label: "GitHub", Icon: FiGithub },
  { href: Bio.linkedin, label: "LinkedIn", Icon: FiLinkedin },
  { href: Bio.insta, label: "Instagram", Icon: FiInstagram },
  { href: Bio.facebook, label: "Facebook", Icon: FiFacebook },
].filter((s) => s.href);

const CollapsedRail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 42px;
  height: 100%;
  padding: 8px 0 10px;
  background: ${ui.side};
  cursor: pointer;
  user-select: none;
  transition: background 0.15s ease;

  &:hover {
    background: #f5f5f3;
  }

  .top-btn {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid ${ui.border};
    background: #ffffff;
    color: ${ui.dotnet};
    font-size: 13px;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: all 0.15s ease;

    &:hover {
      border-color: ${ui.dotnet};
      background: #fbf9ff;
    }
  }

  .vertical-title {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    display: flex;
    align-items: center;
    font-family: ${fonts.mono} !important;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: ${ui.sub};
    text-transform: uppercase;
    white-space: nowrap;
    padding: 12px 0;
  }
`;

export const SolutionExplorer = ({ isOpen = false, onToggle }) => {
  const time = useLocalTime("Asia/Colombo");

  if (!isOpen) {
    return (
      <Aside aria-label="Solution Explorer (collapsed)">
        <CollapsedRail onClick={onToggle} title="Click to expand Solution Explorer">
          <button
            type="button"
            className="top-btn"
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.();
            }}
            title="Expand Solution Explorer"
          >
            <FiChevronRight />
          </button>

          <div className="vertical-title">
            <span>Solution Explorer</span>
          </div>

          <div style={{ height: 20 }} />
        </CollapsedRail>
      </Aside>
    );
  }

  return (
    <Aside aria-label="Solution Explorer">
      <Head>
        <span>Solution Explorer</span>
        <button
          type="button"
          onClick={onToggle}
          title="Collapse Solution Explorer"
          style={{
            background: "none",
            border: 0,
            cursor: "pointer",
            color: ui.sub,
            display: "grid",
            placeItems: "center",
            width: 24,
            height: 24,
            borderRadius: 4,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = ui.dotnet)}
          onMouseLeave={(e) => (e.currentTarget.style.color = ui.sub)}
        >
          <FiChevronLeft style={{ fontSize: 14 }} />
        </button>
      </Head>
      <Search aria-hidden="true">
        <FiSearch /> Search solution <kbd>Ctrl+;</kbd>
      </Search>

      <Tree aria-label="Sections">
        <Row as="div" $d={0}>
          <FiChevronDown />
          <Ico label="sln" color="#68217A" /> Solution ‘YohanPasindu’
        </Row>

        <Row as="div" $d={1}>
          <FiChevronDown />
          <Ico label="C#" color={ui.dotnet} /> Portfolio.Api
        </Row>
        <Row as="div" $d={2}>
          <FiChevronDown />
          <FiFolder /> Controllers
        </Row>
        <Row href="#about" $d={3} className="sel" aria-current="true">
          <Ico label="C#" color="#7a5ce0" /> About<span className="ext">Controller.cs</span>
        </Row>
        {controllers.map((c) => (
          <Row key={c.id} id={`sol-${c.id}`} href={`#${c.id}`} $d={3}>
            <Ico label="C#" color={ui.dotnet} /> {c.name}
            <span className="ext">Controller.cs</span>
            <span className="go">open →</span>
          </Row>
        ))}
        <Row as="div" $d={2}>
          <Ico label="C#" color={ui.dotnet} /> Program<span className="ext">.cs</span>
        </Row>
        <Row as="div" $d={2}>
          <Ico label="{}" color="#8a8a85" /> appsettings<span className="ext">.json</span>
        </Row>

        <Row as="div" $d={1}>
          <FiChevronDown />
          <Ico label="A" color={ui.angular} /> portfolio-web
        </Row>
        <Row as="div" $d={2}>
          <FiChevronRight />
          <FiFolder /> src/app
        </Row>
        <Row as="div" $d={2}>
          <Ico label="{}" color="#8a8a85" /> angular<span className="ext">.json</span>
        </Row>
      </Tree>

      <Profile>
        <div className="who">
          <img src={HeroImg} alt="" />
          <div>
            <strong>{Bio.name}</strong>
            <small>
              <i /> Online · {time} in Sri Lanka
            </small>
          </div>
        </div>
        <div className="socials">
          {socials.map(({ href, label, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
              <Icon />
            </a>
          ))}
        </div>
      </Profile>
    </Aside>
  );
};

/* ------------------------------------------------------------------ */
/*  Right Panel (Visual Studio 2022 Copilot Chat + Properties Explorer)*/
/* ------------------------------------------------------------------ */
const cursorBlink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const pulseDot = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.15); }
`;

const RightCollapsedRail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 42px;
  height: 100%;
  padding: 8px 0 10px;
  background: ${ui.side};
  cursor: pointer;
  user-select: none;
  transition: background 0.15s ease;

  &:hover {
    background: #f5f5f3;
  }

  .top-btn {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid ${ui.border};
    background: #ffffff;
    color: ${ui.dotnet};
    font-size: 13px;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: all 0.15s ease;

    &:hover {
      border-color: ${ui.dotnet};
      background: #fbf9ff;
    }
  }

  .vertical-title {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    display: flex;
    align-items: center;
    font-family: ${fonts.mono} !important;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: ${ui.dotnet};
    text-transform: uppercase;
    white-space: nowrap;
    padding: 12px 0;
  }
`;

const PanelNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  padding: 0 10px 0 12px;
  border-bottom: 1px solid ${ui.border};
  background: ${ui.side};
`;

const PanelTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 26px;
    padding: 0 9px;
    border-radius: 5px;
    border: 0;
    background: none;
    font-size: 11px;
    font-weight: 600;
    color: ${ui.sub};
    cursor: pointer;
    transition: all 0.2s ease;

    &.on {
      background: #ffffff;
      color: ${ui.dotnet};
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    }

    &:hover:not(.on) {
      color: ${ui.text};
    }
  }
`;

const WorkspaceTag = styled.span`
  display: inline-flex;
  align-items: center;
  font-family: ${fonts.mono} !important;
  font-size: 10px;
  color: ${ui.sub};
`;

const ContextBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  background: #fdfdfd;
  border-bottom: 1px solid ${ui.border};
  font-size: 10.5px;
  font-family: ${fonts.mono} !important;
  color: ${ui.sub};

  .info {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .clear-btn {
    background: none;
    border: 0;
    color: ${ui.sub};
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-family: ${fonts.mono} !important;
    transition: all 0.15s ease;

    &:hover {
      color: ${ui.dotnet};
      background: ${ui.side};
    }
  }
`;

const ChatFeed = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fafaf8;
  scroll-behavior: smooth;
`;

const VisitorBubble = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-self: flex-end;
  max-width: 92%;

  .meta {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: flex-end;
    font-family: ${fonts.mono} !important;
    font-size: 9.5px;
    color: ${ui.sub};
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .bubble {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    padding: 7px 10px;
    border-radius: 6px;
    background: #ffffff;
    border: 1px solid ${ui.border};
    border-left: 2.5px solid ${ui.dotnet};
    font-size: 11.5px;
    color: ${ui.text};
    line-height: 1.45;

    .sym {
      font-family: ${fonts.mono} !important;
      font-size: 11px;
      font-weight: 700;
      color: ${ui.dotnet};
    }
  }
`;

const AiResponseCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid ${ui.border};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(20, 20, 19, 0.03);

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    background: ${ui.side};
    border-bottom: 1px solid ${ui.border};
    font-family: ${fonts.mono} !important;
    font-size: 10px;
  }

  .agent-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-weight: 700;
    color: ${ui.dotnet};
  }

  .card-meta {
    color: ${ui.sub};
  }

  .card-body {
    padding: 10px 12px;
    font-size: 11.5px;
    line-height: 1.6;
    color: ${ui.text};
    white-space: pre-wrap;
    word-break: break-word;

    b, strong {
      color: #111111;
      font-weight: 600;
    }

    .cursor {
      display: inline-block;
      width: 6px;
      height: 12px;
      margin-left: 3px;
      vertical-align: middle;
      background: ${ui.dotnet};
      animation: ${cursorBlink} 0.8s step-end infinite;
    }
  }

  .actions-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 6px 10px 8px;
    border-top: 1px solid #f2f2ee;
    background: #fafaf8;

    a, button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 4px;
      background: #ffffff;
      border: 1px solid ${ui.border};
      font-family: ${fonts.mono} !important;
      font-size: 10px;
      color: ${ui.sub};
      text-decoration: none;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        border-color: ${ui.dotnet};
        color: ${ui.dotnet};
        background: #fbf9ff;
      }
    }
  }
`;

const ThinkingBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #ffffff;
  border: 1px solid ${ui.border};
  border-radius: 6px;
  font-family: ${fonts.mono} !important;
  font-size: 10.5px;
  color: ${ui.sub};

  .dots {
    display: inline-flex;
    gap: 3px;

    span {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: ${ui.dotnet};
      animation: ${pulseDot} 1.2s infinite ease-in-out;

      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
`;

const SuggestionsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px 10px 6px;
  background: ${ui.side};
  border-top: 1px solid ${ui.border};

  .sug-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ${fonts.mono} !important;
    font-size: 9.5px;
    color: ${ui.sub};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .sug-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 22px;
    padding: 0 8px;
    border-radius: 4px;
    background: #ffffff;
    border: 1px solid ${ui.border};
    font-size: 10.5px;
    color: ${ui.text};
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;

    .tag {
      font-family: ${fonts.mono} !important;
      color: ${ui.dotnet};
      font-weight: 700;
    }

    &:hover:not(:disabled) {
      border-color: ${ui.dotnet};
      color: ${ui.dotnet};
      background: #fbf9ff;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const PromptInputForm = styled.form`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background: #ffffff;
  border-top: 1px solid ${ui.border};

  .prompt-sym {
    font-family: ${fonts.mono} !important;
    font-size: 12px;
    font-weight: 700;
    color: ${ui.dotnet};
    padding-left: 4px;
  }

  input {
    flex: 1;
    height: 32px;
    padding: 0 8px;
    border-radius: 6px;
    border: 1px solid ${ui.border};
    background: ${ui.side};
    font-family: ${fonts.sans} !important;
    font-size: 11.5px;
    color: ${ui.text};
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: ${ui.dotnet};
      background: #ffffff;
    }

    &::placeholder {
      font-size: 11px;
      color: #9c9c96;
    }
  }

  button {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 0;
    background: ${ui.dotnet};
    color: #ffffff;
    cursor: pointer;
    font-size: 12px;
    transition: background 0.2s ease;

    &:hover:not(:disabled) {
      background: #4321b8;
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }
`;

/* Properties Window Styles */
const ObjectHeader = styled.div`
  padding: 10px 14px;
  border-bottom: 1px solid ${ui.border};

  strong {
    display: block;
    font-size: 12.5px;
    font-weight: 600;
  }

  small {
    font-family: ${fonts.mono} !important;
    font-size: 10.5px;
    color: ${ui.sub};
  }
`;

const Grid = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Cat = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  background: #efeff2;
  border-bottom: 1px solid ${ui.border};
  font-size: 11.5px;
  font-weight: 600;

  svg {
    font-size: 12px;
    color: ${ui.sub};
  }
`;

const Prop = styled.div`
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  min-height: 27px;
  border-bottom: 1px solid #efeff1;
  font-size: 11.5px;

  span {
    display: flex;
    align-items: center;
    padding: 4px 10px;
    min-width: 0;
  }

  span:first-child {
    padding-left: 24px;
    color: ${ui.sub};
    border-right: 1px solid #efeff1;
  }

  span:last-child {
    background: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .bool {
    font-family: ${fonts.mono} !important;
    color: #0000ff;
  }

  .str {
    font-family: ${fonts.mono} !important;
    color: #a31515;
  }
`;

const Desc = styled.div`
  padding: 12px 14px;
  border-top: 1px solid ${ui.border};
  font-size: 11.5px;
  line-height: 1.5;
  color: ${ui.sub};

  b {
    display: block;
    margin-bottom: 2px;
    color: ${ui.text};
  }
`;

const ExportBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 34px;
  margin: 0 14px 14px;
  border-radius: 8px;
  background: ${ui.dotnet};
  color: #fff;
  font-size: 12.5px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #4321b8;
  }
`;

const quickSuggestions = [
  "Who is Yohan?",
  "What is his tech stack?",
  "Show me his projects",
  "Education at SLIIT",
  "How to contact him?",
];

/**
 * Intelligent third-person AI analysis engine.
 * STRICT RULE: The AI answers in third-person ("Yohan is...", "He specializes in...").
 * Never in first-person ("I am Yohan").
 */
const getAiResponse = (rawQuery) => {
  const q = rawQuery.toLowerCase().trim();

  if (
    q.includes("who is yohan") ||
    q.includes("who are you") ||
    q.includes("who am i") ||
    q.includes("profile") ||
    q.includes("about") ||
    q.includes("candidate") ||
    q === "/who"
  ) {
    return {
      body: `Yohan Pasindu is a .NET & Angular Full-Stack Engineer based in Sri Lanka, currently completing his BSc (Hons) in Information Technology at SLIIT (4th Year, 2nd Sem).

He specializes in engineering enterprise backend services with C# and ASP.NET Core 8, paired with responsive, reactive frontend single-page applications built with Angular 17+ and TypeScript.

• Core Architecture: Clean Architecture, Repository Pattern, CQRS with MediatR
• Backend Stack: C# 12, ASP.NET Core 8 Web API, Entity Framework Core 8
• Frontend Stack: Angular 17 Standalone Components, Signals, RxJS
• Data Persistence: Microsoft SQL Server, Code-First Migrations, MongoDB`,
      actions: [
        { label: "View Projects", href: "#projects" },
        { label: "Inspect Skills", href: "#skills" },
        { label: "Download CV", href: Bio.resume },
      ],
    };
  }

  if (
    q.includes("stack") ||
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("dotnet") ||
    q.includes("c#") ||
    q.includes("angular") ||
    q === "/stack"
  ) {
    return {
      body: `Yohan's core development stack is engineered around modern enterprise technologies:

• Backend & APIs:
  – C# 12 & .NET 8.0 Runtime
  – ASP.NET Core Web API with Controllers & Minimal APIs
  – Entity Framework Core 8 (Code-First, LINQ optimization)
  – JWT Authentication, MediatR, FluentValidation, Swagger / OpenAPI

• Frontend Engineering:
  – Angular 17+ with Standalone Components & Vite bundling
  – TypeScript, RxJS reactive pipelines, and Angular Signals
  – Modern CSS3, responsive component design, HTML5

• Databases & DevOps:
  – Microsoft SQL Server (relational schemas, indexes, stored procedures)
  – Docker containerization, Visual Studio 2022, Git & GitHub`,
      actions: [
        { label: "Explore Skills Section", href: "#skills" },
        { label: "GitHub Repositories", href: Bio.github },
      ],
    };
  }

  if (
    q.includes("project") ||
    q.includes("built") ||
    q.includes("work") ||
    q.includes("portfolio") ||
    q.includes("repo") ||
    q === "/projects"
  ) {
    return {
      body: `Yohan has engineered several production-grade full-stack solutions:

• Clean Architecture Web API:
  An enterprise-grade ASP.NET Core 8 backend structured with strict separation of concerns (Domain, Application, Infrastructure, API). Implements CQRS, Repository Pattern, and JWT authentication.

• Angular Enterprise Portal:
  A reactive Single Page Application built with Angular 17 standalone components, RxJS state management, and custom HTTP interceptors for real-time data sync.

• SQL Server Data Systems:
  Robust database implementations featuring relational integrity, transaction management, and performance-tuned LINQ queries.

Each solution is tracked with clean Git history and documented on his GitHub profile.`,
      actions: [
        { label: "Browse Projects", href: "#projects" },
        { label: "View GitHub Repos", href: Bio.github },
      ],
    };
  }

  if (
    q.includes("education") ||
    q.includes("study") ||
    q.includes("degree") ||
    q.includes("sliit") ||
    q.includes("university") ||
    q.includes("academic") ||
    q === "/education"
  ) {
    return {
      body: `Yohan is an undergraduate student at the Sri Lanka Institute of Information Technology (SLIIT):

• Degree: Bachelor of Science (Honours) in Information Technology
• Standing: 4th Year (2nd Sem) Final-Year Undergraduate
• Academic Focus: Enterprise Software Engineering, Distributed Systems, Database Management Systems, and Object-Oriented Analysis & Design.

He actively applies academic software principles to hands-on enterprise .NET and Angular projects.`,
      actions: [
        { label: "View Education", href: "#education" },
        { label: "LinkedIn Profile", href: Bio.linkedin },
      ],
    };
  }

  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("email") ||
    q.includes("resume") ||
    q.includes("cv") ||
    q.includes("reach") ||
    q === "/contact"
  ) {
    return {
      body: `Yohan Pasindu is open to full-stack software engineering opportunities, developer internships, and technical collaborations:

• Email: yohanpasindu2002@gmail.com
• LinkedIn: linkedin.com/in/yohan-pasindu-4806b4307
• GitHub: github.com/YohanPasi
• Location: Sri Lanka (UTC +5:30)

You can download his official résumé directly or send him an email using the links below.`,
      actions: [
        { label: "Download Résumé", href: Bio.resume },
        { label: "Send Email", href: "mailto:yohanpasindu2002@gmail.com" },
        { label: "LinkedIn Profile", href: Bio.linkedin },
      ],
    };
  }

  // Keyword-specific matches
  if (q.includes("docker") || q.includes("container")) {
    return {
      body: `Yohan utilizes Docker to containerize .NET backend microservices and Angular web clients:

• Multi-stage Docker builds to produce slim, secure production container images.
• Docker Compose configurations to orchestrate ASP.NET Core APIs alongside Microsoft SQL Server databases.
• Consistent local dev environments ensuring zero "works on my machine" discrepancies.`,
      actions: [
        { label: "Inspect Skills", href: "#skills" },
        { label: "GitHub Repos", href: Bio.github },
      ],
    };
  }

  if (q.includes("sql") || q.includes("database") || q.includes("mongo")) {
    return {
      body: `Yohan designs relational and document data storage architectures:

• Microsoft SQL Server: Relational modeling, primary/foreign key indexing, stored procedures, and ACID transaction safety.
• Entity Framework Core 8: Code-First migrations, navigational relationship mappings, and LINQ performance tuning with AsNoTracking.
• MongoDB: Document store modeling for unstructured data and caching layers.`,
      actions: [
        { label: "View Projects", href: "#projects" },
        { label: "Inspect Skills", href: "#skills" },
      ],
    };
  }

  return {
    body: `Analysis of query "${rawQuery}":

Yohan Pasindu is a .NET & Angular Full-Stack Engineer specializing in C#, ASP.NET Core 8 Web APIs, Entity Framework Core, SQL Server, and Angular 17.

To explore specific details regarding his background, select any suggested question or ask about his tech stack, featured repositories, or educational journey at SLIIT.`,
    actions: [
      { label: "Profile Summary", prompt: "Who is Yohan?" },
      { label: "Tech Stack", prompt: "What is his tech stack?" },
      { label: "Download CV", href: Bio.resume },
    ],
  };
};

export const PropertiesPanel = ({ isOpen = false, onToggle }) => {
  const time = useLocalTime("Asia/Colombo");
  const count = String(projects.length).padStart(2, "0");
  const [panelTab, setPanelTab] = useState("copilot"); // "copilot" | "props"
  const [input, setInput] = useState("");
  const chatFeedRef = useRef(null);
  const streamTimerRef = useRef(null);

  // Initial chat history (Visitor asks Who is Yohan, AI answers with full specs)
  const [chatEntries, setChatEntries] = useState([
    {
      id: "entry-init",
      visitor: "Who is Yohan?",
      body: `Yohan Pasindu is a .NET & Angular Full-Stack Engineer based in Sri Lanka, currently completing his BSc (Hons) in Information Technology at SLIIT (4th Year, 2nd Sem).

He specializes in engineering enterprise backend services with C# and ASP.NET Core 8, paired with responsive, reactive frontend single-page applications built with Angular 17+ and TypeScript.

• Core Architecture: Clean Architecture, Repository Pattern, CQRS with MediatR
• Backend Stack: C# 12, ASP.NET Core 8 Web API, Entity Framework Core 8
• Frontend Stack: Angular 17 Standalone Components, Signals, RxJS
• Data Persistence: Microsoft SQL Server, Code-First Migrations, MongoDB`,
      actions: [
        { label: "View Projects", href: "#projects" },
        { label: "Inspect Skills", href: "#skills" },
        { label: "Download CV", href: Bio.resume },
      ],
    },
  ]);

  // Live streaming states for new answers
  const [isTyping, setIsTyping] = useState(false);
  const [streamingPrompt, setStreamingPrompt] = useState(null);
  const [streamedText, setStreamedText] = useState("");

  useEffect(() => {
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [chatEntries, streamedText, isTyping]);

  const triggerAiResponse = (promptText) => {
    const text = promptText.trim();
    if (!text || isTyping || streamingPrompt) return;

    const response = getAiResponse(text);

    // Show visitor bubble and "thinking" indicator
    setStreamingPrompt(text);
    setIsTyping(true);
    setStreamedText("");

    // Clean any prior timer
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);

    // Short thinking delay (authentic LLM latency feel)
    setTimeout(() => {
      setIsTyping(false);

      // Split into words with whitespace preserved
      const tokens = response.body.split(/(\s+)/);
      let idx = 0;
      let accumulated = "";

      streamTimerRef.current = setInterval(() => {
        if (idx < tokens.length) {
          accumulated += tokens[idx];
          setStreamedText(accumulated);
          idx++;
        } else {
          clearInterval(streamTimerRef.current);
          streamTimerRef.current = null;

          // Commit to history
          setChatEntries((prev) => [
            ...prev,
            {
              id: "entry-" + Date.now(),
              visitor: text,
              body: response.body,
              actions: response.actions,
            },
          ]);

          setStreamingPrompt(null);
          setStreamedText("");
        }
      }, 14); // ~14ms per word chunk for smooth typing stream
    }, 320);
  };

  const handleClear = () => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    setStreamingPrompt(null);
    setStreamedText("");
    setIsTyping(false);
    setChatEntries([
      {
        id: "entry-cleared-" + Date.now(),
        visitor: "System Context Reset",
        body: `Workspace context initialized for Portfolio.sln.

Copilot is ready to analyze Yohan Pasindu's technical background, architecture patterns, and projects. Ask any question below or click a quick suggestion.`,
        actions: [
          { label: "Who is Yohan?", prompt: "Who is Yohan?" },
          { label: "Tech Stack", prompt: "What is his tech stack?" },
        ],
      },
    ]);
  };

  const sections = [
    {
      title: "Identity",
      props: [
        ["Name", Bio.name],
        ["Role", "Full-Stack Developer"],
        ["Location", `Sri Lanka · ${time}`],
      ],
    },
    {
      title: "Stack",
      props: [
        ["Backend", "C# · ASP.NET Core"],
        ["Frontend", "Angular · TypeScript"],
        ["Data", "SQL Server · EF Core"],
      ],
    },
    {
      title: "Education",
      props: [
        ["Degree", "BSc (IT)"],
        ["University", "SLIIT"],
        ["Year", "4th year (2nd sem)"],
      ],
    },
    {
      title: "Misc",
      props: [
        ["Projects", count],
        ["CleanCode", <span className="bool">true</span>],
        ["Motto", <span className="str">"ship it, then polish"</span>],
      ],
    },
  ];

  const isBusy = isTyping || Boolean(streamingPrompt);

  if (!isOpen) {
    return (
      <Aside className="right" aria-label="Copilot Chat (collapsed)">
        <RightCollapsedRail onClick={onToggle} title="Click to expand Copilot Chat">
          <button
            type="button"
            className="top-btn"
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.();
            }}
            title="Expand Copilot Chat"
          >
            <FiChevronLeft />
          </button>

          <div className="vertical-title">
            <span>Copilot Chat</span>
          </div>

          <div style={{ height: 20 }} />
        </RightCollapsedRail>
      </Aside>
    );
  }

  return (
    <Aside className="right" aria-label="Copilot Chat and Properties">
      <PanelNav>
        <PanelTabs>
          <button
            type="button"
            className={panelTab === "copilot" ? "on" : ""}
            onClick={() => setPanelTab("copilot")}
            title="Visual Studio Copilot Chat"
          >
            <FiCpu style={{ verticalAlign: "-1px" }} /> Copilot Chat
          </button>
          <button
            type="button"
            className={panelTab === "props" ? "on" : ""}
            onClick={() => setPanelTab("props")}
            title="Object Properties Inspector"
          >
            <FiSliders style={{ verticalAlign: "-1px" }} /> Properties
          </button>
        </PanelTabs>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <WorkspaceTag title="Active workspace solution">
            Portfolio.sln
          </WorkspaceTag>
          <button
            type="button"
            onClick={onToggle}
            title="Collapse Copilot Chat"
            style={{
              background: "none",
              border: 0,
              cursor: "pointer",
              color: ui.sub,
              display: "grid",
              placeItems: "center",
              width: 24,
              height: 24,
              borderRadius: 4,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = ui.dotnet)}
            onMouseLeave={(e) => (e.currentTarget.style.color = ui.sub)}
          >
            <FiChevronRight style={{ fontSize: 14 }} />
          </button>
        </div>
      </PanelNav>

      {panelTab === "copilot" ? (
        <>
          <ContextBar>
            <span className="info">
              <FiTerminal style={{ color: ui.dotnet, verticalAlign: "-1px" }} />
              <span>DevContext: <b>DevController.cs</b> (active)</span>
            </span>
            <button type="button" className="clear-btn" onClick={handleClear} title="Reset chat session">
              <FiRotateCcw style={{ verticalAlign: "-1px" }} /> Clear
            </button>
          </ContextBar>

          <ChatFeed ref={chatFeedRef}>
            {chatEntries.map((entry) => (
              <React.Fragment key={entry.id}>
                <VisitorBubble>
                  <span className="meta">
                    <FiUser style={{ fontSize: 9 }} /> Visitor Query
                  </span>
                  <div className="bubble">
                    <span className="sym">❯</span>
                    <span>{entry.visitor}</span>
                  </div>
                </VisitorBubble>

                <AiResponseCard>
                  <div className="card-top">
                    <span className="agent-badge">
                      <FiCode style={{ verticalAlign: "-1px" }} /> SOLUTION ARCHITECT · .NET 8
                    </span>
                    <span className="card-meta">verified · 0.04s</span>
                  </div>
                  <div className="card-body">
                    {entry.body}
                  </div>
                  {entry.actions && (
                    <div className="actions-bar">
                      {entry.actions.map((act, i) =>
                        act.href ? (
                          <a
                            key={i}
                            href={act.href}
                            target={act.href.startsWith("#") ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                          >
                            {act.label.includes("Download") ? (
                              <FiDownload style={{ fontSize: 9 }} />
                            ) : (
                              <FiExternalLink style={{ fontSize: 9 }} />
                            )}
                            {act.label}
                          </a>
                        ) : (
                          <button
                            type="button"
                            key={i}
                            onClick={() => triggerAiResponse(act.prompt)}
                            disabled={isBusy}
                          >
                            <FiCornerDownLeft style={{ fontSize: 9 }} />
                            {act.label}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </AiResponseCard>
              </React.Fragment>
            ))}

            {/* Currently Streaming Response */}
            {streamingPrompt && (
              <>
                <VisitorBubble>
                  <span className="meta">
                    <FiUser style={{ fontSize: 9 }} /> Visitor Query
                  </span>
                  <div className="bubble">
                    <span className="sym">❯</span>
                    <span>{streamingPrompt}</span>
                  </div>
                </VisitorBubble>

                {isTyping ? (
                  <ThinkingBox>
                    <span className="dots">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span>Copilot is analyzing Portfolio.sln symbols...</span>
                  </ThinkingBox>
                ) : (
                  <AiResponseCard>
                    <div className="card-top">
                      <span className="agent-badge">
                        <FiCode style={{ verticalAlign: "-1px" }} /> SOLUTION ARCHITECT · .NET 8
                      </span>
                      <span className="card-meta">fetching symbols...</span>
                    </div>
                    <div className="card-body">
                      {streamedText}
                      <span className="cursor">▋</span>
                    </div>
                  </AiResponseCard>
                )}
              </>
            )}
          </ChatFeed>

          <SuggestionsWrap>
            <div className="sug-header">
              <span>Suggested Queries</span>
              <span>Click to ask</span>
            </div>
            <div className="sug-chips">
              {quickSuggestions.map((sug) => (
                <button
                  type="button"
                  key={sug}
                  onClick={() => triggerAiResponse(sug)}
                  disabled={isBusy}
                  title={`Ask: "${sug}"`}
                >
                  <span className="tag">?</span>
                  {sug}
                </button>
              ))}
            </div>
          </SuggestionsWrap>

          <PromptInputForm
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                triggerAiResponse(input);
                setInput("");
              }
            }}
          >
            <span className="prompt-sym">❯</span>
            <input
              type="text"
              placeholder="Ask Copilot about Yohan's skills, projects..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isBusy}
            />
            <button
              type="submit"
              disabled={!input.trim() || isBusy}
              title="Send query to Copilot"
            >
              <FiSend />
            </button>
          </PromptInputForm>
        </>
      ) : (
        <>
          <ObjectHeader>
            <strong>yohan</strong>
            <small>YohanPasindu.Models.Developer</small>
          </ObjectHeader>

          <Grid>
            {sections.map((s) => (
              <React.Fragment key={s.title}>
                <Cat>
                  <FiChevronDown /> {s.title}
                </Cat>
                {s.props.map(([k, v]) => (
                  <Prop key={k}>
                    <span>{k}</span>
                    <span>{v}</span>
                  </Prop>
                ))}
              </React.Fragment>
            ))}
          </Grid>

          <Desc>
            <b>Résumé</b>
            Full CV with projects, education and contact details.
          </Desc>
          <ExportBtn
            id="panel-export-resume"
            href={Bio.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiDownload /> Download résumé
          </ExportBtn>
        </>
      )}
    </Aside>
  );
};

/* ------------------------------------------------------------------ */
/*  Status bar                                                          */
/* ------------------------------------------------------------------ */
const Bar = styled.footer`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 26px;
  padding: 0 12px;
  background: ${ui.dotnet};
  color: rgba(255, 255, 255, 0.92);
  font-size: 11.5px;
  white-space: nowrap;
  overflow: hidden;

  div {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 859px) {
    .wide {
      display: none;
    }
  }
`;

export const StatusBar = ({ built }) => {
  const time = useLocalTime("Asia/Colombo");

  return (
    <Bar aria-label="Status bar">
      <div>
        <span>
          <FiGitBranch /> main
        </span>
        <span>{built ? "✓ Build succeeded" : "⟳ Building…"}</span>
        <span className="wide">⚠ 0 &nbsp; ✕ 0</span>
      </div>
      <div>
        <span className="wide">.NET · C#</span>
        <span className="wide">Angular · TS</span>
        <span className="wide">UTF-8</span>
        <span>{time} LK</span>
      </div>
    </Bar>
  );
};
