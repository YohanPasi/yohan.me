import React from "react";
import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import { FiDownload, FiExternalLink, FiFileText } from "react-icons/fi";
import { Bio } from "../../data/constants";

const ViewerFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #2a2d32;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
  border-radius: ${(props) => (props.$isMaximized ? "0" : "8px")};
  box-shadow: ${(props) =>
    props.$isMaximized ? "none" : "0 20px 60px rgba(0, 0, 0, 0.75)"};
  border: ${(props) =>
    props.$isMaximized ? "none" : "1px solid rgba(255, 255, 255, 0.12)"};
`;

const TitleBar = styled.div`
  height: 34px;
  background: #1e2024;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  user-select: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11.5px;
    color: #e2e8f0;

    .icon {
      color: #ef4444;
      font-size: 14px;
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
      width: 38px;
      height: 100%;
      display: grid;
      place-items: center;
      cursor: pointer;
      font-size: 13px;

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

const DocToolbar = styled.div`
  height: 42px;
  background: #333842;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);

  .page-nav {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: #cbd5e1;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;

    a.btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 28px;
      padding: 0 12px;
      border-radius: 4px;
      background: #0078d4;
      color: #ffffff;
      text-decoration: none;
      font-size: 11.5px;
      font-weight: 500;
      transition: background 0.15s ease;

      &:hover {
        background: #1084d8;
      }

      &.secondary {
        background: rgba(255, 255, 255, 0.1);
        &:hover {
          background: rgba(255, 255, 255, 0.18);
        }
      }
    }
  }
`;

const DocViewport = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  justify-content: center;
  background: #1e2124;
`;

const PaperSheet = styled.div`
  width: 100%;
  max-width: 680px;
  background: #ffffff;
  color: #1a1a1a;
  padding: 44px 48px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.5;

  .header {
    border-bottom: 2px solid #512bd4;
    padding-bottom: 14px;
    margin-bottom: 20px;

    h1 {
      font-size: 26px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin: 0;
    }

    .subtitle {
      font-size: 14px;
      font-weight: 600;
      color: #512bd4;
      margin-top: 4px;
    }

    .contacts {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      font-size: 11.5px;
      color: #64748b;
      margin-top: 8px;
    }
  }

  .section {
    margin-bottom: 20px;

    h2 {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #1e293b;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 10px;
    }

    p {
      font-size: 12px;
      color: #334155;
      margin: 0 0 8px;
    }

    .grid-skills {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      font-size: 11.5px;

      .skill-category {
        strong {
          color: #0f172a;
        }
        span {
          color: #475569;
        }
      }
    }

    .item {
      margin-bottom: 12px;

      .item-header {
        display: flex;
        justify-content: space-between;
        font-size: 12.5px;
        font-weight: 600;
        color: #0f172a;

        span.date {
          font-weight: 400;
          color: #64748b;
          font-size: 11.5px;
        }
      }

      .item-sub {
        font-size: 11.5px;
        color: #512bd4;
        font-weight: 500;
        margin-bottom: 4px;
      }

      ul {
        margin: 4px 0 0;
        padding-left: 18px;
        font-size: 11.5px;
        color: #475569;

        li {
          margin-bottom: 3px;
        }
      }
    }
  }
`;

const ResumeApp = ({
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
}) => {
  return (
    <ViewerFrame $isMaximized={isMaximized}>
      <TitleBar
        className="window-titlebar"
        data-titlebar="true"
        style={{ cursor: isMaximized ? "default" : "grab" }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onToggleMaximize();
        }}
      >
        <div className="title">
          <FiFileText className="icon" />
          <span>Resume_Yohan_Pasindu.pdf — Microsoft Edge Document Viewer</span>
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

      <DocToolbar>
        <div className="page-nav">
          <span>Page 1 of 1</span>
          <span>•</span>
          <span>100% Zoom</span>
        </div>

        <div className="actions">
          <a
            className="btn"
            href={Bio.resume}
            target="_blank"
            rel="noopener noreferrer"
            title="Download full PDF"
          >
            <FiDownload /> Download PDF
          </a>
          <a
            className="btn secondary"
            href={Bio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="View LinkedIn"
          >
            <FiExternalLink /> LinkedIn
          </a>
        </div>
      </DocToolbar>

      <DocViewport>
        <PaperSheet>
          <div className="header">
            <h1>YOHAN PASINDU</h1>
            <div className="subtitle">
              Senior .NET &amp; Angular Full-Stack Software Engineer
            </div>
            <div className="contacts">
              <span>Colombo, Sri Lanka (UTC+05:30)</span>
              <span>•</span>
              <span>SLIIT Undergraduate</span>
              <span>•</span>
              <span>C# / .NET 8 / Angular 17 / SQL Server</span>
            </div>
          </div>

          <div className="section">
            <h2>Professional Profile</h2>
            <p>
              Dedicated full-stack software engineer with deep specialization in
              architecting enterprise RESTful Web APIs using C# and .NET 8 Clean
              Architecture, accompanied by dynamic, responsive frontends built
              with Angular 17 (Signals &amp; OnPush change detection). Proven track
              record in designing scalable database schemas using Entity
              Framework Core and Microsoft SQL Server.
            </p>
          </div>

          <div className="section">
            <h2>Core Competencies</h2>
            <div className="grid-skills">
              <div className="skill-category">
                <strong>Backend: </strong>
                <span>
                  C#, .NET 8, ASP.NET Core Web API, EF Core, MediatR, CQRS, LINQ
                </span>
              </div>
              <div className="skill-category">
                <strong>Frontend: </strong>
                <span>
                  Angular 17, TypeScript, Signals, RxJS, React, HTML5/SCSS
                </span>
              </div>
              <div className="skill-category">
                <strong>Database: </strong>
                <span>
                  Microsoft SQL Server, PostgreSQL, Redis Caching, Code-First
                  Migrations
                </span>
              </div>
              <div className="skill-category">
                <strong>Architecture: </strong>
                <span>
                  Domain-Driven Design (DDD), Clean Architecture, Repository
                  Pattern, JWT Auth
                </span>
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Education</h2>
            <div className="item">
              <div className="item-header">
                <span>Sri Lanka Institute of Information Technology (SLIIT)</span>
                <span className="date">2022 – Present</span>
              </div>
              <div className="item-sub">
                BSc (Hons) in Information Technology — Specializing in Software
                Engineering
              </div>
              <ul>
                <li>
                  Advanced study in Data Structures, Algorithms, Software
                  Architecture, and Distributed Systems.
                </li>
                <li>
                  Active contributor to enterprise coursework in .NET enterprise
                  solutions and web development.
                </li>
              </ul>
            </div>
          </div>

          <div className="section">
            <h2>Selected Key Projects</h2>
            <div className="item">
              <div className="item-header">
                <span>Enterprise Clean Architecture API Suite</span>
                <span className="date">C# / .NET 8 / MediatR</span>
              </div>
              <ul>
                <li>
                  Separated concerns across Domain, Application, Infrastructure,
                  and Presentation layers with 100% decoupled contracts.
                </li>
                <li>
                  Implemented robust validation with FluentValidation, pipeline
                  behaviors, and global exception handling.
                </li>
              </ul>
            </div>

            <div className="item">
              <div className="item-header">
                <span>Real-Time Cloud Workstation &amp; Angular Signals Engine</span>
                <span className="date">Angular 17 / TypeScript</span>
              </div>
              <ul>
                <li>
                  Engineered modular standalone components utilizing modern
                  Angular Signals for zero-overhead reactive state management.
                </li>
              </ul>
            </div>
          </div>
        </PaperSheet>
      </DocViewport>
    </ViewerFrame>
  );
};

export default ResumeApp;
