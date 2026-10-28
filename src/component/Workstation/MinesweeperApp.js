import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import { FiFlag, FiRefreshCw } from "react-icons/fi";
import { Win11MinesweeperIcon } from "./WindowsIcons";

const MinesweeperRoot = styled.div`
  width: 100%;
  height: 100%;
  background: #1c2028;
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

    .game-icon {
      font-size: 15px;
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

const GameContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: #151820;
`;

const HeaderBar = styled.div`
  width: 100%;
  max-width: 380px;
  background: #20242e;
  border: 2px solid #2d3340;
  border-radius: 8px 8px 0 0;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .counter-box {
    background: #000000;
    border: 1px solid #334155;
    color: #ef4444;
    font-family: "Courier New", monospace;
    font-size: 22px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    min-width: 54px;
    text-align: center;
    letter-spacing: 2px;
  }

  .face-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #2d3340;
    border: 2px solid rgba(255, 255, 255, 0.15);
    display: grid;
    place-items: center;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.1s ease, background 0.15s ease;

    &:hover {
      background: #374151;
    }

    &:active {
      transform: scale(0.92);
    }
  }

  .flag-mode-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 10px;
    border-radius: 4px;
    background: ${(props) => (props.$flagMode ? "#ef4444" : "#2d3340")};
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.12);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;
  }
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$cols}, 34px);
  grid-template-rows: repeat(${(props) => props.$rows}, 34px);
  gap: 2px;
  background: #20242e;
  border: 2px solid #2d3340;
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 10px;
`;

const CellBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 4px;
  border: none;
  font-weight: 700;
  font-size: 14px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.1s ease;

  background: ${(props) =>
    props.$revealed
      ? props.$isMine
        ? "#ef4444"
        : "#12151b"
      : "#2d3340"};

  border: 1px solid
    ${(props) =>
      props.$revealed ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.12)"};

  color: ${(props) => {
    switch (props.$val) {
      case 1:
        return "#38bdf8";
      case 2:
        return "#4ade80";
      case 3:
        return "#f87171";
      case 4:
        return "#818cf8";
      case 5:
        return "#f59e0b";
      default:
        return "#cbd5e1";
    }
  }};

  &:hover {
    background: ${(props) =>
      props.$revealed ? (props.$isMine ? "#ef4444" : "#12151b") : "#3a4252"};
  }
`;

const DifficultyBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;

  button {
    padding: 4px 10px;
    border-radius: 4px;
    background: ${(props) => (props.$active ? "#0078d4" : "rgba(255, 255, 255, 0.08)")};
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
    font-size: 11px;
    cursor: pointer;

    &:hover {
      background: #0078d4;
    }
  }
`;

const MinesweeperApp = ({ onClose, onMinimize, isMaximized, onToggleMaximize }) => {
  const [rows] = useState(9);
  const [cols] = useState(9);
  const [minesCount] = useState(10);

  const [grid, setGrid] = useState([]);
  const [status, setStatus] = useState("idle"); // "idle" | "playing" | "won" | "lost"
  const [flagsRemaining, setFlagsRemaining] = useState(10);
  const [timer, setTimer] = useState(0);
  const [flagMode, setFlagMode] = useState(false);

  // Initialize Board
  const initBoard = useCallback(() => {
    let board = [];
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < cols; c++) {
        row.push({
          r,
          c,
          isMine: false,
          revealed: false,
          flagged: false,
          count: 0,
        });
      }
      board.push(row);
    }

    // Plant random mines
    let planted = 0;
    while (planted < minesCount) {
      let rr = Math.floor(Math.random() * rows);
      let cc = Math.floor(Math.random() * cols);
      if (!board[rr][cc].isMine) {
        board[rr][cc].isMine = true;
        planted++;
      }
    }

    // Count neighbor mines
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!board[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              let nr = r + dr;
              let nc = c + dc;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                if (board[nr][nc].isMine) count++;
              }
            }
          }
          board[r][c].count = count;
        }
      }
    }

    setGrid(board);
    setStatus("idle");
    setFlagsRemaining(minesCount);
    setTimer(0);
  }, [rows, cols, minesCount]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  // Timer
  useEffect(() => {
    let interval = null;
    if (status === "playing") {
      interval = setInterval(() => {
        setTimer((t) => Math.min(999, t + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  // Reveal Cell
  const revealCell = (r, c) => {
    if (status === "won" || status === "lost") return;
    if (grid[r][c].revealed || grid[r][c].flagged) return;

    if (status === "idle") {
      setStatus("playing");
    }

    // Hit mine!
    if (grid[r][c].isMine) {
      // Reveal all mines
      const nextGrid = grid.map((row) =>
        row.map((cell) => {
          if (cell.isMine) return { ...cell, revealed: true };
          return cell;
        })
      );
      setGrid(nextGrid);
      setStatus("lost");
      return;
    }

    // Reveal safe cell & cascade blanks
    const nextGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const stack = [[r, c]];

    while (stack.length > 0) {
      const [cr, cc] = stack.pop();
      if (nextGrid[cr][cc].revealed) continue;

      nextGrid[cr][cc].revealed = true;

      if (nextGrid[cr][cc].count === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            let nr = cr + dr;
            let nc = cc + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              if (
                !nextGrid[nr][nc].revealed &&
                !nextGrid[nr][nc].isMine &&
                !nextGrid[nr][nc].flagged
              ) {
                stack.push([nr, nc]);
              }
            }
          }
        }
      }
    }

    // Check Win condition
    let unrevealedSafe = 0;
    for (let ro = 0; ro < rows; ro++) {
      for (let co = 0; co < cols; co++) {
        if (!nextGrid[ro][co].isMine && !nextGrid[ro][co].revealed) {
          unrevealedSafe++;
        }
      }
    }

    setGrid(nextGrid);

    if (unrevealedSafe === 0) {
      setStatus("won");
    }
  };

  // Toggle Flag
  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (status === "won" || status === "lost") return;
    if (grid[r][c].revealed) return;

    const nextGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const isCurrentlyFlagged = nextGrid[r][c].flagged;

    if (!isCurrentlyFlagged && flagsRemaining > 0) {
      nextGrid[r][c].flagged = true;
      setFlagsRemaining((f) => f - 1);
    } else if (isCurrentlyFlagged) {
      nextGrid[r][c].flagged = false;
      setFlagsRemaining((f) => f + 1);
    }

    setGrid(nextGrid);
  };

  const getSmiley = () => {
    if (status === "lost") return "😵";
    if (status === "won") return "😎";
    return "😊";
  };

  return (
    <MinesweeperRoot>
      <TitleBar
        className="window-titlebar"
        onDoubleClick={(e) => {
          e.stopPropagation();
          onToggleMaximize();
        }}
      >
        <div className="title-left">
          <Win11MinesweeperIcon size={16} />
          <span>Minesweeper</span>
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

      <GameContainer>
        <HeaderBar $flagMode={flagMode}>
          <div className="counter-box">
            {String(flagsRemaining).padStart(3, "0")}
          </div>

          <button
            type="button"
            className="face-btn"
            onClick={initBoard}
            title="Reset Game"
          >
            {getSmiley()}
          </button>

          <button
            type="button"
            className="flag-mode-btn"
            onClick={() => setFlagMode((m) => !m)}
            title="Toggle Flag Mode (or right-click cells)"
          >
            <FiFlag />
            <span>{flagMode ? "FLAG ON" : "FLAG"}</span>
          </button>

          <div className="counter-box">
            {String(timer).padStart(3, "0")}
          </div>
        </HeaderBar>

        <BoardGrid $rows={rows} $cols={cols}>
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <CellBtn
                key={`${r}-${c}`}
                $revealed={cell.revealed}
                $isMine={cell.isMine}
                $val={cell.count}
                onClick={() => {
                  if (flagMode) {
                    toggleFlag({ preventDefault: () => {} }, r, c);
                  } else {
                    revealCell(r, c);
                  }
                }}
                onContextMenu={(e) => toggleFlag(e, r, c)}
              >
                {cell.revealed ? (
                  cell.isMine ? (
                    "💣"
                  ) : cell.count > 0 ? (
                    cell.count
                  ) : (
                    ""
                  )
                ) : cell.flagged ? (
                  "🚩"
                ) : (
                  ""
                )}
              </CellBtn>
            ))
          )}
        </BoardGrid>

        <DifficultyBar>
          <button type="button" onClick={initBoard}>
            <FiRefreshCw style={{ marginRight: "4px" }} /> New Game
          </button>
        </DifficultyBar>
      </GameContainer>
    </MinesweeperRoot>
  );
};

export default MinesweeperApp;
