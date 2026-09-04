"use client";

import { useEffect, useState } from "react";
import { setKey } from "@/hooks/useCharacterControls";
import { useWorldState } from "@/hooks/useWorldState";

export default function MobileControls() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { state } = useWorldState();

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (!isTouchDevice || state === "VIEWING_PROJECT") return null;

  const makeHandlers = (key: "left" | "right" | "up" | "down") => ({
    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault();
      setKey(key, true);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault();
      setKey(key, false);
    },
    onMouseDown: () => setKey(key, true),
    onMouseUp: () => setKey(key, false),
    onMouseLeave: () => setKey(key, false),
  });

  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        right: "28px",
        display: "grid",
        gridTemplateColumns: "44px 44px 44px",
        gridTemplateRows: "44px 44px",
        gap: "6px",
        zIndex: 30,
        userSelect: "none",
      }}
    >
      {/* Up */}
      <div style={{ gridColumn: 2, gridRow: 1 }}>
        <DPadButton label="↑" {...makeHandlers("up")} />
      </div>

      {/* Left */}
      <div style={{ gridColumn: 1, gridRow: 2 }}>
        <DPadButton label="←" {...makeHandlers("left")} />
      </div>

      {/* Down */}
      <div style={{ gridColumn: 2, gridRow: 2 }}>
        <DPadButton label="↓" {...makeHandlers("down")} />
      </div>

      {/* Right */}
      <div style={{ gridColumn: 3, gridRow: 2 }}>
        <DPadButton label="→" {...makeHandlers("right")} />
      </div>
    </div>
  );
}

interface DPadButtonProps {
  label: string;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

function DPadButton({ label, ...handlers }: DPadButtonProps) {
  return (
    <button
      {...handlers}
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: "rgba(245, 240, 235, 0.88)",
        border: "1.5px solid rgba(200, 192, 184, 0.6)",
        backdropFilter: "blur(8px)",
        fontSize: "16px",
        color: "#6A6058",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(61, 53, 48, 0.1)",
        WebkitTapHighlightColor: "transparent",
        touchAction: "none",
      }}
      aria-label={`Move ${label}`}
    >
      {label}
    </button>
  );
}
