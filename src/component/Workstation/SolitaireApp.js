import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import {
  FiRefreshCw,
  FiRotateCcw,
  FiHelpCircle,
  FiAward,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import { Win11SolitaireIcon } from "./WindowsIcons";

// ==========================================
// 1. Web Audio Manager for Physical Card Audio
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playSnap() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.24, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext blocked
    }
  }

  playFlip() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(540, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // AudioContext blocked
    }
  }

  playWin() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        const start = this.ctx.currentTime + idx * 0.12;
        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch {
      // AudioContext blocked
    }
  }
}

const sounds = new SoundFX();

// ==========================================
// 2. High-Precision Vector SVG Card Suits
// ==========================================
export const SpadePip = ({ size = 16, color = "#111827", className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M12 2C10.5 4.8 5 10 5 14C5 17 7.5 19.5 10.5 19.5C11.5 19.5 12 19 12 19C12 19 12.5 19.5 13.5 19.5C16.5 19.5 19 17 19 14C19 10 13.5 4.8 12 2ZM10.5 19.5V23H13.5V19.5H10.5Z" />
  </svg>
);

export const HeartPip = ({ size = 16, color = "#e11d48", className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
  </svg>
);

export const DiamondPip = ({ size = 16, color = "#e11d48", className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M12 2L4 12L12 22L20 12L12 2Z" />
  </svg>
);

export const ClubPip = ({ size = 16, color = "#111827", className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M12 2C9.8 2 8 3.8 8 6C8 7.2 8.5 8.2 9.4 8.9C7.8 9.3 6 10.8 6 13C6 15.5 8 17 10.5 17C10.8 17 11.1 16.9 11.4 16.8V22H12.6V16.8C12.9 16.9 13.2 17 13.5 17C16 17 18 15.5 18 13C18 10.8 16.2 9.3 14.6 8.9C15.5 8.2 16 7.2 16 6C16 3.8 14.2 2 12 2Z" />
  </svg>
);

const renderSuitIcon = (suit, size = 14) => {
  switch (suit) {
    case "♠":
      return <SpadePip size={size} color="#111827" />;
    case "♥":
      return <HeartPip size={size} color="#e11d48" />;
    case "♦":
      return <DiamondPip size={size} color="#e11d48" />;
    case "♣":
      return <ClubPip size={size} color="#111827" />;
    default:
      return null;
  }
};

// ==========================================
// 3. Realistic Face Card Royal Court Figures
// ==========================================
const RoyalCourtFigure = ({ rank, isRed, suit }) => {
  const primaryColor = isRed ? "#e11d48" : "#1e3a8a";
  const goldColor = "#f59e0b";
  const darkOutline = "#1e293b";

  return (
    <div
      style={{
        width: "48px",
        height: "64px",
        border: `1px solid ${goldColor}`,
        borderRadius: "4px",
        background: "radial-gradient(circle at 50% 50%, #fffbeb 0%, #fef3c7 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "inset 0 0 4px rgba(0,0,0,0.15)",
      }}
    >
      {/* Top Court Half */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "2px" }}>
        {/* Crown / Headdress */}
        {rank === "K" && (
          <div
            style={{
              width: "22px",
              height: "7px",
              background: goldColor,
              clipPath: "polygon(0% 100%, 0% 0%, 25% 60%, 50% 0%, 75% 60%, 100% 0%, 100% 100%)",
            }}
          />
        )}
        {rank === "Q" && (
          <div
            style={{
              width: "18px",
              height: "6px",
              background: goldColor,
              borderRadius: "4px 4px 0 0",
              border: `1px solid ${darkOutline}`,
            }}
          />
        )}
        {rank === "J" && (
          <div
            style={{
              width: "16px",
              height: "5px",
              background: primaryColor,
              borderRadius: "5px 5px 0 0",
            }}
          />
        )}

        {/* Face */}
        <div
          style={{
            width: "14px",
            height: "12px",
            background: "#fed7aa",
            borderRadius: "50%",
            border: `1px solid ${darkOutline}`,
            position: "relative",
            margin: "1px 0",
          }}
        >
          {/* Eyes */}
          <div style={{ position: "absolute", top: "3px", left: "2px", width: "2px", height: "2px", background: darkOutline, borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: "3px", right: "2px", width: "2px", height: "2px", background: darkOutline, borderRadius: "50%" }} />
          {/* King Beard */}
          {rank === "K" && (
            <div style={{ position: "absolute", bottom: "0", left: "2px", right: "2px", height: "4px", background: "#78350f", borderRadius: "0 0 3px 3px" }} />
          )}
        </div>

        {/* Robe Collar / Shoulders */}
        <div
          style={{
            width: "36px",
            height: "10px",
            background: primaryColor,
            borderRadius: "4px 4px 0 0",
            border: `1px solid ${darkOutline}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "8px", height: "8px", background: goldColor, borderRadius: "50%" }} />
        </div>
      </div>

      {/* Center Divider Scepter & Suit */}
      <div
        style={{
          width: "100%",
          height: "12px",
          borderTop: `1px solid ${goldColor}`,
          borderBottom: `1px solid ${goldColor}`,
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 2px",
        }}
      >
        <span style={{ fontSize: "9px", fontWeight: "900", color: primaryColor }}>{rank}</span>
        {renderSuitIcon(suit, 11)}
        <span style={{ fontSize: "9px", fontWeight: "900", color: primaryColor }}>{rank}</span>
      </div>

      {/* Inverted Bottom Half (Two-Way Symmetrical Playing Card) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: "rotate(180deg)",
          paddingTop: "2px",
        }}
      >
        {/* Crown / Headdress */}
        {rank === "K" && (
          <div
            style={{
              width: "22px",
              height: "7px",
              background: goldColor,
              clipPath: "polygon(0% 100%, 0% 0%, 25% 60%, 50% 0%, 75% 60%, 100% 0%, 100% 100%)",
            }}
          />
        )}
        {rank === "Q" && (
          <div
            style={{
              width: "18px",
              height: "6px",
              background: goldColor,
              borderRadius: "4px 4px 0 0",
              border: `1px solid ${darkOutline}`,
            }}
          />
        )}
        {rank === "J" && (
          <div
            style={{
              width: "16px",
              height: "5px",
              background: primaryColor,
              borderRadius: "5px 5px 0 0",
            }}
          />
        )}

        {/* Face */}
        <div
          style={{
            width: "14px",
            height: "12px",
            background: "#fed7aa",
            borderRadius: "50%",
            border: `1px solid ${darkOutline}`,
            position: "relative",
            margin: "1px 0",
          }}
        >
          <div style={{ position: "absolute", top: "3px", left: "2px", width: "2px", height: "2px", background: darkOutline, borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: "3px", right: "2px", width: "2px", height: "2px", background: darkOutline, borderRadius: "50%" }} />
          {rank === "K" && (
            <div style={{ position: "absolute", bottom: "0", left: "2px", right: "2px", height: "4px", background: "#78350f", borderRadius: "0 0 3px 3px" }} />
          )}
        </div>

        {/* Robe */}
        <div
          style={{
            width: "36px",
            height: "10px",
            background: primaryColor,
            borderRadius: "4px 4px 0 0",
            border: `1px solid ${darkOutline}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "8px", height: "8px", background: goldColor, borderRadius: "50%" }} />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. Standard Playing Card Pip Field (2-10, Ace)
// ==========================================
const StandardPipField = ({ val, suit }) => {
  // Large Grand Ace
  if (val === 1) {
    return (
      <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%" }}>
        {renderSuitIcon(suit, 34)}
      </div>
    );
  }

  // Pip patterns for 2 through 10
  // Relative positioning inside a 44px x 68px center container
  const renderPips = () => {
    switch (val) {
      case 2:
        return (
          <>
            <div style={{ position: "absolute", top: "6px", left: "50%", transform: "translateX(-50%)" }}>
              {renderSuitIcon(suit, 13)}
            </div>
            <div style={{ position: "absolute", bottom: "6px", left: "50%", transform: "translateX(-50%) rotate(180deg)" }}>
              {renderSuitIcon(suit, 13)}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div style={{ position: "absolute", top: "4px", left: "50%", transform: "translateX(-50%)" }}>
              {renderSuitIcon(suit, 13)}
            </div>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              {renderSuitIcon(suit, 13)}
            </div>
            <div style={{ position: "absolute", bottom: "4px", left: "50%", transform: "translateX(-50%) rotate(180deg)" }}>
              {renderSuitIcon(suit, 13)}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div style={{ position: "absolute", top: "4px", left: "3px" }}>{renderSuitIcon(suit, 13)}</div>
            <div style={{ position: "absolute", top: "4px", right: "3px" }}>{renderSuitIcon(suit, 13)}</div>
            <div style={{ position: "absolute", bottom: "4px", left: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 13)}</div>
            <div style={{ position: "absolute", bottom: "4px", right: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 13)}</div>
          </>
        );
      case 5:
        return (
          <>
            <div style={{ position: "absolute", top: "4px", left: "3px" }}>{renderSuitIcon(suit, 12)}</div>
            <div style={{ position: "absolute", top: "4px", right: "3px" }}>{renderSuitIcon(suit, 12)}</div>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>{renderSuitIcon(suit, 13)}</div>
            <div style={{ position: "absolute", bottom: "4px", left: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 12)}</div>
            <div style={{ position: "absolute", bottom: "4px", right: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 12)}</div>
          </>
        );
      case 6:
        return (
          <>
            <div style={{ position: "absolute", top: "4px", left: "3px" }}>{renderSuitIcon(suit, 12)}</div>
            <div style={{ position: "absolute", top: "4px", right: "3px" }}>{renderSuitIcon(suit, 12)}</div>
            <div style={{ position: "absolute", top: "50%", left: "3px", transform: "translateY(-50%)" }}>{renderSuitIcon(suit, 12)}</div>
            <div style={{ position: "absolute", top: "50%", right: "3px", transform: "translateY(-50%)" }}>{renderSuitIcon(suit, 12)}</div>
            <div style={{ position: "absolute", bottom: "4px", left: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 12)}</div>
            <div style={{ position: "absolute", bottom: "4px", right: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 12)}</div>
          </>
        );
      case 7:
        return (
          <>
            <div style={{ position: "absolute", top: "3px", left: "3px" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", top: "3px", right: "3px" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", top: "24%", left: "50%", transform: "translateX(-50%)" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", top: "48%", left: "3px" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", top: "48%", right: "3px" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", bottom: "3px", left: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", bottom: "3px", right: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 11)}</div>
          </>
        );
      case 8:
        return (
          <>
            <div style={{ position: "absolute", top: "3px", left: "3px" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", top: "3px", right: "3px" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", top: "46%", left: "3px" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", top: "46%", right: "3px" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", bottom: "22%", left: "50%", transform: "translateX(-50%) rotate(180deg)" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", bottom: "3px", left: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", bottom: "3px", right: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 11)}</div>
          </>
        );
      case 9:
        return (
          <>
            <div style={{ position: "absolute", top: "2px", left: "3px" }}>{renderSuitIcon(suit, 10.5)}</div>
            <div style={{ position: "absolute", top: "2px", right: "3px" }}>{renderSuitIcon(suit, 10.5)}</div>
            <div style={{ position: "absolute", top: "25%", left: "3px" }}>{renderSuitIcon(suit, 10.5)}</div>
            <div style={{ position: "absolute", top: "25%", right: "3px" }}>{renderSuitIcon(suit, 10.5)}</div>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>{renderSuitIcon(suit, 11)}</div>
            <div style={{ position: "absolute", bottom: "25%", left: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 10.5)}</div>
            <div style={{ position: "absolute", bottom: "25%", right: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 10.5)}</div>
            <div style={{ position: "absolute", bottom: "2px", left: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 10.5)}</div>
            <div style={{ position: "absolute", bottom: "2px", right: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 10.5)}</div>
          </>
        );
      case 10:
        return (
          <>
            <div style={{ position: "absolute", top: "2px", left: "3px" }}>{renderSuitIcon(suit, 10)}</div>
            <div style={{ position: "absolute", top: "2px", right: "3px" }}>{renderSuitIcon(suit, 10)}</div>
            <div style={{ position: "absolute", top: "18%", left: "50%", transform: "translateX(-50%)" }}>{renderSuitIcon(suit, 10)}</div>
            <div style={{ position: "absolute", top: "35%", left: "3px" }}>{renderSuitIcon(suit, 10)}</div>
            <div style={{ position: "absolute", top: "35%", right: "3px" }}>{renderSuitIcon(suit, 10)}</div>
            <div style={{ position: "absolute", bottom: "35%", left: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 10)}</div>
            <div style={{ position: "absolute", bottom: "35%", right: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 10)}</div>
            <div style={{ position: "absolute", bottom: "18%", left: "50%", transform: "translateX(-50%) rotate(180deg)" }}>{renderSuitIcon(suit, 10)}</div>
            <div style={{ position: "absolute", bottom: "2px", left: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 10)}</div>
            <div style={{ position: "absolute", bottom: "2px", right: "3px", transform: "rotate(180deg)" }}>{renderSuitIcon(suit, 10)}</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ width: "48px", height: "70px", position: "relative" }}>
      {renderPips()}
    </div>
  );
};

// ==========================================
// 5. Authentic Windows Solitaire Card Back
// ==========================================
const WindowsCardBack = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 80 114"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: "7px", display: "block" }}
  >
    {/* Base dark navy */}
    <rect width="80" height="114" rx="7" fill="#1e3a8a" />
    {/* White inner margin */}
    <rect x="3" y="3" width="74" height="108" rx="5" fill="#172554" stroke="#ffffff" strokeWidth="1.5" />
    {/* Blue Diamond Guilloche Crosshatching */}
    <defs>
      <pattern id="card-crosshatch" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 4L4 0L8 4L4 8L0 4Z" fill="#1e40af" stroke="#2563eb" strokeWidth="0.75" />
      </pattern>
    </defs>
    <rect x="6" y="6" width="68" height="102" rx="3" fill="url(#card-crosshatch)" />
    {/* Golden/White ornamental center emblem */}
    <rect x="25" y="42" width="30" height="30" rx="4" fill="#1e3a8a" stroke="#fbbf24" strokeWidth="1.5" />
    <path d="M40 45L44 54L53 54L46 60L49 69L40 63L31 69L34 60L27 54L36 54L40 45Z" fill="#fbbf24" opacity="0.9" />
  </svg>
);

// ==========================================
// 6. Complete Playing Card View Component
// ==========================================
const CardComponent = ({
  card,
  isGhost = false,
  isDragging = false,
  isSelected = false,
  onPointerDown,
  onDoubleClick,
}) => {
  if (!card.faceUp) {
    return (
      <CardContainer
        $faceUp={false}
        $isGhost={isGhost}
        $isDragging={isDragging}
        $selected={isSelected}
      >
        <WindowsCardBack />
      </CardContainer>
    );
  }

  const isCourt = ["J", "Q", "K"].includes(card.label);
  const cornerColor = card.isRed ? "#e11d48" : "#111827";

  return (
    <CardContainer
      $faceUp={true}
      $isGhost={isGhost}
      $isDragging={isDragging}
      $selected={isSelected}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
    >
      {/* Top Left Corner */}
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: 1,
          color: cornerColor,
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontWeight: "bold",
          fontSize: "14px",
          userSelect: "none",
        }}
      >
        <span>{card.label}</span>
        <div style={{ marginTop: "2px" }}>
          {renderSuitIcon(card.suit, 11)}
        </div>
      </div>

      {/* Center Field (Authentic Pips or Court Portrait) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "grid",
          placeItems: "center",
        }}
      >
        {isCourt ? (
          <RoyalCourtFigure rank={card.label} isRed={card.isRed} suit={card.suit} />
        ) : (
          <StandardPipField val={card.val} suit={card.suit} isRed={card.isRed} />
        )}
      </div>

      {/* Bottom Right Corner (Inverted) */}
      <div
        style={{
          position: "absolute",
          bottom: "4px",
          right: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: 1,
          color: cornerColor,
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontWeight: "bold",
          fontSize: "14px",
          transform: "rotate(180deg)",
          userSelect: "none",
        }}
      >
        <span>{card.label}</span>
        <div style={{ marginTop: "2px" }}>
          {renderSuitIcon(card.suit, 11)}
        </div>
      </div>
    </CardContainer>
  );
};

// ==========================================
// 7. Styling Rules & Geometry
// ==========================================
const CARD_WIDTH = 80;
const CARD_HEIGHT = 114;
const TABLEAU_CARD_GAP_UP = 30;
const TABLEAU_CARD_GAP_DOWN = 15;

const CardContainer = styled.div`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: 7px;
  position: relative;
  background: ${(props) => (props.$faceUp ? "#ffffff" : "#172554")};
  border: 1px solid ${(props) => (props.$faceUp ? "#cbd5e1" : "#0f172a")};
  box-shadow: ${(props) =>
    props.$isDragging
      ? "0 18px 38px rgba(0,0,0,0.55), 0 0 0 1px rgba(56,189,248,0.8)"
      : props.$selected
      ? "0 0 0 2px #38bdf8, 0 8px 18px rgba(0,0,0,0.38)"
      : "0 2px 5px rgba(0,0,0,0.25)"};
  cursor: ${(props) => (props.$faceUp ? "grab" : "default")};
  user-select: none;
  opacity: ${(props) => (props.$isGhost ? 0.35 : 1)};
  touch-action: none;
  transition: ${(props) => (props.$isDragging ? "none" : "box-shadow 0.12s ease")};

  &:hover {
    ${(props) =>
      props.$faceUp && !props.$isDragging
        ? "box-shadow: 0 4px 12px rgba(0,0,0,0.35);"
        : ""}
  }
`;

const SolitaireRoot = styled.div`
  width: 100%;
  height: 100%;
  background: #085329;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
  position: relative;
`;

const TitleBar = styled.div`
  height: 34px;
  background: #04381b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
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

const RibbonBar = styled.div`
  height: 38px;
  background: #064421;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 11.5px;
  color: #cbd5e1;

  .ribbon-left {
    display: flex;
    align-items: center;
    gap: 10px;

    button.ribbon-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 4px;
      padding: 5px 12px;
      color: #ffffff;
      cursor: pointer;
      font-size: 11.5px;
      font-weight: 500;
      transition: all 0.12s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.18);
        border-color: rgba(255, 255, 255, 0.25);
      }

      &:disabled {
        opacity: 0.35;
        cursor: default;
      }

      &.highlight-btn {
        background: rgba(16, 185, 129, 0.24);
        border-color: rgba(52, 211, 153, 0.55);
        color: #a7f3d0;
        font-weight: 600;

        &:hover {
          background: rgba(16, 185, 129, 0.42);
          border-color: rgba(52, 211, 153, 0.85);
          color: #ffffff;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.45);
        }
      }
    }
  }

  .ribbon-right {
    display: flex;
    align-items: center;
    gap: 14px;
    font-family: monospace;
    font-size: 12px;

    .stat-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 0, 0, 0.25);
      padding: 4px 10px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #a7f3d0;

      strong {
        color: #ffffff;
      }
    }

    button.sound-btn {
      background: transparent;
      border: none;
      color: #cbd5e1;
      cursor: pointer;
      font-size: 15px;
      display: grid;
      place-items: center;
      &:hover {
        color: #ffffff;
      }
    }
  }
`;

const FeltTable = styled.div`
  flex: 1;
  background: radial-gradient(circle at 50% 35%, #0b6b35 0%, #064522 65%, #032b14 100%);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  overflow: auto;
  position: relative;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.55);
`;

const TopBoard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 860px;
  margin: 0 auto;
  width: 100%;
`;

const StockWasteRow = styled.div`
  display: flex;
  gap: 16px;
`;

const FoundationsRow = styled.div`
  display: flex;
  gap: 16px;
`;

const CardSlotFrame = styled.div`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: 7px;
  border: 2px dashed ${(props) => (props.$highlight ? "#38bdf8" : "rgba(255, 255, 255, 0.22)")};
  background: ${(props) =>
    props.$highlight ? "rgba(56, 189, 248, 0.18)" : "rgba(0, 0, 0, 0.18)"};
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.15s ease;

  .watermark {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.22;
    filter: grayscale(1);

    span {
      font-size: 11px;
      font-weight: bold;
      margin-top: 2px;
      color: #ffffff;
    }
  }
`;

const TableauBoard = styled.div`
  display: flex;
  gap: 16px;
  max-width: 860px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
`;

const TableauCol = styled.div`
  flex: 1;
  min-width: ${CARD_WIDTH}px;
  min-height: 440px;
  position: relative;
  border-radius: 7px;
  background: ${(props) =>
    props.$highlight ? "rgba(56, 189, 248, 0.16)" : "transparent"};
  border: 2px solid ${(props) => (props.$highlight ? "#38bdf8" : "transparent")};
  transition: all 0.15s ease;
`;

const StackItem = styled.div`
  position: absolute;
  top: ${(props) => `${props.$top}px`};
  left: 0;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  z-index: ${(props) => props.$zIndex};
`;

const DraggingOverlay = styled.div`
  position: fixed;
  left: ${(props) => `${props.$x}px`};
  top: ${(props) => `${props.$y}px`};
  pointer-events: none;
  z-index: 99999;
  filter: drop-shadow(0 16px 30px rgba(0, 0, 0, 0.65));
`;

const VictoryBanner = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(3, 43, 20, 0.94);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 10000;
  animation: fadeIn 0.3s ease;

  h2 {
    font-size: 36px;
    color: #fbbf24;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  p {
    font-size: 15px;
    color: #e2e8f0;
    margin: 0;
  }

  button {
    background: #0078d4;
    border: none;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 30px;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0, 120, 212, 0.4);
    transition: background 0.15s ease;

    &:hover {
      background: #1084d8;
    }
  }
`;

const ToastBanner = styled.div`
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95));
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45), 0 0 20px rgba(16, 185, 129, 0.45);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideDownToast 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(10px);
  max-width: 90%;

  @keyframes slideDownToast {
    from {
      opacity: 0;
      transform: translate(-50%, -20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0) scale(1);
    }
  }

  .toast-close {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 0;
    margin-left: 6px;
    &:hover {
      color: #ffffff;
    }
  }
`;

// Calculate top offset for card in tableau
const getTableauCardTop = (cards, targetIdx) => {
  let top = 0;
  for (let i = 0; i < targetIdx; i++) {
    top += cards[i].faceUp ? TABLEAU_CARD_GAP_UP : TABLEAU_CARD_GAP_DOWN;
  }
  return top;
};

// ==========================================
// 8. Main Solitaire Application Component
// ==========================================
const SUIT_DEFS = [
  { symbol: "♠", name: "spades", isRed: false },
  { symbol: "♥", name: "hearts", isRed: true },
  { symbol: "♦", name: "diamonds", isRed: true },
  { symbol: "♣", name: "clubs", isRed: false },
];

const RANK_DEFS = [
  { val: 1, label: "A" },
  { val: 2, label: "2" },
  { val: 3, label: "3" },
  { val: 4, label: "4" },
  { val: 5, label: "5" },
  { val: 6, label: "6" },
  { val: 7, label: "7" },
  { val: 8, label: "8" },
  { val: 9, label: "9" },
  { val: 10, label: "10" },
  { val: 11, label: "J" },
  { val: 12, label: "Q" },
  { val: 13, label: "K" },
];

const createStandardDeck = () => {
  const deck = [];
  let id = 1;
  SUIT_DEFS.forEach((s) => {
    RANK_DEFS.forEach((r) => {
      deck.push({
        id: id++,
        suit: s.symbol,
        suitName: s.name,
        isRed: s.isRed,
        val: r.val,
        label: r.label,
        faceUp: false,
      });
    });
  });

  // Fisher-Yates
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const SolitaireApp = ({
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
}) => {
  const [stock, setStock] = useState([]);
  const [waste, setWaste] = useState([]);
  const [foundations, setFoundations] = useState([[], [], [], []]);
  const [tableau, setTableau] = useState([[], [], [], [], [], [], []]);
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toastMsg, setToastMsg] = useState(null);

  // Rule mode: 'any' allows joining cards of the same genre (suit) & same color!
  // 'classic' requires strictly alternating red and black.
  const [ruleMode, setRuleMode] = useState("any");

  // Dragging State
  const [dragState, setDragState] = useState(null);
  const [hoverTarget, setHoverTarget] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // DOM Refs
  const foundationRefs = useRef([]);
  const tableauRefs = useRef([]);
  const tableRef = useRef(null);

  const pushHistory = () => {
    setHistory((prev) => [
      ...prev.slice(-25),
      {
        stock: JSON.parse(JSON.stringify(stock)),
        waste: JSON.parse(JSON.stringify(waste)),
        foundations: JSON.parse(JSON.stringify(foundations)),
        tableau: JSON.parse(JSON.stringify(tableau)),
        score,
        moves,
        ruleMode,
      },
    ]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setStock(prev.stock);
    setWaste(prev.waste);
    setFoundations(prev.foundations);
    setTableau(prev.tableau);
    setScore(prev.score);
    setMoves(prev.moves);
    if (prev.ruleMode) setRuleMode(prev.ruleMode);
    setHistory((h) => h.slice(0, h.length - 1));
    setSelectedCard(null);
    sounds.playFlip();
  };

  const startNewGame = useCallback(() => {
    const deck = createStandardDeck();
    const newTableau = [[], [], [], [], [], [], []];

    for (let col = 0; col < 7; col++) {
      for (let row = 0; row <= col; row++) {
        const card = deck.pop();
        card.faceUp = row === col;
        newTableau[col].push(card);
      }
    }

    setTableau(newTableau);
    setStock(deck);
    setWaste([]);
    setFoundations([[], [], [], []]);
    setHistory([]);
    setSelectedCard(null);
    setDragState(null);
    setHoverTarget(null);
    setScore(0);
    setMoves(0);
    setSeconds(0);
    setIsWon(false);
    setToastMsg(null);
    sounds.playFlip();
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  useEffect(() => {
    if (isWon) return;
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isWon]);

  // Check victory
  useEffect(() => {
    const total = foundations.reduce((sum, f) => sum + f.length, 0);
    if (total === 52 && !isWon) {
      setIsWon(true);
      setScore((s) => s + 500);
      sounds.playWin();
    }
  }, [foundations, isWon]);

  // Stock click
  const handleStockClick = () => {
    setSelectedCard(null);
    pushHistory();

    if (stock.length === 0) {
      if (waste.length === 0) return;
      const newStock = [...waste].reverse().map((c) => ({ ...c, faceUp: false }));
      setStock(newStock);
      setWaste([]);
      setMoves((m) => m + 1);
      sounds.playFlip();
      return;
    }

    const card = stock[stock.length - 1];
    const newStock = stock.slice(0, stock.length - 1);
    const newWaste = [...waste, { ...card, faceUp: true }];
    setStock(newStock);
    setWaste(newWaste);
    setMoves((m) => m + 1);
    sounds.playFlip();
  };

  // Rule checks
  const canDropOnFoundation = (card, fIdx, cardsOrLength = 1) => {
    const cards = Array.isArray(cardsOrLength) ? cardsOrLength : [card];
    const fPile = foundations[fIdx];

    // Single card
    if (cards.length === 1) {
      if (fPile.length === 0) {
        return (
          card.val === 1 &&
          (card.suit === SUIT_DEFS[fIdx].symbol || ruleMode === "any")
        );
      }
      const top = fPile[fPile.length - 1];
      if (ruleMode === "any") {
        return top.val === card.val - 1;
      }
      return top.suit === card.suit && top.val === card.val - 1;
    }

    // Full 13-card completed set (K -> A or A -> K)
    if (cards.length === 13) {
      const isDescending = cards.every((c, i) => c.val === 13 - i);
      const isAscending = cards.every((c, i) => c.val === i + 1);
      if (isDescending || isAscending) {
        return fPile.length === 0;
      }
    }

    // Ascending run onto existing foundation pile
    if (fPile.length > 0) {
      const top = fPile[fPile.length - 1];
      if (
        cards[0].val === top.val + 1 &&
        (ruleMode === "any" || cards[0].suit === top.suit)
      ) {
        const isAscending = cards.every(
          (c, i) =>
            i === 0 ||
            (c.val === cards[i - 1].val + 1 &&
              (ruleMode === "any" || c.suit === cards[i - 1].suit))
        );
        return isAscending;
      }
    }

    return false;
  };

  const canDropOnTableau = (card, colIdx) => {
    const col = tableau[colIdx];
    if (col.length === 0) {
      return card.val === 13 || ruleMode === "any"; // In free mode, any card or King
    }
    const top = col[col.length - 1];
    if (!top.faceUp) return false;

    if (ruleMode === "classic") {
      // Classic Klondike: Alternating colors only
      return top.isRed !== card.isRed && top.val === card.val + 1;
    }

    // Free / Relaxed mode: Same genre (suit), same color, or alternating color - any descending card!
    return top.val === card.val + 1;
  };

  // Automatically scan and sweep any completed runs from King (13) down to Ace (1)
  const checkAndSweepCompletedRuns = useCallback(
    (currentTableau, currentFoundations) => {
      let modified = false;
      let newTableau = currentTableau.map((col) => [...col]);
      let newFoundations = currentFoundations.map((f) => [...f]);
      let sweptSetsCount = 0;
      let sweptSuitNames = [];

      for (let colIdx = 0; colIdx < 7; colIdx++) {
        const col = newTableau[colIdx];
        if (col.length < 13) continue;

        // Sequence must end at the bottom of the column (index col.length - 1)
        const startIdx = col.length - 13;
        const candidate = col.slice(startIdx);

        // All 13 cards must be revealed
        if (!candidate.every((c) => c.faceUp)) continue;

        // Values must strictly descend from 13 down to 1
        let isValidRun = true;
        for (let i = 0; i < 13; i++) {
          if (candidate[i].val !== 13 - i) {
            isValidRun = false;
            break;
          }
        }

        if (!isValidRun) continue;

        // Completed 13-card set found!
        modified = true;
        sweptSetsCount++;

        const firstSuit = candidate[0].suit;
        const isSingleSuit = candidate.every((c) => c.suit === firstSuit);
        const suitName = candidate[0].suitName || "cards";
        sweptSuitNames.push(
          isSingleSuit ? `${suitName} (${firstSuit})` : "Mixed Sequence"
        );

        // Foundations store cards from Ace (1) up to King (13)
        const foundationStack = [...candidate].reverse();

        // Find destination foundation slot
        let destFIdx = -1;
        if (isSingleSuit) {
          const suitIdx = SUIT_DEFS.findIndex((s) => s.symbol === firstSuit);
          if (suitIdx !== -1 && newFoundations[suitIdx].length === 0) {
            destFIdx = suitIdx;
          }
        }

        if (destFIdx === -1) {
          destFIdx = newFoundations.findIndex((f) => f.length === 0);
        }

        if (destFIdx === -1) {
          destFIdx = 0;
          let minLen = newFoundations[0].length;
          for (let fi = 1; fi < 4; fi++) {
            if (newFoundations[fi].length < minLen) {
              minLen = newFoundations[fi].length;
              destFIdx = fi;
            }
          }
        }

        newFoundations[destFIdx] = foundationStack;

        // Remove the 13 cards from the column
        const remainingCol = col.slice(0, startIdx);
        if (
          remainingCol.length > 0 &&
          !remainingCol[remainingCol.length - 1].faceUp
        ) {
          remainingCol[remainingCol.length - 1] = {
            ...remainingCol[remainingCol.length - 1],
            faceUp: true,
          };
        }
        newTableau[colIdx] = remainingCol;
      }

      return {
        modified,
        newTableau,
        newFoundations,
        sweptSetsCount,
        sweptSuitNames,
      };
    },
    []
  );

  // Auto-sweep completed K -> A sets whenever tableau changes
  useEffect(() => {
    if (isWon) return;
    const sweep = checkAndSweepCompletedRuns(tableau, foundations);
    if (sweep.modified) {
      pushHistory();
      setTableau(sweep.newTableau);
      setFoundations(sweep.newFoundations);
      setScore((s) => s + 150 * sweep.sweptSetsCount);
      setMoves((m) => m + 1);
      sounds.playWin();
      setToastMsg(
        `🎉 Set Completed! King (K) down to Ace (A) [${sweep.sweptSuitNames.join(
          ", "
        )}] Cleared into Foundation! (+150 PTS)`
      );
      const timer = setTimeout(() => {
        setToastMsg(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableau, foundations, isWon, checkAndSweepCompletedRuns]);

  // Auto complete / sweep button click handler
  const handleAutoComplete = () => {
    // 1. Check if any completed K -> A run exists in tableau
    const sweep = checkAndSweepCompletedRuns(tableau, foundations);
    if (sweep.modified) {
      pushHistory();
      setTableau(sweep.newTableau);
      setFoundations(sweep.newFoundations);
      setScore((s) => s + 150 * sweep.sweptSetsCount);
      setMoves((m) => m + 1);
      sounds.playWin();
      setToastMsg(
        `🎉 Set Completed! King (K) down to Ace (A) Cleared into Foundation! (+150 PTS)`
      );
      setTimeout(() => setToastMsg(null), 5000);
      return;
    }

    // 2. Cascade single cards to foundations
    let movedAny = false;
    let currentTableau = tableau.map((col) => [...col]);
    let currentFoundations = foundations.map((f) => [...f]);
    let currentWaste = [...waste];
    let pointsAdded = 0;

    let iterations = 0;
    while (iterations < 52) {
      iterations++;
      let foundStep = false;

      // Check waste top card
      if (currentWaste.length > 0) {
        const wCard = currentWaste[currentWaste.length - 1];
        for (let fIdx = 0; fIdx < 4; fIdx++) {
          const fPile = currentFoundations[fIdx];
          const canFit =
            fPile.length === 0
              ? wCard.val === 1 &&
                (wCard.suit === SUIT_DEFS[fIdx].symbol || ruleMode === "any")
              : (ruleMode === "any" ||
                  fPile[fPile.length - 1].suit === wCard.suit) &&
                fPile[fPile.length - 1].val === wCard.val - 1;

          if (canFit) {
            currentFoundations[fIdx].push(wCard);
            currentWaste.pop();
            pointsAdded += 10;
            foundStep = true;
            movedAny = true;
            break;
          }
        }
      }

      // Check tableau bottom cards
      for (let cIdx = 0; cIdx < 7; cIdx++) {
        const col = currentTableau[cIdx];
        if (col.length === 0) continue;
        const card = col[col.length - 1];
        if (!card.faceUp) continue;

        for (let fIdx = 0; fIdx < 4; fIdx++) {
          const fPile = currentFoundations[fIdx];
          const canFit =
            fPile.length === 0
              ? card.val === 1 &&
                (card.suit === SUIT_DEFS[fIdx].symbol || ruleMode === "any")
              : (ruleMode === "any" ||
                  fPile[fPile.length - 1].suit === card.suit) &&
                fPile[fPile.length - 1].val === card.val - 1;

          if (canFit) {
            currentFoundations[fIdx].push(card);
            col.pop();
            if (col.length > 0 && !col[col.length - 1].faceUp) {
              col[col.length - 1].faceUp = true;
            }
            pointsAdded += 10;
            foundStep = true;
            movedAny = true;
            break;
          }
        }
      }

      if (!foundStep) break;
    }

    if (movedAny) {
      pushHistory();
      setTableau(currentTableau);
      setFoundations(currentFoundations);
      setWaste(currentWaste);
      setScore((s) => s + pointsAdded);
      setMoves((m) => m + 1);
      sounds.playWin();
      setToastMsg(
        `✨ Auto-completed ready cards into Foundations! (+${pointsAdded} PTS)`
      );
      setTimeout(() => setToastMsg(null), 4000);
    } else {
      setToastMsg(
        "ℹ️ No cards can currently move to foundations. Continue building runs on the tableau!"
      );
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  // Move single card to Foundation
  const executeMoveToFoundation = (card, source, sourceIdx) => {
    for (let fIdx = 0; fIdx < 4; fIdx++) {
      if (canDropOnFoundation(card, fIdx, [card])) {
        pushHistory();
        setFoundations((prev) =>
          prev.map((f, i) => (i === fIdx ? [...f, card] : f))
        );

        if (source === "waste") {
          setWaste((w) => w.slice(0, w.length - 1));
        } else if (source === "tableau") {
          setTableau((prev) =>
            prev.map((col, i) => {
              if (i !== sourceIdx) return col;
              const next = col.slice(0, col.length - 1);
              if (next.length > 0 && !next[next.length - 1].faceUp) {
                next[next.length - 1].faceUp = true;
                sounds.playFlip();
              }
              return next;
            })
          );
        }

        setScore((s) => s + 10);
        setMoves((m) => m + 1);
        sounds.playSnap();
        return true;
      }
    }
    return false;
  };

  // Find best move on double click or single tap
  const handleSmartAutoMove = (card, source, sourceIdx) => {
    // 1. Try Foundation first
    const movedToFoundation = executeMoveToFoundation(card, source, sourceIdx);
    if (movedToFoundation) return;

    // 2. Try Tableau columns
    for (let tIdx = 0; tIdx < 7; tIdx++) {
      if (source === "tableau" && sourceIdx === tIdx) continue;
      if (canDropOnTableau(card, tIdx)) {
        pushHistory();
        const cardsToMove =
          source === "tableau"
            ? tableau[sourceIdx].slice(
                tableau[sourceIdx].findIndex((c) => c.id === card.id)
              )
            : [card];

        setTableau((prev) =>
          prev.map((col, i) => {
            if (i === tIdx) {
              return [...col, ...cardsToMove];
            }
            if (source === "tableau" && i === sourceIdx) {
              const rem = col.slice(0, col.length - cardsToMove.length);
              if (rem.length > 0 && !rem[rem.length - 1].faceUp) {
                rem[rem.length - 1].faceUp = true;
                sounds.playFlip();
              }
              return rem;
            }
            return col;
          })
        );

        if (source === "waste") {
          setWaste((w) => w.slice(0, w.length - 1));
        }

        setScore((s) => s + 5);
        setMoves((m) => m + 1);
        sounds.playSnap();
        return;
      }
    }
  };

  // Drop execution
  const executeDrop = (target) => {
    if (!dragState || !target) return;
    const { source, sourceIdx, cardIdx, cards } = dragState;
    const leadCard = cards[0];

    // Drop on Foundation
    if (target.type === "foundation") {
      const fIdx = target.index;
      if (canDropOnFoundation(leadCard, fIdx, cards)) {
        pushHistory();

        let cardsToAdd = cards;
        // If dropping descending K -> A on foundation, reverse so Ace is at bottom and King at top
        if (cards.length === 13 && cards[0].val === 13) {
          cardsToAdd = [...cards].reverse();
        }

        setFoundations((prev) =>
          prev.map((f, i) => (i === fIdx ? [...f, ...cardsToAdd] : f))
        );

        if (source === "waste") {
          setWaste((w) => w.slice(0, w.length - cards.length));
        } else if (source === "tableau") {
          setTableau((prev) =>
            prev.map((col, i) => {
              if (i !== sourceIdx) return col;
              const next = col.slice(0, cardIdx);
              if (next.length > 0 && !next[next.length - 1].faceUp) {
                next[next.length - 1].faceUp = true;
                sounds.playFlip();
              }
              return next;
            })
          );
        }

        const isFullSet = cards.length === 13;
        setScore((s) => s + (isFullSet ? 150 : cards.length * 10));
        setMoves((m) => m + 1);

        if (isFullSet) {
          sounds.playWin();
          setToastMsg(
            "🎉 Completed Set (K → A) Cleared into Foundation! (+150 PTS)"
          );
          setTimeout(() => setToastMsg(null), 5000);
        } else {
          sounds.playSnap();
        }
        return;
      }
    }

    // Drop on Tableau
    if (target.type === "tableau") {
      const tIdx = target.index;
      if (source === "tableau" && sourceIdx === tIdx) return;

      if (canDropOnTableau(leadCard, tIdx)) {
        pushHistory();
        setTableau((prev) =>
          prev.map((col, i) => {
            if (i === tIdx) {
              return [...col, ...cards];
            }
            if (source === "tableau" && i === sourceIdx) {
              const rem = col.slice(0, cardIdx);
              if (rem.length > 0 && !rem[rem.length - 1].faceUp) {
                rem[rem.length - 1].faceUp = true;
                sounds.playFlip();
              }
              return rem;
            }
            return col;
          })
        );

        if (source === "waste") {
          setWaste((w) => w.slice(0, w.length - 1));
        }

        if (source === "foundation") {
          setFoundations((prev) =>
            prev.map((f, i) => (i === sourceIdx ? f.slice(0, f.length - 1) : f))
          );
          setScore((s) => Math.max(0, s - 10));
        } else {
          setScore((s) => s + 5);
        }

        setMoves((m) => m + 1);
        sounds.playSnap();
        return;
      }
    }
  };

  // Detect drop target under cursor
  const detectTargetAtPos = (clientX, clientY) => {
    // Check foundations
    for (let i = 0; i < 4; i++) {
      const el = foundationRefs.current[i];
      if (el) {
        const r = el.getBoundingClientRect();
        if (
          clientX >= r.left &&
          clientX <= r.right &&
          clientY >= r.top &&
          clientY <= r.bottom
        ) {
          return { type: "foundation", index: i };
        }
      }
    }

    // Check tableau columns
    for (let i = 0; i < 7; i++) {
      const el = tableauRefs.current[i];
      if (el) {
        const r = el.getBoundingClientRect();
        if (
          clientX >= r.left - 6 &&
          clientX <= r.right + 6 &&
          clientY >= r.top - 10 &&
          clientY <= r.bottom + 120
        ) {
          return { type: "tableau", index: i };
        }
      }
    }

    return null;
  };

  // Pointer Down on card
  const handlePointerDownCard = (e, source, sourceIdx, cardIdx, card) => {
    if (!card.faceUp) return;
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    let cardsToDrag = [card];
    if (source === "tableau") {
      cardsToDrag = tableau[sourceIdx].slice(cardIdx);
    }

    setDragState({
      source,
      sourceIdx,
      cardIdx,
      cards: cardsToDrag,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      offsetX,
      offsetY,
      hasMoved: false,
    });
  };

  // Global Drag listeners
  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (e) => {
      const dx = Math.abs(e.clientX - dragState.startX);
      const dy = Math.abs(e.clientY - dragState.startY);
      const hasMoved = dragState.hasMoved || dx > 3 || dy > 3;

      const target = detectTargetAtPos(e.clientX, e.clientY);
      setHoverTarget(target);

      setDragState((prev) =>
        prev
          ? {
              ...prev,
              currentX: e.clientX,
              currentY: e.clientY,
              hasMoved,
            }
          : null
      );
    };

    const handlePointerUp = (e) => {
      if (dragState.hasMoved) {
        const target = detectTargetAtPos(e.clientX, e.clientY);
        executeDrop(target);
      } else {
        // Tap / Click without movement
        const { source, sourceIdx, cardIdx, cards } = dragState;
        const card = cards[0];

        // Click-to-move selection
        if (source === "tableau") {
          setSelectedCard((prev) =>
            prev?.source === "tableau" &&
            prev.sourceIdx === sourceIdx &&
            prev.cardIdx === cardIdx
              ? null
              : { source, sourceIdx, cardIdx, card }
          );
        } else if (source === "waste") {
          setSelectedCard((prev) =>
            prev?.source === "waste" ? null : { source, sourceIdx, cardIdx, card }
          );
        }
      }

      setDragState(null);
      setHoverTarget(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragState, tableau, foundations, waste]);

  // Click on a tableau slot or column (click-to-move)
  const handleTableauSlotClick = (colIdx) => {
    if (!selectedCard) return;

    const { source, sourceIdx, cardIdx, card } = selectedCard;
    const cards =
      source === "tableau" ? tableau[sourceIdx].slice(cardIdx) : [card];

    if (canDropOnTableau(cards[0], colIdx)) {
      pushHistory();
      setTableau((prev) =>
        prev.map((col, i) => {
          if (i === colIdx) {
            return [...col, ...cards];
          }
          if (source === "tableau" && i === sourceIdx) {
            const rem = col.slice(0, cardIdx);
            if (rem.length > 0 && !rem[rem.length - 1].faceUp) {
              rem[rem.length - 1].faceUp = true;
              sounds.playFlip();
            }
            return rem;
          }
          return col;
        })
      );

      if (source === "waste") {
        setWaste((w) => w.slice(0, w.length - 1));
      }

      setScore((s) => s + 5);
      setMoves((m) => m + 1);
      sounds.playSnap();
      setSelectedCard(null);
    }
  };

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? `0${s}` : s}`;
  };

  return (
    <SolitaireRoot>
      {/* Titlebar */}
      <TitleBar onDoubleClick={onToggleMaximize}>
        <div className="title-left">
          <Win11SolitaireIcon size={16} />
          <span>Solitaire Collection • Klondike</span>
        </div>
        <div className="window-controls">
          <button type="button" onClick={onMinimize} title="Minimize">
            <VscChromeMinimize />
          </button>
          <button
            type="button"
            onClick={onToggleMaximize}
            title={isMaximized ? "Restore Down" : "Maximize"}
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

      {/* Ribbon Controls */}
      <RibbonBar>
        <div className="ribbon-left">
          <button
            type="button"
            className="ribbon-btn"
            onClick={startNewGame}
            title="Deal a fresh game"
          >
            <FiRefreshCw /> New Game
          </button>
          <button
            type="button"
            className="ribbon-btn"
            onClick={handleUndo}
            disabled={history.length === 0}
            title="Undo last move"
          >
            <FiRotateCcw /> Undo
          </button>
          <button
            type="button"
            className="ribbon-btn highlight-btn"
            onClick={handleAutoComplete}
            title="Sweep completed K → A sets and auto-complete ready cards into foundations"
          >
            <FiAward /> Auto Complete / Sweep
          </button>
          <button
            type="button"
            className="ribbon-btn"
            onClick={() => setRuleMode((m) => (m === "any" ? "classic" : "any"))}
            title={
              ruleMode === "any"
                ? "Current: Free stacking (Same Suit & Color allowed). Click to toggle to Classic alternating colors."
                : "Current: Classic alternating colors (Red ↔ Black). Click to allow same suit & color stacking."
            }
          >
            <span>
              Stacking:{" "}
              <strong style={{ color: ruleMode === "any" ? "#38bdf8" : "#fbbf24" }}>
                {ruleMode === "any" ? "Same Color & Suit Allowed" : "Classic (Alternating)"}
              </strong>
            </span>
          </button>
          <button
            type="button"
            className="ribbon-btn"
            onClick={() => {
              alert(
                "Solitaire Stacking & Set Completion Rules:\n\n• Completed Sets (K → A):\nWhenever you assemble a full descending run from King down to Ace (K → Q → J → 10 → 9 → 8 → 7 → 6 → 5 → 4 → 3 → 2 → A), the game immediately detects it, automatically sweeps it into the Foundation, turns the underlying card face-up, and awards +150 bonus points!\n\n• Stacking Modes:\n- 'Same Color & Suit Allowed' (Active): You can stack any descending cards together!\n- 'Classic (Alternating)': Traditional Klondike where cards alternate red and black.\n\n• 'Auto Complete / Sweep' Button:\nClick at any time to sweep completed K → A sets and cascade ready cards into the foundations!"
              );
            }}
            title="Game rules & tips"
          >
            <FiHelpCircle /> Rules
          </button>
        </div>

        <div className="ribbon-right">
          <div className="stat-pill">
            <span>Score:</span>
            <strong>{score}</strong>
          </div>
          <div className="stat-pill">
            <span>Moves:</span>
            <strong>{moves}</strong>
          </div>
          <div className="stat-pill">
            <span>Time:</span>
            <strong>{formatTime(seconds)}</strong>
          </div>
          <button
            type="button"
            className="sound-btn"
            onClick={() => {
              sounds.enabled = !soundEnabled;
              setSoundEnabled(!soundEnabled);
            }}
            title={soundEnabled ? "Mute audio" : "Unmute audio"}
          >
            {soundEnabled ? <FiVolume2 /> : <FiVolumeX />}
          </button>
        </div>
      </RibbonBar>

      {/* Emerald Felt Board */}
      <FeltTable ref={tableRef} onClick={() => setSelectedCard(null)}>
        {/* Completed Set / Alert Toast Banner */}
        {toastMsg && (
          <ToastBanner onClick={(e) => e.stopPropagation()}>
            <span>{toastMsg}</span>
            <button
              type="button"
              className="toast-close"
              onClick={() => setToastMsg(null)}
              title="Dismiss"
            >
              <VscClose />
            </button>
          </ToastBanner>
        )}
        {/* Top Board: Stock, Waste, and Foundations */}
        <TopBoard onClick={(e) => e.stopPropagation()}>
          <StockWasteRow>
            {/* Stock Pile */}
            <CardSlotFrame
              onClick={handleStockClick}
              style={{ cursor: "pointer" }}
              title="Click to deal card"
            >
              {stock.length > 0 ? (
                <WindowsCardBack />
              ) : (
                <FiRefreshCw style={{ fontSize: "24px", color: "rgba(255,255,255,0.35)" }} />
              )}
            </CardSlotFrame>

            {/* Waste Pile */}
            <CardSlotFrame>
              {waste.length > 0 && (
                <CardComponent
                  card={waste[waste.length - 1]}
                  isGhost={
                    dragState?.source === "waste" && dragState.hasMoved
                  }
                  isSelected={selectedCard?.source === "waste"}
                  onPointerDown={(e) =>
                    handlePointerDownCard(
                      e,
                      "waste",
                      null,
                      waste.length - 1,
                      waste[waste.length - 1]
                    )
                  }
                  onDoubleClick={() =>
                    handleSmartAutoMove(
                      waste[waste.length - 1],
                      "waste",
                      null
                    )
                  }
                />
              )}
            </CardSlotFrame>
          </StockWasteRow>

          {/* 4 Foundation Slots */}
          <FoundationsRow>
            {foundations.map((pile, idx) => (
              <CardSlotFrame
                key={idx}
                ref={(el) => (foundationRefs.current[idx] = el)}
                $highlight={
                  hoverTarget?.type === "foundation" &&
                  hoverTarget.index === idx
                }
              >
                {pile.length > 0 ? (
                  <CardComponent
                    card={pile[pile.length - 1]}
                    isGhost={
                      dragState?.source === "foundation" &&
                      dragState.sourceIdx === idx &&
                      dragState.hasMoved
                    }
                    onPointerDown={(e) =>
                      handlePointerDownCard(
                        e,
                        "foundation",
                        idx,
                        pile.length - 1,
                        pile[pile.length - 1]
                      )
                    }
                  />
                ) : (
                  <div className="watermark">
                    {renderSuitIcon(SUIT_DEFS[idx].symbol, 24)}
                    <span>A</span>
                  </div>
                )}
              </CardSlotFrame>
            ))}
          </FoundationsRow>
        </TopBoard>

        {/* 7 Tableau Columns */}
        <TableauBoard onClick={(e) => e.stopPropagation()}>
          {tableau.map((col, colIdx) => (
            <TableauCol
              key={colIdx}
              ref={(el) => (tableauRefs.current[colIdx] = el)}
              $highlight={
                hoverTarget?.type === "tableau" &&
                hoverTarget.index === colIdx
              }
              onClick={() => handleTableauSlotClick(colIdx)}
            >
              {/* Base slot watermark for King placement */}
              <CardSlotFrame
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <div className="watermark">
                  <span style={{ fontSize: "16px" }}>K</span>
                </div>
              </CardSlotFrame>

              {col.map((card, cardIdx) => {
                const isBeingDragged =
                  dragState?.source === "tableau" &&
                  dragState.sourceIdx === colIdx &&
                  cardIdx >= dragState.cardIdx;

                return (
                  <StackItem
                    key={card.id}
                    $top={getTableauCardTop(col, cardIdx)}
                    $zIndex={cardIdx + 1}
                  >
                    <CardComponent
                      card={card}
                      isGhost={isBeingDragged && dragState.hasMoved}
                      isSelected={
                        selectedCard?.source === "tableau" &&
                        selectedCard.sourceIdx === colIdx &&
                        cardIdx >= selectedCard.cardIdx
                      }
                      onPointerDown={(e) =>
                        handlePointerDownCard(e, "tableau", colIdx, cardIdx, card)
                      }
                      onDoubleClick={() => {
                        // If column has completed K -> A run, sweep it!
                        if (col.length >= 13) {
                          const startIdx = col.length - 13;
                          const candidate = col.slice(startIdx);
                          if (
                            candidate.every(
                              (c, i) => c.faceUp && c.val === 13 - i
                            )
                          ) {
                            handleAutoComplete();
                            return;
                          }
                        }
                        if (cardIdx === col.length - 1) {
                          handleSmartAutoMove(card, "tableau", colIdx);
                        }
                      }}
                    />
                  </StackItem>
                );
              })}
            </TableauCol>
          ))}
        </TableauBoard>

        {/* Floating Stack Following Cursor During Active Drag */}
        {dragState && dragState.hasMoved && (
          <DraggingOverlay
            $x={dragState.currentX - dragState.offsetX}
            $y={dragState.currentY - dragState.offsetY}
          >
            {dragState.cards.map((card, i) => (
              <div
                key={card.id}
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  top: `${i * TABLEAU_CARD_GAP_UP}px`,
                  left: 0,
                }}
              >
                <CardComponent
                  card={card}
                  isDragging={true}
                />
              </div>
            ))}
          </DraggingOverlay>
        )}

        {/* Victory Celebration Banner */}
        {isWon && (
          <VictoryBanner>
            <h2>
              <FiAward /> Solitaire Victory!
            </h2>
            <p>
              Outstanding! You completed the game in {formatTime(seconds)} with{" "}
              {moves} moves. Final Score: {score}
            </p>
            <button type="button" onClick={startNewGame}>
              Play Again
            </button>
          </VictoryBanner>
        )}
      </FeltTable>
    </SolitaireRoot>
  );
};

export default SolitaireApp;
