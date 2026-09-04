"use client";

/**
 * Small decorative props scattered through the world for environmental storytelling.
 * Kept sparse and intentional.
 */
export default function EnvironmentObjects() {
  return (
    <group>
      {/* ── Start area — near character spawn ── */}

      {/* Bench */}
      <group position={[4, 0, -2.5]}>
        {/* Seat */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[1.2, 0.08, 0.4]} />
          <meshLambertMaterial color="#C8BFB0" />
        </mesh>
        {/* Legs */}
        {[-0.5, 0.5].map((x, i) => (
          <mesh key={i} position={[x, 0.2, 0]} castShadow>
            <boxGeometry args={[0.08, 0.4, 0.36]} />
            <meshLambertMaterial color="#B0A898" />
          </mesh>
        ))}
      </group>

      {/* Plant pot #1 */}
      <group position={[7, 0, 2.8]}>
        <mesh position={[0, 0.16, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.1, 0.32, 8]} />
          <meshLambertMaterial color="#C4B8A0" />
        </mesh>
        <mesh position={[0, 0.48, 0]} castShadow>
          <sphereGeometry args={[0.22, 8, 6]} />
          <meshLambertMaterial color="#7BAF7A" />
        </mesh>
      </group>

      {/* Tiny lamp */}
      <group position={[2.5, 0, -3]}>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 1.2, 6]} />
          <meshLambertMaterial color="#9A9088" />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <coneGeometry args={[0.18, 0.22, 8]} />
          <meshLambertMaterial color="#E8D8B0" />
        </mesh>
        <mesh position={[0, 1.14, 0]}>
          <sphereGeometry args={[0.07, 6, 6]} />
          <meshBasicMaterial color="#FFF8E0" />
        </mesh>
      </group>

      {/* ── Mid area — between project 01 and 02 ── */}

      {/* Geometric sculpture */}
      <group position={[19.5, 0, 1.5]}>
        <mesh position={[0, 0.4, 0]} rotation={[0.2, 0.5, 0.1]} castShadow>
          <dodecahedronGeometry args={[0.38]} />
          <meshLambertMaterial color="#C4B8E8" />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.08, 16]} />
          <meshLambertMaterial color="#DDD8D0" />
        </mesh>
      </group>

      {/* Plant pot #2 */}
      <group position={[21, 0, -3]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.13, 0.4, 8]} />
          <meshLambertMaterial color="#D4C8B0" />
        </mesh>
        <mesh position={[0.05, 0.55, 0]} castShadow>
          <sphereGeometry args={[0.28, 8, 6]} />
          <meshLambertMaterial color="#8FC08E" />
        </mesh>
      </group>

      {/* Sticky note pile */}
      <group position={[20, 0, 3.2]}>
        {[
          { color: "#F5E8A0", rx: 0, ry: 0.3 },
          { color: "#F0D0C0", rx: 0, ry: -0.2 },
          { color: "#C8E0F8", rx: 0, ry: 0.6 },
        ].map((note, i) => (
          <mesh key={i} position={[i * 0.06, 0.01 + i * 0.003, i * 0.04]} rotation={[-Math.PI / 2, 0, note.ry]} castShadow>
            <planeGeometry args={[0.35, 0.35]} />
            <meshLambertMaterial color={note.color} />
          </mesh>
        ))}
      </group>

      {/* ── Far area — between project 02 and 03 ── */}

      {/* Skateboard */}
      <group position={[33, 0, -2]} rotation={[0, 0.4, 0]}>
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
          <planeGeometry args={[0.3, 0.85]} />
          <meshLambertMaterial color="#3D3530" />
        </mesh>
        {[-0.25, 0.25].map((z, i) => (
          <group key={i}>
            <mesh position={[-0.1, 0.04, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.055, 0.055, 0.18, 8]} />
              <meshLambertMaterial color="#888" />
            </mesh>
            <mesh position={[0.1, 0.04, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.055, 0.055, 0.18, 8]} />
              <meshLambertMaterial color="#888" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Second lamp */}
      <group position={[34, 0, 3]}>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 1.2, 6]} />
          <meshLambertMaterial color="#9A9088" />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <coneGeometry args={[0.18, 0.22, 8]} />
          <meshLambertMaterial color="#E8D0B0" />
        </mesh>
        <mesh position={[0, 1.14, 0]}>
          <sphereGeometry args={[0.07, 6, 6]} />
          <meshBasicMaterial color="#FFF8E0" />
        </mesh>
      </group>

      {/* Abstract poster / frame */}
      <group position={[35, 0, -3.5]}>
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[0.06, 1.8, 0.06]} />
          <meshLambertMaterial color="#B0A898" />
        </mesh>
        <mesh position={[0, 1.8, 0.06]}>
          <boxGeometry args={[0.7, 1.0, 0.04]} />
          <meshLambertMaterial color="#F0EBE4" />
        </mesh>
        <mesh position={[0, 1.8, 0.1]}>
          <boxGeometry args={[0.5, 0.7, 0.02]} />
          <meshLambertMaterial color="#E8C4C4" />
        </mesh>
      </group>

      {/* Path stones leading from start */}
      {[1.5, 3.2, 5.0, 6.8].map((x, i) => (
        <mesh key={i} position={[x, 0.01, 0.2 + Math.sin(i * 1.3) * 0.5]} rotation={[-Math.PI / 2, 0, Math.random() * 0.5]}>
          <circleGeometry args={[0.18 + i * 0.02, 7]} />
          <meshLambertMaterial color="#D8D3CB" />
        </mesh>
      ))}
    </group>
  );
}
