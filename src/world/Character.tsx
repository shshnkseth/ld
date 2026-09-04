"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3, MathUtils } from "three";
import { useCharacterControls } from "@/hooks/useCharacterControls";
import { useWorldState } from "@/hooks/useWorldState";
import { useProximity } from "@/hooks/useProximity";
import projects from "@/data/projects";

const SPEED = 4.5;
const WORLD_MIN_X = -3;
const WORLD_MAX_X = 58;
const WORLD_MIN_Z = -7;
const WORLD_MAX_Z = 7;

// Skin tone
const SKIN = "#F5C5A3";
// Hair — warm dark brown
const HAIR = "#2C1A0E";
// Frock — soft dusty rose
const FROCK_BODY = "#E88FAA";
const FROCK_SKIRT = "#F0A8BE";
// Frock collar/trim
const FROCK_TRIM = "#D97090";
// Shoes
const SHOE = "#8B4A6B";
// Outline/shadow shade
const DARK = "#3D3530";

interface CharacterProps {
  positionRef: React.MutableRefObject<Vector3>;
}

export default function Character({ positionRef }: CharacterProps) {
  const groupRef = useRef<Group>(null);
  const bodyRef = useRef<Group>(null);
  const leftLegRef = useRef<Group>(null);
  const rightLegRef = useRef<Group>(null);
  const leftArmRef = useRef<Group>(null);
  const rightArmRef = useRef<Group>(null);
  const hairRef = useRef<Group>(null);
  // Skirt panels (for subtle sway)
  const skirtFrontRef = useRef<any>(null);
  const skirtBackRef = useRef<any>(null);

  const controls = useCharacterControls();
  const { setState, setCharacterPosition, setHasMovedOnce } = useWorldState();

  // Proximity detection
  useProximity(positionRef, projects);

  const velocity = useMemo(() => new Vector3(), []);
  const targetFacing = useRef(0);
  const currentFacing = useRef(0);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const { state, hasMovedOnce } = useWorldState.getState();
    if (state === "ENTERING_PROJECT" || state === "VIEWING_PROJECT" || state === "EXITING_PROJECT") return;

    const keys = controls.current;
    const moving = keys.left || keys.right || keys.up || keys.down;

    if (moving && !hasMovedOnce) {
      setHasMovedOnce();
      setState("EXPLORING");
    }

    velocity.set(0, 0, 0);
    if (keys.right) velocity.x += 1;
    if (keys.left) velocity.x -= 1;
    if (keys.down) velocity.z += 1;
    if (keys.up) velocity.z -= 1;

    if (velocity.lengthSq() > 0) {
      velocity.normalize().multiplyScalar(SPEED * delta);
    }

    const pos = groupRef.current.position;
    pos.x = MathUtils.clamp(pos.x + velocity.x, WORLD_MIN_X, WORLD_MAX_X);
    pos.z = MathUtils.clamp(pos.z + velocity.z, WORLD_MIN_Z, WORLD_MAX_Z);

    positionRef.current.set(pos.x, pos.y, pos.z);
    setCharacterPosition({ x: pos.x, y: pos.y, z: pos.z });

    if (keys.right) targetFacing.current = 0;
    if (keys.left) targetFacing.current = Math.PI;
    if (keys.up) targetFacing.current = -Math.PI / 2;
    if (keys.down) targetFacing.current = Math.PI / 2;

    currentFacing.current = MathUtils.lerp(currentFacing.current, targetFacing.current, 0.12);
    groupRef.current.rotation.y = currentFacing.current;

    time.current += delta;
    const walkSpeed = moving ? 7 : 0;
    const walkAmt = moving ? Math.sin(time.current * walkSpeed) * 0.28 : 0;
    const idleAmt = Math.sin(time.current * 1.6) * 0.012;
    const skirtSway = Math.sin(time.current * (moving ? walkSpeed * 0.6 : 1.2)) * (moving ? 0.08 : 0.02);

    if (leftLegRef.current) leftLegRef.current.rotation.x = walkAmt;
    if (rightLegRef.current) rightLegRef.current.rotation.x = -walkAmt;
    if (leftArmRef.current) leftArmRef.current.rotation.x = -walkAmt * 0.5;
    if (rightArmRef.current) rightArmRef.current.rotation.x = walkAmt * 0.5;

    if (bodyRef.current) bodyRef.current.position.y = idleAmt;

    // Gentle skirt sway
    if (skirtFrontRef.current) {
      skirtFrontRef.current.rotation.x = skirtSway * 0.4;
    }
    if (skirtBackRef.current) {
      skirtBackRef.current.rotation.x = -skirtSway * 0.3;
    }
    // Hair sway
    if (hairRef.current) {
      hairRef.current.rotation.z = Math.sin(time.current * (moving ? 4 : 1)) * (moving ? 0.04 : 0.01);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={bodyRef}>
        {/* ── HAIR ── */}
        <group ref={hairRef}>
          {/* Main hair mass — round top */}
          <mesh position={[0, 1.72, -0.02]} castShadow>
            <sphereGeometry args={[0.29, 12, 12]} />
            <meshLambertMaterial color={HAIR} />
          </mesh>
          {/* Hair sides */}
          <mesh position={[0.19, 1.58, -0.04]} castShadow>
            <sphereGeometry args={[0.14, 8, 8]} />
            <meshLambertMaterial color={HAIR} />
          </mesh>
          <mesh position={[-0.19, 1.58, -0.04]} castShadow>
            <sphereGeometry args={[0.14, 8, 8]} />
            <meshLambertMaterial color={HAIR} />
          </mesh>
          {/* Hair back — longer */}
          <mesh position={[0, 1.48, -0.2]} castShadow>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshLambertMaterial color={HAIR} />
          </mesh>
          {/* Bun / hair tie */}
          <mesh position={[0, 1.93, -0.1]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshLambertMaterial color={HAIR} />
          </mesh>
          <mesh position={[0, 1.93, -0.08]}>
            <torusGeometry args={[0.065, 0.018, 6, 12]} />
            <meshLambertMaterial color="#C47090" />
          </mesh>
        </group>

        {/* ── HEAD ── */}
        <mesh position={[0, 1.56, 0]} castShadow>
          <sphereGeometry args={[0.245, 12, 12]} />
          <meshLambertMaterial color={SKIN} />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.085, 1.6, 0.22]}>
          <sphereGeometry args={[0.038, 6, 6]} />
          <meshBasicMaterial color={DARK} />
        </mesh>
        <mesh position={[-0.085, 1.6, 0.22]}>
          <sphereGeometry args={[0.038, 6, 6]} />
          <meshBasicMaterial color={DARK} />
        </mesh>
        {/* Eye whites */}
        <mesh position={[0.085, 1.6, 0.218]}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[-0.085, 1.6, 0.218]}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        {/* Pupils */}
        <mesh position={[0.086, 1.6, 0.224]}>
          <sphereGeometry args={[0.022, 5, 5]} />
          <meshBasicMaterial color={DARK} />
        </mesh>
        <mesh position={[-0.086, 1.6, 0.224]}>
          <sphereGeometry args={[0.022, 5, 5]} />
          <meshBasicMaterial color={DARK} />
        </mesh>
        {/* Blush */}
        <mesh position={[0.15, 1.55, 0.21]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.04, 6, 4]} />
          <meshBasicMaterial color="#F0A0A8" transparent opacity={0.5} />
        </mesh>
        <mesh position={[-0.15, 1.55, 0.21]}>
          <sphereGeometry args={[0.04, 6, 4]} />
          <meshBasicMaterial color="#F0A0A8" transparent opacity={0.5} />
        </mesh>

        {/* ── NECK ── */}
        <mesh position={[0, 1.32, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.08, 0.18, 8]} />
          <meshLambertMaterial color={SKIN} />
        </mesh>

        {/* ── FROCK BODY (bodice) ── */}
        <mesh position={[0, 1.04, 0]} castShadow>
          <boxGeometry args={[0.36, 0.44, 0.2]} />
          <meshLambertMaterial color={FROCK_BODY} />
        </mesh>

        {/* Frock collar — little scallop */}
        <mesh position={[0, 1.26, 0.1]}>
          <cylinderGeometry args={[0.14, 0.12, 0.07, 12]} />
          <meshLambertMaterial color={FROCK_TRIM} />
        </mesh>

        {/* Frock bow/detail at chest */}
        <mesh position={[0, 1.15, 0.115]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.12, 0.06, 0.03]} />
          <meshLambertMaterial color={FROCK_TRIM} />
        </mesh>

        {/* ── FROCK SKIRT ── flared A-line shape using tapered cones */}
        {/* Center skirt */}
        <mesh position={[0, 0.68, 0]} castShadow>
          <cylinderGeometry args={[0.52, 0.22, 0.7, 16]} />
          <meshLambertMaterial color={FROCK_SKIRT} />
        </mesh>
        {/* Skirt hem overlay for volume */}
        <mesh ref={skirtFrontRef} position={[0, 0.38, 0.14]}>
          <cylinderGeometry args={[0.44, 0.38, 0.2, 12]} />
          <meshLambertMaterial color={FROCK_TRIM} transparent opacity={0.7} />
        </mesh>
        <mesh ref={skirtBackRef} position={[0, 0.38, -0.1]}>
          <cylinderGeometry args={[0.42, 0.36, 0.18, 12]} />
          <meshLambertMaterial color={FROCK_SKIRT} transparent opacity={0.8} />
        </mesh>
        {/* Skirt bottom trim */}
        <mesh position={[0, 0.33, 0]}>
          <torusGeometry args={[0.48, 0.04, 6, 24]} />
          <meshLambertMaterial color={FROCK_TRIM} />
        </mesh>

        {/* ── ARMS ── */}
        <group ref={leftArmRef} position={[0.25, 1.12, 0]}>
          <mesh position={[0, -0.14, 0]} castShadow>
            <capsuleGeometry args={[0.055, 0.22, 4, 8]} />
            <meshLambertMaterial color={SKIN} />
          </mesh>
          {/* Little puff sleeve */}
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.1, 8, 6]} />
            <meshLambertMaterial color={FROCK_BODY} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.3, 0]}>
            <sphereGeometry args={[0.065, 6, 6]} />
            <meshLambertMaterial color={SKIN} />
          </mesh>
        </group>

        <group ref={rightArmRef} position={[-0.25, 1.12, 0]}>
          <mesh position={[0, -0.14, 0]} castShadow>
            <capsuleGeometry args={[0.055, 0.22, 4, 8]} />
            <meshLambertMaterial color={SKIN} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.1, 8, 6]} />
            <meshLambertMaterial color={FROCK_BODY} />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <sphereGeometry args={[0.065, 6, 6]} />
            <meshLambertMaterial color={SKIN} />
          </mesh>
        </group>

        {/* ── LEGS (minimal, mostly hidden by skirt) ── */}
        <group ref={leftLegRef} position={[0.1, 0.55, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.055, 0.32, 4, 8]} />
            <meshLambertMaterial color={SKIN} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.42, 0.04]}>
            <boxGeometry args={[0.1, 0.07, 0.18]} />
            <meshLambertMaterial color={SHOE} />
          </mesh>
          {/* Shoe toe round */}
          <mesh position={[0, -0.43, 0.12]}>
            <sphereGeometry args={[0.055, 6, 6]} />
            <meshLambertMaterial color={SHOE} />
          </mesh>
        </group>

        <group ref={rightLegRef} position={[-0.1, 0.55, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.055, 0.32, 4, 8]} />
            <meshLambertMaterial color={SKIN} />
          </mesh>
          <mesh position={[0, -0.42, 0.04]}>
            <boxGeometry args={[0.1, 0.07, 0.18]} />
            <meshLambertMaterial color={SHOE} />
          </mesh>
          <mesh position={[0, -0.43, 0.12]}>
            <sphereGeometry args={[0.055, 6, 6]} />
            <meshLambertMaterial color={SHOE} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
