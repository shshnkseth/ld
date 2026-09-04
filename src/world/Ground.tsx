"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function Ground() {
  const gridRef = useRef<Mesh>(null);

  return (
    <group>
      {/* Main ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[20, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[120, 30]} />
        <meshLambertMaterial color="#EDE8E0" />
      </mesh>

      {/* Subtle dot grid overlay */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[20, 0, 0]}
      >
        <planeGeometry args={[120, 30]} />
        <meshBasicMaterial
          color="#D8D3CB"
          wireframe={false}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Ground shadow plane for soft look */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[20, -0.005, 0]}
        receiveShadow
      >
        <planeGeometry args={[120, 30]} />
        <shadowMaterial opacity={0.08} />
      </mesh>
    </group>
  );
}
