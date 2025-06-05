import { create } from "zustand";
import { Vector3 } from "three";

interface AppState {
  cameraPosition: Vector3 | null;
  step: number;
  isAnimating: boolean;
  setCameraPosition: (pos: Vector3) => void;
  setCurrentStep: (step: number) => void;
  setIsAnimating: (isAnimating: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  cameraPosition: null,
  isAnimating: false,
  step: 0,
  setCameraPosition: (pos: Vector3) => set(() => ({ cameraPosition: pos })),
  setCurrentStep: (step: number) => set(() => ({ step })),
  setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
}));
