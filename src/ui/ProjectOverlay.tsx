"use client";

import { useEffect, useRef } from "react";
import { useWorldState } from "@/hooks/useWorldState";
import projects from "@/data/projects";

export default function ProjectOverlay() {
  const { state, activeProjectId, setState } = useWorldState();
  const scrollRef = useRef<HTMLDivElement>(null);

  const project = projects.find((p) => p.id === activeProjectId);
  const isOpen = state === "VIEWING_PROJECT";

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen, activeProjectId]);

  const handleExit = () => {
    setState("EXITING_PROJECT");
    setTimeout(() => setState("EXPLORING"), 700);
  };

  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(61, 53, 48, 0.3)",
          backdropFilter: "blur(4px)",
          transition: "opacity 0.5s ease",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          zIndex: 40,
        }}
        onClick={handleExit}
      />

      {/* Panel */}
      <div
        ref={scrollRef}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "min(680px, 100vw)",
          height: "100vh",
          background: "#F8F4F0",
          overflowY: "auto",
          zIndex: 50,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.55s cubic-bezier(0.32, 0, 0.15, 1)",
          boxShadow: "-8px 0 48px rgba(61, 53, 48, 0.12)",
        }}
      >
        {/* Hero band */}
        <div
          style={{
            height: "220px",
            background: project.heroColor,
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            padding: "28px 40px",
          }}
        >
          {/* Decorative circle */}
          <div
            style={{
              position: "absolute",
              top: "30px",
              right: "40px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: project.color,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "55px",
              right: "80px",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.4)",
            }}
          />

          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#6A6058",
                marginBottom: "8px",
              }}
            >
              {project.company} · {project.year}
            </div>
            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "36px",
                fontWeight: 800,
                color: "#2A2420",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "40px 40px 80px" }}>
          {/* Exit button */}
          <button
            onClick={handleExit}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "#8A7F78",
              background: "transparent",
              border: "1.5px solid #D8D0C8",
              borderRadius: "24px",
              padding: "8px 16px",
              cursor: "pointer",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "36px",
            }}
          >
            ← Exit project
          </button>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              color: "#6A6058",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            {project.subtitle}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#6A6058",
                  background: project.heroColor,
                  borderRadius: "20px",
                  padding: "4px 12px",
                  letterSpacing: "0.06em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <Divider />

          <Section title="Overview" content={project.overview} />
          <Section title="My Role" content={project.role} />
          <Section title="The Problem" content={project.problem} />
          <Section title="Process" content={project.process} />
          <Section title="Outcome" content={project.outcome} />

          {/* Metrics */}
          <div style={{ marginBottom: "40px" }}>
            <SectionTitle>Key Results</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 20px",
                    background: project.heroColor,
                    borderRadius: "12px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#3D3530",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>◆</span>
                  {metric}
                </div>
              ))}
            </div>
          </div>

          <Section title="Learnings" content={project.learnings} />

          {/* Exit footer */}
          <div
            style={{
              borderTop: "1px solid #E8E0D8",
              paddingTop: "32px",
              marginTop: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              onClick={handleExit}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#F5F0EB",
                background: "#3D3530",
                border: "none",
                borderRadius: "24px",
                padding: "12px 24px",
                cursor: "pointer",
                letterSpacing: "0.06em",
              }}
            >
              ← Back to world
            </button>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                color: "#B0A898",
                letterSpacing: "0.06em",
              }}
            >
              Press Esc to exit
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#B0A898",
        marginBottom: "12px",
        marginTop: 0,
      }}
    >
      {children}
    </h2>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div style={{ marginBottom: "36px" }}>
      <SectionTitle>{title}</SectionTitle>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "15px",
          fontWeight: 400,
          color: "#4A4038",
          lineHeight: 1.8,
          margin: 0,
        }}
      >
        {content}
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: "1px",
        background: "#E8E0D8",
        margin: "0 0 36px 0",
      }}
    />
  );
}
