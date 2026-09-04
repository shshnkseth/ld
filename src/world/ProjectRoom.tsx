"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";
import { ProjectData } from "@/data/projects";
import { useWorldState } from "@/hooks/useWorldState";

import AirportRoom from "./rooms/AirportRoom";
import CareStudioRoom from "./rooms/CareStudioRoom";
import ResearchAtelierRoom from "./rooms/ResearchAtelierRoom";

interface ProjectRoomProps {
  project: ProjectData;
  characterX: number;
}

const FADE_START = 22;
const FADE_FULL = 12;

export default function ProjectRoom({ project, characterX }: ProjectRoomProps) {
  const groupRef = useRef<Group>(null);
  const { activeProjectId, state } = useWorldState();
  const isNear = activeProjectId === project.id && state === "NEAR_PROJECT";

  const [px, py, pz] = project.position;
  const dist = Math.abs(characterX - px);

  const targetOpacity = MathUtils.clamp(
    1 - (dist - FADE_FULL) / (FADE_START - FADE_FULL),
    0.0,
    1
  );

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.traverse((child: any) => {
      if (child.material && !child.userData.keepOpacity) {
        const current = child.material.opacity ?? 1;
        child.material.opacity = MathUtils.lerp(current, targetOpacity, 0.05);
        child.material.transparent = true;
      }
    });
  });

  const RoomComponent = {
    airport: AirportRoom,
    "care-studio": CareStudioRoom,
    "research-atelier": ResearchAtelierRoom,
    "design-studio": ResearchAtelierRoom,
  }[project.roomType] ?? ResearchAtelierRoom;

  return (
    <group ref={groupRef} position={[px, py, pz]}>
      <RoomComponent project={project} isNear={isNear} />
    </group>
  );
}
