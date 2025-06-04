import { Line, Html } from "@react-three/drei";
import { Vector3, Euler, Group } from "three";
import type { ClassicalOrbitalElements } from "./calc";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

function sampleOrbitInPlane(
  semiMajorAxis: number,
  eccentricity: number,
  numPoints: number = 360,
): Vector3[] {
  const points: Vector3[] = [];

  for (let i = 0; i <= numPoints; i++) {
    const theta = (i / numPoints) * 2 * Math.PI; // true anomaly

    // Equation for radius
    const r =
      (semiMajorAxis * (1 - eccentricity ** 2)) /
      (1 + eccentricity * Math.cos(theta));

    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    points.push(new Vector3(x, y, 0)); // z=0, in orbital plane
  }

  return points;
}

function rotatePoints(
  classicalOrbitElements: ClassicalOrbitalElements,
  rawPoints: Vector3[],
) {
  const { inclination, rightAscension, argumentOfPerigee } =
    classicalOrbitElements;

  const ω = argumentOfPerigee;
  const i = inclination;
  const Ω = rightAscension;

  const inPlaneSpin = new Euler(0, 0, ω, "XYZ"); // spin periapsis into place
  const inclinationTilt = new Euler(i, 0, 0, "XYZ"); // tilt orbit plane
  const raanTwist = new Euler(0, 0, Ω, "XYZ"); // rotate plane around Z (K)

  return rawPoints.map((p) => {
    const point = p.clone();
    point.applyEuler(inPlaneSpin); // ω — in orbital plane
    point.applyEuler(inclinationTilt); // i — tilt plane
    point.applyEuler(raanTwist); // Ω — align ascending node
    return point;
  });
}

function getLabeledOrbitPoints(
  classicalOrbitElements: ClassicalOrbitalElements,
): {
  periapsis: Vector3;
} {
  const {
    inclination,
    rightAscension,
    argumentOfPerigee,
    semiMajorAxis,
    eccentricity,
  } = classicalOrbitElements;

  const ω = argumentOfPerigee;
  const i = inclination;
  const Ω = rightAscension;

  // Orbital ellipse: r = a(1 - e), along +X in orbital plane
  const periapsisRaw = new Vector3(semiMajorAxis * (1 - eccentricity), 0, 0);

  // Build rotation steps
  const inPlaneSpin = new Euler(0, 0, ω, "XYZ");
  const inclinationTilt = new Euler(i, 0, 0, "XYZ");
  const raanTwist = new Euler(0, 0, Ω, "XYZ");

  // Periapsis: spin first, then tilt, then twist
  const periapsis = periapsisRaw
    .clone()
    .applyEuler(inPlaneSpin)
    .applyEuler(inclinationTilt)
    .applyEuler(raanTwist);

  return { periapsis };
}

function findAscendingNodePosition(
  classicalOrbitElements: ClassicalOrbitalElements,
  rawOrbitPoints: Vector3[],
): Vector3 | null {
  const { inclination, rightAscension, argumentOfPerigee } =
    classicalOrbitElements;

  const ω = argumentOfPerigee;
  const i = inclination;
  const Ω = rightAscension;

  const inPlaneSpin = new Euler(0, 0, ω, "XYZ");
  const inclinationTilt = new Euler(i, 0, 0, "XYZ");
  const raanTwist = new Euler(0, 0, Ω, "XYZ");

  for (let j = 0; j < rawOrbitPoints.length - 1; j++) {
    const p1 = rawOrbitPoints[j]
      .clone()
      .applyEuler(inPlaneSpin)
      .applyEuler(inclinationTilt)
      .applyEuler(raanTwist);

    const p2 = rawOrbitPoints[j + 1]
      .clone()
      .applyEuler(inPlaneSpin)
      .applyEuler(inclinationTilt)
      .applyEuler(raanTwist);

    if (p1.z < 0 && p2.z > 0) {
      // Linear interpolation to estimate Z=0 crossing point
      const t = -p1.z / (p2.z - p1.z);
      const ascendingNode = new Vector3().lerpVectors(p1, p2, t);
      return ascendingNode;
    }
  }

  return null; // Shouldn't happen if orbit is elliptical and samples are dense
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
    const total = durationPerStep * 3;

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

  const { periapsis } = getLabeledOrbitPoints(classicalOrbitElements);

  const ascendingNode = findAscendingNodePosition(
    classicalOrbitElements,
    rawPoints,
  );

  return (
    <>
      <Line points={pointsA} color={"white"} />
      <LabelDot position={periapsis} color="pink" label="Periapsis" />
      <AnimatedOrbit
        durationPerStep={10}
        rawPoints={rawPoints}
        classicalOrbitElements={classicalOrbitElements}
      />
      {ascendingNode && (
        <LabelDot position={ascendingNode} color="red" label="Ascending Node" />
      )}
    </>
  );
}
