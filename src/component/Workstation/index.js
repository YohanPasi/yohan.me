import React, { useState, useEffect, useCallback } from "react";
import { WorkstationRoot } from "./styles";
import LaunchDialog from "./LaunchDialog";
import BootScreen from "./BootScreen";
import LoginScreen from "./LoginScreen";
import Desktop from "./Desktop";

const Workstation = ({ isOpen: propIsOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState("dialog"); // "dialog" | "boot" | "login" | "desktop"

  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
      if (propIsOpen) {
        setStage("dialog");
      }
    }
  }, [propIsOpen]);

  useEffect(() => {
    const handleOpenWorkstation = () => {
      setIsOpen(true);
      setStage("dialog");
    };

    window.addEventListener("portfolio:openWorkstation", handleOpenWorkstation);
    window.addEventListener("portfolio:run", handleOpenWorkstation);

    return () => {
      window.removeEventListener(
        "portfolio:openWorkstation",
        handleOpenWorkstation
      );
      window.removeEventListener("portfolio:run", handleOpenWorkstation);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setStage("dialog");
    if (onClose) onClose();
  }, [onClose]);

  // Handle ESC key to exit workstation or close dialog
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleRestart = () => {
    setStage("boot");
  };

  const handleLock = () => {
    setStage("login");
  };

  if (!isOpen) return null;

  // Stage 1: Pre-flight briefing modal informing the user before launch
  if (stage === "dialog") {
    return (
      <LaunchDialog
        onConfirm={() => setStage("boot")}
        onCancel={handleClose}
      />
    );
  }

  // Stages 2, 3, 4: Windows 11 Virtual Workstation OS
  return (
    <WorkstationRoot>
      {stage === "boot" && (
        <BootScreen onFinish={() => setStage("login")} />
      )}

      {stage === "login" && (
        <LoginScreen onLogin={() => setStage("desktop")} />
      )}

      {stage === "desktop" && (
        <Desktop
          onExitWorkstation={handleClose}
          onRestartWorkstation={handleRestart}
          onLockScreen={handleLock}
        />
      )}
    </WorkstationRoot>
  );
};

export default Workstation;
