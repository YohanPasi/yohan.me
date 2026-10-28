import React from "react";

// --- Windows 11 Official Fluent SVG Icons ---

// Windows 11 Logo (4-Pane Cyan Gradient)
export const Win11StartIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 88 88"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 0H41.5V41.5H0V0ZM46.5 0H88V41.5H46.5V0ZM0 46.5H41.5V88H0V46.5ZM46.5 46.5H88V88H46.5V46.5Z"
      fill="url(#win11-grad)"
    />
    <defs>
      <linearGradient
        id="win11-grad"
        x1="0"
        y1="0"
        x2="88"
        y2="88"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00adef" />
        <stop offset="1" stopColor="#0078d4" />
      </linearGradient>
    </defs>
  </svg>
);

// File Explorer (Yellow/Blue Fluent Folder)
export const Win11ExplorerIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 14C4 11.7909 5.79086 10 8 10H18.5858C19.6466 10 20.664 10.4214 21.4142 11.1716L24.8284 14.5858C25.5786 15.3359 26.596 15.7574 27.6569 15.7574H40C42.2091 15.7574 44 17.5482 44 19.7574V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V14Z"
      fill="#d97706"
    />
    <rect x="6" y="16" width="36" height="23" rx="3" fill="#0284c7" />
    <path
      d="M4 20C4 17.7909 5.79086 16 8 16H40C42.2091 16 44 17.7909 44 20V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V20Z"
      fill="url(#folder-front-grad)"
    />
    <defs>
      <linearGradient
        id="folder-front-grad"
        x1="4"
        y1="16"
        x2="44"
        y2="42"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fbbf24" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </svg>
);

// Microsoft Edge (Teal/Blue Swirl)
export const Win11EdgeIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4Z"
      fill="url(#edge-back)"
    />
    <path
      d="M24 10C31.732 10 38 16.268 38 24C38 31.732 31.732 38 24 38C17.5 38 12.5 33.5 12.5 28C12.5 22.5 17 19.5 23 19.5C28 19.5 31.5 22 31.5 25.5C31.5 28 29.5 30 26 30C23 30 21.5 28.5 21.5 27"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="edge-back"
        x1="4"
        y1="4"
        x2="44"
        y2="44"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0078d4" />
        <stop offset="0.5" stopColor="#00b4d8" />
        <stop offset="1" stopColor="#10b981" />
      </linearGradient>
    </defs>
  </svg>
);

// Visual Studio Code (Blue Ribbon)
export const Win11VSCodeIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M36.5 4.5L13 22.5L4.5 16L1 18L10 25.5L1 33L4.5 35L13 28.5L36.5 46.5L46 41.5V9.5L36.5 4.5Z"
      fill="#0066b8"
    />
    <path
      d="M36.5 4.5L13 22.5L36.5 40.5V4.5Z"
      fill="#007acc"
    />
    <path
      d="M36.5 40.5L13 22.5L10 25.5L36.5 46.5L46 41.5V36L36.5 40.5Z"
      fill="#1f8ad2"
    />
    <path
      d="M46 9.5L36.5 4.5L13 22.5L36.5 40.5V4.5L46 9.5Z"
      fill="url(#vscode-grad)"
    />
    <defs>
      <linearGradient
        id="vscode-grad"
        x1="13"
        y1="4.5"
        x2="46"
        y2="46.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0098ff" />
        <stop offset="1" stopColor="#0066b8" />
      </linearGradient>
    </defs>
  </svg>
);

// Windows Terminal (Dark Acrylic Console with Neon Prompt)
export const Win11TerminalIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="4" y="6" width="40" height="36" rx="6" fill="#1e1e1e" />
    <rect
      x="4"
      y="6"
      width="40"
      height="36"
      rx="6"
      stroke="#38bdf8"
      strokeWidth="1.5"
      strokeOpacity="0.5"
    />
    <path
      d="M12 18L20 24L12 30"
      stroke="#38bdf8"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 30H36"
      stroke="#38bdf8"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

// Calculator (Fluent Tile with Operators)
export const Win11CalculatorIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="6" y="4" width="36" height="40" rx="8" fill="url(#calc-bg)" />
    <rect x="12" y="10" width="24" height="10" rx="3" fill="#0f172a" />
    <circle cx="16" cy="28" r="2.5" fill="#ffffff" />
    <circle cx="24" cy="28" r="2.5" fill="#ffffff" />
    <circle cx="32" cy="28" r="2.5" fill="#38bdf8" />
    <circle cx="16" cy="36" r="2.5" fill="#ffffff" />
    <circle cx="24" cy="36" r="2.5" fill="#ffffff" />
    <circle cx="32" cy="36" r="2.5" fill="#38bdf8" />
    <defs>
      <linearGradient
        id="calc-bg"
        x1="6"
        y1="4"
        x2="42"
        y2="44"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0284c7" />
        <stop offset="1" stopColor="#0369a1" />
      </linearGradient>
    </defs>
  </svg>
);

// Notepad (Blue Cover with Curled Paper)
export const Win11NotepadIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="8" y="4" width="32" height="40" rx="6" fill="#0078d4" />
    <rect x="12" y="8" width="24" height="32" rx="3" fill="#ffffff" />
    <line x1="16" y1="16" x2="32" y2="16" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="22" x2="32" y2="22" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="28" x2="26" y2="28" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Recycle Bin (Translucent Glass Canister)
export const Win11RecycleBinIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 12H38L35 40C35 41.6569 33.6569 43 32 43H16C14.3431 43 13 41.6569 13 40L10 12Z"
      fill="url(#bin-glass)"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth="1.5"
    />
    <path
      d="M8 12C8 10.3431 9.34315 9 11 9H37C38.6569 9 40 10.3431 40 12C40 13.6569 38.6569 15 37 15H11C9.34315 15 8 13.6569 8 12Z"
      fill="#0284c7"
    />
    <path
      d="M20 7C20 5.89543 20.8954 5 22 5H26C27.1046 5 28 5.89543 28 7V9H20V7Z"
      fill="#0369a1"
    />
    <path
      d="M24 20V34M18 22L20 34M30 22L28 34"
      stroke="#38bdf8"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="bin-glass"
        x1="10"
        y1="12"
        x2="38"
        y2="43"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="rgba(56, 189, 248, 0.45)" />
        <stop offset="1" stopColor="rgba(2, 132, 199, 0.2)" />
      </linearGradient>
    </defs>
  </svg>
);

// Settings (Fluent Gear in Silver/Cyan)
export const Win11SettingsIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="24" cy="24" r="18" fill="url(#gear-outer)" />
    <circle cx="24" cy="24" r="9" fill="#1e293b" />
    <circle cx="24" cy="24" r="5" fill="#38bdf8" />
    <defs>
      <linearGradient
        id="gear-outer"
        x1="6"
        y1="6"
        x2="42"
        y2="42"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#94a3b8" />
        <stop offset="1" stopColor="#475569" />
      </linearGradient>
    </defs>
  </svg>
);

// Minesweeper (Fluent Naval Mine & Red Flag)
export const Win11MinesweeperIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="6" y="4" width="36" height="40" rx="8" fill="url(#mine-tile)" />
    {/* Mine body */}
    <circle cx="24" cy="26" r="9" fill="#1e293b" stroke="#334155" strokeWidth="1" />
    <circle cx="22" cy="24" r="2.5" fill="#64748b" />
    {/* Spikes */}
    <line x1="24" y1="14" x2="24" y2="17" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="35" x2="24" y2="38" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="12" y1="26" x2="15" y2="26" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="33" y1="26" x2="36" y2="26" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    {/* Flag on top right */}
    <path d="M28 10L36 14L28 18V26" stroke="#ef4444" strokeWidth="2" fill="#ef4444" strokeLinecap="round" />
    <defs>
      <linearGradient
        id="mine-tile"
        x1="6"
        y1="4"
        x2="42"
        y2="44"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#059669" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
    </defs>
  </svg>
);

// Weather Widget (Colombo)
export const Win11WeatherWidget = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "7px",
      padding: "4px 10px",
      borderRadius: "4px",
      fontSize: "11px",
      color: "#ffffff",
      cursor: "pointer",
      userSelect: "none",
      transition: "background 0.15s ease",
    }}
    title="Weather • Colombo, Sri Lanka (28°C Mostly Sunny)"
  >
    <span style={{ fontSize: "16px" }}>⛅</span>
    <span style={{ fontWeight: 600 }}>28°C</span>
    <span style={{ color: "#94a3b8", fontSize: "10.5px" }}>Mostly sunny</span>
  </div>
);

// This PC (Windows 11 Computer / Monitor with Blue Screen & Stand)
export const Win11ThisPCIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Monitor screen body */}
    <rect x="4" y="6" width="40" height="26" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
    {/* Screen Display */}
    <rect x="7" y="9" width="34" height="20" rx="2" fill="url(#pc-screen-grad)" />
    {/* Mini Windows Logo on Screen */}
    <rect x="21" y="16" width="2.5" height="2.5" fill="#ffffff" fillOpacity="0.9" />
    <rect x="24.5" y="16" width="2.5" height="2.5" fill="#ffffff" fillOpacity="0.9" />
    <rect x="21" y="19.5" width="2.5" height="2.5" fill="#ffffff" fillOpacity="0.9" />
    <rect x="24.5" y="19.5" width="2.5" height="2.5" fill="#ffffff" fillOpacity="0.9" />
    {/* Stand neck */}
    <rect x="21" y="32" width="6" height="6" fill="#94a3b8" />
    {/* Stand base */}
    <path d="M14 38H34C35.1046 38 36 38.8954 36 40V41H12V40C12 38.8954 12.8954 38 14 38Z" fill="#cbd5e1" />
    <defs>
      <linearGradient id="pc-screen-grad" x1="7" y1="9" x2="41" y2="29" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0078d4" />
        <stop offset="0.5" stopColor="#0284c7" />
        <stop offset="1" stopColor="#00adef" />
      </linearGradient>
    </defs>
  </svg>
);

// MS Paint (Fluent Artist Palette & Brush)
export const Win11PaintIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Wooden Palette */}
    <path
      d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 13 42 22 42C25 42 27 40 27 37C27 35.5 26.5 34.5 26.5 33C26.5 31.3431 27.8431 30 29.5 30H32C37.5228 30 42 25.5228 42 20C42 12.268 33.9411 6 24 6Z"
      fill="url(#palette-wood)"
    />
    {/* Color paint dots */}
    <circle cx="15" cy="18" r="3.2" fill="#ef4444" />
    <circle cx="23" cy="14" r="3.2" fill="#fbbf24" />
    <circle cx="31" cy="17" r="3.2" fill="#10b981" />
    <circle cx="36" cy="24" r="3.2" fill="#0078d4" />
    <circle cx="16" cy="28" r="3.2" fill="#a855f7" />
    {/* Thumb hole */}
    <ellipse cx="20" cy="36" rx="3" ry="2" fill="#0b0f19" opacity="0.6" />
    {/* Paint Brush */}
    <path d="M28 38L42 18" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />
    <path d="M38 24L43 17L44 19L39 26Z" fill="#38bdf8" />
    <defs>
      <linearGradient id="palette-wood" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f8fafc" />
        <stop offset="1" stopColor="#e2e8f0" />
      </linearGradient>
    </defs>
  </svg>
);

// Solitaire Collection (Fan of Playing Cards)
export const Win11SolitaireIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Background green felt rounded tile */}
    <rect x="4" y="4" width="40" height="40" rx="9" fill="url(#felt-grad)" />
    {/* Left card (King of Spades / Blue) */}
    <rect
      x="10"
      y="12"
      width="18"
      height="26"
      rx="3"
      fill="#ffffff"
      transform="rotate(-10 10 12)"
      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
    />
    <path
      d="M16 18C16 16.5 17 15 18 15C19 15 20 16.5 20 18C20 19.5 18 21 18 21C18 21 16 19.5 16 18Z"
      fill="#1e293b"
      transform="rotate(-10 16 18)"
    />
    {/* Right card (Ace of Hearts / Red) */}
    <rect
      x="20"
      y="10"
      width="18"
      height="26"
      rx="3"
      fill="#ffffff"
      transform="rotate(8 20 10)"
      filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))"
    />
    <path
      d="M28 20C27 18 25 18.5 25 20C25 21.5 28 24 28 24C28 24 31 21.5 31 20C31 18.5 29 18 28 20Z"
      fill="#ef4444"
      transform="rotate(8 28 20)"
    />
    <defs>
      <linearGradient id="felt-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#059669" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
    </defs>
  </svg>
);

// Windows Task Manager (Performance Pulse Graph)
export const Win11TaskManagerIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
    {/* Grid lines */}
    <line x1="6" y1="18" x2="42" y2="18" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
    <line x1="6" y1="30" x2="42" y2="30" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
    <line x1="18" y1="6" x2="18" y2="42" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
    <line x1="30" y1="6" x2="30" y2="42" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
    {/* Green Pulse Wave */}
    <path
      d="M6 26H16L20 14L25 36L29 22L33 28H42"
      stroke="#10b981"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Visual Studio Solution (.sln icon)
export const Win11SolutionIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="8" y="4" width="32" height="40" rx="5" fill="#5c2d91" />
    <path d="M30 4L40 14H30V4Z" fill="#7a3ea8" />
    {/* Visual Studio Infinity Ribbon */}
    <path
      d="M17 22C14.5 20 14.5 26 17 24L31 32V16L17 22Z"
      fill="#ffffff"
      fillOpacity="0.9"
    />
    <rect x="11" y="32" width="26" height="8" rx="2" fill="#3b1d5c" />
    <text x="14" y="38" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
      .SLN
    </text>
  </svg>
);

// Notepad Incident Text Doc (.txt icon)
export const Win11TextDocIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M10 5C8.89543 5 8 5.89543 8 7V41C8 42.1046 8.89543 43 10 43H38C39.1046 43 40 42.1046 40 41V15L30 5H10Z" fill="#f8fafc" />
    <path d="M30 5V15H40L30 5Z" fill="#cbd5e1" />
    <line x1="14" y1="18" x2="26" y2="18" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="14" y1="24" x2="34" y2="24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="29" x2="34" y2="29" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="34" x2="28" y2="34" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// PDF Document Icon (Adobe / Edge PDF)
export const Win11PdfIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M10 5C8.89543 5 8 5.89543 8 7V41C8 42.1046 8.89543 43 10 43H38C39.1046 43 40 42.1046 40 41V15L30 5H10Z" fill="#f8fafc" />
    <path d="M30 5V15H40L30 5Z" fill="#fca5a5" />
    <rect x="8" y="22" width="22" height="12" rx="2" fill="#ef4444" />
    <text x="10" y="31" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
      PDF
    </text>
  </svg>
);


