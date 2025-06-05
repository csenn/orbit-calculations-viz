import { create } from "zustand";
import { Vector3 } from "three";

interface AppState {
  cameraPosition: Vector3 | null;
  setCameraPosition: (pos: Vector3) => void;
  step: number;
  setCurrentStep: (step: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  cameraPosition: null,
  setCameraPosition: (pos: Vector3) => set(() => ({ cameraPosition: pos })),
  step: 0,
  setCurrentStep: (step: number) => set(() => ({ step })),
}));
