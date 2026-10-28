import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import {
  FiEdit2,
  FiCircle,
  FiSquare,
  FiSlash,
  FiTrash2,
  FiDownload,
  FiRotateCcw,
} from "react-icons/fi";
import { Win11PaintIcon } from "./WindowsIcons";

const PaintRoot = styled.div`
  width: 100%;
  height: 100%;
  background: #202020;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
`;

const TitleBar = styled.div`
  height: 34px;
  background: #1f1f1f;
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

const Ribbon = styled.div`
  background: #2b2b2b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 14px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  .group {
    display: flex;
    align-items: center;
    gap: 6px;
    padding-right: 14px;
    border-right: 1px solid rgba(255, 255, 255, 0.12);

    &:last-child {
      border-right: none;
    }
  }

  button.tool-btn {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background: ${(props) =>
      props.$active ? "rgba(0, 120, 212, 0.3)" : "rgba(255, 255, 255, 0.06)"};
    border: 1px solid
      ${(props) =>
        props.$active ? "rgba(0, 120, 212, 0.6)" : "transparent"};
    color: #ffffff;
    display: grid;
    place-items: center;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.12s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }

  .brush-size-select {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    border-radius: 4px;
    padding: 4px 6px;
    font-size: 11px;
    outline: none;
    cursor: pointer;

    option {
      background: #2b2b2b;
      color: #ffffff;
    }
  }
`;

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 18px);
  gap: 4px;

  .color-dot {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.2);
    transition: transform 0.1s ease, outline 0.1s ease;

    &:hover {
      transform: scale(1.15);
      z-index: 10;
    }

    &.selected {
      outline: 2px solid #0078d4;
      outline-offset: 1px;
    }
  }
`;

const ActiveColorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 9.5px;
  color: #94a3b8;

  .color-preview {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background: ${(props) => props.$color};
    border: 2px solid #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }
`;

const CanvasWorkspace = styled.div`
  flex: 1;
  background: #181818;
  padding: 16px;
  overflow: auto;
  display: grid;
  place-items: center;
  position: relative;
`;

const CanvasFrame = styled.div`
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);
  border: 1px solid #333333;
  background: #ffffff;
  display: block;
  cursor: ${(props) => (props.$tool === "eraser" ? "cell" : "crosshair")};

  canvas {
    display: block;
  }
`;

const StatusBar = styled.div`
  height: 24px;
  background: #1f1f1f;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  font-size: 11px;
  color: #94a3b8;
  font-family: monospace;

  .status-left {
    display: flex;
    gap: 16px;
  }
`;

const PALETTE_COLORS = [
  "#000000",
  "#64748b",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#10b981",
  "#06b6d4",
  "#0078d4",
  "#ffffff",
  "#cbd5e1",
  "#f43f5e",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
  "#84cc16",
  "#3b82f6",
];

const PaintApp = ({
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
}) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("brush"); // 'pencil', 'brush', 'eraser', 'line', 'rectangle', 'circle'
  const [brushSize, setBrushSize] = useState(4);
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState([]);

  // Initialize white canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), imgData]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const prevHistory = history.slice(0, history.length - 1);
    const lastState = prevHistory[prevHistory.length - 1];
    ctx.putImageData(lastState, 0, 0);
    setHistory(prevHistory);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "Untitled_Paint.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: Math.round((e.clientX - rect.left) * scaleX),
      y: Math.round((e.clientY - rect.top) * scaleY),
    };
  };

  const handleMouseDown = (e) => {
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(coords);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (tool === "eraser") {
      ctx.strokeStyle = "#ffffff";
    } else {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
    }

    if (tool === "pencil" || tool === "brush" || tool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const handleMouseMove = (e) => {
    const coords = getCanvasCoords(e);
    setMousePos(coords);

    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (tool === "pencil" || tool === "brush" || tool === "eraser") {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (tool === "line" || tool === "rectangle" || tool === "circle") {
      // Restore previous state before previewing shape
      if (history.length > 0) {
        ctx.putImageData(history[history.length - 1], 0, 0);
      }
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = color;
      ctx.beginPath();

      if (tool === "line") {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      } else if (tool === "rectangle") {
        const w = coords.x - startPos.x;
        const h = coords.y - startPos.y;
        ctx.strokeRect(startPos.x, startPos.y, w, h);
      } else if (tool === "circle") {
        const radius = Math.hypot(coords.x - startPos.x, coords.y - startPos.y);
        ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };

  return (
    <PaintRoot>
      <TitleBar onDoubleClick={onToggleMaximize}>
        <div className="title-left">
          <Win11PaintIcon size={16} />
          <span>Paint • Untitled</span>
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

      <Ribbon>
        {/* Tools Group */}
        <div className="group">
          <button
            type="button"
            className="tool-btn"
            style={{
              background: tool === "brush" ? "rgba(0,120,212,0.4)" : "",
              borderColor: tool === "brush" ? "#0078d4" : "transparent",
            }}
            onClick={() => setTool("brush")}
            title="Brush"
          >
            <FiEdit2 />
          </button>
          <button
            type="button"
            className="tool-btn"
            style={{
              background: tool === "eraser" ? "rgba(0,120,212,0.4)" : "",
              borderColor: tool === "eraser" ? "#0078d4" : "transparent",
            }}
            onClick={() => setTool("eraser")}
            title="Eraser"
          >
            <span style={{ fontSize: "12px", fontWeight: "bold" }}>⌫</span>
          </button>
          <button
            type="button"
            className="tool-btn"
            style={{
              background: tool === "line" ? "rgba(0,120,212,0.4)" : "",
              borderColor: tool === "line" ? "#0078d4" : "transparent",
            }}
            onClick={() => setTool("line")}
            title="Line"
          >
            <FiSlash />
          </button>
          <button
            type="button"
            className="tool-btn"
            style={{
              background: tool === "rectangle" ? "rgba(0,120,212,0.4)" : "",
              borderColor: tool === "rectangle" ? "#0078d4" : "transparent",
            }}
            onClick={() => setTool("rectangle")}
            title="Rectangle"
          >
            <FiSquare />
          </button>
          <button
            type="button"
            className="tool-btn"
            style={{
              background: tool === "circle" ? "rgba(0,120,212,0.4)" : "",
              borderColor: tool === "circle" ? "#0078d4" : "transparent",
            }}
            onClick={() => setTool("circle")}
            title="Ellipse / Circle"
          >
            <FiCircle />
          </button>
        </div>

        {/* Brush Size */}
        <div className="group">
          <select
            className="brush-size-select"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            title="Line thickness / Brush size"
          >
            <option value={2}>2px Thin</option>
            <option value={4}>4px Normal</option>
            <option value={8}>8px Bold</option>
            <option value={16}>16px Heavy</option>
            <option value={24}>24px Marker</option>
          </select>
        </div>

        {/* Color Palette */}
        <div className="group">
          <ActiveColorBox $color={color}>
            <div className="color-preview" />
            <span>Color 1</span>
          </ActiveColorBox>

          <ColorPalette>
            {PALETTE_COLORS.map((c) => (
              <div
                key={c}
                className={`color-dot ${color === c ? "selected" : ""}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                title={c}
              />
            ))}
          </ColorPalette>
        </div>

        {/* Actions Group */}
        <div className="group">
          <button
            type="button"
            className="tool-btn"
            onClick={handleUndo}
            title="Undo"
          >
            <FiRotateCcw />
          </button>
          <button
            type="button"
            className="tool-btn"
            onClick={handleClear}
            title="Clear canvas"
          >
            <FiTrash2 />
          </button>
          <button
            type="button"
            className="tool-btn"
            onClick={handleDownload}
            title="Save PNG"
          >
            <FiDownload />
          </button>
        </div>
      </Ribbon>

      <CanvasWorkspace>
        <CanvasFrame $tool={tool}>
          <canvas
            ref={canvasRef}
            width={720}
            height={460}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </CanvasFrame>
      </CanvasWorkspace>

      <StatusBar>
        <div className="status-left">
          <span>
            {mousePos.x >= 0 && mousePos.x <= 720
              ? `${mousePos.x}, ${mousePos.y}px`
              : "0, 0px"}
          </span>
          <span>720 × 460px</span>
        </div>
        <div>100%</div>
      </StatusBar>
    </PaintRoot>
  );
};

export default PaintApp;
