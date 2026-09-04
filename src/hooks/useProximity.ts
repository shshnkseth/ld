import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { ProjectData } from "@/data/projects";
import { useWorldState } from "./useWorldState";

const PROXIMITY_ENTER = 4.5; // distance to trigger NEAR_PROJECT
const PROXIMITY_EXIT = 6.5;  // distance to un-trigger (hysteresis)

const charVec = new Vector3();
const projVec = new Vector3();

/**
 * Runs every frame to check character proximity against all project positions.
 * Updates world state to NEAR_PROJECT / back to EXPLORING accordingly.
 */
export function useProximity(
  characterRef: React.RefObject<Vector3>,
  projects: ProjectData[]
) {
  const lastNearId = useRef<string | null>(null);
  const { setState, setActiveProject } = useWorldState();

  useFrame(() => {
    const { state } = useWorldState.getState();
    if (state === "ENTERING_PROJECT" || state === "VIEWING_PROJECT" || state === "EXITING_PROJECT") return;
    if (!characterRef.current) return;

    charVec.copy(characterRef.current);

    let nearestId: string | null = null;
    let nearestDist = Infinity;

    for (const project of projects) {
      projVec.set(...project.position);
      const dist = charVec.distanceTo(projVec);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestId = project.id;
      }
    }

    if (nearestDist < PROXIMITY_ENTER && nearestId) {
      if (lastNearId.current !== nearestId) {
        lastNearId.current = nearestId;
        setActiveProject(nearestId);
        setState("NEAR_PROJECT");
      }
    } else if (nearestDist > PROXIMITY_EXIT && lastNearId.current) {
      lastNearId.current = null;
      setActiveProject(null);
      if (state === "NEAR_PROJECT") setState("EXPLORING");
    }
  });
}
