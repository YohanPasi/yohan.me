import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";

const WindowContainer = styled.div`
  position: absolute;
  z-index: ${(props) => props.$zIndex};
  display: ${(props) => (props.$minimized ? "none" : "flex")};
  flex-direction: column;
  overflow: hidden;

  /* If maximized, fill screen above taskbar */
  ${(props) =>
    props.$isMaximized
      ? `
    inset: 0 0 48px 0 !important;
    width: 100% !important;
    height: calc(100% - 48px) !important;
    transform: none !important;
    border-radius: 0 !important;
  `
      : `
    border-radius: 8px;
    box-shadow: 0 16px 50px rgba(0, 0, 0, 0.7);
  `}

  @media (max-width: 768px) {
    inset: 0 0 48px 0 !important;
    width: 100% !important;
    height: calc(100% - 48px) !important;
    transform: none !important;
    border-radius: 0 !important;
  }
`;

const DraggableWindow = ({
  appKey,
  zIndex,
  minimized,
  maximized,
  initialPos = { x: 140, y: 30, width: 880, height: 580 },
  onFocus,
  children,
}) => {
  const [pos, setPos] = useState(() => {
    // Responsive initial position
    const screenW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const screenH = typeof window !== "undefined" ? window.innerHeight : 800;

    const width = Math.min(initialPos.width, screenW - 40);
    const height = Math.min(initialPos.height, screenH - 90);
    const x = Math.max(20, Math.min(initialPos.x, screenW - width - 20));
    const y = Math.max(10, Math.min(initialPos.y, screenH - height - 60));

    return { x, y, width, height };
  });

  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handlePointerDown = useCallback(
    (e) => {
      // Only drag if left click and not maximized
      if (e.button !== 0 || maximized) return;

      // Check if clicked element or parent is a titlebar
      const target = e.target;
      const titleBar = target.closest(
        ".window-titlebar, [data-titlebar='true'], .titlebar-drag"
      );

      // If clicked inside a button or control, don't drag
      if (!titleBar || target.closest("button") || target.closest("a")) {
        return;
      }

      isDraggingRef.current = true;
      dragOffsetRef.current = {
        x: e.clientX - pos.x,
        y: e.clientY - pos.y,
      };

      const handlePointerMove = (moveEvent) => {
        if (!isDraggingRef.current) return;

        const newX = moveEvent.clientX - dragOffsetRef.current.x;
        const newY = moveEvent.clientY - dragOffsetRef.current.y;

        // Keep inside screen bounds
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        const clampedX = Math.max(-pos.width + 100, Math.min(newX, screenW - 100));
        const clampedY = Math.max(0, Math.min(newY, screenH - 80));

        setPos((prev) => ({
          ...prev,
          x: clampedX,
          y: clampedY,
        }));
      };

      const handlePointerUp = () => {
        isDraggingRef.current = false;
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    },
    [maximized, pos.x, pos.y, pos.width]
  );

  return (
    <WindowContainer
      ref={windowRef}
      $zIndex={zIndex}
      $minimized={minimized}
      $isMaximized={maximized}
      style={
        !maximized
          ? {
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${pos.width}px`,
              height: `${pos.height}px`,
            }
          : undefined
      }
      onMouseDown={() => onFocus(appKey)}
      onPointerDown={handlePointerDown}
    >
      {children}
    </WindowContainer>
  );
};

export default DraggableWindow;
