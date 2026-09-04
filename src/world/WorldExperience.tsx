"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useWorldState } from "@/hooks/useWorldState";

import WorldScene from "./WorldScene";
import MovementHint from "@/ui/MovementHint";
import InteractionPrompt from "@/ui/InteractionPrompt";
import ProjectOverlay from "@/ui/ProjectOverlay";
import ProjectList from "@/ui/ProjectList";
import MobileControls from "@/ui/MobileControls";

export default function WorldExperience() {
  const { setState, enterProject } = useWorldState();

  // Handle global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { state, activeProjectId } = useWorldState.getState();

      if (e.code === "Escape") {
        if (state === "VIEWING_PROJECT") {
          setState("EXITING_PROJECT");
          setTimeout(() => setState("EXPLORING"), 700);
        }
      }

      if ((e.code === "Enter" || e.code === "Space") && state === "NEAR_PROJECT" && activeProjectId) {
        e.preventDefault();
        enterProject(activeProjectId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setState, enterProject]);

  // Handle ENTERING → VIEWING transition
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const unsub = useWorldState.subscribe((store) => {
      if (store.state === "ENTERING_PROJECT") {
        timer = setTimeout(() => {
          setState("VIEWING_PROJECT");
        }, 800);
      }
    });

    return () => {
      unsub();
      clearTimeout(timer);
    };
  }, [setState]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#F5F0EB",
        overflow: "hidden",
      }}
    >
      <Canvas
        shadows
        style={{ width: "100%", height: "100%" }}
        camera={{
          position: [2.8, 14, 18],
          fov: 45,
          near: 0.1,
          far: 200,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#F5F0EB");
        }}
      >
        <Suspense fallback={null}>
          <WorldScene />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      <MovementHint />
      <InteractionPrompt />
      <ProjectOverlay />
      <MobileControls />

      {/* Accessibility fallback */}
      <ProjectList />
    </div>
  );
}
