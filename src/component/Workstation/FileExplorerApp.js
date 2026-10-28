import React, { useState } from "react";
import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import {
  FiFolder,
  FiHardDrive,
  FiChevronRight,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUp,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";
import {
  Win11ExplorerIcon,
  Win11TerminalIcon,
  Win11CalculatorIcon,
  Win11MinesweeperIcon,
  Win11SolitaireIcon,
  Win11PaintIcon,
  Win11TaskManagerIcon,
  Win11SolutionIcon,
  Win11TextDocIcon,
  Win11PdfIcon,
} from "./WindowsIcons";

const ExplorerRoot = styled.div`
  width: 100%;
  height: 100%;
  background: #191c24;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const TitleBar = styled.div`
  height: 34px;
  background: #14171d;
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

    .folder-icon {
      font-size: 14px;
      color: #f59e0b;
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

const Toolbar = styled.div`
  height: 44px;
  background: #1e222a;
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

  .address-bar {
    flex: 1;
    height: 28px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    gap: 6px;
    font-size: 11.5px;
    color: #cbd5e1;

    .crumb {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;

      &:hover {
        color: #38bdf8;
      }
    }
  }

  .search-box {
    width: 180px;
    height: 28px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    gap: 6px;
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
`;

const ContentLayout = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 180px;
  background: #181b22;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  .nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 11.5px;
    color: #cbd5e1;
    cursor: pointer;
    transition: background 0.1s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    &.active {
      background: rgba(0, 120, 212, 0.25);
      color: #ffffff;
      font-weight: 500;
    }

    svg {
      font-size: 14px;
      color: #38bdf8;
    }
  }
`;

const FileGrid = styled.div`
  flex: 1;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 16px;
  align-content: flex-start;
  overflow-y: auto;
  background: #14171d;

  .file-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 10px 4px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.12s ease;
    border: 1px solid transparent;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.12);
    }

    .icon-box {
      font-size: 32px;
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 6px;

      &.folder { color: #f59e0b; }
      &.sln { color: #7048e8; }
      &.pdf { color: #ef4444; }
      &.game { color: #10b981; }
      &.calc { color: #0078d4; }
      &.txt { color: #38bdf8; }
      &.term { color: #0ea5e9; }
    }

    span.name {
      font-size: 11px;
      text-align: center;
      color: #e2e8f0;
      line-height: 1.25;
      word-break: break-word;
    }
  }
`;

const StatusBar = styled.div`
  height: 24px;
  background: #181b22;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 11px;
  color: #94a3b8;
`;

const FileExplorerApp = ({
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
  onLaunchApp,
}) => {
  const [filter, setFilter] = useState("");

  const items = [
    { name: "CleanArchitecture.Core", type: "folder", icon: <Win11ExplorerIcon size={34} />, category: "folder" },
    { name: "CleanArchitecture.Security", type: "folder", icon: <Win11ExplorerIcon size={34} />, category: "folder" },
    { name: "CleanArchitecture.Tests", type: "folder", icon: <Win11ExplorerIcon size={34} />, category: "folder" },
    { name: "Portfolio.sln", type: "sln", icon: <Win11SolutionIcon size={34} />, appKey: "vscode" },
    { name: "Resume.pdf", type: "pdf", icon: <Win11PdfIcon size={34} />, appKey: "resume" },
    { name: "Solitaire.exe", type: "game", icon: <Win11SolitaireIcon size={34} />, appKey: "solitaire" },
    { name: "Minesweeper.exe", type: "game", icon: <Win11MinesweeperIcon size={34} />, appKey: "minesweeper" },
    { name: "Paint.exe", type: "paint", icon: <Win11PaintIcon size={34} />, appKey: "paint" },
    { name: "Calculator.exe", type: "calc", icon: <Win11CalculatorIcon size={34} />, appKey: "calculator" },
    { name: "TaskManager.exe", type: "taskmgr", icon: <Win11TaskManagerIcon size={34} />, appKey: "taskmgr" },
    { name: "Incident_Log.txt", type: "txt", icon: <Win11TextDocIcon size={34} />, appKey: "notepad" },
    { name: "PowerShell.exe", type: "term", icon: <Win11TerminalIcon size={34} />, appKey: "terminal" },
  ];

  const filteredItems = filter.trim()
    ? items.filter((i) => i.name.toLowerCase().includes(filter.toLowerCase()))
    : items;

  return (
    <ExplorerRoot>
      <TitleBar
        className="window-titlebar"
        onDoubleClick={(e) => {
          e.stopPropagation();
          onToggleMaximize();
        }}
      >
        <div className="title-left">
          <Win11ExplorerIcon size={16} />
          <span>This PC &gt; Local Disk (C:) &gt; Projects &gt; YohanPortfolio</span>
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

      <Toolbar>
        <div className="nav-btns">
          <button type="button" title="Back"><FiArrowLeft /></button>
          <button type="button" title="Forward"><FiArrowRight /></button>
          <button type="button" title="Up"><FiArrowUp /></button>
          <button type="button" title="Refresh"><FiRefreshCw /></button>
        </div>

        <div className="address-bar">
          <FiHardDrive style={{ color: "#38bdf8" }} />
          <div className="crumb">This PC <FiChevronRight /></div>
          <div className="crumb">Local Disk (C:) <FiChevronRight /></div>
          <div className="crumb">Projects <FiChevronRight /></div>
          <div className="crumb" style={{ color: "#ffffff", fontWeight: 600 }}>
            YohanPortfolio
          </div>
        </div>

        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search YohanPortfolio"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </Toolbar>

      <ContentLayout>
        <Sidebar>
          <div className="nav-item">
            <FiFolder /> Desktop
          </div>
          <div className="nav-item">
            <FiFolder /> Downloads
          </div>
          <div className="nav-item">
            <FiFolder /> Documents
          </div>
          <div className="nav-item active">
            <FiHardDrive /> This PC (C:)
          </div>
          <div className="nav-item">
            <FiHardDrive /> Data (D:)
          </div>
        </Sidebar>

        <FileGrid>
          {filteredItems.map((item) => (
            <div
              key={item.name}
              className="file-card"
              onDoubleClick={() => {
                if (item.appKey && onLaunchApp) {
                  onLaunchApp(item.appKey);
                }
              }}
              title={`Double-click to open ${item.name}`}
            >
              <div className={`icon-box ${item.type}`}>
                {item.icon}
              </div>
              <span className="name">{item.name}</span>
            </div>
          ))}
        </FileGrid>
      </ContentLayout>

      <StatusBar>
        <span>{filteredItems.length} items</span>
        <span>Windows 11 File System • NTFS</span>
      </StatusBar>
    </ExplorerRoot>
  );
};

export default FileExplorerApp;
