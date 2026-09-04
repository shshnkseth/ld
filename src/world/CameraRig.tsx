"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, MathUtils, OrthographicCamera } from "three";

const LERP_FACTOR = 0.055;
const ANTICIPATION_X = 2.8; // how much to look ahead when moving right
const CAM_HEIGHT = 14;
const CAM_DISTANCE = 18;
const CAM_ANGLE = 0.52; // ~30°

interface CameraRigProps {
  characterPosition: React.RefObject<Vector3>;
}

const targetPos = new Vector3();
const camPos = new Vector3();

export default function CameraRig({ characterPosition }: CameraRigProps) {
  const { camera } = useThree();
  const prevCharX = useRef(0);
  const anticipationOffset = useRef(0);

  useFrame((_, delta) => {
    if (!characterPosition.current) return;

    const charPos = characterPosition.current;
    const dx = charPos.x - prevCharX.current;
    prevCharX.current = charPos.x;

    // Smooth anticipation offset
    const targetAnticipation = dx > 0 ? ANTICIPATION_X : dx < 0 ? -ANTICIPATION_X * 0.5 : 0;
    anticipationOffset.current = MathUtils.lerp(
      anticipationOffset.current,
      targetAnticipation,
      delta * 2.5
    );

    // Target camera position
    targetPos.set(
      charPos.x + anticipationOffset.current,
      charPos.y + CAM_HEIGHT,
      charPos.z + CAM_DISTANCE
    );

    // Lerp camera smoothly
    camera.position.lerp(targetPos, LERP_FACTOR);
    camera.lookAt(charPos.x + anticipationOffset.current * 0.5, charPos.y + 0.5, charPos.z);
  });

  return null;
}
