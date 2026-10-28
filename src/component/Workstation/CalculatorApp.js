import React, { useState } from "react";
import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import { FiDelete } from "react-icons/fi";
import { Win11CalculatorIcon } from "./WindowsIcons";

const CalculatorRoot = styled.div`
  width: 100%;
  height: 100%;
  background: #1f232b;
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

    .calc-icon {
      font-size: 14px;
      color: #0078d4;
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

const CalcBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 8px;
  background: #1c2027;
`;

const Display = styled.div`
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  height: 90px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.06);

  .equation {
    font-size: 12px;
    color: #94a3b8;
    min-height: 16px;
  }

  .current {
    font-size: 32px;
    font-weight: 300;
    color: #ffffff;
    letter-spacing: -0.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
`;

const KeypadGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 5px;

  button {
    border-radius: 4px;
    background: #282c37;
    border: 1px solid rgba(255, 255, 255, 0.06);
    color: #f1f5f9;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: background 0.12s ease, border-color 0.12s ease;

    &:hover {
      background: #343a47;
      border-color: rgba(255, 255, 255, 0.15);
    }

    &:active {
      background: #0078d4;
    }

    &.op {
      background: #222631;
      color: #38bdf8;
      font-size: 15px;

      &:hover {
        background: #2d3342;
      }
    }

    &.equals {
      background: #0078d4;
      color: #ffffff;
      font-weight: 600;
      font-size: 16px;

      &:hover {
        background: #1084d8;
      }
    }

    &.func {
      background: #222631;
      color: #94a3b8;
      font-size: 12px;
    }
  }
`;

const CalculatorApp = ({ onClose, onMinimize, isMaximized, onToggleMaximize }) => {
  const [current, setCurrent] = useState("0");
  const [prev, setPrev] = useState(null);
  const [operator, setOperator] = useState(null);
  const [equation, setEquation] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setCurrent(String(digit));
      setWaitingForOperand(false);
    } else {
      setCurrent(current === "0" ? String(digit) : current + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setCurrent("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!current.includes(".")) {
      setCurrent(current + ".");
    }
  };

  const clearAll = () => {
    setCurrent("0");
    setPrev(null);
    setOperator(null);
    setEquation("");
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setCurrent("0");
  };

  const backspace = () => {
    if (waitingForOperand) return;
    if (current.length > 1) {
      setCurrent(current.slice(0, -1));
    } else {
      setCurrent("0");
    }
  };

  const toggleSign = () => {
    setCurrent(String(-parseFloat(current)));
  };

  const percent = () => {
    const val = parseFloat(current);
    setCurrent(String(val / 100));
  };

  const square = () => {
    const val = parseFloat(current);
    setCurrent(String(val * val));
    setEquation(`sqr(${val})`);
  };

  const sqrt = () => {
    const val = parseFloat(current);
    if (val < 0) {
      setCurrent("Error");
      return;
    }
    setCurrent(String(Math.sqrt(val)));
    setEquation(`√(${val})`);
  };

  const invert = () => {
    const val = parseFloat(current);
    if (val === 0) {
      setCurrent("Error");
      return;
    }
    setCurrent(String(1 / val));
    setEquation(`1/(${val})`);
  };

  const handleOperator = (nextOp) => {
    const inputValue = parseFloat(current);

    if (prev === null) {
      setPrev(inputValue);
      setEquation(`${inputValue} ${nextOp}`);
    } else if (operator) {
      const result = calculate(prev, inputValue, operator);
      setPrev(result);
      setCurrent(String(result));
      setEquation(`${result} ${nextOp}`);
    }

    setWaitingForOperand(true);
    setOperator(nextOp);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b !== 0 ? a / b : 0;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (operator === null || prev === null) return;

    const inputValue = parseFloat(current);
    const result = calculate(prev, inputValue, operator);

    setEquation(`${prev} ${operator} ${inputValue} =`);
    setCurrent(String(result));
    setPrev(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  return (
    <CalculatorRoot>
      <TitleBar
        className="window-titlebar"
        onDoubleClick={(e) => {
          e.stopPropagation();
          onToggleMaximize();
        }}
      >
        <div className="title-left">
          <Win11CalculatorIcon size={16} />
          <span>Calculator</span>
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

      <CalcBody>
        <Display>
          <div className="equation">{equation}</div>
          <div className="current">{current}</div>
        </Display>

        <KeypadGrid>
          <button type="button" className="func" onClick={percent}>%</button>
          <button type="button" className="func" onClick={clearEntry}>CE</button>
          <button type="button" className="func" onClick={clearAll}>C</button>
          <button type="button" className="func" onClick={backspace}><FiDelete /></button>

          <button type="button" className="func" onClick={invert}>1/x</button>
          <button type="button" className="func" onClick={square}>x²</button>
          <button type="button" className="func" onClick={sqrt}>√x</button>
          <button type="button" className="op" onClick={() => handleOperator("÷")}>÷</button>

          <button type="button" onClick={() => inputDigit(7)}>7</button>
          <button type="button" onClick={() => inputDigit(8)}>8</button>
          <button type="button" onClick={() => inputDigit(9)}>9</button>
          <button type="button" className="op" onClick={() => handleOperator("×")}>×</button>

          <button type="button" onClick={() => inputDigit(4)}>4</button>
          <button type="button" onClick={() => inputDigit(5)}>5</button>
          <button type="button" onClick={() => inputDigit(6)}>6</button>
          <button type="button" className="op" onClick={() => handleOperator("-")}>-</button>

          <button type="button" onClick={() => inputDigit(1)}>1</button>
          <button type="button" onClick={() => inputDigit(2)}>2</button>
          <button type="button" onClick={() => inputDigit(3)}>3</button>
          <button type="button" className="op" onClick={() => handleOperator("+")}>+</button>

          <button type="button" onClick={toggleSign}>+/-</button>
          <button type="button" onClick={() => inputDigit(0)}>0</button>
          <button type="button" onClick={inputDot}>.</button>
          <button type="button" className="equals" onClick={handleEquals}>=</button>
        </KeypadGrid>
      </CalcBody>
    </CalculatorRoot>
  );
};

export default CalculatorApp;
