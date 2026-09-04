"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { ProjectData } from "@/data/projects";

interface RoomProps {
  project: ProjectData;
  isNear: boolean;
}

/**
 * Airport Terminal Room
 * - Wide, open ceiling structure with tall glass curtain walls
 * - Departure board / FIDS panel on the back wall
 * - Check-in counter row
 * - Overhead signage arm (wayfinding arrow)
 * - Advertising banner panels on side columns
 * - Floor tile grid
 * - Gate number sign
 */
export default function AirportRoom({ project, isNear }: RoomProps) {
  const boardRef = useRef<any>(null);
  const time = useRef(0);

  // Animate the departure board: subtle flicker / scan line
  useFrame((_, delta) => {
    time.current += delta;
    if (boardRef.current) {
      boardRef.current.emissiveIntensity = 0.35 + Math.sin(time.current * 3) * 0.05;
    }
  });

  const W = 9;  // terminal width
  const D = 6.5; // terminal depth
  const H = 4.2; // ceiling height

  const CONCRETE = "#E8E4DF";
  const GLASS = "#C8DDE8";
  const STEEL = "#B0B8C0";
  const FLOOR = "#D8D4CE";
  const FLOOR_TILE = "#C8C4BE";
  const SIGN_BLUE = "#1A4A8A";
  const BOARD_DARK = "#0A1A28";
  const BOARD_AMBER = "#FFB830";
  const AD_PANEL = "#D0E8F0";

  return (
    <group>
      {/* ── FLOOR ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[W, D]} />
        <meshLambertMaterial color={FLOOR} />
      </mesh>

      {/* Floor tile grid lines */}
      {[-3, -1, 1, 3].map((x, i) => (
        <mesh key={`ftx${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.015, 0]}>
          <planeGeometry args={[0.04, D]} />
          <meshBasicMaterial color={FLOOR_TILE} />
        </mesh>
      ))}
      {[-2, 0, 2].map((z, i) => (
        <mesh key={`ftz${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, z]}>
          <planeGeometry args={[W, 0.04]} />
          <meshBasicMaterial color={FLOOR_TILE} />
        </mesh>
      ))}

      {/* ── BACK WALL (concrete) ── */}
      <mesh position={[0, H / 2, -D / 2]} castShadow receiveShadow>
        <boxGeometry args={[W, H, 0.18]} />
        <meshLambertMaterial color={CONCRETE} />
      </mesh>

      {/* ── SIDE WALLS (glass curtain) ── */}
      {/* Left wall */}
      <mesh position={[-W / 2, H / 2, 0]}>
        <boxGeometry args={[0.12, H, D]} />
        <meshLambertMaterial color={GLASS} transparent opacity={0.45} />
      </mesh>
      {/* Right wall */}
      <mesh position={[W / 2, H / 2, 0]}>
        <boxGeometry args={[0.12, H, D]} />
        <meshLambertMaterial color={GLASS} transparent opacity={0.45} />
      </mesh>

      {/* ── CEILING ── exposed steel truss */}
      <mesh position={[0, H, 0]} receiveShadow>
        <boxGeometry args={[W + 0.2, 0.12, D + 0.2]} />
        <meshLambertMaterial color={STEEL} />
      </mesh>

      {/* Structural columns */}
      {[-3.5, 3.5].map((x, i) => (
        <mesh key={`col${i}`} position={[x, H / 2, 0]} castShadow>
          <boxGeometry args={[0.22, H, 0.22]} />
          <meshLambertMaterial color={STEEL} />
        </mesh>
      ))}

      {/* Truss beams across ceiling */}
      {[-2, 0, 2].map((z, i) => (
        <mesh key={`beam${i}`} position={[0, H - 0.08, z]}>
          <boxGeometry args={[W, 0.1, 0.08]} />
          <meshLambertMaterial color={STEEL} />
        </mesh>
      ))}

      {/* ── DEPARTURE BOARD (FIDS) ── */}
      <group position={[0, H - 0.9, -D / 2 + 0.12]}>
        {/* Board housing */}
        <mesh>
          <boxGeometry args={[5.5, 1.5, 0.15]} />
          <meshLambertMaterial color={BOARD_DARK} />
        </mesh>
        {/* Screen surface */}
        <mesh ref={boardRef} position={[0, 0, 0.09]}>
          <boxGeometry args={[5.2, 1.2, 0.04]} />
          <meshStandardMaterial
            color={BOARD_DARK}
            emissive={BOARD_DARK}
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* DEPARTURES text panel - amber strip */}
        <mesh position={[0, 0.45, 0.1]}>
          <boxGeometry args={[5.1, 0.25, 0.02]} />
          <meshBasicMaterial color={BOARD_AMBER} />
        </mesh>
        {/* Row lines (simulating flight info rows) */}
        {[-0.1, -0.3].map((y, i) => (
          <mesh key={`row${i}`} position={[0, y, 0.1]}>
            <boxGeometry args={[4.8, 0.04, 0.01]} />
            <meshBasicMaterial color="#1E3A5A" />
          </mesh>
        ))}
      </group>

      {/* ── CHECK-IN COUNTERS ── */}
      {[-2.5, 0, 2.5].map((x, i) => (
        <group key={`counter${i}`} position={[x, 0, -1.8]}>
          {/* Counter body */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[1.6, 1.2, 0.55]} />
            <meshLambertMaterial color={CONCRETE} />
          </mesh>
          {/* Counter face panel */}
          <mesh position={[0, 0.6, 0.285]}>
            <boxGeometry args={[1.55, 1.15, 0.04]} />
            <meshLambertMaterial color="#F5F0EB" />
          </mesh>
          {/* Counter number badge */}
          <mesh position={[0, 0.95, 0.31]}>
            <boxGeometry args={[0.35, 0.2, 0.02]} />
            <meshLambertMaterial color={SIGN_BLUE} />
          </mesh>
          {/* Monitor on counter */}
          <mesh position={[0.35, 1.32, -0.05]} rotation={[-0.2, 0, 0]} castShadow>
            <boxGeometry args={[0.5, 0.32, 0.04]} />
            <meshLambertMaterial color="#1A1A2A" />
          </mesh>
          {/* Belt barrier post */}
          <mesh position={[0.9, 0.55, 0.5]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 1.1, 8]} />
            <meshLambertMaterial color={STEEL} />
          </mesh>
          <mesh position={[-0.9, 0.55, 0.5]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 1.1, 8]} />
            <meshLambertMaterial color={STEEL} />
          </mesh>
          {/* Belt */}
          <mesh position={[0, 1.05, 0.5]}>
            <boxGeometry args={[1.8, 0.02, 0.01]} />
            <meshLambertMaterial color="#FFD080" />
          </mesh>
        </group>
      ))}

      {/* ── OVERHEAD WAYFINDING SIGN ARM ── */}
      <group position={[0, H - 0.15, 1.2]}>
        {/* Arm rod */}
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.8, 8]} />
          <meshLambertMaterial color={STEEL} />
        </mesh>
        {/* Sign panel */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2.2, 0.5, 0.08]} />
          <meshLambertMaterial color={SIGN_BLUE} />
        </mesh>
        {/* Arrow strip */}
        <mesh position={[0.6, -0.5, 0.05]}>
          <boxGeometry args={[0.5, 0.3, 0.02]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        {/* Gate text strip */}
        <mesh position={[-0.3, -0.5, 0.05]}>
          <boxGeometry args={[0.9, 0.18, 0.02]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* ── ADVERTISING BANNER PANELS on columns ── */}
      {[-3.3, 3.3].map((x, i) => (
        <mesh key={`ad${i}`} position={[x, H / 2 + 0.3, 0.5]}>
          <boxGeometry args={[0.06, 2.2, 1.4]} />
          <meshLambertMaterial color={i === 0 ? "#D0E0F8" : "#F0D8E8"} />
        </mesh>
      ))}

      {/* ── ENTRANCE AREA ── raised threshold + glass doors */}
      {/* Threshold strip */}
      <mesh position={[0, 0.025, D / 2 - 0.1]}>
        <boxGeometry args={[W, 0.05, 0.3]} />
        <meshLambertMaterial color={STEEL} />
      </mesh>

      {/* Sliding door frames */}
      {[-1.6, 1.6].map((x, i) => (
        <group key={`door${i}`} position={[x, 1.3, D / 2 - 0.05]}>
          <mesh>
            <boxGeometry args={[1.4, 2.6, 0.06]} />
            <meshLambertMaterial color={GLASS} transparent opacity={0.3} />
          </mesh>
          <mesh>
            <boxGeometry args={[1.45, 2.65, 0.04]} />
            <meshLambertMaterial color={STEEL} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* ── PROXIMITY GLOW — entrance highlight ── */}
      {isNear && (
        <mesh position={[0, 0.02, D / 2 - 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.0, 1.25, 36]} />
          <meshBasicMaterial color="#B8D8F8" transparent opacity={0.7} />
        </mesh>
      )}

      {/* ── LUGGAGE CAROUSEL (decorative, back corner) ── */}
      <group position={[3, 0, -2]}>
        <mesh position={[0, 0.18, 0]}>
          <torusGeometry args={[0.9, 0.18, 6, 24]} />
          <meshLambertMaterial color="#C0C8D0" />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[0.72, 0.90, 24]} />
          <meshLambertMaterial color="#B0B8C0" />
        </mesh>
        {/* Suitcase */}
        <mesh position={[0.8, 0.48, 0]}>
          <boxGeometry args={[0.28, 0.38, 0.16]} />
          <meshLambertMaterial color="#E88FAA" />
        </mesh>
      </group>
    </group>
  );
}
