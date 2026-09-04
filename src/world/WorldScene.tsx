"use client";

import { useRef } from "react";
import { Vector3 } from "three";
import Ground from "./Ground";
import Character from "./Character";
import CameraRig from "./CameraRig";
import ProjectRoom from "./ProjectRoom";
import ProjectSign from "./ProjectSign";
import EnvironmentObjects from "./EnvironmentObjects";
import projects from "@/data/projects";
import { useWorldState } from "@/hooks/useWorldState";

export default function WorldScene() {
  const characterPositionRef = useRef(new Vector3(0, 0, 0));
  const { characterPosition } = useWorldState();

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.85} color="#FFF8F0" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.9}
        color="#FFF8F0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <hemisphereLight
        args={["#EEF5FF", "#F5EEE0", 0.4]}
      />

      {/* World geometry */}
      <Ground />
      <EnvironmentObjects />

      {/* Character (owns movement logic + proximity detection) */}
      <Character positionRef={characterPositionRef} />

      {/* Camera rig */}
      <CameraRig characterPosition={characterPositionRef} />

      {/* Projects */}
      {projects.map((project) => (
        <group key={project.id}>
          <ProjectRoom
            project={project}
            characterX={characterPosition.x}
          />
          <ProjectSign
            project={project}
            characterX={characterPosition.x}
          />
        </group>
      ))}
    </>
  );
}
