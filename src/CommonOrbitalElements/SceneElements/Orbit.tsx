import { Line, Html } from "@react-three/drei";
import { Vector3, Group } from "three";
import type { ClassicalOrbitalElements } from "../utils/commonOrbitalElementsCalc";

import {
  sampleOrbitInPlane,
  rotatePoints,
  findAscendingNodePosition,
  findPerigee,
} from "../utils/orbitCalc";

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
    <group position={position}>
      <mesh>
        <sphereGeometry args={[200, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html position={[0, 0, 200]} transform>
        <div style={{ color, fontWeight: "bold", backgroundColor: "white" }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

interface OrbitProps {
  classicalOrbitElements: ClassicalOrbitalElements;
}

export function Orbit({ classicalOrbitElements }: OrbitProps) {
  // const pointsA = sampleOrbitInPlane(5020, 0.593577, 1000);
  const rawPoints = sampleOrbitInPlane(
    classicalOrbitElements.semiMajorAxis,
    classicalOrbitElements.eccentricity,
    1000,
  );

  // const pointsA = rotatePoints(classicalOrbitElements, rawPoints);

  const perigee = findPerigee(classicalOrbitElements);

  const ascendingNode = findAscendingNodePosition(
    classicalOrbitElements,
    rawPoints,
  );

  return (
    <>
      {/* <Line points={pointsA} color={"white"} />
      <AnimatedOrbit
        durationPerStep={10}
        rawPoints={rawPoints}
        classicalOrbitElements={classicalOrbitElements}
      /> */}
      <LabelDot position={perigee} color="#ffeb3b" label="Periapsis" />
      {ascendingNode && (
        <LabelDot position={ascendingNode} color="red" label="Ascending Node" />
      )}
    </>
  );
}
