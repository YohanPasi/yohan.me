import styled, { css, keyframes } from "styled-components";
import { fonts } from "../../utils/palette";

// Windows 11 Mica, Acrylic & Shell Palette
export const win11 = {
  bgDark: "#0b0f19",
  taskbarBg: "rgba(22, 27, 34, 0.82)",
  taskbarBorder: "rgba(255, 255, 255, 0.08)",
  windowBg: "rgba(24, 27, 33, 0.96)",
  windowHeader: "rgba(30, 34, 42, 0.98)",
  windowBorder: "rgba(255, 255, 255, 0.12)",
  cardBg: "rgba(255, 255, 255, 0.04)",
  cardHover: "rgba(255, 255, 255, 0.08)",
  accent: "#0078d4",
  accentHover: "#1084d8",
  accentGlow: "rgba(0, 120, 212, 0.35)",
  dotnet: "#512bd4",
  angular: "#dd0031",
  success: "#107c41",
  error: "#d13438",
  textPrimary: "#ffffff",
  textSecondary: "#cccccc",
  textMuted: "#8a8a8a",
};

// Fluent Acrylic Blur
export const acrylicBlur = css`
  backdrop-filter: blur(40px) saturate(130%);
  -webkit-backdrop-filter: blur(40px) saturate(130%);
`;

// Windows 11 Official Progress Ring Animation
const win11Spin = keyframes`
  0% {
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }
  50% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  100% {
    transform: rotate(720deg);
  }
`;

export const BootRing = styled.div`
  width: 42px;
  height: 42px;
  position: relative;
  display: inline-block;

  .dot {
    position: absolute;
    width: 100%;
    height: 100%;
    animation: ${win11Spin} 3.6s infinite;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: calc(50% - 2px);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #0078d4;
    }

    &:nth-child(1) { animation-delay: 0.15s; }
    &:nth-child(2) { animation-delay: 0.30s; }
    &:nth-child(3) { animation-delay: 0.45s; }
    &:nth-child(4) { animation-delay: 0.60s; }
    &:nth-child(5) { animation-delay: 0.75s; }
  }
`;

// Fullscreen Workstation Root Container
export const WorkstationRoot = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000000;
  font-family: "Segoe UI Variable Text", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  color: ${win11.textPrimary};
  user-select: none;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;

// Quick Exit Floating Button
export const QuickExitBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 100000;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 30px;
  padding: 0 11px;
  border-radius: 5px;
  background: rgba(20, 24, 33, 0.75);
  ${acrylicBlur};
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);

  kbd {
    display: inline-block;
    padding: 1px 5px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.12);
    font-family: ${fonts.mono};
    font-size: 9.5px;
    color: #e2e8f0;
  }

  &:hover {
    background: #e81123;
    border-color: #e81123;
    color: #ffffff;
  }
`;
