"use client";

import { useEffect, useState } from "react";
import { useWorldState } from "@/hooks/useWorldState";
import projects from "@/data/projects";

export default function InteractionPrompt() {
  const { state, activeProjectId, enterProject } = useWorldState();
  const [visible, setVisible] = useState(false);

  const project = projects.find((p) => p.id === activeProjectId);

  useEffect(() => {
    if (state === "NEAR_PROJECT") {
      const t = setTimeout(() => setVisible(true), 120);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [state]);

  if (!project) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "52px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0px" : "12px"})`,
        transition: "opacity 0.35s ease, transform 0.35s ease",
        opacity: visible && state === "NEAR_PROJECT" ? 1 : 0,
        pointerEvents: visible && state === "NEAR_PROJECT" ? "auto" : "none",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <div
        style={{
          background: "rgba(245, 240, 235, 0.96)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(200, 192, 184, 0.5)",
          borderRadius: "16px",
          padding: "14px 24px",
          textAlign: "center",
          boxShadow: "0 4px 24px rgba(61, 53, 48, 0.08)",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: "#8A7F78",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            margin: "0 0 4px 0",
          }}
        >
          {project.company} · {project.year}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            color: "#3D3530",
            margin: "0 0 10px 0",
          }}
        >
          {project.title}
        </p>
        <button
          onClick={() => enterProject(project.id)}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: "#F5F0EB",
            background: "#3D3530",
            border: "none",
            borderRadius: "24px",
            padding: "8px 20px",
            cursor: "pointer",
            letterSpacing: "0.06em",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Enter project <span>→</span>
        </button>
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "10px",
          color: "#B0A898",
          letterSpacing: "0.06em",
        }}
      >
        or press Enter
      </p>
    </div>
  );
}
