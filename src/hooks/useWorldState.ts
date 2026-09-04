import { create } from "zustand";

export type WorldState =
  | "INTRO"
  | "EXPLORING"
  | "NEAR_PROJECT"
  | "ENTERING_PROJECT"
  | "VIEWING_PROJECT"
  | "EXITING_PROJECT";

interface CharacterPosition {
  x: number;
  y: number;
  z: number;
}

interface WorldStore {
  state: WorldState;
  activeProjectId: string | null;
  characterPosition: CharacterPosition;
  hasMovedOnce: boolean;

  // Actions
  setState: (state: WorldState) => void;
  setActiveProject: (id: string | null) => void;
  setCharacterPosition: (pos: CharacterPosition) => void;
  setHasMovedOnce: () => void;
  enterProject: (id: string) => void;
  exitProject: () => void;
}

export const useWorldState = create<WorldStore>((set) => ({
  state: "INTRO",
  activeProjectId: null,
  characterPosition: { x: 0, y: 0, z: 0 },
  hasMovedOnce: false,

  setState: (state) => set({ state }),
  setActiveProject: (id) => set({ activeProjectId: id }),
  setCharacterPosition: (pos) => set({ characterPosition: pos }),
  setHasMovedOnce: () => set({ hasMovedOnce: true }),

  enterProject: (id) =>
    set({ state: "ENTERING_PROJECT", activeProjectId: id }),

  exitProject: () =>
    set({ state: "EXITING_PROJECT" }),
}));
