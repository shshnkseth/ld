"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ProjectData } from "@/data/projects";

interface RoomProps {
  project: ProjectData;
  isNear: boolean;
}

/**
 * Care Studio Room — Colour for Care
 * Warm clinical-meets-studio space. Rounded arches, therapeutic colour
 * swatches on the wall, a colour sample table, plants, soft lighting.
 */
export default function CareStudioRoom({ project, isNear }: RoomProps) {
  const lampRef = useRef<any>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (lampRef.current) {
      lampRef.current.intensity = 1.1 + Math.sin(time.current * 0.8) * 0.05;
    }
  });

  const W = 7.5;
  const D = 6;
  const H = 3.6;

  // Colour palette — warm therapeutic tones
  const WALL = "#F5EDE4";
  const ARCH = "#E8D8CC";
  const FLOOR_WARM = "#EDE0D4";
  const FLOOR_RUG = "#D4A090";
  const TABLE = "#C8B4A0";
  const SHELF = "#D4C0B0";
  const PLANT_POT = "#C8A898";
  const PLANT_GREEN = "#88B890";

  // Colour swatch colours
  const SWATCHES = ["#E8C4C4", "#C4D8E8", "#C4E8C8", "#E8E0C4", "#D4C4E8", "#F0D4B8"];

  return (
    <group>
      {/* ── FLOOR ── warm terracotta-tinted */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[W, D]} />
        <meshLambertMaterial color={FLOOR_WARM} />
      </mesh>

      {/* Floor rug in centre */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0.4]}>
        <planeGeometry args={[4, 3]} />
        <meshLambertMaterial color={FLOOR_RUG} />
      </mesh>
      {/* Rug border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.016, 0.4]}>
        <planeGeometry args={[4.15, 3.15]} />
        <meshBasicMaterial color="#B88878" wireframe />
      </mesh>

      {/* ── BACK WALL ── */}
      <mesh position={[0, H / 2, -D / 2]} receiveShadow>
        <boxGeometry args={[W, H, 0.18]} />
        <meshLambertMaterial color={WALL} />
      </mesh>

      {/* ── SIDE WALLS ── */}
      <mesh position={[-W / 2, H / 2, 0]}>
        <boxGeometry args={[0.15, H, D]} />
        <meshLambertMaterial color={WALL} />
      </mesh>
      <mesh position={[W / 2, H / 2, 0]}>
        <boxGeometry args={[0.15, H, D]} />
        <meshLambertMaterial color={WALL} />
      </mesh>

      {/* ── CEILING ── */}
      <mesh position={[0, H, 0]}>
        <boxGeometry args={[W + 0.2, 0.12, D + 0.2]} />
        <meshLambertMaterial color={ARCH} />
      </mesh>

      {/* ── ARCH OPENING (entrance) ── rounded arch shape */}
      {/* Arch left pillar */}
      <mesh position={[-0.9, H / 2 - 0.3, D / 2 - 0.05]} castShadow>
        <boxGeometry args={[0.2, H - 0.6, 0.2]} />
        <meshLambertMaterial color={ARCH} />
      </mesh>
      {/* Arch right pillar */}
      <mesh position={[0.9, H / 2 - 0.3, D / 2 - 0.05]} castShadow>
        <boxGeometry args={[0.2, H - 0.6, 0.2]} />
        <meshLambertMaterial color={ARCH} />
      </mesh>
      {/* Arch lintel (rounded-ish) */}
      <mesh position={[0, H - 0.55, D / 2 - 0.05]}>
        <boxGeometry args={[2.1, 0.55, 0.22]} />
        <meshLambertMaterial color={ARCH} />
      </mesh>
      {/* Arch cap decorative curve */}
      <mesh position={[0, H - 0.28, D / 2 - 0.05]}>
        <torusGeometry args={[0.95, 0.12, 8, 16, Math.PI]} />
        <meshLambertMaterial color={ARCH} />
      </mesh>

      {/* ── COLOUR SWATCH PANEL on back wall ── */}
      <group position={[0, H / 2 + 0.2, -D / 2 + 0.15]}>
        {/* Main panel board */}
        <mesh>
          <boxGeometry args={[4.5, 2.0, 0.06]} />
          <meshLambertMaterial color="#EDE0D4" />
        </mesh>
        {/* Individual colour swatches */}
        {SWATCHES.map((color, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <mesh key={i} position={[-1.4 + col * 1.4, 0.35 - row * 0.8, 0.05]}>
              <boxGeometry args={[1.1, 0.6, 0.04]} />
              <meshLambertMaterial color={color} />
            </mesh>
          );
        })}
        {/* Panel title strip */}
        <mesh position={[0, 0.85, 0.04]}>
          <boxGeometry args={[3, 0.2, 0.02]} />
          <meshLambertMaterial color="#C8A898" />
        </mesh>
      </group>

      {/* ── SAMPLE TABLE ── */}
      <group position={[-1.2, 0, -1.2]}>
        {/* Table top */}
        <mesh position={[0, 0.76, 0]} castShadow>
          <boxGeometry args={[1.8, 0.06, 1.0]} />
          <meshLambertMaterial color={TABLE} />
        </mesh>
        {/* Table legs */}
        {[[-0.8, -0.5], [-0.8, 0.5], [0.8, -0.5], [0.8, 0.5]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.37, z]} castShadow>
            <boxGeometry args={[0.06, 0.74, 0.06]} />
            <meshLambertMaterial color="#B09888" />
          </mesh>
        ))}
        {/* Colour chips scattered on table */}
        {[
          { x: -0.4, z: -0.2, c: "#F0C0C8" },
          { x: 0.2, z: 0.1, c: "#C0D8F0" },
          { x: 0.5, z: -0.3, c: "#C0F0C8" },
          { x: -0.2, z: 0.3, c: "#F0E8C0" },
        ].map((chip, i) => (
          <mesh key={i} position={[chip.x, 0.8, chip.z]} rotation={[0, i * 0.3, 0]}>
            <boxGeometry args={[0.18, 0.008, 0.12]} />
            <meshLambertMaterial color={chip.c} />
          </mesh>
        ))}
        {/* Moodboard / clipboard */}
        <mesh position={[0, 0.8, -0.1]} rotation={[-0.05, 0.1, 0]}>
          <boxGeometry args={[0.5, 0.01, 0.7]} />
          <meshLambertMaterial color="#F0E8DF" />
        </mesh>
      </group>

      {/* ── SHELF with colour jars ── */}
      <group position={[2.8, 1.8, -2.5]}>
        <mesh>
          <boxGeometry args={[1.5, 0.06, 0.3]} />
          <meshLambertMaterial color={SHELF} />
        </mesh>
        {/* Colour jars */}
        {["#E88FAA", "#88B8D0", "#98D0A0", "#E8C880", "#C8A8E0"].map((c, i) => (
          <group key={i} position={[-0.6 + i * 0.3, 0.08, 0]}>
            <mesh>
              <cylinderGeometry args={[0.07, 0.07, 0.2, 10]} />
              <meshLambertMaterial color={c} />
            </mesh>
            {/* Lid */}
            <mesh position={[0, 0.12, 0]}>
              <cylinderGeometry args={[0.075, 0.075, 0.04, 10]} />
              <meshLambertMaterial color="#E8E0D8" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── PLANTS ── */}
      <group position={[2.8, 0, 1.5]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.16, 0.44, 10]} />
          <meshLambertMaterial color={PLANT_POT} />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow>
          <sphereGeometry args={[0.32, 8, 7]} />
          <meshLambertMaterial color={PLANT_GREEN} />
        </mesh>
        <mesh position={[0.12, 0.75, 0.1]} castShadow>
          <sphereGeometry args={[0.18, 6, 6]} />
          <meshLambertMaterial color="#70A878" />
        </mesh>
      </group>

      {/* Smaller plant */}
      <group position={[-2.8, 0, -0.5]}>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.12, 0.09, 0.28, 8]} />
          <meshLambertMaterial color="#C8B4A0" />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <sphereGeometry args={[0.22, 7, 6]} />
          <meshLambertMaterial color={PLANT_GREEN} />
        </mesh>
      </group>

      {/* ── SOFT OVERHEAD LAMP ── */}
      <group position={[0.5, H - 0.02, -0.8]}>
        <mesh>
          <cylinderGeometry args={[0.025, 0.025, 0.7, 6]} />
          <meshLambertMaterial color="#C8B4A0" />
        </mesh>
        <mesh position={[0, -0.46, 0]}>
          <sphereGeometry args={[0.22, 10, 8]} />
          <meshLambertMaterial color="#F0E8DC" />
        </mesh>
        <pointLight
          ref={lampRef}
          position={[0, -0.55, 0]}
          intensity={1.2}
          color="#FFF0E0"
          distance={4}
          decay={2}
        />
      </group>

      {/* ── PROXIMITY GLOW ── */}
      {isNear && (
        <mesh position={[0, 0.02, D / 2 - 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.85, 1.05, 32]} />
          <meshBasicMaterial color="#F0C0C8" transparent opacity={0.65} />
        </mesh>
      )}
    </group>
  );
}
