import { Html, Line } from "@react-three/drei";
import { Vector3 } from "three";
import {
  R_EARTH,
  radiansToDegrees,
  type ClassicalOrbitalElements,
} from "../utils/commonOrbitalElementsCalc";
import { useAppStore } from "../../store";

function generateArc(
  nVector: Vector3,
  angle: number,
  radius: number,
  segments = 64,
): Vector3[] {
  const axis = nVector.clone().normalize();
  const start = new Vector3()
    .crossVectors(axis, new Vector3(0, 0, 1))
    .normalize()
    .multiplyScalar(radius);
  const points: Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * angle;
    const p = start.clone().applyAxisAngle(axis, theta);
    points.push(p);
  }
  return points;
}

export function PrettyAngle({ rad }: { rad: number }) {
  const degrees = Math.round(radiansToDegrees(rad) * 100) / 100;
  const degreeSymbol = String.fromCharCode(176);
  return (
    <span>
      {degrees}
      {degreeSymbol}
    </span>
  );
}

export function InclinationAngle({
  classicalOrbitElements,
  color = "#FFB74D",
}: {
  classicalOrbitElements: ClassicalOrbitalElements;
  color?: string;
}) {
  const { step } = useAppStore();

  if (step < 4) {
    return;
  }

  const radius = R_EARTH + 1000;
  const nVector = new Vector3(
    classicalOrbitElements.nVector.x,
    classicalOrbitElements.nVector.y,
    classicalOrbitElements.nVector.z,
  );
  const arcPoints = generateArc(
    nVector,
    classicalOrbitElements.inclination,
    radius,
  );

  // should always exist
  const index = Math.floor(arcPoints.length / 2);

  return (
    <>
      <Line
        points={arcPoints}
        color={color}
        lineWidth={2}
        dashed={true}
        dashSize={200}
        gapSize={100}
      />
      <Html position={arcPoints[index]}>
        <div
          style={{
            color,
            fontWeight: "bold",
            fontSize: "10px",
            whiteSpace: "nowrap",
          }}
        >
          Inclination <PrettyAngle rad={classicalOrbitElements.inclination} />
        </div>
      </Html>
    </>
  );
}
