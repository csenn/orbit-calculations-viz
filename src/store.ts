import { create } from "zustand";
import { Vector3 } from "three";

interface AppState {
  cameraPosition: Vector3 | null;
  setCameraPosition: (pos: Vector3) => void;
}

export const useAppStore = create<AppState>((set) => ({
  cameraPosition: null,
  setCameraPosition: (pos: Vector3) => set(() => ({ cameraPosition: pos })),
}));
