import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import {
  R_EARTH,
  type ClassicalOrbitalElements,
} from "../utils/commonOrbitalElementsCalc";
import { useMemo } from "react";

function generateArc(
  nVector: Vector3,
  angle: number,
  radius: number,
  segments = 64,
): Vector3[] {
  const axis = nVector.clone().normalize();
  const start = new Vector3().crossVectors(axis, new Vector3(0, 0, 1))
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

export function InclinationAngle({
  classicalOrbitElements,
  color = "#ffeb3b",
}: {
  classicalOrbitElements: ClassicalOrbitalElements;
  color?: string;
}) {
  const dashedProps = useMemo(
    () => ({
      dashed: true,
      dashSize: 200,
      gapSize: 100,
    }),
    [],
  );

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

  return <Line points={arcPoints} color={color} lineWidth={2} {...dashedProps} />;
}
