import { Html, Line } from "@react-three/drei";
import { Vector3 } from "three";
import {
  R_EARTH,
  type ClassicalOrbitalElements,
} from "../utils/commonOrbitalElementsCalc";
import { findPerigee } from "../utils/orbitCalc";
import { useAppStore } from "../../store";

function generateArc(
  startVector: Vector3,
  axis: Vector3,
  angle: number,
  radius: number,
  segments = 64,
): Vector3[] {
  const start = startVector.clone().normalize().multiplyScalar(radius);
  const points: Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * angle;
    const p = start.clone().applyAxisAngle(axis, theta);
    points.push(p);
  }
  return points;
}

function signedAngle(start: Vector3, end: Vector3, axis: Vector3): number {
  const angle = start.angleTo(end);
  const cross = start.clone().cross(end);
  const sign = Math.sign(axis.dot(cross));
  return sign < 0 ? 2 * Math.PI - angle : angle;
}

export function TrueAnomalyAngle({
  classicalOrbitElements,
  color = "#4dd0e1",
}: {
  classicalOrbitElements: ClassicalOrbitalElements;
  color?: string;
}) {
  const { step } = useAppStore();

  if (step < 4) {
    return;
  }

  const radius = R_EARTH + 1000;

  const perigee = findPerigee(classicalOrbitElements);

  const position = new Vector3(
    classicalOrbitElements.position.x,
    classicalOrbitElements.position.y,
    classicalOrbitElements.position.z,
  );

  const axis = new Vector3(
    classicalOrbitElements.nVector.x,
    classicalOrbitElements.nVector.y,
    classicalOrbitElements.nVector.z,
  ).normalize();

  const angle = signedAngle(perigee.clone(), position.clone(), axis);

  const arcPoints = generateArc(perigee, axis, angle, radius);

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
        <div style={{ color, fontWeight: "bold", fontSize: "10px" }}>
          True Anomaly
        </div>
      </Html>
    </>
  );
}
