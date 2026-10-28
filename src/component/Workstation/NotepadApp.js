import React, { useState } from "react";
import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import { FiSave } from "react-icons/fi";
import { Win11NotepadIcon } from "./WindowsIcons";

const NotepadRoot = styled.div`
  width: 100%;
  height: 100%;
  background: #20242e;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const TitleBar = styled.div`
  height: 34px;
  background: #191c24;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 12px;
  cursor: grab;

  .title-left {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #e2e8f0;

    .notepad-icon {
      font-size: 14px;
      color: #0284c7;
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

const MenuBar = styled.div`
  height: 28px;
  background: #20242e;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 12px;
  font-size: 11.5px;
  color: #cbd5e1;

  span {
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    transition: background 0.1s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }
  }
`;

const EditorArea = styled.textarea`
  flex: 1;
  background: #181b22;
  border: none;
  outline: none;
  padding: 12px 16px;
  color: #f1f5f9;
  font-family: "Consolas", "Courier New", monospace;
  font-size: 13px;
  line-height: 1.6;
  resize: none;
  white-space: pre-wrap;
  user-select: text;

  &::selection {
    background: #0078d4;
    color: #ffffff;
  }
`;

const StatusBar = styled.div`
  height: 24px;
  background: #191c24;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 12px;
  gap: 20px;
  font-size: 11px;
  color: #94a3b8;
`;

const DEFAULT_CONTENT = `YOHAN PASI - ENTERPRISE WORKSTATION INCIDENT LOG
================================================
Timestamp: 28/10/2026 - Colombo Sri Lanka
Host: Windows 11 Enterprise (x64) • .NET 9.0 SDK
Incident ID: INC-SEC-2026-001

SUMMARY:
Vulnerability detected in CleanArchitecture.Security:
TokenSecurityService.Validate() contained an inverted conditional statement
allowing tampered and expired authentication tokens to pass authorization checks.

RECOMMENDED HOTFIX:
1. Replace relational inequality with CryptographicOperations.FixedTimeEquals()
2. Validate expiration timestamp: token.ExpiresAt >= DateTime.UtcNow
3. Execute [dotnet test] in PowerShell or VS Code terminal to verify test suite pass

Notes:
- You can write and save custom scratch notes in this editor!`;

const NotepadApp = ({ onClose, onMinimize, isMaximized, onToggleMaximize }) => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [savedStatus, setSavedStatus] = useState("Saved");

  const handleSave = () => {
    setSavedStatus("Saved to C:\\Users\\Yohan\\Desktop\\incident-notes.txt");
    setTimeout(() => setSavedStatus("Saved"), 3000);
  };

  return (
    <NotepadRoot>
      <TitleBar
        className="window-titlebar"
        onDoubleClick={(e) => {
          e.stopPropagation();
          onToggleMaximize();
        }}
      >
        <div className="title-left">
          <Win11NotepadIcon size={16} />
          <span>Incident_Log.txt — Notepad</span>
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

      <MenuBar>
        <span onClick={handleSave} title="Save file">
          <FiSave style={{ marginRight: "4px" }} /> File (Save)
        </span>
        <span onClick={() => setContent("")}>Clear</span>
        <span onClick={() => setContent(DEFAULT_CONTENT)}>Reset</span>
        <span>View</span>
      </MenuBar>

      <EditorArea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setSavedStatus("Unsaved changes");
        }}
        spellCheck="false"
      />

      <StatusBar>
        <span>{savedStatus}</span>
        <span>Ln {content.split("\n").length}, Col 1</span>
        <span>100%</span>
        <span>Windows (CRLF)</span>
        <span>UTF-8</span>
      </StatusBar>
    </NotepadRoot>
  );
};

export default NotepadApp;
