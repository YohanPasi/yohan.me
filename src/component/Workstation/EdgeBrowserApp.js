import React, { useState } from "react";
import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import {
  FiArrowLeft,
  FiArrowRight,
  FiRefreshCw,
  FiHome,
  FiLock,
  FiStar,
  FiShare2,
  FiCode,
  FiTerminal,
  FiFileText,
  FiExternalLink,
} from "react-icons/fi";
import { Win11EdgeIcon } from "./WindowsIcons";
import { Bio } from "../../data/constants";

const EdgeRoot = styled.div`
  width: 100%;
  height: 100%;
  background: #1f232b;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const TitleBar = styled.div`
  height: 38px;
  background: #181b22;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 10px;
  cursor: grab;

  .tabs-group {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 100%;

    .edge-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 14px;
      height: 30px;
      border-radius: 6px 6px 0 0;
      background: #232833;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 500;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-bottom: none;

      .fav {
        width: 14px;
        height: 14px;
      }
    }
  }

  .window-controls {
    display: flex;
    align-items: center;
    height: 100%;

    button {
      background: transparent;
      border: none;
      color: #9da5b4;
      width: 40px;
      height: 100%;
      display: grid;
      place-items: center;
      cursor: pointer;
      font-size: 13px;
      transition: background 0.15s ease, color 0.15s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
      }

      &.close:hover {
        background: #e81123;
        color: #ffffff;
      }
    }
  }
`;

const NavToolbar = styled.div`
  height: 42px;
  background: #232833;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 8px;

  .nav-btns {
    display: flex;
    align-items: center;
    gap: 2px;

    button {
      background: transparent;
      border: none;
      color: #cbd5e1;
      width: 28px;
      height: 28px;
      border-radius: 4px;
      display: grid;
      place-items: center;
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }
    }
  }

  .omnibox {
    flex: 1;
    height: 30px;
    background: #181b22;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 15px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    gap: 8px;
    font-size: 11.5px;
    color: #cbd5e1;

    svg.lock {
      color: #10b981;
      font-size: 12px;
    }

    input {
      background: transparent;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 11.5px;
      width: 100%;
    }
  }

  .tool-actions {
    display: flex;
    align-items: center;
    gap: 4px;

    button {
      background: transparent;
      border: none;
      color: #94a3b8;
      width: 28px;
      height: 28px;
      border-radius: 4px;
      display: grid;
      place-items: center;
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
      }
    }
  }
`;

const WebViewport = styled.div`
  flex: 1;
  background: #0f172a;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: text;

  .content-sheet {
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .hero-banner {
      background: radial-gradient(circle at 70% 30%, #312e81 0%, #1e1b4b 60%, #0f172a 100%);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      h1 {
        font-size: 24px;
        color: #ffffff;
        margin: 0;
      }

      p {
        font-size: 13px;
        color: #cbd5e1;
        margin: 0;
        line-height: 1.5;
      }

      .chips-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 6px;

        span {
          padding: 3px 9px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          font-size: 11px;
          color: #38bdf8;
          font-weight: 500;
        }
      }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;

      .project-card {
        background: #1e293b;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 6px;

        strong {
          font-size: 13px;
          color: #ffffff;
        }

        p {
          font-size: 11.5px;
          color: #94a3b8;
          margin: 0;
          line-height: 1.4;
        }

        button.action-link {
          margin-top: 8px;
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 4px;
          background: #0078d4;
          border: none;
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;

          &:hover {
            background: #1084d8;
          }
        }
      }
    }
  }
`;

const EdgeBrowserApp = ({
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
  onLaunchApp,
}) => {
  const [url, setUrl] = useState("https://yohan.me/portfolio");

  return (
    <EdgeRoot>
      <TitleBar
        className="window-titlebar"
        onDoubleClick={(e) => {
          e.stopPropagation();
          onToggleMaximize();
        }}
      >
        <div className="tabs-group">
          <div className="edge-tab">
            <Win11EdgeIcon size={14} className="fav" />
            <span>Yohan Pasi — Full-Stack Portfolio</span>
          </div>
        </div>

        <div className="window-controls">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            title="Minimize"
          >
            <VscChromeMinimize />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize();
            }}
            title={isMaximized ? "Restore Down" : "Maximize"}
          >
            <VscChromeMaximize />
          </button>
          <button
            type="button"
            className="close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title="Close"
          >
            <VscClose />
          </button>
        </div>
      </TitleBar>

      <NavToolbar>
        <div className="nav-btns">
          <button type="button" title="Back"><FiArrowLeft /></button>
          <button type="button" title="Forward"><FiArrowRight /></button>
          <button type="button" title="Refresh"><FiRefreshCw /></button>
          <button type="button" title="Home"><FiHome /></button>
        </div>

        <div className="omnibox">
          <FiLock className="lock" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <FiStar style={{ cursor: "pointer", color: "#fbbf24" }} />
        </div>

        <div className="tool-actions">
          <button type="button" title="Share"><FiShare2 /></button>
        </div>
      </NavToolbar>

      <WebViewport>
        <div className="content-sheet">
          <div className="hero-banner">
            <h1>{Bio.name}</h1>
            <p>
              Senior Software Engineer & Distributed Cloud Architect specializing in
              C# .NET 9, ASP.NET Core Web API, Angular 17, and Microservices.
            </p>
            <div className="chips-row">
              <span>Clean Architecture</span>
              <span>CQRS & MediatR</span>
              <span>Event-Driven</span>
              <span>Redis Cache</span>
              <span>PostgreSQL</span>
              <span>Kubernetes</span>
            </div>
          </div>

          <div className="projects-grid">
            <div className="project-card">
              <strong>Enterprise Clean Architecture Core</strong>
              <p>
                Strict domain inversion boundary with CQRS, MediatR, and automated
                integration testing.
              </p>
              <button
                type="button"
                className="action-link"
                onClick={() => onLaunchApp && onLaunchApp("vscode")}
              >
                <FiCode /> Inspect in VS Code
              </button>
            </div>

            <div className="project-card">
              <strong>Cryptographic Security Engine</strong>
              <p>
                Zero-day constant-time token verification protecting critical services.
              </p>
              <button
                type="button"
                className="action-link"
                onClick={() => onLaunchApp && onLaunchApp("terminal")}
              >
                <FiTerminal /> Run Diagnostics
              </button>
            </div>

            <div className="project-card">
              <strong>Yohan Pasi Official Resume</strong>
              <p>
                Full curriculum vitae with enterprise project experience, certifications, and skills.
              </p>
              <button
                type="button"
                className="action-link"
                onClick={() => onLaunchApp && onLaunchApp("resume")}
              >
                <FiFileText /> View PDF Document
              </button>
            </div>

            <div className="project-card">
              <strong>GitHub Source Repositories</strong>
              <p>
                Explore open-source backend microservices, clean architecture starters, and repositories.
              </p>
              <a
                className="action-link"
                href={Bio.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <FiExternalLink /> View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </WebViewport>
    </EdgeRoot>
  );
};

export default EdgeBrowserApp;
