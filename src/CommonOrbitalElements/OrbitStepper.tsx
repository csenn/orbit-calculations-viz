import { Line, Html } from "@react-three/drei";
import { Vector3, Group } from "three";
import type { ClassicalOrbitalElements } from "./calc";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import {
  sampleOrbitInPlane,
  rotatePoints,
  findAscendingNodePosition,
  findPerigee,
} from "./orbitCalc";



interface OrbitStepperProps {
  classicalOrbitElements: ClassicalOrbitalElements;
}


export function OrbitStepper ({
  classicalOrbitElements
}: OrbitStepperProps) {

  const [stepProgress, setStepProgress] = useState(0)
  const animationTime = useRef(0)

  useFrame((_, delta) => {
    if (stepProgress < 1) {
      animationTime.current += delta
      const progress = Math.min(animationTime.current/durationPerStep, 1)
    }
  })


  return (
          <Line points={pointsA} color={"white"} />
  )
}