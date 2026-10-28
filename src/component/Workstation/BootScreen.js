import React, { useEffect } from "react";
import styled from "styled-components";
import { BootRing } from "./styles";

const BootContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  user-select: none;
`;

const WindowsLogo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 26px);
  grid-template-rows: repeat(2, 26px);
  gap: 3px;
  margin-bottom: 72px;

  .tile {
    background: #0078d4;
    border-radius: 1px;
  }
`;

const SpinnerArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: 80px;

  .subtext {
    font-size: 13px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    font-family: "Segoe UI Variable Text", "Segoe UI", sans-serif;
    letter-spacing: -0.01em;
  }
`;

const BootScreen = ({ onFinish }) => {
  useEffect(() => {
    // Windows 11 boot lasts ~1.8 seconds then advances to login
    const timer = setTimeout(() => {
      onFinish();
    }, 1800);

    const handleKeyDown = () => {
      clearTimeout(timer);
      onFinish();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onFinish]);

  return (
    <BootContainer onClick={onFinish} title="Click to skip">
      <WindowsLogo aria-label="Windows 11">
        <div className="tile" />
        <div className="tile" />
        <div className="tile" />
        <div className="tile" />
      </WindowsLogo>

      <SpinnerArea>
        <BootRing>
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </BootRing>
        <div className="subtext">Please wait...</div>
      </SpinnerArea>
    </BootContainer>
  );
};

export default BootScreen;
