"use client";

import { useEffect, useState } from "react";
import { useWorldState } from "@/hooks/useWorldState";

export default function MovementHint() {
  const { hasMovedOnce, state } = useWorldState();
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay so it appears after initial load
    const t = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (hasMovedOnce) {
      const t = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(t);
    }
  }, [hasMovedOnce]);

  if (!mounted || state === "VIEWING_PROJECT") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "48px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* Arrow keys visual */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <div style={{ display: "flex", gap: "4px" }}>
          <Key label="↑" />
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          <Key label="←" />
          <Key label="↓" />
          <Key label="→" />
        </div>
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          color: "#8A7F78",
          letterSpacing: "0.08em",
          margin: 0,
        }}
      >
        use arrow keys to explore →
      </p>
    </div>
  );
}

function Key({ label }: { label: string }) {
  return (
    <div
      style={{
        width: "32px",
        height: "32px",
        border: "1.5px solid #C8C0B8",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        color: "#6A6058",
        background: "#F8F4F0",
        boxShadow: "0 2px 0 #C8C0B8",
      }}
    >
      {label}
    </div>
  );
}
