import { useEffect, useRef } from "react";

export interface ControlsInput {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  interact: boolean;
}

const keysRef: ControlsInput = {
  left: false,
  right: false,
  up: false,
  down: false,
  interact: false,
};

// Singleton key state — shared across all instances
let listeners = 0;

function handleKeyDown(e: KeyboardEvent) {
  switch (e.code) {
    case "ArrowLeft":
    case "KeyA":
      keysRef.left = true;
      break;
    case "ArrowRight":
    case "KeyD":
      keysRef.right = true;
      break;
    case "ArrowUp":
    case "KeyW":
      keysRef.up = true;
      break;
    case "ArrowDown":
    case "KeyS":
      keysRef.down = true;
      break;
    case "Enter":
    case "Space":
      keysRef.interact = true;
      break;
  }
}

function handleKeyUp(e: KeyboardEvent) {
  switch (e.code) {
    case "ArrowLeft":
    case "KeyA":
      keysRef.left = false;
      break;
    case "ArrowRight":
    case "KeyD":
      keysRef.right = false;
      break;
    case "ArrowUp":
    case "KeyW":
      keysRef.up = false;
      break;
    case "ArrowDown":
    case "KeyS":
      keysRef.down = false;
      break;
    case "Enter":
    case "Space":
      keysRef.interact = false;
      break;
  }
}

/**
 * Returns a stable ref to the current key state.
 * Read it every frame inside useFrame — do NOT use as React state.
 */
export function useCharacterControls() {
  const ref = useRef<ControlsInput>(keysRef);

  useEffect(() => {
    if (listeners === 0) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    }
    listeners++;

    return () => {
      listeners--;
      if (listeners === 0) {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, []);

  return ref;
}

// Allow mobile controls to inject synthetic key state
export function setKey(key: keyof ControlsInput, value: boolean) {
  keysRef[key] = value;
}
