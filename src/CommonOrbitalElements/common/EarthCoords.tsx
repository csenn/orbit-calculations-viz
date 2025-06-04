import { Line } from "@react-three/drei";
import { Vector3 } from "three";

export function EarthCoords() {
  const pointsA = [new Vector3(0, 0, 0), new Vector3(15000, 0, 0)];
  const pointsB = [new Vector3(0, 0, 0), new Vector3(0, 15000, 0)];
  const pointsC = [new Vector3(0, 0, 0), new Vector3(0, 0, 15000)];
  return (
    <>
      <Line points={pointsA} color={"blue"} lineWidth={4} />
      <Line points={pointsB} color={"blue"} lineWidth={4} />
      <Line points={pointsC} color={"blue"} lineWidth={4} />
    </>
  );
}
