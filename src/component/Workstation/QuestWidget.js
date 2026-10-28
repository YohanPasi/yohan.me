import React, { useState } from "react";
import styled from "styled-components";
import {
  FiCheckCircle,
  FiCircle,
  FiChevronDown,
  FiChevronUp,
  FiMail,
  FiAward,
} from "react-icons/fi";
import { acrylicBlur } from "./styles";
import { fonts } from "../../utils/palette";

const ToastContainer = styled.div`
  position: absolute;
  top: 14px;
  right: 180px; /* Leaves space for QuickExitBtn on right */
  width: 360px;
  max-width: calc(100vw - 200px);
  z-index: 1000;
  border-radius: 10px;
  background: rgba(22, 27, 34, 0.92);
  ${acrylicBlur};
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    right: 12px;
    top: 54px;
    width: calc(100vw - 24px);
    max-width: 100%;
  }
`;

const ToastHeader = styled.div`
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: ${(props) =>
    props.$minimized ? "none" : "1px solid rgba(255, 255, 255, 0.08)"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .left {
    display: flex;
    align-items: center;
    gap: 8px;

    .icon-badge {
      color: #38bdf8;
      font-size: 15px;
      display: flex;
    }

    strong {
      font-size: 12px;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    span.counter {
      font-size: 10px;
      padding: 1px 6px;
      border-radius: 10px;
      background: ${(props) =>
        props.$allDone ? "#107c41" : "rgba(0, 120, 212, 0.3)"};
      color: #ffffff;
      font-family: ${fonts.mono};
      font-weight: 700;
    }
  }

  .toggle-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    padding: 2px;
  }
`;

const ToastBody = styled.div`
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p.intro {
    font-size: 11px;
    line-height: 1.45;
    color: #94a3b8;
    margin: 0;
  }

  .progress-bar-wrap {
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #0078d4, #10b981);
      transition: width 0.3s ease;
    }
  }

  .quest-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .quest-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.07);
      border-color: rgba(255, 255, 255, 0.12);
    }

    svg.check {
      color: #10b981;
      font-size: 13px;
      margin-top: 1px;
      flex-shrink: 0;
    }

    svg.uncheck {
      color: #64748b;
      font-size: 13px;
      margin-top: 1px;
      flex-shrink: 0;
    }

    .quest-text {
      font-size: 11px;
      color: #cbd5e1;
      line-height: 1.35;

      &.done {
        color: #94a3b8;
        text-decoration: line-through;
      }
    }
  }

  .complete-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    border-radius: 6px;
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.35);
    margin-top: 2px;

    .all-done-text {
      font-size: 11px;
      font-weight: 600;
      color: #34d399;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    a.hire-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      height: 26px;
      padding: 0 10px;
      border-radius: 4px;
      background: #10b981;
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.15s ease;

      &:hover {
        background: #059669;
      }
    }
  }
`;

const QuestWidget = ({
  completedQuests,
  onTriggerQuestAction,
  onExitWorkstation,
}) => {
  const [minimized, setMinimized] = useState(false);

  const questItems = [
    {
      id: "inspect_csharp",
      title: "Inspect C# Clean Architecture API",
      action: "open_vscode_csharp",
    },
    {
      id: "run_tests",
      title: "Run Unit Tests in Integrated Terminal",
      action: "run_terminal_tests",
    },
    {
      id: "inspect_angular",
      title: "Inspect Angular 17 Signals & OnPush",
      action: "open_vscode_angular",
    },
    {
      id: "view_resume",
      title: "Review Verified Resume & SLIIT Profile",
      action: "open_resume",
    },
  ];

  const completedCount = Object.values(completedQuests).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / questItems.length) * 100);
  const allDone = completedCount === questItems.length;

  return (
    <ToastContainer>
      <ToastHeader
        $minimized={minimized}
        $allDone={allDone}
        onClick={() => setMinimized((m) => !m)}
      >
        <div className="left">
          <span className="icon-badge">
            <FiAward />
          </span>
          <strong>Technical Evaluation Guide</strong>
          <span className="counter">
            {completedCount}/{questItems.length}
          </span>
        </div>
        <button
          type="button"
          className="toggle-btn"
          aria-label={minimized ? "Expand Guide" : "Minimize Guide"}
        >
          {minimized ? <FiChevronDown /> : <FiChevronUp />}
        </button>
      </ToastHeader>

      {!minimized && (
        <ToastBody>
          <p className="intro">
            Interactive mission checklist to evaluate Yohan's production code,
            unit tests, and architecture patterns first-hand.
          </p>

          <div className="progress-bar-wrap">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="quest-list">
            {questItems.map((item) => {
              const isDone = !!completedQuests[item.id];
              return (
                <div
                  key={item.id}
                  className="quest-item"
                  onClick={() => onTriggerQuestAction(item.action)}
                  title={`Click to ${item.title}`}
                >
                  {isDone ? (
                    <FiCheckCircle className="check" />
                  ) : (
                    <FiCircle className="uncheck" />
                  )}
                  <div className={`quest-text ${isDone ? "done" : ""}`}>
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>

          {allDone && (
            <div className="complete-cta">
              <span className="all-done-text">
                <FiAward /> 100% Evaluation Complete
              </span>
              <a
                className="hire-btn"
                href="#contact"
                onClick={() => {
                  if (onExitWorkstation) onExitWorkstation();
                }}
              >
                <FiMail /> Hire Yohan
              </a>
            </div>
          )}
        </ToastBody>
      )}
    </ToastContainer>
  );
};

export default QuestWidget;
