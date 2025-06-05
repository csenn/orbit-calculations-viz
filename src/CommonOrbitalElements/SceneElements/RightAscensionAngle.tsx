import { Html, Line } from "@react-three/drei";
import { Vector3 } from "three";
import {
  R_EARTH,
  type ClassicalOrbitalElements,
} from "../utils/commonOrbitalElementsCalc";
import { PrettyAngle } from "./InclinationAngle";

function generateArcXY(
  radius: number,
  angle: number,
  segments = 64,
): Vector3[] {
  const points: Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * angle; // radians from 0 to Ω
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    points.push(new Vector3(x, y, 0)); // XY plane
  }
  return points;
}

export function RightAscensionAngle({
  classicalOrbitElements,
  // angle,
  color = "#ff7961",
}: {
  classicalOrbitElements: ClassicalOrbitalElements;
  // angle: number; // radians (e.g. RAAN)
  color?: string;
}) {
  const radius = R_EARTH + 1000;
  const arcPoints = generateArcXY(
    radius,
    classicalOrbitElements.rightAscension,
  );

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
      <Html position={arcPoints[0]}>
        <div
          style={{
            color,
            fontWeight: "bold",
            fontSize: "10px",
            whiteSpace: "nowrap",
          }}
        >
          Right Ascension{" "}
          <PrettyAngle rad={classicalOrbitElements.rightAscension} />
        </div>
      </Html>
    </>
  );
}
