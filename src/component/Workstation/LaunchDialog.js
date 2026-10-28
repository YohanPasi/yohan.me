import React from "react";
import styled from "styled-components";
import {
  FiX,
  FiShield,
  FiCode,
  FiLayers,
  FiArrowRight,
} from "react-icons/fi";
import { fonts } from "../../utils/palette";

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DialogCard = styled.div`
  width: 100%;
  max-width: 540px;
  background: #141822;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 120, 212, 0.15);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes scaleUp {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const DialogHeader = styled.div`
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
    gap: 8px;

    .win-logo {
      display: grid;
      grid-template-columns: repeat(2, 6px);
      grid-template-rows: repeat(2, 6px);
      gap: 1.5px;

      span {
        background: #0078d4;
        border-radius: 0.5px;
      }
    }

    strong {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: #94a3b8;
      text-transform: uppercase;
    }
  }

  button.close-icon {
    background: transparent;
    border: none;
    color: #94a3b8;
    width: 26px;
    height: 26px;
    border-radius: 4px;
    display: grid;
    place-items: center;
    cursor: pointer;
    font-size: 15px;
    transition: all 0.15s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
  }
`;

const DialogBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  .hero-titles {
    display: flex;
    flex-direction: column;
    gap: 4px;

    h2 {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.02em;
    }

    p.sub {
      font-size: 13px;
      color: #94a3b8;
      margin: 0;
      line-height: 1.45;
    }
  }

  .features-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);

      .icon-box {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: grid;
        place-items: center;
        font-size: 15px;
        flex-shrink: 0;

        &.code {
          background: rgba(81, 43, 212, 0.2);
          color: #a855f7;
          border: 1px solid rgba(81, 43, 212, 0.35);
        }
        &.security {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.35);
        }
        &.arch {
          background: rgba(0, 120, 212, 0.2);
          color: #38bdf8;
          border: 1px solid rgba(0, 120, 212, 0.35);
        }
      }

      .text {
        strong {
          display: block;
          font-size: 12.5px;
          color: #f1f5f9;
          font-weight: 600;
        }
        small {
          font-size: 11.5px;
          color: #94a3b8;
          line-height: 1.35;
          display: block;
          margin-top: 2px;
        }
      }
    }
  }

  .sys-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    font-size: 10.5px;
    font-family: ${fonts.mono};
    color: #64748b;

    span {
      padding: 3px 8px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
  }
`;

const DialogFooter = styled.div`
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  button.cancel-btn {
    height: 36px;
    padding: 0 16px;
    border-radius: 6px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: #cbd5e1;
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }
  }

  button.launch-btn {
    height: 36px;
    padding: 0 18px;
    border-radius: 6px;
    background: #0078d4;
    border: none;
    color: #ffffff;
    font-size: 12.5px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 120, 212, 0.45);
    transition: all 0.15s ease;

    &:hover {
      background: #1084d8;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(0, 120, 212, 0.6);
    }
  }
`;

const LaunchDialog = ({ onConfirm, onCancel }) => {
  return (
    <ModalBackdrop onClick={onCancel}>
      <DialogCard onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <div className="left">
            <div className="win-logo" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <strong>Virtual Cloud Workstation</strong>
          </div>
          <button
            type="button"
            className="close-icon"
            onClick={onCancel}
            title="Cancel and stay on website (Esc)"
          >
            <FiX />
          </button>
        </DialogHeader>

        <DialogBody>
          <div className="hero-titles">
            <h2>Launch Windows 11 Developer Workstation?</h2>
            <p className="sub">
              An interactive assessment sandbox designed for engineering leads,
              technical recruiters, and peers to evaluate Yohan Pasindu&apos;s
              codebase in real time.
            </p>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <div className="icon-box code">
                <FiCode />
              </div>
              <div className="text">
                <strong>Visual Studio Code &amp; Clean Architecture</strong>
                <small>
                  Inspect production C# .NET 8 Web API, MediatR CQRS handlers,
                  and Angular 17 Standalone Signals.
                </small>
              </div>
            </div>

            <div className="feature-item">
              <div className="icon-box security">
                <FiShield />
              </div>
              <div className="text">
                <strong>Interactive Production Hotfix Challenge</strong>
                <small>
                  Investigate a failing security unit test, apply the
                  constant-time comparison patch, and verify Build #1042.
                </small>
              </div>
            </div>

            <div className="feature-item">
              <div className="icon-box arch">
                <FiLayers />
              </div>
              <div className="text">
                <strong>Interactive Tools &amp; Terminal</strong>
                <small>
                  Run live commands in PowerShell, view architectural layers,
                  and download Yohan&apos;s verified credentials.
                </small>
              </div>
            </div>
          </div>

          <div className="sys-chips">
            <span>.NET 8.0 SDK</span>
            <span>Windows 11 Pro</span>
            <span>Zero Installation</span>
            <span>Press Esc anytime to exit</span>
          </div>
        </DialogBody>

        <DialogFooter>
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Stay on Website
          </button>
          <button
            type="button"
            className="launch-btn"
            onClick={onConfirm}
            autoFocus
          >
            Launch Workstation <FiArrowRight />
          </button>
        </DialogFooter>
      </DialogCard>
    </ModalBackdrop>
  );
};

export default LaunchDialog;
