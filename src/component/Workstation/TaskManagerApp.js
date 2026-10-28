import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import {
  FiActivity,
  FiXCircle,
  FiLayers,
} from "react-icons/fi";
import { Win11TaskManagerIcon } from "./WindowsIcons";

const TaskManagerRoot = styled.div`
  width: 100%;
  height: 100%;
  background: #1c1c1c;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
`;

const TitleBar = styled.div`
  height: 34px;
  background: #202020;
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

const TopCommandBar = styled.div`
  height: 42px;
  background: #252525;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;

  .bar-left {
    display: flex;
    align-items: center;
    gap: 12px;

    span.app-title {
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
    }
  }

  .bar-actions {
    display: flex;
    align-items: center;
    gap: 8px;

    button.end-task-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 4px;
      background: ${(props) =>
        props.$hasSelection ? "rgba(239, 68, 68, 0.25)" : "rgba(255, 255, 255, 0.06)"};
      border: 1px solid
        ${(props) =>
          props.$hasSelection ? "#ef4444" : "rgba(255, 255, 255, 0.12)"};
      color: ${(props) => (props.$hasSelection ? "#fca5a5" : "#64748b")};
      font-size: 11.5px;
      font-weight: 600;
      cursor: ${(props) => (props.$hasSelection ? "pointer" : "default")};
      transition: all 0.15s ease;

      &:hover {
        ${(props) =>
          props.$hasSelection
            ? "background: #ef4444; color: #ffffff;"
            : ""}
      }
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const LeftNav = styled.div`
  width: 48px;
  background: #202020;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: 4px;

  button.nav-item {
    width: 38px;
    height: 38px;
    border-radius: 4px;
    background: ${(props) =>
      props.$active ? "rgba(255, 255, 255, 0.12)" : "transparent"};
    border: none;
    color: ${(props) => (props.$active ? "#0078d4" : "#94a3b8")};
    display: grid;
    place-items: center;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.15s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
  }
`;

const ContentPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #181818;
`;

const ProcessTable = styled.div`
  flex: 1;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    text-align: left;

    thead {
      position: sticky;
      top: 0;
      background: #222222;
      z-index: 10;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);

      th {
        padding: 8px 12px;
        color: #94a3b8;
        font-weight: 500;
        font-size: 11px;
      }
    }

    tbody {
      tr {
        cursor: pointer;
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        transition: background 0.1s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        &.selected {
          background: rgba(0, 120, 212, 0.28);
          outline: 1px solid rgba(0, 120, 212, 0.6);
        }

        td {
          padding: 8px 12px;
          color: #e2e8f0;
          font-family: monospace;

          &:first-child {
            font-family: inherit;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
          }
        }
      }
    }
  }
`;

const PerformanceView = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;

  .chart-card {
    background: #202020;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      strong {
        font-size: 14px;
        color: #ffffff;
      }

      span.current-val {
        font-size: 20px;
        font-weight: 700;
        color: #10b981;
      }
    }

    canvas {
      width: 100%;
      height: 120px;
      background: #111827;
      border-radius: 4px;
      border: 1px solid #1f2937;
    }
  }

  .specs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    .spec-item {
      background: #202020;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 3px;

      small {
        font-size: 10px;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      strong {
        font-size: 13px;
        color: #ffffff;
      }
    }
  }
`;

const DEFAULT_PROCESSES = [
  { key: "vscode", name: "Visual Studio Code (Code.exe)", pid: 14208, cpu: 3.4, mem: 412, disk: 0.2, net: 0.1 },
  { key: "msedge", name: "Microsoft Edge (msedge.exe)", pid: 19844, cpu: 1.8, mem: 285, disk: 0.1, net: 0.4 },
  { key: "explorer", name: "Windows Explorer (explorer.exe)", pid: 4892, cpu: 0.4, mem: 148, disk: 0.0, net: 0.0 },
  { key: "pwsh", name: "Windows PowerShell Core (pwsh.exe)", pid: 8124, cpu: 0.2, mem: 84, disk: 0.0, net: 0.0 },
  { key: "minesweeper", name: "Minesweeper (winmine.exe)", pid: 11048, cpu: 0.4, mem: 48, disk: 0.0, net: 0.0 },
  { key: "solitaire", name: "Solitaire Collection (solitaire.exe)", pid: 13912, cpu: 0.8, mem: 62, disk: 0.0, net: 0.0 },
  { key: "mspaint", name: "Paint (mspaint.exe)", pid: 9412, cpu: 0.5, mem: 92, disk: 0.0, net: 0.0 },
  { key: "calc", name: "Calculator (calc.exe)", pid: 6128, cpu: 0.1, mem: 44, disk: 0.0, net: 0.0 },
  { key: "notepad", name: "Notepad (notepad.exe)", pid: 7420, cpu: 0.1, mem: 32, disk: 0.0, net: 0.0 },
  { key: "system", name: "System Kernel & NTOSKRNL", pid: 4, cpu: 1.1, mem: 160, disk: 0.4, net: 0.0 },
];

const TaskManagerApp = ({
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
  onKillProcess, // Callback to close a window
}) => {
  const [activeTab, setActiveTab] = useState("processes"); // 'processes' or 'performance'
  const [selectedPid, setSelectedPid] = useState(null);
  const [processes, setProcesses] = useState(DEFAULT_PROCESSES);
  const [cpuHistory, setCpuHistory] = useState([12, 18, 14, 22, 19, 25, 28, 20, 16, 24, 21, 19]);
  const canvasRef = useRef(null);

  // Fluctuating process stats
  useEffect(() => {
    const interval = setInterval(() => {
      setProcesses((prev) =>
        prev.map((proc) => {
          if (proc.key === "system") return proc;
          const cpuDelta = (Math.random() - 0.5) * 1.2;
          const newCpu = Math.max(0.1, Math.min(18.5, proc.cpu + cpuDelta));
          const memDelta = Math.floor((Math.random() - 0.5) * 4);
          const newMem = Math.max(20, proc.mem + memDelta);
          return {
            ...proc,
            cpu: Number(newCpu.toFixed(1)),
            mem: newMem,
          };
        })
      );

      // Add to CPU wave history
      const currentAvgCpu = Math.round(
        12 + Math.random() * 18 + (Math.sin(Date.now() / 1000) * 8)
      );
      setCpuHistory((h) => [...h.slice(-29), Math.max(4, Math.min(96, currentAvgCpu))]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Draw Performance Wave Chart
  useEffect(() => {
    if (activeTab !== "performance") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Draw grid lines
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw CPU line
    if (cpuHistory.length > 1) {
      const step = w / (cpuHistory.length - 1);

      ctx.beginPath();
      cpuHistory.forEach((val, i) => {
        const x = i * step;
        const y = h - (val / 100) * (h - 10) - 5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Subtle green fill under curve
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.fill();
    }
  }, [activeTab, cpuHistory]);

  const handleEndTask = () => {
    if (!selectedPid) return;
    const proc = processes.find((p) => p.pid === selectedPid);
    if (!proc || proc.key === "system") return;

    if (onKillProcess) {
      onKillProcess(proc.key);
    }
    setProcesses((prev) => prev.filter((p) => p.pid !== selectedPid));
    setSelectedPid(null);
  };

  const currentCpuVal = cpuHistory[cpuHistory.length - 1] || 18;

  return (
    <TaskManagerRoot>
      <TitleBar onDoubleClick={onToggleMaximize}>
        <div className="title-left">
          <Win11TaskManagerIcon size={16} />
          <span>Task Manager</span>
        </div>
        <div className="window-controls">
          <button type="button" onClick={onMinimize} title="Minimize">
            <VscChromeMinimize />
          </button>
          <button
            type="button"
            onClick={onToggleMaximize}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <VscChromeMaximize />
          </button>
          <button
            type="button"
            className="close"
            onClick={onClose}
            title="Close"
          >
            <VscClose />
          </button>
        </div>
      </TitleBar>

      <TopCommandBar $hasSelection={Boolean(selectedPid)}>
        <div className="bar-left">
          <span className="app-title">
            {activeTab === "processes" ? "Processes" : "Performance"}
          </span>
        </div>
        <div className="bar-actions">
          <button
            type="button"
            className="end-task-btn"
            disabled={!selectedPid}
            onClick={handleEndTask}
            title="Terminate selected application process"
          >
            <FiXCircle /> End task
          </button>
        </div>
      </TopCommandBar>

      <MainContent>
        <LeftNav>
          <button
            type="button"
            className={`nav-item ${activeTab === "processes" ? "active" : ""}`}
            style={{
              background: activeTab === "processes" ? "rgba(255,255,255,0.12)" : "",
              color: activeTab === "processes" ? "#0078d4" : "#94a3b8",
            }}
            onClick={() => setActiveTab("processes")}
            title="Processes"
          >
            <FiLayers />
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === "performance" ? "active" : ""}`}
            style={{
              background: activeTab === "performance" ? "rgba(255,255,255,0.12)" : "",
              color: activeTab === "performance" ? "#0078d4" : "#94a3b8",
            }}
            onClick={() => setActiveTab("performance")}
            title="Performance"
          >
            <FiActivity />
          </button>
        </LeftNav>

        <ContentPanel>
          {activeTab === "processes" ? (
            <ProcessTable>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>PID</th>
                    <th>CPU %</th>
                    <th>Memory</th>
                    <th>Disk</th>
                    <th>Network</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.map((proc) => (
                    <tr
                      key={proc.pid}
                      className={selectedPid === proc.pid ? "selected" : ""}
                      onClick={() => setSelectedPid(proc.pid)}
                    >
                      <td>
                        <span style={{ fontSize: "14px" }}>
                          {proc.key === "system" ? "⚙️" : "📁"}
                        </span>
                        <span>{proc.name}</span>
                      </td>
                      <td>{proc.pid}</td>
                      <td style={{ color: proc.cpu > 2 ? "#fbbf24" : "#e2e8f0" }}>
                        {proc.cpu}%
                      </td>
                      <td>{proc.mem} MB</td>
                      <td>{proc.disk} MB/s</td>
                      <td>{proc.net} Mbps</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ProcessTable>
          ) : (
            <PerformanceView>
              <div className="chart-card">
                <div className="chart-header">
                  <strong>CPU Usage (60 Seconds)</strong>
                  <span className="current-val">{currentCpuVal}%</span>
                </div>
                <canvas ref={canvasRef} width={580} height={120} />
              </div>

              <div className="specs-grid">
                <div className="spec-item">
                  <small>Processor</small>
                  <strong>Intel Core i9-13900H (14 Cores, 20 Threads)</strong>
                </div>
                <div className="spec-item">
                  <small>Base Clock / Max Turbo</small>
                  <strong>2.60 GHz / 5.40 GHz Max</strong>
                </div>
                <div className="spec-item">
                  <small>System Memory</small>
                  <strong>64.0 GB LPDDR5 (5200 MT/s)</strong>
                </div>
                <div className="spec-item">
                  <small>OS Build</small>
                  <strong>Windows 11 Enterprise 24H2 (26100.1742)</strong>
                </div>
              </div>
            </PerformanceView>
          )}
        </ContentPanel>
      </MainContent>
    </TaskManagerRoot>
  );
};

export default TaskManagerApp;
