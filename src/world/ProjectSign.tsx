"use client";

import { useRef } from "react";
import { Html } from "@react-three/drei";
import { Group } from "three";
import { ProjectData } from "@/data/projects";
import { useWorldState } from "@/hooks/useWorldState";

interface ProjectSignProps {
  project: ProjectData;
  characterX: number;
}

const LABEL_VISIBLE_DIST = 15;

export default function ProjectSign({ project, characterX }: ProjectSignProps) {
  const { enterProject, state, activeProjectId } = useWorldState();
  const [px, , pz] = project.position;
  const dist = Math.abs(characterX - px);
  const isNear = activeProjectId === project.id && state === "NEAR_PROJECT";
  const labelVisible = dist < LABEL_VISIBLE_DIST;

  const handleEnter = () => {
    if (state === "NEAR_PROJECT" || state === "EXPLORING") {
      enterProject(project.id);
    }
  };

  return (
    <group position={[px - 4.5, 0, pz + 5.5]}>
      {/* Sign post */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.4, 8]} />
        <meshLambertMaterial color="#8A7F78" />
      </mesh>

      {/* Sign board */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[1.8, 0.7, 0.06]} />
        <meshLambertMaterial color="#F5F0EB" />
      </mesh>

      {/* Sign board border */}
      <mesh position={[0, 1.6, 0.04]}>
        <boxGeometry args={[1.85, 0.75, 0.02]} />
        <meshLambertMaterial color={project.color} />
      </mesh>

      {/* HTML label on sign */}
      {labelVisible && (
        <Html
          position={[0, 1.6, 0.08]}
          center
          transform
          distanceFactor={4}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#3D3530",
                letterSpacing: "0.05em",
                lineHeight: 1.2,
                maxWidth: "120px",
              }}
            >
              {project.title}
            </div>
            <div
              style={{
                fontSize: "7px",
                color: "#8A7F78",
                marginTop: "2px",
                letterSpacing: "0.04em",
              }}
            >
              {project.year}
            </div>
          </div>
        </Html>
      )}

      {/* "Enter" CTA — appears only when near */}
      {isNear && (
        <Html
          position={[0, 0.85, 0.1]}
          center
          transform
          distanceFactor={4}
        >
          <button
            onClick={handleEnter}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              fontWeight: 600,
              color: "#F5F0EB",
              background: "#3D3530",
              border: "none",
              borderRadius: "20px",
              padding: "5px 12px",
              cursor: "pointer",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
            }}
          >
            Enter →
          </button>
        </Html>
      )}
    </group>
  );
}
