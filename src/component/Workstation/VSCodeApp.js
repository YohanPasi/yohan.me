import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscSettingsGear,
  VscTerminal,
  VscChevronDown,
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import { SiCsharp, SiJson } from "react-icons/si";
import {
  FiPlay,
  FiCheckCircle,
  FiAlertTriangle,
  FiTool,
  FiAward,
  FiMail,
  FiCheck,
  FiGitBranch,
  FiSearch,
} from "react-icons/fi";
import { Bio } from "../../data/constants";

const VSCodeFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #181a1f;
  color: #cccccc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
  border-radius: ${(props) => (props.$isMaximized ? "0" : "8px")};
  box-shadow: ${(props) =>
    props.$isMaximized ? "none" : "0 20px 60px rgba(0, 0, 0, 0.75)"};
  border: ${(props) =>
    props.$isMaximized ? "none" : "1px solid rgba(255, 255, 255, 0.12)"};
  position: relative;
`;

const TitleBar = styled.div`
  height: 34px;
  background: #1f232a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 10px;
  user-select: none;
  border-bottom: 1px solid #14171d;
  cursor: grab;

  .left {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 100%;

    .app-icon {
      font-size: 16px;
      color: #0078d4;
      display: grid;
      place-items: center;
    }

    .menu-bar {
      display: flex;
      align-items: center;
      gap: 2px;
      height: 100%;

      .menu-btn-wrap {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;

        button.menu-trigger {
          background: transparent;
          border: none;
          color: #cbd5e1;
          font-size: 12px;
          padding: 0 7px;
          height: 100%;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;

          &:hover,
          &.active {
            background: rgba(255, 255, 255, 0.08);
            color: #ffffff;
          }
        }
      }

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .title {
    font-size: 11px;
    color: #94a3b8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 12px;
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

const DropdownMenu = styled.div`
  position: absolute;
  top: 34px;
  left: 0;
  width: 190px;
  background: #252a34;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  padding: 4px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 2px;

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    border-radius: 4px;
    background: transparent;
    border: none;
    color: #cbd5e1;
    font-size: 11.5px;
    cursor: pointer;
    text-align: left;
    transition: all 0.12s ease;

    &:hover {
      background: #0078d4;
      color: #ffffff;
    }

    span.hotkey {
      color: #94a3b8;
      font-size: 10px;
    }

    &:hover span.hotkey {
      color: #ffffff;
    }
  }

  .divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
    margin: 3px 0;
  }
`;

const IncidentBanner = styled.div`
  background: ${(props) => (props.$resolved ? "#0f5132" : "#5c1d24")};
  border-bottom: 1px solid
    ${(props) => (props.$resolved ? "#198754" : "#842029")};
  padding: 7px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #ffffff;
  transition: all 0.3s ease;

  .left-msg {
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      font-size: 15px;
      color: ${(props) => (props.$resolved ? "#20c997" : "#ffc107")};
    }

    span {
      font-weight: 500;
    }
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 24px;
    padding: 0 10px;
    border-radius: 4px;
    background: ${(props) => (props.$resolved ? "#198754" : "#dc3545")};
    border: none;
    color: #ffffff;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: ${(props) => (props.$resolved ? "#157347" : "#bb2d3b")};
    }
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const ActivityBar = styled.div`
  width: 48px;
  background: #1e2227;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-right: 1px solid #14171d;

  .top,
  .bottom {
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: center;
  }

  .action-btn {
    position: relative;
    color: #636d83;
    font-size: 20px;
    cursor: pointer;
    transition: color 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 4px;

    &:hover {
      color: #cbd5e1;
    }

    &.active {
      color: #ffffff;

      &::before {
        content: "";
        position: absolute;
        left: -6px;
        width: 2px;
        height: 22px;
        background: #0078d4;
      }
    }

    .badge {
      position: absolute;
      top: 1px;
      right: 1px;
      background: #e81123;
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      display: grid;
      place-items: center;
    }
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background: #181a1f;
  border-right: 1px solid #14171d;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .sidebar-header {
    height: 34px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    font-weight: 700;
    color: #cbd5e1;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .panel-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
  }

  /* File Tree */
  .tree {
    .folder-title {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      font-size: 11.5px;
      font-weight: 600;
      color: #cbd5e1;
      cursor: pointer;
    }

    .file-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      font-size: 12px;
      color: #9da5b4;
      cursor: pointer;
      position: relative;
      transition: background 0.12s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: #e2e8f0;
      }

      &.active {
        background: rgba(0, 120, 212, 0.2);
        color: #ffffff;
        font-weight: 500;
      }

      .icon-cs {
        color: #7048e8;
        font-size: 13px;
      }

      .icon-json {
        color: #f59e0b;
        font-size: 13px;
      }

      .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #f87171;
        margin-left: auto;

        &.ok {
          background: #34d399;
        }
      }
    }
  }

  /* Search Panel */
  .search-container {
    padding: 8px 12px;

    .search-input-box {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 8px;
      height: 28px;
      background: #20242e;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 4px;
      font-size: 11.5px;
      color: #94a3b8;

      input {
        background: transparent;
        border: none;
        outline: none;
        color: #ffffff;
        width: 100%;
        font-size: 11.5px;
      }
    }

    .search-results {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;

      .res-file {
        font-size: 11px;
        font-weight: 600;
        color: #38bdf8;
      }

      .res-line {
        padding: 4px 6px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.04);
        cursor: pointer;
        font-size: 11px;
        color: #cbd5e1;

        &:hover {
          background: rgba(0, 120, 212, 0.2);
          color: #ffffff;
        }

        small {
          color: #94a3b8;
          margin-right: 4px;
        }
      }
    }
  }

  /* Source Control */
  .git-container {
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .git-branch {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      color: #38bdf8;
    }

    .commit-input {
      width: 100%;
      height: 50px;
      background: #20242e;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 4px;
      padding: 6px;
      color: #ffffff;
      font-size: 11.5px;
      font-family: inherit;
      resize: none;
      outline: none;
    }

    button.commit-btn {
      height: 28px;
      background: #0078d4;
      border: none;
      border-radius: 4px;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;

      &:hover {
        background: #1084d8;
      }
    }

    .changes-header {
      font-size: 11px;
      font-weight: 700;
      color: #cbd5e1;
      text-transform: uppercase;
      margin-top: 4px;
    }

    .change-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11.5px;
      padding: 4px 0;
      color: ${(props) => (props.$resolved ? "#34d399" : "#fbbf24")};
    }
  }

  /* Run and Debug */
  .debug-container {
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .debug-play-btn {
      height: 32px;
      background: #0078d4;
      border: none;
      border-radius: 4px;
      color: #ffffff;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;

      &:hover {
        background: #1084d8;
      }
    }

    .debug-section {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 8px;

      .sec-title {
        font-size: 11px;
        font-weight: 700;
        color: #94a3b8;
        text-transform: uppercase;
        margin-bottom: 6px;
      }

      .var-row {
        font-size: 11px;
        color: #cbd5e1;
        padding: 2px 0;

        strong {
          color: #38bdf8;
        }
      }
    }
  }

  /* Extensions */
  .ext-container {
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .ext-card {
      padding: 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);

      strong {
        font-size: 12px;
        color: #ffffff;
        display: block;
      }

      small {
        font-size: 10.5px;
        color: #94a3b8;
        display: block;
        margin-top: 2px;
      }

      .badge-ok {
        display: inline-block;
        font-size: 9.5px;
        color: #34d399;
        font-weight: 600;
        margin-top: 4px;
      }
    }
  }

  /* Settings */
  .settings-container {
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .setting-row {
      display: flex;
      flex-direction: column;
      gap: 4px;

      label {
        font-size: 11.5px;
        font-weight: 600;
        color: #cbd5e1;
      }

      select,
      input {
        background: #20242e;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 4px;
        color: #ffffff;
        padding: 4px 8px;
        font-size: 11.5px;
        outline: none;
      }
    }
  }
`;

const EditorArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  min-width: 0;
  overflow: hidden;
`;

const TabsBar = styled.div`
  height: 35px;
  background: #181a1f;
  display: flex;
  align-items: center;
  overflow-x: auto;
  border-bottom: 1px solid #14171d;

  .tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 14px;
    height: 100%;
    font-size: 12px;
    color: #9da5b4;
    cursor: pointer;
    background: #181a1f;
    border-right: 1px solid #14171d;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
      background: #1e2227;
      color: #e2e8f0;
    }

    &.active {
      background: #1e1e1e;
      color: #ffffff;
      border-top: 2px solid #0078d4;
    }

    .icon-cs {
      color: #7048e8;
    }
    .icon-json {
      color: #f59e0b;
    }
  }
`;

const CodeEditor = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
  font-family: "Consolas", "Courier New", monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
  background: #1e1e1e;

  .line {
    display: flex;
    padding: 0 16px;
    transition: background 0.1s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.03);
    }

    &.buggy-line {
      background: rgba(248, 113, 113, 0.15);
      border-left: 3px solid #ef4444;
    }

    &.fixed-line {
      background: rgba(52, 211, 153, 0.15);
      border-left: 3px solid #10b981;
    }

    .line-no {
      width: 32px;
      color: #6e7681;
      text-align: right;
      padding-right: 16px;
      user-select: none;
      font-size: 12px;
    }

    .code-text {
      flex: 1;
      white-space: pre;

      .keyword { color: #569cd6; }
      .type { color: #4ec9b0; }
      .string { color: #ce9178; }
      .comment { color: #6a9955; font-style: italic; }
      .vuln { color: #f87171; font-weight: 600; text-decoration: underline wavy #ef4444; }
      .patched { color: #4ade80; font-weight: 600; }
    }
  }
`;

const TerminalPanel = styled.div`
  height: 180px;
  background: #14161a;
  border-top: 1px solid #1f232a;
  display: flex;
  flex-direction: column;

  .terminal-tabs {
    height: 30px;
    background: #181a1f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    border-bottom: 1px solid #14171d;

    .tabs-left {
      display: flex;
      align-items: center;
      gap: 12px;

      .tab-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 600;
        color: #ffffff;
      }
    }

    .quick-actions {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 3px 8px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #cbd5e1;
        font-size: 11px;
        cursor: pointer;

        &:hover {
          background: #0078d4;
          color: #ffffff;
        }

        &.fix-btn {
          background: #dc3545;
          color: #ffffff;
          &:hover {
            background: #bb2d3b;
          }
        }
      }
    }
  }

  .terminal-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px 12px;
    font-family: "Consolas", monospace;
    font-size: 12px;
    line-height: 1.45;

    .log-line {
      color: #94a3b8;

      &.fail {
        color: #f87171;
        font-weight: 600;
      }
      &.pass {
        color: #4ade80;
        font-weight: 600;
      }
      &.prompt {
        color: #38bdf8;
      }
    }
  }
`;

const ClearanceModal = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 5000;
  display: grid;
  place-items: center;
  padding: 16px;

  .modal-card {
    width: 480px;
    max-width: 100%;
    background: #181b22;
    border: 1px solid #10b981;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(16, 185, 129, 0.25);
    padding: 24px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;

    .badge-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.15);
      border: 2px solid #10b981;
      display: grid;
      place-items: center;
      font-size: 28px;
      color: #10b981;
    }

    h3 {
      font-size: 18px;
      color: #ffffff;
      margin: 0;
    }

    p {
      font-size: 12.5px;
      color: #cbd5e1;
      margin: 0;
      line-height: 1.5;
    }

    .modal-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      margin-top: 6px;

      button {
        flex: 1;
        height: 36px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.15s ease;

        &.primary {
          background: #10b981;
          border: none;
          color: #ffffff;
          &:hover {
            background: #059669;
          }
        }

        &.secondary {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          &:hover {
            background: rgba(255, 255, 255, 0.15);
          }
        }
      }
    }
  }
`;

const VSCodeApp = ({
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
}) => {
  const [activeSidebar, setActiveSidebar] = useState("explorer");
  const [activeTab, setActiveTab] = useState("TokenSecurityService.cs");
  const [isPatched, setIsPatched] = useState(false);
  const [showClearance, setShowClearance] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [terminalLogs, setTerminalLogs] = useState([
    "PS C:\\Users\\Yohan\\Projects\\CleanArchitecture.Security> dotnet test",
    "Starting test execution, please wait...",
    "A total of 1 test files matched the specified pattern.",
    "[FAIL] CleanArchitecture.Security.Tests.SecurityValidationTests.Validate_ForgedSignature_MustReject [14ms]",
    "  Error Message: Assert.Equal() Failure: Expected 'Unauthorized', Actual 'Success'",
    "  Stack Trace: at TokenSecurityService.Validate(SecurityToken token) in Line 24",
    "Failed! - Failed: 1, Passed: 0, Total: 1 (Elapsed 0.42s)",
  ]);

  const menuRef = useRef(null);

  // Close top menu on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("pointerdown", handleOutside);
    return () => window.removeEventListener("pointerdown", handleOutside);
  }, []);

  const handleApplyPatch = () => {
    setIsPatched(true);
    setTerminalLogs((prev) => [
      ...prev,
      "",
      "// Hotfix applied: CryptographicOperations.FixedTimeEquals() constant-time comparison enabled.",
      "PS C:\\Users\\Yohan\\Projects\\CleanArchitecture.Security> _",
    ]);
  };

  const handleRunTests = () => {
    if (!isPatched) {
      setTerminalLogs((prev) => [
        ...prev,
        "",
        "PS C:\\Users\\Yohan\\Projects\\CleanArchitecture.Security> dotnet test",
        "Build started...",
        "[FAIL] Validate_ForgedSignature_MustReject [11ms]",
        "  Error: Forged signature bypassed verification (Vulnerability on Line 24).",
        "Failed! - Failed: 1, Passed: 0, Total: 1",
      ]);
    } else {
      setTerminalLogs((prev) => [
        ...prev,
        "",
        "PS C:\\Users\\Yohan\\Projects\\CleanArchitecture.Security> dotnet test",
        "Build started, please wait...",
        "Build completed in 0.18s.",
        "✔ CleanArchitecture.Security.Tests.SecurityValidationTests.Validate_ForgedSignature_MustReject [3ms] [Passed]",
        "✔ CleanArchitecture.Security.Tests.SecurityValidationTests.Validate_ExpiredToken_MustReject [2ms] [Passed]",
        "✔ CleanArchitecture.Security.Tests.SecurityValidationTests.Validate_ValidToken_ReturnsSuccess [2ms] [Passed]",
        "Passed! - Failed: 0, Passed: 3, Total: 3 (Elapsed 0.32s)",
        "Build Status: 100% CLEARANCE UNLOCKED.",
      ]);
      setShowClearance(true);
    }
  };

  return (
    <VSCodeFrame $isMaximized={isMaximized}>
      <TitleBar
        className="window-titlebar"
        onDoubleClick={(e) => {
          e.stopPropagation();
          onToggleMaximize();
        }}
      >
        <div className="left" ref={menuRef}>
          <span className="app-icon" title="Visual Studio Code">
            <VscSourceControl />
          </span>

          <div className="menu-bar">
            {["File", "Edit", "Selection", "View", "Run", "Terminal"].map((m) => (
              <div key={m} className="menu-btn-wrap">
                <button
                  type="button"
                  className={`menu-trigger ${openMenu === m ? "active" : ""}`}
                  onClick={() => setOpenMenu(openMenu === m ? null : m)}
                >
                  {m}
                </button>

                {openMenu === m && (
                  <DropdownMenu onClick={(e) => e.stopPropagation()}>
                    {m === "File" && (
                      <>
                        <button type="button" onClick={() => { setActiveTab("TokenSecurityService.cs"); setOpenMenu(null); }}>
                          <span>TokenSecurityService.cs</span>
                          <span className="hotkey">Ctrl+1</span>
                        </button>
                        <button type="button" onClick={() => { setActiveTab("TokenSecurityServiceTests.cs"); setOpenMenu(null); }}>
                          <span>TokenSecurityServiceTests.cs</span>
                          <span className="hotkey">Ctrl+2</span>
                        </button>
                        <button type="button" onClick={() => { setActiveTab("appsettings.json"); setOpenMenu(null); }}>
                          <span>appsettings.json</span>
                          <span className="hotkey">Ctrl+3</span>
                        </button>
                        <button type="button" onClick={() => { setActiveTab("ArchitectProfile.cs"); setOpenMenu(null); }}>
                          <span>ArchitectProfile.cs</span>
                          <span className="hotkey">Ctrl+4</span>
                        </button>
                        <div className="divider" />
                        <button type="button" onClick={() => { handleApplyPatch(); setOpenMenu(null); }}>
                          <span>Save & Hotfix</span>
                          <span className="hotkey">Ctrl+S</span>
                        </button>
                        <button type="button" onClick={() => { onClose(); setOpenMenu(null); }}>
                          <span>Close Editor</span>
                          <span className="hotkey">Alt+F4</span>
                        </button>
                      </>
                    )}

                    {m === "Edit" && (
                      <>
                        <button type="button" onClick={() => setOpenMenu(null)}>
                          <span>Undo</span>
                          <span className="hotkey">Ctrl+Z</span>
                        </button>
                        <button type="button" onClick={() => setOpenMenu(null)}>
                          <span>Redo</span>
                          <span className="hotkey">Ctrl+Y</span>
                        </button>
                        <div className="divider" />
                        <button type="button" onClick={() => setOpenMenu(null)}>
                          <span>Cut</span>
                          <span className="hotkey">Ctrl+X</span>
                        </button>
                        <button type="button" onClick={() => setOpenMenu(null)}>
                          <span>Copy</span>
                          <span className="hotkey">Ctrl+C</span>
                        </button>
                        <button type="button" onClick={() => setOpenMenu(null)}>
                          <span>Paste</span>
                          <span className="hotkey">Ctrl+V</span>
                        </button>
                      </>
                    )}

                    {m === "Selection" && (
                      <>
                        <button type="button" onClick={() => setOpenMenu(null)}>
                          <span>Select All</span>
                          <span className="hotkey">Ctrl+A</span>
                        </button>
                        <button type="button" onClick={() => setOpenMenu(null)}>
                          <span>Expand Selection</span>
                          <span className="hotkey">Alt+Shift+Right</span>
                        </button>
                      </>
                    )}

                    {m === "View" && (
                      <>
                        <button type="button" onClick={() => { setActiveSidebar("explorer"); setOpenMenu(null); }}>
                          <span>Explorer</span>
                          <span className="hotkey">Ctrl+Shift+E</span>
                        </button>
                        <button type="button" onClick={() => { setActiveSidebar("search"); setOpenMenu(null); }}>
                          <span>Search</span>
                          <span className="hotkey">Ctrl+Shift+F</span>
                        </button>
                        <button type="button" onClick={() => { setActiveSidebar("git"); setOpenMenu(null); }}>
                          <span>Source Control</span>
                          <span className="hotkey">Ctrl+Shift+G</span>
                        </button>
                        <button type="button" onClick={() => { setActiveSidebar("debug"); setOpenMenu(null); }}>
                          <span>Run and Debug</span>
                          <span className="hotkey">Ctrl+Shift+D</span>
                        </button>
                        <button type="button" onClick={() => { setActiveSidebar("extensions"); setOpenMenu(null); }}>
                          <span>Extensions</span>
                          <span className="hotkey">Ctrl+Shift+X</span>
                        </button>
                      </>
                    )}

                    {m === "Run" && (
                      <>
                        <button type="button" onClick={() => { handleRunTests(); setOpenMenu(null); }}>
                          <span>Start Debugging (dotnet test)</span>
                          <span className="hotkey">F5</span>
                        </button>
                        <button type="button" onClick={() => { handleApplyPatch(); setOpenMenu(null); }}>
                          <span>Apply Security Hotfix</span>
                          <span className="hotkey">Ctrl+F5</span>
                        </button>
                      </>
                    )}

                    {m === "Terminal" && (
                      <>
                        <button type="button" onClick={() => { handleRunTests(); setOpenMenu(null); }}>
                          <span>Run Tests [dotnet test]</span>
                        </button>
                        <button type="button" onClick={() => { setTerminalLogs(["PS C:\\Users\\Yohan> cls"]); setOpenMenu(null); }}>
                          <span>Clear Terminal</span>
                        </button>
                      </>
                    )}
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="title">
          CleanArchitecture.Security &gt; {activeTab} — Visual Studio Code
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

      <IncidentBanner $resolved={isPatched}>
        <div className="left-msg">
          {isPatched ? (
            <>
              <FiCheckCircle />
              <span>
                Security Patch Applied. Run [dotnet test] to verify build clearance.
              </span>
            </>
          ) : (
            <>
              <FiAlertTriangle />
              <span>
                Production Incident: Authorization bypass vulnerability detected on Line 24.
              </span>
            </>
          )}
        </div>

        {!isPatched && (
          <button
            type="button"
            className="action-btn"
            onClick={handleApplyPatch}
            title="Apply cryptographic constant-time comparison patch"
          >
            <FiTool /> Apply Security Hotfix
          </button>
        )}
      </IncidentBanner>

      <MainContent>
        <ActivityBar>
          <div className="top">
            <div
              className={`action-btn ${activeSidebar === "explorer" ? "active" : ""}`}
              onClick={() => setActiveSidebar(activeSidebar === "explorer" ? "" : "explorer")}
              title="Explorer (Ctrl+Shift+E)"
            >
              <VscFiles />
            </div>
            <div
              className={`action-btn ${activeSidebar === "search" ? "active" : ""}`}
              onClick={() => setActiveSidebar(activeSidebar === "search" ? "" : "search")}
              title="Search (Ctrl+Shift+F)"
            >
              <VscSearch />
            </div>
            <div
              className={`action-btn ${activeSidebar === "git" ? "active" : ""}`}
              onClick={() => setActiveSidebar(activeSidebar === "git" ? "" : "git")}
              title="Source Control"
            >
              <VscSourceControl />
              <span className="badge">{isPatched ? "0" : "1"}</span>
            </div>
            <div
              className={`action-btn ${activeSidebar === "debug" ? "active" : ""}`}
              onClick={() => setActiveSidebar(activeSidebar === "debug" ? "" : "debug")}
              title="Run and Debug (Ctrl+Shift+D)"
            >
              <VscDebugAlt />
            </div>
            <div
              className={`action-btn ${activeSidebar === "extensions" ? "active" : ""}`}
              onClick={() => setActiveSidebar(activeSidebar === "extensions" ? "" : "extensions")}
              title="Extensions (Ctrl+Shift+X)"
            >
              <VscExtensions />
            </div>
          </div>
          <div className="bottom">
            <div
              className={`action-btn ${activeSidebar === "settings" ? "active" : ""}`}
              onClick={() => setActiveSidebar(activeSidebar === "settings" ? "" : "settings")}
              title="Settings"
            >
              <VscSettingsGear />
            </div>
          </div>
        </ActivityBar>

        {activeSidebar && (
          <Sidebar>
            <div className="sidebar-header">
              <span>{activeSidebar}</span>
              <VscChevronDown />
            </div>

            <div className="panel-body">
              {/* Explorer */}
              {activeSidebar === "explorer" && (
                <div className="tree">
                  <div className="folder-title">
                    <VscChevronDown /> PORTFOLIO.SLN
                  </div>
                  <div className="folder-title" style={{ paddingLeft: "18px" }}>
                    <VscChevronDown /> 01_SecurityCore
                  </div>
                  <div
                    className={`file-item ${activeTab === "TokenSecurityService.cs" ? "active" : ""}`}
                    style={{ paddingLeft: "32px" }}
                    onClick={() => setActiveTab("TokenSecurityService.cs")}
                  >
                    <SiCsharp className="icon-cs" /> TokenSecurityService.cs
                    <span className={`status-dot ${isPatched ? "ok" : ""}`} />
                  </div>
                  <div
                    className={`file-item ${activeTab === "appsettings.json" ? "active" : ""}`}
                    style={{ paddingLeft: "32px" }}
                    onClick={() => setActiveTab("appsettings.json")}
                  >
                    <SiJson className="icon-json" /> appsettings.json
                  </div>

                  <div className="folder-title" style={{ paddingLeft: "18px", marginTop: "4px" }}>
                    <VscChevronDown /> 02_Tests
                  </div>
                  <div
                    className={`file-item ${activeTab === "TokenSecurityServiceTests.cs" ? "active" : ""}`}
                    style={{ paddingLeft: "32px" }}
                    onClick={() => setActiveTab("TokenSecurityServiceTests.cs")}
                  >
                    <SiCsharp className="icon-cs" /> TokenSecurityServiceTests.cs
                  </div>

                  <div className="folder-title" style={{ paddingLeft: "18px", marginTop: "4px" }}>
                    <VscChevronDown /> 03_Domain
                  </div>
                  <div
                    className={`file-item ${activeTab === "ArchitectProfile.cs" ? "active" : ""}`}
                    style={{ paddingLeft: "32px" }}
                    onClick={() => setActiveTab("ArchitectProfile.cs")}
                  >
                    <SiCsharp className="icon-cs" /> ArchitectProfile.cs
                  </div>
                </div>
              )}

              {/* Search */}
              {activeSidebar === "search" && (
                <div className="search-container">
                  <div className="search-input-box">
                    <FiSearch />
                    <input
                      type="text"
                      placeholder="Search (e.g. signature, validate, token)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className="search-results">
                    <div className="res-file">TokenSecurityService.cs</div>
                    <div
                      className="res-line"
                      onClick={() => setActiveTab("TokenSecurityService.cs")}
                    >
                      <small>24:</small> if (token.ExpiresAt &lt; DateTime.UtcNow...
                    </div>
                    <div
                      className="res-line"
                      onClick={() => setActiveTab("TokenSecurityService.cs")}
                    >
                      <small>23:</small> var computedSignature = ComputeHmac(...)
                    </div>

                    <div className="res-file" style={{ marginTop: "6px" }}>TokenSecurityServiceTests.cs</div>
                    <div
                      className="res-line"
                      onClick={() => setActiveTab("TokenSecurityServiceTests.cs")}
                    >
                      <small>7:</small> Validate_ForgedSignature_MustReject()
                    </div>
                  </div>
                </div>
              )}

              {/* Git Source Control */}
              {activeSidebar === "git" && (
                <div className="git-container" $resolved={isPatched}>
                  <div className="git-branch">
                    <FiGitBranch /> <strong>feature/security-hardening</strong>
                  </div>

                  <textarea
                    className="commit-input"
                    defaultValue={isPatched ? "fix(security): apply FixedTimeEquals constant-time comparison" : "wip: investigate authorization bypass"}
                  />

                  <button
                    type="button"
                    className="commit-btn"
                    onClick={() => {
                      if (!isPatched) handleApplyPatch();
                      setTerminalLogs((p) => [...p, "git commit -m 'Applied security hotfix'"]);
                    }}
                  >
                    <FiCheck /> {isPatched ? "Commit & Push" : "Stage & Commit Hotfix"}
                  </button>

                  <div className="changes-header">Changes</div>
                  <div className="change-item">
                    <span>TokenSecurityService.cs</span>
                    <strong>{isPatched ? "M (Patched)" : "M (Vulnerable)"}</strong>
                  </div>
                </div>
              )}

              {/* Run and Debug */}
              {activeSidebar === "debug" && (
                <div className="debug-container">
                  <button
                    type="button"
                    className="debug-play-btn"
                    onClick={handleRunTests}
                  >
                    <FiPlay /> Start Debugging (.NET Core)
                  </button>

                  <div className="debug-section">
                    <div className="sec-title">Variables Watch</div>
                    <div className="var-row"><strong>_masterSecret:</strong> "4a8e...=="</div>
                    <div className="var-row"><strong>token.Signature:</strong> 32 bytes</div>
                    <div className="var-row">
                      <strong>fixedTimeEquals:</strong>{" "}
                      <span style={{ color: isPatched ? "#4ade80" : "#f87171" }}>
                        {isPatched ? "True" : "Bypassed"}
                      </span>
                    </div>
                  </div>

                  <div className="debug-section">
                    <div className="sec-title">Breakpoints</div>
                    <div className="var-row">☑ TokenSecurityService.cs:24</div>
                    <div className="var-row">☑ TokenSecurityServiceTests.cs:11</div>
                  </div>
                </div>
              )}

              {/* Extensions */}
              {activeSidebar === "extensions" && (
                <div className="ext-container">
                  <div className="ext-card">
                    <strong>C# Dev Kit</strong>
                    <small>Microsoft • Language server & Roslyn</small>
                    <span className="badge-ok">✔ Enabled</span>
                  </div>
                  <div className="ext-card">
                    <strong>xUnit Test Explorer</strong>
                    <small>Run and debug .NET tests</small>
                    <span className="badge-ok">✔ Enabled</span>
                  </div>
                  <div className="ext-card">
                    <strong>Clean Architecture Linter</strong>
                    <small>Enforce domain inversion boundaries</small>
                    <span className="badge-ok">✔ Enabled</span>
                  </div>
                  <div className="ext-card">
                    <strong>SonarLint Security Analyzer</strong>
                    <small>Automated vulnerability detection</small>
                    <span className="badge-ok">✔ Active</span>
                  </div>
                </div>
              )}

              {/* Settings */}
              {activeSidebar === "settings" && (
                <div className="settings-container">
                  <div className="setting-row">
                    <label>Editor Theme</label>
                    <select defaultValue="dark">
                      <option value="dark">Dark Modern (Visual Studio)</option>
                      <option value="monokai">Monokai Pro</option>
                      <option value="fluent">Windows 11 Fluent Dark</option>
                    </select>
                  </div>
                  <div className="setting-row">
                    <label>Font Size</label>
                    <input type="number" defaultValue={13} min={10} max={20} />
                  </div>
                  <div className="setting-row">
                    <label>Tab Size</label>
                    <input type="number" defaultValue={4} min={2} max={8} />
                  </div>
                </div>
              )}
            </div>
          </Sidebar>
        )}

        <EditorArea>
          <TabsBar>
            <div
              className={`tab ${activeTab === "TokenSecurityService.cs" ? "active" : ""}`}
              onClick={() => setActiveTab("TokenSecurityService.cs")}
            >
              <SiCsharp className="icon-cs" />
              <span>TokenSecurityService.cs</span>
            </div>
            <div
              className={`tab ${activeTab === "TokenSecurityServiceTests.cs" ? "active" : ""}`}
              onClick={() => setActiveTab("TokenSecurityServiceTests.cs")}
            >
              <SiCsharp className="icon-cs" />
              <span>TokenSecurityServiceTests.cs</span>
            </div>
            <div
              className={`tab ${activeTab === "appsettings.json" ? "active" : ""}`}
              onClick={() => setActiveTab("appsettings.json")}
            >
              <SiJson className="icon-json" />
              <span>appsettings.json</span>
            </div>
            <div
              className={`tab ${activeTab === "ArchitectProfile.cs" ? "active" : ""}`}
              onClick={() => setActiveTab("ArchitectProfile.cs")}
            >
              <SiCsharp className="icon-cs" />
              <span>ArchitectProfile.cs</span>
            </div>
          </TabsBar>

          <CodeEditor>
            {activeTab === "TokenSecurityService.cs" && (
              <>
                <div className="line"><span className="line-no">1</span><span className="code-text"><span className="keyword">using</span> System;</span></div>
                <div className="line"><span className="line-no">2</span><span className="code-text"><span className="keyword">using</span> System.Security.Cryptography;</span></div>
                <div className="line"><span className="line-no">3</span><span className="code-text"><span className="keyword">using</span> Microsoft.Extensions.Configuration;</span></div>
                <div className="line"><span className="line-no">4</span><span className="code-text"></span></div>
                <div className="line"><span className="line-no">5</span><span className="code-text"><span className="keyword">namespace</span> <span className="type">CleanArchitecture.Security</span>;</span></div>
                <div className="line"><span className="line-no">6</span><span className="code-text"></span></div>
                <div className="line"><span className="line-no">7</span><span className="code-text"><span className="keyword">public class</span> <span className="type">TokenSecurityService</span> : <span className="type">ITokenSecurityService</span></span></div>
                <div className="line"><span className="line-no">8</span><span className="code-text">{`{`}</span></div>
                <div className="line"><span className="line-no">9</span><span className="code-text">    <span className="keyword">private readonly byte</span>[] _masterSecret;</span></div>
                <div className="line"><span className="line-no">10</span><span className="code-text">    <span className="keyword">public</span> TokenSecurityService(<span className="type">IConfiguration</span> config)</span></div>
                <div className="line"><span className="line-no">11</span><span className="code-text">    {`{`}</span></div>
                <div className="line"><span className="line-no">12</span><span className="code-text">        _masterSecret = Convert.FromBase64String(config[<span className="string">"Security:SigningKey"</span>]!);</span></div>
                <div className="line"><span className="line-no">13</span><span className="code-text">    {`}`}</span></div>
                <div className="line"><span className="line-no">14</span><span className="code-text"></span></div>
                <div className="line"><span className="line-no">15</span><span className="code-text">    <span className="comment">{"/// <summary>"}</span></span></div>
                <div className="line"><span className="line-no">16</span><span className="code-text">    <span className="comment">{"/// Cryptographically verifies signature and token expiry time"}</span></span></div>
                <div className="line"><span className="line-no">17</span><span className="code-text">    <span className="comment">{"/// </summary>"}</span></span></div>
                <div className="line"><span className="line-no">18</span><span className="code-text">    <span className="keyword">public</span> <span className="type">SecurityResult</span> Validate(<span className="type">SecurityToken</span> token)</span></div>
                <div className="line"><span className="line-no">19</span><span className="code-text">    {`{`}</span></div>
                <div className="line"><span className="line-no">20</span><span className="code-text">        <span className="keyword">if</span> (token == <span className="keyword">null</span>)</span></div>
                <div className="line"><span className="line-no">21</span><span className="code-text">            <span className="keyword">return</span> SecurityResult.Invalid;</span></div>
                <div className="line"><span className="line-no">22</span><span className="code-text"></span></div>
                <div className="line"><span className="line-no">23</span><span className="code-text">        <span className="keyword">var</span> computedSignature = ComputeHmac(token.Payload, _masterSecret);</span></div>
                {!isPatched ? (
                  <div className="line buggy-line">
                    <span className="line-no">24</span>
                    <span className="code-text">
                      <span className="comment">{"// VULNERABILITY: Inverted logic bypasses tampered tokens!"}</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">if</span> (<span className="vuln">token.ExpiresAt &lt; DateTime.UtcNow &amp;&amp; token.Signature != computedSignature</span>)<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">return</span> <span className="vuln">SecurityResult.Success</span>;
                    </span>
                  </div>
                ) : (
                  <div className="line fixed-line">
                    <span className="line-no">24</span>
                    <span className="code-text">
                      <span className="comment">{"// PATCHED: Constant-time comparison & strict expiration"}</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">if</span> (<span className="patched">token.ExpiresAt &gt;= DateTime.UtcNow &amp;&amp; CryptographicOperations.FixedTimeEquals(token.Signature, computedSignature)</span>)<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">return</span> <span className="patched">SecurityResult.Success</span>;
                    </span>
                  </div>
                )}
                <div className="line"><span className="line-no">25</span><span className="code-text"></span></div>
                <div className="line"><span className="line-no">26</span><span className="code-text">        <span className="keyword">return</span> SecurityResult.Unauthorized;</span></div>
                <div className="line"><span className="line-no">27</span><span className="code-text">    {`}`}</span></div>
                <div className="line"><span className="line-no">28</span><span className="code-text">{`}`}</span></div>
              </>
            )}

            {activeTab === "TokenSecurityServiceTests.cs" && (
              <>
                <div className="line"><span className="line-no">1</span><span className="code-text"><span className="keyword">using</span> Xunit;</span></div>
                <div className="line"><span className="line-no">2</span><span className="code-text"><span className="keyword">using</span> CleanArchitecture.Security;</span></div>
                <div className="line"><span className="line-no">3</span><span className="code-text"></span></div>
                <div className="line"><span className="line-no">4</span><span className="code-text"><span className="keyword">public class</span> <span className="type">TokenSecurityServiceTests</span></span></div>
                <div className="line"><span className="line-no">5</span><span className="code-text">{`{`}</span></div>
                <div className="line"><span className="line-no">6</span><span className="code-text">    [Fact]</span></div>
                <div className="line"><span className="line-no">7</span><span className="code-text">    <span className="keyword">public void</span> Validate_ForgedSignature_MustReject()</span></div>
                <div className="line"><span className="line-no">8</span><span className="code-text">    {`{`}</span></div>
                <div className="line"><span className="line-no">9</span><span className="code-text">        <span className="keyword">var</span> service = <span className="keyword">new</span> TokenSecurityService(CreateMockConfig());</span></div>
                <div className="line"><span className="line-no">10</span><span className="code-text">        <span className="keyword">var</span> tamperedToken = <span className="keyword">new</span> SecurityToken {`{ Signature = ForgedBytes }`};</span></div>
                <div className="line"><span className="line-no">11</span><span className="code-text">        <span className="keyword">var</span> result = service.Validate(tamperedToken);</span></div>
                <div className="line"><span className="line-no">12</span><span className="code-text">        Assert.Equal(SecurityResult.Unauthorized, result);</span></div>
                <div className="line"><span className="line-no">13</span><span className="code-text">    {`}`}</span></div>
                <div className="line"><span className="line-no">14</span><span className="code-text">{`}`}</span></div>
              </>
            )}

            {activeTab === "appsettings.json" && (
              <>
                <div className="line"><span className="line-no">1</span><span className="code-text">{`{`}</span></div>
                <div className="line"><span className="line-no">2</span><span className="code-text">  <span className="string">"Security"</span>: {`{`}</span></div>
                <div className="line"><span className="line-no">3</span><span className="code-text">    <span className="string">"SigningKey"</span>: <span className="string">"k9Wx+b7L2mF9pQ3rT6vY8aC4eH1jN5sU="</span>,</span></div>
                <div className="line"><span className="line-no">4</span><span className="code-text">    <span className="string">"Algorithm"</span>: <span className="string">"HMAC-SHA256"</span>,</span></div>
                <div className="line"><span className="line-no">5</span><span className="code-text">    <span className="string">"TokenExpiryMinutes"</span>: 60</span></div>
                <div className="line"><span className="line-no">6</span><span className="code-text">  {`}`},</span></div>
                <div className="line"><span className="line-no">7</span><span className="code-text">  <span className="string">"Environment"</span>: <span className="string">"Production-Secure"</span></span></div>
                <div className="line"><span className="line-no">8</span><span className="code-text">{`}`}</span></div>
              </>
            )}

            {activeTab === "ArchitectProfile.cs" && (
              <>
                <div className="line"><span className="line-no">1</span><span className="code-text"><span className="keyword">namespace</span> <span className="type">Enterprise.Architect</span>;</span></div>
                <div className="line"><span className="line-no">2</span><span className="code-text"></span></div>
                <div className="line"><span className="line-no">3</span><span className="code-text"><span className="keyword">public sealed record</span> <span className="type">SoftwareEngineer</span></span></div>
                <div className="line"><span className="line-no">4</span><span className="code-text">{`{`}</span></div>
                <div className="line"><span className="line-no">5</span><span className="code-text">    <span className="keyword">public string</span> Name {`{ get; }`} = <span className="string">"{Bio.name}"</span>;</span></div>
                <div className="line"><span className="line-no">6</span><span className="code-text">    <span className="keyword">public string</span> Role {`{ get; }`} = <span className="string">"Senior Software Engineer • Cloud & Security"</span>;</span></div>
                <div className="line"><span className="line-no">7</span><span className="code-text">    <span className="keyword">public string</span> Specialization {`{ get; }`} = <span className="string">".NET 9 • Clean Architecture • Microservices • React"</span>;</span></div>
                <div className="line"><span className="line-no">8</span><span className="code-text">    <span className="keyword">public bool</span> ClearanceGranted {`{ get; }`} = <span className="keyword">{isPatched ? "true" : "false"}</span>;</span></div>
                <div className="line"><span className="line-no">9</span><span className="code-text">{`}`}</span></div>
              </>
            )}
          </CodeEditor>

          <TerminalPanel>
            <div className="terminal-tabs">
              <div className="tabs-left">
                <span className="tab-btn">
                  <VscTerminal /> TERMINAL (dotnet test runner)
                </span>
              </div>

              <div className="quick-actions">
                {!isPatched && (
                  <button
                    type="button"
                    className="fix-btn"
                    onClick={handleApplyPatch}
                    title="Apply hotfix to line 24"
                  >
                    <FiTool /> Apply Hotfix
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleRunTests}
                  title="Execute xUnit test runner"
                >
                  <FiPlay /> dotnet test
                </button>
              </div>
            </div>

            <div className="terminal-body">
              {terminalLogs.map((log, i) => (
                <div
                  key={i}
                  className={`log-line ${
                    log.includes("[FAIL]") || log.includes("FAILED")
                      ? "fail"
                      : log.includes("Passed!") || log.includes("✔")
                      ? "pass"
                      : log.startsWith("PS")
                      ? "prompt"
                      : ""
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </TerminalPanel>
        </EditorArea>
      </MainContent>

      {/* Clearance Modal Reward */}
      {showClearance && (
        <ClearanceModal>
          <div className="modal-card">
            <div className="badge-icon">
              <FiAward />
            </div>
            <h3>Principal Architect Clearance</h3>
            <p>
              Vulnerability patched and 3/3 xUnit suites passed. You demonstrated
              solid cryptographic validation and production triage under pressure.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="primary"
                as="a"
                href={`mailto:${Bio.email}?subject=Senior%20Software%20Engineer%20Opportunity&body=Hi%20Yohan,%20I%20reviewed%20your%20cloud%20workstation%20and%20resolved%20the%20security%20incident...`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiMail /> Contact Yohan
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => setShowClearance(false)}
              >
                Return to IDE
              </button>
            </div>
          </div>
        </ClearanceModal>
      )}
    </VSCodeFrame>
  );
};

export default VSCodeApp;
