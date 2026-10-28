import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiArrowRight, FiWifi, FiPower } from "react-icons/fi";
import { BootRing } from "./styles";
import HeroImg from "../../images/image01.jpg";
import { Bio } from "../../data/constants";

const LockScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 56px 32px 32px;
  background: radial-gradient(
      circle at 60% 30%,
      rgba(24, 75, 160, 0.65) 0%,
      rgba(15, 30, 75, 0.85) 45%,
      rgba(6, 10, 20, 0.98) 100%
    ),
    #050811;
  font-family: "Segoe UI Variable Text", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
  user-select: none;
`;

const TimeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
  z-index: 2;

  .clock {
    font-size: clamp(60px, 9vw, 84px);
    font-weight: 200;
    letter-spacing: -0.04em;
    color: #ffffff;
    line-height: 1;
    font-family: "Segoe UI Variable Display", "Segoe UI", sans-serif;
  }

  .date {
    font-size: clamp(14px, 2vw, 18px);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 10px;
    letter-spacing: -0.01em;
  }
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: 2;
  margin-top: -30px;

  .avatar-wrap {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.35);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .user-name {
    font-size: 26px;
    font-weight: 400;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
`;

const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 250px;

  .pin-row {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      height: 34px;
      padding: 0 38px 0 12px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.35);
      color: #ffffff;
      font-size: 13px;
      outline: none;
      letter-spacing: 0.15em;
      transition: all 0.15s ease;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
        letter-spacing: normal;
      }

      &:focus {
        border-color: #0078d4;
        background: rgba(0, 0, 0, 0.65);
        box-shadow: 0 0 0 1px #0078d4;
      }
    }

    button.submit-arrow {
      position: absolute;
      right: 2px;
      top: 2px;
      width: 30px;
      height: 30px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid transparent;
      color: #ffffff;
      display: grid;
      place-items: center;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.15s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .signin-options {
    font-size: 12.5px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: #ffffff;
      text-decoration: underline;
    }
  }
`;

const WelcomeState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  height: 70px;

  .welcome-text {
    font-size: 16px;
    font-weight: 300;
    color: #ffffff;
    letter-spacing: 0.02em;
  }
`;

const BottomBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  z-index: 2;

  .sys-btn {
    width: 38px;
    height: 38px;
    border-radius: 4px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.85);
    display: grid;
    place-items: center;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.15s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
    }
  }
`;

const LoginScreen = ({ onLogin }) => {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [pin, setPin] = useState("••••");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setTimeStr(`${formattedHours}:${formattedMinutes}`);

      const options = { weekday: "long", month: "long", day: "numeric" };
      setDateStr(now.toLocaleDateString("en-US", options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSignIn = (e) => {
    if (e) e.preventDefault();
    setLoggingIn(true);
    setTimeout(() => {
      onLogin();
    }, 700);
  };

  return (
    <LockScreenContainer>
      <TimeHeader>
        <div className="clock">{timeStr || "12:00"}</div>
        <div className="date">{dateStr || "Wednesday, October 28"}</div>
      </TimeHeader>

      <ProfileCard>
        <div className="avatar-wrap">
          <img src={HeroImg} alt={Bio.name} />
        </div>
        <div className="user-name">{Bio.name}</div>

        {!loggingIn ? (
          <FormArea onSubmit={handleSignIn}>
            <div className="pin-row">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN"
                aria-label="PIN"
                autoFocus
              />
              <button type="submit" className="submit-arrow" title="Sign In">
                <FiArrowRight />
              </button>
            </div>
            <div className="signin-options" onClick={handleSignIn}>
              Sign-in options
            </div>
          </FormArea>
        ) : (
          <WelcomeState>
            <BootRing style={{ width: 28, height: 28 }}>
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </BootRing>
            <div className="welcome-text">Welcome</div>
          </WelcomeState>
        )}
      </ProfileCard>

      <BottomBar>
        <button
          type="button"
          className="sys-btn"
          title="Internet Access: Connected"
        >
          <FiWifi />
        </button>
        <button
          type="button"
          className="sys-btn"
          title="Power"
          onClick={handleSignIn}
        >
          <FiPower />
        </button>
      </BottomBar>
    </LockScreenContainer>
  );
};

export default LoginScreen;
