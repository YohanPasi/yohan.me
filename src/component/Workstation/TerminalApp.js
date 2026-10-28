import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { VscChromeMinimize, VscChromeMaximize, VscClose } from "react-icons/vsc";
import { fonts } from "../../utils/palette";
import { Bio } from "../../data/constants";

const TerminalFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #0c0c0c;
  color: #cccccc;
  font-family: ${fonts.mono};
  overflow: hidden;
  border-radius: ${(props) => (props.$isMaximized ? "0" : "8px")};
  box-shadow: ${(props) =>
    props.$isMaximized ? "none" : "0 20px 60px rgba(0, 0, 0, 0.75)"};
  border: ${(props) =>
    props.$isMaximized ? "none" : "1px solid rgba(255, 255, 255, 0.12)"};
`;

const TitleBar = styled.div`
  height: 32px;
  background: #1f1f1f;
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
    font-size: 11px;
    color: #cccccc;

    .icon {
      color: #0078d4;
      font-weight: 700;
      font-size: 12px;
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

const TerminalBody = styled.div`
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
  font-size: 12px;
  line-height: 1.5;
  color: #f1f5f9;

  .output-block {
    margin-bottom: 8px;
    white-space: pre-wrap;
    word-break: break-word;

    &.info {
      color: #38bdf8;
    }
    &.success {
      color: #4ade80;
    }
    &.accent {
      color: #c084fc;
    }
    &.muted {
      color: #64748b;
    }
  }

  .input-line {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #cbd5e1;

    span.prompt {
      color: #38bdf8;
      font-weight: 600;
      user-select: none;
    }

    input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-family: inherit;
      font-size: inherit;
      color: #ffffff;
      caret-color: #38bdf8;
    }
  }
`;

const TerminalApp = ({
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
}) => {
  const [history, setHistory] = useState([
    {
      type: "muted",
      text: "Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\n\nType 'help' to view available system commands.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = inputVal.trim();
      const currentPrompt = `PS D:\\Portfolio\\yohan.me> ${cmd}`;
      const newHistory = [...history, { type: "prompt", text: currentPrompt }];

      if (!cmd) {
        setHistory(newHistory);
        setInputVal("");
        return;
      }

      const lower = cmd.toLowerCase();

      switch (lower) {
        case "help":
        case "?":
          newHistory.push({
            type: "info",
            text: `Available Commands:
  skills      - Enumerate .NET, C#, Angular & Database core competencies
  whoami      - Display verified developer credentials & specialization
  projects    - List enterprise & featured production projects
  contact     - Display direct hiring & communication channels
  dotnet      - Run .NET CLI diagnostics (.NET 8.0.204)
  clear / cls - Clear terminal output
  exit        - Close terminal window`,
          });
          break;

        case "whoami":
          newHistory.push({
            type: "success",
            text: `YOHAN-WORKSTATION\\YohanPasindu
Role: Senior .NET & Angular Software Engineer
Location: Colombo, Sri Lanka (UTC+05:30)
Education: BSc (Hons) in Information Technology — SLIIT
Specialization: C#, ASP.NET Core Clean Architecture, Angular Signals, SQL Server`,
          });
          break;

        case "skills":
          newHistory.push({
            type: "accent",
            text: `Core Technology Matrix:
[Backend]    C# 12, .NET 8, ASP.NET Core Web API, Entity Framework Core, LINQ, MediatR, CQRS
[Frontend]   Angular 17, TypeScript, RxJS, NgRx / Signals, React, SCSS, Tailwind CSS
[Database]   Microsoft SQL Server, PostgreSQL, MongoDB, Redis Caching
[Cloud/Dev]  Azure, Docker, Git, CI/CD GitHub Actions, RESTful APIs, JWT Auth`,
          });
          break;

        case "projects":
          newHistory.push({
            type: "info",
            text: `Featured Production Projects:
1. Enterprise Clean Architecture Web API (.NET 8 + Angular 17)
2. Real-Time Order Processing System (CQRS, MediatR, Redis, SQL Server)
3. Microservices Event Bus with MassTransit & RabbitMQ
4. Modern Portfolio Workstation Experience (Active)`,
          });
          break;

        case "contact":
          newHistory.push({
            type: "success",
            text: `Direct Communication Channels:
GitHub:   ${Bio.github}
LinkedIn: ${Bio.linkedin}
Resume:   ${Bio.resume}`,
          });
          break;

        case "dotnet":
        case "dotnet --version":
          newHistory.push({
            type: "muted",
            text: `.NET SDK 8.0.204 (x64)
Installed Runtimes:
  Microsoft.AspNetCore.App 8.0.4
  Microsoft.NETCore.App 8.0.4
  Microsoft.WindowsDesktop.App 8.0.4`,
          });
          break;

        case "clear":
        case "cls":
          setHistory([]);
          setInputVal("");
          return;

        case "exit":
          onClose();
          return;

        default:
          newHistory.push({
            type: "muted",
            text: `'${cmd}' is not recognized as a cmdlet, function, or operable program. Type 'help' for available commands.`,
          });
          break;
      }

      setHistory(newHistory);
      setInputVal("");
    }
  };

  return (
    <TerminalFrame
      $isMaximized={isMaximized}
      onClick={() => inputRef.current?.focus()}
    >
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
          <span className="icon">&gt;_</span>
          <span>Administrator: Windows PowerShell (pwsh.exe)</span>
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

      <TerminalBody ref={bodyRef}>
        {history.map((item, idx) => (
          <div key={idx} className={`output-block ${item.type}`}>
            {item.text}
          </div>
        ))}
        <div className="input-line">
          <span className="prompt">PS D:\Portfolio\yohan.me&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            spellCheck={false}
          />
        </div>
      </TerminalBody>
    </TerminalFrame>
  );
};

export default TerminalApp;
