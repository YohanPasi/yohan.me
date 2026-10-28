import React, { useState } from "react";
import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import {
  FiMonitor,
  FiWifi,
  FiMoon,
  FiUser,
  FiRefreshCw,
  FiShield,
  FiCpu,
} from "react-icons/fi";
import { Win11SettingsIcon } from "./WindowsIcons";
import { Bio } from "../../data/constants";

const SettingsRoot = styled.div`
  width: 100%;
  height: 100%;
  background: #1c2027;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const TitleBar = styled.div`
  height: 34px;
  background: #181b22;
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

    .icon {
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

const SettingsLayout = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 220px;
  background: #181b22;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;

  .nav-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    color: #cbd5e1;
    cursor: pointer;
    transition: background 0.12s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    &.active {
      background: rgba(0, 120, 212, 0.25);
      color: #ffffff;
      font-weight: 600;
    }

    svg {
      font-size: 15px;
      color: #0078d4;
    }
  }
`;

const ContentPanel = styled.div`
  flex: 1;
  background: #14161d;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-size: 20px;
    color: #ffffff;
    margin: 0;
  }

  .card-group {
    background: #1c2029;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .card-title {
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding-bottom: 8px;

      svg {
        color: #38bdf8;
      }
    }

    .specs-grid {
      display: grid;
      grid-template-columns: 160px 1fr;
      row-gap: 8px;
      font-size: 12px;

      .label {
        color: #94a3b8;
      }
      .val {
        color: #e2e8f0;
        font-weight: 500;
      }
    }
  }

  .theme-btn-row {
    display: flex;
    gap: 10px;
    margin-top: 6px;

    button {
      padding: 8px 14px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #ffffff;
      font-size: 11.5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;

      &:hover {
        background: #0078d4;
      }
    }
  }
`;

const SettingsApp = ({
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
  onCycleWallpaper,
}) => {
  const [activeTab, setActiveTab] = useState("system");

  return (
    <SettingsRoot>
      <TitleBar
        className="window-titlebar"
        onDoubleClick={(e) => {
          e.stopPropagation();
          onToggleMaximize();
        }}
      >
        <div className="title-left">
          <Win11SettingsIcon size={14} className="icon" />
          <span>Settings</span>
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

      <SettingsLayout>
        <Sidebar>
          <div
            className={`nav-btn ${activeTab === "system" ? "active" : ""}`}
            onClick={() => setActiveTab("system")}
          >
            <FiMonitor /> System
          </div>
          <div
            className={`nav-btn ${activeTab === "personalization" ? "active" : ""}`}
            onClick={() => setActiveTab("personalization")}
          >
            <FiMoon /> Personalization
          </div>
          <div
            className={`nav-btn ${activeTab === "network" ? "active" : ""}`}
            onClick={() => setActiveTab("network")}
          >
            <FiWifi /> Network & Internet
          </div>
          <div
            className={`nav-btn ${activeTab === "accounts" ? "active" : ""}`}
            onClick={() => setActiveTab("accounts")}
          >
            <FiUser /> Accounts
          </div>
          <div
            className={`nav-btn ${activeTab === "update" ? "active" : ""}`}
            onClick={() => setActiveTab("update")}
          >
            <FiRefreshCw /> Windows Update
          </div>
        </Sidebar>

        <ContentPanel>
          {activeTab === "system" && (
            <>
              <h2>About This Workstation</h2>

              <div className="card-group">
                <div className="card-title">
                  <FiCpu /> Device specifications
                </div>
                <div className="specs-grid">
                  <span className="label">Device name</span>
                  <span className="val">YOHAN-WORKSTATION</span>

                  <span className="label">Processor</span>
                  <span className="val">13th Gen Intel(R) Core(TM) i9-13900H @ 2.60 GHz</span>

                  <span className="label">Installed RAM</span>
                  <span className="val">64.0 GB (63.8 GB usable)</span>

                  <span className="label">Device ID</span>
                  <span className="val">9A4B7D21-F648-4C2E-8E5C-0268571891CD</span>

                  <span className="label">System type</span>
                  <span className="val">64-bit operating system, x64-based processor</span>

                  <span className="label">Pen and touch</span>
                  <span className="val">No pen or touch input available</span>
                </div>
              </div>

              <div className="card-group">
                <div className="card-title">
                  <FiShield /> Windows specifications
                </div>
                <div className="specs-grid">
                  <span className="label">Edition</span>
                  <span className="val">Windows 11 Enterprise</span>

                  <span className="label">Version</span>
                  <span className="val">24H2</span>

                  <span className="label">Installed on</span>
                  <span className="val">28/10/2026</span>

                  <span className="label">OS build</span>
                  <span className="val">26100.1742</span>

                  <span className="label">Experience</span>
                  <span className="val">Windows Feature Experience Pack 1000.26100.1.0</span>
                </div>
              </div>
            </>
          )}

          {activeTab === "personalization" && (
            <>
              <h2>Personalization & Themes</h2>
              <div className="card-group">
                <div className="card-title">
                  <FiMoon /> Desktop Background Wallpaper
                </div>
                <p style={{ fontSize: "12px", color: "#cbd5e1", margin: 0 }}>
                  Select or cycle through official Windows 11 high-resolution bloom wallpapers.
                </p>
                <div className="theme-btn-row">
                  <button type="button" onClick={onCycleWallpaper}>
                    <FiRefreshCw /> Next Desktop Wallpaper
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "network" && (
            <>
              <h2>Network & Internet</h2>
              <div className="card-group">
                <div className="card-title">
                  <FiWifi /> Wi-Fi 6E (Connected)
                </div>
                <div className="specs-grid">
                  <span className="label">Network name</span>
                  <span className="val">Enterprise-Mesh-6E</span>

                  <span className="label">IPv4 Address</span>
                  <span className="val">192.168.1.142</span>

                  <span className="label">Link speed</span>
                  <span className="val">2400 / 2400 (Mbps)</span>

                  <span className="label">Security type</span>
                  <span className="val">WPA3-Personal</span>
                </div>
              </div>
            </>
          )}

          {activeTab === "accounts" && (
            <>
              <h2>Your Info & Accounts</h2>
              <div className="card-group">
                <div className="card-title">
                  <FiUser /> {Bio.name}
                </div>
                <div className="specs-grid">
                  <span className="label">Role</span>
                  <span className="val">Administrator</span>

                  <span className="label">Account type</span>
                  <span className="val">Local Enterprise Account</span>

                  <span className="label">Email</span>
                  <span className="val">{Bio.email}</span>
                </div>
              </div>
            </>
          )}

          {activeTab === "update" && (
            <>
              <h2>Windows Update</h2>
              <div className="card-group">
                <div className="card-title" style={{ color: "#34d399" }}>
                  ✔ You're up to date
                </div>
                <p style={{ fontSize: "12px", color: "#cbd5e1", margin: 0 }}>
                  Last checked: Today, 12:45 PM • Security Intelligence Update (KB5044284) installed.
                </p>
              </div>
            </>
          )}
        </ContentPanel>
      </SettingsLayout>
    </SettingsRoot>
  );
};

export default SettingsApp;
