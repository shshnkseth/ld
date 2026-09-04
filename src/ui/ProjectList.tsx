"use client";

import { useState } from "react";
import projects from "@/data/projects";
import { useWorldState } from "@/hooks/useWorldState";

export default function ProjectList() {
  const [open, setOpen] = useState(false);
  const { enterProject } = useWorldState();

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          color: "#8A7F78",
          background: "rgba(245, 240, 235, 0.9)",
          border: "1px solid rgba(200,192,184,0.5)",
          borderRadius: "20px",
          padding: "7px 14px",
          cursor: "pointer",
          letterSpacing: "0.06em",
          backdropFilter: "blur(8px)",
          zIndex: 30,
        }}
        aria-label="View all projects as list"
      >
        ≡ All projects
      </button>

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="All projects list"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(61, 53, 48, 0.25)",
            backdropFilter: "blur(4px)",
            opacity: open ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "min(420px, 100vw)",
            height: "100vh",
            background: "#F8F4F0",
            padding: "32px 28px",
            overflowY: "auto",
            transform: open ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.45s cubic-bezier(0.32, 0, 0.15, 1)",
            boxShadow: "8px 0 48px rgba(61, 53, 48, 0.1)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#B0A898",
                margin: 0,
              }}
            >
              All Projects
            </h2>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "18px",
                color: "#8A7F78",
                cursor: "pointer",
                lineHeight: 1,
              }}
              aria-label="Close project list"
            >
              ×
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {projects.map((project, i) => (
              <button
                key={project.id}
                onClick={() => {
                  setOpen(false);
                  enterProject(project.id);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "18px 20px",
                  background: "#FFFFFF",
                  border: "1px solid #EDE8E0",
                  borderRadius: "14px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 0.2s, background 0.2s",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = project.heroColor;
                  (e.currentTarget as HTMLElement).style.borderColor = project.color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
                  (e.currentTarget as HTMLElement).style.borderColor = "#EDE8E0";
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: project.heroColor,
                    border: `2px solid ${project.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#3D3530",
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#2A2420",
                      marginBottom: "3px",
                    }}
                  >
                    {project.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      color: "#8A7F78",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {project.subtitle}
                  </div>
                </div>
                <span style={{ color: "#B0A898", flexShrink: 0 }}>→</span>
              </button>
            ))}
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "#C8C0B8",
              textAlign: "center",
              marginTop: "28px",
              letterSpacing: "0.04em",
            }}
          >
            Or explore the world to discover projects
          </p>
        </div>
      </div>
    </>
  );
}
