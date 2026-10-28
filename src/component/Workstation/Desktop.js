import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import {
  FiLayers,
  FiPower,
  FiSearch,
  FiWifi,
  FiVolume2,
  FiVolumeX,
  FiBatteryCharging,
  FiAlertTriangle,
  FiX,
  FiMinus,
  FiMaximize2,
  FiPlay,
  FiRefreshCw,
  FiMonitor,
  FiLock,
  FiMoon,
  FiBluetooth,
} from "react-icons/fi";
import { win11, acrylicBlur } from "./styles";
import { Bio } from "../../data/constants";
import HeroImg from "../../images/image01.jpg";

import {
  Win11StartIcon,
  Win11ExplorerIcon,
  Win11EdgeIcon,
  Win11VSCodeIcon,
  Win11TerminalIcon,
  Win11CalculatorIcon,
  Win11NotepadIcon,
  Win11RecycleBinIcon,
  Win11SettingsIcon,
  Win11MinesweeperIcon,
  Win11WeatherWidget,
  Win11ThisPCIcon,
  Win11PaintIcon,
  Win11SolitaireIcon,
  Win11TaskManagerIcon,
  Win11SolutionIcon,
  Win11TextDocIcon,
  Win11PdfIcon,
} from "./WindowsIcons";

import VSCodeApp from "./VSCodeApp";
import TerminalApp from "./TerminalApp";
import ResumeApp from "./ResumeApp";
import ArchitectureApp from "./ArchitectureApp";
import MinesweeperApp from "./MinesweeperApp";
import CalculatorApp from "./CalculatorApp";
import NotepadApp from "./NotepadApp";
import FileExplorerApp from "./FileExplorerApp";
import EdgeBrowserApp from "./EdgeBrowserApp";
import SettingsApp from "./SettingsApp";
import SolitaireApp from "./SolitaireApp";
import PaintApp from "./PaintApp";
import TaskManagerApp from "./TaskManagerApp";
import DraggableWindow from "./DraggableWindow";

// --- Wallpapers ---
const WALLPAPERS = [
  {
    id: "bloom-dark",
    name: "Windows 11 Bloom Dark",
    bg: "radial-gradient(circle at 75% 30%, rgba(81, 43, 212, 0.45) 0%, rgba(14, 165, 233, 0.25) 30%, rgba(11, 15, 25, 0.98) 70%), #0b0f19",
  },
  {
    id: "sapphire-midnight",
    name: "Sapphire Midnight",
    bg: "radial-gradient(circle at 50% 35%, rgba(2, 132, 199, 0.45) 0%, rgba(30, 58, 138, 0.35) 40%, rgba(10, 15, 28, 0.98) 80%), #060b18",
  },
  {
    id: "aurora-teal",
    name: "Aurora Cyber Teal",
    bg: "radial-gradient(circle at 65% 25%, rgba(16, 185, 129, 0.35) 0%, rgba(14, 116, 144, 0.3) 35%, rgba(9, 14, 20, 0.98) 75%), #050d12",
  },
];

const fadeInFast = keyframes`
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
`;

const menuSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(12px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
`;

const contextMenuPop = keyframes`
  from {
    opacity: 0;
    transform: scale(0.94);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const DesktopContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: ${(props) => props.$bg};
  transition: background 0.5s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
`;

const DesktopSurface = styled.div`
  flex: 1;
  position: relative;
  padding: 16px 20px;
  overflow: hidden;
`;

const DesktopIconsGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 16px;
  height: calc(100% - 10px);
  width: max-content;
  z-index: 10;
  position: relative;
  animation: ${(props) => (props.$refreshing ? fadeInFast : "none")} 0.25s ease;
`;

const DesktopIcon = styled.div`
  width: 82px;
  padding: 6px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${(props) =>
    props.$selected ? "rgba(0, 120, 212, 0.28)" : "transparent"};
  border: 1px solid
    ${(props) =>
      props.$selected ? "rgba(0, 120, 212, 0.55)" : "transparent"};
  box-shadow: ${(props) =>
    props.$selected ? "0 0 12px rgba(0, 120, 212, 0.3)" : "none"};

  &:hover {
    background: ${(props) =>
      props.$selected
        ? "rgba(0, 120, 212, 0.35)"
        : "rgba(255, 255, 255, 0.08)"};
    border-color: ${(props) =>
      props.$selected
        ? "rgba(0, 120, 212, 0.65)"
        : "rgba(255, 255, 255, 0.15)"};
  }

  .icon-wrapper {
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4));
  }

  span.label {
    font-size: 11px;
    text-align: center;
    color: #ffffff;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
    line-height: 1.25;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// --- Taskbar ---
const Taskbar = styled.div`
  height: 48px;
  background: ${win11.taskbarBg};
  ${acrylicBlur};
  border-top: 1px solid ${win11.taskbarBorder};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 12px;
  z-index: 5000;
  position: relative;
`;

const TaskbarCenter = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 3px;
  height: 100%;

  @media (max-width: 720px) {
    position: static;
    transform: none;
    overflow-x: auto;
  }
`;

const SearchPill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  height: 34px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 17px;
  font-size: 11.5px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.15s ease;
  margin: 0 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    color: #ffffff;
  }

  svg {
    font-size: 13px;
    color: #cbd5e1;
  }

  @media (max-width: 860px) {
    display: none;
  }
`;

const TaskbarBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.12)" : "transparent"};
  border: none;
  color: #ffffff;
  display: grid;
  place-items: center;
  cursor: pointer;
  position: relative;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 2px;
    width: ${(props) => (props.$running ? (props.$active ? "16px" : "6px") : "0")};
    height: 3px;
    border-radius: 2px;
    background: #0078d4;
    transition: all 0.2s ease;
  }
`;

const SystemTray = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #ffffff;
  height: 100%;

  .unified-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover,
    &.active {
      background: rgba(255, 255, 255, 0.1);
    }

    svg {
      font-size: 13px;
    }
  }

  .clock-box {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1.15;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover,
    &.active {
      background: rgba(255, 255, 255, 0.1);
    }

    .time {
      font-size: 11px;
      font-weight: 500;
    }

    .date {
      font-size: 9.5px;
      color: #94a3b8;
    }
  }

  .show-desktop-bar {
    width: 6px;
    height: 32px;
    margin-left: 2px;
    border-left: 1px solid rgba(255, 255, 255, 0.12);
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

// --- Jump List (Taskbar Icon Right Click) ---
const TaskbarContextMenu = styled.div`
  position: absolute;
  bottom: 56px;
  left: ${(props) => `${props.$left}px`};
  transform: translateX(-50%);
  width: 220px;
  background: rgba(30, 34, 42, 0.96);
  ${acrylicBlur};
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.75);
  padding: 6px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: ${contextMenuPop} 0.15s cubic-bezier(0.16, 1, 0.3, 1);

  .menu-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 10px;
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    margin-bottom: 3px;
  }

  button.menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px;
    border-radius: 4px;
    background: transparent;
    border: none;
    color: #cbd5e1;
    font-size: 12px;
    cursor: pointer;
    text-align: left;
    transition: all 0.12s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }

    &.danger {
      color: #f87171;
      &:hover {
        background: rgba(239, 68, 68, 0.25);
        color: #ffffff;
      }
    }

    svg {
      font-size: 13px;
    }
  }

  .divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
    margin: 3px 0;
  }
`;

// --- Desktop Context Menu (Right Click on Wallpaper) ---
const DesktopContextMenuPopup = styled.div`
  position: absolute;
  top: ${(props) => `${props.$top}px`};
  left: ${(props) => `${props.$left}px`};
  width: 220px;
  background: rgba(28, 32, 40, 0.96);
  ${acrylicBlur};
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.75);
  padding: 6px;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: ${contextMenuPop} 0.12s cubic-bezier(0.16, 1, 0.3, 1);

  button.menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px;
    border-radius: 4px;
    background: transparent;
    border: none;
    color: #cbd5e1;
    font-size: 12px;
    cursor: pointer;
    text-align: left;
    transition: all 0.12s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }

    svg {
      font-size: 13px;
      color: #94a3b8;
    }

    &:hover svg {
      color: #ffffff;
    }
  }

  .divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
    margin: 3px 0;
  }
`;

// --- Start Menu ---
const StartMenuPopup = styled.div`
  position: absolute;
  bottom: 56px;
  left: 50%;
  transform: translateX(-50%);
  width: 580px;
  max-width: calc(100vw - 20px);
  background: rgba(24, 27, 33, 0.96);
  ${acrylicBlur};
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
  padding: 22px 24px 16px 24px;
  z-index: 6000;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${menuSlideUp} 0.18s cubic-bezier(0.16, 1, 0.3, 1);

  .search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    height: 38px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #94a3b8;
    font-size: 12.5px;
    transition: all 0.15s ease;

    &:focus-within {
      background: rgba(255, 255, 255, 0.12);
      border-color: #0078d4;
      box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.25);
    }

    input {
      background: transparent;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 12.5px;
      width: 100%;
    }
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
  }

  .pinned-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    .pinned-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 4px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.15s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      .icon {
        width: 32px;
        height: 32px;
        display: grid;
        place-items: center;
      }

      span {
        font-size: 11px;
        color: #cbd5e1;
        text-align: center;
      }
    }
  }

  .recommended-list {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .rec-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.15s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      .rec-icon {
        width: 20px;
        height: 20px;
        display: grid;
        place-items: center;
      }

      .rec-info {
        display: flex;
        flex-direction: column;
        line-height: 1.25;

        strong {
          font-size: 12px;
          color: #ffffff;
        }

        small {
          font-size: 10.5px;
          color: #94a3b8;
        }
      }
    }
  }

  .footer-user {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      strong {
        font-size: 12px;
        color: #ffffff;
        display: block;
      }
      small {
        font-size: 10.5px;
        color: #94a3b8;
      }
    }

    .power-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      position: relative;

      button.power-btn {
        width: 36px;
        height: 36px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #f1f5f9;
        font-size: 15px;
        display: grid;
        place-items: center;
        cursor: pointer;
        transition: all 0.15s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.18);
        }
      }
    }
  }
`;

// --- Power Dropdown Menu ---
const PowerDropdown = styled.div`
  position: absolute;
  bottom: 46px;
  right: 0;
  width: 170px;
  background: rgba(30, 34, 42, 0.98);
  ${acrylicBlur};
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.75);
  padding: 6px;
  z-index: 7000;
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: ${contextMenuPop} 0.12s ease;

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 10px;
    border-radius: 4px;
    background: transparent;
    border: none;
    color: #cbd5e1;
    font-size: 12px;
    cursor: pointer;
    text-align: left;
    transition: all 0.12s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }

    &.shutdown {
      color: #f87171;
      &:hover {
        background: rgba(239, 68, 68, 0.25);
        color: #ffffff;
      }
    }
  }
`;

// --- Calendar & Clock Flyout ---
const CalendarFlyout = styled.div`
  position: absolute;
  bottom: 56px;
  right: 12px;
  width: 320px;
  background: rgba(28, 32, 40, 0.96);
  ${acrylicBlur};
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75);
  padding: 16px;
  z-index: 6000;
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: ${contextMenuPop} 0.15s cubic-bezier(0.16, 1, 0.3, 1);

  .clock-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 12px;

    .digital-time {
      font-size: 26px;
      font-weight: 300;
      color: #ffffff;
      letter-spacing: -0.5px;
    }

    .full-date {
      font-size: 12px;
      color: #0078d4;
      font-weight: 500;
      margin-top: 2px;
    }

    .timezone {
      font-size: 10.5px;
      color: #94a3b8;
      margin-top: 1px;
    }
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    text-align: center;

    .day-header {
      font-size: 10px;
      font-weight: 600;
      color: #94a3b8;
      padding: 4px 0;
    }

    .date-cell {
      height: 30px;
      display: grid;
      place-items: center;
      font-size: 11.5px;
      border-radius: 50%;
      cursor: pointer;
      color: #cbd5e1;
      transition: all 0.12s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      &.today {
        background: #0078d4;
        color: #ffffff;
        font-weight: 600;
      }

      &.dimmed {
        color: #475569;
      }
    }
  }

  .status-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: #94a3b8;

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
    }
  }
`;

// --- Quick Settings Flyout ---
const QuickSettingsFlyout = styled.div`
  position: absolute;
  bottom: 56px;
  right: 12px;
  width: 340px;
  background: rgba(28, 32, 40, 0.96);
  ${acrylicBlur};
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75);
  padding: 16px;
  z-index: 6000;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${contextMenuPop} 0.15s cubic-bezier(0.16, 1, 0.3, 1);

  .tiles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;

    .tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 12px 6px;
      border-radius: 8px;
      background: ${(props) =>
        props.$active ? "rgba(0, 120, 212, 0.3)" : "rgba(255, 255, 255, 0.06)"};
      border: 1px solid
        ${(props) =>
          props.$active ? "rgba(0, 120, 212, 0.6)" : "rgba(255, 255, 255, 0.1)"};
      color: ${(props) => (props.$active ? "#ffffff" : "#cbd5e1")};
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.12);
      }

      svg {
        font-size: 18px;
        color: ${(props) => (props.$active ? "#0078d4" : "#94a3b8")};
      }

      span {
        font-size: 10.5px;
        font-weight: 500;
      }
    }
  }

  .slider-row {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: #cbd5e1;

    input[type="range"] {
      flex: 1;
      accent-color: #0078d4;
      cursor: pointer;
    }

    span.value {
      font-size: 11px;
      width: 32px;
      text-align: right;
      color: #94a3b8;
    }
  }

  .battery-status {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11.5px;
    color: #cbd5e1;

    .battery-left {
      display: flex;
      align-items: center;
      gap: 8px;
      svg {
        color: #10b981;
        font-size: 16px;
      }
    }
  }
`;

// --- Notification Banner ---
const WinNotification = styled.div`
  position: absolute;
  bottom: 60px;
  right: 18px;
  width: 360px;
  max-width: calc(100vw - 36px);
  background: rgba(28, 32, 40, 0.96);
  ${acrylicBlur};
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.75);
  padding: 12px 14px;
  z-index: 7000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: ${fadeInFast} 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: #94a3b8;

    .app {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      color: #cbd5e1;
    }

    button.close {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 13px;
      display: grid;
      place-items: center;
      padding: 2px;
      &:hover {
        color: #ffffff;
      }
    }
  }

  .body {
    strong {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: #ffffff;
      margin-bottom: 3px;

      svg {
        color: #f87171;
      }
    }
    p {
      font-size: 11.5px;
      color: #cbd5e1;
      margin: 0;
      line-height: 1.45;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;

    button.primary {
      height: 28px;
      padding: 0 12px;
      border-radius: 4px;
      background: #0078d4;
      border: none;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s ease;
      &:hover {
        background: #1084d8;
      }
    }

    button.secondary {
      height: 28px;
      padding: 0 10px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #cbd5e1;
      font-size: 11.5px;
      cursor: pointer;
      &:hover {
        background: rgba(255, 255, 255, 0.15);
      }
    }
  }
`;

// --- Main Desktop Component ---
const Desktop = ({ onExitWorkstation, onRestartWorkstation, onLockScreen }) => {
  const [timeStr, setTimeStr] = useState("");
  const [timeWithSeconds, setTimeWithSeconds] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [fullDateStr, setFullDateStr] = useState("");
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  // Popups & Flyout states
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskbarMenu, setTaskbarMenu] = useState(null);
  const [desktopMenu, setDesktopMenu] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [powerMenuOpen, setPowerMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  // Quick settings toggles
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [nightLightEnabled, setNightLightEnabled] = useState(false);
  const [volume, setVolume] = useState(80);

  // Window states: 14 authentic applications
  const [windows, setWindows] = useState({
    vscode: { open: true, minimized: false, maximized: false, zIndex: 100 },
    terminal: { open: false, minimized: false, maximized: false, zIndex: 90 },
    resume: { open: false, minimized: false, maximized: false, zIndex: 90 },
    architecture: { open: false, minimized: false, maximized: false, zIndex: 90 },
    minesweeper: { open: false, minimized: false, maximized: false, zIndex: 90 },
    calculator: { open: false, minimized: false, maximized: false, zIndex: 90 },
    notepad: { open: false, minimized: false, maximized: false, zIndex: 90 },
    explorer: { open: false, minimized: false, maximized: false, zIndex: 90 },
    solitaire: { open: false, minimized: false, maximized: false, zIndex: 90 },
    paint: { open: false, minimized: false, maximized: false, zIndex: 90 },
    taskmgr: { open: false, minimized: false, maximized: false, zIndex: 90 },
    edge: { open: false, minimized: false, maximized: false, zIndex: 90 },
    settings: { open: false, minimized: false, maximized: false, zIndex: 90 },
  });

  const topZRef = useRef(101);

  // DOM Refs for Outside Click detection
  const taskbarMenuRef = useRef(null);
  const desktopMenuRef = useRef(null);
  const startMenuRef = useRef(null);
  const startBtnRef = useRef(null);
  const calendarRef = useRef(null);
  const clockBtnRef = useRef(null);
  const quickSettingsRef = useRef(null);
  const trayBtnRef = useRef(null);
  const powerMenuRef = useRef(null);
  const powerBtnRef = useRef(null);

  // Live Colombo Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      setTimeStr(`${formattedHours}:${formattedMinutes} ${ampm}`);
      setTimeWithSeconds(
        `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`
      );

      const day = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      setDateStr(`${day}/${month}/${year}`);

      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      setFullDateStr(
        `${daysOfWeek[now.getDay()]}, ${day} ${monthsOfYear[now.getMonth()]} ${year}`
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Global Outside Click & Escape Key Capture ---
  useEffect(() => {
    const handleGlobalPointerDown = (e) => {
      if (
        taskbarMenuRef.current &&
        !taskbarMenuRef.current.contains(e.target)
      ) {
        setTaskbarMenu(null);
      }

      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(e.target)
      ) {
        setDesktopMenu(null);
      }

      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(e.target) &&
        !startBtnRef.current?.contains(e.target)
      ) {
        setStartMenuOpen(false);
        setPowerMenuOpen(false);
      }

      if (
        powerMenuRef.current &&
        !powerMenuRef.current.contains(e.target) &&
        !powerBtnRef.current?.contains(e.target)
      ) {
        setPowerMenuOpen(false);
      }

      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        !clockBtnRef.current?.contains(e.target)
      ) {
        setCalendarOpen(false);
      }

      if (
        quickSettingsRef.current &&
        !quickSettingsRef.current.contains(e.target) &&
        !trayBtnRef.current?.contains(e.target)
      ) {
        setQuickSettingsOpen(false);
      }
    };

    const handleGlobalKeyDown = (e) => {
      if (e.key === "Escape") {
        if (
          taskbarMenu ||
          desktopMenu ||
          startMenuOpen ||
          calendarOpen ||
          quickSettingsOpen ||
          powerMenuOpen
        ) {
          e.preventDefault();
          e.stopPropagation();
          setTaskbarMenu(null);
          setDesktopMenu(null);
          setStartMenuOpen(false);
          setCalendarOpen(false);
          setQuickSettingsOpen(false);
          setPowerMenuOpen(false);
        }
      }
    };

    window.addEventListener("pointerdown", handleGlobalPointerDown, true);
    window.addEventListener("keydown", handleGlobalKeyDown, true);

    return () => {
      window.removeEventListener("pointerdown", handleGlobalPointerDown, true);
      window.removeEventListener("keydown", handleGlobalKeyDown, true);
    };
  }, [
    taskbarMenu,
    desktopMenu,
    startMenuOpen,
    calendarOpen,
    quickSettingsOpen,
    powerMenuOpen,
  ]);

  // Window Management Actions
  const bringToFront = useCallback((appKey) => {
    topZRef.current += 1;
    const nextZ = topZRef.current;
    setWindows((prev) => ({
      ...prev,
      [appKey]: {
        ...prev[appKey],
        open: true,
        minimized: false,
        zIndex: nextZ,
      },
    }));
  }, []);

  const closeWindow = useCallback((appKey) => {
    setWindows((prev) => ({
      ...prev,
      [appKey]: { ...prev[appKey], open: false, minimized: false },
    }));
  }, []);

  const minimizeWindow = useCallback((appKey) => {
    setWindows((prev) => ({
      ...prev,
      [appKey]: { ...prev[appKey], minimized: true },
    }));
  }, []);

  const toggleMaximize = useCallback((appKey) => {
    setWindows((prev) => ({
      ...prev,
      [appKey]: { ...prev[appKey], maximized: !prev[appKey].maximized },
    }));
  }, []);

  // Show Desktop
  const toggleShowDesktop = useCallback(() => {
    const hasVisibleWindow = Object.values(windows).some(
      (w) => w.open && !w.minimized
    );

    setWindows((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        if (next[key].open) {
          next[key] = {
            ...next[key],
            minimized: hasVisibleWindow,
          };
        }
      });
      return next;
    });
  }, [windows]);

  // Taskbar Icon Click Handler
  const handleTaskbarIconClick = (appKey) => {
    setTaskbarMenu(null);
    setStartMenuOpen(false);

    const win = windows[appKey];
    if (!win.open) {
      bringToFront(appKey);
      return;
    }

    if (win.minimized) {
      bringToFront(appKey);
      return;
    }

    const isTop = win.zIndex === topZRef.current;
    if (isTop) {
      minimizeWindow(appKey);
    } else {
      bringToFront(appKey);
    }
  };

  // Taskbar Right-Click Jump List Handler
  const handleTaskbarContextMenu = (e, appKey, title, icon) => {
    e.preventDefault();
    e.stopPropagation();
    setDesktopMenu(null);
    setStartMenuOpen(false);

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    setTaskbarMenu({
      appKey,
      left: Math.max(115, Math.min(centerX, window.innerWidth - 120)),
      title,
      icon,
    });
  };

  // Desktop Wallpaper Right-Click Menu Handler
  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTaskbarMenu(null);
    setStartMenuOpen(false);

    const menuW = 220;
    const menuH = 340;
    const clickX = e.clientX;
    const clickY = e.clientY;

    const posX = Math.max(10, Math.min(clickX, window.innerWidth - menuW - 10));
    const posY = Math.max(10, Math.min(clickY, window.innerHeight - menuH - 55));

    setDesktopMenu({ x: posX, y: posY });
  };

  const handleRefreshDesktop = () => {
    setIsRefreshing(true);
    setDesktopMenu(null);
    setTimeout(() => setIsRefreshing(false), 250);
  };

  const handleCycleWallpaper = () => {
    setWallpaperIndex((prev) => (prev + 1) % WALLPAPERS.length);
    setDesktopMenu(null);
  };

  // All 14 Applications Registry
  const allApps = [
    {
      key: "explorer",
      name: "File Explorer",
      icon: <Win11ExplorerIcon size={24} />,
      desc: "This PC & Local Disks",
    },
    {
      key: "edge",
      name: "Microsoft Edge",
      icon: <Win11EdgeIcon size={24} />,
      desc: "Internet Browser & Portfolio",
    },
    {
      key: "vscode",
      name: "Visual Studio Code",
      icon: <Win11VSCodeIcon size={24} />,
      desc: "C# IDE & Incident Triage",
    },
    {
      key: "terminal",
      name: "PowerShell",
      icon: <Win11TerminalIcon size={24} />,
      desc: "Windows PowerShell Core",
    },
    {
      key: "solitaire",
      name: "Solitaire Collection",
      icon: <Win11SolitaireIcon size={24} />,
      desc: "Classic Klondike Solitaire",
    },
    {
      key: "minesweeper",
      name: "Minesweeper",
      icon: <Win11MinesweeperIcon size={24} />,
      desc: "Classic Windows Strategy Game",
    },
    {
      key: "paint",
      name: "Paint",
      icon: <Win11PaintIcon size={24} />,
      desc: "Draw & Edit Images",
    },
    {
      key: "calculator",
      name: "Calculator",
      icon: <Win11CalculatorIcon size={24} />,
      desc: "Standard Arithmetic Calculator",
    },
    {
      key: "notepad",
      name: "Notepad",
      icon: <Win11NotepadIcon size={24} />,
      desc: "Incident Log & Text Editor",
    },
    {
      key: "taskmgr",
      name: "Task Manager",
      icon: <Win11TaskManagerIcon size={24} />,
      desc: "System Performance & Processes",
    },
    {
      key: "settings",
      name: "Settings",
      icon: <Win11SettingsIcon size={24} />,
      desc: "Device Specs & Personalization",
    },
    {
      key: "resume",
      name: "Resume PDF",
      icon: <Win11PdfIcon size={24} />,
      desc: "Yohan Pasi CV",
    },
    {
      key: "architecture",
      name: "Clean Architecture",
      icon: <FiLayers style={{ color: "#0ea5e9", fontSize: "20px" }} />,
      desc: "System Specification",
    },
  ];

  const filteredApps = searchQuery.trim()
    ? allApps.filter((a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allApps;

  const PINNED_TASKBAR_KEYS = [
    "explorer",
    "edge",
    "vscode",
    "terminal",
    "solitaire",
    "paint",
  ];
  const extraOpenKeys = Object.keys(windows).filter(
    (k) => windows[k]?.open && !PINNED_TASKBAR_KEYS.includes(k)
  );
  const taskbarAppKeys = [...PINNED_TASKBAR_KEYS, ...extraOpenKeys];

  return (
    <DesktopContainer
      $bg={WALLPAPERS[wallpaperIndex].bg}
      onContextMenu={handleDesktopContextMenu}
      onClick={() => setSelectedIcon(null)}
    >
      {/* Clean Desktop Surface - Only authentic Windows default icons */}
      <DesktopSurface>
        <DesktopIconsGrid $refreshing={isRefreshing}>
          <DesktopIcon
            $selected={selectedIcon === "bin"}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon("bin");
            }}
            title="Recycle Bin (Empty)"
          >
            <div className="icon-wrapper">
              <Win11RecycleBinIcon size={40} />
            </div>
            <span className="label">Recycle Bin</span>
          </DesktopIcon>

          <DesktopIcon
            $selected={selectedIcon === "explorer"}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon("explorer");
            }}
            onDoubleClick={() => bringToFront("explorer")}
            title="Double-click to open This PC"
          >
            <div className="icon-wrapper">
              <Win11ThisPCIcon size={40} />
            </div>
            <span className="label">This PC</span>
          </DesktopIcon>

          <DesktopIcon
            $selected={selectedIcon === "edge"}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon("edge");
            }}
            onDoubleClick={() => bringToFront("edge")}
            title="Double-click to open Microsoft Edge"
          >
            <div className="icon-wrapper">
              <Win11EdgeIcon size={40} />
            </div>
            <span className="label">Microsoft Edge</span>
          </DesktopIcon>

          <DesktopIcon
            $selected={selectedIcon === "vscode"}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon("vscode");
            }}
            onDoubleClick={() => bringToFront("vscode")}
            title="Double-click to open Visual Studio Code"
          >
            <div className="icon-wrapper">
              <Win11SolutionIcon size={40} />
            </div>
            <span className="label">Portfolio.sln</span>
          </DesktopIcon>

          <DesktopIcon
            $selected={selectedIcon === "notepad"}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon("notepad");
            }}
            onDoubleClick={() => bringToFront("notepad")}
            title="Double-click to open Incident Notes"
          >
            <div className="icon-wrapper">
              <Win11TextDocIcon size={40} />
            </div>
            <span className="label">Incident_Log.txt</span>
          </DesktopIcon>
        </DesktopIconsGrid>

        {/* Windows Rendering Containers */}
        {windows.explorer.open && (
          <DraggableWindow
            appKey="explorer"
            zIndex={windows.explorer.zIndex}
            minimized={windows.explorer.minimized}
            maximized={windows.explorer.maximized}
            initialPos={{ x: 140, y: 35, width: 800, height: 520 }}
            onFocus={bringToFront}
          >
            <FileExplorerApp
              onClose={() => closeWindow("explorer")}
              onMinimize={() => minimizeWindow("explorer")}
              isMaximized={windows.explorer.maximized}
              onToggleMaximize={() => toggleMaximize("explorer")}
              onLaunchApp={(key) => bringToFront(key)}
            />
          </DraggableWindow>
        )}

        {windows.edge.open && (
          <DraggableWindow
            appKey="edge"
            zIndex={windows.edge.zIndex}
            minimized={windows.edge.minimized}
            maximized={windows.edge.maximized}
            initialPos={{ x: 100, y: 25, width: 900, height: 590 }}
            onFocus={bringToFront}
          >
            <EdgeBrowserApp
              onClose={() => closeWindow("edge")}
              onMinimize={() => minimizeWindow("edge")}
              isMaximized={windows.edge.maximized}
              onToggleMaximize={() => toggleMaximize("edge")}
              onLaunchApp={(key) => bringToFront(key)}
            />
          </DraggableWindow>
        )}

        {windows.vscode.open && (
          <DraggableWindow
            appKey="vscode"
            zIndex={windows.vscode.zIndex}
            minimized={windows.vscode.minimized}
            maximized={windows.vscode.maximized}
            initialPos={{ x: 120, y: 30, width: 880, height: 580 }}
            onFocus={bringToFront}
          >
            <VSCodeApp
              onClose={() => closeWindow("vscode")}
              onMinimize={() => minimizeWindow("vscode")}
              isMaximized={windows.vscode.maximized}
              onToggleMaximize={() => toggleMaximize("vscode")}
            />
          </DraggableWindow>
        )}

        {windows.terminal.open && (
          <DraggableWindow
            appKey="terminal"
            zIndex={windows.terminal.zIndex}
            minimized={windows.terminal.minimized}
            maximized={windows.terminal.maximized}
            initialPos={{ x: 180, y: 70, width: 720, height: 460 }}
            onFocus={bringToFront}
          >
            <TerminalApp
              onClose={() => closeWindow("terminal")}
              onMinimize={() => minimizeWindow("terminal")}
              isMaximized={windows.terminal.maximized}
              onToggleMaximize={() => toggleMaximize("terminal")}
            />
          </DraggableWindow>
        )}

        {windows.solitaire.open && (
          <DraggableWindow
            appKey="solitaire"
            zIndex={windows.solitaire.zIndex}
            minimized={windows.solitaire.minimized}
            maximized={windows.solitaire.maximized}
            initialPos={{ x: 180, y: 40, width: 800, height: 580 }}
            onFocus={bringToFront}
          >
            <SolitaireApp
              onClose={() => closeWindow("solitaire")}
              onMinimize={() => minimizeWindow("solitaire")}
              isMaximized={windows.solitaire.maximized}
              onToggleMaximize={() => toggleMaximize("solitaire")}
            />
          </DraggableWindow>
        )}

        {windows.minesweeper.open && (
          <DraggableWindow
            appKey="minesweeper"
            zIndex={windows.minesweeper.zIndex}
            minimized={windows.minesweeper.minimized}
            maximized={windows.minesweeper.maximized}
            initialPos={{ x: 260, y: 60, width: 440, height: 540 }}
            onFocus={bringToFront}
          >
            <MinesweeperApp
              onClose={() => closeWindow("minesweeper")}
              onMinimize={() => minimizeWindow("minesweeper")}
              isMaximized={windows.minesweeper.maximized}
              onToggleMaximize={() => toggleMaximize("minesweeper")}
            />
          </DraggableWindow>
        )}

        {windows.paint.open && (
          <DraggableWindow
            appKey="paint"
            zIndex={windows.paint.zIndex}
            minimized={windows.paint.minimized}
            maximized={windows.paint.maximized}
            initialPos={{ x: 160, y: 35, width: 840, height: 580 }}
            onFocus={bringToFront}
          >
            <PaintApp
              onClose={() => closeWindow("paint")}
              onMinimize={() => minimizeWindow("paint")}
              isMaximized={windows.paint.maximized}
              onToggleMaximize={() => toggleMaximize("paint")}
            />
          </DraggableWindow>
        )}

        {windows.taskmgr.open && (
          <DraggableWindow
            appKey="taskmgr"
            zIndex={windows.taskmgr.zIndex}
            minimized={windows.taskmgr.minimized}
            maximized={windows.taskmgr.maximized}
            initialPos={{ x: 190, y: 45, width: 780, height: 520 }}
            onFocus={bringToFront}
          >
            <TaskManagerApp
              onClose={() => closeWindow("taskmgr")}
              onMinimize={() => minimizeWindow("taskmgr")}
              isMaximized={windows.taskmgr.maximized}
              onToggleMaximize={() => toggleMaximize("taskmgr")}
              onKillProcess={(key) => closeWindow(key)}
            />
          </DraggableWindow>
        )}

        {windows.calculator.open && (
          <DraggableWindow
            appKey="calculator"
            zIndex={windows.calculator.zIndex}
            minimized={windows.calculator.minimized}
            maximized={windows.calculator.maximized}
            initialPos={{ x: 280, y: 80, width: 340, height: 480 }}
            onFocus={bringToFront}
          >
            <CalculatorApp
              onClose={() => closeWindow("calculator")}
              onMinimize={() => minimizeWindow("calculator")}
              isMaximized={windows.calculator.maximized}
              onToggleMaximize={() => toggleMaximize("calculator")}
            />
          </DraggableWindow>
        )}

        {windows.notepad.open && (
          <DraggableWindow
            appKey="notepad"
            zIndex={windows.notepad.zIndex}
            minimized={windows.notepad.minimized}
            maximized={windows.notepad.maximized}
            initialPos={{ x: 200, y: 50, width: 680, height: 480 }}
            onFocus={bringToFront}
          >
            <NotepadApp
              onClose={() => closeWindow("notepad")}
              onMinimize={() => minimizeWindow("notepad")}
              isMaximized={windows.notepad.maximized}
              onToggleMaximize={() => toggleMaximize("notepad")}
            />
          </DraggableWindow>
        )}

        {windows.settings.open && (
          <DraggableWindow
            appKey="settings"
            zIndex={windows.settings.zIndex}
            minimized={windows.settings.minimized}
            maximized={windows.settings.maximized}
            initialPos={{ x: 160, y: 40, width: 780, height: 520 }}
            onFocus={bringToFront}
          >
            <SettingsApp
              onClose={() => closeWindow("settings")}
              onMinimize={() => minimizeWindow("settings")}
              isMaximized={windows.settings.maximized}
              onToggleMaximize={() => toggleMaximize("settings")}
              onCycleWallpaper={handleCycleWallpaper}
            />
          </DraggableWindow>
        )}

        {windows.resume.open && (
          <DraggableWindow
            appKey="resume"
            zIndex={windows.resume.zIndex}
            minimized={windows.resume.minimized}
            maximized={windows.resume.maximized}
            initialPos={{ x: 200, y: 40, width: 780, height: 600 }}
            onFocus={bringToFront}
          >
            <ResumeApp
              onClose={() => closeWindow("resume")}
              onMinimize={() => minimizeWindow("resume")}
              isMaximized={windows.resume.maximized}
              onToggleMaximize={() => toggleMaximize("resume")}
            />
          </DraggableWindow>
        )}

        {windows.architecture.open && (
          <DraggableWindow
            appKey="architecture"
            zIndex={windows.architecture.zIndex}
            minimized={windows.architecture.minimized}
            maximized={windows.architecture.maximized}
            initialPos={{ x: 160, y: 50, width: 840, height: 540 }}
            onFocus={bringToFront}
          >
            <ArchitectureApp
              onClose={() => closeWindow("architecture")}
              onMinimize={() => minimizeWindow("architecture")}
              isMaximized={windows.architecture.maximized}
              onToggleMaximize={() => toggleMaximize("architecture")}
            />
          </DraggableWindow>
        )}

        {/* Windows 11 Action Center Notification Banner */}
        {showNotification && (
          <WinNotification>
            <div className="header">
              <div className="app">
                <Win11VSCodeIcon size={14} />
                <span>Visual Studio • Diagnostics</span>
              </div>
              <button
                type="button"
                className="close"
                onClick={() => setShowNotification(false)}
                title="Dismiss notification"
              >
                <FiX />
              </button>
            </div>
            <div className="body">
              <strong>
                <FiAlertTriangle /> Security Hotfix Required
              </strong>
              <p>
                1 test failed in CleanArchitecture.Security. Constant-time
                comparison required in TokenSecurityService.cs.
              </p>
            </div>
            <div className="actions">
              <button
                type="button"
                className="primary"
                onClick={() => {
                  bringToFront("vscode");
                  setShowNotification(false);
                }}
              >
                Open in VS Code
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => setShowNotification(false)}
              >
                Dismiss
              </button>
            </div>
          </WinNotification>
        )}
      </DesktopSurface>

      {/* Windows 11 Desktop Context Menu (Right Click on Wallpaper) */}
      {desktopMenu && (
        <DesktopContextMenuPopup
          ref={desktopMenuRef}
          $left={desktopMenu.x}
          $top={desktopMenu.y}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="menu-item"
            onClick={handleRefreshDesktop}
          >
            <FiRefreshCw /> Refresh
          </button>

          <div className="divider" />

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              bringToFront("explorer");
              setDesktopMenu(null);
            }}
          >
            <Win11ExplorerIcon size={14} /> File Explorer
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              bringToFront("edge");
              setDesktopMenu(null);
            }}
          >
            <Win11EdgeIcon size={14} /> Microsoft Edge
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              bringToFront("vscode");
              setDesktopMenu(null);
            }}
          >
            <Win11VSCodeIcon size={14} /> Visual Studio Code
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              bringToFront("terminal");
              setDesktopMenu(null);
            }}
          >
            <Win11TerminalIcon size={14} /> Windows Terminal
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              bringToFront("solitaire");
              setDesktopMenu(null);
            }}
          >
            <Win11SolitaireIcon size={14} /> Solitaire Collection
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              bringToFront("minesweeper");
              setDesktopMenu(null);
            }}
          >
            <Win11MinesweeperIcon size={14} /> Minesweeper
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              bringToFront("paint");
              setDesktopMenu(null);
            }}
          >
            <Win11PaintIcon size={14} /> Paint
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              bringToFront("calculator");
              setDesktopMenu(null);
            }}
          >
            <Win11CalculatorIcon size={14} /> Calculator
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              bringToFront("notepad");
              setDesktopMenu(null);
            }}
          >
            <Win11NotepadIcon size={14} /> Notepad
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              bringToFront("taskmgr");
              setDesktopMenu(null);
            }}
          >
            <Win11TaskManagerIcon size={14} /> Task Manager
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              bringToFront("settings");
              setDesktopMenu(null);
            }}
          >
            <Win11SettingsIcon size={14} /> Settings
          </button>

          <div className="divider" />

          <button
            type="button"
            className="menu-item"
            onClick={() => {
              toggleShowDesktop();
              setDesktopMenu(null);
            }}
          >
            <FiMonitor /> Show Desktop
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={handleCycleWallpaper}
            title="Switch Windows 11 Desktop Wallpaper"
          >
            <FiMoon /> Personalize Wallpaper
          </button>
        </DesktopContextMenuPopup>
      )}

      {/* Windows 11 Start Menu Popup */}
      {startMenuOpen && (
        <StartMenuPopup ref={startMenuRef} onClick={(e) => e.stopPropagation()}>
          <div className="search-bar">
            <FiSearch />
            <input
              type="text"
              placeholder="Search apps, games, settings, files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filteredApps.length > 0) {
                  bringToFront(filteredApps[0].key);
                  setStartMenuOpen(false);
                }
              }}
              autoFocus
            />
          </div>

          <div className="section-header">
            <span>Pinned</span>
            <span style={{ fontSize: "11px", color: "#38bdf8", cursor: "pointer" }}>
              All apps &gt;
            </span>
          </div>

          <div className="pinned-grid">
            {filteredApps.map((app) => (
              <div
                key={app.key}
                className="pinned-item"
                onClick={() => {
                  bringToFront(app.key);
                  setStartMenuOpen(false);
                }}
              >
                <div className="icon">{app.icon}</div>
                <span>{app.name}</span>
              </div>
            ))}
          </div>

          <div className="section-header" style={{ marginTop: "4px" }}>
            <span>Recommended</span>
          </div>

          <div className="recommended-list">
            <div
              className="rec-item"
              onClick={() => {
                bringToFront("solitaire");
                setStartMenuOpen(false);
              }}
            >
              <div className="rec-icon">
                <Win11SolitaireIcon size={20} />
              </div>
              <div className="rec-info">
                <strong>Solitaire Collection</strong>
                <small>Classic Klondike Card Game</small>
              </div>
            </div>

            <div
              className="rec-item"
              onClick={() => {
                bringToFront("vscode");
                setStartMenuOpen(false);
              }}
            >
              <div className="rec-icon">
                <Win11VSCodeIcon size={20} />
              </div>
              <div className="rec-info">
                <strong>TokenSecurityService.cs</strong>
                <small>CleanArchitecture.Security • Security Hotfix</small>
              </div>
            </div>

            <div
              className="rec-item"
              onClick={() => {
                bringToFront("edge");
                setStartMenuOpen(false);
              }}
            >
              <div className="rec-icon">
                <Win11EdgeIcon size={20} />
              </div>
              <div className="rec-info">
                <strong>Yohan Pasi Portfolio Overview</strong>
                <small>Microsoft Edge • https://yohan.me</small>
              </div>
            </div>
          </div>

          <div className="footer-user">
            <div className="user-info">
              <img src={HeroImg} alt={Bio.name} />
              <div>
                <strong>{Bio.name}</strong>
                <small>Administrator</small>
              </div>
            </div>

            <div className="power-actions">
              <button
                ref={powerBtnRef}
                type="button"
                className="power-btn"
                onClick={() => setPowerMenuOpen((p) => !p)}
                title="Power options"
              >
                <FiPower />
              </button>

              {powerMenuOpen && (
                <PowerDropdown
                  ref={powerMenuRef}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setPowerMenuOpen(false);
                      setStartMenuOpen(false);
                      if (onLockScreen) onLockScreen();
                    }}
                  >
                    <FiLock /> Lock Screen
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPowerMenuOpen(false);
                      setStartMenuOpen(false);
                      if (onRestartWorkstation) onRestartWorkstation();
                    }}
                  >
                    <FiRefreshCw /> Restart
                  </button>
                  <button
                    type="button"
                    className="shutdown"
                    onClick={() => {
                      setPowerMenuOpen(false);
                      setStartMenuOpen(false);
                      if (onExitWorkstation) onExitWorkstation();
                    }}
                  >
                    <FiPower /> Shut Down / Exit
                  </button>
                </PowerDropdown>
              )}
            </div>
          </div>
        </StartMenuPopup>
      )}

      {/* Windows 11 Taskbar Context Menu (Jump List on Right-Click) */}
      {taskbarMenu && (
        <TaskbarContextMenu
          ref={taskbarMenuRef}
          $left={taskbarMenu.left}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="menu-header">
            {taskbarMenu.icon}
            <span>{taskbarMenu.title}</span>
          </div>

          {windows[taskbarMenu.appKey]?.open ? (
            <>
              {windows[taskbarMenu.appKey]?.minimized ? (
                <button
                  type="button"
                  className="menu-item"
                  onClick={() => {
                    bringToFront(taskbarMenu.appKey);
                    setTaskbarMenu(null);
                  }}
                >
                  <FiMaximize2 /> Restore window
                </button>
              ) : (
                <button
                  type="button"
                  className="menu-item"
                  onClick={() => {
                    minimizeWindow(taskbarMenu.appKey);
                    setTaskbarMenu(null);
                  }}
                >
                  <FiMinus /> Minimize window
                </button>
              )}

              <button
                type="button"
                className="menu-item"
                onClick={() => {
                  toggleMaximize(taskbarMenu.appKey);
                  setTaskbarMenu(null);
                }}
              >
                <FiMaximize2 />
                {windows[taskbarMenu.appKey]?.maximized
                  ? "Restore Down"
                  : "Maximize"}
              </button>

              <div className="divider" />

              <button
                type="button"
                className="menu-item danger"
                onClick={() => {
                  closeWindow(taskbarMenu.appKey);
                  setTaskbarMenu(null);
                }}
              >
                <FiX /> Close window
              </button>
            </>
          ) : (
            <button
              type="button"
              className="menu-item"
              onClick={() => {
                bringToFront(taskbarMenu.appKey);
                setTaskbarMenu(null);
              }}
            >
              <FiPlay /> Open window
            </button>
          )}
        </TaskbarContextMenu>
      )}

      {/* Calendar & Clock Flyout */}
      {calendarOpen && (
        <CalendarFlyout ref={calendarRef} onClick={(e) => e.stopPropagation()}>
          <div className="clock-header">
            <div className="digital-time">{timeWithSeconds}</div>
            <div className="full-date">{fullDateStr}</div>
            <div className="timezone">Colombo, Sri Lanka (GMT+5:30)</div>
          </div>

          <div className="calendar-grid">
            <span className="day-header">Su</span>
            <span className="day-header">Mo</span>
            <span className="day-header">Tu</span>
            <span className="day-header">We</span>
            <span className="day-header">Th</span>
            <span className="day-header">Fr</span>
            <span className="day-header">Sa</span>

            <span className="date-cell dimmed">27</span>
            <span className="date-cell dimmed">28</span>
            <span className="date-cell dimmed">29</span>
            <span className="date-cell dimmed">30</span>
            <span className="date-cell">1</span>
            <span className="date-cell">2</span>
            <span className="date-cell">3</span>
            <span className="date-cell">4</span>
            <span className="date-cell">5</span>
            <span className="date-cell">6</span>
            <span className="date-cell">7</span>
            <span className="date-cell">8</span>
            <span className="date-cell">9</span>
            <span className="date-cell">10</span>
            <span className="date-cell">11</span>
            <span className="date-cell">12</span>
            <span className="date-cell">13</span>
            <span className="date-cell">14</span>
            <span className="date-cell">15</span>
            <span className="date-cell">16</span>
            <span className="date-cell">17</span>
            <span className="date-cell">18</span>
            <span className="date-cell">19</span>
            <span className="date-cell">20</span>
            <span className="date-cell">21</span>
            <span className="date-cell">22</span>
            <span className="date-cell">23</span>
            <span className="date-cell">24</span>
            <span className="date-cell">25</span>
            <span className="date-cell">26</span>
            <span className="date-cell">27</span>
            <span className="date-cell today">28</span>
            <span className="date-cell">29</span>
            <span className="date-cell">30</span>
            <span className="date-cell">31</span>
          </div>

          <div className="status-footer">
            <div className="dot" />
            <span>Windows 11 Enterprise Workstation • All Systems Operational</span>
          </div>
        </CalendarFlyout>
      )}

      {/* Quick Settings Flyout */}
      {quickSettingsOpen && (
        <QuickSettingsFlyout
          ref={quickSettingsRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="tiles-grid">
            <button
              type="button"
              className="tile"
              $active={wifiEnabled}
              onClick={() => setWifiEnabled((w) => !w)}
            >
              <FiWifi />
              <span>{wifiEnabled ? "Wi-Fi 6E" : "Wi-Fi Off"}</span>
            </button>

            <button
              type="button"
              className="tile"
              $active={bluetoothEnabled}
              onClick={() => setBluetoothEnabled((b) => !b)}
            >
              <FiBluetooth />
              <span>{bluetoothEnabled ? "Bluetooth" : "Off"}</span>
            </button>

            <button
              type="button"
              className="tile"
              $active={nightLightEnabled}
              onClick={() => setNightLightEnabled((n) => !n)}
            >
              <FiMoon />
              <span>Night light</span>
            </button>
          </div>

          <div className="slider-row">
            {volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
            <span className="value">{volume}%</span>
          </div>

          <div className="battery-status">
            <div className="battery-left">
              <FiBatteryCharging />
              <span>100% Fully Charged</span>
            </div>
            <small style={{ color: "#94a3b8" }}>Plugged in</small>
          </div>
        </QuickSettingsFlyout>
      )}

      {/* Windows 11 Taskbar with Weather on Left, Centered Apps, System Tray on Right */}
      <Taskbar
        onContextMenu={(e) => {
          e.preventDefault();
          toggleShowDesktop();
        }}
      >
        {/* Weather Widget on Far-Left */}
        <Win11WeatherWidget />

        {/* Centered Taskbar Icons */}
        <TaskbarCenter>
          <TaskbarBtn
            ref={startBtnRef}
            className="win-start"
            $active={startMenuOpen}
            onClick={() => {
              setTaskbarMenu(null);
              setStartMenuOpen((o) => !o);
            }}
            title="Start"
          >
            <Win11StartIcon size={20} />
          </TaskbarBtn>

          {/* Search Pill */}
          <SearchPill onClick={() => setStartMenuOpen(true)}>
            <FiSearch />
            <span>Search</span>
          </SearchPill>

          {/* Pinned & Running Taskbar Applications */}
          {taskbarAppKeys.map((key) => {
            const app = allApps.find((a) => a.key === key);
            if (!app) return null;
            const isRunning = windows[key]?.open;
            const isActive = isRunning && !windows[key]?.minimized;
            return (
              <TaskbarBtn
                key={key}
                $running={isRunning}
                $active={isActive}
                onClick={() => handleTaskbarIconClick(key)}
                onContextMenu={(e) =>
                  handleTaskbarContextMenu(e, key, app.name, app.icon)
                }
                title={`${app.name} (Right-click for Jump List)`}
              >
                {app.icon}
              </TaskbarBtn>
            );
          })}
        </TaskbarCenter>

        {/* System Tray */}
        <SystemTray>
          <div
            ref={trayBtnRef}
            className={`unified-pill ${quickSettingsOpen ? "active" : ""}`}
            onClick={() => {
              setCalendarOpen(false);
              setQuickSettingsOpen((q) => !q);
            }}
            title="Internet, Sound, Battery"
          >
            {wifiEnabled ? <FiWifi /> : <span style={{ opacity: 0.5 }}>✕</span>}
            {volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
            <FiBatteryCharging />
          </div>

          <div
            ref={clockBtnRef}
            className={`clock-box ${calendarOpen ? "active" : ""}`}
            onClick={() => {
              setQuickSettingsOpen(false);
              setCalendarOpen((c) => !c);
            }}
            title={`Colombo Local Time: ${timeStr} - ${dateStr} (Click to open Calendar)`}
          >
            <div className="time">{timeStr || "12:00 PM"}</div>
            <div className="date">{dateStr || "28/10/2026"}</div>
          </div>

          {/* Show Desktop Sliver */}
          <div
            className="show-desktop-bar"
            onClick={toggleShowDesktop}
            title="Show desktop"
          />
        </SystemTray>
      </Taskbar>
    </DesktopContainer>
  );
};

export default Desktop;
