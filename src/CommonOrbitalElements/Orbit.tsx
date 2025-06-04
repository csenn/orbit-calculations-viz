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

export function AnimatedOrbit({
  rawPoints,
  classicalOrbitElements,
  durationPerStep = 2, // seconds
}: {
  rawPoints: Vector3[];
  classicalOrbitElements: ClassicalOrbitalElements;
  durationPerStep?: number;
}) {
  const groupRef = useRef<Group>(null);
  const ωRef = useRef<Group>(null);
  const iRef = useRef<Group>(null);
  const ΩRef = useRef<Group>(null);

  const [time, setTime] = useState(0);

  useFrame((_, delta) => {
    setTime((t) => t + delta);
    // const total = durationPerStep * 3;

    const ω = classicalOrbitElements.argumentOfPerigee;
    const i = classicalOrbitElements.inclination;
    const Ω = classicalOrbitElements.rightAscension;
    // Step 1: ω (argument of perigee), 0s to t1
    if (time < durationPerStep && ωRef.current) {
      const t = time / durationPerStep;
      ωRef.current.rotation.z = ω * t;
    }

    // Step 2: i (inclination), t1 to t2
    if (time >= durationPerStep && time < durationPerStep * 2 && iRef.current) {
      const t = (time - durationPerStep) / durationPerStep;
      iRef.current.rotation.x = i * t;
    } else if (time >= durationPerStep * 2 && iRef.current) {
      iRef.current.rotation.x = i;
    }

    // Step 3: Ω (RAAN), t2 to t3
    if (
      time >= durationPerStep * 2 &&
      time < durationPerStep * 3 &&
      ΩRef.current
    ) {
      const t = (time - 2 * durationPerStep) / durationPerStep;
      ΩRef.current.rotation.z = Ω * t;
    } else if (time >= durationPerStep * 3 && ΩRef.current) {
      ΩRef.current.rotation.z = Ω;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={ΩRef}>
        <group ref={iRef}>
          <group ref={ωRef}>
            <Line
              points={rawPoints.map((p) => p.clone())}
              color="white"
              lineWidth={1}
            />
          </group>
        </group>
      </group>
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

  const pointsA = rotatePoints(classicalOrbitElements, rawPoints);

  const perigee = findPerigee(classicalOrbitElements);

  const ascendingNode = findAscendingNodePosition(
    classicalOrbitElements,
    rawPoints,
  );

  return (
    <>
      <Line points={pointsA} color={"white"} />
      <AnimatedOrbit
        durationPerStep={10}
        rawPoints={rawPoints}
        classicalOrbitElements={classicalOrbitElements}
      />
      <LabelDot position={perigee} color="#ffeb3b" label="Periapsis" />
      {ascendingNode && (
        <LabelDot position={ascendingNode} color="red" label="Ascending Node" />
      )}
    </>
  );
}
