import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { Html } from "@react-three/drei";

function CoordLabel({ label, position }: { label: string; position: Vector3 }) {
  return (
    <Html position={position}>
      <div style={{ color: "white" }}>{label}</div>
    </Html>
  );
}

export function EarthCoords() {
  const pointsA = [new Vector3(0, 0, 0), new Vector3(15000, 0, 0)];
  const pointsB = [new Vector3(0, 0, 0), new Vector3(0, 15000, 0)];
  const pointsC = [new Vector3(0, 0, 0), new Vector3(0, 0, 15000)];

  const blue = "#3f51b5";

  return (
    <>
      <Line points={pointsA} color={blue} lineWidth={4} />
      <Line points={pointsB} color={blue} lineWidth={4} />
      <Line points={pointsC} color={blue} lineWidth={4} />

      <CoordLabel label="I" position={pointsA[1]} />
      <CoordLabel label="J" position={pointsB[1]} />
      <CoordLabel label="K" position={new Vector3(0, 0, 16000)} />
    </>
  );
}
