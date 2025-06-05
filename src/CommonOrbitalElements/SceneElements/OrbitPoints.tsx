import { Html } from "@react-three/drei";
import { Vector3 } from "three";
import type { ClassicalOrbitalElements } from "../utils/commonOrbitalElementsCalc";

import {
  sampleOrbitInPlane,
  findAscendingNodePosition,
  findPerigee,
} from "../utils/orbitCalc";
import { useAppStore } from "../../store";

{
  /* <Html position={position}>
<div style={{ color: "white" }}>{label}</div>
</Html> */
}

function LabelDot({
  position,
  color,
  label,
}: {
  position: Vector3;
  color: string;
  label: string;
}) {
  return (
    <>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[200, 16, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>

        <Html position={[0, 0, 100]}>
          <div style={{ color, fontWeight: "bold", fontSize: "10px" }}>
            {label}
          </div>
        </Html>
      </group>
    </>
  );
}

interface OrbitPointsProps {
  classicalOrbitElements: ClassicalOrbitalElements;
}

export function OrbitPoints({ classicalOrbitElements }: OrbitPointsProps) {
  const { step, isAnimating } = useAppStore();

  if (step < 4 || isAnimating) {
    return;
  }

  // Need to get raw points for ascending node position, is there a better way?
  const rawPoints = sampleOrbitInPlane(
    classicalOrbitElements.semiMajorAxis,
    classicalOrbitElements.eccentricity,
  );

  const perigee = findPerigee(classicalOrbitElements);

  const ascendingNode = findAscendingNodePosition(
    classicalOrbitElements,
    rawPoints,
  );

  return (
    <>
      <LabelDot position={perigee} color="#ffeb3b" label="Perigee" />
      {ascendingNode && (
        <LabelDot position={ascendingNode} color="red" label="Ascending Node" />
      )}
    </>
  );
}
